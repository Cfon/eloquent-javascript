{{meta {next_link: 01_values, load_files: ["code/intro.js"]}}}
@!6626b43a437643310a486558b2c090ebd1bf7c68

# Introduction
@!269c41d254278dd62dee8ffc34e3c25646d4927c

This is a book about getting ((computer))s to do what you want them to
do. Computers are about as common as screwdrivers today, but they contain a
lot more hidden complexity and thus are harder to operate and
understand. To many, they remain alien, slightly threatening things.
@!2d92abfd8a712c825fdbbd8bf3cd283d6acadb3e

{{figure {url: "img/generated/computer.png", alt: "Communicating with a computer"}}}
@!336d3a6b3d7289b9fa4454afc2da466dc6aae460

{{index "graphical user interface"}}
@!a17f97402cc5eac86ae53c523a7beffec334e92d

We've found two effective ways of
bridging the communication gap between us, squishy biological
organisms with a talent for social and spatial reasoning, and 
computers, unfeeling manipulators of meaningless data. The first is to
appeal to our sense of the physical world and build interfaces that
mimic that world and allow us to manipulate shapes on a screen with
our fingers. This works very well for casual machine interaction.
@!267a9883e9022dab340dfc31441ab31909aafd5a

{{index "programming language"}}
@!8c33247fcb0aa809f44152fe336676cd4e9128a8

But we have not yet found a good way to use
the point-and-click approach to communicate things to the computer
that the designer of the interface did not anticipate. For open-ended
interfaces, such as instructing the computer to perform arbitrary
tasks, we've had more luck with an approach that makes use of our
talent for language: teaching the machine a language.
@!08f27558b93a8f9eafa0b9400a1e46de8e8ee905

{{index "human language", expressivity}}
@!dfaa74a5df844f9dbef992dc07de161b952f31c6

Human languages allow words and
phrases to be combined in many ways, which allows us to say
many different things. Computer languages, though typically less
grammatically flexible, follow a similar principle.
@!07e9901641c500989f4e2a7eca4f96a82cb5ebd1

{{index [JavaScript, "availability of"], "casual computing"}}
@!277af85d31014f9031c3d4d99e8a53ce7ee58396

Casual computing
has become much more widespread in the past 20 years, and
language-based interfaces, which once were the default way in which
people interacted with computers, have largely been replaced with
graphical interfaces. But they are still there, if you know where to
look. One such language, JavaScript, is built into almost every
web ((browser)) and is thus available on just about every consumer
device.
@!f6fc53c9940ab11977c16e0c8d59e2a8f2524388

{{indexsee "web browser", browser}}
@!d9d2d835014d5694f1bdb1e37d4f50c109a432cc

This book intends to make you familiar
enough with this language to be able to make a computer do what you
want.
@!298389b47f864311b01c85ffd037de41e249db19

## On programming
@!3714ee1cf1d02ef9a0c9326e82ec547dc83ee535

{{quote {author: "Confucius"}
@!326713b0a9a0b35486771a9653fba0c5e6038a8a

{{index Confucius}}
@!d8373faa2e85e0b73f74b0fd89894af311bc0df4

I do not enlighten those who are not eager to learn,
nor arouse those who are not anxious to give an explanation
themselves. If I have presented one corner of the square and they
cannot come back to me with the other three, I should not go over the
points again.
@!14812c7e63c95970b1a44657718ef82efb7dffd5

quote}}
@!87ef68c4d64a01483fd861f19fd9aec7a669ab7f

{{index [programming, "difficulty of"]}}
@!a4e70fd381edcb6902205494b7db646553470817

Besides explaining JavaScript, I also
will introduce the basic principles of programming. Programming, it
turns out, is hard. The fundamental rules are typically simple and
clear. But programs built on top of these rules tend to become complex
enough to introduce their own rules and complexity. You're building
your own maze, in a way, and you might just get lost in it.
@!d7fc3d8650961bb82d2146bbc905424329cc5598

{{index learning}}
@!605f7d27b6fa227b0a396832f8a2044396c6c662

There will be times when reading this book feels terribly
frustrating. If you are new to programming, there will be a lot of new
material to digest. Much of this material will then be _combined_ in
ways that require you to make additional connections.
@!7461ecb70727a9191670aaebf18c00b5d3b3ef79

