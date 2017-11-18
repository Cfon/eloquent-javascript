{{meta {chap_num: 12, prev_link: 11_language, next_link: 13_dom}}}
@!4b4fc6140181680450a43bf6f9d2d1ae78abcc3f

# JavaScript and the Browser
@!208d7f014405a8f370f304e880a3bd8b68783c7f

{{index [JavaScript, "history of"], "World Wide Web"}}
@!f128e98637e4b85ac935b903d5d82278bdefba23

The next part of this book will talk about web browsers. Without
web ((browser))s, there would be no JavaScript. And even if there
were, no one would ever have paid any attention to it.
@!cde96d9ed6fb05c6a4558770377094d47f89948a

{{index decentralization, compatibility}}
@!c86bcefef7e362f7dbd33558e130e0bfeeb63479

Web technology has, from the
start, been decentralized, not just technically but also in the
way it has evolved. Various browser vendors have added new
functionality in ad hoc and sometimes poorly thought out ways, which
then sometimes ended up being adopted by others and finally set down
as a ((standard)).
@!deb1938263f571bda263395f898c3e37708f8a96

This is both a blessing and a curse. On the one hand, it is empowering
to not have a central party control a system but have it be improved
by various parties working in loose ((collaboration)) (or,
occasionally, open hostility). On the other hand, the haphazard way in
which the Web was developed means that the resulting system is not
exactly a shining example of internal ((consistency)). In fact, some
parts of it are downright messy and confusing.
@!494e3b8ffba081539c9372ebc2ee208329a2f7bb

## Networks and the Internet
@!1f453044580cb559df55f9d63ee6ed9d86e64834

Computer ((network))s have been around since the 1950s. If you put
cables between two or more computers and allow them to send data back
and forth through these cables, you can do all kinds of wonderful
things.
@!9b705be657b313033048c629ebbd93f15130b074

If connecting two machines in the same building allows us to do
wonderful things, connecting machines all over the planet should be
even better. The technology to start implementing this vision was
developed in the 1980s, and the resulting network is called the
_((Internet))_. It has lived up to its promise.
@!7d2f2f304417b16c81ba90f949042e09aeaa84e0

A computer can use this network to spew bits at another computer. For
any effective ((communication)) to arise out of this bit-spewing, the
computers at both ends must know what the bits are supposed to
represent. The meaning of any given sequence of bits depends entirely
on the kind of thing that it is trying to express and on the
((encoding)) mechanism used.
@!8f2b932a438a8b26e0190329211ae40199a5425c

A _network ((protocol))_ describes a style of communication over a
((network)). There are protocols for sending email, for fetching email,
for sharing files, or even for controlling computers that happen to be
infected by malicious software.
@!346de5a21c2f4fb563fcf984e409d1ffd145d754

For example, a simple ((chat)) protocol might consist of one computer
sending the bits that represent the text “CHAT?” to another machine
and the other responding with “OK!” to confirm that it understands the
protocol. They can then proceed to send each other strings of text,
read the text sent by the other from the network, and display whatever
they receive on their screens.
@!c194b1a7c181d316c3f1d1a3da580f068c6e6ec4

{{index layering, stream, ordering}}
@!48cb505b7ac7f9976a67e42f64cfe2a07c59fe55

Most protocols are built on
top of other protocols. Our example chat protocol treats the network
as a streamlike device into which you can put bits and have them
arrive at the correct destination in the correct order. Ensuring those
things is already a rather difficult technical problem.
@!809b1e3151a1b741a4359bc38b77887698e1d546

{{index TCP}}
@!556d9d7e966d860e35155d79260a94ad27087215

{{indexsee "Transmission Control Protocol", TCP}}
@!ea38472a1ce7fe9be29c1162df95e18f81a71e82

The _Transmission Control Protocol_ (TCP) is a ((protocol)) that
solves this problem. All Internet-connected devices “speak” it, and
most communication on the ((Internet)) is built on top of it.
@!b1dc4a8af64360d783ed251c304717db546edc50

