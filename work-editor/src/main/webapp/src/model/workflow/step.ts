import { reactive } from "vue";
import { Operation } from "../../types/my-types";

export class Step
{
  procId?: symbol;
  readonly widget: StepWidget;
  type: StepType;
  operations: Operation[] = [];

  constructor(widget: StepWidget, type: StepType = StepType.Common)
  {
    this.widget = reactive(widget);
    this.type = type;
  }

  addOperation = (operation: Operation) =>
  {
    this.operations.push(operation);
  }

  removeOperation = (operation: Operation) =>
  {
    const index = this.operations.findIndex((item) => item == operation);

    if(index != -1) this.operations.splice(index, 1);
  }

  deepCopy = () =>
  {
    const step = new Step({...this.widget});
    step.operations = this.operations;
    step.procId = this.procId;

    return step;
  }
};


export type StepWidget =
{
  name: string;
  description: string;
};



export const StepType =
{
  Common: 0,
  Sort: 1,
  Filter: 2,
  Code: 3,
  None: 4,
} as const;
export type StepType = typeof StepType[keyof typeof StepType];

