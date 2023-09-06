import axios from '@/library/axios';

const ResultService = {
    getResultType: async () => {
        const data = axios.get(`/api/v1/result-type/`);
        return data;
    },
    getResultPatient: async (id) => {
        const data = axios.get(`/api/v1/result/patient/${id}`);
        return data;
    },
    createResult: async (createResult) => {
        const data = axios.post('/api/v1/result/admin-laboratory/', createResult);
        return data;
    },
    deleteResult: async (id) => {
        const data = axios.delete(`/api/v1/result/admin-laboratory/${id}`);
        return data;
    }
};

export default ResultService;
