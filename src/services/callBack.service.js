import axios from "@/library/axios";

const CallBackService = {
  async getCallBackActiveList(param, page) {
    const { data } = await axios.get("/api/v1/call-back/active", {
      params: {
        param,
        page,
      },
    });
    return data;
  },
  async getCallBackAllList(param, page) {
    const { data } = await axios.get("/api/v1/call-back/search", {
      params: {
        param,
        page,
      },
    });
    return data;
  },
  async getCommentsById(id) {
    const { data } = await axios.get(`/api/v1/call-back/${id}`);
    return data;
  },
  async addComment(id, message) {
    const data = await axios.put(
      `/api/v1/call-back/add-comment/${id}`,
      message
    );
    return data;
  },
  async serviced(id, message) {
    const data = await axios.put(`/api/v1/call-back/serviced/${id}`, message);
    return data;
  },
};

export default CallBackService;
