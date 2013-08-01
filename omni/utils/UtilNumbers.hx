package omni.utils;

class UtilNumbers
{

    public inline static function random_min_max(max:Float, min:Float = 0):Float
    {
        return Math.random() * ( max - min ) + min;
    }

    public inline static function round_decimal_place(numIn:Float, decimalPlaces:Int):Float
    {
        var nExp:Float = Math.pow(10, decimalPlaces);
        var nRetVal:Float = Math.round(numIn * nExp) / nExp;
        return nRetVal;
    }

    public inline static function clamp(value:Float, min:Float, max:Float):Float
    {
        if (value < min)
            return min;
        else if (value > max)
            return max;
        else
            return value;
    }
}
