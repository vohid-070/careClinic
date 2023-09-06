import { defineStore } from "pinia";
import AppointmentService from "@/services/appointment.service";

export const useAppointmentStore = defineStore("appointment", {
  state: () => ({
    appointment: [],
    appointmentById: [],
  }),
  actions: {
    async getAppontmentOwn() {
      const appoitmentList = await AppointmentService.appointmentOwn();
      this.appointment = appoitmentList;
      return appoitmentList;
    },
    async getAppointmentById(id) {
      const appointmentDetail =
        await AppointmentService.appointmentEmployeeById(id);
      this.appointmentById = appointmentDetail;
      return appointmentDetail;
    },
    async addAppontment(appointmentCredentials) {
      const add = AppointmentService.addAppointment(appointmentCredentials);
      return add;
    },
  },
});
