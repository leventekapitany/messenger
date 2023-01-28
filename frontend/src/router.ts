import { createRouter as createVueRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { useUserStore } from '@/stores/user-store';
import Empty from './views/EmptyPage.vue';
import Login from './views/LoginPage.vue';
import Room from './views/RoomPage.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', meta: { requiresLogin: true }, name: 'Empty', component: Empty },
  {
    path: '/r/:roomId',
    name: 'Room',
    component: Room,
    meta: {
      requiresLogin: true,
    },
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      loginCheck: true,
      standalone: true,
    },
  },
];

const createRouter = () => {
  const router = createVueRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });

  const userStore = useUserStore();

  router.beforeEach((to, from, next) => {
    userStore.showRouter = true;
    userStore.hideNavigation = !!to.meta.standalone;

    if (to.meta.requiresLogin) {
      if (!userStore.loggedIn) {
        next({ name: 'Login' });
      } else {
        next();
      }
    } else if (to.meta.loginCheck) {
      next();
    }
  });
  return router;
};

export default createRouter;
