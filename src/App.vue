<template>
  <div id="app">
    <AppHeader />
    <router-view />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";

export default {
  name: "App",
  components: {
    AppHeader
  }
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
