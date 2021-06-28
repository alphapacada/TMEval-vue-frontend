import $backend from "@/api";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
function assignHeaders(array) {
  let newItem = {};
  newItem.headers = Object.keys(array[0]).map((key) => {
    // if (key != "Prediction Method") {
    //   return { text: key, value: key, align: "center" };
    // }
    return {
      text: key,
      value: key,
      align: "center",
    };
  });
  newItem.items = array;
  // console.log(newItem);
  return newItem;
}
// function json_to_datatable_item(name) {
//   this.tables[name].items = this.roundOffNumbers(
//     JSON.parse(this.assessment[name])
//   );

//   this.tables[name].headers = Object.keys(this.tables[name].items[0]).map(
//     (key) => {
//       if (key != "Prediction Method") {
//         return { text: key, value: key, align: "center" };
//       }
//       return { text: key, value: key };
//     }
//   );
// },
const table_keys = [
  "sov",
  "pred_acc_classification",
  "pred_acc",
  "mcc",
  "per_segment_fn_fp",
  "sample_data",
];

const stat_figure_keys = [
  "bar_mode_organisms",
  "bar_protein_count",
  "bar_tm_helix_length",
  "bar_tm_length",
];
const figure_keys = ["plot_cm_classification", "plot_cm_orientation"];

const store = new Vuex.Store({
  state: {
    count: 0,
    job_stats: {},
    assessment_res: { set_25: { A: {}, B: {}, C: {}, D: {} } },
    tools: ["CCTOP", "HMMTOP", "PHILIUS", "TMHMM2.0", "TOPCONS2", "TMSEG"],
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
    updateAssessment(state, payload) {
      // console.log("setAssessmentSet");
      let seqId = payload.seqId;
      let set = payload.set;
      let response = payload.response;

      // console.log(seqId, set);

      // const plot_keys = ["plot_cm_orientation", "plot_cm_classification"];
      let new_assess_res = Object();

      Object.keys(response).forEach((res_key) => {
        // check if undefined
        if (response[res_key]) {
          console.log(res_key);

          if (table_keys.includes(res_key)) {
            if (res_key == "sample_data") {
              console.log(response[res_key]);
            }
            new_assess_res[res_key] = assignHeaders(
              JSON.parse(response[res_key])
            );
          } else if (figure_keys.includes(res_key)) {
            new_assess_res[res_key] = JSON.parse(response[res_key]);
          } else if (res_key == "stats") {
            Object.keys(response[res_key]).forEach((stats_key) => {
              new_assess_res[stats_key] = response[res_key][stats_key];
            });
          } else {
            new_assess_res[res_key] = response[res_key];
          }
        }
      });
      state.assessment_res[seqId][set] = Object.assign(
        {},
        state.assessment_res[seqId][set],
        new_assess_res
      );
    },
    setAssessment(state, assess_res) {
      // state.assessment_res = assess_res;
      // state.assessment_res = Object.assign(
      //   {},
      //   state.assessment_res,
      //   assess_res
      // );
      state.assessment_res = Object.assign(
        {},
        state.assessment_res,
        assess_res
      );
    },
  },
  actions: {
    instantiateAssessRes({ commit, state }, seqId = 25) {
      let assess_res = { set_25: {}, set_30: {}, set_40: {} };
      const seq_ident = [25];
      const sets = ["A", "B", "C", "D"];
      let obj = {};
      stat_figure_keys.forEach((key) => {
        obj[key] = {};
      });
      table_keys.forEach((key) => {
        obj[key] = {};
      });
      figure_keys.forEach((key) => {
        obj[key] = state.tools.reduce((o, key) => ({ ...o, [key]: {} }), {});
      });
      Object.keys(assess_res).forEach((set_key) => {
        sets.forEach((subset_key) => {
          assess_res[set_key][subset_key] = { ...obj };
        });
      });

      commit("setAssessment", assess_res);
    },
    getAssessResFromApi({ commit, state }) {
      const seq_ident = [25, 30, 40];
      const sets = ["A", "B", "C", "D"];
      for (let seq_ctr = 0; seq_ctr < seq_ident.length; seq_ctr++) {
        let key = seq_ident[seq_ctr];
        for (let i = 0; i < sets.length; i++) {
          $backend
            .getAssessment(seq_ident[seq_ctr], sets[i])
            .then((response) => {
              if (response) {
                // console.log("received response");
                commit("updateAssessment", {
                  response: response,
                  seqId: "set_" + key,
                  set: sets[i],
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
  },
});
export default store;
function newFunction(assess_res, key, sets, i, response, table_keys) {}
