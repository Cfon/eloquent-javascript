{{meta {chap_num: 6, prev_link: 05_higher_order, next_link: 07_robot, load_files: ["code/chapter/06_object.js"], zip: "node/html"}}}
@!0a4b6398d22043c92f9f430bcd2269179660efe9

# The Secret Life of Objects
@!9a16d9ff22aa85774faa07216a18137826f9de9d

{{quote {author: "Barbara Liskov", title: "Programming with Abstract Data Types", chapter: true}
@!30bf4518afb21f294e23a9a2146d6bf23fb21990

An abstract data type is realized by writing a special kind of program
[…] which defines the type in terms of the operations which can be
performed on it.
@!98b021b7315e4724b95b3de178767a1171d058d4

quote}}
@!07e28c6bdd4087586d6b9684aeaeb363d021620c

{{index "Liskov, Barbara", "abstract data type"}}
@!8b06f97e0a318ad6f608e0ba865d3261db1a5775

[Chapter 4](04_data.html) introduced ((object))s. In programming
culture, there is a thing called _((object-oriented programming))_.
Object-oriented programming provides a bunch of ideas about how
objects can be used to help manage the ((complexity)) of programs.
@!ecc34aa30928ddb75756d1be09603b99dab334f4

Though no one really agrees on its definition, it has shaped the
design of many programming languages, including JavaScript. This
chapter will describe the way some of these techniques work in
JavaScript.
@!7a5e304274323260db38fb3ec50357abed8a3eca

## Encapsulation
@!1da90067ea7f94517f67c966a6b3212e2444259c

{{index encapsulation, isolation, modularity}}
@!6f09cd05cd71d5f9c9da0eba4b2abf38dc826ab8

The core idea in object-oriented programming is to divide programs
into smaller pieces, and make each piece responsible for managing its
own state.
@!403ee032c57c1e9d1c977ee6bd426471b8de3ab9

This way, some knowledge about the way a piece of the program works is
kept _local_ to that piece. This way, someone working on the rest of
the program does not have to remember or even be aware of that
knowledge. And if these details change, only the code directly around
it needs to change.
@!cf86173dcc90bb667640776cb9476cc5b8d3facf

{{id interface}}
@!8b2e5738fd16946c6070fa2100ad7af95829dd77

Different pieces of such a program interact with each other through
_((interface))s_, which are limited sets of functions or bindings that
provide useful functionality at a more abstract level, hiding its
precise implementation.
@!dadf66f0d174ea10313f3a8d037823e9e103b9fc

{{index "public properties", "private properties", "access control"}}
@!a95882579faf9d558dbe09cf24221561ca3fde11

Such pieces of program are typically modeled using ((object))s. Their
interface consists of a specific set of ((method))s and properties.
Properties that are part of the interface are called _public_. The
others, that outside code should not be touching, are called
_private_.
@!6a85995372c56a22b38174947bad1a080eee5d53

{{index "underscore character"}}
@!4a6372b57618728f5a54b30b21d9eaad93a07736

Many languages provide a way to distinguish public and private
properties, and will prevent outside code from accessing the private
ones altogether. JavaScript, once again taking the minimalist
approach, doesn't help at all here. But JavaScript programmers _are_
successfully using this idea in their programs. Typically, the
available interface is described in documentation or comments. It is
common to put an underscore (`_`) character at the start of property
names to indicate that those properties are private.
@!9300d4d60f8484f2e5833b147e57622f7db591bf

Separating interface from implementation is a great idea. It is
usually called _((encapsulation))_. Using objects as values with
interfaces is a practical way to apply this idea.
@!fcd9d578c492cd278ddd9335803f8ddf556020e1

{{id obj_methods}}
@!a7678289927e392754c27089533e742ec50667a0

## Methods
@!a8092e5f1e83ff3c953c3045765215acb019ad53

{{index "rabbit example", method, property}}
@!4b9e23eac98f0a1148945979e1dc05ebbf5dc11d

Methods are nothing more than properties that hold function values.
This is a simple method:
@!ac89c68ca902414732fc077ac3e05f265647fdd3

```
let rabbit = {};
rabbit.speak = function(line) {
  console.log(`The rabbit says '${line}'`);
};

rabbit.speak("I'm alive.");
// → The rabbit says 'I'm alive.'
```
@!0573b9053910c6abcc127e33203766ec5686b961

{{index this, "method call"}}
@!e01b668b45b2e993eff41a0ccb2a6c03ab4d055e

Usually a method needs to do something with the object it was called
on. When a function is called as a method—looked up as a property and
immediately called, as in _object.method()_—the binding called `this`
in its body will point at the object that it was called on.
@!90934f33bc1d465d8acab9a059596d02fac7c863

```{includeCode: "top_lines:6", test: join}
function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my ears and whiskers, " +
                  "how late it's getting!");
// → The white rabbit says 'Oh my ears and whiskers, how
//   late it's getting!'
hungryRabbit.speak("I could sure use a carrot right now.");
// → The hungry rabbit says 'I could sure use a carrot
//   right now.'
```
@!50bbd88d721744829e1462b5aff2c16d2c5212de

{{index "call method"}}
@!732b13fd0b014897d0fa252f2be59560fd577267

{{id call_method}}
@!fa92826396a65c2e3e7823d78f1d0482f109726e

Calling a function directly from an object is not the only way to
provide it with a `this` binding. Functions come with a `call` method
that allows you to call them with a given set of arguments, except
that the first argument provides the `this` value.
@!7858540ee9eae56b126237f34ec5e4b265ed495b

```
speak.call(hungryRabbit, "Burp!");
// → The hungry rabbit says 'Burp!'
```
@!ef880d2d497a62141e46229a1e731c2b945bb41b

You can consider `this` to be an additonal ((parameter)) that's
usually passed implicitly. Since each function has its own implicit
`this` binding, you cannot refer to the `this` of the wrapping scope
in a regular function defined with the `function` keyword.
@!fdd97d8cefca0692263395d1f5298b0ee5c2272f

{{index this, "arrow function"}}
@!d5a3e9eefd04ab1f244fafc28d0956b87e360064

