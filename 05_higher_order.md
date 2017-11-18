{{meta {chap_num: 5, prev_link: 04_data, next_link: 06_object, load_files: ["code/scripts.js", "code/chapter/05_higher_order.js", "code/intro.js"], zip: "node/html"}}}
@!e05a3b6c33f2c2d15db85b112689415ad70af610

# Higher-Order Functions
@!100cd05ed2462073e181f51aa50f699b22222714

{{if interactive
@!753dd3a0be69d187c5c6ec5e3e935e4aa08b5afb

{{quote {author: "Master Yuan-Ma", title: "The Book of Programming", chapter: true}
@!9652a8e9b9129877ad0858b2551075627bb31f21

Tzu-li and Tzu-ssu were boasting about the size of their latest
programs. 'Two-hundred thousand lines,' said Tzu-li, 'not counting
comments!' Tzu-ssu responded, 'Pssh, mine is almost a *million* lines
already.' Master Yuan-Ma said, 'My best program has five hundred
lines.' Hearing this, Tzu-li and Tzu-ssu were enlightened.
@!8edfc61c44dd34557d0e46e6b62c57964c9c236e

quote}}
@!4536510891001e0f8f6034a2c7a9148d18716d8c

if}}
@!fa66bc1ca9676cf98f2f9654828f6b021d725b3b

{{quote {author: "C.A.R. Hoare", title: "1980 ACM Turing Award Lecture", chapter: true}
@!31d1c69430e79c8348e39c25e767750578d4ba35

{{index "Hoare, C.A.R."}}
@!8387ae76abe3a62a230c059a70f4c8843a4d826e

There are two ways of constructing a software design: One way is to
make it so simple that there are obviously no deficiencies, and the
other way is to make it so complicated that there are no obvious
deficiencies.
@!dd083b9c158dd20ed2b47ff53c785a00f08a4551

quote}}
@!f914f82154d04c89d937be03eff3b1e33846e733

{{index "program size"}}
@!ad483ace360d703c9a7cf0a2d1728a214abd7a3a

A large program is a costly program, and not just because of the time
it takes to build. Size almost always involves ((complexity)), and
complexity confuses programmers. Confused programmers, in turn, tend
to put mistakes (_((bug))s_) into programs. A large program then
provides a lot of space for these bugs to hide, making them hard to
find.
@!4d8d74101ed11d360f5580fed926eaa337a6bf14

{{index "summing example"}}
@!437188cc5a59fae5132071115d7c471ca8dae0c6

Let's briefly go back to the final two example programs in the
introduction. The first is self-contained and six lines long.
@!f3362010ac0e538d3e122852ed4ed0428d622b4a

```
let total = 0, count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log(total);
```
@!f6caaf75fe23df3d525a019993f23dde374302b2

The second relies on two external functions and is one line long.
@!94111df3ec2702ff4030fd13b01af35c71e4a634

```
console.log(sum(range(1, 10)));
```
@!17c57746e308e5703d6b70db644ce4e339ca87d8

Which one is more likely to contain a bug?
@!4b659b821b07bc72b228080c3b0145d4c2e43d25

{{index "program size"}}
@!b454be7a13c090768e37c6f2313b39709cb5e6a3

If we count the size of the definitions of `sum` and `range`, the
second program is also big—even bigger than the first. But still, I'd
argue that it is more likely to be correct.
@!cb143f2757a6f0b26e6efd4d95968bba19d3bef3

{{index abstraction, "domain-specific language"}}
@!db2c0d9f7fb784fbc5d65951c2b35a5a9907cf11

It is more likely to be correct because the solution is expressed in a
((vocabulary)) that corresponds to the problem being solved. Summing a
range of numbers isn't about loops and counters. It is about ranges
and sums.
@!baeb103dde3c75158c9ecb4d7b123fa153cf8e03

The definitions of this vocabulary (the functions `sum` and `range`)
will still involve loops, counters, and other incidental details. But
because they are expressing simpler concepts than the program as a
whole, they are easier to get right.
@!46c9ff1e059d7bedb7701ae6fd8538b0371c5cb2

## Abstraction
@!ebc9a0425ebcdc4595ede49d26352a946c6baf97

In the context of programming, these kinds of vocabularies are usually
called _((abstraction))s_. Abstractions hide details and give us the
ability to talk about problems at a higher (or more abstract) level.
@!05a1cca3d14b5e6b24bb870ed8c893aa8c67f135

{{index "recipe analogy", "pea soup"}}
@!09b63094c5e51b6f381661fad4f1c4a9cca57e61

As an analogy, compare these two recipes for pea soup:
@!d0c4ea2ce7d6012a08e4024777c72e1ef606f2c2

