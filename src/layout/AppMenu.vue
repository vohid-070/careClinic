<script setup>
import { ref } from "vue";

import AppMenuItem from "./AppMenuItem.vue";
const role = localStorage.getItem("user");

const modelAdmin = ref([
  {
    items: [
      {
        label: "Календарь",
        icon: "pi pi-calendar",
        to: "/time/table",
      },
      {
        label: "Мониторинг",
        icon: "pi pi-fw pi-chart-line",
        items: [
          {
            label: "Статистика",
            icon: "pi pi-fw pi-chart-bar",
            to: "/monitoring/statistics",
          },
          {
            label: "Ходимлар",
            icon: "pi pi-fw pi-percentage",
            to: "/monitoring/employee",
          },
          {
            label: "Хамкор ходимлар",
            icon: "pi pi-fw pi-arrow-right-arrow-left",
            to: "/monitoring/external-employee",
          },
        ],
      },
      {
        label: "Беморлар рўйхати",
        icon: "pi pi-fw pi-user",
        to: "/",
      },

      {
        label: "Клиника",
        icon: "pi pi-fw pi-user-edit",
        items: [
          {
            label: "Ходимлар",
            icon: "pi pi-fw pi-users",
            to: "/employee/list",
          },
          {
            label: "Ҳамкор докторлар",
            icon: "pi pi-fw pi-user-plus",
            to: "/external/employee/list",
          },
          {
            label: "Бўлимлар",
            icon: "pi pi-fw pi-table",
            to: "/directory/list",
          },
          {
            label: "Лавозимлар",
            icon: "pi pi-fw pi-star",
            to: "/level/list",
          },
          {
            label: "Мутахассисликлар",
            icon: "pi pi-fw pi-list",
            to: "/speciality/list",
          },
          {
            label: "Қаватлар",
            icon: "pi pi-fw pi-building",
            to: "/stage/list",
          },
          {
            label: "Хоналар",
            icon: "pi pi-fw pi-sitemap",
            to: "/room/list",
          },
        ],
      },
      {
        label: "Тиббий кўрик",
        icon: "pi pi-file-edit",
        items: [
          {
            label: "Шартнома",
            icon: "pi pi-fw pi-briefcase ",
            to: "/transfer/list",
          },
          {
            label: "Форма",
            icon: "pi pi-fw pi-tag",
            to: "/form/list",
          },
          {
            label: "Форма ташкил килувчилари",
            icon: "pi pi-fw pi-tags",
            to: "/form-speciality/list",
          },
        ],
      },

      {
        label: "Қабуллар тарихи",
        icon: "pi pi-fw pi-replay",
        to: "/meeting/list",
      },
      {
        label: "Стационар",
        icon: "pi pi-fw pi-home",
        items: [
          {
            label: "Палата",
            icon: "pi pi-fw pi-stop",
            to: "/cabinet/list",
          },
          {
            label: "Койка",
            icon: "pi pi-fw pi-table",
            to: "/bed/list",
          },
          {
            label: "Даволаниш",
            icon: "pi pi-fw pi-check-circle",
            to: "/hospital/list",
          },
        ],
      },
      {
        label: "Склад",
        icon: "pi pi-fw pi-cart-plus",
        items: [
          {
            label: "Категория",
            icon: "pi pi-fw pi-th-large",
            to: "/category/list",
          },
          {
            label: "Дори дармонлар",
            icon: "pi pi-fw pi-plus-circle",
            to: "/medicament/list",
          },
          {
            label: "Склад мониторинг",
            icon: "pi pi-fw pi-calculator",
            to: "/hospital/medicament",
          },
          {
            label: "Склад",
            icon: "pi pi-fw pi-wallet",
            to: "/storage/medicament",
          },
        ],
      },
      {
        label: "Қайта-алоқа",
        icon: "pi pi-fw pi-comments",
        items: [
          {
            label: "Қўнғироқ қилиш хизмати",
            icon: "pi pi-fw pi-phone",
            to: "/call-back",
          },
          {
            label: "Таклиф ва шикоятлар",
            icon: "pi pi-fw pi-exclamation-circle",
            to: "/complaint",
          },
          {
            label: "Мобил лабаратория",
            icon: "pi pi-fw pi-truck",
            to: "/mobile/laboratory",
          },
          {
            label: "Тез ёрдам",
            icon: "pi pi-fw pi-heart-fill",
            to: "/ambulance",
          },
          /* {
            label: "Тиббий шикоятлар",
            icon: "pi pi-fw pi-question-circle",
            to: "/concern",
          }, */
        ],
      },
    ],
  },
]);

