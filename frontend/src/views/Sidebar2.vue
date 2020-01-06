<template>
  <section class="bg-white pt-3">
    <v-app
   >
      <!-- <div id="assessment" class="row"> -->
          <v-btn v-if="mini" class="sidebar-toggler mx-3" fixed dark fab small color="#2dce89">
                <!-- <v-icon dark>ni-air-balloon</v-icon> -->
                <i class="fa fa-chevron-right"></i>
                
          </v-btn>
          <!-- <base-button type="success">Success</base-button> -->
  
        <v-navigation-drawer
          id="sidebar-container"
          class="col-lg-3"
         :mobile-break-point="mobileBreakPoint"
          v-resize-watcher="resizewatcher"

        >
         <!-- <v-navigation-drawer
          id="sidebar-container"
          class="col-lg-3"
          :expand-on-hover="true"
         :mini-variant.sync="mini"
         :mobile-break-point="mobileBreakPoint"
          v-resize-watcher="resizewatcher"
          :value="value"
          permanent
          
        > -->
         

          <v-list class="pb-0">
            <v-list-tile to="/evaluation/table">
              <v-list-tile-title class="pl-3">TMeval Dataset</v-list-tile-title>
            </v-list-tile>
            <v-list-group>
              <template v-slot:activator>
                <v-list-tile to="/evaluation/dataset-comparison#dc-header">
                  <v-list-tile-title class="pl-3"
                    >Prediction Methods vs. TMeval Dataset
                    Comparison</v-list-tile-title
                  >
                </v-list-tile>
              </template>
              <v-list-tile to="/evaluation/dataset-comparison#dc-cctop">
                <v-list-tile-title class="pl-5">CCTOP</v-list-tile-title>
              </v-list-tile>
              <v-list-tile to="/evaluation/dataset-comparison#dc-hmmtop">
                <v-list-tile-title class="pl-5">HMMTOP</v-list-tile-title>
              </v-list-tile>
              <v-list-tile to="/evaluation/dataset-comparison#dc-philius">
                <v-list-tile-title class="pl-5">PHILIUS</v-list-tile-title>
              </v-list-tile>
              <v-list-tile to="/evaluation/dataset-comparison#dc-tmhmm2">
                <v-list-tile-title class="pl-5">TMHMM2</v-list-tile-title>
              </v-list-tile>
              <v-list-tile to="/evaluation/dataset-comparison#dc-topcons2">
                <v-list-tile-title class="pl-5">TOPCONS2</v-list-tile-title>
              </v-list-tile>
            </v-list-group>

            <v-list-tile to="/evaluation/perf-eval">
              <v-list-tile-title class="pl-3"
                >Performance Evaluation</v-list-tile-title
              >
            </v-list-tile>

            <v-list-tile to="/evaluation/sov">
              <v-list-tile-title class="pl-3">SOV analysis</v-list-tile-title>
            </v-list-tile>
            <v-list-group>
              <template v-slot:activator>
                <v-list-tile to="/evaluation/confusion-matrix">
                  <v-list-tile-title class="pl-3"
                    >Confusion Matrix</v-list-tile-title
                  >
                </v-list-tile>
              </template>
              <v-list-tile to="/evaluation/confusion-matrix#cf-cctop">
                <v-list-tile-title class="pl-5">CCTOP</v-list-tile-title>
              </v-list-tile>
              <v-list-tile to="/evaluation/confusion-matrix#cf-hmmtop">
                <v-list-tile-title class="pl-5">HMMTOP</v-list-tile-title>
              </v-list-tile>
              <v-list-tile to="/evaluation/confusion-matrix#cf-philius">
                <v-list-tile-title class="pl-5">PHILIUS</v-list-tile-title>
              </v-list-tile>
              <v-list-tile to="/evaluation/confusion-matrix#cf-tmhmm2">
                <v-list-tile-title class="pl-5">TMHMM2</v-list-tile-title>
              </v-list-tile>
              <v-list-tile to="/evaluation/confusion-matrix#cf-topcons2">
                <v-list-tile-title class="pl-5">TOPCONS2</v-list-tile-title>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-navigation-drawer>

        <div id="page-content">
            <div class="container">

          <fade-transition origin="center" mode="out-in" :duration="100">
            <router-view></router-view>
           
          </fade-transition>
           </div>
   
      </div>
    </v-app>
  </section>
</template>
<script>
import { FadeTransition } from "vue2-transitions";


export default {
  components: {
    FadeTransition
  },
  data: () => ({
    mobileBreakPoint: 890,
    mini: true,
    value: true,
    admins: [
      ["Management", "people_outline"],
      ["Settings", "settings"]
    ],
    cruds: [
      ["Create", "add"],
      ["Read", "insert_drive_file"],
      ["Update", "update"],
      ["Delete", "delete"]
    ]
  }),
    methods: {
    resizewatcher() {
        console.log("resize")
        console.log(window.innerWidth)
        console.log(this.mobileBreakPoint)
     if(window.innerWidth < this.mobileBreakPoint) {
         console.log("mini")
        this.mini=true
        this.value=true
        
    }else {
        this.mini=false
    }}
  },
};
</script>
<style>
.v-list .primary--text {
  color: #2dce89 !important;
  caret-color: #2dce89 !important;
}
.v-list a:hover {
  color: #2dce89 !important;
}
.theme--light.application {
  background-color: #ffffff;
}
#assessment {
  /* text-align: center; */
  padding: 60px 0px 0px 0px;
}
.v-navigation-drawer {
  padding-top: 5em !important;
}
#sidebar-container {
    position:fixed;
}
.sidebar-toggler{
    margin-top: 60px;
}
/* #sidebar-container {
  display: inline-block;
  padding-bottom: 10px;
  position: fixed;
  /* z-index: 1 */

#page-content {
  display: inline-block;
  padding-bottom: 10px;
  margin-top: 60px;
  padding-left: 300px;
}
 
#page-content>.container {
    padding-left:30px;
    margin-left:0
}
@media only screen and (max-width: 890px) {
    #page-content{
        padding-left: unset;
        
    }
    #page-content>.container {
    padding-left:15px;
    margin-left:auto;
}
 }
.dummy {
  z-index: -1 !important;
}
.v-navigation-drawer > .v-list .v-list__tile {
    font-weight: 600 !important;
    font-size: 0.80rem !important;
    
}
.application {
    font-family: unset !important;
}
</style>
