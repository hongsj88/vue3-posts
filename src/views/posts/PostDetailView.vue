<template>
  <h2>게시글 상세</h2>
  <AppLoading v-if="loading" />
  <AppError v-else-if="error" :message="error.message" />

  <div v-else>
    <hr class="my-4" />

    <h2>{{ post.title }}</h2>
    <p>id: {{ props.id }}, isOdd: {{ isOdd }}</p>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      {{ $dayjs(post.createdAt).format('YYYY.MM.DD HH:mm:ss') }}
    </p>
    <hr class="my-4" />
    <AppError v-if="removeError" :message="removeError.message" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button
          class="btn btn-outline-danger"
          @click="remove"
          :disabled="removeLoading"
        >
          <template v-if="removeLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> 삭제 </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
// import { deletePost } from '@/api/posts';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/composables/alert';
import { useNumber } from '@/composables/number';
import { computed, toRef, toRefs } from 'vue';

const { vAlert, vSuccess } = useAlert();
// const error = ref(null);
// const loading = ref(false);

const props = defineProps({
  id: [String, Number],
});
// const isRef = toRef(props, 'id');
// toRef함수와 toRefs함수는 반응형 객체의 속성을 반응형을 유지한 채 할당하고 싶을 때 사용한다!
const { id: isRef } = toRefs(props);
const { isOdd } = useNumber(isRef);
// console.log('----props.id', props.id);
/**
 * ref
 * 장) 객체 할당 가능
 * 단) form.value.title, form.value.content
 * 장) 일관성 유지
 * reactive
 * 장) form.title, form.content
 * 단) 객체할당 불가능
 */

// const router = useRouter();
// const post = ref({});
// const url = computed(() => `/posts/${props.id}`);
// console.log('url: ', url.value);
// const { error, loading, data: post } = useAxios(url);
const router = useRouter();
const url = computed(() => `/posts/${props.id}`);
const { error, loading, data: post } = useAxios(url);

const {
  error: removeError,
  loading: removeLoading,
  execute,
} = useAxios(
  `/posts/${props.id}`,
  { method: 'delete' },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('삭제가가 완료되었습니다!!!');
      router.push({ name: 'PostList' });
    },
    onError: err => {
      vAlert(err.message);
    },
  },
);
const remove = async () => {
  if (confirm('삭제하시겠습니까?') === false) {
    return;
  }
  execute();
};
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
  router.push({
    name: 'PostEdit',
    params: { id: props.id },
  });
</script>

<style lang="scss" scoped></style>
