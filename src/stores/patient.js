import { defineStore } from 'pinia';
import PatientService from '../services/patient.service';

export const usePatientStore = defineStore('patient', {
    state: () => ({
        patient: {
            content: []
        },
        created: [],
        deleted: [],
        patientById: [],
        updated: [],
        findPatient: []
    }),
    actions: {
        async patientSearch(param, page) {
            const data = await PatientService.searchPatient(param, page);
            this.patient = data.data.object;
            return data;
        },
        async patientFind(param) {
            const find = await PatientService.findPatient(param);
            this.findPatient = find.data;
            return find;
        },
        async patientCreate(create) {
            const createPatient = await PatientService.patientCreate(create);
            this.created = createPatient;
            return createPatient;
        },
        async patientDelete(id) {
            const deletePatient = await PatientService.patientDelete(id);
            this.deleted = deletePatient;
            return deletePatient;
        },
        async getPatientById(id) {
            const patientDetail = await PatientService.patientById(id);
            this.patientById = patientDetail.data.object;
            return patientDetail;
        },
        async patientUpdate(id, update) {
            const updatePatient = await PatientService.editPatient(id, update);
            this.updated = updatePatient;
            return updatePatient;
        }
    }
});
