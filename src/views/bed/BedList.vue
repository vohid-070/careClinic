<script setup>
import { useBedStore } from '@/stores/bed';
import { useCabinetStore } from '@/stores/cabinet';
import { storeToRefs } from 'pinia';
import { ref, onMounted, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const role = localStorage.getItem('user');

const confirm = useConfirm();
const toast = useToast();
const bedStore = useBedStore();
const cabinetStore = useCabinetStore();
const { cabinet } = storeToRefs(cabinetStore);
const { bedSearch } = storeToRefs(bedStore);
const { bedById } = storeToRefs(bedStore);

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

const bedCredentials = reactive({
    name: '',
    status: true,
    cabinet_id: null
});

const getBedList = async () => {
    tableLoading.value = true;
    const data = await bedStore.bedSearchList(search.value, currentPage.value);
    if (data) tableLoading.value = false;
};

const getCabinetList = async () => {
    await cabinetStore.getCabinetList();
};

const showCreate = () => {
    create.value = true;
};

const createBed = async () => {
    submitted.value = true;
    if (bedCredentials.name && bedCredentials.cabinet_id) {
        loadingCreate.value = true;
        const created = await bedStore.bedCreate(bedCredentials);

        if (created.status == 201) {
            toast.add({
                severity: 'success',
                summary: 'Муваффақиятли',
                detail: 'Муваффақиятли яратилди!',
                life: 3000,
                group: 'bc'
            });
            getBedList();
            create.value = false;
            loadingCreate.value = false;
            bedCredentials.name = '';
            bedCredentials.status = false;
            bedCredentials.cabinet_id = null;

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

const deleteBed = async (id) => {
    confirm.require({
        message: 'Сиз ҳақиқатдан ҳам ушбу койкани ўчирмоқчимисиз?',
        header: 'Ўчиришни тасдиқланг',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Ҳа',
        rejectLabel: 'Йўқ',
        accept: async () => {
            tableLoading.value = true;
            const deletedElement = await bedStore.bedDelete(id);
            if (deletedElement.status == 200) {
                tableLoading.value = false;
                toast.add({ severity: 'success', summary: 'Ўчирилди', detail: 'Муваффақиятли ўчирилди', group: 'bc', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Хатолик', detail: 'Ўчиришда хатолик юз берди', group: 'bc', life: 3000 });
            }
            getBedList();
        },
        reject: () => {
            tableLoading.value = false;
        }
    });
};

const getBedById = async (id) => {
    updateDialog.value = true;
    updateId.value = id;
    await bedStore.getBedById(id);
};

const error = ref();

const updateBed = async () => {
    try {
        submitUpdate.value = true;
        loadingUpdate.value = true;
        const udpatedBed = {};
        Object.assign(udpatedBed, bedById.value);
        udpatedBed.cabinet_id = bedById.value.cabinet.id;

        if (bedById.value.name && bedById.value.cabinet.id) {
            const updated = await bedStore.updateBed(updateId.value, udpatedBed);
            if (updated.status == 200) {
                toast.add({ severity: 'success', summary: 'Янгиданди', detail: 'Муваффақиятли янгиданди', group: 'bc', life: 3000 });
                getBedList();
                submitUpdate.value = false;
                updateDialog.value = false;
            }
        }
    } catch (e) {
        error.value = e;
    } finally {
        loadingUpdate.value = false;
    }
};

onMounted(() => {
    getBedList();
    getCabinetList();
});
</script>

<template>
    <div>
        <DataTable :value="bedSearch.content" lazy :loading="tableLoading">
            <template #empty>Ҳеч қандай маълумот топилмади</template>
            <template #header>
                <div class="flex justify-content-between">
                    <InputText v-model="search" placeholder="Қидириш" @input="getBedList(search)" />
                    <Button v-if="role == 'ADMIN'" label="Койка яратиш" icon="pi pi-plus" @click="showCreate" />
                </div>
            </template>
            <Column field="id" header="ID" />
            <Column field="name" header="Койка" />
            <Column field="cabinet.name" header="Палата" />
            <Column field="status" header="Койка ҳолати">
                <template #body="slotProps">
                    <b v-if="slotProps.data.status == true" style="color: var(--green-600)">Бўш</b>
                    <b v-if="slotProps.data.status == false" style="color: var(--red-500)">Банд</b>
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
                        <Button :modelValue="slotProps.view" icon="pi pi-pencil" class="p-2" outlined severity="primary" @click.prevent="getBedById(slotProps.data.id)" />
                        <Button class="p-2" severity="danger" icon="pi pi-trash" outlined @click.prevent="deleteBed(slotProps.data.id)" />
                    </div>
                </template>
            </Column>
        </DataTable>
        <!-- Paginator -->
        <Paginator v-model:first="currentPage" v-on:update:first="getBedList" :rows="1" :total-records="bedSearch.totalPages">
            <template #start></template>
            <template #end>
                <div class="totalElements"><b>Элементлар сони: </b> {{ bedSearch.totalElements }}</div>
            </template>
        </Paginator>
        <!-- Bed create -->
        <Dialog v-model:visible="create" modal header="Койка яратиш" style="width: 25vw">
            <form ref="formCreate" @submit.prevent="createBed">
                <div class="flex flex-column gap-3">
                    <div class="flex flex-column">
                        <small style="font-weight: bold">Койка</small>
                        <InputText v-model="bedCredentials.name" :class="{ 'p-invalid': submitted && !bedCredentials.name }" placeholder="Койкани киритинг" class="mr-4" />
                        <small v-if="submitted && !bedCredentials.name" style="color: var(--red-500)">Койкани киритинг</small>
                    </div>
                    <div class="flex flex-column gap-2">
                        <small style="font-weight: bold">Койка ҳолати</small>
                        <div>
                            <RadioButton v-model="bedCredentials.status" :value="true" class="mr-2" name="active" inputId="bedStatus" />
                            <label for="bedStatus" class="mr-8">Бўш</label>
                            <RadioButton v-model="bedCredentials.status" :value="false" class="mr-2" name="passiv" inputId="bedStatus2" />
                            <label for="bedStatus2">Банд</label>
                        </div>
                    </div>
                    <div class="flex flex-column">
                        <small style="font-weight: bold">Палата</small>
                        <Dropdown v-model="bedCredentials.cabinet_id" :options="cabinet.object" optionLabel="name" optionValue="id" :class="{ 'p-invalid': submitted && !bedCredentials.cabinet_id }" placeholder="Палатани киритинг" class="mr-4" />
                        <small v-if="submitted && !bedCredentials.cabinet_id" style="color: var(--red-500)">Палатани киритинг</small>
                    </div>
                </div>
                <div class="flex justify-content-end mt-4">
                    <Button label="Яратиш" :loading="loadingCreate" type="submit" />
                </div>
            </form>
        </Dialog>
        <!-- Bed edit -->
        <Dialog v-model:visible="updateDialog" modal header="Койка маълумотларини янгилаш" style="width: 25vw">
            <form ref="formUpdate" @submit.prevent="updateBed">
                <div class="flex flex-column gap-3">
                    <div class="flex flex-column">
                        <small style="font-weight: bold">Койка</small>
                        <InputText v-model="bedById.name" :class="{ 'p-invalid': submitUpdate && !bedById.name }" placeholder="Койкани киритинг" class="mr-4" />
                        <small v-if="submitUpdate && !bedById.name" style="color: var(--red-500)">Койкани киритинг</small>
                    </div>
                    <div class="flex flex-column gap-2">
                        <small style="font-weight: bold">Койка ҳолати</small>
                        <div>
                            <RadioButton v-model="bedById.status" :value="true" class="mr-2" name="active" inputId="bedStatus" />
                            <label for="bedStatus" class="mr-8">Бўш</label>
                            <RadioButton v-model="bedById.status" :value="false" class="mr-2" name="passiv" inputId="bedStatus2" />
                            <label for="bedStatus2">Банд</label>
                        </div>
                    </div>
                    <div class="flex flex-column">
                        <small style="font-weight: bold">Койка тури</small>
                        <Dropdown v-model="bedById.cabinet" :options="cabinet.object" optionLabel="name" :class="{ 'p-invalid': submitUpdate && !bedById.cabinet }" placeholder="Койка турини киритинг" class="mr-4" />
                        <small v-if="submitUpdate && !bedById.cabinet" style="color: var(--red-500)">Койка турини киритинг</small>
                    </div>
                </div>
                <div class="flex justify-content-end mt-4">
                    <Button label="Янгилиш" :loading="loadingUpdate" type="submit" />
                </div>
            </form>
        </Dialog>
    </div>
</template>
