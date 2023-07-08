<template>
  <div class="step-card">
    <div class="step-view-item-number"><p>Step{{order}}</p></div>
    <div class="step-view-item-content">
      <div class="step-view-item-head">
        <div class="step-view-item-title">
          <p>{{step.widget.name}}</p>
        </div>
        <div class="step-view-item-right-controls">
          <div class="step-view-item-cancel" v-on:click="removeStep(step)">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
      <div class="step-view-item-desc">
        <div class="step-desc"><p><strong>{{step.widget.description}}</strong></p></div>
        <!-- <div class="step-content">
          <table class="step-sort-table">
            <tr>
              <td><p><strong>Input:</strong></p></td>
              <td>予選成績</td>
            </tr>
            <tr>
              <td><p><strong>Output:</strong></p></td>
              <td>予選成績</td>
            </tr>
          </table>
        </div> -->
      </div>
      <div class="step-edit-icon-wrapper">
        <div class="step-edit-icon" v-on:click="showOpView">
          <i class="far fa-edit"></i>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import useOperationView from "../../../model/composables/use-operation-view";
import { defineComponent, PropType } from "vue";
import { Step } from "../../../model/workflow/step";



export default defineComponent({
  name: "StepCard",
  props: 
  {
    step: 
    {
      type: Object as PropType<Step>,
      required: true,
    },
    order:
    {
      type: Number,
      required: true,
    },
    removeStep:
    {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup: (props, _) =>
  {
    const { setStep, showView } = useOperationView();

    const showOpView = () =>
    {
      setStep(props.step);
      showView();
    }
    
    return { showOpView };
  },
});
</script>



<style scoped>
.step-card
{
  margin: 30px 0 0 0;
  width: 100%;
  user-select: none;
}

.step-view-item-number
{
  font-size: 18px;
  margin-bottom: 5px;
}

.step-view-item-content
{
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
}

.step-view-item-head
{
  height: 34px;
  line-height: 34px;
  background-color: #363636;
  display: flex;
  flex-direction: row;
}


.step-view-item-title
{
  color: white;
  margin-left: 10px;
}

.step-view-item-desc
{
  margin: 10px 10px 0 10px;
  font-size: 18px;
}

.step-desc
{
  width: 100%;
  padding-left: 5px;
}

.step-view-item-right-controls {
  display: flex;
  flex-direction: row-reverse;
  flex-grow: 1;
}
.step-view-item-cancel {
  color: white;
  font-size: 28px;
  padding-right: 10px;
  cursor: pointer;
}

.step-content
{
  height: 140px;
  padding: 10px 0 0 15px;
  font-size: 13px;
}

.step-sort-table
{
  border-collapse: separate;
  border-spacing: 5px 8px;
}

.step-edit-icon-wrapper
{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.step-edit-icon
{
  font-size: 22px;
  margin: 0 10px 5px 0;
  cursor: pointer;
}
</style>