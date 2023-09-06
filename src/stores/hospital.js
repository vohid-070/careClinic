import { defineStore } from "pinia";
import HospitaService from "@/services/hospital.service";

export const useHospitalStore = defineStore("hospital", {
  state: () => ({
    hospitalHistory: [],
    hospitalLive: [],
    hospital_detail: [],
    hospital: [],
    medicament: [],
    addedMedicament: [],
    hospitalMedicament: [],
    hospitalMedicamentDetail: [],
    report: [],
  }),
  actions: {
    async getHospitalHistoryList(param, page) {
      const historyList = await HospitaService.getHospitalHistoryList(
        param,
        page
      );
      this.hospitalHistory = historyList.object;
      return historyList;
    },
    async getHospitalLiveList(param, page) {
      const liveList = await HospitaService.getHospitalLiveList(param, page);
      this.hospitalLive = liveList.object;
      return liveList;
    },
    async getHospitalInfoList() {
      const infoList = await HospitaService.getHospitalInfoList();
      this.hospital = infoList.object;
      return infoList;
    },
    async exitPatientHospital(name) {
      const exit = await HospitaService.hospitalExitPatient(name);
      return exit;
    },
    async hospitalDetail(id) {
      const detail = await HospitaService.hospitalGetById(id);
      this.hospital_detail = detail.data;
      return detail;
    },
    async hospitalPay(name, sum) {
      const payed = await HospitaService.hospitalPay(name, sum);
      return payed;
    },
    async enterPatient(patient) {
      const entered = await HospitaService.enterPatientHospital(patient);
      return entered;
    },
    async enterComment(id, comment) {
      const enteredComment = await HospitaService.enterComment(id, comment);
      return enteredComment;
    },
    async exitComment(id, comment) {
      const exitedComment = await HospitaService.exitComment(id, comment);
      return exitedComment;
    },
    async detailMedicament(id) {
      const listMedicament = await HospitaService.showMedicament(id);
      this.medicament = listMedicament.object;
      return listMedicament;
    },
    async addMedicament(id, medicament) {
      const createMedicament = await HospitaService.enterMedicament(
        id,
        medicament
      );
      this.addedMedicament = createMedicament;
      return createMedicament;
    },
    async getHospitalMedicament(date, param, page) {
      const data = await HospitaService.hospitalMedicamentMonitoringList(
        date,
        param,
        page
      );
      this.hospitalMedicament = data.object;
      return data;
    },
    async getHospitalMedicamentDetail(date, id, page) {
      const data = await HospitaService.hospitalMedicamentMonitoringDetail(
        date,
        id,
        page
      );
      this.hospitalMedicamentDetail = data.object;
      return data;
    },
    async getReport(id) {
      const data = await HospitaService.getReport(id);
      this.report = data;
      return data;
    },
  },
});
