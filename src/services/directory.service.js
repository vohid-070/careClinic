import axios from '@/library/axios';

const DirectoryService = {
    async getDirectorySearchList(param, page) {
        const { data } = await axios.get('/api/v1/directory/search', {
            params: {
                param,
                page
            }
        });
        return data;
    },
    async getDirectoryList() {
        const data = await axios.get('/api/v1/directory/list');
        return data;
    },
    async createDirectory(create) {
        const data = await axios.post('/api/v1/directory/admin/', create);
        return data;
    },
    async deleteDirectory(id) {
        const data = await axios.delete(`/api/v1/directory/admin/${id}`);
        return data;
    },
    async getDirectoryById(id) {
        const data = await axios.get(`/api/v1/directory/${id}`);
        return data;
    },
    async updateDirectory(id, update) {
        const data = await axios.put(`/api/v1/directory/admin/${id}`, update);
        return data;
    }
};
export default DirectoryService;
