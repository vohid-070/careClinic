<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRegionStore } from '@/stores/region';
import { storeToRefs } from 'pinia';
import { usePatientStore } from '@/stores/patient';

const regionStore = useRegionStore();
const { region } = storeToRefs(regionStore);
const patientStore = usePatientStore();

const currentPage = ref(0);
const submitted = ref(false);
const loading = ref(false);
const patientCredentials = reactive({
    name: '',
    surname: '',
    gender: '',
    phone: '',
    address: '',
    region_id: 0,
    birthDate: ''
});
const gender = reactive([
    { name: 'Аёл', value: 'FEMALE' },
    { name: 'Эркак', value: 'MALE' }
]);

const getRegionList = async () => {
    await regionStore.getRegionList(currentPage.value);
};

const emit = defineEmits(['created']);
const CreatePatient = async () => {
    submitted.value = true;

    if (patientCredentials.name && patientCredentials.surname && patientCredentials.phone && patientCredentials.address && patientCredentials.region_id && patientCredentials.birthDate) {
        loading.value = true;
        const created = await patientStore.patientCreate(patientCredentials);
        if (created.status == 201) {
            loading.value = false;
            submitted.value = false;
        } else {
            loading.value = false;
        }
        emit('created', created);
    }
};

onMounted(() => {
    getRegionList();
});
</script>

<template>
    <form ref="form" @submit.prevent="CreatePatient">
        <div class="flex gap-3 flex-wrap">
            <div class="flex flex-column">
                <b>Исми</b>
                <InputText v-model="patientCredentials.name" placeholder="Бемор исми" :class="{ 'p-invalid': submitted && !patientCredentials.name }" />
                <small v-if="submitted && !patientCredentials.name" style="color: var(--red-500)">Бемор исмини киритинг</small>
            </div>
            <div class="flex flex-column">
                <b>Фамилияси</b>
                <InputText v-model="patientCredentials.surname" placeholder="Бемор фамилияси" :class="{ 'p-invalid': submitted && !patientCredentials.surname }" />
                <small v-if="submitted && !patientCredentials.surname" style="color: var(--red-500)">Бемор фамилияси киритинг</small>
            </div>
            <div class="flex flex-column">
                <b>Жинси</b>
                <Dropdown v-model="patientCredentials.gender" :options="gender" showClear optionLabel="name" optionValue="value" placeholder="Жинси" :class="{ 'p-invalid': submitted && !patientCredentials.gender }" />
                <small v-if="submitted && !patientCredentials.gender" style="color: var(--red-500)">Бемор жинсини киритинг</small>
            </div>
            <div class="flex flex-column">
                <b>Телефон рақами</b>
                <InputMask v-model="patientCredentials.phone" mask="999999999999" placeholder="Телефон рақам" :class="{ 'p-invalid': submitted && !patientCredentials.phone }" />
                <small v-if="submitted && !patientCredentials.phone" style="color: var(--red-500)">Телефон рақамни киритинг</small>
            </div>
            <div class="flex flex-column">
                <b>Манзили</b>
                <InputText v-model="patientCredentials.address" placeholder="Манзил" :class="{ 'p-invalid': submitted && !patientCredentials.address }" />
                <small v-if="submitted && !patientCredentials.address" style="color: var(--red-500)">Беморнинг манзилини киритинг</small>
            </div>
            <div class="flex flex-column">
                <b>Вилояти</b>
                <Dropdown v-model="patientCredentials.region_id" showClear :options="region.content" optionLabel="name" optionValue="id" placeholder="Вилояти" :class="{ 'p-invalid': submitted && !patientCredentials.region_id }" />
                <small v-if="submitted && !patientCredentials.region_id" style="color: var(--red-500)">Вилоятни киритинг</small>
            </div>
            <div class="flex flex-column">
                <b>Туғилган санаси</b>
                <InputMask v-model="patientCredentials.birthDate" mask="9999-99-99" placeholder="йил-ой-кун" :class="{ 'p-invalid': submitted && !patientCredentials.birthDate }" />
                <small v-if="submitted && !patientCredentials.birthDate" style="color: var(--red-500)">Туғилган санани киритинг</small>
            </div>
        </div>
        <div class="flex justify-content-end">
            <Button label="Яратиш" class="mt-4 flex justify-content-end" type="submit" :loading="loading" />
        </div>
    </form>
</template>

<style>
.p-inputtext,
.p-dropdown {
    width: 300px;
}
</style>
