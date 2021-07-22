<template>
  <v-app>
    <v-navigation-drawer
      width="320"
      app
      fixed
      id="sidebar-container"
      v-model="drawer"
      class="pt-2"
    >
      <v-list rounded>
        <v-list-item-group active-class="success">
          <v-list-item to="/evaluation/table">
            <v-list-item-title>TMEval Dataset</v-list-item-title>
          </v-list-item>
          <v-divider class="my-1"></v-divider>
          <v-list-item to="/evaluation/overview">
            <v-list-item-title>Summary of Evaluation</v-list-item-title>
          </v-list-item>
          <v-list-group color="black">
            <template v-slot:activator>
              <v-list-item-content
                to="/evaluation/dataset-comparison/#dc-header"
              >
                <v-list-item-title class="text-wrap"
                  >Prediction Methods vs. TMeval Dataset
                  Comparison</v-list-item-title
                >
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(tool, key) in predictionMethods"
              :key="key"
              :to="'/evaluation/dataset-comparison/#dc-' + tool.id"
            >
              <v-list-item-title class="pl-5">{{
                tool.name
              }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-group color="black">
            <template v-slot:activator>
              <v-list-item-content to="/evaluation/perf-eval">
                <v-list-item-title class=""
                  >Performance Evaluation</v-list-item-title
                >
              </v-list-item-content>
            </template>
            <v-list-item to="/evaluation/perf-eval/#topo_pred_acc">
              <v-list-item-title class="pl-5"
                >Topology Prediction Accuracy</v-list-item-title
              >
            </v-list-item>
            <v-list-item to="/evaluation/perf-eval/#topo_pred_acc_class">
              <v-list-item-title class="text-wrap pl-10"
                >Prediction Accuracy for each Classification</v-list-item-title
              >
            </v-list-item>
            <v-list-item to="/evaluation/perf-eval/#fn-fp">
              <v-list-item-title class="text-wrap pl-5"
                >Per-Segment False Negatives and False
                Positives</v-list-item-title
              >
            </v-list-item>
            <v-list-item to="/evaluation/perf-eval/#mcc">
              <v-list-item-title class="text-wrap pl-5"
                >MCC on Protein Classification and
                Orientation</v-list-item-title
              >
            </v-list-item>
            <v-list-item to="/evaluation/perf-eval/#sov">
              <v-list-item-title class="text-wrap pl-5">SOV</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-group color="black">
            <template v-slot:activator>
              <v-list-item-content to="/evaluation/sov">
                <v-list-item-title class="">SOV analysis</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item to="/evaluation/sov/#redundant-data">
              <v-list-item-title class="pl-5"
                >Redundant Dataset</v-list-item-title
              >
            </v-list-item>
            <v-list-item to="/evaluation/sov/#nonredundant-data">
              <v-list-item-title class="pl-5"
                >Non-Redundant Dataset</v-list-item-title
              >
            </v-list-item>
            <v-list-item to="/evaluation/sov/#nonredundant-data-res">
              <v-list-item-title class="pl-5"
                >Resampled Dataset</v-list-item-title
              >
            </v-list-item>
            <v-list-item to="/evaluation/sov/#nonredundant-data-res5">
              <v-list-item-title class="pl-5 text-wrap"
                >Minimum Segment Overlap of 5 Residues</v-list-item-title
              >
            </v-list-item>
          </v-list-group>

          <v-list-group color="black">
            <template v-slot:activator>
              <v-list-item-content to="/evaluation/confusion-matrix">
                <v-list-item-title>Confusion Matrix</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(tool, key) in predictionMethods"
              :key="key"
              :to="'/evaluation/confusion-matrix#cf-' + tool.id"
            >
              <v-list-item-title class="pl-5">{{
                tool.name
              }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main class="main-content">
      <v-btn
        v-if="!drawer"
        @click.stop="drawer = !drawer"
        class="sidebar-toggler mx-auto"
        :fixed="true"
        dark
        fab
        color="success"
      >
        <i class="fa fa-chevron-right"></i>
      </v-btn>
      <!-- Provides the application the proper gutter -->
      <v-container class="py-2" fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    predictionMethods: [
      { id: "cctop", name: "CCTOP" },
      { id: "hmmtop", name: "HMMTOP" },
      { id: "philius", name: "PHILIUS" },
      { id: "tmhmm2", name: "TMHMM2.0" },
      { id: "topcons2", name: "TOPCONS2" },
      { id: "tmseg", name: "TMSEG" },
    ],
    drawer: true,
  }),
};
</script>
<style scoped>
.v-navigation-drawer {
  top: inherit !important;
}
.bg-active {
  background-color: black;
  color: white !important;
}
</style>
