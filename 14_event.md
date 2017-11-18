{{meta {chap_num: 14, prev_link: 13_dom, next_link: 15_game}}}
@!6f6a55c3c04cd8f7257c3d05a31bee9d6f109414

# Handling Events
@!160e0581a77fdd2089b16417e8a28f9f9ae0a96f

{{quote {author: "Marcus Aurelius", title: Meditations, chapter: true}
@!4aec42441c00459eac6923f84ceaca5fe4dbdae1

You have power over your mind—not
outside events. Realize this, and you will find strength.
@!6ad6b194338b13a1abbff17978197c7641a36204

quote}}
@!0b2765a87c347f62b6f015655073f0c16af0cf44

{{index stoicism, "Marcus Aurelius", input, timeline, "control flow"}}
@!058b070b89f4ca93955129cd73b9af71d0516651

Some programs work with direct user input, such as mouse and
keyboard interaction. The timing and order of such input can't be
predicted in advance. This requires a different approach to control
flow than the one we have used so far.
@!bc3ed5ed00265edba73d9dd9bbbdffa0f0b27d70

## Event handlers
@!27562a4bbb81f0a515a79ecc01621156c874240e

{{index polling, button, "real-time"}}
@!00b3dce0d0e79bae6d64ab3fa9e81ada47f433d0

Imagine an interface where the
only way to find out whether a key on the keyboard is being pressed is to read the
current state of that key. To be able to react to keypresses,
you would have to constantly read the key's state so that
you'd catch it before it's released again. It would be dangerous to
perform other time-intensive computations since you might miss a
keypress.
@!8c99711e6779cc181ec47a48985ef8f533590291

That is how such input was handled on primitive machines. A step
up would be for the hardware or operating system to notice the
keypress and put it in a queue. A program can then periodically check the
queue for new events and react to what it finds there.
@!962f00985a8694fc0a49427d42c062fc215ebc75

{{index responsiveness, "user experience"}}
@!41bc8032833f7cc4fc7dc730563c44fb10706474

Of course, it has to remember
to look at the queue, and to do it often, because any time between the
key being pressed and the program noticing the event will cause the
software to feel unresponsive. This approach is called _((polling))_.
Most programmers avoid it whenever possible.
@!31123e3b7c197aa8fe696e73a765bfcdce3bf70b

{{index "callback function", "event handling"}}
@!790da3aa7836d12294ef2b3f50441b2c0a31262f

A better mechanism is for
the underlying system to give our code a chance to react
to events as they occur. Browsers do this by allowing us to register
functions as _handlers_ for specific events.
@!46a08237afdd898ebfe46a1892a312f1785d2959

```{lang: "text/html"}
<p>Click this document to activate the handler.</p>
<script>
  addEventListener("click", function() {
    console.log("You clicked!");
  });
</script>
```
@!cf5c3e51ba31a5d555552bdceecdf6b19f0d0998

{{index "click event", "addEventListener method"}}
@!b9e162ed893dc1ea21bef8431d6121955c0251f1

The `addEventListener`
function registers its second argument to be called whenever the event
described by its first argument occurs.
@!fad953c7fb9a4dbb1e2c8b67fe61aca348eceacb

## Events and DOM nodes
@!494d1d96bb1af6c211a2e3235990424838a1a215

{{index "addEventListener method", "event handling"}}
@!d0ac331b1094787638ff547be46189fcecd7b46a

Each ((browser))
event handler is registered in a context. When you call
`addEventListener` as shown previously, you are calling it as a method on the
whole ((window)) because in the browser the ((global scope)) is
equivalent to the `window` object. Every ((DOM)) element has its own
`addEventListener` method, which allows you to listen specifically on
that element.
@!cdea78cee823da7aa496df10911a3e34cfaa29e3

```{lang: "text/html"}
<button>Click me</button>
<p>No handler here.</p>
<script>
  var button = document.querySelector("button");
  button.addEventListener("click", function() {
    console.log("Button clicked.");
  });
</script>
```
@!c4eaab9724d136deeb58d58e5f15c3a668cd475e

{{index "click event", "button (HTML tag)"}}
@!e262689da02a1f5160f6a90b70547b21b16cc808

The example attaches a handler
to the button node. Thus, clicks on the button cause that handler to
run, whereas clicks on the rest of the document do not.
@!3ee4c37d97cfcb3263efed45a14db8b377e4ec84

{{index "onclick attribute", encapsulation}}
@!c08654d801b4e88729a57c4434beb877beedf0b8

Giving a node an `onclick`
attribute has a similar effect. But a node has only one `onclick`
attribute, so you can register only one handler per node that way. The
`addEventListener` method allows you to add any number of handlers, so
you can't accidentally replace a handler that has already been
registered.
@!75a8bb71afecc6de975d2ef7a899c05eb86a543d

{{index "removeEventListener method"}}
@!bc7b1eaa13fe45a05f47c2e53139a1441599f3f9

The `removeEventListener` method,
called with arguments similar to as `addEventListener`, removes a
handler.
@!49d3bd037da0be29a47f68d637b808eb9ab232c2

```{lang: "text/html"}
<button>Act-once button</button>
<script>
  var button = document.querySelector("button");
  function once() {
    console.log("Done.");
    button.removeEventListener("click", once);
  }
  button.addEventListener("click", once);
</script>
```
@!474e6ac409bddbedc9af0de777a635ded27ba362

{{index [function, "as value"]}}
@!33d90df3c50553a4a5ab4c65e6eaf33de5cb2033

To be able to unregister a handler function, we
give it a name (such as `once`) so that we
can pass it to both `addEventListener` and `removeEventListener`.
@!bf6612db97c383d5747be61cfe9b957bae30ed2c

## Event objects
@!39e2bd9aa524753e858b7f982f69e6a7174f320e

{{index "which property", "event handling"}}
@!72c8c267a146adb9dc9619d6c12d3d4da1e35740

Though we have ignored it in
the previous examples, event handler functions are passed an argument:
the _((event object))_. This object gives us additional information
about the event. For example, if we want to know _which_ ((mouse
button)) was pressed, we can look at the event object's `which` property.
@!7ed7190f70b4d897cf29e77d9ea02b2d968909bb

```{lang: "text/html"}
<button>Click me any way you want</button>
<script>
  var button = document.querySelector("button");
  button.addEventListener("mousedown", function(event) {
    if (event.which == 1)
      console.log("Left button");
    else if (event.which == 2)
      console.log("Middle button");
    else if (event.which == 3)
      console.log("Right button");
  });
</script>
```
@!12892213cc1812785b3441ff1c949037e4bf489e

{{index "event type", "type property"}}
@!2e11000c905feddc923ac37fb27057a5d0785fb2

The information stored in an event
object differs per type of event. We'll discuss various types later
in this chapter. The object's `type` property always holds a string
identifying the event (for example `"click"` or `"mousedown"`).
@!cacc207a096e2c9e1cc3d8fd3f555ec395dc0830

