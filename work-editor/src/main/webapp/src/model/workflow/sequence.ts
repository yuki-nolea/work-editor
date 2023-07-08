import { reactive } from "vue";
import { Rectangle } from "../../types/my-types";
import { Procedure } from "./procedure";



export class Sequence
{
  readonly sym: symbol;
  readonly widget: SequenceWidget;
  from: Procedure;
  to: Procedure;

  constructor(widget: SequenceWidget, from: Procedure, to: Procedure, sym?: symbol)
  {
    this.sym = sym ?? Symbol();
    this.widget = reactive(widget);
    this.from = from;
    this.to = to;
  }

  public deepCopy = () =>
  {
    const seq = new Sequence({ ...this.widget }, this.from, this.to, this.sym);

    return seq;
  }
};

export type SequenceWidget = 
{
  id?: symbol;
  htmlElement?: HTMLElement;
  sRect: Rectangle;
  eRect: Rectangle;
};