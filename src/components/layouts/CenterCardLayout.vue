<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center items-center">
        <img
          src="@/assets/dashx_logo_black.svg"
          class="h-12 w-12"
          alt="DashX Logo"
        />
      </div>
      <h2 class="mt-6 mb-6 text-center text-3xl font-extrabold text-gray-900">
        {{ $route.meta.title }}
      </h2>
    </div>

    <div
      class="sm:mx-auto sm:w-full sm:max-w-md rounded bg-white shadow py-8 px-4 sm:px-10"
    >
      <RouterView />
    </div>
  </div>
</template>