Arrow functions are different—they do not bind their own `this`, and
thus you can do something like the following code, which references
`this` from inside a local function.
@!7a122aaae157d0736a501e0806765bc5e68615ca

```
function normalize() {
  console.log(this.coords.map(n => n / this.length));
}
normalize.call({coords: [0, 2, 3], length: 5});
// → [0, 0.4, 0.6]
```
@!ac49cb4f5b6b286df4ebabf231f352899756536a

{{index "map method"}}
@!cbabf809db32df6fde254593fe815e7880cc790d

If I had written the argument to `map` using the `function` keyword,
this code wouldn't work.
@!96a90980b119023076705807998d0d56f74141b7

{{id prototypes}}
@!24875193937ffde5d9bce1f97f61cf8dcd43ef40

## Prototypes
@!3b09d9fd41fce7218ba0f3a28ecb8d5fd8fe44df

{{index "toString method"}}
@!4c4eb54ea9cbe1bbaf51b7d91a819bcafa739612

Watch closely.
@!cfc444c22c293fe07745685ac85d12a7ca0cc47d

```
let empty = {};
console.log(empty.toString);
// → function toString(){…}
console.log(empty.toString());
// → [object Object]
```
@!6e631a1779faba4a4bbfcec34db92fa9493fc995

{{index magic}}
@!0984e85631f6a4c47f0d9ea8b8f12cfa7959e933

I just pulled a property out of an empty object. Magic!
@!0a5f0bd7becce4202581aeb17e6cb0aa8414a046

{{index property, object}}
@!d2db528bed22f8ce95b025e14f665eeed61d088d

Well, not really. I have simply been withholding information about the
way JavaScript objects work. In addition to their set of properties,
almost all objects also have a _((prototype))_. A prototype is another
object that is used as a fallback source of properties. When an object
gets a request for a property that it does not have, its prototype
will be searched for the property, then the prototype's prototype, and
so on.
@!3af28c4937fa90602651fddf0f62d5b966791aff

{{index "Object prototype"}}
@!43a498571f8499dbec51fed00a50f7c1c09188f3

So who is the ((prototype)) of that empty object? It is the great
ancestral prototype, the entity behind almost all objects,
`Object.prototype`.
@!c08bcc3e879b39ba1e8dd8282bc0649ec5298ac1

```
console.log(Object.getPrototypeOf({}) ==
            Object.prototype);
// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null
```
@!22e461586aefcd94585958ce3848e7eed462e6c9

{{index "getPrototypeOf function"}}
@!9adef0858bee37a4ae583c2a63c082f3221290d4

As you might have guessed, the `Object.getPrototypeOf` function
returns the prototype of an object.
@!4d4c2e6159893f4b0048616c54317728f4fef30f

{{index "toString method"}}
@!5bb9351bbb02a9964cc8614449fc521b2d77befd

The prototype relations of JavaScript objects form a ((tree))-shaped
structure, and at the root of this structure sits `Object.prototype`.
It provides a few ((method))s that show up in all objects, such as
`toString`, which converts an object to a string representation.
@!516b1ee5100f6a5cd4646b2fdf234fbb7d6eca01

{{index inheritance, "Function prototype", "Array prototype", "Object prototype"}}
@!082fd37fc362a267731278f2616bb6e0f55e4640

Many objects don't directly have `Object.prototype` as their
((prototype)), but instead have another object, which provides its own
default properties. Functions derive from `Function.prototype`, and
arrays derive from `Array.prototype`.
@!6e1191f877d79d60958616e7d75e9fe871217851

```
console.log(Object.getPrototypeOf(Math.max) ==
            Function.prototype);
// → true
console.log(Object.getPrototypeOf([]) ==
            Array.prototype);
// → true
```
@!49da3168c4ea5cff9382ad00e3f217f22446ea9f

{{index "Object prototype"}}
@!2ccf537ee3d1bef93bcedd37569b8ffe4fbd0203

Such a prototype object will itself have a prototype, often
`Object.prototype`, so that it still indirectly provides methods like
`toString`.
@!f94fe8e9d16ff3e3f9c373cc0c76302490915f0e

{{index "rabbit example", "Object.create function"}}
@!34adc4201fa88b0c386e67b5ee37fca6f02cf1b1

You can use `Object.create` to create an object with a specific
((prototype)).
@!05ecf62216a7ca733859ea0183288599b382c0df

```
let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");
// → The killer rabbit says 'SKREEEE!'
```
@!0a7c51a6d042e2328538051cccbc2e3de9038a59

{{index "shared property"}}
@!9d0270984c1690f6d8254003a6ff2eaf8d74af35

A property like `speak(line)` in an object expression is a shorthand
for defining methods. It creates a property called `speak` and gives
it a function as its value.
@!0e3badf8731ec369f5dee54451e009ff5a957828

The “proto” rabbit acts as a container for the properties that are
shared by all rabbits. An individual rabbit object, like the killer
rabbit, contains properties that apply only to itself—in this case its
type—and derives shared properties from its prototype.
@!9ab6c523e56671e771d954333d241cc7f3cb8d48

{{id classes}}
@!77d08b6724dd27e2221e3f461cd4e1f1eb74b1c2

## Classes
@!293941d8074b55d12def19a556efce3f32bb1c15

{{index "object-oriented programming"}}
@!465fb62f09f2bf8622ba087dc1c8d82f77d182bd

JavaScript's ((prototype)) system can be interpreted as a somewhat
informal take on an object-oriented concept called _((class))es_. A
class defines the shape of a type of object—what methods and
properties it has. Such an object is called an _((instance))_ of the
class.
@!165221f1319ac7a830b906e104e84fee6cee737a

Prototypes are useful for defining properties for which all instances
of a class share the same value, such as ((method))s. Properties that
differ per instance, such as our rabbits' `type` ((property)), need to
be stored directly in the objects themselves.
@!91d82a28eb9893cce9ce9f374750ac3a5603529c

So in order to create an instance of a given class, you have to make
an object that derives from the proper prototype, but you _also_ have
to make sure it, itself, has the properties that instances of this
class are supposed to have. This is what a _((constructor))_ function
does.
@!dd66fa2877751dbd632b4b80666a3f9a3d56110a

