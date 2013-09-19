import massive.munit.TestSuite;

import signals.OSignalTest;
import signals.OSignalIntTest;

class OmniUtilsTestSuite extends massive.munit.TestSuite
{		

	public function new()
	{
		super();

		add(signals.OSignalTest);
		add(signals.OSignalIntTest);
	}
}
