{{meta {chap_num: 4, prev_link: 03_functions, next_link: 05_higher_order, load_files: ["code/jacques_journal.js", "code/chapter/04_data.js"], zip: "node/html"}}}
@!8069d68ac8251dd8551cd39252937c9e9ffce27e

# Data Structures: Objects and Arrays
@!3acf5db98a77c4504d68625ee3a06bca54c776b0

{{quote {author: "Charles Babbage", title: "Passages from the Life of a Philosopher (1864)", chapter: true}
@!dc4f43ff2e554739fee6a6f9d92ce716c9b50e51

On two occasions I have been asked, ‘Pray, Mr. Babbage, if you put
into the machine wrong figures, will the right answers come out?’
[...] I am not able rightly to apprehend the kind of confusion of
ideas that could provoke such a question.
@!e7ff3872f3f612aba841ac0a6908507476a6a6a0

quote}}
@!4914f0f868dd384249af50f1002b0a7acc5dee13

{{index "Babbage, Charles", object, "data structure"}}
@!dece59227d2bf0cf7ba04681dddea5fc25a57e09

Numbers, Booleans, and strings are the atoms that ((data)) structures
are built from. Many types of information require more than one
atom, though. _Objects_ allow us to group values—including other
objects—together to build more complex structures.
@!048a7ad89fa8a1dc27bdd31088c91b467543cc02

The programs we have built so far have been limited by the fact that
they were operating only on simple data types. This chapter will
introduce basic data structures. By the end of it, you'll know enough
to start writing useful programs.
@!5955e052d358c580f060e10e47d80c110af992f1

The chapter will work through a more or less realistic programming
example, introducing concepts as they apply to the problem at hand.
The example code will often build on functions and bindings that were
introduced earlier in the text.
@!ca1ffeba6e2a02323ca70dc2a0c79689902a241e

