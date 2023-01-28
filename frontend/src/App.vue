<template>
  <v-app :theme="userStore.theme">
    <div class="app-container" :class="{ 'show-router': userStore.showRouter }">
      <div class="navigation-bar_" v-if="!userStore.hideNavigation">
        <NavigationBar />
      </div>

      <div class="content-list_" v-if="!userStore.hideNavigation">
        <ContentList />
      </div>
      <div class="router-view_">
        <RouterView :key="$route.path" />
      </div>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useUserStore } from './stores/user-store';

import ContentList from '@/views/ContentList.vue';
import NavigationBar from '@/views/NavigationBar.vue';

const userStore = useUserStore();
</script>

<style scoped lang="scss">
.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;

  > div {
    border: var(--border);
  }
}

.navigation-bar_,
.content-list_,
.router-view_ {
  height: 100%;
}

.content-list_ {
  width: 300px;
}

.router-view_ {
  width: -webkit-fill-available;
}

.navigation-bar_ {
  width: 70px;
}

.navigation-bar {
  flex-flow: column;
  padding-top: 15px;
  padding-bottom: 15px;
}

@media (max-width: 800px) {
  .app-container {
    flex-flow: column-reverse;
  }
  .router-view_ {
    display: none;
  }
  .content-list_,
  .navigation-bar_ {
    width: 100%;
  }
  .navigation-bar_ {
    height: 70px;
  }
  .navigation-bar {
    flex-flow: row;
    padding: 0;
  }
  .show-router {
    .router-view_ {
      display: block;
    }
    .content-list_,
    .navigation-bar_ {
      display: none;
    }
  }
}
</style>
