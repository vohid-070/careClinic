<script setup>
import { useCallBackStore } from "@/stores/callBack";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

const callBackStore = useCallBackStore();
const { callBackAllList } = storeToRefs(callBackStore);

const currentPage = ref(0);
const search = ref("");
const tableLoading = ref(false);
const dataItem = ref();
const showDialog = ref(false);

const getCallBackAllList = async () => {
  tableLoading.value = true;
  await callBackStore.CallBackAll(search.value, currentPage.value);
  tableLoading.value = false;
};

const showItem = (item) => {
  showDialog.value = true;
  dataItem.value = item;
};

onMounted(() => {
  getCallBackAllList();
});
</script>

<template>
  <DataTable :value="callBackAllList.content" :loading="tableLoading">
    <template #empty>Ҳеч қандай маълумот топилмади</template>
    <template #header>
      <InputText
        v-model="search"
        placeholder="Қидириш"
        @input="getCallBackAllList(search)"
      />
    </template>
    <Column field="id" header="ID" />
    <Column field="telegram_number" header="Мижоз рақами" />
    <Column field="user_id" header="Телеграм ID" />
    <Column field="created" header="Мурожаат яратилган сана">
      <template #body="slotProps">
        <p class="text-center">{{ slotProps.data.created }}</p>
      </template>
    </Column>
    <Column field="employee_full_name" header="Ходимнинг ФИО" />
    <Column field="name" header="Изох">
      <template #body="slotProps">
        <p v-if="slotProps.data.name && slotProps.data.name.length > 20">
          {{ slotProps.data.name.substring(0, 20) }}<span>...</span>
        </p>
        <p v-else>{{ slotProps.data.name }}</p>
      </template>
    </Column>
    <Column field="serviced_date" header="Хизмат қўрсатилган сана" />
    <Column field="serviced" header="Холати">
      <template #body="slotProps">
        <Tag
          v-if="slotProps.data.serviced == true"
          severity="success"
          style="font-size: 14px"
        >
          Кўрилди
        </Tag>
        <Tag
          v-if="slotProps.data.serviced == false"
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
            :disabled="!slotProps.data.name"
            @click="showItem(slotProps.data)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
  <Paginator
    v-model:first="currentPage"
    v-on:update:first="getCallBackAllList"
    :rows="1"
    :total-records="callBackAllList.totalPages"
  >
    <template #start>
      <Button
        icon="pi pi-refresh"
        text
        rounded
        @click="getCallBackAllList"
        v-tooltip="'Қайта юклаш'"
      />
    </template>
    <template #end>
      <div class="totalElements">
        <b>Элементлар сони: </b> {{ callBackAllList.totalElements }}
      </div>
    </template>
  </Paginator>
  <Dialog v-model:visible="showDialog" modal header="Изох" style="width: 35vw">
    <div>
      {{ dataItem.name }}
    </div>
  </Dialog>
</template>
