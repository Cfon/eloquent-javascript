{{meta {chap_num: 3, prev_link: 02_program_structure, next_link: 04_data}}}
@!6de7415add9d67f2a0e5afd764f02abc3202d98b

# Functions
@!5659a916a81fcdf2e250de3517bd147f2a1ab8b0

{{quote {author: "Donald Knuth", chapter: true}
@!0b104cb84c1b7e74ce7dcc39e984f8e7badfba77

People think that computer science is the art of
geniuses but the actual reality is the opposite, just many people
doing things that build on each other, like a wall of mini stones.
@!49fc49e7b2320b4d97e83f655791a0a6e165152f

quote}}
@!07ba88d6ef84b3bcfecef1b3de6922192fc6856c

{{index "Knuth, Donald", function, "code structure"}}
@!a4407cf86182b2d62c7f7791be599724e40823e0

Functions are the bread and butter of JavaScript programming. The
concept of wrapping a piece of program in a value has many uses. It is
a tool to structure larger programs, to reduce repetition, to
associate names with subprograms, and to isolate these subprograms
from each other.
@!6f9d0693086bc8f520a19746811bf7caa669c4d3

{{index "human language"}}
@!08ca311eb62f8a546010ee960eb728ae30589688

The most obvious application of functions is defining new
((vocabulary)). Creating new words in regular, human-language prose is
usually bad style. But in programming, it is indispensable.
@!6993ddb05abe3d6512d123f7dc8668fe01163d52

{{index abstraction}}
@!2799e522ee9cc3988aed6662898aa73e641c848a

Typical adult English speakers have some 20,000 words in their
vocabulary. Few programming languages come with 20,000 commands built
in. And the vocabulary that _is_ available tends to be more precisely
defined, and thus less flexible, than in human language. Therefore, we
usually _have_ to add some of our own vocabulary to avoid repeating
ourselves too much.
@!9a62ebaea0309a8e3cfe151e855a158621b78224

## Defining a function
@!b20c24f5d590c37c17ce8448ad462e15449d9f18

{{index "square example", [function, definition]}}
@!e69035ace72b2eb7e854b9cd94feb28d7e3b4f21

A function definition is just a regular ((binding)) definition where
the value given to the binding happens to be a function. For example,
the following code defines `square` to refer to a function that
produces the square of a given number:
@!94fc7c765071d6710ab47bc88b95a4eaef4a82a1

```
const square = function(x) {
  return x * x;
};

console.log(square(12));
// → 144
```
@!6804f830188797015d6036cb0df905a01e4ca7d8

{{indexsee braces, "curly braces"}}
@!1661851a59b85ee6ba66d6c025c1e1f9767bc199

{{index "curly braces", block, syntax, "function keyword", [function, body], [function, "as value"]}}
@!1d06af1a64fd000e10bd5bcbc51da38d5e628cde

A function is created by an expression that starts with the keyword
`function`. Functions have a set of _((parameter))s_ (in this case,
only `x`) and a _body_, which contains the statements that are to be
executed when the function is called. The function body must always be
wrapped in braces, even when it consists of only a single
((statement)).
@!d9acb6f6a6c0c43c1f4212831364ce75145b17f7

{{index "power example"}}
@!ce728566494e605303d891c75d688ea384fafe5a

A function can have multiple parameters or no parameters at all. In
the following example, `makeNoise` does not list any parameter names,
whereas `power` lists two:
@!cdf2f22be5c6e32de26f0f3f0f168fedfd4823ac

```
const makeNoise = function() {
  console.log("Pling!");
};

makeNoise();
// → Pling!

const power = function(base, exponent) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};

console.log(power(2, 10));
// → 1024
```
@!1ae26c9612893edc8db50a7e4d94c5a40fba7142

{{index "return value", "return keyword", undefined}}
@!9973de74baf29ccbae566a5945174d4a7df11b8c

Some functions produce a value, such as `power` and `square`, and some
don't, such as `makeNoise`, which produces only a ((side effect)). A
`return` statement determines the value the function returns. When
control comes across such a statement, it immediately jumps out of the
current function and gives the returned value to the code that called
the function. A `return` keyword without an expression after it will
cause the function to return `undefined`.
@!bc143a0d375b7f2920fe81b3a36671fefb8e7e7d

## Parameters and scopes
@!edf23846e8079cfee1cb4630206826c96acb8775

{{index parameter, [function, application], [binding, "from parameter"]}}
@!5b09e2e44dc283051ad3803cc3570f08ae85a588

Parameters to a function behave like regular bindings, but their
initial values are given by the _caller_ of the function, not the code
in the function itself.
@!a2cc6c5cceb19bd0512fc8fc71f66e0628b304b9

{{indexsee "top-level scope", "global scope"}}
@!886b083c4b6751cd039ef175d92c68c0e1a2c758

{{index "var keyword", "global scope", [binding, global], [binding, "scope of"]}}
@!db60d1b7bb1c8b79397c8d69e4bd07e88d0ca006

Each ((binding)) has a _((scope))_, which is the part of the program
in which the binding is visible. For bindings defined outside of any
function or block, the scope is the whole program—you can refer to
them wherever you want. These are called _global_.
@!d1f8527bebba01a4cc461a257f0453d08bc906bc

{{index "local scope", [binding, local]}}
@!6ac1529745b8cbce9cd2cbd3825c49218256ecc2

But bindings created for function ((parameter))s or declared inside a
function can only be referenced in that function. These are called
_local_. Every time the function is called, new instances of these
bindings are created. This provides some isolation between
functions—each function call acts in its own little world (its local
environment), and can often be understood without knowing a lot about
what's going on in the global environment.
@!91e36b05791fa3d98d55c1999838228dc1f4a4b1

{{index "let keyword", "const keyword", "var keyword"}}
@!b75060a676384ec77cff7e610894ecc7e75cacb8

