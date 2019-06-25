
<template>
        <section  id ="predict_sequences" class="section bg-secondary section-lg pt-0">
        <v-snackbar v-model="snackbar" :timeout="5000" :top="true">
            Submit failed. Please check inputs. 
            <v-icon class="pl-1" color="green" @click="snackbar = false">
                highlight_off
            </v-icon>
        </v-snackbar>
            
            <div class="container">
                <span>
                    <h2 class="display-1 pb-2">TMEval Topology Prediction</h2>
                </span>
                <card gradient="success"
                    no-body
                    shadow-size="lg"
                    class="border-1"
                    headerClasses="bg-gradient-success">  
                    <!-- bg-gradient-primary-->
                    <!-- text-success  =-->
                    <!-- <template v-slot:header>
                        <h1 class="display-1">TMEval Topology Prediction</h1>
                    </template>  -->
                    <div class="p-5  text-white">
                        <h3 class="text-white">Submit a fasta sequence for TM Topology Prediction.</h3>
                        <p class="lead text-white mt-3">Enter ONE fasta sequence in the textarea below or upload a fasta file then select the tools you want use for the prediction. Click 'SUBMIT' to start prediction job.</p>
                        <div class="row">
                            
                            <div class="col-md-8 py-3 mr-2 border rounded">
                               
                    
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
                                    <div class="text-danger invalid-Yedback" style="display: block;" v-show="errorSequence">
                                        {{ errorSequence }}
                                    </div>
                                    <base-button class="col-md-3" type="primary" v-on:click="checkForm">Submit</base-button>
                                    <base-button size="sm" v-on:click="setExample" type="secondary">Example</base-button> 
                                    <base-button size="sm" @click="clearForm" type="secondary">Clear</base-button>
                                </form>
                                
                            </div>
                            <div class="col-md-3 py-3 mx-auto border rounded">
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
            snackbar: false,
            file: null,
            predictionMethods:[],
            predictionMethodToggles:[],
            checkedMethods:[],
            errorSequence: '',
            errorToggle: '',
            usecctop: true,
            message: null,
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
        previewFiles: function() {
            console.log(this.file)
        },
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
            else
            {
                this.snackbar = true;
            }
        },
        setExample() {
            this.sequence = this.example;
            this.file = null;
        },
        checkSequence(){
            if(!this.sequence && !Boolean(this.file))
            {
                console.log('Empty textarea');
                this.errorSequence = 'Please enter a sequence or upload a file.';
            }
            else if(this.sequence && Boolean(this.file))
            {
                console.log('This shouldnt be reached.');
                this.errorSequence = 'Please input either a sequence or a file only.';
            }
            else
            {
                if (this.sequence){
                    this.errorSequence = '';
                    if(this.validateFasta(this.sequence))
                    {
                        return true;
                    }
                    else
                    {
                        
                        this.errorSequence = 'Invalid fasta sequence!'
                    }
                }
                if (Boolean(this.file)) {
                    return true
                }

                    
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
        validateFasta(fasta) {

            if (!fasta) { // check there is something first of all
                return false;
            }

            // immediately remove trailing spaces
            fasta = fasta.trim();

            // split on newlines... 
            var lines = fasta.split('\n');

            // check for header
            if (fasta[0] == '>') {
                // remove one line, starting at the first position
                lines.splice(0, 1);
            }

            // join the array back into a single string without newlines and 
            // trailing or leading spaces
            fasta = lines.join('').trim();

            if (!fasta) { // is it empty whatever we collected ? re-check not efficient 
                return false;
            }

            // note that the empty string is caught above
            // allow for Selenocysteine (U)
            return /^[GALMFWKQESPVICYHRNDT\s]{1,20000}$/i.test(fasta);
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
                    // data = {"id":this.predictionMethods[i].id}
                    predictionData.push(this.predictionMethods[i].name);
                }
            }
            console.log(predictionData);
            var evaluationData = {
                "file": this.file,
                "sequence": this.sequence,
                "tools": predictionData
            }
            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('sequence', this.sequence);
            console.log(this.file, this.sequence, predictionData);
            console.log(formData);
            // for (var i = 0; i < predictionData.length; i++) {
            //     formData.append('tools[]', predictionData[i]);
            // }
            // console.log(formData)
            formData.append('tools', JSON.stringify(predictionData))
            // console.log(evaluationData)
            $backend.postFasta(formData).then(responseData=>{
                console.log(responseData['task_id'])
                this.$router.push({
                    path: `/prediction/${responseData['task_id']}`
                })
            })
            console.log('Form submitted!');
            
        },
        clearForm() {
            this.sequence = '';
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