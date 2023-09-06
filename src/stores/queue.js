import { defineStore } from 'pinia';
import QueueService from '../services/queue.service';

export const useQueueStore = defineStore('queue', {
    state: () => ({
        queue: {
            content: []
        },
        addedMeeting: [],
        addedMeetingBySpeciality: []
    }),
    actions: {
        async meetingAdd(meetingCredentials) {
            const meeting = await QueueService.addMeeting(meetingCredentials);
            this.addedMeeting = meeting;
            return meeting;
        },
        async addMeetingBySpeciality(meetingCredentials) {
            const meetingBySpec = await QueueService.addMeetingBySpeciality(meetingCredentials);
            this.addedMeetingBySpeciality = meetingBySpec;
            return meetingBySpec;
        },
        async lastMeeting(meetingCredentials) {
            const data = await QueueService.lastMeeting(meetingCredentials);
            this.queue = data;
            return data;
        }
    }
});
