package omni.utils.signals;

import Hash;
import com.eclecticdesignstudio.motion.actuators.GenericActuator;

class OSignalTween
{

    public var onComplete:OSignalTween;
    public var onUpdate:OSignalTween;

    public var properties:Array<Dynamic>;

	//the target

    public function new()
    {
        properties = [];
    }

    public function addTween(target:Dynamic, duration:Float, properties:Dynamic, easing:String = 'Linear.easeNone', overwrite:Bool = true, customActuator:Class<GenericActuator> = null):Void
    {

    }


}
