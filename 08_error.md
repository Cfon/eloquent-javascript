{{meta {chap_num: 8, prev_link: 07_robot, next_link: 09_regexp, load_files: ["code/chapter/08_error.js"]}}}
@!a124af6effbe9c80f90cb4d84b44a533c59344ad

# Bugs and Errors
@!448adfb0800cad70b8a0a8baa84a53efc52a910f

{{quote {author: "Brian Kernighan and P.J. Plauger", title: "The Elements of Programming Style", chapter: true}
@!14815bda5efd0f8967d26eb0187a685a23f5701f

Debugging is twice as hard as writing the code in the first place.
Therefore, if you write the code as cleverly as possible, you are, by
definition, not smart enough to debug it.
@!ba3435e992791475679c416aac8caea3cb30dbfb

quote}}
@!f1167ccc7949cb53d2c2ec4d614d5a01707ce2d8

{{index "Kernighan, Brian", "Plaugher, P.J.", debugging, "error handling"}}
@!377664efff4bce9c17aeb26883ff9a3c05c3a45c

Flaws in computer programs are usually called _((bug))s_. It makes
programmers feel good to imagine them as little things that just
happen to crawl into our work. In reality, of course, we put them
there ourselves.
@!1f1c4dc99d39ced629c595d4f8c4a766e72df05c

A program is crystallized thought. You can roughly categorize bugs
into those caused by the thoughts being confused, and those caused by
mistakes introduced while converting a thought to code. The former
type is generally harder to diagnose and fix than the latter.
@!e6e6960854f569ab288f06a96b9f8bc0f5e02a82

## Language
@!d4051c6c1f8bf76fdbf17aa0ed170a1fef16f802

{{index parsing, analysis}}
@!f4bacff78bfa5ce1421fd2b56f6c863bf0b4a47b

Many mistakes could automatically be pointed out to us by the
computer, if it knew enough about what we're trying to do. But here
JavaScript's looseness is a hindrance. Its concept of bindings and
properties is vague enough that it will rarely catch ((typo))s before
actually running the program. And even then, it allows you to do some
clearly nonsensical things without complaint, such as `true *
"monkey"`.
@!5a4158a4af6458958710c674d00a8b3c01093de6

{{index syntax}}
@!bb782b76fead06f3459c7fbd8688333944826748

There are some things that JavaScript does complain about. Writing a
program that does not follow the language's ((grammar)) will
immediately make the computer complain. Other things, such as calling
something that's not a function or looking up a ((property)) on an
((undefined)) value, will cause an error to be reported when the
program is running and encounters the action.
@!4c5a785d46e00fa09891dcf9a732b4c605aa8bac

{{index NaN, error}}
@!8fba3261ab7f1823688dc29a2dfec70b942cf57b

But often, your nonsense computation will merely produce `NaN` (not a
number) or an undefined value. And the program happily continues,
convinced that it's doing something meaningful. The mistake will
manifest itself only later, after the bogus value has traveled through
several functions. It might not trigger an error at all but silently
cause the program's output to be wrong. Finding the source of such
problems can be difficult.
@!a2a1637d4ee33ca28d9b7117aa9342b874b2ea0c

The process of finding mistakes—bugs—in programs is called
_((debugging))_.
@!b47c8bb37be2eb619add8b839ec4f7da73c405b8

## Strict mode
@!7cb420dd3267c52e078bfaae4b2fad9463bac4c2

{{index "strict mode", syntax, function}}
@!e33c36dadae28576e6a7165b36fc7a1376db1ee4

{{indexsee "use strict", "strict mode"}}
@!2f9ac2591f8446eea59388189eca3bd2af7dec68

JavaScript can be made a _little_ more strict by enabling _strict
mode_. This is done by putting the string `"use strict"` at the top of
a file or a function body. Here's an example:
@!df160300ce47cbc60f675b837d507310cbab7c34

```{test: "error \"ReferenceError: counter is not defined\""}
function canYouSpotTheProblem() {
  "use strict";
  for (counter = 0; counter < 10; counter++) {
    console.log("Happy happy");
  }
}

canYouSpotTheProblem();
// → ReferenceError: counter is not defined
```
@!8436e22365a4238ae47e3b9cacf82c686c77cd23

{{index "let keyword", [binding, global]}}
@!5bf50a36874493714a1780e4d188188a675a7907

Normally, when you forget to put `let` in front of your binding, as
with `counter` in the example, JavaScript quietly creates a global
binding and uses that. In strict mode an ((error)) is reported
instead. This is very helpful. It should be noted, though, that this
doesn't work when the binding in question already exists as a global
binding, in which case the loop will still quietly overwrite the value
of that binding.
@!01bccf67eade81a642568c7bdc98ac37b2bd7fb4

{{index this, "global object", undefined, "strict mode"}}
@!a8419a0cc28eca299bcfeee3aed887581bdf0a25

Another change in strict mode is that the `this` binding holds the
value `undefined` in functions that are not called as ((method))s.
When making such a call outside of strict mode, `this` refers to the
global scope object, which is an object whose properties are the
global bindings. So if you accidentally call a method or constructor
incorrectly in strict mode, JavaScript will produce an error as soon
as it tries to read something from `this`, rather than happily writing
to the global scope.
@!e471d3d5c6ba6d97cbbc3822b9c8d9c39816e9b4

