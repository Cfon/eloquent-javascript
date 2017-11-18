{{meta {chap_num: 11, prev_link: 10_modules, next_link: 12_browser, load_files: ["code/chapter/11_language.js"], zip: "node/html"}}}
@!f3058f00b91f84403b52402c3f3508e607519567

# Project: A Programming Language
@!b8175f9fa02c0fde63739009825ae97274eed381

{{if interactive
@!f7f756119c040c276722fbd767da743343b19518

{{quote {author: "Hal Abelson and Gerald Sussman", title: "Structure and Interpretation of Computer Programs", chapter: true}
@!2af9e10df6a0f968a33ef93b579fb605b99e387d

The evaluator, which determines the meaning of expressions in a
programming language, is just another program.
@!371119dc9f723e91bb3c2df99dbdc251b6c64b68

quote}}
@!c989172024f6a12e2044300760b5682d42c9dddc

if}}
@!62707e24261cbeb502c47ff16fd860b9c4c73df3

{{quote {author: "Grace Hopper", title: "quoted in Grace Hopper: Navy Admiral and Computer Pioneer", chapter: true }
@!e4b2b8ca64877ee209a0549226a5a98851a16f9b

I had a running compiler and nobody would touch it. They carefully
told me, computers could only do arithmetic; they could not do
programs.
@!03161f00308eb9aa71a10a2fe595bc5ed410f921

quote}}
@!5607e041a9429681d7258a04f7dd63926817efde

{{if interactive
@!1f8137ee0358810aa16aeeec6fe5c2ec81f8b6e2

{{quote {author: "Master Yuan-Ma", title: "The Book of Programming", chapter: true}
@!0acf24bd20276b941eedce6c82dc9a0b3edd6175

When a student asked the master about the nature of the cycle of Data
and Control, Yuan-Ma replied ‘Think of a compiler, compiling itself.’
@!89622ffc11b29ba36e4fec8b5a81eee3aa3ac0ee

quote}}
@!c0e6c86017fdf2d0ced62f687877e4ad8dada797

if}}
@!5c63131529974edcfe3577f26e460763ef3f37a5

{{index "Abelson, Hal", "Sussman, Gerald", SICP, "project chapter"}}
@!e2bce0f94efb2251a817f920a9f426c56da14885

Building your own
((programming language)) is surprisingly easy (as long as you do not
aim too high) and very enlightening.
@!44b4415d2479985dda724c8a923f940c135f2173

The main thing I want to show in this chapter is that there is no
((magic)) involved in building your own language. I've often felt that
some human inventions were so immensely clever and complicated that
I'd never be able to understand them. But with a little reading and
tinkering, such things often turn out to be quite mundane.
@!588a8a39ffcd2318fec75a865f81030252a79637

{{index "Egg language"}}
@!5f187780d91c2259734efa7d36c22016af25039e

We will build a programming language called Egg. It
will be a tiny, simple language but one that is powerful enough to
express any computation you can think of. It will also allow simple
((abstraction)) based on ((function))s.
@!fe0ad4717e1cc81718ee85960fc17912fb3acb6b

{{id parsing}}
@!7661847c2379e086033c50d80d48265e3c7fcac7

## Parsing
@!be164dcea7be6a827b8948b11e92e0f97be3e8bb

{{index parsing, validation}}
@!b71582df290008952e30bd449a6627464d8c6a74

The most immediately visible part of a
programming language is its _((syntax))_, or notation. A _parser_ is a
program that reads a piece of text and produces a data structure that
reflects the structure of the program contained in that text. If the
text does not form a valid program, the parser should complain and
point out the error.
@!fbd0272b80230107cd795eee0e3ce8765c2313af

{{index "special form"}}
@!d8e062cb8f129f7f4d882caf6225d254ffedd6a2

Our language will have a simple and uniform
syntax. Everything in Egg is an ((expression)). An expression can be a
variable, a number, a string, or an _application_. Applications are
used for function calls but also for constructs such as `if` or `while`.
@!0c89bf45d685e06164c6f2e6376763f2b4cc9b4b

{{index "double-quote character", parsing, [escaping, "in strings"]}}
@!86d673b6bc40cff4ee1108ef1b4dea7fdb5e188a

To
keep the parser simple, strings in Egg do not support anything like
backslash escapes. A string is simply a sequence of characters that
are not double quotes, wrapped in double quotes. A number is a
sequence of digits. Variable names can consist of any character that
is not ((whitespace)) and does not have a special meaning in the
syntax.
@!ad13d532541ee306da9088cb5f7cb352ef95901d

{{index "comma character"}}
@!de1fe2b9e3b7e87c6a99214ca8baf95c9f6daffc

Applications are written the way they are in
JavaScript, by putting ((parentheses)) after an expression and having
any number of ((argument))s between those parentheses, separated by
commas.
@!a66816f6a6ddbade42c7f423a5dd5b1766cb5726

```{lang: null}
do(define(x, 10),
   if(>(x, 5),
      print("large"),
      print("small")))
```
@!ab3afbad5fd8591db6bb6bc14f9e409c01eeb2d9

{{index block}}
@!5146900eca3a26924e50f9edefc13dc6aeeebc05

