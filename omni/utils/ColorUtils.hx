package omni.utils;

/**
 * ColorUtils
 * Useful color utils
 *
 */
class ColorUtils
{

    /**
 *  Return a random Color
 *
 * @return
 */
    public static inline function randomColor():Int
    {
        return Std.int(Math.random() * WHITE);
    }

    public static var WHITE:Int = 0xffffff;

    public static var LIGHT_GRAY:Int = 0xc0c0c0;

    public static var GRAY:Int = 0x808080;

    public static var DARK_GRAY:Int = 0x404040;

    public static var BLACK:Int = 0x000000;

    public static var RED:Int = 0xff0000;

    public static var PINK:Int = 0xffafaf;

    public static var DARKER_ORANGE:Int = 0xca2900;

    public static var ORANGE_BRIGHT:Int = 0xfe963e;

    public static var ORANGE:Int = 0xff6c00;

    public static var LIGHT_ORANGE:Int = 0xffa360;

    public static var HALO_ORANGE:Int = 0xFFC200;

    public static var YELLOW:Int = 0xffff00;

    public static var GREEN:Int = 0x00ff00;

    public static var GREEN_LIGHT:Int = 0xd4ff00;

    public static var HALO_GREEN:Int = 0x80FF4D;

    public static var MAGENTA:Int = 0xff00ff;

    public static var CYAN:Int = 0x00ffff;

    public static var BLUE:Int = 0x0000ff;

    public static var HALO_BLUE:Int = 0x2BF5F5;

    public static function getRGBWith(r:Int, g:Int, n:Int):Int
    {
        var red:Int = r;
        var green:Int = g;
        var blue:Int = n;
        if (red > 255)
        {
            red = 255;
        }
        if (green > 255)
        {
            green = 255;
        }
        if (blue > 255)
        {
            blue = 255;
        }
        return (red << 16) + (green << 8) + blue;
    }

    public static function darker(rgb:Int, factor:Float = 0.7):Int
    {
        var r:Int = returnRedFromInt(rgb);
        var g:Int = returnGreenFromInt(rgb);
        var b:Int = returnBlueFromInt(rgb);
        return getRGBWith(Std.int(r * factor), Std.int(g * factor), Std.int(b * factor));
    }

    public static function brighter(rgb:Int, factor:Float = .2):Int
    {
        var r:Int = returnRedFromInt(rgb);
        var g:Int = returnGreenFromInt(rgb);
        var b:Int = returnBlueFromInt(rgb);

        var i:Int = Math.floor(1.0 / (1.0 - factor));
        if (r == 0 && g == 0 && b == 0)
        {
            return getRGBWith(Std.int(i), Std.int(i), Std.int(i));
        }
        if (r > 0 && r < i) r = i;
        if (g > 0 && g < i) g = i;
        if (b > 0 && b < i) b = i;

        return getRGBWith(Std.int(r / factor), Std.int(g / factor), Std.int(b / factor));
    }

    public static function returnRedFromInt(rgb:Int):Int
    {
        return (rgb & 0x00FF0000) >> 16;
    }

    public static function returnGreenFromInt(rgb:Int):Int
    {
        return (rgb & 0x0000FF00) >> 8;
    }

    public static function returnBlueFromInt(rgb:Int):Int
    {
        return (rgb & 0x000000FF);
    }
}
