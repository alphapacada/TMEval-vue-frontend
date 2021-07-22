import Vue from "vue";
import Router from "vue-router";
import SidebarTest from "./layout/SidebarTest.vue";
import tmFooter from "./layout/tmFooter";
import tmHeader from "./layout/tmHeader.vue";
import NotFound from "./views/404.vue";
import About from "./views/About.vue";
import Assessment from "./views/Assessment.vue";
import ConfusionMatrix from "./views/ConfusionMatrix.vue";
import DataComparison from "./views/DataComparison.vue";
import Downloads from "./views/Downloads.vue";
import EvaluationSummary from "./views/EvaluationSummary.vue";
import JobsPage from "./views/JobsPage.vue";
import PerformanceEvaluation from "./views/PerformanceEvaluation.vue";
import PredictionResult from "./views/PredictionResult.vue";
import SideBar3 from "./views/Sidebar3.vue";
import SOV from "./views/SOVAnalysis.vue";
import TableTest2 from "./views/TableTest2.vue";
import tmLanding from "./views/tmLanding.vue";

Vue.use(Router);
export default new Router({
  mode: "history",
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/sidebartest",
      components: {
        header: tmHeader,
        default: SidebarTest,
        footer: tmFooter,
      },
      children: [
        {
          path: "/sidebartest/prediction/",
          name: "job-table",
          component: JobsPage,
        },
        {
          path: "/sidebartest/prediction/:id",
          name: "pred-results",
          component: PredictionResult,
        },
      ],
    },
    {
      path: "/",
      name: "components",
      components: {
        header: tmHeader,
        default: tmLanding,
        footer: tmFooter,
      },
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        header: tmHeader,
        default: tmLanding,
        footer: tmFooter,
      },
    },
    {
      path: "/About",
      name: "about",
      components: {
        header: tmHeader,
        default: About,
        footer: tmFooter,
      },
    },
    {
      path: "/evaluate/:id",
      name: "evaluate",
      components: {
        header: tmHeader,
        default: SideBar3,
        footer: tmFooter,
      },
      children: [
        { path: "/evaluation/assessment", component: Assessment },
        { path: "/evaluation/table", component: TableTest2 },
        { path: "/evaluation/overview", component: EvaluationSummary },
        { path: "/evaluation/dataset-comparison", component: DataComparison },
        { path: "/evaluation/perf-eval", component: PerformanceEvaluation },
        { path: "/evaluation/sov", component: SOV },
        { path: "/evaluation/confusion-matrix", component: ConfusionMatrix },
      ],
    },
    {
      path: "/prediction/:id",
      name: "prediction",
      components: {
        header: tmHeader,
        default: PredictionResult,
        footer: tmFooter,
      },
    },
    {
      path: "/evaluation",
      name: "evaluation",
      components: {
        header: tmHeader,
        default: SideBar3,
        footer: tmFooter,
      },
      children: [
        { path: "/evaluation/", component: TableTest2 },
        { path: "/evaluation/assessment", component: Assessment },
        { path: "/evaluation/table", component: TableTest2 },

        { path: "/evaluation/dataset-comparison", component: DataComparison },
        { path: "/evaluation/perf-eval", component: PerformanceEvaluation },
        { path: "/evaluation/sov", component: SOV },
        { path: "/evaluation/confusion-matrix", component: ConfusionMatrix },
      ],
    },
    {
      path: "/downloads",
      name: "downloads",
      components: {
        header: tmHeader,
        default: Downloads,
        footer: tmFooter,
      },
    },
    {
      path: "*",
      name: "notFound",
      components: {
        header: tmHeader,
        default: NotFound,
        footer: tmFooter,
      },
    },
  ],

  scrollBehavior: (to, from, savedPosition) => {
    if (to.meta.preventScroll || to.params.preventScroll) {
      return false;
    }
    if (to.hash) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ selector: to.hash, offset: { x: 0, y: 60 } });
        }, 100);
      });
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ x: 0, y: 0 });
        }, 200);
      });
    }
  },
});
