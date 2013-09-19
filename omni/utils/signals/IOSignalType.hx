package omni.utils.signals;

/**
*   IOSignalType base interface.
*   Also helps with Ideas autocompletion
**/
interface IOSignalType<T>
{
	var listeners(default, null):List<Dynamic>;
	var numListeners(get_numListeners, null):Int;

	function exists(listener:Dynamic):Bool;

	function remove(listener:Dynamic):Void;
	function removeAll():Void;

	function add(listener:Dynamic):Void;
	function addFirst(listener:Dynamic, ?pos:haxe.PosInfos):Void;
	function addOnce(listener:Dynamic, ?pos:haxe.PosInfos):Void;

	function dispatch(?p1:T, ?p2:T, ?p3:T, ?p4:T, ?pos:haxe.PosInfos):Void;
}