{{meta {chap_num: 9, prev_link: 08_error, next_link: 10_modules}}}
@!1ee390d948656198b0bc757705824596017b0b8f

# Regular Expressions
@!e8181cdb659fdb748f27b3893b99f6732cfc9c1b

{{quote {author: "Jamie Zawinski", chapter: true}
@!997af535708c4e309487a2f309eec021c620c967

Some people, when confronted with a problem, think ‘I know, I'll use
regular expressions.’ Now they have two problems.
@!520e73ac5e9882b1ff03e9e510cbaf11c19102c9

quote}}
@!0a48e74296fea247c091b977a09c4a97101d07c8

{{if interactive
@!58562958114e4e08fe38a6b00602e3ef9880f773

{{quote {author: "Master Yuan-Ma", title: "The Book of Programming", chapter: true}
@!08a99545e7c96f29147a6c4c03ec30996e0fe7a4

Yuan-Ma said, ‘When you cut against the grain of the wood, much
strength is needed. When you program against the grain of a problem,
much code is needed.’
@!4b7dbb86f45ce3ba8499783be234b341e59a5264

quote}}
@!dec72aab85b758520293aa0cc44973bae428b55d

if}}
@!c871851209c15b5bcb31a3c3fe7251c2cbb2a774

{{index "Zawinski, Jamie", evolution, adoption, integration}}
@!8888d9f876b7ff1ec3ba35a47d80c855fa85d99c

Programming ((tool))s and techniques survive and spread in a chaotic,
evolutionary way. It's not always the pretty or brilliant ones that
win but rather the ones that function well enough within the right
niche—for example, by being integrated with another successful piece
of technology.
@!c85e44ac2e442590129d99b4bd92330b880c55bd

{{index "domain-specific language"}}
@!e0ed4715063fd0acd7526e893e8a1a5a4e43e559

In this chapter, I will discuss one such tool, _((regular
expression))s_. Regular expressions are a way to describe ((pattern))s
in string data. They form a small, separate language that is part of
JavaScript and many other languages and tools.
@!4f715acd44fe990a629bd8ad5bdc33dec5d2974e

{{index [interface, design]}}
@!a75263a3a99e33ba9b75f1cc14e0edbabca7da5b

Regular expressions are both terribly awkward and extremely useful.
Their syntax is cryptic, and the programming ((interface)) JavaScript
provides for them is clumsy. But they are a powerful ((tool)) for
inspecting and processing strings. Properly understanding regular
expressions will make you a more effective programmer.
@!22a36808a3b3b284aec01e949d2b1f28d847f829

## Creating a regular expression
@!6469f8212e7f9e6c482ff0efa0a307b450c92ed4

{{index ["regular expression", creation], "RegExp constructor", "literal expression", "slash character"}}
@!fb037d5d72222db1d0d4a5c15491fd70bda5ac16

A regular expression is a type of object. It can either be constructed
with the `RegExp` constructor or written as a literal value by
enclosing the pattern in forward slash (`/`) characters.
@!34e76cc2024687480a99c6a3e8c76dd24e2319e8

```
let re1 = new RegExp("abc");
let re2 = /abc/;
```
@!c9bf90b9a84a4c002cc0f6ae54d708e9f640c7b2

Both of these regular expression objects represent the same
((pattern)): an _a_ character followed by a _b_ followed by a _c_.
@!7e2efd0deff65ec4e621651929ef965f4166a406

{{index "backslash character", "RegExp constructor"}}
@!114f99b12136b57b29fc0284cce5d16db2e78254

When using the `RegExp` constructor, the pattern is written as a
normal string, so the usual rules apply for backslashes.
@!b4711348023a66d046f2b454e1bb1cf6c9f864a5

{{index ["regular expression", escaping], [escaping, "in regexps"], "slash character"}}
@!1dee40b0503d24e8c82e490ba13e47d1648cba31

The second notation, where the pattern appears between slash
characters, treats backslashes somewhat differently. First, since a
forward slash ends the pattern, we need to put a backslash before any
forward slash that we want to be _part_ of the pattern. In addition,
backslashes that aren't part of special character codes (like `\n`)
will be _preserved_, rather than ignored as they are in strings, and
change the meaning of the pattern. Some characters, such as question
marks and plus signs, have special meanings in regular expressions and
must be preceded by a backslash if they are meant to represent the
character itself.
@!cd5fc5660d683b7fc29c598012994223d0d179eb

```
let eighteenPlus = /eighteen\+/;
```
@!cae1bdbf675e428c9f503e21d6f21f1780e2e263

Knowing precisely what characters to backslash-escape when writing
regular expressions requires you to know every character with a
special meaning. For the time being, this may not be realistic, so
when in doubt, just put a backslash before any character that is not a
letter, number, or ((whitespace)).
@!676c1a750835c1f355940762e017cc2de9b559f3

## Testing for matches
@!64c32dcba0d150caf96159c5e39e9f592c193305

{{index matching, "test method", ["regular expression", methods]}}
@!ba0ad7c4ceede0417fa4d7569f7480260ebcf838

Regular expression objects have a number of methods. The simplest one
is `test`. If you pass it a string, it will return a ((Boolean))
telling you whether the string contains a match of the pattern in the
expression.
@!8ad0f43bf143fdd63a4e46f06be1dbdc7eaef262

```
console.log(/abc/.test("abcde"));
// → true
console.log(/abc/.test("abxde"));
// → false
```
@!700909215e974de30c5ed9c8bb5dbbedbeb2effc

{{index pattern}}
@!db649d3328a32f54f9cecd05841637343b9ec70e

A ((regular expression)) consisting of only nonspecial characters
simply represents that sequence of characters. If _abc_ occurs
anywhere in the string we are testing against (not just at the start),
`test` will return `true`.
@!73e1a513f9346ba24193fcdeca644a7712cc2405

## Matching a set of characters
@!04231bac778e4329e20085fc597618116daa3979

{{index "regular expression", "indexOf method"}}
@!fad83c739be564ef4cb424ab62add9960f3805dc

Finding out whether a string contains _abc_ could just as well be done
with a call to `indexOf`. Regular expressions allow us to express more
complicated ((pattern))s.
@!583f75b71d75db2df1261955bec4ddb5ee3f86da

Say we want to match any ((number)). In a regular expression, putting
a ((set)) of characters between square brackets makes that part of the
expression match any of the characters between the brackets.
@!ad07f23bdce341486ac70002ffedbc12da59f500

Both of the following expressions match all strings that contain a ((digit)):
@!f5c29ee518780e4fb760b2364f520feba017e951

```
console.log(/[0123456789]/.test("in 1992"));
// → true
console.log(/[0-9]/.test("in 1992"));
// → true
```
@!2849a4fe4a9977ed823777e72f918531c84012ae

{{index "dash character"}}
@!b24da6286ea0ca373797617813ba1d3f0a7a9ca1

Within square brackets, a dash (`-`) between two characters can be
used to indicate a ((range)) of characters, where the ordering is
determined by the character's ((Unicode)) number. Characters 0 to 9
sit right next to each other in this ordering (codes 48 to 57), so
`[0-9]` covers all of them and matches any ((digit)).
@!60d7e7edb3342181722cab7b21b934fb99819f3e

{{index whitespace, "alphanumeric character", "period character"}}
@!d02e88a9206cbd2b92d163ae49feb704d917ce64

There are a number of common character groups that have their own
built-in shortcuts. Digits are one of them: `\d` means the same thing
as `[0-9]`.
@!29e367bc55a6e1d0a3bfab06fb850e221093152b

{{index "newline character"}}
@!cd3aee7f903d56c1f21a688570ab35b9aa6fe861

{{table {cols: [1, 5]}}}
@!3bb5f0d4b5f1c3376839908a117ec48c51ddfb28

| `\d`    | Any ((digit)) character
| `\w`    | An alphanumeric character (“((word character))”)
| `\s`    | Any ((whitespace)) character (space, tab, newline, and similar)
| `\D`    | A character that is _not_ a digit
| `\W`    | A nonalphanumeric character
| `\S`    | A nonwhitespace character
| `.`     | Any character except for newline
@!15e4394213bbea358440978d11055218073ad0aa

So you could match a ((date)) and ((time)) format like 30-01-2003
15:20 with the following expression:
@!6dca5ed4efda2bcd778732394b3cad2d4f09f3df

