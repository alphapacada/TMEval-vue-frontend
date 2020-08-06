import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import tmFooter from "./layout/tmFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import tmLanding from "./views/tmLanding.vue";
import tmHeader from "./layout/tmHeader.vue";
import About from "./views/About.vue";
import PredictionResult from "./views/PredictionResult.vue"
import Protvista from "./views/ProtvistaView.vue"
import TableTest from "./views/TableTest.vue"
import SideBar2 from "./views/Sidebar2.vue"
import Assessment from "./views/Assessment.vue"
import TestResult from "./views/TestResult.vue"
import Downloads from "./views/Downloads.vue"
import DataComparison from "./views/DataComparison.vue"
import PerformanceEvaluation from "./views/PerformanceEvaluation.vue"
import SOV from "./views/SOVAnalysis.vue"
import ConfusionMatrix from "./views/ConfusionMatrix.vue"

Vue.use(Router);

export default new Router({
    mode: 'history',
    linkExactActiveClass: "active",
    routes: [{
            path: "/",
            name: "components",
            components: {
                header: tmHeader,
                // default: Components,
                default: tmLanding,
                footer: tmFooter
            }
        },
        {
            path: "/landing",
            name: "landing",
            components: {
                header: tmHeader,
                // default: Landing,
                default: tmLanding,
                footer: tmFooter
            }
        },
        {
            path: "/About",
            name: "about",
            components: {
                header: tmHeader,
                default: About,
                footer: tmFooter
            }
        },
        {
            path: "/prediction/:id",
            name: "prediction",
            components: {
                header: tmHeader,
                default: PredictionResult,
                footer: tmFooter
            }
        },
        {
            path: "/protvista",
            name: "protvista",
            components: {
                header: tmHeader,
                default: Protvista,
                footer: tmFooter
            }
        },
        {
            path: "/testpage",
            name: "testpage",
            components: {
                header: tmHeader,
                default: TableTest,
                footer: tmFooter
            }
        },
        {
            path: "/evaluation",
            name: "evaluation",
            components: {
                header: tmHeader,
                default: SideBar2,
                footer: tmFooter
            },
            children: [
                { path: '/evaluation/', component: TableTest },
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                { path: '/evaluation/assessment', component: Assessment },

                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                { path: '/evaluation/table', component: TableTest },

                { path: '/evaluation/dataset-comparison', component: DataComparison },
                { path: '/evaluation/perf-eval', component: PerformanceEvaluation },
                { path: '/evaluation/sov', component: SOV },
                { path: '/evaluation/confusion-matrix', component: ConfusionMatrix }
            ]
        },
        {
            path: "/testresults",
            name: "testresults",
            components: {
                header: tmHeader,
                default: TestResult,
                footer: tmFooter
            }
        },
        {
            path: "/downloads",
            name: "downloads",
            components: {
                header: tmHeader,
                default: Downloads,
                footer: tmFooter
            }
        }


    ],
    // scrollBehavior: to => {
    //     if (to.hash) {
    //         return { selector: to.hash, offset: { x: 0, y: 60 } };
    //     } else {
    //         return { x: 0, y: 0 };
    //     }
    // }
    scrollBehavior: to => {
        if (to.hash) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ selector: to.hash, offset: { x: 0, y: 60 } })
                }, 400)
            })
        } else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ x: 0, y: 0 })
                }, 200)
            })
        }
    }
});