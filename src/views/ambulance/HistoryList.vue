<script setup>
import { ref, onMounted, reactive } from "vue";
import { useAmbulanceStore } from "@/stores/ambulance";
import { storeToRefs } from "pinia";
import { GoogleMap, Marker } from "vue3-google-map";
// import { useToast } from "primevue/usetoast";

const AmbulanceStore = useAmbulanceStore();
const { mobilLaboratoryAll } = storeToRefs(AmbulanceStore);
// const { comentById } = storeToRefs(AmbulanceStore);

// const toast = useToast();
const currentPage = ref(0);
const search = ref("");
const tableLoading = ref(false);
const showLocation = ref(false);
const location = ref();
// const showComments = ref(false);
// const loadingComment = ref(false);
// const loadingServiced = ref(false);
// const commentId = ref(null);
// const dataComment = ref();
// const loadSkleton = ref(false);

const getAllList = async () => {
  tableLoading.value = true;
  await AmbulanceStore.MobileHistory(search.value, currentPage.value);
  tableLoading.value = false;
};

const getLocation = (item) => {
  showLocation.value = true;
  location.value = item;
};

/* const getComments = async (id) => {
  loadSkleton.value = true;
  showComments.value = true;
  commentId.value = id;
  dataComment.value = await AmbulanceStore.GetCommentById(id);
  loadSkleton.value = false;
}; */

/* const AddComment = async () => {
  loadingComment.value = true;
  const comment = reactive({
    message: "",
  });
  comment.message = comentById.value.name;
  const data = await AmbulanceStore.AddComment(commentId.value, comment);
  if (data.status == 200) {
    showComments.value = false;
    loadingComment.value = false;
    toast.add({
      severity: "success",
      summary: "Муваффақиятли",
      detail: "Муваффақиятли янгиланди",
      group: "bc",
      life: 3000,
    });
    getActiveList();
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: data.message,
      group: "bc",
      life: 3000,
    });
  }
}; */
/* const Serviced = async () => {
  loadingServiced.value = true;
  const comment = reactive({
    message: "",
  });
  comment.message = comentById.value.name;
  if (comentById.value.name) {
    const data = await AmbulanceStore.Serviced(commentId.value, comment);
    if (data.status == 200) {
      showComments.value = false;
      loadingServiced.value = false;
      toast.add({
        severity: "success",
        summary: "Муваффақиятли",
        detail: "Муваффақиятли янгиланди",
        group: "bc",
        life: 3000,
      });
      comment.message = "";
      getActiveList();
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
}; */

onMounted(() => {
  getAllList();
});
</script>

<template>
  <div>
    <DataTable :value="mobilLaboratoryAll.content" :loading="tableLoading">
      <template #empty>Ҳеч қандай маълумот топилмади</template>
      <template #header>
        <InputText
          v-model="search"
          placeholder="Қидириш"
          @input="getAllList(search)"
        />
      </template>
      <Column field="id" header="ID"></Column>
      <Column field="telegram_number" header="Мижоз рақами"></Column>
      <Column field="user_id" header="Телеграм ID"></Column>
      <Column field="created" header="Мурожат тушган сана"></Column>
      <Column field="name" header="Ходимнинг Изохи"></Column>
      <Column field="employee" header="Ходимнинг ФИО">
        <template #body="slotProps">
          <p v-if="slotProps.data.employee">
            {{ slotProps.data.employee.name }}
            {{ slotProps.data.employee.surname }}
          </p>
        </template>
      </Column>
      <Column field="serviced" header="Ҳолати">
        <template #body="slotProps">
          <Tag
            v-if="slotProps.data.serviced == true"
            severity="success"
            class="p-2"
            style="font-size: 14px"
          >
            Кўрилди
          </Tag>
          <Tag
            v-if="slotProps.data.serviced == false"
            severity="danger"
            class="p-2"
            style="font-size: 14px"
          >
            Кўрилмади
          </Tag>
        </template>
      </Column>
      <Column field="actions">
        <template #header>
          <div class="mx-auto">
            <i class="pi pi-ellipsis-v"></i>
          </div>
        </template>
        <template #body="slotProps">
          <div class="flex flex-wrap gap-2 justify-content-center">
            <Button
              outlined
              rounded
              icon="pi pi-map-marker"
              @click="getLocation(slotProps.data)"
            />
            <!-- <Button
              outlined
              rounded
              severity="warning"
              icon="pi pi-comment"
              @click="getComments(slotProps.data.id)"
            /> -->
          </div>
        </template>
      </Column>
    </DataTable>
    <Paginator
      v-model:first="currentPage"
      v-on:update:first="getAllList"
      :rows="1"
      :total-records="mobilLaboratoryAll.totalPages"
    >
      <template #start>
        <Button
          icon="pi pi-refresh"
          text
          rounded
          @click="getAllList"
          v-tooltip="'Қайта юклаш'"
        />
      </template>
      <template #end>
        <div class="totalElements">
          <b>Элементлар сони: </b> {{ mobilLaboratoryAll.totalElements }}
        </div>
      </template>
    </Paginator>

    <Dialog
      v-model:visible="showLocation"
      header="Адрес"
      modal
      style="width: 70vw"
    >
      <GoogleMap
        api-key="AIzaSyAOFDz5aPj8fCIJOYW89Ll5OzVxfOYQZbA"
        style="width: 100%; height: 700px"
        :center="{
          lat: Number(location.latitude),
          lng: Number(location.longitude),
        }"
        :zoom="14"
      >
        <Marker
          :options="{
            position: {
              lat: Number(location.latitude),
              lng: Number(location.longitude),
            },
          }"
        />
      </GoogleMap>
    </Dialog>
    <!-- <Dialog
      v-model:visible="showComments"
      modal
      style="width: 40vw; max-height: 60vh"
      header="Изох"
    >
      <div v-if="!loadSkleton">
        <Textarea
          v-model="comentById.name"
          placeholder="Хабарингизни киритинг"
          rows="4"
          style="width: 100%"
        />
      </div>
      <Skeleton v-if="loadSkleton" />
      <div class="flex justify-content-between mt-4">
        <Button
          severity="warning"
          label="Вақтинча сақлаш"
          :loading="loadingComment"
          @click="AddComment"
        />
        <Button
          severity="success"
          label="Юбориш"
          :loading="loadingServiced"
          @click="Serviced"
        />
      </div>
    </Dialog> -->
  </div>
</template>
