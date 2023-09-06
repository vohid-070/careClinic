<script setup>
import { useMedicamentStore } from "@/stores/medicament";
import { useCategoryStore } from "@/stores/category";
import { storeToRefs } from "pinia";
import { ref, onMounted, reactive } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const medicamentStore = useMedicamentStore();
const categoryStore = useCategoryStore();
const { category } = storeToRefs(categoryStore);
const { medicamentSearch } = storeToRefs(medicamentStore);
const { medicamentById } = storeToRefs(medicamentStore);
const currentPage = ref(0);
const currentPageCategory = ref(0);
const search = ref("");

const toast = useToast();
const confirm = useConfirm();

const tableLoading = ref(false);
const create = ref(false);
const loadingCreate = ref(false);
const submitted = ref(false);
const updateId = ref(null);
const updateDialog = ref(false);
const updateLoading = ref(false);
const submittedUpdate = ref(false);

const medicamentCredentials = reactive({
  category_id: null,
  name: "",
  description: "",
});

const getMedicamentSearchList = async () => {
  try {
    tableLoading.value = true;
    await medicamentStore.medicamentSearchList(search.value, currentPage.value);
  } catch (error) {
    return error;
  } finally {
    tableLoading.value = false;
  }
};
const getCategoryList = async () => {
  await categoryStore.categoryList(currentPageCategory.value);
};

const showCreate = () => {
  create.value = true;
};
const createMedicament = async () => {
  submitted.value = true;
  if (!submitted.value) loadingCreate.value = true;
  if (
    medicamentCredentials.category_id &&
    medicamentCredentials.name &&
    medicamentCredentials.description
  ) {
    const data = await medicamentStore.createMedicament(medicamentCredentials);
    if (data) {
      create.value = false;
      submitted.value = false;
      medicamentCredentials.category_id = null;
      medicamentCredentials.name = "";
      medicamentCredentials.description = "";
      toast.add({
        severity: "success",
        summary: "Муваффақиятли",
        detail: "Муваффақиятли яратилди",
        group: "bc",
        life: 3000,
      });
      getMedicamentSearchList();
    }
  }
};
const getMedicamentById = async (id) => {
  await medicamentStore.getMedicamentById(id);
  updateId.value = id;
  updateDialog.value = true;
};
const updateMedicament = async () => {
  submittedUpdate.value = true;
  if (
    medicamentById.value.name != "" &&
    medicamentById.value.category.id &&
    medicamentById.value.description != ""
  ) {
    const medicament = reactive({
      updateMedicament: {},
    });
    const update = ref();
    medicament.updateMedicament.name = medicamentById.value.name;
    medicament.updateMedicament.category_id = medicamentById.value.category.id;
    medicament.updateMedicament.description = medicamentById.value.description;
    update.value = medicament.updateMedicament;
    updateLoading.value = true;
    const updated = await medicamentStore.updateMedicament(
      updateId.value,
      update.value
    );
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
      getMedicamentSearchList();
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
      getMedicamentSearchList();
    }
  }
};

const deleteMedicament = async (id) => {
  confirm.require({
    message: "Сиз ҳақиқатдан ҳам ушбу категорияни ўчирмоқчимисиз?",
    header: "Ўчиришни тасдиқланг",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    acceptLabel: "Ҳа",
    rejectLabel: "Йўқ",
    accept: async () => {
      tableLoading.value = true;
      const deletedElement = await medicamentStore.deleteMedicament(id);
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
      getMedicamentSearchList();
    },
    reject: () => {
      tableLoading.value = false;
    },
  });
};

onMounted(() => {
  getMedicamentSearchList();
  getCategoryList();
});
</script>

