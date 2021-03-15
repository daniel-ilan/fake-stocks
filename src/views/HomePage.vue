<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <h1>Trade or view your portfolio</h1>
          <h4>You may Save & Load our data</h4>
          <h4>Click on 'End Day' to beguin a New Trading Day!</h4>
          <v-divider class="devider"></v-divider>
          <p>Your Funds: {{ funds | currency }}</p>
        </v-col>
        <v-col cols="12" sm="6">
          <app-register v-if="!auth"></app-register>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import register from "../components/HomePage/loginRegister";
export default {
  props: ["auth"],
  components: {
    appRegister: register,
  },
  computed: {
    funds() {
      return this.$store.getters.funds;
    },
  },
};
</script>

<style lang="css">
.devider {
  margin: 1rem 0;
}
</style>