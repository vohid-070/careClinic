import axios from '@/library/axios';

const ExternalEmployeeService = {
    async getEmployeeList(page, param) {
        const data = await axios.get('/api/v1/external/search', {
            params: {
                page,
                param
            }
        });
        return data;
    },
    async getEmployee() {
        const { data } = await axios.get('/api/v1/external/list');
        return data;
    },
    async getEmployeeById(id) {
        const data = await axios.get(`/api/v1/external/${id}`);
        return data;
    },
    async deleteEmployee(id) {
        const data = await axios.delete(`/api/v1/external/admin/${id}`);
        return data;
    },
    async updateEmployee(id, update) {
        const data = await axios.put(`/api/v1/external/admin/${id}`, update);
        return data;
    },
    async createEmployee(create) {
        const data = await axios.post('/api/v1/external/admin/', create);
        return data;
    }
};
export default ExternalEmployeeService;
