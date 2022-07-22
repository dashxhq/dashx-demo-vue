<script setup>
import { RouterLink } from 'vue-router';
import {
  HomeIcon,
  BookmarkIcon,
  CurrencyDollarIcon,
  DatabaseIcon,
} from '@heroicons/vue/outline';

import SidebarNavigation from './SidebarNavigation.vue';
</script>

<template>
  <div class="hidden md:flex w-64 flex-col fixed inset-y-0">
    <div class="flex-1 flex flex-col min-h-0 bg-gray-800">
      <RouterLink
        to="/"
        class="flex gap-6 items-center cursor-pointer h-16 flex-shrink-0 px-4 bg-gray-900"
      >
        <img
          src="@/assets/dashx_logo_white.png"
          alt="DashX Logo White"
          class="w-8"
        />
        <span class="text-xl text-white font-bold">Demo App</span>
      </RouterLink>
      <div class="flex-1 flex flex-col overflow-y-auto py-4">
        <SidebarNavigation />
      </div>
    </div>
  </div>
</template>
