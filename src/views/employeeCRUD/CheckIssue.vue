<script setup>
import { useSpecialityStore } from "@/stores/specialitiy";
import { useEmployeeStore } from "@/stores/employee";
import { useQueueStore } from "@/stores/queue";
import { storeToRefs } from "pinia";
import { onMounted, ref, reactive } from "vue";
import Check from "@/components/base/Check.vue";
import { useToast } from "primevue/usetoast";

const specialityStore = useSpecialityStore();
const employeeStore = useEmployeeStore();
const queueStore = useQueueStore();
const { speciality } = storeToRefs(specialityStore);
const meeting = ref();
const toast = useToast();

const props = defineProps({
  id: [Number],
});

const meetingCredentials = reactive({
  speciality_id: null,
  employee_id: null,
  patient_id: props.id,
});

const loading = ref(false);

const getSpeciality = async () => {
  await specialityStore.specialityList();
};
const getEmployeeBySpeciality = async (id) => {
  await employeeStore.getEmployeeBySpeciality(id);
};

const addMeeting = async () => {
  loading.value = true;
  if (meetingCredentials.employee_id == null) {
    meeting.value = await queueStore.addMeetingBySpeciality(meetingCredentials);
  } else {
    meeting.value = await queueStore.meetingAdd(meetingCredentials);
    loading.value = false;
  }
  if (meeting.value.object == "Нет подходящий врачей для приёма") {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: meeting.value.object,
      life: 3000,
      group: "bc",
    });
    loading.value = false;
  }
  if (meeting.value) {
    loading.value = false;
    meetingCredentials.speciality_id = null;
    meetingCredentials.employee_id = null;
  }
};

const clear = () => {
  meetingCredentials.speciality_id = null;
  meetingCredentials.employee_id = null;
};
onMounted(() => {
  getSpeciality();
});
</script>

<template>
  <div class="card">
    <h4>Навбатни белгилаш</h4>
    <form ref="form" @submit.prevent="addMeeting" class="mt-6">
      <div class="flex flex-wrap justify-content-around">
        <Dropdown
          v-model="meetingCredentials.speciality_id"
          :options="speciality"
          optionValue="id"
          @change="getEmployeeBySpeciality(meetingCredentials.speciality_id)"
          optionLabel="name"
          placeholder="Мутахассислиги"
          class="w-22rem"
        />

        <Dropdown
          v-model="meetingCredentials.employee_id"
          optionValue="id"
          :disabled="!meetingCredentials.speciality_id ? 'true' : false"
          :options="employeeStore.employeeBySpeciality"
          optionLabel="fullName"
          placeholder="Доктор"
          class="w-22rem"
        />
      </div>
      <div class="flex justify-content-end mt-4 gap-3">
        <Button
          :disabled="
            meetingCredentials.speciality_id && meetingCredentials.patient_id
              ? fasle
              : true
          "
          :loading="loading"
          type="submit"
          label="Юбориш"
          severity="success"
        />
        <Button label="Тозалаш" @click="clear" />
      </div>
    </form>
  </div>
  <div v-if="meeting && meeting.object != 'Нет подходящий врачей для приёма'">
    <Check>
      <template #body>
        <div class="text-center">
          <h3 style="color: var(--black-900)">Добро пожаловать</h3>
          <p>Ваш номер очереди:</p>
          <b class="queue">{{ meeting.object.queue }}</b>
        </div>
        <p><b>Услуга:</b> {{ meeting.object.specialityIndex }}</p>
        <p><b>Имя доктора:</b> {{ meeting.object.employeeShortName }}</p>
        <p><b>Имя пациента:</b> {{ meeting.object.patientShortName }}</p>
        <p><b>Должность:</b> {{ meeting.object.level }}</p>
        <p><b>Этаж:</b> {{ meeting.object.stage }}</p>
        <p><b>Кабинет:</b> {{ meeting.object.room }}</p>
        <p><b>Время создания:</b> {{ meeting.object.created }}</p>
        <p>
          <b>Примерное время приёма:</b>
          {{ meeting.object.enter_to_doctor_date }}
        </p>
      </template>
    </Check>
  </div>
</template>

<style>
.queue {
  font-size: 300%;
}
</style>
