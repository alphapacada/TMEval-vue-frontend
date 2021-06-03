<template>
  <section
    id="predict_sequences"
    class="pt-5 bg-gradient-success section section-lg pt-0"
  >
    <v-snackbar v-model="snackbar" :timeout="snackbarTimeout" :top="true">
      {{ snackbarText }}
      <v-icon class="pl-1" color="green" @click="snackbar = false"
        >highlight_off</v-icon
      >
    </v-snackbar>

    <div class="container">
      <card no-body shadow-size="lg" class="border-1" headerClasses>
        <div class="p-5">
          <h5 class>Submit a fasta sequence for TM Topology Prediction.</h5>
          <p class="mt-3">
            Enter ONE fasta sequence in the textarea below or upload a fasta
            file then select the tools you want use for the prediction. Click
            'SUBMIT' to start prediction job.
          </p>
          <div class="row">
            <div class="col-md-8 py-3 mr-2 border rounded">
              <form id="form_id" @submit="checkForm" method="post">
                <div class="form-group">
                  <label for>Fasta sequence</label>
                  <textarea
                    :disabled="Boolean(file)"
                    :class="{ 'is-invalid': errorSequence }"
                    class="form-control"
                    id="Textarea1"
                    rows="5"
                    v-model="sequence"
                    placeholder="Enter an amino-acid sequence"
                  ></textarea>
                </div>

                <!-- <b-form-group label="Small:" label-for="file-small" label-cols-sm="2" label-size="sm">
    <b-form-file id="file-small" size="lg"></b-form-file>
  </b-form-group> -->
                <b-form-group>
                  <label for>Alternatively, upload a fasta file.</label>
                  <div class="row">
                    <div class="col">
                      <b-form-file
                        class="col"
                        id="fasta-file-input"
                        size="lg"
                        :disabled="Boolean(sequence)"
                        v-model="file"
                        accept=".fasta,.faa"
                        :state="file == null ? null : Boolean(file)"
                        placeholder="Choose a file..."
                        drop-placeholder="Drop file here..."
                      >
                        <template slot="file-name" slot-scope="{ names }">
                          <badge type="default"> {{ names[0] }}</badge>
                          <badge
                            type="default"
                            v-if="names.length > 1"
                            class="ml-1"
                          >
                            + {{ names.length - 1 }} More files
                          </badge>
                        </template>
                      </b-form-file>
                    </div>
                    <span v-if="file" class="pl-0 col-lg-1 float-right my-auto"
                      ><badge
                        class="w-100"
                        icon="fa fa-times"
                        type="danger"
                        @click="file = null"
                      >
                      </badge
                    ></span>
                  </div>
                </b-form-group>

                <!-- :file-name-formatter="formatNames" -->
                <!-- <base-alert type="danger" v-if="errorAlert" >
                  {{ errorAlert }}
                </base-alert>
                <div class="form-group"> -->

                <label for>PSSM</label>
                <div class="row">
                  <div class="col">
                    <b-form-file
                      :disabled="!pssm_tools_used"
                      v-model="pssmFiles"
                      accept=".pssm"
                      multiple
                      :state="
                        !pssm_tools_used ? null : Boolean(pssmFiles.length)
                      "
                      placeholder="Upload PSSM files"
                      drop-placeholder="Drop file here..."
                    >
                      <template slot="file-name" slot-scope="{ names }">
                        <badge type="default"> {{ names[0] }}</badge>
                        <badge
                          type="default"
                          v-if="names.length > 1"
                          class="ml-1"
                        >
                          + {{ names.length - 1 }} More files
                        </badge>
                        <!-- <icon  v-bind="$attrs" name="fa fa-times"></icon> -->
                      </template>
                      <badge icon="fa fa-times" @click.native="pssmFiles = []">
                      </badge>
                    </b-form-file>
                  </div>
                  <span
                    v-if="pssmFiles.length > 0"
                    class="pl-0 col-lg-1 float-right my-auto"
                    ><badge
                      class="w-100"
                      icon="fa fa-times"
                      type="danger"
                      @click="pssmFiles = []"
                    >
                    </badge
                  ></span>
                </div>
                <!-- <span>{{this.pssmFiles}}</span> -->
                <!-- <span>Nananana{{ pssm_tools_my-autoused }}</span> -->

                <!-- <div class="mt-3">Selected file(s):

                                            <span :key=pssmfile.id v-for="pssmfile in pssmFile">{{ pssmfile.name }}</span></div> -->
                <!-- </div> -->
                <div class="form-group ml-4">
                  <base-checkbox
                    v-if="pssm_tools_used"
                    v-model="use_cached_pssm"
                    >Use cached pssm if available</base-checkbox
                  >
                  <v-card v-if="pssmBois" class="mt-3" max-width="100%" tile>
                    <v-list-item v-for="(item, key) in pssmBois" :key="key">
                      <v-list-item-title>{{ key }}</v-list-item-title>
                      <v-list-item-icon>
                        <v-icon v-if="item" class="vicon-green" right>
                          fa-check
                        </v-icon>
                        <v-icon v-if="!item" class="vicon-red" right>
                          fa-exclamation-triangle
                        </v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-card>
                </div>

                <div class="form-group">
                  <base-checkbox v-model="use_cdhit"
                    >Remove redundancies using CDHIT</base-checkbox
                  >
                </div>

                <div
                  class="text-danger invalid-feedback"
                  style="display: block;"
                  v-show="errorSequence"
                >
                  {{ errorSequence }}
                </div>
                <base-button
                  class="col-sm-3"
                  type="primary"
                  v-on:click="checkForm"
                  >Submit</base-button
                >
                <base-button size="sm" v-on:click="setExample" type="secondary"
                  >Example</base-button
                >
                <base-button size="sm" @click="clearForm" type="secondary"
                  >Clear</base-button
                >
              </form>
            </div>
            <div class="col-md-3 py-3 mx-auto border rounded">
              <label for>
                <h5 class>Select methods to use for prediction.</h5>
              </label>
              <div>
                <base-checkbox
                  v-model="predictionMethodToggles[index]"
                  :key="method.id"
                  v-for="(method, index) in predictionMethods"
                >
                  <span class="toggle-text">{{ method.name }}</span>
                </base-checkbox>
                <div
                  class="text-danger invalid-feedback"
                  style="display: block;"
                  v-show="errorToggle"
                >
                  {{ errorToggle }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </card>
    </div>
  </section>
</template>
<script>
import { BFormFile, BFormGroup } from "bootstrap-vue";
// "bootstrap-vue/esm/components/form-file/form-file";
import ToolsToggler from "@/views/components/ToolsToggler";
import $backend from "@/api";
export default {
  data() {
    return {
      errorAlert: null,
      snackbar: false,
      file: null,
      use_cached_pssm: false,
      use_cdhit: false,
      pssmBois: {},
      pssmFiles: [],
      predictionMethods: [],
      predictionMethodToggles: [],
      checkedMethods: [],
      fastaArr: [],
      errorSequence: "",
      errorToggle: "",
      usecctop: true,
      message: null,
      fasta: null,
      sequence: "",
      snackbarTimeout: -1,
      snackbarText: "",
      example:
        ">Q9CQZ5 NADH dehydrogenase [ubiquinone] 1 alpha subcomplex subunit 6\nMAAAATGLRQAAAAAASTSVKPIFSRDLNEAKRRVRELYRAWYREVPNTVHLMQLDITVKQGRDKVREMFMKNAHVTDPRVVDLLVIKGKMELQETIKVWKQRTHVMRFFHETETPRPKDFLSKFYMGHDP\n>P60033 CD81 antigen\nMGVEGCTKCIKYLLFVFNFVFWLAGGVILGVALWLRHDPQTTNLLYLELGDKPAPNTFYVGIYILIAVGAVMMFVGFLGCYGAIQESQCLLGTFFTCLVILFACEVAAGIWGFVNKDQIAKDVKQFYDQALQQAVVDDDANNAKAVVKTFHETLDCCGSSTLTALTTSVLKNNLCPSGSNIISNLFKEDCHQKIDDLFSGKLYLIGIAAIVVAVIMIFEMILSMVLCCGIRNSSVY",
      fakeApiResults: [
        { id: "0", name: "CCTOP" },
        { id: "1", name: "HMMTOP" },
        { id: "2", name: "Philius" },
        { id: "3", name: "Topcons" },
        { id: "5", name: "TMHMM" },
        { id: "7", name: "TMSEG" },
      ],
    };
  },
  components: {
    ToolsToggler,
    "b-form-file": BFormFile,
    "b-form-group": BFormGroup,
  },
  methods: {
    formatNames(files) {
      return files.length === 1
        ? files[0].name
        : `${files.length} files selected`;
    },
    previewFiles: function() {
      console.log(this.file);
    },
    test() {
      ToolsToggler.test();
    },
    checkForm(e) {
      e.preventDefault();

      let checkResults = [this.checkSequence(), this.checkToggles()];
      if (!checkResults.includes(false)) {
        console.log("correct form");
        this.submitForm();
      } else {
        this.snackbarTimeout = 5000;
        this.snackbar = true;
        this.snackbarText = "Invalid input. Please check the forms.";
      }
    },
    setExample() {
      this.sequence = this.example;
      this.file = null;
    },
    checkSequence() {
      if (!this.sequence && !Boolean(this.file)) {
        console.log("Empty textarea");
        this.errorSequence = "Please enter a sequence or upload a file.";
      } else if (this.sequence && Boolean(this.file)) {
        console.log("This shouldnt be reached.");
        this.errorSequence = "Please input either a sequence or a file only.";
      } else {
        if (this.sequence) {
          this.errorSequence = "";

          let fastas = this.sequence.split(/(?=>)/);
          if (fastas.length > 10) {
            this.errorSequence =
              "Max of 10 FASTA sequences only per submission.";
            return false;
          }
          // for (let i = 0; i < fastas.length; i++) {
          fastas.forEach((element) => {
            // immediately remove trailing spaces
            element = element.trim();
            if (!this.validateFasta(element)) {
              this.errorSequence = "Invalid fasta sequence!";
              return false;
            } else {
              this.fastaArr.push(element);
            }
          });
        }
        if (!Boolean(this.file)) {
          return true;
        }
      }
      return true;
    },
    checkToggles() {
      if (this.predictionMethodToggles.includes(true)) {
        this.errorToggle = "";
        return true;
      } else {
        this.errorToggle = "Please select at least 1 prediction method.";
        return false;
      }
    },
    validateFasta(fasta) {
      if (!fasta) {
        // check there is something first of all
        return false;
      }

      // split on newlines...
      let lines = fasta.split("\n");

      // check for header
      if (fasta[0] == ">") {
        // remove one line, starting at the first position
        lines.splice(0, 1);
      } else {
        return false;
      }

      // join the array back into a single string without newlines and
      // trailing or leading spaces
      fasta = lines.join("").trim();

      if (!fasta) {
        return false;
      }

      return /^[GALMFWKQESPVICYHRNDT\s]{1,20000}$/i.test(fasta);
    },
    submitForm() {
      this.errorAlert = null;
      let predictionData = [];
      let data;
      let i;
      for (i = 0; i < this.predictionMethodToggles.length; i++) {
        if (this.predictionMethodToggles[i]) {
          predictionData.push(this.predictionMethods[i].name);
        }
      }
      console.log(predictionData);
      let evaluationData = {
        file: this.file,
        sequence: this.sequence,
        tools: predictionData,
      };
      let formData = new FormData();
      formData.append("file", this.file);
      //   pssm files
      for (let file of this.pssmFiles) {
        formData.append("pssm_files", file, file.name); // note, no square-brackets
      }
      formData.append("sequence", this.sequence);
      formData.append("tools", JSON.stringify(predictionData));
      formData.append("cdhit", this.use_cdhit);
      console.log("cdhit" + this.use_cdhit);
      $backend
        .postFasta(formData)
        .then((responseData) => {
          console.log(responseData["task_id"]);
          this.$store.commit("update_stats");

          this.$router.push({
            path: `/prediction/${responseData["task_id"]}`,
          });
        })
        .catch((error) => {
          if (error.response) {
            this.errorAlert = error.response.data.message;

            this.pssmBois = error.response.data.pssm;
            this.snackbar = true;
            this.snackbarTimeout = 0;
            this.snackbarText = error.response.data.message;
          }
        });
      console.log("Form submitted!");
    },
    clearForm() {
      this.sequence = "";
      this.errorSequence = "";
      this.errorToggle = "";
      this.file = null;
      this.pssmFiles = [];
      let i;
      for (i = 0; i < this.predictionMethods.length; i++) {
        this.predictionMethodToggles[i] = true;
      }
    },
    removeFile() {
      this.file = null;
    },
    clearSequence() {
      this.sequence = "";
    },
    getTools() {
      console.log("Retrieving tools.");
      $backend
        .getPredTools()
        .then((responseData) => {
          this.predictionMethods = responseData.data;
        })
        .catch((error) => {
          // handle error
          this.snackbar = true;
          this.snackbarTimeout = 0;
          this.snackbarText = "Cannot connect to server.";
          // console.log("error bui");
          //   this.predictionMethods = this.fakeApiResults;
        });
    },
  },
  mounted() {
    // get tools from database
    this.getTools();

    // console.log(
    //   this.predictionMethodToggles.map(function(idx) {
    //     return str.length > 0;
    //   })
    // );
    let i;
    for (i = 0; i < this.predictionMethods.length; i++) {
      this.predictionMethodToggles[i] = true;
    }
  },
  computed: {
    pssm_tools_used: {
      get: function() {
        let x = this.predictionMethodToggles[
          this.predictionMethods
            .map(function(e) {
              return e.name;
            })
            .indexOf("tmseg")
        ];
        // console.log("x")
        // console.log(x)
        return x;
        // console.log(this.predictionMethods.some(e => e.name == 'tmseg'))
        // return this.predictionMethodToggles.some(e => e.name == 'tmseg')
      },
    },
  },
};
</script>
<style>
.toggle-text {
  font-size: 1rem;
}
.vicon-green {
  color: green !important;
}
.vicon-red {
  color: red !important;
}
</style>
