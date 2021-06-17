<template>
  <section class="section bg-secondary section-lg">
    <div class="container">
      <job-section
        v-intersect.quiet="handleIntersect"
        id="job_status"
        :job_id="job_id"
        :numSeq="numSeq"
        :numSeqReduced="cdhitreduced_numSeq"
        :url="job_url"
        :date="date"
        :dateDone="dateDone"
      ></job-section>
      <div id="progress">
        <base-progress
          striped
          type="success"
          :value="progress_value"
          :label="job_state"
          :label2="job_status"
        ></base-progress>
        <span></span>
      </div>
    </div>

    <!-- + PRED RES -->

    <div class="mt-4 container shape-container align-items-center">
      <div class="container">
        <v-alert v-if="Boolean(errorAlert)" text type="danger">
          {{ errorAlert }}
        </v-alert>
      </div>
      <v-card class="p-3">
        <v-card-title primary-title>Download</v-card-title>
        <v-card-text
          >Download job results and related files in a zip folder:
          <a style="display:none" ref="download"> </a>
          <a class="ml-2" href="" @click.prevent="downloadFile()">
            ({{ job_id + ".zip" }})
          </a></v-card-text
        ></v-card
      >
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
        <v-card-text class="row mx-0">
          <div class="col-6">
            <textarea
              v-model="cdhitreduced"
              class="form-control text-black col"
              rows="20"
              readonly
            ></textarea>
          </div>
        </v-card-text>
      </v-card>
      <v-card
        class="pt-0 pb-3 mt-2"
        id="content-result"
        v-intersect.quiet="handleIntersect"
      >
        <v-card-title primary-title>
          <h2 class="col-md-9">
            Prediction Results
          </h2>
          <div class="col-md-3 align-items-right">
            <div class="row">
              <base-dropdown>
                <base-button
                  slot="title"
                  type="success"
                  class="dropdown-toggle"
                >
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
              <base-dropdown>
                <base-button
                  slot="title"
                  type="success"
                  class="dropdown-toggle"
                >
                  {{ selectedSequence }}
                </base-button>
                <li
                  style="cursor:pointer"
                  @click="setSelectedSequence(index)"
                  class="dropdown-item"
                  :key="index"
                  v-for="(seq, index) in topologies"
                >
                  {{ seq.sequence.name }}
                </li>
              </base-dropdown>
            </div>
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
          <h2 class="col pl-0">Topologies</h2>
          <div class="col-md-3">
            <div class="row float-right">
              <base-button @click="setSelectedSequence(-1)" type="primary">
                View All
              </base-button>
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          <div
            class=""
            v-for="(t, seq_index) in selectedTopology"
            :key="t.index"
          >
            <div v-if="seq_index == selectedSequenceIndex">
              <h5>{{ t.sequence.name }}</h5>
              <div v-for="(res, index) in t.sequence.results" :key="res.name">
                <div v-if="index == selectedMethodIndex || viewAll == true">
                  <h6>{{ res.toolname }}</h6>

                  <topology :seq="res.annotation"></topology>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
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
      page: 1,
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
      job_state: "",
      job_status: "",
      job_id: "---",
      job_url: "",
      numSeq: 0,
      date: "",
      dateDone: "",
      progress_value: 0,
      percent: 0,
      status: "",
      result: "",
      predictionMethods: [],
      selectedTopology: [],
      selectedSequence: "Sequence",
      selectedMethod: "Method",
      selectedMethodIndex: 0,
      selectedSequenceIndex: 0,
      viewAll: false,
      pred_tool_res: "",
      parsed_res: "",
      results: [],
      sequence_topo: [],
      cdhitreduced: "",
      cdhitreduced_numSeq: 0,
    };
  },
  components: {
    JobSection,
    Topology,
  },
  created() {},
  computed: {
    get_stats() {
      return this.$store.state.job_stats.jobs[this.job_id];
    },
  },
  mounted() {
    this.job_id = this.$route.params.id;
    this.job_url = this.$route.path;
    this.fetchData();
    this.numSeq = this.get_stats.numSeq;
    this.date = Date(this.get_stats.date_submitted);
    this.dateDone = Date(this.get_stats.date_completed);

    // this.numSeq = this.get_stats.numSeq
    // this.date_submitted = this.get_stats.date_submitted
    // this.date_completed = this.get_stats.date_completed
  },
  methods: {
    // readCDHitReduced() {

    // }
    downloadFile() {
      this.$refs.download.href =
        $backend.getBaseURL() + "predict/" + this.job_id + ".zip";
      this.$refs.download.click();
    },
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
      console.log(responseData.data);
      this.percent =
        (responseData.data["current"] * 100) / responseData.data["total"];
      this.progress_value = this.percent;
      this.job_state = "Prediction Job: " + responseData.data["state"];
      // this.dateDone = responseData.data["date_done"];
      this.cdhitreduced = responseData.data["cdhit"];
      this.cdhitreduced_numSeq = responseData.data["cdhit_numSeq"];
      if (responseData.data["state"] == "SUCCESS") {
        this.numSeq = responseData.data["numSeq"];
        this.date = Date(responseData.data["date"]);
        this.dateDone = Date(responseData.data["dateDone"]);
        if ("result" in responseData.data) {
          this.fetchPredictionResults(responseData.data["result"]);
        }
      } else {
        this.numSeq = this.get_stats.numSeq;
        this.date = Date(this.get_stats.date_submitted);
        this.dateDone = Date(this.get_stats.date_completed);
        if (!responseData.data["state"] == "FAILURE") {
          setTimeout(() => {
            this.getLongTask(this.job_id);
          }, 10000);
        }
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
      let sequenceIndex = 0;
      let nextSequenceIndex = 1;
      let isFirstIteration = true;
      let isNewSequence = true;

      for (const result of this.results) {
        isNewSequence = true;

        //Add prediction tool used as the results are being processed
        if (!this.predictionMethods.includes(result["tool"]))
          this.predictionMethods.push(result["tool"]);
        if (isFirstIteration) {
          //Assign index 0 to first sequence
          this.topologies[sequenceIndex] = Object();
          this.topologies[sequenceIndex].index = sequenceIndex;
        } else {
          //If sequence already exists, get the existing index
          for (const topology of this.topologies) {
            if (topology.sequence.name == result.parsed_res.name) {
              isNewSequence = false;
              sequenceIndex = topology.index;
              break;
            }
          }
          if (isNewSequence) {
            sequenceIndex = nextSequenceIndex;
            nextSequenceIndex++;
          }
        }
        if (isNewSequence) {
          this.topologies[sequenceIndex] = Object();
          this.topologies[sequenceIndex].sequence = Object();
          this.topologies[sequenceIndex].index = sequenceIndex;
          this.topologies[sequenceIndex].sequence.name =
            result.parsed_res.name || "Protein [" + (i + 1) + "]";
          this.topologies[sequenceIndex].sequence.results = [];
          this.topologies[sequenceIndex].sequence.results.push({
            toolname: result.tool,
            annotation: result.parsed_res.topology.annotation,
            pred_res: result.pred_tool_res,
            parsed_res: result.parsed_res,
          });
        } else if (!isNewSequence) {
          //If sequence already exists, push only the prediction result
          this.topologies[sequenceIndex].sequence.results.push({
            toolname: result.tool,
            annotation: result.parsed_res.topology.annotation,
            pred_res: result.pred_tool_res,
            parsed_res: result.parsed_res,
          });
        }

        if (isFirstIteration) isFirstIteration = false;
      }
      this.setSelectedMethod(0);
      this.selectedTopology = this.topologies;
    },
    setSelectedMethod(index) {
      this.viewAll = false;
      this.selectedMethod = this.predictionMethods[index];
      this.selectedMethodIndex = index;
      this.updateResDisplay();
    },
    setSelectedSequence(index) {
      if (index < 0) {
        this.viewAll = true;
        // this.selectedSequenceIndex =
        this.selectedMethod = "Method";
        this.selectedTopology = this.topologies;
      } else {
        this.viewAll = false;
        this.selectedSequence = this.topologies[index].sequence.name;
        this.selectedSequenceIndex = index;
        // this.selectedTopology = [this.topologies[index]];
        this.updateResDisplay();
      }
    },
    updateResDisplay() {
      this.pred_tool_res = this.topologies[
        this.selectedSequenceIndex
      ].sequence.results[this.selectedMethodIndex].pred_res;
      this.parsed_res =
        JSON.stringify(
          this.topologies[this.selectedSequenceIndex].sequence.results[
            this.selectedMethodIndex
          ].parsed_res,
          null,
          2
        ) || "No Topology";
    },
  },
  sockets: {
    initial_progress(data) {
      // console.log("received initial progress socket");
      // this.total = data["total"];
      // this.percent = (data["current"] * 100) / data["total"];
      // this.job_status = data["status"] || data["state"];
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
  min-height: 480px;
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
