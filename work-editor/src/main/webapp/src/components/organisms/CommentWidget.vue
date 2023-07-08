<template>
  <div
    ref="htmlElement"
    class="comment-widget"
    v-bind:style="{
      left: ctrl.coord.x + 'px',
      top: ctrl.coord.y + 'px',
    }"
  >
    <div class="content-wrapper">
      <p>{{ctrl.txt}}</p>
    </div>
  </div>
</template>


<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUpdated,
  PropType,
  reactive,
  ref,
} from "vue";
import { CommentWidget } from "../../types/my-types";

export interface OnClickCommentInterface
{
  (e: MouseEvent, widget: CommentWidget): void;
}

export default defineComponent({
  name: "CommentWidget",
  props:
  {
    widget:
    {
      type: Object as PropType<CommentWidget>,
      required: true,
    },
    onClick:
    {
      type: Function as PropType<OnClickCommentInterface>,
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
.comment-widget {
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

  padding: 10px;
}

.title-wrapper
{
  margin-top: 5px;
}

</style>


