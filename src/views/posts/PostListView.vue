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
    <template v-if="posts && posts.length > 0">
      <AppCard>
        <PostDetailView :id="posts[0].id"></PostDetailView>
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

// pagination
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 9,
  title_like: '',
});
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
// const fetchPosts = async () => {
//   try {
//     loading.value = true;
//     // const { data, response.headers } = await getPosts(params.value);
//     const response = await getPosts(params.value);
//     posts.value = response.data;
//     // const response = await fetch('/your-api');

<<<<<<< HEAD
//     // totalCount.value = response.headers['x-total-count'];
//     // x-total-count
//     const headerCount = response.headers['x-total-count'];
//     totalCount.value = headerCount ? Number(headerCount) : 0;
//     // totalCount.value = response.headers.get('x-total-count');
//     // const pageCo?unt = computed(() => totalCount.value / params.value._limit);
//   } catch (err) {
//     console.log('error: ', err);
//     error.value = err;
//   } finally {
//     loading.value = false;
//   }
// };
=======
    // totalCount.value = response.headers['x-total-count'];
    // x-total-count
    const headerCount = response.headers['x-total-count'];
    // totalCount.value = headerCount ? Number(headerCount) : 0;
    totalCount.value = response.headers.get('x-total-count');
    // const pageCount = computed(() => totalCount.value / params.value._limit);
  } catch (err) {
    console.log('error: ', err);
    error.value = err;
  } finally {
    loading.value = false;
  }
};
>>>>>>> feature/2025-05-31-composable

// watchEffect(fetchPosts);
const goPage = id => {
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
