import { AbstractVariable, VariableType } from "./abstract-variable";
import { ArrayVariable } from "./array-variable";
import { NumberVariable } from "./number-variable";
import { StringVariable } from "./string-variable";
import { VariablePool } from "./variable-pool";

export class ObjectVariable implements AbstractVariable
{
  name: string;
  type: VariableType;
  pool: VariablePool;
  parent?: symbol | undefined;
  sym: symbol;
  value: Map<string, AbstractVariable>;

  constructor(name: string, value: Map<string, any>, pool: VariablePool, parent?: symbol, sym?: symbol)
  {
    this.name = name;
    this.type = VariableType.Object;
    this.pool = pool;
    this.parent = parent;
    this.sym = sym ? sym : Symbol(name);
    this.value = ObjectVariable.makeObjectVariableValue(name, value, this.sym, pool);

    pool.add(this);
  }

  public get = () => this.value;

  public set = (value: Map<string, any>) =>
  {
    this.clear();

    const v = ObjectVariable.makeObjectVariableValue(this.name, value, this.sym, this.pool);

    this.value = v;
  }

  public remove = () =>
  {
    for(const [_, variable] of this.value)
    {
      variable.remove();
    }
    return this.pool.remove(this.sym);
  }

  public clear = () =>
  {
    for(const [_, v] of this.value)
    {
      v.remove();
    }
  }

  public deepCopy = (to: VariablePool) =>
  {
    const v =  new ObjectVariable(this.name, new Map(), to, this.parent, this.sym);
    
    for(const [k, variable] of this.get())
    {
      //console.log("deep copy: ", variable);
      to.joinVariableToObjectVariable(v, k, variable.deepCopy(to));
    }
    return v;
  }

  static makeObjectVariableValue = (name: string, value: Map<string, any>, sym: symbol, pool: VariablePool) =>
  {
    const map = new Map<string, AbstractVariable>();

    for(const [k, v] of value)
    {
      const child_name = name + "." + k;

      if(typeof v === "number")
      {
        map.set(k, new NumberVariable(child_name, v, pool, sym));
      }
      else if(typeof v === "string")
      {
        map.set(k, new StringVariable(child_name, v, pool, sym));
      }
      else if(v instanceof Map)
      {
        map.set(k, new ObjectVariable(child_name, v, pool, sym));
      }
      else if(v instanceof Array)
      {
        map.set(k, new ArrayVariable(child_name, v, pool, sym));
      }
      else
      {
        throw new Error("ObjectVariable::makeObjectVariableValue valueの値が不適当です");
      }
    }
    
    return map;
  }
}