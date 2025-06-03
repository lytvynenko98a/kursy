import { createRouter, createWebHistory } from 'vue-router';
import mainPro from './components/mainPro.vue'; 
import formPro from './components/formPro.vue'; 
import contactsPro from './components/contactsPro.vue'; 
import CoursesComp from './components/CoursesComp.vue';
import teachers from './components/teachersPro.vue'; 
import CourseDetails from './components/CourseDetails.vue';
import CalendarPage  from './components/CalendarPage.vue';
import LoginPage   from './components/LoginPage.vue';
import AdminPage  from './components/AdminPage.vue';
import ChatBot  from './components/ChatBot.vue';

const routes = [
  { path: '/', component: mainPro, },
  { path: '/form', component: formPro, },
  { path: '/contacts', component: contactsPro, },
  { path: '/courses', component: CoursesComp },
  { path: '/teachers', component: teachers },
  { path: '/course/:id', component: CourseDetails, props: true },
  { path: '/calendar',   name: 'calendar', component: CalendarPage },
  { path: '/login',  component: LoginPage },
  { path: '/admin',   name: 'admin', component: AdminPage },
  { path: '/chatbot', component: ChatBot },
  { path: '/:pathMatch(.*)*', redirect: '/admin' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
/* ---- най­простіший guard ---- */
router.beforeEach((to, _, next) => {
  const needAuth = to.path.startsWith('/admin');
  const isAuthed  = localStorage.getItem('isAdmin') === '1';
  if (needAuth && !isAuthed) next('/login');
  else next();
});
export default router;
