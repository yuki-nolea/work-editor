import { reactive } from "vue";
import { MouseOpState, Rectangle, SequenceOpState } from "../../types/my-types";
import { Step, StepType, StepWidget } from "./step";

export class Procedure 
{
  readonly sym: symbol;
  readonly widget: ProcedureWidget;
  readonly steps: Step[] = reactive([] as Step[]);

  constructor(widget: ProcedureWidget, sym?: symbol)
  {
    this.widget = reactive(widget);
    this.sym = sym ?? Symbol();
    
    this.steps.push(new Step({ name: "", description: "" } as StepWidget, StepType.None));
  }

  addStep = (step: Step) =>
  {
    this.steps.push(step);
    step.procId = this.sym;
  }

  removeStep = (step: Step) =>
  {
    const index = this.steps.findIndex((item) => item == step);

    if(index != -1) this.steps.splice(index, 1);
  }

  deepCopy = () =>
  {
    const proc = new Procedure({...this.widget}, this.sym);
  
    for(const step of this.steps)
    {
      proc.steps.push(step.deepCopy());
    }

    return proc;
  }
};



export type ProcedureWidget = 
{
  id?: symbol;
  htmlElement?: HTMLElement;
  name: string;
  intention: string;
  objective: string;
  order: string;
  rect: Rectangle;
  mouseOpState: MouseOpState;
  sequenceOpState: SequenceOpState;
};