package signals;

import massive.munit.Assert;

import omni.utils.signals.OSignalInt;

class OSignalIntTest
{
	private var p1:Int;
	private var p2:Int;
	private var p3:Int;
	private var p4:Int;

	@Before
	public function setup():Void
	{
		p1 = Std.int(Math.random());
		p2 = Std.int(Math.random());
		p3 = Std.int(Math.random());
		p4 = Std.int(Math.random());
	}

	@Test
	public function testIntReturn():Void
	{
		var signal1 = new OSignalInt();
		signal1.add(function(testy:Int):Void{p1 = testy;});
		signal1.dispatch(32);

		Assert.isTrue(p1 == 32);

		var signal2 = new OSignalInt();
		signal2.add(function(p1Value:Int, p2Value:Int):Void{p1 = p1Value; p2 = p2Value;});
		signal2.dispatch(787, 444);

		Assert.isTrue(p1 == 787);
		Assert.isTrue(p2 == 444);

		var signal3 = new OSignalInt();
		signal3.add(function(p1Value:Int, p2Value:Int, p3Value:Int):Void{
			p1 = p1Value; p2 = p2Value; p3 = p3Value; });
		signal3.dispatch(1818, 478, 9238);

		Assert.isTrue(p1 == 1818);
		Assert.isTrue(p2 == 478);
		Assert.isTrue(p3 == 9238);

		var signal4 = new OSignalInt();
		signal4.add(function(p1Value:Int, p2Value:Int, p3Value:Int, p4Value:Int):Void{
			p1 = p1Value; p2 = p2Value; p3 = p3Value; p4 = p4Value;});

		signal4.dispatch(1324, 3485, 9345, 3495);

		Assert.isTrue(p1 == 1324);
		Assert.isTrue(p2 == 3485);
		Assert.isTrue(p3 == 9345);
		Assert.isTrue(p4 == 3495);
	}
}