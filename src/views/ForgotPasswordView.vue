<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { FormKit } from '@formkit/vue';
import { reactive, ref } from 'vue';

import Alert from '@/components/Alert.vue';
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import apiClient from '@/libs/apiClient';
import dx from '@/libs/dashx';

const router = useRouter();

dx.track('Page Viewed', { path: router.currentRoute.value.path });

const submitted = ref(false);
const alert = reactive({ type: 'error', message: '' });

const onSubmit = async (values) => {
  alert.type = 'error';
  alert.message = '';
  submitted.value = true;

  try {
    const { data: { message } = {}, status } = await apiClient.post(
      '/forgot-password',
      values
    );
    if (status === 200) {
      alert.type = 'success';
      alert.message = message;
    }
  } catch (error) {
    alert.message =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong, please try again later.';
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
    v-if="alert.type != 'success'"
  >
    <Input
      type="email"
      label="Email"
      name="email"
      validation="required|*email"
      outer-class="mb-2"
    />

    <div class="mt-7">
      <Button type="submit" :disabled="submitted">Submit</Button>
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
