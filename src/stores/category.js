import { defineStore } from "pinia";
import CategoryService from "@/services/category.service";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    category: [],
    categorySearch: [],
    createdCategory: [],
    categoryById: [],
    updatedCategory: [],
    deletedCategory: [],
  }),
  actions: {
    async categorySearchList(param, page) {
      const data = await CategoryService.getCategorySearchList(param, page);
      this.categorySearch = data.object;
      return data;
    },
    async categoryList(page) {
      const list = await CategoryService.getCategoryList(page);
      this.category = list.object;
      return list;
    },
    async createCategory(create) {
      const categoryCreate = await CategoryService.createCategory(create);
      this.createdCategory = categoryCreate;
      return categoryCreate;
    },
    async getCategoryById(id) {
      const data = await CategoryService.getCategoryById(id);
      this.categoryById = data.data.object;
      return data;
    },
    async updateCategory(id, update) {
      const categoryUpdate = await CategoryService.updateCategory(id, update);
      this.updatedCategory = categoryUpdate;
      return categoryUpdate;
    },
    async deleteCategory(id) {
      const categoryDelete = await CategoryService.deleteCategory(id);
      this.deletedCategory = categoryDelete;
      return categoryDelete;
    },
  },
});
