import axios from '../library/axios';
const SpecialitiyService = {
    async getSpecialitiyList() {
        const {data} = await axios.get('/api/v1/speciality/list');
        return data;
    },
    async getSpecialitySearchList(param, page) {
        const data = await axios.get('/api/v1/speciality/search', {
            params: {
                param,
                page
            }
        });
        return data;
    },
    async createSpeciality(create) {
        const data = await axios.post('/api/v1/speciality/admin/add', create);
        return data;
    },
    async deleteSpeciality(id) {
        const data = await axios.delete(`/api/v1/speciality/admin/${id}`);
        return data;
    },
    async getSpecialtyById(id) {
        const data = await axios.get(`/api/v1/speciality/${id}`);
        return data;
    },
    async updateSpeciality(id, update) {
        const data = await axios.put(`/api/v1/speciality/admin/edit/${id}`, update);
        return data;
    }
};
export default SpecialitiyService;
