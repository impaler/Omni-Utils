package omni.utils.signals;

import omni.utils.signals.IOSignalType;

/**
*   Signal for dynamic Type checking of multiple parameters
*
*   var sig = new OSignalTypes([String, Int]);
*   sig.dispatchArray("String", 0);
*
**/
class OSignalTypes extends OSignalT<Dynamic> implements IOSignalType<Dynamic>
{

	public var types:Array<Class<Dynamic>>;

	public function new(types:Array<Class<Dynamic>> = null)
	{
		this.types = types;
		super();
	}

	public function dispatchArray(paramaters:Array<Dynamic>, ?pos:haxe.PosInfos):Void
	{
		if(types != null)
		{
			for (i in 0...paramaters.length)
			{
				var name = Type.getClassName(Type.getClass(paramaters[i]));
				var paramName = Type.getClassName(types[i]);



				if(name != paramName )
					throw ( i + 'The first paramater is the wrong type of ' + paramName + ' expecting a '+ name);
			}
		}

		for (o in this.listeners)
		{
			callMethod(o, paramaters, pos);
		}
	}
}