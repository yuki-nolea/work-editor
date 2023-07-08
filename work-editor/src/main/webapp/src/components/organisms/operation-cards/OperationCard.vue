<template>
  <div class="operation-card">
    <div class="operation-view-item-number"><p>Operation {{order + 1}}</p></div>
    <div class="operation-view-item-content">
      <div class="operation-view-item-head">
        <div class="operation-view-item-icon">
          <i class="fas fa-long-arrow-alt-up"></i>
          <i class="fas fa-long-arrow-alt-down"></i>
        </div>
        <div class="operation-view-item-kind">
          <p>Sort</p>
        </div>
      </div>
      <div class="operation-view-item-desc">
        <div class="operation-desc">
          <table class="operation-table">
            <tr>
              <td><p><strong>Input:</strong></p></td>
              <td>{{variable.name}}</td>
            </tr>
            <tr>
              <td><p><strong>Sort by:</strong></p></td>
              <td>{{member}}</td>
            </tr>
            <tr>
              <td><p><strong>Order:</strong></p></td>
              <td>{{sortOrder}}</td>
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
import { SortOrder } from "../../../model/operations/sort-operation";
import { vPool } from "../../../model/variables/variable-pool";
import { defineComponent, PropType, ref, watch } from "vue";
import { Operation } from "../../../types/my-types";

export default defineComponent({
  name: "OperationCard",
  props: 
  {
    operations: 
    {
      type: Object as PropType<Operation[]>,
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
    const symbol = ref(props.operations[props.order].getArgs().get("symbol")); 
    const order = ref(props.operations[props.order].getArgs().get("order"));
    const member = ref(props.operations[props.order].getArgs().get("member"));
    const dimension = ref(props.operations[props.order].getArgs().get("dimension"));

    const variable = ref(vPool.get(symbol.value));

    let sortOrder = order.value === SortOrder.Asc ? "Ascending order" : "Descending order";

    watch(props.operations, () => 
    {

      symbol.value    = props.operations[props.order].getArgs().get("symbol"); 
      order.value     = props.operations[props.order].getArgs().get("order");
      member.value    = props.operations[props.order].getArgs().get("member");
      dimension.value = props.operations[props.order].getArgs().get("dimension");

      console.log(symbol.value, order.value, member.value, dimension.value);
      variable.value  = vPool.get(symbol.value);
    });


    return { variable, sortOrder, member, dimension };
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
}

.operation-view-item-head
{
  height: 34px;
  line-height: 34px;
  background-color: #26C6DA;
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
  height: 140px;
  padding: 10px 0 0 15px;
  font-size: 13px;
}

.operation-table
{
  border-collapse: separate;
  border-spacing: 5px 8px;
}

.operation-edit-icon-wrapper
{
  width: 100%;
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
</style>