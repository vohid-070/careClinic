<script setup>
import { useFormSpecialityStore } from '@/stores/form-speciality';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const formSpecialityStore = useFormSpecialityStore();
const { formById } = storeToRefs(formSpecialityStore);

const props = defineProps({
    detailId: [Number]
});

const getFormById = async () => {
    await formSpecialityStore.getFormById(props.detailId);
};

onMounted(() => {
    getFormById();
});
</script>

<template>
    <div style="font-size: 18px">
        <div class="mb-4">
            <b>Форма:</b>
            <p>{{ formById.form.name }}</p>
        </div>
        <b>Мутахассислик: </b>
        <div v-for="(speciality, index) in formById.specialities" :key="speciality.id" style="margin-top: 0">
            <p style="list-style: none">{{ index + 1 }}. {{ speciality.name }}</p>
        </div>
    </div>
</template>
