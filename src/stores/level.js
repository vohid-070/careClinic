import { defineStore } from 'pinia';
import LevelService from '../services/level.service';

export const useLevelStore = defineStore('level', {
    state: () => ({
        level: {
            content: []
        },
        levelSearch: [],
        levelById: [],
        updatedLevel: [],
        deletedLevel: [],
        createdLevel: []
    }),
    actions: {
        async getLevelList() {
            const content = await LevelService.getLevelList();
            this.level = content.object;
            return content;
        },
        async getLevelSearchList(param, page) {
            const data = await LevelService.getLevelSearchList(param, page);
            this.levelSearch = data.data.object;
            return data;
        },
        async getLevelById(id) {
            const getLevelById = await LevelService.getLevelById(id);
            this.levelById = getLevelById.data.object;
            return getLevelById;
        },
        async updateLevel(id, update) {
            const updateLevel = await LevelService.updateLevel(id, update);
            this.updatedLevel = updateLevel;
            return updateLevel;
        },
        async deleteLevel(id) {
            const deleteLevel = await LevelService.deleteLevel(id);
            this.deletedDirectory = deleteLevel;
            return deleteLevel;
        },
        async createLevel(create) {
            const createLevel = await LevelService.createLevel(create);
            this.createdLevel = createLevel;
            return createLevel;
        }
    }
});
