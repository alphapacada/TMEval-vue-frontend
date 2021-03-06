<template>
  <section id="about" class="section bg-secondary">
    <v-app class="bg-secondary">
      <div class="container">
        <div class="py-5 container">
          {{ msg }}
          <h3 class="display-1 mb-4">
            This tool assesses the performance accuracies of six Transmembrane
            Topology Prediction Methods.
          </h3>

          <div class="row">
            <div class="col-sm-6">
              <v-card
                min-height="170"
                :ripple="{ class: 'success--text' }"
                class="mr-sm-1 mb-4"
              >
                <v-card-title primary-title>
                  <h4>
                    <a
                      href="http://www.enzim.hu/hmmtop/html/adv_submit.html"
                      target="_blank"
                      >HMMTOP</a
                    >
                    <badge rounded type="success">HMM</badge>
                  </h4>
                </v-card-title>
                <v-card-text>
                  Predicts both the localization of helical transmembrane
                  segments and the topology of transmembrane proteins.
                </v-card-text>
                <!-- </a> -->
              </v-card>
            </div>
            <div class="col-sm-6">
              <v-card
                min-height="170"
                :ripple="{ class: 'default--text' }"
                class="mb-4"
              >
                <v-card-title primary-title>
                  <h4>
                    <a
                      href="http://www.enzim.hu/hmmtop/html/adv_submit.html"
                      target="_blank"
                      >CCTOP</a
                    >
                    <badge rounded type="default">Consensus</badge>
                  </h4>
                </v-card-title>
                <v-card-text>
                  Utilizes 10 different state-of-the-art topology prediction
                  methods and incorporates topology information from existing
                  experimental and computational sources.
                </v-card-text>
              </v-card>
            </div>

            <div class="col-sm-6">
              <v-card
                min-height="170"
                :ripple="{ class: 'red--text' }"
                class="mr-sm-1 mb-4"
              >
                <v-card-title primary-title>
                  <h4>
                    <a
                      href="http://www.yeastrc.org/philius/pages/philius/runPhilius.jsp"
                      target="_blank"
                      >Philius</a
                    >
                    <badge rounded type="danger">DBN</badge>
                  </h4>
                </v-card-title>
                <v-card-text>
                  Combined transmembrane topology and signal peptide predictor
                  that extends Phobius by exploiting the power of dynamic
                  Bayesian networks.
                </v-card-text>
              </v-card>
            </div>
            <div class="col-sm-6">
              <v-card
                min-height="170"
                :ripple="{ class: 'primary--text' }"
                class="mb-4"
              >
                <v-card-title primary-title>
                  <h4>
                    <a
                      href="https://rostlab.org/owiki/index.php/Tmseg"
                      target="_blank"
                      >TMSEG</a
                    >
                    <badge rounded type="primary">Random Forest</badge>
                    <badge rounded type="primary">NN</badge>
                  </h4>
                </v-card-title>
                <v-card-text>
                  Uses PSSMs and physico-chemical properties of AAs in the
                  prediction consisting of 3 stages: RF > NN > RF
                </v-card-text>
              </v-card>
            </div>

            <div class="col-sm-6">
              <v-card
                min-height="170"
                :ripple="{ class: 'default--text' }"
                class="mr-sm-1 mb-4"
              >
                <v-card-title primary-title>
                  <h4>
                    <a href="http://topcons.net/" target="_blank">TOPCONS</a>
                    <badge rounded type="default">Consensus</badge>
                  </h4>
                </v-card-title>
                <v-card-text>
                  Consensus prediction of membrane protein topology and signal
                  peptides.
                </v-card-text>
              </v-card>
            </div>
            <div class="col-sm-6">
              <v-card
                min-height="170"
                :ripple="{ class: 'success--text' }"
                class="mb-4"
              >
                <v-card-title primary-title>
                  <h4>
                    <a
                      href="http://bioinf.cs.ucl.ac.uk/psipred/?memsatsvm=1"
                      target="_blank"
                      >TMHMM2.0</a
                    >
                    <badge rounded type="success">HMM</badge>
                  </h4>
                </v-card-title>
                <v-card-text>
                  It predicts transmembrane helices and discriminate between
                  soluble and membrane proteins with high degree of accuracy.
                </v-card-text>
              </v-card>
            </div>
          </div>
        </div>
      </div>
    </v-app>
  </section>
</template>

<script>
import JobSection from "@/views/components/JobSection.vue";
export default {
  components: {
    JobSection,
  },
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.v-application >>> .v-application--wrap {
  min-height: 0;
}
</style>
