{{meta {chap_num: 10, prev_link: 09_regexp, next_link: 11_language, load_files: ["code/chapter/10_modules.js", "code/loadfile.js"]}}}
@!f89e479574c0072948a2276ecfbf3d053c577d04

# Modules
@!60c756dd637a3de0871eaa35eb8fa431f4fb17b5

{{quote {author: "Barbara Liskov", title: "A design methodology for reliable software systems", chapter: true}
@!347955c4518555a883a66b32df19c603a9289808

Any user of a computer system is aware that current systems are
unreliable because of errors in their software components. While
system designers and implementers recognize the need for reliable
software, they have been unable to produce it.
@!9f94482fdcbaa31834436eaf5a557049f3ffc234

quote}}
@!8f7808d1e9835caff0ccc1e7aea9cb71b3684165

{{if interactive
@!ed4cea9fad70dace88cb7dd68ac2ee5e0672d90a

{{quote {author: "Master Yuan-Ma", title: "The Book of Programming", chapter: true}
@!a92a8ed978ba0e911aef0ca9baa0523a00f4ef0e

A beginning programmer writes her programs like an ant builds her
hill, one piece at a time, without thought for the bigger structure.
Her programs will be like loose sand. They may stand for a while, but
growing too big they fall apart.
@!22644efb22cd18f6f853887b2e01afc22480fe9d

Realizing this problem, the programmer will start to spend a lot of
time thinking about structure. Her programs will be rigidly
structured, like rock sculptures. They are solid, but when they must
change, violence must be done to them.
@!63c4fa00b595d83fcd521e48a303fc1954241ba1

The master programmer knows when to apply structure and when to leave
things in their simple form. Her programs are like clay, solid yet
malleable.
@!8c6085f02c32c39c9655419335222773db12baf5

quote}}
@!bd491403bf47f53f958b34373428f76c45a30eee

if}}
@!301fa21c993ab23366c9719a899b69aa3a1c1884

{{index organization, "code structure"}}
@!a29cd28a69a198bdab55a7c01cd28f72b73492aa

Every program has a shape. On
a small scale, this shape is determined by its division into
((function))s and the blocks inside those functions. Programmers have
a lot of freedom in the way they structure their programs. Shape follows
more from the ((taste)) of the programmer than from the program's
intended functionality.
@!b8fecfeedc136de89a441ca88812d08ddc4c1364

{{index readability}}
@!16258c9f43743e2a3d16f9898006f42338c70780

When looking at a larger program in its entirety,
individual functions start to blend into the background. Such a
program can be made more readable if we have a larger unit of
organization.
@!84c787e193fba832e64b9f5f476dab955ee0931c

_Modules_ divide programs into clusters of code that, by _some_
criterion, belong together. This chapter explores some of the benefits
that such division provides and shows techniques for building
((module))s in JavaScript.
@!f13677c233d2137d4dd0a400c4011d9658aab019

## Why modules help
@!44704cdeea7a2c322cb442ce7119ec1472e9dc6f

{{index "book analogy", organization}}
@!c08767de0982ed526a6aefe841fcaa41fba29ef1

There are a number of reasons why
authors divide their books into ((chapter))s and sections. These
divisions make it easier for a reader to see how the book is built up
and to find specific parts that they are interested in. They also help
the _author_ by providing a clear focus for every section.
@!b89b442b9d90705edbaf4299d91206190f257cab

The benefits of organizing a program into several ((file))s or
((module))s are similar. Structure helps people who aren't yet
familiar with the code find what they are looking for and makes it
easier for the programmer to keep things that are related
close together.
@!ea9856c8d87d3c8e87f11dd268d1c7709a930925

{{index "project chapter", readability, interconnection}}
@!3dbe7edd889ed2bc9275cb0783d73023df682e5d

Some
programs are even organized along the model of a traditional ((text)),
with a well-defined order in which the reader is encouraged to go
through the program and with lots of prose (comments) providing a coherent
description of the code. This makes reading the program a lot less
intimidating—reading unknown code is usually intimidating—but has the
downside of being more work to set up. It also makes the program more
difficult to change because prose tends to be more tightly
interconnected than code. This style is called _((literate
programming))_. The “project” chapters of this book can be considered
literate programs.
@!ef3d8ee0e46a2d128dbeeca4816aa20e2fe97c7a

{{index minimalism, evolution, structure, organization}}
@!0afc02bde7ba96180606b95e6aa43f521b24822e

As a
general rule, structuring things costs energy. In the early stages of
a project, when you are not quite sure yet what goes where or what
kind of ((module))s the program needs at all, I endorse a minimalist,
structureless attitude. Just put everything wherever it is convenient
to put it until the code stabilizes. That way, you won't be wasting
time moving pieces of the program back and forth, and you won't
accidentally lock yourself into a structure that does not actually fit
your program.
@!a7656fe8ee2cfd8efd9e6c3000f94be506b958f8

### Namespacing
@!b0d522cc1417e2932ab43a57a45fed263c4622fc

{{index encapsulation, isolation, "global scope", "local scope"}}
@!88abc88986c4f0ce312d8b15e409bd550da0568c

Most modern ((programming language))s have a
((scope)) level between _global_ (everyone can see it) and _local_
(only this function can see it). JavaScript does not. Thus, by
default, everything that needs to be visible outside of the scope of a
top-level function is visible _everywhere_.
@!1eaa0751e53ea0627d81adb1db46049c13175aa2

{{index "namespace pollution"}}
@!6ca4ed1fbd2a84a1da9d2933f5534dd575d089cd

