<script setup>
const emit = defineEmits(['update:modelValue']);

const onChangeFile = (event) => {
    emit('update:modelValue', event.target.files[0]);
};
</script>

<template>
    <div>
        <input class="file" type="file" @change="onChangeFile" />
    </div>
</template>

<style>
.file {
    border: 1px solid var(--bluegray-200);
    padding: 10px;
    border-radius: 5px;
    box-sizing: border-box;
    width: 100%;
}
.file:hover {
    border-color: var(--primary-500);
}
</style>
