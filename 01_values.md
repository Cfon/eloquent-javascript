{{meta {chap_num: 1, prev_link: 00_intro, next_link: 02_program_structure, docid: values}}}
@!2b2117042500ecb9a69d3670a9b9349426864603

# Values, Types, and Operators
@!881947f146450e0bd5ddc12c8440a8e10ab70dd5

{{quote {author: "Master Yuan-Ma", title: "The Book of Programming", chapter: true}
@!b0f1d9d6b6813497f7f8cc2a03c822b818cdc601

Below the surface of the machine, the program moves. Without effort,
it expands and contracts. In great harmony, electrons scatter and
regroup. The forms on the monitor are but ripples on the water. The
essence stays invisibly below.
@!a485f1c7363a845812fad2a7a0d597fe5533fb34

quote}}
@!442a4f597447c60330b1dced8652117d7427f8d2

{{index "Yuan-Ma", "Book of Programming", "binary data", data, bit, memory}}
@!08ff97aa5d8781d7567b0807b6decc370cc7ac2c

Inside the computer's world, there is only data. You can read data,
modify data, create new data—but anything that isn't data can not be
talked about. All this data is stored as long sequences of bits and is
thus fundamentally alike.
@!3d650ea04cb5491a2c8461f7f9d2545860e1e78b

{{index CD, signal}}
@!f0a1ac6b142cf56499350501f326c16de07d16e6

Bits are any kind of two-valued things, usually described as zeros and
ones. Inside the computer, they take forms such as a high or low
electrical charge, a strong or weak signal, or a shiny or dull spot on
the surface of a CD. Any piece of discrete information can be reduced
to a sequence of zeros and ones and thus represented in bits.
@!0f8a9ed06835248cabab087de51e8be94b1278e4

{{index "binary number", radix, "decimal number"}}
@!1e46b3d43b731388af9c5ed002df0b60dd17c1e1

For example, think about how you might show the number 13 in bits. It
works the same way you write decimal numbers, but instead of 10
different ((digit))s, you have only 2, and the weight of each
increases by a factor of 2 from right to left. Here are the bits that
make up the number 13, with the weights of the digits shown below
them:
@!8c66fd41d10b36ce9201e8ed13b708b340b53a06

```{lang: null}
   0   0   0   0   1   1   0   1
 128  64  32  16   8   4   2   1
```
@!7c1402ac04c8215d2a3d58a38242b32ae2aecfe5

So that's the binary number 00001101, or 8 + 4 + 1, which equals 13.
@!e0e2b1c034fba9f755791b225363b5b8291c1729

## Values
@!887d9fc8064d28e27e93a490526b56bddd5df383

{{index memory, "volatile data storage", "hard drive"}}
@!325d0c9f67690ba987c9dc462731ed6c9b02894d

Imagine a sea of bits. An ocean of them. A typical modern computer has
more than 30 billion bits in its volatile data storage. Nonvolatile
storage (the hard disk or equivalent) tends to have yet a few orders
of magnitude more.
@!46bf4fa9aaffbf2164de5b02e624b0b11f166018

To be able to work with such quantities of bits without getting lost,
you can separate them into chunks that represent pieces of
information. In a JavaScript environment, those chunks are called
_((value))s_. Though all values are made of bits, they play different
roles. Every value has a ((type)) that determines its role. Some
values are numbers, some values are pieces of text, some values are
functions, and so on.
@!2cb456b7ababb036b35cc18f1e3265e4e2fb99fd

{{index "garbage collection"}}
@!eccaae4b18c155d345450f91f45d50345c806770

To create a value, you must merely invoke its name. This is
convenient. You don't have to gather building material for your values
or pay for them. You just call for one, and _woosh_, you have it. They
are not really created from thin air, of course. Every value has to be
stored somewhere, and if you want to use a gigantic amount of them at
the same time, you might run out of memory. Fortunately, this is a
problem only if you need them all simultaneously. As soon as you no
longer use a value, it will dissipate, leaving behind its bits to be
recycled as building material for the next generation of values.
@!45db0bc5e590a7ad7e6beefc958cf0c95b0b2eaa

This chapter introduces the atomic elements of JavaScript programs,
that is, the simple value types and the operators that can act on such
values.
@!e3f9c2a3e1594b6363ed94385dc54e870483156d

