<script setup>
import { onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useLevelStore } from "@/stores/level";
import { useSpecialityStore } from "@/stores/specialitiy";
import { useRoomStore } from "@/stores/room";
import { useStageStore } from "@/stores/stage";
import { useEmployeeStore } from "@/stores/employee";
import { useToast } from "primevue/usetoast";

const employeeCredentials = reactive({
  username: "",
  password: null,
  level_id: null,
  speciality_id: null,
  room_id: null,
  name: "",
  surname: "",
  start: "",
  finish: "",
  days_of_week: [],
  stage_id: null,
  active: false,
  phone: "",
  percent: null,
});

const toast = useToast();
const employeeStore = useEmployeeStore();
const router = useRouter();
const specialityData = ref();
const levelData = ref();
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
const role = reactive([
  { name: "Директор", value: "DIRECTOR" },
  { name: "Доктор", value: "DOCTOR" },
  { name: "Лабарант", value: "LABORATORY" },
  { name: "Регистратор_1", value: "RECEPTION_1" },
  { name: "Регистратор_2", value: "RECEPTION_2" },
]);

const levelStore = useLevelStore();
const specialityStore = useSpecialityStore();
const roomStore = useRoomStore();
const stageStore = useStageStore();
const { level } = storeToRefs(levelStore);
const { speciality } = storeToRefs(specialityStore);
const { room } = storeToRefs(roomStore);
const { stage } = storeToRefs(stageStore);

const loading = ref(false);
const submitted = ref(false);

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
  await stageStore.getStageList();
};
onMounted(() => {
  getSpecialitiyList();
  getLevelList();
  getRoomList();
  getStageList();
});

