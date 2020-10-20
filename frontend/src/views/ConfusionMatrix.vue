<template>
    <div id="data-comparison-container" class="container">
        <div id="cf-header" class="row pb-5">
            <div class="col">
                <h1 class="pt-3">
                    Confusion Matrix
                </h1>
                <h5>
                    The blue confusion matrices are for N Location or Orientation. The Prediction Tools are tested upon a set with known N-Locations (orientation is not "UND").
                    The green confusion matrices are for Protein classification.
                </h5>
            </div>
        </div>
        <div id="cf-cctop" class="row pt-2">
            
            <div class="col">
                <div class="row">
                    <div class="col">
                        <h3>
                            CCTOP
                        </h3>
                    </div>
                </div>
                <!-- Redundant -->
                <confusion-matrix 
                    lsrc="/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_CCTOP.png"
                    rsrc="/img/figures/cm_redundant/25_redundant_orientation_confusion_matrix_CCTOP.png"
                    text="CCTOP has fairly high correct predictions for the three classifications: +TM-SP, +TM+SP, and -TM-SP. It scored 0 on -TM+SP due to the fact that 
                    if it encounters a non transmembrane (CCTOP has a TMFilter), it returns no topology. Therefore it  passes -TM-SP since just because it returns an empty string.
                    For N Location, CCTOP gained an accuracy of 84%. Its prediction of UND may be caused by non TMs with orientation or False Negative prediction of TM Proteins.  "
                    title="Redundant Dataset"
                    />
                <!-- Non-redundant-->
                <confusion-matrix 
                    lsrc="/img/figures/cm_nonredundant/25_redundant_classification_confusion_matrix_CCTOP.png"
                    rsrc="/img/figures/cm_nonredundant/25_redundant_orientation_confusion_matrix_CCTOP.png"
                    text="For the non redundant dataset, CCTOP scored higher in +TM+SP and +TM-SP predictions.
                    It gained N location accuracy on the non-redundant dataset vs the redundant dataset"
                    title="Non-redundant Dataset"
                    />
                <!-- Non-redundant RESAMPLED -->
                <confusion-matrix 
                    lsrc="/img/figures/cm_nonredundant/resampled/25_redundant_classification_confusion_matrix_CCTOP.png"
                    rsrc="/img/figures/cm_nonredundant/resampled/25_redundant_orientation_confusion_matrix_CCTOP.png"
                    text="There is an insignifant decrease in the -TM-SP correct predictions. Since only the non tm set was undersampled, the correct predictions and misclassifications for the TM set remained the same."
                    title="Non-redundant Resampled Dataset"
                    />
                <!-- Non-redundant RESAMPLED min 5-->
                <confusion-matrix 
                    lsrc="/img/figures/cm_nonredundant/resampled_min5/25_redundant_classification_confusion_matrix_CCTOP.png"
                    rsrc="/img/figures/cm_nonredundant/resampled_min5/25_redundant_orientation_confusion_matrix_CCTOP.png"
                    text="The change in mininum segment overlap has not affected the multiclass Confusion Matrix"
                    title="Non-Redundant Resampled Dataset with Minimum Segment Overlap of 5 Residues"
                    />
            </div>
        </div>
        <v-divider></v-divider>
         <div id="cf-hmmtop" class="row pt-2">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <h3>
                            HMMTOP
                        </h3>
                    </div>
                </div>
                <!-- Redundant -->
                <confusion-matrix 
                    lsrc="/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_HMMTOP.png"
                    rsrc="/img/figures/cm_redundant/25_redundant_orientation_confusion_matrix_HMMTOP.png"
                    text="HMMTOP cannot discriminate between TM/Non TM Proteins and predicts a topology for all sequences. This can be seen from the confusion matrix where the misclassifications are centered in the +TM-SP.
                    But for non TM proteins, it only produces a topology of O and I labels."
                    title="Redundant Dataset"
                    />
                <!-- Non-redundant-->
                <confusion-matrix 
                    lsrc="/img/figures/cm_nonredundant/25_redundant_classification_confusion_matrix_HMMTOP.png"
                    rsrc="/img/figures/cm_nonredundant/25_redundant_orientation_confusion_matrix_HMMTOP.png"
                    text=""
                    title="Non-redundant Dataset"
                    />
                <!-- Non-redundant RESAMPLED -->
                <confusion-matrix 
                    lsrc="/img/figures/cm_nonredundant/resampled/25_redundant_classification_confusion_matrix_HMMTOP.png"
                    rsrc="/img/figures/cm_nonredundant/resampled/25_redundant_orientation_confusion_matrix_HMMTOP.png"
                    text=""
                    title="Non-redundant Resampled Dataset"
                    />
                <!-- Non-redundant RESAMPLED min 5-->
                <confusion-matrix 
                    lsrc="/img/figures/cm_nonredundant/resampled_min5/25_redundant_classification_confusion_matrix_HMMTOP.png"
                    rsrc="/img/figures/cm_nonredundant/resampled_min5/25_redundant_orientation_confusion_matrix_HMMTOP.png"
                    text=""
                    title="Non-redundant Resampled Dataset with Minimum Segment Overlap of 5 Residues"
                    />
            </div>
        </div>
        <v-divider></v-divider>
        <div id="cf-philius" class="row pt-2">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <h3>
                            Philius
                        </h3>
                    </div>
                </div>
                <!-- Redundant -->
                <confusion-matrix 
                    lsrc="/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_PHILIUS.png"
                    rsrc="/img/figures/cm_redundant/25_redundant_orientation_confusion_matrix_PHILIUS.png"
                    text="Philius incorporates SP prediction and so it can correctly classify the four classes. As seen in the confusion matrix, the diagonal cells 
                    have high scores, this indicates that Philius is good in discriminating protein classes."
                    title="Redundant Dataset"
                    />
                <!-- Non-redundant-->
                <confusion-matrix 
                    lsrc="/img/figures/cm_nonredundant/25_redundant_classification_confusion_matrix_PHILIUS.png"
                    rsrc="/img/figures/cm_nonredundant/25_redundant_orientation_confusion_matrix_PHILIUS.png"
                    text=""
                    title="Non-redundant Dataset"
                    />
                <!-- Non-redundant RESAMPLED -->
                <confusion-matrix 
                    lsrc="/img/figures/cm_nonredundant/resampled/25_redundant_classification_confusion_matrix_PHILIUS.png"
                    rsrc="/img/figures/cm_nonredundant/resampled/25_redundant_orientation_confusion_matrix_PHILIUS.png"
                    text=""
                    title="Non-redundant Resampled Dataset"
                    />
                <!-- Non-redundant RESAMPLED min 5-->
                <confusion-matrix 
                    lsrc="/img/figures/cm_nonredundant/resampled_min5/25_redundant_classification_confusion_matrix_PHILIUS.png"
                    rsrc="/img/figures/cm_nonredundant/resampled_min5/25_redundant_orientation_confusion_matrix_PHILIUS.png"
                    text=""
                    title="Non-Redundant Resampled Dataset with Minimum Segment Overlap of 5 Residues"
                    />
            </div>
        </div>
        <v-divider></v-divider>
        <div id="cf-tmhmm2.0" class="row pt-2">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <h3>
                            TMHMM2.0
                        </h3>
                    </div>
                </div>
                <!-- Redundant -->
                <confusion-matrix 
                    lsrc="/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_TMHMM2.png"
                    rsrc="/img/figures/cm_redundant/25_redundant_orientation_confusion_matrix_TMHMM2.png"
                    text="TMHMM2.0's output is similar to HMMTOP. It cannot identify signal peptides and cannot discriminate between TM / nonTM proteins."
                    title="Redundant Dataset"
                    />
                <!-- Non-redundant-->
                <confusion-matrix 
                    lsrc="/img/figures/cm_nonredundant/25_redundant_classification_confusion_matrix_TMHMM2.png"
                    rsrc="/img/figures/cm_nonredundant/25_redundant_orientation_confusion_matrix_TMHMM2.png"
                    text=""
                    title="Non-redundant Dataset"
                    />
                <!-- Non-redundant RESAMPLED -->
                <confusion-matrix 
                    lsrc="/img/figures/cm_nonredundant/resampled/25_redundant_classification_confusion_matrix_TMHMM2.png"
                    rsrc="/img/figures/cm_nonredundant/resampled/25_redundant_orientation_confusion_matrix_TMHMM2.png"
                    text=""
                    title="Non-redundant Resampled Dataset"
                    />
                <!-- Non-redundant RESAMPLED min 5-->
                <confusion-matrix 
                    lsrc="/img/figures/cm_nonredundant/resampled_min5/25_redundant_classification_confusion_matrix_TMHMM2.png"
                    rsrc="/img/figures/cm_nonredundant/resampled_min5/25_redundant_orientation_confusion_matrix_TMHMM2.png"
                    text=""
                    title="Non-redundant Resampled Dataset with Minimum Segment Overlap of 5 Residues"
                    />
            </div>
        </div>
        <v-divider></v-divider>
        <div id="cf-topcons2" class="row pt-2">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <h3>
                            TOPCONS2
                        </h3>
                    </div>
                </div>
                <!-- Redundant -->
                <confusion-matrix 
                    lsrc="/img/figures/cm_redundant/25_redundant_classification_confusion_matrix_TOPCONS2.png"
                    rsrc="/img/figures/cm_redundant/25_redundant_orientation_confusion_matrix_TOPCONS2.png"
                    text="Topcons performs exceptionally well in classifying proteins as it achieved high scores in the diagonal cells."
                    title="Redundant Dataset"
                    />
                <!-- Non-redundant-->
                <confusion-matrix 
                    lsrc="/img/figures/cm_nonredundant/25_redundant_classification_confusion_matrix_TOPCONS2.png"
                    rsrc="/img/figures/cm_nonredundant/25_redundant_orientation_confusion_matrix_TOPCONS2.png"
                    text=""
                    title="Non-redundant Dataset"
                    />
                <!-- Non-redundant RESAMPLED -->
                <confusion-matrix 
                    lsrc="/img/figures/cm_nonredundant/resampled/25_redundant_classification_confusion_matrix_TOPCONS2.png"
                    rsrc="/img/figures/cm_nonredundant/resampled/25_redundant_orientation_confusion_matrix_TOPCONS2.png"
                    text=""
                    title="Non-redundant Resampled Dataset"
                    />
                <!-- Non-redundant RESAMPLED min 5-->
                <confusion-matrix 
                    lsrc="/img/figures/cm_nonredundant/resampled_min5/25_redundant_classification_confusion_matrix_TOPCONS2.png"
                    rsrc="/img/figures/cm_nonredundant/resampled_min5/25_redundant_orientation_confusion_matrix_TOPCONS2.png"
                    text=""
                    title="Non-redundant Resampled Dataset with Minimum Segment Overlap of 5 Residues"
                    />
            </div>
        </div>
    </div>
</template>
<script>
import DoubleImageFigure from './components/DoubleImageFigure.vue'
export default {
    name: 'ConfusionMatrix',
    components:{
        'confusion-matrix': DoubleImageFigure
    }
}
</script>
<style>
textarea {
    resize:none;
}
.figure-image{
    height:auto;
    width: 100%;
}
#content-result{
    padding-top:5rem;
}
</style>