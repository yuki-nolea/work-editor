import { reactive } from "vue";
import { EditAreaWidget } from "../../types/my-types";
import { Work } from "../workflow/work";



export default (work: Work) =>
{
    const editAreaWidget: EditAreaWidget = reactive(
    {
        rect: 
        {
            left: -300,
            top: -400,
            width: 3600,
            height: 3600,
        },
        isMouseOpMode: false,
        isSequenceOpMode: false,
        scale: 1.0,
    });

    return { editAreaWidget };
}