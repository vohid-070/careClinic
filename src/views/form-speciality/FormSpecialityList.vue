<script setup>
import { useFormSpecialityStore } from '@/stores/form-speciality';
import { useSpecialityStore } from '@/stores/specialitiy';
import { useFormStore } from '@/stores/form';
import { storeToRefs } from 'pinia';
import { onMounted, ref, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import FormSpecialityDetail from './FormSpecialityDetail.vue';

const specialityStore = useSpecialityStore();
const formSpecialityStore = useFormSpecialityStore();
const formStore = useFormStore();
const { speciality } = storeToRefs(specialityStore);
const { form } = storeToRefs(formStore);
const { formList } = storeToRefs(formSpecialityStore);
const { formById } = storeToRefs(formSpecialityStore);
const toast = useToast();
const confirm = useConfirm();

const currentPage = ref(0);
const search = ref('');
const tableLoading = ref(false);
const create = ref(false);
const loadingCreate = ref(false);
const submitted = ref(false);
const updateId = ref(null);
const updateDialog = ref(false);
const updateLoading = ref(false);
const detailDialog = ref(false);
const detailId = ref(0);

const formCredentials = reactive({
    form_id: 0,
    specialities: []
});

const getFormList = async () => {
    tableLoading.value = true;
    const data = await formSpecialityStore.getFormSearchList(search.value, currentPage.value);
    if (data) tableLoading.value = false;
};
const getForm = async () => {
    await formStore.getFormList();
};
const getSpeciality = async () => {
    await specialityStore.specialityList();
};

const showCreate = () => {
    create.value = true;
};

const createForm = async () => {
    submitted.value = true;
    if (!submitted.value) loadingCreate.value = true;
    if (formCredentials.specialities.length > 0 && formCredentials.form_id) {
        const data = await formSpecialityStore.createForm(formCredentials);
        if (data.status == 201) {
            create.value = false;
            submitted.value = false;
            formCredentials.name = '';
            toast.add({ severity: 'success', summary: 'Муваффақиятли', detail: 'Муваффақиятли яратилди', group: 'bc', life: 3000 });
            getFormList();
        }
    }
};
const getFormById = async (id) => {
    await formSpecialityStore.getFormById(id);
    updateId.value = id;
    updateDialog.value = true;
};
const formDetail = async (id) => {
    await formSpecialityStore.getFormById(id);
    detailId.value = id;
    detailDialog.value = true;
};

const daleteForm = async (id) => {
    confirm.require({
        message: 'Сиз ҳақиқатдан ҳам ушбу формани ўчирмоқчимисиз?',
        header: 'Ўчиришни тасдиқланг',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Ҳа',
        rejectLabel: 'Йўқ',
        accept: async () => {
            tableLoading.value = true;
            const deletedElement = await formSpecialityStore.deleteForm(id);
            if (deletedElement.status == 200) {
                tableLoading.value = false;
                toast.add({ severity: 'success', summary: 'Ўчирилди', detail: 'Муваффақиятли ўчирилди', group: 'bc', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Хатолик', detail: 'Ўчиришда хатолик юз берди', group: 'bc', life: 3000 });
            }
            getFormList();
        },
        reject: () => {
            tableLoading.value = false;
        }
    });
};
const updateForm = async () => {
    submitted.value = true;

    const speciality_id = reactive([]);
    const form = reactive({
        updatedForm: {}
    });
    const update = ref();
    formById.value.specialities.forEach((speciality) => {
        speciality_id.value = speciality_id.push(speciality.id);
    });

    if (formById.value.form && formById.value.specialities.length > 0) {
        form.updatedForm.form_id = formById.value.form.id;
        form.updatedForm.specialities = [...speciality_id];
        update.value = form.updatedForm;

        updateLoading.value = true;

        const updated = await formSpecialityStore.updateForm(updateId.value, update.value);
        if (updated.status == 200) {
            updateLoading.value = false;
            updateDialog.value = false;
            submitted.value = false;
            toast.add({ severity: 'success', summary: 'Муваффақиятли', detail: 'Муваффақиятли янгиланди', group: 'bc', life: 3000 });
            getFormList();
        } else {
            toast.add({ severity: 'error', summary: 'Error', detail: updated, group: 'bc', life: 3000 });
            updateLoading.value = false;
            updateDialog.value = false;
            submitted.value = false;
            getFormList();
        }
    }
};

onMounted(() => {
    getFormList();
    getForm();
    getSpeciality();
});
</script>

<template>
    <div>
        <DataTable :value="formList.content" lazy :loading="tableLoading">
            <template #empty>Ҳеч қандай маълумот топилмади</template>
            <template #header>
                <div class="flex justify-content-between">
                    <InputText v-model="search" placeholder="Қидириш" @input="getFormList(search)" />
                    <Button label="Яратиш" icon="pi pi-plus" @click="showCreate" />
                </div>
            </template>
            <Column field="id" header="ID" />
            <Column field="name" header="Форма ташкил килувчилари" />
            <Column field="view" style="width: 10%">
                <template #header>
                    <div class="mx-auto">
                        <i class="pi pi-ellipsis-v"></i>
                    </div>
                </template>
                <template #body="slotProps">
                    <div class="flex gap-2 justify-content-center">
                        <Button :modelValue="slotProps.view" icon="pi pi-eye" class="p-2" outlined severity="primary" @click.prevent="formDetail(slotProps.data.uniqueId)" />
                        <Button :modelValue="slotProps.view" icon="pi pi-pencil" class="p-2" outlined severity="primary" @click.prevent="getFormById(slotProps.data.uniqueId)" />
                        <Button class="p-2" severity="danger" icon="pi pi-trash" outlined @click.prevent="daleteForm(slotProps.data.uniqueId)" />
                    </div>
                </template>
            </Column>
        </DataTable>
        <Paginator v-model:first="currentPage" v-on:update:first="getFormList" :rows="1" :total-records="formList.totalPages">
            <template #start>
                <!-- <div></div> -->
            </template>
            <template #end>
                <div class="totalElements"><b>Элементлар сони: </b> {{ formList.totalElements }}</div>
            </template>
        </Paginator>
        <Dialog v-model:visible="create" modal header="Форма ташкил қилувчиларини яратиш">
            <form ref="formCreate" @submit.prevent="createForm">
                <div class="flex">
                    <div class="flex flex-column">
                        <Dropdown v-model="formCredentials.form_id" :options="form" optionLabel="name" optionValue="id" :class="{ 'p-invalid': submitted && !formCredentials.form_id }" placeholder="Формани танланг" class="mr-4" style="width: 300px" />
                        <small v-if="submitted && !formCredentials.form_id" style="color: var(--red-500)">Формани киритинг</small>
                    </div>
                    <div class="flex flex-column">
                        <MultiSelect
                            v-model="formCredentials.specialities"
                            :options="speciality"
                            optionLabel="name"
                            optionValue="id"
                            :class="{ 'p-invalid': submitted && formCredentials.specialities.length <= 0 }"
                            placeholder="Мутахассисликни киритинг"
                            class="mr-4"
                            style="width: 300px"
                        />
                        <small v-if="submitted && formCredentials.specialities.length <= 0" style="color: var(--red-500)">Мутахассисликни киритинг</small>
                    </div>
                </div>
                <div class="flex justify-content-end mt-4">
                    <Button label="Яратиш" :loading="loadingCreate" type="submit" />
                </div>
            </form>
        </Dialog>
        <Dialog v-model:visible="updateDialog" modal header="Форма ташкил қилувчилари ҳақида маълумотлар">
            <form ref="formUpdate" @submit.prevent="updateForm">
                <div class="flex">
                    <div class="flex flex-column">
                        <Dropdown v-model="formById.form" :options="form" disabled showClear optionLabel="name" :class="{ 'p-invalid': submitted && !formById.form }" placeholder="Формани киритинг" class="mr-4" style="width: 300px" />

                        <small v-if="submitted && !formById.form" style="color: var(--red-500)">Формани киритинг</small>
                    </div>
                    <div class="flex flex-column">
                        <MultiSelect
                            v-model="formById.specialities"
                            :options="speciality"
                            option-label="name"
                            :class="{ 'p-invalid': submitted && formById.specialities.length <= 0 }"
                            placeholder="Мутахассисликни киритинг"
                            class="mr-4"
                            style="width: 300px"
                        />
                        <small v-if="submitted && formById.specialities.length <= 0" style="color: var(--red-500)">Мутахассисликни киритинг</small>
                    </div>
                </div>
                <div class="flex justify-content-end mt-4">
                    <Button label="Янгилаш" :loading="updateLoading" type="submit" />
                </div>
            </form>
        </Dialog>
        <Dialog v-model:visible="detailDialog" modal header="Форма ташкил қилувчилари ҳақида маълумотлар" style="width: 35vw">
            <FormSpecialityDetail :detail-id="detailId" />
        </Dialog>
    </div>
</template>
