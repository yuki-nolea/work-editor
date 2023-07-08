import { Procedure, ProcedureWidget } from "../model/workflow/procedure";

export type Point2D = 
{
  x: number;
  y: number;
};

export type Rectangle = 
{
  top: number;
  left: number;
  width: number;
  height: number;
};



export const OperationType =
{
  Sort: 0,
  Add: 1,
  Count: 2,
  Countby: 3,
  Concat: 4,
  Format: 5,
} as const;
export type OperationType = typeof OperationType[keyof typeof OperationType];

export interface Operation
{
  type: OperationType;
  
  args: Map<string, any>;
  
  setArgs: {(args: Map<string, any>): void};
  getArgs: {(): Map<string, any>};

  run: {(): void};
}




export type Comment = 
{
  widget: CommentWidget;
};


export type CommentWidget =
{
  htmlElement?: HTMLElement;
  txt: string;
  coord: Point2D;
};

export type Relation =
{
  widget: RelationWidget;
  comment: Comment,
  proc: Procedure,
};

export type RelationWidget = 
{
  htmlElement?: HTMLElement;
  commentCoord: Point2D;
  procRect: Rectangle;
};


export type EditAreaWidget = 
{
  htmlElement?: HTMLElement;
  rect: Rectangle;
  isMouseOpMode: boolean;
  isSequenceOpMode: boolean;
  scale: number;
};

export type MouseOpState = 
{
  isFocused: boolean;
  isDragged: boolean;
}

export type SequenceOpState = 
{
  isSelected: boolean;
};




export type ProcedureMouseOpEvent = 
{
  onFocused: (procedure: ProcedureWidget) => void;
  onunFocused: (procedure: ProcedureWidget) => void;
  onMoving: (prevRect: Rectangle, procedure: ProcedureWidget) => void;
  onMoved: (prevRect: Rectangle, procedure: ProcedureWidget) => void;
};

//MouseOpMode時のSequenceWidgtのマウス操作
export type SequenceMouseOpEvent = 
{
};

//SequenceOpMode時のProcedureWidgtのマウス操作
export type ProcedureSequenceOpEvent =
{
  onSelected: (procedure: ProcedureWidget) => void;
  onunSelected: (procedure: ProcedureWidget) => void;
  onCompleted: (from: ProcedureWidget, to: ProcedureWidget) => void;
};
