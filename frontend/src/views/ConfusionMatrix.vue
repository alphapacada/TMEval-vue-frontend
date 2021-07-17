<template>
  <div id="data-comparison-container" class="container">
    <div id="cf-header" class="row pb-5">
      <div class="col">
        <h1 class="pt-3">
          Confusion Matrix
        </h1>
        <h5>
          The blue confusion matrices are for N Location or Orientation. The
          Prediction Tools are tested upon a set with known N-Locations
          (orientation is not "UND"). The green confusion matrices are for
          Protein classification.
        </h5>
      </div>
    </div>
    <modal :show.sync="modal0">
      <b-carousel ref="carousel1" controls no-animation :interval="0">
        <!-- Text slides with image -->

        <b-carousel-slide
          v-for="(value, name) in images"
          :img-src="path + value"
          :key="name"
          :caption="value.desc"
        ></b-carousel-slide>
      </b-carousel>
    </modal>
    <div id="cf-cctop" class="row pt-2">
      <div class="col">
        <div class="row">
          <div class="col">
            <h3>
              CCTOP
            </h3>
          </div>
        </div>
        <!-- Redundant -->
        <confusion-matrix
          @clicked="showImg($event, 'A', 'CCTOP')"
          :lsrc="assess ? path + assess['A'].plot_cm_classification.CCTOP : ''"
          :rsrc="assess ? path + assess['A'].plot_cm_orientation.CCTOP : ''"
          text="CCTOP has fairly high correct predictions for the three classifications: +TM-SP, +TM+SP, and -TM-SP. It scored 0 on -TM+SP due to the fact that
                    if it encounters a non transmembrane (CCTOP has a TMFilter), it returns no topology. Therefore it  passes -TM-SP since just because it returns an empty string.
                    For N Location, CCTOP gained an accuracy of 84%. Its prediction of UND may be caused by non TMs with orientation or False Negative prediction of TM Proteins.  "
          title="Redundant Dataset"
        />
        <!-- Non-redundant-->
        <confusion-matrix
          @clicked="showImg($event, 'B', 'CCTOP')"
          :lsrc="path + assess['B'].plot_cm_classification.CCTOP"
          :rsrc="path + assess['B'].plot_cm_orientation.CCTOP"
          text="For the non redundant dataset, CCTOP scored higher in +TM+SP and +TM-SP predictions.
                    It gained N location accuracy on the non-redundant dataset vs the redundant dataset"
          title="Non-redundant Dataset"
        />
        <!-- Non-redundant RESAMPLED -->
        <confusion-matrix
          @clicked="showImg($event, 'C', 'CCTOP')"
          :lsrc="path + assess['C'].plot_cm_classification.CCTOP"
          :rsrc="path + assess['C'].plot_cm_orientation.CCTOP"
          text="There is an insignifant decrease in the -TM-SP correct predictions. Since only the non tm set was undersampled, the correct predictions and misclassifications for the TM set remained the same."
          title="Non-redundant Resampled Dataset"
        />
        <!-- Non-redundant RESAMPLED min 5-->
        <confusion-matrix
          @clicked="showImg($event, 'D', 'CCTOP')"
          :lsrc="path + assess['D'].plot_cm_classification.CCTOP"
          :rsrc="path + assess['D'].plot_cm_orientation.CCTOP"
          text="The change in mininum segment overlap has not affected the multiclass Confusion Matrix"
          title="Non-Redundant Resampled Dataset with Minimum Segment Overlap of 5 Residues"
        />
      </div>
    </div>
    <v-divider></v-divider>
    <div id="cf-hmmtop" class="row pt-2">
      <div class="col">
        <div class="row">
          <div class="col">
            <h3>
              HMMTOP
            </h3>
          </div>
        </div>
        <!-- Redundant -->
        <confusion-matrix
          @clicked="showImg($event, 'A', 'HMMTOP')"
          :lsrc="path + assess['A'].plot_cm_classification.HMMTOP"
          :rsrc="path + assess['A'].plot_cm_orientation.HMMTOP"
          text="HMMTOP cannot discriminate between TM/Non TM Proteins and predicts a topology for all sequences. This can be seen from the confusion matrix where the misclassifications are centered in the +TM-SP.
                    But for non TM proteins, it only produces a topology of O and I labels."
          title="Redundant Dataset"
        />
        <!-- Non-redundant-->
        <confusion-matrix
          @clicked="showImg($event, 'B', 'HMMTOP')"
          :lsrc="path + assess['B'].plot_cm_classification.HMMTOP"
          :rsrc="path + assess['B'].plot_cm_orientation.HMMTOP"
          text=""
          title="Non-redundant Dataset"
        />
        <!-- Non-redundant RESAMPLED -->
        <confusion-matrix
          @clicked="showImg($event, 'C', 'HMMTOP')"
          :lsrc="path + assess['C'].plot_cm_classification.HMMTOP"
          :rsrc="path + assess['C'].plot_cm_orientation.HMMTOP"
          text=""
          title="Non-redundant Resampled Dataset"
        />
        <!-- Non-redundant RESAMPLED min 5-->
        <confusion-matrix
          @clicked="showImg($event, 'D', 'HMMTOP')"
          :lsrc="path + assess['D'].plot_cm_classification.HMMTOP"
          :rsrc="path + assess['D'].plot_cm_orientation.HMMTOP"
          text=""
          title="Non-redundant Resampled Dataset with Minimum Segment Overlap of 5 Residues"
        />
      </div>
    </div>
    <v-divider></v-divider>
    <div id="cf-philius" class="row pt-2">
      <div class="col">
        <div class="row">
          <div class="col">
            <h3>
              Philius
            </h3>
          </div>
        </div>
        <!-- Redundant -->
        <confusion-matrix
          @clicked="showImg($event, 'A', 'PHILIUS')"
          :lsrc="path + assess['A'].plot_cm_classification.PHILIUS"
          :rsrc="path + assess['A'].plot_cm_orientation.PHILIUS"
          text="Philius incorporates SP prediction and so it can correctly classify the four classes. As seen in the confusion matrix, the diagonal cells
                    have high scores, this indicates that Philius is good in discriminating protein classes."
          title="Redundant Dataset"
        />
        <!-- Non-redundant-->
        <confusion-matrix
          @clicked="showImg($event, 'B', 'PHILIUS')"
          :lsrc="path + assess['B'].plot_cm_classification.PHILIUS"
          :rsrc="path + assess['B'].plot_cm_orientation.PHILIUS"
          text=""
          title="Non-redundant Dataset"
        />
        <!-- Non-redundant RESAMPLED -->
        <confusion-matrix
          @clicked="showImg($event, 'C', 'PHILIUS')"
          :lsrc="path + assess['C'].plot_cm_classification.PHILIUS"
          :rsrc="path + assess['C'].plot_cm_orientation.PHILIUS"
          text=""
          title="Non-redundant Resampled Dataset"
        />
        <!-- Non-redundant RESAMPLED min 5-->
        <confusion-matrix
          @clicked="showImg($event, 'D', 'PHILIUS')"
          :lsrc="path + assess['D'].plot_cm_classification.PHILIUS"
          :rsrc="path + assess['D'].plot_cm_orientation.PHILIUS"
          text=""
          title="Non-Redundant Resampled Dataset with Minimum Segment Overlap of 5 Residues"
        />
      </div>
    </div>
    <v-divider></v-divider>
    <div id="cf-tmhmm2" class="row pt-2">
      <div class="col">
        <div class="row">
          <div class="col">
            <h3>
              TMHMM2.0
            </h3>
          </div>
        </div>
        <!-- Redundant -->
        <confusion-matrix
          @clicked="showImg($event, 'A', 'TMHMM2.0')"
          :lsrc="path + assess['A'].plot_cm_classification['TMHMM2.0']"
          :rsrc="path + assess['A'].plot_cm_orientation['TMHMM2.0']"
          text="TMHMM2.0's output is similar to HMMTOP. It cannot identify signal peptides and cannot discriminate between TM / nonTM proteins."
          title="Redundant Dataset"
        />
        <!-- Non-redundant-->
        <confusion-matrix
          @clicked="showImg($event, 'B', 'TMHMM2.0')"
          :lsrc="path + assess['B'].plot_cm_classification['TMHMM2.0']"
          :rsrc="path + assess['B'].plot_cm_orientation['TMHMM2.0']"
          text=""
          title="Non-redundant Dataset"
        />
        <!-- Non-redundant RESAMPLED -->
        <confusion-matrix
          @clicked="showImg($event, 'C', 'TMHMM2.0')"
          :lsrc="path + assess['C'].plot_cm_classification['TMHMM2.0']"
          :rsrc="path + assess['C'].plot_cm_orientation['TMHMM2.0']"
          text=""
          title="Non-redundant Resampled Dataset"
        />
        <!-- Non-redundant RESAMPLED min 5-->
        <confusion-matrix
          @clicked="showImg($event, 'D', 'TMHMM2.0')"
          :lsrc="path + assess['D'].plot_cm_classification['TMHMM2.0']"
          :rsrc="path + assess['D'].plot_cm_orientation['TMHMM2.0']"
          text=""
          title="Non-redundant Resampled Dataset with Minimum Segment Overlap of 5 Residues"
        />
      </div>
    </div>
    <v-divider></v-divider>
    <div id="cf-topcons2" class="row pt-2">
      <div class="col">
        <div class="row">
          <div class="col">
            <h3>
              TOPCONS2
            </h3>
          </div>
        </div>
        <!-- Redundant -->
        <confusion-matrix
          @clicked="showImg($event, 'A', 'TOPCONS2')"
          :lsrc="path + assess['A'].plot_cm_classification.TOPCONS2"
          :rsrc="path + assess['A'].plot_cm_orientation.TOPCONS2"
          text="Topcons performs exceptionally well in classifying proteins as it achieved high scores in the diagonal cells."
          title="Redundant Dataset"
        />
        <!-- Non-redundant-->
        <confusion-matrix
          @clicked="showImg($event, 'B', 'TOPCONS2')"
          :lsrc="path + assess['B'].plot_cm_classification.TOPCONS2"
          :rsrc="path + assess['B'].plot_cm_orientation.TOPCONS2"
          text=""
          title="Non-redundant Dataset"
        />
        <!-- Non-redundant RESAMPLED -->
        <confusion-matrix
          @clicked="showImg($event, 'C', 'TOPCONS2')"
          :lsrc="path + assess['C'].plot_cm_classification.TOPCONS2"
          :rsrc="path + assess['C'].plot_cm_orientation.TOPCONS2"
          text=""
          title="Non-redundant Resampled Dataset"
        />
        <!-- Non-redundant RESAMPLED min 5-->
        <confusion-matrix
          @clicked="showImg($event, 'D', 'TOPCONS2')"
          :lsrc="path + assess['D'].plot_cm_classification.TOPCONS2"
          :rsrc="path + assess['D'].plot_cm_orientation.TOPCONS2"
          text=""
          title="Non-redundant Resampled Dataset with Minimum Segment Overlap of 5 Residues"
        />
      </div>
    </div>
    <v-divider></v-divider>
    <div id="cf-tmseg" class="row pt-2">
      <div class="col">
        <div class="row">
          <div class="col">
            <h3>
              TMSEG
            </h3>
          </div>
        </div>
        <!-- Redundant -->
        <confusion-matrix
          @clicked="showImg($event, 'A', 'TMSEG')"
          :lsrc="path + assess['A'].plot_cm_classification.TMSEG"
          :rsrc="path + assess['A'].plot_cm_orientation.TMSEG"
          text="Topcons performs exceptionally well in classifying proteins as it achieved high scores in the diagonal cells."
          title="Redundant Dataset"
        />
        <!-- Non-redundant-->
        <confusion-matrix
          @clicked="showImg($event, 'B', 'TMSEG')"
          :lsrc="path + assess['B'].plot_cm_classification.TMSEG"
          :rsrc="path + assess['B'].plot_cm_orientation.TMSEG"
          text=""
          title="Non-redundant Dataset"
        />
        <!-- Non-redundant RESAMPLED -->
        <!-- @click="showImg('C', 'TMSEG')" -->

        <confusion-matrix
          @clicked="showImg($event, 'C', 'TMSEG')"
          :lsrc="path + assess['C'].plot_cm_classification.TMSEG"
          :rsrc="path + assess['C'].plot_cm_orientation.TMSEG"
          text=""
          title="Non-redundant Resampled Dataset"
        />
        <!-- Non-redundant RESAMPLED min 5-->
        <confusion-matrix
          @clicked="showImg($event, 'D', 'TMSEG')"
          :lsrc="path + assess['D'].plot_cm_classification.TMSEG"
          :rsrc="path + assess['D'].plot_cm_orientation.TMSEG"
          text=""
          title="Non-redundant Resampled Dataset with Minimum Segment Overlap of 5 Residues"
        />
      </div>
    </div>
  </div>
