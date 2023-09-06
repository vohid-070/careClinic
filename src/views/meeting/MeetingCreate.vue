<script setup>
import { ref, onMounted, reactive } from "vue";
import { useMeetingStore } from "@/stores/meeting";
import { useSpecialityStore } from "@/stores/specialitiy";
import { useExternalEmployeeStore } from "@/stores/external";
import { storeToRefs } from "pinia";
import { useToast } from "primevue/usetoast";
import InspectionCreate from "./InspectionCreate.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  id: [Number],
});

const router = useRouter();
const meetingStore = useMeetingStore();
const specialityStore = useSpecialityStore();
const externalEmployeeStore = useExternalEmployeeStore();
const { speciality } = storeToRefs(specialityStore);
const { employeeList } = storeToRefs(externalEmployeeStore);
const toast = useToast();

const pageEmployee = ref(0);
const submitted = ref(false);
const loading = ref(false);
const check = reactive([
  { name: "Мед.Осмотр ", value: "inspection" },
  { name: "Оддий кўрик", value: "not_inspection" },
]);
const payType = reactive([
  { name: "НАҚД", value: "IN_PLACE_CASH" },
  { name: "КАРТА", value: "IN_PLACE_CARD" },
]);
const inspection = ref("inspection");
const notInspectionCredentials = reactive({
  speciality_id: 0,
  patient_id: props.id,
  pay_type: "",
  sum: null,
  cashed: false,
  external_employee_id: null,
});

const getSpecialityList = async () => {
  await specialityStore.specialityList();
};
const getExternalEmployee = async () => {
  await externalEmployeeStore.getEmployee(pageEmployee.value);
};

const createMeetingNotIns = async () => {
  submitted.value = true;
  if (
    notInspectionCredentials.pay_type &&
    notInspectionCredentials.speciality_id &&
    notInspectionCredentials.sum &&
    notInspectionCredentials.cashed
  ) {
    loading.value = true;
    const data = await meetingStore.createMeeting(notInspectionCredentials);
    if (data.message == "Created") {
      submitted.value = false;
      loading.value = false;
      notInspectionCredentials.speciality_id = 0;
      notInspectionCredentials.pay_type = 0;
      notInspectionCredentials.sum = null;
      notInspectionCredentials.cashed = false;
      notInspectionCredentials.external_employee_id = 0;

      toast.add({
        severity: "success",
        summary: "Created",
        detail: "Муваффақиятли яратилди",
        group: "bc",
        life: 3000,
      });
      router.push("/");
    }
  }
};

onMounted(() => {
  getSpecialityList();
  getExternalEmployee();
});
</script>

<template>
  <div class="card">
    <h3>Учрашув белгилаш</h3>
    <Dropdown
      v-model="inspection"
      :options="check"
      optionLabel="name"
      optionValue="value"
      class="mt-3`"
      style="width: 300px"
    />
    <Divider />
    <form
      @submit.prevent="createMeetingNotIns"
      v-if="inspection == 'not_inspection'"
    >
      <div class="mt-4 flex flex-wrap gap-4 align-items-top">
        <div class="flex flex-column">
          <Dropdown
            v-model="notInspectionCredentials.pay_type"
            :class="{
              'p-invalid': submitted && !notInspectionCredentials.pay_type,
            }"
            :options="payType"
            optionLabel="name"
            optionValue="value"
            placeholder="Тўлов турини танланг"
            style="width: 300px"
          />
          <small
            v-if="submitted && !notInspectionCredentials.pay_type"
            style="color: var(--red-500)"
            >Тўлов турини киритинг</small
          >
        </div>
        <div class="flex flex-column">
          <Dropdown
            v-model="notInspectionCredentials.speciality_id"
            :class="{
              'p-invalid': submitted && !notInspectionCredentials.speciality_id,
            }"
            :options="speciality"
            optionLabel="name"
            optionValue="id"
            placeholder="Мутахассисликни танланг"
            style="width: 300px"
          />

          <small
            v-if="submitted && !notInspectionCredentials.speciality_id"
            style="color: var(--red-500)"
            >Мутахассисликни киритинг</small
          >
        </div>
        <div class="flex flex-column">
          <Dropdown
            v-model="notInspectionCredentials.external_employee_id"
            :options="employeeList.object"
            optionLabel="fullName"
            optionValue="id"
            placeholder="Ҳамкор доктор"
            style="width: 300px"
          />
        </div>
        <div class="flex gap-3">
          <div class="flex flex-column">
            <InputNumber
              v-model="notInspectionCredentials.sum"
              locale="uz-UZ"
              placeholder="Тўлов суммаси"
              :class="{
                'p-invalid': submitted && !notInspectionCredentials.sum,
              }"
            />
            <small
              v-if="submitted && !notInspectionCredentials.sum"
              style="color: var(--red-500)"
              >Тўлов суммаси киритинг</small
            >
          </div>
          <Checkbox
            v-model="notInspectionCredentials.cashed"
            class="my-auto"
            :class="{
              'p-invalid': submitted && !notInspectionCredentials.cashed,
            }"
            :binary="true"
          />
        </div>
      </div>
      <div class="mt-4 flex justify-content-end">
        <Button label="Яратиш" type="submit" :loading="loading" />
      </div>
    </form>

    <div v-if="inspection == 'inspection'">
      <InspectionCreate :patient-id="props.id" />
    </div>
  </div>
</template>
