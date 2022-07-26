<script setup>
defineProps({
  type: String,
  variant: String,
  onClick: Function,
  block: Boolean,
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
      'text-center group relative hover:bg-indigo-500 gap-3 justify-center py-2 px-4 border border-transparent font-medium text-base rounded-md hover:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition duration-300 text-indigo-500 disabled:opacity-50',
      $props.variant !== 'outlined'
        ? 'bg-indigo-600 text-white'
        : 'border-indigo-500 hover:text-white',
      { 'block w-full': $props.block },
    ]"
    :type="$props.type"
    @onClick="$props.onClick"
  >
    <slot />
  </component>
</template>
