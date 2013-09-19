Omni-Utils
==========

General purpose cross platform Haxe classes:

### OSignals

Includes a Type safe Signal system that is also tightly integrated with the OpenFL event system.

Tested with:

- JS
- SWF
- CPP
- NEKO

Basic usage:

```
var hello = new OSignal();
hello.add(funciton(){trace("Hello World")});
hello.dispatch();
```

OSignals has added advantage of methods such as addOnce, addFirst, exists, remove, removeAll and numListeners.
See the ./tests/signals/* to see example usage.

The OSignals have munit test written to demonstrate the api and maintain stability.

Inspired on work by ralcr/sdk.ralcr and robertpenner/as3-signals
