<template>
  <div>
    <h2>About View</h2>
    <P>{{ $route.path }}</P>
    <P>{{ $route.name }}</P>
    <button class="btn btn-primary" @click="$router.push('/')">
      Home으로 이동
    </button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
console.log('route.path: ', route.path);
</script>

<style lang="scss" scoped></style>