```
function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}
```
@!44e58dd119d8e9c7bd87d2756830dc5a4beda619

{{index "new operator", this, "return keyword", [object, creation]}}
@!252cddd3f80cf3d6cc80698735f5a83f87a197df

JavaScript provides a way to make defining this type of function
easier. If you put the keyword `new` in front of a function call, the
function is treated as a constructor. This means that an object with
the right prototype is automatically created, bound to `this` in the
function, and returned at the end of the function.
@!7007bffc8626f8c408bfb5fb307861297e5414cc

{{index "prototype property"}}
@!f4666349360bc7b55a3c815ffd9feda0fc33820e

The appropriate prototype object for a constructor is found by taking
the `prototype` property of the constructor function.
@!1486c2bee364bf34b9207531bc69848f4d8f696c

{{index "rabbit example"}}
@!109d3cc6fb748b02d1e84f6cd5cb8b29dd4f154c

```
function Rabbit(type) {
  this.type = type;
}
Rabbit.prototype.speak = function(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};

let weirdRabbit = new Rabbit("weird");
```
@!c3e35daf6db99fd1d9a15825072ad2a70db63a64

{{index constructor}}
@!58a094b3512b99b0e52e2058315aaf841844317e

Constructors (all functions, in fact) automatically get a property
named `prototype`, which by default holds a plain, empty object that
derives from `Object.prototype`. You can overwrite it with a new
object if you want. Or you can add properties to the existing object,
as the example does.
@!13923d1867f7e4a11bdbba5c97278ca74db52c35

{{index capitalization}}
@!d5e5b8f80c848098a26317c2fde5cb775440c83b

It is a convention to capitalize the names of constructors so that
they are easily distinguished from other functions.
@!327368d3be603f18db1e7f76600a2150c40c1cd0

{{index "prototype property", "getPrototypeOf function"}}
@!a2b40666fb8ba21c86a6ee55fd38236e681ecd55

It is important to understand the distinction between the way a
prototype is associated with a constructor (through its `prototype`
property) and the way objects _have_ a prototype (which can be
retrieved with `Object.getPrototypeOf`). The actual prototype of a
constructor is `Function.prototype` since constructors are functions.
Its `prototype` _property_ holds the prototype of instances created
through it but is not its _own_ prototype.
@!84ec2ee603839507c9115873d97808efc54c55bf

## Class notation
@!a7675019358102af0f431c78fca0ed963b4b5285

So JavaScript ((class))es are ((constructor)) functions with a
((prototype)) property. That how they work, and until 2015, that's how
you had to write them. These days, we have a less awkward notation.
@!92cfab510e7ed4af0d6eb5a40ce7dfd7eb851b4e

```{includeCode: true}
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");
```
@!e270db9320647661b4856050c66d1b0c838624bc

{{index "rabbit example"}}
@!ebfa7155c777c274950cf64a65a8b11b97985bed

The `class` keyword starts a ((class declaration)), which allows us to
define a constructor and a set of methods all in a single place. Any
number of methods may be written inside the declaration's ((curly
braces)). The one named `constructor` is treated specially. It
provides the actual constructor function, which will be bound to the
name `Rabbit`. The others are packaged into that constructor's
prototype. Thus, the definition above is equivalent to the constructor
definition in the previous section. It just looks nicer.
@!bb8d66bae0d7c89176198f13d438e8a3a346818a

{{index ["class declaration", properties]}}
@!a54736edbd6715ab809527ef467af843b616b0e6

Class declarations _only_ allow methods, properties that hold
functions, to be added to the ((prototype)). This can be somewhat
inconvenient when you want to save a non-function value in there—but
you can still create such properties by directly manipulating the
prototype after you've defined the class.
@!76a8295494305bcb6e37d635942f24965d7f8c37

## Overriding derived properties
@!824726339609ac2eedab6922147e01be49da0c1c

{{index "shared property", overriding}}
@!6342af407bf181e89e724fef2957e4e59b93980f

When you add a ((property)) to an object, whether it is present in the
prototype or not, the property is added to the object _itself_, which
will henceforth have it as its own property. If there _is_ a property
by the same name in the prototype, this property will no longer affect
the object because it is hidden behind the object's own property.
@!b29d0dc982bd7c12ba8e469fc630dd5156e614b5

```
Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// → small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// → long, sharp, and bloody
console.log(blackRabbit.teeth);
// → small
console.log(Rabbit.prototype.teeth);
// → small
```
@!8ae371013163a0d05674f1c1ed63104e1565bf12

{{index [prototype, diagram]}}
@!36f5bd4ede652dac30ed81f89ed60c824c390677

The following diagram sketches the situation after this code has run.
The `Rabbit` and `Object` ((prototype))s lie behind `killerRabbit` as
a kind of backdrop, where properties that are not found in the object
itself can be looked up.
@!fe833ba058c202bd565872b9db2efa23c1c4292d

{{figure {url: "img/rabbits.svg", alt: "Rabbit object prototype schema",width: "8cm"}}}
@!4386a7df13f495a4340d930250c77d59691d8211

{{index "shared property"}}
@!c82e59b7570cb5b584a83db2bb181dd5396dbe0f

Overriding properties that exist in a prototype can be a useful thing
to do. As the rabbit teeth example shows, it can be used to express
exceptional properties in instances of a more generic class of
objects, while letting the nonexceptional objects simply take a
standard value from their prototype.
@!8fb2bc7bf090aacbfa31d650af9a40f4a7537314

{{index "toString method", "Array prototype", "Function prototype"}}
@!3745522c6e6b84c276d12a98151c161460c16724

It is also used to give the standard function and array prototypes a
different `toString` method than the basic object prototype.
@!9d7f3dfecbdd0da8c52d0e57f0eed0827ae844da

```
console.log(Array.prototype.toString ==
            Object.prototype.toString);
// → false
console.log([1, 2].toString());
// → 1,2
```
@!9c1d8a9e8061e59fd212fa1225f73dfee03d66ae

{{index "toString method", "join method", "call method"}}
@!6287e72d87078cbb3e91a2eec52712df2a306d57

