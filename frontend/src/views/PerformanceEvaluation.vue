<template>
  <section id="view_prediction-results" class="bg-white pt-3">
    <v-app>
      <h2>
        Evaluation Results
      </h2>
      <v-card class="mb-2 p-2">
        <v-card-title class="pb-0">
          <h5>
            Currently viewing:
            <badge rounded type="primary"
              >Sequence Identity: {{ currentSeqId }}</badge
            >
            <badge rounded type="success">Set {{ currentSet }}</badge>
          </h5>
        </v-card-title>
        <v-card-text>
          <label>
            Sequence Identity:
          </label>
          <v-radio-group v-model="seqIdentity" row>
            <v-radio color="primary" label="25" value="25"></v-radio>
            <v-radio color="primary" label="30" value="30"></v-radio>
            <v-radio color="primary" label="40" value="40"></v-radio>
          </v-radio-group>
          <label>
            Experiment Set:
          </label>
          <v-radio-group v-model="set" row>
            <v-radio color="success" label="Set A" value="A"></v-radio>
            <v-radio color="success" label="Set B" value="B"></v-radio>
            <v-radio color="success" label="Set C" value="C"></v-radio>
            <v-radio color="success" label="Set D" value="D"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <base-button type="success" @click="fetchResults">
            {{ buttonText }}
          </base-button>
        </v-card-actions>
      </v-card>

      <!-- PREDICTION ACC -->
      <v-card id="topo_pred_acc" class="mb-4">
        <v-card-title primary-title>
          <h3>Topology Prediction Accuracies set {{ currentSet }}</h3>
          <h5>
            Topology Prediction Accuracies on TMeval dataset with no more than
            {{ currentSeqId }}% sequence similarity BUT with common proteins
            with the Datasets used by the prediction tools
          </h5>
        </v-card-title>
        <v-card-text>
          <caption-table :src="assess.pred_acc" :text="current_pred_acc_cap">
          </caption-table>
        </v-card-text>
      </v-card>

      <!-- PREDICTION ACC CLASSIFICATION -->
      <v-card id="topo_pred_acc_class" class="mb-4">
        <v-card-title primary-title>
          <h3>
            Topology Prediction Accuracies for each Classification of Proteins
            Set {{ currentSet }}
          </h3>
        </v-card-title>
        <v-card-text>
          <caption-table
            :src="assess.pred_acc_classification"
            :text="current_pred_acc_classification_cap"
          ></caption-table>
        </v-card-text>
      </v-card>
      <!-- FN FP -->
      <v-card id="fn-fp" class="mb-4">
        <v-card-title primary-title>
          <h3>TM Per-Segment FN-FP Set {{ currentSet }}</h3>
        </v-card-title>
        <v-card-text>
          <div class="row">
            <div class="col">
              <caption-table
                :src="assess.per_segment_fn_fp"
                :text="current_per_segment_fn_fp_cap"
              ></caption-table>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- MCC -->
      <v-card id="mcc" class="mb-4">
        <v-card-title primary-title>
          <h3>
            Matthew's Correlation Coefficient on Protein Orientation and
            Classification Set {{ currentSet }}
          </h3>
        </v-card-title>
        <v-card-text>
          <div class="row">
            <div class="col">
              <div class="col">
                <caption-table
                  :src="assess.mcc"
                  :text="current_mcc_cap"
                ></caption-table>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
      <!-- SOV -->
      <v-card id="sov" class="mb-4">
        <v-card-title primary-title>
          <h3>Segment Overlap Measure on Set {{ currentSet }}</h3>
        </v-card-title>
        <v-card-text>
          <div class="row">
            <div class="col">
              <caption-table
                :src="assess.sov"
                :text="current_sov_cap"
              ></caption-table>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-app>
  </section>
