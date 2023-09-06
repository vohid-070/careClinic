import { defineStore } from "pinia";
import AmbulanceService from "@/services/ambulance.service";

export const useAmbulanceStore = defineStore("ambulance", {
  state: () => ({
    mobilLaboratory: [],
    mobilLaboratoryAll: [],
    comentById: [],
  }),
  actions: {
    async MobileActive(param, page) {
      const mobileActive = await AmbulanceService.getMobileLaboratoryActiveList(
        param,
        page
      );
      this.mobilLaboratory = mobileActive.object;
      return mobileActive;
    },
    async MobileHistory(param, page) {
      const mobileHistoryList =
        await AmbulanceService.getMobileLaboratoryAllList(param, page);
      this.mobilLaboratoryAll = mobileHistoryList.object;
      return mobileHistoryList;
    },
    async GetCommentById(id) {
      const coment = await AmbulanceService.getCommentsById(id);
      this.comentById = coment.object;
      return coment;
    },
    async AddComment(id, message) {
      const addedComment = await AmbulanceService.addComment(id, message);
      return addedComment;
    },
    async Serviced(id, message) {
      const serviced = await AmbulanceService.serviced(id, message);
      return serviced;
    },
  },
});
