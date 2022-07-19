<script setup>
import { useRouter } from 'vue-router';
import { LOCAL_STORAGE_JWT_TOKEN } from '@/utils/constants';

const router = useRouter();

const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN);
  router.replace('/login');
};
</script>

<template>
  <h1 class="text-xl font-bold">Dashboard</h1>
  <button @click="logout">Logout</button>
</template>
