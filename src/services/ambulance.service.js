import axios from "@/library/axios";

const AmbulanceService = {
  async getMobileLaboratoryActiveList(param, page) {
    const { data } = await axios.get("/api/v1/ambulance/active", {
      params: {
        param,
        page,
      },
    });
    return data;
  },
  async getMobileLaboratoryAllList(param, page) {
    const { data } = await axios.get("/api/v1/ambulance/search", {
      params: {
        param,
        page,
      },
    });
    return data;
  },
  async getCommentsById(id) {
    const { data } = await axios.get(`/api/v1/ambulance/${id}`);
    return data;
  },
  async addComment(id, message) {
    const data = await axios.put(
      `/api/v1/ambulance/add-comment/${id}`,
      message
    );
    return data;
  },
  async serviced(id, message) {
    const data = await axios.put(`/api/v1/ambulance/serviced/${id}`, message);
    return data;
  },
};

export default AmbulanceService;
