<script setup>
import { ref, onMounted, reactive } from "vue";
import { useStorageMedicament } from "@/stores/storageMedicament";
import { storeToRefs } from "pinia";
import { useToast } from "primevue/usetoast";
import FileInput from "@/components/base/FileInput.vue";
import DataTable from "primevue/datatable";

const props = defineProps({
  invoiceId: [String, Number],
});

const toast = useToast();

const storageMedicament = useStorageMedicament();
const { allInvoices } = storeToRefs(storageMedicament);

const currentPage = ref(0);
const tableLoading = ref(false);
const editingRows = ref([]);

const urlDev = ref("http://178.218.207.110:9002");
const percentage = new Intl.NumberFormat("ru-Ru");

const getAllInvoices = async () => {
  tableLoading.value = true;
  await storageMedicament.getAllInvoices(props.invoiceId, currentPage.value);
  tableLoading.value = false;
};

const onRowEditSave = async (event) => {
  tableLoading.value = true;
  const editedResult = reactive({
    dto: {},
    file: {},
  });

  editedResult.dto.document_name = event.newData.document_name;
  editedResult.file = event.newData.name;
  const formData = new FormData();
  formData.append(
    "dto",
    new Blob([JSON.stringify(editedResult.dto)], {
      type: "application/json",
    })
  );
  formData.append("file", event.newData.name);
  const data = await storageMedicament.editInvoice(event.data.id, formData);

  if (data.status == 200) {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Муваффақиятли янгиланди",
      life: 3000,
      group: "bc",
    });
    getAllInvoices();
  } else if (data.response.data.object == "Request part: [file] missing") {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Файл танланмади",
      life: 3000,
      group: "bc",
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: data.message,
      life: 3000,
      group: "bc",
    });
  }
  tableLoading.value = false;
};

onMounted(() => {
  getAllInvoices();
});
</script>

<template>
  <div>
    <DataTable
      v-model:editingRows="editingRows"
      :value="allInvoices.content"
      :loading="tableLoading"
      editMode="row"
      dataKey="id"
      @row-edit-save="onRowEditSave"
      tableClass="editable-cells-table"
    >
      <Column field="id" header="ID" />
      <Column field="document_name" header="Номи">
        <template #editor="{ data, field }">
          <InputText
            v-model="data[field]"
            style="border-color: var(--primary-500)"
          />
        </template>
      </Column>
      <Column field="sum" header="Нархи">
        <template #body="slotProps">
          <p>{{ percentage.format(slotProps.data.sum) }}</p>
        </template>
      </Column>
      <Column field="count_change" header="Ўзгариш миқдори">
        <template #body="slotProps">
          <p class="text-center">{{ slotProps.data.count_change }}</p>
        </template>
      </Column>
      <Column field="created" header="Сана" />
      <Column field="change" header="Ўзгариш ҳолати">
        <template #body="slotProps">
          <div class="flex justify-content-center">
            <i
              v-if="slotProps.data.change == true"
              class="pi pi-arrow-up"
              style="color: var(--green-500)"
            />
            <i
              v-if="slotProps.data.change == false"
              class="pi pi-arrow-down"
              style="color: var(--red-500)"
            />
          </div>
        </template>
      </Column>
      <Column field="name" header="Файл">
        <template #body="slotProps">
          <a
            :href="`${urlDev}/invoice/${slotProps.data.name}`"
            target="_blank"
            style="color: var(--blue-600)"
          >
            <i class="pi pi-download" />
            Файл
          </a>
        </template>
        <template #editor="{ data, field }">
          <FileInput v-model="data[field]" style="width: 200px" />
        </template>
      </Column>
      <Column
        :rowEditor="true"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      >
        <template #header>
          <div class="mx-auto">
            <i class="pi pi-ellipsis-v"></i>
          </div>
        </template>
      </Column>
      <template #footer>
        <Paginator
          v-model:first="currentPage"
          v-on:update:first="getAllInvoices"
          :rows="1"
          :total-records="allInvoices.totalPages"
        >
          <template #start> </template>
          <template #end>
            <div class="totalElements">
              <b>Элементлар сони: </b> {{ allInvoices.totalElements }}
            </div>
          </template>
        </Paginator>
      </template>
    </DataTable>
  </div>
</template>
<style lang="scss" scoped>
::v-deep(.editable-cells-table td.p-cell-editing) {
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
}
</style>