It is up to you to make the necessary effort. When you are struggling
to follow the book, do not jump to any conclusions about your own
capabilities. You are fine—you just need to keep at it. Take a break,
reread some material, and _always_ make sure you read and understand
the example programs and ((exercises)). Learning is hard work, but
everything you learn is yours and will make subsequent learning
easier.
@!ece586f9d5965f37ec8ef7ae63e39bc195d39cc1

{{quote {author: "Joseph Weizenbaum", title: "Computer Power and Human Reason"}
@!3153a9081fe71d376319f4451327cd2378efbc2a

{{index "Weizenbaum, Joseph"}}
@!dedba3627ff5974a1d6550cb07b483b1867e4578

The computer programmer is a creator of
universes for which he \[sic] alone is responsible. Universes of virtually
unlimited complexity can be created in the form of computer programs.
@!3f0cd3e7d1f3ddae06c0a5191d02702673c1952b

quote}}
@!8155fd766b5b6dedfa363738aafd22bcb0ba65e8

{{index [program, "nature of"], data}}
@!735fa4c148892e433f89040b0a32ba8b13062778

A program is many things. It is a
piece of text typed by a programmer, it is the directing force that
makes the computer do what it does, it is data in the computer's
memory, yet it controls the actions performed on this same memory.
Analogies that try to compare programs to objects we are familiar with
tend to fall short. A superficially fitting one is that of a
machine—lots of separate parts tend to be involved, and to make the
whole thing tick, we have to consider the ways in which these parts
interconnect and contribute to the operation of the whole.
@!4fd268b6a83199355bce0684c7034802111ec0b7

{{index computer}}
@!d2e20eef24f617a725bf60230fa233f6a42337cb

A computer is a machine built to act as a host for these
immaterial machines. Computers themselves can do only stupidly
straightforward things. The reason they are so useful is that they do
these things at an incredibly high speed. A program can ingeniously
combine an enormous number of these simple actions in order to do very
complicated things.
@!7502ce7193485129578e9db365861d8cd4d6a93b

{{index [programming, "joy of"]}}
@!dd7c32f4db645f6620ecf5b7c1b80db2d93662a2

To some of us, writing computer programs is a
fascinating game. A program is a building of thought. It is costless
to build, it is weightless, and it grows easily under our typing
hands.
@!1db0f8e24bdeb91221e73534b06e9aa4c85ab69b

But without care, a program's size and ((complexity)) will grow out of
control, confusing even the person who created it. Keeping programs
under control is the main problem of programming. When a program
works, it is beautiful. The art of programming is the skill of
controlling complexity. The great program is subdued—made simple in
its complexity.
@!403e4d942cd551f25f2b416550866acd1fd54af8

{{index "programming style", "best practices"}}
@!6f7d96233e735418cf98958c3322b5c797136997

Many programmers believe
that this complexity is best managed by using only a small set of
well-understood techniques in their programs. They have composed
strict rules (“best practices”) prescribing the form programs should
have, and the more zealous among them will consider those who go
outside of this safe little zone to be _bad_ programmers.
@!7baef1deb2fc8b4ddb6916752fdc1d4c2133dfc7

{{index experiment, learning}}
@!0c70d0873e4ee79abc8a3328856fe755585e0d49

What hostility to the richness of
programming—to try to reduce it to something straightforward and
predictable, to place a taboo on all the weird and beautiful programs!
The landscape of programming techniques is enormous, fascinating in
its diversity, and still largely unexplored. It is certainly dangerous
going, luring the inexperienced programmer into all kinds of
confusion, but that only means you should proceed with caution and
keep your wits about you. As you learn there will always be new
challenges and new territory to explore. Programmers who refuse to
keep exploring will stagnate, forget their joy, and get bored with
their craft.
@!44372343ea92c30580efa2d83bc96ce9751b53c5

## Why language matters
@!7a866e965aa89c383c7f65f321f76aed81f2f7f8

{{index "programming language", "machine code", "binary data"}}
@!6fb72d4e145137a489e24c089eb08061a26a6a04

In the
beginning, at the birth of computing, there were no programming
languages. Programs looked something like this:
@!fa87f8350332f643b35bf0cf1f5895c5928d1c39

```{lang: null}
00110001 00000000 00000000
00110001 00000001 00000001
00110011 00000001 00000010
01010001 00001011 00000010
00100010 00000010 00001000
01000011 00000001 00000000
01000001 00000001 00000001
00010000 00000010 00000000
01100010 00000000 00000000
```
@!3f07c207a29b299654bf9a6aaca28eecf4ffa6cf

