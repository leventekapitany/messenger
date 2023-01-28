<template>
  <span :class="outlined ? 'material-icons-outlined' : 'material-icons'">
    {{ icon }}
  </span>
</template>

<script setup lang="ts">
const { outlined, icon } = defineProps({
  outlined: { type: Boolean },
  icon: { type: String, required: true },
});
</script>