For example, consider the following code, which calls a
((constructor)) function without the `new` keyword so that its `this`
will _not_ refer to a newly constructed object:
@!17c77cbe2d8036cdecf995e088bcb021c862d767

```
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // oops
console.log(name);
// → Ferdinand
```
@!7354634b087bfd559502ebe97983d9fa148ecaad

{{index error}}
@!5e5f1ed419558dfc879245429e45ad3ea94c2db0

So the bogus call to `Person` succeeded but returned an undefined
value and created the global binding `name`. In strict mode, the
result is different.
@!0d877b5d8c7d53827ec991ad1188835c545cdab0

```{test: "error \"TypeError: Cannot set property 'name' of undefined\""}
"use strict";
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // forgot new
// → TypeError: Cannot set property 'name' of undefined
```
@!360b262e3ee28fccbd627bbf5f5562eb94e81283

We are immediately told that something is wrong. This is helpful.
@!88e191392eb4d28b14d538b359f03897e0da20b6

Fortunately, constructors created with the `class` notation will
always complain if they are called without `new`, making this less of
a problem even in non-strict mode.
@!2d66be322c190f922a6ca624d0339e3d100d864f

{{index parameter, [binding, naming], "with statement"}}
@!1c55f4da4d0767f06edec92f6abdd789d3b56daa

Strict mode does a few more things. It disallows giving a function
multiple parameters with the same name and removes certain problematic
language features entirely (such as the `with` statement, which is so
problematic it is not further discussed in this book).
@!d1750ab7e6e0c3fd5f184f20a2b826cbd2360f13

{{index debugging}}
@!e89ff89cfba8949430ac0f56d3744da4a4a5fe53

In short, putting a `"use strict"` at the top of your program rarely
hurts and might help you spot a problem.
@!7076938a4b279441b7c55d9211f655d59f428109

## Types
@!461c630a4a6ce61b05513001ab0436ffedf420ff

Some languages want to know the types of all your bindings and
expressions before even running a program. They will tell you right
away when a type is used in an inconsistent way. JavaScript considers
types only when actually running the program, and even there often
tries to implicitly convert values to the type it expects, so it's not
much help.
@!7a900d16f83e18226a2e26df3b52499ec59c85bf

Still, types provide a useful framework for talking about programs. A
lot of mistakes come from being confused about the kind of value that
goes into or comes out of a function. If you have that information
written down, you're less likely to get confused.
@!1a36d3accc233c459c71aa232292a8749c1a0a42

You could add a comment like this above the `goalOrientedRobot`
function from the last chapter, to describe its type.
@!dad904f9e53c07669bcf649875f127433c1983fa

```
// (WorldState, Array) → {direction: string, memory: Array}
function goalOrientedRobot(state, memory) {
  // ...
}
```
@!c3de19c7e2bb96c37cc2ce1d73f6d4cff16502bd

There are a number of different conventions for annotating JavaScript
programs with types.
@!2c8fb7938d52b5084001da8ca2d855088cb0359f

What do you think would be the type of the `randomPick` function that
returns a random element from an array? One thing about types is that
they require their own complexity to describe some code. In this case,
you'd need a _((type variable))_ _T_, which can stand in for any type,
at which point you can give `randomPick` a type like `([T]) → T`
(function from array of _T_s to a _T_).
@!4e253cd505237ce3addc582e427f30324d2b1a6d

{{index "type checking"}}
@!c715b5754b60f09d6b3e5dbe1cead924ae3ed916

