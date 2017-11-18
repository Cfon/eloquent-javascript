{{meta {chap_num: 19, prev_link: 18_forms, next_link: 20_node, load_files: ["code/chapter/19_paint.js"], zip: "html include=[\"css/paint.css\"]"}}}
@!fbcd36bde53805f06b2ca313cc455f52edeec171

# Project: A Paint Program
@!8dc400bf8432dcd616d0acb289c4085c8c544c62

{{quote {author: "Joan Miro,"}
@!947bb065b1027f9299f657366d4ba15394fefe86

I look at the many colors before me. I look at
my blank canvas. Then, I try to apply colors like words that shape
poems, like notes that shape music.
@!578e068fb76d5f31c20ec83e2326f2a94fa699f3

quote}}
@!edf9c506b316a1445f636f52a4a39d991b8e790b

{{index "Miro, Joan", "drawing program example", "project chapter"}}
@!b74078508487d6e50fdac23cc69e894c4bc29ea6

The material from the previous chapters gives you all the
elements you need to build a simple ((web application)). In this
chapter, we will do just that.
@!1651d7f37d40a01eb774fd305895d3111dbbe1b3

Our application will be a web-based ((drawing)) program, along
the lines of ((Microsoft Paint)). You can use it to open image
((file))s, scribble on them with your mouse, and save them. This
is what it will look like:
@!0478d4061d244692a3ad2373df408b01bff33d8b

{{figure {url: "img/paint.png", alt: "A simple paint program"}}}
@!41571c717bf334533a321f416ec003242a13fb7e

Painting on a computer is great. You don't need to worry about
materials, ((skill)), or talent. You just start smearing.
@!f79bcc6ae7251311f5a1e95c061e8ef8e26dd2d6

## Implementation
@!495483af3668be521bdcfc65d84c2ae224e96450

{{index drawing, "select (HTML tag)", "canvas (HTML tag)"}}
@!36b1172c348d4130c0dde49159a7a4288e7d9b41

The
interface for the paint program shows a big `<canvas>` element on top,
with a number of form ((field))s below it. The user draws on the
((picture)) by selecting a tool from a `<select>` field and then
clicking or dragging across the canvas. There are ((tool))s for
drawing lines, erasing parts of the picture, adding text, and so on.
@!56dca94a02f914ed37c9d25bbf8a127c3a8072b3

{{index "line tool", mouse, "mousedown event", "mousemove event", "mouseup event"}}
@!4769f2d4543ba389f57166715a928358b39b71d7

Clicking the canvas will hand off the
`"mousedown"` event to the currently selected tool, which can handle
it in whichever way it chooses. The line ((drawing)) tool, for
example, will listen for `"mousemove"` events until the mouse button
is released and draw lines along the mouse's path using the current
((color)) and ((brush)) size.
@!ef06ec93b1af60557963309abbc43aeaeb3a1e43

{{index "fillStyle property", "strokeStyle property", "lineWidth property", "change event"}}
@!a6bd6c193851880a3d157e3022e6e9f40d0cadb3

Color and brush size are selected with
additional form fields. These are hooked up to update the canvas
drawing context's `fillStyle`, `strokeStyle`, and `lineWidth` whenever
they are changed.
@!8d75692b84a17fc2b6d053496f04a9b4e9d83e0f

You can load an ((image)) into the program in two ways. The
first uses a file field, where the user can select a file on their own
((file system)). The second asks for a ((URL)) and will fetch an
image from the Web.
@!e6e20b3ef488556f47f8e9ae1d39dc213e88d0e0

{{index saving}}
@!6b8c424d6a18b5123404f66373578ec25951e785

Images are saved in a somewhat atypical way. The
save ((link)) at the right side points at the current image. It
can be followed, shared, or saved. I will explain how this is achieved
in a moment.
@!605262e62eb029e3ef89956131ee0e215bc38625

## Building the DOM
@!37a182b77aae7e601668ddad0bac55edeedfeadd

Our program's interface is built from more than 30 ((DOM)) elements. We
need to construct these somehow.
@!b3ae7117c23bab9f669e8b31b9176ab13df05c33

{{index HTML, "querySelector method", "event handling"}}
@!6cccd34edb0b12b47632afffecfd8898e3fe82e3

HTML is the
most obvious format for defining complex DOM structures. But
separating the program into a piece of HTML and a script is made
difficult by the fact that many of the DOM elements need event
handlers or have to be touched by the script in some other way. Thus,
our script would have to make lots of `querySelector` (or similar)
calls in order to find the DOM elements that it needs to act on.
@!2ea91741debaf2fc8a462252dfcb0391dbb5fff9

{{index [DOM, construction], readability, verbosity, "createElement method"}}
@!0eeb6b5417ece700cb3d7dd3b358e5238e13ad32