## Numbers
@!f8c6d0177c49bd800decd91ad449037fe57342fd

{{index syntax, number, [number, notation]}}
@!120d80815446fc7ca608faaf2bc6da79a8f3640d

Values of the _number_ type are, unsurprisingly, numeric values. In a
JavaScript program, they are written as follows:
@!8edff719f142bd242cb8392bd2fed23be5905c8a

```
13
```
@!2d5496e8bf2eeb64ee32c7f9551ba59c1e289b90

{{index "binary number"}}
@!4b4bab3ca2938cbf2cfe7b4a7df2b8ee99b7e2b2

Use that in a program, and it will cause the bit pattern for the
number 13 to come into existence inside the computer's memory.
@!e23b6ead979ae3123a047b0821e981e7eb12b0e6

{{index [number, representation], bit}}
@!b7a19630bb98cc0c394d7514f2875a5d3ba3afb4

JavaScript uses a fixed number of bits, namely 64 of them, to store a
single number value. There are only so many patterns you can make with
64 bits, which means that the amount of different numbers that can be
represented is limited. For _N_ decimal ((digit))s, the amount of
numbers that can be represented is 10^_N_^. Similarly, given 64 binary
digits, you can represent 2^64^ different numbers, which is about 18
quintillion (an 18 with 18 zeros after it). This is a lot.
@!dc97fd1fc4a3e4b7f9ae4fa1855becb777beb72f

Computer memory used to be a lot smaller, and people tended to use
groups of 8 or 16 bits to represent their numbers. It was easy to
accidentally _((overflow))_ such small numbers—to end up with a number
that did not fit into the given amount of bits. Today, even personal
computers have plenty of memory, so you are free to use 64-bit chunks,
which means you need to worry about overflow only when dealing with
truly astronomical numbers.
@!32d54f931e1d7c6001069f59210e37b76a6d5200

{{index sign, "floating-point number", "fractional number", "sign bit"}}
@!00136590cc20ffec02eb8bfb056fb05f0a2dc5a2

Not all whole numbers below 18 quintillion fit in a JavaScript number,
though. Those bits also store negative numbers, so one bit indicates
the sign of the number. A bigger issue is that nonwhole numbers must
also be represented. To do this, some of the bits are used to store
the position of the decimal point. The actual maximum whole number
that can be stored is more in the range of 9 quadrillion (15 zeros),
which is still pleasantly huge.
@!b0470d06482d5b62665163a8fb9d77d0232b7df1

{{index [number, notation]}}
@!86758fded43ef0e0746109b481d088a8f44f34c3

Fractional numbers are written by using a dot.
@!41c57223e2828ed9893a778d2af7ca3abdfcb738

```
9.81
```
@!f7271608f9e51f73e9ae04274db0fed8ae6e3b7c

{{index exponent, "scientific notation", [number, notation]}}
@!98b653910b2686ff235736400c5ad5aee93f6235

For very big or very small numbers, you may also use scientific
notation by adding an “e” (for “exponent”), followed by the exponent
of the number:
@!2b000c893f660b88131b6e1ccbfbc9c8ca81942b

```
2.998e8
```
@!8616480bf6f68a44ccb5681b629d39a850354342

That is 2.998 × 10^8^ = 299,800,000.
@!3d6c1dbe8e322c8f2c94fee9966844492773c96c

{{index pi, [number, "precision of"], "floating-point number"}}
@!43d02242303929f6b4943c9ed99b02dc74ed3110

Calculations with whole numbers (also called _((integer))s_) smaller
than the aforementioned 9 quadrillion are guaranteed to always be
precise. Unfortunately, calculations with fractional numbers are
generally not. Just as π (pi) cannot be precisely expressed by a
finite number of decimal digits, many numbers lose some precision when
only 64 bits are available to store them. This is a shame, but it
causes practical problems only in specific situations. The important
thing is to be aware of it and treat fractional digital numbers as
approximations, not as precise values.
@!c85ad9de27107368a0c9cc76f50bce10ee8b205d

### Arithmetic
@!90f54332715f90446a5a664422d8680543ebbe86

{{index syntax, operator, "binary operator", arithmetic, addition, multiplication}}
@!edf179d9254127aa7f86658b3fc0bd452b004184

