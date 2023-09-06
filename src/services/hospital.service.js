import axios from "@/library/axios";

const HospitaService = {
  getHospitalHistoryList: async (param, page) => {
    const { data } = await axios.get("/api/v1/hospital/search", {
      params: {
        param,
        page,
      },
    });
    return data;
  },
  getHospitalLiveList: async (param, page) => {
    const { data } = await axios.get("/api/v1/hospital/active/list", {
      params: {
        param,
        page,
      },
    });
    return data;
  },
  getHospitalInfoList: async () => {
    const { data } = await axios.get("/api/v1/hospital/info-list");
    return data;
  },
  hospitalExitPatient: async (name) => {
    const data = await axios.post(
      `/api/v1/hospital/reception/exit/name/${name}`
    );
    return data;
  },
  hospitalGetById: async (id) => {
    const data = await axios.get(`/api/v1/hospital/${id}`);
    return data;
  },
  hospitalPay: async (name, sum) => {
    const data = await axios.put(`/api/v1/hospital/reception/pay/${name}`, sum);
    return data;
  },
  enterPatientHospital: async (patient) => {
    const data = await axios.post(
      "/api/v1/hospital/reception/enter/patient",
      patient
    );
    return data;
  },
  enterComment: async (id, comment) => {
    const data = await axios.put(
      `/api/v1/hospital/edit/enter-comment/${id}`,
      comment
    );
    return data;
  },
  exitComment: async (id, comment) => {
    const data = await axios.put(
      `/api/v1/hospital/edit/exit-comment/${id}`,
      comment
    );
    return data;
  },
  showMedicament: async (id) => {
    const { data } = await axios.get(
      `/api/v1/hospital/medicament/detail/${id}`
    );
    return data;
  },
  enterMedicament: async (id, medicament) => {
    const data = await axios.post(
      `/api/v1/hospital/medicament/add-to-hospital/${id}`,
      medicament
    );
    return data;
  },
  hospitalMedicamentMonitoringList: async (date, param, page) => {
    const { data } = await axios.post(
      "/api/v1/hospital/medicament/monitoring/list",
      date,
      {
        params: {
          param,
          page,
        },
      }
    );
    return data;
  },
  hospitalMedicamentMonitoringDetail: async (date, id, page) => {
    const { data } = await axios.post(
      "/api/v1/hospital/medicament/monitoring",
      date,
      {
        params: {
          id,
          page,
        },
      }
    );
    return data;
  },
  getReport: async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/hospital/report/${id}`, {
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
};

export default HospitaService;
