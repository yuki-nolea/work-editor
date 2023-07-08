<template>
  <Home msg="Welcome to Your Vue.js + TypeScript App" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
//import Home from "./components/pages/Home.vue";
//import Home from "./components/test/Home.vue";
import Home from "./components/pages/EditPage.vue";

export default defineComponent({
  name: "App",
  components: {
    Home,
  },
});
</script>

<style>
*,
::before,
::after {
  box-sizing: border-box;
  border-style: solid;
  border-width: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}

p, ul, li {
  margin: 0;
  padding: 0;
  border:0;
  outline:0;
  list-style: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
