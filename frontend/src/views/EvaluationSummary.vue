<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <v-card id="test_set">
        <v-text-field
          class="p-2"
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-data-table
          class="elevation-1"
          :headers="mainHeaders"
          :items="mainItems"
          :search="search"
        >
          <template v-slot:item.topology="{ item }">
            <td class="text-xs">
              <v-btn
                depressed
                color="success"
                @click="showTopology(item.topology)"
                >Show</v-btn
              >
            </td>
          </template>
        </v-data-table>
      </v-card>
      <div class="row">
        <div class="col-lg-6">
          <stats-card
            title="Topology Accuracy"
            type="gradient-red"
            sub-title="CCTOP"
            icon=""
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2">82.89%</span>
              <span class="text-nowrap">76.97% TM protein topology</span>
            </template>
          </stats-card>
        </div>
        <div class="col-lg-6">
          <stats-card
            title="Best non-TM Topology Accuracy"
            type="gradient-red"
            sub-title="TOPCONS2"
            icon=""
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2">91.11%</span>
              <span class="text-nowrap"></span>
            </template>
          </stats-card>
        </div>
        <div class="col-lg-6">
          <stats-card
            title="Most Accurate Protein Classifier"
            type="gradient-red"
            sub-title="TOPCONS2"
            icon=""
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2">90.8%</span>
              <span class="text-nowrap"
                >0.88 Matthews correclation coefficient (MCC)</span
              >
            </template>
          </stats-card>
        </div>
        <div class="col-lg-6">
          <stats-card
            title="Most Accurate N-tail Location Classifier"
            type="gradient-red"
            sub-title="CCTOP"
            icon=""
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2">92.3%%</span>
              <span class="text-nowrap"
                >0.84 Matthews correclation coefficient (MCC)</span
              >
            </template>
          </stats-card>
        </div>
        <div class="col-lg-6">
          <stats-card
            title="Lowest False Negatives Per-Segment"
            type="gradient-orange"
            sub-title="CCTOP"
            icon=""
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2">3.45</span>
              <span class="text-nowrap"></span>
            </template>
          </stats-card>
        </div>
        <div class="col-lg-6">
          <stats-card
            title="Lowest False Positives Per-Segment"
            type="gradient-green"
            sub-title="Philius"
            icon=""
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-danger mr-2">7.24</span>
              <span class="text-nowrap"></span>
            </template>
          </stats-card>
        </div>
        <div class="col-lg-6">
          <stats-card
            title="Segment Overlap"
            type="gradient-info"
            sub-title="CCTOP"
            icon=""
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2">0.85</span>
              <span class="text-nowrap"></span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <!--Charts-->
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      search: "",
    };
  },
  computed: {
    assessment() {
      return this.$store.state.assessment_res["set_25"]["C"];
    },
    mainHeaders() {
      return this.assessment.sample_data.headers;
    },
    mainItems() {
      return this.assessment.sample_data.items;
    },
  },
  methods: {},
  mounted() {},
};
</script>
<style></style>
