<template>
  <v-col cols="4">
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item two-line class="stock-card-title">
        <v-list-item-content>
          <v-list-item-title>{{ stock.name }}</v-list-item-title>
          <v-list-item-subtitle
            >(Price: {{ stock.price }} | Quantity:
            {{ stock.quantity }})</v-list-item-subtitle
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
          hide-details="auto"
          v-model="quantity"
          :rules="[rules.quantity]"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          raised
          color="indigo accent-1"
          class="ml-5"
          @click="sellStock"
          :disabled="
            quantity <= 0 || Number.isInteger(quantity) || insufficianQuantity
          "
        >
          Sell
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["stock"],
  data() {
    return { quantity: 0 };
  },
  computed: {
    insufficianQuantity() {
      return this.quantity > this.stock.quantity;
    },
    rules() {
      return {
        quantity: !(this.quantity > this.stock.quantity) || "Not enough stocks",
      };
    },
  },
  methods: {
    ...mapActions({ placeSellOrder: "sellStock" }),
    sellStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity,
      };
      this.placeSellOrder(order);
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