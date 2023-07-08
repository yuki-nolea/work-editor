import { vPool } from "../variables/variable-pool";
import { reactive } from "vue";
import { Rectangle } from "../../types/my-types";


import { parse } from "csv-parse/lib/sync";
import teamsRankCsv from "../teams_preliminary_rank_csv";
import useResultView from "./use-result-view";
import { SortOperation, SortOrder } from "../operations/sort-operation";
import { CountOperation } from "../operations/count-operation";
import { CountbyOperation } from "../operations/countby-operation";
import { AddOperation } from "../operations/add-operation";
import { ConcatOperation } from "../operations/concat-operation";
import { FormatDataInterface, FormatOperation, FormatType } from "../operations/format-operation";
import { ArrayVariable } from "../../model/variables/array-variable";
import { ObjectVariable } from "../../model/variables/object-variable";
import { NumberVariable } from "../../model/variables/number-variable";
import { Work } from "../../model/workflow/work";
import { Procedure, ProcedureWidget } from "../../model/workflow/procedure";
import { Sequence, SequenceWidget } from "../../model/workflow/sequence";
import { StepType, Step, StepWidget } from "../../model/workflow/step";


export default (intention: string, objective: string) =>
{
  const work: Work = new Work(intention, objective, [], [], [], []);


  return { work, };
};




export const makeProcedure = (name: string, intention: string, objective: string, rect: Rectangle) =>
{
  const id = Symbol();
  
  const widget: ProcedureWidget = 
  {
    id,
    name,
    intention,
    objective,
    order: "",
    rect,
    mouseOpState: { isDragged: false, isFocused: false },
    sequenceOpState: { isSelected: false },
  };

  return new Procedure(widget, id);
};

export const makeSequence = (from: Procedure, to: Procedure) =>
{
  const id = Symbol();

  const widget: SequenceWidget = 
  {
    id,
    sRect: reactive(from.widget.rect),
    eRect: reactive(to.widget.rect),
  };

  return new Sequence(widget, from, to, id);
};

export const makeStep = (name: string, description: string, type: StepType = StepType.Common) =>//, component: (...args: any) => void = () => {}) =>
{
  const widget: StepWidget = 
  {
    name,
    description,
  };

  return new Step(widget, type);
};


export const makeSortOperation = (args: Map<string, any>) =>
{
  const op = new SortOperation();
  op.setArgs(args);

  return op;
}


