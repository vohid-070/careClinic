<script setup>
import { useEmployeeStore } from '@/stores/employee';
import { storeToRefs } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import router from '@/router';
import { useConfirm } from 'primevue/useconfirm';

const employeeStore = useEmployeeStore();
const { employee } = storeToRefs(employeeStore);
const currentPage = ref(0);
const search = ref('');
const toast = useToast();
const data = ref(null);
const dataTableLoading = ref(false);
const confirm = useConfirm();

const getEmployeeList = async () => {
    dataTableLoading.value = true;
    data.value = await employeeStore.getEmployeeList(currentPage.value, search.value);
    if (data.value) dataTableLoading.value = false;
};
const getEmployeeByID = async (id) => {
    router.push(`/employee/detail/${id}`);
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
            dataTableLoading.value = true;
            const deletedElement = await employeeStore.deleteEmployee(id);
            if (deletedElement.status == 200) {
                dataTableLoading.value = false;
                toast.add({ severity: 'success', summary: 'Deleted', detail: 'Муваффақиятли ўчирилди', group: 'bc', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Error', detail: 'Ўчиришда хатолик юз берди', group: 'bc', life: 3000 });
            }
            getEmployeeList();
        },
        reject: () => {
            dataTableLoading.value = false;
        }
    });
};

onMounted(() => {
    getEmployeeList();
});
</script>

<template>
    <div v-if="employee">
        <DataTable :value="employee.content" lazy :loading="dataTableLoading" :rows="employee.content.size">
            <template #empty>Ҳеч қандай маълумот топилмади</template>
            <template #header>
                <div class="flex justify-content-between">
                    <InputText v-model="search" placeholder="Қидириш" @input="getEmployeeList(search)" style="width: 300px" />
                    <Button label="Фойдаланувчи яратиш" icon="pi pi-plus" @click="router.push('/employee/create')" />
                </div>
            </template>
            <Column field="id" header="ID" />
            <Column field="username" header="Номи" />
            <Column field="name" header="Исми" />
            <Column field="surname" header="Фамилияси" />
            <Column field="phone" header="Телефон рақами" />
            <Column field="level.name" header="Лавозими" />
            <Column field="speciality.name" header="Мутахасисслиги" />
            <Column field="active" header="Ҳолати">
                <template #body="slotProps">
                    <b v-if="slotProps.data.active == true" style="color: var(--green-600)">Актив</b>
                    <b v-if="slotProps.data.active == false" style="color: var(--red-500)">Актив эмас</b>
                </template>
            </Column>
            <Column field="view" style="width: 10%">
                <template #header>
                    <div class="mx-auto">
                        <i class="pi pi-ellipsis-v"></i>
                    </div>
                </template>
                <template #body="slotProps">
                    <div class="flex gap-2 justify-content-center">
                        <Button :modelValue="slotProps.view" icon="pi pi-pencil" class="p-2" outlined severity="primary" @click.prevent="getEmployeeByID(slotProps.data.id)" />
                        <Button class="p-2" severity="danger" icon="pi pi-trash" outlined @click.prevent="deleteEmployee(slotProps.data.id)" />
                    </div>
                </template>
            </Column>
        </DataTable>

        <Paginator v-model:first="currentPage" v-on:update:first="getEmployeeList" :rows="1" :total-records="employee.totalPages">
            <template #start>
                <!-- <div></div> -->
            </template>
            <template #end>
                <div class="totalElements"><b>Элементлар сони: </b> {{ employee.totalElements }}</div>
            </template>
        </Paginator>
    </div>
</template>
