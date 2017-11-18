{{meta {chap_num: 2, prev_link: 01_values, next_link: 03_functions}}}
@!278fc3afc2513791092ab24cf43125a9e8813411

# Program Structure
@!b575ceed76b8a8037e0cfdaa62a051618494a9cd

{{quote {author: "_why", title: "Why's (Poignant) Guide to Ruby", chapter: true}
@!0127af526660a0babc25c066156e1013219e63ef

And my heart glows bright red under my filmy, translucent skin and
they have to administer 10cc of JavaScript to get me to come back. (I
respond well to toxins in the blood.) Man, that stuff will kick the
peaches right out your gills!
@!96e97132c855fb84a8d8d3cb208b8be7db807446

quote}}
@!acd441176eb4b86611310107d861ad8b4f92f309

{{index why, "Poignant Guide"}}
@!6ec06f384904c2a91315497cc351a2bf6af555da

In this chapter, we will start to do things that can actually be
called _programming_. We will expand our command of the JavaScript
language beyond the nouns and sentence fragments we've seen so far, to
the point where we can express meaningful prose.
@!fcc0b006e288cac2226bb1411f155ca7f68b6c98

## Expressions and statements
@!073893bb5532d91b1b20b450add87ae8b9ba3ffa

{{index grammar, syntax, [code, "structure of"], grammar, [JavaScript, syntax]}}
@!49304cd8d1405870336a2cb881328a4b8e0429f9