export const makeInitializedWork = (work: Work) =>
{
      /*
    const nmax_budget = vPool.newNumberVariable(1, "予算面でのチーム最大数");
    const nmax_site = vPool.newNumberVariable(1, "会場面でのチーム最大数");
    const n_finals = vPool.newNumberVariable(0, "選抜チーム数の設定");
    const n_reserve = vPool.newNumberVariable(0, "補欠チーム数");

    const n_regions = vPool.newNumberVariable(3, "地域数");

    const n_teams_preliminary = vPool.newNumberVariable(6, "予選出場校の数");
    */
    /*const teams_preliminary_rank = vPool.newArrayVariable(
      [
        [
          new Map<string, any>([["school", "school1"], ["region", 0], ["score", 300], ["gender", 1], ["experience", 1]]),
          new Map<string, any>([["school", "school2"], ["region", 1], ["score", 100], ["gender", 0], ["experience", 0]]),
          new Map<string, any>([["school", "school3"], ["region", 2], ["score", 500], ["gender", 2], ["experience", 2]]),
          new Map<string, any>([["school", "school3"], ["region", 2], ["score", 500], ["gender", 2], ["experience", 2]]),
          new Map<string, any>([["school", "school3"], ["region", 2], ["score", 500], ["gender", 2], ["experience", 2]]),
          new Map<string, any>([["school", "school3"], ["region", 2], ["score", 500], ["gender", 2], ["experience", 2]]),
        ],
        [
          new Map<string, any>([["school", "school1"], ["region", 0], ["score", 300], ["gender", 1], ["experience", 1]]),
          new Map<string, any>([["school", "school2"], ["region", 1], ["score", 100], ["gender", 0], ["experience", 0]]),
          new Map<string, any>([["school", "school3"], ["region", 2], ["score", 500], ["gender", 2], ["experience", 2]]),
          new Map<string, any>([["school", "school3"], ["region", 2], ["score", 500], ["gender", 2], ["experience", 2]]),
          new Map<string, any>([["school", "school3"], ["region", 2], ["score", 500], ["gender", 2], ["experience", 2]]),
          new Map<string, any>([["school", "school3"], ["region", 2], ["score", 500], ["gender", 2], ["experience", 2]]),
        ],
        [
          new Map<string, any>([["school", "school1"], ["region", 0], ["score", 300], ["gender", 1], ["experience", 1]]),
          new Map<string, any>([["school", "school2"], ["region", 1], ["score", 100], ["gender", 0], ["experience", 0]]),
          new Map<string, any>([["school", "school3"], ["region", 2], ["score", 500], ["gender", 2], ["experience", 2]]),
          new Map<string, any>([["school", "school3"], ["region", 2], ["score", 500], ["gender", 2], ["experience", 2]]),
          new Map<string, any>([["school", "school3"], ["region", 2], ["score", 500], ["gender", 2], ["experience", 2]]),
          new Map<string, any>([["school", "school3"], ["region", 2], ["score", 500], ["gender", 2], ["experience", 2]]),
        ],
        [
          new Map<string, any>([["school", "school1"], ["region", 0], ["score", 300], ["gender", 1], ["experience", 1]]),
          new Map<string, any>([["school", "school2"], ["region", 1], ["score", 100], ["gender", 0], ["experience", 0]]),
          new Map<string, any>([["school", "school3"], ["region", 2], ["score", 500], ["gender", 2], ["experience", 2]]),
          new Map<string, any>([["school", "school3"], ["region", 2], ["score", 500], ["gender", 2], ["experience", 2]]),
          new Map<string, any>([["school", "school3"], ["region", 2], ["score", 500], ["gender", 2], ["experience", 2]]),
          new Map<string, any>([["school", "school3"], ["region", 2], ["score", 500], ["gender", 2], ["experience", 2]]),
        ],
  ], "予選成績多重");*/
    /*const teams_preliminary_rank = vPool.newArrayVariable(
    [
      new Map<string, any>([["school", "school1"], ["region", 0], ["score", 300], ["gender", 1], ["experience", 1]]),
      new Map<string, any>([["school", "school2"], ["region", 1], ["score", 100], ["gender", 0], ["experience", 0]]),
      new Map<string, any>([["school", "school3"], ["region", 2], ["score", 400], ["gender", 2], ["experience", 2]]),
      new Map<string, any>([["school", "school3"], ["region", 2], ["score", 200], ["gender", 2], ["experience", 2]]),
      new Map<string, any>([["school", "school3"], ["region", 2], ["score", 800], ["gender", 2], ["experience", 2]]),
      new Map<string, any>([["school", "school3"], ["region", 2], ["score", 600], ["gender", 2], ["experience", 2]]),
    ], "予選成績");
  */
    
  const maps = [] as Map<string, any>[];
  {
    const recodes = parse(teamsRankCsv, { columns: true });

    const objectToMap = (object: any) => Object.entries(object).reduce((l,[k,v])=>l.set(k,v), new Map())

    for(const recode of recodes)
    {
      recode.score = Number(recode.score);
      recode.n_correct_answer = Number(recode.n_correct_answer);
      recode.n_incorrect_answer = Number(recode.n_incorrect_answer);
      maps.push(objectToMap(recode));
    }
  }

  const teams_preliminary_rank = new ArrayVariable("teams preliminary rank", maps, vPool);

  /*const teams_finals = vPool.newArrayVariable([], "本選出場チーム");


  const n_teams_region = vPool.newArrayVariable([], "地域毎の予選出場チーム数");
  const n_region_seats = vPool.newArrayVariable([], "地域毎の定員");
  const rank_limit = vPool.newNumberVariable(0, "選抜順位下限値");
  const teams_elected = vPool.newArrayVariable([], "選抜チームリスト");
  const teams_region_candidates =  vPool.newArrayVariable([], "地域候補チームリスト");
  */

  const candidates_by_school = new ObjectVariable("candidates by school", new Map(), vPool);
  const candidates_by_region = new ObjectVariable("candidates by region", new Map(), vPool);

  const { setSchoolCountSymbol, setRegionCountSymbol, setMaleCountSymbol, setFemaleCountSymbol, setResultsSymbol } = useResultView();
  setSchoolCountSymbol(candidates_by_school.sym);
  setRegionCountSymbol(candidates_by_region.sym);

  /*const procs: Procedure[] = 
  [
    makeProcedure("選抜チーム数の決定", 
      "予算（旅費、宿泊、その他）、会場（信ぴょう性、公平性）、競技水準に配慮しつつ、できるだけ多くのチームを招待する。選抜するチーム数の目標値に対して、旅費の調整等での追加や辞退等に対応するため多めに選抜する。", 
      "本選を戦うチームの数を選抜する", { left: 1000, top: 600, width: 200, height: 60, }),
    makeProcedure("成績上位チームの選定", 
      "事実上「日本一を決定する大会」という位置づけを確立するため、トップチームを選抜する。ただし、高校主体の大会として高校対抗の色合いを残すため、各校からの出場は2チームまでとする。", 
      "競技成績のみによりチームを選抜する", { left: 1000, top: 800, width: 200, height: 60, }),
    makeProcedure("地域枠チームの選定", 
      "「全国への普及」「全国大会」を体現するため、できるだけ多くの県から選抜する。成績での選抜では一部の県に偏る傾向への対策として、成績順位の低いチームからも選抜する。", 
      "地域性を配慮したチームを選抜する", { left: 1400, top: 800, width: 200, height: 60, }),
  ];*/
  /*
  const procs: Procedure[] = 
  [
    makeProcedure("Deciding the number of teams competing in the finals", 
      "予算（旅費、宿泊、その他）、会場（信ぴょう性、公平性）、競技水準に配慮しつつ、できるだけ多くのチームを招待する。選抜するチーム数の目標値に対して、旅費の調整等での追加や辞退等に対応するため多めに選抜する。", 
      "本選を戦うチームの数を選抜する", { left: 1000, top: 600, width: 220, height: 80, }),
    makeProcedure("Selection of top-performing teams", 
      "事実上「日本一を決定する大会」という位置づけを確立するため、トップチームを選抜する。ただし、高校主体の大会として高校対抗の色合いを残すため、各校からの出場は2チームまでとする。", 
      "競技成績のみによりチームを選抜する", { left: 1000, top: 800, width: 220, height: 80, }),
    makeProcedure("Selection of regional quota teams", 
      'In order to realize the goals of "nationwide dissemination" and "national competition," teams is selected from as many prefectures as possible. As a countermeasure to the tendency of selection based on performance to be biased toward certain prefectures, teams with low performance rankings will also be selected.', 
      "Select teams based on regional considerations.", { left: 1400, top: 800, width: 220, height: 80, }),
  ];
  */

  const procs: Procedure[] = 
  [
    makeProcedure("Input data of the qualifying teams", 
      "予算（旅費、宿泊、その他）、会場（信ぴょう性、公平性）、競技水準に配慮しつつ、できるだけ多くのチームを招待する。選抜するチーム数の目標値に対して、旅費の調整等での追加や辞退等に対応するため多めに選抜する。", 
      "本選を戦うチームの数を選抜する", { left: 1000, top: 600, width: 220, height: 70, }),
    makeProcedure("Calculate the statistics of the PC Koshien", 
      'By calculating the current statistical information of PC Koshien, it is confirmed whether "nationwide dissemination" and "national competition" are embodied.', 
      "Record the number of teams per region.", { left: 1000, top: 800, width: 220, height: 70, }),
    makeProcedure("Format calculation results", 
      'Select from as many prefectures as possible to embody "nationwide dissemination" and "national competition". In the selection based on grades, as a measure against the tendency to be biased toward some prefectures, teams with low grades are also selected.', 
      "Select a team that considers regional characteristics", { left: 1400, top: 800, width: 220, height: 70, }),
  ];



  const sortStep2 = makeStep("ソート 昇順", "～～～～～～～～～～～～～～～～～～～～～～～～～～");
  //sortStep2.operations.push(makeSortOperation(new Map<string, any>([["symbol", teams_preliminary_rank.sym], ["order", SortOrder.Asc], ["member", "score"], ["dimension", 0]])));
  //procs[0].addStep(sortStep2);

  const sortStep = makeStep("ソート 降順", "～～～～～～～～～～～～～～～～～～～～～～～～～～");
  //sortStep.operations.push(makeSortOperation(new Map<string, any>([["symbol", teams_preliminary_rank.sym], ["order", SortOrder.Desc], ["member", "score"], ["dimension", 0]])));
  //procs[0].addStep(sortStep);

  const regionCountOperation = new CountbyOperation();
  regionCountOperation.setArgs(new Map<string, any>([["inputSymbol", teams_preliminary_rank.sym], ["outputSymbol", candidates_by_region.sym], ["member", "region"]]));

  const regionCountStep = makeStep("", "Count the number of teams per each region.");
  regionCountStep.operations.push(regionCountOperation);
  regionCountStep.operations.push(makeSortOperation(new Map<string, any>([["symbol", candidates_by_region.sym], ["order", SortOrder.Desc]])));
  procs[1].addStep(regionCountStep);

  const schoolCountOperation = new CountbyOperation();
  schoolCountOperation.setArgs(new Map<string, any>([["inputSymbol", teams_preliminary_rank.sym], ["outputSymbol", candidates_by_school.sym], ["member", "school"]]));

  const schoolCountStep = makeStep("", "Count the number of teams per each school.");
  schoolCountStep.operations.push(schoolCountOperation);
  //procs[1].addStep(schoolCountStep);



  const n_gender1_male = new NumberVariable("males of gender1", 1, vPool);
  const n_gender2_male = new NumberVariable("males of gender2", 1, vPool);
  const n_gender1_female = new NumberVariable("females of gender1", 1, vPool);
  const n_gender2_female = new NumberVariable("females of gender2", 1, vPool);
  const n_male = new NumberVariable("number of males", 1, vPool);
  const n_female = new NumberVariable("number of females", 1, vPool);

  setMaleCountSymbol(n_male.sym);
  setFemaleCountSymbol(n_female.sym);

  const gender1MaleCountOperation = new CountOperation();
  gender1MaleCountOperation.setArgs(new Map<string, any>([["inputSymbol", teams_preliminary_rank.sym], ["outputSymbol", n_gender1_male.sym], ["member", "gender1"], ["searchValue", "Male"]]));  
  const gender2MaleCountOperation = new CountOperation();
  gender2MaleCountOperation.setArgs(new Map<string, any>([["inputSymbol", teams_preliminary_rank.sym], ["outputSymbol", n_gender2_male.sym], ["member", "gender2"], ["searchValue", "Male"]]));

  const gender1FemaleCountOperation = new CountOperation();
  gender1FemaleCountOperation.setArgs(new Map<string, any>([["inputSymbol", teams_preliminary_rank.sym], ["outputSymbol", n_gender1_female.sym], ["member", "gender1"], ["searchValue", "Female"]]));  
  const gender2FemaleCountOperation = new CountOperation();
  gender2FemaleCountOperation.setArgs(new Map<string, any>([["inputSymbol", teams_preliminary_rank.sym], ["outputSymbol", n_gender2_female.sym], ["member", "gender2"], ["searchValue", "Female"]]));

  const AddMaleCountOperation = new AddOperation();
  AddMaleCountOperation.setArgs(new Map<string, any>([["inputSymbol1", n_gender1_male.sym], ["inputSymbol2", n_gender2_male.sym], ["outputSymbol", n_male.sym]]));
  const AddFemaleCountOperation = new AddOperation();
  AddFemaleCountOperation.setArgs(new Map<string, any>([["inputSymbol1", n_gender1_female.sym], ["inputSymbol2", n_gender2_female.sym], ["outputSymbol", n_female.sym]]));


  const genderCountStep = makeStep("", "Count the number of participants by gender.");
  genderCountStep.operations.push(gender1MaleCountOperation);
  genderCountStep.operations.push(gender2MaleCountOperation);
  genderCountStep.operations.push(gender1FemaleCountOperation);
  genderCountStep.operations.push(gender2FemaleCountOperation);
  genderCountStep.operations.push(AddMaleCountOperation);
  genderCountStep.operations.push(AddFemaleCountOperation);
  // procs[1].addStep(genderCountStep);



  const results = new ObjectVariable("statistics", new Map(), vPool);
  setResultsSymbol(results.sym);

  const ConcatResultsStep = makeStep("計算結果の集約", "～～～～～～～～～～");
  const ConcatResultsOperation = new ConcatOperation();
  /*
  ConcatResultsOperation.setArgs(new Map<string, any>([
    ["ranksSymbol", teams_preliminary_rank.sym], ["regionsSymbol", candidates_by_region.sym],
    ["schoolsSymbol", candidates_by_school.sym], ["malesSymbol", n_male.sym],
    ["femalesSymbol", n_female.sym], ["outputSymbol", results.sym],
  ]));
  */
  ConcatResultsOperation.setArgs(new Map<string, any>([
    ["inputVariableSymbols", [teams_preliminary_rank.sym, candidates_by_region.sym, candidates_by_school.sym, n_male.sym, n_female.sym]],
    ["outputSymbol", results.sym]
  ]));
  //ConcatResultsStep.operations.push(ConcatResultsOperation);
  // procs[2].addStep(ConcatResultsStep);

  const FormatResultsStep = makeStep("", "Format the calculation results");
  const FormatPieChartOperation = new FormatOperation();
  FormatPieChartOperation.setArgs(new Map<string, any>([
    ["outputSymbol", results.sym],
    ["fmtData", {fmtType: FormatType.PieChart, title: "Gender ratio", pieDataSymbols: [n_male.sym, n_female.sym]} as FormatDataInterface]
  ]));
  //FormatResultsStep.operations.push(FormatPieChartOperation);


  const FormatRegionLineChartOperation = new FormatOperation();
  FormatRegionLineChartOperation.setArgs(new Map<string, any>([
    ["outputSymbol", results.sym],
    ["fmtData", {fmtType: FormatType.LineChart, title: "Candidates by region", lineDataSymbol: candidates_by_region.sym} as FormatDataInterface]
  ]));
  FormatResultsStep.operations.push(FormatRegionLineChartOperation);

  const FormatSchoolLineChartOperation = new FormatOperation();
  FormatSchoolLineChartOperation.setArgs(new Map<string, any>([
    ["outputSymbol", results.sym],
    ["fmtData", {fmtType: FormatType.LineChart, title: "Candidates by school", lineDataSymbol: candidates_by_school.sym} as FormatDataInterface]
  ]));
  //FormatResultsStep.operations.push(FormatSchoolLineChartOperation);



  procs[2].addStep(FormatResultsStep);



  /*
  const sortStep = makeStep("ソート 降順", "～～～～～～～～～～～～～～～～～～～～～～～～～～", procs[0].sym, ComponentType.Common, [], []);
  sortStep.operations.push(makeSortOperation(new Map<string, any>([["symbol", teams_preliminary_rank.sym], ["order", SortOrder.Desc], ["member", "score"], ["dimension", 0]])));
  procs[0].steps.push(sortStep);

  procs[0].steps.push(makeStep("", "選抜チーム数の設定", procs[0].sym, ComponentType.Common, [], []));


  procs[1].steps.push(makeStep("", "予選成績を成績降順に並び替える", procs[1].sym, ComponentType.Common, [], []));

  procs[1].steps.push(makeStep("", "上位チームを選抜チームリストに入れる\nただし、同一校は2チームまで", procs[1].sym, ComponentType.Common, [], []));


  procs[2].steps.push(makeStep("", "Count the number of participating teams in each region", procs[2].sym, ComponentType.Common, [], []));

  procs[2].steps.push(makeStep("", "Weighted by the number of participating teams to determine the capacity for each region", procs[2].sym, ComponentType.Common, [], []));

  procs[2].steps.push(makeStep("", "Put them in the regional candidate team list in order from the top of the qualifying results for each region. However, it is limited to those who have not been selected from the same school as the team with the highest grades. Also, the qualifying results are limited to above the standard (rank_limit).", 
    procs[2].sym, ComponentType.Common, [], []));

  procs[2].steps.push(makeStep("", "Sort the teams in the regional candidate team list according to the selection criteria.\n・ Number of female members (in descending order)\n・ Number of past appearances (in ascending order)", procs[2].sym, ComponentType.Common, [], []));

  procs[2].steps.push(makeStep("", "Add to the selection team list from the regional candidate team list", procs[2].sym, ComponentType.Common, [], []));
  */

  /*
  procs[2].steps.push(makeStep("", "各地域毎の出場チーム数を数える", procs[2].sym, ComponentType.Common, [], []));

  procs[2].steps.push(makeStep("", "出場チーム数で重みづけして地域毎の定員を決める", procs[2].sym, ComponentType.Common, [], []));

  procs[2].steps.push(makeStep("", "地域毎に予選成績の上位から順に地域候補チームリストに入れる\nただし、成績上位チームとして同一校から未選出に限る\nまた、予選成績が基準以上(rank_limit)に限る", 
    procs[2].sym, ComponentType.Common, [], []));

  procs[2].steps.push(makeStep("", "地域候補チームリストのチームを選抜基準に従い並び換える\n・女性メンバーの人数（降順）\n・過去出場回数（昇順）", procs[2].sym, ComponentType.Common, [], []));

  procs[2].steps.push(makeStep("", "地域候補チームリストから選抜チームリストに入れる", procs[2].sym, ComponentType.Common, [], []));
  */

  for(const item of procs)
  {
    work.addProcedure(item);
  }

  work.addSequence(makeSequence(procs[0], procs[1]));
  work.addSequence(makeSequence(procs[1], procs[2]));


  /*
  const comment = { widget: { txt: "There is a big difference in the participation ratio of men and women", coord: { x: 1400, y: 600 },  } as CommentWidget } as Comment;

  work.comments.push(comment);
  work.relations.push({ widget: { commentCoord: comment.widget.coord, procRect: procs[1].widget.rect } as RelationWidget, comment: comment, proc: procs[1] });
  */
  /*
  const comments: Comment[] = [];
  comments.push({ widget: { txt: "テストコメント1", coord: { x: 1400, y: 600 },  } as CommentWidget } as Comment);
  comments.push({ widget: { txt: "テストコメント2", coord: { x: 1400, y: 600 },  } as CommentWidget } as Comment);
  comments.push({ widget: { txt: "テストコメント3", coord: { x: 1400, y: 600 },  } as CommentWidget } as Comment);
  comments.push({ widget: { txt: "テストコメント4", coord: { x: 1400, y: 600 },  } as CommentWidget } as Comment);
  comments.push({ widget: { txt: "テストコメント5", coord: { x: 1400, y: 600 },  } as CommentWidget } as Comment);
  comments.push({ widget: { txt: "テストコメント6", coord: { x: 1400, y: 600 },  } as CommentWidget } as Comment);
  comments.push({ widget: { txt: "テストコメント7", coord: { x: 1400, y: 600 },  } as CommentWidget } as Comment);
  comments.push({ widget: { txt: "テストコメント8", coord: { x: 1400, y: 600 },  } as CommentWidget } as Comment);

  for(const item of comments)
  {
    work.comments.push(item);
    work.relations.push({ widget: { commentCoord: item.widget.coord, procRect: procs[0].widget.rect } as RelationWidget, comment: item, proc: procs[0] });
  }
  */


  //return teams_finals;
  return teams_preliminary_rank;
}