</template>
<script>
import DoubleImageFigure from "./components/DoubleImageFigure.vue";
import { BCarousel } from "bootstrap-vue/esm/components/carousel/carousel";
import { BCarouselSlide } from "bootstrap-vue/esm/components/carousel/carousel-slide";
import Modal from "@/components/Modal.vue";
import $backend from "../api";
export default {
  name: "ConfusionMatrix",
  components: {
    Modal,
    BCarousel,
    BCarouselSlide,
    "confusion-matrix": DoubleImageFigure,
  },
  data() {
    return {
      images: null,
      modal0: false,
      path: $backend.getStaticURL(),
      currentSeqId: "set_25",
      currentSet: "",
      assess: {
        A: { plot_cm_classification: {}, plot_cm_orientation: {} },
        B: { plot_cm_classification: {}, plot_cm_orientation: {} },
        C: { plot_cm_classification: {}, plot_cm_orientation: {} },
        D: { plot_cm_classification: {}, plot_cm_orientation: {} },
      },
    };
  },
  mounted() {
    this.assess = this.assessment[this.currentSeqId];
    console.log("assess", this.assess);
  },
  computed: {
    assessment() {
      return this.$store.state.assessment_res;
    },
    // assess() {
    //   return this.assessment[this.currentSeqId];
    // },
  },
  methods: {
    showImg(idx, set, name) {
      // let set = "A";
      // let name = "TMSEG";
      // let idx = 0;
      console.log("show image");
      console.log(idx + set + name);
      if (idx == 0) {
        this.images = Object.values(this.assess[set].plot_cm_classification);
        this.$refs.carousel1.setSlide(
          Object.keys(this.assess[set].plot_cm_classification).indexOf(name)
        );
      }
      if (idx == 1) {
        this.images = Object.values(this.assess[set].plot_cm_orientation);
        this.$refs.carousel1.setSlide(
          Object.keys(this.assess[set].plot_cm_orientation).indexOf(name)
        );
      }
      this.modal0 = true;
    },
  },
};
</script>
<style>
textarea {
  resize: none;
}
.figure-image {
  height: auto;
  width: 100%;
}
#content-result {
  padding-top: 5rem;
}
</style>
