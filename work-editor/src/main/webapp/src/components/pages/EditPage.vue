<template>
  <div class="main">
    <div class="grid-wrapper">
      <div class="control-bar">
        <div class="control-bar-left">
          <div
            class="control-bar-item control-bar-item-unselected"
            v-on:click="newProcViewControl.showNewProcView"
          >
            <p>＋</p>
          </div>
          <div
            class="control-bar-item"
            :class="{
              'control-bar-item-selected': editArea.isMouseOpMode,
              'control-bar-item-unselected': !editArea.isMouseOpMode,
            }"
            v-on:click="onClickMouseOpModeBtn"
          >
            <i class="fas fa-mouse-pointer"></i>
          </div>
          <div
            class="control-bar-item"
            :class="{
              'control-bar-item-selected': editArea.isSequenceOpMode,
              'control-bar-item-unselected': !editArea.isSequenceOpMode,
            }"
            v-on:click="onClickSequenceOpModeBtn"
          >
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
        <div class="control-bar-center">

        </div>
        <div class="control-bar-right">
          <div
            class="control-bar-item control-bar-item-unselected"         
            v-on:click="onClickRunButton"
          >
            <i class="fas fa-play"></i>
          </div>
        </div>
        
      </div>
      <div class="edit-main">
        <edit-area-pane :work="work" :editArea="editArea" :onClickComment="onClickComment" :onClickProcedure="onClickProcedure" :focusEditArea="focusEditArea" @setEditAreaHTMLElement="setEditAreaHTMLElement"/>
        <div class="panes">
          <left-pane :work="work" :focusedProcId="focusedProcId" />
          <!-- <right-comparison-pane :work="work" :focusedProcId="focusedProcId"/> -->
          <right-pane :work="work" :focusedProcId="focusedProcId" />
        </div>
      </div>
        
    </div>
    <NewProcedureView
      v-if="newProcViewControl.newProcedureViewShowFlag"
      v-on:onComplete="newProcViewControl.addProcedure"
      v-on:hideView="newProcViewControl.hideNewProcView"
    />
    <NewVariableView 
      v-if="newVariableViewShowFlag"
    />
    <OperationView 
      :opViewCtl="opViewCtl"
      v-if="opViewCtl.isShowed.value"
    />
    <NewOperationView 
      v-if="newOperationViewShowFlag"
    />
    <NewStepView 
      v-if="newStepViewShowFlag"
    />
    <ResultView 
      :opViewCtl="opViewCtl"
      v-if="resultViewShowFlag"
    />
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, onUpdated, reactive, ref } from "vue";
import NewProcedureView from "../organisms/NewProcedureView.vue";
import NewVariableView from "../organisms/NewVariableView.vue";
import NewOperationView from "../organisms/NewOperationView.vue";
import NewStepView from "../organisms/NewStepView.vue";
import ResultView from "../organisms/ResultView.vue";
import OperationView from "../organisms/OperationView.vue"
import EditAreaPane from "../organisms/pane/EditAreaPane.vue";

import { CommentWidget } from "../../types/my-types";

import useWork, { makeInitializedWork, makeSequence, } from "../../model/composables/use-work";
import useEditArea from "../../model/composables/use-edit-area";
import useOpModeManager from "../../model/composables/use-op-mode-manager";
import workRunner from "../../model/workflow/work-runner";
import LeftPane from "../organisms/pane/LeftPane.vue";
//import BottomPane from "../organisms/pane/BottomPane.vue";
import RightPane from "../organisms/pane/RightPane.vue";
import RightComparisonPane from "../organisms/pane/RightComparisonPane.vue";
import useMouseOp, { MouseOpManager } from "../../model/composables/use-mouse-op";
import useSequenceOp from "../../model/composables/use-sequence-op";
import useCommentOp from "../../model/composables/use-comment-op";
import useOperationView from "../../model/composables/use-operation-view";
import useResultView from "../../model/composables/use-result-view";
import useNewVariable from "../../model/composables/use-new-variable";
import useNewOperation from "../../model/composables/use-new-operation";
import useNewStep from "../../model/composables/use-new-step";
import { Procedure, ProcedureWidget } from "../../model/workflow/procedure";
//import useKeyboardEvent from "../../model/composables/use-keyboard-event";

