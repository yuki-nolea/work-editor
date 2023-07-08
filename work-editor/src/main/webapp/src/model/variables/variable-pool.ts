import { AbstractVariable, VariableType } from "./abstract-variable";


export class VariablePool
{
  private variables_ = new Map<symbol, AbstractVariable>();
  public readonly vList = [] as AbstractVariable[];

  public add = (value: AbstractVariable) =>
  {
    this.variables_.set(value.sym, value);

    return value.sym;
  }

  public get = (sym: symbol) =>
  {
    return this.variables_.get(sym);
  };

  public remove = (sym: symbol) =>
  {
    return this.variables_.delete(sym);
  };
  
  public clear = () =>
  {
    for(const [_, v] of this.roots())
    {
      v.remove();
    }
  }

  //どのVariableにも所属しないVariableのリストを返す
  public roots = () => [ ...this.variables_ ].filter(item => item[1].parent === undefined);

  public listAll = () => [ ...this.variables_ ];

  public deepCopy = (to: VariablePool) =>
  {
    to.clear();
    for(const [_, v] of this.roots())
    {
      v.deepCopy(to);
    }
  }

  
  public joinVariableToObjectVariable = (objectVariable: AbstractVariable, key: string, value: AbstractVariable) =>
  {
    if(objectVariable.type != VariableType.Object)
    {
      console.log("Invalid variable. @ VariablePool::joinVariableToObjectVariable");
      return;
    }

    objectVariable.get().set(key, value);
    value.parent = objectVariable.sym;
  }
  
  public pushVariableToArrayVariable = (arrayVariable: AbstractVariable, value: AbstractVariable) =>
  {
    if(arrayVariable.type != VariableType.Array)
    {
      console.log("Invalid variable. @ VariablePool::pushVariableToArrayVariable");
      return;
    }

    arrayVariable.get().push(value);
    value.parent = arrayVariable.sym;
  }
}


export class VariableSet
{
  private symbols_ = new Set<symbol>();

  public add = (sym: symbol) =>
  {
    this.symbols_.add(sym);
  };

  public remove = (sym: symbol) =>
  {
    this.symbols_.delete(sym);
  };

  public has = (sym: symbol) => this.symbols_.has(sym);

  public list = () => [ ...this.symbols_ ];

  public union = (set: VariableSet) => this.symbols_ = new Set([ ...this.symbols_, ...set.symbols_ ]);
}


export const vPool = new VariablePool();
export const vResultPool = new VariablePool();
export const vPrevPool = new VariablePool();