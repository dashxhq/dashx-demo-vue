<script setup>
defineProps({
  message: String,
});
</script>

<template>
  <div
    className="mt-5 p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 m-2 sm:mx-0"
    role="alert"
  >
    <span className="font-medium sm:ml-6">{{$props.message}}</span>
  </div>
</template>
