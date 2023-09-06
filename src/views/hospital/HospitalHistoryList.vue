<script setup>
import { useHospitalStore } from "@/stores/hospital";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const hospitalStore = useHospitalStore();
const { hospitalHistory } = storeToRefs(hospitalStore);
const { hospital_detail } = storeToRefs(hospitalStore);
const { medicament } = storeToRefs(hospitalStore);

const currentPage = ref(0);
const search = ref("");
const tableLoading = ref(false);
const showDetailMedicament = ref(false);
const dataMedicament = ref();
const commentData = ref();
const show_comment = ref(false);
const medicamentLoading = ref(false);
const commentDataLoading = ref(false);

const percentage = new Intl.NumberFormat("ru-Ru");

const getHospitalById = async (id) => {
  show_comment.value = true;
  commentDataLoading.value = true;
  commentData.value = await hospitalStore.hospitalDetail(id);
  commentDataLoading.value = false;
};
const detailMedicament = async (id) => {
  showDetailMedicament.value = true;
  medicamentLoading.value = true;
  dataMedicament.value = await hospitalStore.detailMedicament(id);
  medicamentLoading.value = false;
};
const getHospitalHistory = async () => {
  tableLoading.value = true;
  const data = await hospitalStore.getHospitalHistoryList(
    search.value,
    currentPage.value
  );
  if (data) tableLoading.value = false;
};
const getReport = async (id) => {
  tableLoading.value = true;
  await hospitalStore.getReport(id);
  tableLoading.value = false;
};

onMounted(() => {
  getHospitalHistory();
});
</script>

<template>
  <div>
    <!-- <ProgressBar v-if="loadingPdf" mode="indeterminate" style="height: 6px" /> -->
    <DataTable :value="hospitalHistory.content" lazy :loading="tableLoading">
      <template #empty>Ҳеч қандай маълумот топилмади</template>
      <template #header>
        <InputText
          v-model="search"
          placeholder="Қидириш"
          @input="getHospitalHistory(search)"
        />
      </template>
      <Column field="id" header="ID" />
      <Column field="patient.name" header="Бемор исми" />
      <Column field="patient.surname" header="Бемор фамилияси" />
      <Column field="bed.name" header="Койка" />
      <Column field="bed.cabinet.name" header="Палата" />
      <Column field="enter" header="Кирган вақти" />
      <Column field="exit" header="Чиқган вақти">
        <template #body="slotProps">
          <p v-if="slotProps.data.exit == null">-</p>
          <p v-if="slotProps.data.exit != null">{{ slotProps.data.exit }}</p>
        </template>
      </Column>
      <Column field="sum" header="Тўлов суммаси">
        <template #body="slotProps">
          <p v-if="slotProps.data.sum == null" style="color: var(--red-600)">
            0
          </p>
          <p v-if="slotProps.data.sum != null" style="color: var(--green-600)">
            {{ percentage.format(slotProps.data.sum) }}
          </p>
        </template>
      </Column>
      <Column field="type" header="Тури">
        <template #body="slotProps">
          <p v-if="slotProps.data.type == 'SIMPLE'">ОДДИЙ</p>
          <p v-if="slotProps.data.type == 'DE_LUX'">ЯРИМ ЛЮКС</p>
          <p v-if="slotProps.data.type == 'LUX'">ЛЮКС</p>
        </template>
      </Column>
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
              icon="pi pi-list"
              v-tooltip.top="'Дорилар рўйхати'"
              class="p-2"
              outlined
              @click="detailMedicament(slotProps.data.id)"
              style="color: var(--orange-500)"
            />
            <Button
              class="p-2"
              severity="primary"
              icon="pi pi-eye"
              v-tooltip.top="'Хулосаларни кўриш'"
              outlined
              @click="getHospitalById(slotProps.data.id)"
            />
            <Button
              class="p-2"
              severity="danger"
              icon="pi pi-file-pdf"
              :disabled="!slotProps.data.cashed"
              v-tooltip.top="'pdf юклаш'"
              outlined
              @click="getReport(slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <Paginator
      v-model:first="currentPage"
      v-on:update:first="getHospitalHistory"
      :rows="1"
      :total-records="hospitalHistory.totalPages"
    >
      <template #start></template>
      <template #end>
        <div class="totalElements">
          <b>Элементлар сони: </b> {{ hospitalHistory.totalElements }}
        </div>
      </template>
    </Paginator>
  </div>
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
</template>
