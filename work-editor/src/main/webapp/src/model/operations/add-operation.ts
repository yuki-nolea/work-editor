import { Operation, OperationType } from "../../types/my-types";

import { vResultPool } from "../variables/variable-pool";

export class AddOperation implements Operation
{
  public readonly type = OperationType.Add;
  public args = new Map<string, any>();

  public inputSymbol1: symbol | undefined;
  public inputSymbol2: symbol | undefined;
  public outputSymbol: symbol | undefined;

  public setArgs = (args: Map<string, any>) =>
  {
    this.args = args;
    this.inputSymbol1 = args.get("inputSymbol1");
    this.inputSymbol2 = args.get("inputSymbol2");
    this.outputSymbol = args.get("outputSymbol");
  }

  public getArgs = () =>
  {
    return this.args;
  }

  public run = () =>
  {
    if(this.inputSymbol1 == null || this.inputSymbol2 == null || this.outputSymbol == null)
    {
      console.log("Invalid args.  @ add-operation");
      return;
    }

    const inputVariable1 = vResultPool.get(this.inputSymbol1);
    const inputVariable2 = vResultPool.get(this.inputSymbol2);
    const outputVariable = vResultPool.get(this.outputSymbol);
    
    if(inputVariable1 == null || inputVariable2 == null || outputVariable == null)
    {
      console.log("Invalid variable symbol.  @ add-operation");
      return;
    }

    outputVariable.set(inputVariable1.get() + inputVariable2.get());

    //console.log("add operation executed", outputVariable);
  }
}