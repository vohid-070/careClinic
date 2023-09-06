import ResultService from '@/services/result.service';
import { defineStore } from 'pinia';

export const useResultStore = defineStore('result', {
    state: () => ({
        result: [],
        resultPatient: {},
        createdResult: [],
        deletedResult: []
    }),
    actions: {
        async getResultType() {
            const resultType = await ResultService.getResultType();
            this.result = resultType.data;
            return resultType;
        },
        async getResultPatient(id) {
            const patient = await ResultService.getResultPatient(id);
            this.resultPatient = patient.data;
            return patient;
        },
        async createResult(createResult) {
            const created = await ResultService.createResult(createResult);
            this.createdResult = created;
            return created;
        },
        async deleteResult(id) {
            const deleted = await ResultService.deleteResult(id);
            this.deletedResult = deleted;
            return deleted;
        }
    }
});
