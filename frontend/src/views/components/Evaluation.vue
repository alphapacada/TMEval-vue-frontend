<template>
  <section id="view_assessment" class="section bg-secondary section-lg">
    <div class="container">
      <div id="yourDiv"></div>
      <span>
        <h1 class="display-1">Assessment Results</h1>
      </span>
      <div>
        <!-- <b-card> -->
        <modal :show.sync="modal0">
          <b-carousel ref="carousel1" controls no-animation :interval="0">
            <!-- Text slides with image -->

            <b-carousel-slide
              v-for="(value, name) in images"
              :img-src="value.src"
              :key="name"
              :caption="value.desc"
            ></b-carousel-slide>
          </b-carousel>
        </modal>
        <b-tabs class="mx-auto" pills fill id="evaltabls" content-class="mt-3">
          <card shadow>
            <b-tab class="eval-tab" title="Basics" active>
              <div class="row">
                <div class="mx-auto col-md-8">
                  <h4 class="">Test Dataset Statistics</h4>
                </div>
              </div>
              <div class="border-top mx-auto col-md-8"></div>
              <image-figure v-for="(value, index) in figures.tda" @clicked="showImg(index, figures.tda)" :src="value.src"   :key="`image-${index}`"></image-figure>
              <div class="row my-3 ">
                <div class="border-top mx-auto pt-5 col-md-8">
                  <h4 class="">Summary of performance metrics</h4>
                  <p>
                    The test data used in this summary has already been reduced
                    to 25% sequence identity and has no common entries with the
                    training sets of the prediction tools. Furthermore, it is a
                    balanced set of TM proteins and non TM proteins.
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
              <caption-table :src="predAcc"></caption-table>
              <caption-table :src="predAccClassification"></caption-table>
            </b-tab>
            <b-tab class="eval-tab" title="FN-FP of TM Segment">
              <caption-table :src="fnfp"></caption-table>
            </b-tab>
            <b-tab class="eval-tab" title="SOV">
              <caption-table :src="sov"></caption-table>
            </b-tab>
            <b-tab class="eval-tab" title="Protein Classification Accuracy">
              <div class="mx-auto col-md-8">
                <base-dropdown>
                  <base-button slot="title" type="" class="dropdown-toggle">
                    {{
                      pca_pred_method!=null
                        ? Object.keys(figures.pca)[pca_pred_method]
                        : "Prediction Method"
                    }}
                  </base-button>
                  <a
                    class="dropdown-item"
                    @click="pca_pred_method = index"
                    v-for="(item, name, index) in figures.pca"
                    :key="name"
                  >
                    {{ name }}</a
                  >
                </base-dropdown>
                <base-button
                  v-if="pca_pred_method != null"
                  @click="pca_pred_method = null"
                >
                  Show all
                </base-button>
              </div>
              <image-figure
                v-if="pca_pred_method == index || pca_pred_method == null"
                v-for="(figure, name, index) in figures.pca"
                @clicked="showImg(index, figures.pca)"
                :key="index"
                :src="figure.src"
              ></image-figure>
            </b-tab>
          </card>
        </b-tabs>
        <!-- </b-card> -->
      </div>
    </div>
  </section>
</template>
<script>
import ProtVista from "ProtVista";
import ImageFigure from "../components/ImageFigure.vue";
import CaptionedTable from "../components/CaptionedTable.vue";
import { BTabs } from "bootstrap-vue/esm/components/tabs/tabs";
import { BTab } from "bootstrap-vue/esm/components/tabs/tab";
import { BCard } from "bootstrap-vue/esm/components/card/card";
import { BImg } from "bootstrap-vue/esm/components/image/img";
import { BCarousel } from "bootstrap-vue/esm/components/carousel/carousel";
import { BCarouselSlide } from "bootstrap-vue/esm/components/carousel/carousel-slide";
import Modal from "@/components/Modal.vue";

