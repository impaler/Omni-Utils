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
class OSignalT<T>
{

	public var listeners(default, null):List<Dynamic>;
	private var exposableListener:Dynamic;

	public var numListeners(get_numListeners, null):Int;

	@isVar public var enabled(default, set_enabled):Bool;

	public function new()
	{
		listeners = new List<Dynamic>();
		enabled = true;
		removeAll();
	}

	public function set_enabled(value:Bool):Bool
	{
		enabled = value;
		return enabled;
	}

	public function get_numListeners():Int
	{
		return listeners.length;
	}

	public function add(listener:Dynamic):Void
	{
		listeners.add(listener);
	}

	public function addOnce(listener:Dynamic, ?pos:haxe.PosInfos):Void
	{
		if (exists(listener))
		{
			//			OCore.error(trace("This listener is already added, it will not be called only once as you expect. " + pos));
		}
		exposableListener = listener;
	}

	public function addFirst(listener:Dynamic, ?pos:haxe.PosInfos):Void
	{
		listeners.push(listener);
	}

	public function remove(listener:Dynamic):Void
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
		listeners = new List<Dynamic>();
		exposableListener = null;
	}

	public function dispatch(p1:T = null, p2:T = null, p3:T = null, p4:T = null, ?pos:haxe.PosInfos):Void
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

	function callMethod(listener:Dynamic, ?args:Array<Dynamic>, ?pos:haxe.PosInfos)
	{
		try
		{
			Reflect.callMethod(null, listener, args);
		}
		catch (e:Dynamic)
		{

		}
	}

	public function exists(listener:Dynamic):Bool
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