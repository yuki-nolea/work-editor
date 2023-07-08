import { Relation } from "../../types/my-types";
import { reactive, ref, Ref } from "vue";
import { Procedure } from "./procedure";
import { Sequence } from "./sequence";


export class Work 
{
  public readonly intention: Ref<string>;
  public readonly objective: Ref<string>;
  public readonly procedures: Procedure[];
  public readonly sequences: Sequence[];
  public readonly comments: Comment[];
  public readonly relations: Relation[];

  constructor(intention: string, objective: string, procedures: Procedure[], sequences: Sequence[], comments: Comment[], relations: Relation[])
  {
    this.intention = ref(intention);
    this.objective = ref(objective);
    this.procedures = reactive(procedures);
    this.sequences = reactive(sequences);
    this.comments = reactive(comments);
    this.relations = reactive(relations);
  }

  public deepCopy = () =>
  {
    const procedures = [] as Procedure[];
    for(const proc of this.procedures) procedures.push(proc.deepCopy());

    const sequences = [] as Sequence[];
    for(const seq of this.sequences) sequences.push(seq.deepCopy());

    const work = new Work(this.intention.value, this.objective.value, procedures, sequences, this.comments, this.relations);

    return work;
  }

  public addProcedure = (proc: Procedure) =>
  {
    this.procedures.push(proc);
  };

  public removeProcedure = (sym: symbol) =>
  {
    const index = this.getProcedureIndex(sym);
  
    if(index != -1)
    {
      this.procedures.splice(index, 1);
  
      const ids: symbol[] = [];
      for(const seq of this.sequences)
      {
        if(seq.from.sym === sym || seq.to.sym === sym)
        {
          ids.push(seq.sym);
        }
      }
      
      for(const id of ids)
      {
        this.removeSequence(id);
      }
    }
  };

  public addSequence = (sequence: Sequence) =>
  {
    this.sequences.push(sequence);
  };

  public removeSequence = (sym: symbol) => 
  {
    const index = this.getSequenceIndex(sym);
  
    if(index != -1)
    {
      this.sequences.splice(index, 1);
    }
  };

  public getProcedureIndex = (id: symbol) =>
  {
    return this.procedures.findIndex(item => item.sym === id);
  };

  public getSequenceIndex = (id: symbol) =>
  {
    return this.sequences.findIndex(item => item.sym === id);
  };
  
  public searchProcedure = (id: symbol) =>
  {
    const index = this.getProcedureIndex(id);

    if(index === -1) return null;

    return this.procedures[index];
  }

  public searchSequence = (id: symbol) =>
  {
    const index = this.getSequenceIndex(id);

    if(index === -1) return null;

    return this.sequences[index];
  }

}