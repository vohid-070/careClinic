<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref, reactive } from 'vue';
import { usePatientStore } from '@/stores/patient';
import { useRegionStore } from '@/stores/region';

const props = defineProps({
    editedId: [Number]
});

const regionStore = useRegionStore();
const { region } = storeToRefs(regionStore);
const currentPage = ref(0);
const patientStore = usePatientStore();
const { patientById } = storeToRefs(patientStore);
const loading = ref(false);
const submitted = ref(false);

const gender = reactive([
    { name: 'Аёл', value: 'FEMALE' },
    { name: 'Эркак', value: 'MALE' }
]);

const getPatientById = async () => {
    await patientStore.getPatientById(props.editedId);
};
const getRegionList = async () => {
    await regionStore.getRegionList(currentPage.value);
};

const emit = defineEmits(['edited']);

const error = ref();

async function edit() {
    try {
        loading.value = true;
        submitted.value = true;
        const udpatedPatient = {};

        Object.assign(udpatedPatient, patientById.value);
        udpatedPatient.region_id = patientById.value.region.id;
        if (udpatedPatient.name && udpatedPatient.surname && udpatedPatient.phone && udpatedPatient.address && udpatedPatient.region_id && udpatedPatient.birthDate) {
            const data = await patientStore.patientUpdate(props.editedId, udpatedPatient);
            emit('edited', data);
        }
    } catch (e) {
        error.value = e;
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    getPatientById();
    getRegionList();
});
</script>

<template>
    <form @submit.prevent="edit">
        <div class="flex gap-3 flex-wrap">
            <Skeleton v-if="!patientById" style="height: 200px" />
            <div class="flex flex-column">
                <b>Исми</b>
                <InputText v-model="patientById.name" placeholder="Бемор исми" :class="{ 'p-invalid': submitted && !patientById.name }" />
                <small v-if="submitted && !patientById.name" style="color: var(--red-500)">Бемор исмини киритинг</small>
            </div>
            <div class="flex flex-column">
                <b>Фамилияси</b>
                <InputText v-model="patientById.surname" placeholder="Бемор фамилияси" :class="{ 'p-invalid': submitted && !patientById.surname }" />
                <small v-if="submitted && !patientById.surname" style="color: var(--red-500)">Бемор фамилияси киритинг</small>
            </div>
            <div class="flex flex-column">
                <b>Жинси</b>
                <Dropdown v-model="patientById.gender" :options="gender" option-label="name" option-value="value" showClear placeholder="Жинси" :class="{ 'p-invalid': submitted && !patientById.gender }" />
                <small v-if="submitted && !patientById.gender" style="color: var(--red-500)">Бемор жинсини киритинг</small>
            </div>
            <div class="flex flex-column">
                <b>Телефон рақами</b>
                <InputMask v-model="patientById.phone" mask="999999999999" placeholder="phone" :class="{ 'p-invalid': submitted && !patientById.phone }" />
                <small v-if="submitted && !patientById.phone" style="color: var(--red-500)">Телефон рақамни киритинг</small>
            </div>
            <div class="flex flex-column">
                <b>Манзили</b>
                <InputText v-model="patientById.address" placeholder="Манзил" :class="{ 'p-invalid': submitted && !patientById.address }" />
                <small v-if="submitted && !patientById.address" style="color: var(--red-500)">Беморнинг манзилини киритинг</small>
            </div>
            <div class="flex flex-column">
                <b>Вилояти</b>
                <Dropdown v-model="patientById.region" :options="region.content" option-label="name" showClear placeholder="Вилояти" :class="{ 'p-invalid': submitted && !patientById.region }" />
                <small v-if="submitted && !patientById.region" style="color: var(--red-500)">Вилоятни киритинг</small>
            </div>
            <div class="flex flex-column">
                <b>Туғилган санаси</b>
                <InputMask v-model="patientById.birthDate" mask="9999-99-99" placeholder="йил-ой-кун" :class="{ 'p-invalid': submitted && !patientById.birthDate }" />
                <small v-if="submitted && !patientById.birthDate" style="color: var(--red-500)">Туғилган санани киритинг</small>
            </div>
        </div>
        <div class="flex justify-content-end">
            <Button label="Янгилаш" class="mt-4 flex justify-content-end" type="submit" :loading="loading" />
        </div>
    </form>
</template>
