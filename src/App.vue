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
@import "../node_modules/picnic/picnic.min.css";
body {
  margin: 0;
  font-size: 1.0em;
}
#app {
  margin: 0 auto;
}
*{
  font-family: Montserrat;
  font-weight: 400;
}
</style>