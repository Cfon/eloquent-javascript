{{meta {chap_num: 7, prev_link: 06_object, next_link: 08_error, load_files: ["code/chapter/07_robot.js", "code/animatevillage.js"], zip: html}}}
@!67e995651368f00539897e913579a7701cb450d4

# Project: A Robot
@!5333411aef432d24c4ff713752f9661f89d79c10

{{quote {author: "Edsger Dijkstra", title: "The Threats to Computing Science", chapter: true}
@!a30b793cc466c154b5d4eb7a9c7fa3c0f1e0d5cc

[...] the question of whether Machines Can Think [...] is about as
relevant as the question of whether Submarines Can Swim.
@!937da191803dd089b3bf6bc8f0e7e0bf2a51844e

quote}}
@!ee108f87be6cb5f90a0b767c52ae984e29cbe8c3

{{index "artificial intelligence", "Dijkstra, Edsger", "project chapter", "reading code", "writing code"}}
@!ededf7519bb0894a214c2b88a9748e8223aa0d3f

In “project” chapters, I'll stop pummeling you with new theory for a
brief moment and instead work through a program with you. Theory is
indispensable when learning to program, but it is best accompanied by
reading and understanding nontrivial programs.
@!0da2ac2d2173a468fe1a5331badf2777cb627617

Our project in this chapter is to build an ((automaton)), a little
program that performs a task in a ((virtual world)). Our automaton
will be a mail-delivery ((robot)) picking up and dropping off parcels.
@!dab7a2838d5f039592f47938e601f8426056a2cc

## Meadowfield
@!514025970c2e3070501f7fe56874b79e5f967d16

{{index "roads array"}}
@!de4eb6a6d9d2f674066cc412445518a188bfcd32

The village of ((Meadowfield)) isn't very big. It consists of eleven
places with fourteen roads between them. It can be described with this
array of roads:
@!525b68c60f27ea9f6a74976a5bf18012ed07fdb4

```{includeCode: true}
const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];
```
@!7e011433d1558093222ced74b6c3cd73db568970

{{figure {url: "img/village2x.png", alt: "The village of Meadowfield"}}}
@!49154d022789436c8f1e57353bda1d3e87646d29

This network of roads forms a _((graph))_. A graph is a collection of
points (places in the village) with lines between them (roads). This
graph will be the world that our robot moves through.
@!2d0b3ada1939287d2d670b969696196fd195e326

{{index "roadsFrom object"}}
@!e49416605d932d754c62403acf18c761a3349c91

That array of strings isn't very easy to work with. Instead, we'll
typically want to find the destinations that we can reach from a given
place. Let's convert the list of roads to a data structure that, for
each place, tells us what can be reached from there.
@!7e6f4dd7000b8b22c5fad30b5ed085824cb4f4f9

```{includeCode: true}
function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadsFrom = buildGraph(roads);
```
@!5c86632e1eca98430124162e551157d99bd9c276

Given a an array of edges, `buildGraph` creates a map object that, for
each node, stores an array of connected nodes.
@!576d1b928da8eb894c131e6bebf62ffc7fdf0ff9

{{index "split method"}}
@!7f81d54afaa0e5ade21ede6aebce698b6fe50e55

Strings have a `split` method that converts it into an ((array)) of
shorter strings, cutting on the string given as argument. Since we
know that road strings have the form `"Start-End"`, splitting on a
dash will produce a two-element array.
@!6d85303141dbe3fc26084df2eef907716af4eea2

## The task
@!abbb6388455335ddb2697d3924d1820d2170bc79

Our ((robot)) will be moving around the village. There will be parcels
in various places, each addressed to some other place. The robot picks
up parcels when it comes to them, and delivers them when it arrives at
their destination.
@!f8348d972cc7c53efb8dc2ff886f22619ff7b992

The automaton must decide, at each point, where it will go next. It
has finished its task when all parcels have been delivered.
@!228e4fb1c86dd89fb18bf5771702d7e5ec3ee5cb

{{index simulation, "virtual world"}}
@!1dfb60117ec87bb7114bab14ad1ab90828ec5d77

