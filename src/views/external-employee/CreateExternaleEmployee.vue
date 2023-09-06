<script setup>
import { reactive, ref } from "vue";
import { useExternalEmployeeStore } from "@/stores/external";

const externalEmployeeStore = useExternalEmployeeStore();

const employeeCredentials = reactive({
  name: "",
  surname: "",
  phone: "",
  organization: "",
  percent: null,
});
const submitted = ref(false);
const loading = ref(false);

const emit = defineEmits(["created"]);
const create = async () => {
  submitted.value = true;
  if (
    employeeCredentials.name &&
    employeeCredentials.surname &&
    employeeCredentials.phone &&
    employeeCredentials.organization
  ) {
    loading.value = true;
    const created = await externalEmployeeStore.createEmployee(
      employeeCredentials
    );
    if (created.status == 200) {
      loading.value = false;
      submitted.value = false;
    }
    emit("created", created);
  }
};
</script>

<template>
  <div>
    <form @submit.prevent="create">
      <div class="flex flex-wrap gap-4 justify-content-center">
        <div class="flex flex-column">
          <span>Исми</span>
          <InputText
            v-model="employeeCredentials.name"
            placeholder="Исм"
            :class="{ 'p-invalid': submitted && !employeeCredentials.name }"
          />
          <small
            v-if="submitted && !employeeCredentials.name"
            style="color: var(--red-500)"
            >исмни киритинг</small
          >
        </div>
        <div class="flex flex-column">
          <span>Фамилия</span>
          <InputText
            v-model="employeeCredentials.surname"
            placeholder="Фамилия"
            :class="{ 'p-invalid': submitted && !employeeCredentials.surname }"
          />
          <small
            v-if="submitted && !employeeCredentials.surname"
            style="color: var(--red-500)"
            >Фамилияни киритинг</small
          >
        </div>
        <div class="flex flex-column">
          <span>Телефон раками</span>
          <InputMask
            v-model="employeeCredentials.phone"
            mask="999999999999"
            placeholder="998901234567"
            :class="{ 'p-invalid': submitted && !employeeCredentials.phone }"
          />
          <small
            v-if="submitted && !employeeCredentials.phone"
            style="color: var(--red-500)"
            >Телефон рақамини киритинг</small
          >
        </div>
        <div class="flex flex-column">
          <span>Муассаса</span>
          <InputText
            v-model="employeeCredentials.organization"
            placeholder="Муассаса"
            :class="{
              'p-invalid': submitted && !employeeCredentials.organization,
            }"
          />
          <small
            v-if="submitted && !employeeCredentials.organization"
            style="color: var(--red-500)"
            >Муассасани киритинг</small
          >
        </div>
        <div class="flex flex-column">
          <span>Фоиз</span>
          <InputNumber
            v-model="employeeCredentials.percent"
            placeholder="Фоиз"
            :min="1"
            :max="99"
            showButtons
            suffix="%"
          />
        </div>
      </div>
      <div class="flex align-items-end justify-content-end mt-4">
        <Button label="Яратиш" type="submit" :loading="loading" />
      </div>
    </form>
  </div>
</template>
