<template>
  <div class="login-container">
    <div><img src="/icon.png" /></div>
    <div>Login with your Google account</div>
  </div>
</template>
<script setup lang="ts">
import auth from '@/auth';

auth.init();
auth.prompt();
</script>
<style lang="scss" scoped>
img {
  height: 50px;
}
.login-container {
  opacity: 0.6;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>
