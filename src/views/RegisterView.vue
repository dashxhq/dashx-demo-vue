<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { FormKit } from '@formkit/vue';
import { ref } from 'vue';

import Alert from '@/components/Alert.vue';
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import apiClient from '@/libs/apiClient';

const router = useRouter();

const submitted = ref(false);
const errorMessage = ref('');

const onSubmit = async (values) => {
  errorMessage.value = '';
  submitted.value = true;

  const { email, firstName, lastName, password } = values;
  const requestBody = {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
  };

  try {
    const { status } = await apiClient.post('/register', requestBody);
    if (status === 201) {
      router.replace('/login');
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error?.message;
  } finally {
    submitted.value = false;
  }
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
      <Button type="submit" :disabled="submitted">Register</Button>

      <Button variant="outlined" is="RouterLink" to="/login" class="mt-2"
        >Login</Button
      >
    </div>
  </FormKit>
</template>
