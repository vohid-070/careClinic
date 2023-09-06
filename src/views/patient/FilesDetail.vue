<script setup>
import { useResultStore } from "@/stores/result";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import FileInput from "@/components/base/FileInput.vue";

const props = defineProps({
  detailId: [Number],
  resultPatient: [Object, Array],
});
const role = localStorage.getItem("user");

const resultStore = useResultStore();
const { result } = storeToRefs(resultStore);

const show = ref(false);
const toast = useToast();
const confirm = useConfirm();
const loading = ref(false);
const urlDev = ref("http://178.218.207.110:9002");
const urlProd = ref("http://192.168.1.200/storage");

const filesCredentials = reactive({
  patient_id: props.detailId,
  type_id: 0,
  file: null,
});

const getResultType = async () => {
  await resultStore.getResultType();
};

const addFile = () => {
  show.value = true;
};
const emit = defineEmits(["created", "deleted"]);
const create = async () => {
  const createdResult = reactive({
    dto: {},
    file: {},
  });
  createdResult.dto.patient_id = props.detailId;
  createdResult.dto.type_id = filesCredentials.type_id;
  createdResult.file = filesCredentials.file;
  const formData = new FormData();
  formData.append(
    "dto",
    new Blob([JSON.stringify(createdResult.dto)], { type: "application/json" })
  );
  formData.append("file", filesCredentials.file);
  loading.value = true;
  if (filesCredentials.file && filesCredentials.type_id) {
    const response = await resultStore.createResult(formData);
    if (response.status == 201) {
      show.value = false;
      loading.value = false;
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Муваффақиятли қўшилди",
        life: 3000,
        group: "bc",
      });
      filesCredentials.type_id = null;
      emit("created", response);
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Файл қўшишда хатолик юз берди",
        life: 3000,
        group: "bc",
      });
      show.value = false;
      loading.value = false;
    }
  } else {
    show.value = false;
    loading.value = false;
    toast.add({
      severity: "info",
      summary: "Огоҳлантириш",
      detail: "Илтимос маълумотларни тўлиқ киритинг",
      life: 3000,
      group: "bc",
    });
  }
};
const deleteFile = (id) => {
  confirm.require({
    message: "Сиз ҳақиқатдан ҳам ушбу файлни ўчирмоқчимисиз?",
    header: "Ўчиришни тасдиқланг",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    acceptLabel: "Ҳа",
    rejectLabel: "Йўқ",
    accept: async () => {
      const deletedElement = await resultStore.deleteResult(id);
      if (deletedElement.status == 200) {
        toast.add({
          severity: "success",
          summary: "Deleted",
          detail: "Муваффақиятли ўчирилди",
          group: "bc",
          life: 3000,
        });
      } else {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Ўчиришда хатолик юз берди",
          group: "bc",
          life: 3000,
        });
      }
      emit("deleted", deletedElement);
    },
    reject: () => {
      toast.add({
        severity: "info",
        summary: "Cancel",
        detail: "Cancel",
        group: "bc",
        life: 3000,
      });
    },
  });
};
onMounted(() => {
  getResultType();
});
</script>

<template>
  <div v-if="resultPatient" class="flex flex-wrap justify-content-around files">
    <ul>
      <p style="font-weight: bold">МСКТ</p>
      <li
        v-for="mskt in resultPatient.MSKT"
        :key="mskt"
        class="flex flex-wrap gap-3"
      >
        <a :href="`${urlDev}/hospital/${mskt.name}`" target="_blank">{{
          mskt.created
        }}</a>
        <Button
          icon="pi pi-times"
          severity="danger"
          outlined
          v-if="role == 'ADMIN' || role == 'LABORATORY'"
          @click="deleteFile(mskt.id)"
        />
      </li>
    </ul>
    <ul>
      <p style="font-weight: bold">МРТ</p>
      <li
        v-for="mrt in resultPatient.MRT"
        :key="mrt"
        class="flex flex-wrap gap-3"
      >
        <a :href="`${urlDev}/hospital/${mrt.name}`" target="_blank">{{
          mrt.created
        }}</a>
        <Button
          icon="pi pi-times"
          severity="danger"
          outlined
          v-if="role == 'ADMIN' || role == 'LABORATORY'"
          @click="deleteFile(mrt.id)"
        />
      </li>
    </ul>
    <ul>
      <p style="font-weight: bold">АНАЛИЗ</p>
      <li
        v-for="analiz in resultPatient.ANALIZ"
        :key="analiz"
        class="flex flex-wrap gap-3"
      >
        <a :href="`${urlDev}/hospital/${analiz.name}`" target="_blank">{{
          analiz.created
        }}</a>
        <Button
          icon="pi pi-times"
          severity="danger"
          outlined
          v-if="role == 'ADMIN' || role == 'LABORATORY'"
          @click="deleteFile(analiz.id)"
        />
      </li>
    </ul>
    <ul>
      <p style="font-weight: bold">РЕНТГЕН</p>
      <li
        v-for="rentgen in resultPatient.RENTGEN"
        :key="rentgen"
        class="flex flex-wrap gap-3"
      >
        <a :href="`${urlDev}/hospital/${rentgen.name}`" target="_blank">{{
          rentgen.created
        }}</a>
        <Button
          icon="pi pi-times"
          severity="danger"
          outlined
          v-if="role == 'ADMIN' || role == 'LABORATORY'"
          @click="deleteFile(rentgen.id)"
        />
      </li>
    </ul>
  </div>

  <div class="flex justify-content-end mt-4">
    <Button
      v-if="role == 'ADMIN' || role == 'LABORATORY'"
      label="Файл бириктириш"
      icon="pi pi-plus"
      severity="success"
      @click.prevent="addFile"
    />
  </div>
  <Dialog
    v-model:visible="show"
    modal
    header="Натижаларни бириктириш"
    style="width: 30vw"
  >
    <p class="mb-2">Файлни танланг</p>
    <FileInput v-model="filesCredentials.file" />
    <p class="mb-2 mt-4">Натижа турини танланг</p>
    <Dropdown
      v-model="filesCredentials.type_id"
      :options="result"
      optionLabel="name"
      optionValue="id"
      style="width: 100%"
    />
    <Button
      label="Бириктириш"
      class="mt-4"
      @click.prevent="create"
      :loading="loading"
    />
  </Dialog>
</template>
<style>
.files ul li {
  list-style: none;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.files ul {
  border-right: 1px solid var(--gray-600);
  width: 25%;
  padding: 0;
}
.files ul:last-child {
  border: none;
}
.files p {
  text-align: center;
}
.files li a {
  border: 1px solid var(--primary-600);
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  color: var(--black-900);
}
.files li a:hover {
  background-color: var(--primary-600);
  color: white;
}
</style>
