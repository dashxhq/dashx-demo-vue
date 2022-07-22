<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { FormKit } from '@formkit/vue';
import { ref } from 'vue';

import Alert from '@/components/Alert.vue';
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import apiClient from '@/libs/apiClient';
import { LOCAL_STORAGE_JWT_TOKEN } from '@/utils/constants';

const router = useRouter();

const submitted = ref(false);
const errorMessage = ref('');

const onSubmit = async (values) => {
  errorMessage.value = '';
  submitted.value = true;

  try {
    const response = await apiClient.post('/login', values);
    const { data: { token } = {}, status } = response;

    if (status === 200 && token) {
      localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN, token);
      router.replace('/');
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error?.message;
  }
  submitted.value = false;
};
</script>

<template>
  <Alert :message="errorMessage" v-if="errorMessage" />

  <FormKit
    type="form"
    id="login-form"
    submit-label="Login"
    @submit="onSubmit"
    :actions="false"
  >
    <Input
      type="email"
      label="Email"
      name="email"
      validation="required|*email"
      outer-class="mb-2"
    />
    <Input
      type="password"
      label="Password"
      name="password"
      validation="required|length:8"
    />

    <div class="mt-6 flex items-start justify-between">
      <div class="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="remember-me" class="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>
      <div class="text-sm">
        <RouterLink
          to="/forgot-password"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Forgot your password?
        </RouterLink>
      </div>
    </div>
    <div class="mt-7">
      <Button type="submit" :disabled="submitted">Login</Button>

      <Button variant="outlined" is="RouterLink" to="/register" class="mt-2"
        >Register</Button
      >
    </div>
    <div class="text-sm text-center pt-6">
      <RouterLink
        to="/contact"
        class="font-medium text-indigo-600 hover:text-indigo-500"
      >
        Contact Us
      </RouterLink>
    </div>
  </FormKit>
</template>
