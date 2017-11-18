{{meta {chap_num: 21, prev_link: 20_node, code_links: "[\"code/skillsharing.zip\"]"}}}
@!9f613a64c9420cca58ddd603c5005941c70543c2

# Project: Skill-Sharing Website
@!9db47b35d9814893dc587188237b35c18f72f3d6

{{index "skill-sharing project", meetup, "project chapter"}}
@!5f040545dd098a9658f77eb056a498e84d116053

A
_((skill-sharing))_ meeting is an event where people with a shared
interest come together and give small, informal presentations about
things they know. At a ((gardening)) skill-sharing meeting, someone
might explain how to cultivate ((celery)). Or in a
programming-oriented skill-sharing group, you could drop by and tell
everybody about Node.js.
@!ce8fb7d24e4ebba66eb2978c1722566bb7d003a5

{{index learning, "users’ group"}}
@!2732c23c24d0e572f687530ebe3aab9cfd2c6699

Such meetups, also often called
_users’ groups_ when they are about computers, are a great way to
broaden your horizon, learn about new developments, or simply meet
people with similar interests. Many large cities have a JavaScript
meetup. They are typically free to attend, and I've found the ones
I've visited to be friendly and welcoming.
@!a9c3ebe9bc7d5343100d233d5b5b1daec422f170

In this final project chapter, our goal is to set up a ((website))
for managing ((talk))s given at a skill-sharing meeting. Imagine a
small group of people meeting up regularly in a member’s
office to talk about ((unicycling)). The problem is that when the previous
organizer of the meetings moved to another town, nobody stepped
forward to take over this task. We want a system that will let the
participants propose and discuss talks among themselves, without a
central organizer.
@!ccc35632d1a4becaf6fbd1a243192d70a7f8de22

{{figure {url: "img/unicycle.svg", alt: "The unicycling meetup"}}}
@!761b9ca7144ea6a491bba3771bbf5dc8cec58ce1

