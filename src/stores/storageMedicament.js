import StorageMedicamentService from "@/services/storageMedicament.service";
import { defineStore } from "pinia";

export const useStorageMedicament = defineStore("storage", {
  state: () => ({
    storage: [],
    allInvoices: [],
  }),
  actions: {
    async getStorageMedicamentList(param, page) {
      const data = await StorageMedicamentService.getStorageMedicamentList(
        param,
        page
      );
      this.storage = data.object;
      return data;
    },
    async addToStorage(createStorage) {
      const data = await StorageMedicamentService.addToStorage(createStorage);
      return data;
    },
    async removeFromStorage(removeStorage) {
      const data = await StorageMedicamentService.removeFromStorage(
        removeStorage
      );
      return data;
    },
    async getAllInvoices(id, page) {
      const data = await StorageMedicamentService.getAllInvoices(id, page);
      this.allInvoices = data.object;
      return data;
    },
    async editInvoice(id, editInvoice) {
      const data = await StorageMedicamentService.editInvoice(id, editInvoice);
      return data;
    },
  },
});
