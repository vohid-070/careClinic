import RoomService from '../services/room.service';
import { defineStore } from 'pinia';

export const useRoomStore = defineStore('room', {
    state: () => ({
        room: {
            content: []
        },
        roomList: [],
        created: [],
        deleted: [],
        roomById: [],
        updatedRoom: []
    }),
    actions: {
        async getRoomList() {
            const content = await RoomService.getRoomList();
            this.room = content.object;
            return content;
        },
        async getRoomSearchList(param, page) {
            const list = await RoomService.getRoomSearchList(param, page);
            this.roomList = list.data.object;
            return list;
        },
        async createRoom(create) {
            const createList = await RoomService.createRoom(create);
            this.created = createList;
            return createList;
        },
        async deleteRoom(id) {
            const deleteItem = await RoomService.deleteRoom(id);
            this.deleted = deleteItem;
            return deleteItem;
        },
        async getRoomById(id) {
            const roomDetail = await RoomService.getRoomById(id);
            this.roomById = roomDetail.data.object;
            return roomDetail;
        },
        async RoomUpdate(id, update) {
            const roomUpdate = await RoomService.updateRoom(id, update);
            this.updatedRoom = roomUpdate;
            return roomUpdate;
        }
    }
});
