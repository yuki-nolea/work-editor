import { Step } from "../../model/workflow/step";
import { Operation } from "types/my-types";
import { reactive, ref, toRefs } from "vue";


const isShowed = ref<boolean>(false);
const focusedStep = reactive<Step>({} as Step);
const operations = reactive<Operation[]>([]);

export default function useOperationView()
{

  const showView = () =>
  {
    isShowed.value = true;
  };

  const hideView = () =>
  {
    isShowed.value = false;
  };

  const setStep = (step: Step) =>
  {
    Object.assign(focusedStep, step);
    //operations.splice(0, operations.length);
    //Object.assign(operations, focusedStep.operations);
  };

  const getStep = () => focusedStep;

  const deleteOperation = (index: number) =>
  {
    console.log("delete operation : index "  + index);
    focusedStep.operations.splice(index, 1);
  }
  
  return { isShowed, showView, hideView, setStep, getStep, deleteOperation };
}

export type OperationViewProps = ReturnType<typeof useOperationView>;