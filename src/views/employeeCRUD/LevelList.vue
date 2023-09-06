<script setup>
import { onMounted, ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useLevelStore } from '@/stores/level';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const levelStore = useLevelStore();
const { levelSearch } = storeToRefs(levelStore);
const { levelById } = storeToRefs(levelStore);

const confirm = useConfirm();
const toast = useToast();
const currentPage = ref(0);
const search = ref('');
const tableLoading = ref(false);
const updateDialog = ref(false);
const create = ref(false);
const updateId = ref();
const submitted = ref(false);
const loadingCreate = ref(false);
const updateLoading = ref(false);
const levelCredentials = reactive({
    name: ''
});
const showCreate = () => {
    create.value = true;
};
const getLevelList = async () => {
    tableLoading.value = true;
    const data = await levelStore.getLevelSearchList(search.value, currentPage.value);
    if (data) tableLoading.value = false;
};
const getLevelById = async (id) => {
    updateDialog.value = true;
    updateId.value = id;
    await levelStore.getLevelById(id);
};
const updateLevel = async () => {
    const levelCredentials = reactive({
        updatedLevel: {}
    });
    const update = ref();
    levelCredentials.updatedLevel.name = levelById.value.name;
    update.value = levelCredentials.updatedLevel;
    updateLoading.value = true;
    const updated = await levelStore.updateLevel(updateId.value, update.value);
    if (updated.status == 200) {
        updateLoading.value = false;
        updateDialog.value = false;
        toast.add({ severity: 'success', summary: 'Муваффақиятли', detail: 'Муваффақиятли янгиланди', group: 'bc', life: 3000 });
        getLevelList();
    }
};
const createLevel = async () => {
    submitted.value = true;
    if (!submitted.value) loadingCreate.value = true;
    if (levelCredentials.name) {
        const data = await levelStore.createLevel(levelCredentials);
        if (data.status == 200) {
            create.value = false;
            submitted.value = false;
            levelCredentials.name = '';
            toast.add({ severity: 'success', summary: 'Муваффақиятли', detail: 'Муваффақиятли яратилди', group: 'bc', life: 3000 });
            getLevelList();
        }
    }
};

const deleteLevel = async (id) => {
    confirm.require({
        message: 'Сиз ҳақиқатдан ҳам ушбу лавозимни ўчирмоқчимисиз?',
        header: 'Ўчиришни тасдиқланг',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Ҳа',
        rejectLabel: 'Йўқ',
        accept: async () => {
            tableLoading.value = true;
            const deletedElement = await levelStore.deleteLevel(id);
            if (deletedElement.status == 200) {
                tableLoading.value = false;
                toast.add({ severity: 'success', summary: 'Ўчирилди', detail: 'Муваффақиятли ўчирилди', group: 'bc', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Хатолик', detail: 'Ўчиришда хатолик юз берди', group: 'bc', life: 3000 });
            }
            getLevelList();
        },
        reject: () => {
            tableLoading.value = false;
        }
    });
};

onMounted(() => {
    getLevelList();
});
</script>

<template>
    <div>
        <DataTable :value="levelSearch.content" lazy :loading="tableLoading">
            <template #empty>Ҳеч қандай маълумот топилмади</template>
            <template #header>
                <div class="flex justify-content-between">
                    <InputText v-model="search" placeholder="Қидириш" @input="getLevelList(search)" />
                    <Button label="Лавозим яратиш" icon="pi pi-plus" @click="showCreate" />
                </div>
            </template>
            <Column field="id" header="ID" style="width: 33%"></Column>
            <Column field="name" header="Лавозим номи" style="width: 57%"></Column>
            <Column field="view" style="width: 10%">
                <template #header>
                    <div class="mx-auto">
                        <i class="pi pi-ellipsis-v"></i>
                    </div>
                </template>
                <template #body="slotProps">
                    <div class="flex gap-2 justify-content-center">
                        <Button :modelValue="slotProps.view" icon="pi pi-pencil" class="p-2" outlined severity="primary" @click.prevent="getLevelById(slotProps.data.id)" />
                        <Button class="p-2" severity="danger" icon="pi pi-trash" outlined @click.prevent="deleteLevel(slotProps.data.id)" />
                    </div>
                </template>
            </Column>
        </DataTable>

        <Paginator v-model:first="currentPage" v-on:update:first="getLevelList" :rows="1" :total-records="levelSearch.totalPages">
            <template #start>
                <!-- <div></div> -->
            </template>
            <template #end>
                <div class="totalElements"><b>Элементлар сони: </b> {{ levelSearch.totalElements }}</div>
            </template>
        </Paginator>
        <Dialog v-model:visible="create" modal header="Лавозим яратиш">
            <form ref="formCreate" @submit.prevent="createLevel">
                <div class="flex">
                    <div class="flex flex-column">
                        <InputText v-model="levelCredentials.name" :class="{ 'p-invalid': submitted && !levelCredentials.name }" placeholder="Лавозим номини киритинг" class="mr-4" />
                        <small v-if="submitted && !levelCredentials.name" style="color: var(--red-500)">Лавозимни киритинг</small>
                    </div>
                    <div class="flex justify-content-end">
                        <Button label="Яратиш" :loading="loadingCreate" type="submit" />
                    </div>
                </div>
            </form>
        </Dialog>
        <Dialog v-model:visible="updateDialog" modal header="Лавозим ҳақида маълумотлар">
            <form ref="formUpdate" @submit.prevent="updateLevel">
                <InputText v-model="levelById.name" class="mr-4" />
                <Button label="Янгилаш" type="submit" :loading="updateLoading" />
            </form>
        </Dialog>
    </div>
</template>

<style></style>