It would be nice if the DOM structure for each part of our
interface is defined close to the JavaScript code that drives it.
Thus, I've chosen to do all creation of DOM nodes in JavaScript. As we
saw in [Chapter 13](13_dom.html#standard), the built-in interface
for building up a DOM structure is horrendously verbose. If we are
going to do a lot of DOM construction, we need a helper function.
@!52f66018cc13d4a747e41d55f9c178e25abc4324

{{index "elt function"}}
@!258b3d91b095096a80746a9c8932300587881399

This helper function is an extended version of the
`elt` function from [Chapter 13](13_dom.html#elt). It creates an
element with the given name and ((attribute))s and appends all
further arguments it gets as child nodes, automatically converting
strings to ((text node))s.
@!474d8a1361f042c385fb3025ca0cabd55ded7236

```{sandbox: "paint", includeCode: true}
function elt(name, attributes) {
  var node = document.createElement(name);
  if (attributes) {
    for (var attr in attributes)
      if (attributes.hasOwnProperty(attr))
        node.setAttribute(attr, attributes[attr]);
  }
  for (var i = 2; i < arguments.length; i++) {
    var child = arguments[i];
    if (typeof child == "string")
      child = document.createTextNode(child);
    node.appendChild(child);
  }
  return node;
}
```
@!fefb8a33f278779d4ec64fd15bfa193ab02eb598

This allows us to create elements easily, without making our source
code as long and dull as a corporate end-user agreement.
@!015546e9cfe613a461b741bbfe985b8521e93e75

## The foundation
@!afe9bbe6a3cceb8bef482d5e868f771103764936

{{index "createPaint function", "controls object"}}
@!3c8ce232a7b7911aa1fb87c54c1718c9e9916407

The core of our program
is the `createPaint` function, which appends the paint interface to
the DOM element it is given as an argument. Because we want to build our
program piece by piece, we define an object called `controls`, which will
hold functions to initialize the various controls below the image.
@!beb3fe2e243b66817285a633eadbacd1f09737a8

```{sandbox: "paint", includeCode: true}
var controls = Object.create(null);

function createPaint(parent) {
  var canvas = elt("canvas", {width: 500, height: 300});
  var cx = canvas.getContext("2d");
  var toolbar = elt("div", {class: "toolbar"});
  for (var name in controls)
    toolbar.appendChild(controls[name](cx));

var panel = elt("div", {class: "picturepanel"}, canvas);
  parent.appendChild(elt("div", null, panel, toolbar));
}
```
@!d07faaf0baa45396af86b254729626498f901b61

{{index "fillStyle property", "lineWidth property", "canvas property", context}}
@!ed071add2066a1e932b2a3e79394e149eddb627d

Each control has access to the ((canvas))
drawing context and, through that context's `canvas` property, to the
`<canvas>` element. Most of the program's state lives in this
canvas—it contains the current picture as well as the selected color
(in its `fillStyle` property) and brush size (in its `lineWidth`
property).
@!eb8208d06de211aecf4eb46ee05e8633d444aaa9

{{index "class attribute", CSS}}
@!533a618dcd1c593b5532e6ae91cba14a6edd2988

We wrap the canvas and the controls in
`<div>` elements with classes so we can add some styling, such as
a gray border around the picture.
@!34b82131046061048362c81fc52b2bc5d13d66db

## Tool selection
@!f1250f7d5b5d869ce7730849ef3c1360de9ae7f6

{{index mouse, "tools object", "hard-coding", "select (HTML tag)"}}
@!42a7015ebea698bfc38319270e32e6f14b5b776b

The first control we add is the `<select>` element that
allows the user to pick a drawing ((tool)). As with `controls`, we
will use an object to collect the various tools so that we do not
have to hard-code them all in one place and can add more tools later.
This object associates the names of the tools with the function that
should be called when they are selected and the canvas is clicked.
@!fe6c0c5c85a36038587b892927d2378648d814fd

```{sandbox: "paint", includeCode: true}
var tools = Object.create(null);

controls.tool = function(cx) {
  var select = elt("select");
  for (var name in tools)
    select.appendChild(elt("option", null, name));

cx.canvas.addEventListener("mousedown", function(event) {
    if (event.which == 1) {
      tools[select.value](event, cx);
      event.preventDefault();
    }
  });

return elt("span", null, "Tool: ", select);
};
```
@!0ec7f38d098b11a833437a59985dd74bfc8bf3fd

{{index "preventDefault method", selection, "option (HTML tag)", "mousedown event"}}
@!91f806dcb32494ce04d9d7f33d0fd0e9b0b1f891

The tool field is populated with
`<option>` elements for all tools that have been defined, and a
`"mousedown"` handler on the canvas element takes care of calling the
function for the current tool, passing it both the ((event object))
and the drawing ((context)) as arguments. It also calls
`preventDefault` so that holding the mouse button and dragging does
not cause the browser to select parts of the page.
@!f49a64a3d746886139c29cab14a255277dd6d286

{{index "relativePos function", "event object", "getBoundingClientRect method", "clientX property", "clientY property"}}
@!57495ff7b81922433953f02d507ffd398e0bc967

The most basic
tool is the ((line tool)), which allows the user to draw lines with
the ((mouse)). To put the line ends in the right place, we
need to be able to find the canvas-relative ((coordinates)) that a
given mouse event corresponds to. The `getBoundingClientRect` method,
briefly mentioned in [Chapter 13](13_dom.html#boundingRect), can
help us here. It tells us where an element is shown, relative to the
top-left corner of the screen. The `clientX` and `clientY` properties
on mouse events are also relative to this corner, so we can subtract
the top-left corner of the canvas from them to get a position relative
to that corner.
@!5a9bc26163b5feeded8920796da08ef61a23e406

```{sandbox: "paint", includeCode: true}
function relativePos(event, element) {
  var rect = element.getBoundingClientRect();
  return {x: Math.floor(event.clientX - rect.left),
          y: Math.floor(event.clientY - rect.top)};
}
```
@!25f79f695ae715d770ad3d6f5c152d643cec6bde

{{index "mouseup event", "mousemove event", "trackDrag function"}}
@!e85fc6bdca83f7cd302c984e9aad333753d8921f

Several of the drawing tools need to listen for
`"mousemove"` events as long as the mouse button is held down. The
`trackDrag` function takes care of the event registration and
unregistration for such situations.
@!46f5ea61cf1f9e65c58e7ba2c368365371789793

```{sandbox: "paint", includeCode: true}
function trackDrag(onMove, onEnd) {
  function end(event) {
    removeEventListener("mousemove", onMove);
    removeEventListener("mouseup", end);
    if (onEnd)
      onEnd(event);
  }
  addEventListener("mousemove", onMove);
  addEventListener("mouseup", end);
}
```
@!fbaadc2833296faeb654a31695683c219cafb56a

This function takes two arguments. One is a function to call for each 
`"mousemove"` event, and the other is a function to call when the
mouse button is released. Either argument can be omitted when it
is not needed.
@!7c6b65a3e3017ee3afc1af4009ac79aea2ee331b

{{index "line tool"}}
@!5012f08739c213d5242b910a8203f3ae07488365

The line tool uses these two helpers to do the actual
drawing.
@!249cb699a0131c3e5b2473ce235d0774938469b0

```{sandbox: "paint", includeCode: true}
tools.Line = function(event, cx, onEnd) {
  cx.lineCap = "round";

var pos = relativePos(event, cx.canvas);
  trackDrag(function(event) {
    cx.beginPath();
    cx.moveTo(pos.x, pos.y);
    pos = relativePos(event, cx.canvas);
    cx.lineTo(pos.x, pos.y);
    cx.stroke();
  }, onEnd);
};
```
@!8a7ef7ba3829a107c9ac61b37d31870adb33f4b3

{{index [path, canvas], "lineCap property", line}}
@!b4d4884114c416fb78cfac6569cf3b0a08b4db71

The function starts by setting the drawing
context's `lineCap` property to `"round"`, which causes both ends of
a stroked path to be round rather than the default square form.
This is a trick to make sure that multiple separate lines, drawn in 
response to separate events, look like a single, coherent line. With 
bigger line widths, you will see gaps at corners if you use the default flat
line caps.
@!3c7bd6e1031be341fb52262e6a37ceda607f38d3

{{index "mousemove event", "strokeStyle property", "lineWidth property"}}
@!284e29df6793b0e6c9703e8fdcfcf8b3c3ce857f

Then, for every `"mousemove"` event that occurs as long as
the mouse button is down, a simple line segment is drawn between the
mouse's old and new position, using whatever `strokeStyle` and
`lineWidth` happen to be currently set.
@!59745610bc859786d4f3f1d320b54a1e68c06c05

{{index "erase tool"}}
@!843c09efd688204399d845418aca3ffea0250d3c

The `onEnd` argument to `tools.Line` is simply passed
through to `trackDrag`. The normal way to run tools won't pass a third
argument, so when using the line tool, that argument will hold
`undefined`, and nothing happens at the end of the mouse drag. The
argument is there to allow us to implement the erase tool on top of
the line tool with very little additional code.
@!8eeb67afb1095a0c07e694cc2aad866d35e89174

```{sandbox: "paint", includeCode: true}
tools.Erase = function(event, cx) {
  cx.globalCompositeOperation = "destination-out";
  tools.Line(event, cx, function() {
    cx.globalCompositeOperation = "source-over";
  });
};
```
@!ce7b30f979f7b5b04201612bd26d57d6ccae6dc0

{{index "globalCompositeOperation property", compositing, "erase tool"}}
@!0ed5b3f2013f22dea1fefe6ac511652d0bafad7b

The `globalCompositeOperation` property influences the way
drawing operations on a canvas change the color of the pixels they
touch. By default, the property's value is `"source-over"`, which means that the drawn
color is overlaid on the existing color at that spot. If the ((color)) is
opaque, it will simply replace the old color, but if it is
partially transparent, the two will be mixed.
@!e5485a96b4020d9a8c61e8e88623981c260a6c77

The erase tool sets `globalCompositeOperation` to
`"destination-out"`, which has the effect of erasing the pixels we
touch, making them transparent again.
@!60ed2c07f43ae3c2a6d2fe7b4c658a6d82be54d6

{{index drawing}}
@!0116cbf8210a4ac380415e096edcd7d88d1cec13

That gives us two tools in our paint program. We can draw
black lines a single pixel wide (the default `strokeStyle` and
`lineWidth` for a canvas) and erase them again. It is a working,
albeit rather limited, paint program.
@!666a8317b14d91ecdd57c9d3700411da42b5cb21

## Color and brush size
@!065f4bde1850baabfe08adc240a84cadbfc0b43d

{{index "controls object"}}
@!a3e9c804e441e11e6a82f282bb49d7455f4c65e0

Assuming that users will want to draw in
((color))s other than black and use different ((brush)) sizes, let's
add controls for those two settings.
@!3d10d7351541f640ce9757c2fe2245d670227c41

{{index "color picker", "HTML5 form fields", "date field", "time field", "email field", "number field", compatibility}}
@!c882099c47e3faa0554e0421adea9217b01ef627

In
[Chapter 18](18_forms.html#forms), I discussed a number of
different form ((field))s. Color fields were not among those.
Traditionally, browsers don't have built-in support for color
pickers, but in the past few years, a number of new form field types have
been ((standard))ized. One of those is `<input type="color">`. Others
include `"date"`, `"email"`, `"url"`, and `"number"`. Not all
((browser))s support them yet—at the time of writing, no version of
Internet Explorer supports color fields. The default type of
an `<input>` tag is `"text"`, and when an unsupported type is used,
browsers will treat it as a text field. This means that Internet
Explorer users running our paint program will have to type in the name
of the color they want, rather than select it from a convenient
widget.
@!21676bb88645d458b919bca1c060ba8064383190

{{if book
@!8540b30758e97b6eabb0efdf3584b49814b4d279

This is what a color picker may look like:
@!2db34c795b1bfb68140b5d116f3662d1d45482c8

{{figure {url: "img/color-field.png", alt: "A color field",width: "6cm"}}}
@!803fe523207930b39f16b00443000f70e08ec81a

if}}
@!73fc2e0cdb0686456fe5f9f8804e44d07d08e521

```{sandbox: "paint", includeCode: true}
controls.color = function(cx) {
  var input = elt("input", {type: "color"});
  input.addEventListener("change", function() {
    cx.fillStyle = input.value;
    cx.strokeStyle = input.value;
  });
  return elt("span", null, "Color: ", input);
};
```
@!b42d7b5eda8d1cbcd2c2acd69b1c25ea1f25bf70

{{index "fillStyle property", "strokeStyle property", "change event"}}
@!3fd0bbfbe10efeb7dcfac6c7ab792910e403d4f0

Whenever the value of the color field changes, the drawing
context's `fillStyle` and `strokeStyle` are updated to hold the new
value.
@!b6c76892f9aae078749b4200dda6bda3464d2839

The field for configuring the ((brush)) size works similarly.
@!11da9b31620641d8a0945ff06c3ae353fcf78627

```{sandbox: "paint", includeCode: true}
controls.brushSize = function(cx) {
  var select = elt("select");
  var sizes = [1, 2, 3, 5, 8, 12, 25, 35, 50, 75, 100];
  sizes.forEach(function(size) {
    select.appendChild(elt("option", {value: size},
                           size + " pixels"));
  });
  select.addEventListener("change", function() {
    cx.lineWidth = select.value;
  });
  return elt("span", null, "Brush size: ", select);
};
```
@!b834237ae875334eac73cd974a0adf33e46d69d0

{{index "lineWidth property"}}
@!798cf91627c0444c5ca0cab58b4e62cb1af1ebe7

The code generates options from an array of brush
sizes, and again ensures that the canvas’ `lineWidth` is updated when
a brush size is chosen.
@!f9e54c8f0b90ebc966b0c42292b4db2b8188d1b0

## Saving
@!d3886507bb5d7c0717762a7c57de53dad82b51d4

{{index "save link"}}
@!9a4d91450bf981c56765b5bbfda046da7bf93d68

To explain the implementation of the save link, I
must first tell you about _((data URL))s_. A data ((URL)) is a URL
with _data:_ as its ((protocol)). Unlike regular _http:_ and _https:_
URLs, data URLs don't point at a resource but rather contain the entire
((resource)) in them. This is a data URL containing a 
simple HTML document:
@!074362398ec78d97d95d74512d86c6e2d030db95

```{lang: null}
data:text/html,<h1 style="color:red">Hello!</h1>
```
@!4818d973fea1eba8abfdc81c47de8325b4819938

Data URLs are useful for various tasks, such as including small
images directly in a ((style sheet)) file. They also allow us to link
to files that we created on the client side, in the browser, without
first moving them to some server.
@!86772645c9713c2e91c722c17440d30d22ca959f

{{index canvas, "toDataURL method", optimization, "href attribute"}}
@!d32fb194853f0f94de252cbe8ef5f64405a35368

Canvas elements have a convenient method, called `toDataURL`,
which will return a data URL that contains the picture on the canvas
as an image file. We don't want to update our save link every time
the picture is changed, however. For big pictures, that involves moving
quite a lot of data into a link and would be noticeably slow.
Instead, we rig the link to update its `href` attribute whenever it is
focused with the keyboard or the mouse is moved over it.
@!c6c4b5af115d72e3ce593d95c4f679ae6099edfe

```{sandbox: "paint", includeCode: true}
controls.save = function(cx) {
  var link = elt("a", {href: "/"}, "Save");
  function update() {
    try {
      link.href = cx.canvas.toDataURL();
    } catch (e) {
      if (e instanceof SecurityError)
        link.href = "javascript:alert(" +
          JSON.stringify("Can't save: " + e.toString()) + ")";
      else
        throw e;
    }
  }
  link.addEventListener("mouseover", update);
  link.addEventListener("focus", update);
  return link;
};
```
@!1aa870d754751775e83d5a81b153c0eb9f8cfec7

{{index "mouseover event", "focus event", magic}}
@!e8e6a786e2a024f3c0dea61cfdd18e238f432e2d

Thus, the link just
quietly sits there, pointing at the wrong thing, but when the user
approaches it, it magically updates itself to point at the current
picture.
@!6419606bc3c8bc319875a149f5844d401060aa61

If you load a big image, some ((browser))s will choke on the
giant data URLs that this produces. For small pictures, this
approach works without problem.
@!1332dca7d3465b93400e82ea57261a80a5c20b7c

{{index security, privacy, "cross-domain request"}}
@!02cad2d01a16df121ee56552f852898377a9019f

But here we once
again run into the subtleties of browser ((sandbox))ing. When an
((image)) is loaded from a URL on another ((domain)), if the server's
response doesn't include a header that tells the browser the
resource may be used from other domains (see
[Chapter 17](17_http.html#http_sandbox)), then the ((canvas)) will
contain information that the _user_ may look at but that the
_script_ may not.
@!574d3f15933735219c6e3150d079e3c1ca107448

We may have requested a picture that contains
private information (for example, a graph showing the user's bank
account balance) using the user's ((session)). If scripts could get
information out of that picture, they could snoop on the user in
undesirable ways.
@!cd94ff354546d51ae0d62d571e00ffaa63d660da

{{index tainting, pixel}}
@!2fba654f1c6be826ba4eb138f06d1b8ab37f110a

To prevent these kinds of information
((leak))s, ((browser))s will mark a canvas as _tainted_ when an image
that the script may not see is drawn onto it. Pixel data, including
data URLs, may not be extracted from a tainted canvas. You can write
to it, but you can no longer read it.
@!835cbc689d3cd72e20093a17620ce9c58149e4f5

{{index "try keyword", "toDataURL method", "exception handling", "SecurityError type"}}
@!373dd03f0e65c912ba838e5a31fb8288b45d491e

This is why we need the
`try/catch` statement in the `update` function for the save link.
When the canvas has become tainted, calling `toDataURL` will raise an
exception that is an instance of `SecurityError`. When that happens, we
set the link to point at yet another kind of URL, using the
_javascript:_ protocol. Such links simply execute the script given
after the colon when they are followed so that the link will show an
`alert` window informing the user of the problem when it is clicked.
@!d578e7fa3f477f91577fbff8b3478e60ba4ffc87

## Loading image files
@!fa9f1ce4aa29665fdfd04c1e755adc916e18d986

{{index "img (HTML tag)", "load event", "file system"}}
@!3281cfa194946539c91f7007cc28f8fedb2e2684

The final two
controls are used to load images from local files and from URLs.
We'll need the following helper function, which tries to load an image
file from a ((URL)) and replace the contents of the canvas with it:
@!c319e99453f240fcf9b04d3767e30ffcec624429

```{sandbox: "paint", includeCode: true}
function loadImageURL(cx, url) {
  var image = document.createElement("img");
  image.addEventListener("load", function() {
    var color = cx.fillStyle, size = cx.lineWidth;
    cx.canvas.width = image.width;
    cx.canvas.height = image.height;
    cx.drawImage(image, 0, 0);
    cx.fillStyle = color;
    cx.strokeStyle = color;
    cx.lineWidth = size;
  });
  image.src = url;
}
```
@!aa9984c94366b17323c88c376d5b2cb4d8a6e4d8

{{index resize, context, [canvas, context]}}
@!d6bc5e6d6f01e04311dd42a09f377000316727f0

We want to change the
size of the canvas to precisely fit the image. For some reason,
changing the size of a canvas will cause its drawing context to forget
configuration properties such as `fillStyle` and `lineWidth`, so the
function saves those and restores them after it has updated the canvas
size.
@!7d4a016575a9f4dd00ec02e496a1d57c7009b81e

{{index "FileReader type", "readAsDataURL method"}}
@!c408c8600e90493822a98e03492457a1e662be88

The control for loading
a local file uses the `FileReader` technique from
[Chapter 18](18_forms.html#filereader). Apart from the `readAsText`
method we used there, such reader objects also have a method called
`readAsDataURL`, which is exactly what we need here. We load the
((file)) that the user chose as a data URL and pass it to
`loadImageURL` to put it into the canvas.
@!46266b60a04a89b3f4e1c9208fa5a954a64172da

```{sandbox: "paint", includeCode: true}
controls.openFile = function(cx) {
  var input = elt("input", {type: "file"});
  input.addEventListener("change", function() {
    if (input.files.length == 0) return;
    var reader = new FileReader();
    reader.addEventListener("load", function() {
      loadImageURL(cx, reader.result);
    });
    reader.readAsDataURL(input.files[0]);
  });
  return elt("div", null, "Open file: ", input);
};
```
@!ec1dd7648fa37a47a05bfc7fc5972e9c213048a0

{{index "change event", "form (HTML tag)", "submit event", "enter key"}}
@!618be6b308a5d658863b363474c7d6686779e294

Loading a file from a URL is even simpler. But with a ((text
field)), it is less clear when the user has finished writing the URL,
so we can't simply listen for `"change"` events. Instead, we will wrap
the field in a form and respond when the form is submitted, either
because the user pressed Enter or because they clicked the load
((button)).
@!4a66bd5ec850a0e26511aca3b2d47da62bdfb35a

```{sandbox: "paint", includeCode: true}
controls.openURL = function(cx) {
  var input = elt("input", {type: "text"});
  var form = elt("form", null,
                 "Open URL: ", input,
                 elt("button", {type: "submit"}, "load"));
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    loadImageURL(cx, input.value);
  });
  return form;
};
```
@!f1e0092c5c7640cba5572f6025599453fcfb3405

We have now defined all the controls that our simple paint program
needs, but it could still use a few more tools.
@!e740597b37921d873093e36e83ca4a4672883a95

## Finishing up
@!469e88c77921af1bbe90f604e778905eb96c31d3

{{index "prompt function"}}
@!d1056cceda24096db83b5f064bf7623dec880629

We can easily add a ((text)) ((tool)) that
uses `prompt` to ask the user which string it should draw.
@!80ae131554bfce50bf45d2254a9ba6fa8ef6943c

```{sandbox: "paint", includeCode: true}
tools.Text = function(event, cx) {
  var text = prompt("Text:", "");
  if (text) {
    var pos = relativePos(event, cx.canvas);
    cx.font = Math.max(7, cx.lineWidth) + "px sans-serif";
    cx.fillText(text, pos.x, pos.y);
  }
};
```
@!1cfc073e25e975db286aa6a6eeeb927ae6664d24

You could add extra fields for the ((font)) size and the
font, but for simplicity's sake, we always use a sans-serif font and
base the font size on the current brush size. The minimum size is 7
pixels because text smaller than that is unreadable.
@!8a5073322627355719d53cb955c674750b0edb14

{{index "spray paint tool", "random number"}}
@!c0098d06f68acda75ea6fa3edc927097b964f39d

Another indispensable tool
for drawing amateurish computer graphics is the spray paint tool.
This one draws dots in random locations under the ((brush)) as long as
the mouse is held down, creating denser or less dense speckling
based on how fast or slow the mouse moves.
@!0475b410569e30d3a7c7a1e50e32b1233976c4e8

```{sandbox: "paint", includeCode: true}
tools.Spray = function(event, cx) {
  var radius = cx.lineWidth / 2;
  var area = radius * radius * Math.PI;
  var dotsPerTick = Math.ceil(area / 30);

var currentPos = relativePos(event, cx.canvas);
  var spray = setInterval(function() {
    for (var i = 0; i < dotsPerTick; i++) {
      var offset = randomPointInRadius(radius);
      cx.fillRect(currentPos.x + offset.x,
                  currentPos.y + offset.y, 1, 1);
    }
  }, 25);
  trackDrag(function(event) {
    currentPos = relativePos(event, cx.canvas);
  }, function() {
    clearInterval(spray);
  });
};
```
@!7db28922a8d611a72de28dd7bc080f05375cf350

{{index "setInterval function", "trackDrag function"}}
@!2e0f16e7216624be2f775472f5ecd3d54b97b814

The spray tool uses
`setInterval` to spit out colored dots every 25 milliseconds as long
as the mouse button is held down. The `trackDrag` function is used to
keep `currentPos` pointing at the current mouse position and to turn
off the interval when the mouse button is released.
@!8072147c3d7b50ae400b920cdb0199f84eed405f

To determine how many dots to draw every time the interval fires, the
function computes the ((area)) of the current brush and divides that
by 30. To find a random position under the brush, the `randomPointInRadius`
function is used.
@!4a139d51cd8eae8355efdc945d4971b21debd2eb

```{sandbox: "paint", includeCode: true}
function randomPointInRadius(radius) {
  for (;;) {
    var x = Math.random() * 2 - 1;
    var y = Math.random() * 2 - 1;
    if (x * x + y * y <= 1)
      return {x: x * radius, y: y * radius};
  }
}
```
@!188a2458abb777ed770a59e94011326542afbc5f

{{index Pythagoras}}
@!0fd9d1663a7ae60fcd3739a0716a5fb2234e4da0

This function generates points in the square between (-1,-1)
and (1,1). Using the Pythagorean theorem, it tests whether the generated point lies within a ((circle))
of ((radius)) 1. As soon as the function finds such a point, it returns the point
multiplied by the `radius` argument.
@!7bb1649b72d785b75ef246dd7dc8b21016721611

{{index uniformity, "Math.sin function", "Math.cos function"}}
@!1e0000c67e0ec31facc2861729af28221848cfdf

The loop
is necessary for a uniform distribution of dots. The straightforward way 
of generating a random point within a circle would be to use a random ((angle)) and distance and
call `Math.sin` and `Math.cos` to create the corresponding point. But with that method, 
the dots are more likely to appear near the center of the circle. 
There are other ways around that, but they're more complicated than the previous loop.
@!7eea383e5dc8cdcb56d1261de146c8322623cfd8

We now have a functioning paint program.[ Run the code below to try it.]{if interactive}
@!bbb44897f4d8af6cfd8c85a73dc83df129ab6ade

{{if interactive
@!10fcd414920c2f3196452e0cc40484552efda7b5

```{lang: "text/html", sandbox: "paint", startCode: true}
<link rel="stylesheet" href="css/paint.css">

<body>
  <script>createPaint(document.body);</script>
</body>
```
@!81b05b1c66991f314cd269c949cafb61ea61c7ff

if}}
@!9dad2a5c4c5f70efadfd4695ef64dea9e696898b

## Exercises
@!418ddda8191da85f4561386740c1d533f73b093d

There is still plenty of room for improvement in this program. Let's
add a few more features as exercises.
@!9a309470850414330d9c959a5f0cb4c0643002ee

### Rectangles
@!9996c3b223217db1f7b6f8a47d25566a84f27c9d

{{index "fillRect method", "rectangle tool (exercise)"}}
@!39ed4fbfbe1107ad0aa4553debdfbff0eb8166d5

Define a ((tool))
called `Rectangle` that fills a rectangle (see the `fillRect` method
from [Chapter 16](16_canvas.html#fill_stroke)) with the current
color. The rectangle should span from the point where the user pressed
the ((mouse)) button to the point where they released it. Note that
the latter might be above or to the left of the former.
@!e5d237271e3335406531c2b04ff1464a7fd76b1f

{{index "user experience"}}
@!a58d0ffba4dfd39c0ae2327594da847f48dd9c9b

Once it works, you'll notice that it is somewhat
jarring to not see the rectangle as you are dragging the mouse to
select its size. Can you come up with a way to show some kind of
rectangle during the dragging, without actually drawing to the canvas
until the mouse button is released?
@!2b29adafdb75736b8c4e723fadbe7b0dd460b606

{{index "position (CSS)", "event object", "pageX property", "pageY property", "left (CSS)", "height (CSS)", "top (CSS)", "width (CSS)"}}
@!680396b8e3ebb3e60fb8336a301054aa72d1a401

If nothing comes to mind, think back to the `position:
absolute` style discussed in
[Chapter 13](13_dom.html#animation), which can be used to overlay a
node on the rest of the document. The `pageX` and `pageY` properties
of a mouse event can be used to position an element precisely under
the mouse, by setting the `left`, `top`, `width`, and `height` styles
to the correct pixel values.
@!945a5bd9738a632bc7648871897a0698320d102b

{{if interactive
@!c0113d7e37810866fa5048937f497f416405e2dd

```{lang: "text/html", test: no}
<script>
  tools.Rectangle = function(event, cx) {
    // Your code here.
  };
</script>

<link rel="stylesheet" href="css/paint.css">
<body>
  <script>createPaint(document.body);</script>
</body>
```
@!25e659eacac53945fd068dd83089a92df032e3d3

if}}
@!18b77207617ee92d7fe68b623706297780e42e25

{{hint
@!2c559d7ba06ccaea0bcd539bf94009d809f171b7

{{index "relativePos function", "trackDrag function", "rectangle tool (exercise)"}}
@!b7110359e813e6b3019cfae229bf4603e5526dd4

You can use `relativePos` to find the corner
corresponding to the start of the mouse drag. Figuring out where the
drag ends can be done with `trackDrag` or by registering your own
event handler.
@!e0701b42d92a19cfd226ca67f141c18cf7173b9f

{{index "fillRect method", "Math.min function", "Math.abs function"}}
@!90e4de63abe8c4913b84663c6a166a387b913a47

When you have two corners of the rectangle, you must
somehow translate these into the arguments that `fillRect` expects:
the top-left corner, width, and height of the rectangle. `Math.min`
can be used to find the leftmost x-coordinate and topmost
y-coordinate. To get the width or height, you can call `Math.abs` (the
absolute value) on the difference between two sides.
@!ff3f18bdc28fe1386448a46ae5578990682c70b3

{{index coordinates}}
@!12305580c1c3fa62032ee8ac2f27cd8ef256243d

Showing the rectangle during the mouse drag requires
a similar set of numbers but in the context of the whole page rather
than relative to the canvas. Consider writing a function `findRect`,
which converts two points into an object with `top`, `left`, `width`,
and `height` properties so that you don't have to write the same
logic twice.
@!1331e0f3431b41e64b4f8864d00b0da5674b4bc3

{{index "position (CSS)"}}
@!6389e0aac600b65b4b6f778e90ddfaa40e7d8cb6

You can then create a `<div>` node and set its
`style.position` to `absolute`. When setting positioning styles, do
not forget to append `"px"` to the numbers. The node must be added to
the document (you can append it to `document.body`) and also removed
again when the drag ends and the actual rectangle gets drawn onto the
canvas.
@!deb05113859387d4f8ab6b94c143fcb9a747aa44

hint}}
@!212575fa97c9be799560a14559bafa24649274e0

### Color picker
@!1412cc09f87d20365f46e7227c55fb5f55e5aec4

{{index "color picker (exercise)"}}
@!c7d2cf220ba297917c678b9b5965bd6d72b0b4c6

Another tool that is commonly found in
graphics programs is a ((color)) picker, which allows the user to
click the picture and selects the color under the mouse pointer.
Build this.
@!1a8a81a01be61b5362a050327a888ff47c10cb1b

{{index "getImageData method", "toDataURL method"}}
@!1eb0ea49a5b4395dae57bc8ea686ce88c24e8d10

For
this tool, we need a way to access the content of the ((canvas)). The
`toDataURL` method more or less did that, but getting ((pixel))
information out of such a data URL is hard. Instead, we'll use the
`getImageData` method on the drawing context, which returns a
rectangular piece of the image as an object with `width`, `height`,
and `data` properties. The `data` property holds an array of numbers
from 0 to 255, using four numbers to represent each pixel's red,
green, blue, and alpha (opaqueness) components.
@!512ce4a3dccaf332139c36cdedac028042e8a48c

This example retrieves the numbers for a single pixel from a canvas
once when the canvas is blank (all pixels are transparent black) and
once when the pixel has been colored red.
@!46a6cfc811fe8e597cf5e00010356df31dc444a7

```{test: no}
function pixelAt(cx, x, y) {
  var data = cx.getImageData(x, y, 1, 1);
  console.log(data.data);
}

var canvas = document.createElement("canvas");
var cx = canvas.getContext("2d");
pixelAt(cx, 10, 10);
// → [0, 0, 0, 0]

cx.fillStyle = "red";
cx.fillRect(10, 10, 1, 1);
pixelAt(cx, 10, 10);
// → [255, 0, 0, 255]
```
@!ef6a99c3c20a1cd5d2202119bed79087cce5d16b

The arguments to `getImageData` indicate the starting x- and
y-coordinates of the rectangle we want to retrieve, followed by its
width and height.
@!94d8157ce1668364f48de105d161441c9add0788

{{index transparent}}
@!81255237205ed89512eacd6f6293e559cce728e2

Ignore transparency during this exercise and look
only at the first three values for a given pixel. Also, do not worry
about updating the color field when the user picks a color. Just make
sure that the drawing context's `fillStyle` and `strokeStyle` are set
to the color under the mouse cursor.
@!11120806bc8eb008c232bd81d4c1419b90dafe94

{{index "rgb (CSS)"}}
@!e01886572c715a7107a9ac6e185d2e5cf4d3abb9

Remember that these properties accept any color that
CSS understands, which includes the `rgb(R, G, B)` style you saw in
[Chapter 15](15_game.html#game_css).
@!8c8cf9c500ef3161ab638f5e7926b02a7304f3d6

{{index "cross-domain request", sandbox, "getImageData method"}}
@!1737aeb340b48e5953d6b7ee3664684474cf9386

The
`getImageData` method is subject to the same restrictions as
_toDataURL_—it will raise an error when the canvas contains pixels
that originate from another domain. Use a `try/catch` statement to
report such errors with an `alert` dialog.
@!bd1347648c1ba25a13c0bb2bc8b3bbff3d2f01bd

{{if interactive
@!5c408eb89fcbe41ad8f78df1fc6beab8539902b8

```{lang: "text/html", test: no}
<script>
  tools["Pick color"] = function(event, cx) {
    // Your code here.
  };
</script>

<link rel="stylesheet" href="css/paint.css">
<body>
  <script>createPaint(document.body);</script>
</body>
```
@!243e72d52aee61b55cc78cb639a41c3632062e48

if}}
@!11e5dcfb56e7a49e1baab83956158e56440fbd4e

{{hint
@!9020f845b87710c83b57f292ce2608c582968b12

{{index "color picker (exercise)", "relativePos function", "rgb (CSS)"}}
@!5f9c794ae759ce9640700bb4828f4d4938535b1c

You'll again need to use `relativePos` to find out which
pixel was clicked. The `pixelAt` function in the example demonstrates how to get
the values for a given pixel. Putting those into an `rgb` string
merely requires some string ((concatenation)).
@!cee8174a2928d40e843be9fa8f3a97d26503de71

{{index "SecurityError type", "exception handling"}}
@!4ed2cf6c5db7033a809737a8c50135fb09cb48f9

Make sure you verify
that the exception you catch is an instance of `SecurityError` so
that you don't accidentally handle the wrong kind of exception.
@!10dc7723e56c48749cf855d27b8eca16b3fd868d

hint}}
@!0086996ece2d674f601242f23acc66c5c304de80

### Flood fill
@!2c538a86e7dbe63c6fdf5e7851d49ad3585c0d63

{{index "flood fill (exercise)"}}
@!2561019965aa546abb275e86fb90d9f7e249136d

This is a more advanced exercise than the
preceding two, and it will require you to design a nontrivial solution
to a tricky problem. Make sure you have plenty of time and
((patience)) before starting to work on this exercise, and do not get
discouraged by initial failures.
@!636f887ac700313a4cced614cab357f76c8e01cf

{{index "bucket fill"}}
@!59a92f198bd112f27177b6e3b084ef99258bc7a5

A flood fill tool colors the pixel under the mouse
and the surrounding pixels of the same color. For
the purpose of this exercise, we will consider such a group to include
all pixels that can be reached from our starting pixel by moving in
single-pixel horizontal and vertical steps (not diagonal), without
ever touching a pixel that has a color different from the starting
pixel.
@!757721e3fd58d59ab6f3e7bd8190664a71478d06

The following image illustrates the set of pixels colored when the flood
fill tool is used at the marked pixel:
@!2540cfdc2bc1305c4373fc036d99676c03b31c0a

{{figure {url: "img/flood-grid.svg", alt: "Flood fill example",width: "6cm"}}}
@!5911b7b3ef87bc29b6f56965529bf74be8f3e477

The flood fill does not leak through diagonal gaps and does not touch
pixels that are not reachable, even if they have the same color as the
target pixel.
@!25598146e8ea2851a214595823377525ec1aede1

{{index [array, "as grid"], "getImageData method"}}
@!9f16613c892dc940e2414f9b50cc402573d0a987

You will once again need
`getImageData` to find out the color for each ((pixel)). It is
probably a good idea to fetch the whole image in one go and then pick
out pixel data from the resulting array. The pixels are organized in
this array in a similar way to the ((grid)) elements in
[Chapter 7](07_elife.html#grid), one row at a time, except that
each pixel is represented by four values. The first value for the
pixel at (_x_,_y_) is at position (_x_ + _y_ × width) × 4.
@!b09b9b56f5ee1ad9f546d60fcdf8258d464bcca1

{{index alpha, transparent}}
@!bdbbecf33d8ca75101424df7c2d2b94ce1a83d28

Do include the fourth (alpha) value this
time since we want to be able to tell the difference between empty
and black pixels.
@!8b02229cdbe3897f64730c7940f8d2c8f940c234

{{index searching}}
@!9e5560cfd6768e94345b048e2d35609891badb1b

Finding all adjacent pixels with the same color
requires you to “((walk))” over the pixel surface, one pixel up, down,
left, or right, as long as new same-colored pixels can be found. But
you won't find all pixels in a group on the first walk. Rather, you
have to do something similar to the backtracking done by the regular
expression matcher, described in
[Chapter 9](09_regexp.html#backtracking). Whenever more than one
possible direction to proceed is seen, you must store all the
directions you do not take immediately and look at them later, when
you finish your current walk.
@!8fbaf9af258eff38f73c04f0ea3b6139956af921

{{index performance, optimization}}
@!bea40d8107a882e6ab225cca0875e894dc3b4f9e

In a normal-sized picture, there are
a _lot_ of pixels. Thus, you must take care to do the minimal amount
of work required or your program will take a very long time to run. For
example, every walk must ignore pixels seen by previous walks so that
it does not redo work that has already been done.
@!07de1510ef9c869bb82b34736c83a6861f300ba2

{{index "fillRect method"}}
@!cb4d501b85520d14b1678d1e3db3ed5235f67632

I recommend calling `fillRect` for individual
pixels when a pixel that should be colored is found, and keeping some
data structure that tells you about all the pixels that have already
been looked at.
@!21a3a9dde65a454f41eb4ced21668dd6bc3e13f1

{{if interactive
@!e651e414e29515600f5d074354d81f5c71660e1d

```{lang: "text/html", test: no}
<script>
  tools["Flood fill"] = function(event, cx) {
    // Your code here.
  };
</script>

<link rel="stylesheet" href="css/paint.css">
<body>
  <script>createPaint(document.body);</script>
</body>
```
@!dde98b9895352658353621b8dde7f820e03a8c62

if}}
@!2a311e9f0f0b8cf3f6abd7e983798ddfed437f6f

{{hint
@!48480bd091a7693502c5e568221d997fdaeb3b10

{{index algorithm, "bucket fill", "flood fill (exercise)"}}
@!4223a1684a45900652d220ab95f2580ac4a02add

Given a
pair of starting ((coordinates)) and the image data for the whole
canvas, this approach should work:
@!ce7b8350224aaa6745bd59b4c9cbbc3ccd2df515

1. Create an array to hold information about already colored
    coordinates.
@!be0aa4e9ddbb7fa47fbdffaa17bb17344076b2d5

2. Create a ((work list)) array to hold coordinates that must be looked
    at. Put the start position in it.
@!4792bcd3fc8f66fda4336419fd9ca105998ed7d5

3. When the work list is empty, we are done.
@!ea336b0f10b6dd856fc6af35ddf3272088b751bb

4. Remove one pair of coordinates from the work list.
@!318ffc95babd75227a6e4af259bc2a4251827aa8

5. If those coordinates are already in our array of colored pixels, go
    back to step 3.
@!101a475ed9d915dbcfddf4b667a98887b226e6b9

6. Color the pixel at the current coordinates and add the
    coordinates to the array of colored pixels.
@!5d3271e105b25903c8dcdb9c8d67c98f886bc0a5

7. Add the coordinates of each adjacent pixel whose color is the same
    as the starting pixel's original color to the work list.
@!7dbc434595fc029371a25e9aa8a946e41f24849f

8. Return to step 3.
@!76d8991367a2f2212e34decd47a50af20c152b39

The work list can simply be an array of vector objects. The data
structure that tracks colored pixels will be consulted _very_ often.
Searching through the whole thing every time a new pixel is visited
will take a lot of time. You could instead create an array that has a
value in it for every pixel, using again the x + y × width scheme for
associating positions with pixels. When checking whether a pixel has
been colored already, you could directly access the field corresponding to the
current pixel.
@!d462621370508c36b28fb6465102efe8b8950c89

{{index [comparison, "of colors"]}}
@!0dbe849c893a2146f32b2eab9614a8d0f269821d

You can compare colors by running over
the relevant part of the data array, comparing one field at a time. Or
you can “condense” a color to a single number or string and
compare those. When doing this, ensure that every color produces a
unique value. For example, simply adding the color's components is not
safe since multiple colors will have the same sum.
@!3302c73a384bbe2e090e1d6a3a5345b4f92312c5

When enumerating the neighbors of a given point, take care to exclude
neighbors that are not inside of the canvas or your program might run
off into one direction forever.
@!7258a2aad3dc4ee103c1a9e55b4d7ec037cb73df

hint}}
@!bb21273566e0665f2446f53450cb18752133a859