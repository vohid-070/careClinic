import axios from '@/library/axios';

const FormSpecialityService = {
    getFormList: async (page) => {
        const { data } = await axios.get('/api/v1/form-speciality/', {
            params: {
                page
            }
        });
        return data;
    },
    FormList: async () => {
        const { data } = await axios.get('/api/v1/form-speciality/list');
        return data;
    },
    getFormSearchList: async (param, page) => {
        const { data } = await axios.get('/api/v1/form-speciality/search', {
            params: {
                param,
                page
            }
        });
        return data;
    },
    createForm: async (create) => {
        const data = await axios.post('/api/v1/form-speciality/admin/add', create);
        return data;
    },
    deleteForm: async (unique) => {
        const data = await axios.delete(`/api/v1/form-speciality/admin/delete/${unique}`);
        return data;
    },
    getFormById: async (unique) => {
        const data = await axios.get(`/api/v1/form-speciality/detail/${unique}`);
        return data;
    },
    updateForm: async (name, update) => {
        const data = await axios.put(`/api/v1/form-speciality/admin/${name}`, update);
        return data;
    }
};
export default FormSpecialityService;
