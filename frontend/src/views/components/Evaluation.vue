<template>
  <section id="view_assessment" class="section bg-secondary section-lg">
    <div class="container">
      <div id="yourDiv"></div>
      <span>
        <h1 class="display-1">Assessment Results</h1>
      </span>
      <div>
        <b-card>
          <b-tabs class="mx-auto" pills id="evaltabls" content-class="mt-3">
            <card shadow>
              <b-tab class="eval-tab" title="Basics" active>
                <div class="row">
                  <div class="mx-auto col-md-8">
                    <h4 class="">Test Dataset Statistics</h4>
                  </div>
                </div>
                <div class="border-top mx-auto col-md-8"></div>
                <image-figure
                  src="/img/figures/bar_mode_organisms_25.png"
                  text="The bar graph above shows the top 20 most common organisms 
                            in the test set. H. sapiens is the most common organism with a count 
                            more than double of S. cerevisiae, the second most common."
                />
                <div class="border-top mx-auto col-md-8"></div>
                <image-figure
                  src="/img/figures/bar_protein_count_tx_all.png"
                  text="The bar graph above shows the number of proteins within each 
                            sequence similarity levels. It can be observed that the number of proteins
                            at 70% sequence similarity is almost double of the proteins at 25% sequence similarity.
                            This is because there are many similar proteins in the dataset."
                />
                <div class="border-top mx-auto col-md-8"></div>
                <image-figure
                  src="/img/figures/bar_tm_helix_length_25.png"
                  text="The bar graph above shows the different TM segments length in the non-redundant 
                            dataset and the frequency of each. The dataset comprises mostly of proteins of segment length
                             20 with a count of more than 500."
                />
                <div class="border-top mx-auto col-md-8"></div>
                <image-figure
                  src="/img/figures/bar_tm_length_25.png"
                  text="The figure shows that single-pass membranes dominate in the test set, followed by multi-pass tm proteins that span the membrane three and seven times respectively"
                />
                <div class="row my-3 ">
                  <div class="border-top mx-auto pt-5 col-md-8">
                    <h4 class="">Summary of performance metrics</h4>
                    <p>
                      The test data used in this summary has already been
                      reduced to 25% sequence identity and has no common entries
                      with the training sets of the prediction tools.
                      Furthermore, it is a balanced set of TM proteins and non
                      TM proteins.
                    </p>
                    <ul>
                      <li>Topology Prediction Accuracy</li>
                      <li>FN-FP of TM Segment</li>
                      <li>SOV</li>
                      <li>Protein Classification Accuracy</li>
                    </ul>
                  </div>
                </div>
              </b-tab>
              <b-tab class="eval-tab" title="Topology Prediction Accuracy">
                <div class="mx-auto col-md-8">
                  <div class="table-html" v-html="predAcc"></div>
                  <div class="table-html" v-html="predAccClassification"></div>
                </div>
              </b-tab>
              <b-tab class="eval-tab " title="FN-FP of TM Segment">
                <div class="mx-auto col-md-8">
                  <div class="table-html" v-html="fnfp"></div>
                </div>
              </b-tab>
              <b-tab class="eval-tab" title="SOV">
                <div class="mx-auto col-md-8">
                  <div class="table-html" v-html="sov"></div>
                </div>
              </b-tab>
              <b-tab class="eval-tab" title="Protein Classification Accuracy">
                <div class="mx-auto col-md-8">
                  <base-dropdown>
                    <base-button slot="title" type="" class="dropdown-toggle">
                      Prediction Method
                    </base-button>
                    <a class="dropdown-item" href="#">TOPCONS2</a>
                    <a class="dropdown-item" href="#">CCTOP</a>
                    <a class="dropdown-item" href="#">HMMTOP</a>
                    <a class="dropdown-item" href="#">PHILIUS</a>
                    <a class="dropdown-item" href="#">TMHMM2</a>
                  </base-dropdown>
                </div>

                <image-figure
                  src="/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_TOPCONS2.png"
                />
                <image-figure
                  src="/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_CCTOP.png"
                />
                <image-figure
                  src="/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_HMMTOP.png"
                />
                <image-figure
                  src="/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_PHILIUS.png"
                />
                <image-figure
                  src="/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_TMHMM2.png"
                />
              </b-tab>
            </card>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </section>
