<script setup>
import { RouterLink } from 'vue-router';
import {
  HomeIcon,
  BookmarkIcon,
  CurrencyDollarIcon,
  DatabaseIcon,
} from '@heroicons/vue/outline';

import { useSidebarStore } from '@/stores/sidebar';

const sidebarStore = useSidebarStore();

const navigationMenu = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Store', path: '/store', icon: DatabaseIcon },
  { name: 'Bookmarks', path: '/bookmarks', icon: BookmarkIcon },
  { name: 'Billing', path: '/billing', icon: CurrencyDollarIcon },
];
</script>

<template>
  <div class="px-2 space-y-1">
    <RouterLink
      v-for="navigation in navigationMenu"
      :key="navigation.path"
      :to="navigation.path"
      @click="sidebarStore.closeSidebar"
      :class="[
        'flex px-2 rounded-md text-base font-medium py-2',
        $route.path == navigation.path
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
      ]"
    >
      <component
        :is="navigation.icon"
        class="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
      />
      {{ navigation.name }}
    </RouterLink>
  </div>
</template>
