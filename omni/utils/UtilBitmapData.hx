package omni.utils;

import flash.display.PixelSnapping;
import flash.geom.Rectangle;
import flash.geom.Matrix;
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.Sprite;
import flash.display.DisplayObject;

class UtilBitmapData
{

    public static function fitIntoRect(displayObject:DisplayObject, rectangle:Rectangle, fillRect:Bool = true, align:String = "MIDDLE", applyTransform:Bool = true):Matrix
    {
        var matrix:Matrix = new Matrix();

        var widthSource:Float = displayObject.width / displayObject.scaleX;
        var heightSource:Float = displayObject.height / displayObject.scaleY;

        var widthRect:Float = rectangle.width;
        var heightRect:Float = rectangle.height;

        var scaleX:Float = widthRect / widthSource;
        var scaleY:Float = heightRect / heightSource;

        var ratioSource:Float = widthSource / heightSource;
        var ratioRect:Float = widthRect / heightRect;

        var scaleH:Float = fillRect ? scaleY : scaleX;
        var scaleV:Float = fillRect ? scaleX : scaleY;

        var targetScale:Float = ratioSource >= ratioRect ? scaleH : scaleV;
        var targetWidth:Float = widthSource * targetScale;
        var targetHeight:Float = heightSource * targetScale;

        var targetX:Float = 0.0;
        var targetY:Float = 0.0;

        switch(align)
        {
            case OStates.LEFT :
                targetX = 0.0;
            case OStates.TOP_LEFT :
                targetX = 0.0;
            case OStates.BOTTOM_LEFT :
                targetX = 0.0;

            case OStates.RIGHT :
                targetX = targetWidth - widthRect;
            case OStates.TOP_RIGHT :
                targetX = targetWidth - widthRect;
            case OStates.BOTTOM_RIGHT :
                targetX = targetWidth - widthRect;

            case OStates.MIDDLE :
                targetX = 0.5 * (targetWidth - widthRect);
        }

        switch(align)
        {
            case OStates.TOP :
                targetY = 0.0;
            case OStates.TOP_LEFT :
                targetY = 0.0;
            case OStates.TOP_RIGHT :
                targetY = 0.0;

            case OStates.BOTTOM :
                targetY = targetHeight - heightRect;
            case OStates.BOTTOM_LEFT :
                targetY = targetHeight - heightRect;
            case OStates.BOTTOM_RIGHT :
                targetY = targetHeight - heightRect;

            case OStates.MIDDLE :
                targetY = 0.5 * (targetHeight - heightRect);
        }

        matrix.scale(targetScale, targetScale);
        matrix.translate(rectangle.left - targetX, rectangle.top - targetY);

        if (applyTransform)
        {
            displayObject.transform.matrix = matrix;
        }

        return matrix;
    }

    public static inline function fitIntoRectBitmapData(data:BitmapData, width:Int, height:Int, align:String = "MIDDLE", transparent:Bool = false, fill:Bool = true, bgColor:Int = 0x0, smooth:Bool = true):Bitmap
    {
        var sourceBitmap:Bitmap = new Bitmap(data);

        #if neko
		var color = {rgb: bgColor, a: 0xff}
        var newBitmap:BitmapData = new BitmapData(width, height, transparent);
        #else
		var newBitmap:BitmapData = new BitmapData(width, height, transparent, bgColor);
		#end

        newBitmap.draw(data, fitIntoRect(sourceBitmap, newBitmap.rect, fill, align, false), null, null, null, smooth);
        sourceBitmap = null;

        return new Bitmap(newBitmap, PixelSnapping.AUTO, smooth);
    }

    public static inline function arrangeVBox(array:Array<DisplayObject>, padding:Int = 10, ?parent:DisplayObject):Void
    {
        var last = 0;
        if (parent != null)
            last = Std.int(parent.y);

        for (i in 0...array.length)
        {
            var o = array[i];
            o.y = last;
            if (parent != null)
                o.x = parent.x;

            last = Std.int(o.y + o.height) + padding;
        }
    }

    public static inline function arrangeHBox(array:Array<DisplayObject>, padding:Int = 10, ?parent:DisplayObject):Void
    {
        var last = 0;
        if (parent != null)
            last = Std.int(parent.x);

        for (i in 0...array.length)
        {
            var o = array[i];
            o.x = last;
            if (parent != null)
                o.y = parent.y;

            last = Std.int(o.x + o.width) + padding;
        }
    }

}

class LayoutArray extends Sprite
{

    public var members:Array<DisplayObject>;
    public var padding:Int;
    public var direction:String;

    public function new(direction:String = "VERTICAL"):Void
    {
        super();
        this.direction = direction;
        members = new Array();
    }

    public function add(object:DisplayObject, autoDraw:Bool = true):Void
    {
        members.push(object);
        addChild(object);

        if (autoDraw)
            draw();
    }

    public function remove(object:DisplayObject):Void
    {
        members.remove(object);
        removeChild(object);
    }

    public function draw():Void
    {
        if (direction == OStates.HORIZONTAL)
        {
            UtilBitmapData.arrangeHBox(members, padding, this);
        }
        else
        {
            UtilBitmapData.arrangeVBox(members, padding, this);
        }
    }
}

