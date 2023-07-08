//import { ProcedureWidgetState, EditAreaControl, ProcedureWidgetControl } from "../../types/my-types";
import useEditArea from "./use-edit-area";
import useMouseOp from "./use-mouse-op"

/*const { management: mouseOpInfo, cancel: mouseOpCancel } = useMouseOp();
const { removeProcedure } = useEditArea();

const onKeyPress = (e: KeyboardEvent) => {
    console.log("key pressed");
    if (e.key == "Backspace") {
        if (mouseOpInfo.focused != null) {
            removeProcedure(mouseOpInfo.focused);
            mouseOpCancel();
        }
    }
};

let isPressed = false;
const onKeyDown = (e: KeyboardEvent) => {
    if (!isPressed) onKeyPress(e);

    isPressed = true;
};

const onKeyUp = (e: KeyboardEvent) => {

    isPressed = false;
};

export default () => {

    const enable = () => {
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
    }

    const disable = () => {
        document.removeEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
    }

    return { enable, disable };
}
*/
