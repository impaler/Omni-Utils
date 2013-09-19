import massive.munit.TestSuite;

import signals.OSignalIntTest;
import signals.OSignalMouseTest;
import signals.OSignalTest;
import signals.OSignalTTest;

/**
 * Auto generated Test Suite for MassiveUnit.
 * Refer to munit command line tool for more information (haxelib run munit)
 */

class TestSuite extends massive.munit.TestSuite
{		

	public function new()
	{
		super();

		add(signals.OSignalIntTest);
		add(signals.OSignalMouseTest);
		add(signals.OSignalTest);
		add(signals.OSignalTTest);
	}
}
