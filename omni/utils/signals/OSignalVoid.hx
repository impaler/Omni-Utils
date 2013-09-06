package omni.utils.signals;

import omni.utils.signals.OSignalType.IOSignal;

class OSignalVoid extends OSignalType<Void -> Void> implements IOSignal<Void -> Void> {}