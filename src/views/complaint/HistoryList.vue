<script setup>
import { useComplaintStore } from "@/stores/complaint";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

const complaintStore = useComplaintStore();
const { complaintAllList } = storeToRefs(complaintStore);

const currentPage = ref(0);
const search = ref("");
const tableLoading = ref(false);
const dataItem = ref();
const showDialog = ref(false);

const getComplaintAllList = async () => {
  tableLoading.value = true;
  await complaintStore.ComplaintAll(search.value, currentPage.value);
  tableLoading.value = false;
};

const showItem = (item) => {
  showDialog.value = true;
  dataItem.value = item;
};

onMounted(() => {
  getComplaintAllList();
});
</script>

<template>
  <DataTable :value="complaintAllList.content" :loading="tableLoading">
    <template #empty>Ҳеч қандай маълумот топилмади</template>
    <template #header>
      <InputText
        v-model="search"
        placeholder="Қидириш"
        @input="getComplaintAllList(search)"
      />
    </template>
    <Column field="id" header="ID" />
    <Column field="telegram_number" header="Мижоз рақами" />
    <Column field="user_id" header="Телеграм ID" />
    <Column field="name" header="Мижоз изохи">
      <template #body="slotProps">
        <p v-if="slotProps.data.name && slotProps.data.name.length > 20">
          {{ slotProps.data.name.substring(0, 20) }}<span>...</span>
        </p>
        <p v-else>{{ slotProps.data.name }}</p>
      </template>
    </Column>
    <Column field="complaintType" header="Тури">
      <template #body="slotProps">
        <Tag
          v-if="slotProps.data.complaintType == 'OFFER'"
          severity="success"
          class="p-2"
          style="font-size: 12px"
          >ТАКЛИФ</Tag
        >
        <Tag
          v-if="slotProps.data.complaintType == 'COMPLAINT'"
          severity="danger"
          class="p-2"
          style="font-size: 12px"
          >ШИКОЯТ</Tag
        >
      </template></Column
    >
    <Column field="created" header="Мурожаат яратилган сана" />
    <Column field="employee_full_name" header="Ходимнинг ФИО" />
    <Column field="employee_comment" header="Ходимнинг изохи">
      <template #body="slotProps">
        <p
          v-if="
            slotProps.data.employee_comment &&
            slotProps.data.employee_comment.length > 20
          "
        >
          {{ slotProps.data.employee_comment.substring(0, 20) }}<span>...</span>
        </p>
        <p v-else>{{ slotProps.data.employee_comment }}</p>
      </template>
    </Column>
    <Column field="serviced_date" header="Хизмат қўрсатилган сана" />
    <Column field="serviced" header="Холати">
      <template #body="slotProps">
        <Tag
          v-if="slotProps.data.serviced == true"
          class="p-2"
          severity="success"
          style="font-size: 14px"
        >
          Кўрилди
        </Tag>
        <Tag
          v-if="slotProps.data.serviced == false"
          class="p-2"
          severity="danger"
          style="font-size: 14px"
        >
          Кўрилмади
        </Tag>
      </template>
    </Column>
    <Column field="actions">
      <template #header>
        <div class="mx-auto">
          <i class="pi pi-ellipsis-v"></i>
        </div>
      </template>
      <template #body="slotProps">
        <div class="flex justify-content-center">
          <Button
            outlined
            rounded
            icon="pi pi-eye"
            @click="showItem(slotProps.data)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
  <Paginator
    v-model:first="currentPage"
    v-on:update:first="getComplaintAllList"
    :rows="1"
    :total-records="complaintAllList.totalPages"
  >
    <template #start>
      <Button
        icon="pi pi-refresh"
        text
        rounded
        @click="getComplaintAllList"
        v-tooltip="'Қайта юклаш'"
      />
    </template>
    <template #end>
      <div class="totalElements">
        <b>Элементлар сони: </b> {{ complaintAllList.totalElements }}
      </div>
    </template>
  </Paginator>
  <Dialog v-model:visible="showDialog" modal style="width: 35vw">
    <template #header>
      <div v-if="dataItem.complaintType == 'COMPLAINT'">
        <Tag severity="danger" class="p-2">ШИКОЯТ</Tag>
      </div>
      <div v-if="dataItem.complaintType == 'OFFER'">
        <Tag severity="success" class="p-2">ТАКЛИФ</Tag>
      </div>
    </template>
    <div
      class="flex flex-column gap-3"
      style="font-size: 16px; text-align: justify"
    >
      <div>
        <b>Мижоз изохи: </b><span>{{ dataItem.name }}</span>
      </div>
      <div>
        <b>Ходимнинг изохи: </b><span>{{ dataItem.employee_comment }}</span>
      </div>
    </div>
  </Dialog>
</template>
