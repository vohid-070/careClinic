import { defineStore } from "pinia";
import MonitoringService from "@/services/monitoring.service";

export const useMonitoringStore = defineStore("monitoring", {
  state: () => ({
    countSum: [],
    speciality: [],
    doctor: [],
    externalDoctor: [],
    ratingResult: [],
    percentMaleFemale: [],
    ratingPatient: [],
    ratingTransferCount: [],
    countPeople: [],
    ratingTransfer: [],
    ratingForm: [],
    countHospitalPatient: [],
    sumDaily: [],
    ratingHospital: [],
    report: null,
    employees: [],
    externalEmployees: [],
    employeeDetail: [],
    externalEmployeeDetail: [],
  }),
  actions: {
    async getSummCount(date) {
      const sumCount = await MonitoringService.sumCount(date);
      this.countSum = sumCount.object;
      return sumCount;
    },
    async getRatingSpeciality(date) {
      const rating = await MonitoringService.ratingSpeciality(date);
      this.speciality = rating.object;
      return rating;
    },
    async getRatingDoctor(date) {
      const ratingDoctor = await MonitoringService.ratingDoctor(date);
      this.doctor = ratingDoctor.object;
      return ratingDoctor;
    },
    async getRatingExternalDoctor(date) {
      const ratingExternalDoctor = await MonitoringService.ratingExternalDoctor(
        date
      );
      this.externalDoctor = ratingExternalDoctor.object;
      return ratingExternalDoctor;
    },
    async getRatingResult(date) {
      const ratingResultType = await MonitoringService.ratingResultType(date);
      this.ratingResult = ratingResultType.object;
      return ratingResultType;
    },
    async getPercentMaleFemale(date) {
      const percent = await MonitoringService.percentMaleFemale(date);
      this.percentMaleFemale = percent.object;
      return percent;
    },
    async getRatingPatient(date) {
      const patient = await MonitoringService.ratingPatient(date);
      this.ratingPatient = patient.object;
      return patient;
    },
    async getRatingTransferCount(date) {
      const transferCount = await MonitoringService.ratingTransferCount(date);
      this.ratingTransferCount = transferCount.object;
      return transferCount;
    },
    async getCountPeople(date) {
      const people = await MonitoringService.countPeople(date);
      this.countPeople = people.object;
      return people;
    },
    async getRatingTransfer(date) {
      const transfer = await MonitoringService.ratingTransfer(date);
      this.ratingTransfer = transfer.object;
      return transfer;
    },
    async getRatingForm(date) {
      const form = await MonitoringService.ratingForm(date);
      this.ratingForm = form.object;
      return form;
    },
    async getCountPatient(date) {
      const patientCount = await MonitoringService.countHospitalPatient(date);
      this.countHospitalPatient = patientCount.object;
      return patientCount;
    },
    async getSumDaily(date) {
      const dailySum = await MonitoringService.sumCountDaily(date);
      this.sumDaily = dailySum.object;
      return dailySum;
    },
    async getRatingHospital(date) {
      const hospitalRating = await MonitoringService.ratingHospital(date);
      this.ratingHospital = hospitalRating.object;
      return hospitalRating;
    },
    async getReport(date) {
      const Report = await MonitoringService.getReport(date);
      this.report = Report;
      return Report;
    },
    async getMonitoringEmployees(data, param, page) {
      const employee = await MonitoringService.monitoringEmployees(
        data,
        param,
        page
      );
      this.employees = employee.object;
      return employee;
    },
    async getMonitoringEmployeeById(date, id, page) {
      const employeeById = await MonitoringService.monitoringEmployeeById(
        date,
        id,
        page
      );
      this.employeeDetail = employeeById.object;
      return employeeById;
    },
    async getMonitoringExternalEmployees(data, param, page) {
      const externalEmployee =
        await MonitoringService.monitoringExternalEmployees(data, param, page);
      this.externalEmployees = externalEmployee.object;
      return externalEmployee;
    },
    async getMonitoringExternalEmployeeById(date, id, page) {
      const externalEmployeeById =
        await MonitoringService.monitoringExternalEmployeeById(date, id, page);
      this.externalEmployeeDetail = externalEmployeeById.object;
      return externalEmployeeById;
    },
  },
});
