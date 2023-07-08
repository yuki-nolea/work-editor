import { AbstractVariable, VariableType } from "../../model/variables/abstract-variable";
import { Operation, OperationType } from "../../types/my-types";

import { vResultPool } from "../variables/variable-pool";

export class SortOperation implements Operation
{
  public readonly type = OperationType.Sort
  public args = new Map<string, any>();

  public symbol: symbol | undefined;
  public order: SortOrder | undefined;
  public member: string | undefined;

  public setArgs = (args: Map<string, any>) =>
  {
    this.args = args;
    this.symbol = args.get("symbol");
    this.order = args.get("order");
    this.member = args.get("member");
  }

  public getArgs = () =>
  {
    return this.args;
  }

  public run = () =>
  {
    if(this.symbol == null || this.order == null)
    {
      console.log("Invalid args.  @ sort-operation");
      return;
    }

    const inputVariable = vResultPool.get(this.symbol!);
    console.log("input variable: ", inputVariable);
    
    if(inputVariable == null)
    {
      console.log("Invalid variable symbol.  @ sort-operation");
      return;
    }

    if(inputVariable.type === VariableType.Array)
    {
      this.sortArray(inputVariable);
    }
    else if(inputVariable.type === VariableType.Object)
    {
      this.sortObject(inputVariable);
    }
  }

  public sortArray = (variable: AbstractVariable) =>
  {
    const op = this.order === SortOrder.Asc ? 1 : -1;

    if(this.member == null)
    {
      variable.get().sort((first: AbstractVariable, second: AbstractVariable) =>
      {
        if(first.get() < second.get())
        {
          return -1 * op;
        }
        else if(first.get() > second.get())
        {
          return 1 * op;
        }
        else return 0;
      });
    }
    else
    {
      variable.get().sort((first: AbstractVariable, second: AbstractVariable) =>
      {
        if(first.get().get(this.member).get() < second.get().get(this.member).get())
        {
          return -1 * op;
        }
        else if(first.get().get(this.member).get() > second.get().get(this.member).get())
        {
          return 1 * op;
        }
        else return 0;
      });
    }
  }

  public sortObject = (variable: AbstractVariable) =>
  {
    const op = this.order === SortOrder.Asc ? 1 : -1;

    var map = new Map<string, AbstractVariable>([...variable.get().entries()].map((item: any) => { return [item[0], item[1].get()]; }).sort((first: any, second: any) =>
    {
      if(first[1] < second[1])
      {
        return -1 * op;
      }
      else if(first[1] > second[1])
      {
        return 1 * op;
      }
      else return 0;
    }) as [string, AbstractVariable][]);

    console.log("sorted map:", map);

    variable.set(map);
  }
}



export const SortOrder =
{
  Asc: 0,
  Desc: 1 
} as const;
export type SortOrder = typeof SortOrder[keyof typeof SortOrder];