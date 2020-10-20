import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from '@/assets/scss/export.scss'
import { Intersect } from 'vuetify/lib/directives'
// import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);
console.log("success")
console.log(JSON.stringify(colors))
console.log(colors.danger)

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: '#82B1FF',
        error: colors.danger,
        info: colors.info,
        success: colors.success,
        warning: colors.warning
      },
    },
  },
  directives: {
    Intersect
  },
  icons: {
    iconfont: 'fa4',
  },
});
