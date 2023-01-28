// import basicSsl from '@vitejs/plugin-basic-ssl';
import vue from '@vitejs/plugin-vue';
import dns from 'dns';
import analyze from 'rollup-plugin-analyzer';
import { defineConfig } from 'vite';
import vuetify from 'vite-plugin-vuetify';
import svgLoader from 'vite-svg-loader';

dns.setDefaultResultOrder('verbatim');

const path = require('path');
export default defineConfig({
  plugins: [vue(), svgLoader(), analyze({ limit: 3 }), vuetify()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000
  }
});
