import { Operation, OperationType } from "../../types/my-types";

import { vResultPool } from "../variables/variable-pool";

export class CountOperation implements Operation
{
  public readonly type = OperationType.Count;
  public args = new Map<string, any>();

  public inputSymbol: symbol | undefined;
  public outputSymbol: symbol | undefined;
  public member: string | undefined;
  public searchValue: any;

  public setArgs = (args: Map<string, any>) =>
  {
    this.args = args;
    this.inputSymbol = args.get("inputSymbol");
    this.outputSymbol = args.get("outputSymbol");
    this.member = args.get("member");
    this.searchValue = args.get("searchValue");
  }

  public getArgs = () =>
  {
    return this.args;
  }

  public run = () =>
  {
    if(this.inputSymbol == null || this.outputSymbol == null || this.member == null)
    {
      console.log("Invalid args.  @ countby-operation");
      return;
    }

    const inputVariable = vResultPool.get(this.inputSymbol);
    const outputVariable = vResultPool.get(this.outputSymbol);
    
    if(inputVariable == null)
    {
      console.log("Invalid variable symbol.  @ countby-operation");
      return;
    }

    let count = 0;const array = inputVariable.get();
    for(const variable of array)
    {
      const map = variable.get();
      const target = map.get(this.member).get();

      if(target == this.searchValue)
      {
        ++count;
      }
    }
    //console.log(this.searchValue);


    outputVariable!.set(count);
    
    //console.log("counted", outputVariable);
  }

  
}