<template>
  <div class="row pb-3">
    <div class="col">
      <div class="row">
        <div class="text-center mx-auto col-xs-12 col-md-8 table-responsive">
          <v-data-table
            loading-text
            hide-default-footer
            :headers="src.headers"
            :items="src.items"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td :key="header.id" v-for="(header, index) in src.headers">
                  {{
                    index > 0
                      ? Math.round(item[header.value] * 100) / 100
                      : item[header.value]
                  }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </div>
      <div v-if="Boolean(text)" class="row">
        <div
          v-resize-text="{ minFontSize: '9px', maxFontSize: '16px' }"
          class="caption-text mx-auto p-3 col-xs-12 col-md-8 bg-secondary"
        >
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { BImg } from "bootstrap-vue/esm/components/image/img";
export default {
  components: {
    BImg,
  },
  name: "caption-table",
  props: {
    //Image source
    src: [Object, Array],
    //Text below image
    text: String,
  },
  methods: {
    handleClick(evt) {
      this.$emit("clicked");
    },
  },
};
</script>
<style scoped>
table {
  width: auto !important;
}
.table-html {
  display: inline-block;
}
.caption-text {
  white-space: pre-line;

  /* // or pre-line */
}
</style>
