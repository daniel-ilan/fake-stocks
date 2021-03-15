<template>
  <v-col cols="12" lg="4" xl="4" md="4" sm="6">
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item two-line class="stock-card-title">
        <v-list-item-content>
          <v-list-item-title>{{ stock.name }}</v-list-item-title>
          <v-list-item-subtitle
            >(Price: {{ stock.price }})</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-card-actions class="align-center stock-card-actions py-8">
        <v-text-field
          dense
          type="number"
          label="Quantity"
          outlined
          class="mr-4"
          :rules="[rules.money]"
          v-model="quantity"
          hide-details="auto"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          raised
          color="indigo accent-1"
          class="ml-5"
          @click="buyStock"
          :disabled="
            insufficianFunds || quantity <= 0 || Number.isInteger(quantity)
          "
        >
          Buy
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ["stock"],
  data() {
    return {
      quantity: 0,
    };
  },
  computed: {
    funds() {
      return this.$store.getters.funds;
    },
    insufficianFunds() {
      return this.quantity * this.stock.price > this.funds;
    },
    rules() {
      return {
        money:
          this.quantity * this.stock.price < this.funds || "Insufficiant funds",
      };
    },
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: parseInt(this.quantity),
      };
      this.$store.dispatch("buyStock", order);
      this.quantity = 0;
    },
  },
};
</script>

<style>
.stock-card-title {
  background-color: #c5cae9;
}

.stock-card-actions {
  height: 20%;
}
</style>
