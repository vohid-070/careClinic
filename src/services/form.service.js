import axios from '@/library/axios';

const FormService = {
    getFormList: async () => {
        const { data } = await axios.get('/api/v1/form/list');
        return data;
    },
    getFormSearchList: async (param, page) => {
        const { data } = await axios.get('/api/v1/form/search', {
            params: {
                param,
                page
            }
        });
        return data;
    },
    createForm: async (create) => {
        const data = await axios.post('/api/v1/form/admin/', create);
        return data;
    },
    deleteForm: async (id) => {
        const data = await axios.delete(`/api/v1/form/admin/${id}`);
        return data;
    },
    getFormById: async (id) => {
        const data = await axios.get(`/api/v1/form/${id}`);
        return data;
    },
    updateForm: async (id, update) => {
        const data = await axios.put(`/api/v1/form/admin/${id}`, update);
        return data;
    }
};
export default FormService;