The main thing to do with numbers is arithmetic. Arithmetic operations
such as addition or multiplication take two number values and produce
a new number from them. Here is what they look like in JavaScript:
@!63e7e90d3114440427cdced66eedae2e8d5cae58

```
100 + 4 * 11
```
@!39774bf96c9d79227267305d4405bda3281d1cef

{{index [operator, application], asterisk, "plus character", "* operator", "+ operator"}}
@!3fd01f7b533895eaf906eeeda45db861699e0bb2

The `+` and `*` symbols are called _operators_. The first stands for
addition, and the second stands for multiplication. Putting an
operator between two values will apply it to those values and produce
a new value.
@!744a7741209597485c91af84d6d525de810dc603

{{index grouping, parentheses, precedence}}
@!b3ff04db51786f05638676e427224ffaec98ac5a

Does the example mean “add 4 and 100, and multiply the result by 11”,
or is the multiplication done before the adding? As you might have
guessed, the multiplication happens first. But as in mathematics, you
can change this by wrapping the addition in parentheses.
@!51a2cda0cde946d455f04ca594dabc767fbe6b2e

```
(100 + 4) * 11
```
@!557caf44bc5317ba0047acc56e4e079f26f87809

{{index "dash character", "slash character", division, subtraction, minus, "- operator", "/ operator"}}
@!061fa98fbb7c0035f8d16f86846f66444241bfdf

For subtraction, there is the `-` operator, and division can be done
with the `/` operator.
@!3542989547ee0717c95f87496859cd29f1fc7d85

When operators appear together without parentheses, the order in which
they are applied is determined by the _((precedence))_ of the
operators. The example shows that multiplication comes before
addition. The `/` operator has the same precedence as `*`. Likewise
for `+` and `-`. When multiple operators with the same precedence
appear next to each other, as in `1 - 2 + 1`, they are applied left to
right: `(1 - 2) + 1`.
@!50cf9d762c475b22a7a0eb7712322635805f29c2

These rules of precedence are not something you should worry about.
When in doubt, just add parentheses.
@!350c0fcd77d4398ea2d8a506630a911ec49b9c4e

{{index "modulo operator", division, "remainder operator", "% operator"}}
@!f7d63fba522379f6f42906203001e88492f11af7

There is one more arithmetic operator, which you might not immediately
recognize. The `%` symbol is used to represent the _remainder_
operation. `X % Y` is the remainder of dividing `X` by `Y`. For
example, `314 % 100` produces `14`, and `144 % 12` gives `0`.
Remainder's precedence is the same as that of multiplication and
division. You'll also often see this operator referred to as _modulo_.
@!bbee5703879730c7c64406273c72dd110958bc63

### Special numbers
@!e6ea97f2f4d29fe3cc1430aa4b1cdd522087ad27

{{index [number, "special values"]}}
@!486a5bceab090c8a60352dbdcaafcd111db41243

There are three special values in JavaScript that are considered
numbers but don't behave like normal numbers.
@!870434c9a7268cad31f1d5ee8633644e2ba00643

{{index infinity}}
@!049a79bcf203d7fbdb53ac9c2b4884533e213d57

The first two are `Infinity` and `-Infinity`, which represent the
positive and negative infinities. `Infinity - 1` is still `Infinity`,
and so on. Don't put too much trust in infinity-based computation,
though. It isn't mathematically sound, and it will quickly lead to our
next special number: `NaN`.
@!0af258c2ee335581056fd7624edef633e3a8e440

{{index NaN, "not a number", "division by zero"}}
@!42435b163888024058d19305bc6d8922c65a49e6

`NaN` stands for “not a number”, even though it _is_ a value of the
number type. You'll get this result when you, for example, try to
calculate `0 / 0` (zero divided by zero), `Infinity - Infinity`, or
any number of other numeric operations that don't yield a precise,
meaningful result.
@!82bffab72a7e283074b611e7c7b9a98a04b00759

## Strings
@!2f6d5513ba2fea9484375b8d12ef015a43cbb8eb

{{indexsee "grave accent", backtick}}
@!fbdecbe797c9618ca8852b54fdd48a368f39302d

{{index syntax, text, character, [string, notation], "single-quote character", "double-quote character", "quotation mark", backtick}}
@!b76a02fef6a40de2da6d021c9712cb18e1dfbc4e

