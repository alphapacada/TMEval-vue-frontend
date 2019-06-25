<template>
    <div class="row pb-3">
        <div class="col">
            <div v-if="Boolean(title)" class="row">
                <div class="col">
                    <h4>
                        {{ title }}
                    </h4>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-6">
                    <img :src="lsrc" class="figure-image" >
                </div>
                <div class="col-6">
                    <img :src="rsrc" class="figure-image" >
                </div>
            </div>
            <div class="row mb-2">
                <div class="col">
                    <p>
                        {{ text }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"double-image-figure",
    props:{
        //Left image source
        lsrc: String,
        //Right image source
        rsrc: String,
        //Text below image
        text: String,
        //Text above image
        title: String,     
    }
};
</script>
<style>
.figure-image{
    width:100%;
    height:auto;
    display: block;
}
</style>
