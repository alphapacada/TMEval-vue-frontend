<template>
    <section class="section bg-secondary section-lg">
         <div class="container">
             <div class="pt-5">
                    <h3 class="display-3">This tool assesses the performance accuracies of five Transmembrane Topology Prediction Methods.</h3>
                    </div>
                    <div class="">
                    

                        <div class="">
                            <h4 class=""><a href ="http://www.enzim.hu/hmmtop/html/adv_submit.html">HMMTOP</a>
                                <badge rounded type="success">HMM</badge>
                            </h4>
                            <div class="">
                                <p>Predicts both the localization of helical transmembrane segments and the topology of transmembrane proteins.</p>
                            </div>
                        </div>
                        <div class="">
                            <h4 class=""><a href="http://cctop.enzim.ttk.mta.hu/">CCTOP</a>
                                <badge rounded type="default">Consensus</badge>
                            </h4>
                            <div class="">
                                <p>Utilizes 10 different state-of-the-art topology prediction methods and incorporates topology information from existing experimental and computational sources.</p>
                            </div>
                        </div>
                        <div class="">
                            <h4 class=""><a href = "http://www.yeastrc.org/philius/pages/philius/runPhilius.jsp">PHILIUS</a></h4>
                            <div class="">
                                <p>Combined transmembrane topology and signal peptide predictor that extends Phobius by exploiting the power of dynamic Bayesian networks.</p>
                            </div>
                            <h4 class=""><a href = "http://bioinf.cs.ucl.ac.uk/psipred/?memsatsvm=1">MEMSAT-SVM</a></h4>
                            <div class="">
                                <p>Improved using SVMs. This method is capable of differentiating signal peptides from transmembrane helices.</p>
                            </div>
                            <h4 class=""><a href = "http://topcons.net/">TOPCONS</a></h4>
                            <div class="">
                                <p>Consensus prediction of membrane protein topology and signal peptides.</p>
                            </div>
                        </div>
                    </div>
         </div>
    </section>
    
</template>

<script>
import JobSection from "@/views/components/JobSection.vue";
export default {
    components:{
        JobSection
    }
}
</script>

<style>

</style>
