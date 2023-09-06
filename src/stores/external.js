import { defineStore } from 'pinia';
import ExternalEmployeeService from '@/services/externalEmployee.service';

export const useExternalEmployeeStore = defineStore('externalEmployee', {
    state: () => ({
        externalEmployee: {
            content: []
        },
        employeeList: [],
        employeeById: {},
        deleteEmployeeById: [],
        updatedEmployee: {},
        createdEmployee: {}
    }),
    actions: {
        async getEmployeeList(page, param) {
            const content = await ExternalEmployeeService.getEmployeeList(page, param);
            this.externalEmployee = content.data.object;
            return content;
        },
        async getEmployee() {
            const list = await ExternalEmployeeService.getEmployee();
            this.employeeList = list;
            return list;
        },
        async getEmployeeById(id) {
            const data = await ExternalEmployeeService.getEmployeeById(id);
            this.employeeById = data.data.object;
            return data;
        },
        async deleteEmployee(id) {
            const deleteEmployee = await ExternalEmployeeService.deleteEmployee(id);
            this.deleteEmployeeById = deleteEmployee;
            return deleteEmployee;
        },
        async updateEmployee(id, update) {
            const updateEmployee = await ExternalEmployeeService.updateEmployee(id, update);
            this.updatedEmployee = updateEmployee;
            return updateEmployee;
        },
        async createEmployee(create) {
            const createEmployee = await ExternalEmployeeService.createEmployee(create);
            this.createdEmployee = createEmployee;
            return createEmployee;
        }
    }
});
