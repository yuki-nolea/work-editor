import { Operation, OperationType } from "../../types/my-types";

import { vResultPool } from "../variables/variable-pool";

export class CountbyOperation implements Operation
{
  public readonly type = OperationType.Countby;
  public args = new Map<string, any>();

  public inputSymbol: symbol | undefined;
  public outputSymbol: symbol | undefined;
  public member: string | undefined;

  public setArgs = (args: Map<string, any>) =>
  {
    this.args = args;
    this.inputSymbol = args.get("inputSymbol");
    this.outputSymbol = args.get("outputSymbol");
    this.member = args.get("member");
  }

  public getArgs = () =>
  {
    return this.args;
  }

  public run = () =>
  {
    if(this.inputSymbol == null || this.outputSymbol == null || this.member == null)
    {
      console.log("Invalid args.  @ count-operation");
      return;
    }

    const inputVariable = vResultPool.get(this.inputSymbol);
    const outputVariable = vResultPool.get(this.outputSymbol);
    
    console.log("countby input v", inputVariable);
    console.log("countby output v", outputVariable);
    
    if(inputVariable == null)
    {
      console.log("Invalid variable symbol.  @ count-operation");
      return;
    }

    
    const counts = new Map<string, number>();
    for(const variable of inputVariable.get())
    {
      const map = variable.get();
      const target = map.get(this.member).get();
      //console.log(target);

      if(counts.get(target) != null)
      {
        counts.set(target, counts.get(target)! + 1);
      }
      else
      {
        counts.set(target, 1);
      }
    }

    outputVariable?.set(counts);
    
    console.log("counted", outputVariable);
  }
}