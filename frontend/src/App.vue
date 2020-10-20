<template>
    <div id="app">
        
        <router-view name="header"></router-view>
        
        <main v-on:scroll.passive="handleScroll">
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view/>
            </fade-transition>
        </main>
        <base-button  tag="a" fab href='#' icon='fa fa-chevron-up' size='lg' type='primary' rounded></base-button>
        <router-view name="footer"></router-view>
        
    </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";


export default {
  components: {
    FadeTransition
  },
  data: () => ({
    isUserScrolling: false
  }),
  methods: {
 
    handleScroll(event) {
      // Any code to be executed when the window is scrolled
      this.isUserScrolling = (window.scrollY > 0);
      console.log('calling handleScroll');
    }
  },
};
</script>
<style scoped>
body > #app {
  margin-top:60px;
}
</style>