<template>
  <section class="section bg-secondary section-lg">
    <div class="container">
      <job-section
        v-intersect.quiet="handleIntersect"
        id="job_status"
        :job_id="job_id"
        :numSeq="numSeq"
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
        <v-alert v-if="Boolean(errorAlert)" text type="danger">
          {{ errorAlert }}</v-alert
        >
        <!-- <base-button type="danger">
          Evaluate?
        </base-button> -->
      </div>

      <v-card
        class="pt-0 pb-3 mt-2"
        id="cdhit"
        v-intersect.quiet="handleIntersect"
      >
        <v-card-title primary-title>
          <h2 class="col-md-9">
            CDHIT-reduced Fasta Sequences
          </h2>
        </v-card-title>
      </v-card>
      <v-card
        class="pt-0 pb-3 mt-2"
        id="content-result"
        v-intersect.quiet="handleIntersect"
      >
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
      <v-card
        id="res_topo"
        class="p-2 mt-2"
        v-intersect.quiet="handleIntersect"
      >
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
      isConnected: false,
      errorAlert: null,
      handleIntersect: {
        handler: this.onIntersect,
        options: {
          threshold: 0.75,
          rootMargin: "0px 0px -200px 0px",
        },
      },
      topologies: [],
      job_status: "",
      job_id: "---",
      job_url: "",
      numSeq: 0,
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
  created() {},
  mounted() {
    this.fetchData();
    this.job_id = this.$route.params.id;
    this.job_url = this.$route.path;
  },
  methods: {
    onIntersect(entries, observer) {
      this.$nextTick(() => {
        // More information about these options
        // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
        this.isIntersecting = entries[0].isIntersecting;
        let elem = entries[0].target;
        const newpath = this.$route.path + "#" + elem.id;

        if (this.isIntersecting)
          this.$router
            .push({
              name: "pred-results",
              hash: "#" + elem.id,
              params: { preventScroll: true },
            })
            .catch((err) => {});
      });
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
    handlePredResults(responseData) {
      console.log("Received GET response");
      this.percent =
        (responseData.data["current"] * 100) / responseData.data["total"];
      this.progress_value = this.percent;
      this.job_status =
        "Prediction Job: " +
        (responseData.data["state"] || responseData.data["status"]);
      this.dateDone = responseData.data["date_done"];
      if (responseData.data["state"] == "SUCCESS") {
        if ("result" in responseData.data) {
          this.fetchPredictionResults(responseData.data["result"]);
        }
      } else {
        setTimeout(() => {
          this.getLongTask(this.job_id);
        }, 10000);
      }
    },
    getLongTask(task_id) {
      $backend
        .getPredResults(task_id)
        .then(this.handlePredResults)
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) {
              this.$router.push({ name: "notFound" });
            }
            this.errorAlert = error.response.data.message;
          }
        });
    },
    //prediction_res -> a dict containing the results of the prediction
    fetchPredictionResults(prediction_res) {
      this.results = prediction_res;
      let sequences = this.results[0].parsed_res;

      for (let i = 0; i < sequences.length; i++) {
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
      this.setSelectedMethod(0);
    },
    setSelectedMethod(index) {
      this.selectedMethod = this.predictionMethods[index];
      this.selectedMethodIndex = index;
      this.pred_tool_res = this.results[index].pred_tool_res;
      this.parsed_res = JSON.stringify(this.results[index].parsed_res, null, 2);
    },
  },
  sockets: {
    initial_progress(data) {
      console.log("received initial progress socket");

      this.total = data["total"];
      this.percent = (data["current"] * 100) / data["total"];
      this.job_status = data["status"] || data["state"];
    },
    progress(data) {

      console.log("received progress socket");
      // this.total = data["total"];
      // this.percent = this.percent + 1 / data["total"];
      this.job_status = data["status"];

      // this.status = data['status'];
    },
  },
};
</script>
<style scoped>
#res_topo {
  height: 480px;
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