Bindings declared with `let` and `const` are in fact local to the
_((block))_ that they are declared in, so if you create one of those
inside of a loop, the code before and after the loop can not "see" it.
In pre-2015 JavaScript, only functions created new scopes, so
old-style bindings, created with the `var` keyword, are visible
throughout the whole function that they appear in—or throughout the
global scope, if they are not in a function.
@!f98c5cb74d0acfdb82edb28557fa4eb1ebffdfa9

```
let x = 10;
if (true) {
  let y = 20;
  var z = 30;
  console.log(x + y + z);
  // → 60
}
// y is not visible here
console.log(x + z);
// → 40
```
@!76487fddfd7b7366142ca267e846c64e3492529c

{{index [binding, visibility]}}
@!676a41c79dc753cab9946574daf06d2bf846acb2

Each ((scope)) can "look out" into the scope around it, so `x` is
visible inside the block in the example. The exception is when
multiple bindings have the same name—in that case, code can only see
the innermost one. For example, when the code inside the `halve`
function refers to `n`, it is seeing its _own_ `n`, not the global
`n`.
@!d22c5f5dd76397bc638f78da32c9d1bcd5719736

```
const halve = function(n) {
  return n / 2;
};

let n = 10;
console.log(halve(n * 2));
// → 10
```
@!a4094f8299d960eec67fda3f57fb67484307e3b6

{{id scoping}}
@!b1c15fe175a6af44ffd101c305c2332ffb2caef8

## Nested scope
@!008869c3c3141c17f766337f0537b47894931f1c

{{index [nesting, "of functions"], [nesting, "of scope"], scope, "inner function", "lexical scoping"}}
@!cc68ef010053c066589b35fa925b04259a8a2094

JavaScript distinguishes not just between _global_ and _local_
bindings. Blocks and functions can be created inside other blocks and
functions, producing multiple degrees of locality.
@!9cc9ac00184525a432f87eab411ab0de60acbfab

{{index "landscape example"}}
@!7e211734e305c5687961ce058458e46d0dca37f4

For example, this rather nonsensical function has two functions inside
of it:
@!fa419c67f8443faa6dd75bcd9b856ceac3d9cd1b

```
const landscape = function() {
  let result = "";
  const flat = function(size) {
    for (let count = 0; count < size; count++) {
      result += "_";
    }
  };
  const mountain = function(size) {
    result += "/";
    for (let count = 0; count < size; count++) {
      result += "‾";
    }
    result += "\\";
  };
 
  flat(3);
  mountain(4);
  flat(5);
  mountain(1);
  flat(2);
  return result;
};

console.log(landscape());
// → ___/‾‾‾‾\_____/‾\__
```
@!1307af55670b175f5b071a26b432e337c5d18f44

{{index [function, scope], scope}}
@!9e9664d42fb7cc3d68de66aaa67e69427da46e31

The `flat` and `mountain` functions can see the binding called
`result`, since they are inside the function that defines it. But they
cannot see each other's `count` bindings since they are outside each
other's scope. The environment outside of the `landscape` function
doesn't see any of these bindings.
@!bdc3ac01944480bca64713ee148764da803826a7

In short, each local scope can also see all the local scopes that
contain it. The set of bindings visible inside a block is determined
by the place of that block in the program text. All bindings from
blocks _around_ it are visible—both those in blocks that enclose it
and those at the top level of the program. This approach to binding
visibility is called _((lexical scoping))_.
@!85888d80f348ca5f6498cd188dff7ddbcab1e6d0

## Functions as values
@!0d5eee9bd5385459d8f472e21b22a3073c6ec6e2

{{index [function, "as value"]}}
@!00b3038e4215012b6345c7fad3606398d24a275f

Function ((binding))s usually simply act as names for a specific piece
of the program. Such a binding is defined once and never changed. This
makes it easy to start confusing the function and its name.
@!5791c16d3521d33a65c3ce115875ae295ab628cd

{{index [binding, assignment]}}
@!d0d001119a77f4929039d04832680c18c03e4524

But the two are different. A function value can do all the things that
other values can do—you can use it in arbitrary ((expression))s, not
just call it. It is possible to store a function value in a new
binding, pass it as an argument to a function, and so on. Similarly, a
binding that holds a function is still just a regular binding and can
be assigned a new value, like so:
@!8a7c628cc7a36411bdfc65428b00d9532c442338

```{test: no}
let launchMissiles = function() {
  missileSystem.launch("now");
};
if (safeMode) {
  launchMissiles = function() {/* do nothing */};
}
```
@!9c1dbac7fdc72ed5b4b3284df294da1f74360619

{{index [function, "higher-order"]}}
@!54404d37f6d51f5ce9aee21f7f934c725f665d63

