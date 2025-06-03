<template>
  <div id="app">
    <HeaderInfo />
    <router-view />
    <ChatBot />
    <FooterInfo />
  </div>
</template>

<script>
import HeaderInfo from './components/headerPro.vue'
import FooterInfo from './components/footerPro.vue'
import ChatBot from './components/ChatBot.vue';


export default {
  components: {
    HeaderInfo,
    FooterInfo,
    ChatBot
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  margin: 0 auto;
}

</style>