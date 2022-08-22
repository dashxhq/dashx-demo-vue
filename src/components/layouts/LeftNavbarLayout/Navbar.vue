<script setup>
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  TransitionRoot,
} from '@headlessui/vue';
import { SearchIcon } from '@heroicons/vue/solid';
import { BellIcon, MenuAlt2Icon } from '@heroicons/vue/outline';
import { RouterLink, useRouter } from 'vue-router';

import { useUserStore } from '@/stores/user';
import { useSidebarStore } from '@/stores/sidebar';
import { LOCAL_STORAGE_JWT_TOKEN } from '@/utils/constants';
import Avatar from '../../Avatar.vue';

const router = useRouter();
const userStore = useUserStore();
const sidebarStore = useSidebarStore();

const userNavigation = [
  { name: 'Profile', path: '/update-profile' },
  { name: 'Settings', path: '/settings' },
];

const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN);
  router.push('/login');
  userStore.fetchUser();
};
</script>

<template>
  <div class="md:pl-64 flex flex-col">
    <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        @click="sidebarStore.openSidebar"
      >
        <span class="sr-only">Open sidebar</span>
        <MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex-1 px-4 flex justify-between">
        <div class="flex-1 flex">
          <form
            class="w-full flex md:ml-0"
            action="src/components/Navbar"
            method="GET"
          >
            <label htmlFor="search-field" class="sr-only"> Search </label>
            <div
              class="relative w-full text-gray-400 focus-within:text-gray-600"
            >
              <div
                class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
              >
                <SearchIcon class="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Search"
                type="search"
                name="search"
              />
            </div>
          </form>
        </div>
        <div class="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton
                class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Open user menu</span>
                <Avatar />
              </MenuButton>
            </div>
            <TransitionRoot
              as="template"
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem
                  v-for="navigation in userNavigation"
                  :key="navigation.path"
                  class="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                >
                  <RouterLink :to="navigation.path">
                    {{ navigation.name }}
                  </RouterLink>
                </MenuItem>

                <button
                  class="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                  @click="logout"
                >
                  Logout
                </button>
              </MenuItems>
            </TransitionRoot>
          </Menu>
        </div>
      </div>
    </div>
  </div>
</template>
