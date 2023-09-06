import axios from "../library/axios";

const MeetingService = {
  addMeeting: async (meetingCredentials) => {
    const { data } = await axios.post(
      "/api/v1/meeting/admin-reception/add",
      meetingCredentials
    );
    return data;
  },
  meetingList: async (page, param) => {
    const data = await axios.get("/api/v1/meeting/list", {
      params: {
        page,
        param,
      },
    });
    return data;
  },
  meetingTransferList: async (page, param) => {
    const data = await axios.get("/api/v1/meeting/transfer/list", {
      params: {
        page,
        param,
      },
    });
    return data;
  },
  getMeetingTransferPdf: async (id) => {
    const data = await axios.get(`/api/v1/meeting/transfer/pdf/${id}`);
    return data;
  },
  getMeetingPdf: async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/meeting/pdf/${id}`, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      return data;
    } catch (error) {
      return error;
    }
  },
  getMeetingSinglePdf: async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/meeting/single-pdf/${id}`, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      return data;
    } catch (error) {
      return error;
    }
  },
  meetingPatientList: async (id, page) => {
    const data = await axios.get(`/api/v1/meeting/list/patient/${id}`, {
      params: {
        page,
      },
    });
    return data;
  },
  getMeetingByID: async (id) => {
    const data = await axios.get(`/api/v1/meeting/${id}`);
    return data;
  },
  getMeetingStatusByID: async (id) => {
    const data = await axios.get(`/api/v1/meeting/status/${id}`);
    return data;
  },
  getMeetingListPaidSpeciality: async (page, param) => {
    const { data } = await axios.get(
      "/api/v1/meeting/doctor-laboratory/list/paid-speciality",
      {
        params: {
          page,
          param,
        },
      }
    );
    return data;
  },
  meetingDoctor: async (id, doctor) => {
    const data = await axios.put(
      `/api/v1/meeting/doctor-laboratory/${id}`,
      doctor
    );
    return data;
  },
};
export default MeetingService;
