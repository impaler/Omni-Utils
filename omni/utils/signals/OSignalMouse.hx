package omni.utils.signals;

import omni.components.core.OCore;
import flash.events.MouseEvent;
import flash.display.DisplayObjectContainer;

/**
* 
* NME Based Mouse Signal
* 
* Provides a new API and organisation for the event system of all mouse events to an nme.display
* .DisplayObjectContainer.
* 
* Based on work by ralcr/sdk.ralcr and robertpenner/as3-signals
* 
**/
class OSignalMouse extends OSignalType<OSignalMouse -> Void>
{

    inline public static var CLICK = "mouseclick";
    inline public static var DOUBLE_CLICK = "mousedoubleclick";
    inline public static var MOUSE_DOWN = "mousedown";
    inline public static var MOUSE_MOVE = "mousemove";
    inline public static var MOUSE_OUT = "mouseout";
    inline public static var MOUSE_OVER = "mouseover";
    inline public static var MOUSE_UP = "mouseup";
    inline public static var MOUSE_WHEEL = "mousewheel";
    inline public static var ROLL_OUT = "rollout";
    inline public static var ROLL_OVER = "rollover";

    public var target:Dynamic;
    public var type:String;
    public var event:MouseEvent;
    public var delta:Int;

    private var displayTarget:DisplayObjectContainer;

    public function new(type:String, target:DisplayObjectContainer, ?pos:haxe.PosInfos)
    {
        super();

        this.type = type;
        this.target = target;
        this.delta = 0;
        this.displayTarget = target;

        if (type == DOUBLE_CLICK)
            target.doubleClickEnabled = true;

        addEventListener(pos);
    }

    function addEventListener(?pos:haxe.PosInfos):Void
    {
        switch (type) {
            case CLICK: displayTarget.addEventListener(MouseEvent.CLICK, mouseHandler);
            case DOUBLE_CLICK: displayTarget.addEventListener(MouseEvent.DOUBLE_CLICK, mouseHandler);
            case MOUSE_DOWN: displayTarget.addEventListener(MouseEvent.MOUSE_DOWN, mouseHandler);
            case MOUSE_MOVE: displayTarget.addEventListener(MouseEvent.MOUSE_MOVE, mouseHandler);
            case MOUSE_OUT: displayTarget.addEventListener(MouseEvent.MOUSE_OUT, mouseHandler);
            case MOUSE_OVER: displayTarget.addEventListener(MouseEvent.MOUSE_OVER, mouseHandler);
            case MOUSE_UP: displayTarget.addEventListener(MouseEvent.MOUSE_UP, mouseHandler);
            case MOUSE_WHEEL: displayTarget.addEventListener(MouseEvent.MOUSE_WHEEL, mouseHandler);
            case ROLL_OUT: displayTarget.addEventListener(MouseEvent.ROLL_OUT, mouseHandler);
            case ROLL_OVER: displayTarget.addEventListener(MouseEvent.ROLL_OVER, mouseHandler);
            default: OCore.error("The mouse event you're trying to add does not exist. " + pos);
        }
    }

    function removeEventListener()
    {
        switch (type) {
            case CLICK: displayTarget.removeEventListener(MouseEvent.CLICK, mouseHandler);
            case DOUBLE_CLICK: displayTarget.removeEventListener(MouseEvent.DOUBLE_CLICK, mouseHandler);
            case MOUSE_DOWN: displayTarget.removeEventListener(MouseEvent.MOUSE_DOWN, mouseHandler);
            case MOUSE_MOVE: displayTarget.removeEventListener(MouseEvent.MOUSE_MOVE, mouseHandler);
            case MOUSE_OUT: displayTarget.removeEventListener(MouseEvent.MOUSE_OUT, mouseHandler);
            case MOUSE_OVER: displayTarget.removeEventListener(MouseEvent.MOUSE_OVER, mouseHandler);
            case MOUSE_UP: displayTarget.removeEventListener(MouseEvent.MOUSE_UP, mouseHandler);
            case MOUSE_WHEEL: displayTarget.removeEventListener(MouseEvent.MOUSE_WHEEL, mouseHandler);
            case ROLL_OUT: displayTarget.removeEventListener(MouseEvent.ROLL_OUT, mouseHandler);
            case ROLL_OVER: displayTarget.removeEventListener(MouseEvent.ROLL_OVER, mouseHandler);
        }
    }

    public function disable():Void
    {
        removeEventListener();
    }

    public function enable():Void
    {
        addEventListener();
    }

    function mouseHandler(e:MouseEvent)
    {
        this.event = e;
        this.delta = e.delta;
        dispatch(this);
    }

    public function updateAfterEvent():Void
    {
        event.updateAfterEvent();
    }

    override public function destroy():Void
    {
        removeEventListener();
        super.destroy();
    }
}