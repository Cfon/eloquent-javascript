{{meta {chap_num: 13, prev_link: 12_browser, next_link: 14_event, load_files: ["code/mountains.js", "code/chapter/13_dom.js"]}}}
@!10caa9f749681ca94cc2c73f0dcc1f90cbca891c

# The Document Object Model
@!43929a709e5a3af210eaa3a391813ceafe8924cd

{{index drawing, parsing}}
@!272c83e70010d97e59c5a0f7d059c012214a6cbf

When you open a web page in your browser, the browser
retrieves the page's ((HTML)) text and parses it, much like the way
our parser from [Chapter 11](11_language.html#parsing) parsed
programs. The browser builds up a model of the document's
((structure)) and then uses this model to draw the page on the screen.
@!0d3ea9d00519bb104e0a0d2ea6f48d830edeed41

{{index "live data structure"}}
@!5453dfbe8907bc507b2295b4edeea48c769bb655

This representation of the ((document))
is one of the toys that a JavaScript program has
available in its ((sandbox)). You can read from the model and also change it. It acts as a
_live_ data structure: when it is modified, the page on the screen is
updated to reflect the changes.
@!be0b59caaabff6684e5d4481469a1f3a4ae7bc89

## Document structure
@!4255187d3fdfa58e9cd737127aea32972115368d

You can imagine an ((HTML)) document as a nested set of ((box))es.
Tags such as `<body>` and `</body>` enclose other ((tag))s, which in
turn contain other tags or ((text)). Here's the example document from
the [previous chapter](12_browser.html#browser):
@!3a9b60ecdfb4d2c95203d197c0cc8fa04ccdf533

```{lang: "text/html", sandbox: "homepage"}
<!doctype html>
<html>
  <head>
    <title>My home page</title>
  </head>
  <body>
    <h1>My home page</h1>
    <p>Hello, I am Marijn and this is my home page.</p>
    <p>I also wrote a book! Read it
      <a href="http://eloquentjavascript.net">here</a>.</p>
  </body>
</html>
```
@!5c2d684d3b83256ff24f9b79ea65587a99e9057d

This page has the following structure:
@!40d314514eba4f8f17ac0152e4d8940142c07b00

{{figure {url: "img/html-boxes.svg", alt: "HTML document as nested boxes",width: "7cm"}}}
@!59cb2c59794e49f466439fa3ef3a6a57ef9c85bb

{{indexsee "Document Object Model", DOM}}
@!84ab884745af239d0daf52b331c797932035fe62

The data structure the browser uses to represent the document follows
this shape. For each box, there is an ((object)), which we can
interact with to find out things such as what HTML tag it represents and
which boxes and text it contains. This representation is called the
_Document Object Model_, or ((DOM)) for short.
@!40de3c4c0b11daa3d50253ee2bca240a2436e6c0

{{index "documentElement property", "head property", "body property", "html (HTML tag)", "body (HTML tag)", "head (HTML tag)"}}
@!b790ed5e5525423d0eda2961aba0a6b5bd64b36e

The global variable `document` gives us access to these
objects. Its `documentElement` property refers to the object
representing the `<html>` tag. It also provides the properties `head` and
`body`, which hold the objects for those elements.
@!7d135d97da67d05a3d50f0a3511cf45b58509eaf

## Trees
@!18597eed778c7bd8af4a8aaaa6f8efc46d0f6def

{{index [nesting, "of objects"]}}
@!9d39327e5825561cd697b95e511def9ddfed1264

Think back to the ((syntax tree))s from
[Chapter 11](11_language.html#parsing) for a moment. Their
structures are strikingly similar to the structure of a browser's
document. Each _((node))_ may refer to other nodes, _children_, which
in turn may have their own children. This shape is typical of nested
structures where elements can contain sub-elements that are similar to
themselves.
@!995edf47a1ff07f3178397f104ca7da13f5a9056

{{index "documentElement property"}}
@!1b5e551a9685a038a1e8d5c795704ef31b9470c9

We call a data structure a _((tree))_
when it has a branching structure, has no ((cycle))s (a node may not
contain itself, directly or indirectly), and has a single,
well-defined “((root))”. In the case of the ((DOM)),
`document.documentElement` serves as the root.
@!bcc18aec64a83b98daf296d2e1538da01a0086db

{{index sorting, "data structure", "syntax tree"}}
@!b83dd7f260fad0c7e7dcba666c82d015420f827d

Trees come up a lot
in computer science. In addition to representing recursive structures such as
HTML documents or programs, they are often used to maintain
sorted ((set))s of data because elements can usually be found or
inserted more efficiently in a sorted tree than in a sorted flat
array.
@!aa38910c2eea92c149d02f45aa35bf0c536052ae

{{index "leaf node", "Egg language"}}
@!59e29dc79f3fd46d5f432049adf7121eecff63bf

A typical tree has different kinds of
((node))s. The syntax tree for link:11_language.html#language[the Egg
language] had variables, values, and application nodes. Application
nodes always have children, whereas variables and values are _leaves_, or
nodes without children.
@!917220f82229b6293bc277a09a2d0ee6e38968b9

{{index "body property"}}
@!cac03b217a466aa761ea0f7655a157f73b59b768

The same goes for the DOM. Nodes for regular
_((element))s_, which represent ((HTML)) tags, determine the structure
of the document. These can have ((child node))s. An example of such a
node is `document.body`. Some of these children can be ((leaf node))s,
such as pieces of ((text)) or ((comment))s (comments are written between
`<!--` and `-->` in HTML).
@!e7d6d6cb568b05fe7efe3fc4d08b6fde0308c96f

{{index "text node", "ELEMENT_NODE code", "COMMENT_NODE code", "TEXT_NODE code", "nodeType property"}}
@!dc617c2e3c9a2026338e0a9d16290ff90d15e260

Each DOM node object
has a `nodeType` property, which contains a numeric code that
identifies the type of node. Regular elements have the value 1, which
is also defined as the constant property `document.ELEMENT_NODE`. Text
nodes, representing a section of text in the document, have the value
3 (`document.TEXT_NODE`). Comments have the value 8
(`document.COMMENT_NODE`).
@!12221c5b7c3646eadd1f6a0707dff455f0752d99

So another way to visualize our document ((tree)) is as follows:
@!ac6e1c26b1c299406e9e51e84da32ca14c649284

{{figure {url: "img/html-tree.svg", alt: "HTML document as a tree",width: "8cm"}}}
@!6cf2ca07982b3d4716f2b1832936c760e0be6601

The leaves are text nodes, and the arrows indicate parent-child
relationships between nodes.
@!7dc3a05832fbbbe1c6b0057b03417f185a6db9ac

{{id standard}}
@!40365cfa8fee7f8de8c7a5066ac454b0096c02b2

## The standard
@!92416d4e6aba533a34dbd40624b89dd863633bec

{{index "programming language", [interface, design]}}
@!5b391ff79295206daeb13e0ad163acd1f49487be

Using cryptic numeric
codes to represent node types is not a very JavaScript-like thing to
do. Later in this chapter, we'll see that other parts of the
((DOM)) interface also feel cumbersome and alien. The reason for this
is that the DOM wasn't designed for just JavaScript. Rather, it tries
to define a language-neutral ((interface)) that can be used in other
systems as well—not just HTML but also ((XML)), which is a generic
((data format)) with an HTML-like syntax.
@!e27e7c0940189a7075e4041c4812e0f15d112206

{{index consistency, integration}}
@!1354d90ebcf6b8ba8f5b952e4f23019b2c5028d1

This is unfortunate. Standards are
often useful. But in this case, the advantage (cross-language
consistency) isn't all that compelling. Having an interface that is
properly integrated with the language you are using will save you more
time than having a familiar interface across languages.
@!5a5acb665bdd836dd812faebbda63ce2cf7601b8

{{index "array-like object", "NodeList type"}}
@!65f75fbb89fe416e7d29d7f9b6ba40f2ef32e820

As an example of such poor
integration, consider the `childNodes` property that element nodes in
the DOM have. This property holds an array-like object, with a
`length` property and properties labeled by numbers to access the
child nodes. But it is an instance of the `NodeList` type, not a real
array, so it does not have methods such as `slice` and `forEach`.
@!1b7ee59f9a775fa1252f0e3315aa678d8028acaa

{{index [interface, design], [DOM, construction], "side effect"}}
@!d5d2fadb100b1a6ee83966b12ff6b7395182c2aa

Then
there are issues that are simply poor design. For example, there is no
way to create a new node and immediately add children or attributes to
it. Instead, you have to first create it, then add the children one by
one, and finally set the attributes one by one, using side effects. Code that
interacts heavily with the DOM tends to get long, repetitive, and
ugly.
@!881034b44e13c0019fd1ed4f54536bdde6350277

{{index library}}
@!f40c7ed028e2350a187ce1482e577e18d02eef7f

But these flaws aren't fatal. Since JavaScript
allows us to create our own ((abstraction))s, it is easy to write some
((helper function))s that allow you to express the operations you are
performing in a clearer and shorter way. In fact, many libraries
intended for browser programming come with such tools.
@!530be19bcd605716ddcfbd79ff583ef6307243bc

## Moving through the tree
@!0dabd73f879415e79850e798ae44ae7040f596db

{{index pointer}}
@!94b1434d887b1188a0216bd0643eb48c7ccee0a5

DOM nodes contain a wealth of ((link))s to other nearby
nodes. The following diagram illustrates these:
@!ab1cf6fce7b5ec944e7b55d09e85471d87049d65

{{figure {url: "img/html-links.svg", alt: "Links between DOM nodes",width: "6cm"}}}
@!4fbd455bcbb196743dd788f43ef3eca553c2987b

{{index "child node", "parentNode property", "childNodes property"}}
@!bd6f86490a9a36d4af512604b4169acbf9774a3f

Although the diagram shows only one link of each type,
every node has a `parentNode` property that points to its containing
node. Likewise, every element node (node type 1) has a `childNodes`
property that points to an ((array-like object)) holding its children.
@!74c97c48a850f20c776847117685f12c7c406724

{{index "firstChild property", "lastChild property", "previousSibling property", "nextSibling property"}}
@!d9368a83176993bb9b45d45ab7cd9e9e8d23d651

In theory, you could move
anywhere in the tree using just these parent and child links. But
JavaScript also gives you access to a number of additional convenience
links. The `firstChild` and `lastChild` properties point to the first
and last child elements or have the value `null` for nodes without
children. Similarly, `previousSibling` and `nextSibling` point to
adjacent nodes, which are nodes with the same parent that appear immediately
before or after the node itself. For a first child, `previousSibling`
will be null, and for a last child, `nextSibling` will be null.
@!08564450204957c63e26a22ecef1b841e188222c

{{index "talksAbout function", recursion, [nesting, "of objects"]}}
@!983e32fdddf81c585aa381f03c2726d7348a0cd0

When
dealing with a nested data structure like this one, recursive functions
are often useful. The following recursive function scans a document for ((text node))s
containing a given string and returns `true` when it has found one:
@!830988b4300577054938d832a054d07d99302f2e

{{id talksAbout}}
@!1ba23aec880a16f76651e67f863a4994b50d4aaa

```{sandbox: "homepage"}
function talksAbout(node, string) {
  if (node.nodeType == document.ELEMENT_NODE) {
    for (var i = 0; i < node.childNodes.length; i++) {
      if (talksAbout(node.childNodes[i], string))
        return true;
    }
    return false;
  } else if (node.nodeType == document.TEXT_NODE) {
    return node.nodeValue.indexOf(string) > -1;
  }
}

console.log(talksAbout(document.body, "book"));
// → true
```
@!fe32b71ab8b542be2f10c28d516b2bf67e14ed3b

{{index "nodeValue property"}}
@!0fb3ea4b72903577d1a3a74ac15a36815d8e2708

The `nodeValue` property of a text node refers
to the string of text that it represents.
@!c33ffc197c1d01060773b9221c82da93a94c2b1a

## Finding elements
@!309991400cc899b7789049fad210c38ac06332d2

{{index DOM, "body property", "hard-coding"}}
@!e626e2c9a9c5e1f3378c4f5d24bd79b7193c9d4d

Navigating these
((link))s among parents, children, and siblings is often useful, as in
the previous function, which runs through the whole document. But if we
want to find a specific node in the document, reaching it by starting
at `document.body` and blindly following a hard-coded path of links is
a bad idea. Doing so bakes assumptions into our program about the
precise structure of the document—a structure we might want to change
later. Another complicating factor is that text nodes are created even
for the ((whitespace)) between nodes. The example document's body tag
does not have just three children (`<h1>` and two `<p>` elements) but
actually has seven: those three, plus the spaces before, after, and
between them.
@!19109a83db328351eec3d378d22359016ba92b4f

{{index searching, "href attribute", "getElementsByTagName method"}}
@!8136e69be71388441509d1bc75b6930a7fb78b22

So
if we want to get the `href` attribute of the link in that document,
we don't want to say something like “Get the second child of the sixth
child of the document body”. It'd be better if we could say “Get the
first link in the document”. And we can.
@!8b79ec3c9ac43b1f8be2d823d1565c78c218f423

```{sandbox: "homepage"}
var link = document.body.getElementsByTagName("a")[0];
console.log(link.href);
```
@!3da8149219f122314f8a3865a60e8a16b79ea888

{{index "child node"}}
@!44da3b4f6ca70792b7e38e59d6a6da7237649f17

All element nodes have a `getElementsByTagName`
method, which collects all elements with the given tag name that are
descendants (direct or indirect children) of the given node and
returns them as an array-like object.
@!ea97caf52c1f93827be6d84f5ba20606718678e5

{{index "id attribute", "getElementById method"}}
@!d4293aa56f36883c961246e97629c7d8f83aa29f

To find a specific
_single_ node, you can give it an `id` attribute and use
`document.getElementById` instead.
@!135edd8a8fc1c1afe86ec52bd37ba26100c11ac1

```{lang: "text/html"}
<p>My ostrich Gertrude:</p>
<p><img id="gertrude" src="img/ostrich.png"></p>

<script>
  var ostrich = document.getElementById("gertrude");
  console.log(ostrich.src);
</script>
```
@!e7d10f1a7236ddbc79c82a831c3befcb430c2269

{{index "getElementsByClassName method", "class attribute"}}
@!e8ced9ddf94e4d3bdb6f257ce7998ec4553431f5

A third,
similar method is `getElementsByClassName`, which, like
`getElementsByTagName`, searches through the contents of an element
node and retrieves all elements that have the given string in their
`class` attribute.
@!72caaa013a89d461441a29f84b6ece4a972bbd5e

## Changing the document
@!c28adacac4b0f8d9395e8c24d66228514808684f

{{index "side effect", "removeChild method", "appendChild method", "insertBefore method", [DOM, construction]}}
@!f4b047567fce6f6f240fc9497a4da0f519058847

Almost
everything about the ((DOM)) data structure can be changed. Element
nodes have a number of methods that can be used to change their
content. The `removeChild` method removes the given child node from
the document. To add a child, we can use `appendChild`, which puts it
at the end of the list of children, or `insertBefore`, which inserts
the node given as the first argument before the node given as the second
argument.
@!15770f61436339acd3770d20658fe0fbacc38b62

```{lang: "text/html"}
<p>One</p>
<p>Two</p>
<p>Three</p>

<script>
  var paragraphs = document.body.getElementsByTagName("p");
  document.body.insertBefore(paragraphs[2], paragraphs[0]);
</script>
```
@!5c5d0594b9d1359881be95def2868ed8316d2be8

A node can exist in the document in only one place. Thus, inserting
paragraph “Three” in front of paragraph “One” will first remove it
from the end of the document and then insert it at the front,
resulting in “Three/One/Two”. All operations that insert a node
somewhere will, as a ((side effect)), cause it to be removed from its
current position (if it has one).
@!4a1108e8148763c6279315ca60023b6df31df5bd

{{index "insertBefore method", "replaceChild method"}}
@!4dfd408003f99694889f9f86181465b9b2dd5d42

The `replaceChild`
method is used to replace a child node with another one. It takes as
arguments two nodes: a new node and the node to be replaced. The
replaced node must be a child of the element the method is called on.
Note that both `replaceChild` and `insertBefore` expect the _new_ node
as their first argument.
@!058b0fa879e13dffb7dafe824305eaa38bf3e2d9

## Creating nodes
@!617245b8c5b06c992cfadfd646a05e830975d425

{{index "alt attribute", "img (HTML tag)"}}
@!c529c6308072cd96d817a5ef086b5d3ad10b38e8

In the following example, we
want to write a script that replaces all ((image))s (`<img>` tags) in
the document with the text held in their `alt` attributes, which
specifies an alternative textual representation of the image.
@!7f8308d9289703ba1545a1c759343acfbfc756da

{{index "createTextNode method"}}
@!6e38980a7f133e61ff730fcddd066df25acf8e5c

This involves not only removing the images
but adding a new text node to replace them. For this, we use the
`document.createTextNode` method.
@!94eee2d101ffd24fbe48769e4234d7a32826af18

```{lang: "text/html"}
<p>The <img src="img/cat.png" alt="Cat"> in the
  <img src="img/hat.png" alt="Hat">.</p>

<p><button onclick="replaceImages()">Replace</button></p>

<script>
  function replaceImages() {
    var images = document.body.getElementsByTagName("img");
    for (var i = images.length - 1; i >= 0; i--) {
      var image = images[i];
      if (image.alt) {
        var text = document.createTextNode(image.alt);
        image.parentNode.replaceChild(text, image);
      }
    }
  }
</script>
```
@!be8602e654b112735b792d935edfac7de9d5d22e

{{index "text node"}}
@!00dae82f77d490302d2ac922ec635610c794d22e

Given a string, `createTextNode` gives us a type 3 DOM
node (a text node), which we can insert into the document to make it
show up on the screen.
@!88ad00e5f34519ff3c7245afa009c27ca7484989

{{index "live data structure", "getElementsByTagName method", "childNodes property"}}
@!32d9d3a376b8020e29f67e9ec3b7f9e86a053573

The loop that goes over the images
starts at the end of the list of nodes. This is necessary because the
node list returned by a method like `getElementsByTagName` (or a
property like `childNodes`) is _live_. That is, it is updated as the
document changes. If we started from the front, removing the first
image would cause the list to lose its first element so that the
second time the loop repeats, where `i` is 1, it would stop because
the length of the collection is now also 1.
@!dc39a9f455bf2fc51d8070e283827c787c44b970

{{index "slice method"}}
@!d93edb7944784d7626100bb16207daa8b40fa3e2

If you want a _solid_ collection of nodes, as
opposed to a live one, you can convert the collection to a real array
by calling the array `slice` method on it.
@!5144a6a2d3deb28daf5ceafed12e3d355c03a55b

```
var arrayish = {0: "one", 1: "two", length: 2};
var real = Array.prototype.slice.call(arrayish, 0);
real.forEach(function(elt) { console.log(elt); });
// → one
//   two
```
@!b5566c6b86f4a5de5e6fed67d03fd5cb12d454ae

{{index "createElement method"}}
@!2d5e6f8d6093d386026fdbd5a2cd2c122625fdc0

To create regular ((element)) nodes (type
1), you can use the `document.createElement` method. This method takes
a tag name and returns a new empty node of the given type.
@!3c59dc201e149e97a59e25fa2a1cff67363bd7c6

{{index "Popper, Karl", [DOM, construction], "elt function"}}
@!f97a28e8e1e65559187837a780a38bbff14b0ef9

{{id elt}}
@!2208f8d213af8b7ec7dabaafe96adfe5afa64046

The
following example defines a utility `elt`, which creates an element
node and treats the rest of its arguments as children to that node.
This function is then used to add a simple attribution to a quote.
@!cef638707014cd004eb2b7b6760cee49c0954689

```{lang: "text/html"}
<blockquote id="quote">
  No book can ever be finished. While working on it we learn
  just enough to find it immature the moment we turn away
  from it.
</blockquote>

<script>
  function elt(type) {
    var node = document.createElement(type);
    for (var i = 1; i < arguments.length; i++) {
      var child = arguments[i];
      if (typeof child == "string")
        child = document.createTextNode(child);
      node.appendChild(child);
    }
    return node;
  }

document.getElementById("quote").appendChild(
    elt("footer", "—",
        elt("strong", "Karl Popper"),
        ", preface to the second editon of ",
        elt("em", "The Open Society and Its Enemies"),
        ", 1950"));
</script>
```
@!44cbde20130268c45128cc236f77d4480dff61f2

{{if book
@!da50e81061be4358a89c642ec1958587a5d6c88b

This is what the resulting document looks like:
@!11323493b8eab2fa34412d70c395d3fb2543d051

{{figure {url: "img/blockquote.png", alt: "A blockquote with attribution",width: "8cm"}}}
@!83efd314d6f2d21a65347ad404ad813c23f32255

if}}
@!3c864ee2a4b9ed90412ba199c1c58a7df2b92069

## Attributes
@!84a876ae7cb4dcf6c81463baf432a3f6b7eb3fe3

{{index "href attribute"}}
@!5f0106c627147e3c89fea1676560729e750cca8c

Some element ((attribute))s, such as `href` for
links, can be accessed through a ((property)) of the same name on the
element's ((DOM)) object. This is the case for a limited set of
commonly used standard attributes.
@!01116d13b3de6fb7d670d52d4154527ea6cf21cc

{{index "data attribute", "getAttribute method", "setAttribute method"}}
@!a64f7123de7bccf6d76eff87f82a026abaf53ba7

But HTML allows you to set any attribute you want on nodes.
This can be useful because it allows you to store extra information in a
document. If you make up your own attribute names, though, such
attributes will not be present as a property on the element's node.
Instead, you'll have to use the `getAttribute` and `setAttribute`
methods to work with them.
@!c3fc4f44c3b451de06b49cc89979a999ee4da09e

```{lang: "text/html"}
<p data-classified="secret">The launch code is 00000000.</p>
<p data-classified="unclassified">I have two feet.</p>

<script>
  var paras = document.body.getElementsByTagName("p");
  Array.prototype.forEach.call(paras, function(para) {
    if (para.getAttribute("data-classified") == "secret")
      para.parentNode.removeChild(para);
  });
</script>
```
@!ba866c070f5d2e2129708a70a010477fe62435ff

I recommended prefixing the names of such made-up attributes with
`data-` to ensure they do not conflict with any other
attributes.
@!c0f1abaffd5c50c311d75ae7e767ae483c0d44c5

{{index "programming language", "syntax highlighting example"}}
@!3a9a42b715ac861f5f0025963be27124918b57af

As a simple
example, we'll write a “syntax highlighter” that looks for `<pre>`
tags (“preformatted”, used for code and similar plaintext) with a
`data-language` attribute and crudely tries to highlight the
((keyword))s for that language.
@!a92e3d0cfdb1301d26d66fdb3ea557fb7a7cddf8

```{sandbox: "highlight", includeCode: true}
function highlightCode(node, keywords) {
  var text = node.textContent;
  node.textContent = ""; // Clear the node

var match, pos = 0;
  while (match = keywords.exec(text)) {
    var before = text.slice(pos, match.index);
    node.appendChild(document.createTextNode(before));
    var strong = document.createElement("strong");
    strong.appendChild(document.createTextNode(match[0]));
    node.appendChild(strong);
    pos = keywords.lastIndex;
  }
  var after = text.slice(pos);
  node.appendChild(document.createTextNode(after));
}
```
@!08897ff3ee89c6e499c02c53ab13dc35da433c4b

{{index "pre (HTML tag)", "syntax highlighting example", "highlightCode function"}}
@!ed9ce71ec946e45a5c4ed8c2109a1cbf677679ac

The function `highlightCode` takes a `<pre>` node and a
((regular expression)) (with the “global” option turned on) that
matches the keywords of the programming language that the element
contains.
@!63478c4661fb404ebb8efeaafb56ac7dde504ffd

{{index "strong (HTML tag)", clearing, "textContent property"}}
@!cc0a2b22de38a32b5bdb6c306905254324f55ae4

The
`textContent` property is used to get all the ((text)) in the node
and is then set to an empty string, which has the effect of emptying
the node. We loop over all matches of the keyword expression,
appending the text _between_ them as regular text nodes, and the text
matched (the keywords) as text nodes wrapped in `<strong>` (bold) elements.
@!dff58929504e41270cd8644485d3de173e83a82a

{{index "data attribute", "getElementsByTagName method"}}
@!d1e95eaf0fdabe748181a7df3fa369ebad5b7fda

We can
automatically highlight all programs on the page by looping over all
the `<pre>` elements that have a `data-language` attribute and
calling `highlightCode` on each one with the correct regular
expression for the language.
@!c6247cb87a2954790865b15f9026b926883e99fa

```{sandbox: "highlight", includeCode: true}
var languages = {
  javascript: /\b(function|return|var)\b/g /* … etc */
};

function highlightAllCode() {
  var pres = document.body.getElementsByTagName("pre");
  for (var i = 0; i < pres.length; i++) {
    var pre = pres[i];
    var lang = pre.getAttribute("data-language");
    if (languages.hasOwnProperty(lang))
      highlightCode(pre, languages[lang]);
  }
}
```
@!036a4f138ca087db2b4e61c1a10860732a2c5d2f

{{index "syntax highlighting example"}}
@!5cefb2fad574ac3efc54873a0985ff65fdaa56b8

Here is an example:
@!f77effb7fbb5b41dec9e2bd3507fa5c7560a32a8

```{lang: "text/html", sandbox: "highlight"}
<p>Here it is, the identity function:</p>
<pre data-language="javascript">
function id(x) { return x; }
</pre>

<script>highlightAllCode();</script>
```
@!30b9456621ab02a705bdf81dc4df5fcd41189293

{{if book
@!d4aecfdfbda8279a79a033d39d3a3f72ff329af2

This produces a page that looks like this:
@!c770aac2ca3dddbe0e0b27dcaefcbcc3c9c5a6f0

{{figure {url: "img/highlighted.png", alt: "A highlighted piece of code",width: "4.8cm"}}}
@!3350a0141317f2cff09f3bb5bba88f65eb7c3278

if}}
@!89b8b1a0c7504e7a9411ef321ce076e934cae79b

{{index "getAttribute method", "setAttribute method", "className property", "class attribute"}}
@!2a18c124bb92cb14da9ba9a993fb25ba33b0f5a5

There is one commonly used attribute,
`class`, which is a ((reserved word)) in the JavaScript language. For
historical reasons—some old JavaScript implementations could not
handle property names that matched keywords or reserved words—the
property used to access this attribute is called `className`. You can
also access it under its real name, `"class"`, by using the
`getAttribute` and `setAttribute` methods.
@!5b7c9fea2f60e01bdbed4d64ba7d77e811aa1758

## Layout
@!486277ade9c6129534b97b1eaed0d8667133ae6e

{{index layout, "block element", "inline element", "p (HTML tag)", "h1 (HTML tag)", "a (HTML tag)", "strong (HTML tag)"}}
@!a57a52a1f0c4342d7290921e6f80b63712af3db1

You
might have noticed that different types of elements are laid out
differently. Some, such as paragraphs (`<p>`) or headings (`<h1>`),
take up the whole width of the document and are rendered on separate
lines. These are called _block_ elements. Others, such as links
(`<a>`) or the `<strong>` element used in the previous example, are
rendered on the same line with their surrounding text. Such elements
are called _inline_ elements.
@!0b7dc49745a81c62ec684974468d233d5153568d

{{index drawing}}
@!48f07d3175e0054d65ded7810aae2c5aa707a0ca

For any given document, browsers are able to compute a
layout, which gives each element a size and position based on its
type and content. This layout is then used to actually draw the
document.
@!8cdaf15e040d5da1ce31b078a6dad8848cbe9a55

{{index "border (CSS)", "offsetWidth property", "offsetHeight property", "clientWidth property", "clientHeight property", dimensions}}
@!c2b7dade9758975eb6cb8292c48913ecebc247a7

The size and position of an element can be
accessed from JavaScript. The `offsetWidth` and `offsetHeight`
properties give you the space the element takes up in _((pixel))s_. A
pixel is the basic unit of measurement in the browser and typically
corresponds to the smallest dot that your screen can display.
Similarly, `clientWidth` and `clientHeight` give you the size of the
space _inside_ the element, ignoring border width.
@!3a5b8bc76c8d621dce274910765da6077f3f8427

```{lang: "text/html"}
<p style="border: 3px solid red">
  I'm boxed in
</p>

<script>
  var para = document.body.getElementsByTagName("p")[0];
  console.log("clientHeight:", para.clientHeight);
  console.log("offsetHeight:", para.offsetHeight);
</script>
```
@!52ab66b9d4afc616592588353d9a2f2109862c30

{{if book
@!b78bc30a00b2db6333c65b6b59f680028c15623a

Giving a paragraph a border causes a rectangle to be drawn around it.
@!b3a3627a108f9d09edaae07560c593cfee0a0cd6

{{figure {url: "img/boxed-in.png", alt: "A paragraph with a border",width: "8cm"}}}
@!5270a2a690fce6114e77d076fbc07f08b9ca0e4d

if}}
@!7d2571eb29f68e7cd462e6a36749edba598273d8

{{index "getBoundingClientRect method", position, "pageXOffset property", "pageYOffset property"}}
@!d31368372e394cb8f707e26bbd804fd593ddd91c

{{id boundingRect}}
@!3efae7c3b0b527d6c0f602bd0343c76667d87bbe

The most effective way to find
the precise position of an element on the screen is the
`getBoundingClientRect` method. It returns an object with `top`,
`bottom`, `left`, and `right` properties, indicating the pixel
positions of the sides of the element relative to the top left of the
screen. If you want them relative to the whole document, you must
add the current scroll position, found under the global `pageXOffset`
and `pageYOffset` variables.
@!d7643a343a3746ce40c42c15a8125c220d08c992

{{index "offsetHeight property", "getBoundingClientRect method", drawing, laziness, performance, efficiency}}
@!065d5ae011c2a7c29221430cd6ccd55dc831f320

Laying
out a document can be quite a lot of work. In the interest of speed,
browser engines do not immediately re-layout a document every time it
is changed but rather wait as long as they can. When a JavaScript
program that changed the document finishes running, the browser will
have to compute a new layout in order to display the changed document
on the screen. When a program _asks_ for the position or size of
something by reading properties such as `offsetHeight` or calling
`getBoundingClientRect`, providing correct information also requires
computing a ((layout)).
@!85d2cf0269118b32f82b0f2463b64f1d45081db8

{{index "side effect", optimization, benchmark}}
@!506ccd9fac6581c73b6d5d401da735faf61e500c

A program that
repeatedly alternates between reading DOM layout information and
changing the DOM forces a lot of layouts to happen and will
consequently run really slowly. The following code shows an example of
this. It contains two different programs that build up a line of _X_
characters 2,000 pixels wide and measures the time each one takes.
@!fe032f82753b5daa48356dacb272f30be31f1253

```{lang: "text/html", test: nonumbers}
<p><span id="one"></span></p>
<p><span id="two"></span></p>

<script>
  function time(name, action) {
    var start = Date.now(); // Current time in milliseconds
    action();
    console.log(name, "took", Date.now() - start, "ms");
  }

time("naive", function() {
    var target = document.getElementById("one");
    while (target.offsetWidth < 2000)
      target.appendChild(document.createTextNode("X"));
  });
  // → naive took 32 ms

time("clever", function() {
    var target = document.getElementById("two");
    target.appendChild(document.createTextNode("XXXXX"));
    var total = Math.ceil(2000 / (target.offsetWidth / 5));
    for (var i = 5; i < total; i++)
      target.appendChild(document.createTextNode("X"));
  });
  // → clever took 1 ms
</script>
```
@!7d3e5b29dba8e5a59d48f68fad05348c22221d13

## Styling
@!6ffd507968323954fa24e719dc17204d15a5228d

{{index "block element", "inline element", style, "strong (HTML tag)", "a (HTML tag)", underline}}
@!fd64e42ef73806f2a4aa7f73f5d41cc885b35e6e

We have seen that different
HTML elements display different behavior. Some are displayed as
blocks, others inline. Some add styling, such as `<strong>` making its
content ((bold)) and `<a>` making it blue and underlining it.
@!05b248ba2f2fe0bc31d8b56ebe680709da08cefc

{{index "img (HTML tag)", "default behavior", "style attribute"}}
@!928acde05960622740c19479202d9d9318703eb0

The way
an `<img>` tag shows an image or an `<a>` tag causes a link to be
followed when it is clicked is strongly tied to the element type. But
the default styling associated with an element, such as the text color
or underline, can be changed by us. Here is an example using the `style`
property:
@!436cb1164c38311441d691057c8fd93bdd2f15dd

```{lang: "text/html"}
<p><a href=".">Normal link</a></p>
<p><a href="." style="color: green">Green link</a></p>
```
@!1f5147a0c137b131ba0e0954e1b7e33a2bd3230d

{{if book
@!f330f9ad2e9d0cb381afd2966e60ce2bbb8a97ab

The second link will be green instead of the default link color.
@!e48980094154e2a725a8dd0994ff094bfd298b1e

{{figure {url: "img/colored-links.png", alt: "A normal and a green link",width: "2.2cm"}}}
@!b6025b0f5aa472f5785d41463b8d9ff6352ea7dd

if}}
@!98dac36b3587a16eb14f6cb1f24562e20acad07a

{{index "border (CSS)", "color (CSS)", CSS, "colon character"}}
@!482b00d749cb598ff685c63cf4b08fc13c4c1c72

A
style attribute may contain one or more _((declaration))s_, which are
a property (such as `color`) followed by a colon and a value (such as
`green`). When there is more than one declaration, they must be
separated by ((semicolon))s, as in `"color: red; border: none"`.
@!1b0815332ce83b616a7b3ab61543b4a3c55ec238

{{index "display (CSS)", layout}}
@!c9ae0b31cb4f6d1fc32cc2246d43c1c388d14c23

There are a lot of aspects that can be
influenced by styling. For example, the `display` property controls
whether an element is displayed as a block or an inline element.
@!8b1c55849b4f8cd1873ecf5150d1c38737ddaf6d

```{lang: "text/html"}
This text is displayed <strong>inline</strong>,
<strong style="display: block">as a block</strong>, and
<strong style="display: none">not at all</strong>.
```
@!c958f2dc4272c92a87b6bbbccde3d642784c1e7b

{{index "hidden element"}}
@!e3b2245d8d202c30f25dc9b4fea42fb4f44daa13

The `block` tag will end up on its own line since
((block element))s are not displayed inline with the text around them.
The last tag is not displayed at all—`display: none` prevents an
element from showing up on the screen. This is a way to hide elements.
It is often preferable to removing them from the document
entirely because it makes it easy to reveal them again at a later time.
@!500678de556fdfba7369271afd0d4d249d99445d

{{if book
@!6dd739ca479b728ed160d316ed43bf8af8cdc7cb

{{figure {url: "img/display.png", alt: "Different display styles",width: "4cm"}}}
@!56326724c34faa15474c4bcdaf49a079e7c208cf

if}}
@!7ab8563e98b17c221eb5480496cdad243f884f66

{{index "color (CSS)", "style attribute"}}
@!3f9f1bc629dce1ea7d1b9f3de7e1c0266cfbc74d

JavaScript code can directly
manipulate the style of an element through the node's `style`
property. This property holds an object that has properties for all
possible style properties. The values of these properties are strings,
which we can write to in order to change a particular aspect of the
element's style.
@!10ba613994cd9e4507bf691a566bca9f42f49473

```{lang: "text/html"}
<p id="para" style="color: purple">
  Pretty text
</p>

<script>
  var para = document.getElementById("para");
  console.log(para.style.color);
  para.style.color = "magenta";
</script>
```
@!4fb87475a3b53306333d3a3132308b27bd46386e

{{index "camel case", capitalization, "dash character", "font-family (CSS)"}}
@!0be316f9219faedea62a26b49cadf8d77fd3727f

Some style property names contain dashes, such as `font-family`.
Because such property names are awkward to work with in JavaScript
(you'd have to say `style["font-family"]`), the property names in the
`style` object for such properties have their dashes removed and the
letters that follow them capitalized (`style.fontFamily`).
@!7b186fc2959c8d4873cf716bdd3acf9e7ac304ef

## Cascading styles
@!8386016f6c7efcc9ae9779a87b1743197a8fe63e

{{index "rule (CSS)", "style (HTML tag)"}}
@!5c98af4cf29d51bb266ab8269e52e27eff762896

{{indexsee "Cascading Style Sheets", CSS}}
@!4b7d3909cddbc26bf83323185e8690604913d3ff

The styling system for HTML is called ((CSS))
for _Cascading Style Sheets_. A _((style sheet))_ is a set of
rules for how to style elements in a document. It can be given
inside a `<style>` tag.
@!9a91b5074b47a5492c8d2812532a7e54bd66a46d

```{lang: "text/html"}
<style>
  strong {
    font-style: italic;
    color: gray;
  }
</style>
<p>Now <strong>strong text</strong> is italic and gray.</p>
```
@!a74f9d759f84ed2b66ce9db78b3fa81afb26bf9c

{{index "rule (CSS)", "font-weight (CSS)", overlay}}
@!6202ea59482ab2fdab587d7d542f47b3a2d0dae5

The _((cascading))_ in the name
refers to the fact that multiple such rules are combined to
produce the final style for an element. In the previous example, the
default styling for `<strong>` tags, which gives them `font-weight:
bold`, is overlaid by the rule in the `<style>` tag, which adds
`font-style` and `color`.
@!03331240acff167e5e67258ee5ad20f767086462

{{index "style (HTML tag)", "style attribute"}}
@!2fca991b9535ec7d74d426b185e9460122a04387

When multiple rules define
a value for the same property, the most recently read rule gets a
higher ((precedence)) and wins. So if the rule in the `<style>`
tag included `font-weight: normal`, conflicting with the default
`font-weight` rule, the text would be normal, _not_ bold. Styles in a
`style` attribute applied directly to the node have the highest
precedence and always win.
@!79aa7a482a67d7908a264436a4426d7bf501643c

{{index uniqueness, "class attribute", "id attribute"}}
@!2d66f0cf47a5db4ffec8057cc017e6d409ccb5c9

It is possible
to target things other than ((tag)) names in CSS rules. A rule for
`.abc` applies to all elements with `"abc"` in their class attributes.
A rule for `#xyz` applies to the element with an `id` attribute of
`"xyz"` (which should be unique within the document).
@!a723c812830258bc8db06c480057b2de641c040f

```{lang: "text/css"}
.subtle {
  color: gray;
  font-size: 80%;
}
#header {
  background: blue;
  color: white;
}
/* p elements, with classes a and b, and id main */
p.a.b#main {
  margin-bottom: 20px;
}
```
@!24400ecae71112148641e6d3f18eec7a34ccdd31

{{index "rule (CSS)"}}
@!cd7c4b662d4b52b87ac377fc7762f855a478d295

The ((precedence)) rule favoring the most recently defined rule
holds true only when the rules have the same _((specificity))_. A rule's
specificity is a measure of how precisely it describes matching
elements, determined by the number and kind (tag, class, or ID) of
element aspects it requires. For example, a rule that targets `p.a` is more specific than
rules that target `p` or just `.a`, and would thus take precedence
over them.
@!4db8fa816bfb5a7adcd56917f6f4616c65382ad1

{{index "direct child node"}}
@!fee4f27fb8cb3b62cf78d30868bcb6aa3ddd5f96

The notation `p > a {…}` applies the given
styles to all `<a>` tags that are direct children of `<p>` tags.
Similarly, `p a {…}` applies to all `<a>` tags inside `<p>` tags,
whether they are direct or indirect children.
@!b1db9f01337bbc251ca5a548de2d03f0646b0c8a

## Query selectors
@!d273752e337b9d309e0812a04d4da1d4030abe2f

{{index complexity}}
@!7ef10d4b1920ec2b26e4133a194ffa47c13f7091

We won't be using ((style sheet))s all that much in
this book. Although understanding them is crucial to programming in
the browser, properly explaining all the properties they support and the
interaction among those properties would take two or three books.
@!a91ca8f5fc64eacb30b92ee2a25d8271caa91dc7

{{index "domain-specific language"}}
@!fa3b1aae80231a71e1a95174ac0a4e72319880b9

The main reason I introduced
_((selector))_ syntax--the notation used in style sheets to determine
which elements a set of styles apply to—is that we can use this same
mini-language as an effective way to find ((DOM)) elements.
@!f4dbcde0b89131bfffa17166eb2d326c5e2b38d8

{{index "querySelectorAll method"}}
@!cfe2beb151daef1db7060f47c0aedcdef0d6dabf

The `querySelectorAll` method, which is defined
both on the `document` object and on element nodes, takes a selector
string and returns an ((array-like object)) containing all the
elements that it matches.
@!c97db77ceffb8b723074f70adc3c37ea12eeddec

```{lang: "text/html"}
<p>And if you go chasing
  <span class="animal">rabbits</span></p>
<p>And you know you're going to fall</p>
<p>Tell 'em a <span class="character">hookah smoking
  <span class="animal">caterpillar</span></span></p>
<p>Has given you the call</p>

<script>
  function count(selector) {
    return document.querySelectorAll(selector).length;
  }
  console.log(count("p"));           // All <p> elements
  // → 4
  console.log(count(".animal"));     // Class animal
  // → 2
  console.log(count("p .animal"));   // Animal inside of <p>
  // → 2
  console.log(count("p > .animal")); // Direct child of <p>
  // → 1
</script>
```
@!a51a69b165cb79732eee49ee2175c99009738729

{{index "live data structure"}}
@!371d3e603bbd990eba77b6e46d1a7767325dab5c

Unlike methods such as `getElementsByTagName`,
the object returned by `querySelectorAll` is _not_ live. It won't
change when you change the document.
@!f35607257a6df834927c56080adc729eff5078e1

{{index "querySelector method"}}
@!2d84f183c654cd673d4c01717c58511c36ce53ba

The `querySelector` method (without the
`All` part) works in a similar way. This one is useful if you want a
specific, single element. It will return only the first matching
element or null if no elements match.
@!3d5487c616b503183220432a0b847a827c783354

{{id animation}}
@!63a6f6b8d2d410e573a4cc61308bd5834bbcff3c

## Positioning and animating
@!d4dc9c5b5982f3e9a8a95dfcac56dffd772bef97

{{index "position (CSS)", "relative positioning", "top (CSS)", "left (CSS)", "absolute positioning"}}
@!78b6d425c04339e31a9d6116d45d3ae6ab37c6e1

The `position` style property
influences layout in a powerful way. By default it has a value of
`static`, meaning the element sits in its normal place in the
document. When it is set to `relative`, the element still takes up
space in the document, but now the `top` and `left` style properties
can be used to move it relative to its normal place. When `position`
is set to `absolute`, the element is removed from the normal document
flow—that is, it no longer takes up space and may overlap with other
elements. Also, its `top` and `left` properties can be used to
absolutely position it relative to the top-left corner of the nearest
enclosing element whose `position` property isn't `static`, or
relative to the document if no such enclosing element exists.
@!3fb8b001a1eb461e888f08e1f55e781d25434bb6

We can use this to create an ((animation)). The following document 
displays a picture of a cat that floats around in an ((ellipse)):
@!4dc8b0665e6785c44224cdeaed35535654ad629b

```{lang: "text/html"}
<p style="text-align: center">
  <img src="img/cat.png" style="position: relative">
</p>
<script>
  var cat = document.querySelector("img");
  var angle = 0, lastTime = null;
  function animate(time) {
    if (lastTime != null)
      angle += (time - lastTime) * 0.001;
    lastTime = time;
    cat.style.top = (Math.sin(angle) * 20) + "px";
    cat.style.left = (Math.cos(angle) * 200) + "px";
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
</script>
```
@!f8d5a1bb4f570d34b0be151f1f22f696942613c2

{{if book
@!cb84ad6c72cb0e52fe0a52d515674ab7a5d55a15

The gray arrow shows the path along which the image moves.
@!ffd69e863fb419b5e35b6288700811e99c072db9

{{figure {url: "img/cat-animation.png", alt: "A moving cat head",width: "8cm"}}}
@!7d248bc7201f8431d1f8e6f69a1722d0fbbc09b3

if}}
@!212cd5032f336714c408d53fd20711ac07abb07b

{{index "top (CSS)", "left (CSS)", centering, "relative positioning"}}
@!0dac2252e6c325307e0e5778375af97a1474c580

The picture is centered on the page and given a
`position` of `relative`. We'll repeatedly update that picture's `top`
and `left` styles in order to move it.
@!2dbf39a75848fea0b93ca0bb701081e99e5d1244

{{index "requestAnimationFrame function", drawing, animation}}
@!d49b411caa8a197d7997958de15f27a7ff3716a0

{{id animationFrame}}
@!ef068cd27bccfa4b8d9ab2c886ee7c2890c83248

The
script uses `requestAnimationFrame` to schedule the `animate` function
to run whenever the browser is ready to repaint the screen. The
`animate` function itself again calls `requestAnimationFrame` to
schedule the next update. When the browser window (or tab) is active,
this will cause updates to happen at a rate of about 60 per second,
which tends to produce a good-looking animation.
@!d403281b1d8c0f05122e47d17b814f93cca5f901

{{index timeline, blocking}}
@!74dcbbf0ba655e33d969ff08580f956d184fbd11

If we just updated the DOM in a loop, the
page would freeze and nothing would show up on the screen. Browsers do
not update their display while a JavaScript program is running, nor do
they allow any interaction with the page. This is why we need
_requestAnimationFrame_—it lets the browser know that we are done
for now, and it can go ahead and do the things that browsers do, such
as updating the screen and responding to user actions.
@!0152d1d6adeb18d13e584573620319f4ea79b7cf

{{index "smooth animation"}}
@!12b56b4322e7ea5ae78428fe59e23ffb158d95ae

Our ((animation)) function is passed the current
((time)) as an argument, which it compares to the time it saw before (the
`lastTime` variable) to ensure the motion of the cat per millisecond
is stable, and the animation moves smoothly. If it just moved a fixed
amount per step, the motion would stutter if, for example, another
heavy task running on the same computer were to prevent the function
from running for a fraction of a second.
@!511804696b74dccf75b5e66aa486a271e94c52f2

{{index "Math.cos function", "Math.sin function", cosine, sine, trigonometry}}
@!3a92b3fe09a173d1f2026079bd60051bea3343bc

{{id sin_cos}}
@!3498b8e1fb9b733bfed8f15c95e3659a30310dd6

Moving in
((circle))s is done using the trigonometry functions `Math.cos` and
`Math.sin`. For those of you who aren't familiar with these, I'll
briefly introduce them since we will occasionally need them in this
book.
@!5e1bc818448db2272d19d5374a44b209153b1939

{{index coordinates, pi}}
@!03a95e40263e9f4607cc36dd99c59130145f9105

`Math.cos` and `Math.sin` are useful for
finding points that lie on a circle around point (0,0) with a radius
of one unit. Both functions interpret their argument as the position
on this circle, with zero denoting the point on the far right of the
circle, going clockwise until 2π (about 6.28) has taken us around the
whole circle. `Math.cos` tells you the x-coordinate of the point that
corresponds to the given position around the circle, while `Math.sin`
yields the y-coordinate. Positions (or angles) greater than 2π or less than
0 are valid—the rotation repeats so that _a_+2π refers to the same
((angle)) as _a_.
@!9f055df2aa53d0629ee2b43ab96c7b2482de0934

{{figure {url: "img/cos_sin.svg", alt: "Using cosine and sine to compute coordinates",width: "6cm"}}}
@!d88f224a466388f479aa311c7c2658fdf5cf3612

{{index "counter variable", "Math.sin function", "top (CSS)", "Math.cos function", "left (CSS)", ellipse}}
@!ecd63ee88e5d62c2c3b17e806eaa9fdc8b37cd81

The cat
animation code keeps a counter, `angle`, for the current angle of the
animation and increments it in proportion to the elapsed time every
time the `animate` function is called. It can then use this angle to
compute the current position of the image element. The `top` style is
computed with `Math.sin` and multiplied by 20, which is the vertical
radius of our circle. The `left` style is based on `Math.cos` and
multiplied by 200 so that the circle is much wider than it is high,
resulting in an elliptic motion.
@!52dbc98159d42636d45f2a496ecf3a3c21840637

{{index "unit (CSS)"}}
@!1b2ed99b70eff6853079eaf08820eeac83ade75a

Note that styles usually need _units_. In this case,
we have to append `"px"` to the number to tell the browser we are
counting in ((pixel))s (as opposed to centimeters, “ems”, or other
units). This is easy to forget. Using numbers without units will
result in your style being ignored—unless the number is 0, which
always means the same thing, regardless of its unit.
@!cf42bb1d4420f8790a8a7a9967836e526631862d

## Summary
@!984fa425ecd23c5e51058bb6d3e31b22d9ae2488

JavaScript programs may inspect and interfere with the current
document that a browser is displaying through a data structure called
the DOM. This data structure represents the browser's model of the
document, and a JavaScript program can modify it to change the visible
document.
@!7c647639f7b552836eecd0d17c4a5318ba398052

The DOM is organized like a tree, in which elements are arranged
hierarchically according to the structure of the document. The objects
representing elements have properties such as `parentNode` and
`childNodes`, which can be used to navigate through this tree.
@!7651a837fe5f9fe20a3303df04e11455ea4d8cfc

The way a document is displayed can be influenced by _styling_, both
by attaching styles to nodes directly and by defining rules that
match certain nodes. There are many different style properties, such as
`color` or `display`. JavaScript can manipulate an
element's style directly through its `style` property.
@!798bf9dd2b60bc3cc82eeb0167943b48c3501b40

## Exercises
@!7b7e2b1eba1494f9c45fa4c63d97b3251e2ebff7

{{id exercise_table}}
@!0a68a31345a0f6137ebb05947c8669c9c4e35421

### Build a table
@!27c9d8fa94d79fef602bdd6b88ae61e6efecca16

{{index "table (HTML tag)"}}
@!3eccf5b64577be4ccc06c98110998ba80c8854b0

We built plaintext ((table))s in
[Chapter 6](06_object.html#tables). HTML makes laying out tables
quite a bit easier. An ((HTML)) table is built with the following tag
structure:
@!0c757f387f01120a1abdee6dd0a369b2d26effbe

```{lang: "text/html"}
<table>
  <tr>
    <th>name</th>
    <th>height</th>
    <th>country</th>
  </tr>
  <tr>
    <td>Kilimanjaro</td>
    <td>5895</td>
    <td>Tanzania</td>
  </tr>
</table>
```
@!d0d56e30fd563e42e1f800f866ff4d7e508214c7

{{index "tr (HTML tag)", "th (HTML tag)", "td (HTML tag)"}}
@!c4ad02c89db154d6c3dd506456207ac26da5c6d9

For each
_((row))_, the `<table>` tag contains a `<tr>` tag. Inside of these `<tr>` tags,
we can put cell elements: either heading cells (`<th>`) or regular
cells (`<td>`).
@!8ff0fcc999fa8226241a043120960fbf7bceb121

{{index download, "MOUNTAINS data set", "table example"}}
@!07356bebee0873bd9faf2c565190b3896e45767a

The same
source data that was used in [Chapter 6](06_object.html#mountains)
is again available in the `MOUNTAINS` variable in the sandbox. It can also be http://eloquentjavascript.net/code/mountains.js[downloaded]
from the website[(http://eloquentjavascript.net/code#13[_eloquentjavascript.net/code#13_])]{if book}.
@!34b13541501a13763016a82c8e93cf763f821fc5

Write a function `buildTable` that, given an array of objects that all
have the same set of properties, builds up a DOM structure
representing a table. The table should have a header row with the
property names wrapped in `<th>` elements and should have one subsequent row per
object in the array, with its property values in `<td>` elements.
@!ca60ac01ee7c632a063e54e2b709b4895c78e194

{{index "Object.keys function"}}
@!e0918bc9ca793be62ea5c0d7b6035599902511ae

The `Object.keys` function, which returns an
array containing the property names that an object has, will probably
be helpful here.
@!619394cf24d393dc36db2ea7d60c034097a78831

{{index "right-aligning", "text-align (CSS)"}}
@!efc139f75c480a5e59651a7349221f68f0b26bbd

Once you have the basics
working, right-align cells containing numbers by setting their
`style.textAlign` property to `"right"`.
@!050eb49f8fd928079b33fce749925d2e2f674509

{{if interactive
@!d9fe10b8e87001e710403c4902ca11382c6dd260

```{lang: "text/html", test: no}
<style>
  /* Defines a cleaner look for tables */
  table  { border-collapse: collapse; }
  td, th { border: 1px solid black; padding: 3px 8px; }
  th     { text-align: left; }
</style>

<script>
  function buildTable(data) {
    // Your code here.
  }

document.body.appendChild(buildTable(MOUNTAINS));
</script>
```
@!f4c3f3bf14fc107dc119cd55994a54ca9c086514

if}}
@!1d239830a8be2d68293a36d767939a0f13586474

{{hint
@!fb31cfdf9903c9c75b2e37a7557fa3b61278136a

{{index "createElement method", "table example", "appendChild method"}}
@!5f334651550f6eabd69551363986fe0cbfea9226

Use `document.createElement` to create new element nodes,
`document.createTextNode` to create text nodes, and the `appendChild`
method to put nodes into other nodes.
@!ccf8ba050450bc015b844ad6b254aad1b5c73153

You should loop over the key names once to fill in the top row and
then again for each object in the array to construct the data
rows.
@!056fa3494551b91c6d76f0f1f2b54a71d4f74f41

Don't forget to return the enclosing `<table>` element at the end of
the function.
@!97addd9736ab6cd4864d8a694cac48cfb1b5e64c

hint}}
@!36ec87f95905c49dfccd9d0a27cfb2b094be14e3

### Elements by tag name
@!0d96e474bf9bcb06f10bc075b78cd05a06a2aef7

{{index "getElementsByTagName method", recursion}}
@!a7e4c2d2edc00a0c9a1a0c867b3c8de8a0e3595b

The
`getElementsByTagName` method returns all child elements with a given
tag name. Implement your own version of it as a regular nonmethod
function that takes a node and a string (the tag name) as arguments
and returns an array containing all descendant element nodes with the
given tag name.
@!b6746f9148cdfbe65719449220764870e508d5c7

{{index "tagName property", capitalization, "toLowerCase method", "toUpperCase method"}}
@!bb01d1715d743e427cf62683944f8ba1fb81c176

To find the tag name of an element,
use its `tagName` property. But note that this will return the tag
name in all uppercase. Use the `toLowerCase` or `toUpperCase` string
method to compensate for this.
@!234ece1b066248e9859f52bc342b05dda24af5b5

{{if interactive
@!a053946fff3be4c028dff029c58329a080c7cf55

```{lang: "text/html", test: no}
<h1>Heading with a <span>span</span> element.</h1>
<p>A paragraph with <span>one</span>, <span>two</span>
  spans.</p>

<script>
  function byTagName(node, tagName) {
    // Your code here.
  }

console.log(byTagName(document.body, "h1").length);
  // → 1
  console.log(byTagName(document.body, "span").length);
  // → 3
  var para = document.querySelector("p");
  console.log(byTagName(para, "span").length);
  // → 2
</script>
```
@!cc22e790e1417c3e93191b99f5f7ed2571d88868

if}}
@!52ab271f9cc780dd5fb0cfb53ecb9202f7d83dda

{{hint
@!26995752d9377018e0d3e1bc4ee3a144eec00f70

{{index "getElementsByTagName method", recursion}}
@!ff957605e87ee065620952eace5928f2e6aca2c3

The solution is most
easily expressed with a recursive function, similar to the
[`talksAbout` function](13_dom.html#talksAbout) defined earlier in
this chapter.
@!726f4cf3ef7e383f34eef346aabce0303e11e923

{{index concatenation, "concat method", closure}}
@!8981128635b8d3c67b4938e97fddc0684dda3cfc

You could call
`byTagname` itself recursively, concatenating the resulting arrays to
produce the output. For a more efficient approach, define an inner
function that calls itself recursively and that has access to an
array variable defined in the outer function to which it can add the
matching elements it finds. Don't forget to call the ((inner
function)) once from the outer function.
@!f88f88b203c4773270f21ec6cf2fad6c85fa874c

{{index "nodeType property", "ELEMENT_NODE code"}}
@!fd8231399c22324ac9260c243c8916548b7071a2

The recursive function
must check the node type. Here we are interested only in node type 1
(`document.ELEMENT_NODE`). For such nodes, we must loop over their
children and, for each child, see whether the child matches the query while also doing
a recursive call on it to inspect its own children.
@!e7a4d41a46cabd3101072c504724a7e010463bd8

hint}}
@!8ddb0dd74518dd4a4e46a761c033c3005f5a527f

### The cat's hat
@!f77747fecc11e0b9360b65450de2ac3f34097172

{{index "cat's hat (exercise)"}}
@!76a3278be907f5a75d290a6ece7332c6f1e03e51

Extend the cat ((animation)) defined
[earlier](13_dom.html#animation) so that both the cat and his hat
(`<img src="img/hat.png">`) orbit at opposite sides of the ellipse.
@!d247a5bf04c226f030260949ffc0a469d4eb99e6

Or make the hat circle around the cat. Or alter the animation in some
other interesting way.
@!c8e78bb8b12f2809c4c0eed28f04616a5f85cd00

{{index "absolute positioning", "top (CSS)", "left (CSS)", "position (CSS)"}}
@!47fd6311d5354bea644a5e17bbb773d4873915b7

To make positioning multiple objects easier, it is probably a
good idea to switch to absolute positioning. This means that `top` and
`left` are counted relative to the top left of the document. To avoid
using negative coordinates, you can simply add a fixed number of
pixels to the position values.
@!258946cd9ddd8132acd6a8ebe34b9e1e18bbb8e3

{{if interactive
@!a29a6347996dba7796ce8da7be77397b6d165a3c

```{lang: "text/html", test: no}
<img src="img/cat.png" id="cat" style="position: absolute">
<img src="img/hat.png" id="hat" style="position: absolute">

<script>
  var cat = document.querySelector("#cat");
  var hat = document.querySelector("#hat");
  // Your code here.
</script>
```
@!4b47be48c2f8e336f566cd6a5a0783e4feee7b4c

if}}
@!ea458eb3c544264e0c08f1a002c6e95ae2ee3c94