Calling `toString` on an array gives a result similar to calling
`.join(",")` on it—it puts commas between the values in the array.
Directly calling `Object.prototype.toString` with an array produces a
different string. That function doesn't know about arrays, so it
simply puts the word “object” and the name of the type between square
brackets.
@!e62b70ca8a0eedce53d6bb6f4734c2ad72992ad4

```
console.log(Object.prototype.toString.call([1, 2]));
// → [object Array]
```
@!fc5caf22226d0b98d6de454ba18246e9d2cf8681

## Maps
@!7c0365a2cc2d1c8d20bebd1850d0f8cd42307c76

{{index "map (data structure)", "ages example", "data structure"}}
@!fee90781aaaeeb1001cf0f25cd76f2253bdba3f8

A _map_ is a data structure that associates values with other values.
For example, you might want to map names to ages. It is tempting to
use objects for this.
@!7a1316b0946bf3251d58e11b0c794674e7e50937

```
let ages = {
  Boris: 39,
  Liang: 22,
  Júlia: 62
};

console.log(`Júlia is ${ages["Júlia"]}`);
// → Júlia is 62
console.log(`Is Jack's age known? ${"Jack" in ages}`);
// → Is Jack's age known? false
console.log(`Is toString's age known? ${"toString" in ages}`);
// → Is toString's age known? true
```
@!70ee6e1d73ea298e27011773e41ea138b7253edf

{{index "Object.prototype", "toString method"}}
@!9c246a37e17d04f7ded8cca4bf5ac1fec2b0af4c

Here, the object's property names are names, and their values ages.
But we certainly didn't list anybody named toString in our map. Yet,
because plain objects derive from `Object.prototype`, it looks like
the property is there.
@!167c6f81fc45a659ef5947f171d381bc51593cf2

{{index "Object.create function", prototype}}
@!92abf9ce2eae2adcae2cb07af9fd0e26052076b9

As such, using plain objects as maps is dangerous. There are several
possible ways to avoid this problem. Firstly, it is possible to create
objects with _no_ prototype. If you pass `null` to `Object.create`,
the resulting object will not derive from `Object.prototype`, and can
safely be used as a map.
@!b29ddab1f90a5f2a546c04f23be3b989d1d3cbcf

```
console.log("toString" in Object.create(null));
// → false
```
@!abe475c35751ec38cfcd3bd58418f66ed1820ec1

However, because property names are strings, this still doesn't help
when your _key_ values are of some other type.
@!18a7c7a1f7a9ae6a45e31ed9a41e6bcfb16b3173

{{index "Map class"}}
@!051afa154eb0210868631bff8df9ed860e5ffd5f

Fortunately, JavaScript comes with a class called `Map` that is
written for this exact purpose. It stores a mapping, and allows any
type of keys.
@!f313b078b828faff70b6f862bbc33494f2c00878

```
let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);

console.log(`Júlia is ${ages.get("Júlia")}`);
// → Júlia is 62
console.log(`Is Jack's age known? ${ages.has("Jack")}`);
// → Is Jack's age known? false
```
@!de0b601adece4f821e6052f5dcb44d6a86cde84d

{{index interface, "set method", "get method", "has method", encapsulation}}
@!b26f13f8fffea016d7c90e0f5fde50794f324329

The methods `set`, `get`, and `has` are part of the interface of the
`Map` object. Writing a data structure that can quickly store and
retrieve from a large set of values isn't easy, but we don't have to
worry about that. Someone else did it for us, and we can go through
this simple interface to use their work.
@!b0d7f0b08d39f785de70f7d32d0e0ecec12a9882

{{index "hasOwnProperty method", "in operator"}}
@!558cf95ecb18f56c8a7342859009f875c0846f9d

If you do have a plain object that you need to treat as a map for some
reason, it is useful to know that `Object.keys` only returns an
object's _own_ keys, not those in the prototype. As an alternative to
the `in` operator, you can use the `hasOwnProperty` method.
@!334c6060889f42ded66bdee2515cd9a578520eaa

```
console.log({x: 1}.hasOwnProperty("x"));
// → true
console.log({x: 1}.hasOwnProperty("toString"));
// → false
```
@!c748cb661832b25cc12a45739dfc3f412d1063aa

## Polymorphism
@!9584c8dc95b648e58670af9379032f6a4056ed07

{{index "toString method", "String function", polymorphism, overriding, "object-oriented programming"}}
@!e930abeed232c03d3e3470de9365d253a4b97361

When you call the `String` function (which converts a value to a
string) on an object, it will call the `toString` method on that
object to try to create a meaningful string to return. I mentioned
that some of the standard prototypes define their own version of
`toString` so they can create a string that contains more useful
information than `"[object Object]"`. You can also do that yourself.
@!792fa639fa72baece5b0e9e5e3fe4417916a51ef

```{includeCode: "top_lines: 3"}
Rabbit.prototype.toString = function() {
  return `a ${this.type} rabbit`;
};

