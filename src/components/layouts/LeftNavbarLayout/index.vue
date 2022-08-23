<script setup>
import { RouterView } from 'vue-router';

import Sidebar from './Sidebar.vue';
import MobileSidebar from './MobileSidebar.vue';
import Navbar from './Navbar.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
userStore.fetchUser();
</script>

<template>
  <Sidebar class="hidden" />
  <MobileSidebar />
  <Navbar />
  <div className="md:pl-64">
    <div class="p-6 flex flex-col">
      <RouterView />
    </div>
  </div>
</template>
