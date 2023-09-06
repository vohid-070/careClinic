<script setup>
import { ref, onMounted, reactive } from "vue";
import { useStorageMedicament } from "@/stores/storageMedicament";
import { useMedicamentStore } from "@/stores/medicament";
import { storeToRefs } from "pinia";
import FileInput from "@/components/base/FileInput.vue";
import { useToast } from "primevue/usetoast";
import AllInvoices from "@/views/storage-medicament/AllInvoices.vue";

const storageMedicament = useStorageMedicament();
const { storage } = storeToRefs(storageMedicament);
const medicamentStore = useMedicamentStore();
const { medicamentList } = storeToRefs(medicamentStore);

const toast = useToast();
const currentPage = ref(0);
const search = ref("");
const medicamentParam = ref(null);
const tableLoading = ref(false);
const addLoading = ref(false);
const removeLoading = ref(false);
const createDialog = ref(false);
const itemId = ref(null);
const removeDialog = ref(false);
const removeId = ref(null);
const file = ref();
const count = ref(0);
const document_name = ref("");
const sum = ref(null);
const removeFile = ref();
const removeCount = ref(0);
const removeDocumentName = ref("");
const removeSum = ref(null);
const invoiceId = ref(null);
const showInvoice = ref(false);

const getStorageMedicamentList = async () => {
  try {
    tableLoading.value = true;
    await storageMedicament.getStorageMedicamentList(
      search.value,
      currentPage.value
    );
  } catch (error) {
    return error;
  } finally {
    tableLoading.value = false;
  }
};

const getMedicamentSearch = async () => {
  await medicamentStore.getMedicamentList(medicamentParam.value);
};

const showCreateDialog = (id) => {
  itemId.value = id;
  createDialog.value = true;
};
const showRemoveDialog = (id) => {
  removeId.value = id;
  removeDialog.value = true;
};

const addToStorage = async () => {
  if (
    (medicamentParam.value &&
      count.value &&
      sum.value &&
      document_name.value &&
      file.value) ||
    (itemId.value &&
      count.value &&
      sum.value &&
      document_name.value &&
      file.value)
  ) {
    addLoading.value = true;
    const createdResult = reactive({
      dto: {},
      file: {},
    });

    if (itemId.value != null) {
      createdResult.dto.medicament_id = itemId.value;
    } else {
      createdResult.dto.medicament_id = medicamentParam.value;
    }
    createdResult.dto.count = count.value;
    createdResult.dto.document_name = document_name.value;
    createdResult.dto.sum = sum.value;
    createdResult.file = file.value;
    const formData = new FormData();
    formData.append(
      "dto",
      new Blob([JSON.stringify(createdResult.dto)], {
        type: "application/json",
      })
    );
    formData.append("file", file.value);
    const data = await storageMedicament.addToStorage(formData);
    if (data.status == 201) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Муваффақиятли қўшилди",
        life: 3000,
        group: "bc",
      });
      getStorageMedicamentList();
      createDialog.value = false;
      medicamentParam.value = null;
      count.value = 0;
      sum.value = null;
      document_name.value = "";
    }
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Илтимос ҳамма қаторни тўлдиринг",
      life: 3000,
      group: "bc",
    });
  }
  addLoading.value = false;
};

const removeFromStorage = async () => {
  if (
    removeCount.value &&
    removeSum.value &&
    removeDocumentName.value &&
    removeFile.value
  ) {
    removeLoading.value = true;
    const removedResult = reactive({
      dto: {},
      file: {},
    });

    removedResult.dto.medicament_id = removeId.value;
    removedResult.dto.count = removeCount.value;
    removedResult.dto.document_name = removeDocumentName.value;
    removedResult.dto.sum = removeSum.value;
    removedResult.file = removeFile.value;
    const formData = new FormData();
    formData.append(
      "dto",
      new Blob([JSON.stringify(removedResult.dto)], {
        type: "application/json",
      })
    );
    formData.append("file", removeFile.value);
    const data = await storageMedicament.removeFromStorage(formData);
    if (data.status == 200) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Муваффақиятли қўшилди",
        life: 3000,
        group: "bc",
      });
      getStorageMedicamentList();
      removeDialog.value = false;
      removeCount.value = 0;
      removeSum.value = null;
      removeSum.value = "";
    }
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Илтимос ҳамма қаторни тўлдиринг",
      life: 3000,
      group: "bc",
    });
  }
  removeLoading.value = false;
};

const getAllInvoices = (id) => {
  showInvoice.value = true;
  invoiceId.value = id;
};

onMounted(() => {
  getStorageMedicamentList();
});
</script>

