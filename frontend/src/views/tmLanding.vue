<template>
  <div>
    <div class="position-relative">
      <tm-hero></tm-hero>
      <about></about>
      <evaluation></evaluation>
      <prediction></prediction>
    </div>
  </div>
</template>
<script>
import tmHero from "./components/tmHero";
import About from "@/views/About";
import Prediction from "./components/Prediction";
import Evaluation from "@/views/components/Evaluation";

export default {
  name: "tmLanding",
  components: {
    tmHero,
    About,
    Prediction,
    Evaluation,
  },
};
</script>
