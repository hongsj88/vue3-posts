<template>
  <div>
    <h2 @click="visibleForm != visibleForm">게시글 등록</h2>
    <hr class="my-4" />
    <AppError v-if="error" :message="error.message"></AppError>
    <PostForm
      v-if="visibleForm"
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="save"
    >
      <template #actions>
        <button
          class="btn btn-outline-dark me-2"
          type="button"
          @click="goListPage"
        >
          목록
        </button>

        <button class="btn btn-primary" :disabled="loading">
          <template v-if="loading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>저장</template>
        </button>
      </template>
    </PostForm>
    <AppAlert :items="alerts"></AppAlert>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

// const error = ref(null);
// const loading = ref(false);

const { alerts, vAlert, vSuccess } = useAlert();

const router = useRouter();
const form = ref({
  title: null,
  content: null,
});
// 코드	의미
// ...form.value	form.value 객체 안의 모든 속성을 펼쳐서 복사
// { ...form.value, createdAt: Date.now() }	form.value 복사 + createdAt 필드 추가
// 목적	원본 객체는 건드리지 않고, 서버에 보낼 새로운 요청 객체 만들기
const { error, loading, execute } = useAxios(
  '/posts',
  {
    method: 'post',
  },
  {
    immediate: false,
    onSuccess: () => {
      router.push({ name: 'PostList' });
      vSuccess('등록이 완료되었습니다.');
    },
    onError: err => {
      vAlert(err.message);
    },
  },
);
const save = async () => {
  execute({ ...form.value, createdAt: Date.now() });
};

// const save = async () => {
//   try {
//     loading.value = true;
//     await createPost({
//       ...form.value,
//       createdAt: Date.now(),
//     });
//     router.push({ name: 'PostList' });
//     vSuccess('등록이 완료되었습니다.');
//   } catch (err) {
//     vAlert(err.message);
//     console.log('error: ', err);
//     error.value = err;
//   } finally {
//     loading.value = false;
//   }
// };
const goListPage = () => {
  router.push({ name: 'PostList' });
};
const visibleForm = ref(true);
</script>

<style lang="scss" scoped></style>
