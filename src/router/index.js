import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/DashboardView.vue'),
      beforeEnter: () => {
        if (localStorage.getItem('token')) return true;
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
        if (!localStorage.getItem('token')) return true;
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
  ],
});

export default router;