{{quote
@!ad37bb260901fe787b8cdb8690b049dd9bf24ced

Put 1 cup of dried peas per person into a container. Add water until
the peas are well covered. Leave the peas in water for at least 12
hours. Take the peas out of the water and put them in a cooking pan.
Add 4 cups of water per person. Cover the pan and keep the peas
simmering for two hours. Take half an onion per person. Cut it into
pieces with a knife. Add it to the peas. Take a stalk of celery per
person. Cut it into pieces with a knife. Add it to the peas. Take a
carrot per person. Cut it into pieces. With a knife! Add it to the
peas. Cook for 10 more minutes.
@!7333b4c34ad564058ca22f88f847e473b8c1d7e1

quote}}
@!3b0880fb97283ee499105acd915f325780d511c6

And the second recipe:
@!21a54fd101b98b2efbfdae4edf11456445b5d535

{{quote
@!5608424ef8b9855e6d08e4ee1bedb5e404459926

Per person: 1 cup dried split peas, half a chopped onion, a stalk of
celery, and a carrot.
@!71ddcceceb09fba2cd00b02c6139fccdbac2943e

Soak peas for 12 hours. Simmer for 2 hours in 4 cups of water
(per person). Chop and add vegetables. Cook for 10 more minutes.
@!9451b0f084ea07c864b6c84de24fcd1faeee3eed

quote}}
@!43146739f994ec727a741e25f390f500a0f0be9e

{{index vocabulary}}
@!f103dc479bf27a5488d7c7ee10b60ea0b5c0cd5c

The second is shorter and easier to interpret. But you do need to
understand a few more cooking-related words—_soak_, _simmer_, _chop_,
and, I guess, _vegetable_.
@!3dbd56214b9bf19d9377d609d919c3f34e7e8a37

When programming, we can't rely on all the words we need to be waiting
for us in the dictionary. Thus, you might fall into the pattern of the
first recipe—work out the precise steps the computer has to perform,
one by one, blind to the higher-level concepts that they express.
@!69230c3542ca61766f71707b134dfcfa7915af6c

{{index abstraction}}
@!54c81c5372ab365f01a2442e26ace53bb2487834

It is a useful skill for, in programming, to notice when you are
working at too low a level of abstraction.
@!1438acd700589972f396c9d825ebc51b9c3ef594

## Abstracting array traversal
@!2ab3c023fc2b131c2fa71d9ed5c1dc2de812095c

{{index array}}
@!9528a0866c35c9414d81d66fa95418a407a9f4e7

Plain functions, as we've seen them so far, are a good way to build
abstractions. But sometimes they fall short.
@!a86fac9156c73e298c1d86c2e72e9b25ded6d548

{{index "for loop"}}
@!fc29b71c7683a5e0e27f8d8ecacd2551ee904ae1

It is common for a program to do something a given number of times.
You can write a `for` ((loop)) for that, like this:
@!28463278712d08001fe0557f40895cb6e90c68b3

```
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```
@!fcb655f8c1c967946e05dbbf5cfac30abff90c73

Can we abstract "doing something _N_ times" as a function? Well, it's
easy to write a function that calls `console.log` _N_ times.
@!4ee3a1132a13669b75f8c4e036fbe688372445b3

```
function repeatLog(n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
}
```
@!302dc531f0d0b89f20cb147d0c6d803fb70ea069

{{index [function, "higher-order"], loop, [array, traversal], [function, "as value"], "forEach method"}}
@!429346a8d00a3d4fe82faade6ce65103dd61f60d

{{indexsee "higher-order function", "function, higher-order"}}
@!b7a39b89715f8d9885ecd30bda8fb77fae5c5784

But what if we want to do something other than logging the numbers?
Since "doing something" can be represented as a function and functions
are just values, we can pass our action as a function value.
@!788be565f3a9ce874315ed80f57940115ffff602

```
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, console.log);
// → 0
// → 1
// → 2
```
@!7d4ac723ed7e17a1870b56f127743df7dd52986d

That function is a small abstraction that makes it possible to express
repetition more clearly.
@!38a72778654381fc95182927ef85b3ecd8c33497

You don't have to pass a predefined function to `repeat`. Often, you'd
want to create a function value on the spot instead.
@!489feeaa8015f592d96ca1fe4fbc463647bf702f

```
let message = "Wow";
repeat(5, n => {
  message += "!";
});
console.log(message);
// → Wow!!!!!
```
@!9e5331b6b3666e59118bfe67aa9b88c7bfa5f2f1

{{index "loop body", "curly braces"}}
@!a1319d2f883a8fad458ddbc3adffa18bfeadd8ab

This is structured a little like a `for` loop—it starts by describing
the kind of loop, and then provides a body. However, the body is now
written as a function value, which is wrapped in the ((parentheses))
of the call to `forEach`. This is why it has to be closed with the
closing brace _and_ closing parenthesis. In cases like this, where the
body is a single small expression, you could also omit the curly
braces and write the loop on a single line.
@!0dfdc99b74b1dcce3c1ee58d0fc6a4b819b74748

