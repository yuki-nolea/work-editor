<template>
  <div class="result-view">
    <div class="background" v-on:click="hideView" />
    <div class="main">
      <div class="header">
        <div class="title-wrapper">
          <p>Result</p>
        </div>
        <div class="right-controls">
          <div class="cancel" v-on:click="hideView">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>


      <div class="result-container">
        <div class="prev-result-list">
          <p>Previous Result</p>
          <div class="chart-wrapper">
            <LineChart v-for="(data) of prevLineDatas" :key="data" :chartData="data" />
          </div>
          <div class="chart-wrapper">
            <PieChart v-for="(data) of prevPieDatas" :key="data" :chartData="data" />
          </div>

          <!-- <div class="results-viewer">
            <div class="result-item" v-for="result in prevResults" :key="result">
              <p>{{result}}</p>
            </div>

          </div> -->
        </div>

        <div class="separator"></div>

        <div class="result-list">
          <p>Current Result</p>
          <div class="chart-wrapper">
            <LineChart v-for="(data) of lineDatas" :key="data" :chartData="data" />
          </div>
          <div class="chart-wrapper">
            <PieChart v-for="(data) of pieDatas" :key="data" :chartData="data" />
          </div>
          <!-- <div class="results-viewer">
            <div class="result-item" v-for="result in results" :key="result">
              <p>{{result}}</p>
            </div>
          </div> -->

        </div>

      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { vPrevPool, vResultPool } from "../../model/variables/variable-pool";
import { defineComponent } from "vue";
import useResultView from "../../model/composables/use-result-view";
import { Chart, ChartData, registerables } from "chart.js";
import { PieChart, LineChart } from "vue-chart-3";

Chart.register(...registerables);

