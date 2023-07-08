<template>
  <div
    ref="htmlElement"
    class="procedure-widget"
    :class="{ focused: ctrl.mouseOpState.isFocused || ctrl.sequenceOpState.isSelected, }"
    v-bind:style="{
      left: ctrl.rect.left + 'px',
      top: ctrl.rect.top + 'px',
      width: ctrl.rect.width + 'px',
      height: ctrl.rect.height + 'px',
    }"
  >
    <div class="content-wrapper">
      <div class="order-wrapper">
        <p>Procedure {{Number(ctrl.order) + 1}}</p>
      </div>
    <div class="title-wrapper">
      <p>{{ ctrl.name }}</p>
    </div>
    </div>
  </div>
</template>


<script lang="ts">
import { ProcedureWidget } from "../../model/workflow/procedure";
import {
  defineComponent,
  onMounted,
  onUpdated,
  PropType,
  reactive,
  ref,
} from "vue";

export interface OnClickProcedureInterface
{
  (e: MouseEvent, widget: ProcedureWidget): void;
}

export default defineComponent({
  name: "ProcedureWidget",
  props:
  {
    widget:
    {
      type: Object as PropType<ProcedureWidget>,
      required: true,
    },
    onClick:
    {
      type: Function as PropType<OnClickProcedureInterface>,
      required: true,
    },
  },

  setup: (props /*context*/) =>
  {
    const htmlElement = ref({} as HTMLElement);

    const ctrl = reactive(props.widget);

    onMounted(() =>
    {
      ctrl.htmlElement = htmlElement.value;

      ctrl.htmlElement.addEventListener("mousedown", (e: MouseEvent) =>
      {
        e.stopPropagation();
        //左クリック時
        if(e.button == 0)   
        {
          props.onClick(e, props.widget);
        }
      });
    });

    onUpdated(() =>
    {
      //console.log("on updated: ProcedureWidget");
    });

    return {
      htmlElement,
      ctrl,
    };
  },
});
</script>



<style scoped>
.procedure-widget {
  position: absolute;
  text-align: center;
  /* cursor: grab; */
  background-color: white;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  user-select: none;
}

.focused {
  border: 4px solid #00a3ff;
}

.content-wrapper
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.order-wrapper
{
  font-weight: bold;
}
.title-wrapper
{
  margin-top: 5px;
}

</style>