## Higher-order functions
@!40ac68ce838b44d45e5bd7458b6768057b9540e8

{{index [function, "higher-order"], [function, "as value"]}}
@!6019f0aada2d2bf1f1a3baf1cbaee7f6cde995c7

Functions that operate on other functions, either by taking them as
arguments or by returning them, are called _higher-order functions_.
If you have already accepted the fact that functions are regular
values, there is nothing particularly remarkable about the fact that
such functions exist. The term comes from ((mathematics)), where the
distinction between functions and other values is taken more
seriously.
@!89ff798bced23391e0c3b0ab4db840a3b04a504d

{{index abstraction}}
@!fea6b6009462c8aac23ced4bb147cadfe8e3986d

Higher-order functions allow us to abstract over _actions_, not just
values. They come in several forms. For example, you can have
functions that create new functions.
@!401f589d7cfd670c37e1e638868489f7e883f4d3

```
function greaterThan(n) {
  return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// → true
```
@!382cc0a59f9da4a59b458ff13b798990188851c7

And you can have functions that change other functions.
@!98a2743711505710faf8260f26d926b4845eca2b

```
function noisy(f) {
  return (...args) => {
    console.log("calling with", args);
    let result = f(...args);
    console.log("called with", args, ", returned", result);
    return result;
  };
}
noisy(Math.min)(3, 2, 1);
// → calling with [3, 2, 1]
// → called with [3, 2, 1] , returned 1
```
@!ff7e465e9aefc536336d1a799ef6b3b9f2a7b99b

You can even write functions that provide new types of ((control
flow)).
@!3e84aa9fd0fc7f2c245fcaf8e9e61536ea433740

```
function unless(test, then) {
  if (!test) then();
}

repeat(3, n => {
  unless(n % 2, () => {
    console.log(n, "is even");
  });
});
// → 0 is even
// → 2 is even
```
@!9a5af031eaa0f610b89f4e59b2d5b33db61203a4

{{index [array, methods], [array, iteration], "forEach method"}}
@!ba7dfed7ab9b0b719100d2af3b8022fba4330a96

There is a built-in array method, `forEach` that provides something
like a `for`/`of` loop as a higher-order function.
@!90718dc0c29c9f1a2e1178dad822e17bdb87fa51

```
["A", "B"].forEach(l => console.log(l));
// → A
// → B
```
@!e3bc632d2bae20289c9da47b7307804625c369e2

## Script data set
@!7541448366850f613eb84c26528ed3b872c13def

One area where higher-order functions shine is data processing. In
order to process data, we'll need some data. This chapter will use a
((data set)) about ((writing system))s—such as Latin, Cyrillic, and
Arabic.
@!015b94238f41976ed7d6459f768aacad41bccd06

