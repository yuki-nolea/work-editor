<template>
  <div class="filter-step-card">
    <div class="step-view-item-number"><p>Step{{order}}</p></div>
    <div class="step-view-item-content">
      <div class="step-view-item-head">
        <div class="step-view-item-icon">
          <i class="fas fa-long-arrow-alt-up"></i>
          <i class="fas fa-long-arrow-alt-down"></i>
        </div>
        <div class="step-view-item-kind">
          <p>Filter</p>
        </div>
      </div>
      <div class="step-view-item-desc">
        <div class="step-title"><p><strong>{{step.widget.name}}</strong></p></div>
        <div class="step-desc">
          <table class="step-filter-table">
            <tr>
              <td><p><strong>Input:</strong></p></td>
              <td>予選成績</td>
            </tr>
            <tr>
              <td><p><strong>Sort by:</strong></p></td>
              <td>得点</td>
            </tr>
            <tr>
              <td><p><strong>Order:</strong></p></td>
              <td>Descending</td>
            </tr>
            <tr>
              <td><p><strong>Output:</strong></p></td>
              <td>予選成績</td>
            </tr>
          </table>
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
  name: "FilterStepCard",
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
.filter-step-card
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
  background-color: #26C6DA;
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
  color: #26C6DA;
}

.step-view-item-icon .fas
{
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
  height: 140px;
  padding: 10px 0 0 15px;
  font-size: 13px;
}

.step-filter-table
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