<script setup>
import { useMeetingStore } from "@/stores/meeting";
import { ref, reactive } from "vue";

const props = defineProps({
  meetingId: [Number],
});

const meetingStore = useMeetingStore();
const loading = ref(false);
const emit = defineEmits(["created"]);

const doctor = reactive({
  doctor_comment: "",
  doctor_recommendation: "",
});

const submit = async () => {
  loading.value = true;
  const data = await meetingStore.meetingDoctor(props.meetingId, doctor);
  if (data.status == 200) {
    loading.value = false;
  } else {
    loading.value = false;
  }
  emit("created", data);
};
</script>

<template>
  <form ref="form" @submit.prevent="submit">
    <div class="flex flex-column gap-4">
      <div class="flex flex-column">
        <small>Доктор ташхиси</small>
        <Textarea
          v-model="doctor.doctor_comment"
          placeholder="Доктор ташхиси"
          rows="4"
          style="width: 100%"
        />
      </div>
      <div class="flex flex-column">
        <small>Доктор тавсияси</small>
        <Textarea
          v-model="doctor.doctor_recommendation"
          placeholder="Доктор тавсияси"
          rows="4"
          style="width: 100%"
        />
      </div>
    </div>
    <div class="mt-4 flex justify-content-end">
      <Button :loading="loading" label="Юбориш" type="submit" />
    </div>
  </form>
</template>
