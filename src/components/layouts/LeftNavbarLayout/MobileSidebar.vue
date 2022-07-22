<script setup>
import { RouterLink } from 'vue-router';
import { XIcon } from '@heroicons/vue/outline';
import {
  Dialog,
  DialogPanel,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue';

import { useSidebarStore } from '@/stores/sidebar';
import SidebarNavigation from './SidebarNavigation.vue';

const sidebarStore = useSidebarStore();
</script>

<template>
  <TransitionRoot :show="sidebarStore.isOpen" as="template">
    <Dialog
      as="div"
      class="relative z-40 md:hidden"
      @close="sidebarStore.closeSidebar"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 flex z-40">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <DialogPanel
            class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800"
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarStore.closeSidebar"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <RouterLink
              to="/"
              @click="sidebarStore.closeSidebar"
              class="flex px-4 gap-6 items-center cursor-pointer"
            >
              <img
                src="@/assets/dashx_logo_white.png"
                alt="DashX Logo White"
                class="w-8"
              />
              <span class="text-xl text-white font-bold">Demo App</span>
            </RouterLink>
            <div class="mt-5 flex-1 h-0 overflow-y-auto">
              <SidebarNavigation />
            </div>
          </DialogPanel>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true"></div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
