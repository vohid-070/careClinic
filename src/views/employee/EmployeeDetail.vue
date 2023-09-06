<script setup>
import { defineProps, onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useEmployeeStore } from "@/stores/employee";
import { useLevelStore } from "@/stores/level";
import { useSpecialityStore } from "@/stores/specialitiy";
import { useRoomStore } from "@/stores/room";
import { useStageStore } from "@/stores/stage";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

const props = defineProps({
  id: [String, Number],
});
const toast = useToast();
const data = ref();
const router = useRouter();
const specialityData = ref();
const levelData = ref();
const stageData = ref();
const roomData = ref();
const daysOfWeek = reactive([
  { name: "Душанба", value: "MONDAY" },
  { name: "Сешанба", value: "TUESDAY" },
  { name: "Чоршанба", value: "WEDNESDAY" },
  { name: "Пайшанба", value: "THURSDAY" },
  { name: "Жума", value: "FRIDAY" },
  { name: "Шанба", value: "SATURDAY" },
  { name: "Якшанба", value: "SUNDAY" },
]);

const employeeStore = useEmployeeStore();
const { employeeById } = storeToRefs(employeeStore);
const levelStore = useLevelStore();
const specialityStore = useSpecialityStore();
const roomStore = useRoomStore();
const stageStore = useStageStore();
const { level } = storeToRefs(levelStore);
const { speciality } = storeToRefs(specialityStore);
const { room } = storeToRefs(roomStore);
const { stage } = storeToRefs(stageStore);

const password = ref(null);
const loading = ref(false);
const submitted = ref(false);

const getEmployeeByID = async () => {
  data.value = await employeeStore.getEmployeeById(props.id);
};
const getLevelList = async () => {
  levelData.value = await levelStore.getLevelList();
};

const getSpecialitiyList = async () => {
  specialityData.value = await specialityStore.specialityList();
};

const getRoomList = async () => {
  roomData.value = await roomStore.getRoomList();
};
const getStageList = async () => {
  stageData.value = await stageStore.getStageList();
};

onMounted(() => {
  getEmployeeByID();
  getSpecialitiyList();
  getLevelList();
  getRoomList();
  getStageList();
});

const cancel = () => {
  router.push("/employee/list");
};
const update = async () => {
  const updatedEmployee = reactive({
    employeeCerdentials: {},
  });
  const update = ref();
  updatedEmployee.employeeCerdentials.username = employeeById.value.username;
  updatedEmployee.employeeCerdentials.password = password.value;
  updatedEmployee.employeeCerdentials.level_id = employeeById.value.level.id;
  updatedEmployee.employeeCerdentials.speciality_id =
    employeeById.value.speciality.id;
  updatedEmployee.employeeCerdentials.room_id = employeeById.value.room.id;
  updatedEmployee.employeeCerdentials.name = employeeById.value.name;
  updatedEmployee.employeeCerdentials.surname = employeeById.value.surname;
  updatedEmployee.employeeCerdentials.phone = employeeById.value.phone;
  updatedEmployee.employeeCerdentials.active = employeeById.value.active;
  updatedEmployee.employeeCerdentials.start = employeeById.value.start;
  updatedEmployee.employeeCerdentials.finish = employeeById.value.finish;
  updatedEmployee.employeeCerdentials.percent = employeeById.value.percent;
  updatedEmployee.employeeCerdentials.days_of_week = [
    ...employeeById.value.daysOfWeek,
  ];
  updatedEmployee.employeeCerdentials.stage_id = employeeById.value.stage.id;
  update.value = JSON.stringify(updatedEmployee.employeeCerdentials);

  submitted.value = true;
  if (!submitted.value) loading.value = true;
  if (
    employeeById.value.username &&
    employeeById.value.name &&
    employeeById.value.surname &&
    employeeById.value.speciality.id &&
    employeeById.value.room.id &&
    employeeById.value.stage.id &&
    employeeById.value.level.id &&
    employeeById.value.daysOfWeek.length > 0 &&
    employeeById.value.start &&
    employeeById.value.finish &&
    employeeById.value.phone
  ) {
    const data = await employeeStore.updateEmployee(
      props.id,
      JSON.parse(update.value)
    );
    if (data.status == 200) {
      toast.add({
        severity: "success",
        summary: "Муваффақиятли янгиланди",
        detail: "Фойдаланувчи муваффақиятли янгиланди!",
        life: 3000,
        group: "bc",
      });
      loading.value = false;
      router.push("/employee/list");
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: data.message,
        life: 3000,
        group: "bc",
      });
      loading.value = false;
    }
  }
};
</script>

