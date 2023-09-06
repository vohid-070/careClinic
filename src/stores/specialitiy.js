import { defineStore } from 'pinia';
import SpecialitiyService from '../services/specialitiy.service';

export const useSpecialityStore = defineStore('speciality', {
    state: () => ({
        speciality: {
            content: []
        },
        specialitySearch: [],
        createdSpeciality: [],
        deletedSpeciality: [],
        specialityById: [],
        updatedSpeciality: []
    }),
    actions: {
        async specialityList() {
            const data = await SpecialitiyService.getSpecialitiyList();

            this.speciality = data.object;

            return data;
        },
        async specialitySearchList(param, page) {
            const searchList = await SpecialitiyService.getSpecialitySearchList(param, page);

            this.specialitySearch = searchList.data.object;

            return searchList;
        },
        async specialityCreate(create) {
            const createSpeciality = await SpecialitiyService.createSpeciality(create);

            this.createdSpeciality = createSpeciality;

            return createSpeciality;
        },
        async specialityDelete(id) {
            const deleteSpeciality = await SpecialitiyService.deleteSpeciality(id);

            this.deletedSpeciality = deleteSpeciality;

            return deleteSpeciality;
        },
        async getSpecialityById(id) {
            const specialityDetail = await SpecialitiyService.getSpecialtyById(id);

            this.specialityById = specialityDetail.data.object;

            return specialityDetail;
        },
        async updateSpeciality(id, update) {
            const specialityUpdate = await SpecialitiyService.updateSpeciality(id, update);

            this.updatedSpeciality = specialityUpdate;

            return specialityUpdate;
        }
    }
});