```
let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("30-01-2003 15:20"));
// → true
console.log(dateTime.test("30-jan-2003 15:20"));
// → false
```
@!ea1b6dff6bbd27578e99c33105bd2e9f0e58556e

{{index "backslash character"}}
@!3ec403c18384fbadccf65e0835a055f61c1eb369

That looks completely awful, doesn't it? Half of it is backslashes,
producing a background noise that makes it hard to spot the actual
((pattern)) expressed. We'll see a slightly improved version of this
expression [later](09_regexp.html#date_regexp_counted).
@!105fa00e6e5efe7456adb930233da947589c8c64

{{index [escaping, "in regexps"], "regular expression", set}}
@!717720aaa9f2147d99ff05bda8bb864efa2af6a9

These backslash codes can also be used inside ((square brackets)). For
example, `[\d.]` means any digit or a period character. But note that
the period itself, when used between square brackets, loses its
special meaning. The same goes for other special characters, such as
`+`.
@!58072a098ee0fed7ffa9bb1305f993afaa158fe5

{{index "square brackets", inversion, "caret character"}}
@!80539919bc1a2669050f6077286d82bdb3062195

To _invert_ a set of characters—that is, to express that you want to
match any character _except_ the ones in the set—you can write a caret
(`^`) character after the opening bracket.
@!3b03fb1b8ba1242c8d975b59011a09bad0779c23

```
let notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));
// → false
console.log(notBinary.test("1100100010200110"));
// → true
```
@!2dcc9d8a62915b1bfe0c0eadcdfd5ca731dfc4d1

## Repeating parts of a pattern
@!a2c4b1877e5d05461fe345780fc469321cebec8d

{{index ["regular expression", repetition]}}
@!961dbb8a0107d6fd03f1409d5b83b9994663169b

We now know how to match a single digit. What if we want to match a
whole number—a ((sequence)) of one or more ((digit))s?
@!77c42cccea8e2ab8a1930c4af174bafdc17e0063

{{index "plus character", repetition, "+ operator"}}
@!08b385d580682c3fa2a3fbf1412602b5415db76b

When you put a plus sign (`+`) after something in a regular
expression, it indicates that the element may be repeated more than
once. Thus, `/\d+/` matches one or more digit characters.
@!fecb1b02aa3563fa4649f8cfdcd9eb5c582d3033

```
console.log(/'\d+'/.test("'123'"));
// → true
console.log(/'\d+'/.test("''"));
// → false
console.log(/'\d*'/.test("'123'"));
// → true
console.log(/'\d*'/.test("''"));
// → true
```
@!8147e11e885c1df2acbcf5bd935527f119742fed

{{index "* operator", asterisk}}
@!500885c68fd4053bad7980a60f503ec58785a4f2

The star (`*`) has a similar meaning but also allows the pattern to
match zero times. Something with a star after it never prevents a
pattern from matching—it'll just match zero instances if it can't find
any suitable text to match.
@!598dbad308881c280f0f813146b29f175de16b15

{{index "British English", "American English", "question mark"}}
@!018866be65d33f05e4f83b52d1f486758f38d1b0

A question mark makes a part of a pattern “((optional))”, meaning it
may occur zero or one time. In the following example, the _u_
character is allowed to occur, but the pattern also matches when it is
missing.
@!aaec537b58a4d13aaf1b2762f8982ca2e819eb4f

```
let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));
// → true
console.log(neighbor.test("neighbor"));
// → true
```
@!79435d8b7d8eeae621f6a17f1951442d02c333af

{{index repetition, "curly braces"}}
@!dc44fc591ac1f113d8089027520cde9511039afb

To indicate that a pattern should occur a precise number of times, use
curly braces. Putting `{4}` after an element, for example, requires it
to occur exactly four times. It is also possible to specify a
((range)) this way: `{2,4}` means the element must occur at least
twice and at most four times.
@!a00ef1619e2a216e383b5620f427211432f82c9b

{{id date_regexp_counted}}
@!8fedf7291e7755529d31d15e4dff1d28c8a46ea0

Here is another version of the ((date)) and ((time)) pattern that
allows both single- and double-((digit)) days, months, and hours. It
is also slightly easier to decipher.
@!33a1f1e8424894db5ee4c580585d61e84e1c33a2

```
let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("30-1-2003 8:45"));
// → true
```
@!c517b0b07bef52319534c014b127ca9649fd412f

You can also specify open-ended ((range))s when using ((curly braces))
by omitting the number after the comma. So `{5,}` means five or more
times.
@!494815cac0f856a692db83c9fcf7c3d51d5de2cc

## Grouping subexpressions
@!c59883df88bf0f0c85ef7bcbac724905370173f8

{{index ["regular expression", grouping], grouping}}
@!4dfd71c08b1dcebc1a4a35fb11221286c4f8ba23

To use an operator like `*` or `+` on more than one element at a time,
you can use ((parentheses)). A part of a regular expression that is
enclosed in parentheses counts as a single element as far as the
operators following it are concerned.
@!87688a8bc5d4982b0dcddb99c6f277a8409b1bf7

```
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// → true
```
@!75c4e75c28c6fb38bc2ca928d7de49552620b374

{{index crying}}
@!78f84fc1293821b542e0c971a659b501d9b41d37

The first and second `+` characters apply only to the second _o_ in
_boo_ and _hoo_, respectively. The third `+` applies to the whole
group `(hoo+)`, matching one or more sequences like that.
@!2998d4c439d196859c08ae6693e32891de42a7bd

{{index "case sensitivity", capitalization, ["regular expression", flags]}}
@!f575a243d347bdc9080afdee19ff30eb7919945a

The `i` at the end of the expression in the example makes this regular
expression case insensitive, allowing it to match the uppercase _B_ in
the input string, even though the pattern is itself all lowercase.
@!f990079de31542345da58feca6255e578f1acae8

## Matches and groups
@!213307b6ffb5189659e936477e6ee0cb749d4fba

{{index ["regular expression", grouping], "exec method", array}}
@!4b9384b460a1a46007e8f290773f87016a810787

The `test` method is the absolute simplest way to match a regular
expression. It tells you only whether it matched and nothing else.
Regular expressions also have an `exec` (execute) method that will
return `null` if no match was found and return an object with
information about the match otherwise.
@!de04f5f9d17b62b19b8d626d997a184d37f06cd0

```
let match = /\d+/.exec("one two 100");
console.log(match);
// → ["100"]
console.log(match.index);
// → 8
```
@!4433e4299d96fa70a1f55925483f348344fd2c55

{{index "index property", [string, indexing]}}
@!6de412fea5c45bd7279cf043edbbbab1a5bde288

An object returned from `exec` has an `index` property that tells us
_where_ in the string the successful match begins. Other than that,
the object looks like (and in fact is) an array of strings, whose
first element is the string that was matched—in the previous example,
this is the sequence of ((digit))s that we were looking for.
@!3b2df35fb2059f5bd51217fd8e1df952cf12fae5

{{index [string, methods], "match method"}}
@!dbcc63b5444be9999d2db1a17d7086b57b1d1dc1

String values have a `match` method that behaves similarly.
@!c75ae36597d6ffa7607427b7bc50aedf5bcb0bb2

```
console.log("one two 100".match(/\d+/));
// → ["100"]
```
@!bad284e6be392674bcd562c1eaa7989a05dfefc2

{{index grouping, "capture group", "exec method"}}
@!63d898d34c23b0c847ab4bcdfcbd406fe23f1284

When the regular expression contains subexpressions grouped with
parentheses, the text that matched those groups will also show up in
the array. The whole match is always the first element. The next
element is the part matched by the first group (the one whose opening
parenthesis comes first in the expression), then the second group, and
so on.
@!105dfe146683496444b64fa28228958d6e1f08b6

```
let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));
// → ["'hello'", "hello"]
```
@!d57222ae5fd5adb16a2ac4e19cbd93728086dc2b

{{index "capture group"}}
@!5c5f19792f416086eed6356a65d777a3f7825741

When a group does not end up being matched at all (for example, when
followed by a question mark), its position in the output array will
hold `undefined`. Similarly, when a group is matched multiple times,
only the last match ends up in the array.
@!e3c90bd9ffd4677797dbc48be25e4f1a6f16b341

```
console.log(/bad(ly)?/.exec("bad"));
// → ["bad", undefined]
console.log(/(\d)+/.exec("123"));
// → ["123", "3"]
```
@!2858c8a4caeb6873aa3d93b802d45215d1c50255

{{index "exec method", ["regular expression", methods], extraction}}
@!f9b9ce7eeb411bd2614c54c8412e0c67f06ebf3c

Groups can be useful for extracting parts of a string. If we don't
just want to verify whether a string contains a ((date)) but also
extract it and construct an object that represents it, we can wrap
parentheses around the digit patterns and directly pick the date out
of the result of `exec`.
@!7f558500c490b09f5bc79bff9e255c83b74dcb54

But first, a brief detour, in which we discuss the preferred way to
store date and ((time)) values in JavaScript.
@!b6e1fa99547ed2bf92ec16223ce9e82120c5d2ae

## The date type
@!44a98e5e81e9997338e806447a191accae62590d

{{index constructor, "Date constructor"}}
@!bf986c06c6528506aa9086d0952f1acf6f3ec1fd

JavaScript has a standard object type for representing ((date))s—or
rather, points in ((time)). It is called `Date`. If you simply create
a date object using `new`, you get the current date and time.
@!6d99b18a34486d709860f39f23b2408f522731fb

```{test: no}
console.log(new Date());
// → Mon Nov 13 2017 16:19:11 GMT+0100 (CET)
```
@!7cb20c92116c2adbc8f76efeb2dd848c2c716915

{{index "Date constructor"}}
@!1b60516eb20f4ec5e21e922ffb69d87a56b95a74

You can also create an object for a specific time.
@!6798ad737be857b354a3de899e50d9cd016eaaeb

```
console.log(new Date(2009, 11, 9));
// → Wed Dec 09 2009 00:00:00 GMT+0100 (CET)
console.log(new Date(2009, 11, 9, 12, 59, 59, 999));
// → Wed Dec 09 2009 12:59:59 GMT+0100 (CET)
```
@!954af8cc4177da246cd951045f873c8a5b013dab

{{index "zero-based counting", [interface, design]}}
@!ffbf371e3b0527ee9cd07b341edb2a5e54b3f95c

JavaScript uses a convention where month numbers start at zero (so
December is 11), yet day numbers start at one. This is confusing and
silly. Be careful.
@!ca54d34e7414f868815aad9c37bc5ba0203a73a5

The last four arguments (hours, minutes, seconds, and milliseconds)
are optional and taken to be zero when not given.
@!491d459f987563866209042b55db16ada31b201d

{{index "getTime method"}}
@!5e77cbd90654fdfaaf0d6464c1feb0de5d2ed023

Timestamps are stored as the number of milliseconds since the start of
1970, using negative numbers for times before 1970 (following a
convention set by “((Unix time))”, which was invented around that
time). The `getTime` method on a date object returns this number. It
is big, as you can imagine.
@!9f9c87cc508cf0bf456ae814d8a015cab0b9ef98

```
console.log(new Date(2013, 11, 19).getTime());
// → 1387407600000
console.log(new Date(1387407600000));
// → Thu Dec 19 2013 00:00:00 GMT+0100 (CET)
```
@!acaf6240762a17d34413809c3693906604ae92b6

{{index "Date.now function", "Date constructor"}}
@!149fa84bd12784ef189feb989fc0f235cae00b9b

If you give the `Date` constructor a single argument, that argument is
treated as such a millisecond count. You can get the current
millisecond count by creating a new `Date` object and calling
`getTime` on it or by calling the `Date.now` function.
@!8f90f5eee0c67f400fa19fefddf771d23489edb6

{{index "getFullYear method", "getMonth method", "getDate method", "getHours method", "getMinutes method", "getSeconds method", "getYear method"}}
@!e7c2b48db7242adf49d134cf7e5d4828f232d308

Date objects provide methods like `getFullYear`, `getMonth`,
`getDate`, `getHours`, `getMinutes`, and `getSeconds` to extract their
components. There's also `getYear`, which gives you a rather useless
two-digit year value (such as `93` or `14`).
@!fd6899593d840f8994a6e0fda8f5ac873c6a0302

{{index "capture group", "getDate function"}}
@!0fc740643dbc38f1fba6020afea39aaf600932ad

Putting ((parentheses)) around the parts of the expression that we are
interested in, we can now easily create a date object from a string.
@!7498e73cbc018181bc579d3b60783205612d6966

```
function getDate(string) {
  let [_, day, month, year] =
    /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(year, month - 1, day);
}
console.log(getDate("30-1-2003"));
// → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)
```
@!ebde73fabff74bc76ce30ac89988b8bb36b55f3b

{{index destructuring, "underscore character"}}
@!1aaee3722c56e208221069eb52b82dbcb8a10fed

The `_` (underscore) binding is ignored, and only used to "skip" the
full match element in the array returned by `match`.
@!c1c8f408c38d3ee49cc2e183516ff32347f7db57

## Word and string boundaries
@!a95243abac1486e798ab95ece8b6551b2cc1e4ce

{{index matching, ["regular expression", boundary]}}
@!f56dd303be6c5c3aec7b6cc2c60ab97b29369203

Unfortunately, `getDate` will also happily extract the nonsensical
date 00-1-3000 from the string `"100-1-30000"`. A match may happen
anywhere in the string, so in this case, it'll just start at the
second character and end at the second-to-last character.
@!dec672c4d7c41eca6d4df408d1c69e9d256e1ba8

{{index boundary, "caret character", "dollar sign"}}
@!a9a60956c602c8cb29d2f8c564c709d6930967b5

If we want to enforce that the match must span the whole string, we
can add the markers `^` and `$`. The caret matches the start of the
input string, while the dollar sign matches the end. So, `/^\d+$/`
matches a string consisting entirely of one or more digits, `/^!/`
matches any string that starts with an exclamation mark, and `/x^/`
does not match any string (there cannot be an _x_ before the start of
the string).
@!c8a468ab1b79a236712fc2259ee09000c9f365f3

{{index "word boundary", "word character"}}
@!2050801fe00becd560e8a1231a25d3972811a498

If, on the other hand, we just want to make sure the date starts and
ends on a word boundary, we can use the marker `\b`. A word boundary
can be the start or end of the string or any point in the string that
has a word character (as in `\w`) on one side and a nonword character
on the other.
@!20d64ca8ba411729bb17d8108de15461c4237c03

```
console.log(/cat/.test("concatenate"));
// → true
console.log(/\bcat\b/.test("concatenate"));
// → false
```
@!ee5dfc1cd6a4f9a633789c0cc37f5c43ec0bd8bd

{{index matching}}
@!637dbf153e291524d48d853a2e132e41c90a015c

Note that a boundary marker doesn't represent an actual character. It
just enforces that the regular expression matches only when a certain
condition holds at the place where it appears in the pattern.
@!7af55113715797366f9d214cadf53308fcf9123b

## Choice patterns
@!38f9d3980e8e3fabdc603c6f346267a2ebd4bdc0

{{index branching, ["regular expression", alternatives], "farm example"}}
@!ff205836664d6ca5fdc76aff6e3f4db046e9ec6e

Say we want to know whether a piece of text contains not only a number
but a number followed by one of the words _pig_, _cow_, or _chicken_,
or any of their plural forms.
@!0b3154224a0c63193c8a4e2b05f911ec6e05b9c3

We could write three regular expressions and test them in turn, but
there is a nicer way. The ((pipe character)) (`|`) denotes a
((choice)) between the pattern to its left and the pattern to its
right. So I can say this:
@!442c5d1fbb8312e8cfd18270153e3f0d43f4d9cf

```
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));
// → true
console.log(animalCount.test("15 pigchickens"));
// → false
```
@!7d563776a779951bed2c26cc4c4e118a7ad0cbdd

{{index parentheses}}
@!96ba407b826faf528a34307b9381fd9c3a488dab

Parentheses can be used to limit the part of the pattern that the pipe
operator applies to, and you can put multiple such operators next to
each other to express a choice between more than two patterns.
@!0aa867088b81fd2ae0cca8e1fbb6ef11c6493d45

## The mechanics of matching
@!f07d6043a35555a8c3399d94d28c4d51917e0d12

{{index ["regular expression", matching], [matching, algorithm]}}
@!a2cb0d8d22a03b04216b5a1565345df1c1e26fa5

Regular expressions can be thought of as ((flow diagram))s. This is
the diagram for the livestock expression in the previous example:
@!416ccba5a70630a48789b022d78cf6816937602f

{{figure {url: "img/re_pigchickens.svg", alt: "Visualization of /\\b\\d+ (pig|cow|chicken)s?\\b/"}}}
@!1c73ab5d61f9d604efbf3f2f2a7671d793272c47

{{index traversal}}
@!d6be15021fe1c9892997f5a1ee6c0582f3329eb2

Our expression matches a string if we can find a path from the left
side of the diagram to the right side. We keep a current position in
the string, and every time we move through a box, we verify that the
part of the string after our current position matches that box.
@!ff9ad3ebf92e46dcdf1c9aa471af7972ceeadf7f

So if we try to match `"the 3 pigs"` with our regular expression, our
progress through the flow chart would look like this:
@!517ec6bf73d5269e7d2a2e913dd882d2a064bb21

- At position 4, there is a word ((boundary)), so we can move past
   the first box.
@!828bfd7c137af59feaf01f7b6e2a79d56b83c3ce

- Still at position 4, we find a digit, so we can also move past the
   second box.
@!3b2258b4830ca87e7268b8f9cae58347104f410c

- At position 5, one path loops back to before the second (digit)
   box, while the other moves forward through the box that holds a
   single space character. There is a space here, not a digit, so we
   must take the second path.
@!e1db1fcf96e5209b2b0e60cbbda3512eb2ffeaa0

- We are now at position 6 (the start of “pigs”) and at the three-way
   branch in the diagram. We don't see “cow” or “chicken” here, but we
   do see “pig”, so we take that branch.
@!ebb1ea4b921bca1ce4aca94bfce5fee3b7bcde07

- At position 9, after the three-way branch, one path skips the _s_
   box and goes straight to the final word boundary, while the other
   path matches an _s_. There is an _s_ character here, not a word
   boundary, so we go through the _s_ box.
@!f990f5fd21a338bbf9529d1cec611595ecca0be5

- We're at position 10 (the end of the string) and can match only a
   word ((boundary)). The end of a string counts as a word boundary,
   so we go through the last box and have successfully matched this
   string.
@!482210a1c80e6f8c27b7d66b5c461f2debe0de92

{{index ["regular expression", matching], [matching, algorithm], searching}}
@!bfc2b236a7ce230e61d2d2af4e1ea13b0e2d7cfb

Conceptually, a regular expression engine looks for a match in a
string as follows: it starts at the start of the string and tries a
match there. In this case, there _is_ a word boundary there, so it'd
get past the first box—but there is no digit, so it'd fail at the
second box. Then it moves on to the second character in the string and
tries to begin a new match there... and so on, until it finds a match
or reaches the end of the string and decides that there really is no
match.
@!b96beea436d5e423a45ff67a4fbd59520ea05757

{{id backtracking}}
@!a6b31f2bcee27c5dc3d999f8c2bf11709843587c

## Backtracking
@!937387ae9defdaf02325fb219d05a45b2ff6d731

{{index ["regular expression", backtracking], "binary number", "decimal number", "hexadecimal number", "flow diagram", [matching, algorithm], backtracking}}
@!91a44f7daff67aad2cd6f18a4b31969ad2f8be5b

The regular expression `/\b([01]+b|\d+|[\da-f]+h)\b/` matches either a
binary number followed by a _b_, a regular decimal number with no
suffix character, or a hexadecimal number (that is, base 16, with the
letters _a_ to _f_ standing for the digits 10 to 15) followed by an
_h_. This is the corresponding diagram:
@!cf6ec4487733b3f9472d562f40c8eb653f79f45d

{{figure {url: "img/re_number.svg", alt: "Visualization of /\\b([01]+b|\\d+|[\\da-f]+h)\\b/", htmlWidth: 500px}}}
@!2c5d927fd2ba5fdee5c3bbbc20c9e3a32e84d867

{{index branching}}
@!3b18b22bc964b670ffb7731c84ddc70509260d92

When matching this expression, it will often happen that the top
(binary) branch is entered even though the input does not actually
contain a binary number. When matching the string `"103"`, for
example, it becomes clear only at the 3 that we are in the wrong
branch. The string _does_ match the expression, just not the branch we
are currently in.
@!f51af4367372604dc256233d494c4018bde966b4

{{index backtracking, searching}}
@!065710e41845c41416f870b8fff3b6a25085ae1d

So the matcher _backtracks_. When entering a branch, it remembers its
current position (in this case, at the start of the string, just past
the first boundary box in the diagram) so that it can go back and try
another branch if the current one does not work out. For the string
`"103"`, after encountering the 3 character, it will start trying the
branch for decimal numbers. This one matches, so a match is reported
after all.
@!9c13b209d3ca326b424c52d08f05740cc59d5a5d

{{index [matching, algorithm]}}
@!59b251be73fdd1d178c4fc66694b6effa96de063

The matcher stops as soon as it finds a full match. This means that if
multiple branches could potentially match a string, only the first one
(ordered by where the branches appear in the regular expression) is
used.
@!c2b51be24b0700fa45be97f76b87a9226803a66e

Backtracking also happens for ((repetition)) operators like + and `*`.
If you match `/^.*x/` against `"abcxe"`, the `.*` part will first try
to consume the whole string. The engine will then realize that it
needs an _x_ to match the pattern. Since there is no _x_ past the end
of the string, the star operator tries to match one character less.
But the matcher doesn't find an _x_ after `abcx` either, so it
backtracks again, matching the star operator to just `abc`. _Now_ it
finds an _x_ where it needs it and reports a successful match from
positions 0 to 4.
@!95739c080a8eca4dc9c441107b82ee2c108cf889

{{index performance, complexity}}
@!e77e37bc04f5322f02ce717fe1e0807b19ef4887

It is possible to write regular expressions that will do a _lot_ of
backtracking. This problem occurs when a pattern can match a piece of
input in many different ways. For example, if we get confused while
writing a binary-number regular expression, we might accidentally
write something like `/([01]+)+b/`.
@!8d061ea6717f64dc0fd5fff11fc099b31254b7de

{{figure {url: "img/re_slow.svg", alt: "Visualization of /([01]+)+b/",width: "6cm"}}}
@!4fd489430e17fffe7388ee5d2b98b341f0bfd702

{{index "inner loop", [nesting, "in regexps"]}}
@!6805eb68f39ad59c229040d6008078897465543a

If that tries to match some long series of zeros and ones with no
trailing _b_ character, the matcher will first go through the inner
loop until it runs out of digits. Then it notices there is no _b_, so
it backtracks one position, goes through the outer loop once, and
gives up again, trying to backtrack out of the inner loop once more.
It will continue to try every possible route through these two loops.
This means the amount of work _doubles_ with each additional
character. For even just a few dozen characters, the resulting match
will take practically forever.
@!4da7b097dc4e8045682bf51b4ba58ca39e143acd

## The replace method
@!06ce4e2801bc6eda8c2e1eac12817b6f865fb0ba

{{index "replace method", "regular expression"}}
@!f4a77ff3039c12fcabcf1db406762a689aa4e7ea

String values have a `replace` method, which can be used to replace
part of the string with another string.
@!915424b92cb42d1a0edd605865db8ecd291e5efa

```
console.log("papa".replace("p", "m"));
// → mapa
```
@!76a6ca57d056b752690f2ef068d764e169a31acc

{{index ["regular expression", flags], ["regular expression", global]}}
@!8e2407a144076fa670ce0af74caf8c791d9cd28a

The first argument can also be a regular expression, in which case the
first match of the regular expression is replaced. When a `g` option
(for _global_) is added to the regular expression, _all_ matches in
the string will be replaced, not just the first.
@!aa076c8c43b86a23938dfe34ad43cf8222b71514

```
console.log("Borobudur".replace(/[ou]/, "a"));
// → Barobudur
console.log("Borobudur".replace(/[ou]/g, "a"));
// → Barabadar
```
@!f3e52b4bfe3ef548d7656e6de5b3491faa2da9f7

{{index [interface, design], argument}}
@!6e6ba1d7741cc916b9790406d965cf8b0f811838

It would have been sensible if the choice between replacing one match
or all matches was made through an additional argument to `replace` or
by providing a different method, `replaceAll`. But for some
unfortunate reason, the choice relies on a property of the regular
expression instead.
@!3c9ffc709856af21223945c2b8aec373db0563b8

{{index grouping, "capture group", "dollar sign", "replace method", ["regular expression", grouping]}}
@!d288afa496ec7bc4f34f08d73c69b8b9dd6254e5

The real power of using regular expressions with `replace` comes from
the fact that we can refer back to matched groups in the replacement
string. For example, say we have a big string containing the names of
people, one name per line, in the format `Lastname, Firstname`. If we
want to swap these names and remove the comma to get a simple
`Firstname Lastname` format, we can use the following code:
@!4a26316169b90335ede5356302f281bd52e2bf02

```
console.log(
  "Liskov, Barbara\nMcCarthy, John\nWadler, Philip"
    .replace(/([\w ]+), ([\w ]+)/g, "$2 $1"));
// → Barbara Liskov
//   John McCarthy
//   Philip Wadler
```
@!bcad83f660b7d03c39ba4a0dd511f5583a6ea11c

The `$1` and `$2` in the replacement string refer to the parenthesized
groups in the pattern. `$1` is replaced by the text that matched
against the first group, `$2` by the second, and so on, up to `$9`.
The whole match can be referred to with `$&`.
@!f83fcb70da9fddb529f9d966ad27923c366d0fc2

{{index [function, "higher-order"], grouping, "capture group"}}
@!43d1a24a506028683b24b506335635c8bd36731c

It is also possible to pass a function, rather than a string, as the
second argument to `replace`. For each replacement, the function will
be called with the matched groups (as well as the whole match) as
arguments, and its return value will be inserted into the new string.
@!6b5b27a26035b35753c7e2004684fc0655d32dd1

Here's a small example:
@!2a165b89ebfcdbeb2ba07938a7a63a064e116f03

```
let s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g,
            str => str.toUpperCase()));
// → the CIA and FBI
```
@!93ebd1fb2cb2514ef15e7e869c58d336a5c4cdd5

And here's a more interesting one:
@!5b32f382809287f37dc6603bf8063987e9e5e8a7

```
let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) { // only one left, remove the 's'
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = "no";
  }
  return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// → no lemon, 1 cabbage, and 100 eggs
```
@!7c67d05c1053b6c718920fb185484342144aa1e9

This takes a string, finds all occurrences of a number followed by an
alphanumeric word, and returns a string wherein every such occurrence
is decremented by one.
@!c2217a41ea75a1cf20bee3f6c7e19734445ede53

The `(\d+)` group ends up as the `amount` argument to the function,
and the `(\w+)` group gets bound to `unit`. The function converts
`amount` to a number—which always works, since it matched `\d+`—and
makes some adjustments in case there is only one or zero left.
@!6021ff4fc3830de4af49b3ea5746d087ca5999fd

## Greed
@!fd1399f8c2780d7577eb31bfebb43ce4c1fcf7f5

{{index greed, "regular expression"}}
@!3fd6c0c8e939214604064c4b09b5b04306276929

It is possible to use `replace` to write a function that removes all
((comment))s from a piece of JavaScript ((code)). Here is a first
attempt:
@!592ed97f020049c9a307c76f90bdef4e4b71dbb1

```{test: wrap}
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3"));
// → 1 + 3
console.log(stripComments("x = 10;// ten!"));
// → x = 10;
console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1  1
```
@!cc633f0541f63a1a663abb5620cc55ceede63672

{{index "period character", "slash character", "newline character", "empty set", "block comment", "line comment"}}
@!40f226de741a24e48ca8b56130c1d62aec5055e3

The part before the _or_ operator matches two slash characters
followed by any number of non-newline characters. The part for
multiline comments is more involved. We use `[^]` (any character that
is not in the empty set of characters) as a way to match any
character. We cannot just use a dot here because block comments can
continue on a new line, and dots do not match the newline character.
@!bb772f2759de1bb38407cb013c968f549b665fc6

But the output of the previous example appears to have gone wrong. Why?
@!68b37da39bf8041e1b41b7f52c68cf558a240029

{{index backtracking, greed, "regular expression"}}
@!abead869d9f207911a8e4b21cb45fee90d722c88

The `[^]*` part of the expression, as I described in the section on
backtracking, will first match as much as it can. If that causes the
next part of the pattern to fail, the matcher moves back one character
and tries again from there. In the example, the matcher first tries to
match the whole rest of the string and then moves back from there. It
will find an occurrence of `*/` after going back four characters and
match that. This is not what we wanted—the intention was to match a
single comment, not to go all the way to the end of the code and find
the end of the last block comment.
@!3592b80ce7fe0287df26b0ee35e4f7c6a832a700

Because of this behavior, we say the repetition operators (`+`, `*`,
`?`, and `{}`) are _((greed))y_, meaning they match as much as they
can and backtrack from there. If you put a ((question mark)) after
them (`+?`, `*?`, `??`, `{}?`), they become nongreedy and start by
matching as little as possible, matching more only when the remaining
pattern does not fit the smaller match.
@!5212f60f616b60a5b055f30c4193d2b57ebf3ee0

And that is exactly what we want in this case. By having the star
match the smallest stretch of characters that brings us to a `*/`, we
consume one block comment and nothing more.
@!72a7d234d08aec1410e56553ec1518bbad665b7e

```{test: wrap}
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1 + 1
```
@!d1d820aa7583aed27e71ba690a87dd4354a323cb

A lot of ((bug))s in ((regular expression)) programs can be traced to
unintentionally using a greedy operator where a nongreedy one would
work better. When using a ((repetition)) operator, consider the
nongreedy variant first.
@!d7deddac65056fae89e54297020aeecd4aa0ada3

## Dynamically creating RegExp objects
@!eab4282b14c6dffa2f260ee6d9030ef0e432dedf

{{index ["regular expression", creation], "underscore character", "RegExp constructor"}}
@!def513c7bdfe7c317ad6f1fef6966fc5cc4b951f

There are cases where you might not know the exact ((pattern)) you
need to match against when you are writing your code. Say you want to
look for the user's name in a piece of text and enclose it in
underscore characters to make it stand out. Since you will know the
name only once the program is actually running, you can't use the
slash-based notation.
@!f9a645f7aa12cfef3b4ad792576a405d4013c261

But you can build up a string and use the `RegExp` ((constructor)) on
that. Here's an example:
@!a4c06b9fd4aaef034d4f15db046d8f4cc232c0ac

```
let name = "harry";
let text = "Harry is a suspicious character.";
let regexp = new RegExp("\\b(" + name + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));
// → _Harry_ is a suspicious character.
```
@!e96eeb309b7c79e31b7ce37f8fed1948ce015144

{{index ["regular expression", flags], "backslash character"}}
@!8ee53a288850b8736347146f903279d58741dc8a

When creating the `\b` ((boundary)) markers, we have to use two
backslashes because we are writing them in a normal string, not a
slash-enclosed regular expression. The second argument to the `RegExp`
constructor contains the options for the regular expression—in this
case `"gi"` for global and case-insensitive.
@!fe6c504c979c7e697593e04e29c9fe97d0437255

But what if the name is `"dea+hl[]rd"` because our user is a ((nerd))y
teenager? That would result in a nonsensical regular expression, which
won't actually match the user's name.
@!6d4f3207b05e2a0feaa03672cc239f7c2de7fc34

{{index "backslash character", [escaping, "in regexps"], ["regular expression", escaping]}}
@!705f36659c64798ef497b6804f423dfaadd5097d

To work around this, we can add backslashes before any character that
we don't trust. Adding backslashes before alphabetic characters is a
bad idea because things like `\b` and `\n` have a special meaning. But
escaping everything that's not alphanumeric or ((whitespace)) is safe.
@!bb9d33e8ec6d6cc36ad4209c23a47f907f0b654d

```
let name = "dea+hl[]rd";
let text = "This dea+hl[]rd guy is super annoying.";
let escaped = name.replace(/[^\w\s]/g, "\\$&");
let regexp = new RegExp("\\b(" + escaped + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));
// → This _dea+hl[]rd_ guy is super annoying.
```
@!c63691f2eaa3cc3d6ceb0923645e0e6ed11e2751

## The search method
@!8662190512d76ff1efb16246eb38fea010bad7d5

{{index searching, ["regular expression", methods], "indexOf method", "search method"}}
@!386e450ca2b096f68d124840e9d796683a81b19a

The `indexOf` method on strings cannot be called with a regular
expression. But there is another method, `search`, which does expect a
regular expression. Like `indexOf`, it returns the first index on
which the expression was found, or -1 when it wasn't found.
@!cc00f633b1bacd68cfa7b8e9e679df858fc2bffc

```
console.log("  word".search(/\S/));
// → 2
console.log("    ".search(/\S/));
// → -1
```
@!707d17544b7ec273d45958dc1ac3e60844bb6a4c

Unfortunately, there is no way to indicate that the match should start
at a given offset (like we can with the second argument to `indexOf`),
which would often be useful.
@!b08f70967c79d7dd1a36af6685b81644ba1e315b

## The lastIndex property
@!cb2dc096fe40a6bcd5fa00d2c64eaa9840337a8d

{{index "exec method", "regular expression"}}
@!67b184ece14561831fc4572aa3aa629c3fb36117

The `exec` method similarly does not provide a convenient way to start
searching from a given position in the string. But it does provide an
*in*convenient way.
@!cce60de6a4710246ccd0d2b656df22564220f161

{{index ["regular expression", matching], matching, "source property", "lastIndex property"}}
@!7d13d2ba9429a48b5ee534478095e001f36d1bd9

Regular expression objects have properties. One such property is
`source`, which contains the string that expression was created from.
Another property is `lastIndex`, which controls, in some limited
circumstances, where the next match will start.
@!82c0aad8e6867e1ca90ae9c8ff8f2bdb2c1cb8dd

{{index [interface, design], "exec method", ["regular expression", global]}}
@!ccb63ca12187e4d5f323db51f38c95e4fd9bd60a

Those circumstances are that the regular expression must have the
global (`g`) or sticky (`y`) option enabled, and the match must happen
through the `exec` method. Again, a less confusing solution would have
been to just allow an extra argument to be passed to `exec`, but
confusion is an essential characteristic of JavaScript's regular
expression interface.
@!9d1e4af99441fc6eb43c8358c53890e3eb903a24

```
let pattern = /y/g;
pattern.lastIndex = 3;
let match = pattern.exec("xyzzy");
console.log(match.index);
// → 4
console.log(pattern.lastIndex);
// → 5
```
@!100de708438b4d4f9b6b0e879a7e473eaa8e269e

{{index "side effect", "lastIndex property"}}
@!12be62494724b9ce92b9a1ccc47a2d7fc10995ee

If the match was successful, the call to `exec` automatically updates
the `lastIndex` property to point after the match. If no match was
found, `lastIndex` is set back to zero, which is also the value it has
in a newly constructed regular expression object.
@!395d1b9fd9d3e8f74c3634d06f15193c04bc1612

The difference between the global and the sticky options is that, when
sticky is enabled, the match will only succeed if it starts directly
at `lastIndex`, whereas with global, it will try to search ahead for a
position where a match can start.
@!f40d16442e61566b9d9f894f37918106cb30a639

```
let global = /abc/g;
console.log(global.exec("xyz abc"));
// → ["abc"]
let sticky = /abc/y;
console.log(sticky.exec("xyz abc"));
// → null
```
@!0a82b206ae2ae1fb60c1c4d8a7feb761b0070cf6

{{index bug}}
@!13e41c7f6a99d2af7ef7c2030014ec4cc7172fc7

When using a shared regular expression value for multiple `exec`
calls, these automatic updates to the `lastIndex` property can cause
problems. Your regular expression might be accidentally starting at an
index that was left over from a previous call.
@!93a2c08fe6123b149deaed6af2a94b8370bb1b7c

```
let digit = /\d/g;
console.log(digit.exec("here it is: 1"));
// → ["1"]
console.log(digit.exec("and now: 1"));
// → null
```
@!35be373a0f18193f58fb2d42a333f86281cf4edb

{{index ["regular expression", global], "match method"}}
@!5a0eff6bd49bb9a01043c23f2c91a5dad6a64bc6

Another interesting effect of the global option is that it changes the
way the `match` method on strings works. When called with a global
expression, instead of returning an array similar to that returned by
`exec`, `match` will find _all_ matches of the pattern in the string
and return an array containing the matched strings.
@!5fe144d6eb5ddc626a6b1ed81813006e2ce2936f

```
console.log("Banana".match(/an/g));
// → ["an", "an"]
```
@!06e12afd47d6ba647eb5a3af4bf46368dbbbb5b8

So be cautious with global regular expressions. The cases where they
are necessary—calls to `replace` and places where you want to
explicitly use `lastIndex`—are typically the only places where you
want to use them.
@!82648d24dab9255068b0651717eef484afd00f9c

### Looping over matches
@!cfca242a47eb2829b5eb8feda1e217f9c08206cd

{{index "lastIndex property", "exec method", loop}}
@!3ff7657c7d4987a6ff7bc582b5b97d526acea1b4

A common pattern is to scan through all occurrences of a pattern in a
string, in a way that gives us access to the match object in the loop
body, by using `lastIndex` and `exec`.
@!b921818b03de0eddb3bd61499b76b711f9cc0204

```
let input = "A string with 3 numbers in it... 42 and 88.";
let number = /\b(\d+)\b/g;
let match;
while (match = number.exec(input)) {
  console.log("Found", match[1], "at", match.index);
}
// → Found 3 at 14
//   Found 42 at 33
//   Found 88 at 40
```
@!95af4dab8c1cfd9547b6eed4bbfff481088abbca

{{index "while loop", "= operator"}}
@!ce3403560da99ca63d733cefef27e136c7c1e20f

This makes use of the fact that the value of an ((assignment))
expression (`=`) is the assigned value. So by using `match =
number.exec(input)` as the condition in the `while` statement, we
perform the match at the start of each iteration, save its result in a
((binding)), and stop looping when no more matches are found.
@!0c5dea5679300a650d5d3006d2318729aa64a604

{{id ini}}
@!df96f02e823fe8c2d26f7b372f7bf74bffc25d4e

## Parsing an INI file
@!ae12feecc2302e030b4d97f113a9746f9f5e66af

{{index comment, "file format", "enemies example", "ini file"}}
@!e57c46a11cb29b546738896b0191b909a598f667

To conclude the chapter, we'll look at a problem that calls for
((regular expression))s. Imagine we are writing a program to
automatically harvest information about our enemies from the
((Internet)). (We will not actually write that program here, just the
part that reads the ((configuration)) file. Sorry.) The configuration
file looks like this:
@!388d54246c9b7647629229be6809aec46a4d164d

```{lang: "text/plain"}
searchengine=http://www.google.com/search?q=$1
spitefulness=9.7

; comments are preceded by a semicolon...
; each section concerns an individual enemy
[larry]
fullname=Larry Doe
type=kindergarten bully
website=http://www.geocities.com/CapeCanaveral/11451

[gargamel]
fullname=Gargamel
type=evil sorcerer
outputdir=/home/marijn/enemies/gargamel
```
@!f1559c7b75a05ad713fa5e7e6aa4323a47d8c0cc

{{index grammar}}
@!d696c3214cf4eb22f8f3354a6b00eee39d970538

The exact rules for this format (which is actually a
widely used format, usually called an _INI_ file) are as follows:
@!3bfed74cf1d2a4429d9dc18f8f76269b6855160d

- Blank lines and lines starting with semicolons are ignored.
@!12eb648d02dac26611dd1367530135b6b7219707

- Lines wrapped in `[` and `]` start a new ((section)).
@!8c17905273ef9087f8a43a1c75a60a8bdeada80d

- Lines containing an alphanumeric identifier followed by an `=`
  character add a setting to the current section.
@!1dcebd6a578c0aa6657e3c18abb38a575527f32d

- Anything else is invalid.
@!a890372299ff4f02ae85de3c1a228028a2cfdca4

Our task is to convert a string like this into an array of objects,
each with a `name` property and an array of settings. We'll need one
such object for each section and one for the global settings at the
top.
@!8c20988ea0c649e98adf59df95668f7114307c8b

{{index "carriage return", "line break", "newline character"}}
@!a077966bda39c39a21c2ad32d9513e566313e457

Since the format has to be processed ((line)) by line, splitting up
the file into separate lines is a good start. We used
`string.split("\n")` to do this in [Chapter 6](06_object.html#split).
Some operating systems, however, use not just a newline character to
separate lines but a carriage return character followed by a newline
(`"\r\n"`). Given that the `split` method also allows a regular
expression as its argument, we can split on a regular expression like
`/\r?\n/` to split in a way that allows both `"\n"` and `"\r\n"`
between lines.
@!f2dd47baffefc88d117c52e32d85a6ffaf00cc86

```
function parseINI(string) {
  // Start with an object to hold the top-level fields
  return string.split(/\r?\n/).reduce((sections, line) => {
    if (/^\s*(;.*)?$/.test(line)) return sections;

let match;
    if (match = line.match(/^\[(.*)\]$/)) {
      return [...sections, {title: match[1], fields: []}];
    } else if (match = line.match(/^(\w+)=(.*)$/)) {
      let [_, name, value] = match;
      let {title, fields} = sections[sections.length - 1];
      return [...sections.slice(1),
              {title, fields: [{name, value}, ...fields]}];
    } else {
      throw new Error("Line '" + line + "' is invalid.");
    }
  }, [{title: null, fields: []}]);
}
```
@!372a0285219e046b32b19c84c7712970362dd4c1

{{index "parseINI function", parsing}}
@!0d59bad664f97e92572706c0da386f625b0c2694

The code reduces the file's lines to an array of sections, starting
with a single, untitled section.
@!bc84ea6d23298b00fb8acc9f1c7016ee15722cee

When it finds an empty line or a comment, it ignores it. The
expression `/^\s*(;.*)?$/` recognizes such lines. Do you see how it
works? The part between the ((parentheses)) will match comments, and
the `?` makes sure it also matches lines containing only whitespace.
@!33c98b463c67df01a9abedb6d5fa2a1ab254895f

If the line is not a ((comment)), it may be a section header or a
regular option line. When it is a new section, an appropriate section
object is added to the array. When it is an option, an object
representing that option is added to the current (last) section.
@!8c20d1e5dfb06f5cecc6a0c3e4169e5fafbb75d7

If a ((line)) matches none of these forms, the function throws an
error.
@!0c4b3cff26baaba1cc13b508bd75071bc1c0c3d8

{{index "caret character", "dollar sign", boundary}}
@!389034892ac9043a73b0f1b2a0e28809c7c97222

Note the recurring use of `^` and `$` to make sure the expression
matches the whole line, not just part of it. Leaving these out results
in code that mostly works but behaves strangely for some input, which
can be a difficult bug to track down.
@!b16ac68136a79d291fca46af3f25cbfcf3424d78

{{index "if keyword", assignment, "= operator"}}
@!7e4b2ac9c256c96eadbea4bfed64e287ffad1909

The pattern `if (match = string.match(...))` is similar to the trick
of using an assignment as the condition for `while`. You often aren't
sure that your call to `match` will succeed, so you can access the
resulting object only inside an `if` statement that tests for this. To
not break the pleasant chain of `if` forms, we assign the result of
the match to a binding and immediately use that assignment as the test
in the `if` statement.
@!3fcb0c8a727836dcb14cebae0ecbf2561e7daf57

## International characters
@!284f60547bf22ccd8a6ec60759e916734f09092e

{{index internationalization, Unicode, ["regular expression", internationalization]}}
@!227b6971edaff53b4b1bda6b68d634d2ee90439e

Because of JavaScript's initial simplistic implementation and the fact
that this simplistic approach was later set in stone as ((standard))
behavior, JavaScript's regular expressions are rather dumb about
characters that do not appear in the English language. For example, as
far as JavaScript's regular expressions are concerned, a “((word
character))” is only one of the 26 characters in the Latin alphabet
(uppercase or lowercase) and, for some reason, the underscore
character. Things like _é_ or _β_, which most definitely are word
characters, will not match `\w` (and _will_ match uppercase `\W`, the
nonword category).
@!9fed4591b732adfbbfb5e8a79fae452c12ff9000

