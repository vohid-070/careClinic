<script setup>
import { useHospitalStore } from "@/stores/hospital";
import { usePatientStore } from "@/stores/patient";
import { storeToRefs } from "pinia";
import { useConfirm } from "primevue/useconfirm";
import { onMounted, ref, reactive } from "vue";
import { useToast } from "primevue/usetoast";
import HospitaService from "@/services/hospital.service";

const role = localStorage.getItem("user");

const confirm = useConfirm();
const toast = useToast();
const hospitalStore = useHospitalStore();
const { hospital } = storeToRefs(hospitalStore);
const patientStore = usePatientStore();
const { findPatient } = storeToRefs(patientStore);
const data = ref();
const loadingExit = ref(false);
const info = ref();
const openDialog = ref(false);
const openCreateDialog = ref(false);
const searchPatient = ref("");
const bedId = ref(null);
const pay = reactive({
  sum: null,
});

const loadingEnter = ref(false);

const getHospitalInfoList = async () => {
  data.value = await hospitalStore.getHospitalInfoList();
};

const exitPatient = async (bed) => {
  if (role == "ADMIN" || role == "RECEPTION_1" || role == "RECEPTION_2") {
    confirm.require({
      message: "Сиз ҳақиқатдан ҳам ушбу формани ўчирмоқчимисиз?",
      header: "Ўчиришни тасдиқланг",
      icon: "pi pi-info-circle",
      acceptClass: "p-button-danger",
      acceptLabel: "Ҳа",
      rejectLabel: "Йўқ",
      accept: async () => {
        loadingExit.value = true;
        info.value = await hospitalStore.exitPatientHospital(bed.hospital.name);
        loadingExit.value = false;
        openDialog.value = true;
      },
    });
  }
};
const sendToPay = async () => {
  if (role == "ADMIN" || role == "RECEPTION_1" || role == "RECEPTION_2") {
    if (pay.sum) {
      const paid = await HospitaService.hospitalPay(
        info.value.data.object.name,
        pay
      );
      if (paid.status == 200) {
        openDialog.value = false;
        getHospitalInfoList();
        toast.add({
          severity: "success",
          summary: "Юборилди",
          detail: "Муваффақиятли юборилди",
          group: "bc",
          life: 3000,
        });
      }
    } else {
      toast.add({
        severity: "info",
        detail: "Илтимос суммани киритинг",
        group: "bc",
        life: 3000,
      });
    }
  }
};
const getPatientList = async () => {
  await patientStore.patientFind(searchPatient.value);
};
const enterPatientDialog = async (bed) => {
  if (role == "ADMIN" || role == "RECEPTION_1" || role == "RECEPTION_2") {
    openCreateDialog.value = true;
    bedId.value = bed.id;
  }
};

const enterPatient = async () => {
  if (role != "DIRECTOR") {
    const patientEnter = {
      bed_id: bedId.value,
      patient_id: searchPatient.value,
    };
    const enter = await hospitalStore.enterPatient(patientEnter);
    if (enter.status == 201) {
      toast.add({
        severity: "success",
        summary: "Қўшилди",
        detail: "Муваффақиятли қўшилди",
        group: "bc",
        life: 3000,
      });
      openCreateDialog.value = false;
      patientEnter.patient_id = null;
      patientEnter.bed_id = null;
      searchPatient.value = "";
      getHospitalInfoList();
    }
    if (enter.response.data.object == "PATIENT ALREADY EXIST ANOTHER BED") {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Бу бемор даволанишда",
        group: "bc",
        life: 3000,
      });
    }
  }
};

onMounted(() => {
  getHospitalInfoList();
});
</script>

