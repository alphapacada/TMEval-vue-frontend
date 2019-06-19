<template>
    <div id="data-comparison-container" class="container">
        <div id="dc-header" class="row">
            <div class="col">
                <h1 class="pt-3 pb-5">
                    Dataset Comparison
                </h1>
            </div>
        </div>
        <div id="dc-all" class="row pt-2">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <h3>
                            Prediction tools vs TMeval
                        </h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8">
                        <img src="/img/figures/predtools.png" class="img-fluid" >
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>
                            From 10494 proteins with no more than 25% pairwise sequence 
                            similarity, only 8488 entries remained after 
                            common entries from the dataset of Tmeval and the prediction tools were removed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <v-divider></v-divider>
        <div id="dc-cctop" class="row pt-2">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <h3>
                            CCTOP vs TMeval
                        </h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8">
                        <img src="/img/figures/CCTOP.png" class="img-fluid" >
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>
                            There are only 29 common entries between the CCTOP and TMEval datasets. 
                            Accession Ids in the 'CrossRef' section of a CCTOPItem  was used to find common entries.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <v-divider></v-divider>
         <div id="dc-hmmtop" class="row pt-2">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <h3>
                            HMMTOP vs TMeval
                        </h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8">
                        <img src="/img/figures/hmmtop.png" class="img-fluid" >
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>
                            Only 9 entries are common between HMMTOP and TMeval. The HMMTOP dataset contains Uniprot entry names.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <v-divider></v-divider>
        <div id="dc-philius" class="row pt-2">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <h3>
                            Philius vs TMeval
                        </h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8">
                        <img src="/img/figures/philius.png" class="img-fluid" >
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>
                             With 412 entries in common, Philius and TMeval have the second-most number of common entries . 
                             Philius used the Phobius dataset for model development.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <v-divider></v-divider>
        <div id="dc-tmhmm2" class="row pt-2">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <h3>
                            TMHMM2 vs TMeval
                        </h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8">
                        <img src="/img/figures/TMHMM2.png" class="img-fluid" >
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>
                            Twenty percent of TMHMM2's dataset exists within the TMeval dataset.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <v-divider></v-divider>
        <div id="dc-topcons2" class="row pt-2">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <h3>
                            TOPCONS2 vs TMeval
                        </h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8">
                        <img src="/img/figures/TOPCONS.png" class="img-fluid" >
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>
                            The TOPCONS2 dataset, being the largest of all prediction tools, 
                            has 1238 entries in common with the TMeval dataset.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
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