console.log(String(blackRabbit));
// → a black rabbit
```
@!92cb873f94e91500315c7d5c92c2f140e12728ef

{{index "object-oriented programming"}}
@!25442a6312933aa0f66ddb8861d745c21f8289e2

This is a simple instance of a powerful idea. When a piece of code is
written to work with objects that have a certain ((interface))—in this
case, a `toString` method—any kind of object that happens to support
this interface can be plugged into the code, and it will just work.
@!c607c0f624074bd8d6bfd21d5fc170c0e035c05e

This technique is called _polymorphism_. Polymorphic code can work
with values of different shapes, as long as they support the interface
it expects.
@!4266ffb55994fb22cf5b51989b663300eb938b47

{{index "for/of loop", "iterator interface"}}
@!4deee6732b05c7deda5e785797c8024618c16e54

I mentioned in [Chapter 4](04_data.html#for_of_loop) that a `for`/`of`
loop can loop over several kinds of data structures. This is another
case of polymorphism—such loops expect the data structure to expose a
specific interface, which arrays and strings do. And you can also add
this interface to your own objects! But before we can do that, we need
to look at symbols.
@!f3d1739c3fc63aeeeaaea25cb43ddaeb7d1d2e9f

## Symbols
@!49acac29ab7fd568c622384ac3d9c357b873c7d4

When using interfaces you might run into a problem where multiple
interfaces use the same property name to mean different things. For
example, if I were to define my own interface in which the `toString`
method is supposed to convert the object into a piece of yarn, it
would not be possible for an object to conform to both interfaces.
@!8a9c15f9bebae7cca081b6f33a6b71c51acb58d8

That would be a bad idea, and this problem isn't that common. Most
JavaScript programmers simply don't think about it. But the language
designers, whose _job_ it is to think about this stuff, have provided
us with a solution anyway.
@!fcdfeafdf042c2b53bcd12107970da991bfb62e4

{{index "Symbol function", property}}
@!96beff6e763525c406fc885ea404a93fc6854337

When I claimed that property names are strings, that wasn't entirely
accurate. They usually are, but they can also be _((symbol))s_.
Symbols are values created with the `Symbol` function. Unlike strings,
newly created symbols are unique—you cannot create the same symbol
twice.
@!0573ea000a08f06a0e6abf34e8c201b22dba0bd2

```
let sym = Symbol("sym");
console.log(sym == Symbol("sym"));
// → false
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);
// → 55
```
@!82a69dc5bb13b99fdb71ac6bf1e31e6a28bf50a0

The string you pass to `Symbol` is included when you convert it to a
string, and is useful to make it easier to recognize a symbol when,
for example, showing it in the console. But it has no meaning beyond
that.
@!38dfb332e0e2053f49dd04aa5ea6aaeb9b199a89

Being useable as property names and being unique makes symbols
suitable for defining interfaces that can peacefully live alongside
arbitrary other properties.
@!2f3571766570ae3c8428e6dca00301f6886d33a1

```{includeCode: "top_lines: 1"}
const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function() {
  return `${this.length} cm of blue string`;
};

console.log([1, 2].toString());
// → 1,2
console.log([1, 2][toStringSymbol]());
// → 2 cm of blue string
```
@!20c5aff4032b01ff8b85eb6d87a8d8ee4964aa51

It is possible to include symbol properties in object expressions and
classes by using ((square bracket))s around the ((property)) name.
That, much like the square bracket property access notation, causes
the property name to be evaluated, allowing us to refer to a binding
holding the symbol.
@!cc0f72289c4dfddd9e8ee9587ad76e96b50460f9

```
let stringObject = {
  [toStringSymbol]() { return "a jute rope"; }
};
console.log(stringObject[toStringSymbol]());
// → a jute rope
```
@!65107ee70e9b5fcce2c83d8f055718c9416ff822

## The iterator interface
@!1e267b792cd11c6bf81daae1a9f134c487bba504

{{index "iterable interface", "Symbol.iterator symbol", "for/of loop"}}
@!470d1b135dfea98e01b10a14ad10b5f68775dda0

The object given to a `for`/`of` loop is expected to be _iterable_.
This means that it has a method named with the `Symbol.iterator`
symbol (a symbol value defined by the language, stored as a property
of the `Symbol` function).
@!226cb0f6f51e8a229aa20d7679e3f9bba95cc2a3

{{index "iterator interface", "next method"}}
@!fc6bcb6637f58cc0f0b6ae67e494529ecab6b8cb

When called, that method should return an object that provides a
second interface, _iterator_. This is the actual thing that iterates.
It has a `next` method that returns the next result. That result
should be an object with a `value` property, providing the next value,
and a `done` property, which should be true when there are no more
results and false otherwise.
@!d15fe8808f756b020ef0d877d05cef5f1e72673b

Note that the `next`, `value`, and `done` property names are plain
strings, not symbols. Only `Symbol.iterator`, which is likely to be
added to a _lot_ of different objects, is an actual symbol.
@!78555fecd42a21d02de3b69cb796af1bfa20ee5d

We can directly use this interface ourselves.
@!6ed2fc665ba993087c097b8bf8c3cb0ddd66875f

```
let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next());
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}
```
@!58a423155cb76af437acc1d95f20ef199545a966

{{index "matrix example", "Matrix class", array}}
@!981bba6da1e2a8757801f6f86f7b10a6e05b18a5

Let's implement an iterable data structure. We'll build a _matrix_
class, acting as a two-dimensional array.
@!65e80f942230f0e85202053375a7360e7ca44036

```{includeCode: true}
class Matrix {
  constructor(width, height, content = () => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];

for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = content(x, y);
      }
    }
  }

get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}
```
@!08ae727b4446bf191e69f695013e8410bc70ef4d

This class stores its content in a single array with _width_ ×
_height_ elements. The elements are stored row-by-row, so for example
the third element in the fifth row is (using zero-based indexing)
stored at position 4 × _width_ + 2.
@!79eaed9c63cc03882942112df4d1e822dc44ddb3

The constructor function takes a width, height, and an optional
content function that will be used to fill in the initial values.
There are also `get` and `set` methods to retrieve and update elements
in the matrix.
@!04cc3ecc9ff93385c67f47d7002143502e8384a7

When looping over a matrix, you are usually interested in the position
of the elements as well as the elements themselves, so we'll have our
iterator produce objects with `x`, `y`, and `value` properties.
@!be5046e6fd02c774626e240866249111e652485c

{{index "MatrixIterator class"}}
@!70993d75588af196de3a4dcb0071788490278891

```{includeCode: true}
class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

