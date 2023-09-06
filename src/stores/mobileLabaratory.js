import { defineStore } from "pinia";
import MobileLabaratoryService from "@/services/mobileLabaratory.service";

export const useMobileStore = defineStore("mobile-labaratory", {
  state: () => ({
    mobilLaboratory: [],
    mobilLaboratoryAll: [],
    comentById: [],
  }),
  actions: {
    async MobileActive(param, page) {
      const mobileActive =
        await MobileLabaratoryService.getMobileLaboratoryActiveList(
          param,
          page
        );
      this.mobilLaboratory = mobileActive.object;
      return mobileActive;
    },
    async MobileHistory(param, page) {
      const mobileHistoryList =
        await MobileLabaratoryService.getMobileLaboratoryAllList(param, page);
      this.mobilLaboratoryAll = mobileHistoryList.object;
      return mobileHistoryList;
    },
    async GetCommentById(id) {
      const coment = await MobileLabaratoryService.getCommentsById(id);
      this.comentById = coment.object;
      return coment;
    },
    async AddComment(id, message) {
      const addedComment = await MobileLabaratoryService.addComment(
        id,
        message
      );
      return addedComment;
    },
    async Serviced(id, message) {
      const serviced = await MobileLabaratoryService.serviced(id, message);
      return serviced;
    },
  },
});
