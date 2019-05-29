
<template>
    <section class="section bg-secondary section-lg">
         <div class="container">
            <job-section :id="job_id"></job-section>
            <base-button @click="postLongTask()">Start Long Calculation</base-button>
            <div id="progress">
                 <!-- <div class='text-middle'> {{ percent }} </div> -->
                <base-progress type="success" :value="progress_value" :label="job_status"></base-progress>
                <div> {{ status }} </div>
                <div> {{ result }} </div>
            </div>
           
         </div>

         <!-- Result Comparison -->

         <div class="container shape-container align-items-center">
            <div  id="content-result">
            <div class="row">
                <div class="col-md-9">
                    <h1 class="display-2">Prediction results</h1>
                </div>
                <div class="col-md-3 align-items-right">
                    <base-dropdown>
                        <base-button slot="title" type="secondary" class="dropdown-toggle">
                            {{ selectedMethod }}
                        </base-button>

                       <li style="cursor:pointer" @click="setSelectedMethod(index)" class="dropdown-item" :key=method.id v-for="(method,index) in predictionMethods">{{ method.name }}</li>


                    </base-dropdown>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <h5>Raw results</h5>
                    <textarea v-model="rawResult" class="form-control text-black col" rows="20" readonly></textarea>
                </div>
                <div class="col-sm-6">
                    <h5>Processed results</h5>
                    <textarea v-model="processedResult" class="form-control text-black col" rows="20" readonly></textarea>
                </div>
            </div>
            </div>
        </div>
    </section>
    
</template>

<script>
import $backend from '../api'
import JobSection from "@/views/components/JobSection.vue";
export default {
    name: "PredictionResult",
    data() {
        return {
        job_status:'',
        job_id:'---',
        progress_value:0,
        percent: 0,
        status: '',
        result: '',
        predictionMethods:[],
        selectedMethod:'Method',
        selectedMethodIndex: 0,
        rawResult:'',
        processedResult:''
        }
      

    },
    components:{
        JobSection
    },
    
    created() {
        this.fetchData()
        console.log(this.$route.params.id)
        this.job_id = this.$route.params.id;
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
    // watch: {
    //     // call again the method if the route changes
    //     '$route': 'fetchData'
    // },
    methods: {
        fetchData() {
            this.error = null
            if (this.$route.params.id) {
                this.getLongTask(this.$route.params.id)
            }
        },
       
        // postLongTask() {
            
            
        //      $backend.postLongTask()
        //      .then(responseData => {
        //         console.log(responseData)
                
        //          //let status_url = responseHeaders['location'];
        //         let task_id = responseData['task_id']
        //         this.$router.push({query: {jobId: task_id}})
        //         this.getLongTask(this.$route.params.jobId)
                 
                
        //      })

        // },
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
                    },2000);
                }
               

            })
           

        },
        //prediction_res -> a dict containing the results of the prediction 
        fetchPredictionResults(prediction_res) {
            this.rawResult = prediction_res[0][0];
            this.processedResult = prediction_res[0][1];
            console.log(prediction_res)
        },
        setSelectedMethod(index){
            this.selectedMethod = this.predictionMethods[index].name;
            this.selectedMethodIndex = index;

            this.rawResult = 'Raw results for ' + this.selectedMethod;
            this.processedResult = 'Refined results for ' + this.selectedMethod;
        }
       
        // .then(response => (this.message = response))
    },
}


</script>



<style>
.text-black{
    color:black !important;
}
</style>
