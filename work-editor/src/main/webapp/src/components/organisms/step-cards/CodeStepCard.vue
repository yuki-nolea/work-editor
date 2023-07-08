<template>
  <div class="code-step-card">
    <div class="step-view-item-number"><p>Step{{order}}</p></div>
    <div class="step-view-item-content">
      <div class="step-view-item-head">
        <div class="step-view-item-icon">
          <i class="fas fa-code"></i>
        </div>
        <div class="step-view-item-kind">
          <p>Code</p>
        </div>
      </div>
      <div class="step-view-item-desc">
        <div class="step-title"><p><strong>{{step.widget.name}}</strong></p></div>
        <div class="step-desc">
          <div class="show-code-button">
              <p><strong>Show Code</strong></p>
          </div>
        </div>
      </div>
      <div class="step-edit-icon-wrapper">
        <div class="step-edit-icon">
          <i class="far fa-edit"></i>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Step } from "../../../model/workflow/step";

export default defineComponent({
  name: "CodeStepCard",
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
  },
  setup: () =>
  {

    return {  };
  },
});
</script>



<style scoped>
.code-step-card
{
  margin: 15px 0 0 0;
  width: 100%;
  user-select: none;
}

.step-view-item-number
{
  font-size: 12px;
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
  background-color: #FF9800;
  display: flex;
  flex-direction: row;
}

.step-view-item-icon
{
  font-size: 20px;
  background-color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin: auto 0 auto 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FF9800;
}

.step-view-item-icon .fas
{
  font-size: 17px;
  -webkit-text-stroke: 1px white;
}


.step-view-item-kind
{
  color: white;
  margin-left: 10px;
}

.step-view-item-desc
{
  margin: 10px 10px 0 10px;
  font-size: 12px;
}

.step-title
{
  width: 100%;
  padding-left: 5px;
}

.step-desc
{
  height: 120px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.show-code-button
{
  border: 1px solid #A9A9A9;
  border-radius: 5px;
  width: 180px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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