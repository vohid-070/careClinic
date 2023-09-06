import axios from '../library/axios';

const QueueService = {
    addMeeting: async (meetingCredentials) => {
        const { data } = await axios.post('/api/v1/queue/reception/add', meetingCredentials);
        return data;
    },
    addMeetingBySpeciality: async (meetingCredentials) => {
        const { data } = await axios.post('/api/v1/queue/reception/by-speciality', meetingCredentials);
        return data;
    },
    lastMeeting: async (meetingCredentials) => {
        const { data } = await axios.post('/api/v1/queue/reception/last', meetingCredentials);
        return data;
    }
};
export default QueueService;
