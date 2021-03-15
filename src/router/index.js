import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomePage.vue";
import Portfolio from "../views/Portfolio";
import Stocks from "../views/Stocks.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: Portfolio,
  },
  {
    path: "/stocks",
    name: "Stocks",
    component: Stocks,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
