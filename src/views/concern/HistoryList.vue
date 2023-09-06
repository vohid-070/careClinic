<script setup>
import { useConcernStore } from "@/stores/concern";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

const concernStore = useConcernStore();
const { concernAllList } = storeToRefs(concernStore);

const currentPage = ref(0);
const search = ref("");
const historyList = ref();
const tableLoading = ref(false);
const showDialog = ref(false);
const dataItem = ref();

const getConcernAllList = async () => {
  tableLoading.value = true;
  historyList.value = await concernStore.ConcernAll(
    search.value,
    currentPage.value
  );
  tableLoading.value = false;
};

const showItem = (item) => {
  showDialog.value = true;
  dataItem.value = item;
};

onMounted(() => {
  getConcernAllList();
});
</script>

<template>
  <div>
    <DataTable :value="concernAllList.content" :loading="tableLoading">
      <template #empty>Ҳеч қандай маълумот топилмади</template>
      <template #header>
        <InputText
          v-model="search"
          placeholder="Қидириш"
          @input="getConcernAllList(search)"
        />
      </template>
      <Column field="id" header="ID" />
      <Column field="telegram_number" header="Мижоз рақами" />
      <!-- <Column field="user_id" header="Телеграм ID" /> -->
      <Column field="name" header="Мижоз шикояти">
        <template #body="slotProps">
          <p v-if="slotProps.data.name && slotProps.data.name.length > 20">
            {{ slotProps.data.name.substring(0, 20) }}<span>...</span>
          </p>
          <p v-else>{{ slotProps.data.name }}</p>
        </template>
      </Column>
      <Column field="created" header="Мурожаат яратилган сана" />
      <Column field="employee.name" header="Ходимнинг ФИО">
        <Column field="speciality.name" header="Мутахассислик" />
        <template #body="slotProps">
          <p v-if="slotProps.data.employee">
            {{ slotProps.data.employee.name }}
            {{ slotProps.data.employee.surname }}
          </p>
        </template>
      </Column>
      <Column field="doctor_comment" header="Ходимнинг изохи">
        <template #body="slotProps">
          <p
            v-if="
              slotProps.data.doctor_comment &&
              slotProps.data.doctor_comment.length > 20
            "
          >
            {{ slotProps.data.doctor_comment.substring(0, 20) }}<span>...</span>
          </p>
          <p v-else>{{ slotProps.data.doctor_comment }}</p>
        </template>
      </Column>
      <Column field="serviced_date" header="Хизмат қўрсатилган сана" />
      <Column field="serviced" header="Холати">
        <template #body="slotProps">
          <div v-if="slotProps.data.serviced == 'true'">
            <i class="pi pi-check" style="color: green" />
          </div>
          <i
            v-if="slotProps.data.serviced == 'false'"
            class="pi pi-times"
            style="color: red"
          />
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
      v-on:update:first="getConcernAllList"
      :rows="1"
      :total-records="concernAllList.totalPages"
    >
      <template #start>
        <Button
          icon="pi pi-refresh"
          text
          rounded
          @click="getConcernAllList"
          v-tooltip="'Қайта юклаш'"
        />
      </template>
      <template #end>
        <div class="totalElements">
          <b>Элементлар сони: </b> {{ concernAllList.totalElements }}
        </div>
      </template>
    </Paginator>

    <Dialog
      v-model:visible="showDialog"
      modal
      header="Батафсил"
      style="width: 35vw"
    >
      <div class="flex flex-column gap-2" style="font-size: 16px">
        <div>
          <b>Мутахассислиги: </b>
          <span v-if="dataItem.speciality">{{ dataItem.speciality.name }}</span>
        </div>
        <div style="text-align: justify">
          <b>Мижоз изоҳи: </b><span>{{ dataItem.name }}</span>
        </div>
        <div style="text-align: justify">
          <b>Ходим изоҳи: </b><span>{{ dataItem.doctor_comment }}</span>
        </div>
        <div>
          <b>Ходим ФИО: </b>
          <span v-if="dataItem.employee"
            >{{ dataItem.employee.name }} {{ dataItem.employee.surname }}</span
          >
        </div>
        <div>
          <b>Хизмат кўрсатилган сана: </b>
          <span>{{ dataItem.serviced_date }}</span>
        </div>
      </div>
    </Dialog>
  </div>
</template>
