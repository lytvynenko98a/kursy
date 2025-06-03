<template>
    <!-- висота 100vh робить сторінку повноекранною -->
    <vue-cal
      style="height:70vh;margin-top:120px;"
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

  </script>
  