{{index [programming, "history of"], "punch card", complexity}}
@!01da547d1dfd40e33f0a93aca7e352a1de05b526

That is a
program to add the numbers from 1 to 10 together and print out the
result: `1 + 2 + ... + 10 = 55`. It could run on a simple,
hypothetical machine. To program early computers, it was necessary to
set large arrays of switches in the right position or punch holes in
strips of cardboard and feed them to the computer. You can probably imagine
how tedious and error-prone this procedure was. Even writing simple
programs required much cleverness and discipline. Complex ones were
nearly inconceivable.
@!c627faa0c64f2834187fc4735c2d4f766b062586

{{index bit, "wizard (mighty)"}}
@!d0487f779c9d34a54e13e27e072fe375329087ba

Of course, manually entering these
arcane patterns of bits (the ones and zeros) did give the programmer
a profound sense of being a mighty wizard. And that has to be worth
something in terms of job satisfaction.
@!f80b4cd3228958034fba44065b09ba3559c49f81

{{index memory, instruction}}
@!c5e03ba261099ca4dbe988a03893d722a8fc2489

Each line of the previous program contains a
single instruction. It could be written in English like this:
@!545eef5fb2d090277ae56614d2b9ee46b794a66e

```{lang: "text/plain"}
1. Store the number 0 in memory location 0.
2. Store the number 1 in memory location 1.
3. Store the value of memory location 1 in memory location 2.
4. Subtract the number 11 from the value in memory location 2.
5. If the value in memory location 2 is the number 0,
   continue with instruction 9.
6. Add the value of memory location 1 to memory location 0.
7. Add the number 1 to the value of memory location 1.
8. Continue with instruction 3.
9. Output the value of memory location 0.
```
@!2be21007267db340927a740e7884533720c06f87

{{index readability, naming, variable}}
@!76bec2410b919c035b4d0ad461eae6692a9e00cf

Although that is already
more readable than the soup of bits, it is still rather unpleasant. It
might help to use names instead of numbers for the instructions and
memory locations.
@!a529268d33a4a1fe99f31147623b206962f58953

```{lang: "text/plain"}
 Set “total” to 0.
 Set “count” to 1.
[loop]
 Set “compare” to “count”.
 Subtract 11 from “compare”.
 If “compare” is zero, continue at [end].
 Add “count” to “total”.
 Add 1 to “count”.
 Continue at [loop].
[end]
 Output “total”.
```
@!4d21535763cc5b668cc215795b272dbe171c69ed

{{index loop, jump, "summing example"}}
@!a24e39899d2e980adffa4a87d9cc4cc44330de36

Can you see how the program
works at this point? The first two lines give
two memory locations their starting values: `total` will be used to
build up the result of the computation, and `count` will keep track of the
number that we are currently looking at. The lines using `compare` are
probably the weirdest ones. The program wants to see
whether `count` is equal to 11 in order to decide whether it can stop
running. Because our hypothetical machine is rather primitive, it can only
test whether a number is zero and make a decision (or jump) based on
that. So it uses the memory location labeled `compare` to compute the
value of `count - 11` and makes a decision based on that value. The
next two lines add the value of `count` to the result and increment
`count` by 1 every time the program has decided that `count` is not 11 yet.
@!fc23a77fc1a598d05fc60f5fcbd2fc28ec237da5

Here is the same program in JavaScript:
@!d9090620f80a675cdd8ef07aa190fcfffb623fe4

```
var total = 0, count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log(total);
// → 55
```
@!666fee928af27dc89f8a7807c1cfb07f8e61a533

{{index "while loop", loop}}
@!734119d650027a16e29424dcf26c7677cf34f6ea

This version gives us a few more improvements.
Most importantly, there is no need to specify the way we want the
program to jump back and forth anymore. The `while` language
construct takes care of that. It continues executing the block
(wrapped in braces) below it as long as the condition it was given
holds. That condition is `count <= 10`, which means “_count_ is less than or equal to
10”. We no longer have to create a temporary value and compare that
to zero, which was an uninteresting detail. Part of the power of
programming languages is that they take care of uninteresting details
for us.
@!38307905062300b24744a1bb9ad75688208638c8

{{index "console.log"}}
@!3c1a703878942191524bbe9f40998a0ffd82c2f8

At the end of the program, after the `while` construct has
finished, the `console.log` operation is applied to the result in
order to write it as output.
@!92d13f50d8a65a8043cdd498751afb6b010ef962

