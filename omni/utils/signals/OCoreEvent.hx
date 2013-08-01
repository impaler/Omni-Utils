package omni.utils.signals;

import omni.components.core.OCore;
import flash.events.Event;
import flash.events.FocusEvent;
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
class OCoreEvent extends OSignalType<OCoreEvent -> Void>
{
    inline public static var ACTIVATE = "activate";
    inline public static var ADDED = "added";
    inline public static var ADDED_TO_STAGE = "addedToStage";
    inline public static var CANCEL = "cancel";
    inline public static var CHANGE = "change";
    inline public static var CLOSE = "close";
    inline public static var COMPLETE = "complete";
    inline public static var CONNECT = "connect";
    inline public static var CONTEXT3D_CREATE = "context3DCreate";
    inline public static var DEACTIVATE = "deactivate";
    inline public static var ENTER_FRAME = "enterFrame";
    inline public static var ID3 = "id3";
    inline public static var INIT = "init";
    inline public static var MOUSE_LEAVE = "mouseLeave";
    inline public static var OPEN = "open";
    inline public static var REMOVED = "removed";
    inline public static var REMOVED_FROM_STAGE = "removedFromStage";
    inline public static var RENDER = "render";
    inline public static var RESIZE = "resize";
    inline public static var SCROLL = "scroll";
    inline public static var SELECT = "select";
    inline public static var SOUND_COMPLETE = "soundComplete";
    inline public static var TAB_CHILDREN_CHANGE = "tabChildrenChange";
    inline public static var TAB_ENABLED_CHANGE = "tabEnabledChange";
    inline public static var TAB_INDEX_CHANGE = "tabIndexChange";
    inline public static var UNLOAD = "unload";

    inline public static var FOCUS_IN = "focusin";
    inline public static var FOCUS_OUT = "focusout";
    inline public static var KEY_FOCUS_CHANGE = "keyfocuschange";
    inline public static var MOUSE_FOCUS_CHANGE = "mousefocuschange";

    public var target:Dynamic;
    public var type:String;
    public var event:Event;
    public var delta:Int;

    private var displayTarget:DisplayObjectContainer;

    public function new(type:String, target:DisplayObjectContainer, ?pos:haxe.PosInfos)
    {
        super();

        this.type = type;
        this.target = target;
        this.delta = 0;
        this.displayTarget = target;

        addEventListener(pos);
    }

