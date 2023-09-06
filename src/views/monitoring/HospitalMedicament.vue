<script setup>
import { useHospitalStore } from "@/stores/hospital";
import { storeToRefs } from "pinia";
import { ref, onMounted, reactive } from "vue";

const hospitalStore = useHospitalStore();
const { hospitalMedicament } = storeToRefs(hospitalStore);
const { hospitalMedicamentDetail } = storeToRefs(hospitalStore);

const currentPage = ref(0);
const currentPageDetail = ref(0);
const search = ref("");
const tableLoading = ref(false);
const tableLoadingDetail = ref(false);
const itemId = ref(null);
const showDialog = ref(false);
const currentDate = reactive({
  start: "",
  end: "",
});

const getHospitalMonitoringList = async () => {
  tableLoading.value = true;
  await hospitalStore.getHospitalMedicament(
    currentDate,
    search.value,
    currentPage.value
  );
  tableLoading.value = false;
};
const cancel = () => {
  currentDate.start = "";
  currentDate.end = "";
};
const submit = async () => {
  getHospitalMonitoringList();
};

const showDetail = (id) => {
  showDialog.value = true;
  itemId.value = id;
  getHospitalMedicamentDetail();
};

const getHospitalMedicamentDetail = async () => {
  tableLoadingDetail.value = true;
  await hospitalStore.getHospitalMedicamentDetail(
    currentDate,
    itemId.value,
    currentPageDetail.value
  );
  tableLoadingDetail.value = false;
};

onMounted(() => {
  getHospitalMonitoringList();
});
</script>

<template>
  <form ref="form" @submit.prevent="submit">
    <div class="card flex gap-4">
      <Calendar
        v-model="currentDate.start"
        dateFormat="dd-mm-yy"
        placeholder="Бошланиш вақти"
      />
      <Calendar
        v-model="currentDate.end"
        dateFormat="dd-mm-yy"
        placeholder="Тугаш вақти"
      />
      <Button icon="pi pi-calendar" type="submit" />
      <Button icon="pi pi-calendar-times" severity="danger" @click="cancel" />
    </div>
  </form>
  <DataTable
    :value="hospitalMedicament.content"
    :loading="tableLoading"
    class="card p-2 mt-4"
  >
    <template #empty>Ҳеч қандай маълумот топилмади</template>
    <template #header>
      <div class="flex gap-3">
        <InputText
          v-model="search"
          placeholder="Қидириш"
          style="width: 300px"
        />
        <Button
          outlined
          rounded
          icon="pi pi-search"
          @click="getHospitalMonitoringList(search)"
        />
      </div>
    </template>
    <Column field="id" header="ID" />
    <Column field="name" header="Дори номи" />
    <Column field="category.name" header="Категория" />
    <Column field="description" header="Тавсифи" />
    <Column field="count" header="Ишлатилган сони" />
    <Column>
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
            icon="pi pi-eye"
            @click="showDetail(slotProps.data.id)"
          />
        </div>
      </template>
    </Column>
    <template #footer>
      <Paginator
        v-model:first="currentPage"
        v-on:update:first="getHospitalMonitoringList"
        :rows="1"
        :total-records="hospitalMedicament.totalPages"
      >
        <template #start></template>
        <template #end>
          <div class="totalElements">
            <b>Элементлар сони: </b> {{ hospitalMedicament.totalElements }}
          </div>
        </template>
      </Paginator>
    </template>
  </DataTable>
  <Dialog v-model:visible="showDialog" modal header=" " style="width: 60vw">
    <DataTable
      :value="hospitalMedicamentDetail.content"
      :loading="tableLoadingDetail"
    >
      <Column field="patient_id" header="ID" />
      <Column field="patient_full_name" header="Бемор ФИО" />
      <Column field="bed_name" header="Койка" />
      <Column field="cabinet_name" header="Палата" />
      <Column field="created" header="Яратилган вақти" />
    </DataTable>
    <template #footer>
      <Paginator
        v-model:first="currentPageDetail"
        v-on:update:first="getHospitalMedicamentDetail"
        :rows="1"
        :total-records="hospitalMedicamentDetail.totalPages"
      >
        <template #start></template>
        <template #end>
          <div class="totalElements">
            <b>Элементлар сони: </b>
            {{ hospitalMedicamentDetail.totalElements }}
          </div>
        </template>
      </Paginator>
    </template>
  </Dialog>
</template>
