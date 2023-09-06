<script setup>
import { useExternalEmployeeStore } from "@/stores/external";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

const props = defineProps({
  editedId: [Number],
});

const submitted = ref(false);
const loading = ref(false);

const externalEmployeeStore = useExternalEmployeeStore();
const { employeeById } = storeToRefs(externalEmployeeStore);

const getEmployeeById = async () => {
  await externalEmployeeStore.getEmployeeById(props.editedId);
};

const emit = defineEmits(["edited"]);
const error = ref();

async function update() {
  try {
    loading.value = true;
    submitted.value = true;
    const udpatedEmployee = {};

    Object.assign(udpatedEmployee, employeeById.value);
    if (
      udpatedEmployee.name &&
      udpatedEmployee.surname &&
      udpatedEmployee.phone &&
      udpatedEmployee.organization
    ) {
      const data = await externalEmployeeStore.updateEmployee(
        props.editedId,
        udpatedEmployee
      );
      emit("edited", data);
    }
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getEmployeeById();
});
</script>

<template>
  <div>
    <form @submit.prevent="update">
      <div class="flex flex-wrap gap-4 justify-content-center">
        <div class="flex flex-column">
          <span>Исми</span>
          <InputText
            v-model="employeeById.name"
            placeholder="Исми"
            :class="{ 'p-invalid': submitted && !employeeById.name }"
          />
          <small
            v-if="submitted && !employeeById.name"
            style="color: var(--red-500)"
            >Исмни киритинг</small
          >
        </div>
        <div class="flex flex-column">
          <span>Фамилияси</span>
          <InputText
            v-model="employeeById.surname"
            placeholder="Фамилияси"
            :class="{ 'p-invalid': submitted && !employeeById.surname }"
          />
          <small
            v-if="submitted && !employeeById.surname"
            style="color: var(--red-500)"
            >Фамилияни киритинг</small
          >
        </div>
        <div class="flex flex-column">
          <span>Телефон раками</span>
          <InputMask
            v-model="employeeById.phone"
            mask="999999999999"
            placeholder="998901234567"
            :class="{ 'p-invalid': submitted && !employeeById.phone }"
          />
          <small
            v-if="submitted && !employeeById.phone"
            style="color: var(--red-500)"
            >Телефон рақамини киритинг</small
          >
        </div>
        <div class="flex flex-column">
          <span>Муассаса</span>
          <InputText
            v-model="employeeById.organization"
            placeholder="organization"
            :class="{ 'p-invalid': submitted && !employeeById.organization }"
          />
          <small
            v-if="submitted && !employeeById.organization"
            style="color: var(--red-500)"
            >Муассасани киритинг</small
          >
        </div>
        <div class="flex flex-column">
          <span>Фоиз</span>
          <InputNumber
            v-model="employeeById.percent"
            placeholder="Фоиз"
            :min="1"
            :max="99"
            showButtons
            suffix="%"
          />
        </div>
      </div>
      <div class="flex justify-content-end mt-4">
        <Button label="Янгилаш" type="submit" :loading="loading" />
      </div>
    </form>
  </div>
</template>