The ((uniformity)) of the ((Egg language)) means that
things that are ((operator))s in JavaScript (such as `>`) are normal
variables in this language, applied just like other ((function))s. And
since the ((syntax)) has no concept of a block, we need a `do`
construct to represent doing multiple things in sequence.
@!fa2a77d252aefee49653fc9e2163dff6802f39b4

{{index "type property", parsing}}
@!ee2ef440f74c5c1839014d0c1ff415affdef0f6f

The ((data structure)) that the parser will
use to describe a program will consist of ((expression)) objects, each
of which has a `type` property indicating the kind of expression it is
and other properties to describe its content.
@!aff27e4f8dbc180d7482edb34ab52615ab390fbd

{{index identifier}}
@!663ecdf23283c9fc630e6e71f498706ca0ad4be1

Expressions of type `"value"` represent literal strings
or numbers. Their `value` property contains the string or number value
that they represent. Expressions of type `"word"` are used for
identifiers (names). Such objects have a `name` property that holds
the identifier's name as a string. Finally, `"apply"` expressions
represent applications. They have an `operator` property that refers
to the expression that is being applied, and they have an `args` property that
refers to an array of argument expressions.
@!b73aeff19d481dc5adce66042ca87b9ac8e6bf14

The `>(x, 5)` part of the previous program would be represented like this:
@!b305d6c659934371f0a94238fb79dee53322790d

```{lang: "application/json"}
{
  type: "apply",
  operator: {type: "word", name: ">"},
  args: [
    {type: "word", name: "x"},
    {type: "value", value: 5}
  ]
}
```
@!485e4ecb2cadcc5240c35a167dad9b7b42c24762

{{indexsee "abstract syntax tree", "syntax tree"}}
@!11cf4168ad2ea87e0ed242fc00f2bbd658b0a484

Such a ((data structure)) is called a _((syntax tree))_. If you
imagine the objects as dots and the links between them as lines
between those dots, it has a ((tree))like shape. The fact that
expressions contain other expressions, which in turn might contain
more expressions, is similar to the way branches split and split again.
@!994621338270f1a795d148bc88a8980570ee09d3

{{figure {url: "img/syntax_tree.svg", alt: "The structure of a syntax tree",width: "5cm"}}}
@!fe217854e90c33f6b2709084aaf571eaea1b0422

{{index parsing}}
@!c22db0117254f261a9ce94c1fc139b3b16e905c9

