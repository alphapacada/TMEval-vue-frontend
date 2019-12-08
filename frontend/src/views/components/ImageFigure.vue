<template>
    <div class="row pb-3">
        <div class="col">
            <div class="row">
                <div class="mx-auto col-xs-12 col-md-8">
                    <b-img @click="handleClick" class="figure-image" :src="src"></b-img>
                </div>
            </div>
            <div v-if="Boolean(text)" class="row">
                <div v-resize-text="{minFontSize: '9px', maxFontSize: '16px'}" class="mx-auto p-3 col-xs-12 col-md-8 bg-secondary">
                    {{ text }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {BCarousel} from "bootstrap-vue/esm/components/carousel/carousel";
import {BCarouselSlide} from "bootstrap-vue/esm/components/carousel/carousel-slide";
import {BImg} from "bootstrap-vue/esm/components/image/img";
import Modal from "@/components/Modal.vue";
export default {
    components: {
        BImg,

    },
    name:"image-figure",
    props:{
        //Image source
        src: String,
        //Text below image
        text: String,

    },
    methods: {
        handleClick(evt) {
        console.log("evt", evt)
        this.$emit("clicked")
    }
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
