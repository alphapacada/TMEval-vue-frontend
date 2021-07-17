<template>
  <section v-if="assessment" id="view_assessment" class="section bg-secondary">
    <div class="container">
      <card>
        <h4 class="display-3">Summary of performance metrics</h4>
        <div>
          <p class="">
            The test data used in the assessment result summary below has
            already been reduced to 25% sequence identity and has no common
            entries with the training sets of the prediction tools. Furthermore,
            it is a balanced set of TM proteins and non TM proteins.
          </p>
          <div class="pl-3">
            <ul>
              <li>Topology Prediction Accuracy</li>
              <li>FN-FP of TM Segment</li>
              <li>SOV</li>
              <li>Protein Classification Accuracy</li>
            </ul>
          </div>
        </div>
      </card>
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
              <image-figure
                v-for="(value, index) in figures.tda"
                @clicked="showImg(index, figures.tda)"
                :src="value.src"
                :key="`image-${index}`"
              ></image-figure>
              <div class="row my-3 ">
                <div class="border-top mx-auto pt-5 col-md-8"></div>
              </div>
            </b-tab>
            <b-tab class="eval-tab" title="Topology Prediction Accuracy">
              <caption-table :src="tables['pred_acc']"></caption-table>
            </b-tab>
            <b-tab class="eval-tab" title="FN-FP of TM Segment">
              <caption-table :src="tables['per_segment_fn_fp']"></caption-table>
            </b-tab>
            <b-tab class="eval-tab" title="SOV">
              <caption-table :src="tables['sov']"></caption-table>
            </b-tab>
            <b-tab class="eval-tab" title="Protein Classification Accuracy">
              <div class="mx-auto col-md-8">
                <base-dropdown>
                  <base-button slot="title" type="" class="dropdown-toggle">
                    {{
                      pca_pred_method != null
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
                :src="path + figure"
              ></image-figure>
              <!-- :src="figure.src" -->
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
import $backend from "@/api";
export default {
  components: {
    ImageFigure,
    BTabs,
    BTab,
    BCard,
    Modal,
    BCarousel,
    BCarouselSlide,
    "caption-table": CaptionedTable,
  },
  name: "evaluation",
  data() {
    return {
      path: $backend.getStaticURL(),
      pca_pred_method: null,
      figure_names: [
        "bar_mode_organisms",
        "bar_protein_count",
        "bar_tm_helix_length",
        "bar_tm_length",
        // "plot_cm_classification",
      ],
      figures: {
        tda: [
          {
            name: "bar_mode_organisms",
            src: "/img/figures/bar_mode_organisms_25.png",
            desc: `The bar graph above shows the top 20 most common organisms
                            in the test set. H. sapiens is the most common organism with a count
                            more than double of M. musculus, the second most common.`,
          },
          {
            name: "bar_protein_count",
            src: "/img/figures/bar_protein_count_tx_all.png",
            desc: `The bar graph above shows the number of proteins within each
                            sequence similarity levels. It can be observed that the number of proteins
                            decreased at a lower threshold and Eukaryotes dominate each dataset.`,
          },
          {
            name: "bar_tm_helix_length",
            src: "/img/figures/bar_tm_helix_length_25.png",
            desc: `The bar graph above shows the different TM segments length in the non-redundant
                            dataset and the frequency of each. The dataset comprises mostly of proteins of segment length
                             2 with a count of more than 500.`,
          },
          {
            name: "bar_tm_length",
            src: "/img/figures/bar_tm_length_25.png",
            desc: `The figure shows that single-pass membranes dominate in the test set, followed by multi-pass tm proteins that span the membrane twice and seven times respectively`,
          },
        ],
        pca: {},
        //   pca: {
        //     TOPCONS2: {
        //       src:
        //         "/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_TOPCONS2.png",
        //     },
        //     CCTOP: {
        //       src:
        //         "/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_CCTOP.png",
        //     },
        //     HMMTOP: {
        //       src:
        //         "/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_HMMTOP.png",
        //     },
        //     PHILIUS: {
        //       src:
        //         "/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_PHILIUS.png",
        //     },
        //     TMHMM2: {
        //       src:
        //         "/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_TMHMM2.png",
        //     },
        //   },
      },
      mainHeaders: [
        { text: "Prediction Method", value: "Prediction Method" },
        { text: "CCTOP", value: "CCTOP" },
        { text: "HMMTOP", value: "HMMTOP" },
        { text: "Philius", value: "Philius" },
        { text: "TMHMM2.0", value: "TMHMM2.0" },
        { text: "TMSEG", value: "TMSEG" },
        { text: "TOPCONS2", value: "TOPCONS2" },
      ],
      modal0: false,
      vertical: false,
      // assessment: {},
      tables: {
        pred_acc: { items: [], headers: [] },
        pred_acc_classification: { items: [], headers: [] },
        sov: { items: [], headers: [] },
        per_segment_fn_fp: { items: [], headers: [] },
      },
      images: null,
    };
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  // mounted() {
  //   this.fetchResults(this.assessment);
  // },
  // mounted() {
  //   // $backend.getAssessment(25, "A").then((response) => {
  //   //   this.assessment = response;
  //   //   this.figures.pca = JSON.parse(this.assessment.plot_cm_classification);
  //   //   Object.keys(response).forEach((key) => {
  //   //     if (
  //   //       !this.figure_names.includes(key) &&
  //   //       Object.keys(this.tables).includes(key)
  //   //     )
  //   //       this.json_to_datatable_item(key);
  //   //   });
  //   // });
  // },
  computed: {
    assessment() {
      console.log("computed:assessment");
      return this.$store.state.assessment_res["set_25"]["C"];
    },
  },
  mounted() {
    this.fetchResults(this.assessment);
  },
  watch: {
    assessment(assessment_res) {
      console.log("changed.");
      this.fetchResults(assessment_res);
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  // computed: {
  //   // images() { return this.figures.tda}
  // },
  methods: {
    fetchResults(assessment_res) {
      let assessment = assessment_res;
      console.log("fetchResults");
      this.figures.pca = assessment.plot_cm_classification;
      console.log("bati");
      Object.keys(assessment).forEach((key) => {
        // console.log(key);
        if (
          !this.figure_names.includes(key) &&
          Object.keys(this.tables).includes(key)
        ) {
          console.log(key);

          this.tables[key].items = assessment[key].items;

          this.tables[key].headers = assessment[key].headers;
        }
      });
      this.figures.tda.forEach((item) => {
        item.src = this.path + assessment[item.name];
      });
    },

    // roundOffNumbers(obj) {
    //   console.log(obj);
    //   return obj.map((e) => {
    //     Object.keys(e).forEach((key) => {
    //       if (key != "Prediction Method") {
    //         e[key] = Math.round(e[key] * 100) / 100;
    //       }
    //     });
    //     return e;
    //   });
    // },
    myEventHandler(e) {
      // console.log(window.innerWidth);

      this.vertical = window.innerWidth <= 767 ? true : false;
    },
    showImg(src, tab_images) {
      console.log("src", src);
      console.log("tab_images", tab_images);
      this.images = Object.values(tab_images);
      this.$refs.carousel1.setSlide(src);
      this.modal0 = true;
    },
  },
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
