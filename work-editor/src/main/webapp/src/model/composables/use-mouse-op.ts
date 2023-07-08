import { Delegate } from "../delegate";
import { EditAreaWidget, Point2D, Rectangle, } from "types/my-types";
import { Work } from "../workflow/work";
import { ProcedureWidget } from "../../model/workflow/procedure";



export default function useMouseOp(work: Work, editAreaWidget: EditAreaWidget, )
{
  const procedures = work.procedures;
  const area = editAreaWidget;
  
  //移動中のオブジェクト
  type MovingWidget =
  {
    //移動開始時のオブジェクトのx座標
    prevRect: Rectangle,

    //移動対象のProcedure
    procedureWidget: ProcedureWidget,
  };


  const management = {
    isScreenMoving: false,          //画面移動状態かどうか 
    isWidgetDragged: false,        //ウィジェット移動状態かどうか
    focused: [] as ProcedureWidget[],        //フォーカス状態のProcedureWidget
    mousePoint: {x: 0, y: 0} as Point2D, //移動開始時のマウスの座標
    movings: [] as MovingWidget[], //移動中のウィジェット
  };



  //マウスの座標を取得
  const getMousePos = (e: MouseEvent): Point2D =>
  {
    const rect = area.htmlElement!.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    return { x: mouseX, y: mouseY };
  }


  //ProcedureWidgetをフォーカス状態にする

  //全てのProcedureWidgetのフォーカス状態を解除する
  const unfocus = () =>
  {
    for(const item of management.focused)
    {
      item.mouseOpState.isFocused = false;
      onunFocused.run(item);
    }
    management.isWidgetDragged = false;
    management.focused.splice(0);
    management.movings.splice(0);
  };

  const focus = (procedure: ProcedureWidget) =>
  {
    management.focused.push(procedure);
    procedure.mouseOpState.isFocused = true;

    onFocused.run(procedure);
  };

  const onClick = (e: MouseEvent, widget: ProcedureWidget) =>
  {
    if(!management.focused.find(item => item === widget))
    {
      unfocus();
      focus(widget);
    }
    
    const mousePoint = getMousePos(e);

    management.mousePoint = mousePoint;
    management.isWidgetDragged = true;
    
    management.movings.push(
    {
      prevRect: { ...widget.rect },
      procedureWidget: widget,
    });
  };

  const mousedown = (e: MouseEvent) => 
  {
    const mousePoint = getMousePos(e);
    management.mousePoint = mousePoint;

    //ホイールクリック時
    if(e.button == 1)   
    {
      management.isScreenMoving = true;
    }
  };

  const mousemove = (e: MouseEvent) =>
  {
    const mousePoint = getMousePos(e);
    //console.log("mousePoint: (" + mousePoint.x + ", " + mousePoint.y + ")");

    if (management.isWidgetDragged)
    {
      for (const target of management.movings)
      {
        let nextX = target.prevRect.left + (mousePoint.x - management.mousePoint.x) / area.scale;
        let nextY = target.prevRect.top + (mousePoint.y - management.mousePoint.y) / area.scale;

        //移動先が範囲外の場合は範囲内に収まるように移動する
        if(nextX < 0)
        {
          nextX = 0;
        }
        if(nextX > area.rect.width - target.prevRect.width)
        {
          nextX = area.rect.width - target.prevRect.width;
        }
        if(nextY < 0)
        {
          nextY = 0;
        }
        if(nextY > area.rect.height - target.prevRect.height) {
          nextY = area.rect.height - target.prevRect.height;
        }

        const prevRect = { ...target.procedureWidget.rect };
        target.procedureWidget.rect.left = nextX;
        target.procedureWidget.rect.top = nextY;
        
        onMoving.run(prevRect, target.procedureWidget);

        //console.log(target.element.style.left);
      }
    }
    else if (management.isScreenMoving)
    {
      const nextX = area.rect.left + mousePoint.x - management.mousePoint.x;
      const nextY = area.rect.top + mousePoint.y - management.mousePoint.y;

      area.rect.left = nextX;
      area.rect.top = nextY;
    }
  }

  const mouseup = (e: MouseEvent) =>
  {
    if(management.isWidgetDragged)
    {
      management.isWidgetDragged = false;

      for(const target of management.movings)
      {
        onMoved.run(target.prevRect, target.procedureWidget);
      }
      
      management.movings = [] as MovingWidget[];
    }
    else if(management.isScreenMoving)
    {
      management.isScreenMoving = false;
    }
  }

  const wheel = (e: WheelEvent) =>
  {
    //e.preventDefault();

    const mousePoint = getMousePos(e);

    const centerX = area.rect.width / 2;
    const centerY = area.rect.height / 2;

    const msx = mousePoint.x / area.scale - centerX;
    const msy = mousePoint.y / area.scale - centerY;
    
    //console.log("mousePoint: (" + mousePoint.x + ", " + mousePoint.y + ")", "center: (" + centerX + ", " + centerY + ")", "ms: (" + msx + ", " + msy + ")");

    const zoomSpeed = 0.05;
    let dScale = 0.0;

    if(e.deltaY < 0)
    {
      dScale += zoomSpeed;
    }
    else
    {
      dScale -= zoomSpeed;
    }
    area.scale += dScale;
    area.scale = Math.min(Math.max(zoomSpeed, area.scale), 10);

    area.htmlElement!.style.transform = `scale(${area.scale}, ${area.scale})`;

    const dx = msx * dScale;
    const dy = msy * dScale;

    area.rect.left -= dx;
    area.rect.top -= dy;
    
  }

  const enable = () =>
  {
    area.isMouseOpMode = true;
    area.htmlElement!.addEventListener('mousedown', mousedown);

    document.addEventListener('mouseup', mouseup);
    document.addEventListener('mousemove', mousemove);
    area.htmlElement!.addEventListener('wheel', wheel, {passive: false});
  }

  const disable = () =>
  {
    area.isMouseOpMode = false;
    area.htmlElement!.removeEventListener('mousedown', mousedown);

    document.removeEventListener('mouseup', mouseup);
    document.removeEventListener('mousemove', mousemove);
    area.htmlElement!.removeEventListener('wheel', wheel);
  }

  const cancel = () =>
  {
    unfocus();
    //console.log("canceled");
  }

  const onFocused = new Delegate<[procedure: ProcedureWidget]>();
  const onunFocused = new Delegate<[procedure: ProcedureWidget]>();
  const onMoving = new Delegate<[prevRect: Rectangle, procedure: ProcedureWidget]>();
  const onMoved = new Delegate<[prevRect: Rectangle, procedure: ProcedureWidget]>();


  return { management, enable, disable, cancel, onClick, onFocused, onunFocused, onMoving, onMoved };
}

export type MouseOpManager = ReturnType<typeof useMouseOp>;