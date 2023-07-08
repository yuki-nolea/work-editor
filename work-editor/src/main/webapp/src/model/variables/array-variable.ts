import { AbstractVariable, VariableType } from "./abstract-variable";
import { NumberVariable } from "./number-variable";
import { ObjectVariable } from "./object-variable";
import { StringVariable } from "./string-variable";
import { VariablePool } from "./variable-pool";


export class ArrayVariable implements AbstractVariable
{
  name: string;
  type: VariableType;
  pool: VariablePool;
  parent?: symbol | undefined;
  sym: symbol;
  value: any[];
  
  constructor(name: string, value: any[], pool: VariablePool, parent?: symbol, sym?: symbol)
  {
    this.name = name;
    this.type = VariableType.Array;
    this.pool = pool;
    this.parent = parent;
    this.sym = sym ? sym : Symbol(name);
    this.value = ArrayVariable.makeArrayVariableValue(name, value, this.sym, pool);
    
    pool.add(this);
  }

  public get = () => this.value;

  public set = (value: any[]) => 
  {
    this.clear();

    const v = ArrayVariable.makeArrayVariableValue(this.name, value, this.sym, this.pool);

    this.value = v;
  }

  
  public remove = () =>
  {
    for(const variable of this.value)
    {
      variable.remove();
    }

    return this.pool.remove(this.sym);
  }

  public clear = () =>
  {
    for(const variable of this.value)
    {
      variable.remove();
    }
  }

  
  public deepCopy = (to: VariablePool) =>
  {
    const v = new ArrayVariable(this.name, [], to, this.parent, this.sym);

    for(const variable of this.get())
    {
      //console.log("deep copy: ", variable);
      to.pushVariableToArrayVariable(v, variable.deepCopy(to));
    }

    return v;
  }

  static makeArrayVariableValue = (name: string, value: any[], sym: symbol, pool: VariablePool) =>
  {
    const array: AbstractVariable[] = [];

    for(const [index, v] of value.entries())
    {
      const child_name = name + "[" + index + "]";

      if(typeof v === "number")
      {
        array.push(new NumberVariable(child_name, v, pool, sym));
      }
      else if(typeof v === "string")
      {
        array.push(new StringVariable(child_name, v, pool, sym));
      }
      else if(v instanceof Map)
      {
        array.push(new ObjectVariable(child_name, v, pool, sym));
      }
      else if(v instanceof Array)
      {
        array.push(new ArrayVariable(child_name, v, pool, sym));
      }
      else
      {
        throw new Error("ArrayVariable::makeArrayVariableValue valueの値が不適当です");
      }
    }
    
    return array;
  }
}