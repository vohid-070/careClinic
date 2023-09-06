<script setup>
import ru from "@fullcalendar/core/locales/ru";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/vue3";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useAppointmentStore } from "@/stores/appointment";
import { useEmployeeStore } from "@/stores/employee";
import { usePatientStore } from "@/stores/patient";
import { storeToRefs } from "pinia";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

import { onMounted, reactive, ref, watch } from "vue";

const router = useRouter();
const toast = useToast();
const employeeStore = useEmployeeStore();
const patientStore = usePatientStore();
const { findPatient } = storeToRefs(patientStore);
const { appointmentEmployee } = storeToRefs(employeeStore);
const appointmentStore = useAppointmentStore();
const { appointmentById } = storeToRefs(appointmentStore);

const getList = ref(false);
const search = ref(null);
const createDialog = ref(false);
// const employeeAppointment = ref(false);
const loadingAdd = ref(false);

const appointmentCredentials = reactive({
  employee_id: null,
  patient_id: null,
  appointment: null,
});

const showEvent = ({ event }) => {
  router.push(`/meeting/create/${event.id}`);
};

const getAppointmentEmployeeList = async () => {
  await employeeStore.getEmployeeAppointmentList();
};
const getAppointmentById = async (id) => {
  getList.value = true;
  if (search.value) {
    await appointmentStore.getAppointmentById(id);
  }
  if (!search.value) {
    await appointmentStore.getAppointmentById(localStorage.getItem("id"));
  }
  getList.value = false;
};

const getPatientList = async () => {
  await patientStore.patientFind(appointmentCredentials.patient_id);
};

const showCreateDialog = () => {
  createDialog.value = true;
};

const AddApplointment = async () => {
  if (
    appointmentCredentials.employee_id &&
    appointmentCredentials.patient_id &&
    appointmentCredentials.appointment
  ) {
    loadingAdd.value = true;
    const addedAppointment = {};
    Object.assign(addedAppointment, appointmentCredentials);

    const selectedDateTime = new Date(appointmentCredentials.appointment);
    selectedDateTime.setHours(selectedDateTime.getHours() + 5);
    addedAppointment.appointment = selectedDateTime;

    const data = await appointmentStore.addAppontment(addedAppointment);
    if (data.status == 201) {
      createDialog.value = false;
      toast.add({
        severity: "success",
        summary: "Муваффақиятли",
        detail: "Муваффақиятли қўшилди",
        life: 3000,
        group: "bc",
      });
      loadingAdd.value = false;
      appointmentCredentials.employee_id = null;
      appointmentCredentials.patient_id = null;
      appointmentCredentials.appointment = "";
      getAppointmentById();
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: data.message,
        life: 3000,
        group: "bc",
      });
    }
    loadingAdd.value = false;
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Ҳамма қаторни тўлдиринг",
      life: 3000,
      group: "bc",
    });
  }
};

watch(appointmentById, () => {
  const data = [];
  appointmentById.value.object.forEach((element) => {
    data.push({
      id: element.id,
      title: `${element.patient.name} ${element.patient.surname}`,
      start: element.appointmentTime,
    });
  });
  calendarOptions.value.initialEvents = data;
});

const calendarsColor = {
  test: "primary",
  interview: "success",
};

const calendarOptions = ref({
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin, // needed for dateClick
  ],
  headerToolbar: {
    left: "prev,next",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
  initialView: "dayGridMonth",
  editable: true,
  selectable: true,
  dayMaxEvents: 2,
  weekends: true,
  initialEvents: [],

  eventClick: showEvent,
  eventClassNames({ event: calendarEvent }) {
    const colorName = calendarsColor[calendarEvent._def.extendedProps.type];
    return [
      // Background Color
      `bg-light-${colorName} text-${colorName}`,
    ];
  },
  locale: ru,
});

onMounted(() => {
  getAppointmentById();
  getAppointmentEmployeeList();
});
</script>

<template>
  <div class="card" style="max-width: 80vw">
    <div class="flex flex-wrap justify-content-between mb-4">
      <div>
        <Dropdown
          v-model="search"
          :options="appointmentEmployee"
          option-label="fullName"
          option-value="id"
          filter
          show-clear
          style="width: 15vw"
        />
        <Button
          icon="pi pi-search"
          class="mx-2"
          @click="getAppointmentById(search)"
        />
      </div>

      <Button
        label="Учрашув белгилаш"
        severity="success"
        @click="showCreateDialog"
      />
    </div>
    <ProgressBar v-if="getList" mode="indeterminate" style="height: 6px" />
    <div v-if="appointmentById">
      <FullCalendar
        v-if="appointmentById.object?.length >= 0 && !getList"
        :options="calendarOptions"
        style="max-width: 76vw"
      />
    </div>

    <!-- <Dialog v-model:visible="showDialog" modal>
      <template #header>{{ item.title }}</template>
      {{ item.start }}
    </Dialog> -->

    <Dialog
      v-model:visible="createDialog"
      modal
      header="Учрашув белгилаш"
      style="max-width: 60vw"
    >
      <div class="flex flex-wrap gap-4">
        <Dropdown
          v-model="appointmentCredentials.employee_id"
          :options="appointmentEmployee"
          option-label="fullName"
          option-value="id"
          placeholder="Ходимлар"
          filter
          show-clear
          style="width: 300px"
        />
        <Dropdown
          v-model="appointmentCredentials.patient_id"
          editable
          :options="findPatient.object"
          option-label="name"
          option-value="id"
          placeholder="Беморлар"
          show-clear
          @input="getPatientList(appointmentCredentials.patient_id)"
          style="width: 300px"
        />
        <Calendar
          v-model="appointmentCredentials.appointment"
          showTime
          hourFormat="24"
          placeholder="Сана"
          dateFormat="yy-mm-dd"
          show-icon
          show-button-bar
          style="width: 300px"
        >
        </Calendar>
      </div>
      <div class="flex justify-content-end mt-4">
        <Button label="Яратиш" :loading="loadingAdd" @click="AddApplointment" />
      </div>
    </Dialog>
  </div>
</template>
<style>
@media only screen and (min-width: 980px) {
  .fc-event-title {
    font-size: 14px;
  }
  .fc-event-time {
    font-size: 14px !important;
  }
}
</style>
