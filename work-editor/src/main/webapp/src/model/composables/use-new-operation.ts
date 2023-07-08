import { OperationType } from "../../types/my-types";
import { vPool } from "../variables/variable-pool";
import { computed, reactive, ref } from "vue";
import { stringifyStyle } from "@vue/shared";
import { SortOperation, SortOrder } from "../../model/operations/sort-operation";
import useOperationView from "./use-operation-view";
import { CountOperation } from "../../model/operations/count-operation";
import { CountbyOperation } from "../../model/operations/countby-operation";
import { AddOperation } from "../../model/operations/add-operation";
import { ConcatOperation } from "../../model/operations/concat-operation";
import { FormatDataInterface, FormatOperation, FormatType } from "../../model/operations/format-operation";
import { VariableType } from "../../model/variables/abstract-variable";


const showFlag = ref<boolean>(false);

export interface VariableListInterface
{
  name: string;
  sym: symbol;
}

export default () =>
{
  const { getStep } = useOperationView();
  const focusedStep = getStep();

  
  const operationTypeList = [
    { name: "Sort", type: OperationType.Sort },
    { name: "Add", type: OperationType.Add },
    { name: "Count", type: OperationType.Count },
    { name: "Countby", type: OperationType.Countby },
    { name: "Concat", type: OperationType.Concat },
    { name: "Format", type: OperationType.Format },
  ];
  
  const operationType = ref<{name: string, type: OperationType}>(operationTypeList[0]);
  
  const vList = vPool.roots().map(item => ({sym: item[0], name: item[1].name}));
  const allVList = vPool.listAll().map(item => ({sym: item[0], name: item[1].name}));


  //===================================== Sort Operation ===============================================
  const sortOpInputVariable = ref<VariableListInterface>({name: "", sym: Symbol()});
  const sortOpMemberVariable = ref<VariableListInterface>({name: "", sym: Symbol()});
  const sortOpOrder = ref<SortOrder>(SortOrder.Asc);

  const sortOpOrderList = [
    { name: "Asc", order: SortOrder.Asc },
    { name: "Desc", order: SortOrder.Desc },
  ];

  const sortOpInputVariableList = [] as VariableListInterface[];
  for(const item of vList)
  {
    const variable = vPool.get(item.sym);
    if(variable != null && (variable.type === VariableType.Array || variable.type === VariableType.Object))
    {
      sortOpInputVariableList.push(item);
    }
  }
  
  const sortOpMemberList = computed(() =>
  {
    const list = [] as {name: string, sym: symbol}[];

    const inv = vPool.get(sortOpInputVariable.value.sym);
    const sample = inv?.get()[0];
    if(sample != null)
    {
      for(const [k, v] of sample.get())
      {
        const member = vPool.get(v.sym);
        if(member != null && (member.type === VariableType.Number || member.type === VariableType.String) )
          list.push({name: k, sym: v.sym});
      } 
    }

    //console.log("sort member: ", list);

    return list;
  });
  

  //===================================== Count Operation ===============================================
  const countOpInputVariable = ref<VariableListInterface>({name: "", sym: Symbol()});
  const countOpOutputVariable = ref<VariableListInterface>({name: "", sym: Symbol()});
  const countOpMemberVariable = ref<VariableListInterface>({name: "", sym: Symbol()});
  const countOpSearchValue = ref<string | number>();

  const countOpInputVariableList = [] as VariableListInterface[];
  for(const item of vList)
  {
    const variable = vPool.get(item.sym);
    if(variable != null && variable.type === VariableType.Array)
    {
      countOpInputVariableList.push(item);
    }
  }

  const countOpOutputVariableList = [] as VariableListInterface[];
  for(const item of vList)
  {
    const variable = vPool.get(item.sym);
    if(variable != null && variable.type === VariableType.Number)
    {
      countOpOutputVariableList.push(item);
    }
  }
  
  const countOpMemberVariableList = computed(() =>
  {
    const list = [] as {name: string, sym: symbol}[];

    const inv = vPool.get(countOpInputVariable.value.sym);
    const sample = inv?.get()[0];
    if(sample != null)
    {
      for(const [k, v] of sample.get())
      {
        const member = vPool.get(v.sym);
        if(member != null && (member.type === VariableType.Number || member.type === VariableType.String) )
          list.push({name: k, sym: v.sym});
      } 
    }
    return list;
  });
  

  //===================================== Countby Operation ===============================================
  const countbyOpInputVariable = ref<VariableListInterface>({name: "", sym: Symbol()});
  const countbyOpOutputVariable = ref<VariableListInterface>({name: "", sym: Symbol()});
  const countbyOpMemberVariable = ref<VariableListInterface>({name: "", sym: Symbol()});

  const countbyOpInputVariableList = [] as VariableListInterface[];
  for(const item of vList)
  {
    const variable = vPool.get(item.sym);
    if(variable != null && variable.type === VariableType.Array)
    {
      countbyOpInputVariableList.push(item);
    }
  }

  const countbyOpOutputVariableList = [] as VariableListInterface[];
  for(const item of vList)
  {
    const variable = vPool.get(item.sym);
    if(variable != null && variable.type === VariableType.Object)
    {
      countbyOpOutputVariableList.push(item);
    }
  }
  
  const countbyOpMemberVariableList = computed(() =>
  {
    const list = [] as {name: string, sym: symbol}[];

    const inv = vPool.get(countbyOpInputVariable.value.sym);
    const sample = inv?.get()[0];
    if(sample != null)
    {
      for(const [k, v] of sample.get())
      {
        const member = vPool.get(v.sym);
        if(member != null && (member.type === VariableType.Number || member.type === VariableType.String) )
          list.push({name: k, sym: v.sym});
      } 
    }
    return list;
  });

  

  //===================================== Add Operation ===============================================
  const addOpInputVariable1 = ref<VariableListInterface>({name: "", sym: Symbol()});
  const addOpInputVariable2 = ref<VariableListInterface>({name: "", sym: Symbol()});
  const addOpOutputVariable = ref<VariableListInterface>({name: "", sym: Symbol()});

  const addOpInputVariableList = [] as VariableListInterface[];
  const addOpOutputVariableList = [] as VariableListInterface[];
  for(const item of vList)
  {
    const variable = vPool.get(item.sym);
    if(variable != null && variable.type === VariableType.Number)
    {
      addOpInputVariableList.push(item);
      addOpOutputVariableList.push(item);
    }
  }

  
  //===================================== Concat Operation ===============================================
  const concatOpInputVariables = ref<VariableListInterface[]>([]);
  const concatOpOutputVariable = ref<VariableListInterface>({name: "", sym: Symbol()});

  const concatOpInputVariableList = [] as VariableListInterface[];
  const concatOpOutputVariableList = [] as VariableListInterface[];
  for(const item of vList)
  {
    const variable = vPool.get(item.sym);
    if(variable != null)
    {
      concatOpInputVariableList.push(item);

      if(variable.type === VariableType.Object)
      {
        concatOpOutputVariableList.push(item);
      }
    }
  }

  
  //===================================== Format Operation ===============================================
  const fmtOpOutputVariable = ref<VariableListInterface>();
  const fmtOpData = reactive({ fmtType: FormatType.PieChart, title: "", pieDataSymbols: [], lineDataSymbol: Symbol(), rawDataSymbol: Symbol() } as FormatDataInterface);
  const fmtOpPieInputVariables = ref<VariableListInterface[]>();
  const fmtOpLineInputVariable = ref<VariableListInterface>();

  const fmtOpTypes = 
  [
    { name: "PieChart", type: FormatType.PieChart },
    { name: "LineChart", type: FormatType.LineChart },
    //{ name: "PieChart", type: FormatType.Raw },
  ];

  const fmtOpOutputVariableList = [] as VariableListInterface[];
  const fmtOpPieInputVariableList = [] as VariableListInterface[];
  const fmtOpLineInputVariableList = [] as VariableListInterface[];
  const fmtOpRawInputVariableList = [] as VariableListInterface[];
  for(const item of vList)
  {
    const variable = vPool.get(item.sym);
    if(variable != null)
    {
      if(variable.type === VariableType.Number)
      {
        fmtOpPieInputVariableList.push(item);
      }

      if(variable.type === VariableType.Object)
      {
        fmtOpLineInputVariableList.push(item);
        fmtOpOutputVariableList.push(item);
      }

      if(variable.type === VariableType.Number || variable.type === VariableType.String)
      {
        fmtOpRawInputVariableList.push(item);
      }
    }
  }

  //console.log(fmtOpLineInputVariableList);

  const complete = () => 
  {
    hideView();

    if(operationType.value.type === OperationType.Sort)
    {
      const operation = new SortOperation();
      operation.setArgs(new Map<string, any>([["symbol", sortOpInputVariable.value.sym], ["order", sortOpOrder.value], ["member", sortOpMemberVariable.value.name], ["dimension", 0]]));

      focusedStep.operations.push(operation);
    }
    else if(operationType.value.type === OperationType.Count)
    {
      const operation = new CountOperation();

      const variable = vPool.get(countOpMemberVariable.value.sym);
      if(variable?.type === VariableType.Number) countOpSearchValue.value = parseInt(variable.get());

      operation.setArgs(new Map<string, any>([["inputSymbol", countOpInputVariable.value.sym], ["outputSymbol", countOpOutputVariable.value.sym], 
        ["member", countOpMemberVariable.value.name], ["searchValue", countOpSearchValue.value]]));

      focusedStep.operations.push(operation);
    }
    else if(operationType.value.type === OperationType.Countby)
    {
      const operation = new CountbyOperation();
      operation.setArgs(new Map<string, any>([["inputSymbol", countbyOpInputVariable.value.sym], ["outputSymbol", countbyOpOutputVariable.value.sym], 
        ["member", countbyOpMemberVariable.value.name]]));

      focusedStep.operations.push(operation);
    }
    else if(operationType.value.type === OperationType.Add)
    {
      const operation = new AddOperation();
      operation.setArgs(new Map<string, any>([["inputSymbol1", addOpInputVariable1.value.sym], ["inputSymbol2", addOpInputVariable2.value.sym],
        ["outputSymbol", addOpOutputVariable.value.sym]] ));

      focusedStep.operations.push(operation);
    }
    else if(operationType.value.type === OperationType.Concat)
    {
      const operation = new ConcatOperation();
      operation.setArgs(new Map<string, any>([["inputVariableSymbols", concatOpInputVariables.value.map(item => item.sym)], ["outputSymbol", concatOpOutputVariable.value.sym]] ));

      focusedStep.operations.push(operation);
    }
    else if(operationType.value.type === OperationType.Format)
    {
      const operation = new FormatOperation();

      if(fmtOpLineInputVariable.value) fmtOpData.lineDataSymbol = fmtOpLineInputVariable.value.sym;
      if( fmtOpPieInputVariables.value) fmtOpData.pieDataSymbols = fmtOpPieInputVariables.value.map(item => item.sym);
      //console.log(fmtOpLineInputVariable);
      //console.log(fmtOpPieInputVariables);
      //console.log(fmtOpData);

      operation.setArgs(new Map<string, any>([["outputSymbol", fmtOpOutputVariable.value!.sym], ["fmtData", fmtOpData]] ));

      focusedStep.operations.push(operation);
    }
  };

  
  const hideView = () =>
  {
    showFlag.value = false;
  };


  return { 
    showFlag,
    operationTypeList, operationType,
    complete, hideView,
    sortOpInputVariable, sortOpMemberVariable, sortOpOrder, sortOpInputVariableList, sortOpMemberList, sortOpOrderList,
    countOpInputVariable, countOpOutputVariable, countOpMemberVariable, countOpSearchVariable: countOpSearchValue, countOpInputVariableList, countOpOutputVariableList, countOpMemberVariableList, 
    countbyOpInputVariable, countbyOpOutputVariable, countbyOpMemberVariable, countbyOpInputVariableList, countbyOpOutputVariableList, countbyOpMemberVariableList, 
    addOpInputVariable1, addOpInputVariable2, addOpOutputVariable, addOpInputVariableList, addOpOutputVariableList,
    concatOpInputVariables, concatOpOutputVariable, concatOpInputVariableList, concatOpOutputVariableList,
    fmtOpOutputVariable, fmtOpPieInputVariables, fmtOpLineInputVariable, fmtOpData, fmtOpTypes, fmtOpOutputVariableList, fmtOpPieInputVariableList, fmtOpLineInputVariableList, fmtOpRawInputVariableList,
  };
}