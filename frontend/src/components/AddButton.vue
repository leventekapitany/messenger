<template>
  <button @click="onClick">
    <MaterialIcon :icon="adding ? 'remove' : 'add'" />
  </button>
</template>

<script setup lang="ts">
import MaterialIcon from '@/components/MaterialIcon.vue';
import { defineEmits, ref } from 'vue';

const adding = ref(false);

function onClick() {
  adding.value = !adding.value;
  emit('change', adding.value);
}

const emit = defineEmits<{
  (e: 'change', adding: boolean): void;
}>();
</script>

<style lang="scss" scoped>
button {
  display: grid;
  place-items: center;
  height: 24px;
  border: var(--border);
  padding: 0 4px;
  border-radius: 8px;

  span {
    font-size: 16px;
  }
}
</style>
