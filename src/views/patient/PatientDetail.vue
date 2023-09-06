<script setup>
import router from '@/router';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useResultStore } from '@/stores/result';
import FilesDetail from './FilesDetail.vue';
import MeetingDetail from '@/views/meeting/MeetingDetail.vue';
import { useMeetingStore } from '@/stores/meeting';
import PersonalInformation from '@/views/patient/PersonalInformation.vue';

const props = defineProps({
    id: [Number]
});

const role = localStorage.getItem('user');

const resultStore = useResultStore();
const { resultPatient } = storeToRefs(resultStore);
const meetingStore = useMeetingStore();
const { meetingPatientList } = storeToRefs(meetingStore);

const addedFile = ref();
const removedFile = ref();
const meetingDetail = ref(false);
const meetingId = ref(0);
const currentPage = ref(0);

const percentage = new Intl.NumberFormat('ru-Ru');

const getPatientById = async () => {
    await resultStore.getResultPatient(props.id);
};
const getMeetingPatientList = async () => {
    await meetingStore.getMeetingPatientList(props.id, currentPage.value);
};
onMounted(() => {
    getPatientById();
    getMeetingPatientList();
});
function cancel() {
    router.push('/');
}
const createdFile = (added) => {
    addedFile.value = added;
    if (added.status == 201) getPatientById();
};
const deletedFile = (deleted) => {
    removedFile.value = deleted;
    if (deleted.status == 200) getPatientById();
};
const showMeetingDetail = (id) => {
    meetingDetail.value = true;
    meetingId.value = id;
};
</script>

<template>
    <div class="card">
        <TabView>
            <TabPanel v-if="resultPatient" header="Персонал маълумотлари">
                <PersonalInformation :personalInformation="resultPatient.patient" />
            </TabPanel>

            <TabPanel header="Қабул тарихи" v-if="meetingPatientList">
                <DataTable :value="meetingPatientList.content">
                    <template #empty>Ҳеч қандай маълумот топилмади</template>
                    <Column field="meeting_id" header="ID" />
                    <Column field="patient_name" header="Бемор ФИО" />
                    <Column field="employee_name" header="Доктор ФИО" />
                    <!-- <Column field="external_employee_name" header="Хамкор доктор ФИО" /> -->
                    <Column field="created" header="Сана" />
                    <Column field="speciality" header="Мутахассислиги" />

                    <Column field="sum" header="Тўлов суммаси">
                        <template #body="slotProps">
                            <p>{{ percentage.format(slotProps.data.sum) }}</p>
                        </template>
                    </Column>

                    <!-- <Column field="pay_type" header="Тўлов тури">
                        <template #body="slotProps">
                            <p v-if="slotProps.data.pay_type == 'IN_PLACE_CASH'">Нақд</p>
                            <p v-if="slotProps.data.pay_type == 'IN_PLACE_CARD'">Карта</p>
                            <p v-if="slotProps.data.pay_type == 'TRANSFER'">Перечисление</p>
                        </template>
                    </Column> -->
                    <Column field="serviced" header="Кўрик холати">
                        <template #body="slotProps">
                            <p v-if="slotProps.data.serviced == true" class="text-center">
                                <i class="pi pi-check" style="font-size: 1rem; color: var(--green-600)" />
                            </p>
                            <p v-if="slotProps.data.serviced == false" class="text-center">
                                <i class="pi pi-times" style="font-size: 1rem; color: var(--red-500)" />
                            </p>
                        </template>
                    </Column>
                    <!-- <Column field="cashed" header="Тўлов холати">
                        <template #body="slotProps">
                            <p v-if="slotProps.data.cashed == true">
                                <i class="pi pi-check" style="font-size: 1rem"></i>
                            </p>
                            <p v-if="slotProps.data.cashed == false">
                                <i class="pi pi-times" style="font-size: 1rem"></i>
                            </p>
                        </template>
                    </Column> -->
                    <Column field="view" style="width: 10%">
                        <template #header>
                            <div class="mx-auto">
                                <i class="pi pi-ellipsis-v"></i>
                            </div>
                        </template>
                        <template #body="slotProps">
                            <div class="flex gap-2 justify-content-center">
                                <Button class="p-2" severity="primary" icon="pi pi-eye" outlined @click.prevent="showMeetingDetail(slotProps.data.meeting_id)" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
                <Paginator v-model:first="currentPage" v-on:update:first="getMeetingPatientList" :rows="1" :total-records="meetingPatientList.totalPages">
                    <template #start></template>
                    <template #end>
                        <div class="totalElements"><b>Элементлар сони: </b> {{ meetingPatientList.totalElements }}</div>
                    </template>
                </Paginator>
            </TabPanel>
            <TabPanel header="Анализ натижалари">
                <FilesDetail :detailId="props.id" :resultPatient="resultPatient" @created="createdFile" @deleted="deletedFile" />
            </TabPanel>
        </TabView>

        <Dialog v-model:visible="meetingDetail" modal header="Қабул тафсилотлари" style="width: 67vw">
            <MeetingDetail :meeting-id="meetingId" />
        </Dialog>
    </div>

    <div class="flex justify-content-end">
        <Button label="Ортга" severity="danger" @click.prevent="cancel" />
    </div>
</template>
