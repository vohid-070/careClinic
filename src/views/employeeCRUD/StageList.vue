<script setup>
import { useStageStore } from '@/stores/stage';
import { storeToRefs } from 'pinia';
import { onMounted, ref, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const stageStore = useStageStore();
const { stageList } = storeToRefs(stageStore);
const { stageById } = storeToRefs(stageStore);
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

const stageCredentials = reactive({
    name: ''
});

const getStageList = async () => {
    tableLoading.value = true;
    const data = await stageStore.getStageSearchList(search.value, currentPage.value);
    if (data) tableLoading.value = false;
};
const showCreate = () => {
    create.value = true;
};

const createStage = async () => {
    submitted.value = true;
    if (!submitted.value) loadingCreate.value = true;
    if (stageCredentials.name) {
        const data = await stageStore.createStage(stageCredentials);
        if (data) {
            create.value = false;
            submitted.value = false;
            stageCredentials.name = '';
            toast.add({ severity: 'success', summary: 'Муваффақиятли', detail: 'Муваффақиятли яратилди', group: 'bc', life: 3000 });
            getStageList();
        }
    }
};
const getStageById = async (id) => {
    await stageStore.getStageById(id);
    updateId.value = id;
    updateDialog.value = true;
};
const daleteStage = async (id) => {
    confirm.require({
        message: 'Сиз ҳақиқатдан ҳам ушбу қаватни ўчирмоқчимисиз?',
        header: 'Ўчиришни тасдиқланг',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Ҳа',
        rejectLabel: 'Йўқ',
        accept: async () => {
            tableLoading.value = true;
            const deletedElement = await stageStore.deleteStage(id);
            if (deletedElement.status == 200) {
                tableLoading.value = false;
                toast.add({ severity: 'success', summary: 'Ўчирилди', detail: 'Муваффақиятли ўчирилди', group: 'bc', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Хатолик', detail: 'Ўчиришда хатолик юз берди', group: 'bc', life: 3000 });
            }
            getStageList();
        },
        reject: () => {
            tableLoading.value = false;
        }
    });
};
const updateStage = async () => {
    const stage = reactive({
        updateStage: {}
    });
    const update = ref();
    stage.updateStage.name = stageById.value.name;
    update.value = stage.updateStage;
    updateLoading.value = true;
    const updated = await stageStore.updateStage(updateId.value, update.value);
    if (updated.status == 200) {
        updateLoading.value = false;
        updateDialog.value = false;
        toast.add({ severity: 'success', summary: 'Муваффақиятли', detail: 'Муваффақиятли янгиланди', group: 'bc', life: 3000 });
        getStageList();
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: updated, group: 'bc', life: 3000 });
        updateLoading.value = false;
        updateDialog.value = false;
        getStageList();
    }
};

onMounted(() => {
    getStageList();
});
</script>

<template>
    <div>
        <DataTable :value="stageList.content" lazy :loading="tableLoading">
            <template #empty>Ҳеч қандай маълумот топилмади</template>
            <template #header>
                <div class="flex justify-content-between">
                    <InputText v-model="search" placeholder="Қидириш" @input="getStageList(search)" />
                    <Button label="Қават яратиш" icon="pi pi-plus" @click="showCreate" />
                </div>
            </template>
            <Column field="id" header="ID" style="width: 33%"></Column>
            <Column field="name" header="Қават" style="width: 57%"></Column>
            <Column field="view" style="width: 10%">
                <template #header>
                    <div class="mx-auto">
                        <i class="pi pi-ellipsis-v"></i>
                    </div>
                </template>
                <template #body="slotProps">
                    <div class="flex gap-2 justify-content-center">
                        <Button :modelValue="slotProps.view" icon="pi pi-pencil" class="p-2" outlined severity="primary" @click.prevent="getStageById(slotProps.data.id)" />
                        <Button class="p-2" severity="danger" icon="pi pi-trash" outlined @click.prevent="daleteStage(slotProps.data.id)" />
                    </div>
                </template>
            </Column>
        </DataTable>
        <Paginator v-model:first="currentPage" v-on:update:first="getStageList" :rows="1" :total-records="stageList.totalPages">
            <template #start>
                <!-- <div></div> -->
            </template>
            <template #end>
                <div class="totalElements"><b>Элементлар сони: </b> {{ stageList.totalElements }}</div>
            </template>
        </Paginator>
        <Dialog v-model:visible="create" modal header="Қават яратиш">
            <form ref="formCreate" @submit.prevent="createStage">
                <div class="flex">
                    <div class="flex flex-column">
                        <InputText v-model="stageCredentials.name" :class="{ 'p-invalid': submitted && !stageCredentials.name }" placeholder="Қаватни киритинг" class="mr-4" />
                        <small v-if="submitted && !stageCredentials.name" style="color: var(--red-500)">Қаватни киритинг</small>
                    </div>
                    <div class="flex justify-content-end">
                        <Button label="Яратиш" :loading="loadingCreate" type="submit" />
                    </div>
                </div>
            </form>
        </Dialog>
        <Dialog v-model:visible="updateDialog" modal header="Қават ҳақида маълумотлар">
            <form ref="formUpdate" @submit.prevent="updateStage">
                <InputText v-model="stageById.name" class="mr-4" placeholder="Қаватни киритинг" />
                <Button label="Янгилаш" type="submit" :loading="updateLoading" />
            </form>
        </Dialog>
    </div>
</template>
