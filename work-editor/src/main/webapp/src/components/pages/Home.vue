<template>
  <div class="home">
    <header>
      <div></div>
    </header>
    <div class="contents-wrapper">
      <div class="header-container">
        <div class="title">Work Editor</div>
      </div>
      <div class="row-1">
        <div class="actions-container">
          <FloatingSquareButton icon="+" text="New Work" :onClick="onClick" />
          <div class="space-box"></div>
          <FloatingSquareButton icon="C" text="Compare" :onClick="onClick" />
        </div>
      </div>
      <div class="row-2"></div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import FloatingSquareButton from "../organisms/FloatingSquareButton.vue";

export default defineComponent({
  name: "Home",
  props: {},
  setup: () => {
    const onClick = (): void => {
      console.log("clicked");
    };

    return { onClick };
  },
  components: { FloatingSquareButton },
});
</script>



<style scoped>
.home {
  width: 100%;
  height: 100%;
}
.title {
  line-height: 40px;
  font-size: 28px;
  margin-left: 10px;
}

.contents-wrapper {
  display: grid;
  grid-template-rows: 40px 250px 1fr;
  height: 100%;
}
.header-container {
  background-color: #363636;
  color: white;
}
.row-1 {
  /* background-color: bisque; */
}
.row-2 {
  /* background-color: aquamarine; */
}

.actions-container {
  display: flex;
  flex-direction: row;
  margin: 50px 0 0 50px;
}
.action-item {
  width: 160px;
  height: 200px;
  text-align: center;
}
.action-btn {
  font-size: 64px;
  line-height: 160px;
  width: 160px;
  height: 160px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
}
.action-txt {
  margin-top: 10px;
  font-weight: bold;
}

.space-box {
  width: 100px;
}
</style>