{{index whitespace}}
@!b44186537abc5a19b9d5edf66c85e5673878a0e6

By a strange historical accident, `\s` (whitespace) does not have this
problem and matches all characters that the Unicode standard considers
whitespace, including things like the ((nonbreaking space)) and the
((Mongolian vowel separator)).
@!0ba3794ee11330d1640ea5d3366b424ec148541f

Another problem is that, by default, regular expressions work on code
units, as discussed in [Chapter 5](05_higher_order.html#code_units),
not actual characters. This means that characters that are composed of
two code units behave strangely.
@!19e7bc64320743815cc3e72ac70c0644e4e9020b

```
console.log(/🍎{3}/.test("🍎🍎🍎"));
// → false
console.log(/<.>/.test("<😎>"));
// → false
console.log(/<.>/u.test("<😎>"));
// → true
```
@!e54d717f7d45ee7f1954cfd31696da0bc6ee3409

The problem is that the 🍎 in the first line is treated as two code
units, and the `{3}` part is applied only to the second one.
Similarly, the dot matches a single code unit, not the two that the
((emoji)) character is composed of.
@!cf6d309f3e38dc8cfac87ea8e61d9362367c3658

You must add an `u` option (for ((Unicode))) to your regular
expression to make it treat such characters properly. The wrong
behavior remains the default, unfortunately, because changing that
might cause problems for existing code that depends on it.
@!e3156c9b89381a51762a696a2d71072d69bfc3e4

{{index "character category"}}
@!bb87a95fc66c82ea5aa2436d74615b902ac61b13

Some ((regular expression)) ((implementation))s in other programming
languages have syntax to match specific ((Unicode)) character
categories, such as “all uppercase letters”, “all punctuation”, or
“control characters”. There are plans to add support for such
categories to JavaScript in the ((future)), but we're not quite there
yet.
@!1b3e47bbf72d0310667c0380990f049771234baa

{{id summary_regexp}}
@!0e3b5f9254c6a2c1956ed1c2742a5f115b554af0

## Summary
@!b2a0d87b1171f588d0ac2d41fdf1bb414b1068b0

Regular expressions are objects that represent patterns in strings.
They use their own language to express these patterns.
@!70c64d75ef14746e1f42246e24f77e06727920c8

{{table {cols: [1, 5]}}}
@!6a42bf8a50d78cb487ad317a2d8f9fab16886c34

| `/abc/`     | A sequence of characters
| `/[abc]/`   | Any character from a set of characters
| `/[^abc]/`  | Any character _not_ in a set of characters
| `/[0-9]/`   | Any character in a range of characters
| `/x+/`      | One or more occurrences of the pattern `x`
| `/x+?/`     | One or more occurrences, nongreedy
| `/x*/`      | Zero or more occurrences
| `/x?/`      | Zero or one occurrence
| `/x{2,4}/`  | Between two and four occurrences
| `/(abc)/`   | A group
| `/a|b|c/`   | Any one of several patterns
| `/\d/`      | Any digit character
| `/\w/`      | An alphanumeric character (“word character”)
| `/\s/`      | Any whitespace character
| `/./`       | Any character except newlines
| `/\b/`      | A word boundary
| `/^/`       | Start of input
| `/$/`       | End of input
@!70fbda395bdc973eb4a995f25b3b90b17c8ff93e

A regular expression has a method `test` to test whether a given
string matches it. It also has an `exec` method that, when a match is
found, returns an array containing all matched groups. Such an array
has an `index` property that indicates where the match started.
@!42cf3fe1e8fc873993e86620375d73734dcb4ce0

Strings have a `match` method to match them against a regular
expression and a `search` method to search for one, returning only the
starting position of the match. Their `replace` method can replace
matches of a pattern with a replacement string. Alternatively, you can
pass a function to `replace`, which will be used to build up a
replacement string based on the match text and matched groups.
@!626fbf09398979c47366c801a8fb89004fac95cf

Regular expressions can have options, which are written after the
closing slash. The `i` option makes the match case insensitive. The
`g` option makes the expression _global_, which, among other things,
causes the `replace` method to replace all instances instead of just
the first. The `y` option makes it sticky, which means that it will
not search ahead and skip part of the string when looking for a match.
@!6ed471f053ed390ec65e77ae1b1bc62a409e16fb

The `RegExp` constructor can be used to create a regular expression
value from a string.
@!b81a8fd4990b08cc954fc064bed766884cd160fa

Regular expressions are a sharp ((tool)) with an awkward handle. They
simplify some tasks tremendously but can quickly become unmanageable
when applied to complex problems. Part of knowing how to use them is
resisting the urge to try to shoehorn things that they cannot sanely
express into them.
@!80b3d92f9da24e5d156fefc6ce9a9d3503e34c22

## Exercises
@!c6301f46e86c6a55dc6000f716c4324a2b9f651e

{{index debugging, bug}}
@!14d296c7d2cc6d6b91b86dcde1aee06ae8cb1115

It is almost unavoidable that, in the course of working on these
exercises, you will get confused and frustrated by some regular
expression's inexplicable ((behavior)). Sometimes it helps to enter
your expression into an online tool like
[_debuggex.com_](https://www.debuggex.com/) to see whether its
visualization corresponds to what you intended and to ((experiment))
with the way it responds to various input strings.
@!4d8b09c51fc45dadca73ae0bb5531d018ee5711d

### Regexp golf
@!260384531b83edeb30795107448e98f1774da4a7

{{index "program size", "code golf", "regexp golf (exercise)"}}
@!a9f812335ef072695e89980960ecfdf8a4a56f11

_Code
golf_ is a term used for the game of trying to express a particular
program in as few characters as possible. Similarly, _regexp golf_ is
the practice of writing as tiny a regular expression as possible to
match a given pattern, and _only_ that pattern.
@!5e3f4a4510035d43eb4fc157bdb241691f43b88a

{{index boundary, matching}}
@!2e14420c5543519e43756ffdec1bc1ce378d7c4c

For each of the following items, write a ((regular expression)) to
test whether any of the given substrings occur in a string. The
regular expression should match only strings containing one of the
substrings described. Do not worry about word boundaries unless
explicitly mentioned. When your expression works, see whether you can
make it any smaller.
@!d1965d385084406ce4be3fe36260ecc08128ffc6

1. _car_ and _cat_
 2. _pop_ and _prop_
 3. _ferret_, _ferry_, and _ferrari_
 4. Any word ending in _ious_
 5. A whitespace character followed by a dot, comma, colon, or semicolon
 6. A word longer than six letters
 7. A word without the letter _e_
@!90fd4c27b9e692c533299472664ec1574ac01555

Refer to the table in the [chapter
summary](09_regexp.html#summary_regexp) for help. Test each solution
with a few test strings.
@!f8fbe401e3473f58fdc2aa04a201f9f1d4c4e986

{{if interactive
@!8412a343055e55601d35e70127c90f24d7670901

```
// Fill in the regular expressions

verify(/.../,
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/.../,
       ["pop culture", "mad props"],
       ["plop"]);

verify(/.../,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/.../,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/.../,
       ["bad punctuation ."],
       ["escape the dot"]);

verify(/.../,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

verify(/.../,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape"]);

function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes) if (!regexp.test(str)) {
    console.log(`Failure to match '${str}'`);
  }
  for (let str of no) if (regexp.test(str)) {
    console.log(`Unexpected match for '${str}'`);
  }
}
```
@!4887f40fe714f9a084c8a7ff6e636c832d37e38d

if}}
@!3418b027aa3aca9735266546f810b78cf602cb36

### Quoting style
@!67569fe3fa27f38ab77e5d1ae92683b7dc53dd27

{{index "quoting style (exercise)", "single-quote character", "double-quote character"}}
@!2722453236e7db72eb00a9ba74336b784a04340e

Imagine you have written a story and used single ((quotation mark))s
throughout to mark pieces of dialogue. Now you want to replace all the
dialogue quotes with double quotes, while keeping the single quotes
used in contractions like _aren't_.
@!05b444a8e14c691a892ef1f6941e14871f85b865

{{index "replace method"}}
@!300e601457725b9b05f2efb722f2c02f22597046

Think of a pattern that distinguishes these two
kinds of quote usage and craft a call to the `replace` method that
does the proper replacement.
@!383bdff035c7b26e53a32f1643dd654b28cc162c

{{if interactive
@!ae5e8183316deb35a1f0ce529187bbe12b77b98c

```{test: no}
let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/A/g, "B"));
// → "I'm the cook," he said, "it's my job."
```
@!1e81bf643a15c143620e742f309b16a4835b8678

if}}
@!042d2638d05d9afc6e4ab5838e0f4c5ad0f2163f

{{hint
@!af3f6573e9bec55b1007a4ac0e53d64b3f7a5add

{{index "quoting style (exercise)", boundary}}
@!a99d11709cacfbc0b411724d28722452abba80ec

The most obvious solution is to only replace quotes with a nonword
character on at least one side. Something like `/\W'|'\W/`. But you
also have to take the start and end of the line into account.
@!1ef91b8f88b2b7ea7e662e507cb656cf848dd395

{{index grouping, "replace method"}}
@!9cfd1798b753e0581b2956ad8c775a68c0251031

In addition, you must ensure that the replacement also includes the
characters that were matched by the `\W` pattern so that those are not
dropped. This can be done by wrapping them in ((parentheses)) and
including their groups in the replacement string (`$1`, `$2`). Groups
that are not matched will be replaced by nothing.
@!20dba1ffb8452368666eb8dc3a8200d39bfeac77

hint}}
@!2966b2fedcd8955ea6da363efe94a108ea4f9761

### Numbers again
@!94ede4fa906ffbbf49299a591bbf9626e3f04045

{{index number}}
@!5477407aa584322296c484b6e67d92e345e36280

A series of ((digit))s can be matched by the simple regular expression
`/\d+/`.
@!f8f72f32d7423d3ea7f304eaf3f5b17a3ebc899a

{{index sign, "fractional number", syntax, minus, "plus character", exponent, "scientific notation", "period character"}}
@!b33e63ad46803203a286471322ae6d9418e29c92

Write an expression that matches only JavaScript-style numbers. It
must support an optional minus _or_ plus sign in front of the number,
the decimal dot, and exponent notation—`5e-3` or _1E10_— again with an
optional sign in front of the exponent. Also note that it is not
necessary for there to be digits in front of or after the dot, but the
number cannot be a dot alone. That is, `.5` and `5.` are valid
JavaScript numbers, but a lone dot _isn't_.
@!7ca5058607c771f6a04f814d652d290865469373

{{if interactive
@!817770862a017273cd2c938040532116ed50f59c

```{test: no}
// Fill in this regular expression.
let number = /^...$/;

// Tests:
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
                 "1.3e2", "1E-4", "1e+12"]) {
  if (!number.test(s)) {
    console.log("Failed to match '" + s + "'");
  }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
                 ".5.", "1f5", "."]) {
  if (number.test(s)) {
    console.log("Incorrectly accepted '" + s + "'");
  }
}
```
@!a5b107dacd7726bd1c4eaf1b6814592c2dd5c04a

if}}
@!d79b6d089c29645b51cf2571c6da911b2f7db299

{{hint
@!64670c11a37475dea186c00922fa01876ccf468c

{{index ["regular expression", escaping], "backslash character"}}
@!69b174763b60990616a8ba14e0b5e5760bfd6dbb

First, do not forget the backslash in front of the dot.
@!f42d31b626160b048134c01ea702eaf0000920b6

Matching the optional ((sign)) in front of the ((number)), as well as
in front of the ((exponent)), can be done with `[+\-]?` or `(\+|-|)`
(plus, minus, or nothing).
@!d8aef873dabb9f6d09fcc7325ce3c15becbd8aab

{{index "pipe character"}}
@!58f445ad4978f2dfaedea0207eb3fef125f84193

The more complicated part of the exercise is the problem of matching
both `"5."` and `".5"` without also matching `"."`. For this, a good
solution is to use the `|` operator to separate the two cases—either
one or more digits optionally followed by a dot and zero or more
digits _or_ a dot followed by one or more digits.
@!6fa9056471c32e009e17f6a10ba12509babb8adf

{{index exponent, "case sensitivity", ["regular expression", flags]}}
@!33c8dff241174e41ce68876763e02f3a85388c63

Finally, to make the _e_ case-insensitive, either add an `i` option to
the regular expression or use `[eE]`.
@!67ffa4c9212f211f0d5ed29fd92ecefa1e70d270

hint}}
@!6510a1debb32e5f90aaf0f247086488ae4d2769b