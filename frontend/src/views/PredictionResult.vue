<template>
  <section class="section bg-secondary section-lg">
    <div class="container">
        <!-- v-on:scroll.native="handleScroll" -->

      <job-section
        v-intersect.quiet="handleIntersect"
        id="job_status"
        job_id="job id"
        :url="job_url"
      ></job-section>
      <div id="progress">
        <base-progress
          type="success"
          :value="progress_value"
          :label="job_status"
        ></base-progress>
      </div>
    </div>

    <!-- + PRED RES -->

    <div class="mt-4 container shape-container align-items-center">
      <div class="container">
        <base-button type="danger">
          Evaluate?
        </base-button>
      </div>

      <v-card class="pt-0 pb-3" id="content-result" v-intersect.quiet="handleIntersect">
        <v-card-title primary-title>
          <h1 class="col-md-9">
            Prediction Results
          </h1>
          <div class="col-md-3 align-items-right">
            <base-dropdown>
              <base-button slot="title" type="success" class="dropdown-toggle">
                {{ selectedMethod }}
              </base-button>
              <li
                style="cursor:pointer"
                @click="setSelectedMethod(index)"
                class="dropdown-item"
                :key="index"
                v-for="(method, index) in predictionMethods"
              >
                {{ method }}
              </li>
            </base-dropdown>
          </div>
        </v-card-title>
        <v-card-text class="row mx-0">
          <div class="col-6">
            <h5>Raw results</h5>
            <textarea
              v-model="pred_tool_res"
              class="form-control text-black col"
              rows="20"
              readonly
            ></textarea>
          </div>
          <div class="col-6">
            <h5>Processed results</h5>
            <textarea
              v-model="parsed_res"
              class="form-control text-black col"
              rows="20"
              readonly
            ></textarea>
          </div>
        </v-card-text>
      </v-card>
      <!-- - PRED RES -->

      <!-- + TOPOLOGY  -->
      <!-- <v-card class="p-2 mt-2">
                <v-card-title primary-title>
                    <h2>Topologies</h2>
                </v-card-title>
            </v-card>
            <v-card v-for="seq in sequence_topo">
                <v-card-title primary-title>
                    seq.name
                </v-card-title>
                <div v-for="t in seq.topologies" :key="t.index">
                    <h6>{{ t.name }}</h6>
                    <topology :seq="t.topology"></topology>
                </div>
            </v-card> -->
      <!-- + TOPOLOGY  -->
      <v-card id="res_topo" class="p-2 mt-2"  v-intersect.quiet="handleIntersect">
        <v-card-title primary-title>
          <h2>Topologies</h2>
        </v-card-title>
        <div v-for="t in topologies" :key="t.index">
          <h5>{{ t.sequence.name }}</h5>
          <div v-for="res in t.sequence.results" :key="res.name">
            <h6>{{ res.toolname }}</h6>
            <topology :seq="res.annotation"></topology>
          </div>
        </div>
      </v-card>
      <!-- - TOPOLOGY -->
      <!-- - TOPOLOGY -->
    </div>
  </section>
</template>

