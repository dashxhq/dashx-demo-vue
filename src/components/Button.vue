<script setup>
defineProps({
  type: String,
  loading: Boolean,
  variant: String,
  onClick: Function,
  is: {
    type: String,
    default: 'button',
  },
});
</script>

<template>
  <component
    :is="$props.is"
    :class="[
      'block text-center group relative w-full hover:bg-indigo-500 gap-3 justify-center py-2 px-4 border border-transparent font-medium text-base rounded-md hover:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition duration-300 text-indigo-500',
      variant !== 'outlined'
        ? 'bg-indigo-600 text-white'
        : 'border-indigo-500 hover:text-white',
    ]"
    :type="$props.type"
    @onClick="$props.onClick"
    :disabled="$props.loading"
  >
    <slot />
  </component>
</template>
