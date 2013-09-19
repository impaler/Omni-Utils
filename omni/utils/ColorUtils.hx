package omni.utils;

/**
 * ColorUtils
 *
 * Some definitions also from HaxeFlixel
 *
 */
class ColorUtils
{
	public static inline function randomColor():Int
	{
		return Std.int(Math.random() * WHITE);
	}

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

	/**
	 * 0xffff0012
	 */
	static public inline var RED:Int = 0xffff0000;

	/**
	 * 0xffffff00
	 */
	static public inline var YELLOW:Int = 0xffffff00;

	/**
	 * 0xff00f225
	 */
	static public inline var GREEN:Int = 0xff008000;

	/**
	 * 0xff0090e9
	 */
	static public inline var BLUE:Int = 0xff0000ff;

	/**
	 * 0xfff01eff
	 */
	static public inline var PINK:Int = 0xffffc0cb;

	/**
	 * 0xff800080
	 */
	static public inline var PURPLE:Int = 0xff800080;

	/**
	 * 0xffffffff
	 */
	static public inline var WHITE:Int = 0xffffffff;

	/**
	 * 0xff000000
	 */
	static public inline var BLACK:Int = 0xff000000;

	/**
	 * 0xff964B00
	 */
	static public inline var BROWN:Int = 0xff964B00;

	/**
	 * 0x00000000
	 */
	static public inline var TRANSPARENT:Int = 0x00000000;

	/**
	 * Ivory is an off-white color that resembles ivory. 0xfffffff0
	 */
	static public inline var IVORY:Int = 0xfffffff0;

	/**
	 * Beige is a very pale brown. 0xfff5f5dc
	 */
	static public inline var BEIGE:Int = 0xfff5f5dc;

	/**
	 * Wheat is a color that resembles wheat. 0xfff5deb3
	 */
	static public inline var WHEAT:Int = 0xfff5deb3;

	/**
	 * Tan is a pale tone of brown. 0xffd2b48c
	 */
	static public inline var TAN:Int = 0xffd2b48c;

	/**
	 * Khaki is a light shade of yellow-brown similar to tan or beige. 0xffc3b091
	 */
	static public inline var KHAKI:Int = 0xffc3b091;

	/**
	 * Silver is a metallic color tone resembling gray that is a representation of the color of polished silver. 0xffc0c0c0
	 */
	static public inline var SILVER:Int = 0xffc0c0c0;

	/**
	 * Charcoal is a representation of the dark gray color of burned wood. 0xff464646
	 */
	static public inline var CHARCOAL:Int = 0xff464646;

	/**
	 * Navy blue is a dark shade of the color blue. 0xff000080
	 */
	static public inline var NAVY_BLUE:Int = 0xff000080;

	/**
	 * Royal blue is a dark shade of the color blue. 0xff084c9e
	 */
	static public inline var ROYAL_BLUE:Int = 0xff084c9e;

	/**
	 * A medium blue tone. 0xff0000cd
	 */
	static public inline var MEDIUM_BLUE:Int = 0xff0000cd;

	/**
	 * Azure is a color that is commonly compared to the color of the sky on a clear summer's day. 0xff007fff
	 */
	static public inline var AZURE:Int = 0xff007fff;

	/**
	 * Cyan is a color between blue and green. 0xff00ffff
	 */
	static public inline var CYAN:Int = 0xff00ffff;

	/**
	 * Aquamarine is a color that is a bluish tint of cerulean toned toward cyan. 0xff7fffd4
	 */
	static public inline var AQUAMARINE:Int = 0xff7fffd4;

	/**
	 * Teal is a low-saturated color, a bluish-green to dark medium. 0xff008080
	 */
	static public inline var TEAL:Int = 0xff008080;

	/**
	 * Forest green is a green color resembling trees and other plants in a forest. 0xff228b22
	 */
	static public inline var FOREST_GREEN:Int = 0xff228b22;

	/**
	 * Olive is a dark yellowish green or greyish-green color like that of unripe or green olives. 0xff808000
	 */
	static public inline var OLIVE:Int = 0xff808000;

