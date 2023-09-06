import { defineStore } from "pinia";
import ComplaintService from "@/services/complaint.service";

export const useComplaintStore = defineStore("complaint", {
  state: () => ({
    complaint: [],
    complaintAllList: [],
    comentById: [],
  }),
  actions: {
    async ComplaintActive(param, page) {
      const complaintActive = await ComplaintService.getComplaintActiveList(
        param,
        page
      );
      this.complaint = complaintActive.object;
      return complaintActive;
    },
    async ComplaintAll(param, page) {
      const complaintAll = await ComplaintService.getComplaintAllList(param, page);
      this.complaintAllList = complaintAll.object;
      return complaintAll;
    },
    async GetCommentById(id) {
      const coment = await ComplaintService.getCommentsById(id);
      this.comentById = coment.object;
      return coment;
    },
    async AddComment(id, message) {
      const addedComment = await ComplaintService.addComment(id, message);
      return addedComment;
    },
    async Serviced(id, message) {
      const serviced = await ComplaintService.serviced(id, message);
      return serviced;
    },
  },
});