next() {
    if (this.y == this.matrix.height) return {done: true};

let value = {x: this.x, y: this.y,
                 value: this.matrix.get(this.x, this.y)};
    this.x++;
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    return {value, done: false};
  }
}
```
@!bdaf2457863d4d39066c7a25172bb0f19ddd16fd

The class tracks the progress of iterating over a matrix in its `x`
and `y` properties. The `next` method starts by checking whether the
bottom of the matrix has been reached. If it hasn't, it _first_
creates the object holding the current value, and _then_ updates its
position, moving to the next row if necessary.
@!1c50df49a11e74cdf48667dc35c05355a75bbc3d

Let us set up the `Matrix` class to be iterable. Throughout this book,
I'll occasionally use after-the-fact prototype manipulation to add
methods to classes, so that the individual pieces of code remain small
and self-contained. In a regular program, where there is no need to
split the code into small pieces, you'd declare these methods directly
in the class instead.
@!4c0651038d4df67b5e539d9afdc38c1b27666799

```
Matrix.prototype[Symbol.iterator] = function() {
  return new MatrixIterator(this);
};
```
@!cf877662ddb360f9fe78983ef2675194b66273ab

{{index "for/of loop"}}
@!7e75ec4ce8540c4a2c2d28324b979493d234c83d

We can now loop over a matrix with `for`/`of`.
@!6aa22625dd0ef4a2d9c866c1894eb18568420f07

```
let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
for (let {x, y, value} of matrix) {
  console.log(x, y, value);
}
// → 0 0 value 0,0
// → 1 0 value 1,0
// → 0 1 value 0,1
// → 1 1 value 1,1
```
@!5cded684e17f1c52b5915f64ad7dbbb706969393

## Getters, setters, and statics
@!f1cdecc9db855f1ebba3de28ab4d3fc738925fb0

{{index interface, property, "Map class"}}
@!61d2249c506eef994fbb1a4b103fa1306446fefc

Interfaces often consist mostly of methods, but it is also okay to
include properties that hold non-function values. For example, `Map`
objects have a `size` property that gives you the amount of keys
stored in it.
@!0dc7a48504f85759af20052411ad9b62a9cf7261

It is not even necessary for such an object to compute and store such
a property directly in the instance. Even properties that are accessed
directly may hide a method call. Such methods are called
_((getter))s_, and they are defined by writing `get` in front of the
method name in an object expression or class declaration.
@!05bfac21bdf747b75a1c7812a0dbbfe69567f401

```{test: no}
let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  }
};

console.log(varyingSize.size);
// → 73
console.log(varyingSize.size);
// → 49
```
@!76f653a84c59e7fee0d97f9ad2d2450f89dcce62

{{index "temparature example"}}
@!10472d515c48c056a6a165e2c85a84490d984a99

Whenever someone reads from this object's `size` property, the
associated method is called. You can do a similar thing when a
property is written to, using a _((setter))_.
@!1a389aed7dc123047d8b3305206b9ad8c175a193

```{test: no}
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }

static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// → 30
```
@!f779960ca08947d24d31bf4cd0978fac457c8750

The `Temperature` class allows you to read and write the temperature
in either degrees ((Celsius)) or degrees ((Fahrenheit)), but
internally only stores Celsius, and automatically converts to Celsius
in the `fahrenheit` getter and setter.
@!e236c2a3817d49df89cfd01b312edab7e2c07deb

{{index "static method"}}
@!4d3eb84a6bbf7e231a92abf865d5d2c6eb41125c

Sometimes you want to attach some properties directly to your
constructor function, rather than to the prototype. Such methods won't
have access to a class instance, but can for example be used to
provide additional ways to create instances.
@!bfa658868622f4e58c39f1a594295f3d81ad1539

Inside a class declaration, methods that have `static` written before
their name are stored on the constructor. So the `Temperature` class
allows you to write `Temperature.fromFahrenheit(100)` to create a
temperature using degrees Fahrenheit.
@!29da483a373426f15017c94fbe66ca9cafc1aa87

## Inheritance
@!845a51d955bf46e297a4587ae039e2928bd8db15

{{index inheritance, "matrix example", "object-oriented programming", "SymmetricMatrix class"}}
@!6f6deff3e0ed7234ce5e44f2d095fc61e8eecd59

Some matrices are known to be _symmetric_. If you mirror a symmetric
matrix around it top-left to bottom-right diagonal, it stays the same.
In other words, the value stored at _x_,_y_ is always the same as that
at _y_,_x_.
@!e105fddc76d8a47f2ebb7e79515a13f0d36d4435

Imagine we need a data structure like `Matrix`, but one which is
enforces the fact that the matrix is and remains symmetrical. We could
write it from scratch, but that would involve repeating some code very
similar to what we already wrote.
@!fac5c32c1659c3f649ee2083d220b8992110544b

{{index overriding, prototype}}
@!16e781144f09358bc19e8306619637ae09b89c2d

JavaScript's prototype system makes it possible to create a _new_
class, much like the old class, but with new definitions for some of
its properties. The prototype for the new class derives from the old
prototype, but adds a new definition for, say, the `set` method.
@!532af9d871b3f057a728eb9712e6ebfa430c4cc6

In object-oriented programming terms, this is called
_((inheritance))_. The new class inherits properties and behavior from
the old class.
@!6e74c09f843b4f88a165f73dcf6f6f27ad8441ba

```{includeCode: "top_lines: 16"}
class SymmetricMatrix extends Matrix {
  constructor(size, content = () => undefined) {
    super(size, size);
    for (let y = 0; y < this.width; y++) {
       for (let x = 0; x <= y; x++) {
         this.set(x, y, content(x, y));
       }
    }
  }

set(x, y, value) {
    super.set(x, y, value);
    if (x != y) {
      super.set(y, x, value);
    }
  }
}

