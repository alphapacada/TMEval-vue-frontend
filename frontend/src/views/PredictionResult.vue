
<template>
    <section class="section bg-secondary section-lg">
         <div class="container">
            <job-section :id="job_id" :url="job_url"></job-section>
            <div id="progress">
                <base-progress type="success" :value="progress_value" :label="job_status"></base-progress>
            </div>
         </div>

         <!-- + PRED RES -->

         <div class="mt-4 container shape-container align-items-center">
            <v-card class="pt-0 pb-3" id="content-result">
                <v-card-title primary-title>
                    <h1 class="col-md-9">
                        Prediction Results
                    </h1>
                    <div class="col-md-3 align-items-right">
                        <base-dropdown>
                            <base-button slot="title" type="success" class="dropdown-toggle">
                                {{ selectedMethod }}
                            </base-button>
                            <li style="cursor:pointer" @click="setSelectedMethod(index)" class="dropdown-item" :key="index" v-for="(method,index) in predictionMethods">{{ method }}</li>
                        </base-dropdown>
                    </div>
                </v-card-title>
                <v-card-text class="row mx-0">
                    <div class="col-6">
                        <h5>Raw results</h5>
                        <textarea v-model="rawResult" class="form-control text-black col" rows="20" readonly></textarea>
                    </div>
                    <div class="col-6">
                        <h5>Processed results</h5>
                        <textarea v-model="processedResult" class="form-control text-black col" rows="20" readonly></textarea>
                    </div>
                </v-card-text> 
            </v-card>
             <!-- - PRED RES -->
            
            <!-- + TOPOLOGY  -->
            <v-card class="p-2 mt-2">
                <v-card-title primary-title>
                    <h2>Topologies</h2>
                </v-card-title>
                <div v-for="t in topologies" :key="t.index">
                    <h6>{{ t.name }}</h6>
                    <topology :seq="t.topology"></topology>
                </div>
            </v-card>
            <!-- - TOPOLOGY -->
        </div>
    </section>
    
</template>

<script>
import $backend from '../api'
import Topology from './components/Topology';
import JobSection from "@/views/components/JobSection.vue";
export default {
    name: "PredictionResult",
    data() {
        return {
        topologies:[],
        job_status:'',
        job_id:'---',
        job_url: '',
        progress_value:0,
        percent: 0,
        status: '',
        result: '',
        predictionMethods:[],
        selectedMethod:'Method',
        selectedMethodIndex: 0,
        rawResult:'',
        processedResult:'',
        results: []
        }
    },
    components:{
        JobSection,
        Topology
    },
    created() {
        this.fetchData()
        console.log(this.$route.params.id, this.$route.query.page)
        this.job_id = this.$route.params.id;
        this.job_url = this.$route.path;
        
    },
    methods: {
        fetchData() {
            this.error = null
            if (this.$route.params.id) {
                this.getLongTask(this.$route.params.id)
            }
        },
        getLongTask(task_id) {
            console.log(task_id)
            $backend.getPredResults(task_id) 
            .then(responseData => {
                console.log(responseData)
                let percent = (responseData.data['current'] * 100 / responseData.data['total']);
                this.progress_value = percent;
                this.percent = percent;
                this.status = responseData.data['status'];
                this.job_status = "Prediction Job: " + responseData.data['state']
                if (responseData.data['state'] != 'PENDING' && responseData.data['state'] != 'PROGRESS') {
                    // if Job completed
                    if ('result' in responseData.data) {
                        this.result = 'Result' + responseData.data['result'];
                        this.fetchPredictionResults(responseData.data['result'])
                    } else { 
                    // check if job failed. e.g. result == 'FAILURE'
                        this.result = 'Result' + responseData.data['state'];
                    }
                }
                else {
                    setTimeout( () =>{
                        this.getLongTask(task_id);
                    },5000);
                }
            })
        },
        //prediction_res -> a dict containing the results of the prediction 
        fetchPredictionResults(prediction_res) {
            // this.rawResult = prediction_res[0][0];
            // this.processedResult = prediction_res[0][1];
            console.log(prediction_res)
            this.results = prediction_res;
            console.log(this.results)
            let i = 0;
            for(const predMethod of this.results)
            {
                console.log(predMethod);
                this.predictionMethods.push(predMethod['tool']);
                var topologyObj;
                topologyObj = {
                    'index': i,
                    'topology': predMethod.parsed_res[0].topology.annotation,
                    'name': predMethod.tool
                };
                this.topologies.push(topologyObj);
                i++;
            }
            console.log(this.predictionMethods);
            this.setSelectedMethod(0);
        },
        setSelectedMethod(index){
            this.selectedMethod = this.predictionMethods[index];
            this.selectedMethodIndex = index;
            this.rawResult = this.results[index].pred_tool_res;
            this.processedResult = JSON.stringify(this.results[index].parsed_res[0],null,2);
        }
    },
}
</script>
<style scoped>
.text-black{
    color:black !important;
}

textarea{
    white-space: nowrap; /* will prevent the default wrapping of text to next line */
    overflow-x: auto; 
    white-space: pre;
    resize:none;
}
</style>
