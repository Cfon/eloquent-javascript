{{meta {chap_num: 15, prev_link: 14_event, next_link: 16_canvas, load_files: ["code/chapter/15_game.js", "code/game_levels.js"], zip: "html include=[\"css/game.css\"]"}}}
@!67232c28bcec964a23e1de3cd494eba12a95071e

# Project: A Platform Game
@!149cc1ff8dd615f0372c91d7231e563506b95034

{{quote {author: "Iain Banks", title: "The Player of Games"}
@!0a6f93e9fa6c5f5af6e94e9a8b7a39fd40dacb97

All reality is a game.
@!14c08ee0b00063b28801a31876509a0fcfbe7083

quote}}
@!5c7da869738c75b7e95cd42414acafeb2a1b3ecf

{{index "Banks, Ian", "project chapter", simulation}}
@!0c4ced09dd38d9b819dfa8edf0616437c126f133

My initial
fascination with computers, like that of many kids, originated with
computer ((game))s. I was drawn into the tiny computer-simulated
((world))s that I could manipulate and in which stories (sort of)
unfolded—more, I suppose, because of the way I could project my
((imagination)) into them than because of the possibilities they
actually offered.
@!a792da1db0d10204d1dbc71d54018ce154cf8f36

I wouldn't wish a ((career)) in game programming on anyone. Much like
the ((music)) industry, the discrepancy between the many eager
young people wanting to work in it and the actual demand for such
people creates a rather unhealthy environment. But writing games for
fun is amusing.
@!99095a2dfdfdba4bab1dddfc8d0cb34c52b7bdfc

{{index "jump-and-run game", dimensions}}
@!b83f0b59b93932f581493e7c5355006ded5e2611

This chapter will walk through
the implementation of a simple ((platform game)). Platform games (or
“jump and run” games) are games that expect the ((player)) to move a
figure through a ((world)), which is often two-dimensional and viewed
from the side, and do lots of jumping onto and over things.
@!e99244db4ad75bdf569ef0e4d28ba1dee5baa99f

## The game
@!ab9788ec64bbeef8c2f4df02e66b307c812b9570

{{index minimalism, "Palef, Thomas", "Dark Blue (game)"}}
@!72548688d9ffe81e4fa6a0627fa8b54abc52ef4d

Our
((game)) will be roughly based on
http://www.lessmilk.com/games/10[Dark Blue][ (_www.lessmilk.com/games/10_)]{if book} by Thomas Palef. I chose this game
because it is both entertaining and minimalist, and because it can be built
without too much ((code)). It looks like this:
@!acfedc6da20b43b66495677e58cf04825d8cd157

{{figure {url: "img/darkblue.png", alt: "The game Dark Blue"}}}
@!d220ce7bebce3d8998963e4086b874fb50ec3a06

{{index coin, lava}}
@!7fe9ce5d251d19948009af3fcd8c25cd91b94ce4

The dark ((box)) represents the ((player)), whose
task is to collect the yellow boxes (coins) while avoiding the red
stuff (lava?). A ((level)) is completed when all coins have been
collected.
@!40614e5cc5be006923c771c5d9c52a4ef0256bab

{{index keyboard, jumping}}
@!7a41422b132ec1e5d54282cb9c7eb11a6000e515

The player can walk around with the left
and right arrow keys and jump with the up arrow. Jumping is a
specialty of this game character. It can reach several times its own
height and is able to change direction in midair. This may not be
entirely realistic, but it helps give the player the feeling of being
in direct control of the onscreen ((avatar)).
@!b3487adbe4058cde21598f067806a9c6cf9c17ea

{{index "fractional number", discretization, "artificial life", "electronic life"}}
@!1ddd03166c7f38f5b997f5554b048babf4ce9e42

