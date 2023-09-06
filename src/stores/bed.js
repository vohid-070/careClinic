import { defineStore } from 'pinia';
import BedService from '@/services/bed.service';

export const useBedStore = defineStore('bed', {
    state: () => ({
        bedSearch: [],
        createdBed: [],
        deletedBed: [],
        bedById: [],
        bedUpdate: [],
        bed: []
    }),
    actions: {
        async bedSearchList(param, page) {
            const bed = await BedService.getBedSearchList(param, page);
            this.bedSearch = bed.object;
            return bed;
        },
        async bedCreate(create) {
            const createBed = await BedService.createBed(create);
            this.createdBed = createBed;
            return createBed;
        },
        async bedDelete(id) {
            const deleted = await BedService.deleteBed(id);
            this.deletedBed = deleted;
            return deleted;
        },
        async getBedById(id) {
            const byId = await BedService.bedGetById(id);
            this.bedById = byId.data.object;
            return byId;
        },
        async updateBed(id, update) {
            const updated = await BedService.bedUpdate(id, update);
            this.bedUpdate = updated;
            return updated;
        },
        async getBedList() {
            const list = await BedService.fullBedList();
            this.bed = list;
            return list;
        }
    }
});
