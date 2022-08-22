import { defineStore } from 'pinia';
import jwtDecode from 'jwt-decode';
import dx from '@/libs/dashx';
import { LOCAL_STORAGE_JWT_TOKEN } from '@/utils/constants';
import apiClient from '@/libs/apiClient';

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
      const { dashx_token: dashxToken, user } = decodedToken;
      dx.setIdentity(user.id, dashxToken);

      const { data } = await apiClient.get('/profile');
      this.user = data.user;
    },
  },
});
