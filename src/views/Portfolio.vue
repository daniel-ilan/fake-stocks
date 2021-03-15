<template>
  <v-row>
    <app-stock v-for="(stock, i) in stocks" :key="i" :stock="stock"></app-stock>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import Stock from "../components/portfolio/Stock";
export default {
  props: ["stock"],
  computed: {
    ...mapGetters({
      stocks: "stockPortfolio",
    }),
  },
  components: {
    appStock: Stock,
  },
};
</script>

<style>
</style>