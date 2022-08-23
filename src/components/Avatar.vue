<script setup>
import { computed, reactive } from 'vue';

import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const avatarUrl = computed(() => {
  const user = userStore?.user;

  if (!user) return 'https://ui-avatars.com/api/?name=0&size=96';

  if (user?.avatar?.url) return user?.avatar?.url;

  return `https://ui-avatars.com/api/?name=${user?.first_name.charAt(0)} ${
    user?.last_name
  }&size=96`;
});
</script>

<template>
  <div class="flex items-center justify-center border rounded-full">
    <img :src="avatarUrl" class="rounded-full w-10 h-10" alt="Avatar" />
  </div>
</template>
