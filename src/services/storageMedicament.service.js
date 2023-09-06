import axios from "@/library/axios";

const StorageMedicamentService = {
  getStorageMedicamentList: async (param, page) => {
    const { data } = await axios.get("/api/v1/storage-medicament/search", {
      params: {
        param,
        page,
      },
    });
    return data;
  },
  addToStorage: async (createStorage) => {
    const data = await axios.post(
      "/api/v1/storage-medicament/add-to-storage",
      createStorage
    );
    return data;
  },
  removeFromStorage: async (removeStorage) => {
    const data = await axios.put(
      "/api/v1/storage-medicament/write-off",
      removeStorage
    );
    return data;
  },
  getAllInvoices: async (id, page) => {
    const { data } = await axios.get(
      "/api/v1/storage-medicament/all-invoices",
      {
        params: {
          id,
          page,
        },
      }
    );
    return data;
  },
  editInvoice: async (id, editInvoice) => {
    const data = await axios.put(
      `/api/v1/storage-medicament/edit-invoice/${id}`,
      editInvoice
    );
    return data;
  },
};

export default StorageMedicamentService;
