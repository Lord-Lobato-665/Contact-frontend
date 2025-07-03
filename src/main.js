import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { install } from 'vue3-recaptcha-v2';

createApp(App)
  .use(router)
  .use(install, {
    sitekey: '6LfGkHUrAAAAACCjzjVV3F0H7VG7A6Bzz_RL-Dbi',
  })
  .mount('#app');
