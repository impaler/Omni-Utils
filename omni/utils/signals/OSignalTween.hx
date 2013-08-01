package omni.utils.signals;

import Hash;
import com.eclecticdesignstudio.motion.actuators.GenericActuator;

class OSignalTween
{

    public var onComplete:OSignalVoid;
    public var onUpdate:OSignalVoid;

    public var properties:Array<Dynamic>;

    public function new()
    {
        properties = [];
    }

    public function addTween(target:Dynamic, duration:Float, properties:Dynamic, easing:String = 'Linear.easeNone', overwrite:Bool = true, customActuator:Class<GenericActuator> = null):Void
    {

    }


}
