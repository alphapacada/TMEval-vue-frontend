<template>
<section class="section-hero section-shaped my-0">
        <div class="shape shape-style-1 shape-dark">
            <span class="span-150"></span>
            <span class="span-50"></span>
            <span class="span-50"></span>
            <span class="span-75"></span>
            <span class="span-100"></span>
        </div>
        
        <div class="container shape-container align-items-center">
            <div  id="content-result">
            <div class="row">
                <div class="col-sm-8">
                    <h1 class="text-white display-2">Prediction results</h1>
                </div>
                <div class="col-sm-4 dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Select method
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <h5 class="text-white">Raw results</h5>
                    <textarea class="form-control col" rows="20" readonly></textarea>
                </div>
                <div class="col-sm-6">
                    <h5 class="text-white">Processed results</h5>
                    <textarea class="form-control col" rows="20" readonly></textarea>
                </div>
            </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {}
</script>
<style>
textarea {
    resize:none;
}

#content-result{
    padding-top:5rem;
}
</style>