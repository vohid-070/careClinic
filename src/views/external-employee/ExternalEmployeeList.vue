<script setup>
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { useExternalEmployeeStore } from '@/stores/external';
import CreateExternalEmployee from '@/views/external-employee/CreateExternaleEmployee.vue';
import UpdateExternalEmployee from '@/views/external-employee/UpdateExternalEmployee.vue';

const externalEmployeeStore = useExternalEmployeeStore();
const { externalEmployee } = storeToRefs(externalEmployeeStore);
const toast = useToast();
const confirm = useConfirm();

const currentPage = ref(0);
const search = ref('');
const tableLoading = ref(false);
const createDialog = ref(false);
const createdEmployee = ref();
const updatedPatient = ref();
const editedId = ref(0);
const editDialog = ref(false);

const getExternalEmployeeList = async () => {
    tableLoading.value = true;
    const list = await externalEmployeeStore.getEmployeeList(currentPage.value, search.value);
    if (list) tableLoading.value = false;
};

const addExternalEmployee = () => {
    createDialog.value = true;
};
const created = (added) => {
    createdEmployee.value = added;
    if (added.status == 200) {
        toast.add({
            severity: 'success',
            summary: 'Муваффақиятли',
            detail: 'Муваффақиятли яратилди',
            group: 'bc',
            life: 3000
        });
        createDialog.value = false;
        getExternalEmployeeList();
    } else {
        toast.add({
            severity: 'error',
            summary: 'Хатолик',
            detail: added.message,
            group: 'bc',
            life: 3000
        });
    }
};

const deleteEmployee = async (id) => {
    confirm.require({
        message: 'Сиз ҳақиқатдан ҳам ушбу фойдаланувчини ўчирмоқчимисиз?',
        header: 'Ўчиришни тасдиқланг',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Ҳа',
        rejectLabel: 'Йўқ',
        accept: async () => {
            tableLoading.value = true;
            const deletedElement = await externalEmployeeStore.deleteEmployee(id);
            if (deletedElement.status == 200) {
                toast.add({ severity: 'success', summary: 'Deleted', detail: 'Муваффақиятли ўчирилди', group: 'bc', life: 3000 });
                tableLoading.value = false;
            } else {
                toast.add({ severity: 'error', summary: 'Error', detail: 'Ўчиришда хатолик юз берди', group: 'bc', life: 3000 });
            }
            getExternalEmployeeList();
        },
        reject: () => {
            tableLoading.value = false;
        }
    });
};

const editEmployee = (id) => {
    editDialog.value = true;
    editedId.value = id;
};

const edited = (updated) => {
    updatedPatient.value = updated;
    if (updated.status == 200) {
        toast.add({
            severity: 'success',
            summary: 'Янгиланди',
            detail: 'Муваффақиятли янгиланди',
            group: 'bc',
            life: 3000
        });
        editDialog.value = false;
        getExternalEmployeeList();
    } else {
        toast.add({
            severity: 'error',
            summary: 'Хатолик',
            detail: updated.message,
            group: 'bc',
            life: 3000
        });
    }
};

onMounted(() => {
    getExternalEmployeeList();
});
</script>

<template>
    <div>
        <DataTable :value="externalEmployee.content" lazy :loading="tableLoading">
            <template #empty>Ҳеч қандай маълумот топилмади</template>
            <template #header>
                <div class="flex justify-content-between">
                    <InputText v-model="search" placeholder="Қидириш" @input="getExternalEmployeeList(search)" style="width: 300px" />
                    <Button label="Яратиш" icon="pi pi-plus" @click.prevent="addExternalEmployee" />
                </div>
            </template>
            <Column field="id" header="ID" />
            <Column field="name" header="Исми" />
            <Column field="surname" header="Фамилияси" />
            <Column field="phone" header="Телефон раками" />
            <Column field="organization" header="Муассаса" />
            <Column field="view" style="width: 10%">
                <template #header>
                    <div class="mx-auto">
                        <i class="pi pi-ellipsis-v"></i>
                    </div>
                </template>
                <template #body="slotProps">
                    <div class="flex gap-2 justify-content-center">
                        <Button :modelValue="slotProps.view" icon="pi pi-pencil" class="p-2" outlined severity="primary" @click.prevent="editEmployee(slotProps.data.id)" />
                        <Button class="p-2" severity="danger" icon="pi pi-trash" outlined @click.prevent="deleteEmployee(slotProps.data.id)" />
                    </div>
                </template>
            </Column>
        </DataTable>
        <Paginator v-model:first="currentPage" v-on:update:first="getExternalEmployeeList" :rows="1" :total-records="externalEmployee.totalPages">
            <template #start>
                <!-- <div></div> -->
            </template>
            <template #end>
                <div class="totalElements"><b>Элементлар сони: </b> {{ externalEmployee.totalElements }}</div>
            </template>
        </Paginator>
        <Dialog v-model:visible="createDialog" header="Ҳамкор доктор маълумотларини яратиш" modal style="width: 40vw">
            <CreateExternalEmployee @created="created" />
        </Dialog>
        <Dialog v-model:visible="editDialog" modal header="Ҳамкор доктор маълумотларини ўзгартириш" style="width: 40vw">
            <UpdateExternalEmployee :edited-id="editedId" @edited="edited" />
        </Dialog>
    </div>
</template>