## Propagation
@!e69e2cf789664cc111dc58777222f0cbc740838f

{{index "event propagation", "parent node"}}
@!ea57728bb81a249c89118bf6326d16b08ccbb2b7

{{indexsee bubbling, "event propagation"}}
@!529cfb872424579681e9bfed20058886f69431ca

{{indexsee propagation, "event propagation"}}
@!511b6b134101a983f7458aead0de0cafa0bc7c47

Event handlers registered on
nodes with children will also receive some events that happen in the
children. If a button inside a paragraph is clicked, event handlers on
the paragraph will also receive the click event.
@!8c4f93363513010170bf8b240de6afd7de55e39d

{{index "event handling"}}
@!d1aea56f61bbaf9830ed96b209e1d4bf46fcaee7

But if both the paragraph and the button have a
handler, the more specific handler—the one on the button—gets to go
first. The event is said to _propagate_ outward, from the node where
it happened to that node's parent node and on to the root of the
document. Finally, after all handlers registered on a specific node
have had their turn, handlers registered on the whole ((window)) get a
chance to respond to the event.
@!04e3101b729e017256082a19d654de65b960c4c3

{{index "stopPropagation method", "click event"}}
@!c0b20ca93a6718a8f0f0885211d91e46d51c9a47

At any point, an event
handler can call the `stopPropagation` method on the event object to
prevent handlers “further up” from receiving the event. This can be
useful when, for example, you have a button inside another clickable
element and you don't want clicks on the button to activate the outer
element's click behavior.
@!9c4a71ccd26ed295c76590f09d78648b7e242993

{{index "mousedown event"}}
@!e9fbd049b6e0fec5486b67266173246989ef1f35

The following example registers `"mousedown"`
handlers on both a button and the paragraph around it. When clicked
with the right mouse button, the handler for the button calls
`stopPropagation`, which will prevent the handler on the paragraph
from running. When the button is clicked with another ((mouse
button)), both handlers will run.
@!d38e16ba2a9227d34f5638a1cd12f7e6bf3b0beb

```{lang: "text/html"}
<p>A paragraph with a <button>button</button>.</p>
<script>
  var para = document.querySelector("p");
  var button = document.querySelector("button");
  para.addEventListener("mousedown", function() {
    console.log("Handler for paragraph.");
  });
  button.addEventListener("mousedown", function(event) {
    console.log("Handler for button.");
    if (event.which == 3)
      event.stopPropagation();
  });
</script>
```
@!a2cebd76ab0e5dc3888c2e606c0970bbd36ddc50

{{index "event propagation", "target property"}}
@!3521f0bb1dfada2b8481257c0c155084ebf5e838

Most event objects have a
`target` property that refers to the node where they originated. You
can use this property to ensure that you're not accidentally handling
something that propagated up from a node you do not want to handle.
@!6298a488040975a4cc71fd3169a562d6c5c00423

It is also possible to use the `target` property to cast a wide net
for a specific type of event. For example, if you have a node
containing a long list of buttons, it may be more convenient to
register a single click handler on the outer node and have it use the
`target` property to figure out whether a button was clicked, rather
than register individual handlers on all of the buttons.
@!dd89076227b33e427c5d798c6b36fc1a865d5470

```{lang: "text/html"}
<button>A</button>
<button>B</button>
<button>C</button>
<script>
  document.body.addEventListener("click", function(event) {
    if (event.target.nodeName == "BUTTON")
      console.log("Clicked", event.target.textContent);
  });
</script>
```
@!1502b0c0c9a3ae67882c18b86e760afb7dc95ae0

## Default actions
@!d1c4386ac7de6f6b10830b35c121328b9e353158

{{index scrolling, "default behavior", "event handling"}}
@!e0888576db9f51455e62dc768af1e4b02d843b66

Many events
have a default action associated with them. If you click a ((link)),
you will be taken to the link's target. If you press the down arrow,
the browser will scroll the page down. If you right-click, you'll get
a context menu. And so on.
@!11840973e3e1fa9dd866c58bd5e1a09db11a2fbe

{{index "preventDefault method"}}
@!cf2428a0d7fe522e90458dca47c61cb93d43243a

For most types of events, the JavaScript
event handlers are called _before_ the default behavior is performed.
If the handler doesn't want the normal behavior to happen, typically
because it has already taken care of handling the event, it can call
the `preventDefault` method on the event object.
@!a6cf576fb48b6ec9b52cdd0763b8def00de99f21

{{index expectation}}
@!2c0584ed0f4d5d65e24748702e8a7e37672b0730

This can be used to implement your own ((keyboard))
shortcuts or ((context menu)). It can also be used to obnoxiously
interfere with the behavior that users expect. For example, here is a
link that cannot be followed:
@!ca2c8fd289a9f85bd82ed9c9272b95c95bfb879e

```{lang: "text/html"}
<a href="https://developer.mozilla.org/">MDN</a>
<script>
  var link = document.querySelector("a");
  link.addEventListener("click", function(event) {
    console.log("Nope.");
    event.preventDefault();
  });
</script>
```
@!2c8e81b74e54e520a7d93101c1d74a93091349d2

Try not to do such things unless you have a really good reason to. For
people using your page, it can be unpleasant when the behavior
they expect is broken.
@!623917bc3036098e24dd5a907e3041d7dc06e035

Depending on the browser, some events can't be intercepted. On
Chrome, for example, ((keyboard)) shortcuts to close the current tab
(Ctrl-W or Command-W) cannot be handled by JavaScript.
@!ec0fe7743f5fd61f4f4f261d938f9a5e9505c872

## Key events
@!12e812e7ed172f1a5b7debb9bc7ce05ecfd4b0e4

{{index keyboard, "keydown event", "keyup event", "event handling"}}
@!28f18bcf2c5efa509aca8f962d520d88920ddb4a

When a key on the keyboard is pressed, your browser fires a
`"keydown"` event. When it is released, a `"keyup"` event fires.
@!fe1b7b1e83c77bd06aaed5ec33e92009cc6140a7

```{lang: "text/html", focus: true}
<p>This page turns violet when you hold the V key.</p>
<script>
  addEventListener("keydown", function(event) {
    if (event.keyCode == 86)
      document.body.style.background = "violet";
  });
  addEventListener("keyup", function(event) {
    if (event.keyCode == 86)
      document.body.style.background = "";
  });
</script>
```
@!c788f843640c8ae34bd2991346caa4c08577f716

{{index "repeating key"}}
@!3590b2322473d5f1d780565f3f1ca79eccbdf036

Despite its name, `"keydown"` fires not only 
when the key is physically pushed down. When a key is pressed and
held, the event fires again every time the key _repeats_.
Sometimes—for example if you want to increase the acceleration of a
((game)) character when an arrow key is pressed and decrease it again
when the key is released—you have to be careful not to increase it
again every time the key repeats or you'd end up with unintentionally
huge values.
@!09fcfc96b8b0bffa6ae381a95e318b8a44c52661

