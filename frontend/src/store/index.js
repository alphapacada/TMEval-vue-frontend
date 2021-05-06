import $backend from "@/api";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    job_stats: {},
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    update_stats(state) {
      console.log("Retrieving new job stat");
      $backend.getJobs().then((responseData) => {
        state.job_stats = responseData;
      });
    },
  },
});
export default store;
