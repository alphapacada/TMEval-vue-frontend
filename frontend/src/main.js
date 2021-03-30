import Vue from "vue";
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import VueResizeText from 'vue-resize-text';
import vuetify from './plugins/vuetify';
import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io';

// import Socketio from 'socket.io-client';

// import Vuetify from 'vuetify/lib';
// import 'vuetify/src/stylus/app.styl'
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'

// import Vuetify, {
//     VApp, //required
//     VNavigationDrawer,
//     VCard,
//     VDataTable,
//     VTextField,
//     VList
// } from 'vuetify/lib'

// Vue.use(Vuetify, {
//     components: {
//         VApp,
//         VNavigationDrawer,
//         VCard,
//         VDataTable,
//         VTextField,
//         VList
//     },
// });

// import './registerServiceWorker'
// Vue.use(VueAxios, axios)
// Vue.prototype.$http = axios
console.log(process.env.VUE_APP_SOCKETIO_CONNECTION_URL)
console.log(process.env.VUE_APP_API_URL)
Vue.config.productionTip = false;
// export const SocketInstance = socketio('http://localhost:3000');

// export const SocketInstance = socketio(process.env.VUE_APP_SOCKETIO_CONNECTION_URL);
// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: process.env.VUE_APP_SOCKETIO_CONNECTION_URL,
//     // vuex: {
//     //     store,
//     //     actionPrefix: 'SOCKET_',
//     //     mutationPrefix: 'SOCKET_'
//     // },
//     // options: { path: "/my-app/" } //Optional options
// }))


Vue.use(VueResizeText);
Vue.use(Argon);
// Vue.use(VueSocketIO, SocketInstance)



// Vue.use(new VueSocketIO({
//     debug: false,
//     connection: process.env.SOCKETIO_CONNECTION_URL
//   }));

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount("#app");