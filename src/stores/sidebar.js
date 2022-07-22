import { defineStore } from 'pinia';

export const useSidebarStore = defineStore({
  id: 'sidebar',
  state: () => ({
    isOpen: false,
  }),
  actions: {
    openSidebar() {
      this.isOpen = true;
    },
    closeSidebar() {
      this.isOpen = false;
    },
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
  },
});
