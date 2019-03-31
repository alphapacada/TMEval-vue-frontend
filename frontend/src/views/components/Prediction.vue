
<template>
        <section  id ="predict_sequences" class="section bg-secondary section-lg pt-0">
           
        
            <div class="container">
                <card gradient="success"
                    no-body
                    shadow-size="lg"
                    class="border-0"
                    headerClasses="text-success bg-gradient-primary">
                    <template v-slot:header>
                        <h3 class="text-secondary"><strong>TMEval Topology Prediction</strong>
                        </h3>
                    </template>
                    <div class="p-5 text-white">
                        <h3 class="text-white">Submit a fasta sequence for TM Topology Prediction.</h3>
                        <p class="lead text-white mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad omnis quae expedita ipsum nobis praesentium velit animi minus amet perspiciatis laboriosam similique debitis iste ratione nemo ea at corporis aliquam.</p>
                        <div class="row">
                            
                            <div class="col-md-8 py-3 mr-2  border rounded">
                      
                    
                                <form id="form_id" @submit="checkForm" method="post">
                                    <div class="form-group">
                                        <label for="">Fasta sequence</label>
                                        <textarea class="form-control" id="Textarea1" rows="5"  placeholder="Enter an amino-acid sequence"></textarea>
                                    </div>
                                    
                                    <base-input label="Email (for batch submissions)" >
                                        <!-- <template name="label">ajijij</template> -->
                                    </base-input>
                                    <base-button class="col-md-3" type="primary" v-on:click="message ='nyok nyok'">Submit</base-button>
                                    <base-button size="sm" type="secondary">Example</base-button> 
                                    <base-button size="sm" type="secondary">Clear</base-button>
                                </form>
                                
                            </div>
                            <div class="col-md-3 py-3 border rounded">
                                <label for="">Select methods to use for prediction.</label>
                                 <tools-toggler></tools-toggler>
                            </div>
                            
                        
                        </div>
                    </div>
                
                </card>
            </div>
        </section>
</template>
<script>
import ToolsToggler from "@/views/components/ToolsToggler"
export default {
    data(){
        return{
            message: null,
            fasta: null
        }
    },
    components: {
        ToolsToggler
    },
    methods:{
        checkForm(evt) {
            
        }


    },
    mounted () {
        // this.axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        // .then(response => (this.message = response))
    },
    

};


</script>

