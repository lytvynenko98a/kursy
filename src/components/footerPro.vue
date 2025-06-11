<template>
  <footer class="footer">
    <div class="container">
      <p class="company-description">
        Навчання програмуванню — це не тільки можливість, але й ключ…
      </p>
      <p class="company-description">
        Наша місія — створити якісні та доступні ресурси для навчання…
      </p>

      <!-- ---- кнопки входу / панель / виходу ---- -->
      <div class="auth-links">
        <router-link
          v-if="!isAuthed"
          to="/login"
          class="auth-link"
        >
          Увійти в Адмінпанель
        </router-link>

        <template v-else>
          <!-- новий лінк на адмінпанель -->
          <router-link
            to="/admin"
            class="auth-link"
          >
            Адмінпанель
          </router-link>
          <!-- лінк для виходу -->
          <a
            href="#"
            class="auth-link"
            @click.prevent="logout"
          >
            Вийти з адмінпанелі
          </a>
        </template>
      </div>

      <p class="copyright">© 2025 IT LEARNING</p>
    </div>
  </footer>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route  = useRoute();

/* --- чи авторизований? --- */
const isAuthed = ref(localStorage.getItem('isAdmin') === '1');

/* перераховуємо прапорець після кожної навігації */
watch(
  () => route.fullPath,
  () => { isAuthed.value = localStorage.getItem('isAdmin') === '1'; }
);

/* --- вихід --- */
function logout () {
  localStorage.removeItem('isAdmin');
  isAuthed.value = false;
  router.push('/login');         // назад на форму входу
}
</script>

<style scoped>
.footer {
  background: #333;
  color: #fff;
  padding: 20px 0;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.company-description {
  font: 16px/1.6 'Lato', sans-serif;
  width: 700px;
  margin-bottom: 10px;
  color: #75a3a3;
}
.auth-links {
  margin: 8px 0;
}
.auth-link {
  display: inline-block;
  margin-right: 15px;
  color: lightblue;
  text-decoration: none;
}
.auth-link:hover {
  text-decoration: underline;
}
copyright {
  font: 15px 'Lato', sans-serif;
  color: #fff;
}
</style>