To be able to simulate this process, we must define a virtual world
that can model it. This model tell us where the robot is and where the
parcels are. When the robot has decided to move somewhere, it should
be possible to update the model to reflect the new situation.
@!06c33afd9a5b5f92963d7d87e1acf8355031cb5f

If you're thinking in terms of ((object-oriented programming)), your
first impulse is probably to start defining objects for the various
elements in the world. A ((class)) for the robot, one for a parcel,
maybe one for places. These could then hold properties that describe
their current state, such as the pile of parcels at a location, which
we could change when updating the world.
@!3db6324f3f88274ff65d553cd20fdeb13b720f3e

This is wrong.
@!66efa63f6c7d88fdbe014b54a91090a4eb511f51

At least, it usually is. The fact that something sounds like an object
does not automatically mean that it should be an object in your
program. Reflexively writing classes for every concept in your
application tends to leave you with a collection of interconnected
objects that each have their own internal, changing state. Such
programs are often hard to understand and thus easy to break.
@!18121712e7a1542a1758c6c0fdfdeb2168411292

{{index "Jou Armstrong"}}
@!8bbda4257b77ba138a517040b7d93bf549f6ebb8

{{quote {author: "Joe Armstrong", title: "interviewed in Coders at Work", chapter: true}
@!ff430f45cedb86efe5ed3c1f3e5005835a647eda

The problem with object-oriented languages is they’ve got all this
implicit environment that they carry around with them. You wanted a
banana but what you got was a gorilla holding the banana and the
entire jungle.
@!a98b9eb5e41cb10ba665e7092689295009f3c474

quote}}
@!fb69140ead387f7250d9349a5e83d86b0a9475c9

Instead, let's condense the world's state down to the minimal set of
values that define it. There's the robot's current location and the
collection of undelivered parcels, each of which has a current
location and a destination address. That's it.
@!2b7287e2fdbd32dd241057832f9465b9b231a44b

{{index "WorldState class", "persistent data structure"}}
@!35e24b07ccf1cf035f6bd41cf344fcf722b81a6f

And while we're at it, let's make it so that we don't _change_ this
state when the robot moves, but rather compute a _new_ state for the
situation after the move.
@!65aec8e2a6292822373520852e78d65e0be974e3

```{includeCode: true}
class WorldState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

move(destination) {
    if (!roadsFrom[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new WorldState(destination, parcels);
    }
  }
}
```
@!165cdf65348578ced08bdb0f6ee4870513ebdbea

The `move` method is where the action happens. It first checks whether
there is a road going from the current place to the destination, and
if not, it returns the old state, since this is not a valid move.
@!12c434b9352b086a3110a1ec4ef379800e6ce601

{{index "map method", "filter method"}}
@!2e4088fd3be46504572f00a47537d172be3a86b0

