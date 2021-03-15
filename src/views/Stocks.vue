<template>
  <v-container>
    <v-row>
      <app-stock
        v-for="(stock, i) in stocks"
        :key="i"
        :stock="stock"
      ></app-stock>
    </v-row>
  </v-container>
</template>

<script>
import stock from "../components/Stocks/Stock";
export default {
  components: {
    appStock: stock,
  },
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    },
  },
};
</script>

<style>
</style>