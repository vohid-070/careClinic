import axios from "@/library/axios";

const ComplaintService = {
  async getComplaintActiveList(param, page) {
    const { data } = await axios.get("/api/v1/complaint/active", {
      params: {
        param,
        page,
      },
    });
    return data;
  },
  async getComplaintAllList(param, page) {
    const { data } = await axios.get("/api/v1/complaint/search", {
      params: {
        param,
        page,
      },
    });
    return data;
  },
  async getCommentsById(id) {
    const { data } = await axios.get(`/api/v1/complaint/${id}`);
    return data;
  },
  async addComment(id, message) {
    const data = await axios.put(
      `/api/v1/complaint/add-comment/${id}`,
      message
    );
    return data;
  },
  async serviced(id, message) {
    const data = await axios.put(`/api/v1/complaint/service/${id}`, message);
    return data;
  },
};

export default ComplaintService;
