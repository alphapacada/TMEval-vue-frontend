<template>
  <div id="topdiv">
    <v-app>
      <v-dialog v-model="modalOn" width="700">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Topology
          </v-card-title>

          <v-card-text class="pt-3" style="word-wrap:break-word">
            {{ modalText }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="modalOn = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card id="filter-card">
        <div class="row">
          <div class="col">
            <v-card-title primary-title class="mb-0 pb-0">
              <h2 class="mb-0 pb-0">Filters</h2>
            </v-card-title>
          </div>
        </div>
        <!-- <div class="row">
          <div class="col"> -->
        <v-card-subtitle>
          Use options below to narrow down results then click "Apply" at the
          lower left.
        </v-card-subtitle>
        <!-- </div>
        </div> -->
        <v-card-text>
          <div id="parameter-container">
            <v-row no-gutters class="align-items-center">
              <!-- <v-col> -->
              <v-btn left outlined @click="clickFilter = !clickFilter" icon>
                <v-icon>fa fa-filter</v-icon>
              </v-btn>
              <!-- <v-spacer></v-spacer> -->
              <v-chip-group class="ml-2" active-class="primary--text" column>
                <v-chip v-for="(tag, name) in activeParameters" :key="tag">
                  {{ getChipVal(name, tag) }}
                </v-chip>
              </v-chip-group>
              <!-- </v-col> -->
            </v-row>
            <div v-if="clickFilter" class="container">
              <v-card outlined>
                <v-card-title>Additional Filters</v-card-title>
                <v-card-text>
                  <v-row>
                    <div class="col">
                      <!-- <v-row> -->
                      <div class="py-2">
                        <span>
                          Transmembrane:
                          <base-dropdown>
                            <base-button
                              slot="title"
                              type="default"
                              outline
                              size="sm"
                              class="dropdown-toggle"
                            >
                              {{ selectedChoice("Transmembrane") }}
                            </base-button>
                            <li
                              style="cursor:pointer"
                              @click="setParameter('Transmembrane', index)"
                              class="dropdown-item"
                              :key="'tm-' + index"
                              v-for="(choice, index) in parameterChoices[
                                'Transmembrane'
                              ].choices"
                            >
                              {{ choice.text }}
                            </li>
                          </base-dropdown>
                        </span>
                      </div>
                      <!-- </v-row> -->
                      <div class="py-2">
                        Signal Peptide:
                        <base-dropdown>
                          <base-button
                            slot="title"
                            type="default"
                            outline
                            size="sm"
                            class="dropdown-toggle"
                          >
                            {{ selectedChoice("Signal Peptide") }}
                          </base-button>
                          <li
                            style="cursor:pointer"
                            @click="setParameter('Signal Peptide', index)"
                            class="dropdown-item"
                            :key="'sp-' + index"
                            v-for="(choice, index) in parameterChoices[
                              'Signal Peptide'
                            ].choices"
                          >
                            {{ choice.text }}
                          </li>
                        </base-dropdown>
                      </div>
                      <div class="py-2">
                        Taxonomy:
                        <base-dropdown disabled="!parameters.tx">
                          <base-button
                            type="default"
                            outline
                            size="sm"
                            slot="title"
                            class="dropdown-toggle"
                          >
                            {{ selectedChoice("Taxonomy") }}
                          </base-button>
                          <li
                            style="cursor:pointer"
                            @click="setParameter('Taxonomy', index)"
                            class="dropdown-item"
                            :key="choice.value"
                            v-for="(choice, index) in parameterChoices[
                              'Taxonomy'
                            ].choices"
                          >
                            {{ choice.text }}
                          </li>
                        </base-dropdown>
                      </div>
                      <div class="py-2">
                        Sequence Identity:
                        <base-dropdown>
                          <base-button
                            slot="title"
                            type="default"
                            outline
                            size="sm"
                            class="dropdown-toggle"
                          >
                            {{ selectedChoice("Sequence Identity") }}
                          </base-button>
                          <li
                            style="cursor:pointer"
                            @click="setParameter('Sequence Identity', index)"
                            class="dropdown-item"
                            :key="choice.value"
                            v-for="(choice, index) in parameterChoices[
                              'Sequence Identity'
                            ].choices"
                          >
                            {{ choice.text }}
                          </li>
                        </base-dropdown>
                      </div>
                    </div>
                    <div class="col">
                      <div class="py-2">
                        # of TM Helices:
                        <base-dropdown disabled="!parameters.tm">
                          <base-button
                            slot="title"
                            type="default"
                            outline
                            size="sm"
                            class="dropdown-toggle"
                          >
                            {{ selectedChoice("# of TM Helices") }}
                          </base-button>
                          <li
                            style="cursor:pointer"
                            @click="setParameter('# of TM Helices', index)"
                            class="dropdown-item"
                            :key="choice.value"
                            v-for="(choice, index) in parameterChoices[
                              '# of TM Helices'
                            ].choices"
                          >
                            {{ choice.text }}
                          </li>
                        </base-dropdown>
                      </div>
                      <div class="py-2">
                        Topology Type:
                        <base-dropdown disabled="!parameters.tm">
                          <base-button
                            slot="title"
                            type="default"
                            outline
                            size="sm"
                            class="dropdown-toggle"
                          >
                            {{ selectedChoice("Topology Type") }}
                          </base-button>
                          <li
                            style="cursor:pointer"
                            @click="setParameter('Topology Type', index)"
                            class="dropdown-item"
                            :key="choice.value"
                            v-for="(choice, index) in parameterChoices[
                              'Topology Type'
                            ].choices"
                          >
                            {{ choice.text }}
                          </li>
                        </base-dropdown>
                      </div>
                    </div>
                  </v-row>
                </v-card-text>
              </v-card>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="error"
            style="font-weight:bold"
            @click="sendParameters"
            >APPLY</v-btn
          >
          <v-btn
            text
            color="success"
            style="font-weight:bold"
            @click="resetParameters"
            >RESET</v-btn
          >
        </v-card-actions>
      </v-card>

      <v-card class="mt-4">
        <v-card-title primary-title class="align-middle">
          <h2 class="pb-0 mb-0">
            TMEval Protein Entries
          </h2>
          <v-spacer></v-spacer>
          <v-text-field
            class="align-middle pt-0"
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-btn @click="appliedSearch = search">
            Search
          </v-btn>
          <v-btn readonly class="ma-2" tile outlined color="red">
            Evaluate
            <!-- <v-icon right>fa-cloud-download</v-icon> -->
          </v-btn>
          <v-btn @click="download" class="ma-2" tile outlined color="success">
            Download
            <v-icon right>fa-cloud-download</v-icon>
          </v-btn>
          <a style="display:none" ref="download"></a>
        </v-card-title>
        <!--    -->
        <v-data-table
          :headers="mainHeaders"
          :items="mainItems"
          :loading="loadInProgress"
          :no-data-text="tableText"
          item-key="name"
          sort_by="[]"
          :items-per-page="itemPerPage"
          :search="appliedSearch"
          class="elevation-1"
        >
          <template v-slot:item="{ item }">
            <tr @click="item.expanded = !item.expanded">
              <td class="text-xs">{{ item.name }}</td>
              <td class="text-xs">{{ item.length }}</td>
              <td class="text-xs">{{ item.organism }}</td>
              <td class="text-xs">{{ item.orientation }}</td>
              <td class="text-xs">{{ item.taxonomy }}</td>
              <td class="text-xs">{{ item.tm }}</td>
              <td class="text-xs">{{ item.sp }}</td>
              <td class="text-xs">
                <v-btn
                  depressed
                  color="success"
                  @click="showTopology(item.topology)"
                  >Show</v-btn
                >
              </td>
              <td class="text-xs">{{ item.topo_type }}</td>
              <td class="text-xs">{{ item.count }}</td>
            </tr>
          </template>
          <!-- <template slot="expand" slot-scope="props">
    <v-card class="elevation-10">
      <v-card-text>

        <v-data-table :headers="subHeaders"
                      :items="subItems"
                      item-key="color"
                      hide-actions
                      class="elevation-10">
          <template slot="items" slot-scope="props">
            <td class="text-xs">{{ props.item.color }}</td>
            <td class="text-xs">{{ props.item.value }}</td>
          </template>
        </v-data-table>

      </v-card-text>
    </v-card>
  </template> -->
          <template v-slot:footer>
            <td :colspan="12">
              TM-Transmembrane,<span class="tab"></span>SP - Signal Peptide
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-app>
  </div>
