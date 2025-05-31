<template>
  <div>
    <h2>Home View</h2>
    <P>{{ $route.path }}</P>
    <P>{{ $route.name }}</P>
    <button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>
  </div>
  <hr class="my-4" />
  <AppGrid :items="items" v-slot="{ item }" col-class="col-3">
    <AppCard>{{ item }}</AppCard>
  </AppGrid>
</template>
<script>
export default {
  created() {
    // console.log(this.$person.name);
    // this.$person.say();
  },
};
</script>
<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const items = ref(['사과', '딸기', '포도', '바나나']);
// const route = useRoute();
const router = useRouter();
// console.log('router.path: ', route.path);

const goAboutPage = () => {
  router.push('/about');
};
</script>

<style lang="scss" scoped></style>
