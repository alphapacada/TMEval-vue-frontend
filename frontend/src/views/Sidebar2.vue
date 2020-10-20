<template>
  <section class="bg-white pt-3">
    <v-app>
      <!-- <div id="assessment" class="row"> -->
      <v-btn
        v-if="mini"
        @click.stop="drawer = !drawer"
        class="sidebar-toggler mx-3"
        :fixed="true"
        dark
        fab
        small
        color="success"
      >
        <!-- <v-icon dark>ni-air-balloon</v-icon> -->
        <i class="fa fa-chevron-right"></i>
      </v-btn>
      <!-- <base-button type="success">Success</base-button> -->
        <!-- v-model="drawer" -->
        <!-- :mobile-breakpoint="mobileBreakPoint" -->
       <!-- @transitionend="console.log('transitioned desu')" -->
 <!-- v-resize-watcher="resizewatcher" -->
      <v-navigation-drawer
        id="sidebar-container"
        class="col-lg-3"
        v-model="drawer"
        :fixed="true"
        @transitionend="printDrawer()"
    
      >
        <v-list class="pb-0">
          <v-list-item to="/evaluation/table">
            <v-list-item-title class="pl-3">TMeval Dataset</v-list-item-title>
          </v-list-item>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item to="/evaluation/dataset-comparison#dc-header">
                <v-list-item-title class="pl-3"
                  >Prediction Methods vs. TMeval Dataset
                  Comparison</v-list-item-title
                >
              </v-list-item>
            </template>
            <v-list-item to="/evaluation/dataset-comparison#dc-cctop">
              <v-list-item-title class="pl-5">CCTOP</v-list-item-title>
            </v-list-item>
            <v-list-item to="/evaluation/dataset-comparison#dc-hmmtop">
              <v-list-item-title class="pl-5">HMMTOP</v-list-item-title>
            </v-list-item>
            <v-list-item to="/evaluation/dataset-comparison#dc-philius">
              <v-list-item-title class="pl-5">PHILIUS</v-list-item-title>
            </v-list-item>
            <v-list-item to="/evaluation/dataset-comparison#dc-tmhmm2">
              <v-list-item-title class="pl-5">TMHMM2.0</v-list-item-title>
            </v-list-item>
            <v-list-item to="/evaluation/dataset-comparison#dc-topcons2">
              <v-list-item-title class="pl-5">TOPCONS2</v-list-item-title>
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
            <v-list-item to="/evaluation/confusion-matrix#cf-cctop">
              <v-list-item-title class="pl-5">CCTOP</v-list-item-title>
            </v-list-item>
            <v-list-item to="/evaluation/confusion-matrix#cf-hmmtop">
              <v-list-item-title class="pl-5">HMMTOP</v-list-item-title>
            </v-list-item>
            <v-list-item to="/evaluation/confusion-matrix#cf-philius">
              <v-list-item-title class="pl-5">PHILIUS</v-list-item-title>
            </v-list-item>
            <v-list-item to="/evaluation/confusion-matrix#cf-tmhmm2">
              <v-list-item-title class="pl-5">TMHMM2.0</v-list-item-title>
            </v-list-item>
            <v-list-item to="/evaluation/confusion-matrix#cf-topcons2">
              <v-list-item-title class="pl-5">TOPCONS2</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>

      <!-- <div id="page-content"> 
        <div class="container">-->
      <!-- <div class="main-content"> -->
      <v-main>
        <div class="w-100 px-5">
        <!-- <div> -->
        <fade-transition origin="center" mode="out-in" :duration="100">
          <router-view></router-view>
        </fade-transition>
        </div>
      </v-main>
      <!-- </div> -->
    </v-app>
  </section>
</template>
<script>
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    FadeTransition,
  },
  data: () => ({
    mobileBreakPoint: 890,
    mini: true,
    drawer:true,
    admins: [
      ["Management", "people_outline"],
      ["Settings", "settings"],
    ],
    cruds: [
      ["Create", "add"],
      ["Read", "insert_drive_file"],
      ["Update", "update"],
      ["Delete", "delete"],
    ],
  }),
  methods: {
    printDrawer() {
      console.log(this.drawer)
    },
    resizewatcher() {
      // console.log("resize");
      // console.log(window.innerWidth);
      // console.log(this.mobileBreakPoint);
      if (window.innerWidth < this.mobileBreakPoint) {
        console.log(this.drawer)
        console.log("mini");
        this.mini = true;
      } else {
        this.mini = false;
      }
    },
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    }

  }
};
</script>