<script>
import $backend from "../api";
import Topology from "./components/Topology";
import JobSection from "@/views/components/JobSection.vue";
export default {
  name: "PredictionResult",
  data() {
    return {
      handleIntersect : {
            handler: this.onIntersect,
            options: {
              threshold: 0.75,
              rootMargin: '0px 0px -200px 0px',
            }
          },
      topologies: [],
      job_status: "",
      job_id: "---",
      job_url: "",
      progress_value: 0,
      percent: 0,
      status: "",
      result: "",
      predictionMethods: [],
      selectedMethod: "Method",
      selectedMethodIndex: 0,
      pred_tool_res: "",
      parsed_res: "",
      results: [],
      sequence_topo: [],
    };
  },
  components: {
    JobSection,
    Topology,
  },
  created() {
    // console.log("woof woof predictionResult");
    this.fetchData();
    // console.log(this.$route.params.id, this.$route.query.page);
    this.job_id = this.$route.params.id;
    this.job_url = this.$route.path;
  },
  methods: {
    onIntersect (entries, observer) {
      console.log(entries)
       this.$nextTick(() => {
        
        // More information about these options
        // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
        this.isIntersecting = entries[0].isIntersecting
        let elem = entries[0].target
        const newpath = this.$route.path + '#' +elem.id
        // observer.unobserve(elem);
        // if (this.$route.path !== newpath) 
        if (this.isIntersecting) this.$router.push({name: 'pred-results', hash: '#' +elem.id,  params: {preventScroll: true}}).catch(err => {})
       })
      },
    handleScroll(event) {
      console.log("uv scroll here");
    },
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },

    fetchData() {
      this.error = null;
      if (this.$route.params.id) {
        this.getLongTask(this.$route.params.id);
      }
    },
    getLongTask(task_id) {
      console.log(task_id);
      $backend.getPredResults(task_id).then((responseData) => {
        console.log(responseData);
        let percent =
          (responseData.data["current"] * 100) / responseData.data["total"];
        this.progress_value = percent;
        this.percent = percent;
        this.status = responseData.data["status"];
        this.job_status = "Prediction Job: " + responseData.data["state"];
        if (
          responseData.data["state"] != "PENDING" &&
          responseData.data["state"] != "PROGRESS"
        ) {
          // if Job completed
          if ("result" in responseData.data) {
            this.result = "Result" + responseData.data["result"];
            this.fetchPredictionResults(responseData.data["result"]);
          } else {
            // check if job failed. e.g. result == 'FAILURE'
            this.result = "Result" + responseData.data["state"];
          }
        } else {
          setTimeout(() => {
            this.getLongTask(task_id);
          }, 5000);
        }
      });
    },
    //prediction_res -> a dict containing the results of the prediction
    fetchPredictionResults(prediction_res) {
      // this.pred_tool_res = prediction_res[0][0];
      // this.parsed_res = prediction_res[0][1];
      console.log(prediction_res);
      this.results = prediction_res;
      console.log(this.results);
      let i = 0;

      let sequences = this.results[0].parsed_res;

      for (i = 0; i < sequences.length; i++) {
        this.topologies[i] = Object();
        this.topologies[i].index = i;
        this.topologies[i].sequence = Object();
        this.topologies[i].sequence.name =
          sequences[i].name || "Protein [" + (i + 1) + "]";
        this.topologies[i].sequence.results = [];
        for (const predMethod of this.results) {
          if (i == 0)
            //assign predMethods only on first run
            this.predictionMethods.push(predMethod["tool"]);

          this.topologies[i].sequence.results.push({
            toolname: predMethod.tool,
            annotation: predMethod.parsed_res[i].topology.annotation,
          });
        }
      }

      // for(const predMethod of this.results)
      // {
      //     console.log(predMethod);
      //     // for dropdown of method names used for prediction
      //     this.predictionMethods.push(predMethod['tool']);
      //     var topologyObj;

      //     topologyObj = {
      //         'index': i,
      //         'topology': predMethod.parsed_res[0].topology.annotation,
      //         'name': predMethod.tool
      //     };
      //     this.topologies.push(topologyObj);
      //     i++;
      // }
      console.log(this.predictionMethods);
      this.setSelectedMethod(0);
    },
    setSelectedMethod(index) {
      console.log("selected method results", this.results[index]);
      this.selectedMethod = this.predictionMethods[index];
      this.selectedMethodIndex = index;
      this.pred_tool_res = this.results[index].pred_tool_res;
      // this.parsed_res = JSON.stringify(this.results[index].parsed_res[0],null,2);
      this.parsed_res = JSON.stringify(this.results[index].parsed_res, null, 2);
    },
  },
};
</script>
<style scoped>
#res_topo {
  height:480px;
}
.text-black {
  color: black !important;
}

textarea {
  white-space: nowrap; /* will prevent the default wrapping of text to next line */
  overflow-x: auto;
  white-space: pre;
  resize: none;
}
</style>
