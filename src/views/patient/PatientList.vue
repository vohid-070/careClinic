<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { usePatientStore } from "@/stores/patient";
import { storeToRefs } from "pinia";
import PatientCreate from "@/views/patient/PatientCreate.vue";
import PatientEdit from "@/views/patient/PatientEdit.vue";
import router from "@/router";

const toast = useToast();
const confirm = useConfirm();

const role = localStorage.getItem("user");

const patientStore = usePatientStore();
const { patient } = storeToRefs(patientStore);
const currentPage = ref(0);
const search = ref("");
const tableLoading = ref(false);
const createDialog = ref(false);
const createdClient = ref("");
const editDialog = ref(false);
const updatedClient = ref("");
const editedId = ref(0);

const getPatientList = async () => {
  tableLoading.value = true;
  const data = await patientStore.patientSearch(
    search.value,
    currentPage.value
  );
  if (data) tableLoading.value = false;
};

onMounted(() => {
  getPatientList();
});

const created = (added) => {
  createdClient.value = added;
  if (added.status == 201) {
    toast.add({
      severity: "success",
      summary: "Created",
      detail: "success created",
      group: "bc",
      life: 3000,
    });
    createDialog.value = false;
    getPatientList();
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: added.message,
      group: "bc",
      life: 3000,
    });
  }
};

const addClient = () => {
  createDialog.value = true;
};

const editClient = (id) => {
  editDialog.value = true;
  editedId.value = id;
};

const edited = (updated) => {
  updatedClient.value = updated;
  if (updated.status == 200) {
    toast.add({
      severity: "success",
      summary: "Updated",
      detail: "success updated",
      group: "bc",
      life: 3000,
    });
    editDialog.value = false;
    getPatientList();
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: updated.message,
      group: "bc",
      life: 3000,
    });
  }
};

const deleteClient = async (id) => {
  confirm.require({
    message: "Сиз ҳақиқатдан ҳам ушбу фойдаланувчини ўчирмоқчимисиз?",
    header: "Ўчиришни тасдиқланг",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    acceptLabel: "Ҳа",
    rejectLabel: "Йўқ",
    accept: async () => {
      tableLoading.value = true;
      const deletedElement = await patientStore.patientDelete(id);
      if (deletedElement.status == 200) {
        toast.add({
          severity: "success",
          summary: "Deleted",
          detail: "Муваффақиятли ўчирилди",
          group: "bc",
          life: 3000,
        });
        tableLoading.value = false;
      } else {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Ўчиришда хатолик юз берди",
          group: "bc",
          life: 3000,
        });
      }
      getPatientList();
    },
  });
};

const detail = (id) => {
  router.push(`/patient/detail/${id}`);
};
const printCheck = (id) => {
  router.push(`/check/issue/${id}`);
};
const createMeeting = (id) => {
  router.push(`/meeting/create/${id}`);
};
</script>

<template>
  <div>
    <DataTable
      :value="patient.content"
      lazy
      :loading="tableLoading"
      :rows="patient.size"
    >
      <template #empty>Ҳеч қандай маълумот топилмади</template>
      <template #header>
        <div class="flex justify-content-between">
          <InputText
            v-model="search"
            placeholder="Қидириш"
            @input="getPatientList(search)"
          />
          <Button
            v-if="
              role == 'ADMIN' || role == 'RECEPTION_1' || role == 'RECEPTION_2'
            "
            label="Рўйхатга олиш"
            icon="pi pi-plus"
            @click.prevent="addClient"
          />
        </div>
      </template>
      <Column field="id" header="ID" />
      <Column field="name" header="Исми" />
      <Column field="surname" header="Фамилияси" />
      <Column field="gender" header="Жинси">
        <template #body="slotProps">
          <p v-if="slotProps.data.gender == 'MALE'">Эркак</p>
          <p v-if="slotProps.data.gender == 'FEMALE'">Аёл</p>
        </template>
      </Column>
      <Column field="birthDate" header="Туғилган санаси" />
      <Column field="phone" header="Телефон" />
      <Column field="address" header="Яшаш манзили" />
      <!-- <Column field="region.name" header="Region" /> -->
      <Column field="view" style="width: 10%">
        <template #header>
          <div class="mx-auto">
            <i class="pi pi-ellipsis-v"></i>
          </div>
        </template>
        <template #body="slotProps">
          <div class="flex gap-2 justify-content-center">
            <Button
              v-if="
                role == 'RECEPTION_1' ||
                role == 'RECEPTION_2' ||
                role == 'ADMIN'
              "
              class="p-2"
              severity="info"
              icon="pi pi-users"
              outlined
              @click.prevent="createMeeting(slotProps.data.id)"
            />
            <Button
              v-if="
                role == 'RECEPTION_1' ||
                role == 'RECEPTION_2' ||
                role == 'ADMIN'
              "
              class="p-2"
              severity="success"
              icon="pi pi-print"
              outlined
              @click.prevent="printCheck(slotProps.data.id)"
            />
            <Button
              class="p-2"
              severity="primary"
              icon="pi pi-eye"
              outlined
              @click.prevent="detail(slotProps.data.id)"
            />
            <Button
              v-if="
                role == 'ADMIN' ||
                role == 'RECEPTION_1' ||
                role == 'RECEPTION_2'
              "
              :modelValue="slotProps.view"
              icon="pi pi-pencil"
              class="p-2"
              outlined
              severity="warning"
              @click.prevent="editClient(slotProps.data.id)"
            />
            <Button
              v-if="role == 'ADMIN'"
              class="p-2"
              severity="danger"
              icon="pi pi-trash"
              outlined
              @click.prevent="deleteClient(slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <Paginator
      v-model:first="currentPage"
      v-on:update:first="getPatientList"
      :rows="1"
      :total-records="patient.totalPages"
    >
      <template #start>
        <!-- <div></div> -->
      </template>
      <template #end>
        <div class="totalElements">
          <b>Элементлар сони: </b> {{ patient.totalElements }}
        </div>
      </template>
    </Paginator>
    <Dialog
      v-model:visible="createDialog"
      header="Беморни рўйхатга олиш"
      modal
      style="width: 35vw"
    >
      <PatientCreate @created="created"></PatientCreate>
    </Dialog>
    <Dialog
      v-model:visible="editDialog"
      header="Бемор маълумотларни ўзгартириш"
      modal
      style="width: 35vw"
    >
      <PatientEdit @edited="edited" :edited-id="editedId"></PatientEdit>
    </Dialog>
  </div>
</template>
