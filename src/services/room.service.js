import axios from '../library/axios';

const RoomService = {
    getRoomList: async () => {
        const { data } = await axios.get('/api/v1/room/list');
        return data;
    },
    getRoomSearchList: async (param, page) => {
        const data = await axios.get('/api/v1/room/search', {
            params: {
                param,
                page
            }
        });
        return data;
    },
    createRoom: async (create) => {
        const data = await axios.post('/api/v1/room/admin/', create);
        return data;
    },
    deleteRoom: async (id) => {
        const data = await axios.delete(`/api/v1/room/admin/${id}`);
        return data;
    },
    getRoomById: async (id) => {
        const data = await axios.get(`/api/v1/room/${id}`);
        return data;
    },
    updateRoom: async (id, update) => {
        const data = await axios.put(`/api/v1/room/admin/edit/${id}`, update);
        return data;
    }
};
export default RoomService;