</template>
<script>
import $backend from "../api";
import _ from "lodash";
const LOADING_MSG = "Download in progress...";
export default {
  data() {
    return {
      clickFilter: false,
      appliedSearch: "",
      modalOn: false,
      modalText: "",
      pageNumber: 0,
      itemPerPage: 10,
      tableText: "",
      loadInProgress: false,
      filters: {
        tm: false,
        sp: false,
        tx: true,
      },
      origParameters: {
        tm: true,
        sp: null,
        tx: null,
        count: null,
        topo_type: null,
        reduced: 25,
      },
      param_mapping: {
        Transmembrane: "tm",
        "Signal Peptide": "sp",
        Taxonomy: "tx",
        "Sequence Identity": "reduced",
        "# of TM Helices": "count",
        "Topology Type": "topo_type",
      },
      search: "",
      mainHeaders: [
        { text: "Protein Name", value: "name" },
        { text: "Length", value: "length" },
        { text: "Organism", value: "organism" },
        { text: "Orientation", value: "orientation" },
        { text: "Taxonomy", value: "taxonomy" },
        { text: "TM", value: "tm" },
        { text: "SP", value: "sp" },
        { text: "Topology", value: "topology" },
        { text: "Topology Type", value: "topo_type" },
        { text: "TM Count", value: "count" },
      ],
      rows: [10],
      mainItems: [],
      defaultParams: [],
      origParameterChoices: {
        Transmembrane: {
          selected: 1,
          choices: [
            { text: "ALL", value: null },
            { text: "TRUE", value: true },
            { text: "FALSE", value: false },
          ],
        },
        "Signal Peptide": {
          selected: 0,
          choices: [
            { text: "ALL", value: null },
            { text: "TRUE", value: true },
            { text: "FALSE", value: false },
          ],
        },
        Taxonomy: {
          selected: 0,
          choices: [
            { text: "ALL", value: null },
            { text: "BACTERIA", value: "Bacteria" },
            { text: "VIRUSES", value: "Viruses" },
            { text: "ARCHAEA", value: "Archaea" },
            { text: "EUKARYOTES", value: "Eukaryotes" },
          ],
        },
        "# of TM Helices": {
          selected: 0,
          choices: [
            { text: "ANY", value: "" },
            { text: "1", value: "1" },
            { text: "2", value: "2" },
            { text: "3", value: "3" },
            { text: "4", value: "4" },
            { text: "5", value: "5" },
            { text: "6", value: "6" },
            { text: "7", value: "7" },
            { text: "8", value: "8" },
            { text: "9", value: "9" },
            { text: "10", value: "10" },
            { text: "11", value: "11" },
            { text: "12", value: "12" },
            { text: "13+", value: "[13 TO *]" },
          ],
        },
        "Topology Type": {
          selected: 0,
          choices: [
            { text: "ANY", value: "" },
            { text: "I", value: "type I" },
            { text: "II", value: "type II" },
            { text: "III", value: "type III" },
            { text: "IV", value: "type IV" },
          ],
        },
        "Sequence Identity": {
          selected: 0,
          choices: [
            { text: "25", value: 25 },
            { text: "30", value: 30 },
            { text: "40", value: 40 },
            { text: "70", value: 70 },
          ],
        },
      },
      parameters: {},
      parameterChoices: {},
    };
  },
  methods: {
    getChipVal(name, val) {
      let value = val;
      if (typeof val === "boolean") {
        value = val == true ? "Yes" : "No";
      }
      return name + ":" + value;
    },
    download() {
      var parameters = JSON.parse(JSON.stringify(this.parameters));
      console.log(parameters);
      this.$refs.download.href =
        $backend.getBaseURL() +
        "proteins/download?" +
        new URLSearchParams(parameters).toString();
      this.$refs.download.click();
    },
    showTopology(text) {
      this.modalOn = true;
      this.modalText = text;
    },
    loadProteins(parameters) {
      this.mainItems = [];
      this.tableText = LOADING_MSG;
      console.log("Downloading data...");
      this.loadInProgress = true;
      console.log("parameters", parameters);
      $backend
        .getProteins(parameters)
        .then((responseData) => {
          console.log("Download complete");
          console.log(responseData);
          this.tableText = "";
          this.mainItems = responseData;
          this.loadInProgress = false;
          if (this.mainItems.length == 0) this.tableText = "No matches.";
          console.log("mainitems: ", this.mainItems);
        })
        .catch((responseData) => {
          this.loadInProgress = false;
          this.tableText = "Download failed!";
          console.log("Download failed!");
        });
    },
    sendParameters() {
      var parameters = JSON.parse(JSON.stringify(this.parameters));
      this.loadProteins(parameters);
      console.log(parameters);
      console.log("Parameters sent!");
    },
    resetParameters() {
      console.log("origParameters", this.origParameterChoices);
      this.parameterChoices = _.cloneDeep(this.origParameterChoices);
      console.log("this.parameterChoices", this.parameterChoices);
      this.parameters = { ...this.origParameters };
      console.log("Parameters reset!");
      this.sendParameters();
    },
    setParameter(name, index) {
      console.log(name);
      let obj = this.parameterChoices[name];
      // this.parameters.tx = obj.choices[obj.selected].value;
      obj.selected = index;
      let param_name = this.param_mapping[name];
      console.log(param_name);
      this.parameters[param_name] = obj.choices[index].value;
    },
    selectedChoice(name) {
      console.log("Selected Choice", this.parameterChoices);
      let obj = this.parameterChoices[name];
      let idx = obj.selected;
      return obj.choices[idx].text;
    },
  },
  created() {
    this.resetParameters();
  },
  mounted() {
    // var parameters = JSON.parse(JSON.stringify(this.parameters));
    // console.log("huehue");
    // this.loadProteins(parameters);
    this.loadInProgress = true;
    this.tableText = LOADING_MSG;
  },
  computed: {
    activeParameters() {
      return _.omitBy(
        this.parameters,
        (v) => _.isUndefined(v) || _.isNull(v) || v === ""
      );
    },
  },
};
</script>
<style>
/* .dropdown .btn {
} */
.v-card__title .primary--text {
  color: #2dce89 !important;
  caret-color: #2dce89 !important;
}

.v-input + .primary--text {
  color: #2dce89 !important;
  caret-color: #2dce89 !important;
}

#filter-card {
  margin-top: 10px;
}
#filter-card > * .v-card__title {
  font-size: 1rem;
}
tfoot {
  font-weight: 500;
  font-size: 12px;
}
.tab {
  display: inline-block;
  width: 30px;
}
.custom-toggle-slider {
  border-radius: 34px !important;
}

/* @import 'vuetify/dist/vuetify.min.css' */
</style>
<style scoped>
.v-application >>> .rounded-circle {
  border-radius: 34px !important;
}
</style>

// #parameter-container > * .col span { // display: block; // padding: 0.75rem;
// /* box-shadow: antiquewhite; */ // border-radius: 0.25rem; // color:
#393f49c2; // -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 1px, // rgba(0, 0, 0,
0.1) 0 4px 4px; // }
