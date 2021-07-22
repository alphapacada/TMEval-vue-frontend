<template>
  <section class="section bg-secondary section-lg">
    <div class="container">
      <v-data-table :items="items" :headers="headers">
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)">
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:item.job_id="{ item }">
          <router-link
            :to="{ name: 'pred-results', params: { id: item.job_id } }"
            >{{ item.job_id }}</router-link
          >
        </template>
      </v-data-table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Job ID",
          value: "job_id",
        },
        { text: "Number of Sequences", value: "numSeq" },
        { text: "Status", value: "status" },
        { text: "Date Submitted", value: "date_submitted" },
        { text: "Date Completed", value: "date_done" },
      ],
      items: [],
    };
  },
  methods: {
    getColor(status) {
      if (status == "Completed") return "success";
      else if (status == "Running") return "primary";
      else return "red";
    },
    getJobItems() {
      let items = [];
      let stats = this.get_stats;
      if (stats.jobs) {
        Object.keys(stats.jobs).forEach((key) => {
          let row = Object();

          this.headers.forEach((item) => {
            let column = item.value;

            if (column == "job_id") {
              row[column] = key;
            } else {
              if (stats.jobs[key][column]) {
                row[column] = stats.jobs[key][column];
              } else {
                row[column] = "";
              }
            }
          });
          items.push(row);
        });
      }

      return items;
    },
  },
  mounted() {
    this.items = this.getJobItems();
  },
  computed: {
    get_stats() {
      return this.$store.state.job_stats;
    },
  },
  watch: {
    get_stats() {
      this.items = this.getJobItems();
    },
  },
};
</script>
