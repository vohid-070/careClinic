<script setup>
import { useCallBackStore } from "@/stores/callBack";
import { storeToRefs } from "pinia";
import { ref, onMounted, reactive } from "vue";
import { useToast } from "primevue/usetoast";

const callBackStore = useCallBackStore();
const { callBack } = storeToRefs(callBackStore);
const { comentById } = storeToRefs(callBackStore);

const toast = useToast();
const currentPage = ref(0);
const search = ref("");
const tableLoading = ref(false);
const showComments = ref(false);
const loadingComment = ref(false);
const loadingServiced = ref(false);
const commentId = ref(null);
const dataComment = ref();
const loadSkleton = ref(false);

const getCallBackActiveList = async () => {
  tableLoading.value = true;
  await callBackStore.CallBackActive(search.value, currentPage.value);
  tableLoading.value = false;
};

const getComments = async (id) => {
  loadSkleton.value = true;
  showComments.value = true;
  commentId.value = id;
  dataComment.value = await callBackStore.GetCommentById(id);
  loadSkleton.value = false;
};

const AddComment = async () => {
  loadingComment.value = true;
  const comment = reactive({
    message: "",
  });
  comment.message = comentById.value.name;
  const data = await callBackStore.AddComment(commentId.value, comment);
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
    getCallBackActiveList();
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: data.message,
      group: "bc",
      life: 3000,
    });
  }
};
const Serviced = async () => {
  loadingServiced.value = true;
  const comment = reactive({
    message: "",
  });
  comment.message = comentById.value.name;
  if (comentById.value.name) {
    const data = await callBackStore.Serviced(commentId.value, comment);
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
      getCallBackActiveList();
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
  getCallBackActiveList();
});
</script>

<template>
  <DataTable :value="callBack.content" :loading="tableLoading">
    <template #empty>Ҳеч қандай маълумот топилмади</template>
    <template #header>
      <InputText
        v-model="search"
        placeholder="Қидириш"
        @input="getCallBackActiveList(search)"
      />
    </template>
    <Column field="id" header="ID" />
    <Column field="telegram_number" header="Мижоз рақами" />
    <Column field="user_id" header="Телеграм ID" />
    <Column field="created" header="Мурожаат тушган сана" />
    <Column field="employee_full_name" header="Ходимнинг ФИО" />
    <Column field="name" header="Изох">
      <template #body="slotProps">
        <p v-if="slotProps.data.name && slotProps.data.name.length > 20">
          {{ slotProps.data.name.substring(0, 20) }}<span>...</span>
        </p>
        <p v-else>{{ slotProps.data.name }}</p>
      </template>
    </Column>

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
            @click="getComments(slotProps.data.id)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
  <Paginator
    v-model:first="currentPage"
    v-on:update:first="getCallBackActiveList"
    :rows="1"
    :total-records="callBack.totalPages"
  >
    <template #start>
      <Button
        icon="pi pi-refresh"
        text
        rounded
        @click="getCallBackActiveList"
        v-tooltip="'Қайта юклаш'"
      />
    </template>
    <template #end>
      <div class="totalElements">
        <b>Элементлар сони: </b> {{ callBack.totalElements }}
      </div>
    </template>
  </Paginator>
  <Dialog
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
  </Dialog>
</template>
