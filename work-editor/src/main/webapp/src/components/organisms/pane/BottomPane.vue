<template>
    <div class="bottom-pane">
      <div class="contents-wrapper">
        <div class="tab-navs">
          <div class="tab-navs-container">
            
            <input type="radio" id="bottom-pane-tab0" name="tab" :value="0" v-model="active_tab">
            <label for="bottom-pane-tab0" class="tab-nav tab-nav-0" v-bind:class="{'tab-nav-selected': active_tab == 0}"><span>Result</span></label>
            
          </div>
          <hr>
        </div>

        <ul class="tab-items">
          <li v-if="active_tab === 0">
            <div class="results-container">
              <div class="result-item" v-for="result in results" :key="result">
                <p>{{result}}</p>
              </div>
            </div>
          </li>
        </ul>

      </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  name: "BottomPane",
  props: 
  {
    results: 
    {
      type: Object as PropType<string[]>,
      required: true,
    },
  },
  setup: () =>
  {
    const active_tab = ref(0);

    return { active_tab };
  },
});
</script>



<style scoped>
.bottom-pane
{
  /* position: absolute;
  right: 0;
  bottom: 0; */
  /* height: 200px;
  width: 100%; */
  pointer-events: auto;
  background-color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  /* z-index: 10; */
  grid-column: 2/3;
  grid-row: 2/3;
}

.contents-wrapper
{
  height: 100%;
  width: 95%;
  margin: 0 auto 0 auto;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-basis: 30px 0;
}

.tab-navs
{
  flex-grow: 0;
  margin: 8px 0 0 0;
  width: 100%;
  text-align: left;
  font-size: 12px;
}

.tab-navs-container
{
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
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

.tab-items
{
  width: 100%;
  height: 100%;
  text-align: left;
  
  flex-grow: 1;
}


.tab-items li
{
  width: 100%;
  height: 100%;
}

.results-container
{
  padding: 5px 0 0 0;
  height: 80%;
  text-align: left;
  overflow-y: scroll;
}

.result-item
{
  width: 100%;
  margin-bottom: 8px;
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