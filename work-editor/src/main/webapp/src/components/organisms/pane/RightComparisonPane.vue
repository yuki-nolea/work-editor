<template>
  <div class="right-pane">
    <div class="tab-navs">
      <div class="tab-navs-container">
        <input type="radio" id="right-pane-tab0" name="tab" :value="0" v-model="active_tab">
        <label for="right-pane-tab0" class="tab-nav tab-nav-0" v-bind:class="{'tab-nav-selected': active_tab == 0}"><span>Procedure</span></label>
      </div>
      <hr>
    </div>

    <ul class="tab-items">
      <li v-if="active_tab === 0">
        <div class="step-view-container">
          <div 
            v-for="(step, index) in focusedProc? focusedProc.steps : []" :key="step">
            <step-card v-if="step.type === StepType.Common" :step="step" :order="index" :removeStep="removeStep" />
            <sort-step-card v-if="step.type === StepType.Sort" :step="step" :order="index" />
            <filter-step-card v-if="step.type === StepType.Filter" :step="step" :order="index" />
            <code-step-card v-if="step.type === StepType.Code" :step="step" :order="index" />
          </div>
        </div>
      </li>
      
    </ul>
    
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from "vue";
import StepCard from "../step-cards/StepCard.vue"
import SortStepCard from "../step-cards/SortStepCard.vue"
import CodeStepCard from "../step-cards/CodeStepCard.vue"
import FilterStepCard from "../step-cards/FilterStepCard.vue"
import { Work } from "../../../model/workflow/work";
import { OperationViewProps } from "model/composables/use-operation-view";
import { Procedure } from "../../../model/workflow/procedure";
import { Step, StepType, StepWidget } from "../../../model/workflow/step";


export default defineComponent({
  name: "RightPane",
  props: 
  {
    work:
    {
      type: Object as PropType<Work>,
      required: true,
    },
    focusedProcId: 
    {
      type: Symbol,
      required: false,
      default: null,
    },
  },
  setup: (props) =>
  {
    const active_tab = ref(0);

    const focusedProc = ref<Procedure | null>(props.work.searchProcedure(props.focusedProcId));

    watch(() => props.focusedProcId, (id) => 
    {
      if(id)
      {
        focusedProc.value = props.work.searchProcedure(id);
      }
      else
      {
        focusedProc.value = null;
      }
    });


    return { active_tab, focusedProc, StepType };
  },
  components: 
  {
    StepCard,
    SortStepCard,
    FilterStepCard,
    CodeStepCard,
  },
});
</script>



<style scoped>
.right-pane
{
  /* position: absolute;
  right: 0;
  top: 0; */
  /* height: 100%;
  width: 300px; */
  pointer-events: auto;
  background-color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  grid-column: 3/4;
  grid-row: 1/3;
  /* z-index: 10; */
  overflow-y: hidden;
}

.tab-navs
{
  margin: 8px auto 0 auto;
  width: 85%;
  height: 30px;
  text-align: left;
  font-size: 12px;
}

.tab-navs-container
{
  display: flex;
  flex-direction: row;
  height: 100%;
}


.tab-nav
{
  height: 100%;
  line-height: 30px;
  color: #A9A9A9;
  margin-right: 20px;
}

.tab-nav:hover
{
  color: black;
}

.tab-nav-selected
{
  color: black;
}

hr
{
	border-top: 1px solid #A9A9A9;
  margin: 0;
}

.tab-navs input 
{
  display: none;
}

.tab-items, .tab-items li
{
  height: 100%;
}

.tab-item
{
  height: 95%;
  text-align: left;
}

.step-view-container
{
  position: relative;
  padding: 3px;
  height: 95%;
  width: 85%;
  margin: 0 auto 0 auto;
  text-align: left;
  overflow-y: scroll;
}



.new-step-button
{
  position: absolute;
  bottom: 5px;
  right: 15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #363636;
  line-height: 30px;
  font-size: 30px;
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