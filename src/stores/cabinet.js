import { defineStore } from 'pinia';
import CabinetService from '@/services/cabinet.service';

export const useCabinetStore = defineStore('cabinet', {
    state: () => ({
        cabinetSearch: [],
        createdCabinet: [],
        deletedCabinet: [],
        cabinetById: [],
        cabinetUpdate: [],
        cabinet: []
    }),
    actions: {
        async cabinetSearchList(param, page) {
            const cabinet = await CabinetService.getCabinetSearchList(param, page);
            this.cabinetSearch = cabinet.object;
            return cabinet;
        },
        async cabinetCreate(create) {
            const createCabinet = await CabinetService.createCabinet(create);
            this.createdCabinet = createCabinet;
            return createCabinet;
        },
        async cabinetDelete(id) {
            const deleted = await CabinetService.deleteCabinet(id);
            this.deletedCabinet = deleted;
            return deleted;
        },
        async getCabinetById(id) {
            const byId = await CabinetService.cabinetGetById(id);
            this.cabinetById = byId.data.object;
            return byId;
        },
        async updateCabinet(id, update) {
            const updated = await CabinetService.cabinetUpdate(id, update);
            this.cabinetUpdate = updated;
            return updated;
        },
        async getCabinetList() {
            const list = await CabinetService.fullCabinetList();
            this.cabinet = list;
            return list;
        }
    }
});