{{index "sum function", "range function", abstraction, function}}
@!bf8af0342a83848aaaf88e19a26f6d284c2b0426

Finally, here is what the
program could look like if we happened to have the convenient
operations `range` and `sum` available, which respectively create a
((collection)) of numbers within a range and compute the sum of a
collection of numbers:
@!a0558cabcfdfa9d9e91111d7d370f48cdd1a14bf

```{startCode: true}
console.log(sum(range(1, 10)));
// → 55
```
@!558ac9f865ae85a2bb47d63ae337753b9ddceede

{{index readability}}
@!addb8397e076c7f96a2a21b0559e3eede94959ff

The moral of this story is that the same program can
be expressed in long and short, unreadable and readable ways. The
first version of the program was extremely obscure, whereas this last
one is almost English: `log` the `sum` of the `range` of numbers from
1 to 10. (We will see in [later chapters](04_data.html#data) how to
build operations like `sum` and `range`.)
@!2be8036389a5ebd700ca1d75142ee75eb78331cf

{{index ["programming language", "power of"], composability}}
@!0d66340c2a8fa54d5172e2da612dafa4d97665bb

A good
programming language helps the programmer by allowing them to talk
about the actions that the computer has to perform on a higher level.
It helps omit uninteresting details, provides convenient building
blocks (such as `while` and `console.log`), allows you to define your
own building blocks (such as `sum` and `range`), and makes those blocks
easy to compose.
@!b4058ca5547ab643ff8ebbc83e001c2bcc591eb2

## What is JavaScript?
@!b361e0ad9e65b5a7b0591cb80ab10cd29df3480e

{{index history, Netscape, browser, "web application", JavaScript, [JavaScript, "history of"], "World Wide Web"}}
@!e0940cf9cef85470b2fcc905ccede6ce6958142a

{{indexsee WWW, "World Wide Web"}}
@!53ba8863fa382bce426891099c62d17dd485e72d

{{indexsee Web, "World Wide Web"}}
@!45c1d1c01a79959d970897e243973d9a3a0cff56

JavaScript was introduced in 1995 as a way to add programs to
web pages in the Netscape Navigator browser. The language has since
been adopted by all other major graphical web browsers. It has made modern
web applications possible—applications with which you can interact
directly, without doing a page reload for every action. But it is also used in more
traditional websites to provide various forms of interactivity and
cleverness.
@!9c783c8e8fb6801dea0f6aec194a5dfd6846d0a0

{{index Java, naming}}
@!0f9fc7db684e5d5ad6a6e8732ea6eb3754ffedd4

It is important to note that JavaScript has
almost nothing to do with the programming language named Java. The
similar name was inspired by marketing considerations, rather than
good judgment. When JavaScript was being introduced, the Java language
was being heavily marketed and was gaining popularity. Someone
thought it was a good idea to try to ride along on this success. Now we
are stuck with the name.
@!86927c2ba29d8b08c3e258ce33e859216fda8129

{{index ECMAScript, compatibility}}
@!68fdbf093220394dceb275d0fb87c7de0f7cfccb

After its adoption outside of
Netscape, a ((standard)) document was written to describe the way the
JavaScript language should work to make sure the various pieces of
software that claimed to support JavaScript were actually talking
about the same language. This is called the ECMAScript standard, after
the Ecma International organization that did the standardization. In
practice, the terms ECMAScript and JavaScript can be used interchangeably—they
are two names for the same language.
@!783d810f8c1c30a0569823e36302c6093c434720

{{index [JavaScript, "weaknesses of"], debugging}}
@!dc42e962c654ae742a1ceb6bd5c6c1e5ee695a67

There are those who will
say _terrible_ things about the JavaScript language. Many of these
things are true. When I was required to write something in JavaScript
for the first time, I quickly came to despise it. It would accept
almost anything I typed but interpret it in a way that was completely
different from what I meant. This had a lot to do with the fact that I
did not have a clue what I was doing, of course, but there is a real
issue here: JavaScript is ridiculously liberal in what it allows. The
idea behind this design was that it would make programming in
JavaScript easier for beginners. In actuality, it mostly makes finding
problems in your programs harder because the system will not point
them out to you.
@!7e8212212793470186f31b4b6addbb0a4f7b33c3

{{index [JavaScript, "flexibility of"], flexibility}}
@!8c6e7856a19c55507135f1d23ee925b3df1e99ca

This flexibility also
has its advantages, though. It leaves space for a lot of techniques
that are impossible in more rigid languages, and as you will see (for
example in [Chapter 10](10_modules.html#modules)) it
can be used to overcome some of JavaScript's shortcomings. After
((learning)) the language properly and working with it for a while, I have
learned to actually _like_ JavaScript.
@!5f717706966b1e215420259be25f7c5791bdbc41

{{index future, [JavaScript, "versions of"], ECMAScript, "ECMAScript 6"}}
@!121985ebf0d19febc75df54add8377bf319602b5

There have been several versions of JavaScript. ECMAScript
version 3 was the widely supported version in the time of
JavaScript's ascent to dominance, roughly between 2000 and 2010.
During this time, work was underway on an ambitious version 4, which
planned a number of radical improvements and extensions to the
language. Changing a living, widely used language in such a radical
way turned out to be politically difficult, and work on the version 4
was abandoned in 2008, leading to the much less ambitious version 5
coming out in 2009. We're now at the point where all major
browsers support version 5, which is the language version that
this book will be focusing on. A version 6 is in the process of
being finalized, and some browsers are starting to support new
features from this version.
@!d84fe02fed0d55e28ffb75e9ee4cef0e63240b26

{{index [JavaScript, "uses of"]}}
@!167c987b9ea6466030d3be6837ed045860971d85

Web browsers are not the only platforms on
which JavaScript is used. Some databases, such as MongoDB and CouchDB,
use JavaScript as their scripting and query language. Several
platforms for desktop and server programming, most notably the
((Node.js)) project (the subject of [Chapter 20](20_node.html#node)) are providing a powerful environment for programming JavaScript
outside of the browser.
@!d0530c3016b5b33b792af8b54f585ba778da4856

## Code, and what to do with it
@!a2fa234b52ae6fdc425fb0c52cdadfb97f5238e0

{{index "reading code", "writing code"}}
@!e56e1fc5a70fd5e7f462fe98753332e0b43a4c36

Code is the text that makes up
programs. Most chapters in this book contain quite a lot of it. In my
experience, reading code and writing ((code)) are indispensable parts of
((learning)) to program, so try to not just glance over the examples. Read
them attentively and understand them. This may be slow and confusing
at first, but I promise that you will quickly get the hang of it. The
same goes for the ((exercises)). Don't assume you understand them
until you've actually written a working solution.
@!d09a0155a865a82fe926a5a838dd5a1b08c4fbca

{{index interpretation}}
@!2eaa4847a6adacbf1a74e68bf680cfefa13af5d1

I recommend you try your solutions to exercises
in an actual JavaScript interpreter. That way, you'll get immediate feedback on
whether what you are doing is working, and, I hope, you'll be
tempted to ((experiment)) and go beyond the exercises.
@!0efc7096e948f80f4c22a700d869c5bcd7a4d97e

{{if interactive
@!90aeb98cf255e26508ec8cca0b755675495c8768

When reading this book in your browser, you can edit (and run) all
example programs by clicking them.
@!7a98ca3f356160b8877ba0ece6a17d7de25c00da

if}}
@!049da4657f50c9ea4d7156605656b28e8f88712f

{{if book
@!07735cf1761aba0a1f4e7d4c087598f7f22b0194

{{index download, sandbox, "running code"}}
@!259635a7987a01ca2175723f98db9f9dac459350

The easiest way to run
the example code in the book, and to experiment with it, is to look it
up in the online version of the book at
http://eloquentjavascript.net/[_eloquentjavascript.net_]. There, you
can click any code example to edit and run it and to see the
output it produces. To work on the exercises, go to
http://eloquentjavascript.net/code[_eloquentjavascript.net/code_],
which provides starting code for each coding exercise and allows you
to look at the solutions.
@!f814c6fd5b692b53f36ff4f03eb412b3a6c26800

if}}
@!2eb7b143f56f0adef7f967adb96bb7cf8048ebb3

{{index "developer tools", "JavaScript console"}}
@!926ea554a4417771019113f062ec4e093d9080d2

If you want to run the
programs defined in this book outside of the book's sandbox, some care
is required. Many examples stand on their own and should work in any
JavaScript environment. But code in later chapters is mostly written
for a specific environment (the browser or Node.js) and can run only
there. In addition, many chapters define bigger programs, and the
pieces of code that appear in them depend on each other or on external
files. The [sandbox](http://eloquentjavascript.net/code) on the website
provides links to Zip files containing all of the scripts and data
files necessary to run the code for a given chapter.
@!4bb23622a155f9990c027cf841967513d1ed658b

## Overview of this book
@!6a6bfc4caa3fa59f1173b2c8aa3233cc798086ea

This book contains roughly three parts. The first 11 chapters discuss
the JavaScript language itself. The next eight chapters are about web
((browsers)) and the way JavaScript is used to program them. Finally,
two chapters are devoted to ((Node.js)), another environment to program
JavaScript in.
@!62c93f0a24350b103867f88765efd629f13e0bb8

Throughout the book, there are five _project chapters_, which describe
larger example programs to give you a taste of real programming. In
order of appearance, we will work through building an
[artificial life simulation](07_elife.html#elife), a
[programming language](11_language.html#language), a
[platform game](15_game.html#game), a
[paint program](19_paint.html#paint), and a
[dynamic website](21_skillsharing.html#skillsharing).
@!afaf7c4c63f6ff36c46d3684464e1fb4d1e8461b

The language part of the book starts with four chapters to introduce
the basic structure of the JavaScript language. They introduce
[control structures](02_program_structure.html#program_structure)
(such as the `while` word you saw in this introduction),
[functions](03_functions.html#functions) (writing your own
operations), and [data structures](04_data.html#data). After these,
you will be able to write simple programs. Next, Chapters
[5](05_higher_order.html#higher_order) and
[6](06_object.html#object) introduce techniques to use functions
and objects to write more _abstract_ code and thus keep complexity
under control.
@!3426ec130f813c10158cf22a09f89f1b9f7bd8e9

After a [first project chapter](07_elife.html#elife), the first
part of the book continues with chapters on
[error handling and fixing](08_error.html#error), on
[regular expressions](09_regexp.html#regexp) (an important tool for
working with text data), and on
[modularity](10_modules.html#modules)—another weapon against
complexity. The [second project chapter](11_language.html#language)
concludes the first part of the book.
@!2648610dfb0bef12f9efc2c029e41f22a4096353

The second part, Chapters [12](12_browser.html#browser) to
[19](19_paint.html#paint), describes the tools that browser
JavaScript has access to. You'll learn to display things on the screen
(Chapters [13](13_dom.html#dom) and
[16](16_canvas.html#canvas)), respond to user input (Chapters
[14](14_event.html#event) and [18](18_forms.html#forms)), and
communicate over the network ([Chapter 17](17_http.html#http)).
There are again two project chapters in this part.
@!056cb1344f0f679584b79a45bf99fe19d4cd280c

After that, [Chapter 20](20_node.html#node) describes Node.js, and
[Chapter 21](21_skillsharing.html#skillsharing) builds a simple web
system using that tool.
@!09a12fd2b781acc1c3c3090b93d4b2b5f6443caf

{{if commercial
@!1ee9f39b7bb5c1a581ad85f1295fa8eecb9089a0

Finally, [Chapter 22](22_fast.html#fast) describes some of the
considerations that come up when optimizing JavaScript programs for
speed.
@!3d00b6783669042522a28301a335ec7db32a1d55

if}}
@!ced601cbee72af08f68502aae93347f7eb2c363d

## Typographic conventions
@!0f8873642f9b3eb6d6a9eee9c2d3f353e63439ac

{{index "factorial function"}}
@!cd0c97e983577523eff789155c982696c8092677

In this book, text written in a `monospaced`
font will represent elements of programs—sometimes
they are self-sufficient fragments, and sometimes they just refer to
part of a nearby program. Programs (of which you have already seen a
few), are written as follows:
@!1f1c78b524a325ddc47338f03da8c0c8700f7302

```
function fac(n) {
  if (n == 0)
    return 1;
  else
    return fac(n - 1) * n;
}
```
@!fb95c22b73dac7579d951e49847897f2b6207cc4

{{index "console.log"}}
@!cde5916d4ec31abd1c03f71c8bdd47cafc5d085f

Sometimes, in order to show the output that a program
produces, the expected output is written after it, with two slashes
and an arrow in front.
@!be188ca3180a3dee2d5039dc4ab984f3a1d5fbff

```
console.log(fac(8));
// → 40320
```
@!d2d0fffe25674757155afd95fde034291a0a483c

Good luck!
@!e98366319c85dbc9ef4750bd19a7a69c58b2aa96