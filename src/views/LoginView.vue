<script setup>
import { RouterLink } from 'vue-router';
import { FormKit } from '@formkit/vue';

import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';

const loading = false;

const onSubmit = (values) => console.log(values);
</script>

<template>
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
      <Button type="submit" :loading="loading">Login</Button>

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
