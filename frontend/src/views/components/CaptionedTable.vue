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
            ></v-data-table
          >
        </div>
      </div>
      <div v-if="Boolean(text)" class="row">
        <div
          v-resize-text="{ minFontSize: '9px', maxFontSize: '16px' }"
          class="mx-auto p-3 col-xs-12 col-md-8 bg-secondary"
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
    src: Object,
    //Text below image
    text: String,
  },
  methods: {
    handleClick(evt) {
      console.log("evt", evt);
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
</style>