<template>
  <div class="card">
    <h3>Фойдаланувчи маълумотларини янгилаш</h3>
    <Skeleton
      class="mb-5"
      v-if="!data"
      style="width: 100%; height: 380px"
    ></Skeleton>
    <form @submit.prevent="update" ref="form">
      <div class="flex gap-8 justify-content-center mb-6" v-if="data">
        <div class="col-5">
          <div class="flex align-items-center"><b>Фойдаланувчи номи:</b></div>
          <InputText
            v-model="employeeById.username"
            class="w-full"
            :class="{ 'p-invalid': submitted && !employeeById.username }"
          />
          <small
            v-if="submitted && !employeeById.username"
            style="color: var(--red-500)"
            >Фойдаланувчи номини киритинг</small
          >

          <div class="flex align-items-center mt-4">
            <b>Фойдаланувчи пароли:</b>
          </div>
          <InputText v-model="password" class="w-full" />

          <div class="flex align-items-center mt-4">
            <b>Фойдаланувчининг исми:</b>
          </div>
          <InputText
            v-model="employeeById.name"
            :class="{ 'p-invalid': submitted && !employeeById.name }"
            class="w-full"
          />
          <small
            v-if="submitted && !employeeById.name"
            style="color: var(--red-500)"
            >Фойдаланувчи исмини киритинг</small
          >

          <div class="flex align-items-center mt-4">
            <b>Фойдаланувчининг фамилияси:</b>
          </div>
          <InputText
            v-model="employeeById.surname"
            :class="{ 'p-invalid': submitted && !employeeById.surname }"
            class="w-full"
          />
          <small
            v-if="submitted && !employeeById.surname"
            style="color: var(--red-500)"
            >Фойдаланувчи фамилиясини киритинг</small
          >

          <div class="flex flex-wrap justify-content-between">
            <div style="width: 300px">
              <div class="flex align-items-center mt-4">
                <b>Фойдаланувчининг телефон рақами:</b>
              </div>
              <InputMask
                v-model="employeeById.phone"
                mask="999999999999"
                :class="{ 'p-invalid': submitted && !employeeById.phone }"
                class="w-full"
              />
              <small
                v-if="submitted && !employeeById.phone"
                style="color: var(--red-500)"
                >Фойдаланувчи телефон рақамини киритинг</small
              >
            </div>

            <div>
              <div class="flex align-items-center mt-4">
                <b>Фоиз:</b>
              </div>
              <InputNumber
                v-model="employeeById.percent"
                :min="1"
                :max="99"
                showButtons
                suffix="%"
                style="width: 245px"
              />
            </div>
          </div>

          <div class="flex align-items-center mt-4 mb-3">
            <b>Фойдаланувчининг статуси:</b>
          </div>
          <RadioButton
            v-model="employeeById.active"
            :value="true"
            class="mr-2"
            name="active"
            inputId="employeeStatus"
          />
          <label for="employeeStatus" class="mr-8">Актив</label>
          <RadioButton
            v-model="employeeById.active"
            :value="false"
            class="mr-2"
            name="passiv"
            inputId="employeeStatus2"
          />
          <label for="employeeStatus2">Актив эмас</label>
        </div>
        <div class="col-5">
          <div class="flex align-items-center"><b>Мутахассислиги:</b></div>
          <Dropdown
            v-if="specialityData"
            v-model="employeeById.speciality"
            :options="speciality"
            :class="{ 'p-invalid': submitted && !employeeById.speciality }"
            showClear
            optionLabel="name"
            class="w-full"
          />
          <small
            v-if="submitted && !employeeById.speciality"
            style="color: var(--red-500)"
            >Фойдаланувчи мутахассислигини киритинг</small
          >

          <div class="flex align-items-center mt-4"><b>Хона:</b></div>
          <Dropdown
            v-if="roomData"
            v-model="employeeById.room"
            :options="room"
            :class="{ 'p-invalid': submitted && !employeeById.room }"
            showClear
            optionLabel="name"
            class="w-full"
          />
          <small
            v-if="submitted && !employeeById.room"
            style="color: var(--red-500)"
            >Хонани танланг</small
          >

          <div class="flex align-items-center mt-4"><b>Қават:</b></div>
          <Dropdown
            v-if="stageData"
            v-model="employeeById.stage"
            :options="stage"
            :class="{ 'p-invalid': submitted && !employeeById.stage }"
            optionLabel="name"
            showClear
            class="w-full"
          />
          <small
            v-if="submitted && !employeeById.stage"
            style="color: var(--red-500)"
            >Қаватни танланг</small
          >

          <div class="flex align-items-center mt-4"><b>Лавозими:</b></div>
          <Dropdown
            v-if="levelData"
            v-model="employeeById.level"
            :options="level"
            :class="{ 'p-invalid': submitted && !employeeById.level }"
            showClear
            optionLabel="name"
            class="w-full"
          />
          <small
            v-if="submitted && !employeeById.level"
            style="color: var(--red-500)"
            >Лавозимни танланг</small
          >

          <div class="flex align-items-center mt-4"><b>Ҳафта кунлари:</b></div>
          <MultiSelect
            v-model="employeeById.daysOfWeek"
            :options="daysOfWeek"
            :class="{
              'p-invalid': submitted && employeeById.daysOfWeek.length <= 0,
            }"
            optionLabel="name"
            optionValue="value"
            showClear
            class="w-full"
          />
          <small
            v-if="submitted && employeeById.daysOfWeek.length <= 0"
            style="color: var(--red-500)"
            >Иш кунларини танланг</small
          >

          <div class="flex gap-4 flex-wrap justify-content-between mt-4">
            <div>
              <div class="flex align-items-center">
                <b>Иш бошланиш вақти:</b>
              </div>
              <div class="flex flex-column">
                <InputMask
                  v-model="employeeById.start"
                  mask="99:99"
                  :class="{ 'p-invalid': submitted && !employeeById.start }"
                  placeholder="hh.mm"
                  style="width: 250px"
                />
                <small
                  v-if="submitted && !employeeById.start"
                  style="color: var(--red-500)"
                  >Иш бошланиш вақтини киритинг</small
                >
              </div>
            </div>
            <div>
              <div class="flex align-items-center"><b>Иш тугаш вақти:</b></div>
              <div class="flex flex-column">
                <InputMask
                  v-model="employeeById.finish"
                  :class="{ 'p-invalid': submitted && !employeeById.finish }"
                  mask="99:99"
                  placeholder="hh.mm"
                  style="width: 250px"
                />
                <small
                  v-if="submitted && !employeeById.finish"
                  style="color: var(--red-500)"
                  >Иш тугаш вақтини киритинг</small
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-content-end gap-4">
        <Button
          label="Янгилаш"
          severity="success"
          type="submit"
          :loading="loading"
        ></Button>
        <Button
          label="Ортга"
          severity="danger"
          @click.prevent="cancel"
        ></Button>
      </div>
    </form>
  </div>
</template>
