<script setup>
import { reactive, onMounted, ref } from "vue";
import { useMonitoringStore } from "@/stores/monitoring";
import { storeToRefs } from "pinia";

const monitoringStore = useMonitoringStore();
const { countSum } = storeToRefs(monitoringStore);
const { speciality } = storeToRefs(monitoringStore);
const { doctor } = storeToRefs(monitoringStore);
const { externalDoctor } = storeToRefs(monitoringStore);
const { ratingResult } = storeToRefs(monitoringStore);
const { percentMaleFemale } = storeToRefs(monitoringStore);
const { ratingPatient } = storeToRefs(monitoringStore);
const { ratingTransferCount } = storeToRefs(monitoringStore);
const { ratingTransfer } = storeToRefs(monitoringStore);
const { countPeople } = storeToRefs(monitoringStore);
const { ratingForm } = storeToRefs(monitoringStore);
const { countHospitalPatient } = storeToRefs(monitoringStore);
const { sumDaily } = storeToRefs(monitoringStore);
const { ratingHospital } = storeToRefs(monitoringStore);
const dataSum = reactive({ value: null });
const dataSpeciality = reactive({ value: null });
const dataDoctor = reactive({ value: null });
const dataExternalDoctor = reactive({ value: null });
const dataRatingResult = reactive({ value: null });
const dataPercentMale = reactive({ value: null });
const dataRatingPatient = reactive({ value: null });
const dataRatingTransferCount = reactive({ value: null });
const dataRatingTransfer = reactive({ value: null });
const dataCountPeople = reactive({ value: null });
const dataForm = reactive({ value: null });
const dataCountPatient = reactive({ value: null });
const dataSumDaily = reactive({ value: null });
const dataRatingHospital = reactive({ value: null });
const loading = ref(false);
const loadingExcel = ref(false);
const tableLoading = ref(false);

const currentDate = reactive({
  startDate: "",
  finishDate: "",
});

const chartOptions = ref({
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Беморлар сони",
      data: [],
      backgroundColor: [
        "rgba(255, 159, 64, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(44, 162, 235, 0.2)",
        "rgba(14, 12, 235, 0.2)",
        "rgba(202, 182, 15, 0.2)",
      ],
      borderColor: [
        "rgb(255, 159, 64)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(14, 12, 235)",
        "rgb(202, 182, 15)",
      ],
      borderWidth: 1,
    },
  ],
});

const getSum = async () => {
  loading.value = true;
  dataSum.value = await monitoringStore.getSummCount(currentDate);
  if (dataSum.value) loading.value = false;
};
const getRatingSpeciality = async () => {
  try {
    loading.value = true;
    dataSpeciality.value = await monitoringStore.getRatingSpeciality(
      currentDate
    );
    if (dataSpeciality.value && speciality.value !== "No value present") {
      speciality.value.ratingInfoList.forEach((element, index) => {
        chartData.value.labels[index] = element.name;
        chartData.value.datasets[0].data[index] = element.count;
        loading.value = false;
      });
    }
  } catch (error) {
    return error;
  }
};

const getRatingDoctor = async () => {
  loading.value = true;
  dataDoctor.value = await monitoringStore.getRatingDoctor(currentDate);
  if (dataDoctor.value) loading.value = false;
};
const getRatingExternalDoctor = async () => {
  loading.value = true;
  dataExternalDoctor.value = await monitoringStore.getRatingExternalDoctor(
    currentDate
  );
  if (dataExternalDoctor.value) loading.value = false;
};
const getRatingResult = async () => {
  loading.value = true;
  dataRatingResult.value = await monitoringStore.getRatingResult(currentDate);
  if (dataRatingResult.value) loading.value = false;
};
const getPercentMale = async () => {
  try {
    loading.value = true;
    dataPercentMale.value = await monitoringStore.getPercentMaleFemale(
      currentDate
    );
    if (dataPercentMale.value !== null && percentMaleFemale.value !== null) {
      chartData2.value.datasets[0].data[0] =
        percentMaleFemale.value.male_percent;
      chartData2.value.datasets[0].data[1] =
        percentMaleFemale.value.female_percent;
      loading.value = false;
    }
  } catch (error) {
    return error;
  }
};
const getRatingTransferCount = async () => {
  loading.value = true;
  dataRatingTransferCount.value = await monitoringStore.getRatingTransferCount(
    currentDate
  );
  chartData3.value.datasets[0].data[0] =
    ratingTransferCount.value[0].servicedCount;
  chartData3.value.datasets[0].data[1] =
    ratingTransferCount.value[0].notServicedCount;
  chartData4.value.datasets[0].data[0] =
    ratingTransferCount.value[1].servicedCount;
  chartData4.value.datasets[0].data[1] =
    ratingTransferCount.value[1].notServicedCount;
  if (dataRatingTransferCount.value) loading.value = false;
};

