package omni.utils.signals;

interface IOSignalType<T>
{
	var length(get_length, null):Int;

	function exists(listener:Dynamic):Bool;

	function remove(listener:Dynamic):Void;
	function removeAll():Void;

	function add(listener:Dynamic):Void;
	function addFirst(listener:Dynamic, ?pos:haxe.PosInfos):Void;
	function addOnce(listener:Dynamic, ?pos:haxe.PosInfos):Void;

	function dispatch(?p1:T, ?p2:T, ?p3:T, ?p4:T, ?pos:haxe.PosInfos):Void;
}