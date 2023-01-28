<template>
  <div class="navigation-bar">
    <div class="top">
      <button selected>
        <MaterialIcon icon="chat_bubble" />
      </button>
      <button>
        <MaterialIcon icon="settings" outlined />
      </button>
    </div>
    <div class="bottom">
      <button @click="userStore.toggleTheme">
        <MaterialIcon :icon="`${userStore.theme}_mode`" />
      </button>
      <button>
        <img :src="userStore.picture" />
      </button>
      <button @click="userStore.logout">
        <MaterialIcon icon="logout" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import MaterialIcon from '@/components/MaterialIcon.vue';
import { useUserStore } from '@/stores/user-store';
const userStore = useUserStore();
</script>

<style scoped lang="scss">
.navigation-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  color: var(--font-color);

  .top,
  .bottom {
    display: flex;
    flex-flow: column;
    gap: 4px;
  }

  button {
    display: grid;
    place-items: center;
    aspect-ratio: 1;
    margin-inline: 6px;
  }

  img {
    max-height: 30px;
    max-width: 30px;
  }

  img,
  button {
    border-radius: 8px;
    max-height: 100%;
  }

  @media (max-width: 800px) {
    .top,
    .bottom {
      flex-flow: row;
    }
  }
}
</style>
