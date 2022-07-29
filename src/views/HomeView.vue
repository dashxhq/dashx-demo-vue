<script setup>
import { onMounted, reactive, ref } from 'vue';

import Alert from '@/components/Alert.vue';
import Loader from '@/components/Loader.vue';
import PostCard from '@/components/PostCard.vue';
import AddPost from '@/components/AddPost.vue';
import apiClient from '@/libs/apiClient';
import dayjs from '@/libs/dayjs';

const posts = ref([]);
const fetching = ref(false);
const alert = reactive({ type: 'error', message: '' });

const fetchPosts = async () => {
  fetching.value = true;
  alert.message = '';

  try {
    const { data = {} } = await apiClient.get('/posts');
    posts.value = data.posts;
  } catch (error) {
    alert.type = 'error';
    alert.message = 'Unable to fetch posts.';
  }

  fetching.value = false;
};

onMounted(async () => {
  fetchPosts();
});

const toggleBookmark = async ({ id: postId }) => {
  alert.message = '';
  try {
    posts.value = posts.value.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          bookmarked_at: !post.bookmarked_at ? dayjs().toISOString() : null,
        };
      }
      return post;
    });
    await apiClient.put(`/posts/${postId}/toggle-bookmark`);
  } catch (error) {
    alert.type = 'error';
    alert.message = 'Unable to bookmark';

    posts.value = posts.value.map((post) => {
      if (post.id === postId) {
        post.bookmarked_at = !post.bookmarked_at ? dayjs().toISOString() : null;
      }
      return post;
    });
  }
};

const onAddPostSuccess = () => {
  fetchPosts();
};
</script>

<template>
  <div class="flex items-start mb-8">
    <h1 class="text-2xl font-semibold text-gray-900">Posts</h1>
    <div class="ml-auto">
      <AddPost @addPostSuccess="onAddPostSuccess" />
    </div>
  </div>
  <Loader v-if="fetching" message="Loading posts" />
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
