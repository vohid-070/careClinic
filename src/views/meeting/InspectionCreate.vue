<script setup>
import { useInspectionStore } from '@/stores/inspection';
import { useFormSpecialityStore } from '@/stores/form-speciality';
import { useTransferStore } from '@/stores/transfer';
import { reactive, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const props = defineProps({
    patientId: [Number]
});

const router = useRouter();
const inspectionStore = useInspectionStore();
const formSpecialityStore = useFormSpecialityStore();
const { forms } = storeToRefs(formSpecialityStore);
const transferStore = useTransferStore();
const { transferOnline } = storeToRefs(transferStore);

const toast = useToast();

const inspectionCredentials = reactive({
    form_id: null,
    patient_id: props.patientId,
    transfer_id: null
});
const submitted = ref(false);
const loading = ref(false);

const getFormList = async () => {
    await formSpecialityStore.FormList();
};
const getTransferOnline = async () => {
    await transferStore.getTransferOnline(inspectionCredentials.transfer_id);
};

const create = async () => {
    submitted.value = true;
    if (inspectionCredentials.form_id && inspectionCredentials.transfer_id) {
        loading.value = true;
        const data = await inspectionStore.inspectionCreate(inspectionCredentials);
        if (data.status == 201) {
            loading.value = false;
            toast.add({ severity: 'success', summary: 'Created', detail: 'Муваффақиятли яратилди', group: 'bc', life: 3000 });
            router.push('/');
        } else {
            loading.value = false;
            toast.add({ severity: 'error', summary: 'Error', detail: 'Хатолик юз берди', group: 'bc', life: 3000 });
        }
    }
};

onMounted(() => {
    getFormList();
});
</script>

<template>
    <div>
        <form ref="form" @submit.prevent="create" v-if="forms">
            <div class="flex xl:gap-8 flex-wrap">
                <div class="flex flex-column">
                    <Dropdown
                        v-model="inspectionCredentials.form_id"
                        :class="{ 'p-invalid': submitted && !inspectionCredentials.form_id }"
                        :options="forms.object"
                        option-label="name"
                        option-value="form.id"
                        placeholder="Формани танланг"
                        style="width: 300px"
                    />
                    <small v-if="submitted && !inspectionCredentials.form_id" style="color: var(--red-500)">Формани танланг</small>
                </div>
                <div class="flex flex-column">
                    <Dropdown
                        v-model="inspectionCredentials.transfer_id"
                        :class="{ 'p-invalid': submitted && !inspectionCredentials.transfer_id }"
                        :options="transferOnline.object"
                        @input="getTransferOnline"
                        option-label="fullName"
                        editable
                        option-value="id"
                        placeholder="Шартномани танланг"
                        style="width: 650px"
                    />
                    <small v-if="submitted && !inspectionCredentials.transfer_id" style="color: var(--red-500)">Шартномани танланг</small>
                </div>
            </div>
            <div class="flex justify-content-end mt-4">
                <Button label="Яратиш" type="submit" :loading="loading" />
            </div>
        </form>
    </div>
</template>
