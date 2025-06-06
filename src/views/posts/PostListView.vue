<template>
  <div>
    <h2>게시글 목록</h2>
    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    ></PostFilter>

    <hr class="my-4" />
    <AppLoading v-if="loading" />
    <AppError v-else-if="error" :message="error.message" />
    <template v-else>
      <AppGrid :items="posts">
        <template v-slot="{ item }">
          <Postitem
            :title="item.title"
            :content="item.content"
            :createdAt="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
            @preview="selectPreview(item.id)"
          ></Postitem>
        </template>
      </AppGrid>

      <AppPagination
        :current-page="params._page"
        :page-count="pageCount"
        @page="page => (params._page = page)"
      />
    </template>
    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :createdAt="modalCreatedAt"
      />
    </Teleport>
    <hr class="my-5" />
    <template v-if="previewId">
      <AppCard>
        <PostDetailView :id="previewId"></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import Postitem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { useAxios } from '@/hooks/useAxios';

// import { getPosts } from '@/api/posts';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const previewId = ref(null);
const selectPreview = id => {
  previewId.value = id;
};

// pagination
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
  title_like: '',
});
// 페이징을 위해서 params 넘김김
const {
  response,
  data: posts,
  error,
  loading,
} = useAxios('/posts', { method: 'get', params });

const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() => {
  return Math.ceil(totalCount.value / params.value._limit);
});

const goPage = id => {
  console.log('id', id);
  router.push({
    name: 'PostDetail',
    params: { id },
  });
};

//modal
const show = ref(false);
let modalTitle = ref('');
let modalContent = ref('');
let modalCreatedAt = ref('');

const openModal = ({ title, content, createdAt }) => {
  console.log('post item openModal');
  show.value = true;
  modalTitle = title;
  modalContent = content;
  modalCreatedAt = createdAt;
};
</script>

<style lang="scss" scoped></style>