The ((game)) consists of a fixed
((background)), laid out like a ((grid)), with the moving elements
overlaid on that background. Each field on the grid is either empty,
solid, or ((lava)). The moving elements are the player, coins, and
certain pieces of lava. Unlike the artificial life simulation from
[Chapter 7](07_elife.html#elife), the positions of these elements
are not constrained to the grid—their coordinates may be fractional,
allowing smooth ((motion)).
@!5e091b3b9922a00c74ee712cf888a0b23cf37a7f

## The technology
@!4a43a6b5d7574fcd8274400ae2363900e4505da2

{{index "event handling", keyboard}}
@!811d65aa9f4351a2c7d0b4640c590942e391dde3

We will use the ((browser)) ((DOM))
to display the game, and we'll read user input by handling key events.
@!59547bebda0a223439c83a3024ea4d0b268bc582

{{index rectangle, "background (CSS)", "position (CSS)", graphics}}
@!f87e83a31721bfd0cbff03b54f00c0feeb6eb5ed

The screen- and keyboard-related code is only a
tiny part of the work we need to do to build this ((game)). Since
everything looks like colored ((box))es, drawing is uncomplicated: we
create DOM elements and use styling to give them a background color,
size, and position.
@!768708d80cefbf2f9183685cc36818d101843a38

{{index "table (HTML tag)"}}
@!b44a607b34358ff4b452d0c41572f06e44d38b70

We can represent the background as a table since it
is an unchanging ((grid)) of squares. The free-moving elements can be
overlaid on top of that, using absolutely positioned elements.
@!44dc31a04ef3687def58475e8dd10c7956915e9d

{{index performance}}
@!b92d7fc2735e052bd593474fd450a1be8979fae5

In games and other programs that have to animate
((graphics)) and respond to user ((input)) without noticeable delay,
((efficiency)) is important. Although the ((DOM)) was not originally
designed for high-performance graphics, it is actually better at this
than you would expect. You saw some ((animation))s in
[Chapter 13](13_dom.html#animation). On a modern machine, a simple
game like this performs well, even if we don't think about
((optimization)) much.
@!355c9a4480b1d6fff1c3503737a36f93b216c8f5

{{index canvas}}
@!8c41f43fcfc9751dd940729c06759a0468628bbb

In the [next chapter](16_canvas.html#canvas), we will
explore another ((browser)) technology, the `<canvas>` tag, which
provides a more traditional way to draw graphics, working in terms of
shapes and ((pixel))s rather than ((DOM)) elements.
@!7183486d0feee299e0ac273c51d2daba78c0b01a

## Levels
@!42305ccd37c29f5700affa5bc334801f65a15526

{{index dimensions}}
@!854f79ba4bfeaec83d9a23ca52dee4eb0ebbb2bf

In [Chapter 7](07_elife.html#plan) we used arrays
of strings to describe a two-dimensional ((grid)). We can do the same
here. It will allow us to design ((level))s without first building a
level ((editor)).
@!9a7a960631b4eb4c641b436822990aaf9ac113e6

A simple level would look like this:
@!28be7a406fb4b0a0f7a1b2cabd3cec3739dcaea8

```{includeCode: true}
var simpleLevelPlan = [
  "                      ",
  "                      ",
  "  x              = x  ",
  "  x         o o    x  ",
  "  x @      xxxxx   x  ",
  "  xxxxx            x  ",
  "      x!!!!!!!!!!!!x  ",
  "      xxxxxxxxxxxxxx  ",
  "                      "
];
```
@!cef08b8b463eb24b50faf89b52a52cb19b565e02

Both the fixed ((grid)) and the moving elements are included in the
plan. The `x` characters stand for ((wall))s, the space characters for empty
space, and the exclamation marks represent fixed, nonmoving lava tiles.
@!81a175934572081ea7e5a4b7872740dd282a4f99

{{index level}}
@!d2b4525439be5fa479c6187c1b6b4ae226e1b528

The `@` defines the place where the ((player)) starts. Every `o` is a
((coin)), and the equal sign (`=`) stands for a block of ((lava))
that moves back and forth horizontally. Note that the ((grid)) for
these positions will be set to contain empty space, and another data
structure is used to track the position of such moving elements.
@!e6b3a84b675059f661676b05e1b43a494230401c

{{index bouncing}}
@!23f7c8567443f4df0285f054e8ea0d21afba7fd9

We'll support two other kinds of moving ((lava)): the
pipe character (`|`) for vertically moving blobs, and `v` for
_dripping_ lava—vertically moving lava that doesn't bounce back and
forth but only moves down, jumping back to its start position when it
hits the floor.
@!fb6bdb4f16d26dba7b988f4d285744caa3ad3ecb

A whole ((game)) consists of multiple ((level))s that the
((player)) must complete. A level is completed when all ((coin))s
have been collected. If the player touches
((lava)), the current level is restored to its starting position, and
the player may try again.
@!f62d4c760c97850a8aa1187ef9761301e8648cb1

{{id level}}
@!d3482e503d7f5fdbfbd22741a6d952a9b8a36b59

## Reading a level
@!23f43bf5740ea52c69a42eb98312a46175a8586a

{{index "Level type"}}
@!6ad6bec0182106804c37be21930c163148082f98

The following ((constructor)) builds a ((level))
object. Its argument should be the array of strings that define the
level.
@!a0924e2336ad688c4f5a9803750ca5b7ceb50f4c

```{includeCode: true}
function Level(plan) {
  this.width = plan[0].length;
  this.height = plan.length;
  this.grid = [];
  this.actors = [];

for (var y = 0; y < this.height; y++) {
    var line = plan[y], gridLine = [];
    for (var x = 0; x < this.width; x++) {
      var ch = line[x], fieldType = null;
      var Actor = actorChars[ch];
      if (Actor)
        this.actors.push(new Actor(new Vector(x, y), ch));
      else if (ch == "x")
        fieldType = "wall";
      else if (ch == "!")
        fieldType = "lava";
      gridLine.push(fieldType);
    }
    this.grid.push(gridLine);
  }

this.player = this.actors.filter(function(actor) {
    return actor.type == "player";
  })[0];
  this.status = this.finishDelay = null;
}
```
@!5352b28a157374b2bedba56335f2ad8beb573ad3

{{index validation}}
@!94c86f62e5640a9408d4639415089fe3574099ce

For brevity, the code does not check for malformed
input. It assumes that you've given it a proper ((level)) plan, complete
with a player start position and other essentials.
@!10a9c97a89608953f4d11a8106268914aa2ae74a

{{index array}}
@!93cc914e66eb7d09b7632e52cffe22a0f0b5bd32

A level stores its width and height, along with two
arrays—one for the ((grid)) and one for the _((actor))s_, which are the dynamic
elements. The grid is represented as an array of arrays, where each of
the inner arrays represents a horizontal line and each square
contains either null, for empty squares, or a string indicating the
type of the square—`"wall"` or `"lava"`.
@!cfb8d0601e97b04fdc55f7c55272d3a5d34f65cd

The ((actor))s array holds objects that track the current position and
((state)) of the dynamic elements in the ((level)). Each of these is
expected to have a `pos` property that gives its position (the
((coordinates)) of its top-left corner), a `size` property that gives its
size, and a `type` property that holds a string identifying the
element (`"lava"`, `"coin"`, or `"player"`).
@!e77339fd3a4054bd0af4176e303195eec78dd579

{{index "filter method"}}
@!33bb858070a2936eda80be6dccbefd7e62b6a59c

After building the grid, we use the `filter` method
to find the ((player)) actor object, which we store in a property of the
level. The `status` property tracks whether the player has won or
lost. When this happens, `finishDelay` is used to keep the level active
for a short period of time so that a simple ((animation)) can be
shown. (Immediately resetting or advancing the level would look
cheap.) This method can be used to find out whether a ((level)) is
finished:
@!8ccdaeeeeadf13a07c5d7d1177067de6103ebaec

```{includeCode: true}
Level.prototype.isFinished = function() {
  return this.status != null && this.finishDelay < 0;
};
```
@!f7ee10fd35c4634ff9176a93cd7bf1d97e64b01c

## Actors
@!a540d61d8047828ebb2babfa689ebc46698266a8

{{index "Vector type", coordinates}}
@!3b6511ba9ea48e0b533ac5c669508cf953d9722e

{{id vector}}
@!745831504756372986d081f4d69aa600ca65fdfb

To store the position and
size of an actor, we will return to our trusty `Vector` type, which
groups an x-coordinate and a y-coordinate into an object.
@!01f268f6b00b89407de9c60330c9f88d4d5f8b73

```{includeCode: true}
function Vector(x, y) {
  this.x = x; this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};
Vector.prototype.times = function(factor) {
  return new Vector(this.x * factor, this.y * factor);
};
```
@!2ecf8ac8402e9d891a66ccb9220ecd48bbcfb337

{{index "times method", multiplication}}
@!47a684bc33fc2e7fd85d76a8f17f79a256ed8072

The `times` method scales a
vector by a given amount. It will be useful when we need to multiply a
speed vector by a time interval to get the distance traveled during
that time.
@!f845dec3a86863bbfa0bbb58cda1ba9accf2ea56

{{index map, [object, "as map"]}}
@!48bcb18bae48e9b128a064279485dff6b9f214ec

In the previous section, the `actorChars` object was used by
the `Level` constructor to associate characters with constructor
functions. The object looks like this:
@!935263d028735307aaf6b565bd04f966f7b8c5c9

```{includeCode: true}
var actorChars = {
  "@": Player,
  "o": Coin,
  "=": Lava, "|": Lava, "v": Lava
};
```
@!c5a0d0ec7a924a48f296d0aeabb4dee3a7f1c680

{{index lava, bouncing}}
@!b65e050957a231902a0c2a133c5c657d785069d6

Three characters map to `Lava`. The `Level`
constructor passes the actor's source character as the second argument to
the constructor, and the `Lava` constructor uses that to adjust its
behavior (bouncing horizontally, bouncing vertically, or dripping).
@!1d80677c5899076eb121c21387414d2eea3fb19c

{{index simulation, "Player type"}}
@!8a57f7662685eae4321947675b73d57be9a81b4e

The player type is built with the
following constructor. It has a property `speed` that stores its current
speed, which will help simulate momentum and gravity.
@!58ce7f1b72f5586c34e1445a219b86b4b1ab0935

```{includeCode: true}
function Player(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(0, 0);
}
Player.prototype.type = "player";
```
@!b7409a5fc36203ec1afc5906fc842d16a0f2775d

Because a player is one-and-a-half squares high, its initial position
is set to be half a square above the position where the `@` character
appeared. This way, its bottom aligns with the bottom of the square
it appeared in.
@!51c251a769827e20ec5eb388df002828153fe59c

{{index "Lava type", bouncing}}
@!d3da3e7933f85095ed35ac352a106a952c722ab5

When constructing a dynamic `Lava`
object, we need to initialize the object differently depending on the
character it is based on. Dynamic lava moves along at its given speed
until it hits an obstacle. At that point, if it has a `repeatPos`
property, it will jump back to its start position (dripping). If it
does not, it will invert its speed and continue in the other direction
(bouncing). The constructor only sets up the necessary properties. The
method that does the actual moving will be written
[later](15_game.html#actors).
@!462dd99a1ccbcb1866044e7ca129487f337923a5

```{includeCode: true}
function Lava(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  if (ch == "=") {
    this.speed = new Vector(2, 0);
  } else if (ch == "|") {
    this.speed = new Vector(0, 2);
  } else if (ch == "v") {
    this.speed = new Vector(0, 3);
    this.repeatPos = pos;
  }
}
Lava.prototype.type = "lava";
```
@!e4ffa0c7076947f3d3a18f2db9f04aaa06876103

{{index "Coin type", animation}}
@!dc98fbf5e53b6681de74ea816e79ced5bc4bd9e1

`Coin` actors are simple. They mostly
just sit in their place. But to liven up the game a little, they are
given a “wobble”, a slight vertical motion back and forth. To track
this, a coin object stores a base position as well as a `wobble`
property that tracks the ((phase)) of the bouncing motion. Together,
these determine the coin's actual position (stored in the `pos`
property).
@!25881528051faf39c6fbdf758a5b7770f5e4499e

```{includeCode: true}
function Coin(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(0.6, 0.6);
  this.wobble = Math.random() * Math.PI * 2;
}
Coin.prototype.type = "coin";
```
@!6b84d19c6f5d5855a7ab5e64a811469de10aa430

{{index "Math.random function", "random number", "Math.sin function", sine, wave}}
@!adff8265dc7295f19fe220be8eb1c8da38dcd7a3

In
[Chapter 13](13_dom.html#sin_cos), we saw that `Math.sin` gives us
the y-coordinate of a point on a circle. That coordinate goes back and
forth in a smooth wave form as we move along the circle, which makes
the sine function useful for modeling a wavy motion.
@!1c640037703d3100572cb0be4f65588809784171

{{index pi}}
@!5aba118f6af7c0c0de413b1803ccb7adf6554883

To avoid a situation where all
coins move up and down synchronously, the starting phase of each coin
is randomized. The _((phase))_ of `Math.sin`'s wave, the width of a wave
it produces, is 2π. We multiply the value returned by `Math.random`
by that number to give the coin a random starting position on the wave.
@!e092d8192709891b9aaa50132ce776b5af17c74a

We have now written all the parts needed to represent the state of a level.
@!98393d7cc3e72aa2b2d7add52ee2cc19d17b7ff2

```{includeCode: strip_log}
var simpleLevel = new Level(simpleLevelPlan);
console.log(simpleLevel.width, "by", simpleLevel.height);
// → 22 by 9
```
@!ee2a3c223b1bbf1ceaf0012b7e407d1a0d427213

The task ahead is to display such levels on the screen and to model
time and motion inside them.
@!9d164f0a1e6beee1640e4be1e6154af0a9e5a5be

## Encapsulation as a burden
@!705ec1feca9e1fc07cc1890a90c1047df49505b3

{{index "programming style", "program size", complexity}}
@!39a93fe50b4e8145831d87599a6ff669beb0ab53

Most of the
code in this chapter does not worry about ((encapsulation)) for
two reasons. First, encapsulation takes extra effort. It makes
programs bigger and requires additional concepts and interfaces to be
introduced. Since there is only so much code you can throw at a reader
before their eyes glaze over, I've made an effort to keep the program
small.
@!738ae2a8abf9b0fa0116c932778fad7a9250daee

{{index interface}}
@!5095a1f309f1814c73130c490676d094e48f8cc4

Second, the various elements in this game are so
closely tied together that if the behavior of one of them changed, it
is unlikely that any of the others would be able to stay the same.
Interfaces between the elements would end up encoding a lot of
assumptions about the way the game works. This makes them a lot less
effective—whenever you change one part of the system, you still have
to worry about the way it impacts the other parts because their
interfaces wouldn't cover the new situation.
@!dbfa652d8800f418c15f0a6eca58d9506cb1f6ed

Some _cutting points_ in a system lend themselves well to separation
through rigorous interfaces, but others don't. Trying to encapsulate
something that isn't a suitable boundary is a sure way to waste a lot
of energy. When you are making this mistake, you'll usually notice
that your interfaces are getting awkwardly large and detailed and
that they need to be modified often, as the program evolves.
@!1aa5d96b72d4c7b9100a03ddcdd2c8ff30fb502d

{{index graphics, encapsulation, graphics}}
@!cf7a502099928c333a1e00b834f5cce13c7f09be

There is one thing that
we _will_ encapsulate in this chapter, and that is the ((drawing))
subsystem. The reason for this is that we will ((display)) the same
game in a different way in the link:16_canvas.html#canvasdisplay[next
chapter]. By putting the drawing behind an interface, we can simply
load the same game program there and plug in a new display
((module)).
@!834172f130722dcf453a52ed09ed5803e8389b02

{{id domdisplay}}
@!ebde267a04990290d1d012b21969b9a07952c60a

## Drawing
@!685a980d0addb16fe89666fe70a8e0c9c02db50a

{{index "DOMDisplay type"}}
@!2d2cdeb6b274d06a1a1a8ddc3c3acd9ebc200c5a

The encapsulation of the ((drawing)) code is done
by defining a _((display))_ object, which displays a given ((level)).
The display type we define in this chapter is called `DOMDisplay`
because it uses simple ((DOM)) elements to show the level.
@!29a3e6bb1899e794194f3abebce7f2b11a59ead1

{{index "style attribute"}}
@!ac9801cee67b743ffc29931bb5fb162411ed7988

We will be using a ((style sheet)) to set the
actual colors and other fixed properties of the elements that make up
the game. It would also be possible to directly assign to the
elements’ `style` property when we create them, but that would produce
more verbose programs.
@!9a24757a82b43e127ceece65d799bd0ebd732a36

{{index "class attribute"}}
@!70b70a51bd2640f951b43c74bcde433fe07aae17

The following helper function provides a short way to
create an element and give it a class:
@!9acabf6e018f8eb555cceba237009677a613710b

```{includeCode: true}
function elt(name, className) {
  var elt = document.createElement(name);
  if (className) elt.className = className;
  return elt;
}
```
@!ed401f383d0a8286ebeba31cfe426406cfe6cd49

A display is created by giving it a parent element to which it should
append itself and a ((level)) object.
@!fd6b0be6760a1d3a5d9de42347b1a29585f1699c

```{includeCode: true}
function DOMDisplay(parent, level) {
  this.wrap = parent.appendChild(elt("div", "game"));
  this.level = level;

this.wrap.appendChild(this.drawBackground());
  this.actorLayer = null;
  this.drawFrame();
}
```
@!ad2f31087e8f40a1c0814cd557d69f91e81fdb93

{{index "appendChild method"}}
@!6ecf37322095a0718fbd7c1096f2f59730ae760a

We used the fact that `appendChild` returns
the appended element to create the wrapper element and store it in the
`wrap` property in a single statement.
@!0b5771c910396711a508c2124394d3156884d50d

{{index level}}
@!a26b7962beec7fcb9634e6e5ff8b0af49e4202fc

The level's ((background)), which never changes, is drawn
once. The actors are redrawn every time the display is updated. The
`actorLayer` property will be used by `drawFrame` to track the element
that holds the actors so that they can be easily removed and
replaced.
@!156871e124f5aa4c566d9fc97cac811f29afa9c8

{{index scaling, "DOMDisplay type"}}
@!8c284969f5ad492806a4bc3fd0c8bb6ac112c8af

Our ((coordinates)) and sizes are
tracked in units relative to the ((grid)) size, where a size or
distance of 1 means 1 grid unit. When setting ((pixel)) sizes, we
will have to scale these coordinates up—everything in the game would be ridiculously
small at a single pixel per square. The `scale` variable gives the
number of pixels that a single unit takes up on the screen.
@!e925e5c44012a896138e9cb98776be94452a5d49

```{includeCode: true}
var scale = 20;

DOMDisplay.prototype.drawBackground = function() {
  var table = elt("table", "background");
  table.style.width = this.level.width * scale + "px";
  this.level.grid.forEach(function(row) {
    var rowElt = table.appendChild(elt("tr"));
    rowElt.style.height = scale + "px";
    row.forEach(function(type) {
      rowElt.appendChild(elt("td", type));
    });
  });
  return table;
};
```
@!74a52f622394bf9459b7fcb6c02e24b5bc449597

{{index "style sheet", CSS, "table (HTML tag)"}}
@!25dcd0eacc6e72db8084a648d27eae8cff421049

{{id game_css}}
@!33b9c6431601624eedfe1da6e291a8e3d4a6d763

As mentioned earlier, the
background is drawn as a `<table>` element. This nicely corresponds to
the structure of the `grid` property in the level—each row of the grid
is turned into a table row (`<tr>` element). The strings in the grid
are used as class names for the table cell (`<td>`) elements. The
following CSS helps the resulting table look like the background we
want:
@!8e398c1e9b315ea3b7cd3e746e7654fd9d76f32c

```{lang: "text/css"}
.background    { background: rgb(52, 166, 251);
                 table-layout: fixed;
                 border-spacing: 0;              }
.background td { padding: 0;                     }
.lava          { background: rgb(255, 100, 100); }
.wall          { background: white;              }
```
@!d2a656dd84207c113102e1feaaf46172fe2d567a

{{index "padding (CSS)"}}
@!5ad35c1d66605b61e5022ef7f76f55784cc19783

Some of these (`table-layout`, `border-spacing`, 
and `padding`) are simply used to suppress unwanted default behavior.
We don't want the layout of the ((table)) to depend upon the contents 
of its cells, and we don't want space between the ((table)) cells or 
padding inside them.
@!9619af05680e2d93cbc92ce5e10f92dc924ca4ee

{{index "background (CSS)", "rgb (CSS)", CSS}}
@!bc96634b76a083cafc46bbffaf72ba13721faec0

The `background` rule
sets the background color. CSS allows colors to be specified both as
words (`white`) and with a format such as `rgb(R, G, B)`, where the red,
green, and blue components of the color are separated into three
numbers from 0 to 255. So, in `rgb(52, 166, 251)`, the red component is
52, green is 166, and blue is 251. Since the blue component is the
largest, the resulting color will be bluish. You can see that in the
`.lava` rule, the first number (red) is the largest.
@!ae431ea041a9435766db467c8ca8294dcdb504f1

We draw each ((actor)) by creating a ((DOM)) element for it and
setting that element's position and size based on the actor's properties. The
values have to be multiplied by `scale` to go from game units to
pixels.
@!e0c61b0a796bd6279169d89bbba155fc0e23946c

```{includeCode: true}
DOMDisplay.prototype.drawActors = function() {
  var wrap = elt("div");
  this.level.actors.forEach(function(actor) {
    var rect = wrap.appendChild(elt("div",
                                    "actor " + actor.type));
    rect.style.width = actor.size.x * scale + "px";
    rect.style.height = actor.size.y * scale + "px";
    rect.style.left = actor.pos.x * scale + "px";
    rect.style.top = actor.pos.y * scale + "px";
  });
  return wrap;
};
```
@!9d13ccd53abe571dda8ec8ffb7eb8af8c2110402

{{index "position (CSS)", "class attribute"}}
@!4e9da327e120417187482b31e3e4dba58d9833a3

To give an element more than one
class, we separate the class names by spaces. In the
((CSS)) code shown next, the `actor` class gives the actors their
absolute position. Their type name is used as an extra class to give
them a color. We don't have to define the `lava` class again because we reuse
the class for the lava grid squares which we defined earlier.
@!5b8144eb0333b5940238163c9993b2498c2b9435

```{lang: "text/css"}
.actor  { position: absolute;            }
.coin   { background: rgb(241, 229, 89); }
.player { background: rgb(64, 64, 64);   }
```
@!0f314206881639f049b1f8155d41a2d6a3b62b07

{{index graphics, optimization, efficiency}}
@!3c5072e8b5d478b39ada65676e02d040d6ee444c

When it updates the
display, the `drawFrame` method first removes the old actor graphics,
if any, and then redraws them in their new positions. It may be
tempting to try to reuse the ((DOM)) elements for actors, but to make
that work, we would need a lot of additional information flow between
the display code and the simulation code. We'd need to associate
actors with DOM elements, and the ((drawing)) code must remove
elements when their actors vanish. Since there will typically be only 
a handful of actors in the game, redrawing all of them is not
expensive.
@!2c495c6827de80f7384ac87639340a02a147a904

```{includeCode: true}
DOMDisplay.prototype.drawFrame = function() {
  if (this.actorLayer)
    this.wrap.removeChild(this.actorLayer);
  this.actorLayer = this.wrap.appendChild(this.drawActors());
  this.wrap.className = "game " + (this.level.status || "");
  this.scrollPlayerIntoView();
};
```
@!d2e2edaf8fc45413d2b4cd42d40e698f05dc91e3

{{index level, "class attribute", "style sheet"}}
@!1ac8454c8b5e529311fbd2bec33453302895b373

By adding the level's
current status as a class name to the wrapper, we can style the player
actor slightly differently when the game is won or lost by adding a
((CSS)) rule that takes effect only  when the player has an ((ancestor
element)) with a given class.
@!e57e701f6f8b84faa5e5cbf91af5c0c1dcaf4d23

```{lang: "text/css"}
.lost .player {
  background: rgb(160, 64, 64);
}
.won .player {
  box-shadow: -4px -7px 8px white, 4px -7px 8px white;
}
```
@!a4dee943c6ee8d08080de550900bb18723cdb69c

{{index player, "box shadow (CSS)"}}
@!a1dc23c91ace6a3571011868bab88e3d0ed2724d

After touching ((lava)), the
player's color turns dark red, suggesting scorching. When the last
coin has been collected, we use two blurred white box shadows, one to the top
left and one to the top right, to create a white halo effect.
@!1eeb9b45e20955fe3a26f2124717d3a98677fbda

{{id viewport}}
@!95f46d4c8d2def324063e95fe330657ce2995422

{{index "position (CSS)", "max-width (CSS)", "overflow (CSS)", "max-height (CSS)", viewport}}
@!cf857f2c715c2bfa35ad9bc841e07641be8e2e64

We can't assume that
levels always fit in the viewport. That is why the
`scrollPlayerIntoView` call is needed—it ensures that if the level is
protruding outside the viewport, we scroll that viewport to make
sure the player is near its center. The following ((CSS)) gives the
game's wrapping ((DOM)) element a maximum size and ensures that
anything that sticks out of the element's box is not visible. We also give the outer element a relative
position so that the actors inside it are positioned relative to
the level's top-left corner.
@!30fbe15d849c76abc3df4f56c375bae379567da3

```{lang: "text/css"}
.game {
  overflow: hidden;
  max-width: 600px;
  max-height: 450px;
  position: relative;
}
```
@!0aaecfd427bdf3b470160503111aff3281f90fa4

{{index scrolling}}
@!cb58926814a8db23616af6b9cf54cec87f53b59d

In the `scrollPlayerIntoView` method, we find the
player's position and update the wrapping element's scroll position.
We change the scroll position by manipulating that element's `scrollLeft` 
and `scrollTop` properties when the player is too close to the edge.
@!d91731348a83781eb36d19e23d24800cc0b594b1

```{includeCode: true}
DOMDisplay.prototype.scrollPlayerIntoView = function() {
  var width = this.wrap.clientWidth;
  var height = this.wrap.clientHeight;
  var margin = width / 3;

// The viewport
  var left = this.wrap.scrollLeft, right = left + width;
  var top = this.wrap.scrollTop, bottom = top + height;

var player = this.level.player;
  var center = player.pos.plus(player.size.times(0.5))
                 .times(scale);

if (center.x < left + margin)
    this.wrap.scrollLeft = center.x - margin;
  else if (center.x > right - margin)
    this.wrap.scrollLeft = center.x + margin - width;
  if (center.y < top + margin)
    this.wrap.scrollTop = center.y - margin;
  else if (center.y > bottom - margin)
    this.wrap.scrollTop = center.y + margin - height;
};
```
@!efcc7c10ac7e8a284ce39f8ecff1d7ecf8ce1041

{{index center, coordinates, readability}}
@!e0b68abaefde23c70d61a5bbfc12404a3d979cb2

The way the player's
center is found shows how the methods on our `Vector` type allow
computations with objects to be written in a readable way. To
find the actor's center, we add its position (its top-left corner) and
half its size. That is the center in level coordinates, but we need it
in pixel coordinates, so we then multiply the resulting vector by our
display scale.
@!40e4061daac16e8b2ee1c220954cf1781e6bd820

{{index validation}}
@!1482b5fd299a9386736fd18ff3429efe3557a6fb

Next, a series of checks verify that the player
position isn't outside of the allowed range. Note that sometimes this
will set nonsense scroll coordinates, below zero or beyond the
element's scrollable area. This is okay—the DOM will constrain them to
sane values. Setting `scrollLeft` to -10 will cause it to become 0.
@!f19d38598816e7c9ab3fd9b9aa63955e323eb1c8

It would have been slightly simpler to always try to scroll the player
to the center of the ((viewport)). But this creates a rather jarring
effect. As you are jumping, the view will constantly shift up and
down. It is more pleasant to have a “neutral” area in the middle of
the screen where you can move around without causing any scrolling.
@!90de3d10aea24e2c842624976b9dde42259b9364

{{index "cleaning up"}}
@!837c54a8dda02a6d046e226f88a6881a2b519e66

Finally, we'll need a way to clear a displayed level,
to be used when the game moves to the next level or resets a level.
@!69ddbf4dcf4b6db6a357b7c175e83249ee200dc7

```{includeCode: true}
DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap);
};
```
@!199dfa3821935d66a2ca49645998d98e79cb09d5

{{index [game, screenshot]}}
@!8fbdb6e52832d0222e349c4b9d87f9fe07543bdd

We are now able to display our tiny level.
@!ad2ca15336cbdb5f6d0cb133747dccbada7f8686

```{lang: "text/html"}
<link rel="stylesheet" href="css/game.css">

<script>
  var simpleLevel = new Level(simpleLevelPlan);
  var display = new DOMDisplay(document.body, simpleLevel);
</script>
```
@!97c3b10315ce0fa5b6febaf0c68988b24ddcdf82

{{if book
@!e31f8269b7e8f799be5986231134210fd3b4492d

{{figure {url: "img/game_simpleLevel.png", alt: "Our level rendered",width: "7cm"}}}
@!d0640647c0d618da7cd3c85c34b7ea931b60ce11

if}}
@!aae468bf0a65cda01617603feb8c413c88e0541e

{{index "link (HTML tag)", "style sheet", CSS}}
@!0bf484abbdc930611d12b0c596517f21742c93fa

The `<link>` tag, when used
with `rel="stylesheet"`, is a way to load a CSS file into a page. The
file `game.css` contains the styles necessary for our game.
@!937ab9202d78462531cb9134a60d1ac31b768f7c

## Motion and collision
@!03c4b92b4000d0c0a593833f7f0c3a3ff3e10d4b

{{index physics, animation}}
@!de4d99f61e6887ae0d7342f1130e34e0ec5770d6

Now we're at the point where we can start
adding motion—the most interesting aspect of the game. The basic
approach, taken by most games like this, is to split ((time)) into
small steps and, for each step, move the actors by a distance
corresponding to their speed (distance moved per second) multiplied by
the size of the time step (in seconds).
@!c1100dd18edfbe6badc366cf340dfef14e3c46c9

{{index obstacle, "collision detection"}}
@!beabe3624b15c3c20782ab93eb8002e3fb49355d

That is easy. The difficult
part is dealing with the interactions between the elements. When the
player hits a wall or floor, they should not simply move through it.
The game must notice when a given motion causes an object to hit
another object and respond accordingly. For walls, the motion must be
stopped. For coins, the coin must be collected, and so on.
@!d352e4db1a0bd18a4c8916bf82864515eec0c143

Solving this for the general case is a big task. You can find
libraries, usually called _((physics engine))s_, that simulate
interaction between physical objects in two or three ((dimensions)).
We'll take a more modest approach in this chapter, handling only
collisions between rectangular objects and handling them in a rather simplistic
way.
@!eacb144c4ac724f9477361402ad0b613c2142fda

{{index bouncing, "collision detection", animation}}
@!3460c4a23490bda42c58c120b89600e02e46e709

Before moving
the ((player)) or a block of ((lava)), we test whether the motion
would take it inside of a nonempty part of the ((background)). If it
does, we simply cancel the motion altogether. The response to such a
collision depends on the type of actor—the player will stop, whereas a
lava block will bounce back.
@!7727adf800f41532d0791f01cdb2e65aa2c16fb9

{{index discretization}}
@!b16089a87e2f545a5a32cfddf6943026562e034c

This approach requires our ((time)) steps to be
rather small since it will cause motion to stop before the objects
actually touch. If the time steps (and thus the motion steps) are too
big, the player would end up hovering a noticeable distance above the
ground. Another approach, arguably better but more complicated, would
be to find the exact collision spot and move there. We will take the
simple approach and hide its problems by ensuring the animation
proceeds in small steps.
@!48835fd0b94b8f32030ebc571cf3f5a8a5cb0e53

{{index obstacle, "obstacleAt method", "collision detection"}}
@!2baf723f18c6d7327514c852c7677b67e72a463a

This
method tells us whether a ((rectangle)) (specified by a position and a
size) overlaps with any nonempty space on the background grid:
@!0944dfee83adfa1a6c2e31f0b8676cdbd6ac40a6

```{includeCode: true}
Level.prototype.obstacleAt = function(pos, size) {
  var xStart = Math.floor(pos.x);
  var xEnd = Math.ceil(pos.x + size.x);
  var yStart = Math.floor(pos.y);
  var yEnd = Math.ceil(pos.y + size.y);

if (xStart < 0 || xEnd > this.width || yStart < 0)
    return "wall";
  if (yEnd > this.height)
    return "lava";
  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      var fieldType = this.grid[y][x];
      if (fieldType) return fieldType;
    }
  }
};
```
@!b02d2ef6206398f942850fde700072fc2fa2df23

{{index "Math.floor function", "Math.ceil function"}}
@!7caabd6e2ebcc428da318d2e9c0904791ef6c898

This method computes the set
of grid squares that the body ((overlap))s with by using `Math.floor`
and `Math.ceil` on the body's ((coordinates)). Remember that ((grid)) squares
are 1×1 units in size. By ((rounding)) the sides of a box up and
down, we get the range of ((background)) squares that the box touches.
@!d2087cf5fca1452b04f081af4d8733ed4c7c5f89

{{figure {url: "img/game-grid.svg", alt: "Finding collisions on a grid",width: "3cm"}}}
@!37992165b445d3b54fe884a6954c5bed357d5289

If the body sticks out of the level, we always return `"wall"` for the
sides and top and `"lava"` for the bottom. This ensures that the
player dies when falling out of the world. When the body is fully
inside the grid, we loop over the block of ((grid)) squares found by
((rounding)) the ((coordinates)) and return the content of the first
nonempty square we find.
@!a125bff305b3556deb43910e3327da13a0677a02

{{index coin, lava, "collision detection"}}
@!1e7f97a9917bcdc74982ad85992a5fc833ea94b2

Collisions between the
((player)) and other dynamic ((actor))s (coins, moving lava) are
handled _after_ the player moved. When the motion has taken the player
into another actor, the appropriate effect—collecting a coin or
dying—is activated.
@!ebc02d2c3f2c707c8a593928bdf4af68ccc5e1a4

{{index "actorAt method"}}
@!c208d85d3179f1f04b504f709cb6541ea981414a

This method scans the array of actors,
looking for an actor that overlaps the one given as an argument:
@!659b430f235580e47251e33430bb925c707a73a1

```{includeCode: true}
Level.prototype.actorAt = function(actor) {
  for (var i = 0; i < this.actors.length; i++) {
    var other = this.actors[i];
    if (other != actor &&
        actor.pos.x + actor.size.x > other.pos.x &&
        actor.pos.x < other.pos.x + other.size.x &&
        actor.pos.y + actor.size.y > other.pos.y &&
        actor.pos.y < other.pos.y + other.size.y)
      return other;
  }
};
```
@!0f3995050d3b39f9a62a0a6f2f70844b0ef86403

{{id actors}}
@!b1eb30d995b52c47f3d32176272958f2f496e28f

## Actors and actions
@!253c447511fce3f06dd1281c1ac042264618b785

{{index "animate method", animation, keyboard}}
@!44a24971a9d7d4b46747fb55db5413078b15b287

The `animate` method
on the `Level` type gives all actors in the level a chance to move.
Its `step` argument is the ((time)) step in seconds. The `keys` object
contains information about the arrow keys the player has pressed.
@!41ca973eb0c25fccdbda2fb5bcb69ee170fc2d2c

```{includeCode: true}
var maxStep = 0.05;

Level.prototype.animate = function(step, keys) {
  if (this.status != null)
    this.finishDelay -= step;

while (step > 0) {
    var thisStep = Math.min(step, maxStep);
    this.actors.forEach(function(actor) {
      actor.act(thisStep, this, keys);
    }, this);
    step -= thisStep;
  }
};
```
@!835e608f43475bf4a305780bec8d0e15618ae2f5

{{index level, animation}}
@!3eebeaf4e284b20b64a44d408480511e3c8d3996

When the level's `status` property has a
non-null value (which is the case when the player has won or lost), we
must count down the `finishDelay` property, which tracks the time
between the point where winning or losing happens and the point where
we want to stop showing the level.
@!7761e82539c1ee46c9ed9301e15a4a17fbacda4b

{{index "while loop", discretization}}
@!0c9e125cbecb8c7ebf939269e4ee4c297ea46df7

The `while` loop cuts the time
step we are animating into suitably small pieces. It ensures that no
step larger than `maxStep` is taken. For example, a `step` of 0.12
second would be cut into two steps of 0.05 seconds and one step of 0.02.
@!75d18c0fc8953f6f14cb7341fbac7948cd6bda0b

{{index actor, "Lava type", lava}}
@!6a5ab5a90646bc26d3c2f6e19725253563588ec0

Actor objects have an `act`
method, which takes as arguments the time step, the level object, and
the `keys` object. Here is one, for the `Lava` actor type,
which ignores the `keys` object:
@!2daa21cecf832df216d789613bad4330fc4c537a

```{includeCode: true}
Lava.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};
```
@!39f395d4d6d3f7c8e74a7f40e638d394d60595c4

{{index bouncing, multiplication, "Vector type", "collision detection"}}
@!8456d11e375c734a8a4558775926c51ac43cdea5

It computes a new position by adding the product of the
((time)) step and its current speed to its old position. If no
obstacle blocks that new position, it moves there. If there is an
obstacle, the behavior depends on the type of the ((lava))
block—dripping lava has a `repeatPos` property, to which it jumps back
when it hits something. Bouncing lava simply inverts its speed
(multiplies it by -1) in order to start moving in the other direction.
@!f10cccff6d22489e3a34c1b1ac95566d3eedc663

{{index "Coin type", coin, wave}}
@!4b2eef34b094f087f4999a7bf199c76821e465c1

Coins use their `act` method to
wobble. They ignore collisions since they are simply wobbling around
inside of their own square, and collisions with the ((player)) will be
handled by the _player_'s `act` method.
@!4e90926fe3b3a2d432bd7f50a52d1cad774d2308

```{includeCode: true}
var wobbleSpeed = 8, wobbleDist = 0.07;

Coin.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};
```
@!ead3e7fe953e02a3b4800eae2ce21ad136f337e6

{{index "Math.sin function", sine, phase}}
@!00017387b819385d9af66d144ff5cf06c1fa3b3f

The `wobble` property is
updated to track time and then used as an argument to `Math.sin` to
create a ((wave)), which is used to compute a new position.
@!156d4ed8efe033535e5e86e36eb2406ee28995f4

{{index "collision detection", "Player type"}}
@!557ec0d3199375339a8fd21546c38c057b1abf2a

That leaves the ((player))
itself. Player motion is handled separately per ((axis)) because
hitting the floor should not prevent horizontal motion, and hitting a
wall should not stop falling or jumping motion. This method implements
the horizontal part:
@!e924a8cd050ef715338750036bc5bdf8ca5b8525

```{includeCode: true}
var playerXSpeed = 7;

Player.prototype.moveX = function(step, level, keys) {
  this.speed.x = 0;
  if (keys.left) this.speed.x -= playerXSpeed;
  if (keys.right) this.speed.x += playerXSpeed;

var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle)
    level.playerTouched(obstacle);
  else
    this.pos = newPos;
};
```
@!ed728c93c44c81af8e0ad15afe71b7413d37547a

{{index animation, keyboard}}
@!b99a219774cc9237575f176f8f874c66e4ca66b2

The horizontal motion is computed based on the state
of the left and right arrow keys. When a motion causes the player to
hit something, the level's `playerTouched` method, which handles
things like dying in ((lava)) and collecting ((coin))s, is called.
Otherwise, the object updates its position.
@!fb0204f47c637987bd11ac6dbb30fe494176632f

Vertical motion works in a similar way but has to simulate
((jumping)) and ((gravity)).
@!e4b20c5430e43e5785931c514860b6a4eeca77f9

```{includeCode: true}
var gravity = 30;
var jumpSpeed = 17;

Player.prototype.moveY = function(step, level, keys) {
  this.speed.y += step * gravity;
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle) {
    level.playerTouched(obstacle);
    if (keys.up && this.speed.y > 0)
      this.speed.y = -jumpSpeed;
    else
      this.speed.y = 0;
  } else {
    this.pos = newPos;
  }
};
```
@!5954a6cee14de9a32b877ef34f5cc04908c9c7f4

{{index acceleration, physics}}
@!86e1a2bb7a8d65d42a49c456b89c289716f1f43b

At the start of the method, the player
is accelerated vertically to account for ((gravity)). The gravity,
((jumping)) speed, and pretty much all other ((constant))s in this
game have been set by ((trial and error)). I tested various values
until I found a combination I liked.
@!9b70395e43a01aadbfae48b1e4c77a87a00a2336

{{index "collision detection", keyboard, jumping}}
@!106aa863583cf3199c51bdbfc571d864576e6cb2

Next, we check for
obstacles again. If we hit an obstacle, there are two possible
outcomes. When the up arrow is pressed _and_ we are moving down
(meaning the thing we hit is below us), the speed is set to a
relatively large, negative value. This causes the player to jump. If
that is not the case, we simply bumped into something, and the speed
is reset to zero.
@!abb68d31f8fd44a2de2a1834bc4b1d395a9799ef

The actual `act` method looks like this:
@!9f07b88b63627080156b54250db6d7da551c900c

```{includeCode: true}
Player.prototype.act = function(step, level, keys) {
  this.moveX(step, level, keys);
  this.moveY(step, level, keys);

var otherActor = level.actorAt(this);
  if (otherActor)
    level.playerTouched(otherActor.type, otherActor);

// Losing animation
  if (level.status == "lost") {
    this.pos.y += step;
    this.size.y -= step;
  }
};
```
@!90599e1f65943b0ccbf10523d8f9b39600e47966

{{index player}}
@!5ae2d49d3e8af60f29a809484b5ca49f6f9e5654

After moving, the method checks for other actors that the
player is colliding with and again calls `playerTouched` when it
finds one. This time, it passes the actor object as the second argument
because if the other actor is a ((coin)), `playerTouched` needs to
know _which_ coin is being collected.
@!9a72591f393170a9a2aa83f231255168af34f450

{{index animation}}
@!eed8040481fba78d1b766d38234f4480227b3212

Finally, when the player dies (touches lava), we set up
a little animation that causes them to “shrink” or “sink” down by
reducing the height of the player object.
@!44221ee8423c568690456c23558ca8fe9ec2558d

{{index "collision detection"}}
@!7e55fb711e0357d716ebc2a2c8500a878248baa5

And here is the method that handles
collisions between the player and other objects:
@!70178838897806c3adc9c0550101029b249a7936

```{includeCode: true}
Level.prototype.playerTouched = function(type, actor) {
  if (type == "lava" && this.status == null) {
    this.status = "lost";
    this.finishDelay = 1;
  } else if (type == "coin") {
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
    if (!this.actors.some(function(actor) {
      return actor.type == "coin";
    })) {
      this.status = "won";
      this.finishDelay = 1;
    }
  }
};
```
@!1598ff276e94521ad0dd3bc6ecfcf67adc357571

When ((lava)) is touched, the game's status is set to `"lost"`. When a
coin is touched, that ((coin)) is removed from the array of actors,
and if it was the last one, the game's status is set to `"won"`.
@!9d625794c4a7b09c364d499c5c15ec852e172661

This gives us a level that can actually be animated. All that is
missing now is the code that _drives_ the animation.
@!8974c277675b96e7a7f0251b6c167331c2f6d8c5

## Tracking keys
@!6ada324903c547d358a21c56053b664a0fb11b20

{{index keyboard}}
@!8debf7699be8eaa04afccb52dc1e1e0323e2c3b6

For a ((game)) like this, we do not want keys to take
effect once per keypress. Rather, we want their effect (moving the player
figure) to continue happening as long as they are pressed.
@!49b48d6e3e1dfc7fe7becec35b3289ef58eff6db

{{index "preventDefault method"}}
@!7c84cbf447a9edaf833beef4554b6b9b018593ce

We need to set up a key handler that stores
the current state of the left, right, and up arrow keys. We will also want
to call `preventDefault` for those keys so that they don't end up
((scrolling)) the page.
@!a55387e58e035b19f076a9a0fab2062fbe28ecd2

{{index "trackKeys function", "key code", "event handling", "addEventListener method"}}
@!965f0e9a8013013c20819b238692f50cb3a77606

The following function, when given
an object with key codes as property names and key names as values,
will return an object that tracks the current position of those keys.
It registers event handlers for `"keydown"` and `"keyup"` events and,
when the key code in the event is present in the set of codes that it
is tracking, updates the object.
@!fe4f234c9ae23f01ec0690e1e33f0ac8bd0ec372

```{includeCode: true}
var arrowCodes = {37: "left", 38: "up", 39: "right"};

function trackKeys(codes) {
  var pressed = Object.create(null);
  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      var down = event.type == "keydown";
      pressed[codes[event.keyCode]] = down;
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
}
```
@!1d0b574d4323cad8e65fca19e7d7823efb628dd7

{{index "keydown event", "keyup event"}}
@!ad528136a823d8175ab53504770eebafe0d37466

Note how the same handler function
is used for both event types. It looks at the event object's `type`
property to determine whether the key state should be updated to true
(`"keydown"`) or false (`"keyup"`).
@!d2f023767dd47aa6b427abd203934cea182a9903

{{id runAnimation}}
@!447484ed275ce3146c688e08bfea5757a4c5dd10

## Running the game
@!d0120f9c1fb00ba112807b7c5938e96e83cb4037

{{index "requestAnimationFrame function", animation}}
@!bb2946b1873573d76df869c7a7e87975f263912d

The
`requestAnimationFrame` function, which we saw in
[Chapter 13](13_dom.html#animationFrame), provides a good way to
animate a game. But its interface is quite primitive—using it requires
us to track the time at which our function was called the last time
around and call `requestAnimationFrame` again after every frame.
@!6fb296648ca53491ca217683decf28a53fe48830

{{index "runAnimation function", "callback function", [function, "as value"], [function, "higher-order"]}}
@!a3ed966cac4c5f1cedc1fbf4858f98c1eb04df58

Let's define a helper function that
wraps those boring parts in a convenient interface and allows us to
simply call `runAnimation`, giving it a function that expects a time
difference as an argument and draws a single frame. When the frame
function returns the value `false`, the animation stops.
@!a130f062034e35f0ac7994c0f456a000716311a5

```{includeCode: true}
function runAnimation(frameFunc) {
  var lastTime = null;
  function frame(time) {
    var stop = false;
    if (lastTime != null) {
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
```
@!3942fd7b04c564a934934444f2c83856e362612f

{{index time, discretization}}
@!e1739943acfaab78aea97b46a7511b14281f007e

I have set a maximum frame step of 100
milliseconds (one-tenth of a second). When the browser tab or window
with our page is hidden, `requestAnimationFrame` calls will be
suspended until the tab or window is shown again. In this case, the difference
between `lastTime` and `time` will be the entire time in which the
page was hidden. Advancing the game by that much in a single step will
look silly and might be a lot of work (remember the time-splitting in
the [`animate` method](15_game.html#actors)).
@!05334197b3dab817179ce788c6667b6c09e2beae

The function also converts the time steps to seconds, which are an
easier quantity to think about than milliseconds.
@!62512f9784c3fe5ffa7645ea70646dfa53a1c5e3

{{index "callback function", "runLevel function"}}
@!2b8214373eaff5adb51dfea0e456ede751e2a4c9

The `runLevel` function
takes a `Level` object, a constructor for a ((display)), and,
optionally, a function. It displays the level (in `document.body`) and
lets the user play through it. When the level is finished (lost or
won), `runLevel` clears the display, stops the ((animation)), and, if an
`andThen` function was given, calls that function with the level's status.
@!f329c3d6852f7d9bbaffd9cddffba0f76ec56bfc

```{includeCode: true}
var arrows = trackKeys(arrowCodes);

function runLevel(level, Display, andThen) {
  var display = new Display(document.body, level);
  runAnimation(function(step) {
    level.animate(step, arrows);
    display.drawFrame(step);
    if (level.isFinished()) {
      display.clear();
      if (andThen)
        andThen(level.status);
      return false;
    }
  });
}
```
@!798ee2d2c6bae147ea90ec99a1e464eabee3f08a

{{index "runGame function"}}
@!b1a63a485c9064a94ba59d0b77663f1727a76f3d

A game is a sequence of ((level))s. Whenever the
((player)) dies, the current level is restarted. When a level is
completed, we move on to the next level. This can be expressed by the
following function, which takes an array of level plans (arrays of
strings) and a ((display)) constructor:
@!df1d79237fe4968d5fdba44a9623187218eb07d3

```{includeCode: true}
function runGame(plans, Display) {
  function startLevel(n) {
    runLevel(new Level(plans[n]), Display, function(status) {
      if (status == "lost")
        startLevel(n);
      else if (n < plans.length - 1)
        startLevel(n + 1);
      else
        console.log("You win!");
    });
  }
  startLevel(0);
}
```
@!58087839d83a03b071217a442ce5a80aac3861c2

{{index [function, "higher-order"], [function, "as value"]}}
@!7efa0a1aa65d37652b3749a81c90ca82c4d40536

These functions show
a peculiar style of programming. Both `runAnimation` and `runLevel`
are higher-order functions but are not in the style we saw in
[Chapter 5](05_higher_order.html#higher_order). The function
argument is used to arrange things to happen at some time in the
future, and neither of the functions returns anything useful. Their
task is, in a way, to schedule actions. Wrapping these actions in
functions gives us a way to store them as a value so that they can be
called at the right moment.
@!c03611d646c49a60c23f69b318a8c38c401e1bf2

{{index "asynchronous programming", "event handling"}}
@!cb8300371d85b068b857b247df1dac10bfb08b5a

This programming
style is usually called _asynchronous_ programming. Event handling is
also an instance of this style, and we will see much more of it when working
with tasks that can take an arbitrary amount of ((time)), such as
((network)) requests in [Chapter 17](17_http.html#http) and input
and output in general in [Chapter 20](20_node.html#node).
@!892d46d1cef7258be1f0b3abcc7fc9729ff94ac6

{{index game, "GAME_LEVELS data set"}}
@!20e0cf5d2779029b17d246f0f5a9c0d7f9763c0f

There is a set of
((level)) plans available in the `GAME_LEVELS` variable [(downloadable from
http://eloquentjavascript.net/code#15[_eloquentjavascript.net/code#15_])]{if book}.
This page feeds them to `runGame`, starting an actual game:
@!d6e02e4f1f41a0254fcf5b5d2efce94889de0c1f

// start_code
@!4b131f76625dae4df820ab028480877a3e4ccac7

[sandbox="null"]
[focus="yes"]
```{lang: "text/html"}
<link rel="stylesheet" href="css/game.css">
@!6fcac6434b933770092f11e9dc9bab8e97ac7871

<body>
  <script>
    runGame(GAME_LEVELS, DOMDisplay);
  </script>
</body>
```
@!7ecef959101a3db3a3e7331194153793234654c9

{{if interactive
@!fb8e5bfddca8bab28e1f4b85c738886c0472cde0

See if you can beat those. I had quite a lot of fun building them.
@!c45b500e25ffc19923fa0441c937b059a97caca2

if}}
@!c0553f632c492ca12050381a80a34b2c1329d8b5

## Exercises
@!557f0a72cd8998eeb991892d80352729aea4920c

### Game over
@!af3f93ac4bb87aa8bd8baa029d81eaa5753985a8

{{index "lives (exercise)", game}}
@!cb7a7dcd716284d935fc678a7e95c604dd5276da

It's traditional for ((platform game))s
to have the player start with a limited number of _lives_ and
subtract one life each time they die. When the player is out of lives, the game
restarts from the beginning.
@!8ff90517b445849715559154990a4361406b0e59

{{index "runGame function"}}
@!3b40b91a8b0104583ea673a6ac2e67b22666b86e

Adjust `runGame` to implement lives. Have the
player start with three.
@!b0d6442a2b63a647c05c56690bb20d56f80882ff

{{if interactive
@!13eacb0040179bd6f0f462463d6652c23b6f1051

// test: no
@!ddf80182bbee76d4a56af6b22fc5fd02e91dd51b

[focus="yes"]
```{lang: "text/html"}
<link rel="stylesheet" href="css/game.css">
@!b8b3a4e4e0a8716aef8f09691bb8d2ade1cad54c

<body>
<script>
  // The old runGame function. Modify it...
  function runGame(plans, Display) {
    function startLevel(n) {
      runLevel(new Level(plans[n]), Display, function(status) {
        if (status == "lost")
          startLevel(n);
        else if (n < plans.length - 1)
          startLevel(n + 1);
        else
          console.log("You win!");
      });
    }
    startLevel(0);
  }
  runGame(GAME_LEVELS, DOMDisplay);
</script>
</body>
```
@!efbbb44cd1e563692a41e4d2b203c89109a845db

if}}
@!e41305fe9d67a2b028cb2c7f6aa7647e70a2221b

{{hint
@!9ebfbc42c7a8166f167b08d705e334915a96c197

{{index "lives (exercise)", "runGame function"}}
@!fda6ffaedcbd021c27b34a437fa8abd4b56d4d96

The most obvious solution
would be to make `lives` a variable that lives in `runGame` and is
thus visible to the `startLevel` ((closure)).
@!adeab967a5a1cddcbaf97a2aa36b5b573109264d

Another approach, which fits nicely with the spirit of the rest of the
function, would be to add a second ((parameter)) to `startLevel` that
gives the number of lives. When the whole ((state)) of a system is stored
in the arguments to a ((function)), calling that function provides an
elegant way to transition to a new state.
@!84c993db3fbe8f081978251919cf1bfbd08fb77f

In any case, when a ((level)) is lost, there should now be two
possible state transitions. If that was the last life, we go back to
level zero with the starting amount of lives. If not, we repeat the
current level with one less life remaining.
@!91b6c49c851243f0cdeeaa9743db0c60ba710bba

hint}}
@!82c1406418a02b674945bbd6b822c29d2efabc24

### Pausing the game
@!039fa834b1e55ece493e606987c009c3e69d95ac

{{index "pausing (exercise)", "escape key", keyboard}}
@!d86456903740ed307bb17f342e5f2b5c658e5a2c

Make it possible
to pause (suspend) and unpause the game by pressing the Esc key.
@!d6553587a17d660fed97d5d50de0e868cd7827c8

{{index "runLevel function", "event handling"}}
@!507cec89daed61520bb2f9e8f516cc9e8a2b458d

This can be done by
changing the `runLevel` function to use another keyboard event
handler and interrupting or resuming the animation whenever the
Esc key is hit.
@!96aa8843ea28d694d0721b466970f6dee488f825

{{index "runAnimation function"}}
@!82c1f72ad7b0158f1850e3a91b6f281934fe4406

The `runAnimation` interface may not look
like it is suitable for this at first glance, but it is, if you
rearrange the way `runLevel` calls it.
@!90cb329aec6109d1c7ec7c04d0bc8942cc77d97c

{{index [variable, global], "trackKeys function"}}
@!c2c12c0c26311c8da3922ff1de29e90c1ade1754

When you have that
working, there is something else you could try. The way we have been
registering keyboard event handlers is somewhat problematic. The
`arrows` object is currently a global variable, and its event handlers
are kept around even when no game is running. You could say they _((leak))_ out of
our system. Extend `trackKeys` to provide a way to
unregister its handlers, and then change `runLevel` to register its
handlers when it starts and unregister them again when it is
finished.
@!1f62844901b2505c6548f2e047ca1dda0098dd0c

{{if interactive
@!b3e3755eab69b4d2e34652ce6c1b47e7145f7754

// test: no
@!713a1d80db78c1f1f4f8c0f187cd0f5d8b495d0f

[focus="yes"]
```{lang: "text/html"}
<link rel="stylesheet" href="css/game.css">
@!b779c194c8a8c620c217443ffc765119cc7af325

<body>
<script>
  // The old runLevel function. Modify this...
  function runLevel(level, Display, andThen) {
    var display = new Display(document.body, level);
    runAnimation(function(step) {
      level.animate(step, arrows);
      display.drawFrame(step);
      if (level.isFinished()) {
        display.clear();
        if (andThen)
          andThen(level.status);
        return false;
      }
    });
  }
  runGame(GAME_LEVELS, DOMDisplay);
</script>
</body>
```
@!1580ee0770ac8bb310ba93d44f05c52e046b3df9

if}}
@!fae7ca472874c4e7dc3ea7205aefafd7007698e2

{{hint
@!02de07b60c1c7ec5a39b961bf0d4ccd9197d09ed

{{index "pausing (exercise)"}}
@!f06577bbe169a28447e7eb425a06372878ee29a3

An ((animation)) can be interrupted by
returning `false` from the function given to `runAnimation`. It can be
continued by calling `runAnimation` again.
@!0df091ab6e84b6ca71fd6f04e14a779d14871129

{{index closure}}
@!eaf97b7ea1dde28771261f28a8ddc85e222a0aae

To communicate that the animation should be
interrupted to the function passed to `runAnimation` so that it can
return `false`, you can use a variable that both the event handler and
that function have access to.
@!637fd043be19926f2571fc9f300252fbe87e4d08

{{index "event handling", "removeEventListener method", [function, "as value"]}}
@!be40ce095c70c4615b9ad40d74a5b5c5893b28c6

When finding a way to unregister the handlers registered by
`trackKeys`, remember that the _exact_ same function value that was
passed to `addEventListener` must be passed to `removeEventListener`
to successfully remove a handler. Thus, the `handler` function value
created in `trackKeys` must be available to the code that unregisters
the handlers.
@!06d7ed902e939359add4f01df2643bc38b3285b8

You can add a property to the object returned by `trackKeys`,
containing either that function value or a method that handles the
unregistering directly.
@!1bf68827958049b8681effc6401c52b056aa3b5b

hint}}
@!df2f25dbb3b670e3d201c606fb2feadabb3659f5