<script setup>
defineProps({
  message: String,
  type: {
    type: String,
    default: 'error',
  },
});
</script>

<template>
  <div
    :class="[
      'mt-5 p-4 mb-4 text-sm rounded-lg m-2 sm:mx-0 font-medium',
      {
        'bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800':
          $props.type == 'error',

        'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800':
          $props.type == 'success',
      },
    ]"
    role="alert"
  >
    {{ $props.message }}
  </div>
</template>
