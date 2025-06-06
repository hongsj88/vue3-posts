<template>
  <div>
    <h2>About View</h2>
    <P>{{ $route.path }}</P>
    <P>{{ $route.name }}</P>
    <button class="btn btn-primary" @click="$router.push('/')">
      Home으로 이동
    </button>
    <h2>store</h2>
    <p>counter : {{ counter }}</p>
    <p>doubleCount : {{ doubleCount }}</p>
    <p>doubleCountPlusOne : {{ doubleCountPlusOne }}</p>
    <button @click="increment()">Click!!!</button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useCountStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const route = useRoute();
console.log('route.path: ', route.path);

const store = useCountStore();
// const { counter } = storeToRefs(store);
// 스토어는 리액티브로 랩핑된 객체로 console 출력시 proxy가 출력됨
// 리액티브로 래핑된 객체라는 것은 구조분해로 할당을 하게 되면 반응성연결이 끊어지게 된다.
// 이때 사용하는 것이 storeToRefs 함수다!!
// console.log(store);
// console.log('counter', typeof counter, counter);
const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store);
// 메서드의 경우, 실행하는 함수이므로 그냥 구조분해를 통해서 가져오면 된다.
const { increment } = store;
counter.value = 100;
// increment();
// increment();
// increment();
</script>

<style lang="scss" scoped></style>
