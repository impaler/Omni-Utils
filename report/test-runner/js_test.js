(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { }
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
var IMap = function() { }
IMap.__name__ = ["IMap"];
var Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.deleteField = function(o,field) {
	if(!Reflect.hasField(o,field)) return false;
	delete(o[field]);
	return true;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
}
var Std = function() { }
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
}
var StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	return quotes?s.split("\"").join("&quot;").split("'").join("&#039;"):s;
}
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
}
var TestMain = function() {
	var suites = new Array();
	suites.push(TestSuite);
	var client = new massive.munit.client.RichPrintClient();
	var httpClient = new massive.munit.client.HTTPClient(new massive.munit.client.SummaryReportClient());
	var runner = new massive.munit.TestRunner(client);
	runner.addResultClient(httpClient);
	runner.completionHandler = $bind(this,this.completionHandler);
	runner.run(suites);
};
TestMain.__name__ = ["TestMain"];
TestMain.main = function() {
	new TestMain();
}
TestMain.prototype = {
	completionHandler: function(successful) {
		try {
			eval("testResult(" + Std.string(successful) + ");");
		} catch( e ) {
		}
	}
	,__class__: TestMain
}
var massive = {}
massive.munit = {}
massive.munit.TestSuite = function() {
	this.tests = new Array();
	this.index = 0;
};
massive.munit.TestSuite.__name__ = ["massive","munit","TestSuite"];
massive.munit.TestSuite.prototype = {
	sortByName: function(x,y) {
		var xName = Type.getClassName(x);
		var yName = Type.getClassName(y);
		if(xName == yName) return 0;
		if(xName > yName) return 1; else return -1;
	}
	,sortTests: function() {
		this.tests.sort($bind(this,this.sortByName));
	}
	,repeat: function() {
		if(this.index > 0) this.index--;
	}
	,next: function() {
		return this.hasNext()?this.tests[this.index++]:null;
	}
	,hasNext: function() {
		return this.index < this.tests.length;
	}
	,add: function(test) {
		this.tests.push(test);
		this.sortTests();
	}
	,__class__: massive.munit.TestSuite
}
var TestSuite = function() {
	massive.munit.TestSuite.call(this);
	this.add(signals.OSignalDynamicTest);
	this.add(signals.OSignalIntTest);
};
TestSuite.__name__ = ["TestSuite"];
TestSuite.__super__ = massive.munit.TestSuite;
TestSuite.prototype = $extend(massive.munit.TestSuite.prototype,{
	__class__: TestSuite
});
var ValueType = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
var haxe = {}
haxe.StackItem = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.CallStack = function() { }
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.exceptionStack = function() {
	return [];
}
haxe.Http = function(url) {
	this.url = url;
	this.headers = new haxe.ds.StringMap();
	this.params = new haxe.ds.StringMap();
	this.async = true;
};
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.prototype = {
	onStatus: function(status) {
	}
	,onError: function(msg) {
	}
	,onData: function(data) {
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = js.Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = r.status;
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) me.onData(me.responseData = r.responseText); else if(s == null) me.onError("Failed to connect or resolve host"); else switch(s) {
			case 12029:
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.onError("Unknown host");
				break;
			default:
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.keys();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode(this.params.get(p));
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		if(this.headers.get("Content-Type") == null && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.keys();
		while( $it1.hasNext() ) {
			var h = $it1.next();
			r.setRequestHeader(h,this.headers.get(h));
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,setPostData: function(data) {
		this.postData = data;
		return this;
	}
	,setHeader: function(header,value) {
		this.headers.set(header,value);
		return this;
	}
	,__class__: haxe.Http
}
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.ds = {}
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
haxe.rtti = {}
haxe.rtti.Meta = function() { }
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getFields = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.fields == null?{ }:meta.fields;
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0, _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Browser = function() { }
js.Browser.__name__ = ["js","Browser"];
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
}
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
massive.haxe = {}
massive.haxe.Exception = function(message,info) {
	this.message = message;
	this.info = info;
	this.type = massive.haxe.util.ReflectUtil.here({ fileName : "Exception.hx", lineNumber : 70, className : "massive.haxe.Exception", methodName : "new"}).className;
};
massive.haxe.Exception.__name__ = ["massive","haxe","Exception"];
massive.haxe.Exception.prototype = {
	toString: function() {
		var str = this.type + ": " + this.message;
		if(this.info != null) str += " at " + this.info.className + "#" + this.info.methodName + " (" + this.info.lineNumber + ")";
		return str;
	}
	,__class__: massive.haxe.Exception
}
massive.haxe.util = {}
massive.haxe.util.ReflectUtil = function() { }
massive.haxe.util.ReflectUtil.__name__ = ["massive","haxe","util","ReflectUtil"];
massive.haxe.util.ReflectUtil.here = function(info) {
	return info;
}
massive.munit.Assert = function() { }
massive.munit.Assert.__name__ = ["massive","munit","Assert"];
massive.munit.Assert.isTrue = function(value,info) {
	massive.munit.Assert.assertionCount++;
	if(value != true) massive.munit.Assert.fail("Expected TRUE but was [" + Std.string(value) + "]",info);
}
massive.munit.Assert.isFalse = function(value,info) {
	massive.munit.Assert.assertionCount++;
	if(value != false) massive.munit.Assert.fail("Expected FALSE but was [" + Std.string(value) + "]",info);
}
massive.munit.Assert.isNull = function(value,info) {
	massive.munit.Assert.assertionCount++;
	if(value != null) massive.munit.Assert.fail("Value [" + Std.string(value) + "] was not NULL",info);
}
massive.munit.Assert.isNotNull = function(value,info) {
	massive.munit.Assert.assertionCount++;
	if(value == null) massive.munit.Assert.fail("Value [" + Std.string(value) + "] was NULL",info);
}
massive.munit.Assert.isNaN = function(value,info) {
	massive.munit.Assert.assertionCount++;
	if(!Math.isNaN(value)) massive.munit.Assert.fail("Value [" + value + "]  was not NaN",info);
}
massive.munit.Assert.isNotNaN = function(value,info) {
	massive.munit.Assert.assertionCount++;
	if(Math.isNaN(value)) massive.munit.Assert.fail("Value [" + value + "] was NaN",info);
}
massive.munit.Assert.isType = function(value,type,info) {
	massive.munit.Assert.assertionCount++;
	if(!js.Boot.__instanceof(value,type)) massive.munit.Assert.fail("Value [" + Std.string(value) + "] was not of type: " + Type.getClassName(type),info);
}
massive.munit.Assert.isNotType = function(value,type,info) {
	massive.munit.Assert.assertionCount++;
	if(js.Boot.__instanceof(value,type)) massive.munit.Assert.fail("Value [" + Std.string(value) + "] was of type: " + Type.getClassName(type),info);
}
massive.munit.Assert.areEqual = function(expected,actual,info) {
	massive.munit.Assert.assertionCount++;
	var equal = (function($this) {
		var $r;
		var _g = Type["typeof"](expected);
		$r = (function($this) {
			var $r;
			switch( (_g)[1] ) {
			case 7:
				$r = Type.enumEq(expected,actual);
				break;
			default:
				$r = expected == actual;
			}
			return $r;
		}($this));
		return $r;
	}(this));
	if(!equal) massive.munit.Assert.fail("Value [" + Std.string(actual) + "] was not equal to expected value [" + Std.string(expected) + "]",info);
}
massive.munit.Assert.areNotEqual = function(expected,actual,info) {
	massive.munit.Assert.assertionCount++;
	var equal = (function($this) {
		var $r;
		var _g = Type["typeof"](expected);
		$r = (function($this) {
			var $r;
			switch( (_g)[1] ) {
			case 7:
				$r = Type.enumEq(expected,actual);
				break;
			default:
				$r = expected == actual;
			}
			return $r;
		}($this));
		return $r;
	}(this));
	if(equal) massive.munit.Assert.fail("Value [" + Std.string(actual) + "] was equal to value [" + Std.string(expected) + "]",info);
}
massive.munit.Assert.areSame = function(expected,actual,info) {
	massive.munit.Assert.assertionCount++;
	if(expected != actual) massive.munit.Assert.fail("Value [" + Std.string(actual) + "] was not the same as expected value [" + Std.string(expected) + "]",info);
}
massive.munit.Assert.areNotSame = function(expected,actual,info) {
	massive.munit.Assert.assertionCount++;
	if(expected == actual) massive.munit.Assert.fail("Value [" + Std.string(actual) + "] was the same as expected value [" + Std.string(expected) + "]",info);
}
massive.munit.Assert.fail = function(msg,info) {
	throw new massive.munit.AssertionException(msg,info);
}
massive.munit.MUnitException = function(message,info) {
	massive.haxe.Exception.call(this,message,info);
	this.type = massive.haxe.util.ReflectUtil.here({ fileName : "MUnitException.hx", lineNumber : 50, className : "massive.munit.MUnitException", methodName : "new"}).className;
};
massive.munit.MUnitException.__name__ = ["massive","munit","MUnitException"];
massive.munit.MUnitException.__super__ = massive.haxe.Exception;
massive.munit.MUnitException.prototype = $extend(massive.haxe.Exception.prototype,{
	__class__: massive.munit.MUnitException
});
massive.munit.AssertionException = function(msg,info) {
	massive.munit.MUnitException.call(this,msg,info);
	this.type = massive.haxe.util.ReflectUtil.here({ fileName : "AssertionException.hx", lineNumber : 49, className : "massive.munit.AssertionException", methodName : "new"}).className;
};
massive.munit.AssertionException.__name__ = ["massive","munit","AssertionException"];
massive.munit.AssertionException.__super__ = massive.munit.MUnitException;
massive.munit.AssertionException.prototype = $extend(massive.munit.MUnitException.prototype,{
	__class__: massive.munit.AssertionException
});
massive.munit.ITestResultClient = function() { }
massive.munit.ITestResultClient.__name__ = ["massive","munit","ITestResultClient"];
massive.munit.ITestResultClient.prototype = {
	__class__: massive.munit.ITestResultClient
}
massive.munit.IAdvancedTestResultClient = function() { }
massive.munit.IAdvancedTestResultClient.__name__ = ["massive","munit","IAdvancedTestResultClient"];
massive.munit.IAdvancedTestResultClient.__interfaces__ = [massive.munit.ITestResultClient];
massive.munit.IAdvancedTestResultClient.prototype = {
	__class__: massive.munit.IAdvancedTestResultClient
}
massive.munit.ICoverageTestResultClient = function() { }
massive.munit.ICoverageTestResultClient.__name__ = ["massive","munit","ICoverageTestResultClient"];
massive.munit.ICoverageTestResultClient.__interfaces__ = [massive.munit.IAdvancedTestResultClient];
massive.munit.ICoverageTestResultClient.prototype = {
	__class__: massive.munit.ICoverageTestResultClient
}
massive.munit.TestClassHelper = function(type,isDebug) {
	if(isDebug == null) isDebug = false;
	this.type = type;
	this.isDebug = isDebug;
	this.tests = [];
	this.index = 0;
	this.className = Type.getClassName(type);
	this.beforeClass = $bind(this,this.nullFunc);
	this.afterClass = $bind(this,this.nullFunc);
	this.before = $bind(this,this.nullFunc);
	this.after = $bind(this,this.nullFunc);
	this.parse(type);
};
massive.munit.TestClassHelper.__name__ = ["massive","munit","TestClassHelper"];
massive.munit.TestClassHelper.prototype = {
	nullFunc: function() {
	}
	,sortTestsByName: function(x,y) {
		if(x.result.name == y.result.name) return 0;
		if(x.result.name > y.result.name) return 1; else return -1;
	}
	,addTest: function(field,testFunction,testInstance,isAsync,isIgnored,description) {
		var result = new massive.munit.TestResult();
		result.async = isAsync;
		result.ignore = isIgnored;
		result.className = this.className;
		result.description = description;
		result.name = field;
		var data = { test : testFunction, scope : testInstance, result : result};
		this.tests.push(data);
	}
	,searchForMatchingTags: function(fieldName,func,funcMeta) {
		var _g = 0, _g1 = massive.munit.TestClassHelper.META_TAGS;
		while(_g < _g1.length) {
			var tag = _g1[_g];
			++_g;
			if(Reflect.hasField(funcMeta,tag)) {
				var args = Reflect.field(funcMeta,tag);
				var description = args != null?args[0]:"";
				var isAsync = args != null && description == "Async";
				var isIgnored = Reflect.hasField(funcMeta,"Ignore");
				if(isAsync) description = ""; else if(isIgnored) {
					args = Reflect.field(funcMeta,"Ignore");
					description = args != null?args[0]:"";
				}
				switch(tag) {
				case "BeforeClass":
					this.beforeClass = func;
					break;
				case "AfterClass":
					this.afterClass = func;
					break;
				case "Before":
					this.before = func;
					break;
				case "After":
					this.after = func;
					break;
				case "AsyncTest":
					if(!this.isDebug) this.addTest(fieldName,func,this.test,true,isIgnored,description);
					break;
				case "Test":
					if(!this.isDebug) this.addTest(fieldName,func,this.test,isAsync,isIgnored,description);
					break;
				case "TestDebug":
					if(this.isDebug) this.addTest(fieldName,func,this.test,isAsync,isIgnored,description);
					break;
				}
			}
		}
	}
	,scanForTests: function(fieldMeta) {
		var fieldNames = Reflect.fields(fieldMeta);
		var _g = 0;
		while(_g < fieldNames.length) {
			var fieldName = fieldNames[_g];
			++_g;
			var f = Reflect.field(this.test,fieldName);
			if(Reflect.isFunction(f)) {
				var funcMeta = Reflect.field(fieldMeta,fieldName);
				this.searchForMatchingTags(fieldName,f,funcMeta);
			}
		}
	}
	,collateFieldMeta: function(inherintanceChain) {
		var meta = { };
		while(inherintanceChain.length > 0) {
			var clazz = inherintanceChain.pop();
			var newMeta = haxe.rtti.Meta.getFields(clazz);
			var markedFieldNames = Reflect.fields(newMeta);
			var _g = 0;
			while(_g < markedFieldNames.length) {
				var fieldName = markedFieldNames[_g];
				++_g;
				var recordedFieldTags = Reflect.field(meta,fieldName);
				var newFieldTags = Reflect.field(newMeta,fieldName);
				var newTagNames = Reflect.fields(newFieldTags);
				if(recordedFieldTags == null) {
					var tagsCopy = { };
					var _g1 = 0;
					while(_g1 < newTagNames.length) {
						var tagName = newTagNames[_g1];
						++_g1;
						tagsCopy[tagName] = Reflect.field(newFieldTags,tagName);
					}
					meta[fieldName] = tagsCopy;
				} else {
					var ignored = false;
					var _g1 = 0;
					while(_g1 < newTagNames.length) {
						var tagName = newTagNames[_g1];
						++_g1;
						if(tagName == "Ignore") ignored = true;
						if(!ignored && (tagName == "Test" || tagName == "AsyncTest") && Reflect.hasField(recordedFieldTags,"Ignore")) Reflect.deleteField(recordedFieldTags,"Ignore");
						var tagValue = Reflect.field(newFieldTags,tagName);
						recordedFieldTags[tagName] = tagValue;
					}
				}
			}
		}
		return meta;
	}
	,getInheritanceChain: function(clazz) {
		var inherintanceChain = [clazz];
		while((clazz = Type.getSuperClass(clazz)) != null) inherintanceChain.push(clazz);
		return inherintanceChain;
	}
	,parse: function(type) {
		this.test = Type.createEmptyInstance(type);
		var inherintanceChain = this.getInheritanceChain(type);
		var fieldMeta = this.collateFieldMeta(inherintanceChain);
		this.scanForTests(fieldMeta);
		this.tests.sort($bind(this,this.sortTestsByName));
	}
	,current: function() {
		return this.index <= 0?this.tests[0]:this.tests[this.index - 1];
	}
	,next: function() {
		return this.hasNext()?this.tests[this.index++]:null;
	}
	,hasNext: function() {
		return this.index < this.tests.length;
	}
	,__class__: massive.munit.TestClassHelper
}
massive.munit.TestResult = function() {
	this.passed = false;
	this.executionTime = 0.0;
	this.name = "";
	this.className = "";
	this.description = "";
	this.async = false;
	this.ignore = false;
	this.error = null;
	this.failure = null;
};
massive.munit.TestResult.__name__ = ["massive","munit","TestResult"];
massive.munit.TestResult.prototype = {
	get_type: function() {
		if(this.error != null) return massive.munit.TestResultType.ERROR;
		if(this.failure != null) return massive.munit.TestResultType.FAIL;
		if(this.ignore == true) return massive.munit.TestResultType.IGNORE;
		if(this.passed == true) return massive.munit.TestResultType.PASS;
		return massive.munit.TestResultType.UNKNOWN;
	}
	,get_location: function() {
		return this.name == "" && this.className == ""?"":this.className + "#" + this.name;
	}
	,__class__: massive.munit.TestResult
}
massive.munit.TestResultType = { __ename__ : true, __constructs__ : ["UNKNOWN","PASS","FAIL","ERROR","IGNORE"] }
massive.munit.TestResultType.UNKNOWN = ["UNKNOWN",0];
massive.munit.TestResultType.UNKNOWN.toString = $estr;
massive.munit.TestResultType.UNKNOWN.__enum__ = massive.munit.TestResultType;
massive.munit.TestResultType.PASS = ["PASS",1];
massive.munit.TestResultType.PASS.toString = $estr;
massive.munit.TestResultType.PASS.__enum__ = massive.munit.TestResultType;
massive.munit.TestResultType.FAIL = ["FAIL",2];
massive.munit.TestResultType.FAIL.toString = $estr;
massive.munit.TestResultType.FAIL.__enum__ = massive.munit.TestResultType;
massive.munit.TestResultType.ERROR = ["ERROR",3];
massive.munit.TestResultType.ERROR.toString = $estr;
massive.munit.TestResultType.ERROR.__enum__ = massive.munit.TestResultType;
massive.munit.TestResultType.IGNORE = ["IGNORE",4];
massive.munit.TestResultType.IGNORE.toString = $estr;
massive.munit.TestResultType.IGNORE.__enum__ = massive.munit.TestResultType;
massive.munit.async = {}
massive.munit.async.IAsyncDelegateObserver = function() { }
massive.munit.async.IAsyncDelegateObserver.__name__ = ["massive","munit","async","IAsyncDelegateObserver"];
massive.munit.async.IAsyncDelegateObserver.prototype = {
	__class__: massive.munit.async.IAsyncDelegateObserver
}
massive.munit.TestRunner = function(resultClient) {
	this.clients = new Array();
	this.addResultClient(resultClient);
	this.set_asyncFactory(this.createAsyncFactory());
	this.running = false;
	this.isDebug = false;
};
massive.munit.TestRunner.__name__ = ["massive","munit","TestRunner"];
massive.munit.TestRunner.__interfaces__ = [massive.munit.async.IAsyncDelegateObserver];
massive.munit.TestRunner.prototype = {
	createAsyncFactory: function() {
		return new massive.munit.async.AsyncFactory(this);
	}
	,asyncDelegateCreatedHandler: function(delegate) {
		this.asyncDelegate = delegate;
	}
	,asyncTimeoutHandler: function(delegate) {
		var testCaseData = this.activeHelper.current();
		var result = testCaseData.result;
		result.executionTime = massive.munit.util.Timer.stamp() - this.testStartTime;
		result.error = new massive.munit.async.AsyncTimeoutException("",delegate.info);
		this.asyncPending = false;
		this.asyncDelegate = null;
		this.errorCount++;
		var _g = 0, _g1 = this.clients;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.addError(result);
		}
		this.activeHelper.after.apply(this.activeHelper.test,this.emptyParams);
		this.execute();
	}
	,asyncResponseHandler: function(delegate) {
		var testCaseData = this.activeHelper.current();
		testCaseData.test = $bind(delegate,delegate.runTest);
		testCaseData.scope = delegate;
		this.asyncPending = false;
		this.asyncDelegate = null;
		this.executeTestCase(testCaseData,false);
		this.activeHelper.after.apply(this.activeHelper.test,this.emptyParams);
		this.execute();
	}
	,clientCompletionHandler: function(resultClient) {
		if(++this.clientCompleteCount == this.clients.length) {
			if(this.completionHandler != null) {
				var successful = this.passCount == this.testCount;
				var handler = this.completionHandler;
				massive.munit.util.Timer.delay(function() {
					handler(successful);
				},10);
			}
			this.running = false;
		}
	}
	,executeTestCase: function(testCaseData,async) {
		var result = testCaseData.result;
		try {
			var assertionCount = massive.munit.Assert.assertionCount;
			if(async) {
				testCaseData.test.apply(testCaseData.scope,[this.asyncFactory]);
				if(this.asyncDelegate == null) throw new massive.munit.async.MissingAsyncDelegateException("No AsyncDelegate was created in async test at " + result.get_location(),null);
				this.asyncPending = true;
			} else {
				testCaseData.test.apply(testCaseData.scope,this.emptyParams);
				result.passed = true;
				result.executionTime = massive.munit.util.Timer.stamp() - this.testStartTime;
				this.passCount++;
				var _g = 0, _g1 = this.clients;
				while(_g < _g1.length) {
					var c = _g1[_g];
					++_g;
					c.addPass(result);
				}
			}
		} catch( e ) {
			if(async && this.asyncDelegate != null) {
				this.asyncDelegate.cancelTest();
				this.asyncDelegate = null;
			}
			if(js.Boot.__instanceof(e,org.hamcrest.AssertionException)) e = new massive.munit.AssertionException(e.message,e.info);
			if(js.Boot.__instanceof(e,massive.munit.AssertionException)) {
				result.executionTime = massive.munit.util.Timer.stamp() - this.testStartTime;
				result.failure = e;
				this.failCount++;
				var _g = 0, _g1 = this.clients;
				while(_g < _g1.length) {
					var c = _g1[_g];
					++_g;
					c.addFail(result);
				}
			} else {
				result.executionTime = massive.munit.util.Timer.stamp() - this.testStartTime;
				if(!js.Boot.__instanceof(e,massive.munit.MUnitException)) e = new massive.munit.UnhandledException(e,result.get_location());
				result.error = e;
				this.errorCount++;
				var _g = 0, _g1 = this.clients;
				while(_g < _g1.length) {
					var c = _g1[_g];
					++_g;
					c.addError(result);
				}
			}
		}
	}
	,executeTestCases: function() {
		var _g = 0, _g1 = this.clients;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(js.Boot.__instanceof(c,massive.munit.IAdvancedTestResultClient)) (js.Boot.__cast(c , massive.munit.IAdvancedTestResultClient)).setCurrentTestClass(this.activeHelper.className);
		}
		var $it0 = this.activeHelper;
		while( $it0.hasNext() ) {
			var testCaseData = $it0.next();
			if(testCaseData.result.ignore) {
				this.ignoreCount++;
				var _g = 0, _g1 = this.clients;
				while(_g < _g1.length) {
					var c = _g1[_g];
					++_g;
					c.addIgnore(testCaseData.result);
				}
			} else {
				this.testCount++;
				this.activeHelper.before.apply(this.activeHelper.test,this.emptyParams);
				this.testStartTime = massive.munit.util.Timer.stamp();
				this.executeTestCase(testCaseData,testCaseData.result.async);
				if(!this.asyncPending) this.activeHelper.after.apply(this.activeHelper.test,this.emptyParams); else break;
			}
		}
	}
	,execute: function() {
		var _g1 = this.suiteIndex, _g = this.testSuites.length;
		while(_g1 < _g) {
			var i = _g1++;
			var suite = this.testSuites[i];
			while( suite.hasNext() ) {
				var testClass = suite.next();
				if(this.activeHelper == null || this.activeHelper.type != testClass) {
					this.activeHelper = new massive.munit.TestClassHelper(testClass,this.isDebug);
					this.activeHelper.beforeClass.apply(this.activeHelper.test,this.emptyParams);
				}
				this.executeTestCases();
				if(!this.asyncPending) this.activeHelper.afterClass.apply(this.activeHelper.test,this.emptyParams); else {
					suite.repeat();
					this.suiteIndex = i;
					return;
				}
			}
		}
		if(!this.asyncPending) {
			var time = massive.munit.util.Timer.stamp() - this.startTime;
			var _g = 0, _g1 = this.clients;
			while(_g < _g1.length) {
				var client = _g1[_g];
				++_g;
				if(js.Boot.__instanceof(client,massive.munit.IAdvancedTestResultClient)) (js.Boot.__cast(client , massive.munit.IAdvancedTestResultClient)).setCurrentTestClass(null);
				client.reportFinalStatistics(this.testCount,this.passCount,this.failCount,this.errorCount,this.ignoreCount,time);
			}
		}
	}
	,run: function(testSuiteClasses) {
		if(this.running) return;
		this.running = true;
		this.asyncPending = false;
		this.asyncDelegate = null;
		this.testCount = 0;
		this.failCount = 0;
		this.errorCount = 0;
		this.passCount = 0;
		this.ignoreCount = 0;
		this.suiteIndex = 0;
		this.clientCompleteCount = 0;
		massive.munit.Assert.assertionCount = 0;
		this.emptyParams = new Array();
		this.testSuites = new Array();
		this.startTime = massive.munit.util.Timer.stamp();
		var _g = 0;
		while(_g < testSuiteClasses.length) {
			var suiteType = testSuiteClasses[_g];
			++_g;
			this.testSuites.push(Type.createInstance(suiteType,new Array()));
		}
		this.execute();
	}
	,debug: function(testSuiteClasses) {
		this.isDebug = true;
		this.run(testSuiteClasses);
	}
	,addResultClient: function(resultClient) {
		var _g = 0, _g1 = this.clients;
		while(_g < _g1.length) {
			var client = _g1[_g];
			++_g;
			if(client == resultClient) return;
		}
		resultClient.set_completionHandler($bind(this,this.clientCompletionHandler));
		this.clients.push(resultClient);
	}
	,set_asyncFactory: function(value) {
		if(value == this.asyncFactory) return value;
		if(this.running) throw new massive.munit.MUnitException("Can't change AsyncFactory while tests are running",{ fileName : "TestRunner.hx", lineNumber : 127, className : "massive.munit.TestRunner", methodName : "set_asyncFactory"});
		value.observer = this;
		return this.asyncFactory = value;
	}
	,get_clientCount: function() {
		return this.clients.length;
	}
	,__class__: massive.munit.TestRunner
}
massive.munit.UnhandledException = function(source,testLocation) {
	massive.munit.MUnitException.call(this,Std.string(source.toString()) + this.formatLocation(source,testLocation),null);
	this.type = massive.haxe.util.ReflectUtil.here({ fileName : "UnhandledException.hx", lineNumber : 53, className : "massive.munit.UnhandledException", methodName : "new"}).className;
};
massive.munit.UnhandledException.__name__ = ["massive","munit","UnhandledException"];
massive.munit.UnhandledException.__super__ = massive.munit.MUnitException;
massive.munit.UnhandledException.prototype = $extend(massive.munit.MUnitException.prototype,{
	getStackTrace: function(source) {
		var s = "";
		if(s == "") {
			var stack = haxe.CallStack.exceptionStack();
			while(stack.length > 0) {
				var _g = stack.shift();
				var $e = (_g);
				switch( $e[1] ) {
				case 2:
					var line = $e[4], file = $e[3], _g_eFilePos_0 = $e[2];
					s += "\tat " + file + " (" + line + ")\n";
					break;
				case 1:
					break;
				case 3:
					var method = $e[3], classname = $e[2];
					s += "\tat " + classname + "#" + method + "\n";
					break;
				case 4:
					break;
				case 0:
					break;
				}
			}
		}
		return s;
	}
	,formatLocation: function(source,testLocation) {
		var stackTrace = " at " + testLocation;
		var stack = this.getStackTrace(source);
		if(stack != "") stackTrace += " " + HxOverrides.substr(stack,1,null);
		return stackTrace;
	}
	,__class__: massive.munit.UnhandledException
});
massive.munit.async.AsyncDelegate = function(testCase,handler,timeout,info) {
	var self = this;
	this.testCase = testCase;
	this.handler = handler;
	this.delegateHandler = Reflect.makeVarArgs($bind(this,this.responseHandler));
	this.info = info;
	this.params = [];
	this.timedOut = false;
	this.canceled = false;
	if(timeout == null || timeout <= 0) timeout = 400;
	this.timeoutDelay = timeout;
	this.timer = massive.munit.util.Timer.delay($bind(this,this.timeoutHandler),this.timeoutDelay);
};
massive.munit.async.AsyncDelegate.__name__ = ["massive","munit","async","AsyncDelegate"];
massive.munit.async.AsyncDelegate.prototype = {
	actualTimeoutHandler: function() {
		this.deferredTimer = null;
		this.handler = null;
		this.delegateHandler = null;
		this.timedOut = true;
		if(this.observer != null) {
			this.observer.asyncTimeoutHandler(this);
			this.observer = null;
		}
	}
	,timeoutHandler: function() {
		this.actualTimeoutHandler();
	}
	,delayActualResponseHandler: function() {
		this.observer.asyncResponseHandler(this);
		this.observer = null;
	}
	,responseHandler: function(params) {
		if(this.timedOut || this.canceled) return null;
		this.timer.stop();
		if(this.deferredTimer != null) this.deferredTimer.stop();
		if(params == null) params = [];
		this.params = params;
		if(this.observer != null) massive.munit.util.Timer.delay($bind(this,this.delayActualResponseHandler),1);
		return null;
	}
	,cancelTest: function() {
		this.canceled = true;
		this.timer.stop();
		if(this.deferredTimer != null) this.deferredTimer.stop();
	}
	,runTest: function() {
		this.handler.apply(this.testCase,this.params);
	}
	,__class__: massive.munit.async.AsyncDelegate
}
massive.munit.async.AsyncFactory = function(observer) {
	this.observer = observer;
	this.asyncDelegateCount = 0;
};
massive.munit.async.AsyncFactory.__name__ = ["massive","munit","async","AsyncFactory"];
massive.munit.async.AsyncFactory.prototype = {
	createHandler: function(testCase,handler,timeout,info) {
		var delegate = new massive.munit.async.AsyncDelegate(testCase,handler,timeout,info);
		delegate.observer = this.observer;
		this.asyncDelegateCount++;
		this.observer.asyncDelegateCreatedHandler(delegate);
		return delegate.delegateHandler;
	}
	,__class__: massive.munit.async.AsyncFactory
}
massive.munit.async.AsyncTimeoutException = function(message,info) {
	massive.munit.MUnitException.call(this,message,info);
	this.type = massive.haxe.util.ReflectUtil.here({ fileName : "AsyncTimeoutException.hx", lineNumber : 47, className : "massive.munit.async.AsyncTimeoutException", methodName : "new"}).className;
};
massive.munit.async.AsyncTimeoutException.__name__ = ["massive","munit","async","AsyncTimeoutException"];
massive.munit.async.AsyncTimeoutException.__super__ = massive.munit.MUnitException;
massive.munit.async.AsyncTimeoutException.prototype = $extend(massive.munit.MUnitException.prototype,{
	__class__: massive.munit.async.AsyncTimeoutException
});
massive.munit.async.MissingAsyncDelegateException = function(message,info) {
	massive.munit.MUnitException.call(this,message,info);
	this.type = massive.haxe.util.ReflectUtil.here({ fileName : "MissingAsyncDelegateException.hx", lineNumber : 47, className : "massive.munit.async.MissingAsyncDelegateException", methodName : "new"}).className;
};
massive.munit.async.MissingAsyncDelegateException.__name__ = ["massive","munit","async","MissingAsyncDelegateException"];
massive.munit.async.MissingAsyncDelegateException.__super__ = massive.munit.MUnitException;
massive.munit.async.MissingAsyncDelegateException.prototype = $extend(massive.munit.MUnitException.prototype,{
	__class__: massive.munit.async.MissingAsyncDelegateException
});
massive.munit.client = {}
massive.munit.client.AbstractTestResultClient = function() {
	this.init();
};
massive.munit.client.AbstractTestResultClient.__name__ = ["massive","munit","client","AbstractTestResultClient"];
massive.munit.client.AbstractTestResultClient.__interfaces__ = [massive.munit.ICoverageTestResultClient,massive.munit.IAdvancedTestResultClient];
massive.munit.client.AbstractTestResultClient.prototype = {
	sortTestResults: function(a,b) {
		var aInt = (function($this) {
			var $r;
			var _g = a.get_type();
			$r = (function($this) {
				var $r;
				switch( (_g)[1] ) {
				case 3:
					$r = 2;
					break;
				case 2:
					$r = 1;
					break;
				case 4:
					$r = 0;
					break;
				case 1:
					$r = -1;
					break;
				default:
					$r = -2;
				}
				return $r;
			}($this));
			return $r;
		}(this));
		var bInt = (function($this) {
			var $r;
			var _g1 = b.get_type();
			$r = (function($this) {
				var $r;
				switch( (_g1)[1] ) {
				case 3:
					$r = 2;
					break;
				case 2:
					$r = 1;
					break;
				case 4:
					$r = 0;
					break;
				case 1:
					$r = -1;
					break;
				default:
					$r = -2;
				}
				return $r;
			}($this));
			return $r;
		}(this));
		return aInt - bInt;
	}
	,getTraces: function() {
		return massive.munit.client.AbstractTestResultClient.traces.concat([]);
	}
	,addTrace: function(value,info) {
		var traceString = info.fileName + "|" + info.lineNumber + "| " + Std.string(value);
		massive.munit.client.AbstractTestResultClient.traces.push(traceString);
	}
	,printOverallResult: function(result) {
	}
	,printFinalStatistics: function(result,testCount,passCount,failCount,errorCount,ignoreCount,time) {
	}
	,printReports: function() {
	}
	,finalizeTestClass: function() {
		this.currentClassResults.sort($bind(this,this.sortTestResults));
	}
	,updateTestClass: function(result) {
		this.currentClassResults.push(result);
		this.totalResults.push(result);
	}
	,initializeTestClass: function() {
		this.currentClassResults = [];
		massive.munit.client.AbstractTestResultClient.traces = [];
		this.passCount = 0;
		this.failCount = 0;
		this.errorCount = 0;
		this.ignoreCount = 0;
	}
	,reportFinalStatistics: function(testCount,passCount,failCount,errorCount,ignoreCount,time) {
		this.finalResult = passCount == testCount;
		this.printReports();
		this.printFinalStatistics(this.finalResult,testCount,passCount,failCount,errorCount,ignoreCount,time);
		this.printOverallResult(this.finalResult);
		haxe.Log.trace = this.originalTrace;
		if(this.get_completionHandler() != null) (this.get_completionHandler())(this);
		return this.get_output();
	}
	,reportFinalCoverage: function(percent,missingCoverageResults,summary,classBreakdown,packageBreakdown,executionFrequency) {
		if(percent == null) percent = 0;
		this.totalCoveragePercent = percent;
		this.totalCoverageResults = missingCoverageResults;
		this.totalCoverageReport = summary;
	}
	,setCurrentTestClassCoverage: function(result) {
		this.currentCoverageResult = result;
	}
	,addIgnore: function(result) {
		this.ignoreCount++;
		this.updateTestClass(result);
	}
	,addError: function(result) {
		this.errorCount++;
		this.updateTestClass(result);
	}
	,addFail: function(result) {
		this.failCount++;
		this.updateTestClass(result);
	}
	,addPass: function(result) {
		this.passCount++;
		this.updateTestClass(result);
	}
	,setCurrentTestClass: function(className) {
		if(this.currentTestClass == className) return;
		if(this.currentTestClass != null) this.finalizeTestClass();
		this.currentTestClass = className;
		if(this.currentTestClass != null) this.initializeTestClass();
	}
	,init: function() {
		this.currentTestClass = null;
		this.currentClassResults = [];
		massive.munit.client.AbstractTestResultClient.traces = [];
		this.passCount = 0;
		this.failCount = 0;
		this.errorCount = 0;
		this.ignoreCount = 0;
		this.currentCoverageResult = null;
		this.totalResults = [];
		this.totalCoveragePercent = 0;
		this.totalCoverageReport = null;
		this.totalCoverageResults = null;
	}
	,get_output: function() {
		return this.output;
	}
	,set_completionHandler: function(value) {
		return this.completionHandler = value;
	}
	,get_completionHandler: function() {
		return this.completionHandler;
	}
	,__class__: massive.munit.client.AbstractTestResultClient
}
massive.munit.client.HTTPClient = function(client,url,queueRequest) {
	if(queueRequest == null) queueRequest = true;
	if(url == null) url = "http://localhost:2000";
	this.id = "HTTPClient";
	this.client = client;
	this.url = url;
	this.queueRequest = queueRequest;
};
massive.munit.client.HTTPClient.__name__ = ["massive","munit","client","HTTPClient"];
massive.munit.client.HTTPClient.__interfaces__ = [massive.munit.IAdvancedTestResultClient];
massive.munit.client.HTTPClient.dispatchNextRequest = function() {
	if(massive.munit.client.HTTPClient.responsePending || massive.munit.client.HTTPClient.queue.length == 0) return;
	massive.munit.client.HTTPClient.responsePending = true;
	var request = massive.munit.client.HTTPClient.queue.pop();
	request.send();
}
massive.munit.client.HTTPClient.prototype = {
	onError: function(msg) {
		if(this.queueRequest) {
			massive.munit.client.HTTPClient.responsePending = false;
			massive.munit.client.HTTPClient.dispatchNextRequest();
		}
		if(this.get_completionHandler() != null) (this.get_completionHandler())(this);
	}
	,onData: function(data) {
		if(this.queueRequest) {
			massive.munit.client.HTTPClient.responsePending = false;
			massive.munit.client.HTTPClient.dispatchNextRequest();
		}
		if(this.get_completionHandler() != null) (this.get_completionHandler())(this);
	}
	,platform: function() {
		return "js";
		return "unknown";
	}
	,sendResult: function(result) {
		this.request = new massive.munit.client.URLRequest(this.url);
		this.request.setHeader("munit-clientId",this.client.id);
		this.request.setHeader("munit-platformId",this.platform());
		this.request.onData = $bind(this,this.onData);
		this.request.onError = $bind(this,this.onError);
		this.request.data = result;
		if(this.queueRequest) {
			massive.munit.client.HTTPClient.queue.unshift(this.request);
			massive.munit.client.HTTPClient.dispatchNextRequest();
		} else this.request.send();
	}
	,reportFinalStatistics: function(testCount,passCount,failCount,errorCount,ignoreCount,time) {
		var result = this.client.reportFinalStatistics(testCount,passCount,failCount,errorCount,ignoreCount,time);
		this.sendResult(result);
		return result;
	}
	,addIgnore: function(result) {
		this.client.addIgnore(result);
	}
	,addError: function(result) {
		this.client.addError(result);
	}
	,addFail: function(result) {
		this.client.addFail(result);
	}
	,addPass: function(result) {
		this.client.addPass(result);
	}
	,setCurrentTestClass: function(className) {
		if(js.Boot.__instanceof(this.client,massive.munit.IAdvancedTestResultClient)) (js.Boot.__cast(this.client , massive.munit.IAdvancedTestResultClient)).setCurrentTestClass(className);
	}
	,set_completionHandler: function(value) {
		return this.completionHandler = value;
	}
	,get_completionHandler: function() {
		return this.completionHandler;
	}
	,__class__: massive.munit.client.HTTPClient
}
massive.munit.client.URLRequest = function(url) {
	this.url = url;
	this.createClient(url);
	this.setHeader("Content-Type","text/plain");
};
massive.munit.client.URLRequest.__name__ = ["massive","munit","client","URLRequest"];
massive.munit.client.URLRequest.prototype = {
	send: function() {
		this.client.onData = this.onData;
		this.client.onError = this.onError;
		this.client.setPostData(this.data);
		this.client.request(true);
	}
	,setHeader: function(name,value) {
		this.client.setHeader(name,value);
	}
	,createClient: function(url) {
		this.client = new haxe.Http(url);
	}
	,__class__: massive.munit.client.URLRequest
}
massive.munit.client.JUnitReportClient = function() {
	this.id = "junit";
	this.xml = new StringBuf();
	this.currentTestClass = "";
	this.newline = "\n";
	this.testSuiteXML = null;
	this.xml.b += Std.string("<testsuites>" + this.newline);
};
massive.munit.client.JUnitReportClient.__name__ = ["massive","munit","client","JUnitReportClient"];
massive.munit.client.JUnitReportClient.__interfaces__ = [massive.munit.IAdvancedTestResultClient];
massive.munit.client.JUnitReportClient.prototype = {
	startTestSuite: function() {
		this.suitePassCount = 0;
		this.suiteFailCount = 0;
		this.suiteErrorCount = 0;
		this.suiteExecutionTime = massive.munit.util.Timer.stamp();
		this.testSuiteXML = new StringBuf();
	}
	,endTestSuite: function() {
		if(this.testSuiteXML == null) return;
		var suiteTestCount = this.suitePassCount + this.suiteFailCount + this.suiteErrorCount;
		this.suiteExecutionTime = massive.munit.util.Timer.stamp() - this.suiteExecutionTime;
		var header = "<testsuite errors=\"" + this.suiteErrorCount + "\" failures=\"" + this.suiteFailCount + "\" hostname=\"\" name=\"" + this.currentTestClass + "\" tests=\"" + suiteTestCount + "\" time=\"" + massive.munit.util.MathUtil.round(this.suiteExecutionTime,5) + "\" timestamp=\"" + Std.string(new Date()) + "\">" + this.newline;
		var footer = "</testsuite>" + this.newline;
		this.testSuiteXML.b += Std.string("<system-out></system-out>" + this.newline);
		this.testSuiteXML.b += Std.string("<system-err></system-err>" + this.newline);
		this.xml.b += Std.string(header);
		this.xml.b += Std.string(this.testSuiteXML.b);
		this.xml.b += Std.string(footer);
	}
	,reportFinalStatistics: function(testCount,passCount,failCount,errorCount,ignoreCount,time) {
		this.xml.b += "</testsuites>";
		if(this.get_completionHandler() != null) (this.get_completionHandler())(this);
		return this.xml.b;
	}
	,addIgnore: function(result) {
	}
	,addError: function(result) {
		this.suiteErrorCount++;
		this.testSuiteXML.b += Std.string("<testcase classname=\"" + result.className + "\" name=\"" + result.name + "\" time=\"" + massive.munit.util.MathUtil.round(result.executionTime,5) + "\" >" + this.newline);
		this.testSuiteXML.b += Std.string("<error message=\"" + Std.string(result.error.message) + "\" type=\"" + Std.string(result.error.type) + "\">");
		this.testSuiteXML.b += Std.string(result.error);
		this.testSuiteXML.b += Std.string("</error>" + this.newline);
		this.testSuiteXML.b += Std.string("</testcase>" + this.newline);
	}
	,addFail: function(result) {
		this.suiteFailCount++;
		this.testSuiteXML.b += Std.string("<testcase classname=\"" + result.className + "\" name=\"" + result.name + "\" time=\"" + massive.munit.util.MathUtil.round(result.executionTime,5) + "\" >" + this.newline);
		this.testSuiteXML.b += Std.string("<failure message=\"" + result.failure.message + "\" type=\"" + result.failure.type + "\">");
		this.testSuiteXML.b += Std.string(result.failure);
		this.testSuiteXML.b += Std.string("</failure>" + this.newline);
		this.testSuiteXML.b += Std.string("</testcase>" + this.newline);
	}
	,addPass: function(result) {
		this.suitePassCount++;
		this.testSuiteXML.b += Std.string("<testcase classname=\"" + result.className + "\" name=\"" + result.name + "\" time=\"" + massive.munit.util.MathUtil.round(result.executionTime,5) + "\" />" + this.newline);
	}
	,setCurrentTestClass: function(className) {
		if(this.currentTestClass == className) return;
		if(this.currentTestClass != null) this.endTestSuite();
		this.currentTestClass = className;
		if(this.currentTestClass != null) this.startTestSuite();
	}
	,set_completionHandler: function(value) {
		return this.completionHandler = value;
	}
	,get_completionHandler: function() {
		return this.completionHandler;
	}
	,__class__: massive.munit.client.JUnitReportClient
}
massive.munit.client.PrintClientBase = function(includeIgnoredReport) {
	if(includeIgnoredReport == null) includeIgnoredReport = true;
	massive.munit.client.AbstractTestResultClient.call(this);
	this.id = "simple";
	this.verbose = false;
	this.includeIgnoredReport = includeIgnoredReport;
	this.printLine("MUnit Results");
	this.printLine(this.divider);
};
massive.munit.client.PrintClientBase.__name__ = ["massive","munit","client","PrintClientBase"];
massive.munit.client.PrintClientBase.__super__ = massive.munit.client.AbstractTestResultClient;
massive.munit.client.PrintClientBase.prototype = $extend(massive.munit.client.AbstractTestResultClient.prototype,{
	indentString: function(value,indent) {
		if(indent == null) indent = 0;
		if(indent > 0) value = StringTools.lpad(""," ",indent * 4) + value;
		if(value == "") value = "";
		return value;
	}
	,printLine: function(value,indent) {
		if(indent == null) indent = 0;
		value = Std.string(value);
		value = this.indentString(value,indent);
		this.print("\n" + Std.string(value));
	}
	,print: function(value) {
		this.output += Std.string(value);
	}
	,printOverallResult: function(result) {
		this.printLine("");
	}
	,printFinalStatistics: function(result,testCount,passCount,failCount,errorCount,ignoreCount,time) {
		this.printLine(this.divider2);
		var resultString = result?"PASSED":"FAILED";
		resultString += "\n" + "Tests: " + testCount + "  Passed: " + passCount + "  Failed: " + failCount + " Errors: " + errorCount + " Ignored: " + ignoreCount + " Time: " + massive.munit.util.MathUtil.round(time,5);
		this.printLine(resultString);
		this.printLine("");
	}
	,filterIngored: function(result) {
		return result.get_type() == massive.munit.TestResultType.IGNORE;
	}
	,printFinalIgnoredStatistics: function(count) {
		if(!this.includeIgnoredReport || count == 0) return;
		var items = Lambda.filter(this.totalResults,$bind(this,this.filterIngored));
		if(items.length == 0) return;
		this.printLine("");
		this.printLine("Ignored (" + count + "):");
		this.printLine(this.divider);
		var $it0 = items.iterator();
		while( $it0.hasNext() ) {
			var result = $it0.next();
			var ingoredString = result.get_location();
			if(result.description != null) ingoredString += " - " + result.description;
			this.printLine("IGNORE: " + ingoredString,1);
		}
		this.printLine("");
	}
	,printReports: function() {
		this.printFinalIgnoredStatistics(this.ignoreCount);
	}
	,printIndentedLines: function(value,indent) {
		if(indent == null) indent = 1;
		var lines = value.split("\n");
		var _g = 0;
		while(_g < lines.length) {
			var line = lines[_g];
			++_g;
			this.printLine(line,indent);
		}
	}
	,reportFinalCoverage: function(percent,missingCoverageResults,summary,classBreakdown,packageBreakdown,executionFrequency) {
		if(percent == null) percent = 0;
		massive.munit.client.AbstractTestResultClient.prototype.reportFinalCoverage.call(this,percent,missingCoverageResults,summary,classBreakdown,packageBreakdown,executionFrequency);
		this.printLine("");
		this.printLine(this.divider);
		this.printLine("COVERAGE REPORT");
		this.printLine(this.divider);
		if(missingCoverageResults != null && missingCoverageResults.length > 0) {
			this.printLine("MISSING CODE BLOCKS:");
			var _g = 0;
			while(_g < missingCoverageResults.length) {
				var result = missingCoverageResults[_g];
				++_g;
				this.printLine(result.className + " [" + result.percent + "%]",1);
				var _g1 = 0, _g2 = result.blocks;
				while(_g1 < _g2.length) {
					var item = _g2[_g1];
					++_g1;
					this.printIndentedLines(item,2);
				}
				this.printLine("");
			}
		}
		if(executionFrequency != null) {
			this.printLine("CODE EXECUTION FREQUENCY:");
			this.printIndentedLines(executionFrequency,1);
			this.printLine("");
		}
		if(classBreakdown != null) this.printIndentedLines(classBreakdown,0);
		if(packageBreakdown != null) this.printIndentedLines(packageBreakdown,0);
		if(summary != null) this.printIndentedLines(summary,0);
	}
	,setCurrentTestClassCoverage: function(result) {
		massive.munit.client.AbstractTestResultClient.prototype.setCurrentTestClassCoverage.call(this,result);
		this.print(" [" + result.percent + "%]");
	}
	,finalizeTestClass: function() {
		massive.munit.client.AbstractTestResultClient.prototype.finalizeTestClass.call(this);
		var _g = 0, _g1 = this.getTraces();
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			this.printLine("TRACE: " + item,1);
		}
		var _g = 0, _g1 = this.currentClassResults;
		while(_g < _g1.length) {
			var result = _g1[_g];
			++_g;
			var _g2 = result.get_type();
			switch( (_g2)[1] ) {
			case 3:
				this.printLine("ERROR: " + Std.string(result.error),1);
				break;
			case 2:
				this.printLine("FAIL: " + Std.string(result.failure),1);
				break;
			case 4:
				var ingoredString = result.get_location();
				if(result.description != null) ingoredString += " - " + result.description;
				this.printLine("IGNORE: " + ingoredString,1);
				break;
			case 1:
			case 0:
				null;
				break;
			}
		}
	}
	,updateTestClass: function(result) {
		massive.munit.client.AbstractTestResultClient.prototype.updateTestClass.call(this,result);
		if(this.verbose) this.printLine(" " + result.name + ": " + Std.string(result.get_type()) + " "); else {
			var _g = result.get_type();
			switch( (_g)[1] ) {
			case 1:
				this.print(".");
				break;
			case 2:
				this.print("!");
				break;
			case 3:
				this.print("x");
				break;
			case 4:
				this.print(",");
				break;
			case 0:
				null;
				break;
			}
		}
	}
	,initializeTestClass: function() {
		massive.munit.client.AbstractTestResultClient.prototype.initializeTestClass.call(this);
		this.printLine("Class: " + this.currentTestClass + " ");
	}
	,init: function() {
		massive.munit.client.AbstractTestResultClient.prototype.init.call(this);
		this.divider = "------------------------------";
		this.divider2 = "==============================";
	}
	,__class__: massive.munit.client.PrintClientBase
});
massive.munit.client.PrintClient = function(includeIgnoredReport) {
	if(includeIgnoredReport == null) includeIgnoredReport = true;
	massive.munit.client.PrintClientBase.call(this,includeIgnoredReport);
	this.id = "print";
};
massive.munit.client.PrintClient.__name__ = ["massive","munit","client","PrintClient"];
massive.munit.client.PrintClient.__super__ = massive.munit.client.PrintClientBase;
massive.munit.client.PrintClient.prototype = $extend(massive.munit.client.PrintClientBase.prototype,{
	printLine: function(value,indent) {
		if(indent == null) indent = 0;
		massive.munit.client.PrintClientBase.prototype.printLine.call(this,value,indent);
	}
	,print: function(value) {
		massive.munit.client.PrintClientBase.prototype.print.call(this,value);
		this.external.print(value);
	}
	,reportFinalStatistics: function(testCount,passCount,failCount,errorCount,ignoreCount,time) {
		return massive.munit.client.PrintClientBase.prototype.reportFinalStatistics.call(this,testCount,passCount,failCount,errorCount,ignoreCount,time);
	}
	,customTrace: function(value,info) {
		this.addTrace(value,info);
	}
	,printOverallResult: function(result) {
		massive.munit.client.PrintClientBase.prototype.printOverallResult.call(this,result);
		this.external.setResult(result);
		this.external.setResultBackground(result);
	}
	,initJS: function() {
		var div = js.Browser.document.getElementById("haxe:trace");
		if(div == null) {
			var positionInfo = massive.haxe.util.ReflectUtil.here({ fileName : "PrintClient.hx", lineNumber : 140, className : "massive.munit.client.PrintClient", methodName : "initJS"});
			var error = "MissingElementException: 'haxe:trace' element not found at " + positionInfo.className + "#" + positionInfo.methodName + "(" + positionInfo.lineNumber + ")";
			js.Lib.alert(error);
		}
	}
	,init: function() {
		massive.munit.client.PrintClientBase.prototype.init.call(this);
		this.external = new massive.munit.client.ExternalPrintClientJS();
		this.initJS();
		this.originalTrace = haxe.Log.trace;
		haxe.Log.trace = $bind(this,this.customTrace);
	}
	,__class__: massive.munit.client.PrintClient
});
massive.munit.client.ExternalPrintClient = function() { }
massive.munit.client.ExternalPrintClient.__name__ = ["massive","munit","client","ExternalPrintClient"];
massive.munit.client.ExternalPrintClient.prototype = {
	__class__: massive.munit.client.ExternalPrintClient
}
massive.munit.client.ExternalPrintClientJS = function() {
	var div = js.Browser.document.getElementById("haxe:trace");
	if(div == null) {
		var positionInfo = massive.haxe.util.ReflectUtil.here({ fileName : "PrintClientBase.hx", lineNumber : 347, className : "massive.munit.client.ExternalPrintClientJS", methodName : "new"});
		var error = "MissingElementException: 'haxe:trace' element not found at " + positionInfo.className + "#" + positionInfo.methodName + "(" + positionInfo.lineNumber + ")";
		js.Lib.alert(error);
	}
};
massive.munit.client.ExternalPrintClientJS.__name__ = ["massive","munit","client","ExternalPrintClientJS"];
massive.munit.client.ExternalPrintClientJS.__interfaces__ = [massive.munit.client.ExternalPrintClient];
massive.munit.client.ExternalPrintClientJS.prototype = {
	serialiseToHTML: function(value) {
		value = js.Boot.__string_rec(value,"");
		var v = StringTools.htmlEscape(value);
		v = v.split("\n").join("<br/>");
		v = v.split(" ").join("&nbsp;");
		v = v.split("\"").join("\\'");
		return v;
	}
	,convertToJavaScript: function(method,args) {
		var htmlArgs = [];
		var _g = 0;
		while(_g < args.length) {
			var arg = args[_g];
			++_g;
			var html = this.serialiseToHTML(Std.string(arg));
			htmlArgs.push(html);
		}
		var jsCode;
		if(htmlArgs == null || htmlArgs.length == 0) jsCode = "addToQueue(\"" + method + "\")"; else {
			jsCode = "addToQueue(\"" + method + "\"";
			var _g = 0;
			while(_g < htmlArgs.length) {
				var arg = htmlArgs[_g];
				++_g;
				jsCode += ",\"" + arg + "\"";
			}
			jsCode += ")";
		}
		return jsCode;
	}
	,queue: function(method,args) {
		var a = [];
		if(js.Boot.__instanceof(args,Array)) a = a.concat(js.Boot.__cast(args , Array)); else a.push(args);
		var jsCode = this.convertToJavaScript(method,a);
		return eval(jsCode);
		return false;
	}
	,printSummary: function(value) {
		this.queue("printSummary",value);
	}
	,addCoverageSummary: function(value) {
		this.queue("addCoverageSummary",value);
	}
	,addCoverageReportSection: function(name,value) {
		this.queue("addCoverageReportSection",[name,value]);
	}
	,addMissingCoverageClass: function(className,percent) {
		if(percent == null) percent = 0;
		this.queue("addMissingCoverageClass",[className,percent]);
	}
	,createCoverageReport: function(percent) {
		if(percent == null) percent = 0;
		this.queue("createCoverageReport",percent);
	}
	,addTestClassCoverageItem: function(value) {
		this.queue("addTestCoverageItem",value);
	}
	,addTestClassCoverage: function(className,percent) {
		if(percent == null) percent = 0;
		this.queue("addTestCoverageClass",[className,percent]);
	}
	,addTestIgnore: function(value) {
		this.queue("addTestIgnore",value);
	}
	,addTestError: function(value) {
		this.queue("addTestError",value);
	}
	,addTestFail: function(value) {
		this.queue("addTestFail",value);
	}
	,addTestPass: function(value) {
		if(value == null) return;
		this.queue("addTestPass",value);
	}
	,setTestClassResult: function(resultType) {
		this.queue("setTestClassResult",resultType);
	}
	,printToTestClassSummary: function(value) {
		this.queue("updateTestSummary",value);
	}
	,createTestClass: function(className) {
		this.queue("createTestClass",className);
	}
	,trace: function(value) {
		this.queue("munitTrace",value);
	}
	,setResultBackground: function(value) {
		this.queue("setResultBackground",value);
	}
	,setResult: function(value) {
		this.queue("setResult",value);
	}
	,printLine: function(value) {
		this.queue("munitPrintLine",value);
	}
	,print: function(value) {
		this.queue("munitPrint",value);
	}
	,__class__: massive.munit.client.ExternalPrintClientJS
}
massive.munit.client.RichPrintClient = function() {
	massive.munit.client.PrintClientBase.call(this);
	this.id = "RichPrintClient";
};
massive.munit.client.RichPrintClient.__name__ = ["massive","munit","client","RichPrintClient"];
massive.munit.client.RichPrintClient.__super__ = massive.munit.client.PrintClientBase;
massive.munit.client.RichPrintClient.prototype = $extend(massive.munit.client.PrintClientBase.prototype,{
	printLine: function(value,indent) {
		if(indent == null) indent = 0;
		massive.munit.client.PrintClientBase.prototype.printLine.call(this,value,indent);
	}
	,print: function(value) {
		massive.munit.client.PrintClientBase.prototype.print.call(this,value);
		return;
	}
	,customTrace: function(value,info) {
		this.addTrace(value,info);
		var traces = this.getTraces();
		var t = traces[traces.length - 1];
		this.external.trace(t);
	}
	,printOverallResult: function(result) {
		massive.munit.client.PrintClientBase.prototype.printOverallResult.call(this,result);
		this.external.setResult(result);
	}
	,printFinalStatistics: function(result,testCount,passCount,failCount,errorCount,ignoreCount,time) {
		massive.munit.client.PrintClientBase.prototype.printFinalStatistics.call(this,result,testCount,passCount,failCount,errorCount,ignoreCount,time);
		var resultString = result?"PASSED":"FAILED";
		resultString += "\n" + "Tests: " + testCount + "  Passed: " + passCount + "  Failed: " + failCount + " Errors: " + errorCount + " Ignored: " + ignoreCount + " Time: " + massive.munit.util.MathUtil.round(time,5);
		this.external.printSummary(resultString);
	}
	,printReports: function() {
		massive.munit.client.PrintClientBase.prototype.printReports.call(this);
	}
	,printMissingCoverage: function(missingCoverageResults) {
		if(missingCoverageResults == null || missingCoverageResults.length == 0) return;
		var _g = 0;
		while(_g < missingCoverageResults.length) {
			var result = missingCoverageResults[_g];
			++_g;
			this.external.addMissingCoverageClass(result.className,result.percent);
			var _g1 = 0, _g2 = result.blocks;
			while(_g1 < _g2.length) {
				var item = _g2[_g1];
				++_g1;
				this.external.addTestClassCoverageItem(item);
			}
		}
	}
	,trim: function(output) {
		while(output.indexOf("\n") == 0) output = HxOverrides.substr(output,1,null);
		while(output.lastIndexOf("\n") == output.length - 2) output = HxOverrides.substr(output,0,output.length - 2);
		return output;
	}
	,reportFinalCoverage: function(percent,missingCoverageResults,summary,classBreakdown,packageBreakdown,executionFrequency) {
		if(percent == null) percent = 0;
		massive.munit.client.PrintClientBase.prototype.reportFinalCoverage.call(this,percent,missingCoverageResults,summary,classBreakdown,packageBreakdown,executionFrequency);
		this.external.createCoverageReport(percent);
		this.printMissingCoverage(missingCoverageResults);
		if(executionFrequency != null) this.external.addCoverageReportSection("Code Execution Frequency",this.trim(executionFrequency));
		if(classBreakdown != null) this.external.addCoverageReportSection("Class Breakdown",this.trim(classBreakdown));
		if(packageBreakdown != null) this.external.addCoverageReportSection("Package Breakdown",this.trim(packageBreakdown));
		if(packageBreakdown != null) this.external.addCoverageReportSection("Summary",this.trim(summary));
	}
	,setCurrentTestClassCoverage: function(result) {
		massive.munit.client.PrintClientBase.prototype.setCurrentTestClassCoverage.call(this,result);
		this.external.printToTestClassSummary(" [" + result.percent + "%]");
		if(result.percent == 100) return;
		this.external.addTestClassCoverage(result.className,result.percent);
		var _g = 0, _g1 = result.blocks;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			this.external.addTestClassCoverageItem(item);
		}
	}
	,getTestClassResultType: function() {
		if(this.errorCount > 0) return massive.munit.TestResultType.ERROR; else if(this.failCount > 0) return massive.munit.TestResultType.FAIL; else if(this.ignoreCount > 0) return massive.munit.TestResultType.IGNORE; else return massive.munit.TestResultType.PASS;
	}
	,finalizeTestClass: function() {
		massive.munit.client.PrintClientBase.prototype.finalizeTestClass.call(this);
		this.testClassResultType = this.getTestClassResultType();
		var code = (function($this) {
			var $r;
			var _g = $this;
			$r = (function($this) {
				var $r;
				switch( (_g.testClassResultType)[1] ) {
				case 1:
					$r = 0;
					break;
				case 2:
					$r = 1;
					break;
				case 3:
					$r = 2;
					break;
				case 4:
					$r = 3;
					break;
				default:
					$r = -1;
				}
				return $r;
			}($this));
			return $r;
		}(this));
		if(code == -1) return;
		this.external.setTestClassResult(code);
	}
	,serializeTestResult: function(result) {
		var summary = result.name;
		if(result.description != null && result.description != "") summary += " - " + result.description + " -";
		summary += " (" + massive.munit.util.MathUtil.round(result.executionTime,4) + "s)";
		var str = null;
		if(result.error != null) str = "Error: " + summary + "\n" + Std.string(result.error); else if(result.failure != null) str = "Failure: " + summary + "\n" + Std.string(result.failure); else if(result.ignore) str = "Ignore: " + summary; else if(result.passed) {
		}
		return str;
	}
	,updateTestClass: function(result) {
		massive.munit.client.PrintClientBase.prototype.updateTestClass.call(this,result);
		var value = this.serializeTestResult(result);
		var _g = result.get_type();
		switch( (_g)[1] ) {
		case 1:
			this.external.printToTestClassSummary(".");
			this.external.addTestPass(value);
			break;
		case 2:
			this.external.printToTestClassSummary("!");
			this.external.addTestFail(value);
			break;
		case 3:
			this.external.printToTestClassSummary("x");
			this.external.addTestError(value);
			break;
		case 4:
			this.external.printToTestClassSummary(",");
			this.external.addTestIgnore(value);
			break;
		case 0:
			null;
			break;
		}
	}
	,initializeTestClass: function() {
		massive.munit.client.PrintClientBase.prototype.initializeTestClass.call(this);
		this.external.createTestClass(this.currentTestClass);
		this.external.printToTestClassSummary("Class: " + this.currentTestClass + " ");
	}
	,init: function() {
		massive.munit.client.PrintClientBase.prototype.init.call(this);
		this.originalTrace = haxe.Log.trace;
		haxe.Log.trace = $bind(this,this.customTrace);
		this.external = new massive.munit.client.ExternalPrintClientJS();
	}
	,__class__: massive.munit.client.RichPrintClient
});
massive.munit.client.SummaryReportClient = function() {
	massive.munit.client.AbstractTestResultClient.call(this);
	this.id = "summary";
};
massive.munit.client.SummaryReportClient.__name__ = ["massive","munit","client","SummaryReportClient"];
massive.munit.client.SummaryReportClient.__super__ = massive.munit.client.AbstractTestResultClient;
massive.munit.client.SummaryReportClient.prototype = $extend(massive.munit.client.AbstractTestResultClient.prototype,{
	printReports: function() {
	}
	,printOverallResult: function(result) {
	}
	,printFinalStatistics: function(result,testCount,passCount,failCount,errorCount,ignoreCount,time) {
		this.output = "";
		this.output += "result:" + Std.string(result);
		this.output += "\ncount:" + testCount;
		this.output += "\npass:" + passCount;
		this.output += "\nfail:" + failCount;
		this.output += "\nerror:" + errorCount;
		this.output += "\nignore:" + ignoreCount;
		this.output += "\ntime:" + time;
		this.output += "\n";
		var resultCount = 0;
		while(this.totalResults.length > 0 && resultCount < 10) {
			var result1 = this.totalResults.shift();
			if(!result1.passed) {
				this.output += "\n# " + result1.get_location();
				resultCount++;
			}
		}
		var remainder = failCount + errorCount - resultCount;
		if(remainder > 0) this.output += "# ... plus " + remainder + " more";
	}
	,__class__: massive.munit.client.SummaryReportClient
});
massive.munit.util = {}
massive.munit.util.MathUtil = function() {
};
massive.munit.util.MathUtil.__name__ = ["massive","munit","util","MathUtil"];
massive.munit.util.MathUtil.round = function(value,precision) {
	value = value * Math.pow(10,precision);
	return Math.round(value) / Math.pow(10,precision);
}
massive.munit.util.MathUtil.prototype = {
	__class__: massive.munit.util.MathUtil
}
massive.munit.util.Timer = function(time_ms) {
	this.id = massive.munit.util.Timer.arr.length;
	massive.munit.util.Timer.arr[this.id] = this;
	this.timerId = window.setInterval("massive.munit.util.Timer.arr[" + this.id + "].run();",time_ms);
};
$hxExpose(massive.munit.util.Timer, "massive.munit.util.Timer");
massive.munit.util.Timer.__name__ = ["massive","munit","util","Timer"];
massive.munit.util.Timer.delay = function(f,time_ms) {
	var t = new massive.munit.util.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
massive.munit.util.Timer.stamp = function() {
	return new Date().getTime() / 1000;
}
massive.munit.util.Timer.prototype = {
	run: function() {
	}
	,stop: function() {
		if(this.id == null) return;
		window.clearInterval(this.timerId);
		massive.munit.util.Timer.arr[this.id] = null;
		if(this.id > 100 && this.id == massive.munit.util.Timer.arr.length - 1) {
			var p = this.id - 1;
			while(p >= 0 && massive.munit.util.Timer.arr[p] == null) p--;
			massive.munit.util.Timer.arr = massive.munit.util.Timer.arr.slice(0,p + 1);
		}
		this.id = null;
	}
	,__class__: massive.munit.util.Timer
}
var omni = {}
omni.utils = {}
omni.utils.signals = {}
omni.utils.signals.IOSignalType = function() { }
omni.utils.signals.IOSignalType.__name__ = ["omni","utils","signals","IOSignalType"];
omni.utils.signals.IOSignalType.prototype = {
	__class__: omni.utils.signals.IOSignalType
}
omni.utils.signals.OSignalType = function() {
	this.listeners = new List();
	this.enabled = true;
	this.removeAll();
};
omni.utils.signals.OSignalType.__name__ = ["omni","utils","signals","OSignalType"];
omni.utils.signals.OSignalType.prototype = {
	destroy: function() {
		this.listeners = null;
		this.exposableListener = null;
	}
	,exists: function(listener) {
		var $it0 = this.listeners.iterator();
		while( $it0.hasNext() ) {
			var l = $it0.next();
			if(l == listener) return true;
		}
		return false;
	}
	,callMethod: function(listener,args,pos) {
		try {
			listener.apply(null,args);
		} catch( e ) {
		}
	}
	,dispatch: function(p1,p2,p3,p4,pos) {
		if(!this.enabled) return;
		var args = new Array();
		var _g = 0, _g1 = [p1,p2,p3,p4];
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(p != null) args.push(p); else break;
		}
		var $it0 = this.listeners.iterator();
		while( $it0.hasNext() ) {
			var o = $it0.next();
			this.callMethod(o,args,pos);
		}
		if(this.exposableListener != null) {
			this.callMethod(this.exposableListener,args,pos);
			this.exposableListener = null;
		}
	}
	,removeAll: function() {
		this.listeners = new List();
		this.exposableListener = null;
	}
	,remove: function(listener) {
		var $it0 = this.listeners.iterator();
		while( $it0.hasNext() ) {
			var l = $it0.next();
			if(Reflect.compareMethods(l,listener)) {
				this.listeners.remove(l);
				break;
			}
		}
		if(Reflect.compareMethods(this.exposableListener,listener)) this.exposableListener = null;
	}
	,addFirst: function(listener,pos) {
		this.listeners.push(listener);
	}
	,addOnce: function(listener,pos) {
		if(this.exists(listener)) {
		}
		this.exposableListener = listener;
	}
	,add: function(listener) {
		this.listeners.add(listener);
	}
	,get_length: function() {
		return this.listeners.length;
	}
	,__class__: omni.utils.signals.OSignalType
}
omni.utils.signals.OSignalDynamic = function() {
	omni.utils.signals.OSignalType.call(this);
};
omni.utils.signals.OSignalDynamic.__name__ = ["omni","utils","signals","OSignalDynamic"];
omni.utils.signals.OSignalDynamic.__interfaces__ = [omni.utils.signals.IOSignalType];
omni.utils.signals.OSignalDynamic.__super__ = omni.utils.signals.OSignalType;
omni.utils.signals.OSignalDynamic.prototype = $extend(omni.utils.signals.OSignalType.prototype,{
	__class__: omni.utils.signals.OSignalDynamic
});
omni.utils.signals.OSignalInt = function() {
	omni.utils.signals.OSignalType.call(this);
};
omni.utils.signals.OSignalInt.__name__ = ["omni","utils","signals","OSignalInt"];
omni.utils.signals.OSignalInt.__interfaces__ = [omni.utils.signals.IOSignalType];
omni.utils.signals.OSignalInt.__super__ = omni.utils.signals.OSignalType;
omni.utils.signals.OSignalInt.prototype = $extend(omni.utils.signals.OSignalType.prototype,{
	__class__: omni.utils.signals.OSignalInt
});
var org = {}
org.hamcrest = {}
org.hamcrest.Exception = function(message,cause,info) {
	if(message == null) message = "";
	this.name = Type.getClassName(Type.getClass(this));
	this.message = message;
	this.cause = cause;
	this.info = info;
};
org.hamcrest.Exception.__name__ = ["org","hamcrest","Exception"];
org.hamcrest.Exception.prototype = {
	toString: function() {
		var str = this.get_name() + ": " + this.get_message();
		if(this.info != null) str += " at " + this.info.className + "#" + this.info.methodName + " (" + this.info.lineNumber + ")";
		if(this.get_cause() != null) str += "\n\t Caused by: " + Std.string(this.get_cause());
		return str;
	}
	,get_cause: function() {
		return this.cause;
	}
	,get_message: function() {
		return this.message;
	}
	,get_name: function() {
		return this.name;
	}
	,__class__: org.hamcrest.Exception
}
org.hamcrest.AssertionException = function(message,cause,info) {
	if(message == null) message = "";
	org.hamcrest.Exception.call(this,message,cause,info);
};
org.hamcrest.AssertionException.__name__ = ["org","hamcrest","AssertionException"];
org.hamcrest.AssertionException.__super__ = org.hamcrest.Exception;
org.hamcrest.AssertionException.prototype = $extend(org.hamcrest.Exception.prototype,{
	__class__: org.hamcrest.AssertionException
});
org.hamcrest.IllegalArgumentException = function(message,cause,info) {
	if(message == null) message = "Argument could not be processed.";
	org.hamcrest.Exception.call(this,message,cause,info);
};
org.hamcrest.IllegalArgumentException.__name__ = ["org","hamcrest","IllegalArgumentException"];
org.hamcrest.IllegalArgumentException.__super__ = org.hamcrest.Exception;
org.hamcrest.IllegalArgumentException.prototype = $extend(org.hamcrest.Exception.prototype,{
	__class__: org.hamcrest.IllegalArgumentException
});
org.hamcrest.MissingImplementationException = function(message,cause,info) {
	if(message == null) message = "Abstract method not overridden.";
	org.hamcrest.Exception.call(this,message,cause,info);
};
org.hamcrest.MissingImplementationException.__name__ = ["org","hamcrest","MissingImplementationException"];
org.hamcrest.MissingImplementationException.__super__ = org.hamcrest.Exception;
org.hamcrest.MissingImplementationException.prototype = $extend(org.hamcrest.Exception.prototype,{
	__class__: org.hamcrest.MissingImplementationException
});
org.hamcrest.UnsupportedOperationException = function(message,cause,info) {
	if(message == null) message = "";
	org.hamcrest.Exception.call(this,message,cause,info);
};
org.hamcrest.UnsupportedOperationException.__name__ = ["org","hamcrest","UnsupportedOperationException"];
org.hamcrest.UnsupportedOperationException.__super__ = org.hamcrest.Exception;
org.hamcrest.UnsupportedOperationException.prototype = $extend(org.hamcrest.Exception.prototype,{
	__class__: org.hamcrest.UnsupportedOperationException
});
var signals = {}
signals.OSignalDynamicTest = function() { }
signals.OSignalDynamicTest.__name__ = ["signals","OSignalDynamicTest"];
signals.OSignalDynamicTest.prototype = {
	testLength: function() {
		var testFunction0 = function() {
		};
		var testFunction1 = function() {
		};
		var testFunction2 = function() {
		};
		var testFunction3 = function() {
		};
		var signal = new omni.utils.signals.OSignalDynamic();
		signal.add(testFunction0);
		signal.add(testFunction1);
		signal.add(testFunction2);
		signal.add(testFunction3);
		massive.munit.Assert.isFalse(signal.get_length() == 0,{ fileName : "OSignalDynamicTest.hx", lineNumber : 115, className : "signals.OSignalDynamicTest", methodName : "testLength"});
		massive.munit.Assert.isTrue(signal.get_length() == 4,{ fileName : "OSignalDynamicTest.hx", lineNumber : 116, className : "signals.OSignalDynamicTest", methodName : "testLength"});
	}
	,testRemove: function() {
		var testFunction0 = function() {
		};
		var testFunction1 = function() {
		};
		var testFunction2 = function() {
		};
		var testFunction3 = function() {
		};
		var signal = new omni.utils.signals.OSignalDynamic();
		signal.add(testFunction0);
		signal.add(testFunction1);
		signal.add(testFunction2);
		signal.add(testFunction3);
		massive.munit.Assert.isTrue(signal.exists(testFunction0),{ fileName : "OSignalDynamicTest.hx", lineNumber : 87, className : "signals.OSignalDynamicTest", methodName : "testRemove"});
		signal.remove(testFunction0);
		massive.munit.Assert.isFalse(signal.exists(testFunction0),{ fileName : "OSignalDynamicTest.hx", lineNumber : 91, className : "signals.OSignalDynamicTest", methodName : "testRemove"});
		massive.munit.Assert.isTrue(signal.exists(testFunction1),{ fileName : "OSignalDynamicTest.hx", lineNumber : 92, className : "signals.OSignalDynamicTest", methodName : "testRemove"});
		massive.munit.Assert.isTrue(signal.get_length() == 3,{ fileName : "OSignalDynamicTest.hx", lineNumber : 93, className : "signals.OSignalDynamicTest", methodName : "testRemove"});
		signal.removeAll();
		massive.munit.Assert.isTrue(signal.get_length() == 0,{ fileName : "OSignalDynamicTest.hx", lineNumber : 97, className : "signals.OSignalDynamicTest", methodName : "testRemove"});
		massive.munit.Assert.isFalse(signal.exists(testFunction0),{ fileName : "OSignalDynamicTest.hx", lineNumber : 98, className : "signals.OSignalDynamicTest", methodName : "testRemove"});
	}
	,testExists: function() {
		var testFunction = function() {
		};
		var signal = new omni.utils.signals.OSignalDynamic();
		signal.add(testFunction);
		massive.munit.Assert.isTrue(signal.exists(testFunction),{ fileName : "OSignalDynamicTest.hx", lineNumber : 67, className : "signals.OSignalDynamicTest", methodName : "testExists"});
		var signalFalse = new omni.utils.signals.OSignalDynamic();
		massive.munit.Assert.isFalse(signalFalse.exists(testFunction),{ fileName : "OSignalDynamicTest.hx", lineNumber : 70, className : "signals.OSignalDynamicTest", methodName : "testExists"});
	}
	,testAddOnceDispatch: function() {
		var _g = this;
		var signal = new omni.utils.signals.OSignalDynamic();
		signal.addOnce(function() {
			_g.addOnce++;
		},{ fileName : "OSignalDynamicTest.hx", lineNumber : 49, className : "signals.OSignalDynamicTest", methodName : "testAddOnceDispatch"});
		var _g1 = 0;
		while(_g1 < 10) {
			var i = _g1++;
			signal.dispatch(null,null,null,null,{ fileName : "OSignalDynamicTest.hx", lineNumber : 53, className : "signals.OSignalDynamicTest", methodName : "testAddOnceDispatch"});
		}
		massive.munit.Assert.isTrue(this.addOnce == 1,{ fileName : "OSignalDynamicTest.hx", lineNumber : 56, className : "signals.OSignalDynamicTest", methodName : "testAddOnceDispatch"});
	}
	,testAddMultiDispatch: function() {
		var _g = this;
		var signal = new omni.utils.signals.OSignalDynamic();
		signal.add(function() {
			_g.signalVoidDispatched++;
		});
		var _g1 = 0;
		while(_g1 < 4) {
			var i = _g1++;
			signal.dispatch(null,null,null,null,{ fileName : "OSignalDynamicTest.hx", lineNumber : 39, className : "signals.OSignalDynamicTest", methodName : "testAddMultiDispatch"});
		}
		massive.munit.Assert.isTrue(this.signalVoidDispatched == 4,{ fileName : "OSignalDynamicTest.hx", lineNumber : 42, className : "signals.OSignalDynamicTest", methodName : "testAddMultiDispatch"});
	}
	,testExample: function() {
		var _g = this;
		var signal = new omni.utils.signals.OSignalDynamic();
		signal.add(function() {
			_g.dispatched = true;
		});
		signal.dispatch(null,null,null,null,{ fileName : "OSignalDynamicTest.hx", lineNumber : 27, className : "signals.OSignalDynamicTest", methodName : "testExample"});
		massive.munit.Assert.isTrue(this.dispatched,{ fileName : "OSignalDynamicTest.hx", lineNumber : 29, className : "signals.OSignalDynamicTest", methodName : "testExample"});
	}
	,setup: function() {
		this.dispatched = false;
		this.signalVoidDispatched = 0;
		this.addOnce = 0;
	}
	,__class__: signals.OSignalDynamicTest
}
signals.OSignalIntTest = function() { }
signals.OSignalIntTest.__name__ = ["signals","OSignalIntTest"];
signals.OSignalIntTest.prototype = {
	testIntReturn: function() {
		var _g = this;
		var signal1 = new omni.utils.signals.OSignalInt();
		signal1.add(function(testy) {
			_g.p1 = testy;
		});
		signal1.dispatch(32,null,null,null,{ fileName : "OSignalIntTest.hx", lineNumber : 28, className : "signals.OSignalIntTest", methodName : "testIntReturn"});
		massive.munit.Assert.isTrue(this.p1 == 32,{ fileName : "OSignalIntTest.hx", lineNumber : 30, className : "signals.OSignalIntTest", methodName : "testIntReturn"});
		var signal2 = new omni.utils.signals.OSignalInt();
		signal2.add(function(p1Value,p2Value) {
			_g.p1 = p1Value;
			_g.p2 = p2Value;
		});
		signal2.dispatch(787,444,null,null,{ fileName : "OSignalIntTest.hx", lineNumber : 34, className : "signals.OSignalIntTest", methodName : "testIntReturn"});
		massive.munit.Assert.isTrue(this.p1 == 787,{ fileName : "OSignalIntTest.hx", lineNumber : 36, className : "signals.OSignalIntTest", methodName : "testIntReturn"});
		massive.munit.Assert.isTrue(this.p2 == 444,{ fileName : "OSignalIntTest.hx", lineNumber : 37, className : "signals.OSignalIntTest", methodName : "testIntReturn"});
		var signal3 = new omni.utils.signals.OSignalInt();
		signal3.add(function(p1Value,p2Value,p3Value) {
			_g.p1 = p1Value;
			_g.p2 = p2Value;
			_g.p3 = p3Value;
		});
		signal3.dispatch(1818,478,9238,null,{ fileName : "OSignalIntTest.hx", lineNumber : 42, className : "signals.OSignalIntTest", methodName : "testIntReturn"});
		massive.munit.Assert.isTrue(this.p1 == 1818,{ fileName : "OSignalIntTest.hx", lineNumber : 44, className : "signals.OSignalIntTest", methodName : "testIntReturn"});
		massive.munit.Assert.isTrue(this.p2 == 478,{ fileName : "OSignalIntTest.hx", lineNumber : 45, className : "signals.OSignalIntTest", methodName : "testIntReturn"});
		massive.munit.Assert.isTrue(this.p3 == 9238,{ fileName : "OSignalIntTest.hx", lineNumber : 46, className : "signals.OSignalIntTest", methodName : "testIntReturn"});
		var signal4 = new omni.utils.signals.OSignalInt();
		signal4.add(function(p1Value,p2Value,p3Value,p4Value) {
			_g.p1 = p1Value;
			_g.p2 = p2Value;
			_g.p3 = p3Value;
			_g.p4 = p4Value;
		});
		signal4.dispatch(1324,3485,9345,3495,{ fileName : "OSignalIntTest.hx", lineNumber : 52, className : "signals.OSignalIntTest", methodName : "testIntReturn"});
		massive.munit.Assert.isTrue(this.p1 == 1324,{ fileName : "OSignalIntTest.hx", lineNumber : 54, className : "signals.OSignalIntTest", methodName : "testIntReturn"});
		massive.munit.Assert.isTrue(this.p2 == 3485,{ fileName : "OSignalIntTest.hx", lineNumber : 55, className : "signals.OSignalIntTest", methodName : "testIntReturn"});
		massive.munit.Assert.isTrue(this.p3 == 9345,{ fileName : "OSignalIntTest.hx", lineNumber : 56, className : "signals.OSignalIntTest", methodName : "testIntReturn"});
		massive.munit.Assert.isTrue(this.p4 == 3495,{ fileName : "OSignalIntTest.hx", lineNumber : 57, className : "signals.OSignalIntTest", methodName : "testIntReturn"});
	}
	,setup: function() {
		this.p1 = Math.random() | 0;
		this.p2 = Math.random() | 0;
		this.p3 = Math.random() | 0;
		this.p4 = Math.random() | 0;
	}
	,__class__: signals.OSignalIntTest
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.prototype.__class__ = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
js.Browser.document = typeof window != "undefined" ? window.document : null;
massive.munit.Assert.assertionCount = 0;
massive.munit.TestClassHelper.META_TAG_BEFORE_CLASS = "BeforeClass";
massive.munit.TestClassHelper.META_TAG_AFTER_CLASS = "AfterClass";
massive.munit.TestClassHelper.META_TAG_BEFORE = "Before";
massive.munit.TestClassHelper.META_TAG_AFTER = "After";
massive.munit.TestClassHelper.META_TAG_TEST = "Test";
massive.munit.TestClassHelper.META_TAG_ASYNC_TEST = "AsyncTest";
massive.munit.TestClassHelper.META_TAG_IGNORE = "Ignore";
massive.munit.TestClassHelper.META_PARAM_ASYNC_TEST = "Async";
massive.munit.TestClassHelper.META_TAG_TEST_DEBUG = "TestDebug";
massive.munit.TestClassHelper.META_TAGS = ["BeforeClass","AfterClass","Before","After","Test","AsyncTest","TestDebug"];
massive.munit.async.AsyncDelegate.DEFAULT_TIMEOUT = 400;
massive.munit.client.HTTPClient.queue = [];
massive.munit.client.HTTPClient.responsePending = false;
massive.munit.client.JUnitReportClient.DEFAULT_ID = "junit";
massive.munit.client.PrintClientBase.DEFAULT_ID = "simple";
massive.munit.client.PrintClient.DEFAULT_ID = "print";
massive.munit.client.RichPrintClient.DEFAULT_ID = "RichPrintClient";
massive.munit.client.SummaryReportClient.DEFAULT_ID = "summary";
massive.munit.util.Timer.arr = new Array();
signals.OSignalDynamicTest.__meta__ = { fields : { testLength : { Test : null}, testRemove : { Test : null}, testExists : { Test : null}, testAddOnceDispatch : { Test : null}, testAddMultiDispatch : { Test : null}, testExample : { Test : null}, setup : { Before : null}}};
signals.OSignalIntTest.__meta__ = { fields : { testIntReturn : { Test : null}, setup : { Before : null}}};
TestMain.main();
function $hxExpose(src, path) {
	var o = typeof window != "undefined" ? window : exports;
	var parts = path.split(".");
	for(var ii = 0; ii < parts.length-1; ++ii) {
		var p = parts[ii];
		if(typeof o[p] == "undefined") o[p] = {};
		o = o[p];
	}
	o[parts[parts.length-1]] = src;
}
})();
