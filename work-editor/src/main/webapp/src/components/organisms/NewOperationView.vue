<template>
  <div class="component">
    <div class="background" v-on:click="hideView" />
    <div class="main">
      <div class="header">
        <div class="title-wrapper">
          <p>New Operation</p>
        </div>
        <div class="right-controls">
          <div class="cancel" v-on:click="hideView">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>

      <div class="space-box"></div>

      <div class="selection-wrapper">
        <p>Function component</p>
        <div class="selectdiv outline">
        <select class="single" v-model="operationType">
          <option disabled value="">component</option>
          <option v-for="item in operationTypeList" 
            v-bind:value="item" 
            v-bind:key="item.type">
          {{ item.name }}
          </option>
        </select>
        </div>
      </div>

      <!-- ======================================== Sort Operation ============================================= -->

      <div class="selection-wrapper" v-if="operationType.type == OperationType.Sort">
        <div class="space-box"></div>

        <p>Input variable</p>
        <div class="selectdiv outline">
          <select class="single" v-model="sortOpInputVariable">
            <option disabled value="">Variables</option>
            <option v-for="item in sortOpInputVariableList"  
              v-bind:value="item" 
              v-bind:key="item.sym">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="selection-wrapper" v-if="operationType.type == OperationType.Sort">
        <div class="space-box"></div>

        <p>Sort by</p>
        <div class="selectdiv outline">
          <select class="single" v-model="sortOpMemberVariable">
            <option disabled value="">Member</option>
            <option v-for="item in sortOpMemberList"  
              v-bind:value="item" 
              v-bind:key="item.sym">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="selection-wrapper" v-if="operationType.type == OperationType.Sort">
        <div class="space-box"></div>

        <p>Sort Order</p>
        <div class="selectdiv outline">
          <select class="single" v-model="sortOpOrder">
            <option disabled value="">Order</option>
            <option v-for="item in sortOpOrderList"  
              v-bind:value="item.order" 
              v-bind:key="item.order">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>

      
      <!-- ======================================== Sort Operation ============================================= -->
      
      <!-- ======================================== Count Operation ============================================= -->
      
      <div class="selection-wrapper" v-if="operationType.type == OperationType.Count">
        <div class="space-box"></div>

        <p>Input variable</p>
        <div class="selectdiv outline">
          <select class="single" v-model="countOpInputVariable">
            <option disabled value="">Variables</option>
            <option v-for="item in countOpInputVariableList"  
              v-bind:value="item" 
              v-bind:key="item.sym">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="selection-wrapper" v-if="operationType.type == OperationType.Count">
        <div class="space-box"></div>

        <p>Output variable</p>
        <div class="selectdiv outline">
          <select class="single" v-model="countOpOutputVariable">
            <option disabled value="">Variables</option>
            <option v-for="item in countOpOutputVariableList"  
              v-bind:value="item" 
              v-bind:key="item.sym">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="selection-wrapper" v-if="operationType.type == OperationType.Count">
        <div class="space-box"></div>

        <p>Member</p>
        <div class="selectdiv outline">
          <select class="single" v-model="countOpMemberVariable">
            <option disabled value="">Member</option>
            <option v-for="item in countOpMemberVariableList"  
              v-bind:value="item" 
              v-bind:key="item.sym">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>

      
      <div class="selection-wrapper" v-if="operationType.type == OperationType.Count">
        <div class="space-box"></div>

        <p>Count</p>
        <div class="txt-input-area">
          <input class="my-textarea" type="text" v-model="countOpSearchVariable" />
          <div class="text_underline"></div>
        </div>
      </div>
      
      
      <!-- ======================================== Count Operation ============================================= -->
      
      <!-- ======================================== Countby Operation ============================================= -->
      
      <div class="selection-wrapper" v-if="operationType.type == OperationType.Countby">
        <div class="space-box"></div>

        <p>Input variable</p>
        <div class="selectdiv outline">
          <select class="single" v-model="countbyOpInputVariable">
            <option disabled value="">Variables</option>
            <option v-for="item in countbyOpInputVariableList"  
              v-bind:value="item" 
              v-bind:key="item.sym">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="selection-wrapper" v-if="operationType.type == OperationType.Countby">
        <div class="space-box"></div>

        <p>Output variable</p>
        <div class="selectdiv outline">
          <select class="single" v-model="countbyOpOutputVariable">
            <option disabled value="">Variables</option>
            <option v-for="item in countbyOpOutputVariableList"  
              v-bind:value="item" 
              v-bind:key="item.sym">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="selection-wrapper" v-if="operationType.type == OperationType.Countby">
        <div class="space-box"></div>

        <p>Count by</p>
        <div class="selectdiv outline">
          <select class="single" v-model="countbyOpMemberVariable">
            <option disabled value="">Member</option>
            <option v-for="item in countbyOpMemberVariableList"  
              v-bind:value="item" 
              v-bind:key="item.sym">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      
      <!-- ======================================== Countby Operation ============================================= -->
      
      <!-- ======================================== Add Operation ============================================= -->
      
      <div class="selection-wrapper" v-if="operationType.type == OperationType.Add">
        <div class="space-box"></div>

        <p>Input variable1</p>
        <div class="selectdiv outline">
          <select class="single" v-model="addOpInputVariable1">
            <option disabled value="">Variables</option>
            <option v-for="item in addOpInputVariableList"  
              v-bind:value="item" 
              v-bind:key="item.sym">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="selection-wrapper" v-if="operationType.type == OperationType.Add">
        <div class="space-box"></div>

        <p>Input variable2</p>
        <div class="selectdiv outline">
          <select class="single" v-model="addOpInputVariable2">
            <option disabled value="">Variables</option>
            <option v-for="item in addOpInputVariableList"  
              v-bind:value="item" 
              v-bind:key="item.sym">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="selection-wrapper" v-if="operationType.type == OperationType.Add">
        <div class="space-box"></div>

        <p>Output variable</p>
        <div class="selectdiv outline">
          <select class="single" v-model="addOpOutputVariable">
            <option disabled value="">Variables</option>
            <option v-for="item in addOpOutputVariableList"  
              v-bind:value="item" 
              v-bind:key="item.sym">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>

      
      <!-- ======================================== Add Operation ============================================= -->
      
      <!-- ======================================== Concat Operation ============================================= -->
      
      <div class="selection-wrapper" v-if="operationType.type == OperationType.Concat">
        <div class="space-box"></div>

        <p>Input variables</p>
        <div class="selectdiv">
          <select class="multiple" v-model="concatOpInputVariables" multiple size="10">
            <option v-for="item in concatOpInputVariableList"  
              v-bind:value="item" 
              v-bind:key="item.sym">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="selection-wrapper" v-if="operationType.type == OperationType.Concat">
        <div class="space-box"></div>

        <p>Output variable</p>
        <div class="selectdiv outline">
          <select class="single" v-model="concatOpOutputVariable">
            <option disabled value="">Variables</option>
            <option v-for="item in concatOpOutputVariableList"  
              v-bind:value="item" 
              v-bind:key="item.sym">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- ======================================== Concat Operation ============================================= -->
      
      <!-- ======================================== Format Operation ============================================= -->

      <div class="left-to-right">
        <div class="selection-wrapper" v-if="operationType.type == OperationType.Format">
          <div class="space-box"></div>

          <p>Chart</p>
          <div class="selectdiv outline">
            <select class="single" v-model="fmtOpData.fmtType">
              <option disabled value="">Chart</option>
              <option v-for="item in fmtOpTypes"  
                v-bind:value="item.type" 
                v-bind:key="item.name">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="selection-wrapper" v-if="operationType.type == OperationType.Format && (fmtOpData.fmtType == FormatType.PieChart || fmtOpData.fmtType == FormatType.LineChart)">
          <div class="space-box"></div>

          <p>Title</p>
          <div class="txt-input-area">
            <input class="my-textarea" type="text" v-model="fmtOpData.title" />
            <div class="text_underline"></div>
          </div>
        </div>
      </div>

      <div class="left-to-right">
        <div class="selection-wrapper" v-if="operationType.type == OperationType.Format && fmtOpData.fmtType == FormatType.PieChart">
          <div class="space-box"></div>

          <p>Data</p>
          <div class="selectdiv">
            <select class="multiple" v-model="fmtOpPieInputVariables" multiple size="10">
              <option v-for="item in fmtOpPieInputVariableList"  
                v-bind:value="item" 
                v-bind:key="item.sym">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="selection-wrapper" v-if="operationType.type == OperationType.Format && fmtOpData.fmtType == FormatType.LineChart">
          <div class="space-box"></div>

          <p>Data</p>
          <div class="selectdiv outline">
            <select class="single" v-model="fmtOpLineInputVariable">
              <option disabled value="">Variables</option>
              <option v-for="item in fmtOpLineInputVariableList"  
                v-bind:value="item" 
                v-bind:key="item.sym">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
        
        
        <div class="selection-wrapper" v-if="operationType.type == OperationType.Format">
          <div class="space-box"></div>

          <p>Output variable</p>
          <div class="selectdiv outline">
            <select class="single" v-model="fmtOpOutputVariable">
              <option disabled value="">Variables</option>
              <option v-for="item in fmtOpOutputVariableList"  
                v-bind:value="item" 
                v-bind:key="item.sym">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      
      <!-- ======================================== Format Operation ============================================= -->

      <div class="complete-btn" v-on:click="complete">
        <p>OK</p>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { OperationType } from "../../types/my-types";