In [Chapter 5](05_higher_order.html#higher_order), we will discuss the
wonderful things that can be done by passing around function values to
other functions.
@!d91795ab5bca79057a2d5199b3c13423ef63d70a

## Declaration notation
@!580c1f565ddcfa20d6f9994ac2ee89635ef3a68b

{{index syntax, "function keyword", "square example", [function, definition], [function, declaration]}}
@!1ab18ab147168caf1f471f34ae23eaa696b94fcc

There is a slightly shorter way to create a function binding. When the
`function` keyword is used at the start of a statement, it works
differently.
@!030da63161aa8f4e7f3b84ec873c211a883005e4

```{test: wrap}
function square(x) {
  return x * x;
}
```
@!c9113ea53f29d2441f5dc3884fd2c0dced427c60

{{index future, "execution order"}}
@!f8e952e5aedfe438d1832daabf07c556c0a88545

This is a function _declaration_. The statement defines the binding
`square` and points it at the given function. This is slightly easier
to write, and doesn't require a semicolon after the function. There is
one subtlety with this form of function definition.
@!0c06c4c887cdc8f4aaccd305595bb56016b79557

```
console.log("The future says:", future());

function future() {
  return "We STILL have no flying cars.";
}
```
@!1079a4262c1882829db84e668c0a011b9ed3559c

This code works, even though the function is defined _below_ the code
that uses it. Function declarations are not part of the regular
top-to-bottom flow of control. They are conceptually moved to the top
of their scope and can be used by all the code in that scope. This is
sometimes useful because it gives us the freedom to order code in a
way that seems meaningful, without worrying about having to define all
functions above their first use.
@!133437a43c4df9fc97bcd6d5b774bc06c486fb43

## Arrow functions
@!cd728e3862e99017a32beb45f3cef4a4615bf0ca

{{index function, "arrow function"}}
@!50b71fd63a982cff612cfd166bbd4fbaa6d9ff29

There's a third notation for functions, which looks very different
from the others. Instead of the `function` keyword, it uses an arrow
(`=>`) made up of equals and greater than characters (not to be
confused with the greater-than-or-equal operator, which is written
`>=`).
@!15a71f470dd9b660bdfd6a707e8b0d3b84b93c81

```{test: wrap}
const power = (base, exponent) => {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};
```
@!eec55addb0827632712e6f48b5903bc4467fa89d

{{index [function, body], parameter}}
@!ced2b871a946604a3453e1a5dbde725c152ba69c

The arrow comes _after_ the list of parameters, and is followed by the
function's body. It expresses something like "this input (parameters)
produces this output (body)".
@!e58e9d81fcb80b42baee8d1b45635173f9f42780

{{index "curly braces", "square example"}}
@!a8f3da27343e0b3686566dab30c8095f405a42f5

When there is only one parameter name, the ((parentheses)) around the
parameter list can be omitted. If the body is a single expression,
rather than a ((block)) in braces, that expression will be returned
from the function. So these two definitions of `square` do the same
thing:
@!21df30873349498a2c743d943af91259e6d245c3

```
const square1 = (x) => { return x * x; };
const square2 = x => x * x;
```
@!1c148a490c77240998b2a767d228b9278daee89b

When an arrow function has no parameters at all, its parameter list is
just an empty set of ((parentheses)).
@!2e5fff2ca7101a939f6e364b54276ebfc6a9a592

```
const horn = () => {
  console.log("Toot");
};
```
@!69a80461e0dc94357e0e6562bc76cb2eeef1bb88

{{index verbosity}}
@!ec531e2549ef4cef38b4e32e56d6ed569e964483

Arrow functions are a relatively recent addition to the language, and
their main use is to allow simple function expressions to be less
verbose. We'll be using a lot of them in [Chapter
5](05_higher_order.html).
@!f4dac3646909eb9b579fe28cecca4336fb5a63e8

{{id stack}}
@!0bf021d3973d60becb92d9f49d3a249db6fc4c35

## The call stack
@!428961d34126a77e4bff96517a0036a14d9e374b

{{indexsee stack, "call stack"}}
@!c74308b640775940a743d884d0450563e4510594

{{index "call stack", [function, application]}}
@!1c0e1af0fb677e6c84a1c87bd2ac2c4db46c8fa8

The way control flows through functions is somewhat involved. Let's
take a closer look at it. Here is a simple program that makes a few
function calls:
@!eaf30e1ee4cf1d6b3e39bdbe96b57b8e738da258

```
function greet(who) {
  console.log("Hello " + who);
}
greet("Harry");
console.log("Bye");
```
@!34716ddf81e8b37f346d6cdfb002eb86d2404b26

{{index "control flow", "execution order", "console.log"}}
@!0b727dde1a7c100393137baa70408a7b75d749c3

A run through this program goes roughly like this: the call to `greet`
causes control to jump to the start of that function (line 2). It
calls `console.log` (a built-in browser function), which takes
control, does its job, and then returns control to line 2. There it
reaches the end of the `greet` function, so it returns to the place
that called it, which is line 4. The line after that calls
`console.log` again. After that returns, the program reaches its end.
@!5101a13b8c72de74efe46618f32c7805cceb6425

We could show the flow of control schematically like this:
@!303a282dadd836fc1f8e8e3384a1e1afa48e9e77

```{lang: null}
top
   greet
        console.log
   greet
top
   console.log
top
```
@!e026bfe97877049cd89ab075f4cf269c9d3bf1cc

{{index "return keyword", memory}}
@!0a5ea08a5a47c0fc22eeb5d77a894d29d92bf525

Because a function has to jump back to the place that called it when
it returns, the computer must remember the context from which the call
happened. In one case, `console.log` has to jump back to the `greet`
function. In the other case, it jumps to the end of the program.
@!d6b30495e33382d21d960f80d5f8b9283ce416b3

The place where the computer stores this context is the _((call
stack))_. Every time a function is called, the current context is
stored on top of this “stack”. When the function returns, it removes
the top context from the stack and uses it to continue execution.
@!02c85f36d0fc509a8d6f587a1777a3d93f204b42

{{index "infinite loop", "stack overflow", recursion}}
@!d3f210c1d9c79940baa72243ef85d8ec2b9802db

Storing this stack requires space in the computer's memory. When the
stack grows too big, the computer will fail with a message like “out
of stack space” or “too much recursion”. The following code
illustrates this by asking the computer a really hard question, which
causes an infinite back-and-forth between two functions. Rather, it
_would_ be infinite, if the computer had an infinite stack. As it is,
we will run out of space, or “blow the stack”.
@!fbb9ad837bc7bd94be6a9ed6bcd6ebf876058ee4

```{test: no}
function chicken() {
  return egg();
}
function egg() {
  return chicken();
}
console.log(chicken() + " came first.");
// → ??
```
@!77674dbc07cadacf775a4a06738dd9cb6eafc702

## Optional Arguments
@!faa385a981f94d6a5ee8ae46f76327428e574e16

{{index argument, [function, application]}}
@!55af55b43cf40570f9fceb2412ddb82585968d5f

The following code is allowed and executes without any problem:
@!74470d43cf094db7e8f87451a9f9d4f0702534fe

