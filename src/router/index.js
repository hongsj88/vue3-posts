import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';
import MyPage from '@/views/MyPage.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/posts', name: 'PostList', component: PostListView },
  { path: '/posts/create', name: 'PostCreate', component: PostCreateView },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetailView,
    props: true,
    // props: route => {
    //   return {
    //     id: parseInt(route.params.id),
    //   };
    // },
  },
  { path: '/posts/:id/edit', name: 'PostEdit', component: PostEditView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
  {
    path: '/nested',
    name: 'Nested',
    component: NestedView,
    children: [
      { path: '', name: 'NestedHomeView', component: NestedHomeView },
      { path: 'one', name: 'NestedOne', component: NestedOneView },
      { path: 'Two', name: 'NestedTwo', component: NestedTwoView },
    ],
  },
  {
    path: '/my',
    name: 'MyPage',
    component: MyPage,
    beforeEnter: [removeQueryString],
    // beforeEnter:(to, from) {
    //   // console.log('to', to);
    //   // console.log('from', from);
    //   // return { name: 'home' };
    //   console.log(to.query);
    // },
  },
];
function removeQueryString(to) {
  if (Object.keys(to.query).length > 0) {
    return { path: to.path, query: {} };
  }
}

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});
// router.beforeEach((to, from) => {
//   console.log('to', to);
//   console.log('from', from);
//   if (to.name === 'MyPage') {
//     // return false;
//     return { name: 'home' };
//   }
// });
export default router;
console.log('test');