{{if book
@!1908c4a9222c59764d687b87f58ace96774e0f02

The online coding ((sandbox)) for the book
(http://eloquentjavascript.net/code[_eloquentjavascript.net/code_])
provides a way to run code in the context of a specific chapter. If
you decide to work through the examples in another environment, be
sure to first download the full code for this chapter from the sandbox
page.
@!9038113578c5af62d86a4b7d83c10aa3e14da75d

if}}
@!b2a85bef891545270e3fd1151b89675e79c6633b

## The weresquirrel
@!0f2ecef8955b333b2dc145a13adaa5946bd4e269

{{index "weresquirrel example", lycanthropy}}
@!67e6d51d155cdb7c92c755236bd6863cb345cb73

Every now and then, usually between eight and ten in the evening,
((Jacques)) finds himself transforming into a small furry rodent with
a bushy tail.
@!a6dfee9640bb20d4d72e2de1c4ded773a15fc1e6

On one hand, Jacques is quite glad that he doesn't have classic
lycanthropy. Turning into a squirrel does cause fewer problems than
turning into a wolf. Instead of having to worry about accidentally
eating the neighbor (_that_ would be awkward), he worries about being
eaten by the neighbor's cat. After two occasions where he woke up on a
precariously thin branch in the crown of an oak, naked and
disoriented, he has taken to locking the doors and windows of his room
at night and putting a few walnuts on the floor to keep himself busy.
@!b356882938c2214cfed3b9a31faf92e60e5bf1d5

{{figure {url: "img/weresquirrel.png", alt: "The weresquirrel"}}}
@!86e0827fe2e12e22123eb0fbe2607d191f4ac37e

That takes care of the cat and tree problems. But Jacques would prefer
to get rid of his condition entirely. The irregular occurrences of the
transformation make him suspect that they might be triggered by
something. For a while, he believed that it happened only on days when
he had been near oak trees. But avoiding oak trees did not cause the
problem to stop.
@!c3e595e923026878737894f9009b9e505f7108ab

{{index journal}}
@!4d74208367e83467f7018613eedc773d151d8243

Switching to a more scientific approach, Jacques has started keeping a
daily log of everything he does on a given day and whether he changed
form. With this data he hopes to narrow down the conditions that
trigger the transformations.
@!ef8e51cff5e81ee6de302744bb903ec040067cc1

The first thing he needs is a data structure to store this
information.
@!ed493e899d7c83a249f68c4247a03572315f7855

## Data sets
@!4d6d4f1023b52be8800ca019ee87c6a5492e2f3f

{{index "data structure"}}
@!00a92164e722af38df02ba3090324dffaff773ea

To work with a chunk of digital data, we'll first have to find a way
to represent it in our machine's ((memory)). Say, as an example, that
we want to represent a ((collection)) of numbers: 2, 3, 5, 7, and 11.
@!945b21dea90ac4c11435686706469e31e3154efb

{{index string}}
@!fa57c97ba2bc062844ca493cc59b375697a9f55b

We could get creative with strings—after all, strings can have any
length, so we can put a lot of data into them—and use `"2 3 5 7 11"`
as our representation. But this is awkward. You'd have to somehow
extract the digits and convert them back to numbers to access them.
@!8be7200a2ca224b65d5c62eb92890f0e4f5bdd15

{{index [array, creation], "[] (array)"}}
@!2378f00a8f87a870a7e47bd77e2f76f8f8d46319

Fortunately, JavaScript provides a data type specifically for storing
sequences of values. It is called an _array_ and is written as a list
of values between ((square brackets)), separated by commas.
@!006418733b2d4595174c7683dc8e0c211d7539cd

```
let listOfNumbers = [2, 3, 5, 7, 11];
console.log(listOfNumbers[2]);
// → 5
console.log(listOfNumbers[0]);
// → 2
console.log(listOfNumbers[2 - 1]);
// → 3
```
@!1f6f91ca526fec23e84ff4e9a4f1d9e34b36518b

{{index "[] (subscript)", [array, indexing]}}
@!6221df5fbd0f09913821638a429ad4b8c201f610

The notation for getting at the elements inside an array also uses
((square brackets)). A pair of square brackets immediately after an
expression, with another expression inside of them, will look up the
element in the left-hand expression that corresponds to the
_((index))_ given by the expression in the brackets.
@!4ef4b94fe334a2c679fa0529152e96471679f67b

{{id array_indexing}}
@!4ff6958c288bf2bb5c7d8aa8566d7954283dc3ab

{{index "zero-based counting"}}
@!199c70fd405c88ef23f9c956d103873439e2416c

The first index of an array is zero, not one. So the first element is
read with `listOfNumbers[0]`. This convention takes some getting used
to. Zero-based counting has a long tradition in technology, and in
certain ways makes a lot of sense. Think of the index as the amount of
items to skip, counting from the start of the array.
@!234e31c15f60fc181ad2e07f5c8c9ed5d20516d7

{{id properties}}
@!281c50984accee5a1b1caf04902dd4be4442bef8

## Properties
@!c84fd987dd1f1228a17d85ce82ac8eacf784de33

{{index "Math object", "Math.max function", ["length property", "for string"], [object, property], "period character"}}
@!c45814875aeb5a4536d714d1f3c265556b376847

We've seen a few suspicious-looking expressions like `myString.length`
(to get the length of a string) and `Math.max` (the maximum function)
in past examples. These are expressions that access a _((property))_
of some value. In the first case, we access the `length` property of
the value in `myString`. In the second, we access the property named
`max` in the `Math` object (which is a collection of
mathematics-related values and functions).
@!b72107c9b24f7093f5046f8c7f8d33a524e24068

{{index property, null, undefined}}
@!36605fcfa1758eef4305744f98b979e4ff22a9c5

Almost all JavaScript values have properties. The exceptions are
`null` and `undefined`. If you try to access a property on one of
these nonvalues, you get an error.
@!6ad53904b51236de86ba9acaa6335e8c343c588f

```{test: no}
null.length;
// → TypeError: Cannot read property 'length' of null
```
@!633c535b4301a6b890ce70ee1623a56a9b0f1cfd

{{indexsee "dot character", "period character"}}
@!4fee0e0fc133fa1fd8f7cf28957b5a7d270c6f0f

{{index "[] (subscript)", "period character", "square brackets", "computed property"}}
@!f2cfbc5d1190cf6c3192c85304795d80fc266a46

The two main ways to access properties in JavaScript are with a dot
and with square brackets. Both `value.x` and `value[x]` access a
((property)) on `value`—but not necessarily the same property. The
difference is in how `x` is interpreted. When using a dot, the word
after the dot is the literal name of the property. When using square
brackets, the expression between the brackets is _evaluated_ to get
the property name. Whereas `value.x` fetches the property of `value`
named “x”, `value[x]` tries to evaluate the expression `x` and uses
the result as the property name.
@!09cae3c3715aeeca4b8e5040edabdcb902eeafaa

So if you know that the property you are interested in is called
“length”, you say `value.length`. If you want to extract the property
named by the value held in the binding `i`, you say `value[i]`.
Property names can be any string, and the dot notation only allows
names that look like valid binding names, so if you want to access a
property named “2” or “John Doe”, you must use square brackets:
`value[2]` or `value["John Doe"]`.
@!a8cd65f1b758ec40c1eb342d2b1c35f7669edff0

The elements in an ((array)) are stored as the array's properties, using
numbers as property names. Because you can't use the dot notation with
numbers, and usually want to use a binding that holds the index
anyway, you have to use the bracket notation to get at them.
@!9665a534be430930bc897dc1a54f9c2b8ac8ff62

{{index ["length property", "for array"], [array, "length of"]}}
@!d9bddbc4e830b88a233611382e93a3decb77cbbc

The `length` property of an array tells us how many elements it has.
This property name is a valid binding name, and we know its name in
advance, so to find the length of an array, you typically write
`array.length` because it is easier to write than `array["length"]`.
@!07abe99bad28a8ddfe1cc5bafac8783ca53bffec

{{id methods}}
@!c7112a74eedd048bb9c36a0404643a77906210f7

## Methods
@!173a4fbaf7ac5277354d4d873a97d0abdca97df1

{{index [function, "as property"], method, string}}
@!611478b8719aee6cf23249eeb2adfa0f9cf24cea

Both string and array objects contain, in addition to the `length`
property, a number of properties that hold function values.
@!04c6c4d1a4a00cbe3ef46725dc00413ac81598c0

```
let doh = "Doh";
console.log(typeof doh.toUpperCase);
// → function
console.log(doh.toUpperCase());
// → DOH
```
@!a13503dc0e5bdd3fa6336f0672dc8c5906a74619

{{index "case conversion", "toUpperCase method", "toLowerCase method"}}
@!09c793bb9e65cd2ab5547b4a15b9b4245783697b

Every string has a `toUpperCase` property. When called, it will return
a copy of the string in which all letters have been converted to
uppercase. There is also `toLowerCase`, going the other way.
@!da4b7d9a800a8cce088cbf8fac90f01d6128591b

{{index this}}
@!ea6b5f74c3c03558c165a775def3488fccc9f624

Interestingly, even though the call to `toUpperCase` does not pass any
arguments, the function somehow has access to the string `"Doh"`, the
value whose property we called. How this works is described in
[Chapter 6](06_object.html#obj_methods).
@!25b549a97eeb1041ad5263df7fe86c211d184d05

Properties that contain functions are generally called _methods_ of
the value they belong to. As in, “_toUpperCase_ is a method of a
string”.
@!f13cf1e8ba0d8c9aca49568152646fddfad40ecc

{{id array_methods}}
@!5d6411221b26daf4b59de17f8fcd092e64d98365

This example demonstrates two methods you can use to manipulate
arrays:
@!50ee0455f25fd6806a532c0f7c9632ed74056c2e

```
let sequence = [1, 2, 3];
sequence.push(4);
sequence.push(5);
console.log(sequence);
// → [1, 2, 3, 4, 5]
console.log(sequence.pop());
// → 5
console.log(sequence);
// → [1, 2, 3, 4]
```
@!cfcaa91562626a9cfa95954c7526f57cb0eb8d68

{{index collection, array, "push method", "pop method"}}
@!443638e676ca13cce29daeb20508b66090001e0f

The `push` method adds values to the end of an array, and the the
`pop` method does the opposite, removing the last value in the array
and returning it.
@!e23e4755315e01dd512502a5edcbb882fe802ddf

These somewhat silly names are the traditional terms for operations on
a _((stack))_. A stack, in programming, is a ((data structure)) that
allows you to push values into it and pop them out again in the
opposite order—the thing that was added last is removed first. These
are common in programming—you might remember the function ((call
stack)) from [the previous chapter](03_functions.html#stack), which is
an instance of the same idea.
@!5415fc3af31ae775e421ac1570927031f1c2f87b

## Objects
@!57a66d4054df5fdae730529511fb3ba797c2720a

{{index journal, "weresquirrel example", array, record}}
@!153ef2c22dcb350bd7c169274c797b8e25e9ea72

Back to the weresquirrel. A set of daily log entries can be
represented as an array. But the entries do not consist of just a
number or a string—each entry needs to store a list of activities and
a Boolean value that indicates whether Jacques turned into a squirrel
or not. Ideally, we would like to group these together into a single
value and then put those grouped values into an array of log entries.
@!e7f0d87cdf6c919ae2d3e4ebaab084671aee7b59

{{index syntax, property, "curly braces", "{} (object)"}}
@!89ca548a7f5844493562d78f1db25442fea01733

Values of the type _((object))_ are arbitrary collections of
properties. One way to create an object is by using curly brace
notation.
@!209665b81d58468b47af32fa95b06769d14f1fbc

```
let day1 = {
  squirrel: false,
  events: ["work", "touched tree", "pizza", "running"]
};
console.log(day1.squirrel);
// → false
console.log(day1.wolf);
// → undefined
day1.wolf = false;
console.log(day1.wolf);
// → false
```
@!a18deeb113e48272e3638086139ff2fef6611819

{{index [quoting, "of object properties"], "colon character"}}
@!b053ed845b9c73b66e719996b1569bec4dd69af7

Inside the curly braces, we give a list of properties separated by
commas. Each property has a name, after the colon, a value. When an
object is written over multiple lines, indenting it like in the
example helps readability. Properties whose names are not valid
binding names or numbers have to be quoted.
@!e3548c625b4e741f5af577a25df15908ae9c0636

```
let descriptions = {
  work: "Went to work",
  "touched tree": "Touched a tree"
};
```
@!726fe531be98529e301750591275c4c45922bff4

This means that ((curly braces)) have _two_ meanings in JavaScript. At
the start of a ((statement)), they start a ((block)) of statements. In
any other position, they describe an object. Fortunately, it is almost
never useful to start a statement with a curly-brace object, so
ambiguity between these two uses is rare.
@!edccf550111e906940ff8094cf469d52072a061b

{{index undefined}}
@!9d45990252d17412bc67844db5dd110b17f197e6

Reading a property that doesn't exist will produce the value
`undefined`, which happens the first time we try to read the `wolf`
property.
@!dba5c8d6888da24a75d30cfa7626d4824d90c898

{{index [property, assignment], mutability, "= operator"}}
@!1fb19b8a35c17196b0197947b3eb24322c402b64

It is possible to assign a value to a property expression with the `=`
operator. This will replace the property's value if it already existed
or create a new property on the object if it didn't.
@!8a895c1b8205aff802e8da2a3f3895143ed5b7ff

{{index "tentacle (analogy)", [property, "model of"]}}
@!dd2dfa9ea0f4095eeaf5b6cfe4d5f2ca18a6a4ea

To briefly return to our tentacle model of ((binding))s—property
bindings are similar. They _grasp_ values, but other bindings and
properties might be holding onto those same values. You may think of
objects as octopuses with any number of tentacles, each of which has a
name tattooed on it.
@!b98ec65a5d9ec7b37c8b4c40193f2a99be8deb02

{{figure {url: "img/octopus-object.jpg", alt: "Artist's representation of an object"}}}
@!9d2cc4a3466e53946cc86c215504738da02793e7

{{index "delete operator", [property, deletion]}}
@!cd3bc3798dc90e4988b82293287f60464f2eee78

The `delete` operator cuts off a tentacle from such an octopus. It is
a unary operator that, when applied to a property access expression,
will remove the named property from the object. This is not a common
thing to do, but it is possible.
@!e45f77dd000f002162205390a85a24922f04572e

```
let anObject = {left: 1, right: 2};
console.log(anObject.left);
// → 1
delete anObject.left;
console.log(anObject.left);
// → undefined
console.log("left" in anObject);
// → false
console.log("right" in anObject);
// → true
```
@!a1afbfdc815fc82a641cb696e7c6380e8d3d2f05

{{index "in operator", [property, "testing for"], object}}
@!8c762f88f87f194f70553211e036041ec7cb3a8f

The binary `in` operator, when applied to a string and an object,
tells you whether that object has that property. The difference
between setting a property to `undefined` and actually deleting it is
that, in the first case, the object still _has_ the property (it just
doesn't have a very interesting value), whereas in the second case the
property is no longer present and `in` will return `false`.
@!53a4ba0c1a7142906b9280079b0e43b59e0e3427

{{index "Object.keys function"}}
@!7937131ac7152fc605a642b7b840b2f7466bd5e5

To find out what properties an object has, you can use the
`Object.keys` function. You give it an object, and it returns an array
of strings—the object's property names.
@!5296d9dd0baa6b06be2406715aa5539058e16332

```
console.log(Object.keys({x: 0, y: 0, z: 2}));
// → ["x", "y", "z"]
```
@!7e705c76c0726be2a76aa46db6996db621be787e

{{index array, collection}}
@!aacfc279acf1b8f9ee64762d3d08d37969a92a40

Arrays, then, are just a kind of object specialized for storing
sequences of things. If you evaluate `typeof []`, it produces
`"object"`. You can see them as long, flat octopuses with all their
arms in a neat row, labeled with numbers.
@!396ee3b96b22495d1061f590e911d1ab7367a59e

{{figure {url: "img/octopus-array.jpg", alt: "Artist's representation of an array"}}}
@!dbfcfa388cc85862742a842047a8d45f6340f178

{{index journal, "weresquirrel example"}}
@!9fc1a4e351cbd0745aa5326363628ffb62b78c7c

So we can represent Jacques’ journal as an array of objects.
@!4c24f1e3b745b0aba07e89c5fa01e363a1a670ab

```{test: wrap}
let journal = [
  {events: ["work", "touched tree", "pizza",
            "running", "television"],
   squirrel: false},
  {events: ["work", "ice cream", "cauliflower",
            "lasagna", "touched tree", "brushed teeth"],
   squirrel: false},
  {events: ["weekend", "cycling", "break", "peanuts",
            "beer"],
   squirrel: true},
  /* and so on... */
];
```
@!8c8105296897b08eeaf5f35fb85080094c13a1e9

## Mutability
@!82df4e02ffe331fce219138b9f0241e473886d0d

We will get to actual programming _real_ soon now. But first, there's
one more piece of theory to understand.
@!a1b3a8644a0b22b1350d4df89cde99cce97d6a31

{{index mutability, "side effect", number, string, Boolean, object}}
@!d885e908d8bb094362a127f5396568894125ad70

We saw that object values can be modified. The types of values
discussed in earlier chapters, such as numbers, strings, and Booleans,
are all _immutable_—it is impossible to change an existing value of
those types. You can combine them and derive new values from them, but
when you take a specific string value, that value will always remain
the same. The text inside it cannot be changed. If you have reference
to a string that contains `"cat"`, it is not possible for other code
to change a character in your string to make it spell `"rat"`.
@!2b2a7372df5f6b67694bf3f3a75fa4ce1a0ea707

With objects, on the other hand, the content of a value _can_ be
modified by changing its properties.
@!05ab8025915e74cce2e78edc448263b1b20ed0aa

{{index [object, identity], identity, memory, mutability}}
@!8542324c947ee625824777f84f3efa096f541815

When we have two numbers, 120 and 120, we can consider them precisely
the same number, whether or not they refer to the same physical bits.
But with objects, there is a difference between having two references
to the same object and having two different objects that contain the
same properties. Consider the following code:
@!e19a28631cfcd9de6b2f90b015955ecb5c57efdc

```
let object1 = {value: 10};
let object2 = object1;
let object3 = {value: 10};

console.log(object1 == object2);
// → true
console.log(object1 == object3);
// → false

object1.value = 15;
console.log(object2.value);
// → 15
console.log(object3.value);
// → 10
```
@!70b2345a897c31d9e9629f1acfcd167f47561d99

{{index "tentacle (analogy)", [binding, "model of"]}}
@!1cd9077ed3e6db1e083f7015623e3e2d825fa00a

The `object1` and `object2` bindings grasp the _same_ object, which
is why changing `object1` also changes the value of `object2`. The
binding `object3` points to a different object, which initially
contains the same properties as `object1` but lives a separate life.
@!5455886054f73e8c9dd2adabecf0cd408f82a882

{{index "== operator", [comparison, "of objects"], "deep comparison"}}
@!1f6ee07e774c31071d779a192adf178769c6ed55

JavaScript's `==` operator, when comparing objects, will return `true`
only if both objects are precisely the same value. Comparing different
objects will return `false`, even if they have identical contents.
There is no “deep” comparison operation built into JavaScript, which
looks at object's contents, but it is possible to write it yourself
(which will be one of the
[exercises](04_data.html#exercise_deep_compare) at the end of this
chapter).
@!f88c11365da4b3937ebfc15b07ed44667b7e40e2

## The lycanthrope's log
@!5442fa529cd89c6bf25b580790248f45347df80a

{{index "weresquirrel example", lycanthropy, "addEntry function"}}
@!5a5e1fd4a58b69fe2b6d22f8c6f2dd6c0109d37b

So Jacques starts up his JavaScript interpreter and sets up the
environment he needs to keep his ((journal)).
@!2fb6c43ebed5ce6a20eb99db07acab7a4d2d7f0e

```{includeCode: true}
let journal = [];

function addEntry(events, squirrel) {
  journal.push({events, squirrel});
}
```
@!691abd3242d0c5e4270c3e17b02ad2838e45991f

{{index "curly braces", "{} (object)"}}
@!f6bf8249f3eb061653b47c9950d2e5b089049b2d

Note that the object added to the journal looks a little odd. Instead
of declaring properies like `events: events`, it just gives a
((property)) name. This is a short-hand that means the same thing—if a
property name in object notation isn't followed by a colon, its value
is the value of the binding with the same name in the current scope.
@!d950123988e49adea7928f624e929a50d11848f0

So then, every evening at ten—or sometimes the next morning, after
climbing down from the top shelf of his bookcase—he records the day.
@!519400e048eebc7bb3cde5d0f694f34a363bec5a

```
addEntry(["work", "touched tree", "pizza", "running",
          "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna",
          "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts",
          "beer"], true);
```
@!37e4d51bf40d8f9025a9d10f23c6e374ea39fe0b

Once he has enough data points, Jacques intends to use statistics to
find out which of these events may be related to the
squirrelifications.
@!e99da90f03ed93af140f6b4fa0a102c20a11be48

{{index correlation}}
@!6820bcb9bec39e49ac55ae0fd3c4911ef5cc83be

_Correlation_ is a measure of ((dependence)) between statistical
variables. A statistical variable is not quite the same as a
programming variable. In statistics you typically have a set of
_measurements_, and each variable is measured for every measurement.
Correlation between variables is usually expressed as a value that
ranges from -1 to 1. Zero correlation means the variables are not
related, whereas a correlation of one indicates that the two are
perfectly related—if you know one, you also know the other. Negative
one also means that the variables are perfectly related but that they
are opposites—when one is true, the other is false.
@!f36b5b9f2d4540332bc85d700c56ea528147a802

{{index "phi coefficient"}}
@!3e4b4939df1c1611f30237ed9c3d99c95bc90e95

To compute the measure of correlation between two Boolean variables,
we can use the "phi coefficient" (_ϕ_). This is a formula whose input
is a ((frequency table)) containing the amount of times the different
combinations of the variables were observed. The output of the formula
is a number between -1 and 1 that describes the correlation.
@!3f65873b6c9bfafd7f754fcd7ba55732dd104ed6

We could take the event of eating ((pizza)) and put that in a
frequency table like this, where each number indicates the amount of
times that combination occurred in our measurements:
@!1304d8d0c0c4d5d23a69e371886282da10af5bf4

{{figure {url: "img/pizza-squirrel.svg", alt: "Eating pizza versus turning into a squirrel", width: "7cm"}}}
@!8e17cf64ea4f76135ce15afb3620ecf4ab82a13a

If we call that table _n_, we can compute _ϕ_ using the following formula:
@!24eb0343bc3d041913f5d3251897979222a0ed1a

{{if html
@!b91c58a673da93c988ff84eabc481178c7a548c3

<div>
<style scoped="scoped">sub { font-size: 60%; }</style>
<table style="border-collapse: collapse; margin-left: 1em;"><tr>
  <td style="vertical-align: middle"><em>ϕ</em> =</td>
  <td style="padding-left: .5em">
    <div style="border-bottom: 1px solid black; padding: 0 7px;"><em>n</em><sub>11</sub><em>n</em><sub>00</sub> -
      <em>n</em><sub>10</sub><em>n</em><sub>01</sub></div>
    <div style="padding: 0 7px;">√<span style="border-top: 1px solid black; position: relative; top: 2px;">
      <span style="position: relative; top: -4px"><em>n</em><sub>1•</sub><em>n</em><sub>0•</sub><em>n</em><sub>•1</sub><em>n</em><sub>•0</sub></span>
    </span></div>
  </td>
</tr></table>
</div>
@!f8ed723a7e1746fe94265736855393f53916ec1f

if}}
@!f4c2a1b4a25c1230a42d525efafec150301554a3

{{if tex
@!b2eb2c57d655042ea3569c9d4109c82665fdd6cd

[\begin{equation}\varphi = \frac{n_{11}n_{00}-n_{10}n_{01}}{\sqrt{n_{1\bullet}n_{0\bullet}n_{\bullet1}n_{\bullet0}}}\end{equation}]{latex}
@!040a28ddb2f0a3baac9273627b872935ae012f55

if}}
@!ee209a03a38c95dc64905270aa31ae6d34167b48

(If at this point you're putting the book down to focus on a terrible
flashback to 10th grade math class—hold on! I do not intend to torture
you with endless pages of cryptic notation—just this one formula for
now. And even with that one, all we do is turn it into JavaScript.)
@!96187d8b79bb5d9748b7aa5004408fa56db04384

The notation [_n_~01~]{if html}[[$n_{01}$]{latex}]{if tex} indicates
the number of measurements where the first variable (squirrelness) is
false (0) and the second variable (pizza) is true (1). In the pizza
table, [_n_~01~]{if html}[[$n_{01}$]{latex}]{if tex} is 9.
@!95db0d68e846a09ab651c35878bfac6aee503765

The value [_n_~1•~]{if html}[[$n_{1\bullet}$]{latex}]{if tex} refers
to the sum of all measurements where the first variable is true, which
is 5 in the example table. Likewise, [_n_~•0~]{if
html}[[$n_{\bullet0}$]{latex}]{if tex} refers to the sum of the
measurements where the second variable is false.
@!9066ab83a0c70b1bc128df4066a6fd91591331d6

{{index correlation, "phi coefficient"}}
@!3063f7f694482eefe02c2634c68213e92d031986

So for the pizza table, the part above the division line (the
dividend) would be 1×76 - 4×9 = 40, and the part below it (the
divisor) would be the square root of 5×85×10×80, or [√340000]{if
html}[[$\sqrt{340000}$]{latex}]{if tex}. This comes out to _ϕ_ ≈
0.069, which is tiny. Eating ((pizza)) does not appear to have
influence on the transformations.
@!6890a5bed4d5a1669051ae1fe8a216a07e05981c

## Computing correlation
@!326cd03ad22f7b45b78c8b4a37485fcf4ca92d8d

{{index [array, "as table"], [nesting, "of arrays"]}}
@!feb3b66968d8d18b9040b88d3e5c13b83c462ea6

We can represent a two-by-two ((table)) in JavaScript with a
four-element array (`[76, 9, 4, 1]`). We could also use other
representations, such as an array containing two two-element arrays
(`[[76, 9], [4, 1]]`) or an object with property names like `"11"` and
`"01"`, but the flat array is simple and makes the expressions that
access the table pleasantly short. We'll interpret the indices to the
array as two-((bit)) ((binary number))s, where the leftmost (most
significant) digit refers to the squirrel variable and the rightmost
(least significant) digit refers to the event variable. For example,
the binary number `10` refers to the case where Jacques did turn into
a squirrel, but the event (say, "pizza") didn't occur. This happened
four times. And since binary `10` is 2 in decimal notation, we will
store this number at index 2 of the array.
@!eb4d1d80c390e4c4a9d5bdda0f5c1400478e9fe0

{{index "phi coefficient", "phi function"}}
@!a3420a98e2979a07c2c410fc7e1ee46e4455c8c5

{{id phi_function}}
@!9745f2fcfbbb6b49659846e119c34ae0c0b40ff7

This is the function that computes the _ϕ_ coefficient from such an
array:
@!465b9c072a08d8e8d5401b2707b91f1f965ce8c5

```{includeCode: strip_log, test: clip}
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}

console.log(phi([76, 9, 4, 1]));
// → 0.068599434
```
@!5be5a62d35d1606f085822929e184d6981f88430

{{index "square root", "Math.sqrt function"}}
@!2239f5a24526055de53182b97f581f21e59501c1

This is a direct translation of the _ϕ_ formula into JavaScript.
`Math.sqrt` is the square root function, as provided by the `Math`
object in a standard JavaScript environment. We have to add two fields
from the table to get fields like [n~1•~]{if
html}[[$n_{1\bullet}$]{latex}]{if tex} because the sums of rows or
columns are not stored directly in our data structure.
@!9eaec54683bcc880956b904f682df6436a0075d8

{{index "JOURNAL data set"}}
@!fcaaa968f450a7f412693e3ed1fc45aceabbe8d2

Jacques kept his journal for three months. The resulting ((data set))
is available in the coding sandbox for this
chapter[ ([_eloquentjavascript.net/code#4_](http://eloquentjavascript.net/code#4)]{if
book}, where it is stored in the `JOURNAL` binding, and in a
downloadable [file](http://eloquentjavascript.net/code/jacques_journal.js).
@!334ac15b390fd825896551d7be7e8674092822df

{{index "tableFor function"}}
@!1f8c400b7aad6ee5e0eedc3b86e0912fd104031e

To extract a two-by-two ((table)) for a specific event from the
journal, we must loop over all the entries and tally how many times
the event occurs in relation to squirrel transformations.
@!e4594e43b56e1825860aebec68f092edfc63cd65

```{includeCode: strip_log}
function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i], index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

console.log(tableFor("pizza", JOURNAL));
// → [76, 9, 4, 1]
```
@!0e7e05facb6367256b4fbfe38693f4021f7c556d

{{index [array, searching], "includes method"}}
@!77ac50baed63ab2cdd664e76e410603e102c2dc9

Arrays have an `includes` method that checks whether a given value
exists in the array. The function uses that to determine whether the
event name it is interested in is part of the event array for a given
entry.
@!34b7f470299299afce4bf33e74e6cff1719e5f39

{{index [array, indexing]}}
@!0df9fa7291e461d8eb2ad69132f0730b93aa46f5

The body of the loop in `tableFor` figures out which box in the table
each journal entry falls into by checking whether the entry contains
the specific event it's interested in and whether the event happens
alongside a squirrel incident. The loop then adds one to the correct
box in the table.
@!5b4857a37a51afab230a0410a1e5872c6bd9fe47

We now have the tools we need to compute individual ((correlation))s.
The only step remaining is to find a correlation for every type of
event that was recorded and see whether anything stands out.
@!15756b797489bebd12d8e2f9e6f08a31486535de

{{id for_of_loop}}
@!3a8cf1d4a3f5e4f12d6b35b33119d7bdb66f914b

## Array loops
@!d3aaf45793ef598ad2dd29d086806fd8ce705012

{{index "for loop", loop, [array, iteration]}}
@!33d7ff6e7ae2ca4caf403a9bd0ff0a23f90e8e1d

In the `tableFor` function, there's a loop like this:
@!33f3bf5a02909b108ed42e8d1829aa4ac4574762

```
for (let i = 0; i < JOURNAL.length; i++) {
  let entry = JOURNAL[i];
  // Do something with entry
}
```
@!5eee418062a5fd187e081d7b2db5b38e653ce063

This kind of loop is common in classical JavaScript—going over arrays
one element at a time is something that comes up a lot, and to do that
you'd run a counter over the length of the array and pick out each
element in turn.
@!ed0d7bf1e515c291ec068d2b06e6009f9597371f

There is a simpler way to write such loops.
@!3591774d183ed9447dbd6e11e251c1094b8a3aef

```
for (let entry of JOURNAL) {
  console.log(`${entry.events.length} events.`);
}
```
@!3485bd7ec9569780a1da69e2c376fe9ce1d65a1b

{{index "for/of loop"}}
@!a2b2b805d223b12d155bf872a7cc522a30a35e18

When a `for` loops looks like this, with the word `of` after a
variable definition, it will loop over the elements of the value given
after `of`. This works not only for arrays, but also for strings and
some other data structures. We'll discuss _how_ it works in [Chapter
6](06_object.html).
@!4cecf47b65d6f54eef33a061d9c3ed34ae02a0ed

{{id analysis}}
@!0a39ce7f16964a0b8bdea6f1aa2f0d9f06594199

## The final analysis
@!891454ee1fbca85f8f51b665d91ea1daba2f5365

{{index journal, "weresquirrel example", "journalEvents function"}}
@!c8733ee4125cb5e639ecbea9bade903dfe10629d

We need to compute a correlation for every type of event that occurs
in the data set. To do that, we first need to _find_ every type of
event.
@!49d992e2e980fa909fb456b090d70d352304a63b

{{index "includes method", "push method"}}
@!d051fcb667e57149b4b1ec9b85d3490602739009

```{includeCode: "strip_log"}
function journalEvents(journal) {
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  }
  return events;
}

console.log(journalEvents(JOURNAL));
// → ["carrot", "exercise", "weekend", "bread", …]
```
@!54b382fa666ea6e6179e993b8529cb1378539b40

By going over all the events, and adding those that aren't already in
there to the `events` array, this collects every type of event.
@!1254f519d58a8b823f8c5ed7fa6982c3baf4d72b

Using that, we can see all the ((correlation))s.
@!1b36cc17197adb0dc660a0025e77cb8bcf5654db

```{test: no}
for (let event of journalEvents(JOURNAL)) {
  console.log(event + ":", phi(tableFor(event, JOURNAL)));
}
// → carrot:   0.0140970969
// → exercise: 0.0685994341
// → weekend:  0.1371988681
// → bread:   -0.0757554019
// → pudding: -0.0648203724
// and so on...
```
@!db2871435b90cbf0ed8af5927c4a2e6f5c50244b

Most correlations seem to lie close to zero. Eating carrots, bread, or
pudding apparently does not trigger squirrel-lycanthropy. It _does_
seem to occur somewhat more often on weekends. Let's filter the
results to show only correlations greater than 0.1 or less than -0.1.
@!82a4ea62bf409da01ebdf3cbbb0d8e46f91c4c04

```{test: no}
for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ":", correlation);
  }
}
// → weekend:        0.1371988681
// → brushed teeth: -0.3805211953
// → candy:          0.1296407447
// → work:          -0.1371988681
// → spaghetti:      0.2425356250
// → reading:        0.1106828054
// → peanuts:        0.5902679812
```
@!cc9d68f970c174dc24314fc0516c367acd7383ec

A-ha! There are two factors whose ((correlation)) is clearly stronger
than the others. Eating ((peanuts)) has a strong positive effect on
the chance of turning into a squirrel, whereas brushing his teeth has
a significant negative effect.
@!fc46129dc6af78a7aa7b73f55121b1a6bca61728

Interesting. Let's try something.
@!a09a74b1fc5b78ff431deae6a0141ee558ce5f53

```{includeCode: strip_log}
for (let entry of JOURNAL) {
  if (entry.events.includes("peanuts") &&
     !entry.events.includes("brushed teeth")) {
    entry.events.push("peanut teeth");
  }
}
console.log(phi(tableFor("peanut teeth", JOURNAL)));
// → 1
```
@!016937e45d9e444d01c3a2b06ac0c9c80d556413

That's a very clear result. The phenomenon occurs precisely when
Jacques eats ((peanuts)) and fails to brush his teeth. If only he
weren't such a slob about dental hygiene, he'd have never even noticed
his affliction.
@!0e2542cd755b51b00b06e24d0f389a8e90d1422d

Knowing this, Jacques stops eating peanuts altogether and finds that
his transformations don't come back.
@!b2e069fc8ce54554078f817030e62a4b44c5a976

{{index "weresquirrel example"}}
@!734fcbe687aaa9272f6e90cc9af8fdb492298d47

For a few years, things go great for Jacques. But at some point he
loses his job. Because he lives in a nasty country where being without
job means being without medical services, he is forced to take
employment with a ((circus)) where he performs as _The Incredible
Squirrelman_, stuffing his mouth with peanut butter before every show.
@!f1e1d465442c0112e5c06217c3539e7dd296c025

One day, fed up with this pitiful existence, Jacques fails to change
back into his human form, hops through a crack in the circus tent, and
vanishes into the forest. He is never seen again.
@!16cc47fffb176b87a285a5905a0d466f618c15c3

## Further arrayology
@!374bf73d475d5d00e5c90916fb8927796515cde9

{{index [array, methods], method}}
@!41d47539a82d52daa24d57d20d8d75cf2de350d8

Before finishing up this chapter, I want to introduce you to a few
more object-related concepts. We'll start by introducing some
generally useful array methods.
@!bf3a5a2c031788bcd2cc4d70bf8220e9190f907b

{{index "push method", "pop method", "shift method", "unshift method"}}
@!fbf9b000585e2e7495df4e8d3e572a8706d27074

We saw `push` and `pop`, which add and remove elements at the
end of an array, [earlier](04_data.html#array_methods) in this
chapter. The corresponding methods for adding and removing things at
the start of an array are called `unshift` and `shift`.
@!85746ce81f31a16cd346bb1ce8f6e4936cac44f3

```
let todoList = [];
function remember(task) {
  todoList.push(task);
}
function getTask() {
  return todoList.shift();
}
function rememberUrgently(task) {
  todoList.unshift(task);
}
```
@!528b1fc2e89003ca8b0e427d7068503ea45b720d

{{index "task management example"}}
@!69cdeaeacf2a2aabfb5b7dfcd4245e9ac6b534c9

That program manages queue of tasks. You add tasks to the end of the
queue by calling `remember("groceries")`, and when you're ready to do
something, you call `getTask()` to get (and remove) the front item
from the queue. The `rememberUrgently` function also adds a task but
adds it to the front instead of the back of the queue.
@!36d400c465a37a24a8639c9e2d3502421e6c8c3b

{{index [array, searching], "indexOf method", "lastIndexOf method"}}
@!4ac97e73dbe9ef63c76381a3af75024c2b791463

To search for a specific value, arrays provide an `indexOf` method. It
goes through the array from the start to the end, and returns the
index at which the requested value was found—or -1 if it wasn't found.
To search from the end instead of the start, there's a similar method
called `lastIndexOf`.
@!85b7d57f44e118549a29d282969151fc789ee8ae

```
console.log([1, 2, 3, 2, 1].indexOf(2));
// → 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2));
// → 3
```
@!72704f0e4215f4217129ca5a892fa1d5a8d76082

Both `indexOf` and `lastIndexOf` take an optional second argument that
indicates where to start searching.
@!b317c8e8eabffa59b214f0efe628150f81fe1206

{{index "slice method", [array, indexing]}}
@!cbdab3a71990f5520b9160007a5853d680ce40b3

Another fundamental array method is `slice`, which takes a start index
and an end index and returns an array that has only the elements
between those indices. The start index is inclusive, the end index
exclusive.
@!2ffde6c3b27b075522724817d2cfdae0546fd565

```
console.log([0, 1, 2, 3, 4].slice(2, 4));
// → [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));
// → [2, 3, 4]
```
@!46c74996e3e295ac11b0180e4dbead0c80a560a1

{{index [string, indexing]}}
@!57ae986ecc53c67c615a267a48aa6a78e34d3fb9

When the end index is not given, `slice` will take all of the elements
after the start index.
@!f09f3b6b15c86dcd1d6cc6c33ea6944fc43778f6

{{index concatenation, "concat method"}}
@!2b893259163eb5e7e0429caab6649789407df4e8

The `concat` method can be used to glue arrays together, similar to
what the `+` operator does for strings. The following example shows
both `concat` and `slice` in action. It takes an array and an index,
and it returns a new array that is a copy of the original array with
the element at the given index removed.
@!ac6c1946a008f6e01fc878b3cd51a5cc8f544847

```
function remove(array, index) {
  return array.slice(0, index)
    .concat(array.slice(index + 1));
}
console.log(remove(["a", "b", "c", "d", "e"], 2));
// → ["a", "b", "d", "e"]
```
@!eee4a2bdbb3969350e2d21c7872337bb34a343d7

If you pass `concat` an argument that is not an array, that value will
be added to the new array as if it was a one-element array.
@!d2054abf5687e97c173ac26b34ee0e3aff5e3579

## Strings and their properties
@!ae562c7b6551c7472ff93115d9386b544f7d0daa

{{index [string, properties]}}
@!2cbae685b64502a49acbd0fb602232c78e07d084

We can read properties like `length` and `toUpperCase` from string
values. But if you try to add a new property, it doesn't stick.
@!4b3b6cb216fe425e95e55f8f7899831026ab9e0b

```
let kim = "Kim";
kim.age = 88;
console.log(kim.age);
// → undefined
```
@!b668392c40d798cdc196a7a24c1bc6491df33f06

Values of type string, number, and Boolean are not objects, and though
the language doesn't complain if you try to set new properties on
them, it doesn't actually store those properties. As mentioned before,
such values are immutable and cannot be changed.
@!831193c1890849ffe714c04fc96184bb7daa4d9a

{{index [string, methods], "slice method", "indexOf method", [string, searching]}}
@!280783d8111bcdc836c2b90c86bd1a358512cd0b

But these types do have some built-in properties. Every string value
has a number of methods. The most useful ones are probably `slice` and
`indexOf`, which resemble the array methods of the same name.
@!4a0833f9a45c0b0fabee0d4275ca051bc100ebf6

```
console.log("coconuts".slice(4, 7));
// → nut
console.log("coconut".indexOf("u"));
// → 5
```
@!6daf7e1d1afea164af4a8271b735fd36cac4b81a

One difference is that a string's `indexOf` can search for a string
containing more than one character, whereas the corresponding array
method looks only for a single element.
@!5697ae3bef59b6c6fac42a71890c68e01ab6af40

```
console.log("one two three".indexOf("ee"));
// → 11
```
@!c0aa36d0e70aacdaf870627b57200b0cc80528e7

{{index whitespace, "trim method"}}
@!7661e207ec1c29856954e72e0fc265fff1832b5e

The `trim` method removes whitespace (spaces, newlines, tabs, and
similar characters) from the start and end of a string.
@!f1b6cafc5a567fac5ffcb2eddb40663e2c8009f9

```
console.log("  okay \n ".trim());
// → okay
```
@!2306444c87a23c30a94cd486485e8cb3cf83521a

{{index ["length property", "for string"], [string, indexing]}}
@!f8866dc3d4bf4fe876ae669a16814e1e2f3fcb5b

We have already seen the string type's `length` property. Accessing
the individual characters in a string looks like accessing array
elements (with a caveat that we'll discuss in [Chapter
5](05_higher_order.html#code_units)).
@!542edd4d73f94364bf2004fe635d00fad5d42fa4

```
let string = "abc";
console.log(string.length);
// → 3
console.log(string[1]);
// → b
```
@!4a8de6e9ed72c6f0f645b8756d6e257df2e3f0b6

{{id rest_parameters}}
@!7047f68e9a76165af18d39e697074c0c03a840e0

## Rest parameters
@!dd097d66c3c7042992e697ad28a4284283029dd9

{{index "Math.max function"}}
@!49b344180fef264180153cc8feb35c51284e3763

It can be useful for a function to accept any number of ((argument))s.
For example, `Math.max` computes the maximum of _all_ the arguments it
is given.
@!378b799a1f680c322931e16a266cb3ed6a124d9b

{{indexsee "period character", "max example", spread}}
@!cf3614bfa503e4d6c58d907c44c43ecd595e4dd5

To write such a function, you put three dots before the function's
last ((parameter)), like this:
@!03dd7e1c7c2394753893947dd836520ba30bf99c

```
function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}
console.log(max(4, 1, 9, -2));
// → 9
```
@!0d71f67c757add7b5819e0cc26cba9ca56802174

When such a function is called the _((rest parameter))_ is bound to an
array containing all further arguments. If there are other parameters
before it, their values aren't part of that array. But if it's the
first parameter, as in `max`, it will hold all arguments.
@!769ef5ca3c24b416bf034425044b4375c4dd8ba3

{{index "function application"}}
@!fe4d19bb2232cc73addc5ca61dbbcffe5e00a62f

You can use a similar three-dot notation to _call_ a function with an
array of arguments.
@!bfafa25673484df35b07c44989917e4dcd75ba00

```
let numbers = [5, 1, 7];
console.log(max(...numbers));
// → 7
```
@!feb8b104798d2e383b3eac75382d13ca0108d58c

This "((spread))s" out the array into the function call, passing its
elements as separate arguments. It is possible to include an array
like that along with other arguments, as in `max(9, ...numbers, 2)`.
@!206adbefe524cc3b10e4599c920dc61b20f812ca

{{index array}}
@!7f764605b85e2d3867157b21821151d1cd6f2074

Array notation using ((square brackets)) similarly allows this
operator to spread another array into the new array:
@!4e057a196abeee824782808fc91762b8af4cc0ce

```
let words = ["never", "fully"];
console.log(["will", ...words, "understand"]);
// → ["will", "never", "fully", "understand"]
```
@!cd633382380a16888b09c2675a6fc19384964e8e

## The Math object
@!1910642526388bcbb2f2c683e2d6e0c9bf464ff9

{{index "Math object", "Math.min function", "Math.max function", "Math.sqrt function", minimum, maximum, "square root"}}
@!7648e225cc138d260c75eb83b517d50c1a8ffdff

As we've seen, `Math` is a grab-bag of number-related utility
functions, such as `Math.max` (maximum), `Math.min` (minimum), and
`Math.sqrt` (square root).
@!e9b89fc838eac1924575f4192a6c164cbb12978b

{{index namespace, "namespace pollution", object}}
@!0ee4f1173b945841467381be5dae045a8e394732

{{id namespace_pollution}}
@!7c00d52633c6da8c80a1554998f45c110d835809

The `Math` object is used as a container to group a bunch of related
functionality. There is only one `Math` object, and it is almost never
useful as a value. Rather, it provides a _namespace_ so that all these
functions and values do not have to be global bindings.
@!bf6f35d571ed7d8bd9268deb04a0a721be522db6

{{index [binding, naming]}}
@!9055abc0983cc6f4fd71bf7de80541ead80e0224

Having too many global bindings "pollutes" the namespace. The more
names have been taken, the more likely you are to accidentally
overwrite the value of some existing binding. For example, it's not
unlikely to want to name something `max` in one of your programs.
Since JavaScript's built-in `max` function is tucked safely inside the
`Math` object, we don't have to worry about overwriting it.
@!bf82cbc6f4b5319ec0ea09f29060b44149ed3f6a

{{index "let keyword", "const keyword"}}
@!19a987c3cf2cefa75fe565f8c5f84d29ae5f3fc1

Many languages will stop you, or at least warn you, when you are
defining a binding with a name that is already taken. JavaScript does
this for bindings you declared with `let` or `const` but, perversely,
not for standard bindings.
@!806d89c2ca20da4fb33030135fd7b16a4762c5de

{{index "Math.cos function", "Math.sin function", "Math.tan function", "Math.acos function", "Math.asin function", "Math.atan function", "Math.PI constant", cosine, sine, tangent, "PI constant", pi}}
@!22ebe3bdf890ebbe87c7f1fbbf907e03cf124249

Back to the `Math` object. If you need to do ((trigonometry)), `Math`
can help. It contains `cos` (cosine), `sin` (sine), and `tan`
(tangent), as well as their inverse functions, `acos`, `asin`, and
`atan`, respectively. The number π (pi)—or at least the closest
approximation that fits in a JavaScript number—is available as
`Math.PI`. (There is an old programming tradition of writing the names
of ((constant)) values in all caps.)
@!1158fed2d77b4eb3c0242870a6eea4ad43def6eb

```{test: no}
function randomPointOnCircle(radius) {
  let angle = Math.random() * 2 * Math.PI;
  return {x: radius * Math.cos(angle),
          y: radius * Math.sin(angle)};
}
console.log(randomPointOnCircle(2));
// → {x: 0.3667, y: 1.966}
```
@!4e7f79070514961f81db2029764c137c0f088e77

If sines and cosines are not something you are very familiar with,
don't worry. When they are used in this book, in [Chapter
13](13_dom.html#sin_cos), I'll explain them.
@!d75c8d753dd1a1e35e9ee065259b570c58a130e7

{{index "Math.random function", "random number"}}
@!e873b861c1cfbc17619d0f04c26d6ac76f3a7a7f

The previous example uses `Math.random`. This is a function that
returns a new pseudorandom number between zero (inclusive) and one
(exclusive) every time you call it.
@!de27108b61f5acb8a55bae182cef1f6df1c4e85e

```{test: no}
console.log(Math.random());
// → 0.36993729369714856
console.log(Math.random());
// → 0.727367032552138
console.log(Math.random());
// → 0.40180766698904335
```
@!accd57d7c4af1d83ec32e1c9ffcfc7d0bbef879c

{{index "pseudorandom number", "random number"}}
@!fc2ba4950fd616027a1435ef500a15488cb79e4f

Though computers are deterministic machines—they always react the same
way if given the same input—it is possible to have them produce
numbers that appear random. To do this, the machine keeps some hidden
value that represents the randomness, and whenever you ask for a new
random number, it'll perform some complicated computations on this
hidden value to create a new value. It stores this new value, and
returns some number derived from it. That way, it can produce ever
new, hard-to-predict numbers in a way that _seems_ random.
@!09d43248624737b836f5f12c88b79da164cbeb61

{{index rounding, "Math.floor function"}}
@!d0afaf2b5095be74139ef65e145a2960621d4ab5

If we want a whole random number instead of a fractional one, we can
use `Math.floor` (which rounds down to the nearest whole number) on
the result of `Math.random`.
@!3f59da07adbf3112f0f87a96dba34474619a0ce7

```{test: no}
console.log(Math.floor(Math.random() * 10));
// → 2
```
@!6e62f9bbcdea1d924aa6faee6c4df3fdc67b077c

Multiplying the random number by 10 gives us a number greater than or
equal to zero and below 10. Since `Math.floor` rounds down, this
expression will produce, with equal chance, any number from 0 through
9.
@!bcd6dc66a373c774e16093549701dcf0276a454e

{{index "Math.ceil function", "Math.round function"}}
@!07380fc204cf9b80bad997788b2a0eac9a1756dd

There are also the functions `Math.ceil` (for "ceiling", which rounds
up to a whole number) and `Math.round` (to the nearest whole number).
@!9bc5e42b3d750dde74e091d7669da2035ba15fe8

## Destructuring
@!8f841adca8d786b9825ffad2f06be610ed423cdb

{{index "phi function"}}
@!e851669fbc7e759f068e298f6fd47f6965a23113

Let's go back to the `phi` function for a moment:
@!30c41b14418f6aaa09b1fe039e9b39bc429ba100

```{test: wrap}
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}
```
@!ccf0b83d1a5115fae1a1fd8b5f52e681bc6cfc69

{{index "destructuring binding", parameter}}
@!8ec434f9ab1ba39de671c8021a84e79566602f9f

One of the reasons this function is awkward to read is that we have a
binding pointing at our array, but we'd much prefer to have bindings
for the _elements_ of the array. I.e. `let n00 = table[0]`, and so on.
Fortunately, there is a more succinct way to do this in JavaScript.
@!3046b96c0e7449203849d2e409e7a89ede385dcd

```
function phi([n00, n01, n10, n11]) {
  return (n11 * n00 - n10 * n01) /
    Math.sqrt((n10 + n11) * (n00 + n01) *
              (n01 + n11) * (n00 + n10));
}
```
@!c0f62db2c128ae628b6fda0f34721a876eccf135

{{index "let keyword", "var keyword", "const keyword"}}
@!e6716929e791b6f2ccd9355c048e6014c93b06ba

This also works for ((binding))s created with `let`, `var`, or
`const`. If you know the value you are binding is an array, you can
use ((square brackets)) to "look inside" of the value, binding its
content.
@!ae44d6291e2b7acc2a41343c9d703b9a14d1085f

{{index object, "curly braces"}}
@!bc8824fb137a0fba9a468fa3e38ace23e28d08b4

A similar trick works for objects, using braces instead.
@!556009b63c789e038bc0fc62a795057cdaf8d295

```
let {name} = {name: "Faraji", age: 31};
console.log(name);
// → Faraji
```
@!791042dbed4ba01f413801a9d831a1a15c903e58

{{index null, undefined}}
@!94981084e8f22fe01db84392227e132680a3bdff

Note that if the value given to such a destructuring binding is `null`
or `undefined`, you get an error, much like you would if you'd
directly try to access a property of those values.
@!165ee2ba7658cbf64f2ce855151a8e0ae17a4792

## JSON
@!5e7f8fc42520fe8c6837c20b12ef729d162e83b7

{{index [array, representation], [object, representation], "data format"}}
@!7dff7206b8193f3fc7a642ec9e880a892a71ab8d

Because properties only grasp their value, rather than containing it,
objects and arrays are stored in the computer's ((memory)) as
sequences of bits holding the _((address))es_—the place in memory—of
their contents. So an array with another array inside of it consists
of (at least) one memory region for the inner array, and another for
the outer array, containing (among other things) a binary number that
represents the position of the inner array.
@!4f6c9b140015127729b04f0164911199ab5d7f6d

If you want to save data in a file for later, or send it to another
computer over the network, you have to somehow convert these tangles
of memory addresses to a description that can be stored or sent. You
_could_ send over your entire computer memory along with the address
of the value you're interested in, I suppose, but that doesn't sound
like a good approach.
@!c5fcea88aee644b329f69943c1f72f3465b671d1

{{indexsee "JavaScript Object Notation", JSON}}
@!62edfabcaf8dadb230a8b555dda572c15eb39463

{{index serialization, "World Wide Web"}}
@!8319dae934f0a7a07a460a97df335c30ade26bda

What we can do _serialize_ the data. That means it is converted into a
flat description. A popular format is called _((JSON))_ (pronounced
“Jason”), which stands for JavaScript Object Notation. It is widely
used as a data storage and communication format on the Web, even in
languages other than JavaScript.
@!57a01c569a6aa424d7ca6d15a63150a32761040d

{{index array, object, [quoting, "in JSON"], comment}}
@!9ce5702fe75346d6aa62d67c91ef0d26f22c1b04

JSON looks similar to JavaScript's way of writing arrays and objects,
with a few restrictions. All property names have to be surrounded by
double quotes, and only simple data expressions are allowed—no
function calls, bindings, or anything that involves actual
computation. Comments are not allowed in JSON.
@!184ed8aa20f76243ded409501a059fb70ec550de

A journal entry might look like this when represented as JSON data:
@!76b10464a2c7b6fd046a1e885b12008476d21369

```{type: "application/json"}
{
  "squirrel": false,
  "events": ["work", "touched tree", "pizza", "running"]
}
```
@!3dc4b40dcc588e0fe3d1cc1ec0026a901a8c8d13

{{index "JSON.stringify function", "JSON.parse function", serialization, deserialization, parsing}}
@!b44683bc9f5ff5ffed1ce62406263d921272a00c

JavaScript gives us functions, `JSON.stringify` and `JSON.parse`, that
convert data to and from this format. The first takes a JavaScript
value and returns a JSON-encoded string. The second takes such a
string and converts it to the value it encodes.
@!7cb715a2f50638034608c548ae9e68c9be8db6ee

```
let string = JSON.stringify({squirel: false,
                             events: ["weekend"]});
console.log(string);
// → {"squirrel":false,"events":["weekend"]}
console.log(JSON.parse(string).events);
// → ["weekend"]
```
@!2a87756ea401b324f0f244c47303c336284fd758

## Summary
@!b8a30e409ed2c6661243ea2d30fec0ab3e588ecc

Objects and arrays (which are a specific kind of object) provide ways
to group several values into a single value. Conceptually, this allows
us to put a bunch of related things in a bag and run around with the
bag, instead of wrapping our arms around all of the individual things
and trying to hold on to them separately.
@!08917e87707c6f9a611e65895f55932c753923f9

Most values in JavaScript have properties, the exceptions being `null`
and `undefined`. Properties are accessed using `value.prop` or
`value["prop"]`. Objects tend to use names for their properties
and store more or less a fixed set of them. Arrays, on the other hand,
usually contain varying amounts of conceptually identical values and
use numbers (starting from 0) as the names of their properties.
@!9dfecffb03ff923468ebf45e1caf217963c3941c

There _are_ some named properties in arrays, such as `length` and a
number of methods. Methods are functions that live in properties and
(usually) act on the value they are a property of.
@!34c7565353eeccfb117518a412397791b1f72f3b

You can iterate over arrays using a special kind of `for` loop—`for
(let element of array)`.
@!7dc90cd3d65880a6856b67d357685c33062809da

## Exercises
@!d267f764bfdda9b039e416e918c79d872c76d760

### The sum of a range
@!c3606e7a5b3ae765c6b9bd36213902fcb813a2f5

{{index "summing (exercise)"}}
@!92ae40f061eaee683b4151f10726efedf2ef233f

The [introduction](00_intro.html) of this book alluded to the
following as a nice way to compute the sum of a range of numbers:
@!2accad1d0694d07ebcb6cb37b96266be8cba62eb

```{test: no}
console.log(sum(range(1, 10)));
```
@!175311db6d683ebcc25305394b0e20e4cc33008d

{{index "range function", "sum function"}}
@!1a3c6263b5d842f3523454201a237e7d464d2d69

Write a `range` function that takes two arguments, `start` and `end`,
and returns an array containing all the numbers from `start` up to
(and including) `end`.
@!1ad0707d65ed42d214c40c1ffc93b6c415cee50b

Next, write a `sum` function that takes an array of numbers and
returns the sum of these numbers. Run the previous program and see
whether it does indeed return 55.
@!035dde03413a608ecc9b897b6b81d3f574c2e98a

{{index "optional argument"}}
@!3785b47b1093cd5acf39f492579537a4c7288b1d

As a bonus assignment, modify your `range` function to take an
optional third argument that indicates the “step” value used to build
up the array. If no step is given, the array elements go up by
increments of one, corresponding to the old behavior. The function
call `range(1, 10, 2)` should return `[1, 3, 5, 7, 9]`. Make sure it
also works with negative step values so that `range(5, 2, -1)`
produces `[5, 4, 3, 2]`.
@!ee8c2b74f64479df14d1824ea4b5c327b691485b

{{if interactive
@!8e65cad264cfcb05a51084f310acce91b04b2694

```{test: no}
// Your code here.

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55
```
@!5ab5557a8bd53796bbc236ff7df71daea66f946e

if}}
@!9120d8e0d63a23e6a5a92fc5912fd99fbbdff334

{{hint
@!4e6a2c881bcfc882f29f4238e22e4834c5031401

{{index "summing (exercise)", [array, creation], "square brackets"}}
@!37c6007855f68c66506413529820e9029603fb37

Building up an array is most easily done by first initializing a
binding to `[]` (a fresh, empty array) and repeatedly calling its
`push` method to add a value. Don't forget to return the array at the
end of the function.
@!2273fa32c12e29ed6e2b6521c9b62fd6287d9e26

{{index [array, indexing], comparison}}
@!390bbbc267da905b5226dc392b2a8eb953fa7e33

Since the end boundary is inclusive, you'll need to use the `<=`
operator rather than `<` to check for the end of your loop.
@!327b2a0d2452c1314580fab17c3050148193cba1

{{index "arguments object"}}
@!eadf1c90d7f744458305771035d43992ea8f745c

To step parameter can be an optional parameter that defaults (using
the `=` operator) to 1.
@!858d237db651bfe59b0a8c285323336637c6493e

{{index "range function", "for loop"}}
@!12866a82bdec258713e3668803b7e8b73a73ea0c

Having `range` understand negative step values is probably best done
by writing two separate loops—one for counting up and one for counting
down—because the comparison that checks whether the loop is finished
needs to be `>=` rather than `<=` when counting downward.
@!0091ec2b9abe652a90c9aae2de5b83ca57330add

It might also be worthwhile to use a different default step, namely,
-1, when the end of the range is smaller than the start. That way,
`range(5, 2)` returns something meaningful, rather than getting stuck
in an ((infinite loop)). It is possible to refer to previous
parameters in the default value of a parameter.
@!2ec6340696d3d0a12729402ad004fd99c0d4f763

hint}}
@!509404f762de506b7424bc4dfe6a2e4b19334dee

### Reversing an array
@!5b8bb5e70c6a06bcc9739cd60e2101002dfdfdd6

{{index "reversing (exercise)", "reverse method", [array, methods]}}
@!452fd56abf2b8f37bd56d7a6d04f5b10f3136cab

Arrays have a method `reverse`, which changes the array by inverting
the order in which its elements appear. For this exercise, write two
functions, `reverseArray` and `reverseArrayInPlace`. The first,
`reverseArray`, takes an array as argument and produces a _new_ array
that has the same elements in the inverse order. The second,
`reverseArrayInPlace`, does what the `reverse` method does: it
_modifies_ the array given as argument by reversing its elements.
Neither may use the standard `reverse` method.
@!f8dcb675e30cec89716c4e141ac2cd1f005c4949

{{index efficiency, "pure function", "side effect"}}
@!e92175bf746b3ae7afcb048e748fdfbe65097bb7

Thinking back to the notes about side effects and pure functions in
the [previous chapter](03_functions.html#pure), which variant do you
expect to be useful in more situations? Which one is more efficient?
@!d7e373f92b0d1bd9697a2b6a0c5881fa7c7de251

{{if interactive
@!81bc83ae321f42d4755fc72a5a06c8738c76174f

```{test: no}
// Your code here.

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
```
@!8afd0ccafd047da027a1f1228ff3ea36489920d2

if}}
@!fbe031dcea98c87ab57b40bbaf88632f20028ac8

{{hint
@!414ec0967bdce102e108a021a1b1ca438ffb37ef

{{index "reversing (exercise)"}}
@!a171b43dbe3b6c66a354246ade886043c1f23715

There are two obvious ways to implement `reverseArray`. The first is
to simply go over the input array from front to back and use the
`unshift` method on the new array to insert each element at its start.
The second is to loop over the input array backward and use the `push`
method. Iterating over an array backward requires a (somewhat awkward)
`for` specification like `(let i = array.length - 1; i >= 0; i--)`.
@!f30bea8bbc0b19c4065947933074ce519962ee4a

{{index "slice method"}}
@!a3dc2c341b1b46d537456c4fb07d84a6474400cd

Reversing the array in place is harder. You have to be careful not to
overwrite elements that you will later need. Using `reverseArray` or
otherwise copying the whole array (`array.slice(0)` is a good way to
copy an array) works but is cheating.
@!def5513dcc3889913319f98a6d5f9544e7565b94

The trick is to _swap_ the first and last elements, then the second
and second-to-last, and so on. You can do this by looping over half
the length of the array (use `Math.floor` to round down—you don't need
to touch the middle element in an array with an odd number of
elements) and swapping the element at position `i` with the one at
position `array.length - 1 - i`. You can use a local binding to
briefly hold on to one of the elements, overwrite that one with its
mirror image, and then put the value from the local binding in the
place where the mirror image used to be.
@!e9536e7d1aedf857617d6c96be52e766e98abed2

hint}}
@!9646398b6fd26d069b0a91d7a8c854cef480ca69

{{id list}}
@!6d0bf313a5a2c391947568bcc66600c17cabae36

### A list
@!3b7fa2af0899fd03818e0bbca9ad16d79e4795a1

{{index "data structure", "list (exercise)", "linked list", object, array, collection}}
@!5b0c1089a205a476cc53a250e94cc67ac03af193

Objects, as generic blobs of values, can be used to build all sorts of
data structures. A common data structure is the _list_ (not to be
confused with array). A list is a nested set of objects, with the
first object holding a reference to the second, the second to the
third, and so on.
@!c37e012dd8caf359b1d45fb7032468980091521b

```{includeCode: true}
let list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};
```
@!852678316d726f486a9d4e379ec3522c17908d02

The resulting objects form a chain, like this:
@!6f99b9ff0becc0444b7a215f322bcbc1a770e6c6

{{figure {url: "img/linked-list.svg", alt: "A linked list",width: "6cm"}}}
@!855fcd9f0fba523469187f76f4c6c1c1f020c34c

{{index "structure sharing", memory}}
@!037e7bbb8d65a92b5769ceaca46ccce780634a49

A nice thing about lists is that they can share parts of their
structure. For example, if I create two new values `{value: 0, rest:
list}` and `{value: -1, rest: list}` (with `list` referring to the
binding defined earlier), they are both independent lists, but they
share the structure that makes up their last three elements. In
addition, the original list is also still a valid three-element list.
@!9841815cb932f0afda93d1267df7c31c6c3574aa

Write a function `arrayToList` that builds up a data structure like
the previous one when given `[1, 2, 3]` as argument, and write a
`listToArray` function that produces an array from a list. Also write
the helper functions `prepend`, which takes an element and a list and
creates a new list that adds the element to the front of the input
list, and `nth`, which takes a list and a number and returns the
element at the given position in the list, or `undefined` when there
is no such element.
@!16f092f564e06b56e77f17ae725e1cd2edb218d7

{{index recursion}}
@!7c09b856c693f724b2f6eeea25659b570b807877

If you haven't already, also write a recursive version of `nth`.
@!8d4739530eff18fb023830a05a8f454c946c853d

{{if interactive
@!900fbb8ba582e9e38f670be346550c69f3c4844e

```{test: no}
// Your code here.

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
```
@!89333a97d87bc6d73c78c7033b067d44fb8a4ace

if}}
@!c209d63ee835086669d0f7129276ca321b2cfb2a

{{hint
@!6e887ec5628a81b20ab6fc401f038f2dea3f3fd6

{{index "list (exercise)", "linked list"}}
@!42005ed63d482e54230cf231ed14e03281f621cb

Building up a list is easier when done back to front. So `arrayToList`
could iterate over the array backward (see previous exercise) and, for
each element, add an object to the list. You can use a local binding
to hold the part of the list that was built so far and use an
assignment like `list = {value: X, rest: list}` to add an element.
@!c8b61849eddd026184e5215fc263b24a70761d5c

{{index "for loop"}}
@!46dd8c86753d92cb9bb088d87deef2619bef7d70

To run over a list (in `listToArray` and `nth`), a `for` loop
specification like this can be used:
@!d16502df882b07a178c3dc9d0e75c360ad399910

```
for (let node = list; node; node = node.rest) {}
```
@!cb9044f70b96df5aa4948c265186e779d25970bc

Can you see how that works? Every iteration of the loop, `node` points
to the current sublist, and the body can read its `value` property to
get the current element. At the end of an iteration, `node` moves to
the next sublist. When that is null, we have reached the end of the
list and the loop is finished.
@!b714a8e11afe1a25c6e2347b9518fd52417d5459

{{index recursion}}
@!ef225615f92d0039993e2378c1a4a2033da32965

The recursive version of `nth` will, similarly, look at an ever
smaller part of the “tail” of the list and at the same time count down
the index until it reaches zero, at which point it can return the
`value` property of the node it is looking at. To get the zeroeth
element of a list, you simply take the `value` property of its head
node. To get element _N_ + 1, you take the _N_th element of the list
that's in this list's `rest` property.
@!ed17c6b05c6fda5a2fe833207669cb490bda5665

hint}}
@!cccfdfc65e983563d389c22276f26090a8778198

{{id exercise_deep_compare}}
@!0d797ca7f0980347c2ac4b999e8e9a5f403ed8e9

### Deep comparison
@!17c7b27751e2c31800bea2190691876bd501b2fe

{{index "deep comparison (exercise)", comparison, "deep comparison", "== operator"}}
@!5ea52cbf88ed8ea00854348c0f6612582e62d9e0

The `==` operator compares objects by identity. But sometimes, you
would prefer to compare the values of their actual properties.
@!3fb03ed820d9bf29126f5544d2c4c709212664d7

Write a function, `deepEqual`, that takes two values and returns true
only if they are the same value or are objects with the same
properties whose values are also equal when compared with a recursive
call to `deepEqual`.
@!899c75e97bdec275f797a923a50656b59e0257a9

{{index null, "=== operator", "typeof operator"}}
@!a583c689b14d537a2f5cc1f7368fb25ac70f3f41

To find out whether to compare two things by identity (use the `===`
operator for that) or by looking at their properties, you can use the
`typeof` operator. If it produces `"object"` for both values, you
should do a deep comparison. But you have to take one silly exception
into account: by a historical accident, `typeof null` also produces
`"object"`.
@!aafce004d022e94322a40987101e8f491d97de69

{{index "Object.keys function"}}
@!c1b2a2c9506663132be88410556e06dfcd5ddeb3

The `Object.keys` function will be useful when you need to go over the
properties of objects to compare them one by one.
@!0c8748e96c1d872d361366af26c0378867ecda35

{{if interactive
@!23572a958420d656e216c0c411acae66144e2420

```{test: no}
// Your code here.

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
```
@!6125dfadc44d956987ba028d29c51264242b2cc0

if}}
@!2cdbc79aa8783c9608232830fe09f04e34b7e8fd

{{hint
@!3d2339608a7d684476bab42e6a64771c17cc9f2e

{{index "deep comparison (exercise)", "typeof operator", object, "=== operator"}}
@!2c53eb7c2bac111c8eb0e06c522b3d374434ee19

Your test for whether you are dealing with a real object will look
something like `typeof x == "object" && x != null`. Be careful to
compare properties only when _both_ arguments are objects. In all
other cases you can just immediately return the result of applying
`===`.
@!bbaeec0422b0ec7d1aa95003a7af00e843d4ee36

{{index "Object.keys method"}}
@!9fbf9854a19cc74ebd1d57db930a0068c53ecaac

Use `Object.keys` to go over the properties. You need to test whether
both objects have the same set of property names and whether those
properties have identical values. One way to do that is to ensure that
both objects have the same number of properties (the lengths of the
property lists are the same). And then, when looping over one of the
object's properties in order to compare them, always first make sure
the other actually has a property by that name. If they have the same
number of properties, and all properties in one also exist in the
other, they have the same set of property names.
@!cf12b73d9b3d37bc95c09e46ca1fceddffdaf8a3

{{index "return value"}}
@!66a72272969152008f0a52111481d306fd6f92b6

Returning the correct value from the function is best done by
immediately returning false when a mismatch is found and returning
true at the end of the function.
@!23d51e46d54f5a0f8d28b9f958828f170094232a

hint}}
@!a74070d8aa4507307b9f653f5877e00d2c58daf7