<template>
    <div class="login">
      <h2>Admin Login</h2>
      <form @submit.prevent="signIn">
        <input v-model="user" placeholder="user" autocomplete="username" />
        <input v-model="pass" placeholder="password" type="password" autocomplete="current-password" />
        <button>Log in</button>
        <p v-if="err" class="err">{{ err }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const user = ref('');
  const pass = ref('');
  const err  = ref('');
  const router = useRouter();
  
  async function signIn () {
    try {
      await axios.post('http://localhost:3000/login', { user: user.value, pass: pass.value });
      localStorage.setItem('isAdmin', '1');          // прапорець доступу
      router.push('/admin');
    } catch {
      err.value = 'Невірний логін або пароль';
    }
  }
  </script>
  
  <style scoped>
  .login { max-width: 320px; margin: 6rem auto; display: grid; gap: .8rem; text-align:center; margin-top:120px;}
  .err   { color:#c33; }
  </style>
  