    function addEventListener(?pos:haxe.PosInfos):Void
    {
        switch (type) {
            case ACTIVATE: displayTarget.addEventListener(Event.ACTIVATE, eventHandler);
            case ADDED: displayTarget.addEventListener(Event.ADDED, eventHandler);
            case ADDED_TO_STAGE: displayTarget.addEventListener(Event.ADDED_TO_STAGE, eventHandler);
            case CANCEL: displayTarget.addEventListener(Event.CANCEL, eventHandler);
            case CHANGE: displayTarget.addEventListener(Event.CHANGE, eventHandler);
            case CLOSE: displayTarget.addEventListener(Event.CLOSE, eventHandler);
            case COMPLETE: displayTarget.addEventListener(Event.COMPLETE, eventHandler);
            case CONNECT: displayTarget.addEventListener(Event.CONNECT, eventHandler);
            case CONTEXT3D_CREATE: displayTarget.addEventListener(Event.CONTEXT3D_CREATE, eventHandler);
            case DEACTIVATE: displayTarget.addEventListener(Event.DEACTIVATE, eventHandler);
            case ENTER_FRAME: displayTarget.addEventListener(Event.ENTER_FRAME, eventHandler);
            case ID3: displayTarget.addEventListener(Event.ID3, eventHandler);
            case INIT: displayTarget.addEventListener(Event.INIT, eventHandler);
            case MOUSE_LEAVE: displayTarget.addEventListener(Event.MOUSE_LEAVE, eventHandler);
            case OPEN: displayTarget.addEventListener(Event.OPEN, eventHandler);
            case REMOVED: displayTarget.addEventListener(Event.REMOVED, eventHandler);
            case REMOVED_FROM_STAGE: displayTarget.addEventListener(Event.REMOVED_FROM_STAGE, eventHandler);
            case RENDER: displayTarget.addEventListener(Event.RENDER, eventHandler);
            case RESIZE: displayTarget.addEventListener(Event.RESIZE, eventHandler);
            case SCROLL: displayTarget.addEventListener(Event.SCROLL, eventHandler);
            case SELECT: displayTarget.addEventListener(Event.SELECT, eventHandler);
            case SOUND_COMPLETE: displayTarget.addEventListener(Event.SOUND_COMPLETE, eventHandler);
            case TAB_CHILDREN_CHANGE: displayTarget.addEventListener(Event.TAB_CHILDREN_CHANGE, eventHandler);
            case TAB_ENABLED_CHANGE: displayTarget.addEventListener(Event.TAB_ENABLED_CHANGE, eventHandler);
            case TAB_INDEX_CHANGE: displayTarget.addEventListener(Event.TAB_INDEX_CHANGE, eventHandler);
            case UNLOAD: displayTarget.addEventListener(Event.UNLOAD, eventHandler);

            case FOCUS_IN: displayTarget.addEventListener(FocusEvent.FOCUS_IN, eventHandler);
            case FOCUS_OUT: displayTarget.addEventListener(FocusEvent.FOCUS_OUT, eventHandler);
            case KEY_FOCUS_CHANGE: displayTarget.addEventListener(FocusEvent.KEY_FOCUS_CHANGE, eventHandler);
            case MOUSE_FOCUS_CHANGE: displayTarget.addEventListener(FocusEvent.MOUSE_FOCUS_CHANGE, eventHandler);

            default: OCore.error("The event you're trying to add does not exist. " + pos);
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

    function removeEventListener()
    {
        switch (type) {
            case ACTIVATE: displayTarget.removeEventListener(Event.ACTIVATE, eventHandler);
            case ADDED: displayTarget.removeEventListener(Event.ADDED, eventHandler);
            case ADDED_TO_STAGE: displayTarget.removeEventListener(Event.ADDED_TO_STAGE, eventHandler);
            case CANCEL: displayTarget.removeEventListener(Event.CANCEL, eventHandler);
            case CHANGE: displayTarget.removeEventListener(Event.CHANGE, eventHandler);
            case CLOSE: displayTarget.removeEventListener(Event.CLOSE, eventHandler);
            case COMPLETE: displayTarget.removeEventListener(Event.COMPLETE, eventHandler);
            case CONNECT: displayTarget.removeEventListener(Event.CONNECT, eventHandler);
            case CONTEXT3D_CREATE: displayTarget.removeEventListener(Event.CONTEXT3D_CREATE, eventHandler);
            case DEACTIVATE: displayTarget.removeEventListener(Event.DEACTIVATE, eventHandler);
            case ENTER_FRAME: displayTarget.removeEventListener(Event.ENTER_FRAME, eventHandler);
            case ID3: displayTarget.removeEventListener(Event.ID3, eventHandler);
            case INIT: displayTarget.removeEventListener(Event.INIT, eventHandler);
            case MOUSE_LEAVE: displayTarget.removeEventListener(Event.MOUSE_LEAVE, eventHandler);
            case OPEN: displayTarget.removeEventListener(Event.OPEN, eventHandler);
            case REMOVED: displayTarget.removeEventListener(Event.REMOVED, eventHandler);
            case REMOVED_FROM_STAGE: displayTarget.removeEventListener(Event.REMOVED_FROM_STAGE, eventHandler);
            case RENDER: displayTarget.removeEventListener(Event.RENDER, eventHandler);
            case RESIZE: displayTarget.removeEventListener(Event.RESIZE, eventHandler);
            case SCROLL: displayTarget.removeEventListener(Event.SCROLL, eventHandler);
            case SELECT: displayTarget.removeEventListener(Event.SELECT, eventHandler);
            case SOUND_COMPLETE: displayTarget.removeEventListener(Event.SOUND_COMPLETE, eventHandler);
            case TAB_CHILDREN_CHANGE: displayTarget.removeEventListener(Event.TAB_CHILDREN_CHANGE, eventHandler);
            case TAB_ENABLED_CHANGE: displayTarget.removeEventListener(Event.TAB_ENABLED_CHANGE, eventHandler);
            case TAB_INDEX_CHANGE: displayTarget.removeEventListener(Event.TAB_INDEX_CHANGE, eventHandler);
            case UNLOAD: displayTarget.removeEventListener(Event.UNLOAD, eventHandler);

            case FOCUS_IN: displayTarget.removeEventListener(FocusEvent.FOCUS_IN, eventHandler);
            case FOCUS_OUT: displayTarget.removeEventListener(FocusEvent.FOCUS_OUT, eventHandler);
            case KEY_FOCUS_CHANGE: displayTarget.removeEventListener(FocusEvent.KEY_FOCUS_CHANGE, eventHandler);
            case MOUSE_FOCUS_CHANGE: displayTarget.removeEventListener(FocusEvent.MOUSE_FOCUS_CHANGE, eventHandler);
        }
    }

    function eventHandler(e:Event)
    {
        this.event = e;
        dispatch(this);
    }

    override public function destroy():Void
    {
        removeEventListener();
        super.destroy();
    }
}
