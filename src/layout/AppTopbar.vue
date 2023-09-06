<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useLayout } from "@/layout/composables/layout";
import { useRouter } from "vue-router";
// import Stomp from "stompjs";

const { onMenuToggle, changeThemeSettings, layoutConfig } = useLayout();

const router = useRouter();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const theme = ref(layoutConfig.theme);

const onChangeTheme = (theme, mode) => {
  const elementId = "theme-css";
  const linkElement = document.getElementById(elementId);
  const cloneLinkElement = linkElement.cloneNode(true);
  const newThemeUrl = linkElement
    .getAttribute("href")
    .replace(layoutConfig.theme.value, theme);
  cloneLinkElement.setAttribute("id", elementId + "-clone");
  cloneLinkElement.setAttribute("href", newThemeUrl);
  cloneLinkElement.addEventListener("load", () => {
    linkElement.remove();
    cloneLinkElement.setAttribute("id", elementId);
    changeThemeSettings(theme, mode === "dark");
  });
  linkElement.parentNode.insertBefore(
    cloneLinkElement,
    linkElement.nextSibling
  );
};

onMounted(() => {
  bindOutsideClickListener();
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const onTopBarMenuButton = () => {
  topbarMenuActive.value = false;
  topbarMenuActive.value = !topbarMenuActive.value;
};

const topbarMenuClasses = computed(() => {
  return {
    "layout-topbar-menu-mobile-active": topbarMenuActive.value,
  };
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false;
      }
    };
    document.addEventListener("click", outsideClickListener.value);
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener("click", outsideClickListener);
    outsideClickListener.value = null;
  }
};
const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return;

  const sidebarEl = document.querySelector(".layout-topbar-menu");
  const topbarEl = document.querySelector(".layout-topbar-menu-button");

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  );
};

const menu = ref();
const toggle = (event) => {
  menu.value.toggle(event);
};
const items = ref([
  {
    label: "Менинг маълумотларим",
    icon: "pi pi-user",
    command: () => {
      router.push("/my/info");
    },
  },
  {
    label: "Чиқиш",
    icon: "pi pi-sign-out",
    command: () => {
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      localStorage.removeItem("fullName");
      localStorage.removeItem("speciality");
      localStorage.removeItem("directory");
      localStorage.removeItem("access_token");
      return router.push("/auth/login");
    },
  },
]);

const visible = ref(false);

/* const connected = ref(false);
const receivedMessage = ref("");
let stompClient = null;

const connectWebSocket = () => {
  const socket = new WebSocket("ws://172.30.2.4:1515/ws-registry");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, () => {
    connected.value = true;
    stompClient.subscribe(`/topic/notifications/1006`, (message) => {
      receivedMessage.value = message.body;
    });
  });
};

const sendMessage = () => {
  const message = { text: "Hello world!" };
  stompClient.send("/app/send-object", {}, JSON.stringify(message));
};

onMounted(() => {
  connectWebSocket();
}); */
</script>

<template>
  <div class="layout-topbar">
    <router-link to="/time/table" class="layout-topbar-logo">
      <!-- <img
        src="../../public/logo.png"
        alt="logo"
        style="width: 100px; height: 50px"
      /> -->
    </router-link>

    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle()"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <buton
        v-if="theme == 'lara-light-indigo'"
        class="p-link layout-topbar-button"
        @click="onChangeTheme('lara-dark-indigo', 'dark')"
      >
        <i class="pi pi-moon" style="font-size: 1.5rem"></i>
        <span>Dark</span>
      </buton>

      <buton
        v-if="theme != 'lara-light-indigo'"
        class="p-link layout-topbar-button"
        @click="onChangeTheme('lara-light-indigo', 'light')"
      >
        <i class="pi pi-sun" style="font-size: 1.5rem"></i>
        <span>Light</span>
      </buton>

      <!-- <div class="flex align-items-center mx-2">
        <i
          v-badge.danger="2"
          class="pi pi-bell"
          @click="visible = true"
          style="font-size: 1.6rem; color: var(--gray-300)"
        />
      </div>
      <Sidebar v-model:visible="visible" position="right" style="width: 400px">
        <button @click="connectWebSocket">Подключиться к WebSocket</button>
        <div v-if="connected">
          <p>Статус: подключено</p>
          <button @click="sendMessage">Отправить сообщение</button>
          <p>Полученное сообщение: {{ receivedMessage }}</p>
        </div>
      </Sidebar> -->

      <Avatar
        class="layout-topbar-button"
        aria-haspopup="true"
        aria-controls="overlay_tmenu"
        shape="circle"
        @click="toggle"
      >
        <i class="pi pi-user"></i>
        <span>user info</span>
      </Avatar>

      <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
