import axios from "axios";

export const loadData = ({ commit }, userData) => {
  console.log(userData);
  axios
    .get("users/" + userData.userId + ".json?auth=" + userData.token)
    .then(res => {
      if (res.data) {
        const data = res.data;
        const funds = data.stocks.funds;
        const stockPortfolio = data.stocks.stockPortfolio;

        const portfolio = { funds, stockPortfolio };
        commit("SET_PORTFOLIO", portfolio);
      }
    })
    .catch(error => console.log(error));
};
