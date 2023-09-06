import FormService from "../services/form.service";
import { defineStore } from "pinia";

export const useFormStore = defineStore("form", {
  state: () => ({
    form: {
      content: [],
    },
    formList: [],
    createdForm: [],
    deletedForm: [],
    formById: [],
    updatedForm: [],
  }),
  actions: {
    async getFormList() {
      const content = await FormService.getFormList();
      this.form = content.object;
      return content;
    },
    async getFormSearchList(param, page) {
      const list = await FormService.getFormSearchList(param, page);
      this.formList = list.object;
      return list;
    },
    async createForm(create) {
      const formCreate = await FormService.createForm(create);
      this.createdForm = formCreate;
      return formCreate;
    },
    async deleteForm(id) {
      const formDelete = await FormService.deleteForm(id);
      this.deletedForm = formDelete;
      return formDelete;
    },
    async getFormById(id) {
      const data = await FormService.getFormById(id);
      this.formById = data.data.object;
      return data;
    },
    async updateForm(id, update) {
      const formUpdate = await FormService.updateForm(id, update);
      this.updatedForm = formUpdate;
      return formUpdate;
    },
  },
});
