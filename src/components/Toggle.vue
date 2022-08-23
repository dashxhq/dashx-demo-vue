<script setup>
import { Switch } from '@headlessui/vue';

const props = defineProps({
  context: Object,
});

const handleInput = () => {
  props.context.node.input(!props.context._value);
};
</script>

<template>
  <Switch
    @click="handleInput"
    :checked="props.context._value"
    :class="[
      props.context._value ? 'bg-teal-500' : 'bg-gray-200',
      'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-50 focus:outline-none',
    ]"
  >
    <span
      :class="[
        props.context._value ? 'translate-x-5' : 'translate-x-0',
        'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
      ]"
    />
  </Switch>
</template>
