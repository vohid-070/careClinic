<script setup>
const role = localStorage.getItem('user');
const username = localStorage.getItem('name');
const fullName = localStorage.getItem('fullName');
const speciality = localStorage.getItem('speciality');
const directory = localStorage.getItem('directory');
</script>

<template>
    <div class="card">
        <div class="flex gap-6 align-items-center pb-4 card" style="font-size: 30px">
            <i class="pi pi-user" style="font-size: 6rem"></i>
            <b>{{ fullName }}</b>
        </div>
        <div class="mb-2" style="font-size: 22px">
            <b>Фойдаланувчи номи - </b><span>{{ username }}</span>
        </div>
        <div class="mb-2" style="font-size: 22px">
            <b>Роли - </b>
            <span v-if="role == 'ADMIN'">Админ</span>
            <span v-if="role == 'DIRECTOR'">Директор</span>
            <span v-if="role == 'DOCTOR'">Доктор</span>
            <span v-if="role == 'LABORATORY'">Лабарант</span>
            <span v-if="role == 'RECEPTION_1'">Регистратор_1</span>
            <span v-if="role == 'RECEPTION_2'">Регистратор_2</span>
        </div>
        <div v-if="role != 'ADMIN'" class="mb-2" style="font-size: 22px">
            <b>Бўлим - </b><span>{{ directory }}</span>
        </div>
        <div v-if="role != 'ADMIN'" class="mb-2" style="font-size: 22px">
            <b>Мутахассислик - </b><span>{{ speciality }}</span>
        </div>
    </div>
</template>
