<template>
  <section id="view_sov-analysis" class="section bg-white pt-3">
    <h4 class="mb-3">
      Segment overlap measure is a segment based measure of 2D structure. All
      prediction tools perform well in this performance metric.
    </h4>

    <v-card id="redundant-data" class="mb-4">
      <v-card-title primary-title>
        <h1>
          Segment Overlap Measure on the Redundant Dataset
        </h1>
      </v-card-title>
      <v-card-text>
        <caption-table :src="assess['A'].sov"></caption-table>

        <!-- <div class="row">
          <div class="col" v-html="table1"></div>
        </div>
        <div class="pl-4 row"></div> -->
      </v-card-text>
    </v-card>

    <v-card v-if="assess['B'].sov" id="nonredundant-data" class="mb-4">
      <v-card-title primary-title>
        <h1>
          Segment Overlap Measure on the Non-Redundant Dataset
        </h1>
      </v-card-title>
      <v-card-text>
        <caption-table :src="assess['B'].sov || {}"></caption-table>
      </v-card-text>
    </v-card>

    <v-card v-if="assess['C'].sov" id="nonredundant-data-res" class="mb-4">
      <v-card-title primary-title>
        <h1>
          Segment Overlap Measure on the Resampled Non-Redundant Dataset
        </h1>
      </v-card-title>
      <v-card-text>
        <caption-table :src="assess['C'].sov || {}"></caption-table>
        <div class="pl-4 row"></div>
      </v-card-text>
    </v-card>

    <v-card v-if="assess['D'].sov" id="nonredundant-data-res5" class="mb-4">
      <v-card-title primary-title>
        <h1>
          Segment Overlap Measure on the Resampled Non-Redundant Dataset with
          Minimum Segment Overlap of 5 residues.
        </h1>
      </v-card-title>
      <v-card-text>
        <caption-table :src="assess['D'].sov"></caption-table>
      </v-card-text>
    </v-card>
  </section>
</template>
<script>
import $backend from "../api";
import CaptionedTable from "@/views/components/CaptionedTable.vue";

export default {
  components: {
    "caption-table": CaptionedTable,
  },
  name: "PredictionResultTable",
  data() {
    return {
      currentSeqId: "set_25",
      currentSet: "A",
      seqIds: [25, 30, 40],
      // sets: ["A", "B", "C", "D"],
      sets: ["A"],
      tables: {
        A: {},
        B: {},
        C: {},
        D: {},
      },
      table1:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_df_sov_tm_helix">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>SOV</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>0.849833</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>0.810492</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>0.806505</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>0.810561</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>0.830279</td>\n    </tr>\n  </tbody>\n</table>',
      table2:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_df_sov_tm_helix">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>SOV</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>0.838591</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>0.792257</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>0.774152</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>0.806455</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>0.813444</td>\n    </tr>\n  </tbody>\n</table>',
      table3:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_resampled_df_sov_tm_helix">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>SOV</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>0.838591</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>0.792257</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>0.774152</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>0.806455</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>0.813444</td>\n    </tr>\n  </tbody>\n</table>',
      table4:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_C1_df_sov_tm_helix">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>SOV</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>0.838591</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>0.792257</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>0.774152</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>0.806455</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>0.813444</td>\n    </tr>\n  </tbody>\n</table>',
    };
  },
  computed: {
    assess() {
      console.log(this.assessment[this.currentSeqId]);
      return this.assessment[this.currentSeqId];
    },
    assessment() {
      console.log("computed Assessment");
      console.log(this.$store.state.assessment_res);
      return this.$store.state.assessment_res;
    },
  },
  methods: {
    getSov(set) {
      if (this.assess[set]) {
        return this.asses;
      }
    },
    // assignHeaders(array) {
    //   let newItem = {};
    //   newItem.headers = Object.keys(array[0]).map((key) => {
    //     return {
    //       text: key,
    //       value: key,
    //     };
    //   });
    //   newItem.items = array;
    //   console.log(newItem);
    //   return newItem;
    // },
    // fetchAssessment(seqId, set) {
    //   let res = {};
    //   $backend.getAssessment(seqId, set).then((response) => {
    //     if (response) {
    //       this.tables[set] = this.assignHeaders(JSON.parse(response.sov));
    //     }
    //     // console.log(JSON.parse(response));
    //     // return JSON.parse(response);
    //   });
    // },
    // fetchResults() {
    //   // const response = fetchAssessment(25);
    //   for (let i = 0; i < this.sets.length; i++) {
    //     this.fetchAssessment(25, this.sets[i]);
    //   }
    // },
  },
  mounted() {
    this.currentSeqId = "set_25";
    // this.fetchResults();
  },
  // mounted() {},
};
</script>
<style>
.theme--light.application {
  background-color: #ffffff;
}
</style>
