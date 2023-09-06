<script setup>
import { useTransferStore } from '@/stores/transfer';
import { storeToRefs } from 'pinia';
import { onMounted, ref, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const transferStore = useTransferStore();
const { transferList } = storeToRefs(transferStore);
const { transferById } = storeToRefs(transferStore);
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

const percentage = new Intl.NumberFormat('ru-Ru');

const transferCredentials = reactive({
    name: '',
    patientsCount: null,
    contractNumber: '',
    sum: null,
    overAll: null
});

const getTransferList = async () => {
    tableLoading.value = true;
    const data = await transferStore.getTransferSearchList(search.value, currentPage.value);
    if (data) tableLoading.value = false;
};
const showCreate = () => {
    create.value = true;
};

const createTransfer = async () => {
    submitted.value = true;
    if (!submitted.value) loadingCreate.value = true;
    if (transferCredentials.name && transferCredentials.patientsCount && transferCredentials.contractNumber && transferCredentials.sum && transferCredentials.overAll) {
        const data = await transferStore.createTransfer(transferCredentials);
        if (data) {
            create.value = false;
            submitted.value = false;
            transferCredentials.name = '';
            transferCredentials.patientsCount = null;
            transferCredentials.contractNumber = '';
            transferCredentials.sum = null;
            transferCredentials.overAll = null;
            toast.add({ severity: 'success', summary: 'Муваффақиятли', detail: 'Муваффақиятли яратилди', group: 'bc', life: 3000 });
            getTransferList();
        }
    }
};
const getTransferById = async (id) => {
    await transferStore.getTransferById(id);
    updateId.value = id;
    updateDialog.value = true;
};
const daleteTransfer = async (id) => {
    confirm.require({
        message: 'Сиз ҳақиқатдан ҳам ушбу шартнома ўчирмоқчимисиз?',
        header: 'Ўчиришни тасдиқланг',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Ҳа',
        rejectLabel: 'Йўқ',
        accept: async () => {
            tableLoading.value = true;
            const deletedElement = await transferStore.deleteTransfer(id);
            if (deletedElement.status == 200) {
                tableLoading.value = false;
                toast.add({ severity: 'success', summary: 'Ўчирилди', detail: 'Муваффақиятли ўчирилди', group: 'bc', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Хатолик', detail: 'Ўчиришда хатолик юз берди', group: 'bc', life: 3000 });
            }
            getTransferList();
        },
        reject: () => {
            tableLoading.value = false;
        }
    });
};
const updateTransfer = async () => {
    submitted.value = true;
    const updateTransfer = {};
    Object.assign(updateTransfer, transferById.value);
    if (updateTransfer.name && updateTransfer.patientsCount && updateTransfer.contractNumber && updateTransfer.sum) {
        updateLoading.value = true;
        const updated = await transferStore.updateTransfer(updateId.value, updateTransfer);
        if (updated.status == 200) {
            updateLoading.value = false;
            updateDialog.value = false;
            submitted.value = false;
            toast.add({ severity: 'success', summary: 'Муваффақиятли', detail: 'Муваффақиятли янгиланди', group: 'bc', life: 3000 });
            getTransferList();
        } else {
            toast.add({ severity: 'error', summary: 'Error', detail: updated, group: 'bc', life: 3000 });
            updateLoading.value = false;
            updateDialog.value = false;
            submitted.value = false;
            getTransferList();
        }
    }
};

onMounted(() => {
    getTransferList();
});
</script>

<template>
    <div>
        <DataTable :value="transferList.content" lazy :loading="tableLoading">
            <template #empty>Ҳеч қандай маълумот топилмади</template>
            <template #header>
                <div class="flex justify-content-between">
                    <InputText v-model="search" placeholder="Қидириш" @input="getTransferList(search)" />
                    <Button label="Шартнома яратиш" icon="pi pi-plus" @click="showCreate" />
                </div>
            </template>
            <Column field="id" header="ID" />
            <Column field="name" header="Шартнома" />
            <Column field="patientsCount" header="Сони" />
            <Column field="contractNumber" header="Шартнома рақами" />
            <Column field="sum" header="Тўлов суммаси">
                <template #body="slotProps">
                    <p>{{ percentage.format(slotProps.data.sum) }}</p>
                </template>
            </Column>
            <Column field="overAll" header="Умумий">
                <template #body="slotProps">
                    <p>{{ percentage.format(slotProps.data.overAll) }}</p>
                </template></Column
            >
            <Column field="view" style="width: 10%">
                <template #header>
                    <div class="mx-auto">
                        <i class="pi pi-ellipsis-v"></i>
                    </div>
                </template>
                <template #body="slotProps">
                    <div class="flex gap-2 justify-content-center">
                        <Button :modelValue="slotProps.view" icon="pi pi-pencil" class="p-2" outlined severity="primary" @click.prevent="getTransferById(slotProps.data.id)" />
                        <Button class="p-2" severity="danger" icon="pi pi-trash" outlined @click.prevent="daleteTransfer(slotProps.data.id)" />
                    </div>
                </template>
            </Column>
        </DataTable>
        <Paginator v-model:first="currentPage" v-on:update:first="getTransferList" :rows="1" :total-records="transferList.totalPages">
            <template #start></template>
            <template #end>
                <div class="totalElements"><b>Элементлар сони: </b> {{ transferList.totalElements }}</div>
            </template>
        </Paginator>
        <Dialog v-model:visible="create" modal header="Шартнома яратиш" style="width: 40vw">
            <form ref="formCreate" @submit.prevent="createTransfer">
                <div class="flex flex-wrap gap-4 mb-4">
                    <div class="flex flex-column">
                        <InputText v-model="transferCredentials.name" :class="{ 'p-invalid': submitted && !transferCredentials.name }" placeholder="Шартномани киритинг" class="mr-4" />
                        <small v-if="submitted && !transferCredentials.name" style="color: var(--red-500)">Шартномани киритинг</small>
                    </div>
                    <div class="flex flex-column">
                        <InputNumber v-model="transferCredentials.patientsCount" :useGrouping="false" :class="{ 'p-invalid': submitted && !transferCredentials.patientsCount }" placeholder="Беморлар сонини киритинг" class="mr-4" />
                        <small v-if="submitted && !transferCredentials.patientsCount" style="color: var(--red-500)">Беморлар сонини киритинг</small>
                    </div>
                </div>
                <div class="flex flex-wrap gap-4 mb-4">
                    <div class="flex flex-column">
                        <InputText v-model="transferCredentials.contractNumber" :class="{ 'p-invalid': submitted && !transferCredentials.contractNumber }" placeholder="Шартнома рақамини киритинг" class="mr-4" />
                        <small v-if="submitted && !transferCredentials.contractNumber" style="color: var(--red-500)">Шартнома рақамини киритинг</small>
                    </div>
                    <div class="flex flex-column">
                        <InputNumber v-model="transferCredentials.sum" inputId="locale-user" locale="ru-RU" :minFractionDigits="2" :class="{ 'p-invalid': submitted && !transferCredentials.sum }" placeholder="Тўлов суммасини киритинг" class="mr-4" />
                        <small v-if="submitted && !transferCredentials.sum" style="color: var(--red-500)">Тўлов суммасини киритинг</small>
                    </div>
                    <div class="flex flex-column">
                        <InputNumber
                            v-model="transferCredentials.overAll"
                            locale="ru-RU"
                            inputId="locale-user"
                            :minFractionDigits="2"
                            :class="{ 'p-invalid': submitted && !transferCredentials.overAll }"
                            placeholder="Умумий суммани киритинг"
                            class="mr-4"
                        />
                        <small v-if="submitted && !transferCredentials.overAll" style="color: var(--red-500)">Умумий суммани киритинг</small>
                    </div>
                </div>

                <div class="flex justify-content-end mt-4">
                    <Button label="Яратиш" :loading="loadingCreate" type="submit" />
                </div>
            </form>
        </Dialog>
        <Dialog v-model:visible="updateDialog" modal header="Шартнома ҳақида маълумотлар" style="width: 40vw">
            <form ref="formUpdate" @submit.prevent="updateTransfer">
                <div class="flex flex-wrap gap-4 mb-4">
                    <div class="flex flex-column">
                        <small>Шартнома номи</small>
                        <InputText v-model="transferById.name" :class="{ 'p-invalid': submitted && !transferById.name }" placeholder="Шартнома номини киритинг" class="mr-4" />
                        <small v-if="submitted && !transferById.name" style="color: var(--red-500)">Шартнома номини киритинг</small>
                    </div>
                    <div class="flex flex-column">
                        <small>Беморлар сони</small>
                        <InputNumber v-model="transferById.patientsCount" :useGrouping="false" :class="{ 'p-invalid': submitted && !transferById.patientsCount }" placeholder="Беморлар сонини киритинг" class="mr-4" />
                        <small v-if="submitted && !transferById.patientsCount" style="color: var(--red-500)">Беморлар сонини киритинг</small>
                    </div>
                </div>
                <div class="flex flex-wrap gap-4 mb-4">
                    <div class="flex flex-column">
                        <small>Контракт рақами</small>
                        <InputText v-model="transferById.contractNumber" :class="{ 'p-invalid': submitted && !transferById.contractNumber }" placeholder="Контракт рақамини киритинг" class="mr-4" />
                        <small v-if="submitted && !transferById.contractNumber" style="color: var(--red-500)">Контракт рақамини киритинг</small>
                    </div>
                    <div class="flex flex-column">
                        <small>Тўлов суммаси</small>
                        <InputNumber v-model="transferById.sum" :minFractionDigits="2" locale="ru-RU" :class="{ 'p-invalid': submitted && !transferById.sum }" placeholder="Суммани киритинг" class="mr-4" />
                        <small v-if="submitted && !transferById.sum" style="color: var(--red-500)">Тўлов суммасини киритинг</small>
                    </div>
                    <div class="flex flex-column">
                        <small>Умумий суммаси</small>
                        <InputNumber v-model="transferById.overAll" :minFractionDigits="2" locale="ru-RU" :class="{ 'p-invalid': submitted && !transferById.overAll }" placeholder="Умумий суммани киритинг" class="mr-4" />
                        <small v-if="submitted && !transferById.overAll" style="color: var(--red-500)">Умумий суммани киритинг</small>
                    </div>
                </div>
                <div class="flex justify-content-end">
                    <Button label="Янгилаш" type="submit" :loading="updateLoading" />
                </div>
            </form>
        </Dialog>
    </div>
</template>
