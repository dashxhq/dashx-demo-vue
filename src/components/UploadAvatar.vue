<script setup>
import { ref } from 'vue';
import { UploadIcon } from '@heroicons/vue/outline';

import dx from '@/libs/dashx';
import { externalColumnMapping } from '@/utils/constants';
import Loader from './Loader.vue';

const props = defineProps({
  label: String,
  url: String,
});

const emits = defineEmits([
  'uploadStart',
  'uploadEnd',
  'uploadSuccess',
  'remove',
]);

const inputRef = ref(null);
const uploading = ref(false);

const handleChange = async (event) => {
  emits('uploadStart');
  uploading.value = true;

  const file = event.target.files[0];
  if (file) {
    try {
      const { url = '' } = await dx.upload({
        file,
        externalColumnId: externalColumnMapping['users.avatar'],
      });
      emits('uploadSuccess', url);
    } catch (error) {}
  }

  uploading.value = false;
  emits('uploadEnd');
};

const selectFile = () => {
  inputRef.value.click();
};
</script>

<template>
  <label class="block text-sm font-medium text-gray-700 sm:mt-px mb-1 sm:pt-2">
    {{ $props.label }}
  </label>
  <input
    accept="image/*"
    type="file"
    class="sr-only hidden"
    @change="handleChange"
    ref="inputRef"
    :disabled="$attrs.disabled"
  />
  <div
    :class="[
      'relative max-w-lg w-44 h-44 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 rounded-full',
      url ? '' : 'border-dashed',
    ]"
  >
    <div class="text-center">
      <div
        class="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center"
        v-if="uploading"
      >
        <Loader />
      </div>
      <template v-else>
        <template v-if="url">
          <img
            :src="$props.url"
            :class="[
              'absolute rounded-full w-full h-full m-auto border-gray-300 top-0 left-0',
              uploading ? 'opacity-50' : '',
            ]"
            alt="Preview"
          />
          <label
            className="absolute w-full h-full z-1 top-0 left-0 rounded-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100 cursor-pointer"
            @click="selectFile"
          >
            <span>Change</span>
          </label>
        </template>
        <div class="flex flex-col text-sm text-gray-600" v-else>
          <UploadIcon class="w-8 h-8 text-gray-400 m-auto" />
          <button
            type="button"
            class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 mt-1"
            @click="selectFile"
          >
            <span>Upload</span>
          </button>
        </div>
      </template>
    </div>
  </div>
  <button
    type="button"
    :disabled="$attrs.disabled"
    class="bg-gray-100 px-3 mt-3 py-2 border border-transparent rounded-md text-sm font-medium text-black focus:outline-none ml-12"
    @click="emits('remove')"
    v-if="url"
  >
    Remove
  </button>
</template>
