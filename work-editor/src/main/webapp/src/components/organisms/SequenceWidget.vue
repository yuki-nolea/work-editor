<template>
  <svg
    class="sequence"
    ref="htmlElement"
    xmlns="http://www.w3.org/2000/svg"
    x="0"
    y="0"
    width="100%"
    height="100%"
    style="background-color: transparent"
  >
    <marker
      id="arrow"
      markerUnits="strokeWidth"
      markerWidth="5"
      markerHeight="5"
      viewBox="0 0 10 10"
      refX="5"
      refY="5"
      orient="auto"
    >
      <polygon points="0,0 5,5 0,10 10,5" fill="black" />
    </marker>

    <line
      :x1="arrowSX"
      :y1="arrowSY"
      :x2="arrowMX"
      :y2="arrowMY"
      style="stroke: #000; stroke-width: 5"
      marker-end="url(#arrow)"
    />
    <line
      :x1="arrowMX"
      :y1="arrowMY"
      :x2="arrowEX"
      :y2="arrowEY"
      style="stroke: #000; stroke-width: 5"
    />
  </svg>
</template>


<script lang="ts">
import { SequenceWidget } from "../../model/workflow/sequence";

import {
  computed,
  defineComponent,
  onMounted,
  onUpdated,
  PropType,
  reactive,
  ref,
} from "vue";

export default defineComponent({
  name: "SequenceWidget",
  props:
  {
    widget:
    {
      type: Object as PropType<SequenceWidget>,
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
      //console.log("on updated: SequenceWidget");
    });

    const arrowSX = computed(() => ctrl.sRect.left + 100);
    const arrowSY = computed(() => ctrl.sRect.top + 30);
    const arrowMX = computed(
      () =>
        (ctrl.eRect.left - ctrl.sRect.left) / 2 +
        (ctrl.sRect.left + 100)
    );
    const arrowMY = computed(
      () =>
        (ctrl.eRect.top - ctrl.sRect.top) / 2 +
        (ctrl.sRect.top + 30)
    );
    const arrowEX = computed(() => ctrl.eRect.left + 100);
    const arrowEY = computed(() => ctrl.eRect.top + 30);

    return {
      htmlElement,
      ctrl,
      arrowSX,
      arrowSY,
      arrowMX,
      arrowMY,
      arrowEX,
      arrowEY,
    };
  },
});
</script>



<style scoped>
.sequence {
  position: absolute;
  left: 0;
  top: 0;
}
</style>