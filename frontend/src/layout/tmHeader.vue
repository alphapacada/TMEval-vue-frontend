<template>
  <header class="header-global">
    <base-nav
      class="navbar-main sticky-top"
      transparent
      title="Random titmle"
      type="success"
      effect="light"
      expand
    >
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
        <img src="/img/brand/tmbrand.png" alt="logo" class="img-fluid" />
      </router-link>

      <div class="row" slot="content-header" slot-scope="{ closeMenu }">
        <div class="col-6 collapse-brand">
          <a href>
            <img src="/img/brand/tmbrand_blk.png" />
          </a>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>
      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <li class="nav-item">
          <router-link to="/" class="nav-link" role="button">
            <i class="fa fa-home d-lg-none"></i>
            <span class="nav-link-inner--text">Home</span>
          </router-link>
        </li>
        <base-dropdown tag="li" class="nav-item">
          <a
            slot="title"
            href="#"
            class="nav-link"
            data-toggle="dropdown"
            role="button"
          >
            <i class="ni ni-collection d-lg-none"></i>
            <span class="nav-link-inner--text">Browse</span>
          </a>
          <router-link to="/evaluation" class="dropdown-item"
            >View Assessment</router-link
          >
          <router-link to="/evaluation/table#data" class="dropdown-item"
            >View Dataset</router-link
          >
          <router-link to="/#predict_sequences" class="dropdown-item"
            >Predict Topology</router-link
          >
        </base-dropdown>
        <!-- </ul> -->

        <li class="nav-item">
          <router-link to="/#about" class="nav-link" role="button">
            <i class="fa fa-info-circle d-lg-none"></i>
            <span class="nav-link-inner--text">About</span>
          </router-link>
        </li>
      </ul>

      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <li class="nav-item">
          <base-dropdown tag="li" class="nav-item">
            <a
              slot="title"
              class="nav-link nav-link-icon"
              target="_blank"
              rel="noopener"
              data-toggle="tooltip"
              title="Prediction Jobs"
            >
              <span> <i class="fa fa-tasks"></i> Jobs</span>
            </a>
            <router-link
              class="dropdown-item"
              :to="{ path: '/sidebartest/prediction/' }"
              >Total jobs: {{ get_stats.jobs_count }}</router-link
            >
            <router-link
              class="dropdown-item"
              :to="{ path: '/sidebartest/prediction/' }"
              >Running: {{ running }}</router-link
            >
            <router-link
              class="dropdown-item"
              :to="{ path: '/sidebartest/prediction/' }"
              >Completed: {{ completed }}</router-link
            >
          </base-dropdown>
        </li>
        <li class="nav-item">
          <a
            class="nav-link nav-link-icon"
            href="https://github.com/alphapacada/TMEval-Vue"
            target="_blank"
            rel="noopener"
            data-toggle="tooltip"
            title="View Repository"
          >
            <i class="fa fa-github"></i>
            <span class="nav-link-inner--text d-lg-none">Github</span>
          </a>
        </li>
        <li class="nav-item d-none d-lg-block ml-lg-4">
          <router-link to="/downloads">
            <span class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon header-download-button">
                <i class="fa fa-cloud-download mr-2"></i>
              </span>
              <span class="nav-link-inner--text header-download-button"
                >Download Dataset</span
              >
            </span>
          </router-link>
        </li>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  data() {
    return {
      running: 0,
      completed: 0,
      job_stats: null,
    };
  },

  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
  },
  computed: {
    get_stats() {
      return this.$store.state.job_stats;
    },
  },
  watch: {
    get_stats(val) {
      let run_ctr = 0;
      let comp_ctr = 0;
      Object.keys(val.jobs).forEach((key) => {
        if (val.jobs[key].status == "Running") {
          run_ctr++;
        }
        if (val.jobs[key].status == "Completed") {
          comp_ctr++;
        }
      });
      this.running = run_ctr;
      this.completed = comp_ctr;
    },
  },
  mounted() {
    this.$store.commit("update_stats");
  },
};
</script>
<style scoped>
li .nav-link {
  padding: 10px !important;
}
.dropdown-item.router-link-active {
  background-color: transparent !important;
  color: black !important;
}
.navbar >>> .container {
  padding: 0px;
}
.navbar-main {
  position: fixed !important;
  padding: 0px !important;
  height: 60px !important;
  line-height: 1 !important;
}
.navbar .container {
  padding: 0px 24px 0px 24px !important;
}

.nav-link {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}

.img-fluid {
  max-height: 100%;
  width: auto;
}

.header-download-button {
  color: black !important;
}
/* .navbar-collapse {
    background: blue !important
} */
</style>