	/**
	 * Chartreuse is a color halfway between yellow and green. 0xff7fff00
	 */
	static public inline var CHARTREUSE:Int = 0xff7fff00;

	/**
	 * Lime is a color three-quarters of the way between yellow and green. 0xffbfff00
	 */
	static public inline var LIME:Int = 0xffbfff00;

	/**
	 * Golden is one of a variety of yellow-brown color blends used to give the impression of the color of the element gold. 0xffffd700
	 */
	static public inline var GOLDEN:Int = 0xffffd700;

	/**
	 * Goldenrod is a color that resembles the goldenrod plant. 0xffdaa520
	 */
	static public inline var GOLDENROD:Int = 0xffdaa520;

	/**
	 * Coral is a pinkish-orange color. 0xffff7f50
	 */
	static public inline var CORAL:Int = 0xffff7f50;

	/**
	 * Salmon is a pale pinkish-orange to light pink color, named after the color of salmon flesh. 0xfffa8072
	 */
	static public inline var SALMON:Int = 0xfffa8072;

	/**
	 * Hot Pink is a more saturated version of the color pink. 0xfffc0fc0
	 */
	static public inline var HOT_PINK:Int = 0xfffc0fc0;

	/**
	 * Fuchsia is a vivid reddish or pink color named after the flower of the fuchsia plant. 0xffff77ff
	 */
	static public inline var FUCHSIA:Int = 0xffff77ff;

	/**
	 * Puce is a brownish-purple color. 0xffcc8899
	 */
	static public inline var PUCE:Int = 0xffcc8899;

	/**
	 * Mauve is a pale lavender-lilac color. 0xffe0b0ff
	 */
	static public inline var MAUVE:Int = 0xffe0b0ff;

	/**
	 * Lavender is a pale tint of violet. 0xffb57edc
	 */
	static public inline var LAVENDER:Int = 0xffb57edc;

	/**
	 * Plum is a deep purple color. 0xff843179
	 */
	static public inline var PLUM:Int = 0xff843179;

	/**
	 * Indigo is a deep and bright shade of blue. 0xff4b0082
	 */
	static public inline var INDIGO:Int = 0xff4b0082;

	/**
	 * Maroon is a dark brownish-red color. 0xff800000
	 */
	static public inline var MAROON:Int = 0xff800000;

	/**
	 * Crimson is a strong, bright, deep red color. 0xffdc143c
	 */
	static public inline var CRIMSON:Int = 0xffdc143c;

	/**
	 * 0xffc0c0c0
	 */
	static public inline var LIGHT_GRAY:Int = 0xc0c0c0;

	/**
	 * 0xff808080
	 */
	static public inline var GRAY:Int = 0x808080;

	/**
	 * 0xff404040
	 */
	static public inline var DARK_GRAY:Int = 0xff404040;

	/**
	 * 0xffca2900
	 */
	static public inline var DARKER_ORANGE:Int = 0xffca2900;

	/**
	 * 0xfffe963e
	 */
	static public inline var ORANGE_BRIGHT:Int = 0xfffe963e;

	/**
	 * 0xffff6c00
	 */
	static public inline var ORANGE:Int = 0xffff6c00;

	/**
	 * 0xffffa360
	 */
	static public inline var LIGHT_ORANGE:Int = 0xffffa360;

	/**
	 * 0xffFFC200
	 */
	static public inline var HALO_ORANGE:Int = 0xffFFC200;

	/**
	 * 0xffd4ff00
	 */
	static public inline var GREEN_LIGHT:Int = 0xffd4ff00;

	/**
	 * 0xff80FF4D
	 */
	static public inline var HALO_GREEN:Int = 0xff80FF4D;

	/**
	 * 0xffff00ff
	 */
	static public inline var MAGENTA:Int = 0xffff00ff;

	/**
	 * 0xff2BF5F5
	 */
	static public inline var HALO_BLUE:Int = 0xff2BF5F5;
}
