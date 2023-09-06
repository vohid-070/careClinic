<script setup>
import { useCategoryStore } from "@/stores/category";
import { storeToRefs } from "pinia";
import { ref, onMounted, reactive } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const categoryStore = useCategoryStore();
const { categorySearch } = storeToRefs(categoryStore);
const { categoryById } = storeToRefs(categoryStore);
const currentPage = ref(0);
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

const categoryCredentials = reactive({
  name: "",
});

const getCategorySearchList = async () => {
  tableLoading.value = true;
  await categoryStore.categorySearchList(search.value, currentPage.value);
  tableLoading.value = false;
};

const showCreate = () => {
  create.value = true;
};
const createCategory = async () => {
  submitted.value = true;
  if (!submitted.value) loadingCreate.value = true;
  if (categoryCredentials.name) {
    const data = await categoryStore.createCategory(categoryCredentials);
    if (data) {
      create.value = false;
      submitted.value = false;
      categoryCredentials.name = "";
      toast.add({
        severity: "success",
        summary: "Муваффақиятли",
        detail: "Муваффақиятли яратилди",
        group: "bc",
        life: 3000,
      });
      getCategorySearchList();
    }
  }
};
const getCategoryById = async (id) => {
  await categoryStore.getCategoryById(id);
  updateId.value = id;
  updateDialog.value = true;
};
const updateCategory = async () => {
  const category = reactive({
    updateCategory: {},
  });
  const update = ref();
  category.updateCategory.name = categoryById.value.name;
  update.value = category.updateCategory;
  updateLoading.value = true;
  const updated = await categoryStore.updateCategory(
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
    getCategorySearchList();
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
    getCategorySearchList();
  }
};

const deleteCategory = async (id) => {
  confirm.require({
    message: "Сиз ҳақиқатдан ҳам ушбу категорияни ўчирмоқчимисиз?",
    header: "Ўчиришни тасдиқланг",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    acceptLabel: "Ҳа",
    rejectLabel: "Йўқ",
    accept: async () => {
      tableLoading.value = true;
      const deletedElement = await categoryStore.deleteCategory(id);
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
      getCategorySearchList();
    },
    reject: () => {
      tableLoading.value = false;
    },
  });
};

onMounted(() => {
  getCategorySearchList();
});
</script>

<template>
  <div class="card">
    <DataTable :value="categorySearch.content" lazy :loading="tableLoading">
      <template #empty>Ҳеч қандай маълумот топилмади</template>
      <template #header>
        <div class="flex justify-content-between">
          <InputText
            v-model="search"
            placeholder="Қидириш"
            @input="getCategorySearchList(search)"
            style="width: 300px"
          />
          <Button
            label="Категория яратиш"
            icon="pi pi-plus"
            @click="showCreate"
          />
        </div>
      </template>
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Категория"></Column>
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
              @click.prevent="getCategoryById(slotProps.data.id)"
            />
            <Button
              class="p-2"
              severity="danger"
              icon="pi pi-trash"
              outlined
              @click.prevent="deleteCategory(slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <Paginator
      v-model:first="currentPage"
      v-on:update:first="getCategorySearchList"
      :rows="1"
      :total-records="categorySearch.totalPages"
    >
      <template #start></template>
      <template #end>
        <div class="totalElements">
          <b>Элементлар сони: </b> {{ categorySearch.totalElements }}
        </div>
      </template>
    </Paginator>
    <Dialog v-model:visible="create" modal header="Категория яратиш">
      <form ref="categoryCreate" @submit.prevent="createCategory">
        <div class="flex">
          <div class="flex flex-column">
            <InputText
              v-model="categoryCredentials.name"
              :class="{ 'p-invalid': submitted && !categoryCredentials.name }"
              placeholder="Категорияни киритинг"
              class="mr-4"
              style="width: 300px"
            />
            <small
              v-if="submitted && !categoryCredentials.name"
              style="color: var(--red-500)"
            >
              Категорияни киритинг
            </small>
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
      header="Категория ҳақида маълумотлар"
    >
      <form ref="categoryUpdate" @submit.prevent="updateCategory">
        <InputText
          v-model="categoryById.name"
          class="mr-4"
          placeholder="Категорияни киритинг"
          style="width: 300px"
        />
        <Button label="Янгилаш" type="submit" :loading="updateLoading" />
      </form>
    </Dialog>
  </div>
</template>
