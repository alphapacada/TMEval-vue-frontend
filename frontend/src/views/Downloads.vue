<template>
    <section class="section bg-secondary section-lg">
        <v-app class="bg-secondary">
            <div class="container bg-white pt-3">
                <div id="tmeval-dataset" class="row">
                    <div class="col">
                        <h3>
                            TMeval Dataset
                        </h3>
                        <table class="container">
                            <tr class="row" :key="index" v-for="(file, index) in tmevalDataset">
                                <td v-ripple="true" class="table-entry col" >
                                    <tr class="row">
                                        <td  class="col-1 pr-1 text-center align-items-center">
                                            <span @click="downloadFasta(file)" class="download-text"><i class="fa fa-download"></i></span>
                                        </td>
                                        <td class="col-10">
                                            <tr class="row col pb-1">
                                                <td class="file-name col">
                                                    {{ file.name }} <!--({{ file.size }})-->
                                                </td>
                                            </tr>
                                            <tr class="row col">
                                                <td rowspan="2" class="file-description col">
                                                    <p class="ml-2">
                                                        {{ file.description }}
                                                    </p>
                                                </td>
                                            </tr>
                                            <!-- <tr class="row col">
                                                <td rowspan="2" class="file-description col">
                                                    
                                                    <a :href="file.url"> {{file.name}}</a>
                                    
                                                </td>
                                            </tr> -->
                                        </td>
                                    </tr>
                                </td>
                            </tr>    
                        </table>
                    </div>
                </div>
                <a style="display:none" ref="download">
                    
                </a>
                <div id="training-dataset" class="row">
                    <div class="col">
                        <h3>
                            Training Dataset
                        </h3>
                        <table class="container">
                            <tr class="row" :key="index" v-for="(file, index) in trainingDataset">
                                <td v-ripple="true" class="table-entry col" >
                                    <tr class="row">
                                        <td class="col-1 pr-1 text-center align-items-center">
                                            <span @click="downloadFile(file.name)" class="download-text"><i class="fa fa-download"></i></span>
                                        </td>
                                        <td class="col-10">
                                            <tr class="row col pb-1">
                                                <td class="file-name col">
                                                    {{ file.name }} ({{ file.size }})
                                                </td>
                                            </tr>
                                        </td>
                                    </tr>
                                </td>
                            </tr>    
                        </table>
                    </div>
                </div>
            </div>
        </v-app>
    </section>
</template>
<script>
import $backend from '../api'
export default {
    data() {
        return {
            tmevalDataset: [
                {
                    name: "tmeval_25",
                    size: "5 KB",
                    description: "TMeval dataset with 25% sequence identity.",
                    url: "http://127.0.0.1:5000/25_A/classification_confusion_matrix_CCTOP_1560843152.png",
                    parameters: {reduced:25, tm:'', sp:'',count:'', topo_type:'', tx:''},
        
                },
                {
                    name:"tmeval_30",
                    size: "1 GB",
                    description: "TMeval dataset with 30% sequence identity.",
                    parameters: {reduced:30, tm:'', sp:'',count:'', topo_type:'', tx:''}
                },

                {
                    name:"tmeval_40",
                    size: "1 GB",
                    description: "TMeval dataset with 40% sequence identity.",
                    parameters: {reduced:40, tm:'', sp:'',count:'', topo_type:'', tx:''}
                    
                },
                {
                    name:"tmeval_70",
                    size: "1 GB",
                    description: "TMeval dataset with 70% sequence identity.",
                    parameters: {reduced:70, tm:'', sp:'',count:'', topo_type:'', tx:''}
                },
                {
                    name:"tmeval_25_+TM-SP",
                    size: "1 GB",
                    description: "TMeval dataset with 25% sequence identity. Entries have transmembranes but do not have signal peptides.",
                    parameters: {reduced:25, tm:true, sp:false,count:'', topo_type:'', tx:''}
                },
                {
                    name:"tmeval_25_+TM+SP",
                    size: "1 GB",
                    description: "TMeval dataset with 25% sequence identity. Entries have transmembranes and signal peptides.",
                    parameters: {reduced:25, tm:true, sp:true,count:'', topo_type:'', tx:''}
                },
                {
                    name:"tmeval_25_-TM-SP",
                    size: "1 GB",
                    description: "TMeval dataset with 25% sequence identity. Entries do not have transmembranes and signal peptides.",
                    parameters: {reduced:25, tm:false, sp:false,count:'', topo_type:'', tx:''}
                },
                {
                    name:"tmeval_25_-TM+SP",
                    size: "1 GB",
                    description: "TMeval dataset with 25% sequence identity. Entries do not have transmembranes but have signal peptides.",
                    parameters: {reduced:25, tm:false, sp:true,count:'', topo_type:'', tx:''}
                },
                {
                    name:"tmeval_25_Eukaryotes",
                    url: "",
                    parameters: {reduced:25, tx: 'Eukaryotes', tm:true, sp:'',count:'', topo_type:'', tx:''}, 
                },
                {
                    name:"tmeval_25_Bacteria",
                    parameters: {reduced:25, tx: 'Bacteria', tm:true, sp:'',count:'', topo_type:'', tx:''},
                },
                {
                    name:"tmeval_25_Archaea",
                    parameters: {reduced:25, tx: 'Archaea', tm:true, sp:''},
                },
                {
                    name:"tmeval_25_Viruses",
                    parameters: {reduced:25, tx: 'Viruses', tm:true, sp:''}
                }

            ],
            trainingDataset: [
                {
                    name: "CCTOP.tar.xz",
                    size: "147.4 kB",
                },
                {
                    name: "HMMTOP.tar.xz",
                    size: "520 bytes",
                },
                {
                    name: "Memsat-svm.tar.xz",
                    size: "531.3 kB"
                },
                {
                    name: "philius.tar.xz",
                    size: "803.1 kB"
                },
                {
                    name: "tmhmm2.tar.xz",
                    size: "114.5 kB"
                },
                {
                    name: "TOPCONS2.tar.xz",
                    size: "1.8 MB"
                },
                {
                    name: "TOPDB.tar.xz",
                    size: "4.5 MB"
                }
            ]
        }
    },
    methods:
    {
        downloadFile(filename)
        {
            console.log($backend.getBaseURL());
            this.$refs.download.href = $backend.getBaseURL() + 'files/datasets/prediction/' + filename;
            this.$refs.download.click();
        },
        downloadFasta(file) {
            console.log("downloadFasta")
            this.$refs.download.href = $backend.getBaseURL() + 'files/tmeval-datasets/' + file.name + '?' + new URLSearchParams(file.parameters).toString();;
                this.$refs.download.click();
            // $backend.getDownloadableFasta(file)

        }
    }
}
</script>
<style>
    .table-entry :hover{
        background-color:rgb(188, 248, 188);
    }
    .download-text{
        color:blue;
        cursor:pointer;
    }
</style>