export default defineComponent({
  name: "ResultView",
  props: {},
  components: 
  {
    PieChart,
    LineChart,
  },
  setup: (/* props, context */) =>
  {
    const { showFlag, getResultsSymbol } = useResultView();

    const hideView = () => {
      showFlag.value = false;
    };

    const prevResults = [] as string[];
    const prevResultVariable = vPrevPool.get(getResultsSymbol());

    if(prevResultVariable != null)
    {
      const maleCountVariable = prevResultVariable.get().get("number of males");
      const femaleCountVariable = prevResultVariable.get().get("number of females");
      const schoolCountVariable = prevResultVariable.get().get("学校毎の参加数");
      const regionCountVariable = prevResultVariable.get().get("地域毎の参加数");
      const preliminaryRankVariable = prevResultVariable.get().get("予選成績");

      if(maleCountVariable != null)
      {
        //prevResults.push(`Number of male participants: ${maleCountVariable.get()}`);
      }
      if(femaleCountVariable != null)
      {
        //prevResults.push("Number of female participants:   " + femaleCountVariable.get());
      }
      if(schoolCountVariable != null)
      { 
        for(const [k, countv] of schoolCountVariable.get())
        {
          prevResults.push(countv.get() + " teams from " + k);
        }
      }
      if(regionCountVariable != null)
      {
        for(const [k, countv] of regionCountVariable.get())
        {
          prevResults.push(countv.get() + " teams from " + k);
        }
      }
    }


    const results = [] as string[];
    const resultVariable = vResultPool.get(getResultsSymbol());

    if(resultVariable != null)
    {
      const maleCountVariable = resultVariable.get().get("number of males");
      const femaleCountVariable = resultVariable.get().get("number of females");
      const schoolCountVariable = resultVariable.get().get("学校毎の参加数");
      const regionCountVariable = resultVariable.get().get("地域毎の参加数");
      const preliminaryRankVariable = resultVariable.get().get("予選成績");

      console.log("result variables", schoolCountVariable);

      if(maleCountVariable != null)
      {
        results.push(`Number of male participants: ${maleCountVariable.get()}`);
      }
      if(femaleCountVariable != null)
      {
        results.push("Number of female participants:   " + femaleCountVariable.get());
      }
      if(schoolCountVariable != null)
      { 
        for(const [k, countv] of schoolCountVariable.get())
        {
          results.push(countv.get() + " teams from " + k);
        }
      }
      if(regionCountVariable != null)
      {
        for(const [k, countv] of regionCountVariable.get())
        {
          results.push(countv.get() + " teams from " + k);
        }
      }
    }
    
    /*if(vResultPool.get(getMaleCountSymbol()) != null)
    {
      results.push(`Number of male participants: ${vResultPool.get(getMaleCountSymbol())!.get()}`);
    }
    
    if(vResultPool.get(getFemaleCountSymbol()) != null)
    {
      results.push("Number of female participants:   " + vResultPool.get(getFemaleCountSymbol())!.get());
    }

    results.push("\n");

    if(vResultPool.get(getSchoolCountSymbol()) != null)
    {
      let sum = 0;
      for(const [k, countv] of vResultPool.get(getSchoolCountSymbol())!.get())
      {
        results.push(countv.get() + " teams from " + k);
        sum += countv.get();
      }

      //console.log("合計" + sum + "チーム");
    }

    if(vResultPool.get(getRegionCountSymbol()) != null)
    {
      let sum = 0;
      for(const [k, countv] of vResultPool.get(getRegionCountSymbol())!.get())
      {
        results.push(countv.get() + " teams from " + k);
        sum += countv.get();
      }
      //console.log("合計" + sum + "チーム");
    }

    if(vResultPool.get(getResultsSymbol()) != null)
    {
      //results.push("Male: " + vResultPool.get(getResultsSymbol())!.get());

      console.log("results", vResultPool.get(getResultsSymbol()));
    }*/

    const pieDatas: ChartData<"pie">[] = [];
    const lineDatas: ChartData<"line">[] = [];

    if(resultVariable != null)
    {
      if(resultVariable!.get().get("fmtDatas") != null)
      {
        for(const fmtData of resultVariable!.get().get("fmtDatas").get())
        {
          if(fmtData.get().get("fmtType").get() == "PieChart")
          {
            const title = fmtData.name;
            const labels = fmtData.get().get("labels").get().map((item: any) => item.get());
            const datas = fmtData.get().get("datas").get().map((item: any) => item.get());

            pieDatas.push({
              labels: labels,
              datasets: [
                {
                  label: title,
                  data: datas,
                  backgroundColor: [
                    "rgb(54, 162, 235)",
                    "rgb(255, 99, 132)",
                    "rgb(255, 205, 86)",
                  ],
                  hoverOffset: 4,
                },
              ],
            });
          }
          else if(fmtData.get().get("fmtType").get() == "LineChart")
          {
            const title = fmtData.name;
            const labels = fmtData.get().get("labels").get().map((item: any) => item.get());
            const datas = fmtData.get().get("datas").get().map((item: any) => item.get());

            //console.log("Pie", pieLabels, pieDatas);

            lineDatas.push({
              labels: labels.slice(0, 7),
              datasets: [
                {
                  label: title,
                  data: datas.slice(0, 7),
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            });
          }
        }
      }
    }

    const prevPieDatas: ChartData<"pie">[] = [];
    const prevLineDatas: ChartData<"line">[] = [];

    if(prevResultVariable != null)
    {
      if(prevResultVariable!.get().get("fmtDatas") != null)
      {
        for(const fmtData of prevResultVariable!.get().get("fmtDatas").get())
        {
          if(fmtData.get().get("fmtType").get() == "PieChart")
          {
            const title = fmtData.name;
            const labels = fmtData.get().get("labels").get().map((item: any) => item.get());
            const datas = fmtData.get().get("datas").get().map((item: any) => item.get());

            prevPieDatas.push({
              labels: labels,
              datasets: [
                {
                  label: title,
                  data: datas,
                  backgroundColor: [
                    "rgb(54, 162, 235)",
                    "rgb(255, 99, 132)",
                    "rgb(255, 205, 86)",
                  ],
                  hoverOffset: 4,
                },
              ],
            });
          }
          else if(fmtData.get().get("fmtType").get() == "LineChart")
          {
            const title = fmtData.name;
            const labels = fmtData.get().get("labels").get().map((item: any) => item.get());
            const datas = fmtData.get().get("datas").get().map((item: any) => item.get());

            //console.log("Pie", pieLabels, pieDatas);

            prevLineDatas.push({
              labels: labels.slice(0, 7),
              datasets: [
                {
                  label: title,
                  data: datas.slice(0, 7),
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            });
          }
        }
      }
    }

    return {
      hideView,
      prevResults,
      results,
      pieDatas, lineDatas,
      prevPieDatas, prevLineDatas,
    };
  },
});
</script>



<style scoped>
.result-view {
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
  width: 1000px;
  height: 760px;
  background-color: white;
  display: flex;
  flex-direction: column;
}
.header {
  width: 100%;
  flex-basis: 40px;
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

.space-box {
  height: 60px;
  width: 60px;
  visibility: hidden;
}

.result-container
{
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  flex-basis: auto;
  text-align: left;
}

.prev-result-list
{
  flex-basis: 50%;
  padding: 20px;
  height: 700px;
  overflow-x: hidden;
  overflow-y: scroll;
  /* background-color:aliceblue; */
}

.result-list
{
  flex-basis: 50%;
  padding: 20px;
  height: 700px;
  overflow-x: hidden;
  overflow-y: scroll;
  /* background-color: aqua; */
}

.separator
{
  background-color: black;
  height: 95%;
  flex-basis: 1px;
}

.results-viewer
{
  padding: 20px;
  height: 600px;
}

.result-item
{
  margin-bottom: 15px;
}

.chart-wrapper
{
  display: flex;
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