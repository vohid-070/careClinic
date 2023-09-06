import StageService from '../services/stage.service';
import { defineStore } from 'pinia';

export const useStageStore = defineStore('stage', {
    state: () => ({
        stage: {
            content: []
        },
        stageList: [],
        createdStage: [],
        deletedStage: [],
        stageById: [],
        updatedStage: []
    }),
    actions: {
        async getStageList() {
            const content = await StageService.getStageList();
            this.stage = content.object;
            return content;
        },
        async getStageSearchList(param, page) {
            const list = await StageService.getStageSearchList(param, page);
            this.stageList = list.object;
            return list;
        },
        async createStage(create) {
            const stageCreate = await StageService.createStage(create);
            this.createdStage = stageCreate;
            return stageCreate;
        },
        async deleteStage(id) {
            const stageDelete = await StageService.deleteStage(id);
            this.deletedStage = stageDelete;
            return stageDelete;
        },
        async getStageById(id) {
            const data = await StageService.getStageById(id);
            this.stageById = data.data.object;
            return data;
        },
        async updateStage(id, update) {
            const stageUpdate = await StageService.updateStage(id, update);
            this.updatedStage = stageUpdate;
            return stageUpdate;
        }
    }
});