export default {
  components: {
    ImageFigure,
    BTabs,
    BTab,
    BCard,
    Modal,
    BCarousel,
    BCarouselSlide,
    "caption-table": CaptionedTable
  },
  name: "evaluation",
  data() {
    return {
      pca_pred_method: null,
      figures: {
        tda: [
          {
            src: "/img/figures/bar_mode_organisms_25.png",
            desc: `The bar graph above shows the top 20 most common organisms
                            in the test set. H. sapiens is the most common organism with a count
                            more than double of S. cerevisiae, the second most common.`
          },
          {
            src: "/img/figures/bar_protein_count_tx_all.png",
            desc: `The bar graph above shows the number of proteins within each 
                            sequence similarity levels. It can be observed that the number of proteins
                            at 70% sequence similarity is almost double of the proteins at 25% sequence similarity.
                            This is because there are many similar proteins in the dataset.`
          },
          {
            src: "/img/figures/bar_tm_helix_length_25.png",
            desc: `The bar graph above shows the different TM segments length in the non-redundant 
                            dataset and the frequency of each. The dataset comprises mostly of proteins of segment length
                             20 with a count of more than 500.`
          },
          {
            src: "/img/figures/bar_tm_length_25.png",
            desc: `The figure shows that single-pass membranes dominate in the test set, followed by multi-pass tm proteins that span the membrane three and seven times respectively`
          }
        ],

        pca: {
          TOPCONS2: {
            src:
              "/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_TOPCONS2.png",
          },
          CCTOP: {
            src:
              "/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_CCTOP.png"
          },
          HMMTOP: {
            src:
              "/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_HMMTOP.png"
          },
          PHILIUS: {
            src:
              "/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_PHILIUS.png"
          },
          TMHMM2: {
            src:
              "/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_TMHMM2.png"
          }
        }
      },

      modal0: false,
      vertical: false,
      predAcc:
        '<table  border="1" class="dataframe table table-responsive-sm table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_resampled_df_pred_acc">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>Correct TM Count</th>\n      <th>Correct Segment Location</th>\n      <th>N Location Success Rate</th>\n      <th>Correct Topology</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>86.075949</td>\n      <td>90.596745</td>\n      <td>89.692586</td>\n      <td>82.278481</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>64.376130</td>\n      <td>81.193490</td>\n      <td>32.188065</td>\n      <td>57.685353</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>80.831826</td>\n      <td>90.415913</td>\n      <td>75.226040</td>\n      <td>72.332731</td>\n    </tr>\n    <tr>\n      <th>TMHMM2</th>\n      <td>83.182640</td>\n      <td>89.150090</td>\n      <td>35.081374</td>\n      <td>75.226040</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>84.448463</td>\n      <td>92.224231</td>\n      <td>39.783002</td>\n      <td>78.481013</td>\n    </tr>\n  </tbody>\n</table>',
      fnfp:
        '<table  border="1" class="dataframe table table-responsive-sm table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_resampled_df_fn_fp">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>FN Per-segment</th>\n      <th>FP Per-segment</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>4.701627</td>\n      <td>9.222423</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>6.329114</td>\n      <td>29.294756</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>10.307414</td>\n      <td>8.860759</td>\n    </tr>\n    <tr>\n      <th>TMHMM2</th>\n      <td>7.956600</td>\n      <td>8.860759</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>6.148282</td>\n      <td>9.403255</td>\n    </tr>\n  </tbody>\n</table>',
      sov:
        '<table border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_resampled_df_sov_tm_helix">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>SOV</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>0.838591</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>0.792257</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>0.774152</td>\n    </tr>\n    <tr>\n      <th>TMHMM2</th>\n      <td>0.806455</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>0.813444</td>\n    </tr>\n  </tbody>\n</table>',
      predAccClassification:
        '<table table-nonfluid border="1" class="dataframe table table-sm table-striped table-bordered table-hover table-condensed" id="e_25_reduced_resampled_df_pred_acc_classification">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>+TM-SP</th>\n      <th>+TM+SP</th>\n      <th>-TM-SP</th>\n      <th>-TM+SP</th>\n      <th>Overall</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>67.777778</td>\n      <td>74.226804</td>\n      <td>97.083333</td>\n      <td>77.777778</td>\n      <td>82.278481</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>42.777778</td>\n      <td>37.113402</td>\n      <td>79.583333</td>\n      <td>41.666667</td>\n      <td>57.685353</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>45.555556</td>\n      <td>74.226804</td>\n      <td>89.166667</td>\n      <td>88.888889</td>\n      <td>72.332731</td>\n    </tr>\n    <tr>\n      <th>TMHMM2</th>\n      <td>54.444444</td>\n      <td>61.855670</td>\n      <td>98.333333</td>\n      <td>61.111111</td>\n      <td>75.226040</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>56.111111</td>\n      <td>75.257732</td>\n      <td>95.416667</td>\n      <td>86.111111</td>\n      <td>78.481013</td>\n    </tr>\n  </tbody>\n</table>',
      images: null
    };
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  computed: {
    // images() { return this.figures.tda}
  },
  methods: {
    myEventHandler(e) {
      console.log(window.innerWidth);

      this.vertical = window.innerWidth <= 767 ? true : false;
    },
    showImg(src, tab_images) {
      console.log("src", src);
      console.log("tab_images", tab_images);
      this.images = tab_images;
      this.$refs.carousel1.setSlide(src);
      this.modal0 = true;
    }
  }
};
</script>
<style>
.modal-dialog {
  max-width: 60% !important;
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

.carousel-control-next-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E") !important;
}
.carousel-control-prev-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E") !important;
} 
.carousel-caption {
  position: inherit !important;
  right: 0 !important;
  left: 0 !important;
  width: 80%;
  margin: auto;
}
.carousel-caption > * {
  font-size: 1rem;
}
</style>
