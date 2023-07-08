<template>
  <div class="component">
    <div class="background" v-on:click="hideView" />
    <div class="main">
      <div class="header">
        <div class="title-wrapper">
          <p>New Procedure</p>
        </div>
        <div class="right-controls">
          <div class="cancel" v-on:click="hideView">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>

      <div class="space-box"></div>

      <p>What is the title of this procedure?</p>
      <div class="group">
        <input class="my-textarea" type="text" placeholder="Title" v-model="title" />
        <div class="text_underline"></div>
      </div>
      <div class="space-box"></div>

      <p>Why do you do this procedure?</p>
      <div class="group">
        <input class="my-textarea" type="text" placeholder="Intention" v-model="intention"/>
        <div class="text_underline"></div>
      </div>
      <div class="space-box"></div>

      <p>What do you expect to achieve as a result of this procedure?</p>
      <div class="group">
        <input class="my-textarea" type="text" placeholder="Objective" v-model="objective"/>
        <div class="text_underline"></div>
      </div>

      <div class="complete-btn" v-on:click="complete">
        <p>OK</p>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import { makeProcedure } from "../../model/composables/use-work";

export default defineComponent({
  name: "NewProcedureView",
  props: {},
  setup: (props, context) => {
    const title = ref<string>("");
    const intention = ref<string>("");
    const objective = ref<string>("");

    const complete = () => 
    {
      context.emit("onComplete", makeProcedure(title.value, intention.value, objective.value, { left: 800, top: 400, width: 200, height: 60, }));
    };

    const hideView = () => {
      context.emit("hideView");
    };

    return {
      title,
      intention,
      objective,
      complete,
      hideView,
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
  width: 80%;
  height: 80%;
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
  height: 60px;
  width: 60px;
  visibility: hidden;
}
.group {
  width: 400px;
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
  width: 247px;
  height: 80px;
  right: 30px;
  bottom: 30px;

  background: #4db67d;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  user-select: none;
}

.complete-btn > p {
  line-height: 80px;
  font-size: 36px;
}
</style>