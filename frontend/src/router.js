import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import tmLanding from "./views/tmLanding.vue";
import tmHeader from "./layout/tmHeader.vue";
import About from "./views/About.vue";
import PredictionResult from "./views/PredictionResult.vue"
import Protvista from "./views/ProtvistaView.vue"

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "components",
      components: {
        header: tmHeader,
        // default: Components,
        default:tmLanding,
        footer: AppFooter
      }
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        header: tmHeader,
        // default: Landing,
        default: tmLanding,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      }
    },
    {
      path: "/tmlanding",
      name: "tmlanding",
      components: {
        header: tmHeader,
        default: tmLanding,
        footer: AppFooter
      }
    },
    {
      path: "/About",
      name: "about",
      components: {
        header: tmHeader,
        default: About,
        footer: AppFooter
      }
    },
    {
      path: "/prediction",
      name: "prediction",
      components:{
        header:tmHeader,
        default: PredictionResult,
        footer: AppFooter
      }
    },
    {
      path: "/protvista",
      name: "protvista",
      components:{
        header:tmHeader,
        default: Protvista,
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
