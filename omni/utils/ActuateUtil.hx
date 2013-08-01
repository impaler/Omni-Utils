package omni.utils;

import com.eclecticdesignstudio.motion.easing.IEasing;
import com.eclecticdesignstudio.motion.Actuate;
import com.eclecticdesignstudio.motion.actuators.GenericActuator;

import com.eclecticdesignstudio.motion.easing.Quad;
import com.eclecticdesignstudio.motion.easing.Expo;
import com.eclecticdesignstudio.motion.easing.Bounce;
import com.eclecticdesignstudio.motion.easing.Linear;
import com.eclecticdesignstudio.motion.easing.Quint;
import com.eclecticdesignstudio.motion.easing.Elastic;
import com.eclecticdesignstudio.motion.easing.Back;
import com.eclecticdesignstudio.motion.easing.Quart;
import com.eclecticdesignstudio.motion.easing.Cubic;
import com.eclecticdesignstudio.motion.easing.Sine;

/**
* Shortcuts for Actuate
* Type safe and static refs to Ease Types
* 
**/

class ActuateUtil
{
    public static var Quad_easeInOut = "Quad.easeInOut";
    public static var Quad_easeOut = "Quad.easeOut";
    public static var Quad_easeIn = "Quad.easeIn";

    public static var Expo_easeInOut = "Expo.easeInOut";
    public static var Expo_easeOut = "Expo.easeOut";
    public static var Expo_easeIn = "Expo.easeIn";

    public static var Bounce_easeInOut = "Bounce.easeInOut";
    public static var Bounce_easeOut = "Bounce.easeOut";
    public static var Bounce_easeIn = "Bounce.easeIn";

    public static var Quint_easeInOut = "Quint.easeInOut";
    public static var Quint_easeOut = "Quint.easeOut";
    public static var Quint_easeIn = "Quint.easeIn";

    public static var Elastic_easeInOut = "Elastic.easeInOut";
    public static var Elastic_easeOut = "Elastic.easeOut";
    public static var Elastic_easeIn = "Elastic.easeIn";

    public static var Back_easeInOut = "Back.easeInOut";
    public static var Back_easeOut = "Back.easeOut";
    public static var Back_easeIn = "Back.easeIn";

    public static var Quart_easeInOut = "Quart.easeInOut";
    public static var Quart_easeOut = "Quart.easeOut";
    public static var Quart_easeIn = "Quart.easeIn";

    public static var Cubic_easeInOut = "Cubic.easeInOut";
    public static var Cubic_easeOut = "Cubic.easeOut";
    public static var Cubic_easeIn = "Cubic.easeIn";

    public static var Sine_easeInOut = "Sine.easeInOut";
    public static var Sine_easeOut = "Sine.easeOut";
    public static var Sine_easeIn = "Sine.easeIn";

    public static var Linear_easeNone = "Linear.easeNone";

    public function new()
    {
    }

    public static inline function tweenYPosition(target:Dynamic, duration:Float, ypos:Float, easing:String, overwrite:Bool = true, customActuator:Class<GenericActuator> = null):IGenericActuator
    {
        return tween(target, duration, {y:ypos}, easing, overwrite, customActuator);
    }

    public static inline function tweenXPosition(target:Dynamic, duration:Float, xpos:Float, easing:String, overwrite:Bool = true, customActuator:Class<GenericActuator> = null):IGenericActuator
    {
        return tween(target, duration, {x:xpos}, easing, overwrite, customActuator);
    }

    public static inline function tweenPosition(target:Dynamic, duration:Float, xpos:Float, ypos:Float, easing:String, overwrite:Bool = true, customActuator:Class<GenericActuator> = null):IGenericActuator
    {
        return tween(target, duration, {x:xpos, y:ypos}, easing, overwrite, customActuator);
    }

    public static inline function tweenAlpha(target:Dynamic, duration:Float, alpha:Float, easing:String, overwrite:Bool = true, customActuator:Class<GenericActuator> = null):IGenericActuator
    {
        return tween(target, duration, {alpha:alpha}, easing, overwrite, customActuator);
    }

    public static inline function tweenSize(target:Dynamic, duration:Float, width:Float, height:Float, easing:String, overwrite:Bool = true, customActuator:Class<GenericActuator> = null):IGenericActuator
    {
        return tween(target, duration, {width:width, height:height}, easing, overwrite, customActuator);
    }

    public static inline function tween(target:Dynamic, duration:Float, properties:Dynamic, easing:String = 'Linear.easeNone', overwrite:Bool = true, customActuator:Class<GenericActuator> = null):IGenericActuator
    {
        var actuator:IGenericActuator;

        switch(easing){
            case Quad_easeInOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Quad.easeInOut);
            case Quad_easeOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Quad.easeOut);
            case Quad_easeIn : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Quad.easeIn);
            case Expo_easeInOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Expo.easeInOut);
            case Expo_easeOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Expo.easeOut);
            case Expo_easeIn : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Expo.easeIn);
            case Bounce_easeInOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Bounce.easeInOut);
            case Bounce_easeOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Bounce.easeOut);
            case Bounce_easeIn : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Bounce.easeIn);
            case Quint_easeInOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Quint.easeInOut);
            case Quint_easeOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Quint.easeOut);
            case Quint_easeIn : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Quint.easeIn);
            case Elastic_easeInOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Elastic.easeInOut);
            case Elastic_easeOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Elastic.easeOut);
            case Elastic_easeIn : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Elastic.easeIn);
            case Back_easeInOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Back.easeInOut);
            case Back_easeOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Back.easeOut);
            case Back_easeIn : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Back.easeIn);
            case Quart_easeInOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Quart.easeInOut);
            case Quart_easeOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Quart.easeOut);
            case Quart_easeIn : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Quart.easeIn);
            case Cubic_easeInOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Cubic.easeInOut);
            case Cubic_easeOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Cubic.easeOut);
            case Cubic_easeIn : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Cubic.easeIn);
            case Sine_easeInOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Sine.easeInOut);
            case Sine_easeOut : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Sine.easeOut);
            case Sine_easeIn : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Sine.easeIn);
            case Linear_easeNone : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Linear.easeNone);
            default : actuator = Actuate.tween(target, duration, properties, overwrite, customActuator).ease(Linear.easeNone);
        }

        return actuator;
    }

    public static function tweenStop(target:Dynamic, properties:Dynamic = null, complete:Bool = false, sendEvent:Bool = false):Void
    {
        Actuate.stop(target, properties, complete, sendEvent);
    }

}
