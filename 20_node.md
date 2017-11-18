{{meta {chap_num: 20, prev_link: 19_paint, next_link: 21_skillsharing, code_links: "[\"code/file_server.js\", \"code/file_server_promises.js\"]"}}}
@!257e9444573c89b43ca6a795ec4f07a9d84f4d23

# Node.js
@!05604c50fe59e8dfec3dae2607d0214d38be5799

{{quote {author: "Master Yuan-Ma", title: "The Book of Programming", chapter: true}
@!9748ee35397f43a6a2809230e2322d053ca51b19

A student asked ‘The
programmers of old used only simple machines and no programming
languages, yet they made beautiful programs. Why do we use complicated
machines and programming languages?’. Fu-Tzu replied ‘The builders of
old used only sticks and clay, yet they made beautiful huts.’
@!8e782c897afcc593c85985294021b1ae35967008

quote}}
@!9b4a5c21c370200eb25c1482a13a470ed934b42a

{{index "command line", "Yuan-Ma", "Book of Programming"}}
@!439d81b7a116f2943210f32d718472b7570936cb

So far, you
have learned the JavaScript language and used it within a single
environment: the browser. This chapter and the [next one](21_skillsharing.html#skillsharing) will briefly introduce
you to ((Node.js)), a program that allows you to apply your JavaScript
skills outside of the browser. With it, you can build anything from
simple command-line tools to dynamic HTTP ((server))s.
@!9dbfca9af411619c4233838c57e780334cc8bf59

These chapters aim to teach you the important ideas that Node.js
builds on and to give you enough information to write some useful
programs for it. They do not try to be a complete, or even a thorough,
treatment of Node.
@!b99b17f9802e0ec371ba607ac0524bc29b91f954

{{if interactive
@!992ec663dc3b3c0adcb01453490678b902ca0d15

Whereas you could run the code in previous chapters directly on these
pages, since it was either raw JavaScript or written for the browser,
the code samples in this chapter are written for Node and won't run
in the browser.
@!5a46f668b46708659d0e4c3fc5311082fc0b1518

if}}
@!abf0ec63850676ef5f9b8ae3c2a43b7a46d3b7b8

If you want to follow along and run the code in this chapter, start by
going to http://nodejs.org[_nodejs.org_] and following the
installation instructions for your operating system. Also refer to
that website for further ((documentation)) about Node and its built-in
((module))s.
@!89c379718a94d0a8f3c11e3b1114a938776d3a2c

## Background
@!ed25438ec85e28c7f0375b88a69a472f5d71f438

{{index responsiveness, input}}
@!57686cf0db5b9441f4d43012120dc1d957dc606f

One of the more difficult problems with
writing systems that communicate over the ((network)) is managing input
and ((output))—that is, the reading and writing of data to and from
the network, the ((hard drive)), and other such devices. Moving data
around takes time, and ((scheduling)) it cleverly can make a big
difference in how quickly a system responds to the user or to network
requests.
@!de75f132a46159d5940737e3039be9cef11fb8d6

The traditional way to handle input and output is to have a function, such as
`readFile`, start reading a file and return only when the
file has been fully read. This is called _((synchronous I/O))_ (I/O
stands for input/output).
@!7fa1c7256a6d44d3ef9b145caf88a60ed762450f

{{index "asynchronous I/O", "asynchronous programming", "callback function"}}
@!de1e0ca6cc2db3526787957d2128b1afcaa3cb8a

Node was initially conceived for the purpose of making
_asynchronous_ I/O easy and convenient. We have seen asynchronous
interfaces before, such as a browser's `XMLHttpRequest` object,
discussed in [Chapter 17](17_http.html#xmlhttprequest). An asynchronous
interface allows the script to continue running while it does its
work and calls a callback function when it's done. This is the way
Node does all its I/O.
@!f717b7d9ed16de1de38e9818614e1b75f00c0bdb

{{index "programming language", "Node.js", standard}}
@!6f067264fd10660fa0e699d9f16fd2e13886c252

JavaScript lends
itself well to a system like Node. It is one of the few programming
languages that does not have a built-in way to do I/O. Thus, JavaScript could
be fit onto Node's rather eccentric approach to I/O without ending up
with two inconsistent interfaces. In 2009, when Node was being
designed, people were already doing callback-based I/O in the browser,
so the ((community)) around the language was used to an ((asynchronous
programming)) style.
@!b7c19da136cd4324c4b242e31fc7ddf5a833dae1

## Asynchronicity
@!22e3040c534d0d7d9e5c76acd223ab827764f6e0

I'll try to illustrate synchronous versus asynchronous
I/O with a small example, where a program needs to fetch two resources
from the Internet and then do some simple processing with the result.
@!120f28963587e78c3f7974a50af4766a9d99191b

{{index "synchronous I/O"}}
@!cd2be1bf54f24f23bb4906c0390783eac3a7f4e1

In a synchronous environment, the obvious way to
perform this task is to make the requests one after the other. This method has the
drawback that the second request will be started only when the first
has finished. The total time taken will be at least the sum of the two
response times. This is not an effective use of the machine, which
will be mostly idle when it is transmitting and receiving data over
the ((network)).
@!c1845a702114d7978180ab88c3b43c086c6c9ac3

{{index parallelism}}
@!064d1d3b91c1e656c499fa66bf0fb6f9e8305fe6

The solution to this problem, in a synchronous
system, is to start additional ((thread))s of control. (Refer to
[Chapter 14](14_event.html#timeline) for a previous discussion of
threads.) A second thread could start the second request, and then
both threads wait for their results to come back, after which they
resynchronize to combine their results.
@!da0580550e5203920e1e9c44021f97c6ee5c01f5

{{index CPU, blocking, "synchronous I/O", "asynchronous I/O", timeline, "callback function"}}
@!aa123d2382a058244a690c2e27ba586bba16f218

In the following diagram,
the thick lines represent time the program spends running normally,
and the thin lines represent time spent waiting for I/O. In the
synchronous model, the time taken by I/O is _part_ of the timeline for
a given thread of control. In the asynchronous model, starting an I/O
action conceptually causes a _split_ in the timeline. The thread that
initiated the I/O continues running, and the I/O itself is done
alongside it, finally calling a callback function when it is finished.
@!506628233bf38219414f04963fa3accc60227be6

{{figure {url: "img/control-io.svg", alt: "Control flow for synchronous and asynchronous I/O",width: "8cm"}}}
@!eb7565cc3717f05c0cd3369af377ab2981bbfe8c

{{index "control flow", "asynchronous programming"}}
@!c8f44a2fbed41621c064a0dc5196fa2cc5821489

Another way to express
this difference is that waiting for I/O to finish is _implicit_ in the
synchronous model, while it is _explicit_, directly under our
control, in the asynchronous one. But asynchronicity cuts both ways. It
makes expressing programs that do not fit the straight-line
model of control easier, but it also makes expressing
programs that do follow a straight line more awkward.
@!cd2ef793b286c36aac4e224426bc105cce5ffa08

{{index verbosity}}
@!2216e6ae2a03daa56761af2c0fcc7bc82bb49206

In [Chapter 17](17_http.html#promises), I already
touched on the fact that all those callbacks add quite a lot of
noise and indirection to a program. Whether this style of
asynchronicity is a good idea in general can be debated. In any case,
it takes some getting used to.
@!e50e151e9351af11cc3ea210fa1690240b73aad2

{{index "asynchronous programming", parallelism}}
@!82649f1f7e82aff8ed123f5854cdf46390167ba2

But for a
JavaScript-based system, I would argue that callback-style
asynchronicity is a sensible choice. One of the strengths of
JavaScript is its simplicity, and trying to add multiple ((thread))s
of control to it would add a lot of complexity. Though callbacks don't tend
to lead to simple _code_, as a _concept_, they're pleasantly
simple yet powerful enough to write high-performance web servers.
@!bc158b022f0c3230c1d39c15b3ca761469efb309

## The node command
@!a641bb4a827a1decdb2fc45bbaf690c6a0bc728f

{{index "node program"}}
@!bf3292fdd07d21bfdb9eb181a9ea6342fdf484c3

When ((Node.js)) is installed on a system, it
provides a program called `node`, which is used to run JavaScript
files. Say you have a file `hello.js`, containing this code:
@!7b6a275b981ac3aadd25f99bfe95caba551e0c17

```
var message = "Hello world";
console.log(message);
```
@!6f86d1119cd03013e9aebc617b2ed1bc711436bd

You can then run `node` from the ((command line)) like this to execute
the program:
@!5ee94e8a6f486db3b9d91e363d30344c8db06d1f

```{lang: null}
$ node hello.js
Hello world
```
@!87f87840a2f234a5171656d7690b694ec9b32e05

{{index "console.log"}}
@!e88634b0c8ccab7f8fd47df608f3663276950c0f

The `console.log` method in Node does something
similar to what it does in the browser. It prints out a piece of text.
But in Node, the text will go to the process’ ((standard output))
stream, rather than to a browser's ((JavaScript console)).
@!e0e74f9607ea84fcc5523fc08b159a1cb1c196fe

{{index "node program", "read-eval-print loop"}}
@!71cc1fda0efbf35c70778a869461f6f799eacf2e

If you run `node` without
giving it a file, it provides you with a prompt at which you can type
JavaScript code and immediately see the result.
@!226cf5532319e0dd61f741d9c042e99a2c0ca054

```{lang: null}
$ node
> 1 + 1
2
> [-1, -2, -3].map(Math.abs)
[1, 2, 3]
> process.exit(0)
$
```
@!0a9c8fa6558d57bb0b3263c85e2226523cd4355c

{{index "process object", "global scope", [variable, global], "exit method", "status code"}}
@!5f276856acf632285133e81cd9c4aac85801b564

The `process` variable, just like the
`console` variable, is available globally in Node. It provides various
ways to inspect and manipulate the current program. The `exit` method
ends the process and can be given an exit status code, which tells
the program that started `node` (in this case, the command-line shell)
whether the program completed successfully (code zero) or encountered
an error (any other code).
@!9031257feaea45f16bde6dfe81c923ea0c6eefcf

{{index "command line", "argv property"}}
@!c2c9d7c61b650f9096ceb58858511dffeb69aeba

To find the command-line arguments given to
your script, you can read `process.argv`, which is an array of
strings. Note that it also includes the name of the `node` command
and your script name, so the actual arguments start at index 2. If
`showargv.js` simply contains the statement
`console.log(process.argv)`, you could run it like this:
@!a4a152e348d41caf9151724b3c48433f38784836

```{lang: null}
$ node showargv.js one --and two
["node", "/home/marijn/showargv.js", "one", "--and", "two"]
```
@!1cc939985f7d2955e78e94a7b28c8cd276d0f24b

{{index [variable, global]}}
@!237e6940e6bf048723fd73a3e35bfde35e4bbca1

All the ((standard)) JavaScript global variables,
such as `Array`, `Math`, and `JSON`, are also present in Node's
environment. Browser-related functionality, such as `document` and
`alert`, is absent.
@!5b2582f1a17525b525fec12571c06369cc6e03ae

{{index "global object", "global scope", window}}
@!55b8f025b1f85d01be42cc36838deead84dff211

The global scope
object, which is called `window` in the browser, has the more sensible
name `global` in Node.
@!359ad72fe630b11580f04095c48cbf737e5ac708

## Modules
@!5fe2d72849c32dabf9b634d33942c6170fedc8c0

{{index "Node.js", "global scope", "module loader"}}
@!0fa598be5b75d4c0dd7d0f06b5ab2e1910cb6f0a

Beyond the few
variables I mentioned, such as `console` and `process`, Node puts 
little functionality in the global scope. If you want to access other
built-in functionality, you have to ask the module system for it.
@!dd886a5266db5584b37f6d3cea663f726cd32dd1

{{index library, "require function"}}
@!e10dcce18afa7f6a78c0c337c3138edfddd01936

The ((CommonJS)) module system,
based on the `require` function, was described in
[Chapter 10](10_modules.html#commonjs). This system is built into
Node and is used to load anything from built-in ((module))s to
downloaded libraries to files that are part of your own program.
@!c1f914d70e55161df3cab9d8d9ccb01496a8b7f6

{{index [path, "file system"], "relative path", resolution}}
@!45c661643ea94f8798c0502f3949fcda8d4ec52c

When `require` is called, Node has
to resolve the given string to an actual ((file)) to load. Pathnames
that start with `"/"`, `"./"`, or `"../"` are resolved relative to the
current module's path, where `"./"` stands for the current
directory, `"../"` for one directory up, and `"/"` for the root of the
file system. So if you ask for `"./world/world"` from the file
`/home/marijn/elife/run.js`, Node will try to load the file
`/home/marijn/elife/world/world.js`. The `.js` extension may be
omitted.
@!1f1df8e527ab5efd83d4d11553f50bea44222d7a

{{index "node_modules directory"}}
@!71c8150a50aef9b06be712e1304321ff47ee6db1

When a string that does not look like a
relative or absolute path is given to `require`, it is assumed to
refer to either a built-in ((module)) or a module installed in a
`node_modules` directory. For example, `require("fs")` will give you
Node's built-in file system module, and `require("elife")` will try to
load the library found in `node_modules/elife/`. A common way to
install such libraries is by using ((NPM)), which I will discuss in a
moment.
@!43d938b7486f6bbef6b4cb00c6fac73717eef127

{{index "require function", "Node.js", "garble example"}}
@!cfc5a31a4966cb091cea9290a513f3bffd435433

To illustrate
the use of `require`, let's set up a simple project consisting of two
files. The first one is called `main.js`, which defines a script that
can be called from the ((command line)) to garble a string.
@!852150d869509980cf460c445a3753438a78ddce

```
var garble = require("./garble");

// Index 2 holds the first actual command-line argument
var argument = process.argv[2];

console.log(garble(argument));
```
@!ec3529a0684dff6f71aa133f1940017d25a03b6c

{{index reuse}}
@!6545dc67e3ed961711af17ec6a44fa16ba0233c4

The file `garble.js` defines a library for garbling strings,
which can be used both by the command-line tool defined earlier and by
other scripts that need direct access to a garbling function.
@!29ceb858ccdff728934d9c810a96a26b43649cc8

```
module.exports = function(string) {
  return string.split("").map(function(ch) {
    return String.fromCharCode(ch.charCodeAt(0) + 5);
  }).join("");
};
```
@!8183aeaf4de551f06c2320f82c7133b0dbe14873

{{index "exports object", CommonJS}}
@!bca7cfc184e5318ab65d7ca8db952807d2135fcc

Remember that replacing
`module.exports`, rather than adding properties to it, allows us to
export a specific value from a module. In this case, we make the
result of requiring our `garble` file the garbling function itself.
@!2f6f1ebad811e42cc2e18b8f3cc81d27094f99ba

{{index Unicode, "split method", "map method", "join method"}}
@!7ff239b0005374896cee1b1d818cfe33fe8957fe

The
function splits the string it is given into single characters by
splitting on the empty string and then replaces each character with
the character whose code is five points higher. Finally, it joins the
result back into a string.
@!52a1d44cabc90afa6ecddd32943ef5de3325100f

We can now call our tool like this:
@!26036b6e6b737964bc3a5125b68c011fa622ad7c

```{lang: null}
$ node main.js JavaScript
Of{fXhwnuy
```
@!05a40d721d305addb67d9bc8ac7288318d9d88c8

## Installing with NPM
@!f942dada0f010cb4fdeae2f696a074a1726ed370

{{index NPM, "Node.js", "npm program", library}}
@!0b00f6fec51b652c7778ee267498b46b30a4ec04

NPM, which was
briefly discussed in [Chapter 10](10_modules.html#modules_npm), is
an online repository of JavaScript ((module))s, many of which are
specifically written for Node. When you install Node on your computer,
you also get a program called `npm`, which provides a convenient
interface to this repository.
@!fe616a64ba922e6d9d46054cf07fde0a3b67be5f

{{index "figlet module"}}
@!cb6f9189623521c560f6ef536881989b5c708247

For example, one module you will find on NPM is
`figlet`, which can convert text into _((ASCII art))_—drawings made
out of text characters. The following  transcript shows how to ((install))
and use it:
@!9f491bddd63b6dfa109922b18fca4c7b90a79fb3

```{lang: null}
$ npm install figlet
npm GET https://registry.npmjs.org/figlet
npm 200 https://registry.npmjs.org/figlet
npm GET https://registry.npmjs.org/figlet/-/figlet-1.0.9.tgz
npm 200 https://registry.npmjs.org/figlet/-/figlet-1.0.9.tgz
figlet@1.0.9 node_modules/figlet
$ node
> var figlet = require("figlet");
> figlet.text("Hello world!", function(error, data) {
    if (error)
      console.error(error);
    else
      console.log(data);
  });
  _   _      _ _                            _     _ _ 
 | | | | __| | | ___   __      _____  _ __| | __| | |
 | |_| |/ _ \ | |/ _ \  \ \ /\ / / _ \| '__| |/ _` | |
 |  _  |  __/ | | (_) |  \ V  V / (_) | |  | | (_| |_|
 |_| |_|\___|_|_|\___/    \_/\_/ \___/|_|  |_|\_,_(_)
```
@!bf2d04333432d4808de268a455e3b154ba7f1abb

{{index "require function", "node_modules directory", "npm program"}}
@!5bdaef5e23c9a2743e3f74fdeb7243c7d51e1a5f

After running `npm install`, ((NPM)) will have created a
directory called `node_modules`. Inside that directory will be a `figlet`
directory, which contains the ((library)). When we run `node` and call
`require("figlet")`, this library is loaded, and we can call its
`text` method to draw some big letters.
@!cecbfe73c2710b1f7fab75e73b38834261d41e02

{{index "error handling", "return value"}}
@!293aa0eda482d98e53ba313cfb88366be93aad6e

Somewhat unexpectedly perhaps,
instead of simply returning the string that makes up the big letters,
`figlet.text` takes a ((callback function)) that it passes its result
to. It also passes the callback another argument, `error`, which will
hold an error object when something goes wrong or null when
everything is all right.
@!581895b8d6e8ba79a6fa3cb7f3c0796d56db2a27

{{index "file system", "asynchronous programming", "Node.js"}}
@!a6236f334c3306af0e284218f6b9765a408f6db8

This is a
common pattern in Node code. Rendering something with `figlet`
requires the library to read a file that contains the letter shapes.
Reading that file from disk is an asynchronous operation in
Node, so `figlet.text` can't immediately return its
result. Asynchronicity is infectious, in a way—every function that
calls an asynchronous function must itself become asynchronous.
@!5775d714ce0e49a4dbaaf50aaad7d17f6255b315

{{index dependency, publishing, "package.json file", "npm program"}}
@!ecea5f72ca2f0ff9d81784b91c33de5c88b30bba

There is much more to ((NPM)) than `npm install`. It reads
`package.json` files, which contain ((JSON))-encoded information about
a program or library, such as which other libraries it depends on.
Doing `npm install` in a directory that contains such a file will
automatically install all dependencies, as well as _their_
dependencies. The `npm` tool is also used to publish libraries to
NPM's online repository of packages so that other people can find,
download, and use them.
@!e09ea6702a74b2af9eb7ffeb6881bf4c72a63e43

{{index library}}
@!aaf2dc441edc8387cf37e0e6c7ccd00778d1023f

This book won't delve further into the details of ((NPM))
usage. Refer to http://npmjs.org[_npmjs.org_] for further
documentation and for an easy way to search for libraries.
@!f22ed22b83a9d331469083f3713cf742ec1b441c

## The file system module
@!62ab066badabe68e97bdd371913628ac9606a20f

{{index directory, "fs module", "Node.js"}}
@!f794d8b16205334f93e8d7e6b9ecb8ba3ff16c64

One of the most commonly
used built-in modules that comes with Node is the `"fs"` module, which
stands for _((file system))_. This module provides functions for
working with ((file))s and directories.
@!135e64a4133bc61d78d76d9c268a0c4bac6be06a

{{index "readFile function", "callback function"}}
@!2f8c45893316949c4a03438b2c9dd0645be68edb

For example, there is a
function called `readFile`, which reads a file and then calls a
callback with the file's contents.
@!0241d821ac25db12021b7f953cc60a551329184a

```
var fs = require("fs");
fs.readFile("file.txt", "utf8", function(error, text) {
  if (error)
    throw error;
  console.log("The file contained:", text);
});
```
@!d3a7305f7c860d888879e0e2652be5c55b3fb3b6

{{index "Buffer type"}}
@!68899f1db229a6d0a99128a1f69e2555e81a0a0d

The second argument to
`readFile` indicates the _((character encoding))_ used to decode the
file into a string. There are several ways in which ((text)) can be
encoded to ((binary data)), but most modern systems use ((UTF-8)) to
encode text, so unless you have reasons to believe another encoding is
used, passing `"utf8"` when reading a text file is a safe bet. If you
do not pass an encoding, Node will assume you are interested in the
binary data and will give you a `Buffer` object instead of a
string. This is an ((array-like object)) that contains numbers
representing the bytes in the files.
@!f10637a4da7d61ca401fc2414a27a102c4137bd4

```
var fs = require("fs");
fs.readFile("file.txt", function(error, buffer) {
  if (error)
    throw error;
  console.log("The file contained", buffer.length, "bytes.",
              "The first byte is:", buffer[0]);
});
```
@!54a1025c7267658c6eeccf250c9d842c9c4670ec

{{index "writeFile function", "file system"}}
@!8cfde5b2ad60a899ecfd798ece5c476d1e6f6002

A similar function,
`writeFile`, is used to write a ((file)) to disk.
@!77b2162013fab9037a98d8ce0e154ff4c3e1e9fb

```
var fs = require("fs");
fs.writeFile("graffiti.txt", "Node was here", function(err) {
  if (err)
    console.log("Failed to write file:", err);
  else
    console.log("File written.");
});
```
@!d20823db4032dd48a51e3f56c39aea2bca8e926c

{{index "Buffer type", "character encoding"}}
@!e7c4e68c2684917d0cdde967441821cba0f0f2ef

Here, it was not necessary to
specify the encoding since `writeFile` will assume that if it is
given a string to write, rather than a `Buffer` object, it should
write it out as text using its default character encoding, which is
((UTF-8)).
@!3b6d4f1f7ddadc4bc6521bc527df08553532fab2

{{index "fs module", "readdir function", "stat function", "rename function", "unlink function"}}
@!fa2927ca4aea6af4c2767d68ccc02adc88d3ae07

The `"fs"` module contains many other
useful functions: `readdir` will return the ((file))s
in a ((directory)) as an array of strings, `stat` will retrieve
information about a file, `rename` will rename a file, `unlink` will
remove one, and so on. See the documentation at
http://nodejs.org[_nodejs.org_] for specifics.
@!517e9b9a878464cd9232bfe4057c79762967f5d5

{{index "synchronous I/O", "fs module", "readFileSync function"}}
@!1f554912a54d098673a1407a6a33519a1429ec62

Many of
the functions in `"fs"` come in both synchronous and asynchronous variants. 
For example, there is a synchronous version of
`readFile` called `readFileSync`.
@!2fc26779aacc49a09115aca07602dbc4898cab04

```
var fs = require("fs");
console.log(fs.readFileSync("file.txt", "utf8"));
```
@!3a0bb50a21aed3a3b721608608e93bd1ded5d0cf

{{index "synchronous I/O", optimization, performance, blocking}}
@!4a20265832d9b32a059c497b1d1dd493fab9fba9

Synchronous functions require
less ceremony to use and can be useful in simple scripts, where the
extra speed provided by asynchronous I/O is irrelevant. But note that
while such a synchronous operation is being performed, your program
will be stopped entirely. If it should be responding to the user or to
other machines on the network, being stuck on synchronous I/O might
produce annoying delays.
@!52b5785bc8646472a64d03d042fcc760f65c378a

## The HTTP module
@!bbbfdb597ef1e28578eb97d1fb3a8312fe651503

{{index "Node.js", "http module"}}
@!3d820141fc65d135592c3de56626a211500726bc

Another central module is called
`"http"`. It provides functionality for running ((HTTP)) ((server))s
and making HTTP ((request))s.
@!9fbed68f5732018d31109a2c0a3337e2aea484fe

{{index "listening (TCP)", "listen method", "createServer function"}}
@!092647334ed25e1c357ec22f8bbf6ef2249abe4f

This is all it takes to start a simple HTTP server:
@!14c13d30a24038d46bb26f905a9654896d0f95cb

```
var http = require("http");
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<h1>Hello!</h1><p>You asked for <code>" +
                 request.url + "</code></p>");
  response.end();
});
server.listen(8000);
```
@!f5cdd97259b2a09f6fb8bebe0163aeef5251eac2

{{index port, localhost}}
@!9711d11ac9e46bd924dfb0cd26a667a4a62eab2c

If you run this script on your own machine,
you can point your web browser at
http://localhost:8000/hello[_http://localhost:8000/hello_] to make a
request to your server. It will respond with a small HTML page.
@!fa65905fd65d37f56ffa5654d6de4aa857c17681

{{index "createServer function", HTTP}}
@!c7cc5dda9e778c6efa260526dcf5e73859de9af4

The function passed as an argument
to `createServer` is called every time a client tries to connect to
the server. The `request` and `response` variables are objects
representing the incoming and outgoing data. The first contains
information about the ((request)), such as its `url` property, which
tells us to what URL the request was made.
@!f2d32cf7926202dee3d7787001be842ee3390b8b

{{index "200 (HTTP status code)", "Content-Type header", "writeHead method"}}
@!f6781cf5b9eb90bad0d6e647585b113536b7c892

To send something back, you call methods on the `response`
object. The first, `writeHead`, will write out the ((response))
((header))s (see [Chapter 17](17_http.html#headers)). You give it
the status code (200 for “OK” in this case) and an object that
contains header values. Here we tell the client that we will be
sending back an HTML document.
@!3661461efc4ef51371cd648b04008b57115cad88

{{index "writable stream", "body (HTTP)", stream, "write method", "end method"}}
@!b64518ca12a64d59716d7f95987d157d0820917e

Next, the actual response body (the document
itself) is sent with `response.write`. You are allowed to call this
method multiple times if you want to send the response piece by piece,
possibly streaming data to the client as it becomes available.
Finally, `response.end` signals the end of the response.
@!bd119dce64e98db5948115d1510ccb50c1990dd5

{{index "listen method"}}
@!64350c6a7f8c74d010a52a029ebb7ca70a5dd163

The call to `server.listen` causes the ((server))
to start waiting for connections on ((port)) 8000. This is the reason
you have to connect to _localhost:8000_, rather than just _localhost_
(which would use the default port, 80), to speak to this server.
@!7c5db80480f77a3dcd910499427a1de0f900bc84

{{index "Node.js", kill}}
@!d94769aa95877bc197f859e71fa8973584657bf4

To stop running a Node script like this, which
doesn't finish automatically because it is waiting for further events
(in this case, network connections), press Ctrl-C.
@!a08a37eef5b8df969d1228f16eee1c33310e564d

A real web ((server)) usually does more than the one in the previous
example—it looks at the request's
((method)) (the `method` property) to see what action the client is
trying to perform and at the request's ((URL)) to find out which
resource this action is being performed on. You'll see a more advanced
server [later in this chapter](20_node.html#file_server).
@!a3640f46c2a70c944d44ed025ec768b1ff39f161

{{index "http module", "request function"}}
@!9395b9380931caf2e8c1e9e11c486198e779c16d

To act as an ((HTTP))
_((client))_, we can use the `request` function in the `"http"`
module.
@!5ae4dbff3f5ccda9cb75f388c9e8599e10ff3367

```
var http = require("http");
var request = http.request({
  hostname: "eloquentjavascript.net",
  path: "/20_node.html",
  method: "GET",
  headers: {Accept: "text/html"}
}, function(response) {
  console.log("Server responded with status code",
              response.statusCode);
});
request.end();
```
@!516ffdce17595d488e64e8240895c93c2cce7b1b

{{index "Node.js", "callback function", "readable stream"}}
@!1250b21988ac74548ce343bb3e93edc7dbaf600a

The first
argument to `request` configures the request, telling Node what server
to talk to, what path to request from that server, which method to
use, and so on. The second argument is the function that should be
called when a response comes in. It is given an object that allows us
to inspect the response, for example to find out its status code.
@!779833a2d35c8921367b422375945987f0a98209

{{index "GET method", "write method", "end method", "writable stream", "request function"}}
@!ff5fafae71fde49d91f54cc19fb47776bdcd92b5

Just like the `response` object 
we saw in the server, the object returned by `request` allows us to
((stream)) data into the ((request)) with the `write` method and
finish the request with the `end` method. The example does not use
`write` because `GET` requests should not contain data
in their request body.
@!a52a7107f889bf712d484274fd2dcdcb91863b07

{{index HTTPS, "https module", "request function"}}
@!fced1e62f0b0093d3d8713a9a5a93cdae1aa58eb

To make requests to secure HTTP (HTTPS)
URLs, Node provides a package called `https`, which contains
its own `request` function, similar to `http.request`.
@!3787d1d3cc370f5d6548b3e1f6cc2def7fe20e18

## Streams
@!fdedc3c81f5c11899fc90dbc1780a079938ada6a

{{index "Node.js", "write method", "end method", "Buffer type", stream, "writable stream"}}
@!1ee220887b0f89eaae2414bec37f5f0c48f69325

We have seen two examples of
writable streams in the HTTP examples—namely, the response object that
the server could write to and the request object that was returned
from `http.request`.
@!08fb91e5e0db861da3a8ff56fc86d3f5ed50f8d1

{{index "callback function", "asynchronous programming"}}
@!9b42f38dd8069bcb21bcd7a844f01eb7b3ad857c

Writable streams are a widely used concept in Node
interfaces. All writable streams have a `write` method, which can be
passed a string or a `Buffer` object. Their `end` method closes the
stream and, if given an argument, will also write out a piece of data
before it does so. Both of these
methods can also be given a callback as an additional argument, which
they will call when the writing to or closing of the stream has
finished.
@!a05fe13812399b65296eff79de124aef1cea86d2

{{index "createWriteStream function", "writeFile function"}}
@!1c9aae52aeb7ecb35aa5cce8bb8b4c454b4afa27

It is possible
to create a writable stream that points at a ((file)) with the
`fs.createWriteStream` function. Then you can use the `write` method on
the resulting object to write the file one piece at a time, rather
than in one shot as with `fs.writeFile`.
@!465526b621e906df8725fbea86640adc7d8b98fe

{{index "createServer function", "request function", "event handling", "readable stream"}}
@!4142c32cc22b5075e3f922eac7259908c91854c2

Readable ((stream))s are a little more
involved. Both the `request` variable that was passed to the HTTP
server's callback function and the `response` variable passed to the
HTTP client are readable streams. (A server reads requests and then
writes responses, whereas a client first writes a request and then
reads a response.) Reading from a stream is done using event handlers,
rather than methods.
@!a91d378b4fba35869c63025f5595b19d7dd2d80e

{{index "on method", "addEventListener method"}}
@!04b95af2072654f08be320ca0188d8de596a0d74

Objects that emit events in
Node have a method called `on` that is similar to the
`addEventListener` method in the browser. You give it an event name
and then a function, and it will register that function to be called
whenever the given event occurs.
@!5f5f12c7a389d1da2455cb52f3a2e17e01e58762

{{index "createReadStream function", "data event", "end event", "readable stream"}}
@!5aa5a42af2cf3a06eda8c048e7ff22011dd1ac99

Readable ((stream))s have `"data"` and
`"end"` events. The first is fired every time some data comes in, and
the second is called whenever the stream is at its end. This model is
most suited for “streaming” data, which can be immediately processed,
even when the whole document isn't available yet. A file can be read
as a readable stream by using the `fs.createReadStream` function.
@!4eef832955d213b9a08eaed9f6dadab76b9f5e33

{{index "upcasing server example", capitalization, "toUpperCase method"}}
@!2fa57f924ef3b98fd2516d33907ce2774b035b99

The following code creates a ((server)) that reads request
bodies and streams them back to the client as all-uppercase text:
@!0c8566c7b7b0ad0177fd242ef0810e188055df17

```
var http = require("http");
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  request.on("data", function(chunk) {
    response.write(chunk.toString().toUpperCase());
  });
  request.on("end", function() {
    response.end();
  });
}).listen(8000);
```
@!76d45df66073d629eb7702a3532d87dad8c701d4

{{index "Buffer type", "toString method"}}
@!66ebbc4faeb7588803ffc2e608055273cc8ba7da

The `chunk` variable passed to
the data handler will be a binary `Buffer`, which we can convert to a
string by calling `toString` on it, which will decode it using the
default encoding (UTF-8).
@!0db5458f02d8561f1a2a9f1e1ff59cf7095b67ce

The following piece of code, if run while the uppercasing server is
running, will send a request to that server and write out the response it gets:
@!37eda4cdf309afcd8f82bc49ebcb37621d318d73

```{test: no}
var http = require("http");
var request = http.request({
  hostname: "localhost",
  port: 8000,
  method: "POST"
}, function(response) {
  response.on("data", function(chunk) {
    process.stdout.write(chunk.toString());
  });
});
request.end("Hello server");
```
@!ad789f4e57c0e3bbb066575dd9be72a603072bca

{{index "stdout property", "standard output", "writable stream", "console.log"}}
@!dbfb1040414d73cadbbda4a08a15a84014a43cbd

The example writes to `process.stdout` (the
process’ standard output, as a writable stream) instead of using
`console.log`. We can't use `console.log` because it adds an extra
newline character after each piece of text that it writes, which isn't
appropriate here.
@!0300ee88336a94c50992d21669d5a6b856edb121

{{id file_server}}
@!c3b35fb22ea9970350780b593a00b474846e6a45

## A simple file server
@!892dfa91ab1eb2879cc71f2ce8138f0aa053cef6

{{index "file server example", "Node.js"}}
@!00085e6f8c9adc63bab08a11e1f71cbd63f0a492

Let's combine our newfound
knowledge about ((HTTP)) ((server))s and talking to the ((file
system)) and create a bridge between them: an HTTP server that allows
((remote access)) to a file system. Such a server has many uses. It
allows web applications to store and share data or give a group of
people shared access to a bunch of files.
@!4771a0c4c8f1e4ed378b863eae72435808aba04c

{{index [path, URL], "GET method", "PUT method", "DELETE method"}}
@!db5aa030e3212ed3b12522dec200be6b144e8334

When 
we treat ((file))s as HTTP ((resource))s, the HTTP
methods `GET`, `PUT`, and `DELETE` can be used to read, write, and
delete the files, respectively. We will interpret the path in the request
as the path of the file that the request refers to.
@!a4daf8bc502936c062af41fb3765bc0f199d17a4

{{index [path, "file system"], "relative path"}}
@!36e4f8b1936e22a0a7f86fe7d9132a80b618be98

We probably don't want to share our whole
file system, so we'll interpret these paths as starting in the
server's working ((directory)), which is the directory in which it was
started. If I ran the server from `/home/marijn/public/` (or
`C:\Users\marijn\public\` on Windows), then a request for `/file.txt`
should refer to `/home/marijn/public/file.txt` (or
`C:\Users\marijn\public\file.txt`).
@!b70efbf16cca052369c46ebb53f740597205f10a

{{index "file server example", "Node.js", "methods object"}}
@!5efa1a93de62f429179143f3dc4b434fa8cf4de3

We'll build
the program piece by piece, using an object called `methods` to store
the functions that handle the various HTTP methods.
@!e903d785b2b23cd00c89d7be26164a53925c4c18

```{includeCode: ">code/file_server.js"}
var http = require("http"), fs = require("fs");

var methods = Object.create(null);

http.createServer(function(request, response) {
  function respond(code, body, type) {
    if (!type) type = "text/plain";
    response.writeHead(code, {"Content-Type": type});
    if (body && body.pipe)
      body.pipe(response);
    else
      response.end(body);
  }
  if (request.method in methods)
    methods[request.method](urlToPath(request.url),
                            respond, request);
  else
    respond(405, "Method " + request.method +
            " not allowed.");
}).listen(8000);
```
@!080d01ca8a37a6d645c8fa0beab2d3422fda94be

{{index "405 (HTTP status code)"}}
@!bb587b3c6cdce685e3e1c23dbf9f0c84d275038b

This starts a server that just returns 405
error responses, which is the code used to indicate that a given
method isn't handled by the server.
@!c540791d1c3fb76986b6a958663a170b48f2a9fe

{{index "end method", "Content-Type header", response, "pipe method", stream}}
@!5f463fb12b98fb7504c684ae487401fc17cb255c

The `respond` function is passed to the functions
that handle the various methods and acts as a callback to finish the
request. It takes an HTTP ((status code)), a body, and optionally a
content type as arguments. If the value passed as the body is a ((readable
stream)), it will have a `pipe` method, which is used to forward a
readable stream to a ((writable stream)). If not, it is assumed to be
either `null` (no body) or a string and is passed directly to the
response's `end` method.
@!5bee5f895bfeab6063faaf19216dcb4d6f8cf85e

{{index [path, URL], "urlToPath function", "url module", parsing, [escaping, "in URLs"], "decodeURIComponent function"}}
@!7dad239578adc1c0b487c0cf8ce608669347a386

To get a path from the
((URL)) in the request, the `urlToPath` function uses Node's built-in
`"url"` module to parse the URL. It takes its pathname, which will be
something like `/file.txt`, decodes that to get rid of the `%20`-style
escape codes, and prefixes a single dot to produce a path relative to
the current directory.
@!b9a80767f19b1044f36f98b515e7bda94af7e187

```{includeCode: ">code/file_server.js"}
function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  return "." + decodeURIComponent(path);
}
```
@!8dd672ce3b09102eef42a1a30022a61211a81b8e

{{index security, [path, "file system"]}}
@!7486aad392f16a7ee9bf7db43d68fc514156906c

If you are worried about the security of the
`urlToPath` function, you are right. We will return to that in the
exercises.
@!2e0ac58c27c46dd5f3357f313a6099d65a4832b0

{{index "file server example", "Node.js", "GET method"}}
@!fa91caacc13967f075d395244129b4f1d5cecba6

We will set up
the `GET` method to return a list of ((file))s when reading a
((directory)) and to return the file's content when reading a regular file.
@!8399da516dc92bafdf5ee086543b7adacc907781

{{index "media type", "MIME type", "Content-Type header", "mime module"}}
@!de8834253fc8fff61ffec3ba10abc2ac8cacf65b

One tricky question is what kind of `Content-Type` header we
should add when returning a file's content. Since these files could be
anything, our server can't simply return the same type for all of
them. But ((NPM)) can help with that. The `mime` package (content type
indicators like `text/plain` are also called _MIME types_) knows the
correct type for a huge number of ((file extension))s.
@!c2727f0f0efc43a21f1cc6369e5c8ca3e6fc3314

{{index "require function", "npm program"}}
@!b6cbdeb19db89e74087b504b91abb936ae6807aa

If you run the following `npm` command in the directory
where the server script lives, you'll be able to use `require("mime")` to
get access to the library:
@!f1e3009156f46466f1c2d89b8ef84a77efc0b054

```{lang: null}
$ npm install mime@1.4.0
npm http GET https://registry.npmjs.org/mime
npm http 304 https://registry.npmjs.org/mime
mime@1.4.0 node_modules/mime
```
@!bc332cad727e9ae38079c95cc9d62e774a3da5bc

{{index "404 (HTTP status code)", "stat function"}}
@!5a19b1bae9055c851da43b148791e91f6c4e92c2

When a requested file
does not exist, the correct HTTP error code to return is 404. We will
use `fs.stat`, which looks up information on a file, to find out both
whether the ((file)) exists and whether it is a ((directory)).
@!7040b19a46b858f278b8a4d3ec71a47c163fe0e9

```{includeCode: ">code/file_server.js"}
methods.GET = function(path, respond) {
  fs.stat(path, function(error, stats) {
    if (error && error.code == "ENOENT")
      respond(404, "File not found");
    else if (error)
      respond(500, error.toString());
    else if (stats.isDirectory())
      fs.readdir(path, function(error, files) {
        if (error)
          respond(500, error.toString());
        else
          respond(200, files.join("\n"));
      });
    else
      respond(200, fs.createReadStream(path),
              require("mime").lookup(path));
  });
};
```
@!8f52ec1211eab9421bb0b6593d2ac5ca311ed737

{{index "createReadStream function", "asynchronous programming", "error handling", "ENOENT (status code)", "Error type", inheritance}}
@!9902398819323a56db2a6bcaab3aa4907710e6dd

Because it has to touch the disk and thus
might take a while, `fs.stat` is asynchronous. When the file does not
exist, `fs.stat` will pass an error object with a `code` property of
`"ENOENT"` to its callback. It would be nice if Node defined
different subtypes of `Error` for different types of error, but it
doesn't. Instead, it just puts obscure, ((Unix))-inspired codes in
there.
@!7808f870725761cfc99697f1a97451f2b88afb6e

{{index "500 (HTTP status code)", "error handling", "error response"}}
@!f011e64788279b218639ed94d866f6fadc3245fa

We
are going to report any errors we didn't expect with status code 500,
which indicates that the problem exists in the server, as opposed to
codes starting with 4 (such as 404), which refer to bad requests. There
are some situations in which this is not entirely accurate, but for a
small example program like this, it will have to be good enough.
@!8f475900594016bd08295ac8f2a98aad85d39178

{{index "Stats type", "stat function"}}
@!ebb25c9604d36d0017a9d44ec2a1a765b372719e

The `stats` object returned by
`fs.stat` tells us a number of things about a ((file)), such as its
size (`size` property) and its ((modification date)) (`mtime`
property). Here we are interested in the question of whether it is a
((directory)) or a regular file, which the `isDirectory` method tells
us.
@!aaf3837f13f97f4e0a82093974a66fa19ebd2dda

{{index "readdir function"}}
@!e9fe5da8e6da34f9661df9d450a60d8d0d84f935

We use `fs.readdir` to read the
list of files in a ((directory)) and, in yet another callback, return
it to the user. For normal files, we create a readable stream with
`fs.createReadStream` and pass it to `respond`, along with the
content type that the `"mime"` module gives us for the file's name.
@!8f0830fd4e2473c975f2b1fe3ef94fa67629a1cc

{{index "Node.js", "file server example", "DELETE method"}}
@!a2982c90a6579138b5a18bc91b3b564e7f4992e6

The code to
handle `DELETE` requests is slightly simpler.
@!dd6f264ccbf34797b142e8fbcbd7e36c0ad79cec

```{includeCode: ">code/file_server.js"}
methods.DELETE = function(path, respond) {
  fs.stat(path, function(error, stats) {
    if (error && error.code == "ENOENT")
      respond(204);
    else if (error)
      respond(500, error.toString());
    else if (stats.isDirectory())
      fs.rmdir(path, respondErrorOrNothing(respond));
    else
      fs.unlink(path, respondErrorOrNothing(respond));
  });
};
```
@!0b101d940be9e6c3f20d471d9cb751166b499246

{{index idempotency, "error response"}}
@!173b8827e4da8dd2a6ecc0bfbe4a8cf969542ca5

You may be wondering why trying
to delete a nonexistent file returns a 204 status, rather than an
error. When the file that is being deleted is not there, you could say
that the request's objective is already fulfilled. The ((HTTP))
standard encourages people to make requests _idempotent_, which means
that applying them multiple times does not produce a different result.
@!a88061c1e17787e0cfdbfca3b07e5447d208264f

```{includeCode: ">code/file_server.js"}
function respondErrorOrNothing(respond) {
  return function(error) {
    if (error)
      respond(500, error.toString());
    else
      respond(204);
  };
}
```
@!5ede47124324ae2a8c44dfc9c89831ccf007f308

{{index "204 (HTTP status code)", "body (HTTP)"}}
@!2de3a0706328e4dce818fef1ea60984b00b38c55

When an ((HTTP))
((response)) does not contain any data, the status code 204
 (“no content”) can be used to indicate this. Since we need to
provide callbacks that either report an error or return a 204 response
in a few different situations, I wrote a `respondErrorOrNothing`
function that creates such a callback.
@!240440a54570b91f5f994c21dcecd264e9c8af2a

{{index "file server example", "Node.js", "PUT method"}}
@!627ec26ddb2341b1d8f324f087eadce559018203

This is the
handler for `PUT` requests:
@!6a258b356d2a4ef53e947bfcdfa5f134b559b590

```{includeCode: ">code/file_server.js"}
methods.PUT = function(path, respond, request) {
  var outStream = fs.createWriteStream(path);
  outStream.on("error", function(error) {
    respond(500, error.toString());
  });
  outStream.on("finish", function() {
    respond(204);
  });
  request.pipe(outStream);
};
```
@!c5885de7804b68445e3bc5aa88ea0ef102aa7003

{{index overwriting, "204 (HTTP status code)", "error event", "finish event", "createWriteStream function", "pipe method", stream}}
@!c7f4e2d7b2fe73323c796dd5f9f90732df7197e5

Here, we don't need to check whether the file
exists—if it does, we'll just overwrite it. We again use `pipe` to
move data from a readable stream to a writable one, in this case from
the request to the file. If creating the stream fails, an `"error"`
event is raised for it, which we report in our response. When the data
is transferred successfully, `pipe` will close both streams, which
will cause a `"finish"` event to fire on the writable stream. When
that happens, we can report success to the client with a 204 response.
@!e4937f0a5dc8e637b7095ea6c9a63b28d031995f

{{index download, "file server example", "Node.js"}}
@!3e01b071587ba6d102f1a2c1c2f3006814cb92c2

The full script
for the server is available at
http://eloquentjavascript.net/code/file_server.js[_eloquentjavascript.net/code/file_server.js_].
You can download that and run it with Node to start your own file
server. And of course, you can modify and extend it to solve this
chapter's exercises or to experiment.
@!9002f43e06b3fe935173e9b8009bd0b5631a3a85

{{index "body (HTTP)", "curl program"}}
@!189e2faa79fca535cd9a801ad2ec5a1065bc8442

The command-line tool `curl`,
widely available on ((Unix))-like systems, can be used to make ((HTTP))
((request))s. The following session briefly tests our server. Note
that `-X` is used to set the request's ((method)) and `-d` is used to include
a request body.
@!1e592950204e169f7b54291eeafed01e0b161b1f

```{lang: null}
$ curl http://localhost:8000/file.txt
File not found
$ curl -X PUT -d hello http://localhost:8000/file.txt
$ curl http://localhost:8000/file.txt
hello
$ curl -X DELETE http://localhost:8000/file.txt
$ curl http://localhost:8000/file.txt
File not found
```
@!0a2846a2c9b0f4ab0f6fd7c0e9ffd95aed3c238c

The first request for `file.txt` fails since the file does not exist
yet. The `PUT` request creates the file, and behold, the next request
successfully retrieves it. After deleting it with a `DELETE` request,
the file is again missing.
@!b11cdb8a5014e45aa2ff7c025286df77e2da6b90

## Error handling
@!659829ee2be6a2f192863545b6d0e4bd814b984d

{{index verbosity, "error handling"}}
@!87148589ca9007a11fb02e223338ef7543e9cccc

In the code for the file server,
there are _six_ places where we are explicitly routing exceptions that
we don't know how to handle into ((error response))s. Because
((exception))s aren't automatically propagated to callbacks but
rather passed to them as arguments, they have to be handled explicitly
every time. This completely defeats the advantage of ((exception
handling)), namely, the ability to centralize the handling of
failure conditions.
@!793967f8ca1d88999c6c490a9223000b1355d831

{{index "Node.js", "stack trace", "throw keyword", "try keyword", "uncaught exception"}}
@!51d9eaa4d0b3c1370b0719ece94abb517da6f851

What happens when something actually
_throws_ an exception in this system? Since we are not using any `try`
blocks, the exception will propagate to the top of the call stack. In
Node, that aborts the program and writes information
about the exception (including a stack trace) to the program's
standard error stream.
@!777b8f6961cdab9544db6c10d45ea1cf90f57096

{{index "callback function"}}
@!960d2d6015d302754001faaf8d6d7638bc7486df

This means that our server will ((crash))
whenever a problem is encountered in the server's code itself, as
opposed to asynchronous problems, which will be passed as arguments to
the callbacks. If we wanted to handle all exceptions raised during the
handling of a request, to make sure we send a response, we would
have to add `try/catch` blocks to _every_ callback.
@!cb3b48d6d609f68515e79f0422a489664777c6ce

{{index "exception handling"}}
@!f7be92f083e2ecd307161d93fb06a85aef27d49a

This is not workable. Many Node programs are
written to make as little use of exceptions as possible, with the
assumption that if an exception is raised, it is not something the
program can handle, and crashing is the right response.
@!e9f921aff1135d928ce1321a3486945b13788f41

{{index "denodeify function", "readFile function", "promise module", "error handling"}}
@!c1dd8d88833d04a846375ec2311ead492236767d

Another approach is to use ((promise))s,
which were introduced in [Chapter 17](17_http.html#promises). Those
catch exceptions raised by callback functions and propagate them as
failures. It is possible to load a promise library in Node and use
that to manage your asynchronous control. Few Node libraries
integrate promises, but it is often trivial to wrap them. The
excellent `"promise"` module from ((NPM)) contains a function called
`denodeify`, which takes an asynchronous function like `fs.readFile`
and converts it to a promise-returning function.
@!ecf9602f0e10fcbc7f2fb54b71ff7134396f7c69

```
var Promise = require("promise");
var fs = require("fs");

var readFile = Promise.denodeify(fs.readFile);
readFile("file.txt", "utf8").then(function(content) {
  console.log("The file contained: " + content);
}, function(error) {
  console.log("Failed to read file: " + error);
});
```
@!ec2d81c919fa29218c937bbb8605aa0bdfd4a011

{{index "error handling", "exception handling", "file server example"}}
@!b3dcefe3766c01b2cfdb203e831301f3fd991197

For comparison, I've written another version of the file
server based on ((promise))s, which you can find at
http://eloquentjavascript.net/code/file_server_promises.js[_eloquentjavascript.net/code/file_server_promises.js_].
It is slightly cleaner because functions can now _return_ their
results, rather than having to call callbacks, and the routing of
exceptions is implicit, rather than explicit.
@!332e9509c993aeccf040a64a3946fb5ebc1ed651

{{index "programming style"}}
@!bee913572f9bd35defa0db6a830bfcd79b2f9da5

I'll list a few lines from the promise-based file
server to illustrate the difference in the style of programming.
@!546f96bf519fca8ef43f5a17170738d2655c2458

{{index chaining, "fsp object"}}
@!c9904b263891147601b8d3f56913ff2e7ff6c95f

The `fsp` object that is used by this
code contains promise-style variants of a number of `fs` functions,
wrapped by `Promise.denodeify`. The object returned from the method handler,
with `code` and `body` properties, will become the final result of the
chain of ((promise))s, and it will be used to determine what kind of
((response)) to send to the client.
@!f6536bf22699dc66f91f5a81733fd85b6d4da0d6

```{test: no}
methods.GET = function(path) {
  return inspectPath(path).then(function(stats) {
    if (!stats) // Does not exist
      return {code: 404, body: "File not found"};
    else if (stats.isDirectory())
      return fsp.readdir(path).then(function(files) {
        return {code: 200, body: files.join("\n")};
      });
    else
      return {code: 200,
              type: require("mime").lookup(path),
              body: fs.createReadStream(path)};
  });
};

function inspectPath(path) {
  return fsp.stat(path).then(null, function(error) {
    if (error.code == "ENOENT") return null;
    else throw error;
  });
}
```
@!365432e4f50a8638f17d0cef6df2ae83f7c8c28f

{{index "500 (HTTP status code)", "stat function", "ENOENT (status code)", promise}}
@!30c9750f4c35c6f4a78e72d647c41e9c6bdbdef7

The `inspectPath` function is a simple wrapper
around `fs.stat`, which handles the case where the file is not found.
In that case, we replace the failure with a success that yields `null`.
All other errors are allowed to propagate. When the promise
that is returned from these handlers fails, the HTTP server responds
with a 500 status code.
@!9d46c0afb618461fbbb74469fdecec7ed0486eea

## Summary
@!d5ff200fff2a6f2e3b1f328ad96a54aa378b9ce1

{{index "Node.js"}}
@!31df0cf2dae3a9d86ee0b50f94cd0c51adc0261c

Node is a nice, straightforward system that lets us run
JavaScript in a nonbrowser context. It was originally designed for
network tasks to play the role of a _node_ in a network. But it lends
itself to all kinds of scripting tasks, and if writing JavaScript is
something you enjoy, automating everyday tasks with Node works
wonderfully.
@!99ba963c278f0a45e145508f5f900913ee96ccfa

NPM provides libraries for everything you can think of (and quite a
few things you'd probably never think of), and it allows you to fetch and
install those libraries by running a simple command. Node also comes with a 
number of built-in modules, including the `"fs"` module, for working with 
the file system, and the `"http"` module, for running HTTP servers and making 
HTTP requests.
@!2dc508ce1cd8d1a67b523fa03a9d08a92643198b

All input and output in Node is done asynchronously, unless you
explicitly use a synchronous variant of a function, such as
`fs.readFileSync`. You provide callback functions, and Node will call
them at the appropriate time, when the I/O you asked for has finished.
@!6da2cab12582a61bd6ee257ed7677a2065958738

## Exercises
@!e1bfdb0bd7fae786fbbfa3c35ea464da6860e3cc

### Content negotiation, again
@!4db6cb63327b4ad83863e16b45886514cad151e8

{{index "Accept header", "content negotiation (exercise)"}}
@!fd2bd71036675f7178fe653fbc3b1d07fdc3cc78

In
[Chapter 17](17_http.html#exercise_accept), the first exercise was
to make several requests to
http://eloquentjavascript.net/author[_eloquentjavascript.net/author_],
asking for different types of content by passing different `Accept`
headers.
@!9f028a4fe69243bd8d324629a559effa857c0c41

{{index "request function", "http module", "MIME type"}}
@!978f669c728b588323ed90c21e9e616642522781

Do this again,
using Node's `http.request` function. Ask for at least the media types
`text/plain`, `text/html`, and `application/json`. Remember that
headers to a request can be given as an object, in the `headers`
property of `http.request`’s first argument.
@!43a3473d01ca91a27cdd51dfe2a2cf37ab4f1973

{{index output}}
@!18d474996f32c073a0acc278033992fb71bf399a

Write out the content of the responses to each request.
@!4d9520c9ceaacbb1256d8d2aa83c31e76df34023

{{hint
@!05feeb3601f95b57c76b96690e052639f7fdac28

{{index "content negotiation (exercise)", "end method", "request function"}}
@!f187959e2da0c2e6ad8cedd6cf55cbc99a0cd17e

Don't forget to call the `end` method on the object
returned by `http.request` in order to actually fire off the request.
@!94f27f3c8e2af1d5e775dfd42e98815ff8a29587

{{index concatenation, "callback function", "readStreamAsString function"}}
@!60ca371f7329e40beee3edf5b0f92af83031d6c2

The ((response)) object passed to `http.request`’s callback
is a ((readable stream)). This means that it is not entirely trivial
to get the whole response body from it. The following utility
function reads a whole stream and calls a callback function with the
result, using the usual pattern of passing any errors it encounters as
the first argument to the callback:
@!93b820d92f4b0fb9f81b448bcff920c6a6781f18

```{lang: "text/javascript"}
function readStreamAsString(stream, callback) {
  var data = "";
  stream.on("data", function(chunk) {
    data += chunk.toString();
  });
  stream.on("end", function() {
    callback(null, data);
  });
  stream.on("error", function(error) {
    callback(error);
  });
}
```
@!4d038b27f2c27674f7f43c8a22ae189c07751bc6

hint}}
@!75e8af4ff2ca93a48e7c0ebf7d581d7971d08f41

### Fixing a leak
@!66682ec752add3216a4f04f1b47e7c42e90b4baf

{{index "file server example", leak}}
@!e182cb31682523d0537095168249389d42f5a13e

For easy remote access to some
files, I might get into the habit of having the
[file server](20_node.html#file_server) defined in this chapter
running on my machine, in the `/home/marijn/public` directory. Then,
one day, I find that someone has gained access to all the
((password))s I stored in my ((browser)).
@!9466c5135f54401b0f13c5fb9f152f02c0bb0d27

What happened?
@!f7a32a5a922e8e66df70ad073988c04f32f84f9f

{{index "urlToPath function", "relative path"}}
@!ba3f8a81d14e50b89e4aac32c35893c34fed3ab0

If it isn't clear to you
yet, think back to the `urlToPath` function, defined like this:
@!5ccfd707128fb574968fff694f5f6e561f4c4be8

```
function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  return "." + decodeURIComponent(path);
}
```
@!2bd7ec7e9874045703a285da8201fbbdf9a2f9bd

{{index "fs module"}}
@!f52e8e042f5d5133a95e8f04fbfac1dc4ba29874

Now consider the fact that paths passed to the `"fs"`
functions can be relative—they may contain `"../"` to go up a
directory. What happens when a client sends requests to URLs like the
ones shown here?
@!4316f03820ece4400333e8432c57ec98f7208aff

```{lang: null}
http://myhostname:8000/../.config/config/google-chrome/Default/Web%20Data
http://myhostname:8000/../.ssh/id_dsa
http://myhostname:8000/../../../etc/passwd
```
@!7249df26955af9993bc6e24e29de89c07688b726

{{index directory, "urlToPath function", "slash character", "backslash character"}}
@!9cb699dd9b12b324867a3785a55603535ce59823

Change `urlToPath` to fix this
problem. Take into account the fact that Node on ((Windows)) allows
both forward slashes and backslashes to separate directories.
@!6e7649b2c599a51bc4de195c4a6f3f1fd872587d

{{index security}}
@!aa9c8d142c7eedea4d18f3baf4babbe85e47afb8

Also, meditate on the fact that as soon as you expose
some half-baked system on the ((Internet)), the ((bug))s in that
system might be used to do bad things to your machine.
@!bfa18a271a3d19d2e5db3a7a44322048c6cb7aab

{{hint
@!df9e87c44304b1f5d2ea183b0608d3ecf5db59e6

{{index "replace method", "file server example", leak, "period character", "slash character", "backslash character", "decodeURIComponent function"}}
@!a16bb76c200da5c2f381a1eeeae152c8b879aa1f

It is enough to strip out
all occurrences of two dots that have a slash, a backslash, or the end
of the string on both sides. Using the `replace` method with a
((regular expression)) is the easiest way to do this. But since such
instances may overlap (as in `"/../../f"`), you may have to apply
`replace` multiple times, until the string no longer changes. Also
make sure you do the replace _after_ decoding the string, or it would
be possible to foil the check by encoding a dot or a slash.
@!4daf6d371a02253f874c7163b03b42a574444ca8

{{index [path, "file system"], "slash character"}}
@!573d81b0ed7450f9b842881a2fe66616fbafa750

Another potentially
worrying case is when paths start with a slash, which are interpreted as
((absolute path))s. But because `urlToPath` puts a dot character in
front of the path, it is impossible to create requests that result in
such a path. Multiple slashes in a row, inside the path, are odd
but will be treated as a single slash by the file system.
@!1713c8c61064f911f46647cb37c938d22cd14d54

hint}}
@!587738c7bf6e7c8583c0fe5debff7501bf574e87

### Creating directories
@!48f002de683b11829251c68520724efe6a2eb4e2

{{index "file server example"}}
@!8b008767bdf99b54a982f2817a69eeed0198d6b0

Though the `DELETE` method is wired up to
delete directories (using `fs.rmdir`), the file server currently does
not provide any way to _create_ a ((directory)).
@!fecc3e4e600bc0276b5b7657cf8736cc241adccc

{{index "MKCOL method"}}
@!36ef2edaec525156f3ab30d2ea93385c59b45c86

Add support for a method `MKCOL`, which should
create a directory by calling `fs.mkdir`. `MKCOL` is not one of the
basic HTTP methods, but it does exist, for this same purpose, in the
_((WebDAV))_ standard, which specifies a set of extensions to ((HTTP)),
making it suitable for writing resources, not just reading them.
@!20c1f95dc320d029eed44a50860d2424f1f28139

{{hint
@!72557efa0e4df1c55dda79912c5b04ed15c83747

{{index "file server example", "MKCOL method", "mkdir function", idempotency, "400 (HTTP status code)"}}
@!8c5a439abd23ec3e32ae83ba20817199abd0e9d4

You can use
the function that implements the `DELETE` method as a blueprint for
the `MKCOL` method. When no file is found, try to create a directory with
`fs.mkdir`. When a directory exists at that path, you can return a 204
response so that directory creation requests are idempotent. If a
nondirectory file exists here, return an error code. The code 400 (“bad
request”) would be appropriate here.
@!3ed2770062b27f35af60e240e746c67afc0ca84a

hint}}
@!23ff84460e8713c09737638d8cf8a4237a131fec

### A public space on the web
@!78bf32d9eb2453872838f44ad9cd9c51ce59eb75

{{index "public space (exercise)", "file server example", "Content-Type header", website}}
@!bb48a1ce52e4e70fd2dcb76f370f2fc8474cb9f4

Since the file server serves up any kind of
file and even includes the right `Content-Type` header, you can use
it to serve a website. Since it allows everybody to delete and replace
files, it would be an interesting kind of website: one that can be
modified, vandalized, and destroyed by everybody who takes the time to
create the right HTTP request. Still, it would be a website.
@!0c00c90c078fcd8e5f6a4c6d1159b8c5e29b8254

Write a basic ((HTML)) page that includes a simple JavaScript file.
Put the files in a directory served by the file server and open them in
your browser.
@!b1b7cf1acbf6a836a13e75e75b3e8519a3cc3b9d

Next, as an advanced exercise or even a ((weekend project)), combine
all the knowledge you gained from this book to build a more
user-friendly interface for modifying the website from _inside_ the
website.
@!082e85662692920885a7766b76a768222765aea0

{{index XMLHttpRequest}}
@!5c4e4d05ee2f7a5ff29ff27ff82b58f2f43b0f2e

Use an HTML ((form))
([Chapter 18](18_forms.html#forms)) to edit the content of the
files that make up the website, allowing the user to update them on
the server by using HTTP requests as described in
[Chapter 17](17_http.html#http).
@!329e2091b740712af078e2a740f07aee2dceaeb2

Start by making only a single file editable. Then make it so that the
user can select which file to edit. Use the fact that our file server
returns lists of files when reading a directory.
@!d351aeba24fc4826cd17fea6a8441a04dace3bb8

{{index overwriting}}
@!89b6cbf8f86edd65772ec7980c22969d6cb96861

Don't work directly in the code on the file server,
since if you make a mistake you are likely to damage the files there.
Instead, keep your work outside of the publicly accessible directory
and copy it there when testing.
@!97cf7a1adf5b848440d80b74d70ab8a3d05054e6

{{index "IP address"}}
@!f79c4c23313fa9cc2c346aafb4512d15e083e9c8

If your computer is directly connected to the
((Internet)), without a ((firewall)), ((router)), or other interfering
device in between, you might be able to invite a friend to use your
website. To check, go to http://www.whatismyip.com/[_whatismyip.com_],
copy the IP address it gives you into the address bar of your browser,
and add `:8000` after it to select the right port. If that brings you
to your site, it is online for everybody to see.
@!9c76fc1d0c41893e310e9abf87e4b21182c674a9

{{hint
@!bec1c6531e37ad70f036b4bdc8940e230668393f

{{index "file server example", "textarea (HTML tag)", XMLHttpRequest, "relative path", "public space (exercise)"}}
@!fadca6ef1be21f710f00929b45417415fc22f314

You can create a `<textarea>` element to hold the content
of the file that is being edited. A `GET` request, using
`XMLHttpRequest`, can be used to get the current content of the file.
You can use relative URLs like _index.html_, instead of
http://localhost:8000/index.html[_http://localhost:8000/index.html_],
to refer to files on the same server as the running script.
@!792ac10179472d96a336dcde20ba1bd4e0908600

{{index "form (HTML tag)", "submit event", "click event", "PUT method"}}
@!9291884de3a04f8d64ad49affefa3a3e9fcbb53b

Then, when the user clicks a button (you can use a `<form>`
element and `"submit"` event or simply a `"click"` handler), make a
`PUT` request to the same URL, with the content of the `<textarea>` as
request body, to save the file.
@!17eb37d6b4c6a185058eaeba438365261dbc498f

{{index "select (HTML tag)", "option (HTML tag)", "change event"}}
@!4dade310c69d1f58918c4ef3bab719b6a294c29f

You
can then add a `<select>` element that contains all the files in the
server's root ((directory)) by adding `<option>` elements containing
the lines returned by a `GET` request to the URL `/`. When the user
selects another file (a `"change"` event on the field), the script
must fetch and display that file. Also make sure that when saving a
file, you use the currently selected filename.
@!dca6b71ea9e71431efaae1763fe4188bbe11dddd

{{index directory, "GET method"}}
@!0dfa7c5c6f5e1a803dcc615992758df053733395

Unfortunately, the server is too
simplistic to be able to reliably read files from subdirectories
since it does not tell us whether the thing we fetched with a `GET`
request is a regular file or a directory. Can you think of a way to
extend the server to address this?
@!575eea35be67b582439b3f3639a57416ff44a553

hint}}
@!ecf80c1624b0d4dea4159c92d6baedaa7b62607b