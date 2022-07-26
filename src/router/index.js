import { createRouter, createWebHistory } from 'vue-router';
import { LOCAL_STORAGE_JWT_TOKEN } from '@/utils/constants';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () =>
        import('../components/layouts/LeftNavbarLayout/index.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/store',
          component: () => import('../views/StoreView.vue'),
        },
        {
          path: '/bookmarks',
          component: () => import('../views/BookmarksView.vue'),
        },
        {
          path: '/billing',
          component: () => import('../views/BillingView.vue'),
        },
      ],
      beforeEnter: () => {
        if (localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN)) return true;
        return '/login';
      },
    },
    {
      path: '/',
      component: () => import('../components/layouts/CenterCardLayout.vue'),
      children: [
        {
          path: '/login',
          component: () => import('../views/LoginView.vue'),
          meta: { title: 'Login to your account' },
        },
        {
          path: '/register',
          component: () => import('../views/RegisterView.vue'),
          meta: { title: 'Register for an account' },
        },
        {
          path: '/forgot-password',
          component: () => import('../views/ForgotPasswordView.vue'),
          meta: { title: 'Forgot Password' },
        },
        {
          path: '/reset-password',
          component: () => import('../views/ResetPasswordView.vue'),
          meta: { title: 'Reset Password' },
        },
      ],
      beforeEnter: () => {
        if (!localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN)) return true;
        return '/';
      },
    },
    {
      path: '/',
      component: () => import('../components/layouts/CenterCardLayout.vue'),
      children: [
        {
          path: '/contact',
          component: () => import('../views/ContactView.vue'),
          meta: { title: 'Contact Us' },
        },
      ],
    },
    // Not Found (404) Route
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login',
    },
  ],
});

export default router;