When the types of a program are known, it is possible for the computer
to _check_ them for you, pointing out mistakes before the program is
run. There are several JavaScript dialects that add types to the
language and check them. The most popular one is called
[((TypeScript))](https://www.typescriptlang.org/). If you are
interested in adding more rigor to your programs, I recommend you give
it a try.
@!7d74877979660b1f3abe7a25d8a5d94349ed29f2

In this book, we'll continue using raw, dangerous, untyped JavaScript
code.
@!983dcb3d4fdce671e4d3d2278fa9bf68597d78c4

## Testing
@!bd992ed1d1574fbab9e2bce5cfbc32d3e59917ef

{{index "test suite", "run-time error", automation, testing}}
@!dbf58033a33b3b12e07ea105641cdff3f8017e5e

If the language is not going to do much to help us find mistakes,
we'll have to find them the hard way: by running the program and
seeing whether it does the right thing.
@!20c304068bac60d0bd7aca2bfd230e86fe5afcf4

Doing this by hand, again and again, is a really bad idea. Not only is
it annoying, it will also necessarily be ineffective, since it takes
too much time to exhaustively test everything every time you make a
change.
@!b722a82ffb1e91567ff0414e2b109cee6b5d9258

Computers are good at repetetive tasks, and testing is the ideal
repetetive task. Automated testing is the process of writing a program
that tests another program. Writing tests is a bit more work than
testing manually, but once you've done it you gain a kind of
superpower: it only takes you a few seconds to verify that your
program still behaves properly in all the situations you wrote tests
for. When you break something, you'll immediately notice, rather than
randomly running into it at some later time.
@!707ee4b6ede62b550e2f0ff268b0defdc84159b0

{{index "toUpperCase method"}}
@!6f245d7501bda63fff924bb997acd77f490ea432

Tests usually take the form of little labeled programs that verify
some aspect of your code. For example, a set of tests for the
(standard, probably already tested by someone else) `toUpperCase`
method might look like this:
@!2ea0b8332135a802d042fd8e05c14d3a768cbde7

```
function test(label, body) {
  if (!body()) console.log(`Failed: ${label}`);
}

test("convert Latin text to upper case", () => {
  return "hello".toUpperCase() == "HELLO";
});
test("convert Greek text to upper case", () => {
  return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
});
test("don't convert case-less characters", () => {
  return "مرحبا".toUpperCase() == "مرحبا";
});
```
@!7868acbb4e2982e3263ff5eaea8b17637f45b2a0

{{index "domain-specific language"}}
@!0cbcf973ede52dd6b9d6670eabc81ba8445b6ad8

Writing tests like this tends to produce rather repetitive, awkward
code. Fortunately, there exist pieces of software that help you build
and run collections of tests (_((test suites))_) by providing a
language (in the form of functions and methods) suited to expressing
tests and by outputting informative information when a test fails.
These are usually called _((test runners))_.
@!f8490b39090f9e25481c927cc33f8f8d4f771af2

{{index "persistent data structure"}}
@!b9dc170368141c7a55f2a3d358ebd548cf7bd9eb

Some code is easier to test than other code. Generally, the more
external objects that it interacts with, the harder it is to set up
the context in which to test it. The style of programming shown in the
[previous chapter](07_robot.html), which uses self-contained
persistent values rather than changing objects, tends to produce code
that's easy to test.
@!bb1c0edc2623ae7ca671b2b1b2c9457f2ca95593

## Debugging
@!4b3ffd0e48f8800a2adcc12bc2e24e6e9a8a68b4

{{index debugging}}
@!05637fad93603702fa40695d4031543a114482b2

Once you notice that there is something wrong with your program
because it misbehaves or produces errors, the next step is to figure
out _what_ the problem is.
@!c65eec2841f3af443d6b5db792bc8101da972c51

Sometimes it is obvious. The ((error)) message will point at a
specific line of your program, and if you look at the error
description and that line of code, you can often see the problem.
@!770de15c2a11d195a5d3e550e6726c2a96af7f60

{{index "run-time error"}}
@!2377cd012173ba7ad99a0fefc933f8fa8bfa5d98

But not always. Sometimes the line that triggered the problem is
simply the first place where a flaky value produced elsewhere gets
used in an invalid way. And sometimes there is no error message at
all—just an invalid result. If you have been solving the ((exercises))
in the earlier chapters, you will probably have already experienced
such situations.
@!9e806408d84800145d665fc0cffdc43f7b84e048

{{index "decimal number", "binary number"}}
@!17a107a7c63aa04d0e04464b08df525aed9340bf

The following example program tries to convert a whole number to a
string in a given base (decimal, binary, and so on) by repeatedly
picking out the last ((digit)) and then dividing the number to get rid
of this digit. But the strange output that it currently produces
suggests that it has a ((bug)).
@!eaa6e1673569754434a259ca0b3bdd5fcd03e068

```
function numberToString(n, base = 10) {
  let result = "", sign = "";
  if (n < 0) {
    sign = "-";
    n = -n;
  }
  do {
    result = String(n % base) + result;
    n /= base;
  } while (n > 0);
  return sign + result;
}
console.log(numberToString(13, 10));
// → 1.5e-3231.3e-3221.3e-3211.3e-3201.3e-3191.3e-3181.3…
```
@!f80e58471e5cc5b2a5bcca5cf25ff4ae51df6090

{{index analysis}}
@!3616eb0ba12af0ecc15de3556e9950bf80a264a8

Even if you see the problem already, pretend for a moment that you
don't. We know that our program is malfunctioning, and we want to find
out why.
@!081a714a8c937f9d14fe2b6141508c70e5e62f3c

{{index "trial and error"}}
@!4627f09dd8f91f796642458cdf00395c4e8ae799

This is where you must resist the urge to start making random changes
to the code to see if that makes it better. Instead, _think_. Analyze
what is happening and come up with a ((theory)) of why it might be
happening. Then, make additional observations to test this theory—or,
if you don't yet have a theory, make additional observations to help
you come up with one.
@!59963d0cd74e572ad5a7f69d41da24599d0b0f5e

{{index "console.log", output, debugging, logging}}
@!5387b283c405c4823627676c10b9ba402d358a33

Putting a few strategic `console.log` calls into the program is a good
way to get additional information about what the program is doing. In
this case, we want `n` to take the values `13`, `1`, and then `0`.
Let's write out its value at the start of the loop.
@!5f6d8953f614a08fa80f348cd990088fb860188c

```{lang: null}
13
1.3
0.13
0.013
…
1.5e-323
```
@!57f3646d6fc14717e49a67465fa6857813af3f3d

{{index rounding}}
@!2f32196d68b6959a69ef0ebb8fd7d663d2b911eb

_Right_. Dividing 13 by 10 does not produce a whole number. Instead of
`n /= base`, what we actually want is `n = Math.floor(n / base)` so
that the number is properly “shifted” to the right.
@!877fa6e5ad873163fde4f4c8593615830906c21b

{{index "JavaScript console", "debugger statement"}}
@!89f6ab692b092a599915fdc8de94fc117809e0af

An alternative to using `console.log` to peek into the program's
behavior is to use the _debugger_ capabilities of your browser.
Browsers come with the ability to set a _((breakpoint))_ on a specific
line of your code. When the execution of the program reaches a line
with a breakpoint, it is paused, and you can inspect the values of
bindings at that point. I won't go into details, as debuggers differ
from browser to browser, but look in your browser's ((developer
tools)) or search the Web for more information.
@!0df86d17f62ab8a1293391a3f55288c93e88a6a4

