import { AbstractVariable, VariableType } from "./abstract-variable";
import { VariablePool } from "./variable-pool";

export class StringVariable implements AbstractVariable
{
  name: string;
  type: VariableType;
  pool: VariablePool;
  parent?: symbol | undefined;
  sym: symbol;
  value: string;

  constructor(name: string, value: string, pool: VariablePool, parent?: symbol, sym?: symbol)
  {
    this.name = name;
    this.type = VariableType.String;
    this.pool = pool;
    this.parent = parent;
    this.sym = sym ? sym : Symbol(name);
    this.value = value;

    pool.add(this);
  }

  public get = () => this.value;

  public set = (value: string) => { this.value = value };

  
  public remove = () =>
  {
    return this.pool.remove(this.sym);
  }

  public clear = () =>
  {
    this.value = "";
  }

  
  public deepCopy = (to: VariablePool) =>
  {
    return new StringVariable(this.name, this.value, to, this.parent, this.sym);
  }
}
