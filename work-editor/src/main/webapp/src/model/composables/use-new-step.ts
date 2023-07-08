
import { StepWidget } from "../../model/workflow/step";
import { ref } from "vue";


const showFlag = ref<boolean>(false);

let stepAdder = (widget: StepWidget) => {console.log(widget);} 

export default () =>
{
  const setStepAdder = (adder: (widget: StepWidget)=>void) =>
  {
    stepAdder = adder;
  };

  const getStepAdder = () => stepAdder;

  return { 
    showFlag,
    setStepAdder,
    getStepAdder,
  };
}