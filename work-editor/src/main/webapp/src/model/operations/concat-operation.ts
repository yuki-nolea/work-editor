import { AbstractVariable } from "model/variables/abstract-variable";
import { Operation, OperationType } from "../../types/my-types";

import { vResultPool } from "../variables/variable-pool";

export class ConcatOperation implements Operation
{
  public readonly type = OperationType.Concat
  public args = new Map<string, any>();

  public ranksSymbol: symbol | undefined;
  public regionsSymbol: symbol | undefined;
  public schoolsSymbol: symbol | undefined;
  public malesSymbol: symbol | undefined;
  public femalesSymbol: symbol | undefined;

  public inputVariableSymbols: symbol[] | undefined;
  public outputSymbol: symbol | undefined;

  public setArgs = (args: Map<string, any>) =>
  {
    this.args = args;
    this.ranksSymbol = args.get("ranksSymbol");
    this.regionsSymbol = args.get("regionsSymbol");
    this.schoolsSymbol = args.get("schoolsSymbol");
    this.malesSymbol = args.get("malesSymbol");
    this.femalesSymbol = args.get("femalesSymbol");
    this.inputVariableSymbols = args.get("inputVariableSymbols");
    this.outputSymbol = args.get("outputSymbol");
  }

  public getArgs = () =>
  {
    return this.args;
  }

  public run = () =>
  {
    //if(this.ranksSymbol == null || this.regionsSymbol == null || this.schoolsSymbol == null || this.malesSymbol == null || this.femalesSymbol == null || this.inputVariableSymbols == null || this.outputSymbol == null)
    if(this.inputVariableSymbols == null || this.outputSymbol == null)
    {
      console.log("Invalid args.  @ concat-operation");
      return;
    }


    const variables = [] as AbstractVariable[];
    for(const symbol of this.inputVariableSymbols)
    {
      const variable = vResultPool.get(symbol);
      if(variable == null)
      {
        console.log("Invalid variable symbol.  @ concat-operation");
        return;
      }
      variables.push(variable);
    }

    const outputVariable = vResultPool.get(this.outputSymbol);
    if(outputVariable == null)
    {
      console.log("Invalid variable symbol.  @ concat-operation");
      return;
    }

    outputVariable.clear();
    /*
    vResultPool.addVariableToObjectVariable(outputVariable, ranksVariable.name, ranksVariable);
    vResultPool.addVariableToObjectVariable(outputVariable, regionsVariable.name, regionsVariable);
    vResultPool.addVariableToObjectVariable(outputVariable, schoolsVariable.name, schoolsVariable);
    vResultPool.addVariableToObjectVariable(outputVariable, malesVariable.name, malesVariable);
    vResultPool.addVariableToObjectVariable(outputVariable, femalesVariable.name, femalesVariable);
    */

    
    for(const variable of variables)
    {
      vResultPool.joinVariableToObjectVariable(outputVariable, variable.name, variable);
    }
    //console.log("concat operation executed", outputVariable);
  }
}