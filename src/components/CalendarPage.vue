<template>
  <button style="margin-top:140px;" @click="downloadICS" class="btn-download">
      ⬇️ Завантажити розклад (ICS)
    </button>
    <!-- висота 100vh робить сторінку повноекранною -->
    <vue-cal
      style="height:70vh;"
      default-view="month"
      :time="false"
      locale="uk"
      :events="events"
      @event-click="goTo"
    />
    <!--час додати можна замінивши time=true-->
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import VueCal from 'vue-cal';
  import 'vue-cal/dist/vuecal.css';
  
  const events = ref([]);
  const router = useRouter();
  
  onMounted(async () => {
    const { data } = await axios.get('http://localhost:3000/schedule');
    events.value = data.map(c => ({
      id:    c.id,
      start: new Date(c.startDate),
      end:   new Date(c.endDate),
      title: c.name
    }));
  });
  
  // CalendarPage.vue  (варіант із vue-cal)
function goTo(calEvent /*, mouseEvt */) {
  if (!calEvent || !calEvent.id) return;   // захист від «порожнього» кліка
  router.push(`/course/${calEvent.id}`);
}
function downloadICS() {
  // якщо у вас немає proxy
  window.open('http://localhost:3000/schedule.ics', '_blank')

  // або, якщо використовуєте proxy /api → localhost:3000
  // window.open('/api/schedule.ics', '_blank')
}
  </script>
  <style>
  .vuecal__flex button{
    color:black;
  }</style>
  