In [Chapter 1](01_values.html#values), we made some values and applied
operators to them to get new values. Creating values like this is the
main substance of any JavaScript program. But that substance has to be
framed in a larger structure to be useful. So that's what we'll get to
next.
@!5b3dbc80c0c3bebe43d822a247fab70b9975582e

{{index "literal expression"}}
@!0cea5d6234a0867d3917118f2c5638e62e15e123

A fragment of code that produces a value is called an
_((expression))_. Every value that is written literally (such as `22`
or `"psychoanalysis"`) is an expression. An expression between
((parentheses)) is also an expression, as is a ((binary operator))
applied to two expressions or a ((unary operator)) applied to one.
@!dde387a5589087a3ac81916754c88d487728db05

{{index [nesting, "of expressions"], "human language"}}
@!5d302bedcf4f8f909329b022dce61537b3966cbd

This shows part of the beauty of a language-based interface.
Expressions can contain other expressions in a way very similar to the
way subsentences in human languages are nested—a subsentence can
contain its own subsentences, and so on. This allows us to build
expressions that describe arbitrarily complex computations.
@!731087d3e717e3cdfb977acc8bb470e2d6cee76e

{{index statement, semicolon, program}}
@!0b66954587e80462f2b456ba39c5d81e5cb36624

If an expression corresponds to a sentence fragment, a JavaScript
_statement_ corresponds to a full sentence. A program is a list of
statements.
@!71e01da269274fce9f3d6063a1f0bf7e2244a0c8

{{index syntax}}
@!c3e5835f26ea7dfb5277263fc4ff13c086b13196

The simplest kind of statement is an expression with a semicolon after
it. This is a program:
@!5bb24dd352721b403c2293f00f437585f5cd9820

```
1;
!false;
```
@!068d62d031ba96030e053b50c872153546e05305

It is a useless program, though. An ((expression)) can be content to
just produce a value, which can then be used by the enclosing
expression. A ((statement)) stands on its own, so it amounts to
something only if it affects the world. It could display something on
the screen—that counts as changing the world—or it could change the
internal state of the machine in a way that will affect the statements
that come after it. These changes are called _((side effect))s_. The
statements in the previous example just produce the values `1` and
`true` and then immediately throw them away. This leaves no impression
on the world at all. When you run this program, nothing observable
happens.
@!da20f35e020f8063fd2b6dff2944f383fa5feaee

{{index "programming style", "automatic semicolon insertion", semicolon}}
@!06cb882856db8894c7577a1bb482bf71e40c4e27

In some cases, JavaScript allows you to omit the semicolon at the end
of a statement. In other cases, it has to be there, or the next
((line)) will be treated as part of the same statement. The rules for
when it can be safely omitted are somewhat complex and error-prone. In
this book, every statement that needs a semicolon will always get one.
I recommend you do the same in your own programs, at least until
you've learned more about the subtleties involved in leaving out
semicolons.
@!68559575ec6a8dc883f67ea16c9e4682d6929082

## Bindings
@!cd5912dfa6e1a2abb95cd12dac073d4737a08c0f

{{indexsee variable, binding}}
@!dadaf2c8603a6c8f73fcce779859b9b94d69ad69

{{index syntax, [binding, definition], "side effect", memory}}
@!317c2edb1e88dde05d84cbc602ef59b706186077

How does a program keep an internal ((state))? How does it remember
things? We have seen how to produce new values from old values, but
this does not change the old values, and the new value has to be
immediately used or it will dissipate again. To catch and hold values,
JavaScript provides a thing called a _binding_, or _variable_.
@!f77d4c0e226c9393fee950cb959af58cf839fe9e

```
let caught = 5 * 5;
```
@!ed1319ae0e853f06c74fe0c81a379f8ebcad9132

{{index "let keyword"}}
@!6d7022f6196d21791b8901434b331cf594745340

So that's a a second kind of ((statement)). The special word
(_((keyword))_) `let` indicates that this sentence is going to define
a binding. It is followed by the name of the binding and, if we want
to immediately give it a value, by an `=` operator and an expression.
@!7664b92a912c15eb56649750a2a88f26b4cb07a5

The previous statement creates a binding called `caught` and uses it
to grab hold of the number that is produced by multiplying 5 by 5.
@!e4814977eed8d237667a0c695becf0c19eafa842

After a binding has been defined, its name can be used as an
((expression)). The value of such an expression is the value the
binding currently holds. Here's an example:
@!fa3841377a8d8d3b3b2e598b34612af602f73c0c

```
let ten = 10;
console.log(ten * ten);
// → 100
```
@!f71cc3102b8c4053c2ac48006e1dd0faf943cbbb

{{index "= operator", assignment, [binding, assignment]}}
@!502c78a49f550ad33961cbb7b32a510f33c66d20

When a binding points at a value, that does not mean it is tied to
that value forever. The `=` operator can be used at any time on
existing bindings to disconnect them from their current value and have
them point to a new one.
@!cd20c7d5e64071abda60e150c5c1d5b166930bbc

```
let mood = "light";
console.log(mood);
// → light
mood = "dark";
console.log(mood);
// → dark
```
@!0dfd03f029f7718754e8f63a901c71dcafbe3f48

{{index [binding, "model of"], "tentacle (analogy)"}}
@!a1915ef8f91c662e0f81bef8a82c022af66648bd

You should imagine bindings as tentacles, rather than boxes. They do
not _contain_ values; they _grasp_ them—two bindings can refer to the
same value. A program can access only the values that it still has a
hold on. When you need to remember something, you grow a tentacle to
hold on to it or you reattach one of your existing tentacles to it.
@!66d33e9c979530c5f4b53001de544b28bdc3da24

{{figure {url: "img/octopus.jpg", alt: "Bindings as tentacles"}}}
@!9aff65486b883655af499c9ab2c6d2ef748d676f

Let's look at another example. To remember the number of dollars that
Luigi still owes you, you create a binding. And then when he pays back
$35, you give this binding a new value.
@!6ded4f2dd2beed4206cea8281c3b3a16ab3f61b0

```
let luigisDebt = 140;
luigisDebt = luigisDebt - 35;
console.log(luigisDebt);
// → 105
```
@!c6bf5ff3e4b97153723b0c062de951dd2514f3ad

{{index undefined}}
@!87f1d63a728abe69067d4ce5ca17c4c57fe7c2c4

When you define a binding without giving it a value, the tentacle has
nothing to grasp, so it ends in thin air. If you ask for the value of
an empty binding, you'll get the value `undefined`.
@!e8cf7ca798c8634861f2d5b47e789aea65ceb4c8

{{index "let keyword"}}
@!190aad3ce696429cbc64feb5c2fb8e08b78a8a69

A single `let` statement may define multiple bindings. The
definitions must be separated by commas.
@!1a3ae87d81f24036c952a23ad5217c3d22885e65

```
let one = 1, two = 2;
console.log(one + two);
// → 3
```
@!27e4c9c8549a0445cc3df54f67fc7f230b74e075

The words `var` and `const` can also be used to create bindings, in a
way similar to `let`.
@!1aece027a5244ad25aadfb7c555043d26942365b

```
var name = "Ayda";
const greeting = "Hello ";
console.log(greeting + name);
// → Hello Ayda
```
@!bfc1a1c45f53d9f6dbc74b3cd2f7ce5938e7baff

{{index "var keyword"}}
@!c8d2ddda3d61dfc0d21259f0bb6190f9119b295c

The first, `var` (short for "variable"), is the way bindings were
declared in pre-2015 JavaScript. We'll get back to the precise way it
differs from `let` in the [next chapter](03_functions.html). For now,
remember that it mostly does the same thing, but we'll rarely use it
in this book because it has some confusing properties.
@!a8aa7e63b7038629518f012241092f5a5116eaf1

{{index "const keyword", naming}}
@!c44991aa9d5baea33337b99fd062067b4edf8d42

The word `const` stands for _((constant))_. It defines a constant
binding, which can not be made to point at a new thing. This is very
useful for giving names to values so that you can easily refer to them
later.
@!ede84dcb18a0bb2fc623a0da9ff6cb7f96d8f3b5

## Binding names
@!b472f08121c3951faed2f5b799bb1c6356cf90d7

{{index "underscore character", "dollar sign", [binding, naming]}}
@!ad1a52f037d171c03f0f3baa4b893b6de77ad6bd

Binding names can be any word that isn't reserved for some other
purpose (such as `let`). Digits can be part of binding names—`catch22`
is a valid name, for example—but the name must not start with a digit.
A binding name can include dollar signs (`$`) or undescores (`_`), but
no other punctuation or special characters.
@!43c7b4bca8c5d5a5e87d7535aa19bb8d350489ec

{{index syntax, "implements (reserved word)", "interface (reserved word)", "package (reserved word)", "private (reserved word)", "protected (reserved word)", "public (reserved word)", "static (reserved word)", "void operator", "yield (reserved word)", "enum (reserved word)", "reserved word", [binding, naming]}}
@!313b65dd433e7344949677111b7050ede0418c0e

Words with a special meaning, such as `const`, are _((keyword))s_, and
they may not be used as binding names. There are also a number of
words that are "reserved for use" in ((future)) versions of
JavaScript, which also can't be used as binding names. The full list
of keywords and reserved words is rather long.
@!4b2ff520534f80428bdb63645358da8ae929afd9

```{lang: "text/plain"}
break case catch class const continue debugger default
delete do else enum export extends false finally for
function if implements import interface in instanceof let
new package private protected public return static super
switch this throw true try typeof var void while with yield
```
@!4a9145002af0d2a022cc170e730affef4547b386

Don't worry about memorizing these. When creating a binding produces
an unexpected ((syntax error)), see if you're trying to define a
reserved word.
@!f41b7d7dfbeea992541efff3c7326f21554cd5b2

## The environment
@!524eca59dcccf2657db3e2d06f5c3a54ea4d88f9

{{index "standard environment"}}
@!4e79bf3c32b5818f7078d23881f947d4c3827fed

The collection of bindings and their values that exist at a given time
is called the _((environment))_. When a program starts up, this
environment is not empty. It always contains bindings that are part of
the language ((standard)), and most of the time, it has bindings that
provide ways to interact with the surrounding system. For example, in
a ((browser)), there are functions to interact with the currently
loaded website and to read ((mouse)) and ((keyboard)) input.
@!3b4efef29870e05b21c491666ded7a7d93164a5a

## Functions
@!2ca21f7a7409b7cb1f4e09d9298907f51d387530

{{indexsee "application (of functions)", "function application"}}
@!638bf0eb592b2f77830c67d50ac6f92b184d68db

{{indexsee "invoking (of functions)", "function application"}}
@!701782951413fad2d6284e07c73022e8ae54e408

{{indexsee "calling (of functions)", "function application"}}
@!72a046dfaabbd58c50435d5a1934c9d0aac854c4

{{index output, function, [function, application]}}
@!3187bd9e0e20f025977a3d24f66eca6de8c3155b

A lot of the values provided in the default environment have the type
_((function))_. A function is a piece of program wrapped in a value.
Such values can be _applied_ in order to run the wrapped program. For
example, in a ((browser)) environment, the binding `prompt` holds a
function that shows a little ((dialog box)) asking for user input. It
is used like this:
@!7fe931a497f718fa598cf916a4bfed1bb0fc8af8

```
prompt("Enter passcode");
```
@!29bc6470d62f86c49d766d937ed8f68a4a8f6a91

{{figure {url: "img/prompt.png", alt: "A prompt dialog", width: "8cm"}}}
@!6d92d0967bfdf349d136820c334edfab549386df

{{index parameter, [function, application]}}
@!3c6746ef6a5ddf9b786553ecc55464fc4bc04c49

Executing a function is called _invoking_, _calling_, or _applying_
it. You can call a function by putting ((parentheses)) after an
expression that produces a function value. Usually you'll directly use
the name of the binding that holds the function. The values between
the parentheses are given to the program inside the function. In the
example, the `prompt` function uses the string that we give it as the
text to show in the dialog box. Values given to functions are called
_((argument))s_. Different functions might need a different number or
different types of arguments.
@!b62e21088de6ffa88cb5c8b63aa95a947e10506f

The `prompt` function isn't used much in modern web programming,
mostly because you have no control over the way the resulting dialog
looks, but can be helpful in toy programs and experiments.
@!ba14e9845fd34721adf1efb096819a7a5f95f703

## The console.log function
@!ac7064f10f5130c51cc1392e076715e64436240c

{{index "JavaScript console", "developer tools", "Node.js", "console.log", output}}
@!806185ed8f2f46e1df0552f4712e9e30977f6a47

In previous examples, we've used `console.log` to output values. Most
JavaScript systems (including all modern web ((browser))s and Node.js)
provide a `console.log` function that writes out its arguments to
_some_ text output device. In browsers, the output lands in the
((JavaScript console)). This part of the browser interface is hidden
by default, but most browsers open it when you press F12 or, on Mac,
when you press Command-Option-I. If that does not work, search through
the menus for an item named "developer tools" or similar.
@!b38faad8482709044453c462ee2e6fd69fdd2595

{{if interactive
@!ddc84a89b2ec83249cef33e5aea9448569052cca

When running the examples, or your own code, on the pages of this
book, `console.log` output will be shown after the example, instead of
in the browser's JavaScript console.
@!a46e7573d11f0d8c8f5117dfe39022cc2463a6af

if}}
@!98d9911bb4153c707a7b90ef7ba47764ca923179

```
let x = 30;
console.log("the value of x is", x);
// → the value of x is 30
```
@!993d0ec944e05df76d004d69017f4f062eff0013

{{index object}}
@!e4630fe09c8b592910b661abf6acbf2c3c824535

Though binding names cannot contain ((period character))s,
`console.log` does have one. This is because `console.log` isn't a
simple binding. It is actually an expression that retrieves the `log`
((property)) from the value held by the `console` binding. We will
find out exactly what this means in [Chapter
4](04_data.html#properties).
@!22159fcf1fb40ffe970a05c5ad8e7f2600efd2a7

{{id return_values}}
@!57a69bed611363740c4c4964a9a24f0258158a98

## Return values
@!cb0e399f9049d8de04e3c8dd14accc146e43240a

{{index [comparison, "of numbers"], "return value", "Math.max function", maximum}}
@!f45ac4bebab5fec3a9a6b52bf1f7fac374edbe4e

Showing a dialog box or writing text to the screen is a _((side
effect))_. A lot of functions are useful because of the side effects
they produce. Functions may also produce values, and in that case,
they don't need to have a side effect to be useful. For example, the
function `Math.max` takes any amount of number arguments and gives
back the greatest.
@!fe7258defdea8a960c87e6666b1fa2db6a2613e2

```
console.log(Math.max(2, 4));
// → 4
```
@!900226cd914edd23d8f4082f50669557450f4c77

{{index [function, application], minimum, "Math.min function"}}
@!d48367d2d3a94091e0db02d7d774b8b38795005a

When a function produces a value, it is said to _return_ that value.
Anything that produces a value is an ((expression)) in JavaScript,
which means function calls can be used within larger expressions. Here
a call to `Math.min`, which is the opposite of `Math.max`, is used as
part of a plus expression:
@!313b86b021c30f59fbcc87a1f0e473d381413b7e

```
console.log(Math.min(2, 4) + 100);
// → 102
```
@!446a79f2d2d235e06ac8491769bd7a1946cfbb99

The [next chapter](03_functions.html#functions) explains how to
write your own functions.
@!48221bf32f8fa88b0c225c78471abc53b57f0983

## Control flow
@!a2b6e379ae30a3944295e0b43c1b96993eebc1b4

{{index "execution order", program, "control flow"}}
@!92799df9118217d4301fb5ab83a342d8ccef9659

When your program contains more than one ((statement)), the statements
are executed as if they are a story, from top to bottom. This example
program has two statements. The first one asks the user for a number,
and the second, which is executed afterward, shows the ((square)) of
that number.
@!e950d741d5087d5ea437c75bba05cb1b43ecca88

```
let theNumber = Number(prompt("Pick a number"));
console.log("Your number is the square root of " +
            theNumber * theNumber);
```
@!4ce3841bebc1af79028c9552ad487560db1ff210

{{index [number, "conversion to"], "type coercion", "Number function", "String function", "Boolean function", [Boolean, "conversion to"]}}
@!dc1275ce88b952465c840d987747d376a449bfe0

The function `Number` converts a value to a number. We need that
conversion because the result of `prompt` is a string value, and we
want a number. There are similar functions called `String` and
`Boolean` that convert values to those types.
@!5ffeec1e465352ccbc1809c0a7c8b67e7a851182

Here is the rather trivial schematic representation of straight
control flow:
@!fb856ce2b82bf3987c84b7d271e4925c5df77037

{{figure {url: "img/controlflow-straight.svg", alt: "Trivial control flow", width: "4cm"}}}
@!32f49678bca0dbf558a11226ec0c86244c56ece6

## Conditional execution
@!464acd284997f01f9b69eef9426930326ee58d57

{{index Boolean, "control flow"}}
@!3db5b1e0a888261f0aa1a402db9fc5d79b398f6c

Not all programs are straight roads. We may, for example, want to
create a branching road, where the program takes the right branch
based on the situation at hand. This is called _((conditional
execution))_, and looks like this:
@!d9e20d523529b7318e58c9d79117f7a3fbd8ae55

{{figure {url: "img/controlflow-if.svg", alt: "Conditional control flow",width: "4cm"}}}
@!21e437b65ecb2b07e4f590a14754e042c0807016

{{index syntax, "Number function", "if keyword"}}
@!e2b46b3198ce00527e679b6933afeb9119093d11

Conditional execution is written with the `if` keyword in JavaScript.
In the simple case, we want some code to be executed if, and only if,
a certain condition holds. For example, in the previous example
program, we might want to show the square of the input only if the
input is actually a number.
@!75fb5b728297d1e2015293c9028e8e08c309ea6f

```{test: wrap}
let theNumber = Number(prompt("Pick a number"));
if (!isNaN(theNumber)) {
  console.log("Your number is the square root of " +
              theNumber * theNumber);
}
```
@!54c12e235d24f37ce7a78f0393af23e1de6ac85a

With this modification, if you enter "parrot", no output will be shown.
@!1951d430be8833e9780fed29c61e48324e43dcbb

The `if` keyword executes or skips a statement depending on the value
of a Boolean expression. The deciding expression is written after the
keyword, between ((parentheses)), followed by the statement to
execute.
@!9c5c400322fe1a1203e3b0a34f0c1da3f07dbdf3

{{index "isNaN function"}}
@!bedd6a5bdf12e18108a34ad8066c118c228c5596

The `isNaN` function is a standard JavaScript function that returns
`true` only if the argument it is given is `NaN`. The `Number`
function happens to return `NaN` when you give it a string that
doesn't represent a valid number. Thus, the condition translates to
"unless `theNumber` is not-a-number, do this".
@!0ff5f6b50e0132484b7da4e3c51ae115b16966ba

{{index "else keyword"}}
@!23057c9abadfa77dc11c134c140ad0189a9c6eaa

You often won't just have code that executes when a condition holds
true, but also code that handles the other case. This alternate path
is represented by the second arrow in the diagram. The `else` keyword
can be used, together with `if`, to create two separate, alternative
execution paths.
@!77aff7bff808bfaae97e8c8b97319fb2745dd51e

```{test: wrap}
let theNumber = Number(prompt("Pick a number"));
if (!isNaN(theNumber)) {
  console.log("Your number is the square root of " +
              theNumber * theNumber);
} else {
  console.log("Hey. Why didn't you give me a number?");
}
```
@!ce700ede4e65cc296c4a605cfc18157cdd509c65

{{index grouping, "{} (block)"}}
@!772daccfe631c729ac43bce73dd447613bb9f4ba

The statements below the `if` or `else` branches are wrapped in
((curly braces)) (`{` and `}) in this example. Those can be used to
group statements into a single statement, called a _((block))_. You
could also have omitted them in this case, since they only hold a
single statement, but to avoid having to think about whether they are
needed or not, most JavaScript programmers use them in every wrapped
statement like this. We'll mostly follow that convention in this book.
@!73312283543518fbed46698d3fc22e9f088a4a79

{{index ["if keyword", chaining]}}
@!677122716fe9b54d7448fe4b0e2bb2d4dbfbaaf7

If we have more than two paths to choose from, multiple `if`/`else`
pairs can be “chained” together. Here's an example:
@!3c510d3b1baffb3a4b7b69f6b7abd887543f6c98

```
let num = Number(prompt("Pick a number"));

if (num < 10) {
  console.log("Small");
} else if (num < 100) {
  console.log("Medium");
} else {
  console.log("Large");
}
```
@!423e7643d606e77bebf33754367f1f8b6dcacc5f

The program will first check whether `num` is less than 10. If it is,
it chooses that branch, shows `"Small"`, and is done. If it isn't, it
takes the `else` branch, which itself contains a second `if`. If the
second condition (`< 100`) holds, that means the number is between 10
and 100, and `"Medium"` is shown. If it doesn't, the second, and last,
`else` branch is chosen.
@!4ab1b497ecdab931c93354e00ee1c62aae5ed195

The schema for this program looks something like this:
@!b10c20a3e7ec235dd9b0c7d58633eaa68a7af1b8

{{figure {url: "img/controlflow-nested-if.svg", alt: "Nested if control flow", width: "4cm"}}}
@!24db83ff3f878287d6d95f7c4c36a1524aeb3630

{{id loops}}
@!4af6c5d8e3835d22471f12547b22e61bf650cbae

## while and do loops
@!e8b6f3b22b63c1004c78cf591e7766c0eadfd02d

Consider a program that outputs all ((even number))s from 0 to 12. One
way to write this is as follows:
@!e1a3d2bb1f8ef0b094eedd090a72cdd108868af7

```
console.log(0);
console.log(2);
console.log(4);
console.log(6);
console.log(8);
console.log(10);
console.log(12);
```
@!e92f54648f9adb54db763439b177afec8bd79957

{{index "control flow"}}
@!41516b02c29e1fb9e7798084b0ab21e0e2144dd6

That works, but the idea of writing a program is to make something
_less_ work, not more. If we needed all even numbers less than 1,000,
this approach would be unworkable. What we need is a way to repeat
some code. This form of control flow is called a _((loop))_:
@!dd4590af1cfd3c791fa34493de6418e6be06d673

{{figure {url: "img/controlflow-loop.svg", alt: "Loop control flow",width: "4cm"}}}
@!fefdea9e10315b9f7def943588fe6dee5699efc4

{{index syntax, "counter variable"}}
@!042f664aeedec27fadd91ed8630aa1dffd3501a0

Looping control flow allows us to go back to some point in the program
where we were before and repeat it with our current program state. If
we combine this with a binding that counts, we can do something like
this:
@!66e6d9a25b9f14e503f0f47dbd31cf31d08b502a

```
let number = 0;
while (number <= 12) {
  console.log(number);
  number = number + 2;
}
// → 0
// → 2
//   … etcetera
```
@!3d00cf9a6e11c64f55389fd1d69e1c8d7ed65039

{{index "while loop", Boolean}}
@!6608ea0652ea4a74102351faffa44609b418332f

A ((statement)) starting with the keyword `while` creates a loop. The
word `while` is followed by an ((expression)) in ((parentheses)) and
then a statement, much like `if`. The loop executes that statement as
long as the expression produces a value that gives `true` when
converted to Boolean.
@!7addf34d3313cf1af5ca0663d7c4d4e5c19bfba3

{{index comparison, state}}
@!9519dbb56a1686a9cbb052f1a7e455fcef189ff5

The `number` binding demonstrates the way a ((binding)) can track the
progress of a program. Every time the loop repeats, `number` gets a
value that is 2 more than its previous value. At the beginning of
every repetition, it is compared with the number 12 to decide whether
the program's work is finished.
@!6a5a058938a8b14eb97fdc1d60f2bca11dffb6fb

{{index exponentiation}}
@!c6360dba2287a025ea6dabb15cb092af634f2eaf

As an example that actually does something useful, we can now write a
program that calculates and shows the value of 2^10^ (2 to the 10thn
power). We use two bindings: one to keep track of our result and one
to count how often we have multiplied this result by 2. The loop tests
whether the second binding has reached 10 yet and then updates both
bindings.
@!9b1770430db654f4eb21f5e23a64cb3b865ababb

```
let result = 1;
let counter = 0;
while (counter < 10) {
  result = result * 2;
  counter = counter + 1;
}
console.log(result);
// → 1024
```
@!9469cd0f09352bd01d84007b26508d0f0a74a8e4

The counter could also have started at `1` and checked for `<= 10`,
but, for reasons that will become apparent in [Chapter
4](04_data.html#array_indexing), it is a good idea to get used to
counting from 0.
@!a3d60f654cf98f026a38533affefb68a4a668b28

{{index "loop body", "do loop", "control flow"}}
@!f65dab6babdb43daa1fc1e402418009e0744a168

The `do` loop is a control structure similar to the `while` loop. It
differs only on one point: a `do` loop always executes its body at
least once, and it starts testing whether it should stop only after
that first execution. To reflect this, the test appears after the body
of the loop:
@!c76e8a77b2e5741b3f7c7055e9089493361a56e1

```
let yourName;
do {
  yourName = prompt("Who are you?");
} while (!yourName);
console.log(yourName);
```
@!7b2e0074b9515f3c6ef4875400a846e03c4119ef

{{index [Boolean, "conversion to"], "! operator"}}
@!8aa1f671258aa7553d4456c00e0fa3d2848bbd5c

This program will force you to enter a name. It will ask again and
again until it gets something that is not an empty string. Applying
the `!` operator will convert a value to Boolean type before negating
it, and all strings except `""` convert to `true`. This means the loop
continues going round until you provide a name that is not the empty
string.
@!8ec462be22af5900d8beede8309b172acbb5bbb6

## Indenting Code
@!331a62913210abb6147640ce5a29e5c7768c2f1d

{{index "code structure", whitespace, "programming style"}}
@!d638d94a3fff5e4b8c84138b90a27fb7a9487deb

In the examples, I've been adding spaces in front of statements that
are part of some larger statement. These are not required—the computer
will accept the program just fine without them. In fact, even the
((line)) breaks in programs are optional. You could write a program as
a single long line if you felt like it.
@!6e3f19b0986dd6892914389342e95e823362e6d3

The role of this ((indentation)) inside ((block))s is to make the
structure of the code stand out. In code where new blocks are opened
inside other blocks, it can become hard to see where one block ends
and another begins. With proper indentation, the visual shape of a
program corresponds to the shape of the blocks inside it. I like to
use two spaces for every open block, but tastes differ—some people use
four spaces, and some people use ((tab character))s. The important
thing is that each new block adds the same amount of space.
@!c1c4f91981160d0d8787cafae75a08f945f7c3f0

```
if (false != true) {
  console.log("That makes sense.");
  if (1 < 2) {
    console.log("No surprise there.");
  }
}
```
@!4f693e9724bfca4cdc2e5346f8da499d8ab36e31

Most code ((editor)) programs[ (including the one in this book)]{if
interactive} will help by automatically indenting new lines the proper
amount.
@!5c1ef1ff1a872b4cfdc144e559ca4958abb7b62e

## for loops
@!54fd96d0baa0aca39219ba4aa771561f9e86e496

{{index syntax, "while loop", "counter variable"}}
@!02a4eb29335a606580c29b13e74c231bb171f61b

Many loops follow the pattern seen in the previous `while` examples.
First, a “counter” binding is created to track the progress of the
loop. Then comes a `while` loop, whose test expression usually checks
whether the counter has reached some boundary yet. At the end of the
loop body, the counter is updated to track progress.
@!1a8fc488eb2f4db3bc2046a1c939fcbdd6dbe61d

{{index "for loop", loop}}
@!d56f0ade18c4a4895d1500845f620b71088c9389

Because this pattern is so common, JavaScript and similar languages
provide a slightly shorter and more comprehensive form, the `for`
loop.
@!f760e276cc22051e9a308f55645ec5d61c957fb1

```
for (let number = 0; number <= 12; number = number + 2) {
  console.log(number);
}
// → 0
// → 2
//   … etcetera
```
@!3c642c9ac134c965941df9b60718e663b75977b1

{{index "control flow", state}}
@!5dd94247cab1a2812a2bdd99577355dc4ad1ea80

This program is exactly equivalent to the
[earlier](02_program_structure.html#loops) even-number-printing
example. The only change is that all the ((statement))s that are
related to the “state” of the loop are now grouped together.
@!d217fa12ce1ab1d1173c4ebfd58962a49c899569

The ((parentheses)) after a `for` keyword must contain two
((semicolon))s. The part before the first semicolon _initializes_ the
loop, usually by defining a ((binding)). The second part is the
((expression)) that _checks_ whether the loop must continue. The final
part _updates_ the state of the loop after every iteration. In most
cases, this is shorter and clearer than a `while` construct.
@!a45d5d0443c94d3b66210e655aa78c962d92886f

{{index exponentiation}}
@!2160b88ee6f0f604e0839de643fc28abec8f5154

This is the code that computes 2^10^, using `for` instead of `while`:
@!32b679c82c3301ee0c120d79b607dd7fa5d4f2a6

```{test: wrap}
let result = 1;
for (let counter = 0; counter < 10; counter = counter + 1)
  result = result * 2;
console.log(result);
// → 1024
```
@!0c3feee3fe43ee4b69148a627e0a1a901ae0f595

{{index "programming style", indentation}}
@!45d7878a1a0ca7fea7321005967c8f8081705b6b

Note that even though in this example no block is opened with a `{`,
the statement in the loop is still indented two spaces to make it
clear that it “belongs” to the line before it.
@!89f9c5495e028672e856093b32e26d57ca263094

## Breaking Out of a Loop
@!dd9bd27d6b6d5fdd90c7b53c4ed12b3c4cc81fdd

{{index [loop, "termination of"], "break keyword"}}
@!b4bf38c801620f0fe72388cd02169cb69bb98c10

Having the looping condition produce `false` is not the only way a
loop can finish. There is a special statement called `break` that has
the effect of immediately jumping out of the enclosing loop.
@!25ef5563ecd7a0348dfcf4e38d702e3d16029787

This program illustrates the `break` statement. It finds the first number
that is both greater than or equal to 20 and divisible by 7.
@!268552cc9483f525e104f5e75789a7ab9a559617

```
for (let current = 20; ; current = current + 1) {
  if (current % 7 == 0) {
    console.log(current);
    break;
  }
}
// → 21
```
@!0b75f2a37855ba2d09c27fc119eaf547c8980b14

{{index "remainder operator", "% operator"}}
@!ad305af230e27520f5cf449cb27ee497f3c557c4

Using the remainder (`%`) operator is an easy way to test whether a
number is divisible by another number. If it is, the remainder of
their division is zero.
@!b4690c25a835588e795462798560c57298c33a77

{{index "for loop"}}
@!3075bbd57cb4a3d7e2d0000c6b78db7646738aea

The `for` construct in the example does not have a part that checks
for the end of the loop. This means that the loop will never stop
unless the `break` statement inside is executed.
@!9dfc39a84d939edc384c97f700d2cd71c694cb9e

If you were to leave out that `break` statement or accidentally write
a condition that always produces `true`, your program would get stuck
in an _((infinite loop))_. A program stuck in an infinite loop will
never finish running, which is usually a bad thing.
@!8e8262670719c6c7ea59723700563bdbddd082d5

{{if interactive
@!8e2ad248654334fe4f18a2ea3bd7176cd7f75424

If you create an infinite loop in one of the examples on these pages,
you'll usually be asked whether you want to stop the script after a
few seconds. If that fails, you will have to close the tab that you're
working in, or on some browsers close your whole browser, in order to
recover.
@!614490b83abcec43addab1622a0ab20de7754c61

if}}
@!1738a98f822c28220aeaa6b1058e1cc8337d2055

{{index "continue keyword"}}
@!4fdc0750d68d907f55d7d736e7ff8c72a8b8024b

The `continue` keyword is similar to `break`, in that it influences
the progress of a loop. When `continue` is encountered in a loop body,
control jumps out of the body and continues with the loop's next
iteration.
@!56fe24583a3c553e72c837818734f0ad86cf1b20

## Updating bindings succinctly
@!a72788b8d8478303d6783fa24ddc86524a493296

{{index assignment, "+= operator", "-= operator", "/= operator", "*= operator", state, "side effect"}}
@!aca96e8219bec60eacbae2cc2736a4d96754d212

Especially when looping, a program often needs to “update” a binding
to hold a value based on that binding's previous value.
@!5cd6d5570b6ff22accf2b384606f4e780a4e68fb

```{test: no}
counter = counter + 1;
```
@!300aa6fc908c648a52e36592ae26b16d605fd954

JavaScript provides a shortcut for this:
@!bf916e156f8a345fbd767267981615a59dbd8ff0

```{test: no}
counter += 1;
```
@!4be3966f1c1c919f2fcd9bbe74e5db09fe00be37

Similar shortcuts work for many other operators, such as `result *= 2`
to double `result` or `counter -= 1` to count downward.
@!7ea8b120387d16b42e5bab957f58685ca8db4fe3

This allows us to shorten our counting example a little more.
@!35d55b05b44b1cd159d21257591dc618f985170c

```
for (let number = 0; number <= 12; number += 2)
  console.log(number);
```
@!6a3f19217fd77a508e489ae450f85fbbe54468b3

{{index "++ operator", "-- operator"}}
@!5ef737b046c24c0397e820c827fdd2c2147f028e

For `counter += 1` and `counter -= 1`, there are even shorter
equivalents: `counter++` and `counter--`.
@!8be04f7449e50b46e6e4c57a98443dd79fd8ee2b

## Dispatching on a value with switch
@!b277fde35dd9e8f6d5873f4022c577844f41aefd

{{index syntax, "conditional execution", dispatching, ["if keyword", chaining]}}
@!258dc0769e285fafdedebe2e5bdd6130dc74eefc

It is not uncommon for code to look like this:
@!12965751bf8de03bb0562efa877e069d6ec54a71

```{test: no}
if (x == "value1") action1();
else if (x == "value2") action2();
else if (x == "value3") action3();
else defaultAction();
```
@!ca9a72ae02d571a13dc7665b2294c0aede1ac3f5

{{index "colon character", "switch keyword"}}
@!5d45c4e364b78a8a5c4872d81108eed50f8d0316

There is a construct called `switch` that is intended to express such
a "dispatch" in a more direct way. Unfortunately, the syntax
JavaScript uses for this (which it inherited from the C/Java line of
programming languages) is somewhat awkward—a chain of `if` statements
may look better. Here is an example:
@!d00110572ddbb281be77ffc951a86895399235e1

```
switch (prompt("What is the weather like?")) {
  case "rainy":
    console.log("Remember to bring an umbrella.");
    break;
  case "sunny":
    console.log("Dress lightly.");
  case "cloudy":
    console.log("Go outside.");
    break;
  default:
    console.log("Unknown weather type!");
    break;
}
```
@!ddc649e0fc4cb4405d8d4654e16b65cb79a21f40

{{index fallthrough, comparison, "break keyword", "case keyword", "default keyword"}}
@!f7aea8b5e59ee06934d24ace10e8f44c26b2ffa7

You may put any number of `case` labels inside the block opened by
`switch`. The program will jump to the label that corresponds to the
value that `switch` was given or to `default` if no matching value is
found. It starts executing statements there, even those under another
label, until it reaches a `break` statement. In some cases, such as
the `"sunny"` case in the example, this can be used to share some code
between cases (it recommends going outside for both sunny and cloudy
weather). But beware: it is easy to forget such a `break`, which will
cause the program to execute code you do not want executed.
@!02003ea043761cfcd12bac10cb091877376d5966

## Capitalization
@!50791b9d5a5bd2c61f691b1a6cee6090d31b37cc

{{index capitalization, [binding, naming], whitespace}}
@!7ae1871b2a96c21c26497973ea5f14ff3938fc8b

Binding names may not contain spaces, yet it is often helpful to use
multiple words to clearly describe what the binding represents. These
are pretty much your choices for writing a binding name with several
words in it:
@!134ab2b7f2137ade547a8604f49375c198df5d2c

```{lang: null}
fuzzylittleturtle
fuzzy_little_turtle
FuzzyLittleTurtle
fuzzyLittleTurtle
```
@!16f229e6ef33b0e7487b0f2b442e21731249fe25

{{index "camel case", "programming style", "underscore character"}}
@!9b966a9767abe57383ddb1fca5ec5ccf7ad8d3e2

The first style can be hard to read. I rather like the look of the
underscores, though that style is a little painful to type. The
((standard)) JavaScript functions, and most JavaScript programmers,
follow the bottom style—they capitalize every word except the first.
It is not hard to get used to little things like that, and code with
mixed naming styles can be jarring to read, so we follow this
((convention)).
@!5032ca5a51e97ca7afdb377e7e0118e43b9e31e7

{{index "Number function", constructor}}
@!b39d0526d360212ac18b139a6ddf6d64904fadfa

In a few cases, such as the `Number` function, the first letter of a
binding is also capitalized. This was done to mark this function as a
constructor. What a constructor is will become clear in [Chapter
6](06_object.html#constructors). For now, the important thing is not
to be bothered by this apparent lack of ((consistency)).
@!019cf41a95bc34efa12bb5044cab08abd20a2bcc

## Comments
@!0f9b5704a5e0093280f666c1ce446e932bfd21f5

{{index readability}}
@!646c1a4576b69772485a5515f1d3a022f9ca1968

Often, raw code does not convey all the information you want a program
to convey to human readers, or it conveys it in such a cryptic way
that people might not understand it. At other times, you might just
want to include some related thoughts as part of your program. This is
what _((comment))s_ are for.
@!d4b7bf5f626d04a7b4f439a64857f11aeef7215b

{{index "slash character", "line comment"}}
@!11b54861e9d4cae56cc4dc56f24d4be89202e106

A comment is a piece of text that is part of a program but is
completely ignored by the computer. JavaScript has two ways of writing
comments. To write a single-line comment, you can use two slash
characters (`//`) and then the comment text after it.
@!64084f9a070749e19bfc8a0bc5988bb7e09d4060

```{test: no}
let accountBalance = calculateBalance(account);
// It's a green hollow where a river sings
accountBalance.adjust();
// Madly catching white tatters in the grass.
let report = new Report();
// Where the sun on the proud mountain rings:
addToReport(accountBalance, report);
// It's a little valley, foaming like light in a glass.
```
@!0c6e9d962411bc07d26ffacf5cc50e99b320fd93

{{index "block comment"}}
@!a8d4f9bfae302ea84e778987423cb3116bf455d1

A `//` comment goes only to the end of the line. A section of text
between `/*` and `*/` will be ignored in its entirety, regardless of
whether it contains line breaks. This is often useful for adding
blocks of information about a file or a chunk of program.
@!40dfd6560d28cc6a1781f52fcc6f564f7cc460c9

```
/*
 I first found this number scrawled on the back of one of
 my notebooks a few years ago. Since then, it has often
 dropped by, showing up in phone numbers and the serial
 numbers of products that I've bought. It obviously likes
 me, so I've decided to keep it.
*/
const myNumber = 11213;
```
@!a201927c4f6e5e1dc18cea5b90f60617900e5a5e

## Summary
@!456ac1e895106c684137eee7b7b98d767e566a3a

You now know that a program is built out of statements, which
themselves sometimes contain more statements. Statements tend to
contain expressions, which themselves can be built out of smaller
expressions.
@!3aec0dde42b61d72286ed1f44c6e5e214ee440f2

Putting statements after one another gives you a program that is
executed from top to bottom. You can introduce disturbances in the
flow of control by using conditional (`if`, `else`, and `switch`) and
looping (`while`, `do`, and `for`) statements.
@!28b2297df96b53833a265c25e9dbba4305879314

Bindings can be used to file pieces of data under a name, and they are
useful for tracking state in your program. The environment is the set
of bindings that are defined. JavaScript systems always put a number
of useful standard bindings into your environment.
@!ca20bb15d03a5b31efba90c9592de065219d27e9

Functions are special values that encapsulate a piece of program. You
can invoke them by writing `functionName(argument1, argument2)`. Such
a function call is an expression, and may produce a value.
@!4cf888313bcc470bb752789c172d6972263980a6

## Exercises
@!c1d2cb6fb8ca5f833696500ebcff225bf766cf50

{{index exercises}}
@!2738cc65049848963ae136d5ad7082ea8f4cf29e

If you are unsure how to try your solutions to exercises, refer to the
[introduction](00_intro.html#intro).
@!4aceb953005775e2827c00c7b72848d72a3f418a

Each exercise starts with a problem description. Read that and try to
solve the exercise. If you run into problems, consider reading the
hints [after the exercise]{if interactive}[at the [end of the
book](hints.html#hints)]{if book}. Full solutions to the exercises are
not included in this book, but you can find them online at
http://eloquentjavascript.net/code[_eloquentjavascript.net/code_]. If
you want to learn something from the exercises, I recommend looking at
the solutions only after you've solved the exercise, or at least after
you've attacked it long and hard enough to have a slight headache.
@!0937ae2dc1a27bc87b7099cfaacf0bba5504cc6c

### Looping a triangle
@!0675f9da23eafe4337679bc36421185cf9e7b86c

{{index "triangle (exercise)"}}
@!79bf7a57a53a08eb40809f83373bff5a8d0c6898

Write a ((loop)) that makes seven calls to `console.log` to output the
following triangle:
@!02ffdaa4fad67117cb64be1c616028de1b891d13

```{lang: null}
#
##
###
####
#####
######
#######
```
@!3764c45a52b5754d23907b11638b04b220844cad

{{index [string, length]}}
@!63b20968c9d855dbb98642fa8d9f57fb0d30788c

It may be useful to know that you can find the length of a string by
writing `.length` after it.
@!c7b601a36f3358217f5fe5919d0c3a539e0dc961

```
let abc = "abc";
console.log(abc.length);
// → 3
```
@!64545f37e40de379985960632521a3082cf23b4c

{{if interactive
@!1eb9da6c0c03bbc4bfd1ff636e3b35f1f63b2742

Most exercises contain a piece of code that you can modify to solve
the exercise. Remember that you can click code blocks to edit them.
@!834ccf9ef4b7c989bcc899dd58c7e16eb9a70b77

```
// Your code here.
```
@!2da5e44ec87d6458e0d37793876fee7542b81b3a

if}}
@!e2e0a12c8fe7336b85bfbae71b67f4e66dc46233

{{hint
@!a2a499590dda1c3a2aa997027524908879fc9a64

{{index "triangle (exercise)"}}
@!3f06a5fa5613e066ceca2f76cab05ce4376d3b6a

You can start with a program that simply prints out the numbers 1 to
7, which you can derive by making a few modifications to the [even
number printing example](02_program_structure.html#loops) given
earlier in the chapter, where the `for` loop was introduced.
@!a4dee19167845e75fda58cccacba185148bd6201

Now consider the equivalence between numbers and strings of hash
characters. You can go from 1 to 2 by adding 1 (`+= 1`). You can go
from `"#"` to `"##"` by adding a character (`+= "#"`). Thus, your
solution can closely follow the number-printing program.
@!7bdd63ffbe89045d56a3e56be9cd62c428cafd97

hint}}
@!25308a31fa0863e651507d38dd6a1848eb093b15

### FizzBuzz
@!4b6a2c9087a77e66e8e9ef35cf5bc9c3e9bcea14

{{index "FizzBuzz (exercise)", loop, "conditional execution"}}
@!becd351b0e979403d9a319328ae50c9fa32b3c9a

Write a program that uses `console.log` to print all the numbers from
1 to 100, with two exceptions. For numbers divisible by 3, print
`"Fizz"` instead of the number, and for numbers divisible by 5 (and
not 3), print `"Buzz"` instead.
@!f16f2ba2375fa70fa21f6e8a81917d33d3837ae5

When you have that working, modify your program to print `"FizzBuzz"`,
for numbers that are divisible by both 3 and 5 (and still print
`"Fizz"` or `"Buzz"` for numbers divisible by only one of those).
@!23488443b7ffd8d0b528ac489cad509b5eb75cc2

(This is actually an ((interview question)) that has been claimed to
weed out a significant percentage of programmer candidates. So if you
solved it, your labor market value just went up.)
@!7676827b1ce897c8c0ac02816fb371b87b134e6d

{{if interactive
@!c1a5637948f3102575bc4b5b07bf7b6a45c1d7c3

```
// Your code here.
```
@!266fe26ac21b6edb25ef31d4d327534f734d82ef

if}}
@!7830aecdc4af49de02810a50829ff7793fee0186

{{hint
@!a82a68bc889a696e65fc2c023fe8ed341c57f37d

{{index "FizzBuzz (exercise)", "remainder operator", "% operator"}}
@!fc8646f672f2fa049c0fe38f40ef8ce011d02d15

Going over the numbers is clearly a looping job, and selecting what to
print is a matter of conditional execution. Remember the trick of
using the remainder (`%`) operator for checking whether a number is
divisible by another number (has a remainder of zero).
@!96eeda49db26d7ecec4392fea631daa27e50182f

In the first version, there are three possible outcomes for every
number, so you'll have to create an `if`/`else if`/`else` chain.
@!6e0a3d62f0bfa71f2f0f22a5399628e3deb7a588

{{index "|| operator", ["if keyword", chaining]}}
@!1c658bcbb5f794777a0b21be6c35f5bb6e12b9a6

The second version of the program has a straightforward solution and a
clever one. The simple way is to add another conditional “branch” to
precisely test the given condition. For the clever method, build up a
string containing the word or words to output, and print either this
word or the number if there is no word, potentially by making elegant
use of the `||` operator.
@!b1b55c948266fd75185ac2b1742bfed3a5f04737

hint}}
@!3dbd07a4feb660c295faadc27187dcb35eba8095

### Chess board
@!e319cb85d4a50711ae9b48f75542cb6b7162c0c9

{{index "chess board (exercise)", loop, [nesting, "of loops"], "newline character"}}
@!7b43d55855d0e9e893bf14fd7382d458190e6064

Write a program that creates a string that represents an 8×8 grid,
using newline characters to separate lines. At each position of the
grid there is either a space or a “#” character. The characters should
form a chess board.
@!f1512c61d30efed86a7ef6bbb54d8ee7f164c36a

Passing this string to `console.log` should show something like this:
@!ef41da890dcd499724e421dc0e7763928e10487f

```{lang: null}
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
```
@!c1fdf24775e2bccdd2944da052b09680c2f05162

When you have a program that generates this pattern, define a
((binding)) `size = 8` and change the program so that it works for
any `size`, outputting a grid of the given width and height.
@!cef86ccb39d7f2a0c224da38a3a518c241ecf4c1

{{if interactive
@!1d906d243f4d08a00110d2e5dbd0f8d690753fc7

```
// Your code here.
```
@!0eac4a7df53a4ee2a917d617aac39f2f32db5b77

if}}
@!4dec0c5cfe2b8cec18768db86ea9b363f53fa6d3

{{hint
@!2868e024ca16c5ab3e6f2d7030dbf87b4d1631e2

{{index "chess board (exercise)"}}
@!f6a94f5f3f522fb010a442ba05248c64276067c8

The string can be built by starting with an empty one (`""`) and
repeatedly adding characters. A newline character is written `"\n"`.
@!05e82bf70affe9832e27b35b0d41bb464f3694f6

Use `console.log` to inspect the output of your program.
@!c73c7759f9c17d7323cd1003afdef6931ef66c30

{{index [nesting, "of loops"]}}
@!2a13433716e7afcd871eda6e2e4ad6d56d06c9da

To work with two ((dimensions)), you will need a ((loop)) inside of a
loop. Put ((curly braces)) around the bodies of both loops to make it
easy to see where they start and end. Try to properly indent these
bodies. The order of the loops must follow the order in which we build
up the string (line by line, left to right, top to bottom). So the
outer loop handles the lines and the inner loop handles the characters
on a line.
@!723b3c8235285de093c0c262906d36215f5fd7ec

{{index "counter variable", "remainder operator", "% operator"}}
@!0112d3892b459df639ee8c580b2e4b99154420bc

You'll need two bindings to track your progress. To know whether to
put a space or a hash sign at a given position, you could test whether
the sum of the two counters is even (`% 2`).
@!9b1fcea4b81e19b0dc4eed0dfa467e33b62f2759

Terminating a line by adding a newline character happens after the
line has been built up, so do this after the inner loop but inside of
the outer loop.
@!2551479030fb9c53eeaae173ae26fa7f178f9296

hint}}
@!d3219ce40a9f31bb7a667d7674cc9f163cb44501