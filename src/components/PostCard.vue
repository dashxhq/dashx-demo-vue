<script setup>
import { BookmarkIcon } from '@heroicons/vue/outline';
import { computed } from 'vue';

import dayjs from '@/libs/dayjs';

const props = defineProps({
  post: {
    required: true,
  },
});

const published = computed(() => {
  return dayjs(props.post.created_at).fromNow();
});
const bookmarked = computed(() => {
  return Boolean(props.post.bookmarked_at);
});

const emits = defineEmits(['bookmark']);

const onBookmark = () => {
  emits('bookmark', props.post);
};
</script>

<template>
  <div
    class="relative flex gap-4 mb-4 bg-gray-50 rounded shadow-md p-4 overflow-hidden"
  >
    <img
      class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      alt="User Avatar"
    />
    <div class="min-w-0 flex-1">
      <div class="flex justify-between items-start">
        <p class="text-sm font-medium">
          {{ post.user.first_name }} {{ post.user.last_name }}
        </p>
        <button @click="onBookmark">
          <BookmarkIcon
            :class="[
              'cursor-pointer text-gray-600 h-6 w-6',
              { 'fill-gray-600': bookmarked },
            ]"
          />
        </button>
      </div>
      <p class="mt-0.5 text-sm text-gray-500">Posted {{ published }}</p>
      <div class="mt-2 text-sm text-gray-700">
        <p
          class="text-justify text-ellipsis overflow-hidden truncate line-clamp-3"
        >
          {{ post.text }}
        </p>
      </div>
    </div>
  </div>
</template>
