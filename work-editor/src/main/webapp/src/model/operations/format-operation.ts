import { ObjectVariable } from "../../model/variables/object-variable";
import { ArrayVariable } from "../../model/variables/array-variable";
import { Operation, OperationType } from "../../types/my-types";

import { vResultPool } from "../variables/variable-pool";



export const FormatType =
{
  PieChart: 0,
  LineChart: 1,
  Raw: 2, 
} as const;
export type FormatType = typeof FormatType[keyof typeof FormatType];

export interface FormatDataInterface
{
  fmtType: FormatType;
  title: string;
  pieDataSymbols: symbol[];
  lineDataSymbol: symbol;
  rawDataSymbol: symbol;
}

export class FormatOperation implements Operation
{
  public readonly type = OperationType.Format;
  public args = new Map<string, any>();

  public outputSymbol: symbol | undefined;
  public fmtData: FormatDataInterface | undefined;

  public setArgs = (args: Map<string, any>) =>
  {
    this.args = args;
    this.outputSymbol = args.get("outputSymbol");
    this.fmtData = args.get("fmtData");
  }

  public getArgs = () =>
  {
    return this.args;
  }

  public run = () =>
  {
    if(this.outputSymbol == null || this.fmtData == null)
    {
      console.log("Invalid args.  @ format-operation");
      return;
    }

    const outputVariable = vResultPool.get(this.outputSymbol);
    
    if(outputVariable == null)
    {
      console.log("Invalid variable symbol.  @ format-operation");
      return;
    }


    if(!outputVariable.get().has("fmtDatas"))
    {
      const v = new ArrayVariable("fmtDatas", [], vResultPool);
      vResultPool.joinVariableToObjectVariable(outputVariable, v.name, v);
    }

    if(this.fmtData.fmtType === FormatType.PieChart)
    {
      const map = new Map<string, any>();
      map.set("fmtType", "PieChart");
      map.set("labels", this.fmtData.pieDataSymbols.map(sym => vResultPool.get(sym)!.name));
      
      const datas = [] as number[];
      for(const sym of this.fmtData.pieDataSymbols)
      {
        datas.push(parseInt(vResultPool.get(sym)!.get()));
      }
      map.set("datas", datas);
      //console.log("piechart datas:", datas);

      const v = new ObjectVariable(this.fmtData.title, map, vResultPool);
      vResultPool.pushVariableToArrayVariable(outputVariable.get().get("fmtDatas"), v);
    }
    else if(this.fmtData.fmtType === FormatType.LineChart)
    {
      const map = new Map<string, any>();
      map.set("fmtType", "LineChart");

      const labels = [] as string[];
      const datas = [] as number[];
      for(const [k, v] of vResultPool.get(this.fmtData.lineDataSymbol)!.get())
      {
        labels.push(k);
        datas.push(parseInt(v.get()));
      }
      map.set("labels", labels);
      map.set("datas", datas);
      //console.log("linechart datas:", datas);

      const v = new ObjectVariable(this.fmtData.title, map, vResultPool);
      vResultPool.pushVariableToArrayVariable(outputVariable.get().get("fmtDatas"), v);

      console.log("formated", v);
    }
    else if(this.fmtData.fmtType === FormatType.Raw)
    {
      const map = new Map<string, any>();
      map.set("fmtType", "Raw");
      map.set("labels", [vResultPool.get(this.fmtData.rawDataSymbol)!])
      map.set("datas", [vResultPool.get(this.fmtData.rawDataSymbol)!.get()]);

      const v = new ObjectVariable(this.fmtData.title, map, vResultPool);
      vResultPool.pushVariableToArrayVariable(outputVariable.get().get("fmtDatas"), v);
    } 


    //console.log("add operation executed", outputVariable);
  }
}