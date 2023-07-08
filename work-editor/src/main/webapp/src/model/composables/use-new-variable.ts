import { ref } from "vue";


const showFlag = ref<boolean>(false);


export default () =>
{
  return { 
    showFlag,
  };
}