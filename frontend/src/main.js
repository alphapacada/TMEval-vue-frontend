import Vue from "vue";
import VueResizeText from "vue-resize-text";
import VueSocketIO from "vue-socket.io";
import App from "./App.vue";
import Argon from "./plugins/argon-kit";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";

console.log(process.env.VUE_APP_SOCKETIO_CONNECTION_URL);
console.log(process.env.VUE_APP_API_URL);
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == "production") {
  console.log = function() {};
}

Vue.config.productionTip = false;

Vue.use(VueResizeText);
Vue.use(Argon);
Vue.use(
  new VueSocketIO({
    debug: false,
    connection:
      process.env.VUE_APP_SOCKETIO_CONNECTION_URL ||
      "http://202.92.153.75/socketio/",
  })
);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
