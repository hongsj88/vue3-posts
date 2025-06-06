<template>
  <AppModal v-model="show" title="게시글">
    <template #default>
      <div class="row g-3">
        <div class="col-3 text-muted">제목</div>
        <div class="col-9">{{ title }}</div>
        <div class="col-3 text-muted">내용</div>
        <div class="col-9">{{ content }}</div>
        <div class="col-3 text-muted">등록일</div>
        <div class="col-9">
          {{ $dayjs(createdAt).format('YYYY.MM.DD HH:mm:ss') }}
        </div>
      </div>
    </template>
    <template #actions>
      <button type="button" class="btn btn-secondary" @click="closeModal">
        닫기
      </button>
    </template>
  </AppModal>
</template>

<script setup>
import { computed } from 'vue';
// show는 props로 변경할 수 없다. 왜냐하면 내부에서 변경하면 안된다.
// 외부에서 이모델을 사용할 수 있도록
const props = defineProps({
  modelValue: Boolean,
  title: String,
  content: String,
  createdAt: [String, Number],
});

const emit = defineEmits('[update:modelValue]');
// computed 는 읽기전용이지만 set, get사용하면 쓰기도 가능능
const show = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const closeModal = () => {
  show.value = false;
};
</script>

<style lang="scss" scoped></style>
