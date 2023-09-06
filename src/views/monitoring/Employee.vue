<script setup>
import { reactive, onMounted, ref } from "vue";
import { useMonitoringStore } from "@/stores/monitoring";
import { storeToRefs } from "pinia";

const monitoringStore = useMonitoringStore();

const { employees } = storeToRefs(monitoringStore);
const { employeeDetail } = storeToRefs(monitoringStore);

const dataEmployee = reactive({ value: null });
const employeeLoading = ref(false);

const currentDate = reactive({
  start: "",
  end: "",
});
const currentPage = ref(0);
const currentPageDetail = ref(0);
const search = ref("");
const employeeId = ref();
const employeeDetailData = ref();
const showDialog = ref(false);
const showSkleton = ref(false);
const tableLoading = ref(false);
const percentage = new Intl.NumberFormat("ru-Ru");

const getEmployee = async () => {
  employeeLoading.value = true;
  dataEmployee.value = await monitoringStore.getMonitoringEmployees(
    currentDate,
    search.value,
    currentPage.value
  );
  employeeLoading.value = false;
};
const cancel = () => {
  currentDate.start = "";
  currentDate.end = "";
};
const submit = async () => {
  getEmployee();
};
const getEmployeeDetail = async (id) => {
  employeeId.value = id;
  showDialog.value = true;
  showSkleton.value = true;
  tableLoading.value = true;
  employeeDetailData.value = await monitoringStore.getMonitoringEmployeeById(
    currentDate,
    employeeId.value,
    currentPageDetail.value
  );
  showSkleton.value = false;
  tableLoading.value = false;
};
const getEmployeeDetailWithPagination = async () => {
  tableLoading.value = true;
  employeeDetailData.value = await monitoringStore.getMonitoringEmployeeById(
    currentDate,
    employeeId.value,
    currentPageDetail.value
  );
  tableLoading.value = false;
};

onMounted(() => {
  getEmployee();
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
  <div class="grid">
    <div class="col-12">
      <div class="card my-4 p-2">
        <DataTable :value="employees.content" :loading="employeeLoading">
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
                @click="getEmployee(search)"
              />
            </div>
          </template>
          <Column field="id" header="ID" />
          <Column field="fullName" header="Ходим ФИО" />
          <Column field="speciality_name" header="Мутахассислиги" />
          <Column field="count" header="Мурожаатлар сони" />
          <Column field="sum" header="Сумма">
            <template #body="slotProps">
              {{ percentage.format(slotProps.data.sum) }}
            </template>
          </Column>
          <Column field="percent" header="Даромад фоизи">
            <template #body="slotProps">
              <p>{{ slotProps.data.percent }} %</p>
            </template>
          </Column>
          <Column header="Даромад суммаси">
            <template #body="slotProps">
              {{
                percentage.format(
                  (slotProps.data.sum * slotProps.data.percent) / 100
                )
              }}
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
                  size="small"
                  icon="pi pi-eye"
                  @click="getEmployeeDetail(slotProps.data.id)"
                />
              </div>
            </template>
          </Column>
          <template #footer>
            <Paginator
              v-model:first="currentPage"
              v-on:update:first="getEmployee"
              :rows="1"
              :total-records="employees.totalPages"
            >
              <template #start></template>
              <template #end>
                <div class="totalElements">
                  <b>Элементлар сони: </b> {{ employees.totalElements }}
                </div>
              </template>
            </Paginator>
          </template>
        </DataTable>
        <Dialog
          v-model:visible="showDialog"
          modal
          header=" "
          style="width: 70vw"
        >
          <Skeleton v-if="showSkleton"></Skeleton>
          <DataTable
            v-if="!showSkleton"
            :loading="tableLoading"
            :value="employeeDetail.content"
          >
            <template #empty>Ҳеч қандай маълумот топилмади</template>
            <Column field="patient_id" header="Бемор ID" />
            <Column field="fullName" header="Бемор ФИО" />
            <Column field="meeting_created" header="Мурожаат яратилган сана" />
            <Column field="meeting_serviced" header="Хизмат кўрсатилган сана" />
            <Column field="sum" header="Суммаси">
              <template #body="slotProps">
                <p>
                  {{ percentage.format(slotProps.data.sum) }}
                </p>
              </template>
            </Column>
            <Column field="status" header="Холати">
              <template #body="slotProps">
                <div v-if="slotProps.data.status == true">
                  <Tag severity="success" class="p-2" style="font-size: 14px">
                    Кўрилган
                  </Tag>
                </div>
                <div v-if="slotProps.data.status == false">
                  <Tag severity="danger" class="p-2" style="font-size: 14px">
                    Кўрилмаган
                  </Tag>
                </div>
              </template>
            </Column>
          </DataTable>
          <template #footer>
            <Paginator
              v-model:first="currentPageDetail"
              v-on:update:first="getEmployeeDetailWithPagination"
              :rows="1"
              :total-records="employeeDetail.totalPages"
            >
              <template #start></template>
              <template #end>
                <div class="totalElements">
                  <b>Элементлар сони: </b> {{ employeeDetail.totalElements }}
                </div>
              </template>
            </Paginator>
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>
