<template>
  <div class="container" @click="onClick">
    <div class="btn">
      <span>{{ icon }}</span>
    </div>
    <div class="txt">{{ text }}</div>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "FloatingSquareButton",
  props: {
    icon: {
      type: String as PropType<string>,
      required: true,
    },
    text: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup: (props, context) => {
    const onClick = context.emit("onClick");

    return {
      onClick,
    };
  },
});
</script>



<style scoped>
.container {
  width: 160px;
  height: 200px;
  text-align: center;
  cursor: pointer;
}
.btn {
  font-size: 64px;
  line-height: 160px;
  width: 160px;
  height: 160px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
}
.txt {
  margin-top: 10px;
  font-weight: bold;
}
</style>