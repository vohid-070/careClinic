<script setup>
import { useCabinetStore } from '@/stores/cabinet';
import { storeToRefs } from 'pinia';
import { ref, onMounted, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const role = localStorage.getItem('user');

const confirm = useConfirm();
const toast = useToast();
const cabinetStore = useCabinetStore();
const { cabinetSearch } = storeToRefs(cabinetStore);
const { cabinetById } = storeToRefs(cabinetStore);

const currentPage = ref(0);
const search = ref('');
const tableLoading = ref(false);
const create = ref(false);
const loadingCreate = ref(false);
const submitted = ref(false);
const updateId = ref(null);
const updateDialog = ref(false);
const submitUpdate = ref(false);
const loadingUpdate = ref(false);

const type = reactive([
    { name: 'ОДДИЙ', value: 'SIMPLE' },
    { name: 'ЯРИМ ЛЮКС', value: 'DE_LUX' },
    { name: 'ЛЮКС', value: 'LUX' }
]);

const cabinetCredentials = reactive({
    name: '',
    status: true,
    type: ''
});

const getCabinetList = async () => {
    tableLoading.value = true;
    const data = await cabinetStore.cabinetSearchList(search.value, currentPage.value);
    if (data) tableLoading.value = false;
};

const showCreate = () => {
    create.value = true;
};

const createCabinet = async () => {
    submitted.value = true;
    if (cabinetCredentials.name && cabinetCredentials.type) {
        loadingCreate.value = true;
        const created = await cabinetStore.cabinetCreate(cabinetCredentials);

        if (created.status == 201) {
            toast.add({
                severity: 'success',
                summary: 'Муваффақиятли',
                detail: 'Муваффақиятли яратилди!',
                life: 3000,
                group: 'bc'
            });
            getCabinetList();
            create.value = false;
            loadingCreate.value = false;
            cabinetCredentials.name = '';
            cabinetCredentials.status = false;
            cabinetCredentials.type = '';
            submitted.value = false;
        } else {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Илтимос киритилган маълумотларни текшириб кўринг!',
                life: 3000,
                group: 'bc'
            });
        }
        loadingCreate.value = false;
    }
};