Another way to set a breakpoint is to include a `debugger` statement
(consisting of simply that keyword) in your program. If the
((developer tools)) of your browser are active, the program will pause
whenever it reaches such a statement.
@!e3c52968071a96ed604ddbe5cbb0f9fb418c6648

## Error propagation
@!04027eea7061a0f44c2fcdff4c0cb74e603f0d6e

{{index input, output, "run-time error", error, validation}}
@!69d4ee2e9ad905aa9c260104e69e405536773bf7

Not all problems can be prevented by the programmer, unfortunately. If
your program communicates with the outside world in any way, it is
possible to get malformed input, or to have the network fail, or to
become overloaded with work.
@!08e07ff0ee5bece4bea882181c3d74cca1c5c425

{{index "error recovery"}}
@!2ce99861b34d8e237d6f1c12e47fa15abee97661

If you're only programming for yourself, you can afford to just ignore
such problems until they occur. But if you build something that is
going to be used by anybody else, you usually want the program to do
better than just crashing. Sometimes the right thing to do is take the
bad input in stride and continue running. In other cases, it is better
to report to the user what went wrong and then give up. But in either
situation, the program has to actively take action in response to the
problem.
@!53f9beb4de81a3037d94b5af3a26927082458284

{{index "promptInteger function", validation}}
@!971360005774eaa92bfab0f7ff3f8b0437cd9805

Say you have a function `promptInteger` that asks the user for a whole
number and returns it. What should it return if the user inputs
"orange"?
@!7e7911506b20a4582bc9ca83e593a52729eba46c

{{index null, undefined, "return value", "special return value"}}
@!cf898a4aaa09760c65c8fe2e6e02179c886acc7f

One option is to make it return a special value. Common choices for
such values are `null`, `undefined`, or -1.
@!ffb8f848dbcd74b390b2fd936a91b4c5521b8d72

```{test: no}
function promptNumber(question) {
  let result = Number(prompt(question));
  if (isNaN(result)) return null;
  else return result;
}

console.log(promptNumber("How many trees do you see?"));
```
@!20172b746007451a10de91c589b52b1e1db39656

Now any code that calls `promptNumber` must check whether an actual
number was read and, failing that, must somehow recover—maybe by
asking again or by filling in a default value. Or it could again
return a special value to _its_ caller to indicate that it failed to
do what it was asked.
@!7654f7053bf34e28eddd6cd09265d1d754a566fe

{{index "error handling"}}
@!b3bded3abf242e857cf3415efd6b7925a63c051e

In many situations, mostly when ((error))s are common and the caller
should be explicitly taking them into account, returning a special
value is a good way to indicate an error. It does, however, have its
downsides. First, what if the function can already return every
possible kind of value? In such a function, you'll have to do
something like wrap the result in an object to be able to distinguish
success from failure.
@!e74f2461b39589883d9dad37df27efc487bcae16

```
function lastElement(array) {
  if (array.length == 0) {
    return {failed: true};
  } else {
    return {element: array[array.length - 1]};
  }
}
```
@!c85bcfd329c539b627efc8856be1ba50fac6813d

{{index "special return value", readability}}
@!700e86c0bb0b231632074501b502abe6b7e7090b

The second issue with returning special values is that it can lead to
very awkward code. If a piece of code calls `promptNumber` 10 times,
it has to check 10 times whether `null` was returned. And if its
response to finding `null` is to simply return `null` itself, the
caller will in turn have to check for it, and so on.
@!dad164d5cc83dcc424e73f0781ef760124c2bc25

## Exceptions
@!14b86525694d3beac3f115cde613d6376eed3211

{{index "error handling"}}
@!78f66f811742d1e91e971f5d741883d644c088ac

When a function cannot proceed normally, what we would _like_ to do is
just stop what we are doing and immediately jump to a place that knows
how to handle the problem. This is what _((exception handling))_ does.
@!ca449ff3ff2970b24297e3f61699c38f1b0121c1

{{index "control flow", "raising (exception)", "throw keyword", "call stack"}}
@!4c9115d3faaca962df6dab20e0db1267390c9578