</template>
<script>
import CaptionedTable from "@/views/components/CaptionedTable.vue";
import { BTable } from "bootstrap-vue/esm/components/table";
export default {
  components: {
    BTable,
    "caption-table": CaptionedTable,
  },
  name: "PredictionResultTable",
  data() {
    return {
      currentSeqId: "set_25",
      currentSet: "A",
      seqIdentity: "25",
      current_pred_acc: {},
      current_pred_acc_cap: "",
      current_pred_acc_classification: {},
      current_pred_acc_classification_cap: "",
      current_per_segment_fn_fp: {},
      current_per_segment_fn_fp_cap: "",
      current_mcc: {},
      current_mcc_cap: "",
      current_sov: {},
      current_sov_cap: "",
      set: "A",
      table1:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_df_pred_acc">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>Correct TM Count</th>\n      <th>Correct Segment Location</th>\n      <th>N Location Success Rate</th>\n      <th>Correct Topology</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>95.586260</td>\n      <td>99.261178</td>\n      <td>95.854922</td>\n      <td>95.231242</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>70.629438</td>\n      <td>97.591633</td>\n      <td>6.208021</td>\n      <td>69.612358</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>95.557475</td>\n      <td>98.973326</td>\n      <td>78.919593</td>\n      <td>90.241796</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0.0</th>\n      <td>93.302629</td>\n      <td>98.618307</td>\n      <td>6.351948</td>\n      <td>91.853771</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>96.094799</td>\n      <td>99.155632</td>\n      <td>7.685665</td>\n      <td>93.878334</td>\n    </tr>\n  </tbody>\n</table>',
      table2:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25.df_pred_acc_classification">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>+TM-SP</th>\n      <th>+TM+SP</th>\n      <th>-TM-SP</th>\n      <th>-TM+SP</th>\n      <th>Overall</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>80.322004</td>\n      <td>90.756303</td>\n      <td>97.449483</td>\n      <td>89.424460</td>\n      <td>95.231242</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>54.561717</td>\n      <td>49.019608</td>\n      <td>77.895515</td>\n      <td>32.589928</td>\n      <td>69.612358</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>58.139535</td>\n      <td>80.672269</td>\n      <td>92.102021</td>\n      <td>94.748201</td>\n      <td>90.241796</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0.0</th>\n      <td>54.203936</td>\n      <td>68.907563</td>\n      <td>98.780187</td>\n      <td>72.446043</td>\n      <td>91.853771</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>69.409660</td>\n      <td>85.714286</td>\n      <td>96.365205</td>\n      <td>91.294964</td>\n      <td>93.878334</td>\n    </tr>\n  </tbody>\n</table>',
      table3:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_df_fn_fp">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>FN Per-segment</th>\n      <th>FP Per-segment</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>0.470159</td>\n      <td>3.943581</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>0.815582</td>\n      <td>28.554980</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>1.285742</td>\n      <td>3.156784</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0.0</th>\n      <td>1.228171</td>\n      <td>5.469200</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>0.767607</td>\n      <td>3.137594</td>\n    </tr>\n  </tbody>\n</table>',
      table4:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_df_mcc">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>Protein Orientation MCC</th>\n      <th>Protein Classification MCC</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>0.692814</td>\n      <td>0.359149</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>0.277160</td>\n      <td>0.238049</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>0.487906</td>\n      <td>0.741812</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>0.399812</td>\n      <td>0.376336</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>0.606363</td>\n      <td>0.825429</td>\n    </tr>\n  </tbody>\n</table>',
      table5:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_df_pred_ac">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>Correct TM Count</th>\n      <th>Correct Segment Location</th>\n      <th>N Location Success Rate</th>\n      <th>Correct Topology</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>96.141059</td>\n      <td>99.382569</td>\n      <td>96.378532</td>\n      <td>95.891712</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>72.180005</td>\n      <td>98.765139</td>\n      <td>2.125386</td>\n      <td>71.740679</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>96.627879</td>\n      <td>99.370696</td>\n      <td>81.429589</td>\n      <td>91.071005</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>95.167419</td>\n      <td>99.287580</td>\n      <td>2.315365</td>\n      <td>94.644977</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>96.865353</td>\n      <td>99.489432</td>\n      <td>2.754690</td>\n      <td>94.621230</td>\n    </tr>\n  </tbody>\n</table>',
      table6:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_df_pred_acc_classification">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>+TM-SP</th>\n      <th>+TM+SP</th>\n      <th>-TM-SP</th>\n      <th>-TM+SP</th>\n      <th>Overall</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>67.777778</td>\n      <td>74.226804</td>\n      <td>97.700831</td>\n      <td>89.513514</td>\n      <td>95.891712</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>42.777778</td>\n      <td>37.113402</td>\n      <td>77.908587</td>\n      <td>32.864865</td>\n      <td>71.740679</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>45.555556</td>\n      <td>74.226804</td>\n      <td>91.952909</td>\n      <td>94.810811</td>\n      <td>91.071005</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>54.444444</td>\n      <td>61.855670</td>\n      <td>98.878116</td>\n      <td>72.864865</td>\n      <td>94.644977</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>56.111111</td>\n      <td>75.257732</td>\n      <td>96.329640</td>\n      <td>90.810811</td>\n      <td>94.621230</td>\n    </tr>\n  </tbody>\n</table>',
      table7:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_df_fn_fp">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>FN Per-segment</th>\n      <th>FP Per-segment</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>0.308715</td>\n      <td>3.550226</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>0.415578</td>\n      <td>27.404417</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>0.676799</td>\n      <td>2.695322</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>0.522441</td>\n      <td>4.310140</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>0.403705</td>\n      <td>2.730943</td>\n    </tr>\n  </tbody>\n</table>',
      table8:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_resampled_df_mcc">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>Protein Orientation MCC</th>\n      <th>Protein Classification MCC</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>0.717628</td>\n      <td>0.801462</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>0.303054</td>\n      <td>0.507624</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>0.501517</td>\n      <td>0.778837</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>0.426009</td>\n      <td>0.589688</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>0.627068</td>\n      <td>0.844971</td>\n    </tr>\n  </tbody>\n</table>',
      table9:
        '<table border="1"  class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_resampled_df_pred_acc">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>Correct TM Count</th>\n      <th>Correct Segment Location</th>\n      <th>N Location Success Rate</th>\n      <th>Correct Topology</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>86.075949</td>\n      <td>90.596745</td>\n      <td>89.692586</td>\n      <td>82.278481</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>64.376130</td>\n      <td>81.193490</td>\n      <td>32.188065</td>\n      <td>57.685353</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>80.831826</td>\n      <td>90.415913</td>\n      <td>75.226040</td>\n      <td>72.332731</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>83.182640</td>\n      <td>89.150090</td>\n      <td>35.081374</td>\n      <td>75.226040</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>84.448463</td>\n      <td>92.224231</td>\n      <td>39.783002</td>\n      <td>78.481013</td>\n    </tr>\n  </tbody>\n</table>',
      table10:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_resampled_df_pred_acc_classification">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>+TM-SP</th>\n      <th>+TM+SP</th>\n      <th>-TM-SP</th>\n      <th>-TM+SP</th>\n      <th>Overall</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>67.777778</td>\n      <td>74.226804</td>\n      <td>97.083333</td>\n      <td>77.777778</td>\n      <td>82.278481</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>42.777778</td>\n      <td>37.113402</td>\n      <td>79.583333</td>\n      <td>41.666667</td>\n      <td>57.685353</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>45.555556</td>\n      <td>74.226804</td>\n      <td>89.166667</td>\n      <td>88.888889</td>\n      <td>72.332731</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>54.444444</td>\n      <td>61.855670</td>\n      <td>98.333333</td>\n      <td>61.111111</td>\n      <td>75.226040</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>56.111111</td>\n      <td>75.257732</td>\n      <td>95.416667</td>\n      <td>86.111111</td>\n      <td>78.481013</td>\n    </tr>\n  </tbody>\n</table>',
      table11:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_resampled_df_fn_fp">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>FN Per-segment</th>\n      <th>FP Per-segment</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>4.701627</td>\n      <td>9.222423</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>6.329114</td>\n      <td>29.294756</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>10.307414</td>\n      <td>8.860759</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>7.956600</td>\n      <td>8.860759</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>6.148282</td>\n      <td>9.403255</td>\n    </tr>\n  </tbody>\n</table>',
      table12:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_C1_df_mcc">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>Protein Orientation MCC</th>\n      <th>Protein Classification MCC</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>0.717628</td>\n      <td>0.801462</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>0.303054</td>\n      <td>0.507624</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>0.501517</td>\n      <td>0.778837</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>0.426009</td>\n      <td>0.589688</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>0.627068</td>\n      <td>0.844971</td>\n    </tr>\n  </tbody>\n</table>',
      table13:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_C1_df_pred_acc">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>Correct TM Count</th>\n      <th>Correct Segment Location</th>\n      <th>N Location Success Rate</th>\n      <th>Correct Topology</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>86.075949</td>\n      <td>91.500904</td>\n      <td>89.692586</td>\n      <td>83.001808</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>64.376130</td>\n      <td>81.916817</td>\n      <td>32.188065</td>\n      <td>58.227848</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>80.831826</td>\n      <td>90.958409</td>\n      <td>75.226040</td>\n      <td>72.513562</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>83.182640</td>\n      <td>89.511754</td>\n      <td>35.081374</td>\n      <td>75.226040</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>84.448463</td>\n      <td>92.585895</td>\n      <td>39.783002</td>\n      <td>78.842676</td>\n    </tr>\n  </tbody>\n</table>',
      table14:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_C1_df_pred_acc_classification">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>+TM-SP</th>\n      <th>+TM+SP</th>\n      <th>-TM-SP</th>\n      <th>-TM+SP</th>\n      <th>Overall</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>68.888889</td>\n      <td>76.288660</td>\n      <td>97.083333</td>\n      <td>77.777778</td>\n      <td>83.001808</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>44.444444</td>\n      <td>37.113402</td>\n      <td>79.583333</td>\n      <td>41.666667</td>\n      <td>58.227848</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>46.111111</td>\n      <td>74.226804</td>\n      <td>89.166667</td>\n      <td>88.888889</td>\n      <td>72.513562</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>54.444444</td>\n      <td>61.855670</td>\n      <td>98.333333</td>\n      <td>61.111111</td>\n      <td>75.226040</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>57.222222</td>\n      <td>75.257732</td>\n      <td>95.416667</td>\n      <td>86.111111</td>\n      <td>78.842676</td>\n    </tr>\n  </tbody>\n</table>',
      table15:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_C1_df_fn_fp">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>FN Per-segment</th>\n      <th>FP Per-segment</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>4.701627</td>\n      <td>9.222423</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>6.329114</td>\n      <td>29.294756</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>10.307414</td>\n      <td>8.860759</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>7.956600</td>\n      <td>8.860759</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>6.148282</td>\n      <td>9.403255</td>\n    </tr>\n  </tbody>\n</table>',
      table16:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_mcc">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>Protein Orientation MCC</th>\n      <th>Protein Classification MCC</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>0.844473</td>\n      <td>0.531856</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>0.419027</td>\n      <td>0.320231</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>0.620411</td>\n      <td>0.805827</td>\n    </tr>\n    <tr>\n      <th>TMHMM2.0</th>\n      <td>0.451227</td>\n      <td>0.459662</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>0.732467</td>\n      <td>0.867385</td>\n    </tr>\n  </tbody>\n</table>',
    };
  },
  computed: {
    assess() {
      return this.assessment[this.currentSeqId][this.currentSet];
    },
    assessment() {
      return this.$store.state.assessment_res;
    },
    buttonText() {
      if (
        this.currentSeqId == this.seqIdentity &&
        this.currentSet == this.set
      ) {
        return "Reload";
      } else return "View results";
    },
  },
  methods: {
    fetchResults() {
      console.log("fetch");
      this.currentSeqId = "set_" + this.seqIdentity;
      this.currentSet = this.set;
      // this.current_pred_acc_cap = ` Most of the prediction tools gained correct topology scores of 90
      //       and above except HMMTOP. A reason for this unusually high score is
      //       the proportion of the positive and negative set. The number of
      //       transmembrane protein is only 9.6% of the number of non-tm proteins
      //       (921 tm/ 9573 non-tm). Note that a correct topology for an observed
      //       transmembrane proteins must meet the following conditions:
      //       1. Correct TM Count - The number of transmembrane segments of the
      //       actual protein and prediction must be the same.
      //       2. Correct Segment Location - Each pair of actual and predicted
      //       transmembrane segments must overlap by at least half the length of
      //       the actual transmembrane segment
      //       3. Correct N Location - The N location of both actual and predicted
      //       protein must be the same.
      //       For non transmembrane proteins, the only basis for a correct
      //       topology is the absence of a transmembrane helix/segment.`;
      if (this.currentSeqId == "set_25" && this.currentSet == "A") {
        this.current_pred_acc_cap = ` Most of the prediction tools gained correct topology scores of 80 and above except HMMTOP. A reason for this unusually high score is the proportion of the positive and negative set. The number of transmembrane protein is only 8.50% of the number of non-tm proteins (908 TM/ 10676 non-TM). Note that a correct topology for an observed transmembrane proteins must meet the following conditions:

            1. Correct TM Count - The number of transmembrane segments of the actual protein and prediction must be the same.
            2. Correct Segment Location - Each pair of actual and predicted transmembrane segments must overlap by at least half the length of
            the actual transmembrane segment
            3. Correct N Location - The N location of both actual and predicted protein must be the same.
            For non transmembrane proteins, the basis for a correct topology is the absence of a transmembrane helix/segment. For known non-TMs with SP, the prediction must only have an SP label.`;
        this.current_pred_acc_classification_cap = ` HMMTOP and TMHMM2.0 scored 0 on +TM+SP and -TM+SP as they could not discriminate SPs. `;
        this.current_per_segment_fn_fp = ` In terms of per-sequence entry evaluation on the predicted number of TM segments, all methods rarely had underpredictions (FN) and considerably had low overpredictions (FN).This means that the methods perform well in both measures except for HMMTOP which predicted a significant number of false positives (28.23% of the 870 TM predictions). `;
        this.current_sov_cap = ` Every method had impressive SOV results which means that there was better quality attached to the overlap between the annotated and predicted TM segments. Each one delivered an SOV score of over 0.80 except for TMSEG.`;
        this.current_mcc_cap = ` In the evaluation of the binary classification (e.g., Protein Orientation or N-tail location) and multi-class classification (e.g., protein classification) performance of the selected prediction tools, CCTOP best excelled in both categories (Table 20). It was followed by TOPCONS2 which also had the second best MCC scores. `;
      } else {
        this.current_pred_acc_cap = "";
        this.current_pred_acc_classification_cap = "";
        this.current_per_segment_fn_fp = "";
        this.current_sov_cap = "";
        this.current_mcc_cap = "";
      }
    },
  },
  mounted() {
    this.fetchResults();
  },
};
</script>
<style>
.theme--light.application {
  background-color: #ffffff;
}
.v-label {
  margin-bottom: 0px;
}
</style>
