<template>
    <section class="section bg-secondary section-lg">
         <div class="container">
            <job-section></job-section>
            <base-button @click="postLongTask()">Start Long Calculation</base-button>
            <div id="progress">
                 <div class='text-middle'> {{ percent }} </div>
                <base-progress type="success" :value="progress_value" :label="job_status"></base-progress>
                <div> {{ status }} </div>
                <div> {{ result }} </div>
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
        progress_value:0,
        percent: 0,
        status: '',
        result: '',
        }
      

    },
    components:{
        JobSection
    },
    
    created() {
        this.fetchData()
        console.log(this.$route.query.jobId)

    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchData'
    },
    methods: {
        fetchData() {
            this.error = null
            if (this.$route.query.jobId) {
                this.getLongTask()
            }
        },
       
        postLongTask() {
            
            
             $backend.postLongTask()
             .then(responseData => {
                console.log(responseData)
                
                 //let status_url = responseHeaders['location'];
                let task_id = responseData['task_id']
                this.$router.push({query: {jobId: task_id}})
                this.getLongTask(this.$route.query.jobId)
                 
                
             })

        },
        getLongTask(task_id) {
            console.log(task_id)
            $backend.getLongTask(task_id) 
            .then(responseData => {
                console.log(responseData)
                let percent = parseInt(responseData['current'] * 100 / responseData['total']);
                // console.log(percent)
                this.progress_value = percent;
                this.percent = percent;
                this.status = responseData['status'];
                this.job_status = "Prediction Job: " + responseData['state']
                if (responseData['state'] != 'PENDING' && responseData['state'] != 'PROGRESS') {
                    // if Job completed
                    if ('result' in responseData) {
                        this.result = 'Result' + responseData['result'];
                        this.fetchPredictionResults(responseData['prediction'])
                    } else { 
                    // check if job failed. e.g. result == 'FAILURE'
                        this.result = 'Result' + responseData['state'];
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
            console.log(prediction_res)
        }
       
        // .then(response => (this.message = response))
    },
}


</script>



<style>

</style>
