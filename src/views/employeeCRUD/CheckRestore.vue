<script setup>
import { useSpecialityStore } from '@/stores/specialitiy';
import { useEmployeeStore } from '@/stores/employee';
import { usePatientStore } from '@/stores/patient';
import { useQueueStore } from '@/stores/queue';
import { storeToRefs } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, reactive } from 'vue';
import Check from '@/components/base/Check.vue';

const specialityStore = useSpecialityStore();
const employeeStore = useEmployeeStore();
const patientStore = usePatientStore();
const queueStore = useQueueStore();
const { speciality } = storeToRefs(specialityStore);
const currentPage = ref(0);
const meeting = ref(null);
const toast = useToast();

const meetingCredentials = reactive({
    speciality_id: null,
    employee_id: null,
    patient_id: null
});

const getSpeciality = async () => {
    await specialityStore.specialityList(currentPage.value);
};
const getEmployeeBySpeciality = async (id) => {
    await employeeStore.getEmployeeBySpeciality(id);
};
const findPatient = async () => {
    await patientStore.patientFind(meetingCredentials.patient_id);
};
const restoreMeeting = async () => {
    meeting.value = await queueStore.lastMeeting(meetingCredentials);
    if (meeting.value.message == 'No Such Element') {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Белгиланган кўрик топилмади',
            life: 3000,
            group: 'bc'
        });
    }
};

const clear = () => {
    meetingCredentials.speciality_id = null;
    meetingCredentials.employee_id = null;
    meetingCredentials.patient_id = null;
};
onMounted(() => {
    getSpeciality();
});
</script>

<template>
    <div class="card">
        <form ref="form" @submit.prevent="restoreMeeting">
            <div class="flex flex-wrap justify-content-around">
                <Dropdown
                    v-model="meetingCredentials.speciality_id"
                    showClear
                    :options="speciality.object"
                    optionValue="id"
                    @change="getEmployeeBySpeciality(meetingCredentials.speciality_id)"
                    optionLabel="name"
                    placeholder="Мутахассислиги"
                    class="w-22rem"
                />

                <Dropdown
                    v-model="meetingCredentials.employee_id"
                    optionValue="id"
                    :disabled="!meetingCredentials.speciality_id ? 'true' : false"
                    :options="employeeStore.employeeBySpeciality"
                    optionLabel="fullName"
                    placeholder="Доктор"
                    class="w-22rem"
                    showClear
                />

                <Dropdown v-model="meetingCredentials.patient_id" showClear optionValue="id" editable :options="patientStore.patient.object" optionLabel="fullName" placeholder="Бемор" @input="findPatient" class="w-22rem" />
            </div>
            <div class="flex justify-content-end mt-4 gap-3">
                <Button :disabled="meetingCredentials.employee_id && meetingCredentials.patient_id ? fasle : true" type="submit" label="Қайта тиклаш" severity="success" />
                <Button label="Тозалаш" @click="clear" />
            </div>
        </form>
    </div>
    <div v-if="meeting && meeting.message != 'No Such Element'">
        <Check>
            <template #body>
                <div class="text-center mb-4">
                    <h3 style="color: var(--black-900)">Добро пожаловать</h3>
                    <p>Ваш номер очереди:</p>
                    <b class="queue">{{ meeting.object.queue }}</b>
                </div>
                <p><b>Услуга:</b> {{ meeting.object.specialityIndex }}</p>
                <p><b>Имя доктора:</b> {{ meeting.object.employeeShortName }}</p>
                <p><b>Имя пациента:</b> {{ meeting.object.patientShortName }}</p>
                <p><b>Должность:</b> {{ meeting.object.level }}</p>
                <p><b>Этаж:</b> {{ meeting.object.stage }}</p>
                <p><b>Кабинет:</b> {{ meeting.object.room }}</p>
                <p><b>Время создания:</b> {{ meeting.object.created }}</p>
                <p><b>Примерное время приёма:</b> {{ meeting.object.enter_to_doctor_date }}</p>
            </template>
        </Check>
    </div>
</template>
<style>
.queue {
    font-size: 300%;
}
</style>
