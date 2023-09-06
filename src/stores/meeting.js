import { defineStore } from "pinia";
import MeetingService from "@/services/meeting.service";

export const useMeetingStore = defineStore("meeting", {
  state: () => ({
    meeting: {
      content: [],
    },
    createdMeeting: [],
    meetingPatientList: [],
    meetingTransferList: [],
    meetingTransferPdf: [],
    meetingTransferSinglePdf: [],
    meetingById: [],
    statusById: [],
    paidSpeciality: [],
    comment: [],
    pdf: [],
  }),
  actions: {
    async getMeetingList(page, param) {
      const list = await MeetingService.meetingList(page, param);
      this.meeting = list.data.object;
      return list;
    },
    async getMeetingTransferList(page, param) {
      const transferList = await MeetingService.meetingTransferList(
        page,
        param
      );
      this.meetingTransferList = transferList.data.object;
      return transferList;
    },
    async meetingTransferPdfId(id) {
      const meetinPdf = await MeetingService.getMeetingTransferPdf(id);
      this.meetingTransferPdf = meetinPdf.data;
      return meetinPdf;
    },
    async createMeeting(create) {
      const created = await MeetingService.addMeeting(create);
      this.createdMeeting = created;
      return created;
    },
    async getMeetingPatientList(id, page) {
      const patientList = await MeetingService.meetingPatientList(id, page);
      this.meetingPatientList = patientList.data.object;
      return patientList;
    },
    async getMeetingById(id) {
      const meetinDetail = await MeetingService.getMeetingByID(id);
      this.meetingById = meetinDetail.data;
      return meetinDetail;
    },
    async getMeetingPdfById(id) {
      const meetingPdf = await MeetingService.getMeetingPdf(id);
      this.pdf = meetingPdf.data;
      return meetingPdf;
    },
    async meetingTransferSinglePdfId(id) {
      const data = await MeetingService.getMeetingSinglePdf(id);
      this.meetingTransferSinglePdf = data;
      return data;
    },
    async getStatusById(id) {
      const meetinStatus = await MeetingService.getMeetingStatusByID(id);
      this.statusById = meetinStatus.data;
      return meetinStatus;
    },
    async getMeetingPaidSpeciality(page, param) {
      const paid = await MeetingService.getMeetingListPaidSpeciality(
        page,
        param
      );
      this.paidSpeciality = paid.object;
      return paid;
    },
    async meetingDoctor(id, doctor) {
      const doctor_comment = await MeetingService.meetingDoctor(id, doctor);
      this.comment = doctor_comment;
      return doctor_comment;
    },
  },
});
