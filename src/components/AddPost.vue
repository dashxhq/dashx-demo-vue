<script setup>
import { reset } from '@formkit/core';
import {
  Dialog,
  DialogPanel,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue';
import { reactive, ref } from 'vue';

import Button from './Button.vue';
import Input from './Input.vue';
import Alert from './Alert.vue';
import apiClient from '@/libs/apiClient';

const open = ref(false);
const submitted = ref(false);
const alert = reactive({ type: 'error', message: '' });

const onClose = () => {
  if (!submitted.value) {
    open.value = false;
    reset('create-port-form');
  }
};

const emits = defineEmits(['addPostSuccess']);

const onSubmit = async (values) => {
  submitted.value = true;

  try {
    await apiClient.post('/posts', values);
    open.value = false;
    reset('create-port-form');
    emits('addPostSuccess');
  } catch (error) {
    alert.message = '' || 'Unable to create post.';
  }

  submitted.value = false;
};
</script>

<template>
  <Button @click="open = true" :disabled="submitted">Add post</Button>

  <TransitionRoot :show="open" as="template">
    <Dialog as="div" class="relative z-10" @close="onClose">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div
          class="flex flex-col sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                <Alert
                  v-if="alert.message"
                  :type="alert.type"
                  :message="alert.message"
                />
                <div class="flex flex-col gap-3 sm:flex-row items-start">
                  <h2 class="font-medium text-md w-full sm:w-1/4">
                    Create a Post
                  </h2>

                  <FormKit
                    type="form"
                    @submit="onSubmit"
                    :actions="false"
                    :classes="{ form: 'w-full' }"
                    id="create-port-form"
                  >
                    <Input
                      type="textarea"
                      name="text"
                      label="Text"
                      rows="6"
                      :disabled="submitted"
                      validation="required|*length:10"
                    />

                    <div className="py-3 flex gap-3 justify-end items-center">
                      <Button
                        type="button"
                        @click="onClose"
                        variant="outlined"
                        :disabled="submitted"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" :disabled="submitted">Post</Button>
                    </div>
                  </FormKit>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
