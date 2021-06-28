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
import IntersectSample from "./views/IntersectSample.vue";
import JobsPage from "./views/JobsPage.vue";
import PerformanceEvaluation from "./views/PerformanceEvaluation.vue";
import PredictionResult from "./views/PredictionResult.vue";
import Protvista from "./views/ProtvistaView.vue";
import SideBar3 from "./views/Sidebar3.vue";
import SOV from "./views/SOVAnalysis.vue";
import TableTest2 from "./views/TableTest2.vue";
import TestResult from "./views/TestResult.vue";
import tmLanding from "./views/tmLanding.vue";

Vue.use(Router);

// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((error) => {
//     if (error.name == "NavigationDuplicated") {
//       console.log("nav dup yo");
//       console.log(location);

//       location.hash = "";
//       return originalPush.call(this, location);
//     }

//     // avoid NavigationDuplicated
//     if (error.name !== "NavigationDuplicated") throw error;
//   });
// };
export default new Router({
  mode: "history",
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/sidebartest",
      components: {
        header: tmHeader,
        // default: Components,
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
          // meta: { preventScroll: true }
        },
        // { path: "/sidebartest/evaluate/:id", component: EvaluationResult },
        { path: "/sidebartest/intersect", component: IntersectSample },
      ],
    },
    {
      path: "/intersect",
      name: "intersect",
      components: {
        header: tmHeader,
        // default: Components,
        default: IntersectSample,
        footer: tmFooter,
      },
    },
    {
      path: "/",
      name: "components",
      components: {
        header: tmHeader,
        // default: Components,
        default: tmLanding,
        footer: tmFooter,
      },
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        header: tmHeader,
        // default: Landing,
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
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        { path: "/evaluation/assessment", component: Assessment },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
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
      path: "/protvista",
      name: "protvista",
      components: {
        header: tmHeader,
        default: Protvista,
        footer: tmFooter,
      },
    },
    {
      path: "/testpage",
      name: "testpage",
      components: {
        header: tmHeader,
        default: TableTest2,
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
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        { path: "/evaluation/assessment", component: Assessment },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        { path: "/evaluation/table", component: TableTest2 },

        { path: "/evaluation/dataset-comparison", component: DataComparison },
        { path: "/evaluation/perf-eval", component: PerformanceEvaluation },
        { path: "/evaluation/sov", component: SOV },
        { path: "/evaluation/confusion-matrix", component: ConfusionMatrix },
      ],
    },
    {
      path: "/testresults",
      name: "testresults",
      components: {
        header: tmHeader,
        default: TestResult,
        footer: tmFooter,
      },
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
  // scrollBehavior: to => {
  //     if (to.hash) {
  //         return { selector: to.hash, offset: { x: 0, y: 60 } };
  //     } else {
  //         return { x: 0, y: 0 };
  //     }
  // }
  scrollBehavior: (to, from, savedPosition) => {
    // console.log(to, from, savedPosition);
    // if ( to.name === from.name && to.matched.some(routeDef => routeDef.meta.preventScroll) ){
    if (to.meta.preventScroll || to.params.preventScroll) {
      console.log("1");
      return false;
    }
    if (to.hash) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("2");

          resolve({ selector: to.hash, offset: { x: 0, y: 60 } });
        }, 100);
      });
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("3");
          resolve({ x: 0, y: 0 });
        }, 200);
      });
    }
  },
});
