<template >
    <div class="admin" style="margin-top:120px;">
      <h2>1. Додати курс</h2>
      <form @submit.prevent="addCourse" class="box">
        <input v-model="c.name"        placeholder="Назва" />
        <textarea v-model="c.desc"     placeholder="Опис"></textarea>
        <label>Ціна (грн) <input    v-model.number="c.price" type="number" step="0.01" placeholder="Ціна" /></label>
        <label>Тривалість <input    v-model.number="c.duration" type="number" placeholder="Тривалість (год)" /></label>
        <input type="file" @change="onFile" />
        <!-- <input    v-model="c.image"    placeholder="Шлях до зображення" /> -->
        <label>Початок <input type="date" v-model="c.start" /></label>
        <label>Кінець  <input type="date" v-model="c.end"   /></label>
        <button>Створити</button>
      </form>
  
      <h2>2. Додати урок</h2>
      <form @submit.prevent="addLesson" class="box">
        <select v-model.number="l.courseId">
          <option disabled value>‒ вибери курс ‒</option>
          <option v-for="crs in courses" :key="crs.id" :value="crs.id">
            {{ crs.name }}
          </option>
        </select>
        <input  v-model="l.title"    placeholder="Назва уроку" />
        <input  v-model.number="l.order" type="number" placeholder="№ у курсі" />
        <button>Додати</button>
      </form>
  
      <hr/>
      <h3>Курси (для довідки)</h3>
      <ul>
        <li v-for="crs in courses" :key="crs.id">
          #{{ crs.id }} – {{ crs.name }} ({{ crs.start_date }} → {{ crs.end_date }})
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

/* --------- reactive state --------- */
const courses = ref([]);
const c = ref({
  name:'', desc:'', price:0, duration:0, start:'', end:'', file:null // <-- file
});
const l = ref({ courseId:null, title:'', order:1 });

onMounted(loadCourses);

async function loadCourses(){
  const { data } = await API.get('/courses');
  courses.value = data;
}

/* ---------------- файл обрано ---------------- */
function onFile(e){
  c.value.file = e.target.files[0] ?? null;
}

/* ------------- додати курс (multipart) ------------- */
async function addCourse(){
  const fd = new FormData();
  fd.append('name',        c.value.name);
  fd.append('description', c.value.desc);
  fd.append('price',       c.value.price);
  fd.append('duration',    c.value.duration);
  fd.append('startDate',   c.value.start);
  fd.append('endDate',     c.value.end);
  if (c.value.file) fd.append('image', c.value.file);  // ключ повинен збігатись з upload.single('image')

  await API.post('/courses', fd);   // axios сам поставить content-type multipart
  // чистимо форму
  Object.assign(c.value,{ name:'', desc:'', price:0, duration:0, start:'', end:'', file:null });
  loadCourses();
  alert('Курс створено');
}

/* ---------- додати урок — без змін ---------- */
async function addLesson(){
  await API.post('/lessons',{
    course_id: l.value.courseId,
    title: l.value.title,
    order_no: l.value.order,
  });
  Object.assign(l.value,{ courseId:null, title:'', order:1 });
  alert('Урок додано');
}
</script>
  
  <style scoped>
  .admin { max-width: 520px; margin: auto; font-family: sans-serif; }
  .box   { display: grid; gap: .6rem; margin-bottom: 2rem; }
  </style>
  