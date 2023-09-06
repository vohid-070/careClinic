<script setup></script>

<template>
  <router-view />
  <ConfirmDialog position="top"></ConfirmDialog>
  <Toast position="bottom-center" group="bc" />
</template>

<style>
.p-component-overlay {
  backdrop-filter: blur(5px);
}
</style>
