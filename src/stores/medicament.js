import { defineStore } from "pinia";
import MedicamentService from "@/services/medicament.service";

export const useMedicamentStore = defineStore("medicament", {
  state: () => ({
    medicamentList: [],
    medicamentSearch: [],
    createdMedicament: [],
    medicamentById: [],
    updatedMedicament: [],
    deletedMedicament: [],
  }),
  actions: {
    async medicamentSearchList(param, page) {
      const data = await MedicamentService.getMedicamentSearchList(param, page);
      this.medicamentSearch = data.object;
      return data;
    },
    async getMedicamentList(param) {
      const list = await MedicamentService.getMedicamentList(param);
      this.medicamentList = list.object;
      return list;
    },
    async createMedicament(create) {
      const medicamentCreate = await MedicamentService.createMedicament(create);
      this.createdMedicament = medicamentCreate;
      return medicamentCreate;
    },
    async getMedicamentById(id) {
      const data = await MedicamentService.getMedicamentById(id);
      this.medicamentById = data.data.object;
      return data;
    },
    async updateMedicament(id, update) {
      const medicamentUpdate = await MedicamentService.updateMedicament(
        id,
        update
      );
      this.updatedMedicament = medicamentUpdate;
      return medicamentUpdate;
    },
    async deleteMedicament(id) {
      const medicamentDelete = await MedicamentService.deleteMedicament(id);
      this.deletedmedicament = medicamentDelete;
      return medicamentDelete;
    },
  },
});
