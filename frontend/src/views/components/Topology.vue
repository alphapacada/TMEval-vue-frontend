<template>
    <div class="up_pftv_category_TOPOLOGY">
        <div class="up_pftv_category">
            <div class="up_pftv_category-viewer">
                <svg width="760" height="40">
                    <!-- <g>
                        <path class="up_pftv_highlight" d="M-1,-1" transform="translate(-1,-1)" height="40"></path>
                    </g> -->
                    <g class="up_pftv_category-viewer-group">
                        <path v-for="p in paths"  v-b-tooltip.hover.top="p.popover.popover_msg" :title="p.popover.title" :class="p.class" :key="p.id" :d="p.d" :transform="p.transform">
                            
                        </path>
                    
                    </g>
                </svg>
                <!-- <base-button size="sm" type="primary" class="btn-tooltip"
               v-b-tooltip.hover.top title="Tooltip on top">On top
                    </base-button> -->
                <!-- <div class="up_pftv_tooltip-container" style="left: 202.906px; top: 15.0312px; display: block; opacity: 1;"><span class="up_pftv_tooltip-close">x</span><table><tr><th colspan="2">TOPO_DOM 18-701</th></tr><tr><td>Description</td><td>Extracellular</td></tr><tr class="up_pftv_evidence-col"><td>Evidence</td><td>Curated (Manual assertion inferred by curator)</td></tr><tr><td>Tools</td><td><span><a href="http://www.uniprot.org/blast/?about=P05067[18-701]&amp;key=Topological domain" target="_blank">BLAST</a></span></td></tr></table></div> -->

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'topology',
    data() {
        return {
            paths:[
            {
                name:"TOPOLOGY_0",
                class:"up_pftv_feature up_pftv_topo_dom",
                d:"M-0.48051948051948035,0L656.8701298701296,0L656.8701298701296,13L-0.48051948051948035,13Z",
                transform:"translate(26.337662337662337,12.5)",
                popover:{
                    popover_msg :  "'I am popover content!'",
                    title: "Popover Title"
                }


            },
            {
                name:"TOPOLOGY_1",
                class:"up_pftv_feature up_pftv_transmem",
                d:"M-0.48051948051948035,0L19.701298701298693,0L19.701298701298693,13L-0.48051948051948035,13Z",
                transform:"translate(683.6883116883117,12.5)",
                popover:{
                    popover_msg :  "",
                    title: ""
                }
            },
            {
                name:"TOPOLOGY_2",
                class:"up_pftv_feature up_pftv_topo_dom",
                d:"M-0.48051948051948035,0L45.64935064935063,0L45.64935064935063,13L-0.48051948051948035,13Z",
                transform:"translate(703.8701298701299,12.5)",
                 popover:{
                    popover_msg :  "",
                    title: ""
                }
            
            
            }
        
        ]
        };
        
    }
}
</script>

<style>

</style>
