<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { FormKit } from '@formkit/vue';
import { reactive, ref } from 'vue';
import jwtDecode from 'jwt-decode';

import Alert from '@/components/Alert.vue';
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import apiClient from '../libs/apiClient';

const submitted = ref(false);
const showForm = ref(false);
const alert = reactive({ type: 'error', message: '' });

const router = useRouter();

const token = router.currentRoute.value.query.token;

if (!token) {
  router.replace('/login');
} else {
  try {
    const { exp } = jwtDecode(token);
    if (exp < Math.trunc(Date.now() / 1000)) {
      alert.message = 'Your reset password link has expired.';
    } else {
      showForm.value = true;
    }
  } catch (error) {
    alert.message = 'Your reset password link is invalid';
  }
}

const onSubmit = async (values) => {
  alert.type = 'error';
  alert.message = '';
  submitted.value = true;

  try {
    const requestBody = { token, password: values.password };

    const { data: { message } = {}, status } = await apiClient.post(
      '/reset-password',
      requestBody
    );

    if (status === 200) {
      alert.type = 'success';
      alert.message = message;
      showForm.value = false;
    }
  } catch (error) {
    alert.message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong, please try later';
  }

  submitted.value = false;
};
</script>

<template>
  <Alert :message="alert.message" :type="alert.type" v-if="alert.message" />

  <FormKit
    type="form"
    id="login-form"
    submit-label="Login"
    @submit="onSubmit"
    :actions="false"
    v-if="showForm"
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
      <Button block type="submit">Submit</Button>
    </div>
  </FormKit>
  <div class="text-sm text-center pt-6">
    <RouterLink
      to="/login"
      class="font-medium text-indigo-600 hover:text-indigo-500"
    >
      Back to login
    </RouterLink>
  </div>
</template>
