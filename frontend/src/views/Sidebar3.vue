<template>
  <v-app>
    <v-navigation-drawer app fixed id="sidebar-container" v-model="drawer">
      <v-list>
        <v-list-item to="evaluation/table">
          <v-list-item-title>TMEval Dataset</v-list-item-title>
        </v-list-item>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-content to="/evaluation/dataset-comparison#dc-header">
              <v-list-item-title
                >Prediction Methods vs. TMeval Dataset
                Comparison</v-list-item-title
              >
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(tool, key) in predictionMethods"
            :key="key"
            :to="'/evaluation/dataset-comparision/dc-' + tool.toLowerCase()"
          >
            <v-list-item-title>{{ tool }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item to="/evaluation/perf-eval">
          <v-list-item-title class="pl-3"
            >Performance Evaluation</v-list-item-title
          >
        </v-list-item>

        <v-list-item to="/evaluation/sov">
          <v-list-item-title class="pl-3">SOV analysis</v-list-item-title>
        </v-list-item>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item to="/evaluation/confusion-matrix">
              <v-list-item-title class="pl-3"
                >Confusion Matrix</v-list-item-title
              >
            </v-list-item>
          </template>
          <v-list-item
            v-for="(tool, key) in predictionMethods"
            :key="key"
            :to="'/evaluation/confusion-matrix#cf-' + tool.toLowerCase()"
          >
            <v-list-item-title class="pl-5">{{ tool }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
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
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    predictionMethods: ["CCTOP", "HMMTOP", "PHILIUS", "TMHMM2.0", "TOPCONS2"],
    drawer: true,
  }),
};
</script>
<style scoped>
.v-navigation-drawer {
  top: inherit !important;
}
/* .v-application {
  margin-top: 60px;
}
.main-content {
  margin-top: 60px;
  padding-left: 15rem;
} */
</style>
