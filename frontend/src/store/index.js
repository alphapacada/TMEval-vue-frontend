import $backend from "@/api";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
function assignHeaders(array) {
  let newItem = {};
  newItem.headers = Object.keys(array[0]).map((key) => {
    return {
      text: key,
      value: key,
    };
  });
  newItem.items = array;
  console.log(newItem);
  return newItem;
}

const store = new Vuex.Store({
  state: {
    count: 0,
    job_stats: {},
    assessment_res: { set_25: { A: {}, B: {}, C: {}, D: {} } },
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
    setAssessmentSet(state, payload) {
      // console.log("setAssessmentSet");
      let seqId = payload.seqId;
      let set = payload.set;
      let response = payload.response;
      // console.log(seqId, set);
      const table_keys = [
        "sov",
        "pred_acc_classification",
        "pred_acc",
        "mcc",
        "per_segment_fn_fp",
      ];
      state.assessment_res[seqId][set] = Object();

      Object.keys(response).forEach((res_key) => {
        if (table_keys.includes(res_key)) {
          state.assessment_res[seqId][set][res_key] = assignHeaders(
            JSON.parse(response[res_key])
          );
        } else {
          state.assessment_res[seqId][set][res_key] = JSON.parse(
            response[res_key]
          );
        }
      });
    },
    setAssessment(state, assess_res) {
      // console.log("committing..");
      // console.log(assess_res);
      state.assessment_res = assess_res;
    },
  },
  actions: {
    instantiateAssessRes({ commit, state }, seqId = 25) {
      let assess_res = { set_25: {}, set_30: {}, set_40: {} };
      const seq_ident = [25];
      const sets = ["A", "B", "C", "D"];

      // console.log("instantiateAssessRes");
      // Object.keys(state.assessment_res).forEach((key) => {
      for (let seq_ctr = 0; seq_ctr < seq_ident.length; seq_ctr++) {
        let key = seq_ident[seq_ctr];
        for (let i = 0; i < sets.length; i++) {
          $backend
            .getAssessment(seq_ident[seq_ctr], sets[i])
            .then((response) => {
              if (response) {
                // console.log("received response");
                commit("setAssessmentSet", {
                  response: response,
                  seqId: "set_" + key,
                  set: sets[i],
                });
              }
            })
            .catch((error) => {
              console.log("error");
              console.log(error);
              // commit('unAuthorisedUser',{
              //     error:error.response.data
              // })
            });
        }
      }
      // console.log(assess_res);
      // commit("setAssessment", assess_res);

      // commit("setAssessment", assess_res);
    },
  },
});
export default store;
function newFunction(assess_res, key, sets, i, response, table_keys) {}
