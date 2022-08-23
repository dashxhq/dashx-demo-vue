<script setup>
import { onMounted, reactive, ref } from 'vue';

import Loader from '@/components/Loader.vue';
import Alert from '@/components/Alert.vue';
import PostCard from '@/components/PostCard.vue';
import apiClient from '@/libs/apiClient';

const posts = ref([]);
const fetching = ref(false);
const alert = reactive({ type: 'error', message: '' });

const fetchBookmarkedPosts = async () => {
  fetching.value = true;
  alert.message = '';

  try {
    const { data = {} } = await apiClient.get('/posts/bookmarked');
    posts.value = data.posts;
  } catch (error) {
    alert.type = 'error';
    alert.message = 'Unable to fetch posts.';
  }

  fetching.value = false;
};

onMounted(async () => {
  fetchBookmarkedPosts();
});

const toggleBookmark = async ({ id: postId }) => {
  alert.message = '';
  const oldBookmarkedPosts = posts.value;

  try {
    posts.value = posts.value.filter((post) => post.id !== postId);
    await apiClient.put(`/posts/${postId}/toggle-bookmark`);
  } catch (error) {
    alert.type = 'error';
    alert.message = 'Unable to bookmark';
    posts.value = oldBookmarkedPosts;
  }
};
</script>

<template>
  <h1 className="text-2xl font-semibold text-gray-900 mb-8">Bookmarks</h1>
  <Loader v-if="fetching" message="Loading bookmarked posts" />
  <Alert v-if="alert.message" :type="alert.type" :message="alert.message" />
  <div class="grid grid-cols-1 gap-3">
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @bookmark="toggleBookmark"
    />
  </div>
</template>
