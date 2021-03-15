import Vue from "vue";
import Vuex from "vuex";
import Stocks from "./modules/stocks";
import Portfolio from "./modules/portfolio";
import Auth from "./modules/auth";
import axios from "axios";
import * as actions from "./actions";

axios.defaults.baseURL = "https://stock-traders-9ed14.firebaseio.com/";

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  modules: { Stocks, Portfolio, Auth },
});
