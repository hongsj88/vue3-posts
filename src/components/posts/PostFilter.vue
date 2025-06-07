<template>
  <form @submit.prevent>
    <div class="row g-3">
      <div class="col">
        <input
          :value="title"
          @input="changeTitle"
          type="text"
          class="form-control"
          placeholder="제목으로 검색하세요"
        />
      </div>
      <div class="col-3">
        <select
          class="form-select"
          :value="limit"
          @input="$emit('update:limit', $event.target.value)"
        >
          <option value="6">6개씩 보기</option>
          <option value="12">12개씩 보기</option>
          <option value="18">18개씩 보기</option>
        </select>
      </div>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  title: String,
  limit: Number,
});
const changeTitle = event => {
  setTimeout(() => {
    emit('update:title', event.target.value);
  }, 500);
};
const emit = defineEmits(['update:title', 'update:limit']);
</script>

<style lang="scss" scoped></style>
