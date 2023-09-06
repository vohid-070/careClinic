import axios from "@/library/axios";

const CategoryService = {
  async getCategorySearchList(param, page) {
    const { data } = await axios.get("/api/v1/category/search", {
      params: {
        param,
        page,
      },
    });
    return data;
  },
  async getCategoryList(page) {
    const { data } = await axios.get("/api/v1/category/", {
      params: {
        page,
      },
    });
    return data;
  },
  createCategory: async (create) => {
    const data = await axios.post("/api/v1/category/admin/", create);
    return data;
  },
  getCategoryById: async (id) => {
    const data = await axios.get(`/api/v1/category/${id}`);
    return data;
  },
  updateCategory: async (id, update) => {
    const data = await axios.put(`/api/v1/category/edit/${id}`, update);
    return data;
  },
  deleteCategory: async (id) => {
    const data = await axios.delete(`/api/v1/category/admin/${id}`);
    return data;
  },
};
export default CategoryService;
