import { defineStore } from "pinia";
import CallBackSerice from "@/services/callBack.service";

export const useCallBackStore = defineStore("call-back", {
  state: () => ({
    callBack: [],
    callBackAllList: [],
    comentById: [],
  }),
  actions: {
    async CallBackActive(param, page) {
      const callBackActive = await CallBackSerice.getCallBackActiveList(
        param,
        page
      );
      this.callBack = callBackActive.object;
      return callBackActive;
    },
    async CallBackAll(param, page) {
      const callBackAll = await CallBackSerice.getCallBackAllList(param, page);
      this.callBackAllList = callBackAll.object;
      return callBackAll;
    },
    async GetCommentById(id) {
      const coment = await CallBackSerice.getCommentsById(id);
      this.comentById = coment.object;
      return coment;
    },
    async AddComment(id, message) {
      const addedComment = await CallBackSerice.addComment(id, message);
      return addedComment;
    },
    async Serviced(id, message) {
      const serviced = await CallBackSerice.serviced(id, message);
      return serviced;
    },
  },
});