<template>
  <div class="card p-2">
    <DataTable :value="storage.content" :loading="tableLoading">
      <template #empty>Ҳеч қандай маълумот топилмади</template>
      <template #header>
        <div class="flex flex-wrap justify-content-between">
          <InputText
            v-model="search"
            placeholder="Қидириш"
            @input="getStorageMedicamentList(search)"
          />
          <Button
            icon="pi pi-plus"
            label="Хисобга қўшиш"
            @click="showCreateDialog()"
          />
        </div>
      </template>
      <Column field="medicament.id" header="ID"></Column>
      <Column field="medicament.name" header="Номи"></Column>
      <Column field="medicament.category.name" header="Категорияси"></Column>
      <Column field="medicament.description" header="Тавсифи"></Column>
      <Column field="count" header="Қолган сони"></Column>
      <Column field="actions" style="width: 15%">
        <template #header>
          <div class="mx-auto">
            <i class="pi pi-ellipsis-v"></i>
          </div>
        </template>
        <template #body="slotProps">
          <div class="flex flex-wrap gap-2 justify-content-center">
            <Button
              v-tooltip.top="'Хисобга қўшиш'"
              outlined
              icon="pi pi-sign-in"
              size="small"
              severity="success"
              @click="showCreateDialog(slotProps.data.medicament.id)"
            />
            <Button
              v-tooltip.top="'Хисобдан чиқариш'"
              outlined
              icon="pi pi-sign-out"
              size="small"
              severity="danger"
              @click="showRemoveDialog(slotProps.data.medicament.id)"
            />
            <!-- <Button outlined size="small" /> -->
            <Button
              outlined
              v-tooltip.top="'Ўзгаришлар тарихи'"
              size="small"
              icon="pi pi-eye"
              @click="getAllInvoices(slotProps.data.medicament.id)"
            />
          </div>
        </template>
      </Column>
      <template #footer>
        <Paginator
          v-model:first="currentPage"
          v-on:update:first="getStorageMedicamentList"
          :rows="1"
          :total-records="storage.totalPages"
        >
          <template #start> </template>
          <template #end>
            <div class="totalElements">
              <b>Элементлар сони: </b> {{ storage.totalElements }}
            </div>
          </template>
        </Paginator>
      </template>
    </DataTable>
    <Dialog
      v-model:visible="createDialog"
      modal
      header="Хисобга қўшиш"
      style="width: 35vw"
    >
      <div class="flex flex-wrap gap-4">
        <InputNumber
          v-model="count"
          placeholder="Сони"
          show-buttons
          locale="ru"
          style="width: 300px"
        />
        <InputNumber
          v-model="sum"
          placeholder="Нархи"
          locale="ru"
          style="width: 300px"
        />
      </div>
      <div class="flex flex-wrap gap-4 my-4">
        <InputText
          v-model="document_name"
          placeholder="Файл номи"
          style="width: 300px"
        />
        <FileInput v-model="file" style="width: 300px" />
      </div>
      <div class="flex flex-wrap gap-4">
        <Dropdown
          v-if="!itemId"
          v-model="medicamentParam"
          placeholder="Дори номи"
          editable
          :options="medicamentList"
          option-label="name"
          option-value="id"
          @input="getMedicamentSearch(medicamentParam)"
          style="width: 300px"
        />
      </div>
      <div class="my-2 flex justify-content-end">
        <Button label="Қўшиш" :loading="addLoading" @click="addToStorage" />
      </div>
    </Dialog>

    <Dialog
      v-model:visible="removeDialog"
      modal
      header="Хисобдан чиқариш"
      style="width: 35vw"
    >
      <div class="flex flex-wrap gap-4">
        <InputNumber
          v-model="removeCount"
          placeholder="Сони"
          show-buttons
          locale="ru"
          style="width: 300px"
        />
        <InputNumber
          v-model="removeSum"
          placeholder="Нархи"
          locale="ru"
          style="width: 300px"
        />
      </div>
      <div class="flex flex-wrap gap-4 my-4">
        <InputText
          v-model="removeDocumentName"
          placeholder="Файл номи"
          style="width: 300px"
        />
        <FileInput v-model="removeFile" style="width: 300px" />
      </div>
      <div class="my-2 flex justify-content-end">
        <Button
          label="Чиқариш"
          :loading="removeLoading"
          @click="removeFromStorage"
        />
      </div>
    </Dialog>
    <Dialog
      v-model:visible="showInvoice"
      modal
      header="Склад ўзгариш тарихи"
      style="width: 65vw"
    >
      <AllInvoices :invoiceId="invoiceId" />
    </Dialog>
  </div>
</template>
