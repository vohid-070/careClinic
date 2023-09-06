<script setup>
import { storeToRefs } from 'pinia';
import { useDirectoryStore } from '@/stores/directory';
import { onMounted, ref, reactive } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

const directoryStore = useDirectoryStore();
const { directorySearch } = storeToRefs(directoryStore);
const { directoryById } = storeToRefs(directoryStore);
const confirm = useConfirm();
const toast = useToast();

const currentPage = ref(0);
const search = ref('');
const loading = ref(false);
const create = ref(false);
const updateDialog = ref(false);
const updateId = ref();
const submitted = ref(false);
const loadingCreate = ref(false);

const directoryCredentials = reactive({
    name: ''
});

const getDirectorySearchList = async () => {
    loading.value = true;
    const data = await directoryStore.directorySearchList(search.value, currentPage.value);
    if (data) loading.value = false;
};
const showCreate = () => {
    create.value = true;
};
const createDirectory = async () => {
    submitted.value = true;
    if (!submitted.value) loadingCreate.value = true;
    if (directoryCredentials.name) {
        const data = await directoryStore.createDirectory(directoryCredentials);
        if (data.status == 200) {
            create.value = false;
            submitted.value = false;
            directoryCredentials.name = '';
            toast.add({ severity: 'success', summary: 'Муваффақиятли', detail: 'Муваффақиятли яратилди', group: 'bc', life: 3000 });
            getDirectorySearchList();
        }
    }
};
const updatDirectory = async () => {
    const directoryCredentials = reactive({
        updatedDirectory: {}
    });
    const update = ref();
    directoryCredentials.updatedDirectory.name = directoryById.value.name;
    update.value = directoryCredentials.updatedDirectory;
    const updated = await directoryStore.updateDirectory(updateId.value, update.value);
    if (updated.status == 200) {
        updateDialog.value = false;
        toast.add({ severity: 'success', summary: 'Муваффақиятли', detail: 'Муваффақиятли янгиланди', group: 'bc', life: 3000 });
        getDirectorySearchList();
    }
};

const getDirectoryById = async (id) => {
    updateDialog.value = true;
    await directoryStore.getDirectoryById(id);
    updateId.value = id;
};
const deleteDirectory = async (id) => {
    confirm.require({
        message: 'Сиз ҳақиқатдан ҳам ушбу бўлимни ўчирмоқчимисиз?',
        header: 'Ўчиришни тасдиқланг',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Ҳа',
        rejectLabel: 'Йўқ',
        accept: async () => {
            loading.value = true;
            const deletedElement = await directoryStore.deleteDirectory(id);
            if (deletedElement.status == 200) {
                loading.value = false;
                toast.add({ severity: 'success', summary: 'Ўчирилди', detail: 'Муваффақиятли ўчирилди', group: 'bc', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Хатолик', detail: 'Ўчиришда хатолик юз берди', group: 'bc', life: 3000 });
            }
            getDirectorySearchList();
        },
        reject: () => {
            loading.value = false;
        }
    });
};

onMounted(() => {
    getDirectorySearchList();
});
</script>

<template>
    <div>
        <DataTable :value="directorySearch.content" :loading="loading" lazy>
            <template #empty>Ҳеч қандай маълумот топилмади</template>
            <template #header>
                <div class="flex justify-content-between">
                    <InputText v-model="search" placeholder="Қидириш" @input="getDirectorySearchList(search)" style="width: 300px" />
                    <Button label="Бўлим яратиш" icon="pi pi-plus" @click="showCreate" />
                </div>
            </template>
            <Column field="id" header="ID" style="width: 33%"></Column>
            <Column field="name" header="Бўлим номи" style="width: 57%"></Column>
            <Column field="view" style="width: 10%">
                <template #header>
                    <div class="mx-auto">
                        <i class="pi pi-ellipsis-v"></i>
                    </div>
                </template>
                <template #body="slotProps">
                    <div class="flex gap-2 justify-content-center">
                        <Button :modelValue="slotProps.view" icon="pi pi-pencil" class="p-2" outlined severity="primary" @click.prevent="getDirectoryById(slotProps.data.id)" />
                        <Button class="p-2" severity="danger" icon="pi pi-trash" outlined @click.prevent="deleteDirectory(slotProps.data.id)" />
                    </div>
                </template>
            </Column>
        </DataTable>
        <Paginator v-model:first="currentPage" v-on:update:first="getDirectorySearchList" :rows="1" :total-records="directorySearch.totalPages">
            <template #start>
                <!-- <div></div> -->
            </template>
            <template #end>
                <div class="totalElements"><b>Элементлар сони: </b> {{ directorySearch.totalElements }}</div>
            </template>
        </Paginator>

        <Dialog v-model:visible="create" modal header="Бўлим яратиш">
            <form ref="formCreate" @submit.prevent="createDirectory">
                <div class="flex">
                    <div class="flex flex-column">
                        <InputText v-model="directoryCredentials.name" :class="{ 'p-invalid': submitted && !directoryCredentials.name }" placeholder="Бўлим номини киритинг" class="mr-4" />
                        <small v-if="submitted && !directoryCredentials.name" style="color: var(--red-500)">Бўлимни киритинг</small>
                    </div>
                    <div class="flex justify-content-end">
                        <Button label="Яратиш" :loading="loadingCreate" type="submit" />
                    </div>
                </div>
            </form>
        </Dialog>
        <Dialog v-model:visible="updateDialog" modal header="Бўлим ҳақида маълумотлар">
            <form ref="formUpdate" @submit.prevent="updatDirectory">
                <InputText v-model="directoryById.name" class="mr-4" :loading="loadingCreate" />
                <Button label="Янгилаш" type="submit" />
            </form>
        </Dialog>
    </div>
</template>
