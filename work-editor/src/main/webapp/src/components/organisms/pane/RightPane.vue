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
        <div class="desc-wrapper tab-item">
          <div class="step-view-container">
            
            <div class="desc-item-wrapper desc-intention">
              <div class="desc-title"><h2>Why</h2></div>
              <div class="desc-content">
                <!-- <p>事実上「日本一を決定する大会」という位置づけを確立するため、トップチームを選抜する。ただし、高校主体の大会として高校対抗の色合いを残すため、各校からの出場は2チームまでとする。</p> -->
                <p>{{focusedProc.widget.intention}}</p>
              </div>
              <div class="desc-edit-icon-wrapper">
                <div class="desc-edit-icon">
                  <i class="far fa-edit"></i>
                </div>
              </div>
              <hr>
            </div>
            
            <div 
              v-for="(step, index) in focusedProc? focusedProc.steps : []" :key="step"
              draggable="true"
              @dragstart="dragstart(step)"
              @dragenter="dragenter(step)"
              @dragend.stop.prevent="dragend"
            >
              <step-card v-if="step.type === StepType.Common" :step="step" :order="index" :removeStep="removeStep" />
              <sort-step-card v-if="step.type === StepType.Sort" :step="step" :order="index" />
              <filter-step-card v-if="step.type === StepType.Filter" :step="step" :order="index" />
              <code-step-card v-if="step.type === StepType.Code" :step="step" :order="index" />
            </div>

            <button class="new-step-button" @click="onClick">
              <p>+</p>
            </button>
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
import useNewStep from "../../../model/composables/use-new-step";
import { Procedure, ProcedureWidget } from "../../../model/workflow/procedure";
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

    const dummy = new Procedure({intention: ""} as ProcedureWidget);
    const focusedProc = ref<Procedure>(dummy);

    watch(() => props.focusedProcId, (id) => 
    {
      if(id)
      {
        focusedProc.value = props.work.searchProcedure(id) ?? dummy;
      }
      else
      {
        focusedProc.value = dummy;
      }
    });


    let fromItem: Step | null = null;

    const dragstart = (from: Step) =>
    {
      fromItem = from;
    };

    const dragenter = (to: Step) =>
    {
      const toItem = to;

      if(focusedProc.value != null && fromItem != toItem)
      {
        const fromIndex = focusedProc.value.steps.findIndex( (e) => e === fromItem);
        const toIndex = focusedProc.value.steps.findIndex( (e) => e === toItem);

        //console.log(`dragenter: from ${fromIndex}, to ${toIndex}`);
        
        const work = focusedProc.value.steps[fromIndex];
        focusedProc.value.steps[fromIndex] = focusedProc.value.steps[toIndex];
        focusedProc.value.steps[toIndex] = work;
      }
    };

    const dragend = () =>
    {
      fromItem = null;
    };

    const removeStep = (step: Step) =>
    {
      if(focusedProc.value != null)
      {
        const index = focusedProc.value.steps.findIndex(item => item === step);

        focusedProc.value.steps.splice(index, 1);
      }
      console.log(step);
    };

    const addStep = (widget: StepWidget) =>
    {
      if(focusedProc.value != null)
      {
        const step = new Step(widget, StepType.Common);
        
        console.log("new step: ", step);
        
        focusedProc.value.addStep(step);

        console.log("procedure's steps: ", focusedProc.value.steps);
      }
    }

    const { showFlag: newStepViewShowFlag, setStepAdder } = useNewStep();

    setStepAdder(addStep);

    const onClick = () =>
    {
      newStepViewShowFlag.value = true;
    }


    return { active_tab, focusedProc, StepType, dragstart, dragenter, dragend, removeStep, onClick };
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
  grid-column: 4/5;
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


.desc-item-wrapper
{
  overflow: hidden;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-top: 10px;
}

.desc-content
{
  min-height: 70px;
}

.desc-edit-icon-wrapper
{
  position: relative;
  bottom: 5px;
  right: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.desc-edit-icon
{
  font-size: 22px;
  margin: 0 10px 5px 0;
  cursor: pointer;
}


.step-view-container
{
  position: relative;
  padding: 3px;
  height: 99%;
  width: 85%;
  margin: 0 auto 0 auto;
  text-align: left;
  overflow-y: scroll;
}



.new-step-button
{
  position: fixed;
  bottom: 25px;
  right: 35px;
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