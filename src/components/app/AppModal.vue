<template>
  <transition>
    <div v-if="modelValue">
      <div class="modal-backdrop fade show"></div>
      <!-- Modal -->
      <div
        id="exampleModal"
        class="modal fade show d-block"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <slot name="header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  {{ title }}
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  @click="$emit('update:modelValue', false)"
                ></button>
              </slot>
            </div>
            <div class="modal-body">
              <slot> </slot>
            </div>
            <div class="modal-footer">
              <slot name="actions"> </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  // show: Boolean,
  modelValue: Boolean,
  title: String,
});

defineEmits(['close', 'update:modelValue']);
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
