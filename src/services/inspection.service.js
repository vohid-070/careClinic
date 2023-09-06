import axios from '@/library/axios';

const InspectionService = {
    createInspection: async (create) => {
        const data = axios.post('/api/v1/inspection/admin/add', create);
        return data;
    }
};

export default InspectionService;