Remember ((Unicode)) from [Chapter 1](01_values.html#unicode), the
system that assigns a number to each character in written language.
Most of these characters are associated with a script. The standard
contains 140 different scripts. 81 of those are still in use today.
@!ec41a46bcba94ff859d38d153dedef1df335681b

Though I can only fluently read Latin characters, I appreciate the
fact that people are writing texts in at least 80 other writing
systems, many of which I wouldn't even recognize. For example, here's
a sample of ((Tamil)) handwriting.
@!0bc3bc374f68cff29639f6e231cae10d3f5a60f8

{{figure {url: "img/tamil.png", alt: "Tamil handwriting"}}}
@!918613968f664ea028b948890d71e184cb67432b

{{index "SCRIPTS data set"}}
@!fe6a4d6b25def5291cf8774384ed3b6e1fa0d8cf

The example ((data set)) contains information about the 140 scripts
defined in Unicode. It is available in the coding sandbox for this
chapter[
([_eloquentjavascript.net/code#5_](http://eloquentjavascript.net/code#5)]{if
book} as the `SCRIPTS` binding. This binding contains an array of
objects, each of which describes a script.
@!554ec924747830b0e31de2a13fe6d7feb181a7ce

```{lang: "application/json"}
{
  name: "Coptic",
  ranges: [[994, 1008], [11392, 11508], [11513, 11520]],
  direction: "ltr",
  year: -200,
  living: false,
  link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
}
```
@!54d17a7cb2bde49e0bf743ef35fb8c91fe386106

Such an object tells you the name of the script, the Unicode ranges
assigned to it, the direction in which it is written, the
(approximate) origin time, whether it is still in use, and a link to
more information. Direction may be `"ltr"` for left-to-right, `"rtl"`
for right-to-left (the way Arabic and Hebrew text are written), or
`"ttb"` for top-to-bottom (as with Mongolian writing).
@!82c92114769f7a38c102957121717b7b77fa7c67

{{index "slice method"}}
@!b0aa63cd630a3324c2000ea0448d8dd4228da3af

The `ranges` property contains an array of Unicode character
((range))s, each of which is a two-element array containing a lower
and upper bound. Any character codes within these ranges are assigned
to the script. The lower ((bound)) is inclusive (code 994 is a Coptic
character) and the upper bound non-inclusive (code 1008 isn't). When
working with ranges, dealing with the boundaries can be confusing, so
I recommend to just do what the `slice` method on arrays and strings
does whenever possible, using an inclusive lower bound and exclusive
upper bound.
@!8bbc4488dd5a43ef9099d28a6abd9ab6567af8f0

## Filtering arrays
@!4b2d2959a2a05247d1464aad3795de2d092d8c64

{{index [array, methods], [array, filtering], "filter method", [function, "higher-order"], "predicate function"}}
@!5ca334b437c643493e05da14bccdf3296f098e69

To find the scripts in the data set that are still in use, the
following function might be helpful. It filters out the elements in an
array that don't pass a test.
@!877a9e5ce269f69d1884ded6e1b968c3a478dd81

```
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}

console.log(filter(SCRIPTS, script => script.living));
// → [{name: "Adlam", …}, …]
```
@!962e9653cfa31f0de560ae822abd37869a2279db

{{index [function, "as value"], [function, application]}}
@!9aa89463ec4a955f1b3dfea3c6ece928f2316f87

This uses the argument named `test`, a function value, to fill in a
“gap” in the computation. The `test` function is called for each
element, and its return value determines whether an element is
included in the returned array.
@!5e10918b4e4447b311b2649075ce73392ce5a5e6

This finds and collects the 81 living scripts in the data set.
@!e4fd41ed852ad9ec2e7e3f4f4659088c3629d4be

{{index "filter method", "pure function", "side effect"}}
@!27ff23780c38b9aae4ebe4ff05e2fdb7ef2dc379

Note how the `filter` function, rather than deleting elements from the
existing array, builds up a new array with only the elements that pass
the test. This function is _pure_. It does not modify the array it is
given.
@!37e8af2fb8e01d008f0bfdbfdd49c341b3806746

Like `forEach`, `filter` is also a ((standard)) method on arrays. The
example defined the function only in order to show what it does
internally. From now on, we'll use it like this instead:
@!8131cb7f1218bfb0f5ec5e780e5f5d45e96b419d

```
console.log(SCRIPTS.filter(s => s.direction == "ttb"));
// → [{name: "Mongolian", …}]
```
@!920e337e748526e5c52db144736593f1d3d04b44

## Transforming with map
@!6fa1ceab7e977c54fa2487f75d9111a757e12f5e

{{index [array, methods], "map method"}}
@!c563cb4524c31f9bf971acae944d05a4d0cd993f

Say we have an array of objects representing scripts, produced by
filtering the `SCRIPTS` array somehow. But we want an array of names,
which is easier to inspect.
@!0957a17a35406b2266b1ef908e7d0075521d5582

{{index [function, "higher-order"]}}
@!9e3ff33905f4ca3adb964f1a7daade1899bea207

The `map` method transforms an array by applying a function to all of
its elements and building a new array from the returned values. The
new array will have the same length as the input array, but its
content will have been “mapped” to a new form by the function.
@!cf3f7a0d0680321e67017dda926068e173bff789

```
function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}

let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
console.log(map(rtlScripts, s => s.name));
// → ["Adlam", "Arabic", "Imperial Aramaic", …]
```
@!a884965cdb68831ba2802023bfcc16357d3ecb13

Like `forEach` and `filter`, `map` is also a standard method on
arrays.
@!0aa9b8e75aa9a18a307dcbade3abba74e42ab5e8

## Summarizing with reduce
@!3a5840628c630507b395839754f74c47759ca333

{{index [array, methods], "summing example", "reduce method"}}
@!5efe96b76e1252fe9b7d0997567f5126e271bdf6

Another common pattern of computation on arrays is computing a single
value from them. Our recurring example, summing a collection of
numbers, is an instance of this. Another example would be finding the
script with the most characters in the data set.
@!0cf913ed15aa2f846c86550a498e0871802747b7

{{index [function, "higher-order"], "fold function"}}
@!df4d412d90ff804c555419f5be522705453c3a54

The higher-order operation that represents this pattern is called
_reduce_ (or sometimes _fold_). You can think of it as folding up the
array, one element at a time. When summing numbers, you'd start with
the number zero and, for each element, combine it with the current sum
by adding.
@!6ceb2f2749ab33873a15e08d1a28d762f14644c1

The parameters to the `reduce` function are, apart from the array, a
combining function and a start value. This function is a little less
straightforward than `filter` and `map`, so pay close attention.
@!c2c3d0d6bd70acae4999474a8c370c4ea2022539

```
function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10
```
@!197d450b9ed23e5d0951156882a9481af95e48ce

{{index "reduce method", "SCRIPTS data set"}}
@!4d9bc381f59a25cb9ef209e44f784e15da342931

The standard array method `reduce`, which of course corresponds to
this function, has an added convenience. If your array contains at
least one element, you are allowed to leave off the `start` argument.
The method will take the first element of the array as its start value
and start reducing at the second element.
@!14a5ee1d4ebe22792f6e92142016f6cd293b6c8e

```
console.log([1, 2, 3, 4].reduce((a, b) => a + b));
// → 10
```
@!0c7f47560d8cb55e01319b944e6cd0cf8d8a12af

{{index maximum, "characterCount function"}}
@!92ca222e72c46b6cb3d47abfe1baacdc5bd10681

To use `reduce` (twice) to find the script with the most characters,
we can write something like this:
@!7d9e167c0c283860d701d20ced7692a1d772b7e8

```
function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}

console.log(SCRIPTS.reduce((a, b) => {
  return characterCount(a) < characterCount(b) ? b : a;
}));
// → {name: "Han", …}
```
@!fefc289885fa569d004e0d3ae9afdb7b3bec2aba

The `characterCount` function reduces the ranges assigned to a script
by summing their sizes. Note the use of destructuring in the parameter
list of the reducer function. The second call to `reduce` then uses
this to find the largest script by repeatedly comparing two scripts
and returning the larger one.
@!aefb0d306be6126258c5fa22f44c08f157b372b4

The Han script has over 89 thousand characters assigned to it in the
Unicode standard, making it by far the biggest writing system in the
data set. Han is a script (sometimes) used for Chinese, Japanese, and
Korean text. Those languages share a lot of characters, though they
tend to write them somewhat differently. The (US based) Unicode
consortium decided to treat them as a single writing system in order
to save character codes. This is called "Han unification" and still
makes some people very angry.
@!8986238bf25dd0fc59129f0bfad0eb4209a3cdfe

## Composability
@!d5f998f1fcfd459d75e9d1efef232cda58c08eb2

{{index loop, maximum}}
@!99dbe14a17c4acfa2bb8add05d106944789fbab7

Consider how we would have written the previous example (finding the
biggest script) without higher-order functions. The code is not that
much worse.
@!8eaf4fd73b31374eeb4087209fd14cacd2e77aee

```{test: no}
let biggest = null;
for (let script of SCRIPTS) {
  if (biggest == null ||
      characterCount(biggest) < characterCount(script)) {
    biggest = script;
  }
}
console.log(biggest);
// → {name: "Han", …}
```
@!5dc8f8c8c3ce366abdb353a816f30e017ba6cca5

There are a few more ((binding))s, and the program is four lines
longer but still quite easy to understand.
@!9a552d9ff0325799fd3f2107f5811f5123815ab5

{{index "average function", composability, [function, "higher-order"], "filter method", "map method", "reduce method"}}
@!75da79854a100c5db45d920c8263c82e87e12b62

{{id average_function}}
@!19f37195a226bf946c0975aa1c1c503a7de067ec

Higher-order functions start to shine when you need to _compose_
operations. As an example, let's write code that finds the average
year of origin for left-to-right and right-to-left scripts in the data
set.
@!16bf02bef39ded50c34729ccb6a7311bc566f7f8

```
function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

console.log(Math.round(average(
  SCRIPTS.filter(s => s.living).map(s => s.year))));
// → 1185
console.log(Math.round(average(
  SCRIPTS.filter(s => !s.living).map(s => s.year))));
// → 209
```
@!edffdd909b45629f4e620962f38a0e48f46059ce

So the dead scrips in Unicode are, on average, older than the living
ones. This is not a terribly meaningful or surprising statistic. But I
hope you'll agree that the code used to compute it isn't hard to read.
You can see it as a pipeline: we start with all scripts, filter out
the living (or dead) ones, take the years from those, average them,
and round the result.
@!4bdef955a0674b2b02b7c01d2f7783edadcecc7d

You could definitely also write this computation as one big ((loop)).
@!c8784fd51a3d0357fa5a0480157cfce19e2ee820

```
let total = 0, count = 0;
for (let script of SCRIPTS) {
  if (script.living) {
    total += script.year;
    count += 1;
  }
}
console.log(Math.round(total / count));
// → 1185
```
@!f8c585372113a0e83920dc43866e07d741d72cf4

But it is harder to see what was being computed and how. And because
intermediate results aren't represented as coherent values, it'd be a
lot harder to extract something like `average` into a separate
function.
@!bf879ec7a04110231d6a24b3b4d147525f12edd2

{{index efficiency}}
@!1bd2646680bd58d4fa19da52fb575a699147fedd

In terms of what the computer is actually doing, these two approaches
are also quite different. The first will build up new ((array))s when
running `filter` and `map`, whereas the second only computes some
numbers, doing less work. You can usually afford the readable
approach, but if you're processing huge arrays, and doing so many
times, the more awkward loop style might be worth the extra speed.
@!94df1db511243a05201212e7f0b2111c1a0df69e

## Strings and character codes
@!36146a88e61043c99f13a45303873d993bf3331c

{{index "SCRIPTS data set"}}
@!3f554c205d225dc1a8ea80d12b917b8504663b09

One use of the data set would be figuring out what script a piece of
text is using. Let's go through an example that does this.
@!075baf20d63489273d362674844a6fa038e5ec37

Remember that each script has an array of character code ranges
associated with it. So given a character code, we could use a function
like this to find the corresponding script (if any):
@!f91d2b44cc7c5a0fb8b892e18dd6a6a7b3cbe089

{{index "some method", "predicate function", [array, methods]}}
@!e7dde81fa8321c0253460244d40d355a0165a137

```{includeCode: strip_log}
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => code >= from &&
                                           code < to)) {
      return script;
    }
  }
  return null;
}

console.log(characterScript(121));
// → {name: "Latin", …}
```
@!f16ee9cd39408c530ebcec92729297fcb7e98a18

The `some` method on arrays is another higher-order function. It takes
a test function and tells you if that function returns true for any of
the elements in the array.
@!3186c1a52e37473541973899bbdb68f185ba9111

{{id code_units}}
@!a4b6c061554b24abe41bb005110b938d41571944

But how do we get the character codes in a string?
@!12011a693fe13e06578bc6486bb7967e696b3d95

In [Chapter 1](01_values.html) I mentioned that JavaScript ((string))s
are encoded as a sequence of 16-bit number called _((code unit))s_. A
((Unicode)) ((character)) code was initially supposed to fit within
such a unit (which gives you a little over 65 thousand characters).
When it became clear that that wasn't going to be enough, many people
balked at the need to use more memory per character. To address these
concerns, ((UTF-16)), the format used by JavaScript strings, was
invented. It describes some character using a single 16-bit code unit,
and others using a pair of two such units.
@!1a31bdbda2592529e59d1ce9b225c4c9a5aaa324

{{index error}}
@!1b0c2a9e39892530d5ec368f523ea63c7bcb859d

UTF-16 is generally considered a bad idea now. It seems almost
intentionally designed to invite mistakes. It's easy to write programs
that pretends code units and characters are the same thing. And if
your language doesn't use two-unit characters, that will appear to
work just fine. But as soon as someone tries to use such a program
with some less common ((Chinese characters)), it breaks. Fortunately,
with the advent of ((Emoji)), everybody has started using two-unit
characters, and the burden of dealing with such problems is more
fairly distributed.
@!62f67f9e9a08d4e7806965b463297088dfb95372

{{index [string, length], [string, indexing], "charCodeAt method"}}
@!3e5a02dc18f1f33b0312f7f8e74c4a5ef15adce2

Unfortunately, obvious operations on JavaScript strings, such as
getting their length through the `length` property and accessing their
content using square brackets, deal only with code units.
@!ecb6c09d73f475dfdcced43630906ee9f02d5993

```{test: no}
// Two Emoji characters, horse and shoe
let horseShoe = "🐴👟";
console.log(horseShoe.length);
// → 4
console.log(horseShoe[0]);
// → (Invalid half-character)
console.log(horseShoe.charCodeAt(0));
// → 55357 (Code of the half-character)
console.log(horseShoe.codePointAt(0));
// → 128052 (Actual code for horse Emoji)
```
@!31bbf6e32a411bede71c1b7574042f7021027ae1

{{index "codePointAt method"}}
@!c6f1669f4fad768aa77aeee3c904356b1bf5073e

Note that JavaScript's `charCodeAt` method gives you a code unit, not
a full character code. The `codePointAt` method, added later, does
give a full Unicode character. So we could use that to get characters
from a string. But the argument passed to `codePointAt` is still an
index into the sequence of code units. So to run over all characters
in a string, we'd still need to deal with the question of whether a
charcter takes up one or two code units.
@!253662883b0eb26edb66de765474ba79f73cb74b

{{index "for/of loop", character}}
@!ba9c774ccb3ecb0022bf859af6db4f9cdf77abc1

In the [previous chapter](04_data.html#for_of_loop), I mentioned that
a `for`/`of` loop can also be used on strings. Like `codePointAt`,
this type of loop was introduced at a time where people were acutely
aware of the problems with UTF-16. And when you use it to loop over a
string, it gives you real characters, not code units.
@!4dfd1845b867b69f929b5626d306fee66c7334d0

```
let roseDragon = "🌹🐉";
for (let char of roseDragon) {
  console.log(char);
}
// → 🌹
// → 🐉
```
@!c43e51357751179de88bf1e40ed2ed46b5894d6f

If we have a character (which will be a string of one or two code
units), we can use `codePointAt(0)` to get its code.
@!f3f8ad2e8eb4fc095229aecad1b7ef5355a7c817

## Recognizing text
@!d0d2acaaf0142333ef5bf426ca7c943704acb04a

{{index "SCRIPTS data set", "countBy function", array}}
@!fead9c344cc793a979ea75214e7467dc88613dd8

We have a `characterScript` function and a way to correctly loop over
characters. The next step would be to count the characters that belong
to each script. The following counting abstraction will be useful
there.
@!729486c398e2627520a1ff944ffb1ffa65232aa4

```{includeCode: strip_log}
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]
```
@!31bf48ead872dc42d239295fa826a5d0a284ecbf

The `countBy` function expects a collection (anything that we can loop
over with `for`/`of`) and a grouping function. It returns an array of
objects, each of which names a group and tells you the amount of
elements that were found in that group.
@!a75690d9085a8e5a860d42036526b70ab73e63cb

{{index "findIndex method", "indexOf method"}}
@!1308ae29c8e43e7033c609badc794676fa2557cb

It uses a new array method `findIndex`. This method is somewhat like
`indexOf`, but instead of looking for a specific value, it looks for
the first value for which the given function returns true. Like
`indexOf`, it returns -1 when no such element is found.
@!d400a5fa527a89a2f5ff786cf86209013a80f476

{{index "textScripts function", "Chinese characters"}}
@!b94c7fe200517704218cad819b2b7a6b0fdd9d50

Using that, we can write the function that tells us which scripts are
used in a piece of text.
@!e95c09174e79623fa9d0f80be5fd61ee7cfd8df0

```{includeCode: strip_log}
function textScripts(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({name}) => name != "none");

let total = scripts.reduce((n, {count}) => n + count, 0);
  if (total == 0) return "No scripts found";

return scripts.map(({name, count}) => {
    return `${Math.round(count * 100 / total)}% ${name}`;
  }).join(", ");
}

console.log(textScripts('英國狗說“woof”，但俄羅斯狗說“тяв”'));
// → 59% Han, 24% Latin, 18% Cyrillic
```
@!f0f4191809088d02492ca95ec3448b56172fd765

{{index "characterScript function", "filter method"}}
@!80667bbc27d88868619cd1d99c5daeb2ff0aa448

The function first counts the characters by name, using
`characterScript` to assign them a name, and falling back to the
string `"none"` for characters that aren't part of any script. The
`filter` call then drops the entry for `"none"` from the resulting
array, since we aren't interested in that.
@!c7d5e0a6afd516bc2592683af40c3feee57e3465

{{index "reduce method", "map method", "join method", [array, methods]}}
@!135bc5ffb6501a56f0d62db5d03be15cfc2e986c

To be able to compute ((percentage))s, we first need the total amount
of characters that belong to a script, which we can compute with the
`reduce` method. If no such characters are found, the function returns
a specific string. Otherwise, it transforms the counting entries into
readable strings with `map`. Finally, it turns the resulting array
into a single string with the `join` method, which will insert the
string it is given in between each of the elements of the array.
@!7fbfba23cc81434f579bb64d61d597d3d18051b0

## Summary
@!8005d7881577ad1d15bf1c415deea32e35eecbde

Being able to pass function values to other functions is not just a
gimmick—it's a deeply useful aspect of JavaScript. It allows us to
write functions that model computations with “gaps” in them. The code
that calls these functions can fill in the gaps by providing function
values.
@!1a96a5cbdf8531bfc63c3c2b1653439bb073253d

Arrays provide a number of useful higher-order methods—`forEach` to
loop over the elements in an array, `filter` to build a new array with
some elements filtered out, `map` to build a new array where each
element has been put through a function, `reduce` to combine all an
array's elements into a single value, `some` to see whether any
element matches a given predicate function, and `findIndex` to find
the position of the first element that matches a predicate.
@!feb76eb759c8a6865b8e8ef519d23a2782fb502c

## Exercises
@!d6916aff63998305dbc64fb6102001e6ff2b97e6

### Flattening
@!9bc8461d3443d83132f7b9e1c6dd939d60b96095

{{index "flattening (exercise)", "reduce method", "concat method", array}}
@!fed3f70881e85c04da458991840771406bb4fbba

Use the `reduce` method in combination with the `concat` method to
“flatten” an array of arrays into a single array that has all the
elements of the input arrays.
@!4ac4917e8248b234ad052d382ce20998c8d4ab9f

{{if interactive
@!855e7c6393d0ac892b3ad279f74242186642da94

```{test: no}
let arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
// → [1, 2, 3, 4, 5, 6]
```
@!4cd0721b483a2c7fe048ee72845db21bf7fde983

if}}
@!0699dfc4da32f99d8cd6aea5954bfdda3f5a8483

### Your own loop
@!af1811803568a98189be509446aedd211a33d36d

{{index "your own loop (example)", "for loop"}}
@!277fffb271179e885d7f1eed65b039090c683930

Write a higher-order function `loop` that provides a way to something
like a `for` loop statement. It takes a value, a test function, an
update function, and a body function. Each iteration, it first runs
the test function on the current loop value, and stops if that returns
false. Then, it calls the body function, giving it the current value.
And finally, it calls the update function to create a new value, and
starts from the beginning.
@!3d1b0c77de37bfafc392304d73f37835580ecc52

{{if interactive
@!76b4412ca2a7daad29ce79c8f4abcd9be56a45e3

```{test: no}
// Your code here.

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1
```
@!97f670df91d3a0766fc578aa802e0b1aca623977

if}}
@!0b1d8892c9de1355c2aa7fad14a3ed5b81ea2a21

### Everything
@!37ccf11b2c30f747bdeb0a0d410bd8f374ba7e9f

{{index "predicate function", "everything (exercise)", "every method", "some method", [array, methods], "&& operator", "|| operator"}}
@!bbe36b4f9beb18fe55eeb5a1b43d64fa40f34806

Analogous to the `some` method, arrays also have an `every` method.
This one returns true when the given function returns true for _every_
element in the array. In a way, `some` is a variant of the `||`
operator that can act on arrays, and `every` acts like the `&&`
operator.
@!94f097016396aa884191c3fc1ab782ff644b972d

Implement `every` as a function that takes an array and a predicate
function as parameters. Write two versions, one using a loop and one
using the `some` method.
@!b272d52b0303a731fef96b13ae41fbddb840669a

{{if interactive
@!1090c44edc24d4b0cb1fd8918247967d5effa206

```{test: no}
function every(array, test) {
  // Your code here.
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true
```
@!a3bfba99c7475d4616efa6d8699bc4f2047dfd6c

if}}
@!df67731cbbd9237a5ae5d4e8b3c140a61d646d13

{{hint
@!4c3f7ea3b952e6384c958dfebc3a96c5634569e3

{{index "everything (exercise)", "short-circuit evaluation", "return keyword"}}
@!1e3ca3445bc5f4e46f2d6b95c4385e4a53aed3dd

Like the `&&` operator, the `every` method can stop evaluating further
elements as soon as it has found one that doesn't match. So the
loop-based version can jump out of the loop—with `break` or
`return`—as soon as it runs into an element for which the predicate
function returns false. If the loop runs to its end without finding
such an element, we know that all elements matched and we should
return true.
@!746882a4c8c2a800f6d69f7669b9db59913f7618

To build `every` on top of `some`, we can apply "((De Morgan's
laws))", which state that `a && b` equals `!(!a || !b)`. This can be
generalized to arrays, where all elements in the array match if there
is no element in the array that does not match.
@!2bd15c800d2b311facc6151db49b449b5a3eb854

hint}}
@!a99960e2302f1a224ad24cdc4ecbda474c9dc090

### Dominant writing direction
@!6d247a4dd1b1cfa6a55c981c94a6cff36e94046e

{{index "SCRIPTS data set", "direction (writing)", "groupBy function", "dominant direction (exercise)"}}
@!d25ae3f17f0d9e38d07924ad6e8f3fdc25bdb460

Write a function that computes the dominant writing direction in a
string of text. Remember that each script object has a `direction`
property that can be `"ltr"` (left-to-right), `"rtl"` (right-to-left),
or `"ttb"` (top-to-bottom).
@!b648ae538c659808ba5019a5cbaaa9ca480365cf

{{index "characterScript function", "countBy function"}}
@!01f9ad6cd627534d5fdd3ddb701491dca3dc621c

The dominant direction is the direction of a majority of the
characters which have a script associated with them. The
`characterScript` and `countBy` functions defined earlier in the
chapter are probably useful here.
@!8538bb6e7c111b92112f8f6c1e1c1e77a545a1fb

{{if interactive
@!7ae48e7093473e81bd6bf7f5ba003ef867f57407

```{test: no}
function dominantDirection(text) {
  // Your code here.
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
```
@!88f6f66307fba20837e864bb6f3ca99bac627b9d

if}}
@!0f3c5692a38144bf49b1fee739f78959f1f7d275

{{hint
@!efe19b248d79b2844ab4c84d0dbe0f82831795f6

{{index "dominant direction (exercise)", "textScripts function", "filter method", "characterScript function"}}
@!7f60521654613d6537582d55c5b1d7337b504971

Your solution might look a lot like the first half of the
`textScripts` example. You again have to count characters by a
criteria based on `characterScript`, and then filter out the part of
the result that refers to uninteresting (script-less characters).
@!ee0d72d413d817b6ad3885e74127e5ccbb069de0

{{index "reduce method"}}
@!2d36db41d4e588afec2ddc1f89cd1b812ac0b379

Finding the direction with the highest character count can be done
with `reduce`. If it's not clear how, refer back to the example
earlier in the chapter, where `reduce` was used to find the script
with the most characters.
@!036e622552a82e53ba8ffce255d87019f6ef9211

hint}}
@!47f463a3a5447e8913de0042caf064bc6fccc886