const chartData2 = ref();
const chartOptions2 = ref({
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  },
});

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: ["Эркак", "Аёл"],
    datasets: [
      {
        data: [],
        backgroundColor: [
          documentStyle.getPropertyValue("--blue-500"),
          documentStyle.getPropertyValue("--yellow-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--blue-400"),
          documentStyle.getPropertyValue("--yellow-400"),
        ],
      },
    ],
  };
};

const chartData3 = ref();
const chartOptions3 = ref({
  cutout: "70%",
});
const setChartData3 = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: ["Кўрилган", "Кўрилмаган"],
    datasets: [
      {
        data: [],
        backgroundColor: [
          documentStyle.getPropertyValue("--green-500"),
          documentStyle.getPropertyValue("--red-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--green-400"),
          documentStyle.getPropertyValue("--red-400"),
        ],
      },
    ],
  };
};

const chartData4 = ref();
const chartOptions4 = ref({
  cutout: "70%",
});
const setChartData4 = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: ["Кўрилган", "Кўрилмаган"],
    datasets: [
      {
        data: [],
        backgroundColor: [
          documentStyle.getPropertyValue("--green-500"),
          documentStyle.getPropertyValue("--red-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--green-400"),
          documentStyle.getPropertyValue("--red-400"),
        ],
      },
    ],
  };
};

const getRatingPatient = async () => {
  tableLoading.value = true;
  dataRatingPatient.value = await monitoringStore.getRatingPatient(currentDate);
  if (dataRatingPatient.value) tableLoading.value = false;
};
const getCountPeople = async () => {
  loading.value = true;
  dataCountPeople.value = await monitoringStore.getCountPeople(currentDate);
  if (dataCountPeople.value) loading.value = false;
};
const getRatingTransfer = async () => {
  loading.value = true;
  dataRatingTransfer.value = await monitoringStore.getRatingTransfer(
    currentDate
  );
  if (dataRatingTransfer.value) loading.value = false;
};
const getRatingForm = async () => {
  loading.value = true;
  dataForm.value = await monitoringStore.getRatingForm(currentDate);
  if (dataForm.value) loading.value = false;
};
const getCountPatient = async () => {
  loading.value = true;
  dataCountPatient.value = await monitoringStore.getCountPatient(currentDate);
  if (dataCountPatient.value) loading.value = false;
};
const getSumDaily = async () => {
  loading.value = true;
  dataSumDaily.value = await monitoringStore.getSumDaily(currentDate);
  if (dataSumDaily.value) loading.value = false;
};
const getRatingHospital = async () => {
  loading.value = true;
  dataRatingHospital.value = await monitoringStore.getRatingHospital(
    currentDate
  );
  if (dataRatingHospital) loading.value = false;
};

const getReportExcel = async () => {
  loadingExcel.value = true;
  const dataReport = await monitoringStore.getReport(currentDate);
  if (dataReport) {
    loadingExcel.value = false;
  }
  loadingExcel.value = false;
};

const currentPage = ref(0);
const search = ref("");

const cancel = () => {
  currentDate.startDate = "";
  currentDate.finishDate = "";
};
const submit = async () => {
  getSum();
  getRatingSpeciality();
  chartData.value.labels = [];
  chartData.value.datasets[0].data = [];
  getRatingDoctor();
  getRatingExternalDoctor();
  getRatingResult();
  getPercentMale();
  getRatingPatient();
  getRatingTransferCount();
  getCountPeople();
  getRatingTransfer();
  getRatingForm();
  getCountPatient();
  getSumDaily();
  getRatingHospital();
};

