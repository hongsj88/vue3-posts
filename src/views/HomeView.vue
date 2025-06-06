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
  <h2>{{ position }}</h2>
  <h2>{{ x }}</h2>
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
import { reactive, ref, toRef, toRefs } from 'vue';
const items = ref(['사과', '딸기', '포도', '바나나']);
// const route = useRoute();
const router = useRouter();
// console.log('router.path: ', route.path);

const goAboutPage = () => {
  router.push('/about');
};

const position = reactive({
  x: 100,
  y: 1000,
});
// const x = position.x;
// const { x, y } = position;
// const x = ref(position.x); // 초기값의 할당일뿐이기 때문에 동기화가 되는 것은 아님
// console.log('x type', typeof x.value);
// console.log('position type', typeof position);
// const x = toRef(position, 'x');
// const y = toRef(position, 'y');
const { x, y } = toRefs(position);
console.log('x type', typeof x.value);
console.log('y type', typeof y.value);
</script>

<style lang="scss" scoped></style>
