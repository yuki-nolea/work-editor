<template>
  <div class="left-pane">
      <div class="tab-navs">
        <div class="tab-navs-container">
          
          <input type="radio" id="left-pane-tab0" name="tab" :value="0" v-model="active_tab">
          <label for="left-pane-tab0" class="tab-nav tab-nav-0" v-bind:class="{'tab-nav-selected': active_tab == 0}"><span>Work</span></label>

          <!-- <input type="radio" id="left-pane-tab1" name="tab" :value="1" v-model="active_tab">
          <label for="left-pane-tab1" class="tab-nav tab-nav-1" v-bind:class="{'tab-nav-selected': active_tab == 1}"><span>Procedures</span></label> -->
          
        </div>
        <hr>
      </div>

      <ul class="tab-items">
        <li v-if="active_tab === 0">
          <div class="desc-wrapper tab-item">
            <div class="desc-item-wrapper desc-intention">
              <div class="desc-title"><h2>Why</h2></div>
              <div class="desc-content">
                <!-- <p>事実上「日本一を決定する大会」という位置づけを確立するため、トップチームを選抜する。ただし、高校主体の大会として高校対抗の色合いを残すため、各校からの出場は2チームまでとする。</p> -->
                <p>{{work.intention.value}}</p>
              </div>
              <div class="desc-edit-icon-wrapper">
                <div class="desc-edit-icon">
                  <i class="far fa-edit"></i>
                </div>
              </div>
              <hr>
            </div>

            <div class="desc-item-wrapper desc-objective">
              <div class="desc-title"><h2>What</h2></div>
              
              <div class="desc-content">
                <!-- <p>競技成績のみによりチームを選抜する</p> -->
                <p>{{work.objective.value}}</p>
              </div>
              <div class="desc-edit-icon-wrapper">
                <div class="desc-edit-icon">
                  <i class="far fa-edit"></i>
                </div>
              </div>
              <hr>
            </div>

            <div class="desc-item-wrapper desc-variables">
              <div class="desc-title"><h2>Data</h2></div>
              <div class="desc-content">
              <div v-for="(variable, index) in variables" :key="index">
                <p>{{variable}}</p>
              </div>

              </div>
              
              <button class="new-operation-button" @click="onClick">
                <p>+</p>
              </button>
            </div>
            
          </div>
        </li>
        <li v-else-if="active_tab === 1">
          <div class="procedure-view-wrapper tab-item">
            <div class="search-box-wrapper">
              <div class="search-box">
                <input type="text" size="25" placeholder="" />
                <i class="submit fas fa-search"></i>
              </div>
            </div>
            <div class="procedure-view-items-container">
              <div class="procedure-view-item" v-for="procedure in work.procedures" :key="procedure">
                <div class="procedure-view-item-number"><p>Procedure 1</p></div>
                <div class="procedure-view-item-title"><p>{{procedure.widget.name}}</p></div>
              </div>
            </div>
          </div>
        </li>
      </ul>

  </div>
</template>


<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { Work } from "../../../model/workflow/work";
import { vPool } from "../../../model/variables/variable-pool";
import useNewVariable from "../../../model/composables/use-new-variable";
import { Procedure } from "../../../model/workflow/procedure";

export default defineComponent({
  name: "LeftPane",
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

    const variables = ref<string[]>([] as string[]);

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

      variables.value.splice(0, variables.value.length);
      for(const item of vPool.roots())
      {
        variables.value.push(item[1].name);
      }
    });

    const { showFlag: newVariableViewShowFlag } = useNewVariable();

    const onClick = () =>
    {
      newVariableViewShowFlag.value = true;
    }
    
    return { active_tab, focusedProc, variables, onClick };
  },
});
</script>



<style scoped>
.left-pane
{
  /* position: absolute;
  left: 0;
  top: 0; */
  /* height: 100%;
  width: 300px; */
  pointer-events: initial;
  background-color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  grid-column: 1/2;
  grid-row: 1/3;
  /* z-index: 10; */
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

.desc-wrapper
{
  width: 85%;
  margin: 0 auto 0 auto;
  display: grid;
  grid-template-rows: minmax(10px, 33%) minmax(10px, 33%) 1fr;
}
.desc-wrapper h2
{
  margin: 0;
}

.desc-intention
{
  grid-row: 1/2;
}
.desc-objective
{
  grid-row: 2/3;
}
.desc-variables
{
  grid-row: 3/4;
}


.desc-item-wrapper
{
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.desc-title
{
  flex: 0 0 fit-content;
}
.desc-content
{
  height: 100%;
  flex: 1 0;
  padding: 12px 0 0 5px;
  font-size: 18px;
  overflow-y: scroll;
}

.desc-variables .desc-content
{
  font-size: 14px;
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

.procedure-view-wrapper
{
  width: 100%;
  display: flex;
  flex-direction: column;
}

.search-box-wrapper
{
  width: 100%;
  margin: 10px 0 10px 0;
}

.search-box{
  width: 85%;
  margin: 0 auto 0 auto;
  border: 1px solid #A9A9A9;
  padding: 3px 10px;
  flex: 0 0 2.3em;
  overflow: hidden;
  position: relative;
}

.search-box input[type="text"]{
  border: none;
  height: 2.0em;
}
.search-box input[type="text"]:focus {
  outline: 0;
}
.search-box .submit{
  cursor: pointer;
  font-size: 1.0em;
  border: none;
  background: none;
  color: #A9A9A9;
  position: absolute;
  right: 8px;
  top: 8px;
  outline : none;
}


.procedure-view-items-container
{
  flex: 1 0 0;
}

.procedure-view-item
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;
  width: 100%;
  padding-left: 20px;
  border: 2px solid transparent;
}

.procedure-view-item .selected
{
  border: 2px solid #00A3FF;
}

.procedure-view-item-content-wrapper
{
  width: 85%;
  height: 90%;
}

.procedure-view-item-number
{
  font-size: 16px;
}

.procedure-view-item-title
{
  font-size: 16px;
}

.new-operation-button
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