The next basic data type is the _((string))_. Strings are used to
represent text. They are written by enclosing their content in quotes.
@!46e719e950cb425046d9fa108d7dd7eba1b5d725

```
`Down on the sea`
"Lie on the ocean"
'Float on the ocean'
```
@!a2898177f3e0268160152b8487948f29cd52d533

You can use single quotes, double quotes, or backticks to mark
strings, as long as the quotes at the start and the end of the string
match.
@!b43f2dec8ed7f48ac863c39d5531df11158efa43

{{index "line break", "newline character"}}
@!a12dde5aa9b1536a6a0967090a64829841b28ea9

Almost anything can be put between quotes, and JavaScript will make a
string value out of it. But a few characters are more difficult. You
can imagine how putting quotes between quotes might be hard.
_Newlines_ (the characters you get when you press Enter) may only be
included when the string is quoted with backtick (`` ` ``), the other
types of strings have to stay on a single line.
@!897a23ddaa459e034227b0ede503af13a10c2b0e

{{index [escaping, "in strings"], "backslash character"}}
@!6555a750c4799c4d6ac92b3229561128d9b3360d

To make it possible to include such characters in a string, the
following notation is used: whenever a backslash (`\`) is found inside
quoted text, it indicates that the character after it has a special
meaning. This is called _escaping_ the character. A quote that is
preceded by a backslash will not end the string but be part of it.
When an `n` character occurs after a backslash, it is interpreted as a
newline. Similarly, a `t` after a backslash means a ((tab character)).
Take the following string:
@!e91f889bb2b1ed217881582b5e4eb0300ac44f21

```
"This is the first line\nAnd this is the second"
```
@!6bb161529d45f5407055df22bbf8b2e4ac785a46

The actual text contained is this:
@!633e8c7c92190f9ec3c3651ac134371632f84636

```{lang: null}
This is the first line
And this is the second
```
@!6ca3da6f20a4e0d6b1147b7418564e0beb153cf7

There are, of course, situations where you want a backslash in a
string to be just a backslash, not a special code. If two backslashes
follow each other, they will collapse together, and only one will be
left in the resulting string value. This is how the string “_A newline
character is written like "\n"._” can be expressed:
@!5af6f2447818f00350570d97c0ddcef3b7e7acdc

```
"A newline character is written like \"\\n\"."
```
@!db461c412fbe86ddda884355f69a303ea1f3ace9

{{id unicode}}
@!710db591f44d98c9f48eec7ee435ced5bd02a72e

{{index [string, representation], Unicode, character}}
@!e40c2c9614777e5f95ba90474835eeecb221f79c

Strings, too, have to be modeled as a series of bits to be able to
exist inside the computer. The way JavaScript does this is based on
the _((Unicode))_ standard. This standard assigns a number to
virtually every character you would ever need, including characters
from Greek, Arabic, Japanese, Armenian, and so on. If we have a number
for every character, a string can be described by a sequence of
numbers.
@!c780053b793a9b4341363fb5198a18cf4420c250

{{index "UTF-16", emoji}}
@!60717f0cd10d7c49a6cf403445067021c4b931b7

And that's what JavaScript does. But there's a gotcha, namely that
JavaScript's representation uses 16 bits per number, and there are
more than 2^16^ different characters in Unicode (about twice as many,
at this point). So some characters, such as many emoji, take up two
“characters” in JavaScript strings.
@!89f38f2fd3372c854ea753ce25a3d5553a8c8e13

{{index "+ operator", concatenation}}
@!3a875cb94baf650c0e4ec4d3b63305e3816d7960

Strings cannot be divided, multiplied, or subtracted, but the `+`
operator _can_ be used on them. It does not add, but it
_concatenates_—it glues two strings together. The following line will
produce the string `"concatenate"`:
@!24db207c5883e21a87eefe86400464d3cb1c98a0

```
"con" + "cat" + "e" + "nate"
```
@!ca97e0e94c6793a065929873f1a8ded5eac5a166

Strings also have a number of associated functions (_methods_) which
we will come back to in [Chapter 4](04_data.html#methods).
@!3eee7cae5b1ffea2da11df17bcd9b0005bc3f8de

{{{index interpolation, backtick}}}
@!6e167a81494883ac1ebb174c99b0c3737f706383

Strings written with single or double quotes behave very much the
same—the only difference is in which type of quote you need to escape
in side of them. Backtick-quoted strings, usually called _((template
literals))_, can do a few more tricks. Apart from being able to span
lines, they can also embed other values.
@!1521d96955e6d9ca072860eaa5ac7ac0e4f40e04

```
`half of 100 is ${100 / 2}`
```
@!3757aa1151d0cec51e78343e2e5d597bc55ba146

When you write something inside `${}` in a template literal, its
result will be computed, converted to a string, and included at that
position. The example produces "half of 100 is 50".
@!e1c002e3a265902ca6ee4d6581a07e70c639649c

## Unary operators
@!e2dad09c5b02512647d9f9ab4a851ddac22b5951

{{index operator, "typeof operator", type}}
@!26909e2a5a5f0fc6ba18526ef7770440ac6f6838

Not all operators are symbols. Some are written as words. One example
is the `typeof` operator, which produces a string value naming the
type of the value you give it.
@!597bb43031d4da5c5e48626f511629214b9e9c49

```
console.log(typeof 4.5)
// → number
console.log(typeof "x")
// → string
```
@!5054381cefc3d273db6dc949fd2a9b89fcf3c39f

{{index "console.log", output, "JavaScript console"}}
@!80ed46055d9d549ce4f0e08c6edee6a30117dd9d

{{id "console.log"}}
@!ec3fa96bf6dc70ad6a9ce51ff05a22ae71b631d6

We will use `console.log` in example code to indicate that we want to
see the result of evaluating something. More about that in the [next
chapter](02_program_structure.html).
@!6dd8ab6392b273de9f2cedfb792eef8fd1e82047

{{index negation, "- operator", "binary operator", "unary operator"}}
@!1c30c910e60333a74e9380b504e74bcaabf3fc62

The other operators we saw all operated on two values, but `typeof`
takes only one. Operators that use two values are called _binary_
operators, while those that take one are called _unary_ operators. The
minus operator can be used both as a binary operator and as a unary
operator.
@!8af312bba562cddba17170f658557b2835600680

```
console.log(- (10 - 2))
// → -8
```
@!a1d508a267ae080eab4e7bdd364c6887dc323652

## Boolean values
@!d1077b6cb22e94d3d2993d1133d4d38f48c2c62e

{{index Boolean, operator, true, false, bit}}
@!77c58fded6d80f403a3179051ccf1916b05aad87

Often, you will need a value that simply distinguishes between two
possibilities, like “yes” and “no” or “on” and “off”. For this,
JavaScript has a _Boolean_ type, which has just two values: true and
false (which are written simply as those words).
@!ed4f32ec1d3149c3e28af6045fbaff2a983d689e

### Comparison
@!3e5c466f4166122a311832b447b845b7b7fa7070

{{index comparison}}
@!0185586207bc1f0452cdd9e5ac11136d5d5c9f21

Here is one way to produce Boolean values:
@!321f02eb6440992fb69c4b3182cfaca214aef888

```
console.log(3 > 2)
// → true
console.log(3 < 2)
// → false
```
@!27cba42ca225bb49621cd70b1977db554d249f9d

{{index [comparison, "of numbers"], "> operator", "< operator", "greater than", "less than"}}
@!233052486abc1a888fa873b1ab394b0e71e20d35

The `>` and `<` signs are the traditional symbols for “is greater
than” and “is less than”, respectively. They are binary operators.
Applying them results in a Boolean value that indicates whether they
hold true in this case.
@!ab70c40a629f135771e55bc3eb5ddfc1d77bfc3a

Strings can be compared in the same way.
@!f14ec3f64b64e35eb5fb09a094e1cc6f68389296

```
console.log("Aardvark" < "Zoroaster")
// → true
```
@!73c610da7da43f5b0efa8ee1e11e3aa0b3dd2915

{{index [comparison, "of strings"]}}
@!bf015d0b9335e1138fdbc0733155d0372f148546

The way strings are ordered is more or less alphabetic: uppercase
letters are always “less” than lowercase ones, so `"Z" < "a"` is true,
and non-alphabetic characters (!, -, and so on) are also included in
the ordering. When comparing strings, JavaScript goes over the
characters from left to right, comparing the ((Unicode)) codes of the
characters one by one.
@!12fe4c1839d649b72ab5124d96e7d7a1b98f1109

{{index equality, ">= operator", "<= operator", "== operator", "!= operator"}}
@!1426d155a51ba7e1434dc28f9bdbddfe5f0c9973

Other similar operators are `>=` (greater than or equal to), `<=`
(less than or equal to), `==` (equal to), and `!=` (not equal to).
@!63ae8b3cef210638202f1552efd72a6da691106c

```
console.log("Itchy" != "Scratchy")
// → true
console.log("Apple" == "Orange")
// → false
```
@!3a5cefe576bc73dabbb220befe07772fdac79fb3

{{index [comparison, "of NaN"], NaN}}
@!bd0802b89c0ac538291f7cd8a1e9f2ca64483b80

There is only one value in JavaScript that is not equal to itself, and
that is `NaN`, which stands for “not a number”.
@!17171e8653be577fe60470f5840d53cfe5fbf83e

```
console.log(NaN == NaN)
// → false
```
@!3b539f27999207c44521e8b59ab843d4cd33d711

`NaN` is supposed to denote the result of a nonsensical computation,
and as such, it isn't equal to the result of any _other_ nonsensical
computations.
@!f2c100356ed70ff043c2310a86c2ae1a252e1790

### Logical operators
@!8e949174d4dcaa14a92affd50b0d3a8aa9fa5890

{{index reasoning, "logical operators"}}
@!e3234138a4fc7f146678b3ce5827853682fe6065

There are also some operations that can be applied to Boolean values
themselves. JavaScript supports three logical operators: _and_, _or_,
and _not_. These can be used to “reason” about Booleans.
@!b610bcfed5743814ac2bd1d24a5cdb17c1e1362a

{{index "&& operator", "logical and"}}
@!16e7aa826f8eb601e90e0b31c0f77496fafcc25f

The `&&` operator represents logical _and_. It is a binary operator,
and its result is true only if both the values given to it are true.
@!4d9187fa485af90ac31b7bb73cc9ebfd4644a292

```
console.log(true && false)
// → false
console.log(true && true)
// → true
```
@!6b78bc901f7faa0b8b21305b2ca75f3076885274

{{index "|| operator", "logical or"}}
@!1ab030b16cfb949e9b0b6d68a640ec064ca83dc7

The `||` operator denotes logical _or_. It produces true if either of
the values given to it is true.
@!77c97dab6af22ee4e2e2858ea0e4055d653e4b6d

```
console.log(false || true)
// → true
console.log(false || false)
// → false
```
@!ea6f2f2142a924740bcb829b5083c67b9caa861c

{{index negation, "! operator"}}
@!4565e4dd059fcd7e76212a506bd8bad4f51bb0dd

_Not_ is written as an exclamation mark (`!`). It is a unary operator
that flips the value given to it—`!true` produces `false` and `!false`
gives `true`.
@!a6f3df4a0b40cac6d21c0d3514c66bd39c460bf1

{{index precedence}}
@!6631b6a9ad3c5baa483a9e4e9c2d404cc68b39f4

When mixing these Boolean operators with arithmetic and other
operators, it is not always obvious when parentheses are needed. In
practice, you can usually get by with knowing that of the operators we
have seen so far, `||` has the lowest precedence, then comes `&&`,
then the comparison operators (`>`, `==`, and so on), and then the
rest. This order has been chosen such that, in typical expressions
like the following one, as few parentheses as possible are necessary:
@!ca8bc9b8da80b9c5f26150d48260f6a5762ee931

```
1 + 1 == 2 && 10 * 10 > 50
```
@!1a7f2937edebadb6728837eaf764259a17f0a958

{{index "conditional execution", "ternary operator", "?: operator", "conditional operator", "colon character", "question mark"}}
@!f6c7731de72d161681cf1597e3e4dd730aea4d1a

The last logical operator I will discuss is not unary, not binary, but
_ternary_, operating on three values. It is written with a question
mark and a colon, like this:
@!fadc7f36338d527d31063dccfc86bdf735e1cebd

```
console.log(true ? 1 : 2);
// → 1
console.log(false ? 1 : 2);
// → 2
```
@!b1101ef2e9904a553edaa0e4ac729afdd1441276

This one is called the _conditional_ operator (or sometimes just
_ternary_ operator since it is the only such operator in the
language). The value on the left of the question mark “picks” which of
the other two values will come out. When it is true, it chooses the
middle value, and when it is false, the value on the right.
@!96bf5cb7f8f547a1cde3eec573d08bdbbfc4db1a

## Undefined values
@!6b19081a62aa99706dcf8e2ead4a1fcbcad3d152

{{index undefined, null}}
@!8d44b6095b805c93d50f781b2e805dfdec04a759

There are two special values, written `null` and `undefined`, that are
used to denote the absence of a meaningful value. They are themselves
values, but they carry no information.
@!6060c76d269a1c805d5286f0264ded1d095434de

Many operations in the language that don't produce a meaningful value
(you'll see some later) yield `undefined` simply because they have to
yield _some_ value.
@!d8a08200a7d4b983d412617dc1c6b0f0294b8f79

The difference in meaning between `undefined` and `null` is an accident
of JavaScript's design, and it doesn't matter most of the time. In the cases
where you actually have to concern yourself with these values, I
recommend treating them as mostly interchangeable.
@!23c5c2636ded6faffb375598aa73671d8ee71417

## Automatic type conversion
@!f3863e6126f22b9168f1012760d0f99aacbc064b

{{index NaN, "type coercion"}}
@!4c570f9ec893b27f3a2a4a350a05f136c0b6a618

In the introduction, I mentioned that JavaScript goes out of its way
to accept almost any program you give it, even programs that do odd
things. This is nicely demonstrated by the following expressions:
@!32b45a18a92e6bcb4df6fdbddd3533788211b617

```
console.log(8 * null)
// → 0
console.log("5" - 1)
// → 4
console.log("5" + 1)
// → 51
console.log("five" * 2)
// → NaN
console.log(false == 0)
// → true
```
@!7921dabd361140023d68db4c939abb3f389aac96

{{index "+ operator", arithmetic, "* operator", "- operator"}}
@!9d3262d9e23edfcb619d7be5da6bb1c15075de53

When an operator is applied to the “wrong” type of value, JavaScript
will quietly convert that value to the type it needs, using a set of
rules that often aren't what you want or expect. This is called
_((type coercion))_. The `null` in the first expression becomes `0`,
and the `"5"` in the second expression becomes `5` (from string to
number). Yet in the third expression, `+` tries string concatenation
before numeric addition, so the `1` is converted to `"1"` (from number
to string).
@!21c246fb22e8fe119aafaaa7ab334084f488836c

{{index "type coercion", [number, "conversion to"]}}
@!575d9cd29d94ae7852846c55203c1b26e2b49334

When something that doesn't map to a number in an obvious way (such as
`"five"` or `undefined`) is converted to a number, the value `NaN` is
produced. Further arithmetic operations on `NaN` keep producing `NaN`,
so if you find yourself getting one of those in an unexpected place,
look for accidental type conversions.
@!a55df19331c309f53dc0702f2d2c7ff5dfdf292c

{{index null, undefined, [comparison, "of undefined values"], "== operator"}}
@!07c433790a01bc824b41c48ba260e661721b9c52

When comparing values of the same type using `==`, the outcome is easy
to predict: you should get true when both values are the same, except
in the case of `NaN`. But when the types differ, JavaScript uses a
complicated and confusing set of rules to determine what to do. In
most cases, it just tries to convert one of the values to the other
value's type. However, when `null` or `undefined` occurs on either
side of the operator, it produces true only if both sides are one of
`null` or `undefined`.
@!c9d4571c2bb3c608112b44c886ace17545817f2e

```
console.log(null == undefined);
// → true
console.log(null == 0);
// → false
```
@!9c6a7c9c5c306d9ac30f8781be64315e8f5b756d

That last piece of behavior is often useful. When you want to test
whether a value has a real value instead of `null` or `undefined`, you
can simply compare it to `null` with the `==` (or `!=`) operator.
@!20fc604ab2ef5d7a041d213b59691807002aea4c

{{index "type coercion", [Boolean, "conversion to"], "=== operator", "!== operator", comparison}}
@!378bc46584b0a9a0696670a87ca91e5410ad2c69

But what if you want to test whether something refers to the precise
value `false`? The rules for converting strings and numbers to Boolean
values state that `0`, `NaN`, and the empty string (`""`) count as
`false`, while all the other values count as `true`. Because of this,
expressions like `0 == false` and `"" == false` are also true. For
cases like this, where you do _not_ want any automatic type
conversions to happen, there are two extra operators: `===` and `!==`.
The first tests whether a value is precisely equal to the other, and
the second tests whether it is not precisely equal. So `"" === false`
is false as expected.
@!ed5f2ee647ce6d8612a1a617b892db7e8b064501

I recommend using the three-character comparison operators defensively to
prevent unexpected type conversions from tripping you up. But when you're
certain the types on both sides will be the same, there is no problem with
using the shorter operators.
@!6da729f43032911030565497de55c0bee7189da5

### Short-circuiting of logical operators
@!cc56740ab61ee3470cb0e16e37f105f6566715f2

{{index "type coercion", [Boolean, "conversion to"], operator}}
@!0c7d25ef89ea39374b90a85ac552f52312157726

The logical operators `&&` and `||` handle values of different types
in a peculiar way. They will convert the value on their left side to
Boolean type in order to decide what to do, but depending on the
operator and the result of that conversion, they return either the
_original_ left-hand value or the right-hand value.
@!f0ccc3ac93a9277e99ca044395ec17dfc20758d8

{{index "|| operator"}}
@!0a8cc0a63b7fc57286480198c5f61f1f4943f140

The `||` operator, for example, will return the value to its left when
that can be converted to true and will return the value on its right
otherwise. This has the expected effect when the values are Boolean,
and does something analogous for values of other types.
@!a4a61944891a3ffcc6a006e546db0e71a12c6786

```
console.log(null || "user")
// → user
console.log("Karl" || "user")
// → Karl
```
@!17d24e2ada31501644e6573b5194e30e0f2978e4

{{index "default value"}}
@!88550497d7477efa6f01241ef059da3d668ae882

We can use this functionality as a way to fall back on a default
value. If you have a value that might be empty, you can put `||` after
it with a replacement value. If the initial value can be converted to
false, you'll get the replacement instead.
@!8c8c1d0c54211b727de627e581f57b06d701a038

{{index "&& operator"}}
@!3bff54dfbf9caf095915608068c932a6582fe548

The `&&` operator works similarly, but the other way around. When the
value to its left is something that converts to false, it returns that
value, and otherwise it returns the value on its right.
@!18016cb7c03a8ebfc361bb3f4ea07f964e8885a0

Another important property of these two operators is that the part to
their right is evaluated only when necessary. In the case of `true ||
X`, no matter what `X` is—even if it's a piece of program that does
something _terrible_—the result will be true, and `X` is never
evaluated. The same goes for `false && X`, which is false and will
ignore `X`. This is called _((short-circuit evaluation))_.
@!54414cb32e4b8667302ed59528c664e7c626de7c

{{index "ternary operator", "?: operator", "conditional operator"}}
@!e0974a9872c753f7e8c96cad2ef6f3d0f99309c7

The conditional operator works in a similar way. Of the second and
third value, only the one that is selected is evaluated.
@!fce76d82178eb8c6efb134f7b77791fd1afe54db

## Summary
@!0bd82322e79b30df56878e8abd1d2961f3feafe2

We looked at four types of JavaScript values in this chapter: numbers,
strings, Booleans, and undefined values.
@!19b427da0a53d7bf7daf593f8992963384993351

Such values are created by typing in their name (`true`, `null`) or
value (`13`, `"abc"`). You can combine and transform values with
operators. We saw binary operators for arithmetic (`+`, `-`, `*`, `/`,
and `%`), string concatenation (`+`), comparison (`==`, `!=`, `===`,
`!==`, `<`, `>`, `<=`, `>=`), and logic (`&&`, `||`), as well as
several unary operators (`-` to negate a number, `!` to negate
logically, and `typeof` to find a value's type) and a ternary operator
(`?:`) to pick one of two values based on a third value.
@!e7fd500306e901077104070a2b51825df651378b

This gives you enough information to use JavaScript as a pocket
calculator, but not much more. The [next
chapter](02_program_structure.html#program_structure) will start tying
these expressions together into basic programs.
@!9b34001567b94809a5d9f278e77b55ce8abd41eb