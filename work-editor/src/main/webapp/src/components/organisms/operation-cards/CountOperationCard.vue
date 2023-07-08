<template>
  <div class="operation-card">
    <div class="operation-view-item-number"><p>Operation {{order + 1}}</p></div>
    <div class="operation-view-item-content">
      <div class="operation-view-item-head">
        <div class="operation-view-item-kind">
          <p>Count</p>
        </div>
        <div class="float-delete-btn" @click="deleteOperation(order)">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="operation-view-item-desc">
        <div class="operation-desc">
          <table class="operation-table">
            <tr>
              <td><p><strong>Input:</strong></p></td>
              <td>{{inputVariable.name}}</td>
            </tr>
            <tr>
              <td><p><strong>Output:</strong></p></td>
              <td>{{outputVariable.name}}</td>
            </tr>
            <tr>
              <td><p><strong>Target:</strong></p></td>
              <td>{{member}}</td>
            </tr>
            <tr>
              <td><p><strong>Search:</strong></p></td>
              <td>{{searchValue}}</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- <div class="operation-edit-icon-wrapper">
        <div class="operation-edit-icon">
          <i class="far fa-edit"></i>
        </div>
      </div> -->
    </div>
  </div>
</template>


<script lang="ts">
import { vPool } from "../../../model/variables/variable-pool";
import { computed, defineComponent, PropType, ref, toRefs, watch } from "vue";
import { Operation } from "../../../types/my-types";
import useOperationView from "../../../model/composables/use-operation-view";

export default defineComponent({
  name: "CountOperationCard",
  props: 
  {
    operation: 
    {
      type: Object as PropType<Operation>,
      required: true,
    },
    order:
    {
      type: Number,
      required: true,
    },
  },
  setup: (props) =>
  {
    const { deleteOperation } = useOperationView();
    const { operation } = toRefs(props);

    const inputSymbol = computed(() => operation.value.getArgs().get("inputSymbol")); 
    const outputSymbol = computed(() => operation.value.getArgs().get("outputSymbol"));
    const member = computed(() => operation.value.getArgs().get("member"));
    const searchValue = computed(() => props.operation.getArgs().get("searchValue"));


    const inputVariable = computed(() => vPool.get(inputSymbol.value));
    const outputVariable = computed(() => vPool.get(outputSymbol.value));


    return { member, searchValue, inputVariable, outputVariable, deleteOperation };
  },
});
</script>



<style scoped>
.operation-card
{
  margin: 15px 0 0 0;
  width: 100%;
  user-select: none;
}

.operation-view-item-number
{
  font-size: 12px;
  margin-bottom: 5px;
}

.operation-view-item-content
{
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  position: relative;
}

.operation-view-item-head
{
  position: relative;
  height: 34px;
  line-height: 34px;
  background-color: #FC7F67;
  display: flex;
  flex-direction: row;
}
.operation-view-item-icon
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

.operation-view-item-icon .fas
{
  -webkit-text-stroke: 1px white;
}


.operation-view-item-kind
{
  color: white;
  margin-left: 10px;
}

.operation-view-item-desc
{
  margin: 10px 10px 0 10px;
  font-size: 12px;
}

.operation-title
{
  width: 100%;
  padding-left: 5px;
}

.operation-desc
{
  padding: 10px 0 10px 15px;
  font-size: 13px;
}

.operation-table
{
  border-collapse: separate;
  border-spacing: 5px 8px;
}

.operation-edit-icon-wrapper
{
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.operation-edit-icon
{
  font-size: 22px;
  margin: 0 10px 5px 0;
  cursor: pointer;
}
.float-delete-btn
{
  position: absolute;
  top: 5px;
  right: 0px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: transparent;
  line-height: 26px;
  font-size: 16px;
  color: white;
  cursor: pointer;
}
</style>