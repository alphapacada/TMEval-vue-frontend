<template>

<div id="assessment" class="row">
    <div id="sidebar-container" class="col-md-3">
        <v-navigation-drawer
    stateless
    value="true">
    <v-list>
      
      <v-list-tile to="/sidebartest/table">
        <v-list-tile-title class="pl-3">TMeval Dataset</v-list-tile-title>
      </v-list-tile>

      <v-list-group>
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title class="pl-3">Prediction Methods vs. TMeval Dataset Comparison</v-list-tile-title>
          </v-list-tile>
        </template>
            <v-list-tile to="/sidebartest/testresults">
              <v-list-tile-title class="pl-5">1</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title class="pl-5">2</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title class="pl-5">3</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title class="pl-5">4</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title class="pl-5">5</v-list-tile-title>
            </v-list-tile>
      </v-list-group>

      <v-list-tile>
        <v-list-tile-title class="pl-3">Prediction Results</v-list-tile-title>
      </v-list-tile>

      <v-list-tile >
        <v-list-tile-title class="pl-3">N Terminal Locations</v-list-tile-title>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-title class="pl-3">SOV analysis</v-list-tile-title>
      </v-list-tile>
      
      <v-list-tile>
        <v-list-tile-title class="pl-3">Confusion Matrix</v-list-tile-title>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-title class="pl-3">Performance Evaluation</v-list-tile-title>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>
    </div>
    <div class="col-md-9">
        <div id="page-content" class="col-md-11">
           <fade-transition origin="center" mode="out-in" :duration="100">
            <router-view></router-view>
             </fade-transition>
        </div>
    </div>
  </div>

</template>
<script>
import { FadeTransition } from "vue2-transitions";

export default {
    components: {
      FadeTransition
    },
    data: () => ({
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings']
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete']
      ]
    })
};
</script>
<style>

.v-list .primary--text {
  color:#2dce89 !important;
  caret-color: #2dce89 !important;
}
.v-list a:hover{
  color:#2dce89 !important;
}
.theme--light.application {
  background-color: #ffffff
}
#assessment {
  padding: 60px 0px 0px 0px;

}

#sidebar-container{
    display: inline-block;
    padding-bottom: 10px;
}
#page-content{
    display: inline-block;
    padding-bottom: 10px;
}

</style>