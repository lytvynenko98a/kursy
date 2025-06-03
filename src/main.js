import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import axios from 'axios'

const app = createApp(App);
app.use(setupCalendar, {
    locale: 'uk',
    timezone: 'Europe/Kyiv',
  });
  // (не обов’язково) глобальна реєстрація тегів
app.config.globalProperties.$http = axios
app.component('VCalendar',   Calendar);
app.component('VDatePicker', DatePicker);
app.use(router);
app.mount('#app');