{{index "listening (TCP)"}}
@!8afa2ae3ec066b2c4cda419290198e541f56f830

A TCP ((connection)) works as follows: one
computer must be waiting, or _listening_, for other computers to start
talking to it. To be able to listen for different kinds of
communication at the same time on a single machine, each listener has
a number (called a _((port))_) associated with it. Most ((protocol))s
specify which port should be used by default. For example, when we
want to send an email using the ((SMTP)) protocol, the machine through
which we send it is expected to be listening on port 25.
@!a06f71a4e111e302ae0c6fed6c176a646453b292

Another computer can then establish a ((connection)) by connecting to
the target machine using the correct port number. If the target
machine can be reached and is listening on that port, the connection
is successfully created. The listening computer is called the
_((server))_, and the connecting computer is called the _((client))_.
@!842e5494f2ac7a55ba6d9e95e18ea2487723d548

Such a connection acts as a two-way ((pipe)) through which bits can
flow—the machines on both ends can put data into it. Once the bits are
successfully transmitted, they can be read out again by the machine on
the other side. This is a convenient model. You could say that
((TCP)) provides an ((abstraction)) of the network.
@!2c288724e061515ad45cfde480945bbceb8d5317

{{id web}}
@!a286b3182cc54318f4a6ac16f1b72e6d4326f4cf

## The Web
@!f6ef88bd6645f465a1cd1d0d749f30613a710e5a

The _((World Wide Web))_ (not to be confused with the ((Internet)) as
a whole) is a set of ((protocol))s and formats that allow us to visit
web pages in a browser. The “Web” part in the name refers to the fact
that such pages can easily link to each other, thus connecting into a
huge ((mesh)) that users can move through.
@!522ab31d9322d631b670711beb5c98d43d5a9df1

{{index HTTP}}
@!fe2e5fa825ea3755320573db7bec7361b63a7230

{{indexsee "Hypertext Transfer Prototol", HTTP}}
@!8d90368a4fbae35361a95cf57f9d0a349ef42815

To add content to the Web, all you need to do is connect a machine to
the ((Internet)), and have it listen on port 80, using the
_Hypertext Transfer Protocol_ (HTTP). This protocol allows other computers
to request documents over the ((network)).
@!f6e3c83e29f56984909efd0fe242dc289a33546a

{{index URL}}
@!f803e144062846314583be5bc099deb5329cea6f

{{indexsee "Uniform Resource Locator", URL}}
@!6a93649264c65f6df7ce6d8a600f67f301b21102

Each ((document)) on the Web is named by a _Uniform Resource
Locator_ (URL), which looks something like this:
@!9f7d1a51653cec374e6e2653fe99e209486d78b1

```{lang: null}
  http://eloquentjavascript.net/12_browser.html
 |      |                      |               |
 protocol       server               path
```
@!dab16e422522a997966fdb82983f226589446e42

{{index HTTPS}}
@!dd6fd7b9f20ed9d87213d7b9693bc9b550beeec5

The first part tells us that this URL uses the HTTP
((protocol)) (as opposed to, for example, encrypted HTTP, which would
be _https://_). Then comes the part that identifies which ((server))
we are requesting the document from. Last is a path string that
identifies the specific document (or _((resource))_) we are interested
in.
@!d2b8d51aabe092b390c95539c9b93600bc4f5792

Each machine connected to the Internet gets a unique _((IP address))_,
which looks something like `37.187.37.82`. You can use these directly
as the server part of a ((URL)). But lists of more or less random
numbers are hard to remember and awkward to type, so you can instead
register a _((domain)) name_ to point toward a specific machine or
set of machines. I registered _eloquentjavascript.net_ to point at the
IP address of a machine I control and can thus use that domain name
to serve web pages.
@!3e23190b0863f53a04c4b3e4dc08fd345e99c3f8

{{index browser}}
@!467f9bd694bd4f8a234929ad9f59818af5c1e3dd

If you type the previous URL into your browser's ((address
bar)), it will try to retrieve and display the ((document)) at that
URL. First, your browser has to find out what address
_eloquentjavascript.net_ refers to. Then, using the ((HTTP)) protocol,
it makes a connection to the server at that address and asks for the
resource _/12_browser.html_.
@!509c21d9fcf4eace7415df8d9b888978b9445048