{{index "keyCode property", "key code"}}
@!62a407adcfe417da01161f198ecf5681fa5c8ebf

The previous example looked at the
`keyCode` property of the event object. This is how you can identify
which key is being pressed or released. Unfortunately, it's not
always obvious how to translate the numeric key code to an actual
key.
@!68d6cd3f47f3ae5037bec37a28b12fd33935058c

{{index "event object", "charCodeAt method"}}
@!434d26d0267b0705d51e3e3d831efdb66f7dadaa

For letter and number keys,
the associated key code will be the ((Unicode)) character code
associated with the (uppercase) letter or number printed on the key.
The `charCodeAt` method on ((string))s gives us a way to find this
code.
@!f367f8732997fe7c46960c329324fd36fe87c671

```
console.log("Violet".charCodeAt(0));
// → 86
console.log("1".charCodeAt(0));
// → 49
```
@!b25b7757a96d2f1c1f3b02978e100150453f1210

Other keys have less predictable ((key code))s. The best way to find
the codes you need is usually by ((experiment))ing—register a key event
handler that logs the key codes it gets and press the key you are
interested in.
@!69279d3373229ad175c39458636d4ddfec25348c

{{index "modifier key", "shift key", "control key", "alt key", "meta key", "command key", "ctrlKey property", "shiftKey property", "altKey property", "metaKey property"}}
@!b3908218b85c5ab98f6f83ebdc5eb2a867a7a6d8

Modifier keys
such as Shift, Ctrl, Alt, and Meta (Command on Mac) generate key
events just like normal keys. But when looking for key combinations,
you can also find out whether these keys are held down by looking
at the `shiftKey`, `ctrlKey`, `altKey`, and `metaKey` properties of
keyboard and mouse events.
@!2db35a3b550fb624951803cfe9864817749470fa

```{lang: "text/html", focus: true}
<p>Press Ctrl-Space to continue.</p>
<script>
  addEventListener("keydown", function(event) {
    if (event.keyCode == 32 && event.ctrlKey)
      console.log("Continuing!");
  });
</script>
```
@!6055ea47d623484f194c7e620a1e74ee3566d767

{{index typing, "fromCharCode function", "charCode property", "keydown event", "keyup event", "keypress event"}}
@!5dc811f6026de10659bcc5bbaef1c5ff5e993ea7

The
`"keydown"` and `"keyup"` events give you information about the
physical key that is being pressed. But what if you are interested in
the actual ((text)) being typed? Getting that text from key codes is
awkward. Instead, there exists another event, `"keypress"`, which
fires right after `"keydown"` (and repeated along with `"keydown"`
when the key is held) but only for keys that produce character input.
The `charCode` property in the event object contains a code that can
be interpreted as a ((Unicode)) character code. We can use the
`String.fromCharCode` function to turn this code into an
actual single-((character)) ((string)).
@!b1442e95ed682b2ae72523502ce2e53dd47332df

```{lang: "text/html", focus: true}
<p>Focus this page and type something.</p>
<script>
  addEventListener("keypress", function(event) {
    console.log(String.fromCharCode(event.charCode));
  });
</script>
```
@!2bc0ae31efa1839fd018b71f7f9f56f5b20c72a6

{{index "button (HTML tag)", "tabindex attribute"}}
@!701a2d13afc222d4484662f84cbbb8f7026b616d

