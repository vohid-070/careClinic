<script setup>
import { useHospitalStore } from "@/stores/hospital";
import { useMedicamentStore } from "@/stores/medicament";
import { storeToRefs } from "pinia";
import { useToast } from "primevue/usetoast";
import { ref, onMounted, reactive } from "vue";

const hospitalStore = useHospitalStore();
const medicamentStore = useMedicamentStore();
const { hospitalLive } = storeToRefs(hospitalStore);
const { medicamentList } = storeToRefs(medicamentStore);
const { hospital_detail } = storeToRefs(hospitalStore);
const { medicament } = storeToRefs(hospitalStore);

const toast = useToast();
const currentPage = ref(0);
const search = ref("");
const tableLoading = ref(false);
const show_comment = ref(false);
const show_enterComment = ref(false);
const show_exitComment = ref(false);
const commentData = ref();
const enterCommentData = ref();
const exitCommentData = ref();
const dataMedicament = ref();
const dataCreatedMedicament = ref();
const showDetailMedicament = ref(false);
const showCreateDialog = ref(false);
const medicamentId = ref(null);
const createLoading = ref(false);
const medicamentLoading = ref(false);
const commentDataLoading = ref(false);

const medicamentLists = reactive([{ medicament_id: null, count: 0 }]);

const enter_commentId = ref();
const exit_commentId = ref();

const getHospitalLive = async () => {
  tableLoading.value = true;
  const data = await hospitalStore.getHospitalLiveList(
    search.value,
    currentPage.value
  );
  if (data) tableLoading.value = false;
};
const getHospitalById = async (id) => {
  show_comment.value = true;
  commentDataLoading.value = true;
  commentData.value = await hospitalStore.hospitalDetail(id);
  commentDataLoading.value = false;
};
const enterCommentDialog = async (id) => {
  show_enterComment.value = true;
  enter_commentId.value = id;
  enterCommentData.value = await hospitalStore.hospitalDetail(id);
};
const enterComment = async () => {
  const enter_comment = reactive({
    comment: "",
  });
  enter_comment.comment = hospital_detail.value.object.enter_comment;
  const data = await hospitalStore.enterComment(
    enter_commentId.value,
    enter_comment
  );
  if (data.status == 200) {
    toast.add({
      severity: "success",
      summary: "Created",
      detail: "Муваффақиятли яборилди",
      group: "bc",
      life: 3000,
    });
    show_enterComment.value = false;
  }
};
const exitCommentDialog = async (id) => {
  show_exitComment.value = true;
  exit_commentId.value = id;
  exitCommentData.value = await hospitalStore.hospitalDetail(id);
};
const exitComment = async () => {
  const exit_comment = reactive({
    comment: "",
  });
  exit_comment.comment = hospital_detail.value.object.exit_comment;
  const data = await hospitalStore.exitComment(
    exit_commentId.value,
    exit_comment
  );
  if (data.status == 200) {
    toast.add({
      severity: "success",
      summary: "Created",
      detail: "Муваффақиятли яборилди",
      group: "bc",
      life: 3000,
    });
    show_exitComment.value = false;
  }
};
const detailMedicament = async (id) => {
  showDetailMedicament.value = true;
  medicamentLoading.value = true;
  dataMedicament.value = await hospitalStore.detailMedicament(id);
  medicamentLoading.value = false;
};

const showCreateMedicament = async (id) => {
  showCreateDialog.value = true;
  medicamentId.value = id;
};
const createMedicament = async () => {
  try {
    createLoading.value = true;
    dataCreatedMedicament.value = await hospitalStore.addMedicament(
      medicamentId.value,
      medicamentLists
    );
    if (dataCreatedMedicament.value.status == 201) {
      toast.add({
        severity: "success",
        summary: "Created",
        detail: "Муваффақиятли қўшилди",
        group: "bc",
        life: 3000,
      });
      showCreateDialog.value = false;
      createLoading.value = false;
      medicamentLists.length = 1;
      medicamentLists[0].medicament_id = null;
      medicamentLists[0].count = 0;
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: dataCreatedMedicament.value.response.data.object.error_message,
        group: "bc",
        life: 3000,
      });
    }
  } catch (error) {
    return error;
  } finally {
    createLoading.value = false;
  }
};

const addMedicament = () => {
  medicamentLists.push({ medicament_id: null, count: 0 });
};
const removeMedicament = (index) => {
  medicamentLists.splice(index, 1);
};
const getMedicamentList = async (param) => {
  await medicamentStore.getMedicamentList(param);
};

onMounted(() => {
  getHospitalLive();
});
</script>

