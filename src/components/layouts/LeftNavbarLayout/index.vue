<script setup>
import { RouterView } from 'vue-router';

import Sidebar from './Sidebar.vue';
import MobileSidebar from './MobileSidebar.vue';
import Navbar from './Navbar.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
userStore.initUser();
</script>

<template>
  <Sidebar class="hidden" />
  <MobileSidebar />
  <Navbar />
  <div className="md:pl-64 flex flex-col items-start">
    <div class="p-4">
      <RouterView />
    </div>
  </div>
</template>
