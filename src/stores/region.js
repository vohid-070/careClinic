import RegionService from '@/services/region.service';
import { defineStore } from 'pinia';

export const useRegionStore = defineStore('region', {
    state: () => ({
        region: {
            content: []
        }
    }),
    actions: {
        async getRegionList(page) {
            const content = await RegionService.getRegionList(page);
            this.region = content.data.object;
            return content;
        }
    }
});