Then, it creates a new state with the destination as the robot's
place. But it also needs to create a new set of parcels—parcels that
the robot is carrying (that are at the robot's current place) need to
be moved along to the new place. And parcels that are addressed to the
new place need to be delivered—that is, they need to be removed from
the set of undelivered parcels. The call to `map` takes care of the
moving, and the call to `filter` does the delivering.
@!0c274e4aa0709e322683f8ea4b0e1125c31126f0

Parcel objects also aren't changed when they are moved, but recreated.
The `move` method gives us a new world state, but leaves the old one
entirely intact.
@!a9592d1f9c6ddbf09670eb4a64d4330936e3456b

```
let first = new WorldState(
  "Post Office",
  [{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");

console.log(next.place);
// → Alice's House
console.log(next.parcels);
// → []
console.log(first.place);
// → Post Office
```
@!9befb582419f02991fada76676f0e5b756ac8647

The move causes the parcel to be delivered, and this is reflected in
the next state. But the initial state still describes the situation
where the robot is at the post office and the parcel is undelivered.
@!9a5a6f871858971fc08ee5ecf0e2d058e353d3a3

## Persistent data
@!6c7c360e909647a7612e0ec61b6161fe8f551541

{{index "persistent data structure", mutability, "data structure"}}
@!812f9d3609d4094d5cdd806acca4a5bde976e413

Data structures that don't change are called _((immutable))_ or
_persistent_. They behave a lot like strings and numbers, in that they
are who they are, and stay that way, rather than containing different
things at different times.
@!8083447882d0736b56cee2262a141f0a6090056c

But in JavaScript, just about everything _can_ be changed, so working
with values that are supposed to be persistent requires some
restraint. There _is_ a function called `Object.freeze`, which changes
an object so that overwriting its properties is ignored. You could use
that to make sure your objects aren't changed, if you want to be
careful. Freezing does require the computer to do some extra work, and
having updates ignored is just about as likely to confuse someone as
having them go wrong. So I usually prefer to just tell people that a
given object shouldn't be messed with, and hope they remember it.
@!8c0fb292d75ec218d85c7941c1a36b772f090fc3

```
let object = Object.freeze({value: 5});
object.value = 10;
console.log(object.value);
// → 5
```
@!e91024fc90292448a818abb5c66fa62f42600024

Why am I going out of my way to not change objects, when the language
is obviously expecting me to?
@!a6292b8b79ee51cc0c70ad2c9df8c79ef3193c8c

Because it helps me understand my programs better. This is about
complexity management again. When the object in my system are fixed,
stable things, I can consider operations on them in isolation—moving
to Alice's house from a given start state always produces the same new
state. When objects change over time, that adds a whole new dimension
of complexity to this kind of reasoning.
@!18c127c964283fa4d2194359afb084bf2e29be1a

For a small system like the one we are building in this chapter, we
could handle a little extra complexity. But the most important limit
on what kind of systems we can build is how much we can understand.
Anything that making your system easier to understand makes it
possible to build a more ambitious system.
@!6ac3dbd83011a83f4887721d4f66ee81e82283de

Unfortunately, while understanding a system built on persistent data
structures is easier, _designing_ one, especially when your
programming language isn't helping, can be quite a bit harder. Though
we'll look for opportunities to use persistent data structures in this
book, we will also be using changeable ones.
@!d9c6648f57d8387e35d5fc3b4b936c34857495bc

## Simulation
@!79d023347d4181c54d4ac8ab18466bbe757e4f65

{{index simulation, "virtual world"}}
@!15b3ee3d1dd35dda9fe530aebe0f727bbf1e2335

A delivery ((robot)) looks at the world, and decides in which
direction it wants to move. As such, we could say that a robot is a
function that takes a `WorldState` object and returns the name of a
nearby place.
@!4d07bbd82537ceeb0fb4853dd591193d5e2bd6b6

{{index "runRobot function"}}
@!d02215acc2d3f0fc62276e6af2364b31cec5e65d

Because we want robots to be able to remember things, so that they can
make and execute plans, we also pass them their memory, and allow them
to return a new memory. Thus, the thing a robot returns is an object
containing both the direction it wants to move in and a memory value
that will be given back to it the next time it is called.
@!5be787c1c096bfd1e9fb7d034d5e4d6e65b01f5a

```{includeCode: true}
function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}
```
@!40e124e33da66fa6d1a9417d6d93ec25422714c6

Consider what a robot has to do to "solve" a given state. It must pick
up all parcels by visiting every location that has a parcel, and
deliver them, by visiting every location that a parcel is address to,
but after picking up the relevant parcel.
@!d2f0c77aff68b7376f6c674e5c0f0558cda777bb

What is the dumbest strategy that could possibly work? The robot could
just walk in a random direction every turn. That means that, with
great likelyhood, it will eventually run into all parcels, and then
also at some point reach the place where they should be delivered.
@!362af7ae9429b8250e7953ce68f254aac02f4814

{{index "randomPick function", "randomRobot function"}}
@!6656ddd876ccd7ab0fb43d2e4767e9cc6a6058df

Here's what that could look like:
@!19559c25ff64117b3bbee03ee930375981473ddb

```{includeCode: true}
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadsFrom[state.place])};
}
```
@!3168d44f496ee30a2d476d5297797eef58b109e9

{{index "Math.random function", "Math.floor function", array}}
@!65d564c6ca7832b9918a6621e8c42bbeb03a9043

Remember that `Math.random()` returns a number between zero and one,
but always below one. Multiplying such a number by the length of an
array and then applying `Math.floor` to it gives us a random index for
the array.
@!0635f1022b112fced4ec560fd65a43e0f1567bdf

Since this robot does not need to remember anything, it ignores its
second argument (remember that JavaScript functions can be called with
extra arguments without ill effects), and omits the `memory` property
in its returned object.
@!6182e8a3e8adbe7f3d00c8a032f5fd62df324b5e

We'll need a way to create a new state with some parcels, to put this
sophisticated robot to work.
@!52ffd597f4dc1370f9da1544d747e12a2e15cc28

```{includeCode: true}
WorldState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadsFrom));
    let place;
    do {
      place = randomPick(Object.keys(roadsFrom));
    } while (place == address);
    parcels.push({place, address});
  }
  return new WorldState("Post Office", parcels);
};
```
@!7f22d0de6eb287b0d3f6a3ad06a5a2984875b582

{{index "do loop"}}
@!9ee7de4d2fbeb132652d3cf29e4c9e0e84185311

We don't want any parcels that are sent from the same place that they
are addressed to. For this reason, the `do` loop keeps picking new
places when it gets one that's also the address.
@!acb295140e8835f11cf11c807922f25e70793630

Let's start up a virtual world.
@!d74a9c1924d611c587a7c4a96a3603cffeb77bff

```{test: no}
runRobot(WorldState.random(), randomRobot);
// → Moved to Marketplace
// → Moved to Town Hall
// → …
// → Done in 63 turns
```
@!4de047b01ebb61574f92ae72450a7505249abe12

It takes the robot a lot of turns to deliver the parcels, because it
isn't planning ahead very well. We'll address that soon.
@!c4d788a1d0ba0cbaacf189795ec6556aff6dc0a4

{{if interactive
@!ea8e25ae319182fcfaeb4033f7e92ce5f0a1bd00

For a more pleasant perspective on the simulation, you can use the
`runRobotAnimation` function that's available in this chapter's
programming environment. This will run the simulation, but instead of
outputting text, it shows you the robot moving around the village map.
@!c9ce69f2114a33969ed5b0afbd8ae131d72055ad

```{test: no}
runRobotAnimation(WorldState.random(), randomRobot);
```
@!dccc01151b9fc2165da5d404e1f4b6b89d3dd763

The way `runRobotAnimation` is implemented will remain a mystery for
now, but after you've read the [later chapters](13_dom.html#dom) of
this book, which discuss JavaScript integration in web browsers,
you'll be able to guess how it works.
@!a63fda1587aef9dc77ba0af44a06446c9d715c5a

if}}
@!2a86f625b4a6061b316a3a06c17b71040ec97e07

## The mail truck's route
@!26bc04b5aa7d976fff80a4b2849dae9066b35d52

{{index "mailRoute array"}}
@!bd1a5c6ea74a73a736c9e3d1f3b5b04ffd1e244f

We should be able to do a lot better than the random ((robot)). An
easy improvement would be to take a hint from the way real-world mail
delivery works. If we find a route that passes all places in the
village, the robot could run that route twice, at which point it is
guaranteed to be done. Here is one such route (starting from the post
office).
@!bf1ed154f243f9194e7ba150a33dea781e890577

```{includeCode: true}
const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];
```
@!20ea293354ba2c0b3103fb65a5ad6b219498b569

{{index "routeRobot function"}}
@!8c0aad14b19ee5be753a51bf11993ccb74ffdb75

To implement the route-following robot, we'll need to make use of
robot memory. The robot keeps the rest of its route in its memory, and
drop the first element every turn.
@!e31c8afc9bb378b0f6d99dbc3e65916c83a93bd5

```{includeCode: true}
function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}
```
@!79a47eaced8ed17fc103a871ac23251812352aa7

This robot is a lot faster already. It'll take a maximum of 26 turns
(twice the 13-step route), but usually less.
@!d39258e5f6805b8179519e9505f0fc2f1870f5cb

{{if interactive
@!294ac4cfbefa396c9e0561e04eda3be6695b0763

```{test: no}
runRobotAnimation(WorldState.random(), routeRobot, []);
```
@!112bb1ddbb4bbc4037fbbfa8d6dfec535916e2d0

if}}
@!45daf7a695ca359f514b9a5a8bc1868ed20e6ba2

## Pathfinding
@!e93021debf0ffcc9145c9c6a5858528cdb55cb11

Still, you can't really call blindly following a fixed route
intelligent behavior. The ((robot)) could work more efficiently if it
adjusted its behavior to the actual work that needs to be done.
@!1ebb8f5f992fb5bb846a4cf40b4101ee33220f4b

{{index pathfinding}}
@!95b68cb2bc076f95c0b472e9f329ec769c47b5d3

To do that, it has to be able to deliberately move towards a given
parcel, or towards the location where a parcel has to be delivered.
Doing that, even when the goal is more than one move away, will
require some kind of route-finding function.
@!5995808fe64efb082d0cb8e45d844371b79b6d5e

The problem of finding a route through a ((graph)) is a typical
_((search problem))_. We can tell whether a given solution (a route)
is a valid solution, but we can't directly compute the solution, the
way we could for 2 + 2. Instead, we have to keep creating potential
solutions until we find one that works.
@!b27445a3e20d8270b8722b94aead53ed8c10ee8b

There is an infinite amount of possible routes through a graph. But
when searching for a route from _A_ to _B_, we are only interested in
the ones that start at _A_. We also don't care about routes that visit
the same place twice—those are definitely not the most efficient route
anywhere. So that cuts down on the amount of routes that the route
finder has to consider.
@!50d222f3593bfbd2cbc5ee56079251b8f758e1bc

In fact, we are mostly interested in the _shortest_ route. So we want
to make sure we look at short routes before we look at longer ones. A
good approach would be to "grow" routes from the starting point,
exploring every reachable place that hasn't been visited yet, until a
route reaches the goal. That way, we'll only explore routes that are
potentially interesting, and find the shortest route (or one of the
shortest routes, if there are more than one) to the goal.
@!aaf49ac00c329de98d8581aa18ad12a81100f6fd

{{index "findRoute function"}}
@!119daf34583b1a4a71f0992a411bfdcd33a2ced3

This is a function that does this:
@!5663b808fbdafc4815a83f21d9d1aae52c7d4f07

```{includeCode: true}
function findRoute(from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of roadsFrom[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}
```
@!1fe5ffdfc2252d13fea8a2cef9f180307c5a5e8d

The exploring has to be done in the right order—the places that were
reached first have to be explored first. We can't immediately explore
a place as soon as we reach it, because that would mean places reached
_from there_ would also be explored immediately, and so on, even
though there may be other, shorter paths that haven't yet been
explored.
@!21ad81db2a91f8009567222f2ae079569158d208

Therefore, the function keeps a _((work list))_. This is an array of
places that should be explored next, along with the route that got us
there. It starts with just the start position and an empty route.
@!6e3194e5a69470c89ba89768d3bf5c921fe2f84a

The search then operates by taking the next item in the list, and
exploring that, which means that all roads going from that place are
looked at. If one of them is the goal, a route is returned. Otherwise,
if we haven't looked at this place before, a new item is added to the
list. If we have looked at it before, since we are looking at short
routes first, we've found a longer route to that place or one
precisely as long as the existing one. So we don't need to explore it.
@!7346da52c98272285c3ad2bc18c4eaad3570dab8

You can visually imagine this as a web of known routes crawling out
from the start location, growing evenly on all sides (but never
tangling back into itself). As soon as the first thread reaches the
goal location, that thread is traced back to the start, giving us our
route.
@!1712d9eedd0d791f4ab8612953f1b074a6249f71

{{index "connected graph"}}
@!7aa9981ed78bcc65006a8e126186b4b350072bd9

Our code doesn't handle the situation where there are no more work
items on the work list, because we know that our graph is _connected_,
meaning that every location can be reached from all other locations.
We'll always be able to find a route between two points, and the
search can not fail.
@!62f6cd9269e0fc7663fd5b6978698beb43b223a9

```{includeCode: true}
function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(place, parcel.place);
    } else {
      route = findRoute(place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}
```
@!d7fa5d5aa6cd5af732b61635f6dfc31e68250f5d

{{index "goalOrientedRobot function"}}
@!9f4c2cdfa38ab87470b22e01d50ab68f4be10cbe

This robot uses its memory value as a list of directions to move in,
just like the route-following robot. Whenever that list is empty, it
has to figure out what to do next. It takes the first undelivered
parcel in the set and, if that hasn't been picked up yet, plots a
route towards it. If it _has_ been picked up, it still needs to be
delivered, so it creates a route towards the delivery address instead.
@!40c8dcf478cb0fdce062cb74cdb7e898c09b6c30

{{if interactive
@!e5c2e3f6f39166fb4f6dcc01895fbfc0f2c8f21b

Let's see how it does.
@!67d65c9120d83be6e202cac5a715b47b81557308

```{test: no}
runRobotAnimation(WorldState.random(),
                  goalOrientedRobot, []);
```
@!cfe2249d0f86f1d1bdf9edab7c31d9cb1be9722e

if}}
@!3dc0bc4116ac40fb5fee8bfc9c5ce5f49b2f9d15

This robot usually finishes the task of delivering 5 parcels in around
16 turns. Slightly better than `routeRobot`, but still definitely not
optimal.
@!6b1d548d401254a384bb34c32d72d50a09fe3f9b

## Exercises
@!41b64ef61a1b33f065ac4f92a76d8d0c71a8f853

### Measuring a robot
@!c63ab6dd79bfba9a73c746822bb0c5bea76f9b93

{{index "measuring a robot (exercise)", testing, automation, "compareRobots function"}}
@!9da33a2ae7d81674feb8db76eff46d755e690beb

It's hard to objectively compare ((robot))s by just letting them solve
a few scenarios. Maybe one robot just happened to get easier tasks, or
the the kind of tasks that it is good at, whereas the other didn't.
@!aa768aba0dd4e3bb07d21571ed41e49b7fc7cd99

Write a function `compareRobots` which takes two robots (and their
starting memory). It should generate a hundred tasks, and let each of
the robots solve each of these tasks. When done, it should output the
average number of steps each robot took per task.
@!ebac2d900b2a17458e44e6b7aada2942269a4dd4

For the sake of fairness, make sure that you give each task to both
robots, rather than generating different tasks per robot.
@!da5e70e0116e0699ce09920ba5f337b243645234

{{if interactive
@!54bf40fc4f9fdf8218b2035dddf4d5092dc13e21

```{test: no}
function compareRobots(robot1, memory1, robot2, memory2) {
  // Your code here
}

compareRobots(routeRobot, [], goalOrientedRobot, []);
```
@!422883915e4293af8ab91fa8e929a7384e8f790f

{{hint
@!f00a9fc62fc737f8082edaed8f2ac295334ab29a

{{index "measuring a robot (exercise)", "runRobot function"}}
@!c8ba6f56df4e5ca6c2c6a6d9bf54ad772e45071e

You'll have to write a variant of the `runRobot` function that,
instead of logging the events to the console, returns the number of
steps the robot took to complete the task.
@!023e6caccec54eb5f89fd7f2ffba5de280cdbcab

Your measurement function can then, in a loop, generate new states and
count the steps each of the robots takes. When it has generated enough
measurements, it can use `console.log` to output the average for each
robot, which is the total amount of steps taken divided by the number
of measurements.
@!c752d1788c2a3945f81f8048357698e77c8b4e26

hint}}
@!00517f3bf76cfc7c7b37c9012d08c40acb5f4698

### Robot efficiency
@!09b9dc9b8519469dd45b805321d3cb72d78275fd

{{index "robot efficiency (exercise)"}}
@!f7a493edbdeea5d192c10ca3e5dc2113301c5627

Can you write a robot that finishes the delivery task faster than
`goalOrientedRobot`? If you observe that robot's behavior, what
obviously stupid things does it do? How could those be improved?
@!874e3e9d77621120497fa3df63cd9c9880ee25f1

If you solved the previous exercise, you might want to use your
`compareRobots` function to verify whether you improved the robot.
@!27d82ea75e6988f77da8915da78f3449f6c1336e

{{if interactive
@!3200a0dce2920dad21fc70997b0c97c28d94fc73

```{test: no}
// Your code here

runRobotAnimation(WorldState.random(), yourRobot, memory);
```
@!82463cfa510d8d009a27f5ebbd461c50bfeef97e

if}}
@!7e33030dd7be5b35010a6f6163d3a67d175f53c2

{{hint
@!c71b771345192dafafe168c26b4e8f3c06d2cdef

{{index "robot efficiency (exercise)"}}
@!2c1b523ed1efce2d7e52289785abfae7651a2f51

The main limitation of `goalOrientedRobot` is that it only considers
one parcel at a time. It will often walk back and forth across the
village because the it need parcel it happens to be looking at happens
to be at the other side of the map, even if there are others much
closer.
@!24238de2fedc5ce528e3cc9dd36b3e14f2af0f48

One possible solution would be to compute routes for all packages, and
then take the shortest one. Even better results can be obtained by, if
there are multiple shortest routes, preferring the ones that go to
pick up a package, instead of delivering a package.
@!0103834ecd6f6f4ea713e958ac6eba9419dc3b65

hint}}
@!5e461445ace7fd3b900b2ee7c841105788de74ee

### Persistent map
@!5582a9f3cb33d15bd823cdb0c72fcde333e89b49

{{index "persistent map (exercise)", "persistent data structure", "Map class", "map (data structure)", "PMap class"}}
@!deae16280eaf10430877dd34c571c02317e54765

Most data structures provided in a standard JavaScript environment
aren't very well suited for persistent use. Arrays have `slice` and
`concat` methods, which allow us to easily create new arrays without
damaging the old one. But `Map`, for example, has no methods for
creating a new map with an item added or removed.
@!d5b3a6e100bd56385087b94735dbaef41b8df1c4

Write a new class `PMap`, which stores a mapping from keys to other
values, and, like `Map`, has a `get` method to retrieve a value and a
`has` method to check if a value is present.
@!c90d6c40e9fdaf1d428b687720f00c230ba6910c

Its `set` method, however, should return a _new_ `PMap` instance with
the given key added, and leave the old one unchanged. Similarly,
`delete` creates a new instance without a key.
@!a250735b236ab784464a2fbe84982ef081268ed6

The class should work for keys of any type, not just strings. It does
_not_ have to be efficient when used with large amounts of keys.
@!6d629ea7126fd9c041c07b6fdb0bbb630a21eadb

The ((constructor)) shouldn't be part of the class' ((interface))
(though you'll definitely want to use it internally). Instead, there
is an empty instance, `PMap.empty`, that can be used as a starting
value.
@!3690872af3e956cbad40a0a3e7f23e63efce480e

{{index singleton}}
@!68466e0f7c522a13925d67975a92e809a54eebc7

Why do you only need one `PMap.empty` value, rather than having a
function that creates a new, empty map every time?
@!d2de0974033b5064c94c277ae1de8eaa624b3ab3

{{if interactive
@!a9507d0a4533245d0c718b05e7f06f13e3d81ed0

```{test: no}
class PMap {
  // Your code here
}

let a = PMap.empty.set("a", 1);
let ab = a.set("b", 2);
let b = ab.delete("a");

console.log(b.get("b"));
// → 2
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false
```
@!9b2792c10cd4935a258c0e7ec9799b72639f64e1

if}}
@!ffe1fe24c05748e0d100e937278361ad3b2a2979

{{hint
@!086a774d00177c4148814023b56470c8db071376

{{index "persistent map (exercise)", "Map class", array}}
@!f36a5e0dd7b4640ee5dbf8f83deae4b8f6a0c30a

Since this needs to work with keys that aren't strings, you can't use
object properties to store the mapping. You could use a `Map` instance
inside your `PMap` instance, or an array that stores a set of pairs.
@!a8f3bdd757ebc5288994bf29a8177ce455f68236

I recommend using an array, since those are easy to copy. For each key
added to the map, the array would hold a `{key, value}` object or a
two-element array. When looking something up, you search the array for
the pair that contains the proper key.
@!80db68890a2b9d5ea9132c7d9644f7a3c29307e9

The class' ((constructor)) would then take such an array as argument,
and store it as the instance's (only) direct property. This array is
never updated. The `set` and `delete` methods create copies of it,
with the appropriate elements added and removed.
@!708dc58c7875ed94e0c5aa7d5b103bb5803ae56f

When writing `set`, make sure that you also remove old versions of the
key, in case a key that already exists is being set.
@!26b879c7e2cf94c124c12aea9589cf781e6b86ea

hint}}
@!103427719363066b4bbb7832f5182d555cbe5b6d