import { defineComponent, reactive, watch } from "vue";
import useNewOperation from "../../model/composables/use-new-operation";
import { FormatType } from "../../model/operations/format-operation";


export default defineComponent({
  name: "NewOperationView",
  props: {},
  setup: (prop) =>
  {
    const { 
      operationTypeList, operationType, complete, hideView,
      sortOpInputVariable, sortOpMemberVariable, sortOpOrder, sortOpInputVariableList, sortOpMemberList, sortOpOrderList, 
      countOpInputVariable, countOpOutputVariable, countOpMemberVariable, countOpSearchVariable, countOpInputVariableList, countOpOutputVariableList, countOpMemberVariableList, 
      countbyOpInputVariable, countbyOpOutputVariable, countbyOpMemberVariable, countbyOpInputVariableList, countbyOpOutputVariableList, countbyOpMemberVariableList, 
      addOpInputVariable1, addOpInputVariable2, addOpOutputVariable, addOpInputVariableList, addOpOutputVariableList,
      concatOpInputVariables, concatOpOutputVariable, concatOpInputVariableList, concatOpOutputVariableList,
      fmtOpOutputVariable, fmtOpPieInputVariables, fmtOpLineInputVariable,fmtOpData, fmtOpTypes, fmtOpOutputVariableList, fmtOpPieInputVariableList, fmtOpLineInputVariableList, fmtOpRawInputVariableList,
    } = useNewOperation();

    //console.log("typeof fmtOpData.lineDataSymbol", typeof(fmtOpData.lineDataSymbol));

    return {
      operationTypeList, operationType, complete, hideView, OperationType, FormatType,
      sortOpInputVariable, sortOpMemberVariable, sortOpOrder, sortOpInputVariableList, sortOpMemberList, sortOpOrderList, 
      countOpInputVariable, countOpOutputVariable, countOpMemberVariable, countOpSearchVariable, countOpInputVariableList, countOpOutputVariableList, countOpMemberVariableList, 
      countbyOpInputVariable, countbyOpOutputVariable, countbyOpMemberVariable, countbyOpInputVariableList, countbyOpOutputVariableList, countbyOpMemberVariableList, 
      addOpInputVariable1, addOpInputVariable2, addOpOutputVariable, addOpInputVariableList, addOpOutputVariableList,
      concatOpInputVariables, concatOpOutputVariable, concatOpInputVariableList, concatOpOutputVariableList,
      fmtOpOutputVariable, fmtOpPieInputVariables, fmtOpLineInputVariable,fmtOpData, fmtOpTypes, fmtOpOutputVariableList, fmtOpPieInputVariableList, fmtOpLineInputVariableList, fmtOpRawInputVariableList,
    };
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
  width: 460px;
  height: 540px;
  background-color: white;
}
.header {
  width: 100%;
  height: 40px;
  background-color: #363636;
  color: white;
  line-height: 40px;
  display: flex;
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

.selection-wrapper
{
  /* text-align: left;
  margin-left: 90px; */  
}

.selection-wrapper p
{
  font-size: 22px;
}

.space-box {
  height: 15px;
  width: 60px;
  visibility: hidden;
}
.group {
  width: 400px;
  margin: 0 auto 0 10px;
}

.left-to-right
{
  display: flex;
  justify-content: space-around;

}


.my-textarea {
  font-size: 14px;
  width: 100%;
  border: none;
  outline: none;
  padding-bottom: 8px;
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}

.text_underline {
  position: relative; /*.text_underline::beforeの親要素*/
  border-top: 1px solid #c2c2c2; /*text3の下線*/
}

/*共通のstyle*/
.text_underline::before,
.text_underline::after {
  position: absolute;
  bottom: 0px; /*中央配置*/
  width: 0px; /*アニメーションで0pxから50%に*/
  height: 1px; /*高さ*/
  content: "";
  background-color: #3be5ae; /*アニメーションの色*/
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

/*中央から右へのアニメーション*/
.text_underline::before {
  left: 50%; /*中央配置*/
}

/*中央から左へのアニメーション*/
.text_underline::after {
  right: 50%; /*中央配置*/
}

.my-textarea:focus + .text_underline::before,
.my-textarea:focus + .text_underline::after {
  width: 50%;
}

.complete-btn {
  position: absolute;
  width: 140px;
  height: 50px;
  right: 15px;
  bottom: 15px;

  background: #4db67d;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  user-select: none;
}

.complete-btn > p {
  line-height: 50px;
  font-size: 36px;
}


.selectdiv {
	overflow: hidden;
	width: 140px;
  /* margin: 10px auto 0 15px; */
  margin: 10px auto;
	text-align: center;
}
.selectdiv select.single {
	width: 100%;
	padding-right: 1em;
	cursor: pointer;
	text-indent: 0.01px;
	text-overflow: ellipsis;
	border: none;
	outline: none;
	background: transparent;
	background-image: none;
	box-shadow: none;
	-webkit-appearance: none;
	appearance: none;
  font-size: 24px;
}
.selectdiv select.single::-ms-expand {
    display: none;
}
.selectdiv.outline {
	position: relative;
	border: 1px solid #bbbbbb;
	border-radius: 2px;
	background: #ffffff;
}
.selectdiv.outline::before {
	position: absolute;
	top: 1.2em;
	right: 0.9em;
	width: 0;
	height: 0;
	padding: 0;
	content: '';
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-top: 6px solid #666666;
	pointer-events: none;
}
.selectdiv.outline select.single {
	padding: 8px 38px 8px 8px;
	color: #666666;
}

.txt-input-area
{
  width: 160px;
  margin: 0 auto 0 auto;
}

.my-textarea {
  font-size: 16px;
  width: 100%;
  border: none;
  outline: none;
  padding-bottom: 8px;
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}

.text_underline {
  position: relative; /*.text_underline::beforeの親要素*/
  border-top: 1px solid #c2c2c2; /*text3の下線*/
}

/*共通のstyle*/
.text_underline::before,
.text_underline::after {
  position: absolute;
  bottom: 0px; /*中央配置*/
  width: 0px; /*アニメーションで0pxから50%に*/
  height: 1px; /*高さ*/
  content: "";
  background-color: #3be5ae; /*アニメーションの色*/
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

/*中央から右へのアニメーション*/
.text_underline::before {
  left: 50%; /*中央配置*/
}

/*中央から左へのアニメーション*/
.text_underline::after {
  right: 50%; /*中央配置*/
}

.my-textarea:focus + .text_underline::before,
.my-textarea:focus + .text_underline::after {
  width: 50%;
}
</style>