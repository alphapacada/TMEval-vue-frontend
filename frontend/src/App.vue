<template>
  <div id="app">
    <card v-if="isConnected">Connected to socket</card>
    <router-view name="header"></router-view>
    <main v-on:scroll.passive="handleScroll">
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
    </main>
    <base-button
      tag="a"
      fab
      href="#"
      icon="fa fa-chevron-up"
      size="lg"
      type="primary"
      rounded
    ></base-button>
    <router-view name="footer"></router-view>
  </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    FadeTransition,
  },
  data: () => ({
    isConnected: false,
    isUserScrolling: false,
  }),
  methods: {
    handleScroll(event) {
      // Any code to be executed when the window is scrolled
      this.isUserScrolling = window.scrollY > 0;
      console.log("calling handleScroll");
    },
  },
  sockets: {
    connect() {
      this.isConnected = true;
      console.log("connected to socket");
    },
  },
};
</script>
<style scoped>
body > #app {
  margin-top: 60px;
}
</style>
