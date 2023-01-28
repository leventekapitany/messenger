import { createPinia } from 'pinia';
import { createApp } from 'vue';
// eslint-disable-next-line import/extensions
import { createVuetify } from 'vuetify/lib/framework.mjs';

// import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import apolloClient from './apollo-client';
import App from './App.vue';
import './auth';
import createRouter from './router';

import './style.css';
import './theme.scss';

const app = createApp(App);

const vuetify = createVuetify();
app.use(vuetify);
const pinia = createPinia();
app.use(pinia);
const router = createRouter();
app.use(router);

app.provide(...apolloClient);
app.mount('#app');

export default router;
