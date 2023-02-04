import { defineStore } from 'pinia';
import jwtDecode from 'jwt-decode';
import { LOCAL_STORAGE_JWT_TOKEN } from '@/utils/constants';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const jwtToken = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN);

      if (!jwtToken) {
        this.user = null;
        return;
      }

      const decodedToken = jwtDecode(jwtToken);
      const { user } = decodedToken;

      this.user = user;
    },
  },
});
