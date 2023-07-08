<template>
  <div class="component">
    <div class="background" v-on:click="hideView" />
    <div class="main">
      <div class="header">
        <div class="title-wrapper">
          <p>Operations</p>
        </div>
        <div class="right-controls">
          <div class="cancel" v-on:click="opViewCtl.hideView">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
      <div class="operation-container">

        <div class="operation-list"
          v-for="(operation, index) in operations" :key="index"
          draggable="true"
          @dragstart="dragstart(operation)"
          @dragenter="dragenter(operation)"
          @dragend.stop.prevent="dragend"
        >
          <!-- <p>{{operation.getArgs().get("symbol")}}</p> -->
          <!-- <operation-card :operations="step.operations" :order="index"/> -->
          <sort-operation-card v-if="operation.type === OperationType.Sort" :operation="operation" :order="index"/>
          <count-operation-card v-if="operation.type === OperationType.Count" :operation="operation" :order="index"/>
          <countby-operation-card v-if="operation.type === OperationType.Countby" :operation="operation" :order="index"/>
          <add-operation-card v-if="operation.type === OperationType.Add" :operation="operation" :order="index"/>
          <concat-operation-card v-if="operation.type === OperationType.Concat" :operation="operation" :order="index"/>
          <format-operation-card v-if="operation.type === OperationType.Format" :operation="operation" :order="index"/>
        </div>
      </div>

      <button class="new-operation-button" @click="onclick">
        <p>+</p>
      </button>
    </div>
  </div>
</template>


<script lang="ts">
import { OperationViewProps } from "../../model/composables/use-operation-view";
import SortOperationCard from "./operation-cards/SortOperationCard.vue"
import CountOperationCard from "./operation-cards/CountOperationCard.vue"
import CountbyOperationCard from "./operation-cards/CountbyOperationCard.vue"
import AddOperationCard from "./operation-cards/AddOperationCard.vue"
import ConcatOperationCard from "./operation-cards/ConcatOperationCard.vue"
import FormatOperationCard from "./operation-cards/FormatOperationCard.vue"
import { defineComponent, PropType, reactive, ref, watch } from "vue";
import { Operation, OperationType } from "../../types/my-types";
import useNewOperation from "../../model/composables/use-new-operation";

export default defineComponent({
  name: "OperationView",
  props: 
  {
    opViewCtl: 
    {
      type: Object as PropType<OperationViewProps>,
      required: true,
    },
  },
  setup: (props, _/* props, context */) =>
  {
    const step = props.opViewCtl.getStep();
    const operations = props.opViewCtl.getStep().operations;
    
    let fromItem: Operation | null = null;

    const dragstart = (from: Operation) =>
    {
      fromItem = from;
    };

    const dragenter = (to: Operation) =>
    {
      const toItem = to;

      if(step != null && fromItem != null && fromItem != toItem)
      {
        const fromIndex = operations.indexOf(fromItem);
        const toIndex = operations.indexOf(toItem);

        //console.log(`dragenter: from ${fromIndex}, to ${toIndex}`);

        if(fromIndex != null && toIndex != null)
        {
          const work = operations[fromIndex];
          operations.splice(fromIndex, 1, operations[toIndex]);
          operations.splice(toIndex, 1, work);

          //console.log("swaped", fromIndex, toIndex);

          //console.log("swaped", operations[fromIndex], operations[toIndex]);
        }
      }
    };

    const dragend = () =>
    {
      fromItem = null;
      
      //console.log("operations:", operations);
    };

    const { showFlag: newOperationViewShowFlag } = useNewOperation();

    const onclick = () =>
    {
      newOperationViewShowFlag.value = true;
    }


    return { step, operations, dragstart, dragenter, dragend, onclick, OperationType };
  },
  components: 
  {
    SortOperationCard,
    CountOperationCard,
    CountbyOperationCard,
    AddOperationCard,
    ConcatOperationCard,
    FormatOperationCard,
  },
});
</script>



<style scoped>
.component {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
}
.background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
}
.main {
  position: relative;
  width: 700px;
  height: 500px;
  background-color: white;
  display: flex;
  flex-direction: column;
}
.header {
  width: 100%;
  background-color: #363636;
  color: white;
  line-height: 40px;
  display: flex;
  flex-basis: 40px;
}
.title-wrapper {
  padding-left: 15px;
  width: fit-content;
}
.title {
  font-size: 28px;
  margin-left: 10px;
}

.right-controls {
  display: flex;
  flex-direction: row-reverse;
  flex-grow: 1;
}
.cancel {
  font-size: 28px;
  padding-right: 15px;
  cursor: pointer;
}

.space-box {
  height: 60px;
  width: 60px;
  visibility: hidden;
}

.operation-container
{
  flex: 1;
  width: 100%;
  overflow-y: scroll;
  padding: 10px 60px 10px 60px;
}

.operation-list
{
  text-align: left;
}

.new-operation-button
{
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #363636;
  line-height: 40px;
  font-size: 40px;
  text-align: center;
  color: white;
  cursor: pointer;
}


/*スクロールバー全体*/
::-webkit-scrollbar {
    width: 3px;
}

/*スクロールバーの軌道*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
}

/*スクロールバーの動く部分*/
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 50, .5);
  border-radius: 10px;
  box-shadow:0 0 0 1px rgba(255, 255, 255, .3);
}

</style>