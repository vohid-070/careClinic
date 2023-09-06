import axios from '@/library/axios';

const RegionService = {
    getRegionList: async (param, page) => {
        const data = await axios.get('/api/v1/region/', {
            params: {
                page
            }
        });
        return data;
    }
};
export default RegionService;
