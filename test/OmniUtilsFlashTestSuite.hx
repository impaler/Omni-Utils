import signals.OSignalMouseTest;

class OmniUtilsFlashTestSuite extends OmniUtilsTestSuite
{		

	public function new()
	{
		super();

		add(signals.OSignalMouseTest);
	}
}