const create = async () => {
  submitted.value = true;
  if (!submitted.value) loading.value = true;
  if (
    employeeCredentials.username &&
    employeeCredentials.password &&
    employeeCredentials.level_id &&
    employeeCredentials.role &&
    employeeCredentials.speciality_id &&
    employeeCredentials.room_id &&
    employeeCredentials.name &&
    employeeCredentials.surname &&
    employeeCredentials.phone &&
    employeeCredentials.start &&
    employeeCredentials.finish &&
    employeeCredentials.days_of_week.length > 0 &&
    employeeCredentials.stage_id
  ) {
    const created = await employeeStore.createEmployee(employeeCredentials);
    if (created.status == 200) {
      loading.value = false;
      toast.add({
        severity: "success",
        summary: "Муваффақиятли яратилди",
        detail: "Фойдаланувчи муваффақиятли яратилди!",
        life: 3000,
        group: "bc",
      });
      router.push("/employee/list");
    } else {
      toast.add({
        severity: "error",
        summary: created.message,
        detail: "Маълумотларни киритишда хатолик юз берди!",
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
    <h3>Фойдаланувчи яратиш</h3>
    <form @submit.prevent="create" ref="form">
      <div class="flex gap-8 justify-content-center mb-6">
        <div class="col-5">
          <div class="flex align-items-center"><b>Фойдаланувчи номи:</b></div>
          <InputText
            v-model="employeeCredentials.username"
            class="w-full"
            :class="{ 'p-invalid': submitted && !employeeCredentials.username }"
          />
          <small
            v-if="submitted && !employeeCredentials.username"
            style="color: var(--red-500)"
            >Фойдаланувчи номини киритинг</small
          >

          <div class="flex align-items-center mt-4">
            <b>Фойдаланувчи пароли:</b>
          </div>
          <InputText
            v-model="employeeCredentials.password"
            class="w-full"
            :class="{ 'p-invalid': submitted && !employeeCredentials.password }"
          />
          <small
            v-if="submitted && !employeeCredentials.password"
            style="color: var(--red-500)"
            >Фойдаланувчи паролини киритинг</small
          >

          <div class="flex align-items-center mt-4"><b>Роли:</b></div>
          <Dropdown
            v-model="employeeCredentials.role"
            showClear
            :options="role"
            optionLabel="name"
            optionValue="value"
            class="w-full"
            :class="{ 'p-invalid': submitted && !employeeCredentials.role }"
          />
          <small
            v-if="submitted && !employeeCredentials.role"
            style="color: var(--red-500)"
            >Ролни танланг</small
          >

          <div class="flex align-items-center mt-4">
            <b>Фойдаланувчининг исми:</b>
          </div>
          <InputText
            v-model="employeeCredentials.name"
            class="w-full"
            :class="{ 'p-invalid': submitted && !employeeCredentials.name }"
          />
          <small
            v-if="submitted && !employeeCredentials.name"
            style="color: var(--red-500)"
            >Фойдаланувчи исмини киритинг</small
          >

          <div class="flex align-items-center mt-4">
            <b>Фойдаланувчининг фамилияси:</b>
          </div>
          <InputText
            v-model="employeeCredentials.surname"
            class="w-full"
            :class="{ 'p-invalid': submitted && !employeeCredentials.surname }"
          />
          <small
            v-if="submitted && !employeeCredentials.surname"
            style="color: var(--red-500)"
            >Фойдаланувчи фамилиясини киритинг</small
          >
          <div class="flex flex-wrap justify-content-between">
            <div style="width: 300px">
              <div class="flex align-items-center mt-4">
                <b>Фойдаланувчининг телефон рақами:</b>
              </div>
              <InputMask
                v-model="employeeCredentials.phone"
                mask="999999999999"
                class="w-full"
                :class="{
                  'p-invalid': submitted && !employeeCredentials.phone,
                }"
              />
              <small
                v-if="submitted && !employeeCredentials.phone"
                style="color: var(--red-500)"
                >Фойдаланувчи телефон рақамини киритинг</small
              >
            </div>
            <div>
              <div class="flex align-items-center mt-4">
                <b>Фоиз:</b>
              </div>
              <InputNumber
                v-model="employeeCredentials.percent"
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
            v-model="employeeCredentials.active"
            :value="true"
            class="mr-2"
            name="active"
            inputId="employeeStatus"
          />
          <label for="employeeStatus" class="mr-8">Актив</label>
          <RadioButton
            v-model="employeeCredentials.active"
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
            v-model="employeeCredentials.speciality_id"
            showClear
            :class="{
              'p-invalid': submitted && !employeeCredentials.speciality_id,
            }"
            :options="speciality"
            optionLabel="name"
            optionValue="id"
            class="w-full"
          />
          <small
            v-if="submitted && !employeeCredentials.speciality_id"
            style="color: var(--red-500)"
            >Фойдаланувчи мутахассислигини киритинг</small
          >

          <div class="flex align-items-center mt-4"><b>Хона:</b></div>
          <Dropdown
            v-model="employeeCredentials.room_id"
            showClear
            :options="room"
            optionLabel="name"
            optionValue="id"
            class="w-full"
            :class="{ 'p-invalid': submitted && !employeeCredentials.room_id }"
          />
          <small
            v-if="submitted && !employeeCredentials.room_id"
            style="color: var(--red-500)"
            >Хонани танланг</small
          >

          <div class="flex align-items-center mt-4"><b>Қават:</b></div>
          <Dropdown
            v-model="employeeCredentials.stage_id"
            showClear
            :options="stage"
            optionLabel="name"
            optionValue="id"
            class="w-full"
            :class="{ 'p-invalid': submitted && !employeeCredentials.stage_id }"
          />
          <small
            v-if="submitted && !employeeCredentials.stage_id"
            style="color: var(--red-500)"
            >Қаватни танланг</small
          >

          <div class="flex align-items-center mt-4"><b>Лавозими:</b></div>
          <Dropdown
            v-model="employeeCredentials.level_id"
            showClear
            :options="level"
            optionLabel="name"
            optionValue="id"
            class="w-full"
            :class="{ 'p-invalid': submitted && !employeeCredentials.level_id }"
          />
          <small
            v-if="submitted && !employeeCredentials.level_id"
            style="color: var(--red-500)"
            >Лавозимни танланг</small
          >

          <div class="flex align-items-center mt-4"><b>Иш кунлари:</b></div>
          <MultiSelect
            v-model="employeeCredentials.days_of_week"
            :options="daysOfWeek"
            optionLabel="name"
            optionValue="value"
            class="w-full"
            :class="{
              'p-invalid':
                submitted && employeeCredentials.days_of_week.length <= 0,
            }"
          />
          <small
            v-if="submitted && employeeCredentials.days_of_week.length <= 0"
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
                  v-model="employeeCredentials.start"
                  mask="99:99"
                  placeholder="hh:mm"
                  style="width: 250px"
                  :class="{
                    'p-invalid': submitted && !employeeCredentials.start,
                  }"
                />
                <small
                  v-if="submitted && !employeeCredentials.start"
                  style="color: var(--red-500)"
                  >Иш бошланиш вақтини киритинг</small
                >
              </div>
            </div>
            <div>
              <div class="flex align-items-center"><b>Иш тугаш вақти:</b></div>
              <div class="flex flex-column">
                <InputMask
                  v-model="employeeCredentials.finish"
                  mask="99:99"
                  placeholder="hh:mm"
                  style="width: 250px"
                  :class="{
                    'p-invalid': submitted && !employeeCredentials.finish,
                  }"
                />
                <small
                  v-if="submitted && !employeeCredentials.finish"
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
          label="Яратиш"
          severity="success"
          type="submit"
          :loading="loading"
        ></Button>
        <Button
          label="Ортга"
          severity="danger"
          @click.prevent="router.push('/employee/list')"
        ></Button>
      </div>
    </form>
  </div>
</template>
