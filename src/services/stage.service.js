import axios from '../library/axios';

const StageService = {
    getStageList: async () => {
        const { data } = await axios.get('/api/v1/stage/list');
        return data;
    },
    getStageSearchList: async (param, page) => {
        const { data } = await axios.get('/api/v1/stage/search', {
            params: {
                param,
                page
            }
        });
        return data;
    },
    createStage: async (create) => {
        const data = await axios.post('/api/v1/stage/admin/', create);
        return data;
    },
    deleteStage: async (id) => {
        const data = await axios.delete(`/api/v1/stage/admin/${id}`);
        return data;
    },
    getStageById: async (id) => {
        const data = await axios.get(`/api/v1/stage/${id}`);
        return data;
    },
    updateStage: async (id, update) => {
        const data = await axios.put(`/api/v1/stage/admin/edit/${id}`, update);
        return data;
    }
};
export default StageService;
