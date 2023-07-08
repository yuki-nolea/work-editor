import { MouseOpManager } from "./use-mouse-op";
import { SequenceOpManager } from "./use-sequence-op";


export default function useOpModeManager(mouseOpManager: MouseOpManager, sequenceOpManager: SequenceOpManager)
{
  const { enable: enableMouseOpMode_, disable: disableMouseOpMode_, cancel: cancelMouseOp_ } = mouseOpManager;

  const { enable: enableSequenceOpMode_, disable: disableSequenceOpMode_, cancel: cancelSequenceOp_ } = sequenceOpManager;

  let mouseOpEnabled = false;
  let sequenceOpEnabled = false;

  const isMouseOpEnabled = () => mouseOpEnabled;
  const isSequenceOpEnabled = () => sequenceOpEnabled;

  const cancelAll = () =>
  {
    cancelMouseOp_();
    cancelSequenceOp_();
  }

  const disableAll = () =>
  {
    disableSequenceOpMode_();
    sequenceOpEnabled = false;

    disableMouseOpMode_();
    mouseOpEnabled = false;
  }

  const enableMouseOpMode = () =>
  {
    cancelAll();
    disableAll();
    enableMouseOpMode_();
    mouseOpEnabled = true;
  }

  const enableSequenceOpMode = () =>
  {
    cancelAll();
    disableAll();
    enableSequenceOpMode_();
    sequenceOpEnabled = true;
  }


  return { enableMouseOpMode, enableSequenceOpMode, isMouseOpEnabled, isSequenceOpEnabled };
}


export type OpModeManager = ReturnType<typeof useOpModeManager>;