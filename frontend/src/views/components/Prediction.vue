
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
                                        <textarea class="form-control" id="Textarea1" rows="5" v-model="sequence" placeholder="Enter an amino-acid sequence"></textarea>
                                        <div class="text-danger invalid-feedback" style="display: block;" v-show="errorSequence">
                                            {{ errorSequence }}
                                        </div>
                                    </div>
                                    
                                    <base-input :error="errorEmail" v-model="email" label="Email (for batch submissions)" >
                                        <!-- <template name="label">ajijij</template> -->
                                    </base-input>
                                    <base-button class="col-md-3" type="primary" v-on:click="checkForm">Submit</base-button>
                                    <base-button size="sm" v-on:click="setExample" type="secondary">Example</base-button> 
                                    <base-button size="sm" @click="clearForm" type="secondary">Clear</base-button>
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
            errorEmail: '',
            errorSequence: '',
            usecctop: true,
            message: null,
            email: '',
            fasta: null,
            sequence: '',
            example: '>Q9CQZ5 NADH dehydrogenase [ubiquinone] 1 alpha subcomplex subunit 6\nMAAAATGLRQAAAAAASTSVKPIFSRDLNEAKRRVRELYRAWYREVPNTVHLMQLDITVKQGRDKVREMFMKNAHVTDPRVVDLLVIKGKMELQETIKVWKQRTHVMRFFHETETPRPKDFLSKFYMGHDP'
        };
    },
    components: {
        ToolsToggler
    },
    methods:{
        test() {
        console.log("Button clicked!");
        ToolsToggler.test();
        },
        checkForm(e) {
            if (!this.email) 
            {
                this.errorEmail = 'Please fill in this field.';
                console.log('empty email');
            } 
            else if (!this.validEmail(this.email)) 
            {
                this.errorEmail = 'Please enter a valid email address.';
                console.log('invalid email');
            }
            else
            {
                this.errorEmail = '';
            }

            if(!this.sequence){
                console.log('Empty textarea');
                this.errorSequence = 'Please enter a sequence.';
            }
            else{
                this.errorSequence = '';
            }
            e.preventDefault();
        },
        validEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        },
        setExample() {
            this.sequence = this.example;
        },
        submitSequence() {
            
        },
        clearForm() {
            this.email = '';
            this.sequence = '';
            this.errorEmail = '';
            this.errorSequence = '';
        }


    },
    mounted () {

        // this.axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        // .then(response => (this.message = response))
    },
    

};


</script>

