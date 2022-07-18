<script setup>
import { RouterLink } from 'vue-router';
import { FormKit } from '@formkit/vue';

import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';

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
      type="password"
      label="Password"
      name="password"
      validation="required|length:8"
    />

    <Input
      type="password"
      label="Confirm Password"
      name="confirmPassword"
      validation="required|confirm:password"
    />

    <div class="mt-7">
      <Button type="submit">Submit</Button>
    </div>
    <div class="text-sm text-center pt-6">
      <RouterLink
        to="/login"
        class="font-medium text-indigo-600 hover:text-indigo-500"
      >
        Back to login
      </RouterLink>
    </div>
  </FormKit>
</template>
