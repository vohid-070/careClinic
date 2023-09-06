import { defineStore } from "pinia";
import EmployeeService from "../services/employee.service";

export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    employee: {
      content: [],
    },
    employeeBySpeciality: {},
    employeeById: {},
    deleteEmployeeById: [],
    updatedEmployee: {},
    createdEmployee: {},
    appointmentEmployee: [],
  }),
  actions: {
    async getEmployeeBySpeciality(id) {
      const data = await EmployeeService.getEmployeeBySpeciality(id);
      this.employeeBySpeciality = data.object;
      return data;
    },
    async getEmployeeList(page, param) {
      const content = await EmployeeService.getEmployeeList(page, param);
      this.employee = content.data;
      return content;
    },
    async getEmployeeById(id) {
      const data = await EmployeeService.getEmployeeById(id);
      this.employeeById = data.data.object;
      return data;
    },
    async deleteEmployee(id) {
      const deleteEmployee = await EmployeeService.deleteEmployee(id);
      this.deleteEmployeeById = deleteEmployee;
      return deleteEmployee;
    },
    async updateEmployee(id, update) {
      const updateEmployee = await EmployeeService.updateEmployee(id, update);
      this.updatedEmployee = updateEmployee;
      return updateEmployee;
    },
    async createEmployee(create) {
      const createEmployee = await EmployeeService.createEmployee(create);
      this.createdEmployee = createEmployee;
      return createEmployee;
    },
    async getEmployeeAppointmentList() {
      const data = await EmployeeService.employeeAppointmentList();
      this.appointmentEmployee = data;
      return data;
    },
  },
});
