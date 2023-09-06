<script setup>
import { useMeetingStore } from "@/stores/meeting";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import MeetingDetail from "@/views/meeting/MeetingDetail.vue";
import router from "@/router";

const meetingStore = useMeetingStore();
const { meetingTransferList } = storeToRefs(meetingStore);
const { statusById } = storeToRefs(meetingStore);

const currentPage = ref(0);
const search = ref("");
const meetingDetail = ref(false);
const meetingInfo = ref(false);
const meetingId = ref(0);
const loadingTable = ref(false);
const dataStatus = ref();
const role = localStorage.getItem("user");

const getMeetingTransferList = async () => {
  loadingTable.value = true;
  const data = await meetingStore.getMeetingTransferList(
    currentPage.value,
    search.value
  );
  if (data) loadingTable.value = false;
};
const detail = (id) => {
  meetingDetail.value = true;
  meetingId.value = id;
};
const info = async (id) => {
  meetingInfo.value = true;
  dataStatus.value = await meetingStore.getStatusById(id);
};
const convertToPdf = (id) => {
  router.push(`/meeting/transfer/list/pdf/generate/${id}`);
};

onMounted(() => {
  getMeetingTransferList();
});
</script>

<template>
  <div>
    <DataTable
      :value="meetingTransferList.content"
      :loading="loadingTable"
      lazy
    >
      <template #empty>Ҳеч қандай маълумот топилмади</template>
      <template #header>
        <InputText
          v-model="search"
          placeholder="Қидириш"
          @input="getMeetingTransferList(search)"
        />
      </template>
      <Column field="meeting_id" header="ID" />
      <Column field="patient_name" header="Бемор исми" />
      <Column field="employee_name" header="Доктор исми" />
      <Column field="created" header="Яратилган вақти" />
      <Column field="speciality" header="Мутахассислиги" />
      <Column field="serviced" header="Кўрик ҳолати">
        <template #body="slotProps">
          <div v-if="slotProps.data.serviced == true" class="text-center">
            <Tag class="p-2" severity="success" style="font-size: 13.5px">
              Кўрилган
            </Tag>
          </div>
          <div v-if="slotProps.data.serviced == false" class="text-center">
            <Tag class="p-2" severity="danger" style="font-size: 13.5px">
              Кўрилмаган
            </Tag>
          </div>
        </template>
      </Column>
      <Column field="inspection_transfer_name" header="Муассаса" />
      <Column field="finished" header="Тугалланганлиги">
        <template #body="slotProps">
          <p
            v-if="slotProps.data.finished == true"
            style="font-size: 1rem; color: var(--green-600)"
          >
            Тугалланган
          </p>
          <p
            v-if="slotProps.data.finished == false"
            style="font-size: 1rem; color: var(--red-500)"
          >
            Тугалланмаган
          </p>
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
            <Button
              :modelValue="slotProps.view"
              :disabled="slotProps.data.finished == true"
              icon="pi pi-info"
              class="p-2"
              outlined
              severity="warning"
              @click.prevent="info(slotProps.data.meeting_id)"
            />
            <Button
              :modelValue="slotProps.view"
              icon="pi pi-eye"
              class="p-2"
              outlined
              severity="primary"
              @click.prevent="detail(slotProps.data.meeting_id)"
            />
            <Button
              v-if="role !== 'LABORATORY'"
              :disabled="slotProps.data.serviced == false"
              :modelValue="slotProps.view"
              icon="pi pi-file-pdf"
              class="p-2"
              outlined
              severity="danger"
              @click.prevent="convertToPdf(slotProps.data.meeting_id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <Paginator
      v-model:first="currentPage"
      v-on:update:first="getMeetingTransferList"
      :rows="1"
      :total-records="meetingTransferList.totalPages"
    >
      <template #start></template>
      <template #end>
        <div class="totalElements">
          <b>Элементлар сони: </b> {{ meetingTransferList.totalElements }}
        </div>
      </template>
    </Paginator>
    <Dialog
      v-model:visible="meetingDetail"
      modal
      header="Қабуллар тарихи"
      style="width: 67vw"
    >
      <MeetingDetail :meeting-id="meetingId" />
    </Dialog>
    <Dialog
      v-if="dataStatus"
      v-model:visible="meetingInfo"
      modal
      header="Қабуллар ҳолати"
      style="width: 32vw"
    >
      <h4>{{ statusById.object.message }}!</h4>
      <b>Мутахассисликлар рўйхати:</b>
      <p
        v-for="(specialitiy, index) in statusById.object.specialtiy_list"
        :key="specialitiy.id"
        class="mt-2"
      >
        {{ index + 1 }}. {{ specialitiy.name }}
      </p>
    </Dialog>
  </div>
</template>
