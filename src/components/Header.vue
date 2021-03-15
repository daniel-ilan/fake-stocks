<template>
  <div>
    <v-app-bar color="white" app class="hidden-sm-and-down">
      <v-spacer class="ml-4"></v-spacer>
      <v-spacer></v-spacer>

      <v-tabs>
        <v-tab to="/">
          <v-toolbar-title>Stock-Holders</v-toolbar-title>
        </v-tab>
        <v-tab to="portfolio">Portfolio </v-tab>
        <v-tab to="Stocks">Stocks </v-tab>
      </v-tabs>

      <div class="header-btns-container">
        <v-btn outlined color="indigo" class="header-btn" @click="endDay">
          end day
        </v-btn>
        <v-btn color="primary" dark @click="saveData"> Save </v-btn>
        <strong class="show-funds">Funds: {{ funds | currency }}</strong>
      </div>
      <v-spacer class="mr-4"></v-spacer>
    </v-app-bar>
    <v-app-bar app dark color="blue-grey darken-3" class="hidden-md-and-up">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="show-funds"
        >Funds: {{ funds | currency }}</v-toolbar-title
      >
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="endDay">
            <v-list-item-title>end day</v-list-item-title>
          </v-list-item>

          <v-list-item @click="saveData">
            <v-list-item-title>Save</v-list-item-title>
          </v-list-item>
          <v-list-item to="portfolio">
            <v-list-item-title>Portfolio</v-list-item-title>
          </v-list-item>
          <v-list-item to="Stocks">
            <v-list-item-title>Stocks</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

const dbInstance = axios.create({
  baseURL: "https://stock-traders-9ed14.firebaseio.com/",
});
export default {
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  computed: {
    funds() {
      return this.$store.getters.funds;
    },
  },
  methods: {
    ...mapActions({
      randomizeStocks: "randomizeStocks",
      fetchData: "loadData",
    }),
    endDay() {
      this.randomizeStocks();
    },
    saveData() {
      const data = {
        funds: this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio,
      };
      const userId = this.$store.getters.user;
      const token = this.$store.getters.token;
      dbInstance.put("/users/" + userId + "/stocks.json?auth=" + token, data);
      console.log(userId);
    },
    loadData() {
      this.fetchData();
    },
  },
};
</script>

<style>
.show-funds {
  padding: 12px;
}

.cus-active-link {
  background-color: none;
}

.header-btns-container {
  display: flex;
  justify-content: space-between;
  width: 50%;
  align-items: center;
}

.header-btn {
  margin: 0 1rem;
}
</style>