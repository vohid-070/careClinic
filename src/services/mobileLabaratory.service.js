import axios from "@/library/axios";

const MobileLabaratoryService = {
  async getMobileLaboratoryActiveList(param, page) {
    const { data } = await axios.get("/api/v1/mobile-laboratory/active", {
      params: {
        param,
        page,
      },
    });
    return data;
  },
  async getMobileLaboratoryAllList(param, page) {
    const { data } = await axios.get("/api/v1/mobile-laboratory/search", {
      params: {
        param,
        page,
      },
    });
    return data;
  },
  async getCommentsById(id) {
    const { data } = await axios.get(`/api/v1/mobile-laboratory/${id}`);
    return data;
  },
  async addComment(id, message) {
    const data = await axios.put(
      `/api/v1/mobile-laboratory/add-comment/${id}`,
      message
    );
    return data;
  },
  async serviced(id, message) {
    const data = await axios.put(
      `/api/v1/mobile-laboratory/serviced/${id}`,
      message
    );
    return data;
  },
};

export default MobileLabaratoryService;
