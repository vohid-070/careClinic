<script setup>
import { onMounted, ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useSpecialityStore } from '@/stores/specialitiy';
import { useDirectoryStore } from '@/stores/directory';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const specialityStore = useSpecialityStore();
const directoryStore = useDirectoryStore();

const { specialitySearch } = storeToRefs(specialityStore);
const { directory } = storeToRefs(directoryStore);
const { specialityById } = storeToRefs(specialityStore);

const confirm = useConfirm();
const toast = useToast();
const currentPage = ref(0);
const search = ref('');
const loadingTable = ref(false);
const create = ref(false);
const submitted = ref(false);
const loadingCreate = ref(false);
const updateLoading = ref(false);
const updateId = ref(false);
const updateDialog = ref(false);
const directoryData = ref(null);

const specialityCredentials = reactive({
    name: '',
    directory_id: 0
});

const getSpecialitySearchList = async () => {
    loadingTable.value = true;
    const dataTable = await specialityStore.specialitySearchList(search.value, currentPage.value);
    if (dataTable) loadingTable.value = false;
};
const getDirectoryList = async () => {
    directoryData.value = await directoryStore.directoryList();
};
const showCreate = () => {
    create.value = true;
};
const createSpeciality = async () => {
    submitted.value = true;
    if (!submitted.value) loadingCreate.value = true;
    if (specialityCredentials.name && specialityCredentials.directory_id) {
        const data = await specialityStore.specialityCreate(specialityCredentials);
        if (data) {
            create.value = false;
            submitted.value = false;
            specialityCredentials.name = '';
            specialityCredentials.directory_id = 0;
            toast.add({ severity: 'success', summary: 'Муваффақиятли', detail: 'Муваффақиятли яратилди', group: 'bc', life: 3000 });
            getSpecialitySearchList();
        } else {
            toast.add({ severity: 'error', summary: 'Error', detail: data, group: 'bc', life: 3000 });
            getSpecialitySearchList();
        }
    }
};
const deleteSpeciality = async (id) => {
    confirm.require({
        message: 'Сиз ҳақиқатдан ҳам ушбу мутахассисликни ўчирмоқчимисиз?',
        header: 'Ўчиришни тасдиқланг',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Ҳа',
        rejectLabel: 'Йўқ',
        accept: async () => {
            loadingTable.value = true;
            const deletedElement = await specialityStore.specialityDelete(id);
            if (deletedElement.status == 200) {
                loadingTable.value = false;
                toast.add({ severity: 'success', summary: 'Ўчирилди', detail: 'Муваффақиятли ўчирилди', group: 'bc', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Хатолик', detail: 'Ўчиришда хатолик юз берди', group: 'bc', life: 3000 });
            }
            getSpecialitySearchList();
        },
        reject: () => {
            loadingTable.value = false;
        }
    });
};

const SpecialityById = async (id) => {
    await specialityStore.getSpecialityById(id);
    updateId.value = id;
    updateDialog.value = true;
};

const updateSpeciality = async () => {
    const stage = reactive({
        updateStage: {}
    });
    const update = ref();
    stage.updateStage.name = specialityById.value.name;
    stage.updateStage.directory_id = specialityById.value.directory.id;
    update.value = stage.updateStage;
    updateLoading.value = true;
    const updated = await specialityStore.updateSpeciality(updateId.value, update.value);
    if (updated.status == 200) {
        updateLoading.value = false;
        updateDialog.value = false;
        toast.add({ severity: 'success', summary: 'Муваффақиятли', detail: 'Муваффақиятли янгиланди', group: 'bc', life: 3000 });
        getSpecialitySearchList();
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: updated, group: 'bc', life: 3000 });
        updateLoading.value = false;
        updateDialog.value = false;
        getSpecialitySearchList();
    }
};

onMounted(() => {
    getSpecialitySearchList();
    getDirectoryList();
});
</script>

<template>
    <div>
        <DataTable :value="specialitySearch.content" lazy :loading="loadingTable">
            <template #empty>Ҳеч қандай маълумот топилмади</template>
            <template #header>
                <div class="flex justify-content-between">
                    <InputText v-model="search" placeholder="Қидириш" @input="getSpecialitySearchList(search)" />
                    <Button label="Мутахасисслик яратиш" icon="pi pi-plus" @click="showCreate" />
                </div>
            </template>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Мутахасисслик номи"></Column>
            <Column field="directory.name" header="Отдел номи"></Column>
            <Column field="view" style="width: 10%">
                <template #header>
                    <div class="mx-auto">
                        <i class="pi pi-ellipsis-v"></i>
                    </div>
                </template>
                <template #body="slotProps">
                    <div class="flex gap-2 justify-content-center">
                        <Button :modelValue="slotProps.view" icon="pi pi-pencil" class="p-2" outlined severity="primary" @click.prevent="SpecialityById(slotProps.data.id)" />
                        <Button class="p-2" severity="danger" icon="pi pi-trash" outlined @click.prevent="deleteSpeciality(slotProps.data.id)" />
                    </div>
                </template>
            </Column>
        </DataTable>
        <Paginator v-model:first="currentPage" v-on:update:first="getSpecialitySearchList" :rows="1" :total-records="specialitySearch.totalPages">
            <template #start>
                <!-- <div></div> -->
            </template>
            <template #end>
                <div class="totalElements"><b>Элементлар сони: </b> {{ specialitySearch.totalElements }}</div>
            </template>
        </Paginator>
        <Dialog v-model:visible="create" modal header="Мутахасисслик яратиш">
            <form ref="formCreate" @submit.prevent="createSpeciality" class="flex">
                <div class="flex flex-column">
                    <InputText v-model="specialityCredentials.name" :class="{ 'p-invalid': submitted && !specialityCredentials.name }" placeholder="Мутахассисликни киритинг" class="mr-4" style="width: 300px" />
                    <small v-if="submitted && !specialityCredentials.name" style="color: var(--red-500)">Мутахассисликни киритинг</small>
                </div>
                <div class="flex flex-column">
                    <Dropdown
                        v-if="directoryData"
                        v-model="specialityCredentials.directory_id"
                        :options="directory.object"
                        optionLabel="name"
                        optionValue="id"
                        :class="{ 'p-invalid': submitted && !specialityCredentials.directory_id }"
                        placeholder="Бўлимни танланг"
                        class="mr-4"
                        style="width: 300px"
                    />
                    <small v-if="submitted && !specialityCredentials.directory_id" style="color: var(--red-500)">Бўлимни танланг</small>
                </div>
                <div class="flex justify-content-end">
                    <Button label="Яратиш" :loading="loadingCreate" type="submit" style="height: 45px" />
                </div>
            </form>
        </Dialog>
        <Dialog v-model:visible="updateDialog" modal header="Мутахасисслик ҳақида маълумотлар">
            <form ref="formUpdate" @submit="updateSpeciality">
                <InputText v-model="specialityById.name" class="mr-4" placeholder="Мутахассисликни киритинг" style="width: 300px" />
                <Dropdown v-if="directoryData" v-model="specialityById.directory" :options="directory.object" optionLabel="name" class="mr-4" placeholder="Бўлимни танланг" style="width: 300px" />
                <Button label="Янгилаш" type="submit" :loading="updateLoading" />
            </form>
        </Dialog>
    </div>
</template>