Exceptions are a mechanism that make it possible for code that runs
into a problem to _raise_ (or _throw_) an exception. An exception can
be any value. Raising one somewhat resembles a super-charged return
from a function: it jumps out of not just the current function but
also out of its callers, all the way down to the first call that
started the current execution. This is called _((unwinding the
stack))_. You may remember the stack of function calls that was
mentioned in [Chapter 3](03_functions.html#stack). An exception zooms
down this stack, throwing away all the call contexts it encounters.
@!19fbb5add1772d888983cdb875aa1d2aee45f4b9

{{index "error handling", syntax, "catch keyword"}}
@!550e474ea802b991ac4636b8574b957df1547d11

If exceptions always zoomed right down to the bottom of the stack,
they would not be of much use. They'd just provide a novel way to blow
up your program. Their power lies in the fact that you can set
“obstacles” along the stack to _catch_ the exception as it is zooming
down. Once you've caught an exception, you can do something with it to
address the problem, and then continue to run the program.
@!b8ac71a0f39728b87ce9c957b6d38936d13793d6

Here's an example:
@!84527be1f07cf2bc62b4f4b6ebaa4df42b740886

{{id look}}
@!289f2026b67295af2ff3b376b93bd1bbc07c700e

```
function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new Error("Invalid direction: " + result);
}

function look() {
  if (promptDirection("Which way?") == "L")
    return "a house";
  else
    return "two angry bears";
}

try {
  console.log("You see", look());
} catch (error) {
  console.log("Something went wrong: " + error);
}
```
@!3cddb9afed243b0c01d52c1791238c11466b427a

{{index "exception handling", block, "throw keyword", "try keyword", "catch keyword"}}
@!da1ad6615888d9295813fbc5b924f24d240c06d9

The `throw` keyword is used to raise an exception. Catching one is
done by wrapping a piece of code in a `try` block, followed by the
keyword `catch`. When the code in the `try` block causes an exception
to be raised, the `catch` block is evaluated, with the name in
parentheses bound to the exception value. After the `catch` block
finishes—or if the `try` block finishes without problems—the program
proceeds beneath the entire `try/catch` statement.
@!67468ebb5a89be41aa1b981dba09b202bbebf869

{{index debugging, "call stack", "Error type"}}
@!e87665228941207a80b1064bce9afa4d2f41b28d

In this case, we used the `Error` ((constructor)) to create our
exception value. This is a ((standard)) JavaScript constructor that
creates an object with a `message` property. In most JavaScript
environments, instances of this constructor also gather information
about the call stack that existed when the exception was created, a
so-called _((stack trace))_. This information is stored in the `stack`
property and can be helpful when trying to debug a problem: it tells
us the function where the problem occurred and which functions made
the failing call.
@!9e16e8b300f94349b91e1e5f3df7b5207d54b025

{{index "exception handling"}}
@!efd8dedb82f1473a6d97aff59f66b8ecba1e4ba6

Note that the function `look` completely ignores the possibility that
`promptDirection` might go wrong. This is the big advantage of
exceptions—error-handling code is necessary only at the point where
the error occurs and at the point where it is handled. The functions
in between can forget all about it.
@!1e00a196d5e5d680fd87483c7e068ba89d505d63

Well, almost...
@!1aa0ee09fe1a6387dc738a87b32cecc4ada5ffe0

## Cleaning up after exceptions
@!678dc1335c3f2fa0087dfccfb284f371766958cd

{{index "exception handling", "cleaning up"}}
@!740543c90204ca64c367636a4519c5f5b028b1a4

The effect of an exception is another kind of ((control flow)). Every
action that might cause an exception, which is at least every function
call and property access, might cause control to suddenly leave your
code.
@!b4ea045f0401b5a8a0540bdf9d482499505c2fd7

That means that when code has several side effects, even if its
"regular" control flow looks like they'll always all happen, an
exception might prevent some of them from taking place.
@!c65a8a94b5677ab5650a7f9f3a89ff3311bcddc2

{{index "banking example"}}
@!90d4ff9534c9d1465429c87865dd216f31bad4e3

Here is some really bad banking code.
@!3d21847c3396dfe05d8fc26fa1f60896cd16b200

```{includeCode: true}
let accounts = {
  a: 100,
  b: 0,
  c: 20
};

function getAccount() {
  let accountName = prompt("Enter an account name");
  if (!accounts.hasOwnProperty(accountName)) {
    throw new Error(`No such account: ${accountName}`);
  }
  return accountName;
}

function transfer(from, amount) {
  if (accounts[from] < amount) return;
  accounts[from] -= amount;
  accounts[getAccount()] += amount;
}
```
@!4f2da9d5891220688fc2e11d4a1cf47085265326

The `transfer` function transfers a sum of money from a given account
to another, asking for the name of the other account in the process.
If given an invalid account name, `getAccount` throws an exception.
@!f490fff4564724786c94e5ceb1c08ecb8df90733

But `transfer` _first_ removes the money from the account, and _then_
calls `getAccount` before it adds it to another account. If it is
broken off by an exception at that point, it'll just make the money
disappear.
@!042ce897a2905d06c3706fbf0d84148fbb0ee768

That code could have been written a little more intelligently, for
example by calling `getAccount` before it starts moving money around.
But often problems like this occur in more subtle ways. Even functions
that don't look like they will throw an exception might do so in
exceptional circumstances or when they contain a programmer mistake.
@!c61199b20a13625e5810bb7d4c88e7eaebe1e873

One way to address this is to use less side effects. Again, a
programming style that computes new values instead of changing
existing data helps. If a piece of code stops running in the middle of
creating a new value, no one ever sees the half-finished value, and
there is no problem.
@!a3a73c7b0d8b3ef39cf8a447e051836b1734e4b4

{{index block, "try keyword", "finally keyword"}}
@!66354df282c4606b68fc87d6cb553a762091a1bc

But that isn't always practical. So there is another feature that
`try` statements have. They may be followed by a `finally` block
either instead of or in addition to a `catch` block. A `finally` block
means “No matter _what_ happens, run this code after trying to run the
code in the `try` block”. If a function has to clean something up, the
cleanup code should usually be put into a `finally` block.
@!5ad10866acd8f6e2055ff0c07a76c2cb47fb0a67

```{includeCode: true}
function transfer(from, amount) {
  if (accounts[from] < amount) return;
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;
    accounts[getAccount()] += amount;
    progress = 2;
  } finally {
    if (progress == 1) {
      accounts[from] += amount;
    }
  }
}
```
@!c68ca43fbaa2178e590bec0fc6a7a31c74e45800

This version of the function tracks it progress, and if, when leaving,
it notices that it was aborted at a point where it had created an
inconsistent program state, it repairs the damage it did.
@!00d45e241bd23f16b323b33bee926b5af4e261d7

Note that, even though the `finally` code is run when an exception
leaves the `try` block, it does not interfere with the exception.
After the `finally` block runs, the stack continues unwinding.
@!664592c7df49c996fa383bfd9224497a5729bb0b

{{index "exception safety"}}
@!41e57109b50fad62c99324c268f3f525814b877c

Writing programs that operate reliably even when exceptions pop up in
unexpected places is very hard. Many people simply don't bother, and
because exceptions are typically reserved for exceptional
circumstances, the problem may occur so rarely that it is never even
noticed. Whether that is a good thing or a really bad thing depends on
how much damage the software will do when it fails.
@!2c9fbd86aa792d9b4f77c32f7fb1d43af0724405

## Selective catching
@!540ce8cdf25e2d9b61646bbf0f7a5cd351dcf5ba

{{index "uncaught exception", "exception handling", "JavaScript console", "developer tools", "call stack", error}}
@!e62d5fa28349b1614a6747717c8aa36262624674

When an exception makes it all the way to the bottom of the stack
without being caught, it gets handled by the environment. What this
means differs between environments. In browsers, a description of the
error typically gets written to the JavaScript console (reachable
through the browser's Tools or Developer menu). In Node, which is more
careful about data corruption, the whole process is stopped.
@!832b15d46013915a88fa6f1e2e810f9abd004656

{{index crash, "error handling"}}
@!bde9ffae3a4d88513cc0c372b898b31010b9a03a

For programmer mistakes, just letting the error go through is often
the best you can do. An unhandled exception is a reasonable way to
signal a broken program, and the JavaScript console will, on modern
browsers, provide you with some information about which function calls
were on the stack when the problem occurred.
@!28b751b502f938a03dde3cf29153b2b991aa2b84

{{index "user interface"}}
@!f1d865c30594ca644c67c8ae42bc1beb17c9104f

For problems that are _expected_ to happen during routine use,
crashing with an unhandled exception is not a very friendly response.
@!51b9bc296fd2b1d3e7cb1b707a6402cae3e2fefb

{{index syntax, [function, application], "exception handling", "Error type"}}
@!a71ab95211b7a37f400fdccc5828324d1597cace

Invalid uses of the language, such as referencing a nonexistent
((binding)), looking up a property on `null`, or calling something
that's not a function, will also result in exceptions being raised.
Such exceptions can also be caught.
@!bf077fd6e7b4cbcf77572804ed2d089d5062d550

{{index "catch keyword"}}
@!7a13178899eedfead4a25d55c4c6fc397c197378

When a `catch` body is entered, all we know is that _something_ in our
`try` body caused an exception. But we don't know _what_, or _which_
exception it caused.
@!3d49e2d65a08450064de6ac8322d79c09afe0ecf

{{index "exception handling"}}
@!ad444fd3c8f78bcb46d2c5910262d81e0554e997

JavaScript (in a rather glaring omission) doesn't provide direct
support for selectively catching exceptions: either you catch them all
or you don't catch any. This makes it tempting to _assume_ that the
exception you get is the one you were thinking about when you wrote
the `catch` block.
@!89041067508335ccc7e60b697dec03568d9c7eb9

{{index "promptDirection function"}}
@!489a1093bd3ce898f40350eb995ea23f36bc3f24

But it might not be. Some other ((assumption)) might be violated, or
you might have introduced a bug that is causing an exception. Here is
an example, which _attempts_ to keep on calling `promptDirection`
until it gets a valid answer:
@!bf452e703831e52ddb7a3a819f4d9e4fc44e0849

```{test: no}
for (;;) {
  try {
    let dir = promtDirection("Where?"); // ← typo!
    console.log("You chose ", dir);
    break;
  } catch (e) {
    console.log("Not a valid direction. Try again.");
  }
}
```
@!54e8d1e5343d90ab9c67e83802ee81c784d3b71c

{{index "infinite loop", "for loop", "catch keyword", debugging}}
@!eb5da1dad7076349d07111357a804d8781318f0c

The `for (;;)` construct is a way to intentionally create a loop that
doesn't terminate on its own. We break out of the loop only when a
valid direction is given. _But_ we misspelled `promptDirection`, which
will result in an "undefined variable" error. Because the `catch`
block completely ignores its exception value (`e`), assuming it knows
what the problem is, it wrongly treats the binding error as indicating
bad input. Not only does this cause an infinite loop, but it also
"buries" the useful error message about the misspelled binding.
@!c4bc029b75c04beb9a2a0e3a9f072335c3ceaa2e

As a general rule, don't blanket-catch exceptions unless it is for the
purpose of "routing" them somewhere—for example, over the network to
tell another system that our program crashed. And even then, think
carefully about how you might be hiding information.
@!a640ca9db2e8ab6bcdae8775a21f65949da90bcb

{{index "exception handling"}}
@!4ca854eaa0fbbdd98c710f723877e622772e228b

So we want to catch a _specific_ kind of exception. We can do this by
checking in the `catch` block whether the exception we got is the one
we are interested in and by rethrowing it otherwise. But how do we
recognize an exception?
@!3bfc2f9aef0a0e8d9cfe573d63217799b2a894a0

Of course, we could compare its `message` property against the
((error)) message we happen to expect. But that's a shaky way to write
code—we'd be using information that's intended for human consumption
(the message) to make a programmatic decision. As soon as someone
changes (or translates) the message, the code will stop working.
@!3766706a84d9cb8c73846686c3b50a9abab80be2

{{index "Error type", "instanceof operator", "promptDirection function"}}
@!0bc2058258d6f88cc46016f34110e0ee39c6e122

Rather, let's define a new type of error and use `instanceof` to
identify it.
@!8478eee5498748816c585cf070d3d1a634cbe9f3

```{includeCode: true}
class InputError extends Error {}

function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new InputError("Invalid direction: " + result);
}
```
@!a32af7e674805633172015774ac73ccf7324cf86

{{index "throw keyword", inheritance}}
@!7a78e9cf1556e0137eb5f99061445716705ac11c

The new error class extends `Error`. It doesn't define its own
constructor, which means that it inherits the `Error` constructor,
which expects a string message as argument. In fact, it doesn't define
anything at all—the class is empty. `InputError` object behave like
`Error` objects, except that they have a different class by which we
can recognize them.
@!8b4303014ad72fd6fbba02370d77141b7be25010

{{index "exception handling"}}
@!04ba1256c73e77197a2ef2ae68cf213c08614407

Now the loop can catch these more carefully.
@!b4686e8cec185ee41a44747ccd79db29d23faef4

```{test: no}
for (;;) {
  try {
    let dir = promptDirection("Where?");
    console.log("You chose ", dir);
    break;
  } catch (e) {
    if (e instanceof InputError) {
      console.log("Not a valid direction. Try again.");
    } else {
      throw e;
    }
  }
}
```
@!625c664cda0b64bfc0c04a3d702871c0618cbb5c

{{index debugging}}
@!9f5792d956480febfe0cec04b4d74e075f4a3b00

This will catch only instances of `InputError` and let unrelated
exceptions through. If you reintroduce the typo, the undefined binding
error will be properly reported.
@!8a192384b94d9fc4ea4fc117b85dd9cf6d616f83

## Assertions
@!25c31cb8b40ada83101cc2744e3427dd759c4f58

{{index "assert function", assertion, debugging}}
@!7750d76a7e2b259da77624f23ad72c387fa66990

_Assertions_ are checks inside a program that verify that something is
the way it is supposed to be. They are used not to handle situations
that can come up in normal operation, but to find programmer mistakes.
@!59af07f35ae7138fba6b13bc4a86da5c9094a3bf

If, for example, `firstElement` is described as a function that should
never be called on empty arrays, we might write it like this.
@!45800fe5e6243eadb576a3deac614b09a627b65e

```
function firstElement(array) {
  if (array.length == 0) {
    throw new Error("firstElement called with []");
  }
  return array[0];
}
```
@!141efacb82ca23041ac9be38f3446d4819c6c4d9

{{index validation, "run-time error", crash, assumption, array}}
@!fbefdd1c86ff02eac00fccd064e269dd3133a02b

Now, instead of silently returning undefined (which you get when
reading an array property that does not exist), this will loudly blow
up your program as soon as you misuse it. This makes it less likely
for such mistakes to go unnoticed, and easier to find their cause when
they occur.
@!52d5ab84e78f54e7eb1336b4aa305c4b316d0aaf

I do not recommend trying to write assertions for every possible kind
of bad input. That'd be a lot of work, and would lead to very noisy
code. You'll want to reserve them for mistakes that are easy to make
(or that you find yourself making).
@!f52c30decb171623a8faefd15a7009b1eb095020

## Summary
@!0d4b13bf7931b3db236d81cf9b67f43aab9f8a7b

Mistakes and bad input are facts of life. An important part of
programming is finding, diagnosing, and fixing bugs. Problems can
become easier to notice if you have an automated test suite or add
assertions to your programs.
@!4508abeff84027c941aee458e92f9ae4e9204a1b

Problems caused by factors outside the program's control should
usually be handled gracefully. Sometimes, when the problem can be
handled locally, special return values are a good way to track them.
Otherwise, exceptions are preferable.
@!69fe41bbc923e3c92f962abda7615fc85f92f0e2

Throwing an exception causes the call stack to be unwound until the
next enclosing `try/catch` block or until the bottom of the stack. The
exception value will be given to the `catch` block that catches it,
which should verify that it is actually the expected kind of exception
and then do something with it. To help address the unpredictable
control flow caused by exceptions, `finally` blocks can be used to
ensure a piece of code is _always_ run when a block finishes.
@!90ec95c0fdf39b0b3480d14f690ae3f1950670fc

## Exercises
@!2686aa41b867beefa9d1a33f3a2e4a1b90d14a6b

### Retry
@!4fce31791c0b4ae660326f4e8d3d50a3ce5c5893

{{index "primitiveMultiply (exercise)", "exception handling", "throw keyword"}}
@!a07106771d0dd62c5da60dab992f9bbbd50cbe16

Say you have a function `primitiveMultiply` that, in 20 percent of
cases, multiplies two numbers, and in the other 80 percent, raises an
exception of type `MultiplicatorUnitFailure`. Write a function that
wraps this clunky function and just keeps trying until a call
succeeds, after which it returns the result.
@!83628db331a8c19e762c5154828b61b981479bcd

{{index "catch keyword"}}
@!c5865126b88efa3356727b0a8a1706aeee543a6e

Make sure you handle only the exceptions you are trying to handle.
@!22b44d98979068d4c1383f860ce4974df45916bc

{{if interactive
@!48bf29678fc66b92a5854a3a3d9d510bdf42b5f0

```{test: no}
class MultiplicatorUnitFailure extends Error () {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2)
    return a * b;
  else
    throw new MultiplicatorUnitFailure("Klunk");
}

function reliableMultiply(a, b) {
  // Your code here.
}

console.log(reliableMultiply(8, 8));
// → 64
```
@!ed1ef3bd636aeb046ebb4e6f15ac0a1fc5ba618c

if}}
@!52e03e27f48cbb31a644eeda3e043f5d4a11e0a6

{{hint
@!e22fc04e3d670c253df29375b13f76c83d80b840

{{index "primitiveMultiply (exercise)", "try keyword", "catch keyword", "throw keyword"}}
@!785da5b0e83b37afce4253a725c9b38a0486acb2

The call to `primitiveMultiply` should definitely happen in a `try`
block. The corresponding `catch` block should rethrow the exception
when it is not an instance of `MultiplicatorUnitFailure` and ensure
the call is retried when it is.
@!1ab747978085d659b38d1d958482770b7ca9f651

To do the retrying, you can either use a loop that breaks only when a
call succeeds—as in the [`look` example](08_error.html#look) earlier
in this chapter—or use ((recursion)) and hope you don't get a string
of failures so long that it overflows the stack (which is a pretty
safe bet).
@!358fc84505c62397a9e56b1dd5d940c6f7c7dcdd

hint}}
@!e27347c7a93d1a58c1d670117e2df91ce679959f

### The locked box
@!7a557118644454ed0af09dc7b4d207c4676ca668

{{index "locked box (exercise)"}}
@!2034a149d35048e06486250c909c12a2ae43abb6

Consider the following (rather contrived) object:
@!b914d6218df2387f4a5714de7ef54b5af6b33bf0

```{includeCode: true}
let box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};
```
@!7280867da15c1fc883fb28eb4ac8408f14f06200

{{index "private property", "access control"}}
@!fbdef3f36d4e67db81126bd12bbe0dccf21adc62

It is a ((box)) with a lock. Inside is an array, but you can get at it
only when the box is unlocked. Directly accessing the private
`_content` property is forbidden.
@!7fd0b88a00c27f7947114cd5ce3cad8cd20dc27e

{{index "finally keyword", "exception handling"}}
@!1b8e2fdd47157349673bfe35542a3aed6da0eaa6

Write a function called `withBoxUnlocked` that takes a function value
as argument, unlocks the box, runs the function, and then ensures that
the box is locked again before returning, regardless of whether the
argument function returned normally or threw an exception.
@!ee58358bcb4b568ee023554bf420b13cccf9a30a

{{if interactive
@!26405e3b68348c27b7f8d01e2766c0cc19b7b0e2

```
function withBoxUnlocked(body) {
  // Your code here.
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}
console.log(box.locked);
// → true
```
@!1b7470d2bd4e9fb246bed1ee06811accb1371f19

For extra points, make sure that if you call `withBoxUnlocked` when
the box is already unlocked, the box stays unlocked.
@!cfdbb30c22c580aa9143d0615d6208edb51f3a14

if}}
@!ded7f0a23a09dbe174742e971b638526ed71fcbe

{{hint
@!c0cf6c2495e3eed030a536f33633350437ca23b7

{{index "locked box (exercise)", "finally keyword", "try keyword"}}
@!96b1e6feba11df423f3ec9dfbbee2896645e7916

This exercise calls for a `finally` block, as you may have guessed.
Your function should first unlock the box and then call the argument
function from inside a `try` body. The `finally` block after it should
lock the box again.
@!0192c5393097a5bbcf82252149b9978b969034c2

To make sure we don't lock the box when it wasn't already locked,
check its lock at the start of the function and unlock and lock
it only  when it started out locked.
@!c1e504ecdd4c5a5b0778c2a872457c29a803f53e

hint}}
@!8927ec3a73fed90706cbd54cb9e285a5c7fdd19e