</template>
<script>
import ProtVista from "ProtVista";
import ImageFigure from "../components/ImageFigure.vue";
import { BTabs } from "bootstrap-vue/esm/components/tabs/tabs";
import { BTab } from "bootstrap-vue/esm/components/tabs/tab";
export default {
  components: {
    ImageFigure,
    BTabs,
    BTab
  },
  name: "evaluation",
  data() {
    return {
      vertical: false,
      predAcc:
        '<table table-nonfluid border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_resampled_df_pred_acc">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>Correct TM Count</th>\n      <th>Correct Segment Location</th>\n      <th>N Location Success Rate</th>\n      <th>Correct Topology</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>86.075949</td>\n      <td>90.596745</td>\n      <td>89.692586</td>\n      <td>82.278481</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>64.376130</td>\n      <td>81.193490</td>\n      <td>32.188065</td>\n      <td>57.685353</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>80.831826</td>\n      <td>90.415913</td>\n      <td>75.226040</td>\n      <td>72.332731</td>\n    </tr>\n    <tr>\n      <th>TMHMM2</th>\n      <td>83.182640</td>\n      <td>89.150090</td>\n      <td>35.081374</td>\n      <td>75.226040</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>84.448463</td>\n      <td>92.224231</td>\n      <td>39.783002</td>\n      <td>78.481013</td>\n    </tr>\n  </tbody>\n</table>',
      fnfp:
        '<table table-nonfluid border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_resampled_df_fn_fp">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>FN Per-segment</th>\n      <th>FP Per-segment</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>4.701627</td>\n      <td>9.222423</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>6.329114</td>\n      <td>29.294756</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>10.307414</td>\n      <td>8.860759</td>\n    </tr>\n    <tr>\n      <th>TMHMM2</th>\n      <td>7.956600</td>\n      <td>8.860759</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>6.148282</td>\n      <td>9.403255</td>\n    </tr>\n  </tbody>\n</table>',
      sov:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_resampled_df_sov_tm_helix">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>SOV</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>0.838591</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>0.792257</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>0.774152</td>\n    </tr>\n    <tr>\n      <th>TMHMM2</th>\n      <td>0.806455</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>0.813444</td>\n    </tr>\n  </tbody>\n</table>',
      predAccClassification:
        '<table table-nonfluid border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_resampled_df_pred_acc_classification">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>+TM-SP</th>\n      <th>+TM+SP</th>\n      <th>-TM-SP</th>\n      <th>-TM+SP</th>\n      <th>Overall</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>67.777778</td>\n      <td>74.226804</td>\n      <td>97.083333</td>\n      <td>77.777778</td>\n      <td>82.278481</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>42.777778</td>\n      <td>37.113402</td>\n      <td>79.583333</td>\n      <td>41.666667</td>\n      <td>57.685353</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>45.555556</td>\n      <td>74.226804</td>\n      <td>89.166667</td>\n      <td>88.888889</td>\n      <td>72.332731</td>\n    </tr>\n    <tr>\n      <th>TMHMM2</th>\n      <td>54.444444</td>\n      <td>61.855670</td>\n      <td>98.333333</td>\n      <td>61.111111</td>\n      <td>75.226040</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>56.111111</td>\n      <td>75.257732</td>\n      <td>95.416667</td>\n      <td>86.111111</td>\n      <td>78.481013</td>\n    </tr>\n  </tbody>\n</table>'
    };
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    myEventHandler(e) {
      console.log(window.innerWidth);

      this.vertical = window.innerWidth <= 767 ? true : false;
    }
  }
};
</script>
<style>
.figure-image {
  width: 100%;
  height: auto;
  display: block;
}
table {
  width: auto !important;
}
h1.display-1 {
  /* font-weight: bolder; */
  text-align: center !important;
}

ul.nav {
  white-space: nowrap;
  flex-wrap: nowrap;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}
ul.nav::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
.nav-pills .nav-link {
  padding-top: 0.3rem !important;
  padding-bottom: 0.3rem !important;
  color: #212529 !important;
}
.nav-pills .nav-link.active {
  color: #fff !important;
  background-color: #2dce89 !important;
  border-color: #2dce89;
}
.tab-pane > .mx-auto {
  text-align: center;
}
.table-html {
  display: inline-block;
}
</style>
