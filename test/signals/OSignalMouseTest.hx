package signals;

import flash.events.MouseEvent;
import flash.Lib;

import massive.munit.Assert;

import omni.utils.signals.OSignalMouse;

class OSignalMouseTest
{

	private var down:Bool;
	private var downCount:Int;
	private var downX:Float;

	private var up:Bool;
	private var upCount:Int;

	@Before
	public function setup():Void
	{
		down = false;
		downCount = 0;
		downX = 0;

		up = false;
		upCount = 0;
	}

	@Test
	public function testMouseDown():Void
	{
		var mouseDown = new OSignalMouse(OSignalMouse.MOUSE_DOWN, Lib.current);
		mouseDown.add(function(event:OSignalMouse):Void{down = true; downCount++; downX = event.event.localX;});

		for( i in 0...4 )
		{
			Lib.current.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_DOWN, true, false, 220, 220));
		}

		Assert.isTrue(down);
		Assert.isTrue(downX == 220);
		Assert.isTrue(downCount == 4);
	}

	@Test
	public function testMouseUp():Void
	{
		var mouseDown = new OSignalMouse(OSignalMouse.MOUSE_UP, Lib.current);
		mouseDown.add(function(event:OSignalMouse):Void{up = true; upCount++;});

		for( i in 0...6 )
		{
			Lib.current.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_UP, true, false, 0, 0));
		}

		Assert.isTrue(up);
		Assert.isTrue(upCount == 6);
	}

}