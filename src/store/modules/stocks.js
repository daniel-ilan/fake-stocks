import { getStocks } from "../../data/stockData";
const state = {
  stocks: [],
};

const mutations = {
  SET_STOCKS(state, stocks) {
    state.stocks = stocks;
  },
  RND_STOCKS(state) {
    state.stocks.forEach(stock => {
      stock.price = Math.round(
        stock.price * (Math.random() * (1.7 - 0.5 + 1)) + 0.5
      );
      if (stock.price < 5) {
        stock.price = 5;
      }
    });
  },
};

const actions = {
  buyStock: ({ commit }, order) => {
    commit("BUY_STOCK", order);
  },
  initStocks: ({ commit }, token) => {
    const stocks = [];
    getStocks(stocks, token).then(stockData => {
      console.log("stocksData", stockData);
      commit("SET_STOCKS", stockData);
    });
  },
  randomizeStocks: ({ commit }) => {
    commit("RND_STOCKS");
  },
};

const getters = {
  stocks: state => {
    return state.stocks;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
