<template>
  <svg
    class="relation-widget"
    ref="htmlElement"
    xmlns="http://www.w3.org/2000/svg"
    x="0"
    y="0"
    width="100%"
    height="100%"
    style="background-color: transparent"
  >

    <line
      :x1="arrowSX"
      :y1="arrowSY"
      :x2="arrowEX"
      :y2="arrowEY"
      style="stroke: #000; stroke-width: 1"
    />

  </svg>
</template>


<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUpdated,
  PropType,
  reactive,
  ref,
} from "vue";
import { RelationWidget } from "../../types/my-types";

export default defineComponent({
  name: "RelationWidget",
  props:
  {
    widget:
    {
      type: Object as PropType<RelationWidget>,
      required: true,
    },
  },
  
  setup: (props /*, context*/) =>
  {
    const htmlElement = ref({} as HTMLElement);

    const ctrl = reactive(props.widget);

    onMounted(() => {
      ctrl.htmlElement = htmlElement.value;
    });

    onUpdated(() => {
      //console.log("on updated: RelationWidget");
    });

    const arrowSX = computed(() => ctrl.commentCoord.x + 10);
    const arrowSY = computed(() => ctrl.commentCoord.y + 10);

    const arrowEX = computed(() => ctrl.procRect.left + 100);
    const arrowEY = computed(() => ctrl.procRect.top + 30);

    return {
      htmlElement,
      ctrl,
      arrowSX,
      arrowSY,
      arrowEX,
      arrowEY,
    };
  },
});
</script>



<style scoped>
.relation-widget {
  position: absolute;
  left: 0;
  top: 0;
}
</style>