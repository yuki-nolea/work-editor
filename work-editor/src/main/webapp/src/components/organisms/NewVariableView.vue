<template>
  <div class="component">
    <div class="background" v-on:click="hideView" />
    <div class="main">
      <div class="header">
        <div class="title-wrapper">
          <p>New Variable</p>
        </div>
        <div class="right-controls">
          <div class="cancel" v-on:click="hideView">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>

      <div class="space-box"></div>

      <p>Description of the variable</p>
      <div class="group">
        <input class="my-textarea" type="text" placeholder="Description" v-model="description" />
        <div class="text_underline"></div>
      </div>
      <div class="space-box"></div>

      <!-- <p>Variable type</p>
      <div class="selectdiv outline">
        <select v-model="vType">
          <option v-for="type in typeList" 
            v-bind:value="type" 
            v-bind:key="type.num">
          {{ type.name }}
          </option>
        </select>
      </div>
      <div class="space-box"></div> -->

      <!-- <div class="group" v-if="vType.type == VariableType.Object || vType.type == VariableType.Array"> -->
      <div class="group">
        <p>Update csv file</p>
        <form>
          <input type="file" @change="readfile" />
        </form>
      </div>

      <!-- <div class="group" v-if="vType.type == VariableType.Number || vType.type == VariableType.String">
        <p>Value</p>
        <input class="my-textarea" type="text" v-model="vText" />
        <div class="text_underline"></div>
      </div> -->

      <div class="complete-btn" v-on:click="complete">
        <p>OK</p>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import useNewVariable from "../../model/composables/use-new-variable";
import { vPool } from "../../model/variables/variable-pool";
import { parse } from "csv-parse/lib/sync";
import { VariableType } from "../../model/variables/abstract-variable";
import { NumberVariable } from "../../model/variables/number-variable";
import { StringVariable } from "../../model/variables/string-variable";
import { ObjectVariable } from "../../model/variables/object-variable";
import { ArrayVariable } from "../../model/variables/array-variable";


export default defineComponent({
  name: "NewVariableView",
  props: {},
  setup: () =>
  {
    const description = ref<string>("");
    const csv = ref<string>("");
    const vText = ref<string>("");

    const typeList = [
      { name: "Number", type: VariableType.Number },
      { name: "String", type: VariableType.String },
      { name: "Object", type: VariableType.Object },
      { name: "Array", type: VariableType.Array },
    ];
    const vType = ref<{name: string, type: VariableType}>(typeList[0]);

    const { showFlag } = useNewVariable();

    const complete = () => 
    {
      const recodes = parse(csv.value, { columns: true });
      console.log(recodes);

      const objectToMap = (object: any) => Object.entries(object).reduce((l,[k,v])=>l.set(k,v), new Map());

      if(recodes.length === 1)
      {
        const recode = recodes[0];
        if(Object.keys(recode).length === 1)
        {
          for(const item in recode)
          {
            const value = recode[item];
            
            const num = parseInt(value);

            if(!isNaN(num))
            {
              const v = new NumberVariable(description.value, num, vPool);
              console.log("New NumberVariable has been created", v);
            }
            else
            {
              const v = new StringVariable(description.value, value, vPool);
              console.log("New StringVariable has been created", v);
            }
          }
        }
        else
        {
          for(const item in recode)
          {
            const num = parseInt(recode[item]);
            if(!isNaN(num))
            {
              recode[item] = num;
            }
          }

          const map = objectToMap(recode);
          const v = new ObjectVariable(description.value, map, vPool);
          console.log("New ObjectVariable has been created", v);
        }
      }
      else
      {
        const maps = [] as Map<string, any>[];
        for(const recode of recodes)
        {
          for(const item in recode)
          {
            const num = parseInt(recode[item]);
            if(!isNaN(num))
            {
              recode[item] = num;
            }
          }
          maps.push(objectToMap(recode));
        }
        const v = new ArrayVariable(description.value,maps, vPool);
        console.log("New ArrayVariable has been created", v);
      }




      // if(vType.value.type === VariableType.Number)
      // {
      //   let v = 0;
        
      //   const num = parseInt(vText.value);
      //   if(!isNaN(num)) v = num;

      //   new NumberVariable(description.value, v, vPool);
      // }
      // else if(vType.value.type === VariableType.String)
      // {
      //   new StringVariable(description.value, vText.value, vPool);
      // }
      // else if(vType.value.type === VariableType.Object)
      // {
      //   const recode = parse(csv.value, { columns: true })[0];

      //   const objectToMap = (object: any) => Object.entries(object).reduce((l,[k,v])=>l.set(k,v), new Map())

      //   for(const item in recode)
      //   {
      //     const num = parseInt(recode[item]);
      //     if(!isNaN(num))
      //     {
      //       recode[item] = num;
      //     }
      //   }

      //   const map = objectToMap(recode);

      //   new ObjectVariable(description.value, map, vPool);
      // }
      // else if(vType.value.type === VariableType.Array)
      // {
      //   const maps = [] as Map<string, any>[];
      //   {
      //     const recodes = parse(csv.value, { columns: true });

      //     const objectToMap = (object: any) => Object.entries(object).reduce((l,[k,v])=>l.set(k,v), new Map())

      //     for(const recode of recodes)
      //     {
      //       for(const item in recode)
      //       {
      //         const num = parseInt(recode[item]);
      //         if(!isNaN(num))
      //         {
      //           recode[item] = num;
      //         }
      //       }
      //       maps.push(objectToMap(recode));
      //     }
      //   }

      //   new ArrayVariable(description.value,maps, vPool);
      // }

      //console.log(vType.value);
      //const v = newArrayVariable(csv.value, description.value);

      //console.log(v);
      hideView();
    };

    const hideView = () =>
    {
      showFlag.value = false;
    };

    const readfile = (ev: any) =>
    {
      const file = ev.target.files[0];
      console.log("filename", file);
      const reader = new FileReader();


      reader.onload = () =>
      {
        csv.value = reader.result as string;
        console.log(csv.value);
      }

      reader.readAsText( file );
    }

    return {
      description,
      csv,
      vType,
      typeList,
      vText,
      complete,
      hideView,
      readfile,
      VariableType,
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
  width: 500px;
  height: 450px;
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

.space-box {
  height: 30px;
  width: 60px;
  visibility: hidden;
}
.group {
  font-size: 22px;
  width: 350px;
  margin: 0 auto;
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

.complete-btn {
  position: absolute;
  width: 180px;
  height: 60px;
  right: 30px;
  bottom: 15px;

  background: #4db67d;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  user-select: none;
}

.complete-btn > p {
  line-height: 60px;
  font-size: 36px;
}

.selectdiv {
	overflow: hidden;
	width: 120px;
  margin: 10px auto 0 auto;
	text-align: center;
}
.selectdiv select {
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
}
.selectdiv select::-ms-expand {
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
	top: 0.8em;
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
.selectdiv.outline select {
	padding: 8px 38px 8px 8px;
	color: #666666;
}
</style>