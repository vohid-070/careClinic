import axios from '../library/axios';

const TransferService = {
    getTransferList: async (page) => {
        const { data } = await axios.get('/api/v1/transfer/', {
            params: {
                page
            }
        });
        return data;
    },
    getTransferSearchList: async (param, page) => {
        const { data } = await axios.get('/api/v1/transfer/search', {
            params: {
                param,
                page
            }
        });
        return data;
    },
    createTransfer: async (create) => {
        const data = await axios.post('/api/v1/transfer/admin/', create);
        return data;
    },
    deleteTransfer: async (id) => {
        const data = await axios.delete(`/api/v1/transfer/admin/${id}`);
        return data;
    },
    getTransferById: async (id) => {
        const data = await axios.get(`/api/v1/transfer/${id}`);
        return data;
    },
    updateTransfer: async (id, update) => {
        const data = await axios.put(`/api/v1/transfer/admin/${id}`, update);
        return data;
    },
    getTransferOnline: async (param) => {
        const data = await axios.get('/api/v1/transfer/online', {
            params: {
                param
            }
        });
        return data;
    }
};
export default TransferService;
