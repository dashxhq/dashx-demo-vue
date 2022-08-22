<script setup>
import { reactive, ref } from 'vue';
import { SwitchGroup, SwitchLabel, SwitchDescription } from '@headlessui/vue';
import { createInput, reset } from '@formkit/vue';

import apiClient from '@/libs/apiClient';
import Alert from '@/components/Alert.vue';
import Loader from '@/components/Loader.vue';
import dx from '@/libs/dashx';
import Button from '@/components/Button.vue';
import Toggle from '@/components/Toggle.vue';

const fetching = ref(false);
const loadingPreferences = ref(false);
const alert = reactive({ type: 'error', message: '' });

const preferences = ref(null);

const toggle = createInput(Toggle);

const getPreferences = async () => {
  loadingPreferences.value = true;

  try {
    preferences.value = await dx.fetchStoredPreferences();
  } catch (error) {
    alert.type = 'error';
    alert.message = 'Error fetching preferences.';
  }

  loadingPreferences.value = false;
};
getPreferences();

const onSubmit = async (values) => {
  alert.type = 'error';
  alert.message = '';
  fetching.value = true;

  try {
    await dx.saveStoredPreferences(values);
    alert.type = 'success';
    alert.message = 'Preferences saved.';
  } catch (error) {
    alert.type = 'error';
    alert.message = 'Error saving preferences.';
  }

  fetching.value = false;
};

const resetForm = () => {
  reset('preferences-form');
};
</script>

<template>
  <h1 class="text-xl font-bold">Settings</h1>

  <Alert v-if="alert.message" :type="alert.type" :message="alert.message" />

  <Loader v-if="loadingPreferences" />
  <FormKit
    type="form"
    id="preferences-form"
    @submit="onSubmit"
    :actions="false"
    :value="preferences"
    v-else
  >
    <ul class="mt-2 divide-y divide-gray-200">
      <SwitchGroup as="li" class="py-4 flex items-center justify-between">
        <div class="flex flex-col">
          <SwitchLabel as="p" class="text-sm font-medium text-gray-900" passive>
            When someone creates a post
          </SwitchLabel>
          <SwitchDescription class="text-sm text-gray-500">
            This will send a notification when someone creates a post
          </SwitchDescription>
        </div>
        <FormKit type="group" name="new-post">
          <FormKit :type="toggle" name="enabled" />
        </FormKit>
      </SwitchGroup>
      <SwitchGroup as="li" class="py-4 flex items-center justify-between">
        <div class="flex flex-col">
          <SwitchLabel as="p" class="text-sm font-medium text-gray-900" passive>
            When someone bookmarks a post
          </SwitchLabel>
          <SwitchDescription class="text-sm text-gray-500">
            This will send a notification when someone bookmarks a post
          </SwitchDescription>
        </div>
        <FormKit type="group" name="new-bookmark">
          <FormKit :type="toggle" name="enabled" />
        </FormKit>
      </SwitchGroup>
    </ul>

    <div class="mt-10 py-4 flex justify-end gap-3">
      <Button type="button" :disabled="fetching" @click="resetForm"
        >Cancel</Button
      >
      <Button type="submit" :disabled="fetching">Save</Button>
    </div>
  </FormKit>
</template>
