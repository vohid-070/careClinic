import axios from '../library/axios';

const LevelService = {
    async getLevelList() {
        const {data} = await axios.get('/api/v1/level/list');
        return data;
    },
    async getLevelSearchList(param, page) {
        const data = await axios.get('/api/v1/level/search', {
            params: {
                param,
                page
            }
        });
        return data;
    },
    async getLevelById(id) {
        const data = await axios.get(`/api/v1/level/${id}`);
        return data;
    },
    async deleteLevel(id) {
        const data = await axios.delete(`/api/v1/level/admin/${id}`);
        return data;
    },
    async updateLevel(id, update) {
        const data = await axios.put(`/api/v1/level/admin/edit/${id}`, update);
        return data;
    },
    async createLevel(create) {
        const data = await axios.post('/api/v1/level/admin/', create);
        return data;
    }
};
export default LevelService;
