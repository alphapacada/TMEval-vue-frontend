<template>
  <section class="section bg-secondary section-lg">
    <v-app class="bg-secondary">
      <div class="container bg-white pt-3">
        <div id="tmeval-dataset" class="row">
          <div class="col">
            <h3>
              TMeval Dataset
            </h3>
            <v-expansion-panels v-model="panel" popout>
              <v-expansion-panel
                :v-model="panel"
                expand
                v-for="(item, i) in 3"
                :key="i"
              >
                <v-expansion-panel-header>
                  {{ $options.tmevalDataset[i].similarity.text }}% Similarity
                </v-expansion-panel-header>
                <v-expansion-panel-content class="dataset-panel">
                  <div
                    class="row dataset-row border border-bottom-0 border-dark dataset-table mt-1"
                  >
                    <div
                      class=" col dataset-row-content border-bottom border-dark similarity-col"
                    >
                      <span>{{
                        $options.tmevalDataset[i].similarity.text
                      }}</span
                      >&nbsp;<span
                        @click="
                          downloadFasta($options.tmevalDataset[i].similarity)
                        "
                        class="download-text"
                      >
                        <i class="fa fa-download"></i
                      ></span>
                    </div>
                    <div class="col downloads-col">
                      <div
                        v-for="organism_row in $options.tmevalDataset[i]
                          .organism"
                        :key="organism_row.$index"
                        class="row organism-row"
                      >
                        <div
                          class="dataset-row-content border-left border-bottom border-dark"
                        >
                          <span>{{ organism_row.text }}</span
                          >&nbsp;<span
                            @click="downloadFasta(organism_row)"
                            class="download-text"
                          >
                            <i class="fa fa-download"></i
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div class="col downloads-col">
                      <div
                        v-for="protein_type_row in $options.tmevalDataset[i]
                          .protein_type"
                        :key="protein_type_row.$index"
                        class="row protein-type-row"
                      >
                        <div
                          class="dataset-row-content border-left border-bottom border-dark"
                        >
                          <span>{{ protein_type_row.text }}</span
                          >&nbsp;<span
                            @click="downloadFasta(protein_type_row)"
                            class="download-text"
                          >
                            <i class="fa fa-download"></i
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div class="col downloads-col">
                      <div
                        v-for="sp_presence_row in $options.tmevalDataset[i]
                          .sp_presence"
                        :key="sp_presence_row.$index"
                        class="row"
                      >
                        <div
                          class="dataset-row-content border-left border-bottom border-dark sp-presence-row"
                        >
                          <span>{{ sp_presence_row.text }}</span
                          >&nbsp;<span
                            @click="downloadFasta(sp_presence_row)"
                            class="download-text"
                          >
                            <i class="fa fa-download"></i
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
        <a style="display:none" ref="download"> </a>
        <div id="training-dataset" class="row">
          <div class="col">
            <h3>
              Training Dataset
            </h3>
            <table class="container">
              <tr
                class="row"
                :key="index"
                v-for="(file, index) in trainingDataset"
              >
                <td v-ripple="true" class="table-entry col">
                  <tr class="row">
                    <td class="col-1 pr-1 text-center align-items-center">
                      <span
                        @click="downloadFile(file.name)"
                        class="download-text"
                        ><i class="fa fa-download"></i
                      ></span>
                    </td>
                    <td class="col-10">
                      <tr class="row col pb-1">
                        <td class="file-name col">
                          {{ file.name }} ({{ file.size }})
                        </td>
                      </tr>
                    </td>
                  </tr>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </v-app>
  </section>
</template>
<script>
import $backend from "../api";
import Datasets from "../Datasets.json";
export default {
  tmevalDataset: Datasets,
  data() {
    return {
      panel: 0,
      trainingDataset: [
        {
          name: "CCTOP.tar.xz",
          size: "147.4 kB",
        },
        {
          name: "HMMTOP.tar.xz",
          size: "520 bytes",
        },
        {
          name: "Memsat-svm.tar.xz",
          size: "531.3 kB",
        },
        {
          name: "philius.tar.xz",
          size: "803.1 kB",
        },
        {
          name: "tmhmm2.tar.xz",
          size: "114.5 kB",
        },
        {
          name: "TOPCONS2.tar.xz",
          size: "1.8 MB",
        },
        {
          name: "TMSEG.tar.xz",
          size: "8.5 kB",
        },
      ],
    };
  },
  methods: {
    downloadFile(filename) {
      this.$refs.download.href =
        $backend.getBaseURL() + "files/datasets/prediction/" + filename;
      this.$refs.download.click();
    },
    downloadFasta(file) {
      this.$refs.download.href =
        $backend.getBaseURL() +
        "files/tmeval-datasets/" +
        file.file_name +
        "?" +
        new URLSearchParams(file.parameters).toString();
      this.$refs.download.click();
    },
  },
};
</script>
<style scoped>
.similarity-col {
  margin-left: 0px !important;
}
.col.downloads-col {
  padding: 0px;
  margin: 0px;
}
.table-entry :hover {
  background-color: rgb(188, 248, 188);
}
.download-text {
  color: blue;
  cursor: pointer;
}
.dataset-row-content {
  width: 100%;
  margin-left: -12px;
}
.organism-row {
  height: 216px;
}
.protein-type-row {
  height: 108px;
}
.sp-presence-row {
  height: 54px;
}
.dataset-row-content > span {
  width: 100%;
  line-height: 2;
}
.dataset-table {
  min-width: 720px;
}
.dataset-panel {
  overflow-x: auto;
  min-width: 320px;
}
#tmeval-dataset {
  overflow-x: auto;
  min-width: 320px;
}
.dataset-header-content {
  width: 100%;
  line-height: 2;
  text-align: center;
}
</style>
