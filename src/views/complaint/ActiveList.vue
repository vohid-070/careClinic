<script setup>
import { useComplaintStore } from "@/stores/complaint";
import { storeToRefs } from "pinia";
import { ref, onMounted, reactive } from "vue";
import { useToast } from "primevue/usetoast";

const complaintStore = useComplaintStore();
const { complaint } = storeToRefs(complaintStore);
const { comentById } = storeToRefs(complaintStore);

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

const getComplaintActiveList = async () => {
  tableLoading.value = true;
  await complaintStore.ComplaintActive(search.value, currentPage.value);
  tableLoading.value = false;
};

const getComments = async (id) => {
  loadSkleton.value = true;
  showComments.value = true;
  commentId.value = id;
  dataComment.value = await complaintStore.GetCommentById(id);
  loadSkleton.value = false;
};

/* const AddComment = async () => {
  loadingComment.value = true;
  const comment = reactive({
    message: "",
  });
  comment.message = comentById.value.employee_comment;
  const data = await complaintStore.AddComment(commentId.value, comment);
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
    getComplaintActiveList();
  }
}; */
const Serviced = async () => {
  loadingServiced.value = true;
  const comment = reactive({
    message: "",
  });
  comment.message = comentById.value.employee_comment;
  if (comentById.value.employee_comment) {
    const data = await complaintStore.Serviced(commentId.value, comment);
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
      comment.message = "";
      getComplaintActiveList();
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
  getComplaintActiveList();
});
</script>

<template>
  <DataTable :value="complaint.content" :loading="tableLoading">
    <template #empty>Ҳеч қандай маълумот топилмади</template>
    <template #header>
      <InputText
        v-model="search"
        placeholder="Қидириш"
        @input="getComplaintActiveList(search)"
      />
    </template>
    <Column field="id" header="ID" />
    <Column field="telegram_number" header="Мижоз рақами" />
    <Column field="user_id" header="Телеграм ID" />
    <Column field="name" header="Мижоз изохи">
      <template #body="slotProps">
        <p v-if="slotProps.data.name && slotProps.data.name.length > 20">
          {{ slotProps.data.name.substring(0, 20) }}<span>...</span>
        </p>
        <p v-else>{{ slotProps.data.name }}</p>
      </template>
    </Column>
    <Column field="created" header="Мурожаат тушган сана" />
    <Column field="complaintType" header="Холати">
      <template #body="slotProps">
        <Tag
          v-if="slotProps.data.complaintType == 'OFFER'"
          severity="success"
          class="p-2"
          style="font-size: 12px"
        >
          ТАКЛИФ
        </Tag>
        <Tag
          v-if="slotProps.data.complaintType == 'COMPLAINT'"
          severity="danger"
          class="p-2"
          style="font-size: 12px"
        >
          ШИКОЯТ
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
    v-on:update:first="getComplaintActiveList"
    :rows="1"
    :total-records="complaint.totalPages"
  >
    <template #start>
      <Button
        icon="pi pi-refresh"
        text
        rounded
        @click="getComplaintActiveList"
        v-tooltip="'Қайта юклаш'"
      />
    </template>
    <template #end>
      <div class="totalElements">
        <b>Элементлар сони: </b> {{ complaint.totalElements }}
      </div>
    </template>
  </Paginator>
  <Dialog
    v-model:visible="showComments"
    modal
    style="width: 40vw; max-height: 60vh"
    header="Изох"
  >
    <Skeleton v-if="loadSkleton" />
    <div v-if="!loadSkleton">
      <div class="my-2" style="text-align: justify">
        <b>Мижоз изохи: </b><span>{{ comentById.name }}</span>
      </div>
      <Textarea
        v-model="comentById.employee_comment"
        placeholder="Хабарингизни киритинг"
        rows="4"
        style="width: 100%"
      />
    </div>
    <template #footer>
      <div class="flex justify-content-end mt-4">
        <Button
          severity="success"
          label="Юбориш"
          :loading="loadingComment"
          @click="Serviced"
        />
      </div>
    </template>
  </Dialog>
</template>
