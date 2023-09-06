import FormSpecialityService from '../services/form-speciality.service';
import { defineStore } from 'pinia';

export const useFormSpecialityStore = defineStore('formspeciality', {
    state: () => ({
        formspeciality: {
            content: []
        },
        forms: [],
        formList: [],
        createdForm: [],
        deletedForm: [],
        formById: [],
        updatedForm: []
    }),
    actions: {
        async getFormList(page) {
            const content = await FormSpecialityService.getFormList(page);
            this.formspeciality = content.object;
            return content;
        },
        async FormList() {
            const listForm = await FormSpecialityService.FormList();
            this.forms = listForm;
            return listForm;
        },
        async getFormSearchList(param, page) {
            const list = await FormSpecialityService.getFormSearchList(param, page);
            this.formList = list.object;
            return list;
        },
        async createForm(create) {
            const formCreate = await FormSpecialityService.createForm(create);
            this.createdForm = formCreate;
            return formCreate;
        },
        async deleteForm(id) {
            const formDelete = await FormSpecialityService.deleteForm(id);
            this.deletedForm = formDelete;
            return formDelete;
        },
        async getFormById(id) {
            const data = await FormSpecialityService.getFormById(id);
            this.formById = data.data.object;
            return data;
        },
        async updateForm(id, update) {
            const formUpdate = await FormSpecialityService.updateForm(id, update);
            this.updatedForm = formUpdate;
            return formUpdate;
        }
    }
});
