import {  makeStep } from "../composables/use-work";
import { Graph } from "./graph"
import { VariableSet, vPool, vPrevPool, vResultPool } from "../variables/variable-pool";
import useResultView from "../composables/use-result-view";
import { Work } from "./work";
import { Procedure } from "./procedure";
import { Step, StepType } from "./step";


export const makeProcedureGraphFromWork = (work: Work) => 
{
  const edges = [] as [number, number][];

  for(const sequence of work.sequences)
  {
    edges.push([ work.getProcedureIndex(sequence.from.sym), work.getProcedureIndex(sequence.to.sym) ]);
  }

  const graph = new Graph<Procedure>(work.procedures, edges);

  return graph;
};

const makeStepGraphFromWork = (work: Work) =>
{
  const edges = [] as [number, number][];
  const steps = [] as Step[];
  const idxPtrs = [] as number[]
  
  for(const proc of work.procedures)
  {
    /*if(proc.steps.length == 0)
    {
      const procName = work.procedures[work.getProcedureIndex(proc.sym)].widget.name;

      // proc.steps.push({type: ComponentType.Code, inputs: [], outputs: [sym1], compoent: (variables: Variable[]) =>{}, procId: proc.id} as Step);
      // proc.steps.push({type: ComponentType.Code, inputs: [], outputs: [sym2], compoent: (variables: Variable[]) =>{}, procId: proc.id} as Step);
      proc.steps.push(makeStep(procName + "(1)", "", proc.sym, StepType.Code, [], []));
      proc.steps.push(makeStep(procName + "(2)", "", proc.sym, ComponentType.Code, [], []));
    }*/

    idxPtrs.push(steps.length);

    steps.push(proc.steps[0]);
    for(let i=1; i<proc.steps.length; ++i)
    {
      steps.push(proc.steps[i]);
      edges.push([steps.length-2, steps.length-1]);
    }
  }
  idxPtrs.push(steps.length);

  for(const sequence of work.sequences)
  {
    const from = work.getProcedureIndex(sequence.from.sym);
    const to = work.getProcedureIndex(sequence.to.sym);

    edges.push([idxPtrs[from+1]-1, idxPtrs[to]]);
  }

  const graph = new Graph<Step>(steps, edges);

  return graph;
};


const run = (work: Work) => 
{
  vResultPool.deepCopy(vPrevPool);
  //console.log("vPrevPool", vPrevPool);
  vPool.deepCopy(vResultPool);

  const graph = makeStepGraphFromWork(work);

  const orderedList = graph.makeOrderedList();
  if(!orderedList)
  {
    console.log("閉路が検出されました");
    return;
  }

  // const vSets = [...Array(orderedList.length)].map(_ => new VariableSet());
  for(let now=0; now<orderedList.length; ++now)
  {
    const step = orderedList[now];

    // for(const to of step.nexts)
    // {
    //   vSets[to].union(vSets[now]);
    //   for(const output of step.item.outputs)
    //   {
    //     vSets[to].add(output);
    //   }
    // }

    // for(const input of step.item.inputs) vSets[now].add(input);

    // if(step.item.type === StepType.None) continue;
    // console.log("実行(" + step.item.widget.name + ")\ninputs: " + vSets[now].list().map(sym => vPool.get(sym)!.name));
    

    //step.item.component(vSets[now], vPool, step.item);

    console.log("実行: " + step.item.widget.name);
    step.item.operations.forEach((operation) => operation.run());
  }

  const { showFlag } = useResultView();

  showFlag.value = true;

  console.log("実行結果:", vResultPool.roots());
};


const updateOrder = (work: Work) =>
{
  const graph = makeProcedureGraphFromWork(work);

  const orderedList = graph.makeOrderedList();
  if(!orderedList)
  {
    console.log("閉路が検出されました");
    return;
  }

  for(let i=0; i<orderedList.length; ++i)
  {
    const node = orderedList[i];
    node.item.widget.order = "" + i;
  }
};

const updateVariableDistribution = (work: Work) =>
{
  const graph = makeStepGraphFromWork(work);

  const orderedList = graph.makeOrderedList();
  if(!orderedList)
  {
    console.log("閉路が検出されました");
    return;
  }

  // const vSets = [...Array(orderedList.length)].map(_ => new VariableSet());
  /*for(let now=0; now<orderedList.length; ++now)
  {
    const step = orderedList[now];

    for(const to of step.nexts)
    {
      vSets[to].union(vSets[now]);
      for(const output of step.item.outputs)
      {
        vSets[to].add(output);
      }
    }

    for(const input of step.item.inputs) vSets[now].add(input);

    step.item.variables = vSets[now].list();
  }*/
};


export default { run, updateOrder, updateVariableDistribution };




