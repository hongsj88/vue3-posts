<template>
  <form>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">제목</label>
      <!-- input에서 우리가 v-model을 풀때는 value에 props를 집어넣고 그리고 input event로 값을 받는다 -->
      <!-- 해당 이벤트에서 바로 이벤트 객체를 받을 때는 $해서 이벤트를 아래와 같이 받을수 있다. -->
      <input
        :value="title"
        v-focus
        @input="$emit('update: title', $event.target.value)"
        type="text"
        class="form-control"
        id="title"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">내용</label>
      <textarea
        :value="content"
        @input="$emit('update:content', $event.target.value)"
        class="form-control"
        id="content"
        rows="3"
      ></textarea>
    </div>
    <!-- 부모컨포넌트에서 다른 태그를 전달할수 있도록 슬롯정의 -->
    <div class="d-flex gap-2 mt-4">
      <slot name="actions"></slot>
    </div>
  </form>
</template>

<script setup>
const vFocus = {
  mounted: el => {
    el.focus();
  },
};
defineProps({ title: String, content: String });

/**
 * 다중 v-model을 구현하기 위해서는 defineEmits 해서 update : title 이렇게 정의해줘야 된다.
 */
defineEmits(['update: title', 'update:content']);
</script>

<style lang="scss" scoped></style>
