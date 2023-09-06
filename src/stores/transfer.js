import TransferService from '../services/transfer.service';
import { defineStore } from 'pinia';

export const useTransferStore = defineStore('transfer', {
    state: () => ({
        transfer: {
            content: []
        },
        transferList: [],
        createdTransfer: [],
        deletedTransfer: [],
        transferById: [],
        updatedTransfer: [],
        transferOnline: []
    }),
    actions: {
        async getTransferList(page) {
            const content = await TransferService.getTransferList(page);
            this.transfer = content.object;
            return content;
        },
        async getTransferSearchList(param, page) {
            const list = await TransferService.getTransferSearchList(param, page);
            this.transferList = list.object;
            return list;
        },
        async createTransfer(create) {
            const transferCreate = await TransferService.createTransfer(create);
            this.createdTransfer = transferCreate;
            return transferCreate;
        },
        async deleteTransfer(id) {
            const transferDelete = await TransferService.deleteTransfer(id);
            this.deletedTransfer = transferDelete;
            return transferDelete;
        },
        async getTransferById(id) {
            const data = await TransferService.getTransferById(id);
            this.transferById = data.data.object;
            return data;
        },
        async updateTransfer(id, update) {
            const transferUpdate = await TransferService.updateTransfer(id, update);
            this.updatedTransfer = transferUpdate;
            return transferUpdate;
        },
        async getTransferOnline(param) {
            const onlineTransfer = await TransferService.getTransferOnline(param);
            this.transferOnline = onlineTransfer.data;
            return onlineTransfer;
        }
    }
});
