<script setup>
import { useMeetingStore } from "@/stores/meeting";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const meetingStore = useMeetingStore();
const { meetingById } = storeToRefs(meetingStore);
const meeting = ref(null);
const loading = ref(false);

const props = defineProps({
  id: String,
});
const getMeetingById = async () => {
  meeting.value = await meetingStore.getMeetingById(props.id);
};

onMounted(() => {
  getMeetingById();
});

const convertToPdf = async () => {
  loading.value = true;
  await meetingStore.meetingTransferSinglePdfId(props.id);
  loading.value = false;
};
</script>

<template>
  <div class="card">
    <div
      v-if="meetingById.object"
      class="pt-4 pl-2"
      style="font-size: 16px; width: 750px; font-family: Arial, sans-serif"
    >
      <header class="flex gap-4">
        <div class="flex flex-column align-items-center" style="width: 200px">
          <img src="@/../public/logo.png" style="width: 150px" />
        </div>
        <div class="pt-2">
          <div class="flex gap-2">
            <b>Пациент:</b>
            <span v-if="meetingById.object.patient">
              {{ meetingById.object.patient.name }}
              {{ meetingById.object.patient.surname }}
            </span>
          </div>
          <div v-if="meetingById.object.patient" class="flex gap-2 pt-1">
            <b>Пол:</b>
            <span v-if="meetingById.object.patient.gender == 'MALE'"
              >Мужской</span
            >
            <span v-if="meetingById.object.patient.gender == 'FEMALE'"
              >Женский</span
            >
          </div>
          <div class="flex gap-2 pt-1">
            <b>Врач:</b>
            <span v-if="meetingById.object.employee">
              {{ meetingById.object.employee.name }}
              {{ meetingById.object.employee.surname }}
            </span>
          </div>
        </div>
        <div v-if="meetingById.object.patient" class="pt-2">
          <div class="flex gap-2 pt-1">
            <b>ID:</b>
            <span>{{ meetingById.object.patient.id }}</span>
          </div>
          <div class="flex gap-2 pt-1">
            <b>Дата рождения:</b>
            <span>{{ meetingById.object.patient.birthDate }}</span>
          </div>
          <div class="flex gap-2 pt-1">
            <b>Дата:</b>
            <span>{{ meetingById.object.service_date }}</span>
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
            <span
              ><a href="https://nationalpharm@mail.ru" target="_blank"
                >nationalpharm@mail.ru</a
              ></span
            >
          </div>
        </div>
      </div>
      <Divider />
      <main class="pl-4 pb-4" style="text-align: justify">
        <h4 class="text-center" style="font-weight: bold">
          Перевичная консультация {{ meetingById.object.speciality.name }}а
        </h4>
        <b>Диагноз: </b>
        <span>{{ meetingById.object.doctor_comment }}</span>
        <br />
        <br />
        <b>Рекоммендации: </b>
        <span>{{ meetingById.object.doctor_recommendation }}</span>
      </main>
    </div>
    <div class="flex justify-content-between mt-4 pl-4" style="width: 750px">
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
        @click="convertToPdf"
      />
    </div>
  </div>
</template>