onMounted(() => {
  getSum();
  getRatingSpeciality();
  getRatingDoctor();
  getRatingExternalDoctor();
  getRatingResult();
  getPercentMale();
  chartData2.value = setChartData();
  getRatingPatient();
  getRatingTransferCount();
  chartData3.value = setChartData3();
  chartData4.value = setChartData4();
  getCountPeople();
  getRatingTransfer();
  getRatingForm();
  getCountPatient();
  getSumDaily();
  getRatingHospital();
});
</script>

<template>
  <div>
    <form ref="form" @submit.prevent="submit">
      <div class="card flex gap-4">
        <Calendar
          v-model="currentDate.startDate"
          dateFormat="dd-mm-yy"
          placeholder="Бошланиш вақти"
        />
        <Calendar
          v-model="currentDate.finishDate"
          dateFormat="dd-mm-yy"
          placeholder="Тугаш вақти"
        />
        <Button icon="pi pi-calendar" type="submit" />
        <Button icon="pi pi-calendar-times" severity="danger" @click="cancel" />
        <Button
          icon="pi pi-file-excel"
          :loading="loadingExcel"
          label="excel"
          severity="success"
          @click="getReportExcel"
        />
      </div>
    </form>

    <ProgressBar v-if="loading" mode="indeterminate" style="height: 6px" />
    <div class="flex mt-4 gap-4" width="100vw" style="height: 420px">
      <div v-if="!dataSum.value" class="card" style="width: 25%; height: 100%">
        <Skeleton style="width: 100%; height: 100%" />
      </div>
      <div
        v-if="dataSum.value"
        class="flex flex-column"
        style="width: 25%; height: 420px"
      >
        <div class="card" style="height: 50%">
          <h4 style="font-weight: bold">Умумий Сумма:</h4>
          <h2 style="color: var(--cyan-600)">{{ countSum.sum }} сўм</h2>
        </div>
        <div class="card" style="height: 50%">
          <h4 style="font-weight: bold">Мурожаатлар сони:</h4>
          <h2 style="color: var(--orange-500)">{{ countSum.count }} та</h2>
        </div>
      </div>
      <!-- -- -->
      <div
        v-if="!dataSpeciality.value"
        class="card"
        style="width: 50%; height: 100%"
      >
        <Skeleton style="width: 100%; height: 100%" />
      </div>
      <div
        v-if="dataSpeciality.value"
        class="card"
        style="width: 50%; height: 100%"
      >
        <Chart
          v-if="dataSpeciality.value && speciality.value != 'No value present'"
          type="bar"
          :data="chartData"
          :options="chartOptions"
          style="width: 93%"
        />
        <h5
          v-if="speciality.value == 'No value present' || !dataSpeciality.value"
          class="text-center"
        >
          Маълумот топилмади
        </h5>
      </div>
      <!-- -- -->
      <div
        v-if="!dataDoctor.value"
        class="card"
        style="width: 25%; height: 100%"
      >
        <Skeleton style="width: 100%; height: 100%" />
      </div>
      <div
        v-if="dataDoctor.value"
        class="card"
        style="width: 25%; height: 100%"
      >
        <ScrollPanel style="width: 100%; height: 100%">
          <h4 class="text-center" style="font-weight: bold">Топ 5 врачлар:</h4>
          <div
            v-for="(doctorRating, index) in doctor.ratingInfoList"
            :key="doctorRating.id"
          >
            <div style="font-size: 16px">
              <span>
                {{ index + 1 }}. {{ doctorRating.name }} -
                {{ doctorRating.count }} та</span
              >
            </div>
            <ProgressBar
              class="mb-2"
              :value="(doctorRating.count * 100) / doctor.count.toFixed(2)"
            >
              {{}}</ProgressBar
            >
          </div>
          <h5 v-if="doctor == 'No value present'" class="text-center">
            Маълумот топилмади
          </h5>
        </ScrollPanel>
      </div>
    </div>

    <div class="flex mt-4 gap-4" width="100vw" style="height: 420px">
      <div
        v-if="!dataExternalDoctor.value"
        class="card"
        style="width: 25%; height: 100%"
      >
        <Skeleton style="width: 100%; height: 100%" />
      </div>
      <div
        v-if="dataExternalDoctor.value"
        class="card"
        style="width: 25%; height: 100%"
      >
        <ScrollPanel style="width: 100%; height: 100%">
          <h4 class="text-center" style="font-weight: bold">
            Топ 5 ҳамкор врачлар:
          </h4>
          <div
            v-for="(doctorRating, index) in externalDoctor.ratingInfoList"
            :key="doctorRating.id"
          >
            <span style="font-size: 16px"
              >{{ index + 1 }}. {{ doctorRating.name }} -
              {{ doctorRating.count }} та</span
            >
            <ProgressBar
              class="mb-2"
              :value="
                (doctorRating.count * 100) / externalDoctor.count.toFixed(2)
              "
            >
              {{}}
            </ProgressBar>
          </div>
          <h5 v-if="externalDoctor == 'No value present'" class="text-center">
            Маълумот топилмади
          </h5>
        </ScrollPanel>
      </div>

      <!-- ---------------------------- -->
      <div class="card" style="width: 50%; height: 420px">
        <ScrollPanel class="custombar2" style="width: 100%; height: 100%">
          <DataTable :value="ratingPatient" lazy :loading="tableLoading">
            <template #empty>Ҳеч қандай маълумот топилмади</template>
            <template #header>Беморлар рейтинги</template>
            <Column field="id" header="ID" />
            <Column field="name" header="Исми" />
            <Column field="surname" header="Фамилияси" />
            <Column field="phone" header="Телефон рақами" />
            <Column field="count" header="Учрашувлар" />
          </DataTable>
        </ScrollPanel>
      </div>
      <!-- ---------------------------- -->

      <div
        v-if="!dataPercentMale.value"
        class="card"
        style="width: 25%; height: 100%"
      >
        <Skeleton style="width: 100%; height: 100%" />
      </div>
      <div
        v-if="dataPercentMale.value !== null"
        class="card"
        style="width: 25%; height: 100%"
      >
        <h4 class="text-center" style="font-weight: bold">
          Еркак ва аёл беморлар
        </h4>
        <div v-if="percentMaleFemale">
          <div class="flex justify-content-center">
            <Chart
              type="pie"
              :data="chartData2"
              :options="chartOptions2"
              style="width: 83%"
            />
          </div>

          <div class="flex justify-content-between">
            <div v-if="percentMaleFemale.male_percent != 0">
              Эркаклар -
              {{
                (
                  (percentMaleFemale.male_percent * 100) /
                  (percentMaleFemale.female_percent +
                    percentMaleFemale.male_percent)
                ).toFixed(1)
              }}%
            </div>
            <div v-if="percentMaleFemale.female_percent != 0">
              Аёллар -
              {{
                (
                  (percentMaleFemale.female_percent * 100) /
                  (percentMaleFemale.female_percent +
                    percentMaleFemale.male_percent)
                ).toFixed(1)
              }}%
            </div>
            <div v-if="percentMaleFemale.male_percent == 0">Эркаклар - 0</div>
            <div v-if="percentMaleFemale.female_percent == 0">Аёллар - 0</div>
          </div>
        </div>

        <h5 v-if="!percentMaleFemale" class="text-center">
          Маълумот топилмади
        </h5>
      </div>
    </div>

    <div class="flex mt-4 gap-4" width="100vw" style="height: 420px">
      <div
        v-if="!dataRatingResult.value"
        class="card"
        style="width: 25%; height: 100%"
      >
        <Skeleton style="width: 100%; height: 100%" />
      </div>
      <div
        v-if="dataRatingResult.value"
        class="card"
        style="width: 25%; height: 100%"
      >
        <ScrollPanel style="width: 100%; height: 100%">
          <h4 class="text-center" style="font-weight: bold">
            Йўналиш бўйича натижалар:
          </h4>
          <div
            v-for="(rating, index) in ratingResult.ratingInfoList"
            :key="rating.id"
          >
            <span style="font-size: 16px"
              >{{ index + 1 }}. {{ rating.name }} - {{ rating.count }} та</span
            >
            <ProgressBar
              class="mb-2"
              :value="(rating.count * 100) / ratingResult.count.toFixed(2)"
            >
              {{}}</ProgressBar
            >
          </div>
          <h5 v-if="ratingResult.count == 0" class="text-center">
            Маълумот топилмади
          </h5>
        </ScrollPanel>
      </div>

      <!-- -- -->
      <div
        v-if="!dataRatingTransferCount.value"
        class="card"
        style="width: 50%; height: 100%"
      >
        <Skeleton style="height: 100%" />
      </div>
      <div
        v-if="dataRatingTransferCount.value"
        class="card flex justify-content-between"
        style="width: 50%; height: 100%"
      >
        <div style="width: 50%">
          <h4 class="text-center" style="font-weight: bold">Нақд ёки карта</h4>
          <p
            v-if="
              chartData4.datasets[0].data[0] == 0 &&
              chartData4.datasets[0].data[1] == 0
            "
            class="text-center"
          >
            Кўрилганлар - 0 та
          </p>
          <p
            v-if="
              chartData4.datasets[0].data[0] == 0 &&
              chartData4.datasets[0].data[1] == 0
            "
            class="text-center"
          >
            Кўрилмаганлар - 0 та
          </p>
          <Chart
            v-if="
              chartData4.datasets[0].data[0] > 0 ||
              chartData4.datasets[0].data[1] > 0
            "
            type="doughnut"
            :data="chartData4"
            :options="chartOptions4"
            class="mx-auto"
            style="width: 80%"
          />
        </div>
        <!-- - -->

        <div style="width: 50%">
          <h4 class="text-center" style="font-weight: bold">Перечисление</h4>
          <p
            v-if="
              chartData3.datasets[0].data[0] == 0 &&
              chartData3.datasets[0].data[1] == 0
            "
            class="text-center"
          >
            Кўрилганлар - 0 та
          </p>
          <p
            v-if="
              chartData3.datasets[0].data[0] == 0 &&
              chartData3.datasets[0].data[1] == 0
            "
            class="text-center"
          >
            Кўрилмаганлар - 0 та
          </p>
          <Chart
            v-if="
              chartData3.datasets[0].data[0] != 0 ||
              chartData3.datasets[0].data[1] != 0
            "
            type="doughnut"
            :data="chartData3"
            :options="chartOptions3"
            class="mx-auto"
            style="width: 80%"
          />
        </div>
      </div>
      <!-- -- -->
      <div
        v-if="!dataCountPeople.value"
        class="card"
        style="width: 25%; height: 100%"
      >
        <Skeleton style="width: 100%; height: 100%" />
      </div>
      <div
        v-if="dataCountPeople.value"
        class="card"
        style="width: 25%; height: 100%"
      >
        <h4 class="text-center" style="font-weight: bold">Одамлар сони:</h4>
        <p style="font-size: 18px; color: var(--blue-500)">
          Беморлар: {{ countPeople.patient_count }} та
        </p>
        <p style="font-size: 18px; color: var(--red-500)">
          Докторлар: {{ countPeople.employee_count }} та
        </p>
        <p style="font-size: 18px; color: var(--purple-500)">
          Ҳамкор докторлар: {{ countPeople.external_count }} та
        </p>
      </div>
    </div>

    <!-- ----------------------------------------- -->
    <div class="flex mt-4 gap-4" width="100vw" style="height: 420px">
      <div
        v-if="!dataRatingTransfer.value"
        class="card"
        style="width: 25%; height: 100%"
      >
        <Skeleton style="height: 100%" />
      </div>
      <div
        v-if="dataRatingTransfer.value"
        class="card"
        style="width: 25%; height: 100%"
      >
        <ScrollPanel style="width: 100%; height: 100%">
          <h4 class="text-center" style="font-weight: bold">Шартномалар:</h4>
          <p class="text-center" v-if="ratingTransfer.length == 0">
            Маълумот топилмади
          </p>
          <div v-for="(transfer, index) in ratingTransfer" :key="transfer.id">
            <span style="font-size: 16px"
              >{{ index + 1 }}. {{ transfer.name }} -
              {{ transfer.count }} та</span
            >
            <ProgressBar
              class="mb-2"
              :value="
                (transfer.count * 100) / ratingTransfer[0].count.toFixed(2)
              "
            >
              {{}}</ProgressBar
            >
          </div>
        </ScrollPanel>
      </div>

      <!-- -- -->

      <div v-if="!dataForm.value" class="card" style="width: 25%; height: 100%">
        <Skeleton style="height: 100%" />
      </div>
      <div v-if="dataForm.value" class="card" style="width: 25%; height: 100%">
        <ScrollPanel style="width: 100%; height: 100%">
          <h4 class="text-center" style="font-weight: bold">Формалар:</h4>
          <p class="text-center" v-if="ratingForm.ratingInfoList.length == 0">
            Маълумот топилмади
          </p>
          <div
            v-for="(form, index) in ratingForm.ratingInfoList"
            :key="form.id"
            style="font-size: 16px"
          >
            <span>{{ index + 1 }}. {{ form.name }} - {{ form.count }} та</span>
            <ProgressBar
              class="mb-2"
              :value="
                (form.count * 100) /
                ratingForm.ratingInfoList[0].count.toFixed(2)
              "
            >
              {{}}</ProgressBar
            >
          </div>
        </ScrollPanel>
      </div>

      <!-- -- -->

      <div class="flex flex-column" style="width: 25%; height: 420px">
        <div v-if="!dataCountPatient.value" class="card" style="height: 50%">
          <Skeleton style="height: 100%" />
        </div>
        <div v-if="!dataSumDaily.value" class="card" style="height: 50%">
          <Skeleton style="height: 100%" />
        </div>
        <div v-if="dataCountPatient.value" class="card" style="height: 50%">
          <h4 style="font-weight: bold">Даволанганлар:</h4>
          <h2 style="color: var(--indigo-600)">
            {{ countHospitalPatient }} та
          </h2>
        </div>
        <div v-if="dataSumDaily.value" class="card" style="height: 50%">
          <h4 style="font-weight: bold">Стационар тушум:</h4>
          <h2 style="color: var(--green-500)">{{ sumDaily }} сўм</h2>
        </div>
      </div>

      <!-- -- -->

      <div
        v-if="!dataRatingHospital.value"
        class="card"
        style="width: 25%; height: 100%"
      >
        <Skeleton style="height: 100%" />
      </div>
      <div
        v-if="dataRatingHospital.value"
        class="card"
        style="width: 25%; height: 100%"
      >
        <ScrollPanel style="width: 100%; height: 100%">
          <h4 class="text-center" style="font-weight: bold">
            Топ 5 стационар:
          </h4>
          <div
            v-for="(item, index) in ratingHospital"
            :key="item.id"
            style="font-size: 16px"
          >
            <span
              >{{ index + 1 }}. {{ item.name }} {{ item.surname }} -
              {{ item.hours }} соат</span
            >
            <ProgressBar
              class="mb-2"
              :value="(item.hours * 100) / ratingHospital[0].hours.toFixed(2)"
              >{{}}</ProgressBar
            >
          </div>
          <h5 v-if="ratingHospital.length == 0" class="text-center">
            Маълумот топилмади
          </h5>
        </ScrollPanel>
      </div>
    </div>
  </div>
</template>
<style scoped>
::v-deep(.p-scrollpanel.custombar2 .p-scrollpanel-wrapper) {
  border-right: 10px solid var(--surface-ground);
}

::v-deep(.p-scrollpanel.custombar2 .p-scrollpanel-bar) {
  background-color: var(--primary-300);
  opacity: 1;
  transition: background-color 0.3s;
}

::v-deep(.p-scrollpanel.custombar2 .p-scrollpanel-bar:hover) {
  background-color: var(--primary-400);
}
</style>
