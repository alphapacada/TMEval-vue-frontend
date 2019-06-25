<template>
    <div>

        <div class="position-relative">
          <tm-hero></tm-hero>
          <evaluation></evaluation>
          <prediction></prediction>        
        </div>
        
    </div>
</template>
<script>
import tmHero from "./components/tmHero";
import Prediction from "./components/Prediction";
import Evaluation from "@/views/components/Evaluation";


export default {
  name: "tmLanding",
  components: {
    tmHero,
    Prediction,
    Evaluation,
  },
  data() {
      return{
          html: '<table border="1" class="dataframe" id="e_25_mcc">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>Protein Orientation MCC</th>\n      <th>Protein Classification MCC</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>CCTOP</th>\n      <td>0.844473</td>\n      <td>0.531856</td>\n    </tr>\n    <tr>\n      <th>HMMTOP</th>\n      <td>0.419027</td>\n      <td>0.320231</td>\n    </tr>\n    <tr>\n      <th>PHILIUS</th>\n      <td>0.620411</td>\n      <td>0.805827</td>\n    </tr>\n    <tr>\n      <th>TMHMM2</th>\n      <td>0.451227</td>\n      <td>0.459662</td>\n    </tr>\n    <tr>\n      <th>TOPCONS2</th>\n      <td>0.732467</td>\n      <td>0.867385</td>\n    </tr>\n  </tbody>\n</table>'
      }
  }
};
</script>
