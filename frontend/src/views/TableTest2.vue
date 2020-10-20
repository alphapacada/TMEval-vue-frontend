<template>
  <div id="topdiv">
    <v-app>
      <v-dialog v-model="modalOn" width="700">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Topology
          </v-card-title>

          <v-card-text style="word-wrap:break-word">
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

        <div id="parameter-container" class="container">
          <div class="row">
            <v-card outlined>
              <v-card-title>Filters</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item
                    ><v-checkbox
                      indeterminate
                      v-model="filters.tm"
                      label="Transmembrane"
                    ></v-checkbox
                  ></v-list-item>
                  <v-list-item
                    ><v-checkbox
                      indeterminate
                      v-model="filters.sp"
                      label="Signal Peptide"
                    ></v-checkbox
                  ></v-list-item>
                  <v-list-item
                    ><v-checkbox
                      v-model="filters.tx"
                      label="Taxonomy"
                    ></v-checkbox
                  ></v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
            <div class="col-4">
              <span>
                <!-- <label>Transmembrane:</label> -->
                <v-switch
                  :disabled="!filters.tm"
                  label="Transmembrane"
                  inset
                  v-model="parameters.tm"
                ></v-switch>
                <v-switch
                  :disabled="!filters.sp"
                  label="Signal Peptide"
                  inset
                  v-model="parameters.sp"
                ></v-switch>

                <!-- <v-checkbox value indeterminate></v-checkbox> -->

                <!-- <bas-dropdown>
                  <base-button
                    outline
                    block
                    slot="title"
                    class="dropdown-toggle"
                  >
                    {{ selectedParameter1Text }}
                  </base-button>
                  <li
                    style="cursor:pointer"
                    @click="setParameter1(index)"
                    class="dropdown-item"
                    :key="choice.value"
                    v-for="(choice, index) in parameter1Choices"
                  >
                    {{ choice.text }}
                  </li>
                </base-dropdown> -->
              </span>
            </div>
            <div class="col">
              <span>
                Signal Peptide:
                <base-dropdown>
                  <base-button
                    slot="title"
                    type="secondary"
                    class="dropdown-toggle"
                  >
                    {{ selectedParameter2Text }}
                  </base-button>
                  <li
                    style="cursor:pointer"
                    @click="setParameter2(index)"
                    class="dropdown-item"
                    :key="choice.value"
                    v-for="(choice, index) in parameter2Choices"
                  >
                    {{ choice.text }}
                  </li>
                </base-dropdown>
              </span>
            </div>
            <div class="col">
              <span>
                Taxonomy:
                <base-dropdown disabled="!parameters.tx">
                  <base-button slot="title" class="dropdown-toggle">
                    {{ selectedParameter3Text }}
                  </base-button>
                  <li
                    style="cursor:pointer"
                    @click="setParameter3(index)"
                    class="dropdown-item"
                    :key="choice.value"
                    v-for="(choice, index) in parameter3Choices"
                  >
                    {{ choice.text }}
                  </li>
                </base-dropdown>
              </span>
            </div>
            <div class="col">
              <span>
                # of TM Helices:
                <base-dropdown disabled="!parameters.tm">
                  <base-button
                    slot="title"
                    type="secondary"
                    class="dropdown-toggle"
                  >
                    {{ selectedParameter4Text }}
                  </base-button>
                  <li
                    style="cursor:pointer"
                    @click="setParameter4(index)"
                    class="dropdown-item"
                    :key="choice.value"
                    v-for="(choice, index) in parameter4Choices"
                  >
                    {{ choice.text }}
                  </li>
                </base-dropdown></span
              >
            </div>
          </div>
        </div>
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

      <!-- <v-card id="filter-card">
        <div class="row">
          <div class="col">
            <v-card-title primary-title class="mb-0 pb-0">
              <h2 class="mb-0 pb-0">Filters</h2>
            </v-card-title>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <v-card-subtitle>
              Use options below to narrow down results then click "Apply" at the
              lower left.
            </v-card-subtitle>
          </div>
        </div>

        <div id="parameter-container" class="container">
          <div class="row">
            <div class="col-sm-4">
              Transmembrane:
              <base-dropdown>
                <base-button
                  slot="title"
                  type="secondary"
                  class="dropdown-toggle"
                >
                  {{ selectedParameter1Text }}
                </base-button>
                <li
                  style="cursor:pointer"
                  @click="setParameter1(index)"
                  class="dropdown-item"
                  :key="choice.value"
                  v-for="(choice, index) in parameter1Choices"
                >
                  {{ choice.text }}
                </li>
              </base-dropdown>
            </div>
            <div class="col-sm-4">
              Signal Peptide:
              <base-dropdown>
                <base-button
                  slot="title"
                  type="secondary"
                  class="dropdown-toggle"
                >
                  {{ selectedParameter2Text }}
                </base-button>
                <li
                  style="cursor:pointer"
                  @click="setParameter2(index)"
                  class="dropdown-item"
                  :key="choice.value"
                  v-for="(choice, index) in parameter2Choices"
                >
                  {{ choice.text }}
                </li>
              </base-dropdown>
            </div>
            <div class="col-sm-4">
              Taxonomy:
              <base-dropdown>
                <base-button
                  slot="title"
                  type="secondary"
                  class="dropdown-toggle"
                >
                  {{ selectedParameter3Text }}
                </base-button>
                <li
                  style="cursor:pointer"
                  @click="setParameter3(index)"
                  class="dropdown-item"
                  :key="choice.value"
                  v-for="(choice, index) in parameter3Choices"
                >
                  {{ choice.text }}
                </li>
              </base-dropdown>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              # of TM Helices:
              <base-dropdown>
                <base-button
                  slot="title"
                  type="secondary"
                  class="dropdown-toggle"
                >
                  {{ selectedParameter4Text }}
                </base-button>
                <li
                  style="cursor:pointer"
                  @click="setParameter4(index)"
                  class="dropdown-item"
                  :key="choice.value"
                  v-for="(choice, index) in parameter4Choices"
                >
                  {{ choice.text }}
                </li>
              </base-dropdown>
            </div>
            <div class="col-sm-4">
              Topology Type:
              <base-dropdown>
                <base-button
                  slot="title"
                  type="secondary"
                  class="dropdown-toggle"
                >
                  {{ selectedParameter5Text }}
                </base-button>
                <li
                  style="cursor:pointer"
                  @click="setParameter5(index)"
                  class="dropdown-item"
                  :key="choice.value"
                  v-for="(choice, index) in parameter5Choices"
                >
                  {{ choice.text }}
                </li>
              </base-dropdown>
            </div>
            <div class="col-sm-4">
              Sequence Identity:
              <base-dropdown>
                <base-button
                  slot="title"
                  type="secondary"
                  class="dropdown-toggle"
                >
                  {{ selectedParameter6Text }}
                </base-button>
                <li
                  style="cursor:pointer"
                  @click="setParameter6(index)"
                  class="dropdown-item"
                  :key="choice.value"
                  v-for="(choice, index) in parameter6Choices"
                >
                  {{ choice.text }}
                </li>
              </base-dropdown>
            </div>
          </div>
        </div>
        <v-card-actions>
          <v-btn
            text
            color="red"
            style="font-weight:bold"
            @click="sendParameters"
            >APPLY</v-btn
          >
          <v-btn
            text
            color="error"
            style="font-weight:bold"
            @click="resetParameters"
            >RESET</v-btn
          >
        </v-card-actions>
      </v-card> -->
      -->
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
          <v-btn @click="download" class="ma-2" tile outlined color="success">
            Download
            <v-icon right>fa-cloud-download</v-icon>
          </v-btn>
          <a style="display:none" ref="download"></a>
        </v-card-title>
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
          <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
              <td class="text-xs">{{ props.item.name }}</td>
              <td class="text-xs">{{ props.item.length }}</td>
              <td class="text-xs">{{ props.item.organism }}</td>
              <td class="text-xs">{{ props.item.orientation }}</td>
              <td class="text-xs">{{ props.item.taxonomy }}</td>
              <td class="text-xs">{{ props.item.tm }}</td>
              <td class="text-xs">{{ props.item.sp }}</td>
              <td class="text-xs">
                <base-button @click="showTopology(props.item.topology)"
                  >Show</base-button
                >
              </td>
              <td class="text-xs">{{ props.item.topo_type }}</td>
              <td class="text-xs">{{ props.item.count }}</td>
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
              TM-Transmembrane,<span class="tab"></span>SP-Signal Peptide
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-app>
  </div>