```
console.log(square(4, true, "hedgehog"));
// → 16
```
@!1f6314b9a510856b25b26b90afa451c4d4d7c5ef

We defined `square` with only one ((parameter)). Yet when you call it
like this, it doesn't complain. It ignores the extra arguments and
computes the square of the first one.
@!22d2a1d68d3fb6ef5bf8330213059e0b37a804b1

{{index undefined}}
@!1ff9c1f3ac3f29dfa7d450fda01f8c2432ae4c85

JavaScript is extremely broad-minded about the number of arguments you
pass to a function. If you pass too many, the extra ones are ignored.
If you pass too few, the missing parameters get assigned the value
`undefined`.
@!9c31821b07dd9bc42ad5d07127d9c7ebba2e1811

The downside of this is that it is possible—likely, even—that you'll
accidentally pass the wrong number of arguments to functions. And no
one will tell you about it.
@!2bd0ce8c9dcbdae02175700ada18be06e274e9fb

The upside is that this behavior can be used to allow a function to be
called with different amounts of arguments. For example this `minus`
function tries to imitate the `-` operator by acting on either one or
two arguments.
@!9fd62dfda607c45b9b546b4aa3bc648a835412b4

```
function minus(a, b) {
  if (b === undefined) return -a;
  else return a - b;
}

console.log(minus(10));
// → -10
console.log(minus(10, 5));
// → 5
```
@!9f80e1e85a96eb5751bcbd0900f27b4c157438c2

{{id power}}
@!9cdec741693fe980cb4f7fda749dce2eba64223e

{{index "optional argument", "default value", parameter, "= operator"}}
@!23f0791e2a1d5a027de52bd0f8ae364c8357ecdc

Often, when a function allows you to omit some arguments, those will
get default values when not given. If you write an `=` operator after
a parameter, followed by an expression, the value of that expression
will replace the argument when it is not given.
@!acfa087246ae33c076089bca1f64942ca8a1e1fc

{{index "power example"}}
@!d99872ff618fb896eb432a5e305008f72b4d60b1

For example, this version of `power` makes its second argument
optional. If you don't provide it, it will default to two and the
function will behave like `square`.
@!0ac6307e73ccac39b4e305e594b91df101ed6b65

```{test: wrap}
function power(base, exponent = 2) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
}

console.log(power(4));
// → 16
console.log(power(2, 6));
// → 64
```
@!9bee5077ef9818fd966ea2f306192ab4ef3b1b79

{{index "console.log"}}
@!572a7a36e00bcadbaa2dd1efefac635f3c420926