<template>
  <div>
    <div class="grid" v-if="hospital">
      <div
        v-for="element in hospital"
        :key="element.id"
        class="col-9 xl:col-5 mx-7 my-4"
        style="
          border: 2px solid var(--primary-600);
          box-shadow: 0 1em 1em rgba(0, 0, 0, 0.1), 0 0 0 1px rgb(255, 255, 255),
            0.2em 0.3em 0.5em rgba(0, 0, 0, 0.1);
          border-radius: 15px;
        "
      >
        <div
          class="flex gap-2 align-items-center"
          style="font-size: large; font-weight: bold"
        >
          <p class="mb-0">{{ element.name }} -</p>
          <p v-if="element.cabinetType == 'SIMPLE'">Оддий</p>
          <p v-if="element.cabinetType == 'DE_LUX'">Ярим Люкс</p>
          <p v-if="element.cabinetType == 'LUX'">Люкс</p>
        </div>
        <div v-for="bed in element.beds" :key="bed.id" class="flex flex-wrap">
          <Divider />
          <Button
            v-if="bed.status == false"
            outlined
            severity="danger"
            :loading="loadingExit"
            class="mr-4"
            @click.prevent="exitPatient(bed)"
            style="border-width: 2px"
          >
            <img
              src="@/../public/demo/images/red-bed-fotor-bg-remover-20230529044.png"
              style="width: 120px; height: 100px"
            />
          </Button>

          <Button
            v-if="bed.status == true"
            outlined
            severity="success"
            class="mr-4"
            @click="enterPatientDialog(bed)"
            style="border-width: 2px"
          >
            <img
              src="@/../public/demo/images/green-bed-fotor-bg-remover-202305290420.png"
              style="width: 120px; height: 100px"
            />
          </Button>
          <div style="font-size: 17px">
            <b>Койка:</b>
            <p>{{ bed.name }}</p>

            <b>Бемор:</b>
            <p v-if="bed.hospital">
              {{ bed.hospital.patient.name }} {{ bed.hospital.patient.surname }}
            </p>
            <p v-if="bed.hospital == null" style="color: var(--green-600)">
              Койка бўш
            </p>
          </div>
        </div>
      </div>
    </div>
    <Skeleton v-if="!data" height="76vh" class="my-3"></Skeleton>
    <Dialog
      v-model:visible="openDialog"
      header="Даволанган бемор маълумотлари"
      modal
      style="width: 30vw"
    >
      <div class="flex flex-wrap" style="gap: 150px">
        <div>
          <b>Бемор:</b>
          <p>
            {{ info.data.object.patient.name }}
            {{ info.data.object.patient.surname }}
          </p>
          <b>Палата тури:</b>
          <p v-if="info.data.object.bed.cabinet.type == 'SIMPLE'">Оддий</p>
          <p v-if="info.data.object.bed.cabinet.type == 'DE_LUX'">ЯРИМ ЛЮКС</p>
          <p v-if="info.data.object.bed.cabinet.type == 'LUX'">ЛЮКС</p>
        </div>
        <div>
          <b>Кирган вақти:</b>
          <p>{{ info.data.object.enter }}</p>
          <b>Ётган соати:</b>
          <p>{{ info.data.object.different }}</p>
        </div>
      </div>
      <div class="flex flex-column mt-4">
        <small>Тўлов суммасини киритинг</small>
        <InputNumber
          v-model="pay.sum"
          placeholder="Тўлов суммаси"
          locale="ru"
          style="width: 300px"
        />
      </div>
      <div class="flex justify-content-end">
        <Button label="Юбориш" class="mt-4" @click.prevent="sendToPay" />
      </div>
    </Dialog>

    <Dialog
      v-model:visible="openCreateDialog"
      header="Бемор қўшиш"
      modal
      style="width: 30vw"
    >
      <Dropdown
        v-model="searchPatient"
        :options="findPatient.object"
        option-label="name"
        optionValue="id"
        editable
        placeholder="Беморлар"
        class="mr-4"
        style="width: 350px"
        @input="getPatientList(searchPatient)"
      />
      <Button
        label="Қўшиш"
        :loading="loadingEnter"
        @click.prevent="enterPatient"
      />
    </Dialog>
  </div>
</template>
