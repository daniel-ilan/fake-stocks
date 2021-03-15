<template>
  <div id="app">
    <v-app>
      <v-container>
        <appheader v-if="auth"></appheader>
        <v-main>
          <transition name="fade" mode="out-in">
            <router-view :auth="auth" />
          </transition>
        </v-main>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  data() {
    return {
      // isAuthenticated: false,
    };
  },
  components: {
    appheader: Header,
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style lang="scss">
html {
  overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
