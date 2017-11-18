{{meta {chap_num: 17, prev_link: 16_canvas, next_link: 18_forms, load_files: ["code/chapter/17_http.js"]}}}
@!65abbda4a13642feeb84a45c516956de6f3d68bd

# HTTP
@!be524b6af8ffd214bdd9bce41dfce77f20e54d76

{{quote {author: "Tim Berners-Lee", title: "The World Wide Web: A very short personal history", chapter: true}
@!3f4c38ef2cd78ac06d8f5988fdb19c9756627696

The dream behind the Web is of a common information space in which we
communicate by sharing information. Its universality is essential: the
fact that a hypertext link can point to anything, be it personal,
local or global, be it draft or highly polished.
@!1eb4496a3ad75d9cb03136eae3f854df67ac4ec5

quote}}
@!d259a266a7eff026972d697e05e18d963addc4bb

{{index "Berners-Lee, Tim", "World Wide Web", HTTP}}
@!009e4bdaa5c71dc10e40337ef9b9b8f358827309

The
_Hypertext Transfer Protocol_, already mentioned in
[Chapter 12](12_browser.html#web), is the mechanism through which
data is requested and provided on the ((World Wide Web)). This chapter
describes the ((protocol)) in more detail and explains the way ((browser))
JavaScript has access to it.
@!3c29da1aba32f34e1f613d87c07123cca148bfae

## The protocol
@!489910d3c8515f5790b4e396aa749d3410c10f02

{{index "IP address"}}
@!8d54cfcb25d02ae995aa935b0942c58fd2a6cbef

If you type _eloquentjavascript.net/17_http.html_ into
your browser's ((address bar)), the ((browser)) first looks up the
((address)) of the server associated with _eloquentjavascript.net_
and tries to open a ((TCP)) ((connection)) to it on ((port)) 80, the
default port for ((HTTP)) traffic. If the ((server)) exists and
accepts the connection, the browser sends something like this:
@!8e1933b77e7b8e5efc31e83954206c25c9c77447

```{lang: http}
GET /17_http.html HTTP/1.1
Host: eloquentjavascript.net
User-Agent: Your browser's name
```
@!3ec8ce083f664b322c8af00295333192da7fa578

Then the server responds, through that same connection.
@!9ee2814c114cbff49e10578a62d8fd710996e857

```{lang: http}
HTTP/1.1 200 OK
Content-Length: 65585
Content-Type: text/html
Last-Modified: Wed, 09 Apr 2014 10:48:09 GMT

<!doctype html>
... the rest of the document
```
@!acd59d301d7e2ddbf68a67305f6d88a0bf36eb83

The browser then takes the part of the ((response)) after the blank
line and displays it as an ((HTML)) document.
@!02240ae8a9bd4a3a152a60299b4abb5a7c8f6ea7

{{index HTTP}}
@!42349a5bd9a8221c3280f9f2a1a2a753b2f398e7

The information sent by the client is called the
_((request))_. It starts with this line:
@!364b939f30c9e0802e48e71377a13506fce1c754

```{lang: http}
GET /17_http.html HTTP/1.1
```
@!edb95e677fd52a97f6bc9630939adedcb8add7f5

{{index "DELETE method", "PUT method", "GET method"}}
@!2d9d8dbcb92435b5a24055b186381ef494d1124b

The first word is
the _((method))_ of the ((request)). `GET` means that we want to _get_
the specified resource. Other common methods are `DELETE` to delete a
resource, `PUT` to replace it, and `POST` to send information to it.
Note that the ((server)) is not obliged to carry out every request it
gets. If you walk up to a random website and tell it to `DELETE` its
main page, it'll probably refuse.
@!ace235ca07805ced3aa01bc36a23cc06e76b17ce

{{index [path, URL], Twitter}}
@!da170cd626b24f756ffc9fb3d1ffa417c57c5bb3

The part after the ((method)) name is the path of the
((resource)) the request applies to. In the simplest case, a resource
is simply a ((file)) on the ((server)), but the protocol doesn't
require it to be. A resource may be anything that can be transferred _as if_
it is a file. Many servers generate the responses they produce on the
fly. For example, if you open
http://twitter.com/marijnjh[_twitter.com/marijnjh_], the server looks
in its database for a user named _marijnjh_, and if it finds one, it
will generate a profile page for that user.
@!a11a34e3a708e86e0c20f345d5b9f7900f0c6d7c

After the resource path, the first line of the request mentions
`HTTP/1.1` to indicate the ((version)) of the ((HTTP)) ((protocol))
it is using.
@!d9c84c5a3067df40480c55fc795011b1e1e4a45a

{{index "status code"}}
@!8175456328aed4cb1a695189a3b7720706b0dfc2

The server's ((response)) will start with a version
as well, followed by the status of the response, first as a
three-digit status code and then as a human-readable string.
@!2fc1b63490a692fadcadb6cd049d645d488c1bf9

```{lang: http}
HTTP/1.1 200 OK
```
@!f1f90635e4616eaf79373a618eeb0ad8628a223f

{{index "200 (HTTP status code)", "error response", "404 (HTTP status code)"}}
@!28f85a27bfaea2e94f00d2545c4a2f5f627c0648

Status codes starting with a 2 indicate that the request succeeded.
Codes starting with 4 mean there was something wrong with the
((request)). 404 is probably the most famous HTTP status code—it means
that the resource that was requested could not be found. Codes that
start with 5 mean an error happened on the ((server)) and the request
is not to blame.
@!f83dedacfcdbe8a1195db8b795af73415950798b

{{index HTTP}}
@!b75f3c467036aa6044464c9c55620328cc7e347e

{{id headers}}
@!176c73e398bcad1167275e5434f63aef55e7e80a

The first line of a request or response may be followed by
any number of _((header))s_. These are lines in the form “name: value”
that specify extra information about the request or response. These
headers were part of the example ((response)):
@!b7548ba68427801e2b3f7503e92106b70a144671

```{lang: null}
Content-Length: 65585
Content-Type: text/html
Last-Modified: Wed, 09 Apr 2014 10:48:09 GMT
```
@!746f5af53d27ecf7ee488200df11aa4d56664d70

{{index "Content-Length header", "Content-Type header", "Last-Modified header"}}
@!dd1ecae53cef77bff881e0d6988a3a207a02f473

This tells us the size and type of the response document. In
this case, it is an HTML document of 65,585 bytes. It also tells us when
that document was last modified.
@!0c6a4a9e6243cd2699459697d4e31feded102a47

{{index "Host header", domain}}
@!933b4df8bcc589194f5b9c97586882fdc1203a0c

For the most part, a client or server 
decides which ((header))s to include in a ((request)) or ((response)), 
though a few headers are required. For example, the `Host` header,
which specifies the hostname, should be included in a request
because a ((server)) might be serving multiple hostnames on a single
((IP address)), and without that header, the server won't know which host the
client is trying to talk to.
@!f47ae9ec15bfac259063464569561e3437282631

{{index "GET method", "DELETE method", "PUT method", "POST method", "body (HTTP)"}}
@!5238ca9d1203d581a14b7b3a9196eebcf6e9ad6f

After the headers, both requests and
responses may include a blank line followed by a _body_, which
contains the data being sent. `GET` and `DELETE` requests don't send
along any data, but `PUT` and `POST` requests do.
Similarly, some response types, such as error responses, do not
require a body.
@!290b40f4687578bc441d2df033d61596bcd232a7

## Browsers and HTTP
@!6cd253aeae2b0ba51dcd39a02aa5e9704a194fab

{{index HTTP}}
@!5b8c60921273af6df937eae3bd960c9d85da7714

As we saw in the example, a ((browser)) will make a request
when we enter a ((URL)) in its ((address bar)). When the resulting
HTML page references other files, such as ((image))s and JavaScript
((file))s, those are also fetched.
@!f0172db17390189492eb1c38653711caab5b1118

{{index parallelism, "GET method"}}
@!0ad0842eb9898c5194ce9ad438168092337f08c0

A moderately complicated ((website)) can easily
include anywhere from 10 to 200 ((resource))s. To be able to
fetch those quickly, browsers will make several requests
simultaneously, rather than waiting for the responses one at a time.
Such documents are always fetched using `GET`
((request))s.
@!dbb5fea5247edda33ae097d59241667c48eed37e

{{id http_forms}}
@!5e635609cd69c54229ec2ede9293c4378bc15089

HTML pages may include _((form))s_, which allow
the user to fill out information and send it to the server. This is an
example of a form:
@!b6cd9be21171df36d476207067967340495f5c07

```{lang: "text/html"}
<form method="GET" action="example/message.html">
  <p>Name: <input type="text" name="name"></p>
  <p>Message:<br><textarea name="message"></textarea></p>
  <p><button type="submit">Send</button></p>
</form>
```
@!595822b6ecc10842c00613c91d317bc18e96a67b

{{index form, "method attribute", "GET method"}}
@!f8d80428497ed9eac6e9da423aadf74559ef3305

This code describes a form with two
((field))s: a small one asking for a name and a larger one to write a
message in. When you click the Send ((button)), the information in
those fields will be encoded into a _((query string))_. When the
`<form>` element's `method` attribute is `GET` (or is omitted), that
query string is tacked onto the `action` URL, and the browser makes a
`GET` request to that URL.
@!2b5ee6e55f13cc1ec329fb6c1062e38a67ac925c

```{lang: "text/html"}
GET /example/message.html?name=Jean&message=Yes%3F HTTP/1.1
```
@!a5ea599b52a3eac4bacc51b4a7e2e94a6f596473

{{index "ampersand character"}}
@!d5ffdef51aa779d1430963f8d531875562e5909b

The start of a ((query string)) is indicated
by a ((question mark)). After that follow pairs of names and values,
corresponding to the `name` attribute on the form field elements and
the content of those elements, respectively. An ampersand character (`&`) is used to separate
the pairs.
@!74734187aadc98a5a8669a1a0700ec2ca7f15a5b

{{index [escaping, "in URLs"], "hexadecimal number", "percent sign", "URL encoding", "encodeURIComponent function", "decodeURIComponent function"}}
@!9802641ebb3b1d503c90deafa7a4be043a74cc22

The actual message encoded
in the previous URL is “Yes?”, even though the question mark is replaced
by a strange code. Some characters in query strings must be
escaped. The question mark, represented as `%3F`, is one of those.
There seems to be an unwritten rule that every format needs its
own way of escaping characters. This one, called _URL
encoding_, uses a percent sign followed by two hexadecimal digits
that encode the character code. In this case, 3F, which is 63 in
decimal notation, is the code of a question mark character. JavaScript
provides the `encodeURIComponent` and `decodeURIComponent` functions
to encode and decode this format.
@!a658a3f7843696a25d52b0c899b15d60f6d758c4

```
console.log(encodeURIComponent("Hello & goodbye"));
// → Hello%20%26%20goodbye
console.log(decodeURIComponent("Hello%20%26%20goodbye"));
// → Hello & goodbye
```
@!73a0c7325494f87e3529d2f4fdfc0105d9ca0b6d

{{index "body (HTTP)", "POST method"}}
@!97e42842ca8cd0386cfafc90af314d39dfbbade8

If we change the `method` attribute
of the HTML form in the example we saw earlier to `POST`, the ((HTTP)) request made to submit the
((form)) will use the `POST` method and put the ((query string)) in
body of the request, rather than adding it to the URL.
@!608aaef9b45e5376e509ffa0b8328c7aa61e91cb

```{lang: http}
POST /example/message.html HTTP/1.1
Content-length: 24
Content-type: application/x-www-form-urlencoded

name=Jean&message=Yes%3F
```
@!9da8ebe0530a7e48ef21bd835d06ad06f8b5dddc

By convention, the `GET` method is used for requests that do not have
side effects, such as doing a search. Requests that change something on
the server, such as creating a new account or posting a message, should
be expressed with other methods, such as `POST`. Client-side software,
such as a browser, knows that it shouldn't blindly make `POST`
requests but will often implicitly make `GET` requests—for example, to
prefetch a resource it believes the user will soon need.
@!1fd062170c94e9234f6c9ff65a735d3e15db8509

The [next chapter](18_forms.html#forms) will return to forms
and talk about how we can script them with JavaScript.
@!cbd0eca86719a210fec5b62dd19c2a2fc0420f33

{{id xmlhttprequest}}
@!3b4c96b048de24627dcd1a81c95c67bfba451a99

## XMLHttpRequest
@!b2b63587099cb5d65e18bcf212df942cbbc8e869

{{index capitalization, XMLHttpRequest}}
@!b63f2dacd9b41a162de268c1694e2881ab41b5b1

The ((interface)) through
which browser JavaScript can make HTTP requests is called
`XMLHttpRequest` (note the inconsistent capitalization). It was
designed by ((Microsoft)), for its ((Internet Explorer))
((browser)), in the late 1990s. During this time, the ((XML)) file format 
was _very_ popular in the world of ((business software))—a world where 
Microsoft has always been at home. In fact, it was so popular that the
acronym XML was tacked onto the front of the name of an interface for
((HTTP)), which is in no way tied to XML.
@!9c1214ef3641e05180493afefef7da131c4bb139

{{index modularity, [interface, design]}}
@!15fd28ca59b67e8cff12e9955d95d3351310dced

The name isn't completely
nonsensical, though. The interface allows you to parse response documents as
XML if you want. Conflating two distinct concepts (making a request
and ((parsing)) the response) into a single thing is terrible design,
of course, but so it goes.
@!3c1a653b1d04aaf0316274a62b349c93ba1764ad

When the `XMLHttpRequest` interface was added to Internet Explorer, it
allowed people to do things with JavaScript that had been very hard
before. For example, websites started showing lists of suggestions
when the user was typing something into a text field. The script would
send the text to the server over ((HTTP)) as the user typed. The ((server)),
which had some ((database)) of possible inputs, would
match the database entries against the partial input and send back possible
((completion))s to show the user. This was
considered spectacular—people were used to waiting for a full page reload
for every interaction with a website.
@!e6a19e74be228e4de26748122a4cd7d0d40cd26d

{{index compatibility, Firefox, XMLHttpRequest}}
@!d8d862a3232a9e0e75b618e4f2c3a8857fa489e4

The other
significant browser at that time, ((Mozilla)) (later Firefox), did not
want to be left behind. To allow people to do similarly neat things in
_its_ browser, Mozilla copied the interface, including the bogus name.
The next generation of ((browser))s followed this example, and today
`XMLHttpRequest` is a de facto standard ((interface)).
@!fdb2a0ccc276abc31861f8bec291a96cf62f2b64

## Sending a request
@!94fdb61997a309be26da1a135a501d44bd2f7b10

{{index "open method", "send method", XMLHttpRequest}}
@!52635320338a7d3f7c93fa7c515a2d8a0a8be840

To make a simple
((request)), we create a request object with the `XMLHttpRequest`
constructor and call its `open` and `send` methods.
@!aa2a1f21ea4a5952e48f556d70ac0ce93c8230ef

```{test: trim}
var req = new XMLHttpRequest();
req.open("GET", "example/data.txt", false);
req.send(null);
console.log(req.responseText);
// → This is the content of data.txt
```
@!9a3e26d94a2a7d2c7355e1a1aa540a6f96a575f7

{{index [path, URL], "open method", "relative URL", "slash character"}}
@!290509293ce8ec5143dc40da2f4f8ce2b9d34529

The `open`
method configures the request. In this case, we choose to make a `GET`
request for the _example/data.txt_ file. ((URL))s that don't start
with a protocol name (such as _http:_) are relative, which means that
they are interpreted relative to the current document. When they start
with a slash (/), they replace the current path, which is the part after the
server name. When they do not, the part of the current path up to
and including its last slash character is put in front of the relative
URL.
@!6b6a10126f0c649f7c2327916b19653fb6391d6c

{{index "send method", "GET method", "body (HTTP)", "responseText property"}}
@!d2d89114223a1c3ab071df62bbbde3944673d259

After opening the request, we can send it with the `send`
method. The argument to send is the request body. For `GET` requests,
we can pass `null`. If the third argument to `open` was `false`, `send`
will return only  after the response to our request was received. We
can read the request object's `responseText` property to get the
response body.
@!e96fb51e1cb7eeee7f445ae83638f9e6c0c954cf

{{index "status property", "statusText property", header, "getResponseHeader method"}}
@!a5735ab5798b29bd33c6207036756bb8e1cd9acb

The other
information included in the response can also be extracted from this
object. The ((status code)) is accessible through the `status`
property, and the human-readable status text is accessible through `statusText`.
Headers can be read with `getResponseHeader`.
@!32778d02c8c25d344b82da636d24562c0808db24

```{test: no}
var req = new XMLHttpRequest();
req.open("GET", "example/data.txt", false);
req.send(null);
console.log(req.status, req.statusText);
// → 200 OK
console.log(req.getResponseHeader("content-type"));
// → text/plain
```
@!280ef021c931b13f8f905606e81efca92d9775e9

{{index "case sensitivity", capitalization}}
@!f35d04313aecb9ca7741a3eb4658e56826ef922b

Header names are
case-insensitive. They are usually written with a capital letter at
the start of each word, such as “Content-Type”, but “content-type” and
“cOnTeNt-TyPe” refer to the same header.
@!5443b996cd9742c40fdd9b10218e5fcc556d7ff9

{{index "Host header", "setRequestHeader method"}}
@!bec6cb834a5a2a23fc80e8f4a284f3f1762dc1d5

The browser will
automatically add some request ((header))s, such as “Host” and those
needed for the server to figure out the size of the body. But you can
add your own headers with the `setRequestHeader` method. This is 
needed only for advanced uses and requires the cooperation of the
((server)) you are talking to—a server is free to ignore headers it
does not know how to handle.
@!c95fdf9ff8c459723781b43b74a422a05b082e7b

## Asynchronous Requests
@!ed0d33ef3242469e8b8a9583efaac9ff097135a5

{{index XMLHttpRequest, "event handling", blocking, "synchronous I/O", "responseText property", "send method"}}
@!67dff7438f55a567a7c52b7ef8e8dd3b3d617856

In the examples we
saw, the request has finished when the call to `send` returns. This is
convenient because it means properties such as `responseText` are
available immediately. But it also means that our program is suspended
as long as the ((browser)) and server are communicating. When the
((connection)) is bad, the server is slow, or the file is big, that
might take quite a while. Worse, because no event handlers can fire
while our program is suspended, the whole document will become
unresponsive.
@!675998b7c1b911e060c745afe523ea21d0ad0146

{{index XMLHttpRequest, "open method", "asynchronous I/O"}}
@!591be05112aa8ed0963002e3a8a3ef77b5a557e5

If we pass
`true` as the third argument to `open`, the request is _asynchronous_.
This means that when we call `send`, the only thing that happens right
away is that the request is scheduled to be sent. Our program can
continue, and the browser will take care of the sending and receiving
of data in the background.
@!3b930869ccc728db98d29c1acef87a8bd0bfd114

But as long as the request is running, we won't be able to access the
response. We need a mechanism that will notify us when the data is
available.
@!6a14d4c4831e47d4c122ec105c13f6f28e3ff935

{{index "event handling", "load event"}}
@!cfccd87be6ba051b5128778af49e86a9be173ddd

For this, we must listen for the
`"load"` event on the request object.
@!9ecfc98abd8f356e0acf58bc2206927ff5e1745e

```
var req = new XMLHttpRequest();
req.open("GET", "example/data.txt", true);
req.addEventListener("load", function() {
  console.log("Done:", req.status);
});
req.send(null);
```
@!f024ef15062c9356238b9e5143a18873cc9505b1

{{index "asynchronous programming", "callback function"}}
@!32282dafdfb9f02362375acf209018b24bc77940

Just like the use
of `requestAnimationFrame` in [Chapter 15](15_game.html#game), this
forces us to use an asynchronous style of programming, wrapping the
things that have to be done after the request in a function and
arranging for that to be called at the appropriate time. We will come
back to this [later](17_http.html#promises).
@!aefde85910bf7555d947e05d4dbbb5cbb39def6f

## Fetching XML Data
@!55410e5b7642f6dfba72a308198b58e324ba0016

{{index "documentElement property", "responseXML property"}}
@!7463107f4ec9a3868d4fdf2c072160e702b22c93

When the
resource retrieved by an `XMLHttpRequest` object is an ((XML))
document, the object's `responseXML` property will hold a parsed
representation of this document. This representation works much like
the ((DOM)) discussed in [Chapter 13](13_dom.html#dom), except that
it doesn't have HTML-specific functionality like the `style` property.
The object that `responseXML` holds corresponds to the `document`
object. Its `documentElement` property refers to the outer tag of the
XML document. In the following document (_example/fruit.xml_), that
would be the `<fruits>` tag:
@!06f12a66e770f17ebb6aae1f2f00ce045c8e039e

```{lang: "application/xml"}
<fruits>
  <fruit name="banana" color="yellow"/>
  <fruit name="lemon" color="yellow"/>
  <fruit name="cherry" color="red"/>
</fruits>
```
@!42274208ce81112e7ede272773eb417d43e7efc9

We can retrieve such a file like this:
@!a1d108e481a7d88cea60c1587b695ac3756e0959

```{test: no}
var req = new XMLHttpRequest();
req.open("GET", "example/fruit.xml", false);
req.send(null);
console.log(req.responseXML.querySelectorAll("fruit").length);
// → 3
```
@!a71446402fca361fd0a2b7f0c90f2dda4b278863

{{index "data format"}}
@!96058b0f767e3fb94e15dd56d473b71a52622688

XML documents can be used to exchange structured
information with the server. Their form—tags nested inside other
tags—lends itself well to storing most types of data, or at least
better than flat text files. The DOM interface is rather clumsy for
extracting information, though, and ((XML)) documents tend to be
verbose. It is often a better idea to communicate using ((JSON)) data,
which is easier to read and write, both for programs and for humans.
@!e1942172a6c69f27c3b5452bc22b199c4a4c282e

```
var req = new XMLHttpRequest();
req.open("GET", "example/fruit.json", false);
req.send(null);
console.log(JSON.parse(req.responseText));
// → {banana: "yellow", lemon: "yellow", cherry: "red"}
```
@!cdc394d8a2f2288069169bdc6acf52aae1d10199

{{id http_sandbox}}
@!9d896dd7ddf371a026a4f2b96b8f9486c30bd4e4

## HTTP sandboxing
@!2d08db9cf7130dd969292301a449c18421879cc8

{{index sandbox}}
@!a221e875246a80dea0db81ba5525c4a4644d8082

Making ((HTTP)) requests in web page scripts once
again raises concerns about ((security)). The person who controls the
script might not have the same interests as the person on whose
computer it is running. More specifically, if I visit _themafia.org_,
I do not want its scripts to be able to make a request to
_mybank.com_, using identifying information from my ((browser)), with
instructions to transfer all my money to some random ((mafia))
account.
@!8b950173122c0cfef6adbc47de68d0ffaff89335

It is possible for ((website))s to protect themselves against such
((attack))s, but that requires effort, and many websites fail to do it.
For this reason, browsers protect us by disallowing scripts to make
HTTP requests to other _((domain))s_ (names such as _themafia.org_ and
_mybank.com_).
@!0093acc572cf439c24abf61aa5e08d33f78bd2d3

{{index "Access-Control-Allow-Origin header", "cross-domain request"}}
@!e5e3d266dfbef0987574e5d09d1b3b86509acf14

This
can be an annoying problem when building systems that want to access
several domains for legitimate reasons. Fortunately, ((server))s can
include a ((header)) like this in their ((response)) to explicitly
indicate to browsers that it is okay for the request to come from
other domains:
@!6a6a098c0ce11ff2dd50fa2ed1c3c0e4b269821b

```{lang: null}
Access-Control-Allow-Origin: *
```
@!f6c8ef3c5ea5dbd8bd68c94751440335446b9947

## Abstracting requests
@!7506ef927a190266beef243a430be1c2bd32332a

{{index HTTP, XMLHttpRequest, "backgroundReadFile function"}}
@!12e8179cb3753155396e9d9b2741d4419709d21e

In
[Chapter 10](10_modules.html#amd), in our implementation of the AMD
module system, we used a hypothetical function called
`backgroundReadFile`. It took a filename and a function and called
that function with the contents of the file when it had finished
fetching it. Here's a simple implementation of that function:
@!c70bb504dff07a0b1a063654ac5c3c955a08fd2b

```{includeCode: true}
function backgroundReadFile(url, callback) {
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.addEventListener("load", function() {
    if (req.status < 400)
      callback(req.responseText);
  });
  req.send(null);
}
```
@!15460669c8e5aa9361618f81555b569ed9ae418e

{{index XMLHttpRequest}}
@!b794e425a4d6c701fa8f2777fd6a63fd197371a1

This simple ((abstraction)) makes it easier to use
`XMLHttpRequest` for simple `GET` requests. If you are writing a
program that has to make HTTP requests, it is a good idea to use a
helper function so that you don't end up repeating the ugly
`XMLHttpRequest` pattern all through your code.
@!c67c3b51298369c7952b2a2d88fb4abf3b68ec83

{{index [function, "as value"], "callback function"}}
@!8110bfb064ffb86e715ede221444870c0e3a4d1f

The function argument's
name, `callback`, is a term that is often used to describe functions
like this. A callback function is given to other code to provide that
code with a way to “call us back” later.
@!0dfacd82a4e32707de53ea9b139f2d750c403530

{{index library}}
@!d99b76c9b95ff0a0e07c474191f04b74c385dd11

It is not hard to write an HTTP utility function, tailored to what your
application is doing. The previous one does only `GET` requests and
doesn't give us control over the headers or the request body. You
could write another variant for `POST` requests or a more generic one
that supports various kinds of requests. Many JavaScript libraries
also provide wrappers for `XMLHttpRequest`.
@!e37cebf40ae178673b21cd36161917df292f5382

{{index "user experience", "error response"}}
@!a14a0698c2706dc9903a0dac6f522b85041f2e29

The main problem with the previous
wrapper is its handling of ((failure)). When the request returns
a ((status code)) that indicates an error (400 and up), it does
nothing. This might be okay, in some circumstances, but imagine we put
a “loading” indicator on the page to indicate that we are fetching
information. If the request fails because the server crashed or the
((connection)) is briefly interrupted, the page will just sit there,
misleadingly looking like it is doing something. The user will wait
for a while, get impatient, and consider the site uselessly flaky.
@!a6a5a2461ce6e03bcf5ec73a4096c6569355b1ad

We should also have an option to be notified when the request fails
so that we can take appropriate action. For example, we could remove the
“loading” message and inform the user that something went wrong.
@!33ff2482a878883e03534f569c1837b0dc394a70

{{index "exception handling", "callback function", "error handling", "asynchronous programming", "try keyword", stack}}
@!a22170c51db45efa6e78222408324b9c38eb2a0b

Error handling in asynchronous code is even 
trickier than error handling in synchronous code. Because we often need
to defer part of our work, putting it in a callback function, the
scope of a `try` block becomes meaningless. In the following code, the
exception will _not_ be caught because the call to
`backgroundReadFile` returns immediately. Control then leaves the
`try` block, and the function it was given won't be called until
later.
@!eeb972e731bcd9223d3f7cae24ce167e3d2e4681

```{test: no}
try {
  backgroundReadFile("example/data.txt", function(text) {
    if (text != "expected")
      throw new Error("That was unexpected");
  });
} catch (e) {
  console.log("Hello from the catch block");
}
```
@!7871ac11db2eea66270cf4fd39db7a0d01e472e3

{{index HTTP, "getURL function", exception}}
@!309454e33b14bd79ec9104e4fe1d211479b93d05

{{id getURL}}
@!2ad8101b76a740fcea7077c5326b2bcae4e6647e

To handle failing
requests, we have to allow an additional function to be passed to our
wrapper and call that when a request goes wrong. Alternatively, we
can use the convention that if the request fails, an additional
argument describing the problem is passed to the regular callback
function. Here's an example:
@!8b4140143570a6fac9a05ee1ca57e8acc5378cd0

```{includeCode: true}
function getURL(url, callback) {
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.addEventListener("load", function() {
    if (req.status < 400)
      callback(req.responseText);
    else
      callback(null, new Error("Request failed: " +
                               req.statusText));
  });
  req.addEventListener("error", function() {
    callback(null, new Error("Network error"));
  });
  req.send(null);
}
```
@!d01f5ac1e96c4ad9cb538c01dcb588b124c7d545

{{index "error event"}}
@!5114a40a67a3626caf96b66c5c0c19b345882335

We have added a handler for the `"error"` event,
which will be signaled when the request fails entirely. We also call
the ((callback function)) with an error argument when the request
completes with a ((status code)) that indicates an error.
@!d2dcd894cc28eae0b09b6d50abbc35904499fdba

Code using `getURL` must then check whether an error was given and, if
it finds one, handle it.
@!da190cccec512ab204058bc850a44a2d8e3e279a

```
getURL("data/nonsense.txt", function(content, error) {
  if (error != null)
    console.log("Failed to fetch nonsense.txt: " + error);
  else
    console.log("nonsense.txt: " + content);
});
```
@!9f7255474ff1233a2fc3d2fa6003005d7dd2bd37

{{index "uncaught exception", "exception handling", "try keyword"}}
@!908a9d72a9c387494d85f986f0854642d34c052d

This
does not help when it comes to exceptions. When chaining several
asynchronous actions together, an exception at any point of the chain
will still (unless you wrap each handling function in its own
`try/catch` block) land at the top level and abort your chain of
actions.
@!cee00dd0b126a5ac36408cb96c6565d19faa2a8c

{{id promises}}
@!7427032918185bfa698e434e4369439c9d005248

## Promises
@!ac925c5eed0e112b6932c699cf70a41aff03cdee

{{index promise, "asynchronous programming", "callback function", readability, "uncaught exception"}}
@!d425f0a1f304f72e5a7c6a2988bad7adb413102f

For complicated
projects, writing asynchronous code in plain callback style is hard to
do correctly. It is easy to forget to check for an error or to allow
an unexpected exception to cut the program short in a crude way.
Additionally, arranging for correct error handling when the error has
to flow through multiple callback functions and `catch` blocks is
tedious.
@!628350aaa40722511d84548adf44b13e0da36d36

{{index future, "ECMAScript 6"}}
@!16788cec773978be01e00a1ed8cf8997f0ed8be7

There have been a lot of attempts to
solve this with extra abstractions. One of the more successful ones is
called _promises_. Promises wrap an asynchronous action in an object,
which can be passed around and told to do certain things when the
action finishes or fails. This interface is set to become part of the next
version of the JavaScript language but can already be used as a
library.
@!b5cd396d7078771fbbee6ca34a591d5d1eb62238

The ((interface)) for promises isn't entirely intuitive, but it is 
powerful. This chapter will only roughly describe it. You can find a more thorough
treatment at
https://www.promisejs.org/[_www.promisejs.org_].
@!3915b2c5f7737ccf01ff2844d38357fd11f0f246

{{index "Promise constructor"}}
@!b93299256c5c8c9bd8e547993156c749dc76c79f

To create a promise object, we call the
`Promise` constructor, giving it a function that initializes the
asynchronous action. The constructor calls that function, passing it
two arguments, which are themselves functions. The first should be
called when the action finishes successfully, and the second should be called when it
fails.
@!ed0a0300f7363ca11dc6def60927b6d3d74d9f71

{{index HTTP, "get function"}}
@!ae8a2f11df9276bfb01c5e00117ce5d678ad3d2d

Once again, here is our wrapper for `GET`
requests, this time returning a promise. We'll simply call it `get`
this time.
@!3b790145bff9d585adee39ae9fc2c11507e7a748

```{includeCode: true}
function get(url) {
  return new Promise(function(succeed, fail) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", function() {
      if (req.status < 400)
        succeed(req.responseText);
      else
        fail(new Error("Request failed: " + req.statusText));
    });
    req.addEventListener("error", function() {
      fail(new Error("Network error"));
    });
    req.send(null);
  });
}
```
@!92c4b5e4ad9a592069c8143cca11a3a4336a3341

Note that the ((interface)) to the function itself is now a lot
simpler. You give it a URL, and it returns a ((promise)). That promise
acts as a _handle_ to the request's outcome. It has a `then` method
that you can call with two functions: one to handle success and one
to handle failure.
@!0a2b8376862354e0614dad1fd03aea5ccba35e69

```
get("example/data.txt").then(function(text) {
  console.log("data.txt: " + text);
}, function(error) {
  console.log("Failed to fetch data.txt: " + error);
});
```
@!370561c5f225d3ce5a9fe35e6353c119938efcd7

{{index chaining}}
@!35abf6612e094f4f5fc19e775a2beff40ab7d7fd

So far, this is just another way to express the same
thing we already expressed. It is only when you need to chain
actions together that promises make a significant difference.
@!9e15af42b7c447af03ceedcbd2ccebdfd97a04b5

{{index "then method"}}
@!8549d15733bfef19dff585c3a1e2f12fdad9df09

Calling `then` produces a new ((promise)), whose
result (the value passed to success handlers) depends on the return
value of the first function we passed to `then`. This function may
return another promise to indicate that more asynchronous work is
being done. In this case, the promise returned by `then` itself will
wait for the promise returned by the handler function, succeeding or
failing with the same value when it is resolved. When the handler
function returns a nonpromise value, the promise returned by `then`
immediately succeeds with that value as its result.
@!7cd139629c643d91ca32afcd876b800a00879a61

{{index "then method", chaining}}
@!ea80ba48539b07739c40750af6e8937ce784c479

This means you can use `then` to
transform the result of a promise. For example, this returns a promise
whose result is the content of the given URL, parsed as ((JSON)):
@!c5d479bc0b5786015e7a326ceeca5d7699f7ecde

```{includeCode: true}
function getJSON(url) {
  return get(url).then(JSON.parse);
}
```
@!7d84d139508a815c3aa37b8dc0a9287c0bc5fed6

{{index "error handling"}}
@!368d2e5d345f1c7e5cc3130368c3871580c40041

That last call to `then` did not specify a failure
handler. This is allowed. The error will be passed to the promise
returned by `then`, which is exactly what we want—`getJSON` does not
know what to do when something goes wrong, but hopefully its caller 
does.
@!a4f816fd39935b74c7e740a6d1751be1fc1e1c29

As an example that shows the use of ((promise))s, we will build a
program that fetches a number of JSON files from the server and,
while it is doing that, shows the word _loading_. The JSON files
contain information about people, with links to files that represent
other people in properties such as `father`, `mother`, or `spouse`.
@!e44e1a49ccb21ada3ab511d76ba4dafa0f649133

{{index "error message", JSON}}
@!a271540942cbd92c33eb9219beff170d1c1f75b7

We want to get the name of the mother of
the spouse of _example/bert.json_. And if something goes wrong, we
want to remove the _loading_ text and show an error message instead.
Here is how that might be done with ((promise))s:
@!722e6be2bc8c3bb2d3f0edb698b4886739943ae8

```{lang: "text/html"}
<script>
  function showMessage(msg) {
    var elt = document.createElement("div");
    elt.textContent = msg;
    return document.body.appendChild(elt);
  }

var loading = showMessage("Loading...");
  getJSON("example/bert.json").then(function(bert) {
    return getJSON(bert.spouse);
  }).then(function(spouse) {
    return getJSON(spouse.mother);
  }).then(function(mother) {
    showMessage("The name is " + mother.name);
  }).catch(function(error) {
    showMessage(String(error));
  }).then(function() {
    document.body.removeChild(loading);
  });
</script>
```
@!bd6ed25ec3b5df4cba3549ef8a935fce4e425c34

{{index "error handling", "catch method", "then method", readability, "program size"}}
@!03b4412c67bd0217434d1ad098f66a8426009b22

The resulting program is
relatively compact and readable. The `catch` method is similar to
`then`, except that it only expects a failure handler and will pass
through the result unmodified in case of success. Much like with the
`catch` clause for the `try` statement, control will continue as
normal after the failure is caught. That way, the final `then`, which
removes the loading message, is always executed, even if something
went wrong.
@!92e1500c1d267d5af4e9c8ce8dc266cd9764301f

{{index "asynchronous programming", "domain-specific language"}}
@!c4ab036414f17b32965da22284b1fdab0c109d09

You can
think of the promise interface as implementing its own language for
asynchronous ((control flow)). The extra method calls and function
expressions needed to achieve this make the code look somewhat
awkward but not remotely as awkward as it would look if we took care
of all the error handling ourselves.
@!6b84c8a9686912e9ba8ac49c3dd6b93065453a55

## Appreciating HTTP
@!c3abe770793589107c17cd6761ace44e0cfdc8bb

{{index client, HTTP}}
@!8b6f380c26b5dfe94902571754962714a3c449bc

When building a system that requires
((communication)) between a JavaScript program running in the
((browser)) (client-side) and a program on a ((server)) (server-side),
there are several different ways to model this communication.
@!8f8f511e36edfcafefef64db1954722bd2793cb3

{{index network, abstraction}}
@!1e48f695528f02ef92e88beb50e3086d7bc0b72e

A commonly used model is that of
_((remote procedure call))s_. In this model, communication follows the
patterns of normal function calls, except that the function is
actually running on another machine. Calling it involves making a
request to the server that includes the function's name and arguments.
The response to that request contains the returned value.
@!793e1ac6684a8495f1926b443f9fe29b0e58fe15

When thinking in terms of remote procedure calls, HTTP is just a
vehicle for communication, and you will most likely write an
abstraction layer that hides it entirely.
@!a71f9ae3a644855fe733073900d34e2e346fbefc

{{index "media type", "document format"}}
@!5783bc1728f93850fcb86061df0beb7181f17269

Another approach is to build your
communication around the concept of ((resource))s and ((HTTP))
((method))s. Instead of a remote procedure called `addUser`, you use a
`PUT` request to `/users/larry`. Instead of encoding that user's
properties in function arguments, you define a document format or use
an existing format that represents a user. The body of the `PUT` request
to create a new resource is then simply such a document. A resource is
fetched by making a `GET`
request to the resource's URL (for example, `/user/larry`), which
returns the document representing the resource.
@!5cbed58a6140bd691d7f0892e12248e64ea8b5f2

This second approach makes it easier to use some of the features that
HTTP provides, such as support for caching resources (keeping a copy
on the client side). It can also help the coherence of your interface
since resources are easier to reason about than a jumble of functions.
@!87f33722c1df4c001f8e3599d3c0d26a51ca819c

## Security and HTTPS
@!81293e6d85a16e5a26bfba4ec93f4de01b51e451

{{index "man-in-the-middle", security, HTTPS}}
@!5e2404b189f1d9ddca246805ef07b7896e721ddc

Data traveling over
the Internet tends to follow a long, dangerous road. To get
to its destination, it must hop through anything from coffee-shop Wi-Fi
((network))s to networks controlled by various companies and states.
At any point along its route it may be inspected or even modified.
@!36d15a96c3bb17cab9ec38b45c312c8065582f20

{{index tampering}}
@!d8f9f37da5136d968bc869bb1c0ba754fc796635

If it is important that something remain secret,
such as the ((password)) to your ((email)) account, or that it arrive
at its destination unmodified, such as the account number you transfer
money to from your bank's website, plain HTTP is not good enough.
@!7692a430490c80d55a7fba645f0d4ada8935fafb

{{index cryptography, encryption}}
@!bd13603ad27076cdd1ef41ed01f9b2680db5653f

{{indexsee "Secure HTTP", HTTPS}}
@!236ba3e6c64baa258c84083c9d8f58e539615a93

The secure ((HTTP)) protocol, whose
((URL))s start with _https://_, wraps HTTP traffic in a way that makes
it harder to read and tamper with. First, the client verifies that the
server is who it claims to be by requiring that server to prove that it has a
cryptographic ((certificate)) issued by a certificate authority that
the ((browser)) recognizes. Next, all data going over the
((connection)) is encrypted in a way that should prevent eavesdropping
and tampering.
@!6110e247ae9b665277dd55bc92f0ab12c7d94071

Thus, when it works right, ((HTTPS)) prevents both the
someone impersonating the website you were trying to talk to and the
someone snooping on your communication. It is not
perfect, and there have been various incidents where HTTPS failed because of
forged or stolen certificates and broken software. Still, plain
HTTP is trivial to mess with, whereas breaking HTTPS requires the kind
of effort that only states or sophisticated criminal organizations can
hope to make.
@!2f5105c0c8ac268bf31025a74bf3f9c9fa7e84c5

## Summary
@!26a492c95f5f91d9ffa8029a39b14478bb9e23e2

In this chapter, we saw that HTTP is a protocol for accessing
resources over the Internet. A _client_ sends a request, which
contains a method (usually `GET`) and a path that identifies a
resource. The _server_ then decides what to do with the request and
responds with a status code and a response body. Both requests and
responses may contain headers that provide additional information.
@!d4de9e72b8b1b4c9a4e448f8be4750b74a9de00a

Browsers make `GET` requests to fetch the resources needed to display
a web page. A web page may also contain forms, which allow information
entered by the user to be sent along in the request made when the form
is submitted. You will learn more about that in the link:18_forms.html#forms[next
chapter].
@!21c22c4f1cc4892d3778d97ea23d099c04222d31

The interface through which browser JavaScript can make HTTP requests
is called `XMLHttpRequest`. You can usually ignore the “XML” part of
that name (but you still have to type it). There are two ways in which
it can be used—synchronous, which blocks everything until the request
finishes, and asynchronous, which requires an event handler to notice
that the response came in. In almost all cases, asynchronous is
preferable. Making a request looks like this:
@!2fd5e99adbb4eac08d844acdbbe131f4a4495e97

```
var req = new XMLHttpRequest();
req.open("GET", "example/data.txt", true);
req.addEventListener("load", function() {
  console.log(req.status);
});
req.send(null);
```
@!18ab1e88142a273cd5fb0f293db77d6668baff85

Asynchronous programming is tricky. _Promises_ are an interface that
makes it slightly easier by helping route error conditions and
exceptions to the right handler and by abstracting away some of the more
repetitive and error-prone elements in this style of programming.
@!7753b6d535e511a4274b047b55245dc5a640de3b

## Exercises
@!0aa3093aff8b857dc0a963a8309481ef26d37f5e

{{id exercise_accept}}
@!645f1c3050b2e925e334af1a015c072c316c0367

### Content negotiation
@!b08322daa2494a41719bf345e421771ced544b75

{{index "Accept header", "media type", "document format", "content negotiation (exercise)"}}
@!33945fcbd0bae58023af0d2fd7991d3aeb5c8903

One of the things that HTTP can do, but that
we have not discussed in this chapter, is called _content
negotiation_. The `Accept` header for a request can be used to tell
the server what type of document the client would like to get. Many
servers ignore this header, but when a server knows of various ways to
encode a resource, it can look at this header and send the one that
the client prefers.
@!8b4795328abfcd123777ee27309bf8e127b8e452

{{index "media type", "MIME type"}}
@!132721f49be36906c54e28215a93c979103fa02e

The URL
http://eloquentjavascript.net/author[_eloquentjavascript.net/author_]
is configured to respond with either plaintext, HTML, or JSON,
depending on what the client asks for. These formats are identified by
the standardized _media types_ `text/plain`, `text/html`, and
`application/json`.
@!bf41bf583d8578f3ece291d6a7ea0eb6b28fbc6e

{{index "setRequestHeader method", XMLHttpRequest}}
@!98ae5f8bf606d1acc589b7f0c9192a32ea277520

Send requests to
fetch all three formats of this resource. Use the `setRequestHeader`
method of your `XMLHttpRequest` object to set the header named `Accept`
to one of the media types given earlier. Make sure you set the header
_after_ calling `open` but before calling `send`.
@!c4e7e40efbebafdf19a2df9b4f8f325c3bb245a1

Finally, try asking for the media type `application/rainbows+unicorns`
and see what happens.
@!31d80bff58cadfe8b0b4dd697dad9fabb1309996

{{if interactive
@!d939b6559bf90dca4a473ed95b3044aad0758dd4

```{test: no}
// Your code here.
```
@!e5659cce547d79eb263e3f2a0ddf17279615c027

if}}
@!11f4f44088158a9e90e72ab708ca1d582d61f46c

{{hint
@!a2ec236e25890c1e277a8cad5c8026639451eafd

{{index "synchronous I/O", "content negotiation (exercise)"}}
@!8f954af3335db4b66f4826559c9a754e60d6faae

See the
various examples of using an `XMLHttpRequest` in this chapter for an
example of the method calls involved in making a request. You can use
a synchronous request (by setting the third parameter to `open` to
`false`) if you want.
@!b26bdf101798896b1c4ace24b4b58fee749742e5

{{index "406 (HTTP status code)", "Accept header"}}
@!b1fa0b2754cec041db4146c5f0cedb4dfaec6ec0

Asking for a bogus
media type will return a response with code 406, “Not acceptable”,
which is the code a server should return when it can't fulfill the
`Accept` header.
@!00a3437e0650f0bc2de84d4732d1b5bf57b8937c

hint}}
@!a5cd47634ff218df94e831076d992a003fd49f2e

### Waiting for multiple promises
@!41db4710f9cd850cd324bd4736ca939f29ce163d

{{index "all function", "Promise constructor"}}
@!d0ba79c7f37a14ab08600ddf7ba10757a75c8075

The `Promise` constructor
has an `all` method that, given an array of ((promise))s, returns a
promise that waits for all of the promises in the array to finish. It then succeeds,
yielding an array of result values. If any of the promises in
the array fail, the promise returned by `all` fails too (with the
failure value from the failing promise).
@!c5abbf6fb1dcc09d538d3aedb85f92827d0b762b

Try to implement something like this yourself as a regular function
called `all`.
@!4cebd5c2556ea2f6ef198d5a641486c589fac5c7

Note that after a promise is resolved (has succeeded or failed), it
can't succeed or fail again, and further calls to the functions that
resolve it are ignored. This can simplify the way you handle failure
of your promise.
@!36f73d1c289fa908c68e84393f0a511823353ea7

{{if interactive
@!0d545b824725200bcdcebb20e1dc060d5e23757d

```{test: no}
function all(promises) {
  return new Promise(function(success, fail) {
    // Your code here.
  });
}

// Test code.
all([]).then(function(array) {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise(function(success) {
    setTimeout(function() { success(val); },
               Math.random() * 500);
  });
}
all([soon(1), soon(2), soon(3)]).then(function(array) {
  console.log("This should be [1, 2, 3]:", array);
});
function fail() {
  return new Promise(function(success, fail) {
    fail(new Error("boom"));
  });
}
all([soon(1), fail(), soon(3)]).then(function(array) {
  console.log("We should not get here");
}, function(error) {
  if (error.message != "boom")
    console.log("Unexpected failure:", error);
});
```
@!7cf065d4c2c1b2a19f68b735d10448427c88fddf

if}}
@!4fa8ce5fff8c1ac95ce8f78b6ed96db056deecc8

{{hint
@!b9baed8c550d8f4e1a2d7bb2ccc5fedf6bfb7e08

{{index "all function", "Promise constructor", "then method"}}
@!029af3ee74440b7ed29b5542fd836814a7f38977

The
function passed to the `Promise` constructor will have to call `then`
on each of the promises in the given array. When one of them succeeds,
two things need to happen. The resulting value needs to be stored in
the correct position of a result array, and we must check whether this
was the last pending ((promise)) and finish our own promise if it
was.
@!29bb339bbe5de084b9489c838a891fe59e4908ff

{{index "counter variable"}}
@!feb776c7e71494d15019be82e003fe9170d1af58

The latter can be done with a counter, which is
initialized to the length of the input array and from which we subtract
1 every time a promise succeeds. When it reaches 0, we are
done. Make sure you take the situation where the input array is empty
(and thus no promise will ever resolve) into account.
@!5d2630370fbbb5ecddfc271e37ed0ff79d44a6f4

Handling failure requires some thought but turns out to be extremely
simple. Just pass the failure function of the wrapping promise to each
of the promises in the array so that a failure in one of them
triggers the failure of the whole wrapper.
@!ba6feab6e5de4d23bef080c560dfd88ddb5d9f6b

hint}}
@!679450564e008690583788931c5f121fe503192f