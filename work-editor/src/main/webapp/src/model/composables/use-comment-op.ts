import { Delegate } from "../delegate";
import { CommentWidget, EditAreaWidget, Point2D } from "types/my-types";
import { Work } from "../workflow/work";



export default function useCommentWidget(work: Work, area: EditAreaWidget)
{
  const comments = work.comments;

  //移動中のオブジェクト
  type MovingWidget =
  {
    //移動開始時のオブジェクトの座標
    prevCoord: Point2D,

    //移動対象のCommentWidget
    widget: CommentWidget,
  };


  const management = {
    isWidgetDragged: false,        //ウィジェット移動状態かどうか
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

  const onClick = (e: MouseEvent, widget: CommentWidget) =>
  {
    const mousePoint = getMousePos(e);

    management.mousePoint = mousePoint;
    management.isWidgetDragged = true;
    
    management.movings.push( { prevCoord: { ...widget.coord }, widget: widget } );
  };

  const mousemove = (e: MouseEvent) =>
  {
    const mousePoint = getMousePos(e);
    //console.log("mousePoint: (" + mousePoint.x + ", " + mousePoint.y + ")");

    if (management.isWidgetDragged)
    {
      for (const target of management.movings)
      {
        let nextX = target.prevCoord.x + (mousePoint.x - management.mousePoint.x) / area.scale;
        let nextY = target.prevCoord.y + (mousePoint.y - management.mousePoint.y) / area.scale;

        //移動先が範囲外の場合は範囲内に収まるように移動する
        if(nextX < 0)
        {
          nextX = 0;
        }
        if(nextX > area.rect.width)
        {
          nextX = area.rect.width;
        }
        if(nextY < 0)
        {
          nextY = 0;
        }
        if(nextY > area.rect.height)
        {
          nextY = area.rect.height;
        }

        const prevCoord = { ...target.widget.coord };
        target.widget.coord.x = nextX;
        target.widget.coord.y = nextY;
        
        onMoving.run(prevCoord, target.widget);

        //console.log(target.element.style.left);
      }
    }
  }

  const mouseup = (e: MouseEvent) =>
  {
    if(management.isWidgetDragged)
    {
      management.isWidgetDragged = false;

      for(const target of management.movings)
      {
        onMoved.run(target.prevCoord, target.widget);
      }
      
      management.movings = [] as MovingWidget[];
    }
  }


  const enable = () =>
  {
    area.isMouseOpMode = true;

    document.addEventListener('mouseup', mouseup);
    document.addEventListener('mousemove', mousemove);
  }

  const disable = () =>
  {
    area.isMouseOpMode = false;

    document.removeEventListener('mouseup', mouseup);
    document.removeEventListener('mousemove', mousemove);
  }

  const onFocused = new Delegate<[widget: CommentWidget]>();
  const onunFocused = new Delegate<[widget: CommentWidget]>();
  const onMoving = new Delegate<[prevCoord: Point2D, widget: CommentWidget]>();
  const onMoved = new Delegate<[prevCoord: Point2D, widget: CommentWidget]>();


  return { management, enable, disable, onClick, onFocused, onunFocused, onMoving, onMoved };
}

export type MouseOpManagerProps = ReturnType<typeof useCommentWidget>;