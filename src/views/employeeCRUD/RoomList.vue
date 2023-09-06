<script setup>
import { useRoomStore } from '@/stores/room';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const confirm = useConfirm();
const toast = useToast();
const roomStore = useRoomStore();
const { roomList } = storeToRefs(roomStore);
const { roomById } = storeToRefs(roomStore);

const currentPage = ref(0);
const search = ref('');
const tableLoading = ref(false);
const create = ref(false);
const submitted = ref(false);
const loadingCreate = ref(false);
const updateId = ref();
const updateDialog = ref(false);
const updateLoading = ref(false);

const RoomCredentials = reactive({
    name: ''
});

const getRoomList = async () => {
    tableLoading.value = true;
    const data = await roomStore.getRoomSearchList(search.value, currentPage.value);
    if (data) tableLoading.value = false;
};

const showCreate = () => {
    create.value = true;
};
const createRoom = async () => {
    submitted.value = true;
    if (!submitted.value) loadingCreate.value = true;
    if (RoomCredentials.name) {
        const data = await roomStore.createRoom(RoomCredentials);
        if (data.status == 200) {
            submitted.value = false;
            create.value = false;
            RoomCredentials.name = '';
            toast.add({ severity: 'success', summary: 'Муваффақиятли', detail: 'Муваффақиятли яратилди', group: 'bc', life: 3000 });
            getRoomList();
        }
    }
};
const deleteRoom = async (id) => {
    confirm.require({
        message: 'Сиз ҳақиқатдан ҳам ушбу хонани ўчирмоқчимисиз?',
        header: 'Ўчиришни тасдиқланг',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Ҳа',
        rejectLabel: 'Йўқ',
        accept: async () => {
            tableLoading.value = true;
            const deletedElement = await roomStore.deleteRoom(id);
            if (deletedElement.status == 200) {
                tableLoading.value = false;
                toast.add({ severity: 'success', summary: 'Ўчирилди', detail: 'Муваффақиятли ўчирилди', group: 'bc', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Хатолик', detail: 'Ўчиришда хатолик юз берди', group: 'bc', life: 3000 });
            }
            getRoomList();
        },
        reject: () => {
            tableLoading.value = false;
        }
    });
};

const getRoomById = async (id) => {
    updateDialog.value = true;
    updateId.value = id;
    await roomStore.getRoomById(id);
};
const updateRoom = async () => {
    const roomCredentials = reactive({
        updatedRoom: {}
    });
    const update = ref();
    roomCredentials.updatedRoom.name = roomById.value.name;
    roomCredentials.updatedRoom.stage_id = 0;
    update.value = roomCredentials.updatedRoom;
    updateLoading.value = true;
    const updated = await roomStore.RoomUpdate(updateId.value, update.value);
    if (updated.status == 200) {
        updateLoading.value = false;
        updateDialog.value = false;
        toast.add({ severity: 'success', summary: 'Муваффақиятли', detail: 'Муваффақиятли янгиланди', group: 'bc', life: 3000 });
        getRoomList();
    }
};

onMounted(() => {
    getRoomList();
});
</script>

<template>
    <div>
        <DataTable :value="roomList.content" lazy :loading="tableLoading">
            <template #empty>Ҳеч қандай маълумот топилмади</template>
            <template #header
                ><div class="flex justify-content-between">
                    <InputText v-model="search" placeholder="Қидириш" @input="getRoomList(search)" />
                    <Button label="Хона яратиш" icon="pi pi-plus" @click="showCreate" />
                </div>
            </template>
            <Column field="id" header="ID" style="width: 33%"></Column>
            <Column field="name" header="Хона" style="width: 57%"></Column>
            <Column field="view" style="width: 10%">
                <template #header>
                    <div class="mx-auto">
                        <i class="pi pi-ellipsis-v"></i>
                    </div>
                </template>
                <template #body="slotProps">
                    <div class="flex gap-2 justify-content-center">
                        <Button :modelValue="slotProps.view" icon="pi pi-pencil" class="p-2" outlined severity="primary" @click.prevent="getRoomById(slotProps.data.id)" />
                        <Button class="p-2" severity="danger" icon="pi pi-trash" outlined @click.prevent="deleteRoom(slotProps.data.id)" />
                    </div>
                </template>
            </Column>
        </DataTable>
        <Paginator v-model:first="currentPage" v-on:update:first="getRoomList" :rows="1" :total-records="roomList.totalPages">
            <template #start>
                <!-- <div></div> -->
            </template>
            <template #end>
                <div class="totalElements"><b>Элементлар сони: </b> {{ roomList.totalElements }}</div>
            </template>
        </Paginator>
        <Dialog v-model:visible="create" modal header="Хона яратиш">
            <form ref="formCreate" @submit.prevent="createRoom">
                <div class="flex">
                    <div class="flex flex-column">
                        <InputText v-model="RoomCredentials.name" :class="{ 'p-invalid': submitted && !RoomCredentials.name }" placeholder="Хонани киритинг" class="mr-4" />
                        <small v-if="submitted && !RoomCredentials.name" style="color: var(--red-500)">Хонани киритинг</small>
                    </div>
                    <Button label="Яратиш" :loading="loadingCreate" type="submit" style="height: 45px" />
                </div>
            </form>
        </Dialog>
        <Dialog v-model:visible="updateDialog" modal header="Хона ҳақида маълумот">
            <form ref="updateForm" @submit.prevent="updateRoom">
                <InputText v-model="roomById.name" class="mr-4" />
                <Button label="Янгилаш" type="submit" :loading="updateLoading" />
            </form>
        </Dialog>
    </div>
</template>
