<template>
  <v-app>
    <v-navigation-drawer app right fixed v-model="drawer">
      <v-list>
        <v-list-item :to="'/sidebartest/evaluate/' + job_id">
          <v-list-item-title>Evaluation</v-list-item-title>
        </v-list-item>
        <v-list-group :value="true">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Results</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            :to="'/sidebartest/prediction/' + job_id + '#job_status'"
          >
            <v-list-item-title>Job Status</v-list-item-title>
          </v-list-item>
          <v-list-item :to="'/sidebartest/prediction/' + job_id + '#cdhit'">
            <v-list-item-title>CDHIT-reduced Fasta</v-list-item-title>
          </v-list-item>
          <v-list-item
            :to="'/sidebartest/prediction/' + job_id + '#content-result'"
          >
            <v-list-item-title>Prediction Results</v-list-item-title>
          </v-list-item>
          <v-list-item
            :to="
              '/sidebartest/prediction/' + this.$route.params.id + '#res_topo'
            "
          >
            <v-list-item-title>Topologies</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-main class="main-content">
      <v-btn
        v-if="!drawer"
        @click.stop="drawer = !drawer"
        class="sidebar-toggler mx-auto"
        :fixed="true"
        dark
        right
        fab
        small
        color="success"
      >
        <i class="fa fa-chevron-left"></i>
      </v-btn>
      <fade-transition :duration="200" origin="center top" mode="out-in">
        <!-- If using vue-router -->
        <router-view></router-view>
      </fade-transition>
    </v-main>
  </v-app>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
export default {
  components: {
    FadeTransition,
  },
  data() {
    return {
      drawer: true,
      job_id: this.$route.params.id,
    };
  },
  created() {
    console.log(this.$route.params.id, this.$route.query.page);
  },
};
</script>
<style scoped>
.v-navigation-drawer {
  top: inherit !important;
}
</style>
