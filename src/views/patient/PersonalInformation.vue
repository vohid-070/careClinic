<script setup>
const props = defineProps({
  personalInformation: [Object],
});
</script>

<template>
  <div v-if="props.personalInformation" class="flex flex-column">
    <div
      class="flex gap-4 align-items-center pb-4 card"
      style="font-size: 34px; box-shadow: none"
    >
      <i class="pi pi-user" style="font-size: 6rem"></i>
      <b>
        {{ props.personalInformation.name }}
        {{ props.personalInformation.surname }}
      </b>
    </div>

    <div
      class="flex justify-content-between mt-4"
      v-if="props.personalInformation && props.personalInformation.region"
      style="font-size: 18px"
    >
      <div
        class="flex flex-column"
        v-if="props.personalInformation.gender == 'FEMALE'"
      >
        <p class="mb-0" style="color: var(--gray-500)">Жинси:</p>
        <b>Аёл</b>
      </div>
      <div
        class="flex flex-column"
        v-if="props.personalInformation.gender == 'MALE'"
      >
        <p class="mb-0" style="color: var(--gray-500)">Жинси:</p>
        <b>Эркак</b>
      </div>
      <div class="flex flex-column">
        <p class="mb-0" style="color: var(--gray-500)">Телефон рақами:</p>
        <b> +{{ props.personalInformation.phone }} </b>
      </div>
      <div class="flex flex-column">
        <p class="mb-0" style="color: var(--gray-500)">Туғилган санаси:</p>
        <b>
          {{ props.personalInformation.birthDate }}
        </b>
      </div>
      <div class="flex flex-column">
        <p class="mb-0" style="color: var(--gray-500)">Вилоят:</p>
        <b>
          {{ props.personalInformation.region.name }}
        </b>
      </div>
      <div class="flex flex-column">
        <p class="mb-0" style="color: var(--gray-500)">Яшаш манзили:</p>
        <b>
          {{ props.personalInformation.address }}
        </b>
      </div>
    </div>
  </div>
</template>
