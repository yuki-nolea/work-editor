<template>
  <header>
    <div class="header-container">
      <div class="title">Work Editor</div>
    </div>
  </header>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  props: {},
});
</script>



<style scoped>
.header-container {
  width: 100%;
  height: 40px;
  background-color: #363636;
  color: white;
}
.title {
  line-height: 40px;
  font-size: 28px;
  margin-left: 10px;
}
</style>