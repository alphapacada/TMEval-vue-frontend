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
          <!-- <template v-slot:item="{ item }">
          <tr @click="item.expanded = !item.expanded">
            <td class="text-xs">{{ item.name }}</td>
            <td class="text-xs">{{ item.length }}</td>
            <td class="text-xs">{{ item.organism }}</td>
            <td class="text-xs">{{ item.orientation }}</td>
            <td class="text-xs">{{ item.taxonomy }}</td>
            <td class="text-xs">{{ item.tm }}</td>
            <td class="text-xs">{{ item.sp }}</td>
            <td class="text-xs">
              <v-btn
                depressed
                color="success"
                @click="showTopology(item.topology)"
                >Show</v-btn
              >
            </td>
            <td class="text-xs">{{ item.topo_type }}</td>
            <td class="text-xs">{{ item.count }}</td>
          </tr>
        </template> -->
        </v-data-table>
      </v-card>
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Topology Accuracy"
            type="gradient-red"
            sub-title="CCTOP"
            icon="ni ni-active-40"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 3.48%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Lowest False Negatives Per-Segment"
            type="gradient-orange"
            sub-title="TOPCONS2.0"
            icon="ni ni-chart-pie-35"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 12.18%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Lowest False Negatives Per-Segment"
            type="gradient-green"
            sub-title="TMSEG"
            icon="ni ni-money-coins"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-danger mr-2"
                ><i class="fa fa-arrow-down"></i> 5.72%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Performance"
            type="gradient-info"
            sub-title="49,65%"
            icon="ni ni-chart-bar-32"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 54.8%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <!--Charts-->
  </div>
</template>
<script>
// Charts
import * as chartConfigs from "@/components/Charts/config";
//   import LineChart from '@/components/Charts/LineChart';
//   // Tables
//   import SocialTrafficTable from './Dashboard/SocialTrafficTable';
//   import PageVisitsTable from './Dashboard/PageVisitsTable';
export default {
  components: {
    // LineChart,
    // BarChart,
    // PageVisitsTable,
    // SocialTrafficTable,
  },
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
  methods: {
    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            label: "Performance",
            data: this.bigLineChart.allData[index],
          },
        ],
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      };
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
  },
  mounted() {
    this.initBigChart(0);
  },
};
</script>
<style></style>
