import axios from "@/library/axios";

const MonitoringService = {
  sumCount: async (date) => {
    const { data } = await axios.post("/api/v1/monitoring/sum-count", date);
    return data;
  },
  ratingSpeciality: async (date) => {
    const { data } = await axios.post(
      "/api/v1/monitoring/rating-speciality",
      date
    );
    return data;
  },
  ratingDoctor: async (date) => {
    const { data } = await axios.post("/api/v1/monitoring/rating-doctor", date);
    return data;
  },
  ratingExternalDoctor: async (date) => {
    const { data } = await axios.post(
      "/api/v1/monitoring/rating-external-doctor",
      date
    );
    return data;
  },
  ratingResultType: async (date) => {
    const { data } = await axios.post(
      "/api/v1/monitoring/rating-result-type",
      date
    );
    return data;
  },
  percentMaleFemale: async (date) => {
    const { data } = await axios.post(
      "/api/v1/monitoring/percent-male-female",
      date
    );
    return data;
  },
  ratingPatient: async (date) => {
    const { data } = await axios.post(
      "/api/v1/monitoring/rating-patient",
      date
    );
    return data;
  },
  ratingTransferCount: async (date) => {
    const { data } = await axios.post(
      "/api/v1/monitoring/transfers-count-info",
      date
    );
    return data;
  },
  countPeople: async (date) => {
    const { data } = await axios.post("/api/v1/monitoring/count-people", date);
    return data;
  },
  ratingTransfer: async (date) => {
    const { data } = await axios.post(
      "/api/v1/monitoring/rating-transfer",
      date
    );
    return data;
  },
  ratingForm: async (date) => {
    const { data } = await axios.post("/api/v1/monitoring/rating-form", date);
    return data;
  },
  countHospitalPatient: async (date) => {
    const { data } = await axios.post(
      "/api/v1/monitoring/count-hospital-patient",
      date
    );
    return data;
  },
  sumCountDaily: async (date) => {
    const { data } = await axios.post(
      "/api/v1/monitoring/sum-hospital-patient",
      date
    );
    return data;
  },
  ratingHospital: async (date) => {
    const { data } = await axios.post(
      "/api/v1/monitoring/rating-hospital",
      date
    );
    return data;
  },
  getReport: async (date) => {
    try {
      const { data } = await axios.post("/api/v1/monitoring/report", date, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Отчёт-${new Date().toString().substring(4, 16)}.xlsx`
      );
      document.body.appendChild(link);
      link.click();

      return data;
    } catch (error) {
      return error;
    }
  },
  monitoringEmployees: async (date, param, page) => {
    const { data } = await axios.post("/api/v1/monitoring/employees", date, {
      params: {
        param,
        page,
      },
    });
    return data;
  },
  monitoringEmployeeById: async (date, id, page) => {
    const { data } = await axios.post("/api/v1/monitoring/employee", date, {
      params: {
        id,
        page,
      },
    });
    return data;
  },
  monitoringExternalEmployees: async (date, param, page) => {
    const { data } = await axios.post(
      "/api/v1/monitoring/external-employees",
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
  monitoringExternalEmployeeById: async (date, id, page) => {
    const { data } = await axios.post(
      "/api/v1/monitoring/external-employee",
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
};

export default MonitoringService;
