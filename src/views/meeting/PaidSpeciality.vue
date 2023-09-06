<script setup>
import { useMeetingStore } from "@/stores/meeting";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import DoctorComment from "@/views/meeting/DoctorComment.vue";

const meetingStore = useMeetingStore();
const { paidSpeciality } = storeToRefs(meetingStore);

const toast = useToast();
const currentPage = ref(0);
const search = ref("");
const loadingTable = ref(false);
const show = ref(false);
const meetingId = ref(null);

const getMeetingPaid = async () => {
  try {
    loadingTable.value = true;
    await meetingStore.getMeetingPaidSpeciality(
      currentPage.value,
      search.value
    );
  } catch (error) {
    return error;
  } finally {
    loadingTable.value = false;
  }
};
const openDialog = (id) => {
  show.value = true;
  meetingId.value = id;
};

const createdComment = (created) => {
  if (created.status == 200) {
    toast.add({
      severity: "success",
      summary: "Created",
      detail: "success created",
      group: "bc",
      life: 3000,
    });
    show.value = false;
    getMeetingPaid();
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: created.message,
      group: "bc",
      life: 3000,
    });
  }
};

onMounted(() => {
  getMeetingPaid();
});
</script>

<template>
  <DataTable :value="paidSpeciality.content" lazy :loading="loadingTable">
    <template #empty>Ҳеч қандай маълумот топилмади</template>
    <template #header>
      <InputText
        v-model="search"
        placeholder="Қидириш"
        @input="getMeetingPaid(search)"
      />
    </template>
    <Column field="meeting_id" header="ID" />
    <Column field="patient_name" header="Бемор исми" />
    <!-- <Column field="employee_name" header="Доктор исми" /> -->
    <Column field="external_employee_name" header="Ҳамкор доктор исми" />
    <Column field="speciality" header="Мутахассислиги" />
    <Column field="created" header="Яратилган вақти" />
    <Column field="cashed" header="Тўлов холати">
      <template #body="slotProps">
        <p v-if="slotProps.data.cashed == true" style="color: var(--green-700)">
          Тўланган
        </p>
        <p v-if="slotProps.data.cashed == false" style="color: var(--red-700)">
          Тўланмаган
        </p>
      </template>
    </Column>
    <!-- <Column field="sum" header="Тўлов суммаси" /> -->
    <Column header="Тўлов тури" field="pay_type">
      <template #body="slotProps">
        <p v-if="slotProps.data.pay_type == 'IN_PLACE_CASH'">Нақд</p>
        <p v-if="slotProps.data.pay_type == 'IN_PLACE_CARD'">Карта</p>
        <p v-if="slotProps.data.pay_type == 'TRANSFER'">Перечисление</p>
      </template>
    </Column>
    <!-- <Column field="inspection_contract_name" header="Мед.Осмотр" /> -->
    <!-- <Column header="Кўрик холати" field="finished" />
        <Column header="Кўрик ёпилганлиги" field="closed" />
        <Column header="Хизмат холати" field="serviced" /> -->
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
            severity="warning"
            @click.prevent="openDialog(slotProps.data.meeting_id)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
  <Paginator
    v-model:first="currentPage"
    v-on:update:first="getMeetingPaid"
    :rows="1"
    :total-records="paidSpeciality.totalPages"
  >
    <template #start></template>
    <template #end>
      <div class="totalElements">
        <b>Элементлар сони: </b> {{ paidSpeciality.totalElements }}
      </div>
    </template>
  </Paginator>

  <Dialog
    v-model:visible="show"
    modal
    header="Доктор ташхиси ва тавсияси"
    style="width: 50vw"
  >
    <DoctorComment :meeting-id="meetingId" @created="createdComment" />
  </Dialog>
</template>