The ((DOM)) node where
a key event originates depends on the element that has ((focus)) when
the key is pressed. Normal nodes cannot have focus (unless you give
them a `tabindex` attribute), but things such as ((link))s, buttons, and
form fields can. We'll come back to form ((field))s in
[Chapter 18](18_forms.html#forms). When nothing in particular has
focus, `document.body` acts as the target node of key events.
@!d05f34a87a9cd49892a16e495faa5c316cd42ea4

## Mouse clicks
@!0f5ef5d5e72c08e3408cfe66ad09846cf94602ba

{{index "mousedown event", "mouseup event", "mouse cursor"}}
@!98030c1c4c11127079bc3d4047a35fb7ec26fd43

Pressing a
((mouse button)) also causes a number of events to fire. The
`"mousedown"` and `"mouseup"` events are similar to `"keydown"` and
`"keyup"` and fire when the button is pressed and released.
These will happen on the DOM nodes that are immediately below the
mouse pointer when the event occurs.
@!538362befecfb3a515c5dd65e5da94c5339b6b32

{{index "click event"}}
@!5a1b09b0246fbe7948114573ca8fe64ebb78750b

After the `"mouseup"` event, a `"click"` event
fires on the most specific node that contained both the press and the
release of the button. For example, if I press down the mouse button
on one paragraph and then move the pointer to another paragraph and
release the button, the `"click"` event will happen on the element
that contains both those paragraphs.
@!58cd498b819f9573afdfdc4c48d72b0e6bd8dbb7

{{index "dblclick event", "double click"}}
@!2edc45c603ccfbf0486030fe32a70f462afb5984

If two clicks happen close
together, a `"dblclick"` (double-click) event also fires, after the
second click event.
@!118770d00a8ed60e8ec34f80906151cee35a608a

{{index pixel, "pageX property", "pageY property", "event object"}}
@!acaf87b4035be7fe9f2d5063fcde4376a618c5eb

To get precise information about the place where a mouse
event happened, you can look at its `pageX` and `pageY` properties,
which contain the event's ((coordinates)) (in pixels) relative to the
top-left corner of the document.
@!2f9ee491c1706f4310ebddd78eacc2266b9708b9

{{index "border-radius (CSS)", "absolute positioning", "drawing program example"}}
@!a16444f2d0130b71ec64936cb588d033408d6397

{{id mouse_drawing}}
@!18c340cd18dd433a4cd080b0a55282ac428fce23

The following implements a primitive drawing program. Every
time you click the document, it adds a dot under your mouse
pointer. See [Chapter 19](19_paint.html#paint) for a less primitive
drawing program.
@!1eba99883a7063fee104f2dd3fb0f24869c6cc12

```{lang: "text/html"}
<style>
  body {
    height: 200px;
    background: beige;
  }
  .dot {
    height: 8px; width: 8px;
    border-radius: 4px; /* rounds corners */
    background: blue;
    position: absolute;
  }
</style>
<script>
  addEventListener("click", function(event) {
    var dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = (event.pageX - 4) + "px";
    dot.style.top = (event.pageY - 4) + "px";
    document.body.appendChild(dot);
  });
</script>
```
@!d4c939a4461fc1af5863c7ca2164cbee77d886b8

{{index "clientX property", "clientY property", "getBoundingClientRect method", "event object"}}
@!d252af7a6d6dc694a259697930fcb683f49aebe5

The `clientX` and `clientY` properties are
similar to `pageX` and `pageY` but relative to the part of the
document that is currently scrolled into view. These can be useful
when comparing mouse coordinates with the ((coordinates)) returned by
`getBoundingClientRect`, which also returns ((viewport))-relative
coordinates.
@!391928f798259b0d453ba7cd94e9153431be5124

## Mouse motion
@!c5d4a9f6bb74d28f29d308f6675e2474d725570f

{{index "mousemove event"}}
@!350515f7cf0480a86a58bd8f6aa61b126ff8b8c6

Every time the mouse pointer moves, a
`"mousemove"` event fires. This event can be used to track the
position of the mouse. A common situation in which this is useful is
when implementing some form of mouse-((dragging)) functionality.
@!1710d6993b5b30ec9e1e52563c4102b63b3cefe1

{{index "draggable bar example"}}
@!0d9ed25b35969d99804055d413ec5abd7a4c288d

As an example, the following program displays a
bar and sets up event handlers so that dragging to the left or right
on this bar makes it narrower or wider:
@!875fb7f5e7f635ff2d2782c3fea92b69a9adece5

```{lang: "text/html"}
<p>Drag the bar to change its width:</p>
<div style="background: orange; width: 60px; height: 20px">
</div>
<script>
  var lastX; // Tracks the last observed mouse X position
  var rect = document.querySelector("div");
  rect.addEventListener("mousedown", function(event) {
    if (event.which == 1) {
      lastX = event.pageX;
      addEventListener("mousemove", moved);
      event.preventDefault(); // Prevent selection
    }
  });

function buttonPressed(event) {
    if (event.buttons == null)
      return event.which != 0;
    else
      return event.buttons != 0;
  }
  function moved(event) {
    if (!buttonPressed(event)) {
      removeEventListener("mousemove", moved);
    } else {
      var dist = event.pageX - lastX;
      var newWidth = Math.max(10, rect.offsetWidth + dist);
      rect.style.width = newWidth + "px";
      lastX = event.pageX;
    }
  }
</script>
```
@!cc50d69896756e7818117b666f865968cb1d9f47

{{if book
@!662bbff155f98cdd406df9d5833a185064ddd8af

The resulting page looks like this:
@!4e5aee1ec3a1d82a9efc4380e845418898e8dfca

{{figure {url: "img/drag-bar.png", alt: "A draggable bar",width: "5.3cm"}}}
@!1e4b7d4776f31694006fc4499012f3e4bf8889f8

if}}
@!94cb015c61d1be36c105d05604b410b5fc6fa545

{{index "mouseup event", "mousemove event"}}
@!c967cf5c50cd7b2dd62a6e33e06c9d916e85e12d

Note that the `"mousemove"`
handler is registered on the whole ((window)). Even if the mouse goes
outside of the bar during resizing, we still want to update its size
and stop dragging when the mouse is released.
@!fa5408a56a551ee2291e76f9979de2e163d10927

{{index "buttons property", "which property"}}
@!843691f02bbc7176f496540c9af0483978b61426

We must stop resizing the
bar when the mouse button is released. Unfortunately, not all browsers
give `"mousemove"` events a meaningful `which` property. There is a
standard property called `buttons`, which provides similar
information, but that is also not supported on all browsers.
Fortunately, all major browsers support either `buttons` or `which`,
so the `buttonPressed` function in the example first tries `buttons`,
and falls back to `which` when that isn't available.
@!7ba89c15f8d0352ddc1829c850b5ba5c80f4e2b4

{{index "mouseover event", "mouseout event"}}
@!4b5138ea200d6f0fb6c9bcb5208c0094b8eae019

Whenever the mouse pointer
enters or leaves a node, a `"mouseover"` or `"mouseout"` event
fires. These two events can be used, among other things, to create
((hover effect))s, showing or styling something when the mouse is over
a given element.
@!4bf726b2be154083e94eaef0420b0c4cc9ebb0d7

{{index "event propagation"}}
@!6bdd2124227a431636bb95778349c7b4cc43c0f3

Unfortunately, creating such an effect is not
as simple as starting the effect on `"mouseover"` and ending it on
`"mouseout"`. When the mouse moves from a node onto one of its
children, `"mouseout"` fires on the parent node, though the mouse
did not actually leave the node's extent. To make things worse, these
events propagate just like other events, and thus you will also
receive `"mouseout"` events when the mouse leaves one of the ((child
node))s of the node on which the handler is registered.
@!4698ae0bd41979f1d32211c08c207ccf18e4213f

{{index "isInside function", "relatedTarget property", "target property"}}
@!9c45447f6e2a116dd0e138bea8ff7512054cd5e2

To work around this problem, we can use the `relatedTarget`
property of the event objects created for these events. It tells us,
in the case of `"mouseover"`, what element the pointer was over
before and, in the case of `"mouseout"`, what element it is going to.
We want to change our hover effect only when the `relatedTarget` is
outside of our target node. Only in that case does this event actually
represent a _crossing over_ from outside to inside the node (or the
other way around).
@!ba1528ccb3ec78d5f8104a9294af3df0c1b68d46

```{lang: "text/html"}
<p>Hover over this <strong>paragraph</strong>.</p>
<script>
  var para = document.querySelector("p");
  function isInside(node, target) {
    for (; node != null; node = node.parentNode)
      if (node == target) return true;
  }
  para.addEventListener("mouseover", function(event) {
    if (!isInside(event.relatedTarget, para))
      para.style.color = "red";
  });
  para.addEventListener("mouseout", function(event) {
    if (!isInside(event.relatedTarget, para))
      para.style.color = "";
  });
</script>
```
@!b42c3d1ca8ac8810474d72ca3328a3be3a60df73

The `isInside` function follows the given node's parent links until it
either reaches the top of the document (when `node` becomes null) or
finds the parent we are looking for.
@!1e648f21f308a4b580a29933d3ac57e4163e7750

I should add that a ((hover effect)) like this can be much more easily
achieved using the ((CSS)) _((pseudoselector))_ `:hover`, as the next
example shows. But when your hover effect involves doing something
more complicated than changing a style on the target node, you must use the trick
with `"mouseover"` and `"mouseout"` events.
@!cc738e495347e83940fbd8b573dd0e04552786fb

```{lang: "text/html"}
<style>
  p:hover { color: red }
</style>
<p>Hover over this <strong>paragraph</strong>.</p>
```
@!6f9e374c4638764b48393bd90007373eeb8cf0c6

## Scroll events
@!c8bc72f234bdc3439b6648af5f5aeb5e2afbe0f4

{{index scrolling, "scroll event", "event handling"}}
@!e44a323dc5056f3944f38d6e0943dc9d5f28b3ac

Whenever an
element is scrolled, a `"scroll"` event fires on it. This has
various uses, such as knowing what the user is currently looking at
(for disabling off-screen ((animation))s or sending ((spy)) reports to
your evil headquarters) or showing some indication of progress (by
highlighting part of a table of contents or showing a page number).
@!f6bd6f0c4f86b64a574bd3e18b1a1218942a039f

The following example draws a ((progress bar)) in the top-right corner of
the document and updates it to fill up as you scroll down:
@!7de4979e56a9357e6db95a6f67347ec9d86da4f2

```{lang: "text/html"}
<style>
  .progress {
    border: 1px solid blue;
    width: 100px;
    position: fixed;
    top: 10px; right: 10px;
  }
  .progress > div {
    height: 12px;
    background: blue;
    width: 0%;
  }
  body {
    height: 2000px;
  }
</style>
<div class="progress"><div></div></div>
<p>Scroll me...</p>
<script>
  var bar = document.querySelector(".progress div");
  addEventListener("scroll", function() {
    var max = document.body.scrollHeight - innerHeight;
    var percent = (pageYOffset / max) * 100;
    bar.style.width = percent + "%";
  });
</script>
```
@!87599876b04db2edf0074404db4e6d66ace6848c

{{index "unit (CSS)", scrolling, "position (CSS)", "fixed positioning", "absolute positioning", percent}}
@!3e23618d4037687b8a97fe24e022b1f0c91d6e97

Giving an element
a `position` of `fixed` acts much like an `absolute` position but
also prevents it from scrolling along with the rest of the document.
The effect is to make our progress bar stay in its corner. Inside 
it is another element, which is resized to indicate the current
progress. We use `%`, rather than `px`, as a unit when setting the
width so that the element is sized relative to the whole bar.
@!e21fcdd5018f77a93022af0342867fa6d239c8ab

{{index "innerHeight property", "innerWidth property", "pageYOffset property"}}
@!c0b8a7e20e359efe4f42133132891b9aa89cd836

The global `innerHeight` variable gives us the height of
the window, which we have to subtract from the total scrollable
height—you can't keep scrolling when you hit the bottom of the
document. (There's also an `innerWidth` to go along with
`innerHeight`.) By dividing `pageYOffset`, the current scroll
position, by the maximum scroll position and multiplying by 100,
we get the percentage for the progress bar.
@!25a4ba90156be3321cc252dc004bcedd5bc04e28

{{index "preventDefault method"}}
@!013eef7d518dff2a560b08b45942fd389c65932d

Calling `preventDefault` on a scroll event
does not prevent the scrolling from happening. In fact, the event
handler is called only _after_ the scrolling takes place.
@!38d21d8ee0f180b3267d2e3fcb575d4458b79764

## Focus events
@!77521740d11d6c64c693c2c9901b3654dee6a21e

{{index "event handling", "focus event", "blur event"}}
@!c8cef71c3dbf489b3fb10a0555a2619d1b0beb17

When an element
gains ((focus)), the browser fires a `"focus"` event on it. When it
loses focus, a `"blur"` event fires.
@!f3b8029f47b104ba7b1f2e395c5fe49bdf46be31

{{index "event propagation"}}
@!9ef5c8e8ff905832c016faafb82567b4aab3ea44

Unlike the events discussed earlier, these two
events do not propagate. A handler on a parent element is not notified
when a child element gains or loses focus.
@!793899e7ba390bd9857f0031ada8ce39e1df58a9

{{index "input (HTML tag)", "help text example"}}
@!b8a505e781c95a05e9b71a861054e2cd5007daf9

The following example 
displays help text for the ((text field)) that currently has
focus:
@!276974fae50d24624d31c353221343e3a1c4638d

```{lang: "text/html"}
<p>Name: <input type="text" data-help="Your full name"></p>
<p>Age: <input type="text" data-help="Age in years"></p>
<p id="help"></p>

<script>
  var help = document.querySelector("#help");
  var fields = document.querySelectorAll("input");
  for (var i = 0; i < fields.length; i++) {
    fields[i].addEventListener("focus", function(event) {
      var text = event.target.getAttribute("data-help");
      help.textContent = text;
    });
    fields[i].addEventListener("blur", function(event) {
      help.textContent = "";
    });
  }
</script>
```
@!f17dce978f95de5fea6537eb3b37b5effc725a42

{{if book
@!0ef1a3fdddf9b7938289a19450667c197cf2731d

In the following screenshot, the help text for the age field is shown.
@!9db169e37bc4513f139fdc33b77acd3f15b2bc82

{{figure {url: "img/help-field.png", alt: "Providing help when a field is focused",width: "4.4cm"}}}
@!6c262787803c4f9a55ff4594b775309a25c73459

if}}
@!881c01c9869d78f8a266153cb3e73e7ba7022e72

{{index "focus event", "blur event"}}
@!98b0003eab5c5aa5b78225a2f7a3917ea6a28170

The ((window)) object will receive
`"focus"` and `"blur"` events when the user moves from or to the
browser tab or window in which the document is shown.
@!323c194ca7ffb4ba723a54b91acd21740127b150

## Load event
@!ff1907041563dc4399e0c8e014ae453c37f0c785

{{index "script (HTML tag)", "load event"}}
@!e9f4071a08e332ed39d05c91cca0c40f7309482d

When a page finishes loading,
the `"load"` event fires on the window and the document body
objects. This is often used to schedule ((initialization)) actions
that require the whole ((document)) to have been built. Remember that
the content of `<script>` tags is run immediately when the tag is
encountered. This is often too soon, such as when the script needs
to do something with parts of the document that appear after the
`<script>` tag.
@!ebaf1622ef58c9d15d7d0a62b9fd1d9e73920e62

{{index "event propagation", "img (HTML tag)"}}
@!62acfdbc809c030db4b2b08baa78fae5e622929c

Elements such as ((image))s
and script tags that load an external file also have a `"load"` event
that indicates the files they reference were loaded. Like the
focus-related events, loading events do not propagate.
@!215ee7657245897ca5e1921315114e14895f5d71

{{index "beforeunload event", "page reload", "preventDefault method"}}
@!d785306adbe57871a73739df556887ec7a85da1d

When a page is closed or navigated away from (for example by
following a link), a `"beforeunload"` event fires. The main use of
this event is to prevent the user from accidentally losing work by
closing a document. Preventing the page from unloading is not, as you
might expect, done with the `preventDefault` method. Instead, it is
done by returning a string from the handler. The string will be used
in a dialog that asks the user if they want to stay on the page or
leave it. This mechanism ensures that a user is able to leave the
page, even if it is running a ((malicious script)) that would prefer to
keep them there forever in order to force them to look at dodgy
weight loss ads.
@!765d734b748a784ec0c54af62acf0e8ffae166f6

{{id timeline}}
@!0b337cacdf65c332031f7af41f97ea3f9e9faa7b

## Script execution timeline
@!36969edeb7ddf42ca70e2c9c0a19e57e036d90c2

{{index "requestAnimationFrame function", "event handling", timeline, "script (HTML tag)"}}
@!89ecc01053862e769b65e53111e00e8ac078a61c

There are various
things that can cause a script to start executing. Reading a
`<script>` tag is one such thing. An event firing is another.
[Chapter 13](13_dom.html#animationFrame) discussed the
`requestAnimationFrame` function, which schedules a function to be
called before the next page redraw. That is yet another way in which a
script can start running.
@!3bbc81685b10a321e4250d2e2f0082f656e6a914

{{index parallelism, concurrency, blocking}}
@!e85a9ed95b4aa738bf460db139a1d228c3e57de3

It is important to
understand that even though events can fire at any time, no two
scripts in a single document ever run at the same moment. If a script
is already running, event handlers and pieces of code scheduled in
other ways have to wait for their turn. This is the reason why a
document will freeze when a script runs for a long time. The browser
cannot react to clicks and other events inside the document because
it can't run event handlers until the current script finishes running.
@!e551ae660faecb316d9b71b44e7abfe6644b628f

{{index performance, complexity}}
@!553a7efde0efc56e03a7a5c628a6d0d91cdd7f5c

Some programming environments do
allow multiple _((thread))s of execution_ to run at the same time.
Doing multiple things at the same time can be used to make a program
faster. But when you have multiple actors touching the same parts of
the system at the same time, thinking about a program becomes at least
an order of magnitude harder.
@!fd9575447e701ba15b7b6495699f08589456a816

The fact that JavaScript programs do only one thing at a time makes
our lives easier. For cases where you _really_ do want to do some
time-consuming thing in the background without freezing the page,
browsers provide something called _((web worker))s_. A worker is an
isolated JavaScript ((environment)) that runs alongside the main
program for a document and can communicate with it only by sending
and receiving ((message))s.
@!cf2274018cb83ed158869d989e4f591fd59427a0

Assume we have the following code in a file called `code/squareworker.js`:
@!ea57fe0d5b18bd2d3093866ed9891e76c7e23a95

```
addEventListener("message", function(event) {
  postMessage(event.data * event.data);
});
```
@!5b9a06a0b4c9642f1781f06139947596a8a05265

Imagine that squaring a number is a heavy, long-running computation
that we want to perform in a background ((thread)). This code spawns a
worker, sends it a few messages, and outputs the responses.
@!26fc29c182d4b68fc7b41a2e5ea30c5480deddd9

```{test: no}
var squareWorker = new Worker("code/squareworker.js");
squareWorker.addEventListener("message", function(event) {
  console.log("The worker responded:", event.data);
});
squareWorker.postMessage(10);
squareWorker.postMessage(24);
```
@!a6c5e0975d8102a699a486ee2981000644cf8a13

{{index "postMessage method", "message event"}}
@!95d824aed5935683b51e53d792d5cd44808b8549

The `postMessage` function
sends a message, which will cause a `"message"` event to fire in the
receiver. The script that created the worker sends and receives
messages through the `Worker` object, whereas the worker talks to the
script that created it by sending and listening directly on its
((global scope))—which is a _new_ global scope, not shared with the
original script.
@!da66c32251692d12c2751e432754d30f4c484173

## Setting timers
@!a18b35304978d7c51d65243c25f791ffd00b52ff

{{index timeout, "setTimeout function"}}
@!b31b663a000451c00642f3f67d015f341250590e

The `setTimeout` function is
similar to `requestAnimationFrame`. It schedules another function to
be called later. But instead of calling the function at the next
redraw, it waits for a given amount of milliseconds. This page
turns from blue to yellow after two seconds:
@!76fc77e46cf72f1cb35c8d7203d66bd19da2e6b7

```{lang: "text/html"}
<script>
  document.body.style.background = "blue";
  setTimeout(function() {
    document.body.style.background = "yellow";
  }, 2000);
</script>
```
@!91d0f73668de84e4d78642f98e611dbcb0b78f5f

{{index "clearTimeout function"}}
@!de8bb702a9b0ff8d068c79b59bd9ab28ea8038f9

Sometimes you need to cancel a function you
have scheduled. This is done by storing the value returned by
`setTimeout` and calling `clearTimeout` on it.
@!7b690d066b1d5f756b49c789d1b6899277421316

```
var bombTimer = setTimeout(function() {
  console.log("BOOM!");
}, 500);

if (Math.random() < 0.5) { // 50% chance
  console.log("Defused.");
  clearTimeout(bombTimer);
}
```
@!3ae52b7ae878b3e4caca8ef9d26d9af2c70ee2ec

{{index "cancelAnimationFrame function", "requestAnimationFrame function"}}
@!03620161a3b83457312fb03d8da8917355e204ad

The `cancelAnimationFrame` function works in the same way
as _clearTimeout_—calling it on a value returned by
`requestAnimationFrame` will cancel that frame (assuming it hasn't
already been called).
@!c88d15d80f24b9ab5ab2fb991a7c30b2cf303775

{{index "setInterval function", "clearInterval function", repetition}}
@!76d5c97506e8b347dabe79073eb2f56edd8a14c4

A similar set of functions, `setInterval`
and `clearInterval` are used to set timers that should repeat every _X_
milliseconds.
@!3435383d3a893fc9660c7ecb511ddee6e6ec55b3

```
var ticks = 0;
var clock = setInterval(function() {
  console.log("tick", ticks++);
  if (ticks == 10) {
    clearInterval(clock);
    console.log("stop.");
  }
}, 200);
```
@!3446cc7c7d3b161a4ae07987d0937109dce46eac

## Debouncing
@!a40ac3279a55715ec2dd7b3525911251474b48e7

{{index optimization, "mousemove event", "scroll event", blocking}}
@!b8e26002f36335326c2cf0d05b12128d12233b1f

Some types of events have the potential to fire
rapidly, many times in a row (the `"mousemove"` and `"scroll"` events,
for example). When handling such events, you must be careful not to do
anything too time-consuming or your handler will take up so much time
that interaction with the document starts to feel slow and choppy.
@!9ff808a23d46ec820a6478cbf69de13b5d101d5f

{{index "setTimeout function"}}
@!5e301ef68e4fde3b25e401ecded01232faf8d378

If you do need to do something nontrivial in
such a handler, you can use `setTimeout` to make sure you are not
doing it too often. This is usually called _((debouncing))_ the event.
There are several slightly different approaches to this.
@!64deb7382288ce5a49781e03f245decad3549282

{{index "textarea (HTML tag)", "clearTimeout function", "keydown event"}}
@!26142b4df3c8c6d2b81ca322a95e091a0095a451

In the first example, we want to do something when the user
has typed something, but we don't want to do it immediately for every
key event. When they are ((typing)) quickly, we just want to wait
until a pause occurs. Instead of immediately performing an action in
the event handler, we set a timeout instead. We also clear the
previous timeout (if any) so that when events occur close together
(closer than our timeout delay), the timeout from the previous event
will be canceled.
@!02f98295805f85bb489208b7abffc7383fc64213

```{lang: "text/html"}
<textarea>Type something here...</textarea>
<script>
  var textarea = document.querySelector("textarea");
  var timeout;
  textarea.addEventListener("keydown", function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      console.log("You stopped typing.");
    }, 500);
  });
</script>
```
@!87bbb6de9037cdb13762f31f53964f207e33e522

{{index "sloppy programming"}}
@!85d66b4f5bb6f57ebe267bcb77e2c89752b017aa

Giving an undefined value to `clearTimeout` or
calling it on a timeout that has already fired has no effect. Thus, we
don't have to be careful about when to call it, and we simply do so
for every event.
@!044e7e9b2ca6b13b1809ff1ac509972bdc27c8cd

{{index "mousemove event"}}
@!ecab8288452459acbf9de26922379afc9ff33051

We can use a slightly different pattern if we
want to space responses so that they're separated by at least a
certain length of ((time)) but want to fire them _during_ a series of
events, not just afterward. For example, we might want to respond to
`"mousemove"` events by showing the current coordinates of the mouse,
but only every 250 milliseconds.
@!596984c7c8a51c39d4c9ee766f71d474719cc8c2

```{lang: "text/html"}
<script>
  function displayCoords(event) {
    document.body.textContent =
      "Mouse at " + event.pageX + ", " + event.pageY;
  }

var scheduled = false, lastEvent;
  addEventListener("mousemove", function(event) {
    lastEvent = event;
    if (!scheduled) {
      scheduled = true;
      setTimeout(function() {
        scheduled = false;
        displayCoords(lastEvent);
      }, 250);
    }
  });
</script>
```
@!9e16c4a7ff3c95ac7fec96ca8c6a25bf8bf71665

## Summary
@!c3fc94ad54a16ac1389a4a81ab481973ec770e06

Event handlers make it possible to detect and react to events we have
no direct control over. The `addEventListener` method is used to
register such a handler.
@!011a35cc8af4ab8752466bed9f61ac9c1efe0403

Each event has a type (`"keydown"`, `"focus"`, and so on) that identifies
it. Most events are called on a specific DOM element and then
_propagate_ to that element's ancestors, allowing handlers associated
with those elements to handle them.
@!5206909723a9ce1842527908034dc8325a3079ee

When an event handler is called, it is passed an event object with
additional information about the event. This object also has methods
that allow us to stop further propagation (`stopPropagation`) and
prevent the browser's default handling of the event
(`preventDefault`).
@!76a331eb61825c06cfd935fd490f4d93791c0af1

Pressing a key fires `"keydown"`, `"keypress"`, and `"keyup"` events.
Pressing a mouse button fires `"mousedown"`, `"mouseup"`, and
`"click"` events. Moving the mouse fires `"mousemove"` and possibly
`"mouseenter"` and `"mouseout"` events.
@!0c0c74644c0b63ee30fb9e84d9faedfc567d84a7

Scrolling can be detected with the `"scroll"` event, and focus changes
can be detected with the `"focus"` and `"blur"` events. When the document finishes
loading, a `"load"` event fires on the window.
@!332f8dcb2a6126d70c4fee0b514630e1e71922fe

Only one piece of JavaScript program can run at a time. Thus, event
handlers and other scheduled scripts have to wait until other scripts
finish before they get their turn.
@!b2716fd820657ae4c8df70311cd23d2a4533e33c

## Exercises
@!35ce9bcbd051f7df0e671218a417744de6ae748d

### Censored keyboard
@!b7f5dac35069a7ea6aa2e8183695649c5c128953

{{index Turkish, Kurds, "censored keyboard (exercise)"}}
@!350a10872c05befff7dfd2e1420b70d626baf4e5

Between 1928
and 2013, Turkish law forbade the use of the letters _Q_, _W_, and _X_
in official documents. This was part of a wider initiative to stifle
Kurdish culture—those letters occur in the language used by Kurdish
people but not in Istanbul Turkish.
@!524dd0b9e2e324dd467a80f067c3cefe43883aa7

{{index typing, "input (HTML tag)"}}
@!54a7ec80a7775e7841b3b392b5ffaceb2a4f75b8

As an exercise in doing ridiculous
things with technology, I'm asking you to program a ((text field)) (an
`<input type="text">` tag) that these letters cannot be typed into.
@!6bb756f5555f81ad3d3741d607785ba7c8384043

{{index clipboard}}
@!ff4325c4bb482c67940bd5787016c22925fd9c9f

(Do not worry about copy and paste and other such
loopholes.)
@!3fb2042eaef51e6766722d98b0311252ee5e1fe5

{{if interactive
@!27a04b4c8677e746fa33f64edf45b370c9bfb9e1

```{lang: "text/html", test: no}
<input type="text">
<script>
  var field = document.querySelector("input");
  // Your code here.
</script>
```
@!685ecbbe66e968d4aa61c6fc0c8359bf510d682d

if}}
@!8a692cbaafb1e6c202c65fd382b7a06c47578a49

{{hint
@!5c59ef5a34ea50ce8ae05cc812d1110083b71f2e

{{index "keypress event", "keydown event", "preventDefault method", "censored keyboard (exercise)"}}
@!1f0ace9c861f177a397b0c1ef8017dde9f12204d

The solution to this
exercise involves preventing the ((default behavior)) of key events.
You can handle either `"keypress"` or `"keydown"`. If either of them
has `preventDefault` called on it, the letter will not appear.
@!ea6ce19973cf046e03f3c07b1695d76b8a50c6d2

{{index "keyCode property", "charCode property", capitalization}}
@!2d3e966587ad8b62c9d1bf6c33bfb581d0f55de3

Identifying the letter typed requires
looking at the `keyCode` or `charCode` property and comparing that
with the codes for the letters you want to filter. In `"keydown"`, you
do not have to worry about lowercase and uppercase letters, since it
identifies only  the key pressed. If you decide to handle `"keypress"`
instead, which identifies the actual character typed, you have to make
sure you test for both cases. One way to do that would be this:
@!1fd0885919624522c139317c4c6b0213ea676c87

```{lang: null}
/[qwx]/i.test(String.fromCharCode(event.charCode))
```
@!ba0dc0902cbe0b268a3bbb75110ab1329e3f0dd5

hint}}
@!b766b572ef331c1e6588b33637bb28b1465cbe50

### Mouse trail
@!9898811f47ba22b939d4d2128654577cfe4c9af5

{{index animation, "mouse trail (exercise)"}}
@!988a84bb1a80739141bbdf1dee64e63b4950c3e9

In JavaScript's early days,
which was the high time of ((gaudy home pages)) with lots of animated
images, people came up with some truly inspiring ways to use the
language.
@!fa0f946ba60cc271def6cb7e0b99f32c267fc004

One of these was the “mouse trail”—a series of images that would
follow the mouse pointer as you moved it across the page.
@!055697b055861953f6cefa7c61ba277a61de96b5

{{index "absolute positioning", "background (CSS)"}}
@!e74a21b13a74df8a08db3f58a92045faedf5eea8

In this exercise, I
want you to implement a mouse trail. Use absolutely positioned `<div>`
elements with a fixed size and background color (refer to the
[code](14_event.html#mouse_drawing) in the “Mouse Clicks”
section for an example). Create a bunch of such elements and, when the
mouse moves, display them in the wake of the mouse pointer.
@!12d6f71e76010da32334fb399f27728e69066307

{{index "mousemove event"}}
@!138c7fe6ce7bb3e3346a941de639b0c6656473a8

There are various possible approaches here. You
can make your solution as simple or as complex as you want. A simple
solution to start with is to keep a fixed number of trail elements and
cycle through them, moving the next one to the mouse's current
position every time a `"mousemove"` event occurs.
@!de35eef8fb06f9e22a4d72a4aff6182752bb0a78

{{if interactive
@!ec29c41a8b20cef7dc3473e99bac7ee0bfdf710d

```{lang: "text/html", test: no}
<style>
  .trail { /* className for the trail elements */
    position: absolute;
    height: 6px; width: 6px;
    border-radius: 3px;
    background: teal;
  }
  body {
    height: 300px;
  }
</style>

<script>
  // Your code here.
</script>
```
@!1da43ee13e29e03c5640a115ca6d1bc8f69e1529

if}}
@!21e2d283b58af3f6e4e585f76404f17b4e01487e

{{hint
@!d46451ab8dabd299e471c73a6f839e1e7308994e

{{index "mouse trail (exercise)"}}
@!269271ce4383c0336db112c9467a2c3bbc574a41

Creating the elements is best done in a
loop. Append them to the document to make them show up. To be
able to access them later to change their position, store the trail
elements in an array.
@!238f29e768146bbc136bf190b1bc39e2cc41fc66

{{index "mousemove event", [array, indexing], "remainder operator", "% operator"}}
@!1471ecb214ff60db47fd141c952f2ef15fd29c33

Cycling through them can be done by keeping a ((counter
variable)) and adding 1 to it every time the `"mousemove"` event
fires. The remainder operator (`% 10`) can then be used to get a valid
array index to pick the element you want to position during a given
event.
@!7ef87e1d423318f5b9ed4464d2a97d1a231d18d3

{{index simulation, "requestAnimationFrame function"}}
@!fda086be7e1a5ff25e2e535bb7c43553200a923b

Another
interesting effect can be achieved by modeling a simple ((physics))
system. Use the `"mousemove"` event only to update a pair of variables
that track the mouse position. Then use `requestAnimationFrame` to
simulate the trailing elements being attracted to the position of the
mouse pointer. At every animation step, update their position based on
their position relative to the pointer (and, optionally, a speed that
is stored for each element). Figuring out a good way to do this is up
to you.
@!685abc9629b3df2c7c9f4c23dd4360e1c08fe951

hint}}
@!5c98ab06989190f3bcdb395ed54b49ace96c35e1

### Tabs
@!579662445590df68a9b791d845aeeb4600acab68

{{index "tabbed interface (exercise)"}}
@!fc5531a54476d8150cb6f95528d7b47f3fe151e0

A tabbed interface is a common design
pattern. It allows you to select an interface panel by choosing from
a number of tabs “sticking out” above an element.
@!e7c6137998aace3fb3f638a3c9828bf6e3f53456

{{index "button (HTML tag)", "display (CSS)", "hidden element", "data attribute"}}
@!d92608b7bfa58dbdf089e5d77acc974284540bae

In this exercise you'll implement a simple tabbed
interface. Write a function, `asTabs`, that takes a DOM node and
creates a tabbed interface showing the child elements of that node. It
should insert a list of `<button>` elements at the top of the node,
one for each child element, containing text retrieved from the
`data-tabname` attribute of the child. All but one of the original
children should be hidden (given a `display` style of `none`), and the
currently visible node can be selected by clicking the buttons.
@!3c0b1a760fc116a2f185d0d7da3c3620dbe21453

When it works, extend it to also style the currently active button
differently.
@!b918c33296a640d8706664630b3d6ecd33869c50

{{if interactive
@!f99139a60b7ee298d546ea8bef51326ab8eb6f5b

```{lang: "text/html", test: no}
<div id="wrapper">
  <div data-tabname="one">Tab one</div>
  <div data-tabname="two">Tab two</div>
  <div data-tabname="three">Tab three</div>
</div>
<script>
  function asTabs(node) {
    // Your code here.
  }
  asTabs(document.querySelector("#wrapper"));
</script>
```
@!e37af4ce9aba5e00d08f1a03e1c27340c227b533

if}}
@!e0516f07bf55c55c982a5c993746d638e614ac33

{{hint
@!3ede7a42a4659a7968f4363884c8c207069d84a8

{{index "text node", "childNodes property", "live data structure", "tabbed interface (exercise)"}}
@!0e90dcb03730e5edc1ce76e238a3d7f2b6b60b79

One pitfall you'll
probably run into is that you can't directly use the node's
`childNodes` property as a collection of tab nodes. For one thing,
when you add the buttons, they will also become child nodes and end
up in this object because it is live. For another, the text nodes
created for the ((whitespace)) between the nodes are also in there
and should not get their own tabs.
@!5e534a1ee6aff72111d94223a1d2929fd62a5b01

{{index "TEXT_NODE code", "nodeType property"}}
@!017b99cdda7f1deb2d9e4965b0e2b655ac57f93f

To work around this, start
by building up a real array of all the children in the wrapper that
have a `nodeType` of 1.
@!42aa7786ae9c435f88bda57a808d5969d8323b4a

{{index "event handling", closure}}
@!40f7153c00638e8b28b778d44ea939cf5a8c0fa0

When registering event handlers on
the buttons, the handler functions will need to know which tab element
is associated with the button. If they are created in a normal loop,
you can access the loop index variable from inside the function, but
it won't give you the correct number because that variable will have
been further changed by the loop.
@!c08b1faf40049f1eb0a049dc77ff3f5d9675fdf8

{{index "forEach method", "local variable", loop}}
@!e46f803fb7f78e782356761ddf56aa2a8d0c9a06

A simple workaround
is to use the `forEach` method and create the handler functions from
inside the function passed to `forEach`. The loop index, which is
passed as a second argument to that function, will be a normal local
variable there and won't be overwritten by further iterations.
@!ad06ca5e93b32cb06397a0bf73a8335bfc060f86

hint}}
@!afdd955fa11ca46d87828b844fbec5eae74ac5c7