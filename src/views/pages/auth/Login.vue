<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useUserStore } from "../../../stores/auth";

const userStore = useUserStore();
const toast = useToast();
const router = useRouter();
const loading = ref(false);
const userCredentials = reactive({
  password: null,
  username: null,
});

const login = async () => {
  loading.value = true;
  const data = await userStore.login(userCredentials);
  if (!data) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Қайтадан уруниб кўринг!",
      life: 3000,
      group: "bc",
    });
    loading.value = false;
    return;
  }
  if (
    data &&
    (data.role === "ADMIN" ||
      data.role === "DOCTOR" ||
      data.role === "LABORATORY" ||
      data.role === "DIRECTOR" ||
      data.role === "RECEPTION_1" ||
      data.role === "RECEPTION_2")
  ) {
    toast.add({
      severity: "success",
      summary: "Тизимга муваффақиятли кирилди!",
      detail: "Хуш келибсиз",
      life: 3000,
      group: "bc",
    });
    loading.value = false;
    if (data.role === "ADMIN" || data.role === "DIRECTOR") {
      return router.push("/time/table");
    } else {
      router.push("/time/table");
    }
  }
};
</script>

<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <!-- <img :src="'/public/demo/images/national-hospital.png'" alt="Sakai logo" class="mb-5 w-10rem flex-shrink-0" /> -->
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 40%
          );
        "
      >
        <div
          class="w-full surface-card py-8 px-5 sm:px-8"
          style="border-radius: 53px"
        >
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">
              Care-Clinic <br />
              <small>тизимига хуш келибсиз</small>
            </div>
          </div>

          <div>
            <form ref="form" @submit.prevent="login">
              <label class="block text-900 text-xl font-medium mb-2"
                ><!-- Фойдаланувчи номи --></label
              >
              <InputText
                v-model="userCredentials.username"
                :required="true"
                type="text"
                placeholder="Логин"
                class="w-full md:w-30rem mb-5"
                style="padding: 1rem"
              />

              <label class="block text-900 font-medium text-xl mb-2"
                ><!-- Фойдаланувчи пароли --></label
              >
              <Password
                v-model="userCredentials.password"
                :required="true"
                placeholder="Пароль"
                :toggleMask="true"
                class="w-full mb-3"
                inputClass="w-full"
                inputStyle="padding:1rem"
              ></Password>

              <div
                class="flex align-items-center justify-content-between mb-5 gap-5"
              ></div>
              <Button
                label="Кириш"
                class="w-full p-3 text-xl"
                type="submit"
                :loading="loading"
              ></Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
