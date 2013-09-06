package omni.utils.signals;

/**
* 
* Haxe Based Signal Event System
* 
* Provides a basic signal based event system for a custom api and custom features.
* 
* Based on work by ralcr/sdk.ralcr and robertpenner/as3-signals
* 
**/
class OSignalType<T>
{

    private var listeners:List<T>;
    private var exposableListener:T;

    public var enabled:Bool;

    public function new()
    {
        enabled = true;
        removeAll();
    }

    public function add(listener:T):Void
    {
        listeners.add(listener);
    }

    public function addOnce(listener:T, ?pos:haxe.PosInfos):Void
    {
        if (exists(listener))
        {
            //			OCore.error(trace("This listener is already added, it will not be called only once as you expect. " + pos));
        }
        exposableListener = listener;
    }

    public function addFirst(listener:T, ?pos:haxe.PosInfos):Void
    {
        listeners.push(listener);
    }

    public function remove(listener:T):Void
    {
        for (l in listeners)
        {
            if (Reflect.compareMethods(l, listener))
            {
                listeners.remove(l);
                break;
            }
        }
        if (Reflect.compareMethods(exposableListener, listener))
        {
            exposableListener = null;
        }
    }

    public function removeAll():Void
    {
        listeners = new List<T>();
        exposableListener = null;
    }

    public function dispatch(?p1:Dynamic, ?p2:Dynamic, ?p3:Dynamic, ?p4:Dynamic, ?pos:haxe.PosInfos):Void
    {
        if (!enabled) return;
        var args = new Array<Dynamic>();
        for (p in [p1, p2, p3, p4])
            if (p != null)
                args.push(p);
            else
                break;

        for (o in listeners)
        {
            callMethod(o, args, pos);
        }

        if (exposableListener != null)
        {
            callMethod(exposableListener, args, pos);
            exposableListener = null;
        }
    }

    function callMethod(listener:T, ?args:Array<Dynamic>, ?pos:haxe.PosInfos)
    {
        try
        {
            Reflect.callMethod(null, listener, args);
        }
        catch (e:Dynamic)
        {

        }
    }

    public function exists(listener:T):Bool
    {
        for (l in listeners)
        {
            if (l == listener)
                return true;
        }
        return false;
    }

    public function destroy():Void
    {
        listeners = null;
        exposableListener = null;
    }
}

interface IOSignal<T>
{
	function exists(listener:T):Bool;

	function remove(listener:T):Void;
	function removeAll():Void;

	function add(listener:T):Void;
	function addFirst(listener:T, ?pos:haxe.PosInfos):Void;
	function addOnce(listener:T, ?pos:haxe.PosInfos):Void;
}