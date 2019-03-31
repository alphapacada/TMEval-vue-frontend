<template>
    <section class="section bg-secondary section-lg">
         <div class="container">
            <job-section></job-section>
            <base-progress type="success" :value="60" label="Prediction Job completed"></base-progress>
         </div>
    </section>
    
</template>

<script>
import JobSection from "@/views/components/JobSection.vue";
export default {
    name: "PredictionResult",
    components:{
        JobSection
    }
}
</script>



<style>

</style>