let matrix = new SymmetricMatrix(5, (x, y) => `${x},${y}`);
console.log(matrix.get(3, 2));
// → 2,3
```
@!8cc718301f3a72ed42c2c38da8d003a2d601996e

The use of the word `extends` indicates that this class shouldn't be
based on the default `Object` prototype, but on some other class. This
is called the _((superclass))_. The derived class is the
_((subclass)_.
@!7ee87bfb4bfc56585a2c063e8a11defe17852f44

To initialize a `SymmetricMatrix` instance, the constructor calls its
superclass' constructor through the `super` keyword. This is necessary
because if this new object is to behave (roughly) like a `Matrix`, it
is going to need the instance properties that matrices have. In order
to ensure the matrix is symmetrical, the constructor doesn't pass the
`content` function to the superclass' constructor, but has its own
loop, which initializes only the part below the diagonal and relies on
the `set` method to copy those values to the other half.
@!5c8d221f5b6ec424759bbfc7548e4ae72cec0eeb

The `set` method again uses `super`, but this time not to call the
constructor, but to call a specific method from the superclass' set of
methods. We are redefining `set`, but do want to use the original
behavior. Because `this.set` refers to the _new_ `set` method, calling
that wouldn't work. Inside class methods, `super` provides a way to
call methods as they were defined by the superclass.
@!e1d614c0a988e71d62dff106d02f1290dfe959eb

Inheritance allows us to build slightly different data types from
existing data types with relatively little work. It is a fundamental
part of the object-oriented tradition, alongside encapsulation and
polymorphism. But while the latter two are now generally regarded as
wonderful ideas, inheritance is more controversial.
@!99bc1ff6f363779a8fad034f85c3aeca5a857005

{{index complexity, reuse, "class hierarchy"}}
@!bfeb89c10453162175974a04bd30a105947abdee

Whereas ((encapsulation)) and polymorphism can be used to _separate_
pieces of code from each other, reducing the tangledness of the
overall program, ((inheritance)) fundamentally ties classes together,
creating _more_ tangle. When inheriting from a class, you usually have
to know more about how it works than when simply using it. Inheritance
can be a useful tool, and I use it regularly in my own programs, but
it shouldn't be the first tool you reach for, and you probably
shouldn't actively go looking for opportunities to construct class
hierarchies (family trees of classes).
@!d81dd07044e505aea1c00e45ca9bbe6bcd68b607

## The instanceof operator
@!ff231be6f1aa652aa40dad807a5c88d8bfd34b1d

{{index type, "instanceof operator", constructor, object}}
@!332d90b5cc102a7b4d5fcad3c53e1f4d5405a15a

It is occasionally useful to know whether an object was derived from a
specific class. For this, JavaScript provides a binary operator called
`instanceof`.
@!ea4c8ae8270eadcc10f4dd071d2e9a6440a1e14a

```
console.log(
  new SymmetricMatrix(2) instanceof SymmetricMatrix);
// → true
console.log(new SymmetricMatrix(2) instanceof Matrix);
// → true
console.log(new Matrix(2, 2) instanceof SymmetricMatrix);
// → false
console.log([1] instanceof Array);
// → true
```
@!3f14b951437a3ae01d88ec23499a34352cca9b67

{{index inheritance}}
@!f66a8fa0c7ed8bef37f44cbba9d9bcf22e1f27f5

The operator will see through inherited types. A `SymmetricMatrix` is
an instance of `Matrix`. The operator can be applied to standard
constructors like `Array`. Almost every object is an instance of
`Object`.
@!d9d0b5c054f6a6267a3da4f0321fffda83974ae0

## Summary
@!41d1891a664719393015ffb8fa3495907e2b5001

So objects do more than just hold their own properties. They have
prototypes, which are other objects. They will act as if they have
properties they don't have as long as their prototype has that
property. Simple objects have `Object.prototype` as their prototype.
@!5fc218b036ad483c812f40e2aeab53af62740946

Constructors, which are functions whose names usually start with a
capital letter, can be used with the `new` operator to create new
objects. The new object's prototype will be the object found in the
`prototype` property of the constructor function. You can make good
use of this by putting the properties that all values of a given type
share into their prototype. The `class` notation provides a clear way
to define a constructor and its prototype.
@!2736ca4c7722397fe291ef3cdf3465222908010e

You can define getters and setters to secretly call methods every time
an object's property is accessed. Static methods are methods stored in
a class' constructor, rather than its prototype.
@!7483dd72575909e374403cd11f90bb72c052981f

The `instanceof` operator can, given an object and a constructor, tell
you whether that object is an instance of that constructor.
@!515f21aab1a08196732ea669c5fb848d315f19f7

One useful thing to do with objects is to specify an interface for
them and tell everybody that they are supposed to talk to your object
only through that interface. The rest of the details that make up your
object are now _encapsulated_, hidden behind the interface.
@!804f0a1d990f719d597f58f9cfb9437c7a4f7201

More than one type may implement the same interface. Code written to
use an interface automatically knows how to work with any number of
different objects that provide the interface. This is called
_polymorphism_.
@!1af0c6ebfcd2ebc24edad055fa7dbbc6bdf26f4e

When implementing multiple classes that differ in only some details,
it can be helpful to write the new classes as _subclass_ of an
existing class, _inheriting_ part of its behavior.
@!cb276498ed63de52e3949b84201c02d098379400

## Exercises
@!bb145ca76f09a9f8940387a1ee990c6492610ae8

{{id exercise_vector}}
@!d359b6fe77114180a27295ddd2608de929f7a91a

### A vector type
@!3016bf5a363b2f15519ad23be40c1422bd74f827

{{index dimensions, "Vector type", coordinates, "vector (exercise)"}}
@!5b14f5f84ef48884cfe5394701d347aff5d12a5a

Write a ((class)) `Vector` that represents a vector in two-dimensional
space. It takes `x` and `y` parameters (numbers), which it should save
to properties of the same name.
@!44bb3e748a1d5536cf0ca4f09993d5179480131a

{{index addition, subtraction}}
@!4d729f967a48f240d78c857875858b617528fc0c

Give the `Vector` prototype two methods, `plus` and `minus`, that take
another vector as a parameter and return a new vector that has the sum
or difference of the two vectors’ (the one in `this` and the
parameter) _x_ and _y_ values.
@!7f87e8772604712a800f012542392d4de2c2ba7a

Add a ((getter)) property `length` to the prototype that computes the
length of the vector—that is, the distance of the point (_x_, _y_) from
the origin (0, 0).
@!14f017769650a43ee0d38f624791e9f2220d27ca

{{if interactive
@!64fec2bd4954516c0f51a3213e8ae039023a9be6

```{test: no}
// Your code here.

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5
```
@!030028cb15bb8848a25cf22f23490f79d12d0fbf

if}}
@!d22bbd4a32e9fd4ec11ecb6fd59fb4c5043129f3

{{hint
@!cc3ee97c9b7d99e6d87234b312bc6be9a3b0c65b

{{index "vector (exercise)"}}
@!512d88545e9a5727fb9b4b3535c9cee53966e87b

Your solution can follow the pattern of the `Rabbit` class from this
chapter quite closely.
@!adfb4e59027b001c58e461356480c74152ec5bd0

{{index Pythagoras, "defineProperty function", "square root", "Math.sqrt function"}}
@!dea64c353a145ff0899d5dd841ed01eea43b43f9

Adding a getter property to the constructor can be done by putting the
word `get` before the method name. To compute the distance from (0, 0)
to (x, y), you can use the Pythagorean theorem, which says that the
square of the distance we are looking for is equal to the square of
the x-coordinate plus the square of the y-coordinate. Thus, [√(x^2^ +
y^2^)]{if html}[[$\sqrt{x^2 + y^2}$]{latex}]{if tex} is the number you
want, and `Math.sqrt` is the way you compute a square root in
JavaScript.
@!9d4e3dcbeee6f5e2e0ec7259eb7adbb2925bc2b4

hint}}
@!e52b619cc064a325526eea6e8fcf752e40f5c7de

### List class
@!e78251d980911dc56d85e4711e5cef4b8c4ce0ae

{{index "list (exercise)", interface, iterator, "static method", "List class"}}
@!cec0b1332b633bde4bfedff6b2454f2f94db6126

Rewrite the list data structure from the exercises in [Chapter
4](04_data.html#list) as a ((class)). Give `List` objects their old
`value` and `rest` properties, but also a `toArray` method and a
`length` getter that returns the length of the list. Make `fromArray`
a static method on the `List` constructor.
@!e194a0a5a7f57914f67fd619379fe1dc5a9d4432

In order for lists to work as a class with methods, we can no longer
represent the empty list as `null`, but have to create a special
instance of our class that acts as the empty list placeholder, and
compare with that instance, instead of `null`, when checking if we've
reached the end of a list. Store this instance in `List.empty` (a
static property).
@!89809f738b281bc119f376423404edf68ae6b350

{{if interactive
@!4e89e14509939739a11412a301b73d9dd6107b22

```{test: no}
class List {
  // Your code here.
}

