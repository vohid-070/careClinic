import axios from '@/library/axios';

const CabinetService = {
    async getCabinetSearchList(param, page) {
        const { data } = await axios.get('/api/v1/cabinet/search', {
            params: {
                param,
                page
            }
        });
        return data;
    },
    async createCabinet(create) {
        const data = await axios.post('/api/v1/cabinet/admin/add', create);
        return data;
    },
    async deleteCabinet(id) {
        const data = await axios.delete(`/api/v1/cabinet/admin/${id}`);
        return data;
    },
    async cabinetGetById(id) {
        const data = await axios.get(`/api/v1/cabinet/${id}`);
        return data;
    },
    async cabinetUpdate(id, update) {
        const data = await axios.put(`/api/v1/cabinet/admin/${id}`, update);
        return data;
    },
    async fullCabinetList() {
        const { data } = await axios.get('/api/v1/cabinet/free');
        return data;
    }
};
export default CabinetService;
