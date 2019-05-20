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
                                        <td class="col-1 pr-1 text-center align-items-center">
                                            <a :href="file.link" target="_blank">
                                                Download
                                            </a>
                                        </td>
                                        <td class="col-10">
                                            <tr class="row col pb-1">
                                                <td class="file-name col">
                                                    {{ file.name }} ({{ file.size }})
                                                </td>
                                            </tr>
                                            <tr class="row col">
                                                <td rowspan="2" class="file-description col">
                                                    <p class="ml-2">
                                                        {{ file.description }}
                                                    </p>
                                                </td>
                                            </tr>
                                        </td>
                                    </tr>
                                </td>
                            </tr>    
                        </table>
                    </div>
                </div>
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
                                            <a :href="file.link" target="_blank">
                                                Download
                                            </a>
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
export default {
    data() {
        return {
            tmevalDataset: [
                {
                    name: "Doggo.gz",
                    size: "5 DoggoBytes",
                    description: "Relevant af",
                    link: "http://facebook.com"
                },
                {
                    name:"Catto.gz",
                    size: "1 niggaByte",
                    description: "List of useless records.",
                    link: ""
                }
            ],
            trainingDataset: [
                {
                    name: "cctop.gz",
                    size: "500MB",
                    link: ""
                },
                {
                    name: "hmtop.gz",
                    size: "500MB",
                    link: ""
                },
                {
                    name: "memsat-svm.gz",
                    size: "500MB",
                    link: ""
                }
            ]
        }
    }
}
</script>
<style>
    .table-entry :hover{
        background-color:rgb(188, 248, 188);
    }
</style>