console.log(List.fromArray([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(List.fromArray([10, 20, 30]).toArray());
// → [10, 20, 30]
console.log(new List(2, List.empty).length);
// → 1
```
@!4bbde1b2e81a821866331fc62209adc3f0528d13

if}}
@!1c18fbee68a776d0021b62b80edc9ba694aa87cb

{{hint
@!25e4ecc3680e2dbfb3c7d5a0b855ea2c74679279

{{index "list (exercise)"}}
@!81c91c7d1aee4471fcb4ab0b0cfa06b567e792fa

Your class' constructor should take a value and a rest list as
parameters, and store those in the instance.
@!c1ecb3a036fe46e1351497466a39c2fbd29bb27d

The static `fromArray` method can be written inside the class
declaration. The `empty` property, because it is not a function, must
be added to the prototype afterwards—but that would have been
necessary anyway, because we couldn't create an instance of `List`
before we've finished defining the class.
@!39efd592be1aaba14fb29be82b232b71d06f4b59

The value of the empty list object is not important—when using lists
correctly, it should not be read. The `toArray` and `length` methods
do the right thing automatically, even on this object, if you make the
end conditions of their loops check for `== List.empty`.
@!8b265013f5adc3ac5449645400aeb7d6754a70e1

hint}}
@!62174b091c8be453cdaedb8de31498f536ce7682

### List iteration
@!9393623a636d2e3ae42f3999c8ac72c6aa112457

{{index "list (exercise)", interface, "iterator interface"}}
@!1fc980a311a1d20a0aef6589cb59a80720c3cde8

Make the `List` class from the previous exercise iterable. Refer back
to the section about the iterator interface earlier in the chapter if
you aren't clear on the exact form of the interface anymore.
@!e2148389f37545ca1421ec4b3e7c93b9757e8966

{{if interactive
@!30fc4607b6c5edca0e491c2608478a3786b0d8d5

```{test: no}
// Your code here (and the code from the previous exercise)

for (let value of List.fromArray(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c
```
@!918dc5079d00f055d8b6dd8aff3ae5a67513c9db

if}}
@!b288dc3bf4da3bb4427f0fdc6d0ae2a31b43caa9

{{hint
@!33d1c52c30160da5a70e9b4c7ff95469a9f40a57

{{index "list (exercise)"}}
@!7ae2f2052565de0855c45ecaa7d27028a8a9a326

It is probably worthwhile to define a new class `ListIterator`.
Iterator instances should have a property that tracks the current rest
of the list. If that's the empty list, the `next` method can say it is
done. If not, it should return the current element and move the
current rest forward.
@!132c8d5b9e9f11cee93b8077bc31c1adbc66866e

The list class itself gets a method named by `Symbol.iterator` which,
when called, returns a new instance of the list iterator class.
@!532fa43a3663d30f556c0204d58540f165eb037f

hint}}
@!63a26e1563eb3a0560548cb1a1802664f818a7f3

### Borrowing a method
@!7ddfd0c15e60ce4b6f0cf9bbeaead108f52fdecd

Earlier in the chapter I mentioned that an object's `hasOwnProperty`
can be used as a more robust alternative to the `in` operator when you
want to ignore the prototype's properties. But what if your map needs
to include the word `"hasOwnProperty"`? You won't be able to call that
method anymore, because the object's own property hides the method
value.
@!f2fd2e91e149bc8c93351c74eb3b83c71b30eb3b

Can you think of a way to call `hasOwnProperty` on an object that has
its own property by that name?
@!bab816d50242d0adae9868359e12ebaa65d4b8f4

{{if interactive
@!42ae8328fe5e1a1e0f3dc0b950c5497d403da485

```{test: no}
let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
console.log(map.hasOwnProperty("one"));
// → true
```
@!e9469687d488b1f883d3cb866382a18103073cbe

if}}
@!e22db78f5c01aef52bd07c4f36000f3dd93bdf74

{{hint
@!bd229fde754bd1c3949681d5b84201e44b99d227

Remember that methods that exist on plain objects come from
`Object.prototype`.
@!3745e2a69dc93bf2b32a4989a1dbb8fd6160f495

And that you can call a function with a specific `this` by using it's
`call` method.
@!5a7cc7f67dea5730c84d8feef182869e2f2b4a93

hint}}
@!50046b794e0944fd560ae29f002f9b7c23398670