<template>
  <div
    ref="topologyContainer"
    class="up_pftv_category_TOPOLOGY"
    v-resize-watcher="resizewatcher"
  >
    <div class="up_pftv_category">
      <div class="up_pftv_category-viewer">
        <div class="">
          <svg :width="topologyWidth" height="40">
            <g class="up_pftv_category-viewer-group">
              <path
                tabindex="0"
                v-for="p in paths"
                v-b-popover.hover.top="p.popover.popover_msg"
                :title="p.popover.title"
                :content="p.popover.popover_msg"
                :class="p.class"
                :key="p.id"
                :d="p.d"
                :transform="p.transform"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VBPopover } from "bootstrap-vue";
import FeatureFactory from "ProtVista/src/FeatureFactory";
export default {
  name: "topology",
  directives: {
    "b-popover": VBPopover,
  },
  props: {
    seq: String,
  },
  data() {
    return {
      sequence: "",
      paths: [],
      topologyWidth: 0,
    };
  },
  methods: {
    resizewatcher() {
      this.topologyWidth = this.$refs.topologyContainer.clientWidth;
    },
    loadPaths() {
      this.paths = [];
      this.sequence = this.seq;
      var length = this.sequence.length;
      var newPath = {};
      var tOffset = 0,
        pathCount = 0,
        currentLength = 0,
        currentIndex = 0,
        currentClass = "",
        currentChar = "",
        currentText = "";

      if (length > 0) {
        currentChar = this.sequence.charAt(currentIndex);
        for (currentIndex = 0; currentIndex <= length; currentIndex++) {
          if (this.sequence.charAt(currentIndex) == currentChar) {
            currentLength++;
          } else {
            switch (currentChar) {
              case "i":
              case "I":
                currentClass = "up_pftv_feature up_pftv_topo_dom";
                currentText =
                  "Inside\n" + "Length: " + currentLength.toString();
                break;
              case "o":
              case "O":
                currentClass = "up_pftv_feature up_pftv_topo_dom";
                currentText =
                  "Outside\n" + "Length: " + currentLength.toString();
                break;
              case "M":
                currentClass = "up_pftv_feature up_pftv_transmem";
                currentText =
                  "Transmembrane\n" + "Length: " + currentLength.toString();
                break;
              case "S":
                currentClass = "transmem_green";
                currentText =
                  "Signal Peptide\n" + "Length: " + currentLength.toString();
                break;
              default:
                currentText =
                  '"' +
                  currentChar +
                  '"' +
                  "\n" +
                  "Length: " +
                  currentLength.toString();
                currentClass = "transmem_default";
            }
            newPath = {
              name: "TOPOLOGY_" + pathCount,
              class: currentClass,
              d: FeatureFactory.getFeature(
                "transmem",
                1,
                10,
                (currentLength / length) * this.topologyWidth
              ),
              transform: "translate(" + tOffset + ",1)",
              popover: {
                popover_msg: currentText,
                title: "Details",
              },
            };
            this.paths.push(newPath);
            currentChar = this.sequence.charAt(currentIndex);
            pathCount++;
            tOffset += (currentLength / length) * this.topologyWidth;
            currentLength = 0;
            currentIndex--;
          }
        }
      } else {
        this.paths = [];
      }
    },
  },
  mounted() {
    this.resizewatcher();
    this.loadPaths();
  },
};
</script>

<style>
.transmem_green {
  fill: green;
  stroke: darkgreen;
}

.transmem_default {
  stroke: gray;
  fill: transparent;
}
</style>