<template>
  <div>
    <DataTable :value="hospitalLive.content" lazy :loading="tableLoading">
      <template #empty>Ҳеч қандай маълумот топилмади</template>
      <template #header>
        <InputText
          v-model="search"
          placeholder="Қидириш"
          @input="getHospitalLive(search)"
        />
      </template>
      <Column field="id" header="ID" />
      <Column field="patient.name" header="Бемор исми" />
      <Column field="patient.surname" header="Бемор фамилияси" />
      <Column field="bed.name" header="Койка" />
      <Column field="bed.cabinet.name" header="Палата" />
      <Column field="enter" header="Кирган вақти" />
      <Column field="view" style="width: 10%">
        <template #header>
          <div class="mx-auto">
            <i class="pi pi-ellipsis-v"></i>
          </div>
        </template>
        <template #body="slotProps">
          <div class="flex gap-2 justify-content-center">
            <Button
              :modelValue="slotProps.view"
              icon="pi pi-plus"
              v-tooltip.top="'Дори қўшиш'"
              class="p-2"
              outlined
              @click="showCreateMedicament(slotProps.data.id)"
              style="color: var(--indigo-500)"
            />
            <Button
              :modelValue="slotProps.view"
              icon="pi pi-list"
              v-tooltip.top="'Дорилар рўйхати'"
              class="p-2"
              outlined
              @click="detailMedicament(slotProps.data.id)"
              style="color: var(--orange-500)"
            />
            <Button
              :modelValue="slotProps.view"
              icon="pi pi-sign-in"
              v-tooltip.top="'Бошланғич хулоса'"
              class="p-2"
              outlined
              severity="success"
              @click="enterCommentDialog(slotProps.data.id)"
            />
            <Button
              class="p-2"
              severity="danger"
              icon="pi pi-sign-out"
              v-tooltip.top="'Сўнги хулоса'"
              outlined
              @click="exitCommentDialog(slotProps.data.id)"
            />
            <Button
              class="p-2"
              severity="primary"
              icon="pi pi-eye"
              v-tooltip.top="'Хулосаларни кўриш'"
              outlined
              @click="getHospitalById(slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <Paginator
      v-model:first="currentPage"
      v-on:update:first="getHospitalLive"
      :rows="1"
      :total-records="hospitalLive.totalPages"
    >
      <template #start></template>
      <template #end>
        <div class="totalElements">
          <b>Элементлар сони: </b> {{ hospitalLive.totalElements }}
        </div>
      </template>
    </Paginator>
    <Dialog
      v-if="commentData"
      v-model:visible="show_comment"
      modal
      style="width: 40vw; max-height: 90vh"
      header="Хулосалар"
    >
      <div v-if="!commentDataLoading" class="flex flex-column gap-3">
        <div style="text-align: justify; font-size: 16px">
          <b>Бошланғич хулоса: </b>
          <span> {{ hospital_detail.object.enter_comment }}</span>
        </div>
        <div style="text-align: justify; font-size: 16px">
          <b>Сўнги хулоса: </b>
          <span>
            {{ hospital_detail.object.exit_comment }}
          </span>
        </div>
      </div>
      <div v-if="commentDataLoading" class="flex flex-column gap-3">
        <Skeleton />
        <Skeleton />
      </div>
    </Dialog>

    <Dialog
      v-if="enterCommentData"
      v-model:visible="show_enterComment"
      modal
      header="Бошланғич хулоса"
      style="width: 50vw"
    >
      <div>
        <Textarea
          v-model="hospital_detail.object.enter_comment"
          placeholder="Комент"
          rows="6"
          class="mb-4"
          style="width: 100%"
        />
      </div>
      <div class="flex justify-content-end">
        <Button label="Юбориш" @click="enterComment" />
      </div>
    </Dialog>

    <Dialog
      v-if="exitCommentData"
      v-model:visible="show_exitComment"
      modal
      header="Сўнги хулоса"
      style="width: 50vw"
    >
      <div>
        <Textarea
          v-model="hospital_detail.object.exit_comment"
          placeholder="Комент"
          rows="6"
          class="mb-4"
          style="width: 100%"
        />
      </div>
      <div class="flex justify-content-end">
        <Button label="Юбориш" @click="exitComment" />
      </div>
    </Dialog>

    <Dialog
      v-if="dataMedicament"
      v-model:visible="showDetailMedicament"
      modal
      header="Дорилрар рўйхати"
      style="width: 35vw; max-height: 71vh"
    >
      <DataTable
        :value="medicament.medicaments"
        paginator
        :rows="10"
        :loading="medicamentLoading"
      >
        <template #empty>Ҳеч қандай маълумот топилмади</template>
        <Column field="name" header="Дори номи" />
        <Column field="category.name" header="Категория" />
        <Column field="created" header="Қўшилган вақти" />
      </DataTable>
    </Dialog>

    <Dialog
      v-model:visible="showCreateDialog"
      modal
      header="Дори дармон қўшиш"
      style="width: 41vw; max-height: 90vh"
    >
      <div
        class="flex gap-4 my-2"
        v-for="(medicament, index) in medicamentLists"
        :key="medicament.id"
      >
        <Dropdown
          v-model="medicament.medicament_id"
          :options="medicamentList"
          placeholder="Дорилар"
          optionLabel="name"
          option-value="id"
          showClear
          editable
          style="width: 300px"
          @input="getMedicamentList(medicament.medicament_id)"
        />
        <InputNumber
          v-model="medicament.count"
          buttonLayout="horizontal"
          showButtons
          :min="0"
          placeholder="Сони"
          style="width: 300px"
        />
        <div class="flex gap-2 pl-2">
          <Button
            v-if="medicamentLists.length == index + 1"
            outlined
            rounded
            icon="pi pi-plus"
            severity="success"
            @click="addMedicament"
          />
          <Button
            v-if="medicamentLists.length > 1"
            outlined
            rounded
            icon="pi pi-times"
            severity="danger"
            @click="removeMedicament(index)"
          />
        </div>
      </div>

      <div class="flex justify-content-end mt-4">
        <Button
          label="Яратиш"
          :loading="createLoading"
          @click="createMedicament"
        />
      </div>
    </Dialog>
  </div>
</template>