<template>
  <div class="card">
    <DataTable :value="medicamentSearch.content" :loading="tableLoading">
      <template #empty>Ҳеч қандай маълумот топилмади</template>
      <template #header>
        <div class="flex justify-content-between">
          <InputText
            v-model="search"
            placeholder="Қидириш"
            @input="getMedicamentSearchList(search)"
            style="width: 300px"
          />
          <Button label="Дори яратиш" icon="pi pi-plus" @click="showCreate" />
        </div>
      </template>
      <Column field="id" header="ID" />
      <Column field="name" header="Дори" />
      <Column field="category.name" header="Категория" />
      <Column field="description" header="Тавсифи" />
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
              @click.prevent="getMedicamentById(slotProps.data.id)"
            />
            <Button
              class="p-2"
              severity="danger"
              icon="pi pi-trash"
              outlined
              @click.prevent="deleteMedicament(slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <Paginator
      v-model:first="currentPage"
      v-on:update:first="getMedicamentSearchList"
      :rows="1"
      :total-records="medicamentSearch.totalPages"
    >
      <template #start></template>
      <template #end>
        <div class="totalElements">
          <b>Элементлар сони: </b> {{ medicamentSearch.totalElements }}
        </div>
      </template>
    </Paginator>
    <Dialog v-model:visible="create" modal header="Дори яратиш">
      <form ref="medicamentCreate" @submit.prevent="createMedicament">
        <div class="flex">
          <div>
            <div class="flex flex-column mb-4">
              <Dropdown
                v-model="medicamentCredentials.category_id"
                :class="{
                  'p-invalid': submitted && !medicamentCredentials.category_id,
                }"
                placeholder="Категорияни киритинг"
                class="mr-4"
                optionLabel="name"
                optionValue="id"
                :options="category.content"
                style="width: 300px"
              />
              <small
                v-if="submitted && !medicamentCredentials.category_id"
                style="color: var(--red-500)"
                >Категорияни киритинг</small
              >
            </div>
            <div class="flex flex-column">
              <InputText
                v-model="medicamentCredentials.name"
                :class="{
                  'p-invalid': submitted && !medicamentCredentials.name,
                }"
                placeholder="Дорини киритинг"
                class="mr-4"
                style="width: 300px"
              />
              <small
                v-if="submitted && !medicamentCredentials.name"
                style="color: var(--red-500)"
                >Дорини киритинг</small
              >
            </div>
          </div>
          <div>
            <div class="flex flex-column">
              <InputText
                v-model="medicamentCredentials.description"
                :class="{
                  'p-invalid': submitted && !medicamentCredentials.description,
                }"
                placeholder="Тавсифни киритинг"
                class="mr-4"
                style="width: 300px"
              />
              <small
                v-if="submitted && !medicamentCredentials.description"
                style="color: var(--red-500)"
                >Тавсифни киритинг</small
              >
            </div>
          </div>
        </div>
        <div class="flex justify-content-end mt-4">
          <Button label="Яратиш" :loading="loadingCreate" type="submit" />
        </div>
      </form>
    </Dialog>
    <Dialog
      v-model:visible="updateDialog"
      modal
      header="Дори ҳақида маълумотлар"
    >
      <form ref="medicamentUpdate" @submit.prevent="updateMedicament">
        <div class="flex">
          <div>
            <div class="flex flex-column mb-4">
              <Dropdown
                v-model="medicamentById.category"
                :class="{
                  'p-invalid': submittedUpdate && !medicamentById.category,
                }"
                placeholder="Категорияни киритинг"
                class="mr-4"
                optionLabel="name"
                :options="category.content"
                style="width: 300px"
              />
              <small
                v-if="submittedUpdate && !medicamentById.category"
                style="color: var(--red-500)"
                >Категорияни киритинг</small
              >
            </div>
            <div class="flex flex-column">
              <InputText
                v-model="medicamentById.name"
                :class="{
                  'p-invalid': submittedUpdate && !medicamentById.name,
                }"
                placeholder="Дорини киритинг"
                class="mr-4"
                style="width: 300px"
              />
              <small
                v-if="submittedUpdate && !medicamentById.name"
                style="color: var(--red-500)"
                >Дорини киритинг</small
              >
            </div>
          </div>
          <div>
            <div class="flex flex-column">
              <InputText
                v-model="medicamentById.description"
                :class="{
                  'p-invalid': submittedUpdate && !medicamentById.description,
                }"
                placeholder="Тавсифни киритинг"
                class="mr-4"
                style="width: 300px"
              />
              <small
                v-if="submittedUpdate && !medicamentById.description"
                style="color: var(--red-500)"
                >Тавсифни киритинг</small
              >
            </div>
          </div>
        </div>
        <div class="flex justify-content-end mt-4">
          <Button label="Янгилаш" :loading="updateLoading" type="submit" />
        </div>
      </form>
    </Dialog>
  </div>
</template>
