import axios from "@/library/axios";

const ConcernService = {
  async getConcernActiveList(param, page) {
    const { data } = await axios.get("/api/v1/concern/speciality-active", {
      params: {
        param,
        page,
      },
    });
    return data;
  },
  async getConcernAllList(param, page) {
    const { data } = await axios.get("/api/v1/concern/speciality-list", {
      params: {
        param,
        page,
      },
    });
    return data;
  },
  async getCommentsById(id) {
    const { data } = await axios.get(`/api/v1/concern/${id}`);
    return data;
  },
  async servicedConcern(id, message) {
    const data = await axios.put(
      `/api/v1/concern/speciality-service/${id}`,
      message
    );
    return data;
  },
};

export default ConcernService;