export default defineComponent({
  name: "EditPage",
  props: {},
  setup: () => {
    //const { enable: enableKeyEvent } = useKeyboardEvent();
    //enableKeyEvent();

    const { work } = useWork(
      'By calculating the current statistical information of PC Koshien, it is confirmed whether "nationwide dissemination" and "national competition" are embodied.', 
     "Display the number of top seven teams per region in a line chart."
     );
    
    const { editAreaWidget: editArea } = useEditArea(work);

    const setEditAreaHTMLElement = (element: HTMLElement) => editArea.htmlElement = element;

    const mouseOp: MouseOpManager = useMouseOp(work, editArea);

    const focusedProcId = ref<symbol | null>(null);
    mouseOp.onFocused.addEventListener((procedure: ProcedureWidget) => 
    {
      focusedProcId.value = procedure.id!;
    });
    mouseOp.onunFocused.addEventListener(() => 
    {
      focusedProcId.value = null;
    });

    const sequenceOp = useSequenceOp(work, editArea);

    const commentOp = useCommentOp(work, editArea);
    commentOp.enable();

    sequenceOp.onCompleted.addEventListener(( from: ProcedureWidget, to: ProcedureWidget ) =>
    {
      const fromProc = work.searchProcedure(from.id!);
      const toProc = work.searchProcedure(to.id!);

      work.addSequence(makeSequence(fromProc!, toProc!));
      workRunner.updateOrder(work);
    });

    const opManager = useOpModeManager(mouseOp, sequenceOp);

    onMounted(() => 
    {
      makeInitializedWork(work);

      workRunner.updateOrder(work);

      opManager.enableMouseOpMode();
    });

    onUpdated(() =>
    {
      //console.log("on updated: EditPage");
    });

    const newProcViewControl = reactive(
    {
      newProcedureViewShowFlag: false,

      showNewProcView: () => 
      {
        newProcViewControl.newProcedureViewShowFlag = true;
      },
      hideNewProcView: () => 
      {
        newProcViewControl.newProcedureViewShowFlag = false;
      },
      
      addProcedure: (procedure: Procedure): void =>
      {
        newProcViewControl.hideNewProcView();
        work.addProcedure(procedure);
        workRunner.updateOrder(work);
      },
    });

    const { showFlag: resultViewShowFlag} = useResultView();
    
    const { showFlag: newVariableViewShowFlag } = useNewVariable();

    const { showFlag: newOperationViewShowFlag } = useNewOperation();

    const { showFlag: newStepViewShowFlag } = useNewStep();

    const opViewCtl = useOperationView();

    const onClickMouseOpModeBtn = () =>
    {
      opManager.enableMouseOpMode();
    };

    const onClickSequenceOpModeBtn = () =>
    {
      opManager.enableSequenceOpMode();
    };

    const onClickRunButton = () =>
    {
      workRunner.run(work);

    };

    const focusEditArea = () =>
    {
      mouseOp.cancel();
    };

    const onClickProcedure = (e: MouseEvent, widget: ProcedureWidget) =>
    {
      if(opManager.isMouseOpEnabled())
      {
        mouseOp.onClick(e, widget);
      }
      else if(opManager.isSequenceOpEnabled())
      {
        sequenceOp.onClick(e, widget);
      }
    };

    const onClickComment = (e: MouseEvent, widget: CommentWidget) =>
    {
      commentOp.onClick(e, widget);
    }

    return {
      work,
      editArea,
      newProcViewControl,
      newVariableViewShowFlag,
      newOperationViewShowFlag,
      newStepViewShowFlag,
      resultViewShowFlag,
      focusedProcId,
      opViewCtl,
      onClickProcedure,
      onClickMouseOpModeBtn,
      onClickSequenceOpModeBtn,
      onClickComment,
      setEditAreaHTMLElement,
      onClickRunButton,
      focusEditArea,
    };
  },
  components: {
    NewProcedureView,
    NewVariableView,
    NewOperationView,
    ResultView,
    OperationView,
    EditAreaPane,
    LeftPane,
    RightPane,
    RightComparisonPane,
    NewStepView,
  },
});
</script>



<style scoped>
.main {
  width: 100%;
  height: 100%;
}
.grid-wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 40px 1fr;
}

.control-bar
{
  width: 100%;
  grid-row: 1 / 2;
  background-color: #363636;
  color: white;
  display: flex;
  flex-direction: row;
}

.control-bar-left
{
  flex: 0 0 300px;
  display: flex;
  flex-direction: row;
}

.control-bar-center
{
  flex: 1 0 1px;
  display: flex;
  flex-direction: row;
}

.control-bar-right
{
  flex: 0 0 300px;
  display: flex;
  flex-direction: row;
}



.control-bar-item
{
  width: 40px;
  height: 100%;
  line-height: 40px;
  background-color: transparent;
  text-align: center;
  font-size: 24px;
  user-select: none;
}

.control-bar-item-unselected:hover {
  background-color: #262626;
}
.control-bar-item-selected {
  background: #ff6c6c;
}

.edit-main {
  position: relative;
  grid-row: 2 / 3;
  width: 100%;
  overflow: hidden;
}

.panes
{
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: grid;
  grid-template-rows: 1fr 200px;
  grid-template-columns: 300px 1fr 330px 330px;
}

select{
  -webkit-appearance:none;
    appearance:none;
  width:100%;
  padding:1em 1em;
  box-sizing:border-box;
  font-size:1em;
  border:#ccc 1px solid;
  border-radius:0;
  background:#fff;
}
.selectbox::after{
  content:"";
  display:block;
  width:10px;
  height:10px;
  position:absolute;
  right:5%;
  top:35%;
  border-bottom:#333 2px solid;
  border-right:#333 2px solid;
  transform:rotate(45deg)translateY(-30%);
}
</style>