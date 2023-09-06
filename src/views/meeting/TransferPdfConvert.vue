<script setup>
import { useMeetingStore } from "@/stores/meeting";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const meetingStore = useMeetingStore();
const { meetingTransferPdf } = storeToRefs(meetingStore);
const meeting = ref(null);
const dataPdf = ref(null);
const loading = ref(false);

const props = defineProps({
  id: String,
});
const getMeetingTransferPdfById = async () => {
  meeting.value = await meetingStore.meetingTransferPdfId(props.id);
};
const getMeetingPdf = async () => {
  loading.value = true;
  dataPdf.value = await meetingStore.getMeetingPdfById(props.id);
  loading.value = false;
};

onMounted(() => {
  getMeetingTransferPdfById();
});
</script>

<template>
  <div class="card">
    <div
      v-if="meetingTransferPdf.object"
      class="pt-4 pl-2"
      style="font-size: 14px; color: var(black); width: 750px"
    >
      <header class="flex gap-4">
        <div class="flex flex-column align-items-center" style="width: 200px">
          <img src="@/../public/logo.png" style="width: 150px" />
        </div>
        <div class="pt-2">
          <div class="flex gap-2">
            <b>Пациент:</b>
            <span>
              {{ meetingTransferPdf.object.patient_name }}
            </span>
          </div>
          <div class="flex gap-2 pt-1">
            <b>Муассаса:</b>
            <span>
              {{ meetingTransferPdf.object.inspection_transfer_name }}
            </span>
          </div>
        </div>
        <div class="pt-2">
          <div class="flex gap-2">
            <b>ID:</b>
            <span>{{ meetingTransferPdf.object.patient_id }}</span>
          </div>
          <div class="flex gap-2 pt-1">
            <b>Контракт:</b>
            <span>{{
              meetingTransferPdf.object.inspection_transfer_contract
            }}</span>
          </div>
        </div>
      </header>

      <div class="pl-4 mt-6 flex gap-8">
        <div>
          <div>
            <b>Город: </b>
            <span>Алмалық</span>
          </div>
          <div>
            <b>Тел: </b>
            <span>+998 95 012 40 20</span>
          </div>
        </div>
        <div>
          <div>
            <b>Telegram bot: </b>
            <span
              ><a href="https://t.me/national_hospital_bot" target="_blank"
                >@national_hospital_bot</a
              ></span
            >
          </div>
          <div>
            <b>Email: </b>
            <span>
              <a href="https://nationalpharm@mail.ru" target="_blank">
                nationalpharm@mail.ru
              </a>
            </span>
          </div>
        </div>
      </div>
      <Divider />

      <main
        v-if="meetingTransferPdf.object"
        class="pl-4 pb-4 mt-6"
        style="text-align: justify"
      >
        <div
          v-for="item in meetingTransferPdf.object.infoList"
          :key="item.id"
          class=""
        >
          <h4 class="text-center" style="font-weight: bold">
            Перевичная консультация {{ item.speciality }}а
          </h4>

          <div>
            <b>Врач: </b>
            <span>{{ item.employee_name }}</span>
          </div>
          <div>
            <b>Дата осмотра: </b>
            <span>{{ item.serviced_date }}</span>
          </div>
          <div class="mb-4">
            <b>Результат: </b>
            <span>{{ item.doctor_comment }}</span>
          </div>
        </div>
      </main>
      <div
        class="flex justify-content-between gap-2 mt-4 pl-4"
        style="width: 100%"
      >
        <Button
          @click="router.push('/meeting/list')"
          icon="pi pi-arrow-left"
          label="Рўйхатга қайтиш"
        />

        <Button
          icon="pi pi-file-pdf"
          label="PDF"
          severity="danger"
          :loading="loading"
          @click="getMeetingPdf"
        />
      </div>
    </div>
  </div>
</template>
