<template>
  <section class="section-hero section-shaped my-0">
    <div class="shape shape-style-1 shape-dark">
      <span class="span-150"></span>
      <span class="span-50"></span>
      <span class="span-50"></span>
      <span class="span-75"></span>
      <span class="span-100"></span>
    </div>
    <div class="container shape-container d-flex align-items-center">
      <div class="col px-0">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-8 text-center pt-lg">
            <img
              src="img/brand/tmbrand.png"
              style="width: 300px;"
              class="img-fluid"
            />
            <p class="lead text-white mt-4 mb-5">
              Evaluator for Transmembrane Protein Prediction Methods
            </p>
            <div class="btn-wrapper">
              <base-button
                @click="$router.push('/#view_assessment')"
                class="mb-3 mb-sm-0"
                type="success"
                icon="fa fa-bar-chart"
              >
                View Assessment
              </base-button>
              <base-button
                key="hello"
                @click="$router.push('/#predict_sequences')"
                class="mb-3 mb-sm-0 text-wrap"
                type="secondary"
                icon="fa fa-upload"
              >
                Submit Sequences for Prediction
              </base-button>
            </div>
          </div>
        </div>
        <div
          class="row align-items-center justify-content-around stars-and-coded"
        ></div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "tm-hero",
};
</script>
<style scoped>
.text-wrap {
  white-space: normal;
}
</style>
