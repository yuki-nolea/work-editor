import { Delegate } from "../delegate";
import { EditAreaWidget } from "types/my-types";
import { Work } from "../workflow/work";
import { ProcedureWidget } from "../../model/workflow/procedure";


export default function useSequenceOp(work: Work, editAreaWidget: EditAreaWidget)
{
  const procedures = work.procedures;
  const area = editAreaWidget;

  const management =
  {
    enabled: false,
    selected: [] as ProcedureWidget[],
  };
  
  const select = (procedure: ProcedureWidget) =>
  {
    management.selected.push(procedure);

    procedure.sequenceOpState.isSelected = true;
    onSelected.run(procedure);
  };

  const unselect = (procedure: ProcedureWidget) =>
  {
    const index = management.selected.indexOf(procedure);
    if(index !== -1)
    {
      procedure.sequenceOpState.isSelected = false;
      onunSelected.run(procedure);

      return true;
    }

    return false;
  };


  const onClick = (e: MouseEvent, widget: ProcedureWidget) =>
  {
    if(!management.enabled) return;

    if(!unselect(widget))
    {
      select(widget);

      if(management.selected.length == 2)
      {
        const [start, end] = [...management.selected];

        for(const procedure of management.selected)
        {
          procedure.sequenceOpState.isSelected = false;
        }
        management.selected.splice(0);

        onCompleted.run(start, end);
      }
    }
  };

  const enable = () =>
  {
    management.enabled = true;

    area.isSequenceOpMode = true;
  }

  const disable = () =>
  {
    management.enabled = false;

    area.isSequenceOpMode = false;
  }

  const cancel = () =>
  {
    for(const procedure of management.selected)
    {
      procedure.sequenceOpState.isSelected = false;
    }
    management.selected.splice(0);
  }
  
  const onSelected = new Delegate<[procedure: ProcedureWidget]>();
  const onunSelected = new Delegate<[procedure: ProcedureWidget]>();
  const onCompleted = new Delegate<[start: ProcedureWidget, end: ProcedureWidget]>();

  return { management, enable, disable, cancel, onClick, onSelected, onunSelected, onCompleted };
}

export type SequenceOpManager = ReturnType<typeof useSequenceOp>;