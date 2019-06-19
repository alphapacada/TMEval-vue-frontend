<template>
    <div class="row pb-3">
        <div class="col">
            <div class="row">
                <div class="mx-auto col-8">
                    <img class="figure-image" :src="src">
                </div>
            </div>
            <div v-if="Boolean(text)" class="row">
                <div class="mx-auto p-3 col-8 bg-secondary">
                    {{ text }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"image-figure",
    props:{
        //Image source
        src: String,
        //Text below image
        text: String,
        
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
