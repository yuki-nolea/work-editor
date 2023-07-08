<template>
  <div
    class="container"
    :class="{ focused: isFocused }"
    v-bind:style="{ left: l, top: t, width: w, height: h }"
    v-draggable="{ onFocused, onunFocused, onMove, onMoved }"
  >
    <div class="title-wrapper">
      <p>{{ text }}</p>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import draggable from "../../directives/draggable";

export default defineComponent({
  name: "FloatingSquareButton",
  props: {
    text: {
      type: String as PropType<string>,
      required: true,
    },
    left: {
      type: String as PropType<string>,
      required: true,
    },
    top: {
      type: String as PropType<string>,
      required: true,
    },
    height: {
      type: String as PropType<string>,
      required: true,
    },
    width: {
      type: String as PropType<string>,
      required: true,
    },
  },
  directives: {
    draggable,
  },
  setup: (props /*, context*/) => {
    const isFocused = ref<boolean>(false);
    const isMoving = ref<boolean>(false);
    const l = ref<string>(props.left);
    const t = ref<string>(props.top);
    const w = ref<string>(props.width);
    const h = ref<string>(props.height);

    const onFocused = () => {
      isFocused.value = true;
    };

    const onunFocused = () => {
      isFocused.value = false;
    };

    const onMove = (x: number, y: number) => {
      isMoving.value = true;
      l.value = x.toString() + "px";
      t.value = y.toString() + "px";
    };

    const onMoved = (x: number, y: number) => {
      isMoving.value = false;
      l.value = x.toString() + "px";
      t.value = y.toString() + "px";
    };

    return {
      onFocused,
      onunFocused,
      onMove,
      onMoved,
      isFocused,
      isMoving,
      l,
      t,
      w,
      h,
    };
  },
});
</script>



<style scoped>
.container {
  position: absolute;
  text-align: center;
  /* cursor: grab; */
  background-color: white;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.focused {
  border: 4px solid #00a3ff;
}
</style>