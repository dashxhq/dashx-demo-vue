import { defineStore } from 'pinia';
import jwtDecode from 'jwt-decode';
import dx from '@/libs/dashx';
import { LOCAL_STORAGE_JWT_TOKEN } from '../utils/constants';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(jwtToken) {
      localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN, jwtToken);
      const decodedToken = jwtDecode(jwtToken);
      const { dashx_token: dashxToken, user } = decodedToken;
      dx.setIdentity(user.id, dashxToken);
      this.user = user;
    },
  },
});