We will take a closer look at the HTTP protocol in
[Chapter 17](17_http.html#http).
@!5d3da96f8564655b5785992d2e81f3092d1be6de

## HTML
@!9ded889a2a55ebf5c75aac8eaf19143bf734b43f

{{index HTML}}
@!330ba17a665af12e27d41d4d11862212c0e68305

{{indexsee "Hypertext Markup Language", HTML}}
@!56d66ed5a9078a428dbf71bfe6f2bc96ffb83d6f

HTML, which stands for _Hypertext Markup Language_, is the
document format used for web pages. An HTML document contains
((text)), as well as _((tag))s_ that give structure to the text,
describing things such as links, paragraphs, and headings.
@!d9e0af9c147b9fa46b565e86c100f7f446764d50

A simple HTML document looks like this:
@!7fdf81c03b1b522ca3b19a81d1722259aed625d1

```{lang: "text/html"}
<!doctype html>
<html>
  <head>
    <title>My home page</title>
  </head>
  <body>
    <h1>My home page</h1>
    <p>Hello, I am Marijn and this is my home page.</p>
    <p>I also wrote a book! Read it
      <a href="http://eloquentjavascript.net">here</a>.</p>
  </body>
</html>
```
@!0adcafbb99b1e94081073c11e10e5e9451a33e8d

{{if book
@!2983ebaffbcea720831ca96554663cbfb4972e5b

This is what such a document would look like in the browser:
@!3322a9aad63c1083ca261d6c0d14d9ae4cab3b4c

{{figure {url: "img/home-page.png", alt: "My home page",width: "6.3cm"}}}
@!0622e236d9b5cca2378eb44d56d09356b2347340

if}}
@!5cdf502bece7ea7347bbbf95bb98455c5f411e46

{{index "angle brackets"}}
@!58fc92c48153e6e6aa12deda7449053ada978dae

The tags, wrapped in angle brackets (`<`
and `>`), provide information about the ((structure)) of the
document. The other ((text)) is just plain text.
@!26878d9c7be96228744c50432366f8b783b2cae5

{{index doctype, version}}
@!fff946c1a058de37bb8ff8c646b2644163622bfd

The document starts with `<!doctype html>`,
which tells the browser to interpret it as _modern_ HTML, as opposed
to various dialects that were in use in the past.
@!250967a0e86140a2326081569db141bcff4d8a4b

{{index "head (HTML tag)", "body (HTML tag)", "title (HTML tag)", "h1 (HTML tag)", "p (HTML tag)"}}
@!4414fa4ffb85cb0af44e61cfb6547898942d4634

HTML documents have a head and a body.
The head contains information _about_ the document, and the body
contains the document itself. In this case, we first declared that the
title of this document is “My home page” and then gave a document
containing a heading (`<h1>`, meaning “heading 1”—_`<h2>`_ to `<h6>`
produce more minor headings) and two ((paragraph))s (`<p>`).
@!3f69c790ec586824018f3e15f2f93f5a7d66bbde

{{index "href attribute", "a (HTML tag)"}}
@!f0836b8bb6100b5acbc34712190fe972bf83be56

Tags come in several forms. An
((element)), such as the body, a paragraph, or a link, is started by
an _((opening tag))_ like `<p>` and ended by a _((closing tag))_ like
`</p>`. Some opening tags, such as the one for the ((link)) (`<a>`),
contain extra information in the form of `name="value"` pairs. These
are called _((attribute))s_. In this case, the destination of the link
is indicated with `href="http://eloquentjavascript.net"`, where `href`
stands for “hypertext reference”.
@!fcfc182523ff4a3ee55095d4c50e40ca2003cc13

{{index "src attribute", "self-closing tag", "img (HTML tag)"}}
@!a6b726bea749c442f226e7bdb0ee1dfec2b98ab3

Some
kinds of ((tag))s do not enclose anything and thus do not need to be
closed. An example of this would be `<img
src="http://example.com/image.jpg">`, which will display the ((image))
found at the given source URL.
@!d64d633d5d259bf0561eebd63633de4eaaa327c7

{{index [escaping, "in HTML"]}}
@!c448c7d56d078d09a3d768acfa5642fb6bb9ffbb

To be able to include ((angle brackets)) in
the text of a document, even though they have a special meaning in
HTML, yet another form of special notation has to be introduced. A
plain opening angle bracket is written as `&lt;` (“less than”), and
a closing bracket is written as `&gt;` (“greater than”). In HTML, an ampersand
(`&`) character followed by a word and a semicolon (`;`) is called an
_((entity))_, and will be replaced by the character it encodes.
@!90dd5e304465d54320d22224fbc2a161af3c433f

{{index "backslash character", "ampersand character", "double-quote character"}}
@!d237a3a111b92b5d588ccad4ed05cbe773fc0a2e

This is analogous to the way backslashes are used in
JavaScript strings. Since this mechanism gives ampersand characters a
special meaning, too, those need to be escaped as `&amp;`. Inside an
attribute, which is wrapped in double quotes, `&quot;` can be used to
insert an actual quote character.
@!e0e750e14226f7942fb0e672e0ecd7baeb5d3312

{{index "error tolerance", parsing}}
@!28cd1907b606185648c4ba339bfcdc59dd1557fd

HTML is parsed in a remarkably
error-tolerant way. When tags that should be there are missing, the
browser reconstructs them. The way in which this is done has been
standardized, and you can rely on all modern browsers to do it in the
same way.
@!e38c7705dd1b552db2349e9ab284bd5cd5019b6c

The following document will be treated just like the one shown previously:
@!f8eea4ec03c82e743571e0209ab37aa56ab382aa

```{lang: "text/html"}
<!doctype html>

<title>My home page</title>

<h1>My home page</h1>
<p>Hello, I am Marijn and this is my home page.
<p>I also wrote a book! Read it
  <a href=http://eloquentjavascript.net>here</a>.
```
@!29deca981cc5bc6b6981ab204195c54ce9b758a1

{{index "title (HTML tag)", "head (HTML tag)", "body (HTML tag)", "html (HTML tag)"}}
@!67100c30cae0e3ca30b5cfe2311d6619c014d6ea

The `<html>`, `<head>`, and `<body>` tags
are gone completely. The browser knows that `<title>` belongs in a
head, and that `<h1>` in a body. Furthermore, I am no longer explicitly
closing the paragraphs since opening a new paragraph or ending the
document will close them implicitly. The quotes around the link target
are also gone.
@!03de950a7d55b5b63d5adcd97caeaa4cd9aa9afa

This book will usually omit the `<html>`, `<head>`, and `<body>` tags
from examples to keep them short and free of clutter. But I _will_
close tags and include quotes around attributes.
@!2d62f13460eff630532fbabd18b4aeacb164c84f

{{index browser}}
@!e61fd41f4eb0bf09e7e410397c033ea53731300b

I will also usually omit the ((doctype)). This is not to
be taken as an encouragement to omit doctype declarations. Browsers
will often do ridiculous things when you forget them. You should
consider doctypes implicitly present in examples, even when they are
not actually shown in the text.
@!0c1073e2f719ef335a0b7296457c8a86ccf68cd5

{{id script_tag}}
@!ddf4c132d18e66da8f4a843f0a4c11a986d76440

## HTML and JavaScript
@!e1e8388c1f409571bbf7c4d8021a9964c456e598

{{index [JavaScript, "in HTML"], "script (HTML tag)"}}
@!198ff0ff64734d13fb29e7129d9427f395573c36

In the context of this
book, the most important ((HTML)) tag is `<script>`. This tag allows
us to include a piece of JavaScript in a document.
@!d1f5774b77f78caa53014dcabf14fcccb39a50cc

```{lang: "text/html"}
<h1>Testing alert</h1>
<script>alert("hello!");</script>
```
@!7f8bb7ce1f1b9205df8ac26c03239380db89bb9e

{{index "alert function", timeline}}
@!57abd5241f8a9d9900587f97fae0dd9ee6b15eb3

Such a script will run as soon as
its `<script>` tag is encountered as the browser reads the HTML. The
page shown earlier will pop up an `alert` dialog when opened.
@!bc0b54deec3bdcae12fa41bf962224572697f1aa

{{index "src attribute"}}
@!8ef333c277c1ae048eaf30d5f560417a3f3c4971

Including large programs directly in HTML documents
is often impractical. The `<script>` tag can be given an `src`
attribute in order to fetch a script file (a text file containing a
JavaScript program) from a URL.
@!5ebed394c98c59710cd0b1e04933eba9180a9c31

```{lang: "text/html"}
<h1>Testing alert</h1>
<script src="code/hello.js"></script>
```
@!3fd7f00403b75b5c580b57510fdfacb820563a83

The _code/hello.js_ file included here contains the same simple program,
`alert("hello!")`. When an HTML page references other URLs as part of
itself, for example an image file or a script—web browsers will
retrieve them immediately and include them in the page.
@!6c4749475ae5e5d228d731364baf94437b65fb60

{{index "script (HTML tag)", "closing tag"}}
@!e1554861ea9606a435f2ea485b4216b32b9af592

A script tag must always be
closed with `</script>`, even if it refers to a script file and
doesn't contain any code. If you forget this, the rest of the page
will be interpreted as part of the script.
@!ae57efe3de2d403617f5caa67cc1f1e22281994f

{{index "button (HTML tag)", "onclick attribute"}}
@!ad092ffdb091dc13741ef9e2d98d478795642abf

Some attributes can also
contain a JavaScript program. The `<button>` tag shown next (which shows up
as a button) has an `onclick` attribute, whose content will be run
whenever the button is clicked.
@!514dac2e64a46d59a7a56e05119cf170dade3333

```{lang: "text/html"}
<button onclick="alert('Boom!');">DO NOT PRESS</button>
```
@!5a3166c6b777788e975bbd72910dff672909711d

{{index "single-quote character", [escaping, "in HTML"]}}
@!a6bfc47388713278d596a9d341bb5f7135d183a0

Note that I had to
use single quotes for the string in the `onclick` attribute because
double quotes are already used to quote the whole attribute. I could
also have used `&quot;`, but that'd make the program harder to read.
@!9228355275c414947cb9015ce1d69879207d92fa

## In the sandbox
@!da9e91eac8b18fc238ab253bb4e97a8a4f1385ec

{{index "malicious script", "World Wide Web", browser, website, security}}
@!36e6f42931b04e6846bef520a8766080f647ebef

Running programs
downloaded from the ((Internet)) is potentially dangerous. You do not
know much about the people behind most sites you visit, and they do
not necessarily mean well. Running programs by people who do not mean
well is how you get your computer infected by ((virus))es, your data
stolen, and your accounts hacked.
@!12e9f74f37aabd03c4729b21c94dd14b74a32df3

Yet the attraction of the Web is that you can surf it without
necessarily ((trust))ing all the pages you visit. This is why browsers
severely limit the things a JavaScript program may do: it can't look
at the files on your computer or modify anything not related to the
web page it was embedded in.
@!2704495a51ab7cbd04059ff19e5879b8322eb2cd

{{index isolation}}
@!7434b8b3e30ea3eb4c1d36188a98229eca872901

Isolating a programming environment in this way is
called _((sandbox))ing_, the idea being that the program is harmlessly
playing in a sandbox. But you should imagine this particular kind of
sandbox as having a cage of thick steel bars over it, which makes it
somewhat different from your typical playground sandbox.
@!9d51053fe1195e14221afd5382a1fa77acaed3c9

The hard part of sandboxing is allowing the programs enough room to be
useful yet at the same time restricting them from doing anything
dangerous. Lots of useful functionality, such as communicating with
other servers or reading the content of the copy-paste ((clipboard)),
can also be used to do problematic, ((privacy))-invading things.
@!d498960f6e8d9335647892b5bb42bfd9fd9f8329

{{index leak, exploit, security}}
@!7c4253d182aa247f22ba5144eac4be54435c2ba5

Every now and then, someone comes
up with a new way to circumvent the limitations of a ((browser)) and
do something harmful, ranging from leaking minor private information
to taking over the whole machine that the browser runs on. The browser
developers respond by fixing the hole, and all is well again—that is,
until the next problem is discovered, and hopefully publicized, rather
than secretly exploited by some government or ((mafia)).
@!4254e5a8dc1a18a85485c26e25574df087547bf0

## Compatibility and the browser wars
@!57d8e54825b6103698edda41e01dabdf0a14b551

{{index Microsoft, "World Wide Web"}}
@!7be8b07eb77d873e0aef3f9e3f44f05d88ed966d

In the early stages of the
Web, a browser called ((Mosaic)) dominated the market. After a few
years, the balance had shifted to ((Netscape)), which was then, in
turn, largely supplanted by Microsoft's ((Internet Explorer)). At any
point where a single ((browser)) was dominant, that browser's vendor
would feel entitled to unilaterally invent new features for the Web.
Since most users used the same browser, ((website))s would simply
start using those features—never mind the other browsers.
@!48cc8b645f439b942ca6b7e7589efa98905350fa

This was the dark age of ((compatibility)), often called the
_((browser wars))_. Web developers were left with not one unified Web
but two or three incompatible platforms. To make things worse, the
browsers in use around 2003 were all full of ((bug))s, and of course
the bugs were different for each ((browser)). Life was hard for people
writing web pages.
@!b4081e0ea35f1ffa6a5c5ea2d941775dae188947

{{index Apple, "Internet Explorer", Mozilla}}
@!a94e39657b3cb09fa805eb52a5f7d8f11f451410

Mozilla ((Firefox)), a
not-for-profit offshoot of ((Netscape)), challenged Internet
Explorer's hegemony in the late 2000s. Because ((Microsoft)) was not
particularly interested in staying competitive at the time, Firefox
took quite a chunk of market share away from it. Around the same
time, ((Google)) introduced its ((Chrome)) browser, and Apple's
((Safari)) browser gained popularity, leading to a situation where
there were four major players, rather than one.
@!ee963b6d5b761a6c5bc22929f9622722677b74aa

{{index compatibility}}
@!00830b8d206605c18bb7339907cc147aec5365f3

The new players had a more serious attitude toward
((standards)) and better ((engineering)) practices, leading to less
incompatibility and fewer ((bug))s. Microsoft, seeing its market share
crumble, came around and adopted these attitudes. If you are starting
to learn web development today, consider yourself lucky. The latest
versions of the major browsers behave quite uniformly and have
relatively few bugs.
@!3b9983c73be0c99a42afe11d9111f6c4a68bb118

{{index "World Wide Web"}}
@!13f6fbee702043dd36d0acb20dbe6d39cdaf102b

That is not to say that the situation is perfect
just yet. Some of the people using the Web are, for reasons of inertia
or corporate policy, stuck with very old ((browser))s. Until those
browsers die out entirely, writing websites that work for them will
require a lot of arcane knowledge about their shortcomings and quirks.
This book is not about those ((quirks)). Rather, it aims to present
the modern, sane style of ((web programming)).
@!b99f2c8d380e65c29cf0f56abf1171f9651ff834