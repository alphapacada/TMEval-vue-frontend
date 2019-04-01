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
    methods: {
        postLongTask() {
             $backend.postLongTask()
             .then(responseData => {
                 console.log(responseData)
                 //let status_url = responseHeaders['location'];
                 let task_id = responseData['task_id']
                 
                 this.updateProgress(task_id)
             })

        },
        updateProgress(task_id) {
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
                     if ('result' in responseData) {
                    this.result = 'Result' + responseData['result'];
                    } else {
                        this.result = 'Result' + responseData['state'];
                    }
                }
                else {
                    setTimeout( () =>{
                        this.updateProgress(task_id);
                    },2000);
                }
               

            })
           

        },
       
        // .then(response => (this.message = response))
    }
}


</script>



<style>

</style>
