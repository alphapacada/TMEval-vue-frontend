<template>
  <footer class="footer">
    <div class="container">
      <div class="row align-items-center justify-content-md-between text-center">
        <div class="copyright col-md-12">
          Developed for the
          <strong>Bioinformatics Research Interest Group (BRIG)</strong>
          Laboratory headed by Assoc. Prof. Demelo M. Lao
        </div>

        <div class="copyright col-md-12">
          &copy; {{ year }}
          Alpha Pacada
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "tmFooter",
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
