<template>
  <div
    class="edit-area" ref="editFieldElement"
    :style="{
      left: editArea.rect.left + 'px',
      top: editArea.rect.top + 'px',
      width: editArea.rect.width + 'px',
      height: editArea.rect.height + 'px',
    }"
  >
    <SequenceWidget
      v-for="sequence in work.sequences"
      :key="sequence"
      :widget="sequence.widget"
    />
    <RelationWidget
      v-for="relation in work.relations"
      :key="relation"
      :widget="relation.widget"
    />
    <ProcWidget
      v-for="procedure in work.procedures"
      :key="procedure"
      :widget="procedure.widget"
      :onClick="onClickProcedure"
    />
    <CmtWidget
      v-for="comment in work.comments"
      :key="comment"
      :widget="comment.widget"
      :onClick="onClickComment"
    />
  </div>
</template>


<script lang="ts">
import { CommentWidget } from "types/my-types";
import { defineComponent, onMounted, PropType, ref } from "vue";
import { Work } from "../../../model/workflow/work";

import ProcWidget from '../ProcedureWidget.vue'
import CmtWidget from '../CommentWidget.vue'
import SequenceWidget from '../SequenceWidget.vue'
import RelationWidget from '../RelationWidget.vue'
import { ProcedureWidget } from "../../../model/workflow/procedure";

export interface FocusEditAreaInterface
{
  (e: MouseEvent): void;
}

export interface OnClickProcedureInterface
{
  (e: MouseEvent, widget: ProcedureWidget): void;
}

export interface OnClickCommentInterface
{
  (e: MouseEvent, widget: CommentWidget): void;
}

export default defineComponent({
  name: "NewProcedureView",
  props:
  {
    work: 
    {
      type: Object as PropType<Work>,
      required: true,
    },
    editArea:
    {
      type: Object,
      required: true,
    },
    onClickComment:
    {
      type: Function as PropType<OnClickCommentInterface>,
      required: true,
    },
    onClickProcedure:
    {
      type: Function as PropType<OnClickProcedureInterface>,
      required: true,
    },
    focusEditArea:
    {
      type: Function as PropType<FocusEditAreaInterface>,
      required: true,
    },
  },
  
  setup: (props, context) =>
  {  
    const editFieldElement = ref({} as HTMLElement);

    onMounted(() =>
    {
      context.emit("setEditAreaHTMLElement", editFieldElement.value);




      editFieldElement.value.addEventListener("mousedown", (e: MouseEvent) =>
      {
        //左クリック時
        if(e.button == 0)   
        {
          props.focusEditArea(e);
        }
      });
    });

    return { editFieldElement, };
  },

  components:
  {
    ProcWidget,
    SequenceWidget,
    RelationWidget,
    CmtWidget,
  }
});
</script>



<style scoped>

.edit-area {
  position: relative;
  transform-origin: center;
  background-image: radial-gradient(#eaeaea 2px, #ffffff 2px);
  background-size: 20px 20px;
  /* z-index: 1; */
}
</style>