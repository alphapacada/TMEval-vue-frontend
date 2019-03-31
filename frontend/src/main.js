import Vue from "vue";
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";





// import './registerServiceWorker'
// Vue.use(VueAxios, axios)
// Vue.prototype.$http = axios
Vue.config.productionTip = false;
Vue.use(Argon);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
