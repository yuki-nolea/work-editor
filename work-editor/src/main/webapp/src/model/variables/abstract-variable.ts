import { VariablePool } from "./variable-pool";

export interface AbstractVariable
{
  name: string;
  readonly type: VariableType;
  readonly pool: VariablePool;
  parent?: symbol;
  readonly sym: symbol;
  value: any;

  get(): any;
  set(value: any): void;

  remove(): boolean;
  clear(): void;

  deepCopy(to: VariablePool): AbstractVariable;
}

export const VariableType =
{
  Number: 0,
  String: 1,
  Object: 2,
  Array: 3,
} as const;
export type VariableType = typeof VariableType[keyof typeof VariableType];
