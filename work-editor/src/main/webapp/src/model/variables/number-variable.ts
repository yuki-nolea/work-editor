import { AbstractVariable, VariableType } from "./abstract-variable";
import { VariablePool } from "./variable-pool";

export class NumberVariable implements AbstractVariable
{
  name: string;
  type: VariableType;
  pool: VariablePool;
  parent?: symbol | undefined;
  sym: symbol;
  value: number;

  constructor(name: string, value: number, pool: VariablePool, parent?: symbol, sym?: symbol)
  {
    this.name = name;
    this.type = VariableType.Number;
    this.pool = pool;
    this.parent = parent;
    this.sym = sym ? sym : Symbol(name);
    this.value = value;
    
    pool.add(this);
  }

  public get = () => this.value;
  
  public set = (value: number) => { this.value = value };

  public update = (value: number) => { this.value = value };
  
  public remove = () =>
  {
    return this.pool.remove(this.sym);
  }

  public clear = () =>
  {
    this.value = 0;
  }

  public deepCopy = (to: VariablePool) =>
  {
    return new NumberVariable(this.name, this.value, to, this.parent, this.sym);
  }
}
