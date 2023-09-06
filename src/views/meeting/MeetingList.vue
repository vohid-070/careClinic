<script setup>
import { useMeetingStore } from "@/stores/meeting";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import router from "@/router";
import MeetingDetail from "@/views/meeting/MeetingDetail.vue";
import MeetingTransferList from "@/views/meeting/MeetingTransferList.vue";

const role = localStorage.getItem("user");

const meetingStore = useMeetingStore();
const { meeting } = storeToRefs(meetingStore);

const currentPage = ref(0);
const search = ref("");
const loadingTable = ref(false);
const meetingDetail = ref(false);
const meetingId = ref(0);

const percentage = new Intl.NumberFormat("ru-Ru");

const getMeetingList = async () => {
  loadingTable.value = true;
  const data = await meetingStore.getMeetingList(
    currentPage.value,
    search.value
  );
  if (data) loadingTable.value = false;
};
const detail = (id) => {
  meetingDetail.value = true;
  meetingId.value = id;
};
const convertToPdf = (id) => {
  router.push(`/meeting/list/pdf/generate/${id}`);
};

onMounted(() => {
  getMeetingList();
});
</script>

<template>
  <TabView>
    <TabPanel header="Нақд ёки карта">
      <DataTable :value="meeting.content" :loading="loadingTable" lazy>
        <template #empty>Ҳеч қандай маълумот топилмади</template>
        <template #header>
          <InputText
            v-model="search"
            placeholder="Қидириш"
            @input="getMeetingList(search)"
          />
        </template>
        <Column field="meeting_id" header="ID" />
        <Column field="patient_name" header="Бемор исми" />
        <Column field="employee_name" header="Доктор исми" />
        <Column field="external_employee_name" header="Ҳамкор доктор исми" />
        <Column field="created" header="Яратилган вақти" />
        <Column field="speciality" header="Мутахассислиги" />
        <Column field="sum" header="Тўлов суммаси">
          <template #body="slotProps">
            <p>{{ percentage.format(slotProps.data.sum) }}</p>
          </template>
        </Column>
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
        v-on:update:first="getMeetingList"
        :rows="1"
        :total-records="meeting.totalPages"
      >
        <template #start></template>
        <template #end>
          <div class="totalElements">
            <b>Элементлар сони: </b> {{ meeting.totalElements }}
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
    </TabPanel>

    <TabPanel header="Перечисление">
      <MeetingTransferList />
    </TabPanel>
  </TabView>
</template>
