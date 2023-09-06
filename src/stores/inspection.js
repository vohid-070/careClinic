import InspectionService from '@/services/inspection.service';
import { defineStore } from 'pinia';

export const useInspectionStore = defineStore('inspection', {
    state: () => ({
        inspection: {
            content: []
        },
        createInspection: []
    }),
    actions: {
        async inspectionCreate(create) {
            const created = await InspectionService.createInspection(create);
            this.createInspection = created;
            return created;
        }
    }
});
