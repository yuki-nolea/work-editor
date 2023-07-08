import { Queue } from "../queue";


export type Node<T> = 
{
  item: T;
  nexts: number[];
  order: number;
};

export class Graph<T>
{
  public nodes = [] as Node<T>[];
  public roots = [] as number[];

  constructor(items: T[], edges: [number, number][])
  {
    const toLists: number[][] = [...Array(items.length)].map(_ => []);

    for(const [ from, to ] of edges) toLists[from].push(to);

    for(let i=0; i<items.length; ++i) this.nodes.push({ item: items[i], nexts: toLists[i], order: -1});
  }

  public makeOrderedList = (): Node<T>[] | null =>
  {
    const orderList = [] as number[];

    const idxPtrs = [...Array(this.nodes.length)].map(_ => 0);

    //各ノードの入次数をカウント
    const indegrees = [...Array(this.nodes.length)].map(_ => 0);
    this.nodes.forEach(node => node.nexts.forEach((to, index) => ++indegrees[to]));

    //入次数が０のノードをキューにプッシュ
    const q = Queue<number>();
    indegrees.forEach((item, index) => { if(item === 0) q.push(index); })

    while(!q.isEmpty())
    {
      const now = q.front(); q.pop();

      this.nodes[now].order = orderList.length;
      idxPtrs[now] = orderList.length;
      orderList.push(now);

      for(const to of this.nodes[now].nexts)
      {
        --indegrees[to];
        if(indegrees[to] === 0) q.push(to);
      }
    }

    const newNodes = this.nodes.map(node => ({...node}));
    newNodes.forEach(node => node.nexts = node.nexts.map(to => idxPtrs[to]));

    return orderList.map(index => newNodes[index]);
  };
}