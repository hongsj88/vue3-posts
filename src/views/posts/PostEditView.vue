<template>
  <AppLoading v-if="loading" />
  <AppError v-else-if="error" :message="error.message" />

  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <AppError v-if="editError" :message="editError.message" />
    <PostForm
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="edit"
    >
      <template #actions>
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="goDetailPage"
        >
          취소
        </button>
        <!-- <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>수정</template>
        </button> -->
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> 수정 </template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostById, updatePost } from '@/api/posts.js';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';

const error = ref(null);
const loading = ref(false);
const { vAlert, vSuccess } = useAlert();
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const form = ref({
  title: null,
  content: null,
});
const fetchPost = async () => {
  try {
    loading.value = true;
    const { data } = await getPostById(id);

    setForm(data);
    // form.value = { ...data };
  } catch (err) {
    console.error(err);
    vAlert(err.message);
    error.value = err;
  } finally {
    loading.value = false;
  }
};
const setForm = ({ title, content }) => {
  console.log('edit title: ', title);
  console.log('edit content: ', content);
  form.value.title = title;
  form.value.content = content;
};
fetchPost();

const editError = ref(null);
const editLoading = ref(false);

const edit = async () => {
  try {
    editLoading.value = true;
    await updatePost(id, { ...form.value });
    vSuccess('수정이 완료되었습니다!!!', 'success');
    router.push({ name: 'PostDetail', params: { id } });
  } catch (err) {
    console.error(err);
    editError.value = err;
    vAlert(err.message);
  } finally {
    editLoading.value = false;
  }
};
const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });

// alert
</script>

<style lang="scss" scoped></style>