</template>
<script>
import $backend from "../api";
const LOADING_MSG = "Download in progress...";
export default {
  data() {
    return {
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
      parameters: {
        tm: "",
        sp: "",
        tx: "",
        count: "",
        topo_type: "",
        reduced: 30,
      },
      selectedParameter1Text: "ALL",
      selectedParameter2Text: "ALL",
      selectedParameter3Text: "ALL",
      selectedParameter4Text: "ANY",
      selectedParameter5Text: "ANY",
      selectedParameter6Text: "30",
      parameter1Choices: [
        { text: "ALL", value: "" },
        { text: "TRUE", value: true },
        { text: "FALSE", value: false },
      ],
      parameter2Choices: [
        { text: "ALL", value: "" },
        { text: "TRUE", value: true },
        { text: "FALSE", value: false },
      ],
      parameter3Choices: [
        { text: "ALL", value: "" },
        { text: "BACTERIA", value: "Bacteria" },
        { text: "VIRUSES", value: "Viruses" },
        { text: "ARCHAEA", value: "Archaea" },
        { text: "EUKARYOTES", value: "Eukaryotes" },
      ],
      parameter4Choices: [
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
      parameter5Choices: [
        { text: "ANY", value: "" },
        { text: "I", value: "type I" },
        { text: "II", value: "type II" },
        { text: "III", value: "type III" },
        { text: "IV", value: "type IV" },
      ],
      parameter6Choices: [
        { text: "25", value: 25 },
        { text: "30", value: 30 },
        { text: "40", value: 40 },
        { text: "70", value: 70 },
      ],
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
    };
  },
  methods: {
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
      console.log(parameters);
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
      this.setParameter1(0);
      this.setParameter2(0);
      this.setParameter3(0);
      this.setParameter4(0);
      this.setParameter5(0);
      this.setParameter6(1);
      console.log("Parameters reset!");
      this.sendParameters();
    },
    setParameter1(index) {
      console.log(this.parameter1Choices[index].value, this.parameters.tm);
      if (this.parameter1Choices[index].value !== this.parameters.tm) {
        this.selectedParameter1Text = this.parameter1Choices[index].text;
        this.parameters.tm = this.parameter1Choices[index].value;

        if (this.parameters.tm === false) {
          this.parameters.sp = "";
          this.parameter5Choices = [{ text: "---", value: "" }];
          this.selectedParameter5Text = "---";
          this.parameters.topo_type = "";
        } else {
          this.parameter5Choices = [
            { text: "ANY", value: "" },
            { text: "I", value: "type I" },
            { text: "II", value: "type II" },
            { text: "III", value: "type III" },
            { text: "IV", value: "type IV" },
          ];
          this.selectedParameter5Text = "ALL";
          this.parameters.topo_type = "";
        }
      }
    },
    setParameter2(index) {
      this.selectedParameter2Text = this.parameter2Choices[index].text;
      this.parameters.sp = this.parameter2Choices[index].value;
    },
    setParameter3(index) {
      this.selectedParameter3Text = this.parameter3Choices[index].text;
      this.parameters.tx = this.parameter3Choices[index].value;
    },
    setParameter4(index) {
      this.selectedParameter4Text = this.parameter4Choices[index].text;
      this.parameters.count = this.parameter4Choices[index].value;
    },
    setParameter5(index) {
      this.selectedParameter5Text = this.parameter5Choices[index].text;
      this.parameters.topo_type = this.parameter5Choices[index].value;
    },
    setParameter6(index) {
      this.selectedParameter6Text = this.parameter6Choices[index].text;
      this.parameters.reduced = this.parameter6Choices[index].value;
    },
  },
  mounted() {
    var parameters = JSON.parse(JSON.stringify(this.parameters));
    console.log("huehue");
    this.loadProteins(parameters);
    this.loadInProgress = true;
    this.tableText = LOADING_MSG;
  },
};
</script>
<style>
.dropdown .btn {
}
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
