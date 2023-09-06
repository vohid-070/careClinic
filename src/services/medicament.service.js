import axios from "@/library/axios";

const MedicamentService = {
  async getMedicamentSearchList(param, page) {
    const { data } = await axios.get("/api/v1/medicament/search", {
      params: {
        param,
        page,
      },
    });
    return data;
  },
  async getMedicamentList(param) {
    const { data } = await axios.get("/api/v1/medicament/search-exists", {
      params: {
        param,
      },
    });
    return data;
  },
  createMedicament: async (create) => {
    const data = await axios.post("/api/v1/medicament/add", create);
    return data;
  },
  getMedicamentById: async (id) => {
    const data = await axios.get(`/api/v1/medicament/${id}`);
    return data;
  },
  updateMedicament: async (id, update) => {
    const data = await axios.put(`/api/v1/medicament/edit/${id}`, update);
    return data;
  },
  deleteMedicament: async (id) => {
    const data = await axios.delete(`/api/v1/medicament/admin/${id}`);
    return data;
  },
};
export default MedicamentService;
