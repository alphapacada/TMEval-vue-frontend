import colors from "@/assets/scss/export.scss";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import { Intersect } from "vuetify/lib/directives";
Vue.use(Vuetify);
export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: "#82B1FF",
        error: colors.danger,
        info: colors.info,
        success: colors.success,
        warning: colors.warning,
      },
    },
  },
  directives: {
    Intersect,
  },
  icons: {
    iconfont: "fa4",
  },
});
