<template>
    <div id="data-comparison-container" class="container">
        <div id="dc-header" class="row">
            <div class="col">
                <h2 class="pt-3 pb-5">
                    Dataset Comparison
                </h2>
            </div>
        </div>
        <div :id="dc.hash" v-for="dc in dcs" :key="dc.id">
            <div  class="row pt-2">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <h4>
                            {{ dc.title }}
                        </h4>
                    </div>
                </div>
                    <div class="row justify-content-center">
                    <div class="col-8">
                        <img :src="dc.img_src" class="img-fluid" >
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>
                           {{ dc.desc }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <v-divider></v-divider>
        </div>
    </div>
        
    
    
</template>
<script>
export default {
    data(){
        return{
            dcs: [
                {
                    hash:"dc-all",
                    title:"Prediction Tools vs TMEval",
                    img_src: "/img/figures/predtools.png",
                    desc:   `From 10494 proteins with no more than 25% pairwise sequence 
                            similarity, only 8488 entries remained after 
                            common entries from the dataset of Tmeval and the prediction tools were removed.`
                },
                {
                    hash: "dc-cctop",
                    title: "CCTOP vs TMeval",
                    img_src: "/img/figures/CCTOP.png",
                    desc:   `There are only 29 common entries between the CCTOP and TMEval datasets. 
                            Accession Ids in the 'CrossRef' section of a CCTOPItem  was used to find common entries.`
                },
                {
                    hash: "dc-hmmtop",
                    title: "HMMTOP vs TMeval",
                    img_src: "/img/figures/hmmtop.png",
                    desc: ' Only 9 entries are common between HMMTOP and TMeval. The HMMTOP dataset contains Uniprot entry names.',
                },
                {
                    hash: "dc-philius",
                    title: "Philius vs TMeval",
                    img_src: "/img/figures/philius.png",
                    desc:   ` With 412 entries in common, Philius and TMeval have the second-most number of common entries . 
                             Philius used the Phobius dataset for model development.`,
                },
                {
                    hash: "dc-tmhmm2",
                    title: "TMHMM2.0 vs TMeval",
                    img_src: "/img/figures/TMHMM2.png",
                    desc: ` About twenty percent (27 entries) of TMHMM2.0's dataset exists within the TMEval dataset.`

                },
                {
                    hash: "dc-topcons2",
                    title: "TOPCONS2 vs TMeval",
                    img_src: "/img/figures/TOPCONS.png",
                    desc: `The TOPCONS2 dataset, being the largest of all prediction tools, 
                            has 1238 entries in common with the TMeval dataset.`
                }


            ],

            predictionMethods:[],
            selectedMethod:'Method',
            selectedMethodIndex: 0,
            rawResult:'',
            processedResult:''
        }
    },
    mounted(){
        var fakeApiResults ={
            "methods":[
            {"id":"0", "name":"CCTOP"}, 
            {"id":"1", "name":"HMMTOP"},
            {"id":"2", "name":"Philius"},
            {"id":"3", "name":"Other prediction"}
            ]
        };
        this.predictionMethods = fakeApiResults.methods;
        this.selectedMethod = this.predictionMethods[0].name;

        this.rawResult = 'Raw results for ' + this.selectedMethod;
        this.processedResult = 'Refined results for ' + this.selectedMethod;
    },
    methods:{
        setSelectedMethod(index){
            this.selectedMethod = this.predictionMethods[index].name;
            this.selectedMethodIndex = index;

            this.rawResult = 'Raw results for ' + this.selectedMethod;
            this.processedResult = 'Refined results for ' + this.selectedMethod;
        }
    }
}
</script>
<style>
textarea {
    resize:none;
}

#content-result{
    padding-top:5rem;
}
</style>