[Just like in the [previous chapter](20_node.html#node), the
code in this chapter is written for Node.js, and running it directly
in the HTML page that you are looking at is unlikely to work.]{if interactive}The
full code for the project can be ((download))ed from
http://eloquentjavascript.net/code/skillsharing.zip[_eloquentjavascript.net/code/skillsharing.zip_].
@!36f964a258b87d2e89ea3b8aec158572d6343f42

## Design
@!8db5bc609236df5ac9d046a732144bfccaad490c

{{index "skill-sharing project", persistence}}
@!038b6e6a5df6924b4b12169aa13614e8a9209185

There is a _((server))_
part to this project, written for ((Node.js)), and a _((client))_
part, written for the ((browser)). The server stores the system's data
and provides it to the client. It also serves the HTML and JavaScript
files that implement the client-side system.
@!ec70f901bbd33f6139578c07c4985147c2a798cf

The server keeps a list of ((talk))s proposed for the next meeting,
and the client shows this list. Each talk has a presenter name, a
title, a summary, and a list of ((comment))s associated with it. The
client allows users to propose new talks (adding them to the list),
delete talks, and comment on existing talks. Whenever the user
makes such a change, the client makes an ((HTTP)) ((request)) to tell
the server about it.
@!7232233b734b498951b1847191388c5e09609854

{{figure {url: "img/skillsharing.png", alt: "Screenshot of the skill-sharing website",width: "10cm"}}}
@!1a3c7396458221ccae448540db3d6ce6db3e5608

{{index "live view", "user experience", "pushing data", connection}}
@!46d140aaeae2cd3b9d3df4ef18060d6fda9a0895

The application will be set up to show a _live_
view of the current proposed talks and their comments. Whenever
someone, somewhere, submits a new talk or adds a comment, all people
who have the page open in their browsers should immediately see the
change. This poses a bit of a challenge since there is no way for a
web server to open up a connection to a client, nor is there a good
way to know which clients currently are looking at a given website.
@!27d884b7977e0f77c0949bc808fce617300f68c8

{{index "Node.js"}}
@!ad1c06abd9754a9c17cc58c1ed440893b9253745

A common solution to this problem is called _((long
polling))_, which happens to be one of the motivations for Node's
design.
@!fcd22c6eb21ba8d4e39133c1edbf972e55fbe0cf

## Long polling
@!05a60092ef318683577c906509f605ac14968a37

{{index firewall, router, notification, "long polling"}}
@!e18f29f096c06e752c5816053bbb2f06504c256d

To be
able to immediately notify a client that something changed, we need a
((connection)) to that client. Since web ((browser))s do not
traditionally accept connections and clients are usually behind
devices that would block such connections anyway, having the server
initiate this connection is not practical.
@!67a29f00f1e00f355fffad2df40cc91c2f959a4c

We can arrange for the client to open the connection and keep it
around so that the server can use it to send information when it
needs to do so.
@!d436ad4d7c98f2b7421e10e6a160a5b23c0de3b1

But an ((HTTP)) request allows only a simple flow of information,
where the client sends a request, the server comes back with a single
response, and that is it. There is a technology called _((web
sockets))_, supported by modern browsers, which makes it possible to
open ((connection))s for arbitrary data exchange. But using them
properly is somewhat tricky.
@!3b63856f50df883f30d6aa88f6eb4bb79e4cca30

In this chapter, we will use a relatively simple technique, ((long
polling)), where clients continuously ask the server for new information
using regular HTTP requests, and the server simply stalls its answer
when it has nothing new to report.
@!ba882cd607819732614f9b0772009303305a0664

{{index "live view"}}
@!5314a63befc5c165e244ad21f7064bbf21840225

As long as the client makes sure it constantly has a
polling request open, it will receive information from the server
immediately. For example, if Alice has our skill-sharing application
open in her browser, that browser will have made a request for
updates and be waiting for a response to that request. When Bob
submits a talk on Extreme Downhill Unicycling, the
server will notice that Alice is waiting for updates and send
information about the new talk as a response to her pending request.
Alice's browser will receive the data and update the screen to show
the talk.
@!ab701e91f6a7c07cd1a3e0d7a0d7346a46d64d1f

{{index robustness, timeout}}
@!9f2728f22a252f77d5fdec88d0e458c91990266f

To prevent connections from timing out
(being aborted because of a lack of activity), ((long-polling)) techniques
usually set a maximum time for each request, after which the server
will respond anyway, even though it has nothing to report, and the
client will start a new request. Periodically restarting the request
also makes the technique more robust, allowing clients to recover from
temporary ((connection)) failures or server problems.
@!0016f83a06be1255a7467b4a5f8e63b62e4e6fd1

{{index "Node.js"}}
@!2b82355f79f90c92574a73edef7397f3ee132979

A busy server that is using long polling may have
thousands of waiting requests, and thus ((TCP)) connections, open.
Node, which makes it easy to manage many connections without creating
a separate thread of control for each one, is a good fit for such a
system.
@!c6903bf7d623b103226fa19c148223956f872195

## HTTP interface
@!fdc2e8f88129295e78229ae49bbb963378729bca

{{index "skill-sharing project"}}
@!96ddde4f4354ee5866fc01182ff61b4b8f743856

Before we start fleshing out either the
server or the client, let's think about the point where they touch:
the ((HTTP)) ((interface)) over which they communicate.
@!f8050865746f5c1a8627ba0dcfd606b843362d67

{{index [path, URL]}}
@!a8c6261555696d24d584bc3ee9cdcde06d4e224b

We will base our interface on ((JSON)), and like in the file server
from [Chapter 20](20_node.html#file_server), we'll try to make good use
of HTTP ((method))s. The interface is centered around the `/talks` path.
Paths that do not start with `/talks` will be used for
serving ((static file))s—the HTML and JavaScript code that implements
the client-side system.
@!b2eca0a5b0a86ada7541fe3a2ef395929b7c7611

{{index "GET method"}}
@!ab5c370fd469db3c863a5675785b39836488010b

A `GET` request to `/talks` returns a JSON document
like this:
@!f4370329189037aea33c9839c32124298dc17e69

```{lang: "application/json"}
{"serverTime": 1405438911833,
 "talks": [{"title": "Unituning",
            "presenter": "Carlos",
            "summary": "Modifying your cycle for extra style",
            "comment": []}]}
```
@!73bfd6a39eea33ac04def0c1c3001e98c28f91a1

The `serverTime` field will be used to make reliable ((long polling))
possible. I will return to it
[later](21_skillsharing.html#poll_time).
@!f1f73ec5a67255e884a891c5d6e7aa11082778c3

{{index "PUT method", URL}}
@!1e1ea5cb5d6693becfe1fdcbbe085e48f1a5e4af

Creating a new talk is done by making a `PUT`
request to a URL like `/talks/Unituning`, where the part after the
second slash is the title of the talk. The `PUT` request's body should
contain a ((JSON)) object that has `presenter` and `summary`
properties.
@!9c1c1e96214c3d6b418539fba2bbf45c1aec6aa6

{{index "encodeURIComponent function", [escaping, "in URLs"], whitespace}}
@!b3546b5ad96081aab47dc13c19f42dfe38e2163b

Since talk titles may contain spaces and other
characters that may not appear normally in a URL, title strings must be encoded
with the `encodeURIComponent` function when building up such a URL.
@!d6b98362ac302babdc3dbfe81a76107b21d1f379

```
console.log("/talks/" + encodeURIComponent("How to Idle"));
// → /talks/How%20to%20Idle
```
@!6c71a50d0b09177e2ceae8a73e06d0407e4dc71e

A request to create a talk about idling might look something like
this:
@!398d72ea9144d4d39ba54b9544caa1e776e4d95e

```{lang: http}
PUT /talks/How%20to%20Idle HTTP/1.1
Content-Type: application/json
Content-Length: 92

{"presenter": "Dana",
 "summary": "Standing still on a unicycle"}
```
@!709e1dc826bdf4f0ed275ebee3520ed7f586b623

Such URLs also support `GET` requests to retrieve the JSON
representation of a talk and `DELETE` requests to delete a talk.
@!0bfe333e2c1f7a8d72a025377e5dfc34ee0c07fb

{{index "POST method"}}
@!3719d32c8b77043e1acccc4c7d94a0bb95fd6a27

Adding a ((comment)) to a talk is done with a `POST`
request to a URL like `/talks/Unituning/comments`, with a JSON object
that has `author` and `message` properties as the body of the request.
@!f3dec83251479eec57e401719dd0a955ea7d168f

```{lang: http}
POST /talks/Unituning/comments HTTP/1.1
Content-Type: application/json
Content-Length: 72

{"author": "Alice",
 "message": "Will you talk about raising a cycle?"}
```
@!491b253c0ca907d882bb0350b90d7729e42a2fe9

{{index "query string", timeout}}
@!72739c5f457a64fb0419ed0428b607b75e6c86e2

To support ((long polling)), `GET`
requests to `/talks` may include a query parameter called `changesSince`,
which is used to indicate that the client is interested in updates
that happened since a given point in time. When there are such
changes, they are immediately returned. When there aren't, the response is
delayed until something happens or until a given time period (we will use
90 seconds) has elapsed.
@!1e6750dcf29fa773f03ae88dc06f93dcd1305a23

{{index "Unix time", "Date.now function", synchronization}}
@!5b865d89906eaeab47f8d4cad858108243362772

{{id poll_time}}
@!50281f76a59dd2aed1ddb340937fa6a25741a6d9

The time
must be indicated as the number of milliseconds elapsed since the
start of 1970, the same type of number that is returned by
`Date.now()`. To ensure that it receives all updates and
doesn't receive the same update more than once, the client must pass
the time at which it last received information from the server. The
server's clock might not be exactly in sync with the client's clock,
and even if it were, it would be impossible for the client to know the
precise time at which the server sent a response because
transferring data over the ((network)) takes time.
@!a2479aa0c7b005e1c4a00721289eb66d625ebd98

This is the reason for the existence of the `serverTime` property in
responses sent to `GET` requests to `/talks`. That property tells the client the
precise time, from the server's perspective, at which the data it
receives was created. The client can then simply store this time and pass it
along in its next polling request to make sure that it receives
exactly the updates that it has not seen before.
@!581f278e62b89d9b3221184f05daeb9e63a1cc26

```{lang: null}
GET /talks?changesSince=1405438911833 HTTP/1.1

(time passes)

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 95

{"serverTime": 1405438913401,
 "talks": [{"title": "Unituning",
            "deleted": true}]}
```
@!f62487c31e969bbb5d39cc3b408607c19ab9a876

When a talk has been changed, has been newly created, or has a comment added,
the full representation of the talk is included in the response to
the client's next polling request. When a talk is deleted, only its title and the
property `deleted` are included. The client can then add talks with
titles it has not seen before to its display, update talks that it was
already showing, and remove those that were deleted.
@!824393e45ef4a4effce8a210612815d0c45173c1

{{index security}}
@!6526815ebfd33d72ecaf1586f52059dee32f043b

The protocol described in this chapter does not do any
((access control)). Everybody can comment, modify talks, and even
delete them. Since the Internet is filled with ((hooligan))s, putting
such a system online without further protection is likely to end in
disaster.
@!8b071acd46d25d868b5f93763d59f859315dc9d4

{{index authorization, forwarding}}
@!47be9468b665dc785e23eb7f185ffc10d54f5383

A simple solution would be to put
the system behind a _((reverse proxy))_, which is an HTTP server that
accepts connections from outside the system and forwards them to HTTP
servers that are running locally. Such a ((proxy)) can be configured
to require a username and password, and you could make sure only the
participants in the skill-sharing group have this ((password)).
@!0aba99de73d467a85b84e9ee846912c3a335cd7e

## The server
@!b89214acdbc21ad2c41b4477069b87484666d607

{{index "skill-sharing project"}}
@!49922545e49c899f6c57fae969c87ddfaf1155ec

Let's start by writing the ((server))-side
part of the program. The code in this section runs on ((Node.js)).
@!41a0d46986f4ead6f787fa86d5a2eff948b8b3f7

### Routing
@!6e788b630b30fc58ea9154fad465a68c9d025574

{{index "createServer function", [path, URL]}}
@!3d5710ff2bd73a4d2b968d75dfb59a7988158fcc

Our server will use
`http.createServer` to start an HTTP server. In the function that
handles a new request, we must distinguish between the various kinds
of requests (as determined by the ((method)) and the path) that we
support. This can be done with a long chain of `if` statements, but
there is a nicer way.
@!b74deba52c7585ab28ea09e0c4037d7c226420f8

{{index dispatching}}
@!f8e2ada7627fe3783dd04c2bca41fb7edce538ce

A _((router))_ is a component that helps dispatch a
request to the function that can handle it. You can tell the router, for
example, that `PUT` requests with a path that
matches the regular expression `/^\/talks\/([^\/]+)$/` (which matches `/talks/`
followed by a talk title) can be handled by a given function. In
addition, it can help extract the meaningful parts of the path, in this
case the talk title, wrapped in parentheses in the ((regular
expression)) and pass those to the handler function.
@!847fea7e03bf12c879c30c49f4bc1218939477d0

There are a number of good router packages on ((NPM)), but here we
will write one ourselves to illustrate the principle.
@!dc1cef2d13fc225602f1cfbfc4f571076b774b7f

{{index "require function", "Router type", module}}
@!5692f5111043490b8f836e1e1e34e52b15582233

This is
`router.js`, which we will later `require` from our server module:
@!7af42ebfb9b72e5418f6c9b4f3b8c435606e7c77

```{includeCode: ">code/skillsharing/router.js"}
var Router = module.exports = function() {
  this.routes = [];
};

Router.prototype.add = function(method, url, handler) {
  this.routes.push({method: method,
                    url: url,
                    handler: handler});
};

Router.prototype.resolve = function(request, response) {
  var path = require("url").parse(request.url).pathname;

return this.routes.some(function(route) {
    var match = route.url.exec(path);
    if (!match || route.method != request.method)
      return false;

var urlParts = match.slice(1).map(decodeURIComponent);
    route.handler.apply(null, [request, response]
                                .concat(urlParts));
    return true;
  });
};
```
@!110010158859f566c80e5922e24217505c543b68

{{index "Router type"}}
@!c54146aba7ed855505eda04ca91e553f9ec07604

The module exports the `Router` constructor. A router
object allows new handlers to be registered with the `add` method and
can resolve requests with its `resolve` method.
@!fac801ff11b094a82b9b42d893837977e7c57b4b

{{index "some method"}}
@!f2936c752d9427093dc34adf27b9ea50ca9d89af

The latter will return a Boolean that indicates
whether a handler was found. The `some` method on the
array of routes will try the routes one at a time (in the order in
which they were defined) and stop, returning `true`, when a matching
one is found.
@!5ee3149d145fd4120b035ccc660e27bdf3ba8a42

{{index "capture group", "decodeURIComponent function", [escaping, "in URLs"]}}
@!068ccf5f84ed936127568c623e8846b34aa4185d

The handler functions are called with the `request` and
`response` objects. When the ((regular expression)) that matches the
URL contains any groups, the strings they match are passed to the handler
as extra arguments. These strings have to be URL-decoded since the raw URL
contains `%20`-style codes.
@!f77d6edcc6c12aa00ff4629a5acc37e060460cfb

### Serving files
@!2bf0144b5589c7343ec20542746fad9fd54d27b9

When a request matches none of the request types defined in our
router, the server must interpret it as a request for a file in
the `public` directory. It would be possible to use the file server
defined in [Chapter 20](20_node.html#file_server) to serve such
files, but we neither need nor want to support `PUT` and
`DELETE` requests on files, and we would like to have advanced
features such as support for caching. So let's use a solid, well-tested
((static file)) server from ((NPM)) instead.
@!c52167d7001fe228562f3fc9f74687158004167e

{{index "createServer function", "ecstatic module"}}
@!272a47872278057bd90e939145b7cf02018b4037

I opted for
`ecstatic`. This isn't the only such server on NPM, but it works
well and fits our purposes. The `ecstatic` module exports a function
that can be called with a configuration object to produce a request
handler function. We use the `root` option to tell the server where it
should look for files. The handler function accepts `request` and
`response` parameters and can be passed directly to `createServer` to
create a server that serves _only_ files. We want to first check for
requests that we handle specially, though, so we wrap it in another
function.
@!0051bccfba6c9878128cb72f5762f6338203a144

```{includeCode: ">code/skillsharing/skillsharing_server.js"}
var http = require("http");
var Router = require("./router");
var ecstatic = require("ecstatic");

var fileServer = ecstatic({root: "./public"});
var router = new Router();

http.createServer(function(request, response) {
  if (!router.resolve(request, response))
    fileServer(request, response);
}).listen(8000);
```
@!156449a155a9e703213a2be8f4999e0d6003ee9f

{{index JSON}}
@!2401aa944313d1d7d6ce40689a29af268623fc6f

The `respond` and `respondJSON` helper functions are used throughout the
server code to send off responses with a single function call.
@!2f8791fc9cf5aa89d9ffe93dc407afead291197a

```{includeCode: ">code/skillsharing/skillsharing_server.js"}
function respond(response, status, data, type) {
  response.writeHead(status, {
    "Content-Type": type || "text/plain"
  });
  response.end(data);
}

function respondJSON(response, status, data) {
  respond(response, status, JSON.stringify(data),
          "application/json");
}
```
@!e964ce0f778eb7ca36311d652b5fcad2c19da5db

### Talks as resources
@!a6ddfa520cf7c707fbfb7c4cc961af716f70af7d

The server keeps the ((talk))s that have been proposed in an object
called `talks`, whose property names are the talk titles. These will
be exposed as HTTP ((resource))s under `/talks/[title]`, so we need to
add handlers to our router that implement the various methods that
clients can use to work with them.
@!e1d6eb5214891ff522ed225c571a8e029f190104

{{index "GET method", "404 (HTTP status code)"}}
@!b0a68aa6a9d693fabe53f9baf767c7a2fa05db2e

The handler for requests
that `GET` a single talk must look up the talk and respond either with
the talk's JSON data or with a 404 error response.
@!e69a90dcd3fab3b2137ce76d852d73f36452f47d

```{includeCode: ">code/skillsharing/skillsharing_server.js"}
var talks = Object.create(null);

router.add("GET", /^\/talks\/([^\/]+)$/,
           function(request, response, title) {
  if (title in talks)
    respondJSON(response, 200, talks[title]);
  else
    respond(response, 404, "No talk '" + title + "' found");
});
```
@!613cc01d50f2cd3be6d13e4909f0a802f0ca0521

{{index "DELETE method"}}
@!57fb8a1ca1fcc692e44eaac67eae73ae559d04ba

Deleting a talk is done by removing it from the
`talks` object.
@!3ea1cb3fd47a80da5a264540fc3f6561a3e256e9

```{includeCode: ">code/skillsharing/skillsharing_server.js"}
router.add("DELETE", /^\/talks\/([^\/]+)$/,
           function(request, response, title) {
  if (title in talks) {
    delete talks[title];
    registerChange(title);
  }
  respond(response, 204, null);
});
```
@!8c882c97cf753c481382e207a18d9d952251aa8e

{{index "long polling", "registerChange function"}}
@!6517e1f417b4ddf9fd00ef4dc5544740cbf5c8b6

The `registerChange` function, which we
will define [later](21_skillsharing.html#registerChange), notifies
waiting long-polling requests about the change.
@!47c18bbdd44f20bc9cb86523db37072feef3fb98

{{index "readStreamAsJSON function", "body (HTTP)"}}
@!90f31ef96397a9c2518e602db9e679af412d4e5b

To retrieve
the content of ((JSON))-encoded request bodies, we define a
function called `readStreamAsJSON`, which reads all content from a stream,
parses it as JSON, and then calls a callback function.
@!4fe6c07c884750e94bbaf99c5258e6da9052343a

```{includeCode: ">code/skillsharing/skillsharing_server.js"}
function readStreamAsJSON(stream, callback) {
  var data = "";
  stream.on("data", function(chunk) {
    data += chunk;
  });
  stream.on("end", function() {
    var result, error;
    try { result = JSON.parse(data); }
    catch (e) { error = e; }
    callback(error, result);
  });
  stream.on("error", function(error) {
    callback(error);
  });
}
```
@!de561bb86324bb877623c07c4369c23f568982d8

{{index validation, input, "PUT method"}}
@!9896060d7fe4bdb816eb2d54a62297ec84516dc1

One handler that
needs to read JSON responses is the `PUT` handler, which is used to create new
((talk))s. It has to check whether the data it was given has
`presenter` and `summary` properties, which are strings. Any data
coming from outside the system might be nonsense, and we don't want to
corrupt our internal data model, or even ((crash)), when bad requests
come in.
@!b3f30cdcb6693d7f78999abd34fa379758efe391

{{index "registerChange function"}}
@!50ad38fd0a5a6e2bf996b58032af4648ef2938be

If the data looks valid, the handler
stores an object that represents the new talk in the `talks` object,
possibly ((overwriting)) an existing talk with this title, and again
calls `registerChange`.
@!41def33181371762a14ddb4db09af1b61daca144

```{includeCode: ">code/skillsharing/skillsharing_server.js"}
router.add("PUT", /^\/talks\/([^\/]+)$/,
           function(request, response, title) {
  readStreamAsJSON(request, function(error, talk) {
    if (error) {
      respond(response, 400, error.toString());
    } else if (!talk ||
               typeof talk.presenter != "string" ||
               typeof talk.summary != "string") {
      respond(response, 400, "Bad talk data");
    } else {
      talks[title] = {title: title,
                      presenter: talk.presenter,
                      summary: talk.summary,
                      comments: []};
      registerChange(title);
      respond(response, 204, null);
    }
  });
});
```
@!b8fe49a1b2c6e669aa1f1116b1f7aba3721a70b5

{{index validation, "readStreamAsJSON function"}}
@!6b7a24a78e91f2bfa35493ba033b83890cdab603

Adding a ((comment)) to
a ((talk)) works similarly. We use `readStreamAsJSON` to
get the content of the request, validate the resulting data, and store
it as a comment when it looks valid.
@!43c05eca80c5ccdfeca97ead1121e81d888c33b7

```{includeCode: ">code/skillsharing/skillsharing_server.js"}
router.add("POST", /^\/talks\/([^\/]+)\/comments$/,
           function(request, response, title) {
  readStreamAsJSON(request, function(error, comment) {
    if (error) {
      respond(response, 400, error.toString());
    } else if (!comment ||
               typeof comment.author != "string" ||
               typeof comment.message != "string") {
      respond(response, 400, "Bad comment data");
    } else if (title in talks) {
      talks[title].comments.push(comment);
      registerChange(title);
      respond(response, 204, null);
    } else {
      respond(response, 404, "No talk '" + title + "' found");
    }
  });
});
```
@!42ae6d9148a72fecbb1242e220c705228d278c96

{{index "404 (HTTP status code)"}}
@!b01b3253347ce67afab6b14f288fa0fabd550f81

Trying to add a comment to a nonexistent
talk should return a 404 error, of course.
@!bb5605560cf772a36d904bfe3549efd86c403483

### Long-polling support
@!08ad2c3aac685ef7c60f881fb20dd01240e02eb7

The most interesting aspect of the server is the part that handles
((long polling)). When a `GET` request comes in for `/talks`, it can
be either a simple request for all talks or a request for
updates, with a `changesSince` parameter.
@!d0e2bebfbe771e21010a0f3eb1fd98d0a5837a7b

There will be various situations in which we have to send a list of
talks to the client, so we first define a small helper function that
attaches the `serverTime` field to such responses.
@!ce0a6749f6cbab0ec2adf03949f6d7b56b96a841

```{includeCode: ">code/skillsharing/skillsharing_server.js"}
function sendTalks(talks, response) {
  respondJSON(response, 200, {
    serverTime: Date.now(),
    talks: talks
  });
}
```
@!a8233a799d21a5bdc87540a9f11888f74592ac11

{{index "query string", "url module", parsing}}
@!885809495b8707f76ffd0b142368e7a92e7a1e30

The handler itself
needs to look at the query parameters in the request's URL to see
whether a `changesSince` parameter is given. If you give the `"url"` module's
`parse` function a second argument of `true`, it will
also parse the query part of a URL. The object it returns will have a
`query` property, which holds another object that maps parameter names to
values.
@!a4cfbbe02c6a4c6ea89da2d071dbee0592e4888e

```{includeCode: ">code/skillsharing/skillsharing_server.js"}
router.add("GET", /^\/talks$/, function(request, response) {
  var query = require("url").parse(request.url, true).query;
  if (query.changesSince == null) {
    var list = [];
    for (var title in talks)
      list.push(talks[title]);
    sendTalks(list, response);
  } else {
    var since = Number(query.changesSince);
    if (isNaN(since)) {
      respond(response, 400, "Invalid parameter");
    } else {
      var changed = getChangedTalks(since);
      if (changed.length > 0)
         sendTalks(changed, response);
      else
        waitForChanges(since, response);
    }
  }
});
```
@!61e1d00f6dc42d09e5552ea817e3298ff758ef36

When the `changesSince` parameter is missing, the handler simply
builds up a list of all talks and returns that.
@!b90996dc02e74b343af007c811ef06ff64ddb35f

{{index "long polling", validation}}
@!dbe4cd2d76693047d8261d64e11c350232616fba

Otherwise, the `changesSince`
parameter first has to be checked to make sure that it is a valid
number. The `getChangedTalks` function, to be defined shortly, returns
an array of changed talks since a given point in time. If it returns an
empty array, the server does not yet have anything to send back to the
client, so it stores the response object (using `waitForChanges`) to
be responded to at a later time.
@!87552533c800e19313493fb156ad94dc143bc89c

```{includeCode: ">code/skillsharing/skillsharing_server.js"}
var waiting = [];

function waitForChanges(since, response) {
  var waiter = {since: since, response: response};
  waiting.push(waiter);
  setTimeout(function() {
    var found = waiting.indexOf(waiter);
    if (found > -1) {
      waiting.splice(found, 1);
      sendTalks([], response);
    }
  }, 90 * 1000);
}
```
@!021b09493d4d8ba81df65aff97406a1b6f3f067e

{{index "splice method", [array, methods], [array, indexing], "indexOf method"}}
@!a26a97aa7bd0cb2849b67838d96e878125ea3496

The `splice` method is used to cut a piece out of an array.
You give it an index and a number of elements, and it _mutates_ the
array, removing that many elements after the given index. In this
case, we remove a single element, the object that tracks the waiting
response, whose index we found by calling `indexOf`. If you pass
additional arguments to `splice`, their values will be inserted into
the array at the given position, replacing the removed elements.
@!6ffee16143c163ed3c9c762a2be5851b21ab71f4

{{index "setTimeout function", timeout}}
@!24b739b51db72ecfa920124e9521dfaeb08aeeee

When a response object is stored
in the `waiting` array, a timeout is immediately set. After 90
seconds, this timeout sees whether the request is still waiting and, if it
is, sends an empty response and removes it from the `waiting` array.
@!a2bf9f46a12ee43a47505cba6c103d211243d26d

{{index "registerChange function"}}
@!06a03893afe18fb40999fc93893454fa4062606a

{{id registerChange}}
@!c604f2628863ecab3c350a9b2819b4f4d48425ad

To be able to find exactly those talks
that have been changed since a given point in time, we need to keep
track of the ((history)) of changes. Registering a change with
`registerChange` will remember that change, along with the current
time, in an array called `changes`. When a change occurs, that means
there is new data, so all waiting requests can be responded to
immediately.
@!306e84aa4765e25556e23f8fb4241a76b8ae9437

```{includeCode: ">code/skillsharing/skillsharing_server.js"}
var changes = [];

function registerChange(title) {
  changes.push({title: title, time: Date.now()});
  waiting.forEach(function(waiter) {
    sendTalks(getChangedTalks(waiter.since), waiter.response);
  });
  waiting = [];
}
```
@!976526c7acfb69e9aa50b1dc71ea62d1fedeb950

Finally, `getChangedTalks` uses the `changes` array to build up an
array of changed talks, including objects with a `deleted` property for
talks that no longer exist. When building that array, `getChangedTalks` has to ensure that it
doesn't include the same talk twice since there might have been
multiple changes to a talk since the given time.
@!db2e059794c356b6c2b850e0dcaef15a45165a2f

```{includeCode: ">code/skillsharing/skillsharing_server.js"}
function getChangedTalks(since) {
  var found = [];
  function alreadySeen(title) {
    return found.some(function(f) {return f.title == title;});
  }
  for (var i = changes.length - 1; i >= 0; i--) {
    var change = changes[i];
    if (change.time <= since)
      break;
    else if (alreadySeen(change.title))
      continue;
    else if (change.title in talks)
      found.push(talks[change.title]);
    else
      found.push({title: change.title, deleted: true});
  }
  return found;
}
```
@!a1aa4f80e5957204876b7c869541b99823e577e0

That concludes the server code. Running the program defined so far
will get you a server running on port 8000, which serves files from
the `public` subdirectory alongside a talk-managing interface under
the `/talks` URL.
@!4e86b1968fd2a17b47a90b3d1782a22b9c86ab5d

## The client
@!062f613cf1f3dbdbf6e12c24569e0d108ef9dc20

{{index "skill-sharing project"}}
@!349ca05a831d42537d9bee40d8a4a1365540d11d

The ((client))-side part of the
talk-managing website consists of three files: an HTML page, a style
sheet, and a JavaScript file.
@!0ec0c2b7bfa88414eee3e0043319101eb6b311c5

### HTML
@!63bc9cfce42e1b15900bc9a259829b92884219c6

{{index "index.html"}}
@!96c1cc04f827a036bb82024e99ce581d8251dac8

It is a widely used convention for web servers to try
to serve a file named `index.html` when a request is made directly
to a path that corresponds to a directory. The ((file server)) module
we use, `ecstatic`, supports this convention. When a request is made
to the path `/`, the server looks for the file `./public/index.html` (`./public`
being the root we gave it) and returns that file if found.
@!526c9dc7e5c3abc161574671924738fd8b1a6e06

Thus, if we want a page to show up when a browser is pointed at our
server, we should put it in `public/index.html`. This is how our index
file starts:
@!9adf1f83cfcec153cc7778fbb6fcd6612cd2f91b

```{lang: "text/html", includeCode: ">code/skillsharing/public/index.html"}
<!doctype html>

<title>Skill Sharing</title>
<link rel="stylesheet" href="skillsharing.css">

<h1>Skill sharing</h1>

<p>Your name: <input type="text" id="name"></p>

<div id="talks"></div>
```
@!57fa92c1eb2f36ca874b04a3e4641084e6de5109

It defines the document ((title)) and includes a ((style sheet)),
which defines a few styles to, among other things, add a border around
talks. Then it adds a heading and a name field. The user is expected
to put their name in the latter so that it can be attached to talks
and comments they submit.
@!d4ee6dba328a2d536946ffbffbfb4d04d22d31f2

{{index "id attribute", initialization}}
@!3e430c887a7b1e6ef83f9b548634b9acc0b43779

The `<div>` element with the ID
`"talks"` will contain the current list of talks. The script fills the list
in when it receives talks from the server.
@!7b7f07e25000ab32d5b1e944979527c8463be679

{{index "form (HTML tag)"}}
@!9faab5e70792ea2b7195a6ac69ee593a35e20b9b

Next comes the form that is used to create a new
talk.
@!c0a72b6b4bf47b0f9b487cce62d1825744cd76a1

```{lang: "text/html", includeCode: ">code/skillsharing/public/index.html"}
<form id="newtalk">
  <h3>Submit a talk</h3>
  Title: <input type="text" style="width: 40em" name="title">
  <br>
  Summary: <input type="text" style="width: 40em" name="summary">
  <button type="submit">Send</button>
</form>
```
@!32ab8c9c41d2624ccf5c1bfde2ec2caa141ac97e

{{index "submit event"}}
@!db9ac90b6af21ef1b1c466fcba59c488601d1a63

The script will add a `"submit"` event handler to
this form, from which it can make the HTTP request that tells the
server about the talk.
@!07c64c93e75ea026d02cc4399242d1a313df0f24

{{index "display (CSS)", "hidden element"}}
@!618bbd11fdddc1eb619f854058fba10751f4823a

Next comes a rather mysterious
block, which has its `display` style set to `none`, preventing it from
actually showing up on the page. Can you guess what it is for?
@!4e818db5757124f6f85d9f5be696324e03b3bf5b

```{lang: "text/html", includeCode: ">code/skillsharing/public/index.html"}
<div id="template" style="display: none">
  <div class="talk">
    <h2>{{title}}</h2>
    <div>by <span class="name">{{presenter}}</span></div>
    <p>{{summary}}</p>
    <div class="comments"></div>
    <form>
      <input type="text" name="comment">
      <button type="submit">Add comment</button>
      <button type="button" class="del">Delete talk</button>
    </form>
  </div>
  <div class="comment">
    <span class="name">{{author}}</span>: {{message}}
  </div>
</div>
```
@!e6908b47673951848f3afd37eb0daeeb6fc563cf

{{index "elt function"}}
@!c1a3f2ac0fdbcc02718c86ad8d768fceb4dac90a

Creating complicated ((DOM)) structures with
JavaScript code produces ugly code. You can make the code slightly better by
introducing helper functions like the `elt` function from
[Chapter 13](13_dom.html#elt), but the result will still look worse
than HTML, which can be thought of as a ((domain-specific language))
for expressing DOM structures.
@!801c34bc964442a1a6ed6d5ce026333f2ff2374b

{{index [DOM, construction], template}}
@!8e3ac6f933e0c9a20a0a98ebb82bb0afe1fbcef5

To create DOM structures for the
talks, our program will define a simple _templating_ system,
which uses hidden DOM structures included in the document to
instantiate new DOM structures, replacing the ((placeholder))s between
double braces with the values of a specific talk.
@!c505802ccc1327017a07a53df69b276093f99fcf

{{index "script (HTML tag)"}}
@!848f907222b21154461aae8380306b91e14a42b8

Finally, the HTML document includes the script
file that contains the client-side code.
@!af3a3fcb107515aedef45b621f4dd9a9497adbc2

```{lang: "text/html", includeCode: ">code/skillsharing/public/index.html", test: never}
<script src="skillsharing_client.js"></script>
```
@!dc9b57cf1bd670721e7ef3fab7bb4d441df98d9b

### Starting up
@!9981809c7986de911be87b4f43abd20749daed87

{{index initialization, XMLHttpRequest}}
@!4ed9ee61d4833f735ffa4e289a2d5e41d86d1e0d

The first thing the client has
to do when the page is loaded is ask the server for the current set
of talks. Since we are going to make a lot of HTTP requests, we will
again define a small wrapper around `XMLHttpRequest`, which accepts an
object to configure the request as well as a callback to call when the
request finishes.
@!ec53e23aa53834923f38ac8fee1c1c0b498d879d

```{includeCode: ">code/skillsharing/public/skillsharing_client.js"}
function request(options, callback) {
  var req = new XMLHttpRequest();
  req.open(options.method || "GET", options.pathname, true);
  req.addEventListener("load", function() {
    if (req.status < 400)
      callback(null, req.responseText);
    else
      callback(new Error("Request failed: " + req.statusText));
  });
  req.addEventListener("error", function() {
    callback(new Error("Network error"));
  });
  req.send(options.body || null);
}
```
@!ab0e3dbbee43dd73757da77bb31aef4c7239df2b

{{index "long polling"}}
@!f67f2a4fa54652ed0d0e92498d9a55de8bc66e13

The initial request ((display))s the talks it
receives on the screen and starts the long-polling process by calling
`waitForChanges`.
@!69cd4bfd96d3093e3a2f4b4f5e0bc074e3e48757

```{includeCode: ">code/skillsharing/public/skillsharing_client.js", test: no}
var lastServerTime = 0;

request({pathname: "talks"}, function(error, response) {
  if (error) {
    reportError(error);
  } else {
    response = JSON.parse(response);
    displayTalks(response.talks);
    lastServerTime = response.serverTime;
    waitForChanges();
  }
});
```
@!5b279ad5ab3e1d30071e656d3d191167e9295e76

{{index synchronization}}
@!49ec7c7e54df95ddd5abb39322b3dd5d75874957

The `lastServerTime` variable is used to track
the ((time)) of the last update that was received from the server.
After the initial request, the client's view of the talks corresponds
to the view that the server had when it responded to that request.
Thus, the `serverTime` property included in the response provides an
appropriate initial value for `lastServerTime`.
@!5c400abdb1f504b1037ec80a230634c4322e84b0

{{index "error handling", "user experience"}}
@!c758f8e15c3955fc1c06e386ad303200d1878d46

When the request fails, we
don't want to have our page just sit there, doing nothing without
explanation. So we define a simple function called `reportError`, which at
least shows the user a dialog that tells them something went wrong.
@!27e273fe4bb80df351c527ae1878eb9216916eec

```{includeCode: ">code/skillsharing/public/skillsharing_client.js"}
function reportError(error) {
  if (error)
    alert(error.toString());
}
```
@!452c56b674854dd922b1fbf2841a2a98144a2d5f

{{index "callback function"}}
@!a932d89a4be312eaa79eaea5860a755b25af731a

The function checks whether there _is_ an
actual error, and it alerts only when there is one. That way, we can also
directly pass this function to `request` for requests where we can ignore the
response. This makes sure that if the request fails, the error is reported
to the user.
@!5c29ff3cdf5bde83307d7bee1ff032115520d4aa

### Displaying talks
@!2fe1daf00f6a993a76303b6bf43260dccd56cfef

{{index synchronization, "live view"}}
@!a1f787df01efc04bdb93d3ddd2dff4575de453b7

To be able to update the view of
the talks when changes come in, the client must keep track of the
talks that it is currently showing. That way, when a new version of a
((talk)) that is already on the screen comes in, the talk can be replaced
(in place) with its updated form. Similarly, when information comes in
that a talk is being deleted, the right DOM element can be removed
from the document.
@!a888567f62b850782f8166b014ab9fc63992ce6d

The function `displayTalks` is used both to build up the initial
((display)) and to update it when something changes. It will use the
`shownTalks` object, which associates talk titles with DOM nodes, to
remember the talks it currently has on the screen.
@!326e244e9fd0d747767dc04cc1377de447f4ae5b

```{includeCode: ">code/skillsharing/public/skillsharing_client.js", test: no}
var talkDiv = document.querySelector("#talks");
var shownTalks = Object.create(null);

function displayTalks(talks) {
  talks.forEach(function(talk) {
    var shown = shownTalks[talk.title];
    if (talk.deleted) {
      if (shown) {
        talkDiv.removeChild(shown);
        delete shownTalks[talk.title];
      }
    } else {
      var node = drawTalk(talk);
      if (shown)
        talkDiv.replaceChild(node, shown);
      else
        talkDiv.appendChild(node);
      shownTalks[talk.title] = node;
    }
  });
}
```
@!84382a589305394fa2833a78f84c2ab5322b6445

{{index "drawTalk function", instantiation}}
@!0bb4f76fcafc1432c0903bc4c2db91e1b6109288

Building up the DOM
structure for talks is done using the ((template))s that were included
in the HTML document. First, we must define `instantiateTemplate`,
which looks up and fills in a template.
@!d1f73faf1d454dfcd9e7c1454b91328acb136378

{{index "class attribute", "querySelector method"}}
@!5c6bfda4e5f581e848b9d270b6ca9e00b1a1d7dc

The `name` parameter is the
template's name. To look up the template element, we search for an
element whose class name matches the template name, which is a child
of the element with ID `"template"`. Using the `querySelector` method
makes this easy. There were templates named `"talk"` and `"comment"` in
the HTML page.
@!4f375a8c33d3ef408148a4d4277a767ea306366b

```{includeCode: ">code/skillsharing/public/skillsharing_client.js"}
function instantiateTemplate(name, values) {
  function instantiateText(text) {
    return text.replace(/\{\{(\w+)\}\}/g, function(_, name) {
      return values[name];
    });
  }
  function instantiate(node) {
    if (node.nodeType == document.ELEMENT_NODE) {
      var copy = node.cloneNode();
      for (var i = 0; i < node.childNodes.length; i++)
        copy.appendChild(instantiate(node.childNodes[i]));
      return copy;
    } else if (node.nodeType == document.TEXT_NODE) {
      return document.createTextNode(
               instantiateText(node.nodeValue));
    } else {
      return node;
    }
  }

var template = document.querySelector("#template ." + name);
  return instantiate(template);
}
```
@!ba00e1daab1a018dbedf09f64f62aee74ec24527

{{index copying, recursion, "cloneNode method", cloning}}
@!fa0b332ae9cd755313802ef1b13af145875a226c

The
`cloneNode` method, which all ((DOM)) nodes have, creates a copy of a
node. It won't copy the node's child nodes unless `true` is given as
a first argument. The `instantiate` function recursively builds up a
copy of the template, filling in the template as it goes.
@!397394fc933344433606234d51a7c3fb8c035436

The second argument to `instantiateTemplate` should be an object,
whose properties hold the strings that are to be filled into the
template. A ((placeholder)) like `{{title}}` will be replaced with the
value of _values_’ `title` property.
@!4fe0962f9ec190a24722c98985e599961c7c6ac3

{{index "drawTalk function"}}
@!b2b9b12b980572483e957f9f6abf93efde7afc7d

This is a crude approach to templating, but it
is enough to implement `drawTalk`.
@!932a53a31d9e768a94d55908e53f214ed3eedc94

```{includeCode: ">code/skillsharing/public/skillsharing_client.js"}
function drawTalk(talk) {
  var node = instantiateTemplate("talk", talk);
  var comments = node.querySelector(".comments");
  talk.comments.forEach(function(comment) {
    comments.appendChild(
      instantiateTemplate("comment", comment));
  });

node.querySelector("button.del").addEventListener(
    "click", deleteTalk.bind(null, talk.title));

var form = node.querySelector("form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    addComment(talk.title, form.elements.comment.value);
    form.reset();
  });
  return node;
}
```
@!a38f51b059bbe49905d11ad5845fe024a977435e

{{index "event handling"}}
@!ce38608f3041b902b2261b4bd54cc28ae232a3ee

After instantiating the `"talk"` template, there
are various things that need to be patched up. First, the ((comment))s
have to be filled in by repeatedly instantiating the `"comment"`
template and appending the results to the node with class
`"comments"`. Next, event handlers have to be attached to the button
that deletes the task and the form that adds a new comment.
@!0a64a9378f0fbf49bd30712acae8ce281ff71bea

### Updating the server
@!4ec0032c451225a2a21c22c1f56ab8a50801eec4

The event handlers registered by `drawTalk` call the function
`deleteTalk` and `addComment` to perform the actual actions required
to delete a talk or add a comment. These will need to build up
((URL))s that refer to talks with a given title, for which we define
the `talkURL` helper function.
@!6af2fc2536b16368914f9cae84ef0c8f69410175

```{includeCode: ">code/skillsharing/public/skillsharing_client.js"}
function talkURL(title) {
  return "talks/" + encodeURIComponent(title);
}
```
@!3434f59a49cba78dbc6cbca53da9065562bfc970

{{index "DELETE method"}}
@!4f33e0e2077f3612bed238823c889878079bd4ff

The `deleteTalk` function fires off a `DELETE` 
request and reports the error when that fails.
@!2897a84c8c307479ddf795375b2ce71b3e17017c

```{includeCode: ">code/skillsharing/public/skillsharing_client.js"}
function deleteTalk(title) {
  request({pathname: talkURL(title), method: "DELETE"},
          reportError);
}
```
@!ff4c78d13726db08eb871fe5ba8e260969f7902a

{{index "POST method"}}
@!3c96133d38df353e584c3541aff1f47724c6fc36

Adding a ((comment)) requires building up a JSON
representation of the comment and submitting that as part of a `POST`
request.
@!c6f25e8d3aa772afb8e504adb6ccc3d17f8f0f3c

```{includeCode: ">code/skillsharing/public/skillsharing_client.js"}
function addComment(title, comment) {
  var comment = {author: nameField.value, message: comment};
  request({pathname: talkURL(title) + "/comments",
           body: JSON.stringify(comment),
           method: "POST"},
          reportError);
}
```
@!7265f7886d096239450bd31a56dc4c62be874ed5

{{index "localStorage object", persistence}}
@!0c49c4aa03ce83005e29b881cd3afa6965ea2db1

The `nameField` variable used to
set the comment's `author` property is a reference to the `<input>`
field at the top of the page that allows the user to specify their
name. We also wire up that field to `localStorage` so that it does
not have to be filled in again every time the page is reloaded.
@!f9f5732917a40837af9251c0fe579493b8ee8aaf

```{includeCode: ">code/skillsharing/public/skillsharing_client.js", test: no}
var nameField = document.querySelector("#name");

nameField.value = localStorage.getItem("name") || "";

nameField.addEventListener("change", function() {
  localStorage.setItem("name", nameField.value);
});
```
@!72c577005b9f0b227434eb6a4b170070ffdca2c4

{{index "submit event", "form (HTML tag)", "PUT method"}}
@!54dabf50efa4634129cd183e4e4d3d88885966fe

The form at the
bottom of the page, for proposing a new talk, gets a `"submit"` event
handler. This handler prevents the event's default effect (which would
cause a page reload), clears the form, and fires off a `PUT` request
to create the talk.
@!3badef9e5ad07886cd4eccf94ecd638251e7519d

```{includeCode: ">code/skillsharing/public/skillsharing_client.js", test: no}
var talkForm = document.querySelector("#newtalk");

talkForm.addEventListener("submit", function(event) {
  event.preventDefault();
  request({pathname: talkURL(talkForm.elements.title.value),
           method: "PUT",
           body: JSON.stringify({
             presenter: nameField.value,
             summary: talkForm.elements.summary.value
           })}, reportError);
  talkForm.reset();
});
```
@!30b12d04d72be0b34c2417164ff3dcaa2fbbd1b3

### Noticing changes
@!35d67d1a7849f31c73fa3162c5ea43c395ccc712

{{index "long polling", synchronization}}
@!f29e274c9e0404903481796a8f4449a27a8af2ce

I should point out that the
various functions that change the state of the application by creating
or deleting talks or adding a comment do absolutely nothing to
ensure that the changes they make are visible on the screen. They simply 
tell the server and rely on the long-polling mechanism to
trigger the appropriate updates to the page.
@!efc79a07d4add9cae14eba71e7c2c4bdbc082ae5

Given the mechanism that we implemented in our server and the way we
defined `displayTalks` to handle updates of talks that are already on
the page, the actual long polling is surprisingly simple.
@!5afdb9155203e4a6f06e18ed20854bc1d26aa385

```{includeCode: ">code/skillsharing/public/skillsharing_client.js"}
function waitForChanges() {
  request({pathname: "talks?changesSince=" + lastServerTime},
          function(error, response) {
    if (error) {
      setTimeout(waitForChanges, 2500);
      console.error(error.stack);
    } else {
      response = JSON.parse(response);
      displayTalks(response.talks);
      lastServerTime = response.serverTime;
      waitForChanges();
    }
  });
}
```
@!7c849e31e16b16fd98da3682bc78d5ffb5f4d945

{{index "long polling", "error handling", recovery}}
@!b394cb5c40b1a55d42d47ea7b63ca8b0b344287d

This function is
called once when the program starts up and then keeps calling itself
to ensure that a polling request is always active. When the request
fails, we don't call `reportError` since popping up a dialog every
time we fail to reach the server would get annoying when the
server is down. Instead, the error is written to the console (to ease
debugging), and another attempt is made 2.5 seconds later.
@!09b34619ffcec44954e589243dcb3f9fcca87d45

When the request succeeds, the new data is put onto the screen, and
`lastServerTime` is updated to reflect the fact that we received data
corresponding to this new point in time. The request is immediately
restarted to wait for the next update.
@!0743a30ede15680101af7b9d3537292a2d0851b8

If you run the server and open two browser windows for
http://localhost:8000/[_localhost:8000/_] next to each other, you can
see that the actions you perform in one window are immediately visible
in the other.
@!fbf57bc0850e5f1a79afb1d5ee3c9cfd40694ea6

## Exercises
@!05a8fbf770d302609a5f8cc8c41741bd97fa70af

{{index "Node.js"}}
@!9c9f0db957889b338ff204a334988d44854ecb44

The following exercises will involve modifying the system
defined in this chapter. To work on them, make sure you ((download))
the code first
(http://eloquentjavascript.net/code/skillsharing.zip[_eloquentjavascript.net/code/skillsharing.zip_])
and have Node installed (http://nodejs.org[_nodejs.org_]).
@!2482eb47c69ae384e93adef48ddc9248c5357397

### Disk persistence
@!c49c6a57c89d2045ee6fa8fa4ab663e1f77fa5c6

{{index "data loss", persistence}}
@!5c96d414b0c26275bbf6f29e37ec3c40f733c8f7

The skill-sharing server keeps its
data purely in ((memory)). This means that when it ((crash))es or is
restarted for any reason, all talks and comments are lost.
@!7a8373c6357c850c9fbf2c658f4c460590093b3d

{{index "hard drive"}}
@!7b202fd524f1dda4f6fe559cca4c88cfeea75543

Extend the server so that it stores the talk data to
disk and automatically reloads the data when it is restarted. Do not worry
about efficiency—do the simplest thing that works.
@!0638614f99be09c60b854c3324c645dab37590f8

{{hint
@!efecef4a5b53ef95c232a67e7bcbacb68f60f6ce

{{index "file system", "writeFile function", "registerChange function", persistence}}
@!50e19e8d24499d7d4377178a3e4542a07222efe4

The simplest solution I can come up with
is to encode the whole `talks` object as ((JSON)) and dump it
to a file with `fs.writeFile`. There is already a function
(`registerChange`) that is called every time the server's data
changes. It can be extended to write the new data to disk.
@!081e18e311792668387021a7d7eee27f061914e9

{{index "readFile function"}}
@!939b4e77abf0b5df15595606cda863c1a14426fa

Pick a ((file))name, for example
`./talks.json`. When the server starts, it can try to read that
file with `fs.readFile`, and if that succeeds, the server can use the
file's contents as its starting data.
@!74e326f33d475deefc438c121cdaf669498b50be

{{index prototype, "JSON.parse function"}}
@!0d9d211e98d265c4a947ad9ff6ef443f856ed95a

Beware, though. The `talks`
object started as a prototype-less object so that the `in`
operator could be sanely used. `JSON.parse` will return regular
objects with `Object.prototype` as their prototype. If you use JSON as
your file format, you'll have to copy the properties of the object
returned by `JSON.parse` into a new, prototype-less object.
@!042e67eab2f5dcf140cdda06252c030d40be734a

hint}}
@!acf52ff47fdc70c4e3f7bea32659cef95033a6e9

### Comment field resets
@!b18a9580278f199f9ee9f38640df73438224fd32

{{index "comment field reset (exercise)", template, state}}
@!0f5ae3cba91353615b35c1cefa4bcb0a4faeb521

The
wholesale redrawing of talks works pretty well because you usually
can't tell the difference between a DOM node and its identical
replacement. But there are exceptions. If you start typing something
in the comment ((field)) for a talk in one browser window and then,
in another, add a comment to that talk, the field in the first window
will be redrawn, removing both its content and its ((focus)).
@!cff395b960119073db1948255a5aa6d5dfffb07b

In a heated discussion, where multiple people are adding comments to a
single talk, this would be very annoying. Can you come up with a way
to avoid it?
@!ee8ef41c887fb2740e937d0264d970333e98a7e6

{{hint
@!06e77eea8eaaec67ed785eb7d2b85ce67a3e43d9

{{index "comment field reset (exercise)", template}}
@!efa972eda0e9d9232e9923dc1b2e7d3ea6bcb3d3

The ad hoc approach
is to simply store the state of a talk's comment field (its content and
whether it is ((focus))ed) before redrawing the talk and then
((reset)) the ((field)) to its old state afterward.
@!bf778db3d2a25910f41dc7378785558094dbab83

{{index recursion, [comparison, "of DOM nodes"]}}
@!ed61699db8d63954eded47fe08ef9f6a9a598f64

Another solution would be
to not simply replace the old DOM structure with the new one but
recursively compare them, node by node, and update only  the parts that
actually changed. This is a lot harder to implement, but it's more general and
continues working even if we add another text field.
@!715ab16aa20898d2300aaf31170a73133c18dd30

hint}}
@!d3008b9e66f8fe1d16ae55b635a4cf62065f1adf

### Better templates
@!228bf479aa9cc9fe9b0fc48a47762267dd8eb64f

{{index "conditional execution", repetition, template}}
@!1f8d4eb96c5729de9031188bac7b2bda104ba423

Most
templating systems do more than just fill in some strings. At the very
least, they also allow conditional inclusion of parts of the template,
analogous to `if` statements, and repetition of parts of a template,
similar to a loop.
@!3c45ed573cff6cf856c403c33716a8f469b2ff82

If we were able to repeat a piece of template for each element in an
array, we would not need the second template (`"comment"`). Rather, we
could specify the `"talk"` template to ((loop)) over the array held in
a talk's `comments` property and render the nodes that make up a
comment for every element in the array.
@!8f5c87a944cf8662b3b42c36f97ec42e2d96d744

It could look like this:
@!8be49c661812a5a22a6347534e8b76ffe9e5d723

```{lang: "text/html"}
<div class="comments">
  <div class="comment" template-repeat="comments">
    <span class="name">{{author}}</span>: {{message}}
  </div>
</div>
```
@!2957b2182a295383ab411ea65cfe0e1b8b485049

{{index "template-repeat attribute"}}
@!618185584653b09c709fe8570cb3dab1d7b4daef

The idea is that whenever a node
with a `template-repeat` attribute is found during template
instantiation, the instantiating code loops over the array held in the
property named by that attribute. For each element in the array, it
adds an instance of the node. The template's context (the `values`
variable in `instantiateTemplate`) would, during this loop, point at
the current element of the array so that `{{author}}` would be looked up
in the comment object rather than in the original context (the talk).
@!3688c7bdbe72e02edc63808f5cb51e0179c41574

{{index "drawTalk function", "instantiateTemplate function"}}
@!dc705bcba4a0fe6d1e599ec439430d516790dd48

Rewrite
`instantiateTemplate` to implement this and then change the templates
to use this feature and remove the explicit rendering of comments from
the `drawTalk` function.
@!aaec5dad613c5a7fee7789e5fda340a92f0e433b

How would you add conditional instantiation of nodes, making it
possible to omit parts of the template when a given value is true or
false?
@!6d2d403ddd3953adf266cef9ff35de02a2c10499

{{hint
@!85a9b65d9ff47198fe9ffe97ac3b658aacd77f2a

{{index template, repetition, "instantiateTemplate function", recursion, "template-repeat attribute"}}
@!ee4c1bac2eca3e9ead8c56dffa65920c2865ad15

You
could change `instantiateTemplate` so that its inner function
takes not just a node but also a current context as an argument. You can
then, when looping over a node's child nodes, check whether the child
has a `template-repeat` attribute. If it does, don't instantiate it
once but instead loop over the array indicated by the attribute's
value and instantiate it once for every element in the array, passing
the current array element as context.
@!75956248390c454164acba748660a88b4038d1c8

Conditionals can be implemented in a similar way, with attributes
called, for example, `template-when` and `template-unless`, which
cause a node to be instantiated only when a given property is true (or
false).
@!8b15cdac12dc675dc8f1210a89c07f66f08c3fe4

hint}}
@!c59fa33ec0f5aabcbde178b6dbad2e2012ac7d95

### The unscriptables
@!a357e28d93212ee7d9de3350781a1f2be7177b25

{{index "skill-sharing project", [JavaScript, "absence of"]}}
@!585b27100dc4623633556925629568ef146c603c

When someone
visits our website with a ((browser)) that has JavaScript disabled or
is simply not capable of displaying JavaScript, they will get a
completely broken, inoperable page. This is not nice.
@!e8204c73f767fd0e31c4a5f551c0b33e722ae6e0

Some types of ((web application))s really can't be done without
JavaScript. For others, you just don't have the ((budget)) or patience
to bother about clients that can't run scripts. But for pages with a
wide audience, it is polite to support scriptless users.
@!919f7d6f744223961b049aec4ae02b9eaf898f05

{{index "graceful degradation"}}
@!aee369e73692d8aa946ecfba347cf261a83d79b2

Try to think of a way the skill-sharing
website could be set up to preserve basic functionality when run
without JavaScript. The automatic updates will have to go, and people
will have to refresh their page the old-fashioned way. But being able
to see existing talks, create new ones, and submit comments would be
nice.
@!e4803033fadb8b89ce7502ffb0c91d188f7aa846

Don't feel obliged to actually implement this. Outlining a solution is
enough. Does the revised approach strike you as more or less elegant
than what we did initially?
@!b8445649b2e4f190320284dd87cdafd124809331

{{hint
@!0ffec0bb17849b3a013e62a41494fa5bb948b846

{{index "form (HTML tag)", "page reload"}}
@!df1bef5c3d7a2a51a5f36103972c4d79a63a624a

Two central aspects of the
approach taken in this chapter—a clean HTTP interface and client-side
template rendering—don't work without JavaScript. Normal HTML forms
can send `GET` and `POST` requests but not `PUT` or `DELETE` requests
and can send their data only  to a fixed URL.
@!b6a7b3d6f46674f19fd8b634234dca0bc487dbbe

{{index "query string", "POST method", "URL encoding"}}
@!1f9c978aee0ab49db25f0e5da4818a0e79a2dd2d

Thus, the server
would have to be revised to accept comments, new talks, and deleted
talks through `POST` requests, whose bodies aren't JSON but rather
use the URL-encoded format that HTML forms use (see
[Chapter 17](18_forms.html#forms)). These requests would have to
return the full new page so that users see the new state of the site
after they make a change. This would not be too hard to engineer and
could be implemented alongside the “clean” HTTP interface.
@!48cb54ffea57b3f6ca8892f5255b2a2addee8ca8

{{index template}}
@!bd4a14a6c089cbb0f6f362603b97287e185e651b

The code for rendering talks would have to be duplicated
on the server. The `index.html` file, rather than being a static file,
would have to be generated dynamically by adding a handler for it to
the router. That way, it already includes the current talks and
comments when it gets served.
@!5cfbbf301e0498f9d2275149bda6e1f0e4b2fa0e

hint}}
@!94e682a69b5b8f9fc2ecc4c0bf6cafab018f06e2