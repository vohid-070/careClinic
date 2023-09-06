<script setup>
import { useMeetingStore } from "@/stores/meeting";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const props = defineProps({
  meetingId: [Number],
});

const meetingStore = useMeetingStore();
const { meetingById } = storeToRefs(meetingStore);
const meeting = ref(null);

const percentage = new Intl.NumberFormat("ru-Ru");

const getMeetingById = async () => {
  meeting.value = await meetingStore.getMeetingById(props.meetingId);
};

onMounted(() => {
  getMeetingById();
});
</script>

<template>
  <div
    v-if="meeting"
    class="grid p-4"
    style="line-height: 30px; font-size: 18px"
  >
    <div>
      <h3 class="mb-4 pl-4">Бемор ҳақида маълумот</h3>
      <div class="flex gap-6 justify-content-between">
        <div
          class="flex flex-column flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Ф.И.О:</b>
          <p>
            {{ meetingById.object.patient.name }}
            {{ meetingById.object.patient.surname }}
          </p>
        </div>
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Туғилган санаси:</b>
          <p>{{ meetingById.object.patient.birthDate }}</p>
        </div>
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Телефон рақами:</b>
          <p>{{ meetingById.object.patient.phone }}</p>
        </div>
      </div>
      <div class="flex gap-6 justify-content-between">
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Жинси:</b>
          <p v-if="meetingById.object.patient.gender == 'FEMALE'">Аёл</p>
          <p v-else>Эркак</p>
        </div>
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Вилояти:</b>
          <p>{{ meetingById.object.patient.region.name }}</p>
        </div>
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Яшаш манзили:</b>
          <p>{{ meetingById.object.patient.address }}</p>
        </div>
      </div>
    </div>

    <Divider v-if="meetingById.object.employee" />
    <div v-if="meetingById.object.employee" class="mt-4">
      <h3 class="mb-4 pl-4">Доктор ҳақида маълумот</h3>
      <div class="flex gap-6 justify-content-between">
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Ф.И.О:</b>
          <p>
            {{ meetingById.object.employee.name }}
            {{ meetingById.object.employee.surname }}
          </p>
        </div>
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Мутахассислиги:</b>
          <p>{{ meetingById.object.employee.speciality.name }}</p>
        </div>
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Бўлим:</b>
          <p>{{ meetingById.object.employee.speciality.directory.name }}</p>
        </div>
      </div>

      <div class="flex gap-6 justify-content-between">
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Лавозими:</b>
          <p>{{ meetingById.object.employee.level.name }}</p>
        </div>
      </div>
    </div>

    <Divider v-if="meetingById.object.employee == null" />
    <div v-if="meetingById.object.employee == null" class="mt-4">
      <h3 class="mb-4 pl-4">Доктор ҳақида маълумот</h3>
      <div class="flex gap-6 justify-content-between">
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Ф.И.О:</b>
          <p></p>
        </div>
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Мутахассислиги:</b>
          <p>{{ meetingById.object.speciality.name }}</p>
        </div>
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Бўлим:</b>
          <p>{{ meetingById.object.speciality.directory.name }}</p>
        </div>
      </div>

      <div class="flex gap-6 justify-content-between">
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Лавозими:</b>
          <p></p>
        </div>
      </div>
    </div>

    <Divider v-if="meetingById.object.externalEmployee" />
    <div v-if="meetingById.object.externalEmployee" class="mt-4">
      <h3 class="mb-4 pl-4">Ҳамкор доктор ҳақида маълумот</h3>
      <div class="flex gap-6 justify-content-between">
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Ф.И.О:</b>
          <p>
            {{ meetingById.object.externalEmployee.name }}
            {{ meetingById.object.externalEmployee.surname }}
          </p>
        </div>
      </div>
    </div>
    <Divider v-if="meetingById.object.externalEmployee == null" />
    <div v-if="meetingById.object.externalEmployee == null" class="mt-4">
      <h3 class="mb-4 pl-4">Ҳамкор доктор ҳақида маълумот</h3>
      <div class="flex gap-6 justify-content-between">
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Ф.И.О:</b>
          <p></p>
        </div>
      </div>
    </div>

    <Divider
      v-if="
        meetingById.object.doctor_comment ||
        meetingById.object.doctor_recommendation
      "
    />
    <div class="mt-4 flex flex-column gap-6">
      <div
        v-if="meetingById.object.doctor_comment"
        class="flex flex-column flex-column align-content-center"
      >
        <b>Доктор ташхиси:</b>

        <p style="text-align: justify">
          {{ meetingById.object.doctor_comment }}
        </p>
      </div>
      <div
        v-if="meetingById.object.doctor_recommendation"
        class="flex flex-column gap-2 align-content-center"
      >
        <b>Доктор тавсияси:</b>

        <p style="text-align: justify">
          {{ meetingById.object.doctor_recommendation }}
        </p>
      </div>
    </div>

    <Divider
      v-if="
        meetingById.object.doctor_comment == null ||
        meetingById.object.doctor_recommendation == null
      "
    />
    <div class="mt-4 flex flex-column gap-6">
      <div
        v-if="meetingById.object.doctor_comment == null"
        class="flex flex-column align-content-center"
      >
        <b>Доктор ташхиси:</b>
        <p></p>
      </div>
      <div
        v-if="meetingById.object.doctor_recommendation == null"
        class="flex flex-column align-content-center"
      >
        <b>Доктор тавсияси:</b>
        <p></p>
      </div>
    </div>

    <Divider />
    <div class="mt-2">
      <h3 class="mb-4 pl-4">Доктор кўриги ҳақидаги маълумотлар</h3>
      <div class="flex gap-6 justify-content-between">
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Хизмат холати:</b>
          <p v-if="meetingById.object.serviced == true">Кўрилди</p>
          <p v-if="meetingById.object.serviced == false">Кўрилмади</p>
        </div>
        <div
          v-if="meetingById.object.service_date"
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Кўрикдан ўтган сана:</b>
          <p>{{ meetingById.object.service_date }}</p>
        </div>
        <div
          v-if="meetingById.object.service_date == null"
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Кўрикдан ўтган сана:</b>
          <p></p>
        </div>
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Тўлов холати:</b>
          <p v-if="meetingById.object.cashed == true">Тўланди</p>
          <p v-if="meetingById.object.cashed == false">Тўланмади</p>
        </div>
      </div>
      <div class="flex gap-6 justify-content-between mt-4">
        <div
          v-if="meetingById.object.sum"
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Тўлов суммаси:</b>
          <p>{{ percentage.format(meetingById.object.sum) }}</p>
        </div>
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Кўрик холати:</b>
          <p v-if="meetingById.object.finished == true">Тўлиқ кўрилган</p>
          <p v-if="meetingById.object.finished == false">Тўлиқ кўрилмаган</p>
        </div>
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Тўлов тури:</b>
          <p v-if="meetingById.object.pay_type == 'IN_PLACE_CASH'">НАКД</p>
          <p v-if="meetingById.object.pay_type == 'IN_PLACE_CARD'">КАРТА</p>
          <p v-if="meetingById.object.pay_type == 'TRANSFER'">ПЕРЕЧИСЛЕНИЕ</p>
        </div>
      </div>
      <div class="flex gap-6 mt-4">
        <div
          class="flex flex-column align-content-center mb-2"
          style="width: 360px"
        >
          <b>Кўрик ёпилганлиги:</b>
          <p v-if="meetingById.object.closed == true">Ёпилган</p>
          <p v-if="meetingById.object.closed == false">Ёпилмаган</p>
        </div>
        <div v-if="meetingById.object.inspection" style="width: 360px">
          <b>Муассаса:</b>
          <p>
            {{ meetingById.object.inspection.transfer.name }}
          </p>
        </div>
        <div v-if="meetingById.object.inspection" style="width: 360px">
          <b>Контракт:</b>
          <p>
            {{ meetingById.object.inspection.transfer.contractNumber }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
