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
      label="Name"
      name="name"
      validation="required|*length:3"
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
      type="textarea"
      rows="5"
      label="Send us a message"
      name="message"
      validation="required|*length:10"
      outer-class="mb-2"
    />

    <div class="mt-7">
      <Button type="submit">Submit</Button>
    </div>
    <div class="text-sm text-center pt-6">
      <RouterLink
        to="/login"
        class="font-medium text-indigo-600 hover:text-indigo-500"
      >
        Go Back
      </RouterLink>
    </div>
  </FormKit>
</template>
