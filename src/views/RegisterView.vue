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
      type="text"
      label="First Name"
      name="firstName"
      validation="required|*length:2"
      outer-class="mb-2"
    />
    <Input
      type="text"
      label="Last Name"
      name="lastName"
      validation="required|*length:2"
      outer-class="mb-2"
    />
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

    <div class="mt-7">
      <Button type="submit">Register</Button>

      <Button variant="outlined" is="RouterLink" to="/login" class="mt-2"
        >Login</Button
      >
    </div>
  </FormKit>
</template>
