package signals;

import massive.munit.util.Timer;
import massive.munit.Assert;

import omni.utils.signals.OSignalDynamic;

class OSignalDynamicTest
{
	private var dispatched:Bool;
	private var addOnce:Int;
	private var signalVoidDispatched:Int;

	@Before
	public function setup():Void
	{
		dispatched = false;
		signalVoidDispatched = 0;
		addOnce = 0;
	}

	@Test
	public function testExample():Void
	{
		var signal = new OSignalDynamic();
		signal.add( function(){dispatched = true;});
		signal.dispatch();

		Assert.isTrue(dispatched);
	}

	@Test
	public function testAddMultiDispatch():Void
	{
		var signal = new OSignalDynamic();
		signal.add( function(){signalVoidDispatched++;});

		for( i in 0...4 ) {
			signal.dispatch();
		}

		Assert.isTrue(signalVoidDispatched == 4);
	}

	@Test
	public function testAddOnceDispatch():Void
	{
		var signal = new OSignalDynamic();
		signal.addOnce( function(){addOnce++;} );

		for (i in 0...10)
		{
			signal.dispatch();
		}

		Assert.isTrue(addOnce == 1);
	}

	@Test
	public function testExists():Void
	{
		var testFunction = function(){};
		
		var signal = new OSignalDynamic();
		signal.add( testFunction );

		Assert.isTrue(signal.exists(testFunction));

		var signalFalse = new OSignalDynamic();
		Assert.isFalse(signalFalse.exists(testFunction));
	}

	@Test
	public function testRemove():Void
	{
		var testFunction0 = function(){};
		var testFunction1 = function(){};
		var testFunction2 = function(){};
		var testFunction3 = function(){};

		var signal = new OSignalDynamic();
		signal.add( testFunction0 );
		signal.add( testFunction1 );
		signal.add( testFunction2 );
		signal.add( testFunction3 );

		Assert.isTrue(signal.exists(testFunction0));

		signal.remove( testFunction0 );

		Assert.isFalse(signal.exists(testFunction0));
		Assert.isTrue(signal.exists(testFunction1));
		Assert.isTrue(signal.length == 3);

		signal.removeAll();

		Assert.isTrue(signal.length == 0);
		Assert.isFalse(signal.exists(testFunction0));
	}

	@Test
	public function testLength():Void
	{
		var testFunction0 = function(){};
		var testFunction1 = function(){};
		var testFunction2 = function(){};
		var testFunction3 = function(){};

		var signal = new OSignalDynamic();
		signal.add( testFunction0 );
		signal.add( testFunction1 );
		signal.add( testFunction2 );
		signal.add( testFunction3 );

		Assert.isFalse(signal.length == 0);
		Assert.isTrue(signal.length == 4);
	}

}