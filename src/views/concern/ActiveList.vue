<script setup>
import { useConcernStore } from "@/stores/concern";
import { storeToRefs } from "pinia";
import { ref, onMounted, reactive } from "vue";
import { useToast } from "primevue/usetoast";

const concernStore = useConcernStore();
const { concern } = storeToRefs(concernStore);
const { comentById } = storeToRefs(concernStore);

const toast = useToast();
const currentPage = ref(0);
const search = ref("");
const activeList = ref();
const tableLoading = ref(false);
const showServicedModal = ref(false);
const itemId = ref(null);
const concernSkleton = ref(false);
const loading = ref(false);
const concernDetail = ref(null);
const EmployeeComment = reactive({
  message: "",
});

const getConcernActiveList = async () => {
  tableLoading.value = true;
  activeList.value = await concernStore.ConcernActive(
    search.value,
    currentPage.value
  );
  tableLoading.value = false;
};

const showServiced = async (id) => {
  showServicedModal.value = true;
  concernSkleton.value = true;
  itemId.value = id;
  concernDetail.value = await concernStore.GetConcernById(id);
  concernSkleton.value = false;
};
const Serviced = async () => {
  if (EmployeeComment.message) {
    loading.value = true;
    const data = await concernStore.servicedConcern(
      itemId.value,
      EmployeeComment
    );
    loading.value = false;
    if (data.status == 200) {
      showServicedModal.value = false;
      loading.value = false;
      toast.add({
        severity: "success",
        summary: "Муваффақиятли",
        detail: "Муваффақиятли юборилди",
        group: "bc",
        life: 3000,
      });
      EmployeeComment.message = "";
      getConcernActiveList();
    }
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Илтимос изоҳ киритинг!",
      group: "bc",
      life: 3000,
    });
  }
};

onMounted(() => {
  getConcernActiveList();
});
</script>

<template>
  <div>
    <DataTable :value="concern.content" :loading="tableLoading">
      <template #empty>Ҳеч қандай маълумот топилмади</template>
      <template #header>
        <InputText
          v-model="search"
          placeholder="Қидириш"
          @input="getConcernActiveList(search)"
        />
      </template>
      <Column field="id" header="ID" />
      <Column field="telegram_number" header="Мижоз рақами" />
      <Column field="user_id" header="Телеграм ID" />
      <Column field="name" header="Мижоз шикояти">
        <template #body="slotProps">
          <p v-if="slotProps.data.name">
            {{ slotProps.data.name.substring(0, 20) }}<span>...</span>
          </p>
          <p v-else>{{ slotProps.data.name }}</p>
        </template>
      </Column>
      <Column field="created" header="Мурожаат тушган сана" />
      <Column field="speciality.name" header="Мутахассислик" />
      <Column field="actions">
        <template #header>
          <div class="mx-auto">
            <i class="pi pi-ellipsis-v"></i>
          </div>
        </template>
        <template #body="slotProps">
          <div class="flex justify-content-center">
            <Button
              outlined
              rounded
              icon="pi pi-comment"
              @click="showServiced(slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <Paginator
      v-model:first="currentPage"
      v-on:update:first="getConcernActiveList"
      :rows="1"
      :total-records="concern.totalPages"
    >
      <template #start>
        <Button
          icon="pi pi-refresh"
          text
          rounded
          @click="getConcernActiveList"
          v-tooltip="'Қайта юклаш'"
        />
      </template>
      <template #end>
        <div class="totalElements">
          <b>Элементлар сони: </b> {{ concern.totalElements }}
        </div>
      </template>
    </Paginator>
    <Dialog
      v-model:visible="showServicedModal"
      modal
      header="Изох"
      style="width: 35vw"
    >
      <Skeleton v-if="concernSkleton" class="mt-2 mb-4" />
      <div v-if="!concernSkleton" class="mt-2 mb-4">
        <b>Беморнинг шикояти:</b> {{ comentById.name }}
      </div>
      <Textarea
        v-model="EmployeeComment.message"
        placeholder="Хабарингизни киритинг"
        rows="4"
        style="width: 100%"
      />
      <div class="my-2 flex justify-content-end">
        <Button
          severity="success"
          label="Юбориш"
          :loading="loading"
          @click="Serviced"
        />
      </div>
    </Dialog>
  </div>
</template>