Contrast this to the parser we wrote for the
configuration file format in [Chapter 9](09_regexp.html#ini), which
had a simple structure: it split the input into lines and
handled those lines one at a time. There were only a few simple forms
that a line was allowed to have.
@!537ca29a1b6a2fac6051913f960ba7ecb811354f

{{index recursion, [nesting, "of expressions"]}}
@!8c3cb0281cbe0b4ef1d370e2d838bbd4b65b5afd

Here we must find a
different approach. Expressions are not separated into lines, and they
have a recursive structure. Application expressions _contain_ other
expressions.
@!b10620afabd794bc5e901926912e9773f28121a3

{{index elegance}}
@!f1df3e454e5f5ad49a53e564dccab8311845c21b

Fortunately, this problem can be solved elegantly by
writing a parser function that is recursive in a way that reflects the
recursive nature of the language.
@!78d2ff005bb319e9d26283b16a48b7ed3927088c

{{index "parseExpression function", "syntax tree"}}
@!bba5a37f79b5c4350c525e09a017c60b8b4da8ee

We define a function
`parseExpression`, which takes a string as input and returns an
object containing the data structure for the expression at the start
of the string, along with the part of the string left after parsing
this expression. When parsing subexpressions (the argument to an
application, for example), this function can be called again, yielding
the argument expression as well as the text that remains. This text
may in turn contain more arguments or may be the closing parenthesis
that ends the list of arguments.
@!413439fa85bfb6b734315795ed37f5e01a8a1b35

This is the first part of the parser:
@!34382293803836864f0294986c455f7b1b0ff100

```{includeCode: true}
function parseExpression(program) {
  program = skipSpace(program);
  var match, expr;
  if (match = /^"([^"]*)"/.exec(program))
    expr = {type: "value", value: match[1]};
  else if (match = /^\d+\b/.exec(program))
    expr = {type: "value", value: Number(match[0])};
  else if (match = /^[^\s(),"]+/.exec(program))
    expr = {type: "word", name: match[0]};
  else
    throw new SyntaxError("Unexpected syntax: " + program);

return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string) {
  var first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}
```
@!efa7bee6f24053278e44ef721c96a0e320225a3d

{{index "skipSpace function"}}
@!10bd7c327477555bc7108c5507a12fcfbe010af6

Because Egg allows any amount of
((whitespace)) between its elements, we have to repeatedly cut the
whitespace off the start of the program string. This is what the
`skipSpace` function helps with.
@!d2669b6e9db73ab3bcee3fe80189438e35c66ef2

{{index "literal expression", "SyntaxError type"}}
@!56103ffcdd66201ca058cc972d19c49ca03602c1

After skipping any
leading space, `parseExpression` uses three ((regular expression))s to
spot the three simple (atomic) elements that Egg supports: strings,
numbers, and words. The parser constructs a different kind of data
structure depending on which one matches. If the input does not match
one of these three forms, it is
not a valid expression, and the parser throws an error. `SyntaxError` is a
standard error object type, which is raised when an attempt is made to
run an invalid JavaScript program.
@!d21e76c488203b1adbc30887e0a54d53544be65f

{{index "parseApply function"}}
@!e6bed6412ed84ccc0f7671d916c183b57a9dc8fd

We can then cut off the part that we matched
from the program string and pass that, along with the object for the
expression, to `parseApply`, which checks whether the expression is an
application. If so, it parses a parenthesized list of arguments.
@!c2abb980f5279d83f5348f571881363cd0ef39df

```{includeCode: true}
function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != "(")
    return {expr: expr, rest: program};

program = skipSpace(program.slice(1));
  expr = {type: "apply", operator: expr, args: []};
  while (program[0] != ")") {
    var arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",")
      program = skipSpace(program.slice(1));
    else if (program[0] != ")")
      throw new SyntaxError("Expected ',' or ')'");
  }
  return parseApply(expr, program.slice(1));
}
```
@!ce8c42187d5af6c6b444464144f57538e325c0be

{{index parsing}}
@!6595bb105f16f35d1ea5ba4bafcfdb03cfcd0a29

If the next character in the program is not an opening
parenthesis, this is not an application, and `parseApply` simply
returns the expression it was given.
@!f5325e8b55cfe4e54359eb15f197e3e7615724ae

{{index recursion}}
@!6133edaa317f5d5c0320f5e454b1939e1aae8da2

Otherwise, it skips the opening parenthesis and
creates the ((syntax tree)) object for this application expression. It
then recursively calls `parseExpression` to parse each argument until a
closing parenthesis is found. The recursion is indirect, through
`parseApply` and `parseExpression` calling each other.
@!b30b1226b7613fbc6e7f3a9d98f1aeeff7b73e0e

Because an application expression can itself be applied (such as in
`multiplier(2)(1)`), `parseApply` must, after it has parsed an
application, call itself again to check whether another pair of
parentheses follows.
@!5d95c409e954d84020595a69ed580fd9b4d7e8cf

{{index "syntax tree", "Egg language", "parse function"}}
@!c99001271e08fcbb4fcf58a6259f2530aaa35b67

This is all we
need to parse Egg. We wrap it in a convenient `parse` function that
verifies that it has reached the end of the input string after parsing
the expression (an Egg program is a single expression), and that
gives us the program's data structure.
@!d6c5ff9a6a5f80b8b4d5d38a09905055e6116484

```{includeCode: strip_log, test: join}
function parse(program) {
  var result = parseExpression(program);
  if (skipSpace(result.rest).length > 0)
    throw new SyntaxError("Unexpected text after program");
  return result.expr;
}

console.log(parse("+(a, 10)"));
// → {type: "apply",
//    operator: {type: "word", name: "+"},
//    args: [{type: "word", name: "a"},
//           {type: "value", value: 10}]}
```
@!d1e408916ed32413415a7b92f5588e1640df3ea7

{{index "error message"}}
@!2e7006319d445ecf0be27f29b17b33b30c28464d

It works! It doesn't give us very helpful
information when it fails and doesn't store the line and column on
which each expression starts, which might be helpful when reporting
errors later, but it's good enough for our purposes.
@!217022b2b173b431b6e82d5958d50d010c0b8283

## The evaluator
@!e63fee4fa436df39e790949278a0efe21c9118e3

{{index "evaluate function", evaluation, interpretation, "syntax tree", "Egg language"}}
@!cfec69fe5ca27c88b227a4f5ec752af50a95ee9b

What can we do with the syntax tree for a
program? Run it, of course! And that is what the evaluator does. You
give it a syntax tree and an environment object that associates names
with values, and it will evaluate the expression that the tree
represents and return the value that this produces.
@!96edb6fcdfdf75ebbeab759db4c9a04fb3a485b2

```{includeCode: true}
function evaluate(expr, env) {
  switch(expr.type) {
    case "value":
      return expr.value;

case "word":
      if (expr.name in env)
        return env[expr.name];
      else
        throw new ReferenceError("Undefined variable: " +
                                 expr.name);
    case "apply":
      if (expr.operator.type == "word" &&
          expr.operator.name in specialForms)
        return specialForms[expr.operator.name](expr.args,
                                                env);
      var op = evaluate(expr.operator, env);
      if (typeof op != "function")
        throw new TypeError("Applying a non-function.");
      return op.apply(null, expr.args.map(function(arg) {
        return evaluate(arg, env);
      }));
  }
}

var specialForms = Object.create(null);
```
@!57748fe75f5e1cd7d6ecf447ba4bcc1a7bd4b047

{{index "literal expression", environment}}
@!4f9852f5ecab6a807c4338f4c1097e365c462439

The evaluator has code for
each of the ((expression)) types. A literal value expression simply
produces its value. (For example, the expression `100` just evaluates
to the number 100.) For a variable, we must check whether it is
actually defined in the environment and, if it is, fetch the
variable's value.
@!464e6a79172d43f2c514f520508f43edcb740e34

{{index [function, application]}}
@!a16d548784e20729dbe229bbb3fd111cc2fcbf43

Applications are more involved. If they are
a ((special form)), like `if`, we do not evaluate anything and simply
pass the argument expressions, along with the environment, to the
function that handles this form. If it is a normal call, we evaluate
the operator, verify that it is a function, and call it with the
result of evaluating the arguments.
@!04c1f63d936e1d65730075ca7e88e0d64e26abf8

We will use plain JavaScript function values to represent Egg's
function values. We will come back to this
[later](11_language.html#egg_fun), when the special form called
`fun` is defined.
@!1814a9216c508e858d0af7201b4da20335e8c7cd

{{index readability, "evaluate function", recursion, parsing}}
@!078bd62df099fdae139e61c29669400bb893c62a

The recursive structure of
`evaluate` resembles the similar structure of the parser. Both mirror
the structure of the language itself. It would also be possible to
integrate the parser with the evaluator and evaluate during parsing,
but splitting them up this way makes the program more readable.
@!d16ce39f0ae16b7261c5001c765cc066c08dc9a6

{{index "Egg language", interpretation}}
@!735dea789391e56c47a712a7fddde8c7c7bd6dc4

This is really all that is
needed to interpret Egg. It is that simple. But without defining a few
special forms and adding some useful values to the ((environment)),
you can't do anything with this language yet.
@!0d4514f2f2cfb18dcd62b94a8da39d72e2599792

## Special forms
@!97d5c70e5da812415e72a81c6f1833d7d6c7e0c1

{{index "special form", "specialForms object"}}
@!167d4bab59f4f2fdc26368f4884c95c2d843c951

The `specialForms` object
is used to define special syntax in Egg. It associates words with
functions that evaluate such special forms. It is currently empty.
Let's add some forms.
@!53ea693568d46196ced8b4b79fb6265da0d0e636

```{includeCode: true}
specialForms["if"] = function(args, env) {
  if (args.length != 3)
    throw new SyntaxError("Bad number of args to if");

if (evaluate(args[0], env) !== false)
    return evaluate(args[1], env);
  else
    return evaluate(args[2], env);
};
```
@!68668eeccea8e0ec500b7ce3e65a5f9e157b6804

{{index "conditional execution"}}
@!26bca5baabe5d8171667a6a5782e951181da3713

Egg's `if` construct expects exactly three
arguments. It will evaluate the first, and if the result isn't the
value `false`, it will evaluate the second. Otherwise, the third gets
evaluated. This `if` form is more similar to JavaScript's ternary `?:`
operator than to JavaScript's `if`. It is an expression, not a statement,
and it produces a value, namely, the result of the second or third
argument.
@!e092ca716e45583c1e04f28b09e5243af5c6eb06

{{index Boolean}}
@!0aa252753d331156eb8d88d7ba5222532c628d30

Egg differs from JavaScript in how it handles the
condition value to `if`. It will not treat things like zero or the
empty string as false, but only the precise value `false`.
@!cf0f50ca2bd082b40b43d3566fd7ae53cc5a40e0

{{index "short-circuit evaluation"}}
@!d940eb3487734c02b5373763884fa06712d99035

The reason we need to represent `if` as
a special form, rather than a regular function, is that all arguments
to functions are evaluated before the function is called, whereas
`if` should evaluate only _either_ its second or its third argument,
depending on the value of the first.
@!da94652ad2a6ef2f60073ed092edb3f2bff86f4e

The `while` form is similar.
@!0311c89fde911dc3ad7571344c094f140dfc3f7e

```{includeCode: true}
specialForms["while"] = function(args, env) {
  if (args.length != 2)
    throw new SyntaxError("Bad number of args to while");

while (evaluate(args[0], env) !== false)
    evaluate(args[1], env);

// Since undefined does not exist in Egg, we return false,
  // for lack of a meaningful result.
  return false;
};
```
@!f29783d48f1510135969f1d5e6e99f2f8a3d4144

Another basic building block is `do`, which executes all its arguments
from top to bottom. Its value is the value produced by the last
argument.
@!dcb518dd0a9c2495bed313040e50011b66c10ffd

```{includeCode: true}
specialForms["do"] = function(args, env) {
  var value = false;
  args.forEach(function(arg) {
    value = evaluate(arg, env);
  });
  return value;
};
```
@!2caae54b50ccaddbdf573d811864f1cc20fac8c9

{{index "= operator"}}
@!6a964d09c09c3822606d127860d7217489ef398a

To be able to create ((variable))s and give them new
values, we also create a form called `define`. It expects a word as
its first argument and an expression producing the value to assign to
that word as its second argument. Since `define`, like everything, is
an expression, it must return a value. We'll make it return the value
that was assigned (just like JavaScript's `=` operator).
@!27e8ca8998c901aa4c43c7dcdefc2c21f2bf7228

```{includeCode: true}
specialForms["define"] = function(args, env) {
  if (args.length != 2 || args[0].type != "word")
    throw new SyntaxError("Bad use of define");
  var value = evaluate(args[1], env);
  env[args[0].name] = value;
  return value;
};
```
@!21505b15a9ee3e3d1175aba600f8bc6ee097c3bd

## The environment
@!2c61fd4a931095439f37a8cecb699fa8c68a4286

{{index "Egg language", "evaluate function"}}
@!b12e4d39b5ecbd04f113a2bf2e4fc45d2a78477c

The ((environment)) accepted
by `evaluate` is an object with properties whose names correspond to
variable names and whose values correspond to the values those
((variable))s are bound to. Let's define an environment object to
represent the ((global scope)).
@!5c9d5b70222249b669f391cb133abb4e678eb35f

To be able to use the `if` construct we just defined, we must
have access to ((Boolean)) values. Since there are only two
Boolean values, we do not need special syntax for them. We simply bind
two variables to the values `true` and `false` and use those.
@!7c3fa3b1652ed8b48702062bea78a9e878b0dd98

```{includeCode: true}
var topEnv = Object.create(null);

topEnv["true"] = true;
topEnv["false"] = false;
```
@!7a1b0cdb4b2c2aad47399362ec2d2d34690003a6

We can now evaluate a simple expression that negates a Boolean value.
@!6b47ee2605105134616e316d37784dda600c1cb9

```
var prog = parse("if(true, false, true)");
console.log(evaluate(prog, topEnv));
// → false
```
@!96a1d675d2c973503185457cd084ea235c90ae4a

{{index arithmetic, "Function constructor"}}
@!a8cf449a4357e3818ae72cfdb09d64bfc965fe4c

To supply basic
((arithmetic)) and ((comparison)) ((operator))s, we will also add some
function values to the ((environment)). In the interest of keeping the
code short, we'll use `new Function` to synthesize a bunch of operator
functions in a loop, rather than defining them all individually.
@!b98a74545a058980da91178d76e2aea4f77f680d

```{includeCode: true}
["+", "-", "*", "/", "==", "<", ">"].forEach(function(op) {
  topEnv[op] = new Function("a, b", "return a " + op + " b;");
});
```
@!7d7d6765aa09c2b4294db7e34ec9c73eb1a434e9

A way to ((output)) values is also very useful, so we'll wrap
`console.log` in a function and call it `print`.
@!2d5eea97f920d5291c76840ed9e40d850a7ae15c

```{includeCode: true}
topEnv["print"] = function(value) {
  console.log(value);
  return value;
};
```
@!afd42d773cfd61a245c5254626b2f2e1b714bcb3

{{index parsing, "run function"}}
@!a2846e2520e689e99f7c25566ed2708b7e0abd58

That gives us enough elementary tools
to write simple programs. The following `run` function provides a
convenient way to write and run them. It creates a fresh environment
and parses and evaluates the strings we give it as a single program.
@!f86ced87ad69504c335137235185cde016bc2b59

```{includeCode: true}
function run() {
  var env = Object.create(topEnv);
  var program = Array.prototype.slice
    .call(arguments, 0).join("\n");
  return evaluate(parse(program), env);
}
```
@!f908069a87933090e5a6b7b7787454e57797cc01

{{index "join method", "call method"}}
@!35099375661c443d8227735b4758b68b5b0d0a68

The use of
`Array.prototype.slice.call` is a trick to turn an ((array-like
object)), such as `arguments`, into a real array so that we can call
`join` on it. It takes all the arguments given to `run` and treats
them as the lines of a program.
@!0a76e1aca3b941d621f720f94f8787ed100f2de4

```
run("do(define(total, 0),",
    "   define(count, 1),",
    "   while(<(count, 11),",
    "         do(define(total, +(total, count)),",
    "            define(count, +(count, 1)))),",
    "   print(total))");
// → 55
```
@!7018e551425d44c4aa21d00f265e3a30e5a4d04a

{{index "summing example", "Egg language"}}
@!3c1a6ad0f7210f78ef4abf9acb82aa1544f61dce

This is the program we've seen
several times before, which computes the sum of the numbers 1 to 10,
expressed in Egg. It is clearly uglier than the equivalent JavaScript
program but not bad for a language implemented in less than 150
((lines of code)).
@!4f0d6cc027cf9e1a25308109754a85432758c33c

{{id egg_fun}}
@!1162e11830acc40835f08f5c9526f269aaf07aab

## Functions
@!7a52859df6c30b51047e485da710d27648a88026

{{index function, "Egg language"}}
@!74760e0bff9b0a894d1447ea6021f6bb559490c9

A programming language without
functions is a poor programming language indeed.
@!ff700d903de00835133ff950a799af5b06590798

Fortunately, it is not hard to add a `fun` construct, which treats its
last argument as the function's body and treats all the arguments before that as
the names of the function's arguments.
@!8719116b1f98c08402fdc7b759fa666be344f96c

```{includeCode: true}
specialForms["fun"] = function(args, env) {
  if (!args.length)
    throw new SyntaxError("Functions need a body");
  function name(expr) {
    if (expr.type != "word")
      throw new SyntaxError("Arg names must be words");
    return expr.name;
  }
  var argNames = args.slice(0, args.length - 1).map(name);
  var body = args[args.length - 1];

return function() {
    if (arguments.length != argNames.length)
      throw new TypeError("Wrong number of arguments");
    var localEnv = Object.create(env);
    for (var i = 0; i < arguments.length; i++)
      localEnv[argNames[i]] = arguments[i];
    return evaluate(body, localEnv);
  };
};
```
@!e1bc5d4304bd630dc1c42d2c8fc90557609c68ce

{{index "local scope", "Object.create function", prototype}}
@!b4e920101e09be8a940e257457b003b605c17bb0

Functions
in Egg have their own local environment, just like in JavaScript. We
use `Object.create` to make a new object that has access to the
variables in the outer environment (its prototype) but that can also
contain new variables without modifying that outer scope.
@!602ac78b41aa4c80d1b6f7afaabbe3cc541bc464

{{index "power example", evaluation, interpretation}}
@!4d95c48c6959f856d08f80e6cd6cb3c09a25d144

The function
created by the `fun` form creates this local environment and adds the
argument variables to it. It then evaluates the function body in this
environment and returns the result.
@!0d337b09b81ddcab3de15161d9c8f8d756968a76

```{startCode: true}
run("do(define(plusOne, fun(a, +(a, 1))),",
    "   print(plusOne(10)))");
// → 11

run("do(define(pow, fun(base, exp,",
    "     if(==(exp, 0),",
    "        1,",
    "        *(base, pow(base, -(exp, 1)))))),",
    "   print(pow(2, 10)))");
// → 1024
```
@!a8961150328aef01f7a2f7d50654da18c4720cc1

## Compilation
@!a4dd968350ef4a6e873214ec6d101280fe8ce00f

{{index interpretation, compilation}}
@!e1f2c690080b0ecb97728e74c9700aa9177eb994

What we have built is an
interpreter. During evaluation, it acts directly on the representation
of the program produced by the parser.
@!0b3368485d839be5be556661e1afc2b3d7d75849

{{index efficiency, performance}}
@!d767390b1e452aef5f13fb0d629f724da76987ad

_Compilation_ is the process of
adding another step between the parsing and the running of a program,
which transforms the program into something that can be evaluated more
efficiently by doing as much work as possible in advance. For example,
in well-designed languages it is obvious, for each use of a
((variable)), which variable is being referred to, without actually
running the program. This can be used to avoid looking up the variable
by name every time it is accessed and to directly fetch it from some
predetermined ((memory)) location.
@!71fe2d58fd7409bcda1e0b861ffe9dfee450e863

Traditionally, ((compilation)) involves converting the program to
((machine code)), the raw format that a computer's processor can
execute. But any process that converts a program to a different
representation can be thought of as compilation.
@!7dce541626fc796dcb2c4df7fbab2b6d9fc531cc

{{index simplicity, "Function constructor", transpilation}}
@!cafdc458d7bb4a4d6240d596f321d71209ae39f5

It would
be possible to write an alternative ((evaluation)) strategy for Egg,
one that first converts the program to a JavaScript program, uses `new
Function` to invoke the JavaScript compiler on it, and then runs the
result. When done right, this would make Egg run very fast while
still being quite simple to implement.
@!e9b903efaa6eeb8206562d5891f45ee097a909c2

If you are interested in this topic and willing to spend some time on
it, I encourage you to try to implement such a compiler as an
exercise.
@!87fe050dddb51febff6336b4c0da0fc63cc229ce

## Cheating
@!dd2a80acdf0117839de17b5d2cb5aecd0c1ab751

{{index "Egg language"}}
@!f84ac15e49e0dc6a593c12a14f41e4d08959fe48

When we defined `if` and `while`, you probably
noticed that they were more or less trivial wrappers around
JavaScript's own `if` and `while`. Similarly, the values in Egg are
just regular old JavaScript values.
@!74bdf9a7f62a21233e0485e62513ae0d604d259a

If you compare the implementation of Egg, built on top of JavaScript,
with the amount of work and complexity required to build a programming
language directly on the raw functionality provided by a machine, the
difference is huge. Regardless, this example hopefully gave you an
impression of the way ((programming language))s work.
@!30030e869ed4246ba793d0e9b4d6779e73f171d8

And when it comes to getting something done, cheating is more
effective than doing everything yourself. Though the toy language in
this chapter doesn't do anything that couldn't be done better in
JavaScript, there _are_ situations where writing small languages helps
get real work done.
@!10a2d22987d7dfeb9e38799b4e29b3c31c7706e9

Such a language does not have to resemble a typical programming
language. If JavaScript didn't come equipped with regular expressions,
you could write your own parser and evaluator for such a sublanguage.
@!108f9e94dc4da498cfa1659a4ac124fb51f4eb13

{{index "artificial intelligence"}}
@!0f656bb0b5b6915a1d198b62365a260f11cd13e3

Or imagine you are building a giant
robotic ((dinosaur)) and need to program its ((behavior)). JavaScript
might not be the most effective way to do this. You might instead opt
for a language that looks like this:
@!78a34377e647b6c27a3be6b7d0e33a972dcd92d9

```{lang: null}
behavior walk
  perform when
    destination ahead
  actions
    move left-foot
    move right-foot

behavior attack
  perform when
    Godzilla in-view
  actions
    fire laser-eyes
    launch arm-rockets
```
@!68e322499c5d2269a8c8cbdcdb6b896f7f931e3c

{{index expressivity}}
@!e95c7e2d9c0de8e557a447b450cc4a0609cdefd4

This is what is usually called a _((domain-specific
language))_, a language tailored to express a narrow domain of
knowledge. Such a language can be more expressive than a
general-purpose language because it is designed to express exactly the
things that need expressing in its domain and nothing else.
@!a886b2086e6e0e69a1ba5fb251d61db127b3b22d

## Exercises
@!06ae99452fb78f07bb53ea67dfe1241de12d7a61

### Arrays
@!b73b96747b1ac4eff4dbdc6af7c8aebfab456ee2

{{index "Egg language"}}
@!9a1cee410f6ac2a16c3853f3975d6676e3531383

Add support for ((array))s to Egg by adding the
following three functions to the top scope: `array(...)` to
construct an array containing the argument values, `length(array)` to
get an array's length, and `element(array, n)` to fetch the n^th^
element from an array.
@!1cab84a1905fe219b6bf93334d369709dec525df

{{if interactive
@!ff07557d351aa7962500a3a77983ef467dd40cd3

```{test: no}
// Modify these definitions...

topEnv["array"] = "...";

topEnv["length"] = "...";

topEnv["element"] = "...";

run("do(define(sum, fun(array,",
    "     do(define(i, 0),",
    "        define(sum, 0),",
    "        while(<(i, length(array)),",
    "          do(define(sum, +(sum, element(array, i))),",
    "             define(i, +(i, 1)))),",
    "        sum))),",
    "   print(sum(array(1, 2, 3))))");
// → 6
```
@!2cb8cc5c5814125aeaf1a6400b5b507f1fb87004

if}}
@!7e35d1359f02b16b1ee8a38c28095b6f51e66223

{{hint
@!79cfa7ce51982e21a6344be5cb94de968f8422cd

The easiest way to do this is to represent Egg arrays
with JavaScript arrays.
@!034dfeb5aa4079ceec92337acfbdca8b2a1df5ad

{{index "slice method"}}
@!a7339c9ed1ec938d82600c96adc4455043aa6036

The values added to the top environment must be
functions. `Array.prototype.slice` can be used to convert an
`arguments` array-like object into a regular array.
@!19b598804dc5c0a4fed42b5f945089b9a27df275

hint}}
@!0d4055d96f23e5232a42831f59060aef30fbc123

### Closure
@!a9ebe4b2393f93e6bd4145855eac8406006bd563

{{index closure, [function, scope]}}
@!64aa4d4194a85f0309786513e94d659263537fe0

The way we have defined `fun` allows
functions in Egg to “close over” the surrounding environment, allowing
the function's body to use local values that were visible at the time
the function was defined, just like JavaScript functions do.
@!46308a6956fd05c858862265718dd8ad7c9a87dc

The following program illustrates this: function `f` returns a function
that adds its argument to `f`'s argument, meaning that it needs access
to the local ((scope)) inside `f` to be able to use variable `a`.
@!afe5967e15fa8c38e7af6f7baa4fc5ce5b43b020

```
run("do(define(f, fun(a, fun(b, +(a, b)))),",
    "   print(f(4)(5)))");
// → 9
```
@!c8ed7fa81e06e4ad8f8a3a62151bcaf71f86a15c

Go back to the definition of the `fun` form and explain which
mechanism causes this to work.
@!78310733f39b8002403aefa6ef1173b769a31579

{{hint
@!b8da95a8b04984d852405e6dcba50e71ccb7a94a

{{index closure}}
@!8bcfe43b6d7f1449bd62fb375db974c55def2695

Again, we are riding along on a JavaScript mechanism to
get the equivalent feature in Egg. Special forms are passed the local
environment in which they are evaluated so that they can evaluate
their subforms in that environment. The function returned by `fun`
closes over the `env` argument given to its enclosing function and
uses that to create the function's local ((environment)) when it is
called.
@!7f32ba1e207f7a75067050dabf016e3e59ededd7

{{index compilation}}
@!47f5c13381f117231e23fa31888693ad6a4d418e

This means that the ((prototype)) of the local
environment will be the environment in which the function was created,
which makes it possible to access variables in that environment from
the function. This is all there is to implementing closure (though to
compile it in a way that is actually efficient, you'd need to do some
more work).
@!056e31255d3f7a6511bd5645217197d2049c596f

hint}}
@!4ff472eb8b2afed75340a5628a2053965639f79f

### Comments
@!5bd787335b1531fb995b4becdb3fce5e73507620

{{index "hash character", "Egg language"}}
@!8a54b65bea37c10e3991c74ccfa1053839646677

It would be nice if we could
write ((comment))s in Egg. For example, whenever we find a hash sign
(`#`), we could treat the rest of the line as a comment and ignore it,
similar to `//` in JavaScript.
@!a0614a548355f97502300a096fe3c5b954b6cc78

{{index "skipSpace function"}}
@!7cd666ce280deaf31dd5aaa093aa60f738240835

We do not have to make any big changes to the
parser to support this. We can simply change `skipSpace` to skip
comments like they are ((whitespace)) so that all the points where
`skipSpace` is called will now also skip comments. Make this change.
@!d5511d585fb23c87290e5ede822cad3ecc4edb24

{{if interactive
@!fb1789bacfe24c60010e384960e2bd374c570b84

```{test: no}
// This is the old skipSpace. Modify it...
function skipSpace(string) {
  var first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}

console.log(parse("# hello\nx"));
// → {type: "word", name: "x"}

console.log(parse("a # one\n   # two\n()"));
// → {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}
```
@!1b9a0033a2f5850d715e5e97d9f89b680ae3b984

if}}
@!d97715df79ae2b6db5d2004079ffab238a00e1ba

{{hint
@!637476e28b7f8ee96d2ec4835d43049afd3bde34

{{index comment}}
@!58830d068d1fe8b8a1f14c5d0b6b13c603e42c9d

Make sure your solution handles multiple comments in a
row, with potentially ((whitespace)) between or after them.
@!eb91f0ad64dd50afbc46f84f558a8e3a0a90530b

A ((regular expression)) is probably the easiest way to solve this.
Write something that matches “whitespace or a comment, zero or more
times”. Use the `exec` or `match` method and look at the length of
the first element in the returned array (the whole match) to find out
how many characters to slice off.
@!3e06d726c94d55205a739b375701ad4009feae7f

hint}}
@!a657ef50e65c91607d270911dc0931bd09820bbf

### Fixing scope
@!90333f37e7c0375c1cd5b363ea164c1381da9e8b

{{index [variable, definition], assignment}}
@!2d877c30f0434121d6ad5a090c11d172f2b37f43

Currently, the only way to
assign a ((variable)) a value is `define`. This construct acts as
a way both to define new variables and to give existing ones a new value.
@!b0717e26d8d6fcb9afa97ada1365f177224a1ab0

{{index "local variable"}}
@!0a15d2c7eaecb292f50d83ad9512dc402bb40209

This ((ambiguity)) causes a problem. When you try
to give a nonlocal variable a new value, you will end up defining a
local one with the same name instead. (Some languages work like this
by design, but I've always found it a silly way to handle ((scope)).)
@!de5886bc8eab09cd8c6a22688797eacf73f6ad13

{{index "ReferenceError type"}}
@!11d24b0d780db5469c91761bd3d3135b2951f3c4

Add a special form `set`, similar to
`define`, which gives a variable a new value, updating the variable in
an outer scope if it doesn't already exist in the inner scope. If the
variable is not defined at all, throw a `ReferenceError` (which is
another standard error type).
@!c286ef789f9cdd8913548a4e25e142867711ea24

{{index "hasOwnProperty method", prototype, "getPrototypeOf function"}}
@!3962cdd14fbf975c214f287229efb05fc0245007

The technique of representing scopes as simple objects,
which has made things convenient so far, will get in your way a
little at this point. You might want to use the
`Object.getPrototypeOf` function, which returns the prototype of an
object. Also remember that scopes do not derive from
`Object.prototype`, so if you want to call `hasOwnProperty` on them,
you have to use this clumsy expression:
@!5a6f34844b34c8c58ef138d23a044454babac869

```{test: no}
Object.prototype.hasOwnProperty.call(scope, name);
```
@!06f4842d427a9d8c810bb6997af8f2d37b509a61

This fetches the `hasOwnProperty` method from the `Object` prototype
and then calls it on a scope object.
@!1f3643c3e9f9f231e6dbea6ec8fee41c4914ccf1

{{if interactive
@!2c7bc8c30e84f02c7068209964931488000560a9

```{test: no}
specialForms["set"] = function(args, env) {
  // Your code here.
};

run("do(define(x, 4),",
    "   define(setx, fun(val, set(x, val))),",
    "   setx(50),",
    "   print(x))");
// → 50
run("set(quux, true)");
// → Some kind of ReferenceError
```
@!7c50907d7620cb7cca3bd03ce2f4f394c046fc66

if}}
@!07564eee83f9e98b23533a33f9401b041fc83dc9

{{hint
@!892b6c09c534c6cedfffbacb228ad7410f8e3c40

{{index [variable, definition], assignment, "getPrototypeOf function", "hasOwnProperty method"}}
@!1e166d44a76f3d874459fa4bb153ae5a02dc14f2

You will have to loop through
one ((scope)) at a time, using `Object.getPrototypeOf` to go the next
outer scope. For each scope, use `hasOwnProperty` to find out whether the
variable, indicated by the `name` property of the first argument to
`set`, exists in that scope. If it does, set it to the result of
evaluating the second argument to `set` and then return that value.
@!6aeffb0051a0a08f93842c59c0ca2be3adf27922

{{index "global scope", "run-time error"}}
@!1141aedd820bea32cecd065232768e5ea40bab86

If the outermost scope is
reached (`Object.getPrototypeOf` returns null) and we haven't found
the variable yet, it doesn't exist, and an error should be thrown.
@!732755c108e3c991de5217882f2cba17647e2813

hint}}
@!f109d8837c7eb81e63825a348149156f9c1c8280