In the [next chapter](04_data.html#rest_parameters), we will see a way
in which a function body can get at the whole list of arguments it was
passed. This is helpful because it makes it possible for a function to
accept any number of arguments. For example, `console.log` makes use
of this—it outputs all of the values it is given.
@!c77025465309873fc9607bfed38ab1fd434837d7

```
console.log("C", "O", 2);
// → C O 2
```
@!c50bb8fc4f836d7e8d4088b82d328ecea2f5179b

## Closure
@!28a21fd2c80d7871d6ae944fa3e14e27a49d18a2

{{index "call stack", "local binding", [function, "as value"], scope}}
@!01bf6fe350ce40901849661f0ddfb321d0319518

The ability to treat functions as values, combined with the fact that
local bindings are “re-created” every time a function is called,
brings up an interesting question. What happens to local bindings when
the function call that created them is no longer active?
@!ba58bf9b69ae37d99e501124c5bb8d9f77ffd0c2

The following code shows an example of this. It defines a function,
`wrapValue`, which creates a local binding. It then returns a function
that accesses and returns this local binding.
@!322519681336cc6d271e79c881ffc46199541da6

```
function wrapValue(n) {
  let local = n;
  return () => local;
}

var wrap1 = wrapValue(1);
var wrap2 = wrapValue(2);
console.log(wrap1());
// → 1
console.log(wrap2());
// → 2
```
@!2dd99a32984cbbef941f9ae5b8751ff40da05856

This is allowed and works as you'd hope—both instances of the binding
can still be accessed. This is a good illustration of the concept that
local bindings are re-created for every call, and different calls
can't trample on one another's local bindings.
@!014e0de3cb67ed840514d253bbdf7e02d0978b47

This feature—being able to reference a specific instance of local
bindings in an enclosing function—is called _((closure))_. A function
that “closes over” some local bindings is called _a_ closure. This
behavior not only frees you from having to worry about lifetimes of
bindings but also allows for some creative use of function values.
@!c474887d344f0a182efb85f00fb21be93ae24868

{{index "multiplier function"}}
@!86baa023d3484d4afc3aa14dd26760c83721da16

With a slight change, we can turn the previous example into a way to
create functions that multiply by an arbitrary amount.
@!9e412009aaac36972083ee7c5e888cc15ddefd98

```
function multiplier(factor) {
  return number => number * factor;
}

var twice = multiplier(2);
console.log(twice(5));
// → 10
```
@!3b575980e491941d3c492bd60f4a89f0c44519d1

{{index [binding, "from parameter"]}}
@!6057abb573607baf65b2348a59f98d63c0daa59c

The explicit `local` binding in the `wrapValue` example isn't really
needed since a parameter is itself a local binding.
@!c8f6cdea16bd19aa6fc55c3a841e8f9b803ef53c

{{index [function, "model of"]}}
@!62fe9f1e45c1f19044cd84eea968768aca541761

Thinking about programs like this takes some practice. A good mental
model is to think of function values as containing both the code in
their body and the environment in which they are created. When called,
the function body sees the original environment in which the function
value was created, not the environment in which the call is made.
@!ab990d1675c024684428bf6e878facf267df86dd

In the example, `multiplier` is called, and creates an environment in
which its `factor` parameter is bound to 2. The function value it
returns, which is stored in `twice` remembers this environment. So
when that is called, it'll multiply its argument by 2.
@!3a678c7c1a34bbbe4355eceaab202f19320f42ee

## Recursion
@!18c7eea00ed50a3f683c375ae39fe8e7ce197f1c

{{index "power example", "stack overflow", recursion, [function, application]}}
@!843f056c28e4b4373853d26f03d32487bc829361

It is perfectly okay for a function to call itself, as long as it
takes care not to overflow the stack. A function that calls itself is
called _recursive_. Recursion allows some functions to be written in a
different style. Take, for example, this alternative implementation of
`power`:
@!a67785b958848c72c55f47bd09aa519b4b2d91da

```{test: wrap}
function power(base, exponent) {
  if (exponent == 0) {
    return 1;
  } else {
    return base * power(base, exponent - 1);
  }
}

console.log(power(2, 3));
// → 8
```
@!7a6759877c43e98a478127525d40186c22cec544

{{index loop, readability, mathematics}}
@!2b313be861cb3826e1745df9c128a0370b48202e

This is rather close to the way mathematicians define exponentiation
and arguably describes the concept in a more clearly way than the
looping variant does. The function calls itself multiple times with
ever smaller exponents to achieve the repeated multiplication.
@!af06ea960a48e2cf4e80bdf336b9c0dcd77dd45c

{{index [function, application], efficiency}}
@!7cd100584fb862441abc5564e5d8edd4c54c03b5

But this implementation has one problem: in typical JavaScript
implementations, it's about 3 times slower than the looping version.
Running through a simple loop is generally cheaper than calling a
function multiple times.
@!a2defbd10f011c27302479e99bb95cc80c81115a

{{index optimization}}
@!3a0d3da58e78c5bd31f2ace34f83cf2cb61d855f

The dilemma of speed versus ((elegance)) is an interesting one. You
can see it as a kind of continuum between human-friendliness and
machine-friendliness. Almost any program can be made faster by making
it bigger and more convoluted. The programmer must decide on an
appropriate balance.
@!f0ab51b473b0379e3081ae5f72d76e88aa4f0ef0

In the case of the [earlier](03_functions.html#power) `power`
function, the inelegant (looping) version is still fairly simple and
easy to read. It doesn't make much sense to replace it with the
recursive version. Often, though, a program deals with such complex
concepts that giving up some efficiency in order to make the program
more straightforward is a good idea.
@!50fd3daf964eccfe412928109bed204cdd238c49

{{index profiling}}
@!71b8418f39cd882f03dea7ee6d5fc4c66917a9c3

Worrying about efficiency can be a distraction. It's yet another
factor that complicates program design, and when you're doing
something that's already difficult, that extra thing to worry about
can be paralyzing.
@!5517b305420a02b21fa435fcc91f69dc98fa5843

{{index "premature optimization"}}
@!911c261d251d47a65b0f191fbc3b13362d3f37f9

Therefore, always start by writing something that's correct and easy
to understand. If you're worried that it's too slow—which is usually
isn't, since most code simply isn't executed often enough to take any
significant amount of time—you can measure afterwards, and improve it
if necessary.
@!c4e401f142d469662d6f75543b2efb3c01a3fa25

{{index "branching recursion"}}
@!b64d21865066289da287d882deae1dbb2938fde2

Recursion is not always just a inefficient alternative to looping.
Some problems are really easier to solve with recursion than with
loops. Most often these are problems that require exploring or
processing several “branches”, each of which might branch out again
into more branches.
@!5807808e82cfbbf388deff2f37137754e0e143be

{{id recursive_puzzle}}
@!d4dc2e68ed2f3427f9298a2dcbac716ea7cc28c0

{{index recursion, "number puzzle example"}}
@!d0504e2ba52af728290352f1693648bd3e80c7f4

Consider this puzzle: by starting from the number 1 and repeatedly
either adding 5 or multiplying by 3, an infinite amount of new numbers
can be produced. How would you write a function that, given a number,
tries to find a sequence of such additions and multiplications that
produce that number?
@!6b1901fa70a98726df37340725711255ad1fb147

For example, the number 13 could be reached by first multiplying by 3
and then adding 5 twice, whereas the number 15 cannot be reached at
all.
@!2f04adbf8728c68e8618556abf377dee929b292a

Here is a recursive solution:
@!49c6348612fc7f50127cac6846fb4e946779248b

```
function findSolution(target) {
  function find(current, history) {
    if (current == target) {
      return history;
    } else if (current > target) {
      return null;
    } else {
      return find(current + 5, `(${history} + 5)`) ||
             find(current * 3, `(${history} * 3)`);
    }
  }
  return find(1, "1");
}

console.log(findSolution(24));
// → (((1 * 3) + 5) * 3)
```
@!be5966fb8d2049e0e2a2242f0b68efeb790c3336

Note that this program doesn't necessarily find the _shortest_
sequence of operations. It is satisfied when it finds any sequence at
all.
@!e80751fb699d5190859ad77d4b1230189c3a79de

I don't expect you to see how it works right away. But let's work
through it, since it makes for a great exercise in recursive thinking.
@!84c3fc3484fd1f795e9c67a4de49c89bc03a5ee8

The inner function `find` does the actual recursing. It takes two
((argument))s, the current number and a string that records how we
reached this number. And if it finds a solution, it returns a string
that shows how to get to the target. If no solution could be found
starting from this number, it returns `null`.
@!9c913bda84e605d4206288257f576da919c64051

{{index null, "|| operator", "short-circuit evaluation"}}
@!f4c6c55305cb1ccc6f41f2f4a0fee03b2e2692f5

To do this, the function performs one of three actions. If the current
number is the target number, the current history is a way to reach
that target, so it is returned. If the current number is greater than
the target, there's no sense in further exploring this history since
both adding and multiplying will only make the number bigger, so it
returns `null`. And finally, if we're still below the target number,
the function tries both possible paths that start from the current
number by calling itself twice, once for each of the possible steps.
If the first call returns something that is not `null`, it is
returned. Otherwise, the second call is returned—regardless of whether
it produces a string or `null`.
@!9bc691f70d94803d72449679709048a79a12992b

{{index "call stack"}}
@!f8f3b3e33a1bddac046cea40f022812d3a120430

To better understand how this function produces the effect we're
looking for, let's look at all the calls to `find` that are made when
searching for a solution for the number 13.
@!ffc6db30b242239c42e8e88b8ed465cb6c789644

```{lang: null}
find(1, "1")
  find(6, "(1 + 5)")
    find(11, "((1 + 5) + 5)")
      find(16, "(((1 + 5) + 5) + 5)")
        too big
      find(33, "(((1 + 5) + 5) * 3)")
        too big
    find(18, "((1 + 5) * 3)")
      too big
  find(3, "(1 * 3)")
    find(8, "((1 * 3) + 5)")
      find(13, "(((1 * 3) + 5) + 5)")
        found!
```
@!220e1920beccbbd65d4889260c3c21907c393754

The indentation indicates the depth of the call stack. The first time
`find` is called first calls itself to explore the solution that
starts with `(1 + 5)`. That call will further recurse to explore
_every_ continued solution that yields a number less than or equal to
the target number. Since it doesn't find one that hits the target, it
returns `null` back to the first call. There the `||` operator causes
the call that explores `(1 * 3)` to happen. This search has more
luck—its first recursive call, through yet _another_ recursive call,
hits upon the target number, 13. This innermost call returns a string,
and each of the `||` operators in the intermediate calls pass that
string along, ultimately returning the solution.
@!e6ab6d28b27d7016b1c215991d07d4bdcbfc3bf9

## Growing functions
@!a281efb2bd6e6cefb32c56a6b3cadaa2b235c2fc

{{index [function, definition]}}
@!b23c0b54a3cd6fddcf2b9326883e776e0182ff95

There are two more or less natural ways for functions to be introduced
into programs.
@!fdb74626d15885b5c86bea398b62eb1dbd3846ee

{{index repetition}}
@!a4c289bfb3538a550e79c72b8a9669d8b540a6b9

The first is that you find yourself writing very similar code multiple
times. We want to avoid doing that. Having more code means more space
for mistakes to hide and more material to read for people trying to
understand the program. So we take the repeated functionality, find a
good name for it, and put it into a function.
@!ae3ed446508335431948d4aa51d278a46b6afbba

The second way is that you find you need some functionality that you
haven't written yet and that sounds like it deserves its own function.
You'll start by naming the function, and you'll then write its body.
You might even start writing code that uses the function before you
actually define the function itself.
@!d0c54f70ac2a8d1c725cb22a91cb23c54821883f

{{index [function, naming], [binding, naming]}}
@!c6a2b6cad1109bc24af0290685d8900411329fa5

How difficult it is to find a good name for a function is a good
indication of how clear a concept it is that you're trying to wrap.
Let's go through an example.
@!806d1b44fdcd77c34f29c6de87f11c810c1cd19e

{{index "farm example"}}
@!9d7cb0d5654304cfe971d15376a3f066dd99b3c1

We want to write a program that prints two numbers, the numbers of
cows and chickens on a farm, with the words `Cows` and `Chickens`
after them, and zeros padded before both numbers so that they are
always three digits long.
@!5ac39c50056b0506e67f7c74d4625e3e7f3efbcd

```{lang: null}
007 Cows
011 Chickens
```
@!a7d37707697b28a6a17025c970e7428ac8824ccf

This clearly asks for a function of two arguments. Let's get coding.
@!2ae458e850fedd6c80230e0b8722a76cddbaa98a

```
function printFarmInventory(cows, chickens) {
  let cowString = String(cows);
  while (cowString.length < 3) {
    cowString = "0" + cowString;
  }
  console.log(`${cowString} Cows`);
  let chickenString = String(chickens);
  while (chickenString.length < 3) {
    chickenString = "0" + chickenString;
  }
  console.log(`${chickenString} Chickens`);
}
printFarmInventory(7, 11);
```
@!8cf072de472601d938dffdba92a01a9f21ca9962

{{index ["length property", "for string"], "while loop"}}
@!c88b57de579ca729abf00c9ba281cf82562f885c

Adding `.length` after a string value will give us the length of that
string. Thus, the `while` loops keep adding zeros in front of the
number strings until they are at least three characters long.
@!bcadd0f371441ffb99bb50c761a7ccd611d1ec68

Mission accomplished! But just as we are about to send the farmer the
code (along with a hefty invoice), she calls and tells us she's also
started keeping pigs, and couldn't we please extend the software to
also print pigs?
@!082d7ca8ab4bef7ea988b7bec3ed315a13382553

{{index "copy-paste programming"}}
@!c5b355847d66e4822962d54431a28032e0adde51

We sure can. But just as we're in the process of copying and pasting
those four lines one more time, we stop and reconsider. There has to
be a better way. Here's a first attempt:
@!acf4dfd7d0231b6736d1a53554d4daef80dbffd7

```
function printZeroPaddedWithLabel(number, label) {
  let numberString = String(number);
  while (numberString.length < 3) {
    numberString = "0" + numberString;
  }
  console.log(`${numberString} ${label}`);
}

function printFarmInventory(cows, chickens, pigs) {
  printZeroPaddedWithLabel(cows, "Cows");
  printZeroPaddedWithLabel(chickens, "Chickens");
  printZeroPaddedWithLabel(pigs, "Pigs");
}

printFarmInventory(7, 11, 3);
```
@!4ba1e326086fba216cef6a3ff428c41bb8b39bb2

{{index [function, naming]}}
@!3b0550dbbe02ccb3105ffd0ebb2e540fcd32608f

It works! But that name, `printZeroPaddedWithLabel`, is a little
awkward. It conflates three things—printing, zero-padding, and adding
a label—into a single function.
@!2fc18d967e26fe54148f9e903fd205260be4cc84

{{index "zeroPad function"}}
@!4239602f2d8c3a24f3ae5031939f6c7e48987923

Instead of lifting out the repeated part of our program wholesale,
let's try to pick out a single _concept_.
@!f596846a5f0e73501c78ca9fec861da97b36f1bb

```
function zeroPad(number, width) {
  let string = String(number);
  while (string.length < width) {
    string = "0" + string;
  }
  return string;
}

function printFarmInventory(cows, chickens, pigs) {
  console.log(`${zeroPad(cows, 3)} Cows`);
  console.log(`${zeroPad(chickens, 3)} Chickens`);
  console.log(`${zeroPad(pigs, 3)} Pigs`);
}

printFarmInventory(7, 16, 3);
```
@!b91fb54e61c4b45c7a0dbb509f5930c03014e1c6

{{index readability, "pure function"}}
@!da71d301baecfe20ece616913901f094f869a442

A function with a nice, obvious name like `zeroPad` makes it easier
for someone who reads the code to figure out what it does. And such a
function is useful in more situations than just this specific program.
For example, you could use it to help print nicely aligned tables of
numbers.
@!004d8f8215677313f28f62688a6401d1d24c7caa

{{index [interface, design]}}
@!50fd8d31efbb0160d0fbea64a7d2279cdf586dcc

How smart and versatile _should_ our function be? We could write
anything from a terribly simple function that simply pads a number so
that it's three characters wide to a complicated generalized
number-formatting system that handles fractional numbers, negative
numbers, alignment of decimal dots, padding with different characters,
and so on.
@!e9e98fa67afcffcd42176e7c0e7d912b3eb5e320

A useful principle is not to add cleverness unless you are absolutely
sure you're going to need it. It can be tempting to write general
“((framework))s” for every bit of functionality you come across.
Resist that urge. You won't get any real work done, you'll just end up
writing a lot of code that you'll never use.
@!a78cc3bda3fb173c220395d894962fb435e5045f

{{id pure}}
@!d09c687b4b7e96ea92eabd5e30c0f1727f4ea929

## Functions and side effects
@!edd6a039d8a91cb2edf3a864fa76950ff429fbe0

{{index "side effect", "pure function", [function, purity]}}
@!622500ba6b648b34f3f38b5e8fa9a9e5adf3b231

Functions can be roughly divided into those that are called for their
side effects and those that are called for their return value. (Though
it is definitely also possible to have both side effects and return a
value.)
@!ee29d67360e209bc14762fde7cd6498874111361

{{index reuse}}
@!b258670f90e0f0132179152467e089b3e83763b7

The first helper function in the ((farm example)),
`printZeroPaddedWithLabel`, is called for its side effect: it prints a
line. The second version, `zeroPad`, is called for its return value.
It is no coincidence that the second is useful in more situations than
the first. Functions that create values are easier to combine in new
ways than functions that directly perform side effects.
@!40879784e4addbcbc3bfb2b47e2865c33fd3de41

{{index substitution}}
@!4f5ce2288e51a26567985bae8af2a23279f31b78

A _pure_ function is a specific kind of value-producing function that
not only has no side effects but also doesn't rely on side effects
from other code—for example, it doesn't read global bindings that are
occasionally changed by other code. A pure function has the pleasant
property that, when called with the same arguments, it always produces
the same value (and doesn't do anything else). A call to such a
function can be substituted by its return value without changing the
meaning of the code. When you are not sure that a pure function is
working correctly, you can test it by simply calling it, and know that
if it works in that context, it will work in any context. Nonpure
functions tend to require more scaffolding to test.
@!1c879c09ffe7e0188efbf5f792d340c3ba75e83c

{{index optimization, "console.log"}}
@!8e5ebb002a7dfd2323cbcd26ca993ad568de0bda

Still, there's no need to feel bad when writing functions that are not
pure or to wage a holy war to purge them from your code. Side effects
are often useful. There'd be no way to write a pure version of
`console.log`, for example, and `console.log` is certainly useful.
Some operations are also easier to express in an efficient way when we
use side effects, so computing speed can be a reason to avoid purity.
@!8ebc254b322b1ae1c3829b622c1af3ec617eed1e

## Summary
@!9b4fcef63c681fe48c0da5529bb044a2713a83ed

This chapter taught you how to write your own functions. The
`function` keyword, when used as an expression, can create a function
value. When used as a statement, it can be used to declare a binding
and give it a function as its value. Arrow functions are yet another
way to create functions.
@!805fc6dc6588d1b8cbe2fa4484648e4cd0afddab

```
// Create a function value f
const f = function(a) {
  console.log(a + 2);
};

// Declare g to be a function
function g(a, b) {
  return a * b * 3.5;
}

let h = a => a + 6;
```
@!d528cac218e8e39efd1cd8187f49905c82d3b735

A key aspect in understanding functions is understanding scopes. Each
block creates a new scope. Parameters and bindings declared in a given
scope are local, and not visible from the outside, except for bindings
declared with `var`, which end up in the nearest function scope or the
global scope.
@!caa5e23e48d8deeb3532d36962e18d56f1c80767

Separating the tasks your program performs into different functions is
helpful. You won't have to repeat yourself as much, and functions can
organize a program by grouping code into conceptual chunks, similar to
the way that chapters and sections help organize a text.
@!89c2a9467efcfddbcddf4a1a310a73c03ffb58d5

## Exercises
@!68688ed562df6c3e32d80fb002ddd8b7424840bf

### Minimum
@!1485eb83ce5643bd3f49d0d623e6c8be362ae936

{{index "Math object", "minimum (exercise)", "Math.min function", minimum}}
@!34f369d37d65e23872f357f4707a239cc5b08d08

The [previous chapter](02_program_structure.html#return_values)
introduced the standard function `Math.min` that returns its smallest
argument. We can do that ourselves now. Write a function `min` that
takes two arguments and returns their minimum.
@!422c35edc446f063d561cea7e631cb0ce125c264

{{if interactive
@!26c736e111a34551417420e68fedade32586179d

```{test: no}
// Your code here.

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10
```
@!7f41c71ac45df99dab5b803eeffac04a5d335c99

if}}
@!26a74c95848de1160980c3910a6cb2417c546619

{{hint
@!270dcc0009c2e7573dc39e5ee7cc079153fadf9d

{{index "minimum (exercise)"}}
@!33d0ab816ad795acd99dbf7413335c91cf047093

If you have trouble putting braces and
parentheses in the right place to get a valid function definition,
start by copying one of the examples in this chapter and modifying it.
@!02745f55ba26583bc2af66a106e4034638a25c50

{{index "return keyword"}}
@!171a865ed3cb991d976469304f0e81420298ef19

A function may contain multiple `return` statements.
@!af1185fcd2a5c3570452998f5e098a35c4b91e80

hint}}
@!b240d87c934a3c2a56baa85d8f1cb5b26aee5eba

### Recursion
@!5e6e52f70dbcbc503c9fc2a4ddda1f9522f23be4

{{index recursion, "isEven (exercise)", "even number"}}
@!558added1ee3f93090c25ef2b48d5188c2f10a76

We've seen that `%` (the remainder operator) can be used to test
whether a number is even or odd by using `% 2` to check whether it's
divisible by two. Here's another way to define whether a positive
whole number is even or odd:
@!0f4ee7d846df648b53542f11e293042f3bcc26cd

- Zero is even.
@!705935b341c7cd9d4bbf953f77ef328cce9929eb

- One is odd.
@!040a40462d5b70e8ac40fa0f80a071e6df2029be

- For any other number _N_, its evenness is the same as _N_ - 2.
@!88b73b93571dbb5a9be16851e8a10b6f6526e56f

Define a recursive function `isEven` corresponding to this
description. The function should accept a single parameter (a
positive, whole number) and return a Boolean.
@!92dcf4488b4f7ee8884a8ad53f29349872e08e47

{{index "stack overflow"}}
@!13675cfae082e3bdb1a67f421dbf26f43bef64de

Test it on 50 and 75. See how it behaves on -1. Why? Can you think of
a way to fix this?
@!b51ebdf5dc1e040291af0eaf3ffc4ebf01b37f5f

{{if interactive
@!f53d5db272c66405d88d6c2a39db137961fd94cb

```{test: no}
// Your code here.

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → ??
```
@!5ebed4b9dba6e5ac1ee5d9a3c9e9eb65208cd3e5

if}}
@!22e26be05d0c8b333ead081f29272df066794c15

{{hint
@!d26245b65137fe334d27643e013b4e78bbf7b24e

{{index "isEven (exercise)", ["if keyword", chaining], recursion}}
@!4924b106ee4053be634686e802053c684fcb7a71

Your function will likely look somewhat similar to the inner `find`
function in the recursive `findSolution`
[example](03_functions.html#recursive_puzzle) in this chapter, with an
`if`/`else if`/`else` chain that tests which of the three cases
applies. The final `else`, corresponding to the third case, makes the
recursive call. Each of the branches should contain a `return`
statement or in some other way arrange for a specific value to be
returned.
@!838293e0f2a89d256f158be05824c4d6f6f942d6

{{index "stack overflow"}}
@!c7bedd831b468461ba07fbb96e619d1978cd5bf7

When given a negative number, the function will recurse again and
again, passing itself an ever more negative number, thus getting
further and further away from returning a result. It will eventually
run out of stack space and abort.
@!73df7d5f6531d67a23f31cbdbf77c7008f733563

hint}}
@!e3db08836a8a1ad4f39c328440aa90217e733ca8

### Bean counting
@!4e58751307980afb93d860f5cd5c0a28bba0eb2c

{{index "bean counting (exercise)", [string, indexing], "zero-based counting"}}
@!2655f8f3eec456566bddbf06c86732cb90d8b1dd

You can get the Nth character, or letter, from a string by writing
`"string"[N]`. The returned value will be a string containing only one
character (for example, `"b"`). The first character has position zero,
which causes the last one to be found at position `string.length - 1`.
In other words, a two-character string has length 2, and its
characters have positions 0 and 1.
@!996473a8fc963b111a3cdd328e87277e74d72c2e

Write a function `countBs` that takes a string as its only argument
and returns a number that indicates how many uppercase “B” characters
there are in the string.
@!cdbb20182e0122638fe9700691f1d4f066bb9428

Next, write a function called `countChar` that behaves like `countBs`,
except it takes a second argument that indicates the character that is
to be counted (rather than counting only uppercase “B” characters).
Rewrite `countBs` to make use of this new function.
@!98ccddb105d5b14e7dc29376915884fdb903c719

{{if interactive
@!eda3aa01ce6f4530c2ce578fad547275f3bbadd9

```{test: no}
// Your code here.

console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4
```
@!b46a09808e371e0ad278dcacbb2deb43cb7b3a1e

if}}
@!f52b2b78ca16c58ae554d6cb863934616f3eb302

{{hint
@!5ed8d4d820f259da5d2d0758dffced0d71781adb

{{index "bean counting (exercise)", ["length property", "for string"], "counter variable"}}
@!b8a4d45bf9f35a4f1e44b96382163b1c8d57f5c3

A ((loop)) in your function will have to look at every character in
the string by running an index from zero to one below its length (`<
string.length`). If the character at the current position is the same
as the one the function is looking for, it adds 1 to a counter
variable. Once the loop has finished, the counter can be returned.
@!6997d63caf7ed18cb9cd0bebbfb7a7c1c204841e

{{index "local binding"}}
@!48ff5d72ee84ad1c3ff9fbc524e65fefa7ba43dc

Take care to make all the bindings used in the function _local_ to the
function by using the `let` keyword.
@!aaf13aee2f90d83967e3f1b62b4c7595602cdd7b

hint}}
@!affec3be32cf27df5ba5768ff885a0f32dd229ac