Namespace pollution, the problem of a lot of
unrelated code having to share a single set of global variable names,
was mentioned in [Chapter 4](04_data.html#namespace_pollution),
where the `Math` object was given as an example of an object that acts
like a module by grouping math-related functionality.
@!3841eb8e47a175dd2adbe5edd23109b20de29997

{{index [function, "as namespace"]}}
@!10598baf0f36e7cf7c69c6a1891a178773a6aea6

Though JavaScript provides no actual
((module)) construct yet, objects can be used to create publicly
accessible sub((namespace))s, and functions can be used to create an
isolated, private namespace inside of a module. Later in this chapter,
I will discuss a way to build reasonably convenient, namespace-isolating
modules on top of the primitive concepts that JavaScript gives us.
@!f1e54d4398f1073ffb13c160630200fb9a8678f4

### Reuse
@!68fc7d7a32ab207f13b362e86e92b1440fb01201

{{index "version control", bug, "copy-paste programming", "ini file", dependency, structure}}
@!8003ba1ea3965d5d4e9fe9c1b03e28540789859d

In a “flat” project, which isn't
structured as a set of ((module))s, it is not apparent which parts of
the code are needed to use a particular function. In my program for
spying on my enemies (see [Chapter 9](09_regexp.html#ini)), I wrote
a function for reading configuration files. If I want to use that
function in another project, I must go and copy out the parts of the
old program that look like they are relevant to the functionality that
I need and paste them into my new program. Then, if I find a mistake
in that code, I'll fix it only in whichever program that I'm working
with at the time and forget to also fix it in the other program.
@!6f8e7c6619daeafda5a443d4de10fa9cb8174f7d

{{index duplication}}
@!4420b751f5d3761447059cb97a7b295128a4f15a

Once you have lots of such shared, duplicated pieces
of code, you will find yourself wasting a lot of time and energy on
moving them around and keeping them up-to-date.
@!efb914ee95dd733477042705188eed78d3b49539

{{index reuse}}
@!f62ebcc6f8db70ee6b28ed5a4b4f9f2e7875f55d

Putting pieces of functionality that stand on their own
into separate files and modules makes them easier to track, update,
and share because all the various pieces of code that want to use the
module load it from the same actual file.
@!8c8a0f267bc4ea1208cba8c2ff052bbef3b0a0e1

{{index dependency, library, installation, upgrading}}
@!e8b3d196364bdeeac1c0e01fc0c0b3f9b2bd2f32

This
idea gets even more powerful when the relations between modules—which
other modules each module depends on—are explicitly stated. You can
then automate the process of installing and upgrading external modules
(_libraries_).
@!7039e1efc1850e148f87a36f5a6a2812dcc9f408

{{index "package manager", download, reuse}}
@!1eaf0e3f6af9a19ef720d6b31ec9440a2ec8eb68

Taking this idea even
further, imagine an online service that tracks and distributes
hundreds of thousands of such libraries, allowing you to search for
the functionality you need and, once you find it, set up your project
to automatically download it.
@!f26b03c417c1184265632018f24330cfb8cbd7ca

{{index NPM}}
@!2d50a2446f57a1d26a3ec2313f36c2028f4abe83

{{id modules_npm}}
@!c166335e0c0351dafd75f4fbb1f2ee9e0b2c3965

This service exists. It is called NPM
(http://npmjs.org[_npmjs.org_]). NPM consists of an online database of
modules and a tool for downloading and upgrading the modules your
program depends on. It grew out of ((Node.js)), the browserless
JavaScript environment we will discuss in
[Chapter 20](20_node.html#node), but can also be useful when
programming for the browser.
@!431a92924a6862976be9070197396ca32743afcf

### Decoupling
@!50df965e6dbaa0b7d8653a93f4a5cfd1328bf2df

{{index isolation, decoupling, "backward compatibility"}}
@!3971526351071f72a040644e832e486291a96d13

Another important role of modules is isolating pieces
of code from each other, in the same way that the object interfaces
from [Chapter 6](06_object.html#interface) do. A well-designed
module will provide an interface for external code to use. As the
module gets updated with ((bug)) fixes and new functionality, the
existing ((interface)) stays the same (it is _stable_) so that other
modules can use the new, improved version without any changes to
themselves.
@!5feab7e757ee7b302288924fc6f0458402cbf9c2

{{index stability}}
@!e31f10d79ac2273cb9741fb068d50cba122e8e0b

Note that a stable interface does not mean no new
functions, methods, or variables are added. It just means that
existing functionality isn't removed and its meaning is not changed.
@!c1a673234a1085a85e53c5e6e0bf3314b7c185f4

{{index "implementation detail", encapsulation}}
@!741ef265c97dfdd792bf52cdf3968c25133ff210

A good ((module))
((interface)) should allow the module to grow without breaking the old
interface. This means exposing as few of the module's internal
concepts as possible while also making the “language” that the
interface exposes powerful and flexible enough to be applicable in a
wide range of situations.
@!4ad890a192122192aca2b5a7d4c4a0f47f7ebe38

{{index [interface, design]}}
@!6a9733cb6c3159e9c31afcb6000904096413e99f

For interfaces that expose a single, focused
concept, such as a configuration file reader, this design comes
naturally. For others, such as a text editor, which has many different
aspects that external code might need to access (content, styling,
user actions, and so on), it requires careful design.
@!ed5e958df208c7765df90fff155ee0e175187232

## Using functions as namespaces
@!672f2ed938e5c95b86f4c1d3a48503fc977366fb

{{index namespace, [function, "as namespace"]}}
@!8edac64c21e193f5f768440e2cf2f35ede93482c

Functions are the only things in
JavaScript that create a new ((scope)). So if we want our ((module))s
to have their own scope, we will have to base them on functions.
@!8d62fd977765ba827988b1f1f7a6ee1e02f695dd

{{index "weekday example", "Date type", "getDay method"}}
@!357932c118a82e89e35bf7e7a187e450c5abecc0

Consider this
trivial module for associating names with day-of-the-week numbers, as
returned by a `Date` object's `getDay` method:
@!bfd9717f5acc92f92bb1d6c393a091846637995a

```
var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
             "Thursday", "Friday", "Saturday"];
function dayName(number) {
  return names[number];
}

console.log(dayName(1));
// → Monday
```
@!29f12b0441491a11c1b9e18eec9f105d815647dd

{{index "access control", encapsulation}}
@!e029d6ef5a4f924c4b2aa8187f9df02e9915e81f

The `dayName` function is part
of the module's ((interface)), but the `names` variable is not. We
would prefer _not_ to spill it into the ((global scope)).
@!c794e6bd7ed7d6905cf048993bd0fc25b98ed438

We can do this:
@!7202ccce6c043b4d92794ee7730bcc0a959e0c9d

```
var dayName = function() {
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
               "Thursday", "Friday", "Saturday"];
  return function(number) {
    return names[number];
  };
}();

console.log(dayName(3));
// → Wednesday
```
@!c9793c33ef96e86c598beda128958eb6e3e30447

{{index "anonymous function"}}
@!c7ed1aba3b55c6c52fa3cc8620572efa44000c9c

Now `names` is a local variable in an
(unnamed) function. This function is created and immediately called,
and its return value (the actual `dayName` function) is stored in a
variable. We could have pages and pages of code in this function, with
100 local variables, and they would all be internal to our
module—visible to the module itself but not to outside code.
@!695b6cdf87c7f0f84ff9c2c2e732a8bf28bda9f5

{{index isolation, "side effect"}}
@!ed5f8902666388a19a6e1015116e5455822d4351

We can use a similar pattern to
isolate code from the outside world entirely. The following module logs a
value to the console but does not actually provide any values for
other modules to use:
@!095c4136c162b763a53f03db440991a85abcae12

```
(function() {
  function square(x) { return x * x; }
  var hundred = 100;

console.log(square(hundred));
})();
// → 10000
```
@!d0fb3d6bcd14cd3a9e1d672a735946c10f9c23aa

{{index "namespace pollution"}}
@!70dd713d7eeee0e9fe7c18fd626db8aa70fbe55b

This code simply outputs the square of 100,
but in the real world it could be a module that adds a method
to some ((prototype)) or sets up a widget on a web page. It is
wrapped in a function to prevent the variables it uses internally from
polluting the ((global scope)).
@!11459dbb0b7a6ab650d4ec39930310f4027ec33c

{{index parsing, "function keyword"}}
@!cf6c3697b1a7943b4081d7d67d70ec7bc0b9a478

Why did we wrap the namespace
function in a pair of ((parentheses))? This has to do with a quirk in
JavaScript's ((syntax)). If an _((expression))_ starts with the
keyword `function`, it is a function expression. However, if a
_((statement))_ starts with `function`, it is a function
_declaration_, which requires a name and, not being an expression,
cannot be called by writing parentheses after it. You can think of the
extra wrapping parentheses as a trick to force the function to be
interpreted as an expression.
@!3c4f1ba53a8d8e0b37e44da679033a58b6783e99

## Objects as interfaces
@!496cb48554a663bdb64750f1daf23bf0b1e2c1bd

{{index interface}}
@!6d2d3fc00b328c25bf101cae6fe1f5bf555e633e

Now imagine that we want to add another function to our
day-of-the-week module, one that goes from a day name to a
number. We can't simply return the function anymore but must wrap the
two functions in an object.
@!ce8dff385b36361e4a97e93e80ba570691e41e51

```
var weekDay = function() {
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
               "Thursday", "Friday", "Saturday"];
  return {
    name: function(number) { return names[number]; },
    number: function(name) { return names.indexOf(name); }
  };
}();

console.log(weekDay.name(weekDay.number("Sunday")));
// → Sunday
```
@!e4e715ac6f016ef5173846d4b38de6c07605ed53

{{index exporting, "exports object", this}}
@!fd6552b3cf7f020ad9545204858daa845701469b

For bigger ((module))s,
gathering all the _exported_ values into an object at the end of the
function becomes awkward since many of the exported functions are
likely to be big and you'd prefer to write them somewhere else, near
related internal code. A convenient alternative is to declare an
object (conventionally named `exports`) and add properties to that
whenever we are defining something that needs to be exported. In the
following example, the module function takes its interface object as
an argument, allowing code outside of the function to create it and store
it in a variable. (Outside of a function, `this` refers to the global
scope object.)
@!f5d39a09508d3de5276dd596862b653cb47cc71c

```
(function(exports) {
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
               "Thursday", "Friday", "Saturday"];

exports.name = function(number) {
    return names[number];
  };
  exports.number = function(name) {
    return names.indexOf(name);
  };
})(this.weekDay = {});

console.log(weekDay.name(weekDay.number("Saturday")));
// → Saturday
```
@!d130bb2599f5fecdd4e452acbc0e6427eee40545

## Detaching from the global scope
@!469a53706191d9a76235b4b52fe266ce7f4c026e

{{index [variable, global]}}
@!c7666f34148da16d8f4e1fef63ce6ec776ccc210

The previous pattern is commonly used by JavaScript
modules intended for the ((browser)). The module will claim a single
global variable and wrap its code in a function in order to have its
own private ((namespace)). But this pattern still causes problems if
multiple modules happen to claim the same name or if you want to load
two ((version))s of a module alongside each other.
@!a1e7ecc10ae81bc16258a7fb0410f9dfc79740b1

{{index "module loader", "require function", CommonJS, dependency}}
@!e55f416a939b4462caa0556da030cbdbbe25f3c2

With a little plumbing, we
can create a system that allows one ((module)) to directly ask for the
((interface)) object of another module, without going through the
global scope. Our goal is a `require` function that, when given a
module name, will load that module's file (from disk or the Web,
depending on the platform we are running on) and return the
appropriate interface value.
@!88d81c9a7469c4618c327c18e5a43b7f42129619

This approach solves the problems mentioned previously and has the added
benefit of making your program's dependencies explicit, making it
harder to accidentally make use of some module without stating that
you need it.
@!8f8d2f1d3f4a6f76d7d73fc3f2414b8985c96419

{{index "readFile function", "require function"}}
@!5c5598ad3098a72e15bca736d6d3a3cfccd85bda

For `require` we need two
things. First, we want a function `readFile`, which returns the
content of a given file as a string. (A single such function is not
present in ((standard)) JavaScript, but different JavaScript
environments, such as the browser and Node.js, provide their own ways
of accessing ((file))s. For now, let's just pretend we have this
function.) Second, we need to be able to actually execute this
string as JavaScript code.
@!19dd00cd7c9f10ff245e1f7ca167fc7b4c6fbfdb

{{id eval}}
@!bbec820ff3a7bb58e480a61efa261ff01668a24c

## Evaluating data as code
@!f5a905a384d6f128669d42807c3c33ea8b211a9b

{{index evaluation, interpretation}}
@!1b7a2ba6e0c9e0c2360a367243dda3e04f4ff35f

There are several ways to take
data (a string of code) and run it as part of the current program.
@!a0fda5fbac29a50611d4b8137ace2943a3ed9b97

{{index isolation, eval}}
@!cf7c3ce8ad9e46a243113c99732b01a7d9ff7d4b

The most obvious way is the special operator
`eval`, which will execute a string of code in the _current_ scope.
This is usually a bad idea because it breaks some of the sane
properties that scopes normally have, such as being isolated from the
outside world.
@!c8c944997d16312be6ad2fd2b018e08714bf74a1

```
function evalAndReturnX(code) {
  eval(code);
  return x;
}

console.log(evalAndReturnX("var x = 2"));
// → 2
```
@!81d48b53387ecbcf93d81bbce61610097739db04

{{index "Function constructor"}}
@!ce77d7b1bb14b0c1978d261fb46adfdbafe08eac

A better way of interpreting data as code is
to use the `Function` constructor. This takes two arguments: a string
containing a comma-separated list of argument names and a string
containing the function's body.
@!f71fddcf3aa40521042e770150549a792789ce1a

```
var plusOne = new Function("n", "return n + 1;");
console.log(plusOne(4));
// → 5
```
@!14086c8e3e362fd55c39f4b63ba752fe11f32f9c

This is precisely what we need for our modules. We can wrap a module's
code in a function, with that function's scope becoming our module
((scope)).
@!8ad0a8bcea7249c3b5c5bf78cf15c4734a5b9182

{{id commonjs}}
@!52588f1e1b630b11566091d695d60d54321c1fe7

## Require
@!bd9841bb815161f4c10bdbd52aee3dbd14c25904

{{index "require function", CommonJS}}
@!8bb29e9f159b4a75fe319a2a37b9d28c9e3686ed

The following is a minimal
implementation of `require`:
@!bf0a00c8f36436363eacdc8fc5634e27d3827ddb

```{test: wrap}
function require(name) {
  var code = new Function("exports", readFile(name));
  var exports = {};
  code(exports);
  return exports;
}

console.log(require("weekDay").name(1));
// → Monday
```
@!754261adc2a58dba9379976d497a99cbf495a9ee

{{index "weekday example", "exports object", "Function constructor"}}
@!f1ba0b6cd3f93d3e5c81f3f45aa94735e1ebb105

Since the `new Function` constructor wraps the module
code in a function, we don't have to write a wrapping ((namespace))
function in the module file itself. And since we make `exports` an
argument to the module function, the module does not have to declare
it. This removes a lot of clutter from our example module.
@!f23a5a108c229431afa22f74636def72476dec1c

```
var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
             "Thursday", "Friday", "Saturday"];

exports.name = function(number) {
  return names[number];
};
exports.number = function(name) {
  return names.indexOf(name);
};
```
@!69b4fd5c4e3d83b7ed5fbf0e6d1e289ec7218d65

{{index "require function"}}
@!2ee3d131283d7e8a9d3231f46bdeb8dff973492b

When using this pattern, a ((module)) typically
starts with a few variable declarations that load the modules it
depends on.
@!8a2bf7cd5523a1fca6a9c398d04645f9dade49d5

```{test: no}
var weekDay = require("weekDay");
var today = require("today");

console.log(weekDay.name(today.dayNumber()));
```
@!b91b7ac7c07f58c0874018d9ccf507fe869b7ecd

{{index efficiency}}
@!41717503164f0c60d352488650ded5f7b1325c7b

The simplistic implementation of `require` given previously
has several problems. For one, it will load and run a module every
time it is _require_d, so if several modules have the same
dependency or a `require` call is put inside a function that will
be called multiple times, time and energy will be wasted.
@!f1745db71bfe2ddd3ebaa526d81839b3d20a9c70

{{index cache}}
@!1d7cc5f7fd0c07aa600c1e898b36a36f94afce9a

This can be solved by storing the modules that have already
been loaded in an object and simply returning the existing value when
one is loaded multiple times.
@!a0963682d85c6ef2948eb8215879f80e728c9620

{{index "exports object", exporting}}
@!b89bd19d57a3aa797089337f6f4f4284d230a303

The second problem is that it is
not possible for a module to directly export a value other than the
`exports` object, such as a function. For example, a module might want
to export only the constructor of the object type it defines. Right
now, it cannot do that because `require` always uses the `exports`
object it creates as the exported value.
@!76bc5b634bb7a49b1b5872684546205e658b2d70

{{index "module object"}}
@!7318f7e893c1073704ef39f95b1a88b2387e2b73

The traditional solution for this is to provide
modules with another variable, `module`, which is an object that has a
property `exports`. This property initially points at the empty object
created by `require` but can be overwritten with another value in
order to export something else.
@!588339c6b85716a87a7dd3d8a0dd7b84055d06bc

```{includeCode: true, test: wrap}
function require(name) {
  if (name in require.cache)
    return require.cache[name];

var code = new Function("exports, module", readFile(name));
  var exports = {}, module = {exports: exports};
  code(exports, module);

require.cache[name] = module.exports;
  return module.exports;
}
require.cache = Object.create(null);
```
@!126bc152b9c0c8598c0778f255fa8ae32352e629

{{index "require function"}}
@!c591bc62af4139a51c0cf21e3e3fb50611a18fd0

We now have a module system that uses a single
global variable (`require`) to allow modules to find and use each
other without going through the ((global scope)).
@!72b732a2a1d5b7dc2e994afee44b8c067ecc142d

This style of module system is called _((CommonJS)) modules_, after
the pseudo-((standard)) that first specified it. It is built into the
((Node.js)) system. Real implementations do a lot more than the
example I showed. Most importantly, they have a much more intelligent
way of going from a module name to an actual piece of code, allowing
both pathnames relative to the current file and module names that
point directly to locally installed modules.
@!49fb9f3cff39b30d4a1bdb2e30c09b93936ccf8c

{{id amd}}
@!2d1c2aabfa88afedab48267903baf22e91d60bda

## Slow-loading modules
@!a87a40b31c70089b2f0f858fc53f0096b5fafb00

{{index loading, "synchronous I/O", blocking, "World Wide Web"}}
@!f3ba09890e7695ef71b1d6d0dc7685d88bab5fc8

Though it is possible to use the CommonJS module style when
writing JavaScript for the ((browser)), it is somewhat involved. The
reason for this is that reading a file (module) from the Web is a lot
slower than reading it from the hard disk. While a script is running
in the browser, nothing else can happen to the website on which it
runs, for reasons that will become clear in
[Chapter 14](14_event.html#timeline). This means that if every
`require` call went and fetched something from some faraway web
server, the page would freeze for a painfully long time while loading
its scripts.
@!43a514a3534de7b0e564770901b7f32cd5097873

{{index Browserify, "require function", preprocessing}}
@!a7561cb89e92f55f12543e5b9cce9483bc92296c

One way to
work around this problem is to run a program like
http://browserify.org[_Browserify_] on your code before you serve it
on a web page. This will look for calls to `require`, resolve all
dependencies, and gather the needed code into a single big file.
The website itself can simply load this file to get all the modules
it needs.
@!9d4a5b635863d4de20f8026883b8197eadd0c941

{{index AMD, dependency, "asynchronous I/O"}}
@!0bbe2859acef436c34ee8f3b8d392fa85d98845b

Another solution is to wrap the
code that makes up your module in a function so that the ((module
loader)) can first load its dependencies in the background and then
call the function, initializing the ((module)), when the dependencies
have been loaded. That is what the Asynchronous Module Definition
(AMD) module system does.
@!79e5fd9088cedc868c1e50bc64d53eae89c3572e

{{index "weekday example"}}
@!0b2761b32340224b3bcd8c118e4f78c0dcd9a873

Our trivial program with dependencies would look
like this in AMD:
@!55deb7cc9255d8cc17af79704e41ac50b9377cc8

```{test: no}
define(["weekDay", "today"], function(weekDay, today) {
  console.log(weekDay.name(today.dayNumber()));
});
```
@!35f766cd1b3d8f232a4b2cf522b598cc8944a2d8

{{index "define function", "asynchronous programming"}}
@!c671dfbe1c7f67e24ee5d784d85558b6566df5a2

The `define`
function is central to this approach. It takes first an array of
module names and then a function that takes one argument for each
dependency. It will load the dependencies (if they haven't already
been loaded) in the background, allowing the page to continue working
while the files are being fetched. Once all dependencies are loaded,
`define` will call the function it was given, with the ((interface))s
of those dependencies as arguments.
@!433e6235147fdd06b9be2269e2094821a014a81c

{{index "weekday example", "define function"}}
@!3604b7d2ea432d19da8f983ad2a9c3cefd1d7928

The modules that are loaded
this way must themselves contain a call to `define`. The value used as
their interface is whatever was returned by the function passed to
`define`. Here is the `weekDay` module again:
@!539a122c2c0898acdac698522026deb4c28d0988

```
define([], function() {
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
               "Thursday", "Friday", "Saturday"];
  return {
    name: function(number) { return names[number]; },
    number: function(name) { return names.indexOf(name); }
  };
});
```
@!cf1a0fe318c223f2829fee317f058b7babe20c6c

{{index "define function", "backgroundReadFile function"}}
@!07c38779004bad12d41d495f7cdf4ca0e70e8ed2

To be
able to show a minimal implementation of `define`, we will pretend we
have a `backgroundReadFile` function that takes a filename and a
function and calls the function with the content of the file as
soon as it has finished loading it. (link:17_http.html#getURL[Chapter
17] will explain how to write that function.)
@!b2c406aa1ad8c27f822c6ed227d57414d0a13884

For the purpose of keeping track of modules while they are being
loaded, the implementation of `define` will use objects that describe
the state of modules, telling us whether they are available yet and
providing their interface when they are.
@!296d7a51220b9cad2e9494d62202f0e1e791dcc6

The `getModule` function, when given a name, will return such an
object and ensure that the module is scheduled to be loaded. It uses
a ((cache)) object to avoid loading the same module twice.
@!160ff599517eb66e20a6c6ac3bee70cf1ba0505d

```{includeCode: true}
var defineCache = Object.create(null);
var currentMod = null;

function getModule(name) {
  if (name in defineCache)
    return defineCache[name];

var module = {exports: null,
                loaded: false,
                onLoad: []};
  defineCache[name] = module;
  backgroundReadFile(name, function(code) {
    currentMod = module;
    new Function("", code)();
  });
  return module;
}
```
@!dc6f59e65113dd5d94a39f09cf26f2310dd34e40

{{index "define function"}}
@!f3b39c4988403bc6e2b58e1f45aecbd40d47479e

We assume the loaded file also contains a
(single) call to `define`. The `currentMod` variable is used to tell
this call about the module object that is currently being loaded so
that it can update this object when it finishes loading. We will come
back to this mechanism in a moment.
@!479a133be6c8f5324812d35268f8868bf26baaf7

{{index dependency, "Function constructor", "asynchronous programming", "event handling"}}
@!909cf3b73078d70a7f169660ded376afa976dd3a

The `define` function itself uses
`getModule` to fetch or create the module objects for the current
module's dependencies. Its task is to schedule the `moduleFunction`
(the function that contains the module's actual code) to be run
whenever those dependencies are loaded. For this purpose, it defines a
function `whenDepsLoaded` that is added to the `onLoad` array of all
dependencies that are not yet loaded. This function immediately
returns if there are still unloaded dependencies, so it will do
actual work only once, when the last dependency has finished loading. It is
also called immediately, from `define` itself, in case there are no
dependencies that need to be loaded.
@!bd0b983c7f0cb3231a76e532c0774b114e495669

```{includeCode: true}
function define(depNames, moduleFunction) {
  var myMod = currentMod;
  var deps = depNames.map(getModule);

deps.forEach(function(mod) {
    if (!mod.loaded)
      mod.onLoad.push(whenDepsLoaded);
  });

function whenDepsLoaded() {
    if (!deps.every(function(m) { return m.loaded; }))
      return;

var args = deps.map(function(m) { return m.exports; });
    var exports = moduleFunction.apply(null, args);
    if (myMod) {
      myMod.exports = exports;
      myMod.loaded = true;
      myMod.onLoad.forEach(function(f) { f(); });
    }
  }
  whenDepsLoaded();
}
```
@!039037c92ad671d1d95c875ee9e34f478c2e407b

{{index "define function"}}
@!64ed2c1cafea2ae573d2829dfb3fb417a4ffe63e

When all dependencies are available,
`whenDepsLoaded` calls the function that holds the module, giving it
the dependencies’ interfaces as arguments.
@!d80b93133dc7ff37e2bb47794fdbfc12e3ba4b0e

The first thing `define` does is store the value that `currentMod` had
when it was called in a variable `myMod`. Remember that `getModule`,
just before evaluating the code for a module, stored the corresponding
module object in `currentMod`. This allows `whenDepsLoaded` to store
the return value of the module function in that module's `exports`
property, set the module's `loaded` property to true, and call all the
functions that are waiting for the module to load.
@!4c28eb928caab9c57f141981f1a4716951b11261

{{index "asynchronous programming"}}
@!906b4a961ff6e05c14fe49001454d242606ac3e8

This code is a lot harder to follow than
the `require` function. Its execution does not follow a simple,
predictable path. Instead, multiple operations are set up to happen at
some unspecified time in the ((future)), which obscures the way the
code executes.
@!d94a9bfe57110d2a75c8ad31670184ee57dcecca

A real ((AMD)) implementation is, again, quite a lot more clever about
resolving module names to actual URLs and generally more robust than
the one shown previously. The _((RequireJS))_ (http://requirejs.org[_requirejs.org_]) project provides
a popular implementation of this style of ((module loader)).
@!47d7afa0468db1bf87f0c8d2677ca52998adc19e

## Interface design
@!e5b338fe507b7052c81d06f40974713807275ca9

{{index [interface, design]}}
@!d5446411d1807396bc4a3975d16deb7431618d3a

Designing interfaces for modules and object
types is one of the subtler aspects of programming. Any nontrivial
piece of functionality can be modeled in various ways. Finding a way that
works well requires insight and foresight.
@!db8e8ec154c48b2015a62fedc10ed135afae8ef0

The best way to learn the value of good interface design is to use
lots of interfaces—some good, some bad. Experience will teach
you what works and what doesn't. Never assume that a painful interface
is “just the way it is”. Fix it, or wrap it in a new interface that
works better for you.
@!2d02c49090a2f77a3bfc92b27df98c8e8a263137

### Predictability
@!205bc09469e1dd750398f3a5cab6417a3354cf42

{{index documentation, predictability, convention}}
@!b44af5f005666dc6bb6bb4f43549bea71213f73d

If programmers
can predict the way your interface works, they (or you) won't get
sidetracked as often by the need to look up how to use it. Thus, try
to follow conventions. When there is another module or part of the
standard JavaScript environment that does something similar to what
you are implementing, it might be a good idea to make your interface
resemble the existing interface. That way, it'll feel familiar to
people who know the existing interface.
@!0e59d6546165be487d3af283c2bd92de5f8f3a67

{{index cleverness}}
@!b148705d6b4404fa79a78844c37d8c86897cc3d7

Another area where predictability is important is the
actual _behavior_ of your code. It can be tempting to make an
unnecessarily clever interface with the justification that it's more
convenient to use. For example, you could accept all kinds of
different types and combinations of arguments and do the “right
thing” for all of them. Or you could provide dozens of specialized
convenience functions that provide slightly different flavors of your
module's functionality. These might make code that builds on your
interface slightly shorter, but they will also make it much harder for
people to build a clear ((mental model)) of the module's behavior.
@!0a9a8641961598dc5b8cdf429bb94b827aeabbcb

### Composability
@!da56ab8287cfb26219c0577114bc4d27385d99f2

{{index composability}}
@!75628806a15a7d1a488bcef6a28b9390d3393df8

In your interfaces, try to use the simplest ((data
structure))s possible and make functions do a single, clear thing.
Whenever practical, make them ((pure function))s (see
[Chapter 3](03_functions.html#pure)).
@!612373f95d2b28ebfce8549fb9da2b8f9cdca313

{{index "array-like object"}}
@!bacf54cad0a32ba1356714b8a90df331ca7cecf6

For example, it is not uncommon for modules to
provide their own array-like collection objects, with their own
interface for counting and extracting elements. Such objects won't
have `map` or `forEach` methods, and any existing function that
expects a real array won't be able to work with them. This is an
example of poor _composability_—the module cannot be easily composed
with other code.
@!b0b481d0c4f6b7566860eb8f3caeab3b2ef8e9ea

{{index encapsulation, "spell-check example"}}
@!2533b7399685f714983ac2e8103b505695db84c9

One example would be a
module for spell-checking text, which we might need when we want to
write a text editor. The spell-checker could be made to operate
directly on whichever complicated ((data structure))s the editor uses
and directly call internal functions in the editor to have the user
choose between spelling suggestions. If we go that way, the module
cannot be used with any other programs. On the other hand, if we
define the spell-checking interface so that you can pass it a simple
string and it will return the position in the string where it found a
possible misspelling, along with an array of suggested corrections,
then we have an interface that could also be composed with other
systems because strings and arrays are always available in
JavaScript.
@!a32fd769051871ff9980ee69d04a4cd18bc3ea86

### Layered interfaces
@!846f978fb08ccc9d4e1e9f3244ca4549f9e71888

{{index simplicity, complexity, layering, "interface design"}}
@!a0a5444284125c6bc23689355c14d0d2825b2f5b

When designing an interface for a complex piece of
functionality—sending email, for example—you often run into a dilemma.
On the one hand, you do not want to overload the user of your
interface with details. They shouldn't have to study your interface
for 20 minutes before they can send an email. On the other hand, you
do not want to hide all the details either—when people need to do
complicated things with your module, they should be able to.
@!296ad59219d9cbbdc941005f128d454faac815f8

Often the solution is to provide two interfaces: a detailed
_low-level_ one for complex situations and a simple _high-level_ one
for routine use. The second can usually be built easily using the
tools provided by the first. In the email module, the high-level
interface could just be a function that takes a message, a sender
address, and a receiver address and then sends the email. The low-level
interface would allow full control over email headers, attachments,
HTML mail, and so on.
@!a7222ec3a895cc968c01fa84eeedda3e5652485f

## Summary
@!2f4812c8a5f3755dfa9e9703bf695dd15702f048

Modules provide structure to bigger programs by separating the code
into different files and namespaces. Giving these modules well-defined
interfaces makes them easier to use and reuse
and makes it possible to continue using them as the module
itself evolves.
@!1a160c771c3c65832d8641ff3f174cfe7b380c3f

Though the JavaScript language is characteristically unhelpful
when it comes to modules, the flexible functions and objects it
provides make it possible to define rather nice module systems.
Function scopes can be used as internal namespaces for the module, and
objects can be used to store sets of exported values.
@!0d1db59485291f8bbc7da9904f9f1845296f52e6

There are two popular, well-defined approaches to such modules. One is
called _CommonJS Modules_ and revolves around a `require` function
that fetches a module by name and returns its interface. The other is
called _AMD_ and uses a `define` function that takes an array of
module names and a function and, after loading the modules, runs the
function with their interfaces as arguments.
@!26d69347a33f8f496e3dd897d97f7d084456fc79

## Exercises
@!ea5bf1cc9f30ed918c4038f39b72265cda94e36c

### Month names
@!157d0812134113d2992d2aec871f38ec11d6a7a3

{{index "Date type", "weekday example", "month name (exercise)"}}
@!22814a8d483bb67e31218d2c96aea1f5027bf79a

Write a
simple module similar to the `weekDay` module that can convert month
numbers (zero-based, as in the `Date` type) to names and can convert names back
to numbers. Give it its own namespace since it will need an internal
array of month names, and use plain JavaScript, without any module
loader system.
@!1f35b08d12929b41e94ff4259d417d33e4622fdd

{{if interactive
@!d2abe7a3618cd30d22af4a8098aa11fe1f17e5f4

```{test: no}
// Your code here.

console.log(month.name(2));
// → March
console.log(month.number("November"));
// → 10
```
@!c1111c649a51bd3d8293926f625311768279ce5d

if}}
@!ca3a8ba2fa695049de8a5a0a496dc8394ad4059c

{{hint
@!f7bf046ddcef516ece4f9712f404d1898526755d

{{index "month name (exercise)"}}
@!5c68ebd9e89492f024ec3c31413f6a153f4ebe78

This follows the `weekDay` module almost
exactly. A function expression, called immediately, wraps the variable
that holds the array of names, along with the two functions that must
be exported. The functions are put in an object and returned. The
returned interface object is stored in the `month` variable.
@!4408ed2804a5cf95b6b5a8de8ced014ca77c2c19

hint}}
@!f6f8402ea9fffdff715fae01d865d608a8bb1344

### A return to electronic life
@!10f94a7b08ac1dc0d1ad87ccd2a91b9f99cadc11

{{index "electronic life", module}}
@!4ba5f4dbc3b6d48eb3577acf66cfaed8e9fd9870

Hoping that
[Chapter 7](07_elife.html#elife) is still somewhat fresh in your
mind, think back to the system designed in that chapter and come up
with a way to separate the code into modules. To refresh your memory,
these are the functions and types defined in that chapter, in order of
appearance:
@!a4a4f79a2239074491b90c356c12f873a3ae9886

```{lang: null}
Vector
Grid
directions
directionNames
randomElement
BouncingCritter
elementFromChar
World
charFromElement
Wall
View
WallFollower
dirPlus
LifelikeWorld
Plant
PlantEater
SmartPlantEater
Tiger
```
@!9775722692f4b14d59a174155dfcf11a9604b689

{{index "book analogy"}}
@!74528eb1c87ab2cc078a15a85f419b5fee7c5dab

Don't exaggerate and create too many modules. A book
that starts a new chapter for every page would probably get on your
nerves, if only because of all the space wasted on titles. Similarly,
having to open 10 files to read a tiny project isn't helpful. Aim for
three to five modules.
@!46c59a2f0bc340295db6de9ef4dbf02413d91d28

{{index encapsulation}}
@!20c022be9a04489a9aeb443e96c346f387c58e59

You can choose to have some functions become
internal to their module and thus inaccessible to other modules.
@!6148d963e23b09408c7d7deaecdadee05c06b69a

There is no single correct solution here. Module organization is
largely a matter of ((taste)).
@!4ab5a2ec65ebe8bd2fd61c27f7a915031e55ea0a

{{hint
@!02c69de46b64d76482a5f734bf57e598e3004c95

Here is what I came up with. I've put parentheses around internal
functions.
@!e63573482f6a26da9722b69852eca677c42fb29d

```{lang: null}
Module "grid"
  Vector
  Grid
  directions
  directionNames

Module "world"
  (randomElement)
  (elementFromChar)
  (charFromElement)
  View
  World
  LifelikeWorld
  directions [reexported]

Module "simple_ecosystem"
  (randomElement) [duplicated]
  (dirPlus)
  Wall
  BouncingCritter
  WallFollower

Module "ecosystem"
  Wall [duplicated]
  Plant
  PlantEater
  SmartPlantEater
  Tiger
```
@!bcfdf6d0f7efa771a3f44845bb420d3a50c3d165

{{index exporting}}
@!c6ad785a758a1999d8678576ed05e6702786a2f4

I have reexported the `directions` array from the
`grid` module from `world` so that modules built on that (the
ecosystems) don't have to know or worry about the existence of the
`grid` module.
@!7a093345c38c3f6536181c818412b40414f24d26

{{index duplication}}
@!db783efa922fe9f6faf2783dd38008acfdc482f3

I also duplicated two generic and tiny helper values
(`randomElement` and `Wall`) since they are used as internal details
in different contexts and do not belong in the interfaces for these
modules.
@!cfc59bb3663b99fb339662e491d158f9256978f4

hint}}
@!86c04cc8fa97ac19333ea010040a308f78b3761c

### Circular dependencies
@!5bb6050eb5e44121bfaafc7ce84f88d6b9780c16

{{index dependency, "circular dependency", "require function"}}
@!07baf2655687a669f13c8f502cc7f26a9ff22d31

A
tricky subject in dependency management is circular dependencies,
where module A depends on B, and B also depends on A. Many module
systems simply forbid this. ((CommonJS)) modules allow a limited form:
it works as long as the modules do not replace their default `exports`
object with another value and start accessing each other's
interface only after they finish loading.
@!a045b21740f2042b66e2ed6ca83b5b19d8f399a8

Can you think of a way in which support for this feature could be
implemented? Look back to the definition of `require` and consider
what the function would have to do to allow this.
@!01d616988aa048ceff101fb4465b7bde01752b4d

{{hint
@!cbff350882fcb975ccad6b55a7732af4402f1b0a

{{index overriding, "circular dependency", "exports object"}}
@!48f4a0206235d69272cd39ecc68b6550b1c4d786

The trick
is to add the `exports` object created for a module to `require`'s
((cache)) _before_ actually running the module. This means the module
will not yet have had a chance to override `module.exports`, so we do
not know whether it may want to export some other value. After
loading, the cache object is overridden with `module.exports`, which
may be a different value.
@!3aa01f3c176939f299da344c6734f8fe5028cba9

But if in the course of loading the module, a second module is loaded
that asks for the first module, its default `exports` object, which is likely
still empty at this point, will be in the cache, and the second module
will receive a reference to it. If it doesn't try to do anything with
the object until the first module has finished loading, things will
work.
@!b9a5db82fd89f767dfc72b8f82c346fc218206a3

hint}}
@!bb29cbc97d75ec5342b6244d66f80919684176e0