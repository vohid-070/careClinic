import axios from '../library/axios';

const PatientService = {
    searchPatient: async (param, page) => {
        const data = await axios.get('/api/v1/patient/search', {
            params: {
                param,
                page
            }
        });
        return data;
    },
    findPatient: async (param) => {
        const data = await axios.get('/api/v1/patient/find', {
            params: {
                param
            }
        });
        return data;
    },
    patientCreate: async (create) => {
        const data = await axios.post('/api/v1/patient/admin-reception/add', create);
        return data;
    },
    patientDelete: async (id) => {
        const data = await axios.delete(`/api/v1/patient/admin/${id}`);
        return data;
    },
    patientById: async (id) => {
        const data = await axios.get(`/api/v1/patient/${id}`);
        return data;
    },
    editPatient: async (id, update) => {
        const data = await axios.put(`/api/v1/patient/admin-reception/${id}`, update);
        return data;
    }
};
export default PatientService;
