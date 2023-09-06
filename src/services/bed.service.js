import axios from '@/library/axios';

const BedService = {
    async getBedSearchList(param, page) {
        const { data } = await axios.get('/api/v1/bed/search', {
            params: {
                param,
                page
            }
        });
        return data;
    },
    async createBed(create) {
        const data = await axios.post('/api/v1/bed/admin/add', create);
        return data;
    },
    async deleteBed(id) {
        const data = await axios.delete(`/api/v1/bed/admin/${id}`);
        return data;
    },
    async bedGetById(id) {
        const data = await axios.get(`/api/v1/bed/${id}`);
        return data;
    },
    async bedUpdate(id, update) {
        const data = await axios.put(`/api/v1/bed/admin/${id}`, update);
        return data;
    },
    async fullBedList() {
        const { data } = await axios.get('/api/v1/bed/free');
        return data;
    }
};
export default BedService;
