<script setup>
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";
import { onMounted, ref, reactive } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const formStore = useFormStore();
const { formList } = storeToRefs(formStore);
const { formById } = storeToRefs(formStore);
const toast = useToast();
const confirm = useConfirm();

const currentPage = ref(0);
const search = ref("");
const tableLoading = ref(false);
const create = ref(false);
const loadingCreate = ref(false);
const submitted = ref(false);
const updateId = ref(null);
const updateDialog = ref(false);
const updateLoading = ref(false);

const formCredentials = reactive({
  name: "",
});

const getFormList = async () => {
  tableLoading.value = true;
  const data = await formStore.getFormSearchList(
    search.value,
    currentPage.value
  );
  if (data) tableLoading.value = false;
};
const showCreate = () => {
  create.value = true;
};

const createForm = async () => {
  submitted.value = true;
  if (!submitted.value) loadingCreate.value = true;
  if (formCredentials.name) {
    const data = await formStore.createForm(formCredentials);
    if (data) {
      create.value = false;
      submitted.value = false;
      formCredentials.name = "";
      toast.add({
        severity: "success",
        summary: "Муваффақиятли",
        detail: "Муваффақиятли яратилди",
        group: "bc",
        life: 3000,
      });
      getFormList();
    }
  }
};
const getFormById = async (id) => {
  await formStore.getFormById(id);
  updateId.value = id;
  updateDialog.value = true;
};
const daleteForm = async (id) => {
  confirm.require({
    message: "Сиз ҳақиқатдан ҳам ушбу формани ўчирмоқчимисиз?",
    header: "Ўчиришни тасдиқланг",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    acceptLabel: "Ҳа",
    rejectLabel: "Йўқ",
    accept: async () => {
      tableLoading.value = true;
      const deletedElement = await formStore.deleteForm(id);
      if (deletedElement.status == 200) {
        tableLoading.value = false;
        toast.add({
          severity: "success",
          summary: "Ўчирилди",
          detail: "Муваффақиятли ўчирилди",
          group: "bc",
          life: 3000,
        });
      } else {
        toast.add({
          severity: "error",
          summary: "Хатолик",
          detail: "Ўчиришда хатолик юз берди",
          group: "bc",
          life: 3000,
        });
      }
      getFormList();
    },
    reject: () => {
      tableLoading.value = false;
    },
  });
};
const updateForm = async () => {
  const form = reactive({
    updateForm: {},
  });
  const update = ref();
  form.updateForm.name = formById.value.name;
  update.value = form.updateForm;
  updateLoading.value = true;
  const updated = await formStore.updateForm(updateId.value, update.value);
  if (updated.status == 200) {
    updateLoading.value = false;
    updateDialog.value = false;
    toast.add({
      severity: "success",
      summary: "Муваффақиятли",
      detail: "Муваффақиятли янгиланди",
      group: "bc",
      life: 3000,
    });
    getFormList();
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: updated,
      group: "bc",
      life: 3000,
    });
    updateLoading.value = false;
    updateDialog.value = false;
    getFormList();
  }
};

onMounted(() => {
  getFormList();
});
</script>

<template>
  <div>
    <DataTable :value="formList.content" lazy :loading="tableLoading">
      <template #empty>Ҳеч қандай маълумот топилмади</template>
      <template #header>
        <div class="flex justify-content-between">
          <InputText
            v-model="search"
            placeholder="Қидириш"
            @input="getFormList(search)"
          />
          <Button label="Форма яратиш" icon="pi pi-plus" @click="showCreate" />
        </div>
      </template>
      <Column field="id" header="ID" style="width: 33%"></Column>
      <Column field="name" header="Форма" style="width: 57%"></Column>
      <Column field="view" style="width: 10%">
        <template #header>
          <div class="mx-auto">
            <i class="pi pi-ellipsis-v"></i>
          </div>
        </template>
        <template #body="slotProps">
          <div class="flex gap-2 justify-content-center">
            <Button
              :modelValue="slotProps.view"
              icon="pi pi-pencil"
              class="p-2"
              outlined
              severity="primary"
              @click.prevent="getFormById(slotProps.data.id)"
            />
            <Button
              class="p-2"
              severity="danger"
              icon="pi pi-trash"
              outlined
              @click.prevent="daleteForm(slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <Paginator
      v-model:first="currentPage"
      v-on:update:first="getFormList"
      :rows="1"
      :total-records="formList.totalPages"
    >
      <template #start>
        <!-- <div></div> -->
      </template>
      <template #end>
        <div class="totalElements">
          <b>Элементлар сони: </b> {{ formList.totalElements }}
        </div>
      </template>
    </Paginator>
    <Dialog v-model:visible="create" modal header="Форма яратиш">
      <form ref="formCreate" @submit.prevent="createForm">
        <div class="flex">
          <div class="flex flex-column">
            <InputText
              v-model="formCredentials.name"
              :class="{ 'p-invalid': submitted && !formCredentials.name }"
              placeholder="Формани киритинг"
              class="mr-4"
            />
            <small
              v-if="submitted && !formCredentials.name"
              style="color: var(--red-500)"
              >Формани киритинг</small
            >
          </div>
          <div class="flex justify-content-end">
            <Button label="Яратиш" :loading="loadingCreate" type="submit" />
          </div>
        </div>
      </form>
    </Dialog>
    <Dialog
      v-model:visible="updateDialog"
      modal
      header="Форма ҳақида маълумотлар"
    >
      <form ref="formUpdate" @submit.prevent="updateForm">
        <InputText
          v-model="formById.name"
          class="mr-4"
          placeholder="Формани киритинг"
        />
        <Button label="Янгилаш" type="submit" :loading="updateLoading" />
      </form>
    </Dialog>
  </div>
</template>