const deleteCabinet = async (id) => {
    confirm.require({
        message: 'Сиз ҳақиқатдан ҳам ушбу палатани ўчирмоқчимисиз?',
        header: 'Ўчиришни тасдиқланг',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Ҳа',
        rejectLabel: 'Йўқ',
        accept: async () => {
            tableLoading.value = true;
            const deletedElement = await cabinetStore.cabinetDelete(id);
            if (deletedElement.status == 200) {
                tableLoading.value = false;
                toast.add({ severity: 'success', summary: 'Ўчирилди', detail: 'Муваффақиятли ўчирилди', group: 'bc', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Хатолик', detail: 'Ўчиришда хатолик юз берди', group: 'bc', life: 3000 });
            }
            getCabinetList();
        },
        reject: () => {
            tableLoading.value = false;
        }
    });
};

const getCabinetById = async (id) => {
    updateDialog.value = true;
    updateId.value = id;
    await cabinetStore.getCabinetById(id);
};

const error = ref();

const updateCabinet = async () => {
    try {
        submitUpdate.value = true;
        loadingUpdate.value = true;
        const udpatedCabinet = {};
        Object.assign(udpatedCabinet, cabinetById.value);

        if (cabinetById.value.name && cabinetById.value.type) {
            const updated = await cabinetStore.updateCabinet(updateId.value, udpatedCabinet);
            if (updated.status == 200) {
                toast.add({ severity: 'success', summary: 'Янгиданди', detail: 'Муваффақиятли янгиданди', group: 'bc', life: 3000 });
                submitUpdate.value = false;
                updateDialog.value = false;
                getCabinetList();
            }
        }
    } catch (e) {
        error.value = e;
    } finally {
        loadingUpdate.value = false;
    }
};

onMounted(() => {
    getCabinetList();
});
</script>

<template>
    <div>
        <DataTable :value="cabinetSearch.content" lazy :loading="tableLoading">
            <template #empty>Ҳеч қандай маълумот топилмади</template>
            <template #header>
                <div class="flex justify-content-between">
                    <InputText v-model="search" placeholder="Қидириш" @input="getCabinetList(search)" />
                    <Button v-if="role == 'ADMIN'" label="Палата яратиш" icon="pi pi-plus" @click="showCreate" />
                </div>
            </template>
            <Column field="id" header="ID" />
            <Column field="name" header="Палата" />
            <Column field="type" header="Палата тури">
                <template #body="slotProps">
                    <p v-if="slotProps.data.type == 'LUX'">ЛЮКС</p>
                    <p v-if="slotProps.data.type == 'DE_LUX'">ЯРИМ ЛЮКС</p>
                    <p v-if="slotProps.data.type == 'SIMPLE'">ОДДИЙ</p>
                </template>
            </Column>
            <Column field="status" header="Палата ҳолати">
                <template #body="slotProps">
                    <b v-if="slotProps.data.status == true" style="color: var(--green-600)">Яроқли</b>
                    <b v-if="slotProps.data.status == false" style="color: var(--red-500)">Яроқсиз</b>
                </template>
            </Column>
            <Column v-if="role == 'ADMIN'" field="view" style="width: 10%">
                <template #header>
                    <div class="mx-auto">
                        <i class="pi pi-ellipsis-v"></i>
                    </div>
                </template>
                <template #body="slotProps">
                    <div class="flex gap-2 justify-content-center">
                        <Button :modelValue="slotProps.view" icon="pi pi-pencil" class="p-2" outlined severity="primary" @click.prevent="getCabinetById(slotProps.data.id)" />
                        <Button class="p-2" severity="danger" icon="pi pi-trash" outlined @click.prevent="deleteCabinet(slotProps.data.id)" />
                    </div>
                </template>
            </Column>
        </DataTable>
        <!-- Paginator -->
        <Paginator v-model:first="currentPage" v-on:update:first="getCabinetList" :rows="1" :total-records="cabinetSearch.totalPages">
            <template #start></template>
            <template #end>
                <div class="totalElements"><b>Элементлар сони: </b> {{ cabinetSearch.totalElements }}</div>
            </template>
        </Paginator>
        <!-- Cabinet create -->
        <Dialog v-model:visible="create" modal header="Палата яратиш" style="width: 25vw">
            <form ref="formCreate" @submit.prevent="createCabinet">
                <div class="flex flex-column gap-3">
                    <div class="flex flex-column">
                        <small style="font-weight: bold">Палата</small>
                        <InputText v-model="cabinetCredentials.name" :class="{ 'p-invalid': submitted && !cabinetCredentials.name }" placeholder="Палатани киритинг" class="mr-4" />
                        <small v-if="submitted && !cabinetCredentials.name" style="color: var(--red-500)">Палатани киритинг</small>
                    </div>
                    <div class="flex flex-column gap-2">
                        <small style="font-weight: bold">Палата ҳолати</small>
                        <div>
                            <RadioButton v-model="cabinetCredentials.status" :value="true" class="mr-2" name="active" inputId="cabinetStatus" />
                            <label for="cabinetStatus" class="mr-8">Яроқли</label>
                            <RadioButton v-model="cabinetCredentials.status" :value="false" class="mr-2" name="passiv" inputId="cabinetStatus2" />
                            <label for="cabinetStatus2">Яроқсиз</label>
                        </div>
                    </div>
                    <div class="flex flex-column">
                        <small style="font-weight: bold">Палата тури</small>
                        <Dropdown v-model="cabinetCredentials.type" :options="type" optionLabel="name" optionValue="value" :class="{ 'p-invalid': submitted && !cabinetCredentials.type }" placeholder="Палата турини киритинг" class="mr-4" />
                        <small v-if="submitted && !cabinetCredentials.type" style="color: var(--red-500)">Палата турини киритинг</small>
                    </div>
                </div>
                <div class="flex justify-content-end mt-4">
                    <Button label="Яратиш" :loading="loadingCreate" type="submit" />
                </div>
            </form>
        </Dialog>
        <!-- Cabinet edit -->
        <Dialog v-model:visible="updateDialog" modal header="Палата маълумотларини янгилаш" style="width: 25vw">
            <form ref="formUpdate" @submit.prevent="updateCabinet">
                <div class="flex flex-column gap-3">
                    <div class="flex flex-column">
                        <small style="font-weight: bold">Палата</small>
                        <InputText v-model="cabinetById.name" :class="{ 'p-invalid': submitUpdate && !cabinetById.name }" placeholder="Палатани киритинг" class="mr-4" />
                        <small v-if="submitUpdate && !cabinetById.name" style="color: var(--red-500)">Палатани киритинг</small>
                    </div>
                    <div class="flex flex-column gap-2">
                        <small style="font-weight: bold">Палата ҳолати</small>
                        <div>
                            <RadioButton v-model="cabinetById.status" :value="true" class="mr-2" name="active" inputId="cabinetStatus" />
                            <label for="cabinetStatus" class="mr-8">Яроқли</label>
                            <RadioButton v-model="cabinetById.status" :value="false" class="mr-2" name="passiv" inputId="cabinetStatus2" />
                            <label for="cabinetStatus2">Яроқсиз</label>
                        </div>
                    </div>
                    <div class="flex flex-column">
                        <small style="font-weight: bold">Палата тури</small>
                        <Dropdown v-model="cabinetById.type" :options="type" optionLabel="name" optionValue="value" :class="{ 'p-invalid': submitUpdate && !cabinetById.type }" placeholder="Палата турини киритинг" class="mr-4" />
                        <small v-if="submitUpdate && !cabinetById.type" style="color: var(--red-500)">Палата турини киритинг</small>
                    </div>
                </div>
                <div class="flex justify-content-end mt-4">
                    <Button label="Янгилиш" :loading="loadingUpdate" type="submit" />
                </div>
            </form>
        </Dialog>
    </div>
</template>
