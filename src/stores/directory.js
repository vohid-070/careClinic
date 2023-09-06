import { defineStore } from 'pinia';
import DirectoryService from '../services/directory.service';

export const useDirectoryStore = defineStore('directory', {
    state: () => ({
        directory: [],
        directorySearch: [],
        createdDirectory: {},
        deletedDirectory: {},
        directoryById: {},
        updatedDirectory: {}
    }),
    actions: {
        async directorySearchList(param, page) {
            const data = await DirectoryService.getDirectorySearchList(param, page);

            this.directorySearch = data.object;

            return data;
        },
        async directoryList() {
            const list = await DirectoryService.getDirectoryList();
            this.directory = list.data;
            return list;
        },
        async createDirectory(create) {
            const createDirectory = await DirectoryService.createDirectory(create);
            this.createdDirectory = createDirectory;
            return createDirectory;
        },
        async deleteDirectory(id) {
            const deleteDirectory = await DirectoryService.deleteDirectory(id);
            this.deletedDirectory = deleteDirectory;
            return deleteDirectory;
        },
        async getDirectoryById(id) {
            const getDirectoryById = await DirectoryService.getDirectoryById(id);
            this.directoryById = getDirectoryById.data.object;
            return getDirectoryById;
        },
        async updateDirectory(id, update) {
            const updateDirectory = await DirectoryService.updateDirectory(id, update);
            this.updatedDirectory = updateDirectory;
            return updateDirectory;
        }
    }
});
