<script setup>
import { FormKit } from '@formkit/vue';
</script>

<template>
  <FormKit
    type="text"
    :classes="{
      outer: 'mb-5',
      label: '$reset block text-sm text-gray-700 mb-1',
      input:
        '$reset appearance-none block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
      message: 'text-sm text-red-600 mt-1',
    }"
  />
</template>
