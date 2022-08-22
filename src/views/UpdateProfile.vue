<script setup>
import { computed, reactive, ref, watchEffect } from 'vue';

import Input from '@/components/Input.vue';
import apiClient from '@/libs/apiClient';
import Button from '@/components/Button.vue';
import Alert from '@/components/Alert.vue';
import Loader from '@/components/Loader.vue';
import UploadAvatar from '@/components/UploadAvatar.vue';
import { useUserStore } from '@/stores/user';

const disabled = ref(false);
const loadingUser = ref(false);
const alert = reactive({ type: 'error', message: '' });

const user = ref(null);
const avatarUrl = computed({
  get() {
    return user.value?.avatar?.url || null;
  },
  set(url) {
    user.value.avatar = { url };
  },
});

const userStore = useUserStore();
watchEffect(() => {
  loadingUser.value = !userStore?.user;

  if (!loadingUser.value) {
    user.value = {
      firstName: userStore.user?.first_name,
      lastName: userStore.user?.last_name,
      email: userStore.user?.email,
      avatar: userStore.user?.avatar,
    };
  }
});

const onSubmit = async (values) => {
  alert.type = 'error';
  alert.message = '';
  disabled.value = true;

  const { email, firstName, lastName } = values;
  const requestBody = {
    first_name: firstName,
    last_name: lastName,
    email,
    ...(avatarUrl.value
      ? { avatar: { url: avatarUrl.value } }
      : { avatar: { url: '' } }),
  };

  try {
    const { data: { message } = {} } = await apiClient.patch(
      '/update-profile',
      requestBody
    );
    alert.type = 'success';
    alert.message = message;
    userStore.fetchUser();
  } catch (error) {
    alert.type = 'error';
    if (error.response.status >= 500) {
      alert.message = 'Something went wrong, please try again later.';
    } else {
      const errorMessage = error.response.data || error.message;
      alert.message = errorMessage;
    }
  }

  disabled.value = false;
};
</script>

<template>
  <h1 class="text-xl font-bold">Update profile</h1>
  <Loader v-if="loadingUser" />
  <div className="w-full max-w-2xl pt-5">
    <Alert v-if="alert.message" :type="alert.type" :message="alert.message" />

    <FormKit
      type="form"
      id="profile-form"
      @submit="onSubmit"
      :actions="false"
      :value="user"
      v-if="!loadingUser"
    >
      <div class="flex gap-3">
        <div className="w-full md:w-2/3">
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
        </div>

        <div className="w-full md:w-1/3">
          <UploadAvatar
            label="Avatar"
            :url="avatarUrl"
            :disabled="disabled"
            @uploadStart="disabled = true"
            @uploadEnd="disabled = false"
            @uploadSuccess="avatarUrl = $event"
            @remove="avatarUrl = null"
          />
        </div>
      </div>
      <div className="w-full md:w-2/3">
        <Button block type="submit" :disabled="disabled" class="mt-5"
          >Update</Button
        >
      </div>
    </FormKit>
  </div>
</template>
