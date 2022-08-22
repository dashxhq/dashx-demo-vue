<script setup>
import { reactive, ref } from 'vue';

import Input from '../components/Input.vue';
import apiClient from '../libs/apiClient';
import Button from '../components/Button.vue';
import Alert from '../components/Alert.vue';
import Loader from '../components/Loader.vue';

const fetching = ref(false);
const loadingUser = ref(false);
const alert = reactive({ type: 'error', message: '' });

const user = ref(null);

const getProfile = async () => {
  loadingUser.value = true;
  const { data = {} } = await apiClient.get('/profile');
  user.value = {
    firstName: data.user.first_name,
    lastName: data.user.last_name,
    email: data.user.email,
  };
  loadingUser.value = false;
};
getProfile();

const onSubmit = async (values) => {
  alert.type = 'error';
  alert.message = '';
  fetching.value = true;

  const { email, firstName, lastName } = values;
  const requestBody = {
    first_name: firstName,
    last_name: lastName,
    email,
  };

  try {
    const { data: { message } = {} } = await apiClient.patch(
      '/update-profile',
      requestBody
    );
    alert.type = 'success';
    alert.message = message;
  } catch (error) {
    alert.type = 'error';
    if (error.response.status >= 500) {
      alert.message = 'Something went wrong, please try again later.';
    } else {
      const errorMessage = error.response.data || error.message;
      alert.message = errorMessage;
    }
  }

  fetching.value = false;
};
</script>

<template>
  <h1 class="text-xl font-bold">Update profile</h1>
  <Loader v-if="loadingUser" />
  <div className="sm:w-full sm:max-w-md pt-5">
    <Alert v-if="alert.message" :type="alert.type" :message="alert.message" />

    <FormKit
      type="form"
      id="login-form"
      submit-label="Login"
      @submit="onSubmit"
      :actions="false"
      :value="user"
      v-if="!loadingUser"
    >
      <Input
        type="text"
        label="First Name"
        name="firstName"
        validation="required"
        outer-class="mb-2"
      />
      <Input
        type="text"
        label="Last Name"
        name="lastName"
        validation="required"
        outer-class="mb-2"
      />
      <Input
        type="email"
        label="Email"
        name="email"
        validation="required|*email"
        outer-class="mb-2"
      />

      <Button block type="submit" :disabled="fetching" class="mt-5"
        >Update</Button
      >
    </FormKit>
  </div>
</template>
