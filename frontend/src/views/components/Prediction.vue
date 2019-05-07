
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
                                        <textarea :disabled="Boolean(file)" :class="{'is-invalid':errorSequence}" class="form-control" id="Textarea1" rows="5" v-model="sequence" placeholder="Enter an amino-acid sequence"></textarea>
                                        
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div v-if="!Boolean(file)" class="col-1 my-auto pr-0 text-center">
                                                <span>or</span>
                                            </div>
                                            <div v-if="Boolean(file)" class="col-2 pr-0">
                                                <base-button class="col" type="danger" v-on:click="removeFile">Remove</base-button>
                                            </div>
                                            <div :class="Boolean(file) ? 'col-10' : 'col-11'" @click="clearSequence">
                                                <b-form-file
                                                    v-model="file"
                                                    :state="Boolean(file)"
                                                    placeholder="Choose a file..."
                                                    drop-placeholder="Drop file here..."
                                                    ></b-form-file>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-danger invalid-feedback" style="display: block;" v-show="errorSequence">
                                        {{ errorSequence }}
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
                                <label for=""><h5 class="text-secondary">Select methods to use for prediction.</h5></label>
                                 <div>
                                    
                                    <base-checkbox v-model="predictionMethodToggles[index]" :key=method.id v-for="(method, index) in predictionMethods">
                                        <span class="toggle-text">{{method.name}}</span>
                                    </base-checkbox>
                                    <div class="text-danger invalid-feedback" style="display: block;" v-show="errorToggle">
                                            {{ errorToggle }}
                                    </div>
                                </div>
                            </div>
                            
                        
                        </div>
                    </div>
                
                </card>
            </div>
        </section>
</template>
<script>
// import { randomString } from "./stringUtils"; // for random key generation
import BFormFile from 'bootstrap-vue/es/components/form-file/form-file'
import ToolsToggler from "@/views/components/ToolsToggler"
import $backend from '@/api'
export default {
    data(){
        return{
            file: null,
            predictionMethods:[],
            predictionMethodToggles:[],
            checkedMethods:[],
            errorEmail: '',
            errorSequence: '',
            errorToggle: '',
            usecctop: true,
            message: null,
            email: '',
            fasta: null,
            sequence: '',
            example: '>Q9CQZ5 NADH dehydrogenase [ubiquinone] 1 alpha subcomplex subunit 6\nMAAAATGLRQAAAAAASTSVKPIFSRDLNEAKRRVRELYRAWYREVPNTVHLMQLDITVKQGRDKVREMFMKNAHVTDPRVVDLLVIKGKMELQETIKVWKQRTHVMRFFHETETPRPKDFLSKFYMGHDP'
        };
    },
    components: {
        ToolsToggler,
        "b-form-file": BFormFile,
    },
    methods:{
        test() {
        console.log("Button clicked!");
        ToolsToggler.test();
        },
        checkForm(e) {
            e.preventDefault();
            var checkResults = [this.checkSequence(),this.checkToggles()];
            if(!checkResults.includes(false)){
                this.submitForm();
            }
        },
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        setExample() {
            this.sequence = this.example;
            this.file = null;
        },
        checkEmail(){
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
                return true;
            }
            return false;
        },
        checkSequence(){
            if(!this.sequence && !Boolean(this.file)){
                console.log('Empty textarea');
                this.errorSequence = 'Please enter a sequence or upload a file.';
            }
            else if(this.sequence && Boolean(this.file)){
                console.log('This shouldnt be reached.');
                this.errorSequence = 'Please input either a sequence or a file only.';
            }
            else{
                this.errorSequence = '';
                return true;
            }
            return false;
        },
        checkToggles(){
            if(this.predictionMethodToggles.includes(true))
            {
                this.errorToggle = '';
                return true;
            }
            else
            {
                this.errorToggle = 'Please select at least 1 prediction method.';
                return false;
            }
        },
        submitForm() {
            // $backend.postFasta()
            console.log(this.sequence)
            console.log(this.predictionMethodToggles)

            var predictionData = [];
            var data;
            var i;
            for(i = 0; i < this.predictionMethodToggles.length; i++)
            {
                if(this.predictionMethodToggles[i])
                {
                    data = {"id":this.predictionMethods[i].id}
                    predictionData.push(data);
                }
            }
            console.log(predictionData);
            var evaluationData = {
                "file": this.file,
                "sequence": this.sequence,
                "email": this.email,
                "tools": predictionData
            }
            console.log(evaluationData)
            $backend.postFasta(evaluationData)
            console.log('Form submitted!');
        },
        clearForm() {
            this.email = '';
            this.sequence = '';
            this.errorEmail = '';
            this.errorSequence = '';
            this.errorToggle = '';
            this.file = null;
            var i;
            for(i = 0; i < this.predictionMethods.length; i++){
                this.predictionMethodToggles[i] = true;
            }
        },
        removeFile() {
            this.file = null;
        },
        clearSequence() {
            this.sequence = '';
        },
        getTools() {
            $backend.getPredTools().then(responseData=>{
                 this.predictionMethods = responseData
                
            })
        },
        


    },
    mounted () {
        var fakeApiResults ={
            "methods":[
            {"id":"0", "name":"CCTOP"}, 
            {"id":"1", "name":"HMMTOP"},
            {"id":"2", "name":"Philius"},
            {"id":"3", "name":"Other prediction"}
            ]
        };
        this.getTools();
        console.log(this.predictionMethodToggles.map(function(idx) { return str.length > 0; }))
        var i;
        for(i = 0; i < this.predictionMethods.length; i++){
            this.predictionMethodToggles[i] = true;
        }
        // this.axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        // .then(response => (this.message = response))
    },
    

};


</script>

<style>
.toggle-text{
    font-size:1rem;
}
</style>