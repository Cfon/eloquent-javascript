{{meta {chap_num: 16, prev_link: 15_game, next_link: 17_http, load_files: ["code/chapter/15_game.js", "code/game_levels.js", "code/chapter/16_canvas.js"], zip: "html include=[\"img/player.png\", \"img/sprites.png\"]"}}}
@!3f7bd6ef2d5f5635494fe577150d6983c577cd9f

# Drawing on Canvas
@!a263c701eba33deeeb26017c1de3ecb4a7eae774

{{quote {author: "M.C. Escher", title: "cited by Bruno Ernst in The Magic Mirror of M.C. Escher", chapter: true}
@!3164f6f735b1173aba4203475a0ca80390684e81

Drawing is deception.
@!6e659af3cb579350d62ba38ecd24bc60d95409fd

quote}}
@!1e823ba7d6336af8abbaabbbd0a15c80a7e590ab

{{index "Escher, M.C.", CSS, "transform (CSS)"}}
@!95ffecbb2c1c540bce07e288ec5b06b2415e0b12

Browsers give us
several ways to display ((graphics)). The simplest way is to use styles to
position and color regular ((DOM)) elements. This can
get you quite far, as the game in the [previous chapter](15_game.html#game)
showed. By adding partially transparent background ((image))s to the
nodes, we can make them look exactly the way we want. It is even
possible to rotate or skew nodes by using the `transform` style.
@!829a743ebfc003f374bf0227968f94a042717579

But we'd be using the DOM for something that it wasn't originally
designed for. Some tasks, such as drawing a ((line)) between
arbitrary points, are extremely awkward to do with regular
((HTML)) elements.
@!19967e932bee23793964247a35908303d706b50c

{{index SVG, "img (HTML tag)"}}
@!9fa56341d9b9a10bfae3eab506b100cf2e234781

There are two alternatives. The first is DOM-based
but utilizes _Scalable Vector Graphics (SVG)_, rather than HTML
elements. Think of SVG as a dialect for describing
((document))s that focuses on ((shape))s rather than text. You can embed an SVG
document in an HTML document, or you can include it
through an `<img>` tag.
@!186c1e3a879288591ce6a73ff84437c9cc00730d

{{index clearing}}
@!074970ac49327e41ea6710a69cf8e761963d5124

The second alternative is called a _((canvas))_. A
canvas is a single ((DOM)) element that encapsulates a ((picture)). It
provides a programming ((interface)) for drawing ((shape))s onto the
space taken up by the node. The main difference between a canvas and
an SVG picture is that in SVG the original description of the shapes
is preserved so that they can be moved or resized at any time.
A canvas, on the other hand, converts the shapes to ((pixel))s (colored
dots on a raster) as soon as they are drawn and does not remember
what these pixels represent. The only way to move a shape on a canvas
is to clear the canvas (or the part of the canvas around the shape) and redraw it
with the shape in a new position.
@!a6880937b110b903db21d54d6a34d8b81e6e7c5c

## SVG
@!56a6195648aa44a4edfa420a49d157bfb5d816c8

This book will not go into ((SVG)) in detail, but I will briefly 
 explain how it works. At the
[end of the chapter](16_canvas.html#graphics_tradeoffs), I'll come
back to the trade-offs that you must consider when deciding which
((drawing)) mechanism is appropriate for a given application.
@!94ed280fe765459783ce21952b782fb92358380e

This is an HTML document with a simple SVG ((picture)) in it:
@!3a5def38de67548ab2c30f72919709d61b6e18b3

```{lang: "text/html", sandbox: "svg"}
<p>Normal HTML here.</p>
<svg xmlns="http://www.w3.org/2000/svg">
  <circle r="50" cx="50" cy="50" fill="red"/>
  <rect x="120" y="5" width="90" height="90"
        stroke="blue" fill="none"/>
</svg>
```
@!7e04172fb4cd9c5c7e468af456617439e542dd01

{{index "circle (SVG tag)", "rect (SVG tag)", "XML namespace", XML, "xmlns attribute"}}
@!089c387eccbd72362719cda8f33b1799d7b01df7

The `xmlns` attribute changes an element (and its
children) to a different _XML namespace_. This namespace, identified
by a ((URL)), specifies the dialect that we are currently speaking.
The `<circle>` and `<rect>` tags, which do not exist in HTML, do have
a meaning in SVG—they draw shapes using the style and position
specified by their attributes.
@!0bcdae359304de4cd665b6756f2da8c89ffd46af

{{if book
@!4fa4fb0e0a33c296730655479f7c1ee65687d8a7

The document is displayed like this:
@!1870b07ff58a0c735d52e2b2df5a7982a2a4da9e

{{figure {url: "img/svg-demo.png", alt: "An embedded SVG image",width: "4.5cm"}}}
@!7c9a8943f78779fe53a35530439ecb5a807f4c42

if}}
@!83e1531fe7ed68486f6d76b51216e9a70f68aedf

These tags create ((DOM)) elements, just like ((HTML)) tags. For
example, this changes the `<circle>` element to be ((color))ed cyan
instead:
@!8e931fdd13a955088ec5d9dc5967af355d1ddad5

```{sandbox: "svg"}
var circle = document.querySelector("circle");
circle.setAttribute("fill", "cyan");
```
@!6e65574d1fcfcb4aed400f8a3253fa8fcdc97466

## The canvas element
@!52a7971c128b82502971503f70fabf04dae9ba9b

{{index [canvas, size], "canvas (HTML tag)"}}
@!c6d3b19a1a7c1da96702e2e53fccfcc45d21f80d

Canvas ((graphics)) can be drawn
onto a `<canvas>` element. You can give such an element `width` and
`height` attributes to determine its size in ((pixel))s.
@!08a80cf6f9559214d9bed4eb43b14f2816242121

A new canvas is empty, meaning it is entirely ((transparent)) and
thus shows up simply as empty space in the document.
@!d770e12986f08dde0974b2f9749fcbbb8854a057

{{index "2d (canvas context)", "webgl (canvas context)", OpenGL, [canvas, context], dimensions}}
@!b814383a7808287700cc7d15ad914bb0be266c79

The `<canvas>`
tag is intended to support different styles of ((drawing)). To get
access to an actual drawing ((interface)), we first need to create a
_((context))_, which is an object whose methods provide the drawing
interface. There are currently two widely supported drawing styles:
`"2d"` for two-dimensional graphics and `"webgl"` for
three-dimensional graphics through the OpenGL interface.
@!67324d7d6ac3e3f763451a6d9209639153b34700

{{index rendering, graphics, efficiency}}
@!18aa2577d505cfd65d811fb36a0dc40ce37a2e77

This book won't discuss
WebGL. We stick to two dimensions. But if you are interested in
three-dimensional graphics, I do encourage you to look into WebGL. It
provides a very direct interface to modern graphics hardware and thus
allows you to render even complicated scenes efficiently, using
JavaScript.
@!9bf5521d0a9d4dd357de65188710aba398878c13

{{index "getContext method", [canvas, context]}}
@!28a7fc370bd853742d855ae275b6e79ad6f6776b

A ((context)) is created
through the `getContext` method on the `<canvas>` element.
@!7cd94cae4300a530f7668f6c6413c391a2ec2af3

```{lang: "text/html"}
<p>Before canvas.</p>
<canvas width="120" height="60"></canvas>
<p>After canvas.</p>
<script>
  var canvas = document.querySelector("canvas");
  var context = canvas.getContext("2d");
  context.fillStyle = "red";
  context.fillRect(10, 10, 100, 50);
</script>
```
@!8773af0dc3da3d82f701915343e30162c682a97e

After creating the context object, the example draws a red
((rectangle)) 100 ((pixel))s wide and 50 pixels high, with its top-left
corner at coordinates (10,10).
@!aa0ab0057c73ea71796472d7f47f1fd4dacf8d9b

{{if book
@!ad24ac615ad3b4bf13dd68d4b6b6942ac76e8911

{{figure {url: "img/canvas_fill.png", alt: "A canvas with a rectangle",width: "2.5cm"}}}
@!90db635f543a1213ea7a5030d9d4a91e620f8389

if}}
@!21d80f6de77a779ce016820c57688827f5c818c6

{{index SVG, coordinates}}
@!379928169b32cc2a7b4c21736255ea936d193e66

Just like in ((HTML)) (and SVG), the
coordinate system that the canvas uses puts (0,0) at the top-left
corner, and the positive y-((axis)) goes down from there. So (10,10)
is 10 pixels below and to the right of the top-left corner.
@!92fe8a63802d1ce0a1e4c4151e19efe92a6efdaa

{{id fill_stroke}}
@!12d3909471d04503ad991bd514f6a6bce251f876

## Filling and stroking
@!b3554f61e6bbfa0bd8f30d685aaefba8fc24ab1d

{{index filling, stroking, drawing, SVG}}
@!75c9a138b80a845ae1945fdc5168488f5a31439b

In the ((canvas)) interface,
a shape can be _filled_, meaning its area is given a certain color or pattern, 
or it can be _stroked_, which means a ((line)) is drawn along its edge. The
same terminology is used by SVG.
@!1efcde2200b3efda57736e0e10ff5be47d1c744e

{{index "fillRect method", "strokeRect method"}}
@!f19a1c6ebc558856cda408e9a2cad26340783e59

The `fillRect` method fills
a ((rectangle)). It takes first the x- and y-((coordinates)) of the
rectangle's top-left corner, then its width, and then its height. A
similar method, `strokeRect`, draws the ((outline)) of a rectangle.
@!9a2e7bca07c95a70a33d8fbd3678d88daefb6ec1

{{index property, state}}
@!afb24f429fe5cde8b1d34815c097c25a4867c094

Neither method takes any further parameters. 
The color of the fill, thickness of the stroke, and so on are not
determined by an argument to the method (as you might justly expect)
but rather by properties of the context object.
@!34d36713b42d7daec060571f5eab528971047895

{{index filling, "fillStyle property"}}
@!87f2e2bef868e51feaf44fb9d41fee74fb04bfa5

Setting `fillStyle` changes the way shapes are
filled. It can be set to a string that specifies a ((color)), and any
color understood by ((CSS)) can also be used here.
@!7d50d58540912766fe3309a27d9c3401ad53e46a

{{index stroking, "line width", "strokeStyle property", "lineWidth property", canvas}}
@!9ab6c16184da587b7e0fb42a3619b624cb4c1170

The `strokeStyle` property works similarly but
determines the color used for a stroked line. The width of that line
is determined by the `lineWidth` property, which may contain any
positive number.
@!5c72511b90495cd1b0312e36453a38de09e89887

```{lang: "text/html"}
<canvas></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.strokeStyle = "blue";
  cx.strokeRect(5, 5, 50, 50);
  cx.lineWidth = 5;
  cx.strokeRect(135, 5, 50, 50);
</script>
```
@!53d8ac9f783a7d74cac45b1bc4cf7df8fba088f4

{{if book
@!f4b181251a82320e52528dee5d6bb7616d4db705

This code draws two blue squares, using a thicker line for the second
one.
@!588368533e6f37c786c42355d9c004d0d35d92d2

{{figure {url: "img/canvas_stroke.png", alt: "Two stroked squares",width: "5cm"}}}
@!c7090e96e00de31c71ba13b61a5fd795979f8453

if}}
@!998735dddc2cb7b0693ef585119db3b18fcffce8

{{index "default value", [canvas, size]}}
@!43eee3279c3837576bf4eb8285dda3d13152e604

When no `width` or `height`
attribute is specified, as in the previous example, a canvas element
gets a default width of 300 pixels and height of 150 pixels.
@!af6d48ae2e97449bb6f6c1270eff1bfc60ab13da

## Paths
@!2e5d09461d8ba95650228f5c884e1eba12dbcc6a

{{index [path, canvas], [interface, design], [canvas, path]}}
@!359be77baecd814ffc5f8a06ac2c39a4c4d4d6a1

A path is a
sequence of ((line))s. The 2D canvas interface takes a peculiar
approach to describing such a path. It is done entirely through
((side effect))s. Paths are not values that can be stored and
passed around. Instead, if you want to do something with a path, you
make a sequence of method calls to describe its shape.
@!e80acea82219a2946a00f3cded68fb232f067234

```{lang: "text/html"}
<canvas></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.beginPath();
  for (var y = 10; y < 100; y += 10) {
    cx.moveTo(10, y);
    cx.lineTo(90, y);
  }
  cx.stroke();
</script>
```
@!d84082956172fc57330cc9ff5be59ac4bf44046e

{{index canvas, "stroke method", "lineTo method", "moveTo method", shape}}
@!4cc8ae0a24d9d818a6b9e51e95f35cbec39ecc2e

This example creates a path with a number of
horizontal ((line)) segments and then strokes it using the `stroke`
method. Each segment created with `lineTo` starts at the path's
_current_ position. That position is usually the end of the last segment, 
unless `moveTo` was called. In that case, the next segment would start
at the position passed to `moveTo`.
@!15defbb115636b49a7bc672330f58bc9deee633d

{{if book
@!c272182dcd77df7a1b734aa67dccf350d0661a9e

The path described by the previous program looks like this:
@!d6a7475969a8000c50abbe7666c1ca61cc98a76c

{{figure {url: "img/canvas_path.png", alt: "Stroking a number of lines",width: "2.1cm"}}}
@!1dd376045d9f6203ac27f953cf72ed956727730a

if}}
@!50c6152b4254745d6289d97493e4e952551723b1

{{index [path, canvas], filling, [path, closing], "fill method"}}
@!e6b7650f30c2ab5c2de3c1b5f15be7f23879d61e

When
filling a path (using the `fill` method), each ((shape)) is filled
separately. A path can contain multiple shapes—each `moveTo` motion
starts a new one. But the path needs to be _closed_ (meaning its start and 
end are in the same position) before it can be filled. If the path is not 
already closed, a line is added from its end to its
start, and the shape enclosed by the completed path is filled.
@!2c31901fa3fc3187273177def6e8239e91934f95

```{lang: "text/html"}
<canvas></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.beginPath();
  cx.moveTo(50, 10);
  cx.lineTo(10, 70);
  cx.lineTo(90, 70);
  cx.fill();
</script>
```
@!bcefccce11cc947ff63494d5a793cc5651d378f0

This example draws a filled triangle. Note that only two of the triangle's
sides are explicitly drawn. The third, from the bottom-right corner
back to the top, is implied and won't be there when you stroke the
path.
@!3b6ddbd6a1dcfc028c01fa30e0968e55e93da14f

{{if book
@!57c29bb05f1c52b565e791543143f8a46cc7b0ed

{{figure {url: "img/canvas_triangle.png", alt: "Filling a path",width: "2.2cm"}}}
@!28873fc8511a10401b441d251c26a3cc1a122373

if}}
@!13abeeb749d7617a4c9fb8641e9c969414955c74

{{index "stroke method", "closePath method", [path, closing], canvas}}
@!0df5d6f39c2daef20a2d88d158bc8dfa84d51100

You could also use the `closePath` method
to explicitly close a path by adding an actual ((line)) segment back to
the path's start. This segment _is_ drawn when stroking the path.
@!f25f659da423c17c955ed5222e014f0ae51ee085

## Curves
@!616a1c67d4b5ac1b18e451082bbdba49791ddd17

{{index [path, canvas], canvas, drawing}}
@!74ab9b4e69cd5db3d4b98c1b7595c44b01ba335b

A path may also contain ((curve))d
((line))s. These are, unfortunately, a bit more involved to draw than
straight lines.
@!dc27005e8b1ea2ff14eef8900a76e60ea1f857e5

{{index "quadraticCurveTo method"}}
@!e2d52762eb347ab79aaaf3e4de8b31865d0eb676

The `quadraticCurveTo` method draws a
curve to a given point. To determine the curvature of the line, the method is
given a ((control point)) as well as a destination point. 
Imagine this control point as _attracting_ the line, giving the line its
curve. The line won't go through the control point. Rather, the
direction of the line at its start and end points will be such that it
aligns with the line from there to the control point. The following
example illustrates this:
@!7fd2c16488493256b38f34e4c380353e4a605f55

```{lang: "text/html"}
<canvas></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.beginPath();
  cx.moveTo(10, 90);
  // control=(60,10) goal=(90,90)
  cx.quadraticCurveTo(60, 10, 90, 90);
  cx.lineTo(60, 10);
  cx.closePath();
  cx.stroke();
</script>
```
@!8fe43e2b5d9d9ba4305f6320d78fc8c226a6b691

{{if book
@!9c926f3de3567348633d9a4c3226150f0cc115c5

It produces a path that looks like this:
@!ce44a8d95c633dbb1c5c37b4885ba4dd8d375b10

{{figure {url: "img/canvas_quadraticcurve.png", alt: "A quadratic curve",width: "2.3cm"}}}
@!2b465a9995a7637a35a7e7f435c6eac3cf117e73

if}}
@!34ae7242eef2439daf3077071f29ebeb36efb2ab

{{index "stroke method"}}
@!1ad3949f015da02794bb9d52458ebc4958b8669b

We draw a ((quadratic curve)) from the left to the
right, with (60,10) as control point, and then draw two ((line))
segments going through that control point and back to the start of
the line. The result somewhat resembles a _((Star Trek))_ insignia. You
can see the effect of the control point: the lines leaving the lower
corners start off in the direction of the control point and then
((curve)) toward their target.
@!63d00b8d0e5470c7fc730ff86a25fec22ae793d2

{{index canvas, "bezierCurveTo method"}}
@!53f7aa8b8d388f8b1715718b7e7ce298c80695cd

The `bezierCurveTo` method draws a
similar kind of curve. Instead of a single ((control point)), this one
has two—one for each of the ((line))'s endpoints. Here is a similar sketch to
illustrate the behavior of such a curve:
@!1f100d4de31e76f225e0c2a6751ae11154534ebb

```{lang: "text/html"}
<canvas></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.beginPath();
  cx.moveTo(10, 90);
  // control1=(10,10) control2=(90,10) goal=(50,90)
  cx.bezierCurveTo(10, 10, 90, 10, 50, 90);
  cx.lineTo(90, 10);
  cx.lineTo(10, 10);
  cx.closePath();
  cx.stroke();
</script>
```
@!f91f122237c0b4e89c863b3ae84818f3ed77c2af

The two control points specify the direction at both ends of the
curve. The further they are away from their corresponding point, the
more the curve will “bulge” in that direction.
@!d30d2d71c3eab03d6b5cdb6894ba303665b5ad7d

{{if book
@!e134be9a39a70866aeeab623f467f2488978a9e1

{{figure {url: "img/canvas_beziercurve.png", alt: "A bezier curve",width: "2.2cm"}}}
@!a389f2e1281e8bd3d541b945bb1567a4e7a95aa1

if}}
@!45a649231a2643ed3b4420d1f8d45ba5471e4b6c

{{index "trial and error"}}
@!52cfe581bce7260a27deff3af097967ce948ae55

Such ((curve))s can be hard to work with—it's
not always clear how to find the ((control point))s that provide the
((shape)) you are looking for. Sometimes you can compute
them, and sometimes you'll just have to find a suitable value by trial
and error.
@!e6c5006ecb1a6450be0323b417bef62a0a045103

{{index rounding, canvas, "arcTo method", arc}}
@!efdeccc7f8c12a654077c8de1f886a2f821399c7

_Arcs_—fragments of a 
((circle))—are easier to reason about. The `arcTo` method  
takes no less than five arguments. The first four arguments act
somewhat like the arguments to _quadraticCurveTo_. The first pair
provides a sort of ((control point)), and the second pair gives the
line's destination. The fifth argument provides the ((radius)) of the
arc. The method will conceptually project a corner—a line going to the
control point and then to the destination point—and round the corner's point so
that it forms part of a circle with the given radius. The `arcTo` method then draws
the rounded part, as well as a line from the starting position to the
start of the rounded part.
@!1c1d8f1b037e2d92945d385fdf9a4bc008b4d7da

```{lang: "text/html"}
<canvas></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.beginPath();
  cx.moveTo(10, 10);
  // control=(90,10) goal=(90,90) radius=20
  cx.arcTo(90, 10, 90, 90, 20);
  cx.moveTo(10, 10);
  // control=(90,10) goal=(90,90) radius=80
  cx.arcTo(90, 10, 90, 90, 80);
  cx.stroke();
</script>
```
@!a92ca850f2c1c8172cc76498c076823c7d580031

{{if book
@!5425611396f2fab3e4e8a77a4077fdc6371bc3e6

This produces two rounded corners with different radii.
@!fb4ae2050d8879107f6f1d4166cc648af7ecbb97

{{figure {url: "img/canvas_arc.png", alt: "Two arcs with different radii",width: "2.3cm"}}}
@!cf332e91a560c6effd82961c418d300ef41e91e5

if}}
@!6d5fd1ac704865b293b749bd9c64c2c64d71f8ad

{{index canvas, "arcTo method", "lineTo method"}}
@!093df9d60b411143c117ff6ff8b22891a33c6cce

The `arcTo` method
won't draw the line from the end of the rounded part to the goal
position, though the word _to_ in its name would suggest it does. You
can follow up with a call to `lineTo` with the same goal coordinates
to add that part of the line.
@!67d4136c47199ad23b80c45551a14de5f0c20ede

{{index "arc method", arc}}
@!5242b265082bb3ec26f22de0a1178b1426659edc

To draw a ((circle)), you could use four
calls to `arcTo` (each turning 90 degrees). But the `arc` method
provides a simpler way. It takes a pair of ((coordinates)) for the
arc's center, a radius, and then a start and end angle.
@!37b418d21a05575abe973813bc2c7b90a9e808e4

{{index pi, "Math.PI constant"}}
@!044c677e42601d8e99b173396427187402cd03d1

Those last two parameters make it
possible to draw only part of circle. The ((angle))s are measured in
((radian))s, not ((degree))s. This means a full ((circle)) has an
angle of 2π, or `2 * Math.PI`, which is about 6.28. The angle starts counting at
the point to the right of the circle's center and goes clockwise from
there. You can use a start of 0 and an end bigger than 2π (say, 7)
to draw a full circle.
@!e1e111c18243badb2766d043f33f394dd7a64cc1

```{lang: "text/html"}
<canvas></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.beginPath();
  // center=(50,50) radius=40 angle=0 to 7
  cx.arc(50, 50, 40, 0, 7);
  // center=(150,50) radius=40 angle=0 to ½π
  cx.arc(150, 50, 40, 0, 0.5 * Math.PI);
  cx.stroke();
</script>
```
@!937f56970970537f3ba148d1a2a0d46e483e144b

{{index "moveTo method", "arc method", [path, " canvas"]}}
@!caf7c7c6ea8a54671ad52361560f1c234a7a87b6

The resulting picture
contains a ((line)) from the right of the full circle (first call to
`arc`) to the right of the quarter-((circle)) (second call). Like other
path-drawing methods, a line drawn with `arc` is connected to the
previous path segment by default. You'd have to call `moveTo` or
start a new path if you want to avoid this.
@!f0de439e87a7d8facf11d83804aaec2416a894fc

{{if book
@!2872abf259dc8e1a0ca90457f21f232d2acf0e09

{{figure {url: "img/canvas_circle.png", alt: "Drawing a circle",width: "4.9cm"}}}
@!9941629970ab5ca127630b9c7eabf4b4e2b0d46c

if}}
@!781f7f23e8a53c9a7c4bb501dc099b58e4731521

{{id pie_chart}}
@!0ed8d55b84314add29d0eb19d264e60ad3bf7066

## Drawing a pie chart
@!0daf029b30869dfba540815df962cff91df78414

{{index "pie chart example"}}
@!0ecb158bfbc73d753d352f55f550af75fc2f7906

Imagine you've just taken a ((job)) at
EconomiCorp, Inc., and your first assignment is to draw a pie chart of
their customer satisfaction ((survey)) results.
@!b34aba196db1c2a2cdc35fdbd6278ccc6717e0a2

The `results` variable contains an array of objects that represent the
survey responses.
@!53eee5c2225b81c8c2b9ca52cab58ebd35359cc6

```{sandbox: "pie", includeCode: true}
var results = [
  {name: "Satisfied", count: 1043, color: "lightblue"},
  {name: "Neutral", count: 563, color: "lightgreen"},
  {name: "Unsatisfied", count: 510, color: "pink"},
  {name: "No comment", count: 175, color: "silver"}
];
```
@!0dd01dfcf1c221b16c776b13c98a657c8d58c8e3

{{index "pie chart example"}}
@!f05581312b393948887c92c8c74bc1916f89368a

To draw a pie chart, we draw a number of pie
slices, each made up of an ((arc)) and a pair of ((line))s to the center
of that arc. We can compute the ((angle)) taken up by each arc by dividing
a full circle (2π) by the total number of responses and then
multiplying that number (the angle per response) by the number of
people who picked a given choice.
@!24a8d35ff471953bb813770bf7a9ebcc035ff43a

```{lang: "text/html", sandbox: "pie"}
<canvas width="200" height="200"></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  var total = results.reduce(function(sum, choice) {
    return sum + choice.count;
  }, 0);
  // Start at the top
  var currentAngle = -0.5 * Math.PI;
  results.forEach(function(result) {
    var sliceAngle = (result.count / total) * 2 * Math.PI;
    cx.beginPath();
    // center=100,100, radius=100
    // from current angle, clockwise by slice's angle
    cx.arc(100, 100, 100,
           currentAngle, currentAngle + sliceAngle);
    currentAngle += sliceAngle;
    cx.lineTo(100, 100);
    cx.fillStyle = result.color;
    cx.fill();
  });
</script>
```
@!5c1a057eb4f69d723a718b9c7fbf83020e255c35

{{if book
@!607d1c22119be00da6dd6f02fa599133234c6400

This draws the following chart:
@!d83a43f393980424e6b4bb3afdd52ff7387cc05d

{{figure {url: "img/canvas_pie_chart.png", alt: "A pie chart",width: "5cm"}}}
@!30cb4b6d54622c0a8c3ad9ced68f39a256b35acb

if}}
@!30341597c3f42109acbc3aa5a4cbdd1ae8d00ddb

But a chart that doesn't tell us what it means isn't very helpful. We
need a way to draw text to the ((canvas)).
@!3b81fbabf25354efa586e6da6f07e2744381e3ae

## Text
@!961502aa3b3750fe9dfb9320bbca78410d24cf76

{{index stroking, filling, "fillColor property", "fillText method", "strokeText method"}}
@!6b59393fe4654ef50c7bc099823d51728881aa7e

A 2D canvas drawing context provides
the methods `fillText` and `strokeText`. The latter can be useful for
outlining letters, but usually `fillText` is what you need. It will
fill the given ((text)) with the current `fillColor`.
@!f966d83580b33cfbb1250b26f358b70c55e9ac40

```{lang: "text/html"}
<canvas></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.font = "28px Georgia";
  cx.fillStyle = "fuchsia";
  cx.fillText("I can draw text, too!", 10, 50);
</script>
```
@!dcc31257af69adba5a570b38b57815fdc22301cd

You can specify the size, style, and ((font)) of the text with the
`font` property. This example just gives a font size and family name.
You can add `italic` or `bold` to the start of the string to select a
style.
@!ff9e3c99895cb0bc9b1ad2cd39e771a7ea3f4a9f

{{index "fillText method", "strokeText method", "textAlign property", "textBaseline property"}}
@!85f22552ca6af2e98545b55b7d2903312a52ab27

The last two arguments to
`fillText` (and `strokeText`) provide the position at which the font
is drawn. By default, they indicate the position of the start of the
text's alphabetic baseline, which is the line that letters “stand” on, not
counting hanging parts in letters like _j_ or _p_. You can change the horizontal
position by setting the `textAlign` property to `"end"`
or `"center"` and the vertical position by setting `textBaseline` to
`"top"`, `"middle"`, or `"bottom"`.
@!f076c3c13ad8569af676ece2732574e6219b6dae

{{index "pie chart example"}}
@!9a3de079dd7c33ea2898d40c211a752a0b76a350

We will come back to our pie chart, and the
problem of ((label))ing the slices, in the
[exercises](16_canvas.html#exercise_pie_chart) at the end of the
chapter.
@!2079aa3821312371facbc1dcbbd5f9c3c34320ef

## Images
@!9911db7e4dbe1e05251c13ae105d4167bab9cf80

{{index "vector graphics", "bitmap graphics"}}
@!cc1b45e3d5c0c5d3b65a20c9f28e49dcc24f20c0

In computer ((graphics)), a
distinction is often made between _vector_ graphics and _bitmap_
graphics. The first is what we have been doing so far in this
chapter—specifying a picture by giving a logical description of
((shape))s. Bitmap graphics, on the other hand, don't specify actual
shapes but rather work with ((pixel)) data (rasters of colored dots).
@!289e7f7c98c680035a4fde1be648b9cf6b658b91

{{index "load event", "event handling", "img (HTML tag)", "drawImage method"}}
@!84e32a315f8ce5784440552e843f2878a576fb33

The `drawImage` method allows us to draw ((pixel)) data onto
a ((canvas)). This pixel data can originate from an `<img>` element or
from another canvas, and neither has to be visible in the actual
document. The following example creates a detached `<img>` element and
loads an image file into it. But it cannot immediately start drawing
from this picture because the browser may not have fetched it yet. To
deal with this, we register a `"load"` event handler and do the
drawing after the image has loaded.
@!87d442200c0a8eda22580c790b661e35845d162f

```{lang: "text/html"}
<canvas></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  var img = document.createElement("img");
  img.src = "img/hat.png";
  img.addEventListener("load", function() {
    for (var x = 10; x < 200; x += 30)
      cx.drawImage(img, x, 10);
  });
</script>
```
@!b854ec682bb98c24c54cc39ebcbd2e62752439f3

{{index "drawImage method", scaling}}
@!6949e693dd60bca749d42079357cbcf7466d9a78

By default, `drawImage` will draw
the image at its original size. You can also give it two additional
arguments to dictate a different width and height.
@!568a4663506759d46c68fd5a59a7317c5a6ed594

When `drawImage` is given _nine_ arguments, it can be used to draw
only a fragment of an image. The second through fifth arguments indicate the
rectangle (x, y, width, and height) in the source image that should be
copied, and the sixth to ninth arguments give the rectangle (on the
canvas) into which it should be copied.
@!f6ef05f96fa65872812767c7e767f12d37aba851

{{index "player character", "pixel art"}}
@!b03f7517f6a34344498207173b435bf417967118

This can be used to pack multiple
_((sprite))s_ (image elements) into a single image file and then 
draw only the part you need. For example, we have this picture containing a
game character in multiple ((pose))s:
@!c31b16e3502f2a74c5f5017c004775fe5d4e05e8

{{figure {url: "img/player_big.png", alt: "Various poses of a game character",width: "6cm"}}}
@!f0acd3e2867da393cd0ee3f96bc8c63639a69b99

By alternating which pose we draw, we can show an ((animation)) that
looks like a walking character.
@!d05b5afb4a10e67e1598de97a7b069dfc4eef2ef

{{index "fillRect method", "clearRect method", clearing}}
@!f196e77019305d60832fdbde033daa836b146c0e

To animate
the ((picture)) on a ((canvas)), the `clearRect` method is useful. It
resembles `fillRect`, but instead of coloring the rectangle, it makes
it ((transparent)), removing the previously drawn pixels.
@!bddd9d43ca8a2bf723a46d41086bd9fc10d967a4

{{index "setInterval function", "img (HTML tag)"}}
@!b8e6815a6a391689799daa138bf140478ad64c58

We know that each
_((sprite))_, each subpicture, is 24 ((pixel))s wide and 30 pixels
high. The following code loads the image and then sets up an interval
(repeated timer) to draw the next _((frame))_:
@!b9d0aaf4b181c63c3512e234b19ce2bbffbd8246

```{lang: "text/html"}
<canvas></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  var img = document.createElement("img");
  img.src = "img/player.png";
  var spriteW = 24, spriteH = 30;
  img.addEventListener("load", function() {
    var cycle = 0;
    setInterval(function() {
      cx.clearRect(0, 0, spriteW, spriteH);
      cx.drawImage(img,
                   // source rectangle
                   cycle * spriteW, 0, spriteW, spriteH,
                   // destination rectangle
                   0,               0, spriteW, spriteH);
      cycle = (cycle + 1) % 8;
    }, 120);
  });
</script>
```
@!90e0130beae174a02a124b437a21b742c5efb41b

{{index "remainder operator", "% operator"}}
@!0aaef604b34635ba1165ce4c32a24088d27a003b

The `cycle` variable tracks
our position in the ((animation)). Each ((frame)), it is incremented
and then clipped back to the 0 to 7 range by using the remainder
operator. This variable is then used to compute the x-coordinate that
the sprite for the current pose has in the picture.
@!45c5162315646577f57ea8b7af276e3ba08bde38

## Transformation
@!b479de2497c757573ba9d18aa6f7dc19eb3942a7

{{index transformation, mirroring}}
@!e40fa79dbed14ad9b744122b30b22dc955738952

{{indexsee flipping, mirroring}}
@!31d3be15bc130e9f0b351f2063d5d8cadfc7e4c1

But what if we want our character to
walk to the left instead of to the right? We could add another set of
sprites, of course. But we can also instruct the ((canvas)) to draw
the picture the other way round.
@!8e1ae9c49cd0aa6a7ce996dd716c2ce2a772c0ac

{{index "scale method", scaling}}
@!98f8eb8e608330f1db6184392034550a28bd591b

Calling the `scale` method will cause
anything drawn after it to be scaled. This method takes two parameters, one to
set a horizontal scale and one to set a vertical scale.
@!70c53e6abaf6334436a6ac621ca6bf134b4d2a1e

```{lang: "text/html"}
<canvas></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.scale(3, .5);
  cx.beginPath();
  cx.arc(50, 50, 40, 0, 7);
  cx.lineWidth = 3;
  cx.stroke();
</script>
```
@!b91675a79f301a6cdc4c22fcbed3a0a93b5c0948

{{if book
@!d06c7625e24e60fcd0f97e83f67eeca35c1c1e51

Due to the call to `scale`, the circle is drawn three times as wide
and half as high.
@!6ff9b3efd27215ad564bf1d63d7610ef104fb74d

{{figure {url: "img/canvas_scale.png", alt: "A scaled circle",width: "6.6cm"}}}
@!4a404723cfffc542b8775e22e1b8c54376828fd4

if}}
@!0726331206605427b318b140feff011251e97280

{{index mirroring}}
@!22d7285d07a30e30a25924d058bef70d2be4628b

Scaling will cause everything about the drawn image, including the
((line width)), to be stretched out or squeezed together as specified.
Scaling by a negative amount will flip the picture around. The
flipping happens around point (0,0), which means it will also
flip the direction of the coordinate system. When a horizontal scaling
of -1 is applied, a shape drawn at x position 100 will end up at what
used to be position -100.
@!121efe3bad314fe01713c7a6b4581def1462f5cf

{{index "drawImage method"}}
@!365441c8498c470627a9d2844526efa84cda2de4

So to turn a picture around, we can't simply
add `cx.scale(-1, 1)` before the call to `drawImage` since that would
move our picture outside of the ((canvas)), where it won't be visible.
You could adjust the ((coordinates)) given to
`drawImage` to compensate for this by drawing the image at x position -50
instead of 0. Another solution, which doesn't require the code that does
the drawing to know about the scale change, is to adjust the ((axis))
around which the scaling happens.
@!d52ce8aec9603dd710c79355b03bcb94385ae44a

{{index "rotate method", "translate method", transformation}}
@!f49073ecdca7caaf437992ab9d9d5e1116920f93

There are several 
other methods besides `scale` that influence the coordinate system for a ((canvas)).
You can rotate subsequently drawn shapes with the `rotate` method and move them with the
`translate` method. The interesting—and confusing—thing is that these
transformations _stack_, meaning that each one happens relative to the
previous transformations.
@!3aae573d037343dc1b47a89f4142f436531555d7

{{index "rotate method", "translate method"}}
@!03dd3d77156169cb3109588bdf677570fccc067d

So if we translate by
10 horizontal pixels twice, everything will be drawn 20 pixels to the
right. If we first move the center of the coordinate system to (50,50)
and then rotate by 20 ((degree))s (0.1π in ((radian))s), that rotation
will happen _around_ point (50,50).
@!6d26dd9eb1e3b0a6f0aa3c1a37d147933e9694e8

{{figure {url: "img/transform.svg", alt: "Stacking transformations",width: "9cm"}}}
@!a119c00790ce364f133360f4a83e65023cb4431b

{{index coordinates}}
@!254005997d5275aef966a2cf9bd3375b5ba19f98

But if we _first_ rotate by 20 degrees and _then_
translate by (50,50), the translation will happen in the rotated
coordinate system and thus produce a different orientation. The order
in which transformations are applied matters.
@!25a5ded83aecb1df2900d0544d8c273b5f85755b

{{index axis, mirroring}}
@!1960678f92a32efcb47f248fb58f1ece219b8184

To flip a picture around the vertical line at a given x
position, we can do the following:
@!2133436bfac169176478d30e483b20b9178f39f0

```{includeCode: true}
function flipHorizontally(context, around) {
  context.translate(around, 0);
  context.scale(-1, 1);
  context.translate(-around, 0);
}
```
@!2a59fea1b923f5f75cc57e5e7f373215ff206eff

{{index "flipHorizontally method"}}
@!6d83c5b6e5e7357531fda4abab31aeaaba436f89

We move the y-((axis)) to where we
want our ((mirror)) to be, apply the mirroring, and finally move
the y-axis back to its proper place in the mirrored universe. The
following picture explains why this works:
@!c77c6755c2e808c6eeaf5b96e06057d864d08c76

{{figure {url: "img/mirror.svg", alt: "Mirroring around a vertical line",width: "8cm"}}}
@!74cb571fb42a3c9985caaa7fb74bd7330e1a3e0f

{{index "translate method", "scale method", transformation, canvas}}
@!6ea762580fa086feeee96bc8a65d0db47d4fbf2c

This shows the coordinate
systems before and after mirroring across the central line. If we draw a
triangle at a positive x position, it would, by default, be in the
place where triangle 1 is. A call to `flipHorizontally` first does a
translation to the right, which gets us to triangle 2. It then scales,
flipping the triangle back to position 3. This is not where it should
be, if it were mirrored in the given line. The second `translate` call
fixes this—it “cancels” the initial translation and makes triangle 4
appear exactly where it should.
@!d8528ba6a3f42a8aee22906d6da676d00b642955

We can now draw a mirrored character at position (100,0) by flipping
the world around the character's vertical center.
@!ff3cdb6fc761e391da51761820eb062710cbabbb

```{lang: "text/html"}
<canvas></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  var img = document.createElement("img");
  img.src = "img/player.png";
  var spriteW = 24, spriteH = 30;
  img.addEventListener("load", function() {
    flipHorizontally(cx, 100 + spriteW / 2);
    cx.drawImage(img, 0, 0, spriteW, spriteH,
                 100, 0, spriteW, spriteH);
  });
</script>
```
@!f378ab91dc3e400130818382ae1fad7cc4d5697e

## Storing and clearing transformations
@!455a19284cf361d86befd6cf8f5eff76787f9856

{{index "side effect", canvas, transformation}}
@!c1db4258dd2aedcb471b5d125d10ad2b6816fe3f

Transformations stick
around. Everything else we draw after ((drawing)) that mirrored
character would also be mirrored. That might be a problem.
@!8e7dba3f4a345b2c5466b4d609f05a757299fd4d

It is possible to save the current transformation, do some drawing and
transforming, and then restore the old transformation. This is usually
the proper thing to do for a function that needs to temporarily
transform the coordinate system. First, we save whatever transformation the code that
called the function was using. Then, the function does its thing (on top of the
existing transformation), possibly adding more transformations. And finally, we
revert to the transformation that we started with.
@!0fed0b8826429a0fd6ab85e385ff0b77e01d7592

{{index "save method", "restore method"}}
@!fa06d8d86fabd487e137e7a52943966a4aa66ad0

The `save` and `restore` methods
on the 2D ((canvas)) context perform this kind of ((transformation))
management. They conceptually keep a stack of transformation
((state))s. When you call `save`, the current state is pushed onto the
stack, and when you call `restore`, the state on top of the stack is
taken off and used as the context's current transformation.
@!78aabf292600aa66098eced2f6a6639d0da5777c

{{index "branching recursion", "fractal example", recursion}}
@!ca69c170440dc2843a1e34b2156e3372cbc18316

The `branch` function in the following example 
illustrates what you can do with a function that changes the
transformation and then calls another function (in this case itself),
which continues drawing with the given transformation.
@!bd0edcb536d6de9b5b87949b86733fc975df2237

This function draws a treelike shape by drawing a line,
moving the center of the coordinate system to the end of the line, and calling
itself twice—first rotated to the left and then rotated to the
right. Every call reduces the length of the branch drawn, and the
recursion stops when the length drops below 8.
@!fd41f759a4e9f1339d536d97eb62e3c39970fd03

```{lang: "text/html"}
<canvas width="600" height="300"></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  function branch(length, angle, scale) {
    cx.fillRect(0, 0, 1, length);
    if (length < 8) return;
    cx.save();
    cx.translate(0, length);
    cx.rotate(-angle);
    branch(length * scale, angle, scale);
    cx.rotate(2 * angle);
    branch(length * scale, angle, scale);
    cx.restore();
  }
  cx.translate(300, 0);
  branch(60, 0.5, 0.8);
</script>
```
@!235d760e3b972412e2c20f063f88b9df38cc3c24

{{if book
@!321552243010ebcba30b09dda1fd21f8a065c05d

The result is a simple fractal.
@!d852327b0d53e1605391f477b960240a6d750951

{{figure {url: "img/canvas_tree.png", alt: "A recursive picture",width: "5cm"}}}
@!0469961021198805e0cbd534d2e821e78a879573

if}}
@!0208a1801132f010bf3854c41431560a70a73270

{{index "save method", "restore method", canvas, "rotate method"}}
@!38727ca278842d070d04b5f44aaf22c0e5e3958c

If
the calls to `save` and `restore` were not there, the second recursive
call to `branch` would end up with the position and rotation created
by the first call. It wouldn't be connected to the current branch but
rather to the innermost, rightmost branch drawn by the first call. The
resulting shape might also be interesting, but it is definitely not a
tree.
@!274b98ad710153ce0b537c16005ce4f154f0a30e

{{id canvasdisplay}}
@!16366a261096f94df8d02521075a809cd278d3cb

## Back to the game
@!35f411df26c73281da6ede5bde0333fc3cab00d8

{{index "drawImage method"}}
@!062f9f6dc27202eb6938d85fc3807c5f43d4da42

We now know enough about ((canvas)) drawing to
start working on a ((canvas))-based ((display)) system for the
((game)) from the [previous chapter](15_game.html#game). The new
display will no longer be showing just colored boxes. Instead, we'll
use `drawImage` to draw pictures that represent the game's elements.
@!4615d149d980e0000e4e777b3fabc5168cb8b816

{{index "CanvasDisplay type", "DOMDisplay type"}}
@!3b35aeac5b74d5ac22df293a0f405b9403cf79d5

We will define an object
type `CanvasDisplay`, supporting the same ((interface)) as
`DOMDisplay` from [Chapter 15](15_game.html#domdisplay), namely, the
methods `drawFrame` and `clear`.
@!9e877498052c27667055fc8ed8c2841918d06636

{{index state}}
@!a3848334e59ccecc0112ef081c8fbcfc6be8fa90

This object keeps a little more information than
`DOMDisplay`. Rather than using the scroll position of its DOM
element, it tracks its own ((viewport)), which tells us what part of
the level we are currently looking at. It also tracks ((time)) and
uses that to decide which ((animation)) ((frame)) to use. And finally,
it keeps a `flipPlayer` property so that even when the player is
standing still, it keeps facing the direction it last moved in.
@!8564fa78576079ec10ac075b4b6f41b63a7327c9

```{sandbox: "game", includeCode: true}
function CanvasDisplay(parent, level) {
  this.canvas = document.createElement("canvas");
  this.canvas.width = Math.min(600, level.width * scale);
  this.canvas.height = Math.min(450, level.height * scale);
  parent.appendChild(this.canvas);
  this.cx = this.canvas.getContext("2d");

this.level = level;
  this.animationTime = 0;
  this.flipPlayer = false;

this.viewport = {
    left: 0,
    top: 0,
    width: this.canvas.width / scale,
    height: this.canvas.height / scale
  };

this.drawFrame(0);
}

CanvasDisplay.prototype.clear = function() {
  this.canvas.parentNode.removeChild(this.canvas);
};
```
@!219676a88a9df30f83503fde902569426f8b1956

{{index "CanvasDisplay type"}}
@!79d17e2108509271ab68b2146a11c87ed5d052fd

The `animationTime` counter is the reason we
passed the step size to `drawFrame` in
[Chapter 15](15_game.html#domdisplay), even though `DOMDisplay`
does not use it. Our new `drawFrame` function uses the counter to track time
so that it can switch between ((animation)) ((frame))s based on the
current time.
@!7e8cc7fc65e4bca821865b3ebeac9b046ab8c22f

```{sandbox: "game", includeCode: true}
CanvasDisplay.prototype.drawFrame = function(step) {
  this.animationTime += step;

this.updateViewport();
  this.clearDisplay();
  this.drawBackground();
  this.drawActors();
};
```
@!a5b24eb009f9cee32d57cb8ece90ec00eeb7c2bc

{{index scrolling}}
@!72f24776b4829a7c21f2d75e516c37ca6e479fa1

Other than tracking time, the method updates the
((viewport)) for the current player position, fills the whole canvas
with a background color, and draws the ((background)) and ((actor))s
onto that. Note that this is different from the approach in
[Chapter 15](15_game.html#domdisplay), where we drew the background
once and scrolled the wrapping DOM element to move it.
@!9a14740b11269c2df29f908303bf8f1ddd6f3a8d

{{index clearing}}
@!c3def8e4cdda2cae36dc533f442d278a23ccdbba

Because shapes on a canvas are just ((pixel))s, after we
draw them, there is no way to move them (or remove them). The only way
to update the canvas display is to clear it and redraw the scene.
@!eb43c1177a9076b59fd70ff82b3fbb3081c3a2e4

{{index "CanvasDisplay type"}}
@!b8802eccd45ab32ffca0f8e6b82bf965f46294d8

The `updateViewport` method is similar to
`DOMDisplay`'s `scrollPlayerIntoView` method. It checks whether the
player is too close to the edge of the screen and moves the
((viewport)) when this is the case.
@!a51fce5cfa7672c68a28414fddf1d1710910225f

```{sandbox: "game", includeCode: true}
CanvasDisplay.prototype.updateViewport = function() {
  var view = this.viewport, margin = view.width / 3;
  var player = this.level.player;
  var center = player.pos.plus(player.size.times(0.5));

if (center.x < view.left + margin)
    view.left = Math.max(center.x - margin, 0);
  else if (center.x > view.left + view.width - margin)
    view.left = Math.min(center.x + margin - view.width,
                         this.level.width - view.width);
  if (center.y < view.top + margin)
    view.top = Math.max(center.y - margin, 0);
  else if (center.y > view.top + view.height - margin)
    view.top = Math.min(center.y + margin - view.height,
                        this.level.height - view.height);
};
```
@!7da1dc4524d355037f9ca9e6f581740afb2f7035

{{index boundary, "Math.max function", "Math.min function", clipping}}
@!a139dc1e54e5fa9b38ed952ea29650ea20436b07

The calls
to `Math.max` and `Math.min` ensure that the viewport does
not end up showing space outside of the level. `Math.max(x, 0)`
ensures that the resulting number is not less than zero.
`Math.min`, similarly, ensures a value stays below a given bound.
@!ccb58116ebc05d3c617b5ba33b7bc2f5d848ae5e

When ((clearing)) the display, we'll use a slightly different
((color)) depending on whether the game is won (brighter) or lost
(darker).
@!2d468ec3b66d258feaf7cf9f3600f5ec68a9cf88

```{sandbox: "game", includeCode: true}
CanvasDisplay.prototype.clearDisplay = function() {
  if (this.level.status == "won")
    this.cx.fillStyle = "rgb(68, 191, 255)";
  else if (this.level.status == "lost")
    this.cx.fillStyle = "rgb(44, 136, 214)";
  else
    this.cx.fillStyle = "rgb(52, 166, 251)";
  this.cx.fillRect(0, 0,
                   this.canvas.width, this.canvas.height);
};
```
@!408cf411777f8fdd9d5a63479a7d3e01eb8e923b

{{index "Math.floor function", "Math.ceil function", rounding}}
@!62c22b722dc929d63d40e3cd0f742127820fb55a

To draw the
background, we run through the tiles that are visible in the current
viewport, using the same trick used in `obstacleAt` in the
[previous chapter](15_game.html#viewport).
@!c6b145308514b71bf2c680b7ab3be38000eb1541

```{sandbox: "game", includeCode: true}
var otherSprites = document.createElement("img");
otherSprites.src = "img/sprites.png";

CanvasDisplay.prototype.drawBackground = function() {
  var view = this.viewport;
  var xStart = Math.floor(view.left);
  var xEnd = Math.ceil(view.left + view.width);
  var yStart = Math.floor(view.top);
  var yEnd = Math.ceil(view.top + view.height);

for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      var tile = this.level.grid[y][x];
      if (tile == null) continue;
      var screenX = (x - view.left) * scale;
      var screenY = (y - view.top) * scale;
      var tileX = tile == "lava" ? scale : 0;
      this.cx.drawImage(otherSprites,
                        tileX,         0, scale, scale,
                        screenX, screenY, scale, scale);
    }
  }
};
```
@!3240e10bc8f592ec4e46ddee22047cbff06b7e52

{{index "drawImage method", sprite, tile}}
@!714ff7de5c5b46e77806d400aebabf65ea356b97

Tiles that are not empty (null)
are drawn with `drawImage`. The `otherSprites` image contains the
pictures used for elements other than the player. It contains, from
left to right, the wall tile, the lava tile, and the sprite for a
coin.
@!455e9264ed40fb116a2d71e42ce6e73731006139

{{figure {url: "img/sprites_big.png", alt: "Sprites for our game",width: "1.4cm"}}}
@!c48634d22d999039f2ed664db416172639f3b88f

{{index scaling}}
@!da7b0e78bb9d3a7a290bfd87fde5e35057a6f25a

Background tiles are 20 by 20 pixels, since we will use
the same scale that we used in `DOMDisplay`. Thus, the offset for lava
tiles is 20 (the value of the `scale` variable), and the offset for
walls is 0.
@!be5f5cd9fe6ec363195617f23f44eff3f3f83193

{{index drawing, "load event", "drawImage method"}}
@!d73d5cbfeb8016678b49457b079d254a15703d80

We don't bother
waiting for the sprite image to load. Calling
`drawImage` with an image that hasn't been loaded yet will simply do
nothing. Thus, we might fail to draw the game properly for the first
few ((frame))s, while the image is still loading, but that is not a
serious problem. Since we keep updating the screen, the correct scene
will appear as soon as the loading finishes.
@!09148ce5a975a6b4eead5df3b50e06a4f58f05ea

{{index "player character", animation, drawing}}
@!438d5c4987a1852917a2b9d5ec83bdeeca75fbff

The ((walking))
character shown earlier will be used to represent the player. The
code that draws it needs to pick the right ((sprite)) and direction
based on the player's current motion. The first eight sprites contain a
walking animation. When the player is moving along a floor, we cycle
through them based on the display's `animationTime` property. This is
measured in seconds, and we want to switch frames 12 times per
second, so the ((time)) is multiplied by 12 first. When the player is
standing still, we draw the ninth sprite. During jumps, which are
recognized by the fact that the vertical speed is not zero, we use the
tenth, rightmost sprite.
@!6c5e9477245879bc828836fa25a5217a4b0f197a

{{index "flipHorizontally function", "CanvasDisplay type"}}
@!e83cc4d93974a871820fd9e8b53074658e9cc7d8

Because the
((sprite))s are slightly wider than the player object—24 instead of 16
pixels, to allow some space for feet and arms—the method has to adjust
the x-coordinate and width by a given amount (`playerXOverlap`).
@!c91e2ee39a69cf46e9c15aa1afdc5c9e32ab525f

```{sandbox: "game", includeCode: true}
var playerSprites = document.createElement("img");
playerSprites.src = "img/player.png";
var playerXOverlap = 4;

CanvasDisplay.prototype.drawPlayer = function(x, y, width,
                                              height) {
  var sprite = 8, player = this.level.player;
  width += playerXOverlap * 2;
  x -= playerXOverlap;
  if (player.speed.x != 0)
    this.flipPlayer = player.speed.x < 0;

if (player.speed.y != 0)
    sprite = 9;
  else if (player.speed.x != 0)
    sprite = Math.floor(this.animationTime * 12) % 8;

this.cx.save();
  if (this.flipPlayer)
    flipHorizontally(this.cx, x + width / 2);

this.cx.drawImage(playerSprites,
                    sprite * width, 0, width, height,
                    x,              y, width, height);

this.cx.restore();
};
```
@!a3fd02cd9a0c54a42e9d31473cd928d885f683a8

The `drawPlayer` method is called by `drawActors`, which is responsible for
drawing all the actors in the game.
@!fe34801dedf865d101ab3a9eed6615ad7b4cf0d5

```{sandbox: "game", includeCode: true}
CanvasDisplay.prototype.drawActors = function() {
  this.level.actors.forEach(function(actor) {
    var width = actor.size.x * scale;
    var height = actor.size.y * scale;
    var x = (actor.pos.x - this.viewport.left) * scale;
    var y = (actor.pos.y - this.viewport.top) * scale;
    if (actor.type == "player") {
      this.drawPlayer(x, y, width, height);
    } else {
      var tileX = (actor.type == "coin" ? 2 : 1) * scale;
      this.cx.drawImage(otherSprites,
                        tileX, 0, width, height,
                        x,     y, width, height);
    }
  }, this);
};
```
@!64075fc296616d88fa249014a71962b630ff0fbc

When ((drawing)) something that is not the ((player)), we look at its
type to find the offset of the correct sprite. The ((lava)) tile is
found at offset 20, and the ((coin)) sprite is found at 40 (two times `scale`).
@!59bc322bf253251d42e874287ba821ba700bdb52

{{index viewport}}
@!3f0a44182a6d48c283a396c629a3f9b9a1f4cb33

We have to subtract the viewport's position when
computing the actor's position since (0,0) on our ((canvas))
corresponds to the top left of the viewport, not the top left of the
level. We could also have used `translate` for this. Either way works.
@!2b801ed66d26eb3c6348bf87b4b8d4fa96198121

{{if interactive
@!9c2d5604ee715d2f0662d75099c21c0053b619a3

{{index "GAME_LEVELS data set", [game, "with canvas"]}}
@!3c6695ce0ef152ecb036fcd22db866d008dd0dd6

The tiny document
shown next plugs the new display into `runGame`:
@!0752cf38ddef7ba1aafc96356ddfb3debb18f898

// start_code
@!1c7deebca090a5842b447adf2e2367aa4d04efc2

[sandbox="game"]
[focus="yes"]
```{lang: "text/html"}
<body>
  <script>
    runGame(GAME_LEVELS, CanvasDisplay);
  </script>
</body>
```
@!610e72c870d573911efa07855926df5708644c39

if}}
@!b2e95eac0576fab58e6176135ad9872cdb1236a8

{{if book
@!4502c94c839cff4ef063d0be5a64aee604c796b0

{{index [game, screenshot]}}
@!2081f55ba6d442181a910492e534c203b8bc0d37

That concludes the new ((display)) system. The
resulting game looks something like this:
@!5c4ef59e3790cc09a93e718792a65ac84f5c789b

{{figure {url: "img/canvas_game.png", alt: "The game as shown on canvas",width: "8cm"}}}
@!96fdab9f9231d29db5ce6a7896c25009bf678e9a

if}}
@!7fc53fd846ce42abb8b98a3e8d1ab91c278e25f2

{{id graphics_tradeoffs}}
@!afa3d254e93b2e5d9e482e655deea4179d145410

## Choosing a graphics interface
@!4bd4c7d54e4a7688d7fdb61ccc1e70ea62f1f281

Whenever you need to generate graphics in the browser, you can choose
between plain ((HTML)), ((SVG)), and ((canvas)). There is no single
_best_ approach that works in all situations. Each option has
strengths and weaknesses.
@!8333eff450b7734d985216c092fd51a66d90c380

{{index "text wrapping"}}
@!85845483853f282bb7cca379d224ea9a454fecef

Plain HTML has the advantage of being simple. It
also integrates well with ((text)). Both SVG and canvas allow you to
draw text, but they won't help you position that text or wrap it
when it takes up more than one line. In an HTML-based picture, it is
easy to include blocks of text.
@!ee9f7d5e1afcfcdbbfb23f7348a2ff78891f95ca

{{index zooming, SVG}}
@!d7005e3130caa7591c41e87d881ec7ca30fcd4ba

SVG can be used to produce ((crisp)) ((graphics))
that look good at any zoom level. It is more difficult to use than
plain HTML but also much more powerful.
@!7c26ea942931029601d492034c4514b78d61c943

{{index DOM, SVG, "event handling"}}
@!165b8ee576e92b1b1ba4684b2f3c3dbaf7ee65d8

Both SVG and HTML build up a
((data structure)) (the DOM) that represents the picture. This makes
it possible to modify elements after they are drawn. If you need to
repeatedly change a small part of a big ((picture)) in response to
what the user is doing or as part of an ((animation)), doing it in a 
canvas can be needlessly expensive. The DOM also allows us to register
mouse event handlers on every element in the picture (even on shapes
drawn with SVG). You can't do that with canvas.
@!b2f061674e85da07e18b5a72510ef5c452a28957

{{index performance, optimization}}
@!72c8b49b752f3360d2aea3f47d01709490aabbbe

But ((canvas))’s ((pixel))-oriented
approach can be an advantage when drawing a huge amount of tiny
elements. The fact that it does not build up a data structure but
only repeatedly draws onto the same pixel surface gives canvas a
lower cost per shape.
@!3110b42770fd0d06850cf92841c4b4f164110d01

{{index "ray tracer"}}
@!9992f91784fc82f03d89dbf3a60f677bd7b6d4a4

There are also effects, such as rendering a scene one
pixel at a time (for example, using a ray tracer) or postprocessing
an image with JavaScript (blurring or distorting it), that can only be
realistically handled by a ((pixel))-based technique.
@!bc3ec3563a86ca453f6b7fc7e12c35d52a5c897d

In some cases, you may want to combine several of these
techniques. For example, you might draw a ((graph)) with ((SVG)) or
((canvas)) but show ((text))ual information by positioning an
((HTML)) element on top of the picture.
@!2caf4eacf57100263594d1d1d86d37348bcba79a

{{index display}}
@!c9a527918215988c065416cf7584ff2968ab95c2

For nondemanding applications, it really doesn't matter
much which interface you choose. The
[second display](16_canvas.html#canvasdisplay) we built for our
game in this chapter could have been implemented using any of these
three ((graphics)) technologies since it does not need to draw text,
handle mouse interaction, or work with an extraordinarily large amount
of elements.
@!4db822cf5d41faf7bac0e9f33760d4c7bd40d1ca

## Summary
@!747222e6b039c760852efdefdd0ff6573ad83ae8

In this chapter, we discussed techniques for drawing graphics in the
browser, focusing on the `<canvas>` element.
@!2a3ff4fa6ebef7337600d1ff295914cabf0d07f5

A canvas node represents an area in a document that our program may
draw on. This drawing is done through a drawing context object,
created with the `getContext` method.
@!025aa96d1ac86724c2fa43f316550790bbf82d3e

The 2D drawing interface allows us to fill and stroke various shapes.
The context's `fillStyle` property determines how shapes are filled. The
`strokeStyle` and `lineWidth` properties control the way lines are drawn.
@!526cafba6102951f71c8ed206bf0fc18ef1c974e

Rectangles and pieces of text can be drawn with a single method call.
The `fillRect` and `strokeRect` methods draw rectangles, and the 
`fillText` and `strokeText` methods draw text. To create custom shapes, 
we must first build up a path.
@!011ec654cfc1d1a297ab2d875ce7e74659c4556f

{{index stroking, filling}}
@!41cf872304f1b1ca38f3e278cfd6a2381f4d46e7

Calling `beginPath` starts a new path. A
number of other methods add lines and curves to the current path. For
example, `lineTo` can add a straight line. When a path is
finished, it can be filled with the `fill` method or stroked with the
`stroke` method.
@!c4da7d8f93ee2796b2a08e534937b59308eaa41a

Moving pixels from an image or another canvas onto our canvas is done
with the `drawImage` method. By default, this method draws the whole
source image, but by giving it more parameters, you can copy
a specific area of the image. We used this for our game by copying individual
poses of the game character out of an image that contained many
such poses.
@!bb6630ec207cdd502aa1259f87e9a782cdbd875e

Transformations allow you to draw a shape in multiple orientations. 
A 2D drawing context has a current transformation that can be changed
with the `translate`, `scale`, and `rotate` methods. These will affect
all subsequent drawing operations. A transformation state can be saved
with the `save` method and restored with the `restore` method.
@!e8772f6d0c36525cb6f11517b03c6c7d505f4381

When drawing an animation on a canvas, the `clearRect` method can be
used to clear part of the canvas before redrawing it.
@!a189314e11ddfb1c689f075dafb88b56c3cc6a44

## Exercises
@!6e6ed5d55e2fa37b9739a9a0bd96f4bb3e823c0e

### Shapes
@!31dada7c8201175957913758ee733a6fafd473fb

{{index "shapes (exercise)"}}
@!328fbb2ad5bcb015d6bf04e44861aa8fe1bae247

Write a program that draws the following
((shape))s on a ((canvas)):
@!6d167a50f7a04f0badf3436aaf872558161e238c

1. A ((trapezoid)) (a ((rectangle)) that is wider on one side)
@!a5179b59fbc37fc52a6777b98ec25a80799ee58d

{{index rotation}}
@!bd7be4d2df64a0a47b4a1ce1c86d6834a6f18e62

2. A red ((diamond)) (a rectangle rotated 45 degrees or ¼π radians)
@!cc97f38f58ed2659364bab3ff7a2e0059dadddb2

3. A zigzagging ((line))
@!93dbd3ee60359eebdf45c021275d01f2a68687f5

4. A ((spiral)) made up of 100 straight line segments
@!3ed0d8203fc5f5438d1cdcef13c617535a06827c

5. A yellow ((star))
@!512ffb1098f3e7965307d07ff623270801a94874

{{figure {url: "img/exercise_shapes.png", alt: "The shapes to draw",width: "8cm"}}}
@!38d9a6fd290e045503bda3c1a88996752cccb7ae

When drawing the last two, you may want to refer to the
explanation of `Math.cos` and `Math.sin` in
[Chapter 13](13_dom.html#sin_cos), which describes how to get
coordinates on a circle using these functions.
@!e342b479c0a39b08a976c591333bc35e4354a94f

{{index readability, "hard-coding"}}
@!50287cf92e02d0a1a41ac8ae1e5cfead43d2641b

I recommend creating a function for
each shape. Pass the position, and optionally other properties,
such as the size or the number of points, as parameters. The
alternative, which is to hard-code numbers all over your code, tends
to make the code needlessly hard to read and modify.
@!f12a12f842a638e8774b2d08d8d733b1141be5dc

{{if interactive
@!8a2dde61dff69781b8f6d5ceef08cf1e1d41ab99

```{lang: "text/html", test: no}
<canvas width="600" height="200"></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");

// Your code here.
</script>
```
@!82184f57bda5826943e62feee597712bb9db58fd

if}}
@!ad1b5ae7e77b0dc473b24af9fac38d4cb81a6989

{{hint
@!c327eb00ee0f719fbab112a1df5526eff26a7803

{{index [path, canvas], "shapes (exercise)"}}
@!ad7d4d9a880dc19811699e1f234b252f4438a84c

The ((trapezoid)) (1) is easy to draw using
a path. Pick suitable center coordinates and add each of the four
corners around that.
@!a210a35ed86d3d07819bb1d9aae537715471d85b

{{index "flipHorizontally function", rotation}}
@!9568b605b7efec34c77c0e89d0859c5c8de41963

The ((diamond)) (2) can
be drawn the easy way, with a path, or the interesting way, with a
`rotate` ((transformation)). To use rotation, you will have to apply a
trick similar to what we did in the `flipHorizontally` function.
Because you want to rotate around the center of your rectangle and
not around the point (0,0), you must first `translate` to there, then
rotate, and then translate back.
@!a575eb26b1552ece0ad78c7e84d91f9e28edef13

{{index "remainder operator", "% operator"}}
@!c051e43250f4de8ec35182fd49d0a5b1d8b00992

For the ((zigzag)) (3) it
becomes impractical to write a new call to `lineTo` for each line
segment. Instead, you should use a ((loop)). You can have each
iteration draw either two ((line)) segments (right and then left again) or
one, in which case you must use the evenness (`% 2`) of the loop index
to determine whether to go left or right.
@!13a9e93c7b989408d3cd18a63929b1ff846b2305

You'll also need a loop for the ((spiral)) (4). If you draw a series
of points, with each point moving further along a circle around the
spiral's center, you get a circle. If, during the loop, you vary the
radius of the circle on which you are putting the current point and
go around more than once, the result is a spiral.
@!92fd14366a5c746c0d62d21c22949c6fe2a42d18

{{index "quadraticCurveTo method"}}
@!40f5e1ad2a76da1e9f0c58b752581171cb12243f

The ((star)) (5) depicted is built out of
`quadraticCurveTo` lines. You could also draw one with straight lines.
Divide a circle into eight pieces, or a piece for each point you want your 
star to have. Draw lines between these points, making them curve
toward the center of the star. With `quadraticCurveTo`, you can use
the center as the control point.
@!c8024cdea2271062ab85503c4b1532cb0fb8528f

hint}}
@!23eae92a3330800dd55f4985d351cee6af3c7428

{{id exercise_pie_chart}}
@!19579d5cf05e3850fc01326a51140caf8d8d9234

### The pie chart
@!6cf6bf9a117a36c4f6dc9f6b2e313166004d6c87

{{index label, text, "pie chart example"}}
@!ab22c3818c6e4e9d0d1e758f9d4e0e1cf2f57e56

[Earlier](16_canvas.html#pie_chart) in the chapter, we
saw an example program that drew a pie chart. Modify this program so
that the name of each category is shown next to the slice that
represents it. Try to find a pleasing-looking way to automatically
position this text, which would work for other data sets as well. You
may assume that categories are no smaller than 5 percent (that is, there won't be
a bunch of tiny ones next to each other).
@!0404c43ee25d6847eaf63d1047f48e33856506ba

You might again need `Math.sin` and `Math.cos`, as described in the
previous exercise.
@!4281988551c7b75534a7b7042763532ed5d749c7

{{if interactive
@!450f68bdb81cf05b3eaf4fc9bf35490ef50e1ff6

```{lang: "text/html", test: no}
<canvas width="600" height="300"></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  var total = results.reduce(function(sum, choice) {
    return sum + choice.count;
  }, 0);

var currentAngle = -0.5 * Math.PI;
  var centerX = 300, centerY = 150;
  // Add code to draw the slice labels in this loop.
  results.forEach(function(result) {
    var sliceAngle = (result.count / total) * 2 * Math.PI;
    cx.beginPath();
    cx.arc(centerX, centerY, 100,
           currentAngle, currentAngle + sliceAngle);
    currentAngle += sliceAngle;
    cx.lineTo(centerX, centerY);
    cx.fillStyle = result.color;
    cx.fill();
  });
</script>
```
@!19160ad217cf4220ca09bd7845f47b49792732db

if}}
@!2405cfcf97ab3f14f1af37edf3df5ac47f371b86

{{hint
@!9a82fb455b035f078dbbec39b9735e21d0b74d20

{{index "fillText method", "textAlign property", "textBaseline property", "pie chart example"}}
@!3ed419720548f79bc3082c30b1d0a633cf4f7331

You will need to call `fillText`
and set the context's `textAlign` and `textBaseline` properties in
such a way that the text ends up where you want it.
@!3de211c7cd8642208b0f41ec0f012314ebf41233

A sensible way to position the labels would be to put the text on the
line going from the center of the pie through the middle of the slice.
You don't want to put the text directly against the side of the pie
but rather move the text out to the side of the pie by a given number of pixels.
@!5fe44b7a9399278b65d6a9f9165a334f9ffa1d2e

The ((angle)) of this line is `currentAngle + 0.5 * sliceAngle`. The
following code finds a position on this line, 120 pixels from the center:
@!112ac360a6a944ee33401b6075c89b614ddf2548

```{test: no}
var middleAngle = currentAngle + 0.5 * sliceAngle;
var textX = Math.cos(middleAngle) * 120 + centerX;
var textY = Math.sin(middleAngle) * 120 + centerY;
```
@!acb4d31b6b9c78e7f7a94be0650749860a2f8230

For `textBaseline`, the value `"middle"` is probably appropriate when
using this approach. What to use for `textAlign` depends on the side
of the circle we are on. On the left, it should be `"right"`, and on
the right, it should be `"left"` so that the text is positioned away
from the pie.
@!a6ede7ec01107fd85bf05e6a09a358ec521260eb

{{index "Math.cos function"}}
@!e65d7ca069e0e240c253ed89ece33f8f7844e679

If you are not sure how to find out which side
of the circle a given angle is on, look to the explanation of
`Math.cos` in the previous exercise. The cosine of an angle tells us
which x-coordinate it corresponds to, which in turn tells us exactly
which side of the circle we are on.
@!2268aaed7ba09bc6783d428b51c35af3a4b2e393

hint}}
@!94a648c61ea4c2d973acbeb489cc149b596f21c0

### A bouncing ball
@!222a5e76f1064ae01d234829ad1dd49e351636d9

{{index animation, "requestAnimationFrame function", bouncing}}
@!a0c19adf950d46dc4972b3723acc45efbc5b7ae5

Use
the `requestAnimationFrame` technique that we saw in
[Chapter 13](13_dom.html#animationFrame) and
[Chapter 15](15_game.html#runAnimation) to draw a ((box)) with a
bouncing ((ball)) in it. The ball moves at a constant
((speed)) and bounces off the box's sides when it hits them.
@!81c7169baa560585ebdb9415894c994ac85ebc9a

{{if interactive
@!f1e7fb7d565b0d5c1f0e833f096e0f8ec7fa2c63

```{lang: "text/html", test: no}
<canvas width="400" height="400"></canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");

var lastTime = null;
  function frame(time) {
    if (lastTime != null)
      updateAnimation(Math.min(100, time - lastTime) / 1000);
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

function updateAnimation(step) {
    // Your code here.
  }
</script>
```
@!15393a1ad9a24dac18222392d59fa0c9f2259685

if}}
@!be3ff5a4706f48d2dac5ff9389f77db63a5f093c

{{hint
@!4f3080bc6714a6ebcea641f7466c28ca1948fa17

{{index "strokeRect method", animation, "arc method"}}
@!50bedd2e9d63993f6b5fcf1de5b3375d167b1486

A ((box)) is
easy to draw with `strokeRect`. Define a variable that holds its size 
or define two variables if your box's width and height differ. To create a
round ((ball)), start a path, call _arc(x, y, radius, 0, 7)_, which creates an arc
going from zero to more than a whole circle, and fill it.
@!5ceb7b60f6d59cbdbfcbe663cbed9934d450b03e

{{index "collision detection", "Vector type"}}
@!33a152c8ad3c89098f3c662e36ebfd15888b5fa0

To model the ball's position
and ((speed)), you can use the `Vector` type from
[Chapter 15](15_game.html#vector)[(which is available on this
page)]{if interactive}. Give it a starting speed, preferably one that is not purely
vertical or horizontal, and every ((frame)), multiply that speed with
the amount of time that elapsed. When the ball gets too close to a
vertical wall, invert the x component in its speed. Likewise, invert
the y component when it hits a horizontal wall.
@!5a572919c6a4d0adfd48e0d0f948a7842b31308b

{{index "clearRect method", clearing}}
@!6f6f095f70ce5f28b5e0adf827a86a84b8f59e8c

After finding the ball's new
position and speed, use `clearRect` to delete the scene and redraw it
using the new position.
@!7a45a112faf989f7a1c70abb8831bf86894c286e

hint}}
@!c999c444e7000df34e684ca540051a8126c14401

### Precomputed mirroring
@!86f3b110eb3a207cb0a41fa27cddaa3bc8a968d7

{{index optimization, "bitmap graphics", mirror}}
@!8dddece52be240a41164c955f977a862b874beac

One unfortunate
thing about ((transformation))s is that they slow down drawing of
bitmaps. For vector graphics, the effect is less serious since 
only a few points (for example, the center of a circle) need to be
transformed, after which drawing can happen as normal. For a bitmap
image, the position of each ((pixel)) has to be transformed, and
though it is possible that ((browser))s will get more clever about
this in the ((future)), this currently causes a measurable increase in
the time it takes to draw a bitmap.
@!d9ab274d97ccbde0be46f2b16d0a1be3c7a549ff

In a game like ours, where we are drawing only a single transformed
sprite, this is a nonissue. But imagine that we need to draw hundreds
of characters or thousands of rotating particles from an explosion.
@!c9640ac0af8e6f125a0ec882b641e1a66af3bb1c

Think of a way to allow us to draw an inverted character without
loading additional image files and without having to make transformed
`drawImage` calls every frame.
@!4967516ea5af3459249f52e70f845e9def5946d6

{{hint
@!e43c0d8fd189e6bb4f80885b1c42c3dadd6148e4

{{index mirror, scaling, "drawImage method"}}
@!53c081181f51c5b43a8aa96ae035ed11dde6f93a

The key to the solution
is the fact that we can use a ((canvas)) element as a source image
when using `drawImage`. It is possible to create an extra `<canvas>`
element, without adding it to the document, and draw our inverted
sprites to it, once. When drawing an actual frame, we just copy the
already inverted sprites to the main canvas.
@!13ff307e28d1852ee9cd3c7ab2d0197a128db944

{{index "load event"}}
@!41f86e71be898790f2032f139c5d09c48891a3af

Some care would be required because images do not load
instantly. We do the inverted drawing only  once, and if we do it
before the image loads, it won't draw anything. A `"load"` handler on
the image can be used to draw the inverted images to the extra canvas.
This canvas can be used as a drawing source immediately (it'll simply
be blank until we draw the character onto it).
@!a1a1b7aa6543ee2e4e56217811ac623700da3b56

hint}}
@!ccd3769b614c136958bd70c5b2510ec0912a506b