const modelDoctorAndLabaratory = ref([
  {
    items: [
      {
        label: "Календарь",
        icon: "pi pi-calendar",
        to: "/time/table",
      },
      {
        label: "Беморлар рўйхати",
        icon: "pi pi-fw pi-user",
        to: "/",
      },

      {
        label: "Қабуллар тарихи",
        icon: "pi pi-fw pi-replay",
        to: "/meeting/list",
      },
      {
        label: "Очиқ мурожаатлар",
        icon: "pi pi-fw pi-check-square",
        to: "/paid/speciality",
      },
      {
        label: "Қайта-алоқа",
        icon: "pi pi-fw pi-comments",
        items: [
          {
            label: "Тиббий шикоятлар",
            icon: "pi pi-fw pi-question-circle",
            to: "/concern",
          },
        ],
      },
      {
        label: "Заявка",
        icon: "pi pi-fw pi-check-circle",
        to: "/information-form",
      },
    ],
  },
]);
const modelDirector = ref([
  {
    items: [
      {
        label: "Мониторинг",
        icon: "pi pi-fw pi-chart-line",
        items: [
          {
            label: "Статистика",
            icon: "pi pi-fw pi-chart-bar",
            to: "/monitoring/statistics",
          },
          {
            label: "Ходимлар",
            icon: "pi pi-fw pi-users",
            to: "/monitoring/employee",
          },
          {
            label: "Хамкор ходимлар",
            icon: "pi pi-fw pi-user-plus",
            to: "/monitoring/external-employee",
          },
        ],
      },
      {
        label: "Беморлар рўйхати",
        icon: "pi pi-fw pi-user",
        to: "/",
      },

      {
        label: "Қабуллар тарихи",
        icon: "pi pi-fw pi-replay",
        to: "/meeting/list",
      },
      {
        label: "Стационар",
        icon: "pi pi-fw pi-home",
        items: [
          {
            label: "Палата",
            icon: "pi pi-fw pi-stop",
            to: "/cabinet/list",
          },
          {
            label: "Койка",
            icon: "pi pi-fw pi-table",
            to: "/bed/list",
          },
          {
            label: "Даволаниш",
            icon: "pi pi-fw pi-check-circle",
            to: "/hospital/list",
          },
        ],
      },
    ],
  },
]);

const modelReception = ref([
  {
    items: [
      {
        label: "Календарь",
        icon: "pi pi-calendar",
        to: "/time/table",
      },
      {
        label: "Беморлар рўйхати",
        icon: "pi pi-fw pi-user",
        to: "/",
      },

      {
        label: "Қабуллар тарихи",
        icon: "pi pi-fw pi-replay",
        to: "/meeting/list",
      },
      {
        label: "Стационар",
        icon: "pi pi-fw pi-home",
        items: [
          {
            label: "Палата",
            icon: "pi pi-fw pi-stop",
            to: "/cabinet/list",
          },
          {
            label: "Койка",
            icon: "pi pi-fw pi-table",
            to: "/bed/list",
          },
          {
            label: "Даволаниш",
            icon: "pi pi-fw pi-check-circle",
            to: "/hospital/list",
          },
        ],
      },
    ],
  },
]);
</script>

<template>
  <ul v-if="role == 'ADMIN'" class="layout-menu">
    <template v-for="(item, i) in modelAdmin" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>

  <ul v-if="role == 'DOCTOR' || role == 'LABORATORY'" class="layout-menu">
    <template v-for="(item, i) in modelDoctorAndLabaratory" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>

  <ul v-if="role == 'DIRECTOR'" class="layout-menu">
    <template v-for="(item, i) in modelDirector" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>

  <ul v-if="role == 'RECEPTION_1' || role == 'RECEPTION_2'" class="layout-menu">
    <template v-for="(item, i) in modelReception" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style>
.layout-menuitem-text {
  font-size: 18px;
}
.layout-menuitem-icon {
  font-size: 18px;
}
</style>
