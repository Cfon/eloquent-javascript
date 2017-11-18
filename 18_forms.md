{{meta {chap_num: 18, prev_link: 17_http, next_link: 19_paint}}}
@!f9107e4388fb5e56ce2f19cea00010fc04fbea8c

# Forms and Form Fields
@!81623cf0f7dfcbb36230f7b1377023967156e305

{{quote {author: "Mephistopheles", title: "in Goethe's Faust", chapter: true}
@!1160fab7cc0fc4e01571ac655fb338c8e79039ab

I shall this very day, at Doctor's feast, +
My bounden service duly pay thee. +
But one thing!—For insurance’ sake, I pray thee, +
Grant me a line or two, at least.
@!a8b88a123f97ff70151aa9cd6b60c6bb15338024

quote}}
@!ad2dd0c64221230b669f04f1804dc267c41b3373

{{index "Goethe, Johann Wolfgang von", Mephistopheles, "page reload", form}}
@!47464e29d3881d557fd707785baade9b254f6ef5

Forms were introduced briefly in the
[previous chapter](17_http.html#http_forms) as a way to
_((submit))_ information provided by the user over ((HTTP)). They were
designed for a pre-JavaScript Web, assuming that interaction with the
server always happens by navigating to a new page.
@!35f0184a4a93e3bdb93dd4cf73d235008ffe1cbb

But their elements are part of the ((DOM)) like the rest of the page,
and the DOM elements that represent form ((field))s support a number
of properties and events that are not present on other elements. These
make it possible to inspect and control such input fields with JavaScript programs
and do things such as adding functionality to a traditional form or using forms
and fields as building blocks in a JavaScript application.
@!f2ad122e070039d3c51681698773d506e151a440

## Fields
@!75cbcf4894f1ba698663d0b1dd7145ebe7afd479

{{index "form (HTML tag)"}}
@!2f2c09954091db68fa74ebcabb5a59d1a837b396

A web form consists of any number of input
((field))s grouped in a `<form>` tag. HTML allows a number of
different styles of fields, ranging from simple on/off checkboxes to
drop-down menus and fields for text input. This book won't try to
comprehensively discuss all field types, but we will start with a rough
overview.
@!9a0e646739b12ed47da9a6d23f48adaba78de200

{{index "input (HTML tag)", "type attribute"}}
@!5d1b5eb23afb00a66fb48f8163499692eba21f88

A lot of field types use the 
`<input>` tag. This tag's `type` attribute is used to select the 
field's style. These are some commonly used `<input>` types:
@!da44e6b5c10bdd3ea7030769098f4d11d8ef9ffc

{{index "password field", checkbox, "radio button", "file field"}}
@!4b84bd826cb8537b8f7ba5877a8547aca206d549

{{table {cols: [1,5]}}}
@!ba2ac2dc76f53fdbc96aa80ffe8e07e00a3de6f3

| `text`     | A single-line ((text field))
| `password` | Same as `text` but hides the text that is typed
| `checkbox` | An on/off switch
| `radio`    | (Part of) a ((multiple-choice)) field
| `file`     | Allows the user to choose a file from their computer
@!4e261d213f9cb5bb453c03770478b6827dd53836

{{index "value attribute", "checked attribute", "form (HTML tag)"}}
@!9053796a87bbbde41cdf56a9ec3e8c64007c0860

Form
fields do not necessarily have to appear in a `<form>` tag. You can
put them anywhere in a page. Such fields cannot be ((submit))ted
(only a form as a whole can), but when responding to input with
JavaScript, we often do not want to submit our fields normally anyway.
@!79406fafbd9b727cb313fd9641583187e2102cde

```{lang: "text/html"}
<p><input type="text" value="abc"> (text)</p>
<p><input type="password" value="abc"> (password)</p>
<p><input type="checkbox" checked> (checkbox)</p>
<p><input type="radio" value="A" name="choice">
   <input type="radio" value="B" name="choice" checked>
   <input type="radio" value="C" name="choice"> (radio)</p>
<p><input type="file"> (file)</p>
```
@!81dac328a998d82c77565a9a061ffd43d5730f18

{{if book
@!05f59820c3b909aa43b09ce2727c8c445ae866f0

The fields created with this HTML code look like this:
@!3f1399deebab271af307320fc98ca6f5987f54ef

{{figure {url: "img/form_fields.png", alt: "Various types of input tags",width: "4cm"}}}
@!205da090d7cd0665f94a890ecdcd99a21348adfe

if}}
@!b404941fc35a6e6449e146cffe1dc517ccdc9945

The JavaScript interface for such elements differs with the type of
the element. We'll go over each of them later in the chapter.
@!dabca51421507581ac452597ee7e05df8d73e106

{{index "textarea (HTML tag)", "text field"}}
@!c9b8114850b2358d108bf7300cdc876807fb5dee

Multiline text fields have
their own tag, `<textarea>`, mostly because using an attribute to
specify a multiline starting value would be awkward. The `<textarea>`
requires a matching `</textarea>` closing tag and uses the text
between those two, instead of using its `value` attribute, as starting
text.
@!5d6fa26997c0b9886c3afb45f54a944e7b9e7a2c

```{lang: "text/html"}
<textarea>
one
two
three
</textarea>
```
@!bb5ab7eee7992dcc26f86c7d4acb83e4e0a7b7d0

{{index "select (HTML tag)", "option (HTML tag)", "multiple choice", "drop-down menu"}}
@!d4335fbfcd5a4ff1ea3734f215291dd214c8844d

Finally, the `<select>` tag is used to
create a field that allows the user to select from a number of
predefined options.
@!16be9dc8113352eed91ca0297c215cd51055d6ff

```{lang: "text/html"}
<select>
  <option>Pancakes</option>
  <option>Pudding</option>
  <option>Ice cream</option>
</select>
```
@!d57334054479e2a31e6585bf947fc27f0c242c47

{{if book
@!260d534ec4bd1cce644298fbc712b03e84b9f62a

Such a field looks like this:
@!86448ee2038d5bf9e939d1bf2212feb6db746597

{{figure {url: "img/form_select.png", alt: "A select field",width: "4cm"}}}
@!983c6febf97382948698f6648a09f977ca59818b

if}}
@!6a7926e5143857fb5a8efa7982e1ce53e46f8cca

{{index "change event"}}
@!d0fb5607bf050bd933ba250a488b61b698c02a80

Whenever the value of a form field changes, it fires
a `"change"` event.
@!43777c2b26404dfaf4d5858db084e5d2fafb6e26

## Focus
@!12550855454d78c70817359479d3ffe4d0cf1db6

{{index keyboard, focus}}
@!187fba31d236eaf428779af166354be9547788de

{{indexsee "keyboard focus", focus}}
@!522b5b0be76a246e0aa02f4696efc5ab563dba6c

Unlike most elements in an HTML document,
form fields can get _keyboard ((focus))_. When clicked—or activated in
some other way—they become the currently active element, the main
recipient of keyboard ((input)).
@!9590528cc8ae6f13e1c65a389bcfa2c8e793d236

{{index "option (HTML tag)", "select (HTML tag)"}}
@!d8ad27b056e92582d654ee1f9fcf06600c418145

If a document has a
((text field)), text typed will end up in there only  when the field is
focused. Other fields respond differently to keyboard events. For
example, a `<select>` menu tries to move to the option that contains
the text the user typed and responds to the arrow keys by moving its
selection up and down.
@!244e12e7eb59375411ed5a8f104ae61b9d6b87f6

{{index "focus method", "blur method", "activeElement property"}}
@!1a119fd8f86eb612d4f2eaffeda58641623334c6

We can
control ((focus)) from JavaScript with the `focus` and `blur` methods.
The first moves focus to the DOM element it is called on, and the second
removes focus. The value in `document.activeElement` corresponds to
the currently focused element.
@!6a6aa07c860aff59ac77434e4521039f31755c4c

```{lang: "text/html"}
<input type="text">
<script>
  document.querySelector("input").focus();
  console.log(document.activeElement.tagName);
  // → INPUT
  document.querySelector("input").blur();
  console.log(document.activeElement.tagName);
  // → BODY
</script>
```
@!b192af67e5eb190587f371f69939efa5444b8237

{{index "autofocus attribute"}}
@!0a8c39f1cfd977a074703beb68184faa61ea597b

For some pages, the user is expected to
want to interact with a form field immediately.
JavaScript can be used to ((focus)) this field when the document is
loaded, but HTML also provides the `autofocus` attribute, which
produces the same effect but lets the browser know what we are trying
to achieve. This makes it possible for the browser to disable the
behavior when it is not appropriate, such as when the user has focused
something else.
@!5958174e2466d9c06f3e98a6ad1d1050fbf3f854

```{lang: "text/html", focus: true}
<input type="text" autofocus>
```
@!5614c78ff35db10ac58acbc992dad34f9abb0835

{{index "tab key", keyboard, "tabindex attribute", "a (HTML tag)"}}
@!46bc0810859c463b5700696631f198906501a0f1

Browsers traditionally also allow the user to move the focus
through the document by pressing the Tab key. We can influence the
order in which elements receive focus with the `tabindex` attribute.
The following example document will let focus jump from the text input to
the OK button, rather than going through the help link first:
@!e7263b06a2a71cd68f9e0214ab503a5988a3c8b1

```{lang: "text/html", focus: true}
<input type="text" tabindex=1> <a href=".">(help)</a>
<button onclick="console.log('ok')" tabindex=2>OK</button>
```
@!c7f0c1fca9f4215a123fe2dd25b103cc56def07f

{{index "tabindex attribute"}}
@!11370db577bf49d01d5b68a50cc8eb230a8d9559

By default, most types of HTML elements cannot
be focused. But you can add a `tabindex` attribute to any element,
which will make it focusable.
@!b1a14332d060180289eed5f5050e2af544b1b91c

## Disabled fields
@!abc75f82a315201cf27d707d697e096e52a37f3f

{{index "disabled attribute"}}
@!427b24f8dcf805d9eeda6f3b0208c025cf857b02

All ((form)) ((field))s can be _disabled_
through their `disabled` attribute, which also exists as a property on
the element's DOM object.
@!b2aa0b4066ac3738a02be935471ada87c0596b66

```{lang: "text/html"}
<button>I'm all right</button>
<button disabled>I'm out</button>
```
@!270f10eb7371baf18ace6b7b7e7d70d7db432bf8

Disabled fields cannot be ((focus))ed or changed, and unlike active
fields, they usually look gray and faded.
@!266b55ce0f24fdaa3b8fe964e46fec1cdcd4879b

{{if book
@!a4ae3c8cc5eac8f9b20f18439a40255a667abb8e

{{figure {url: "img/button_disabled.png", alt: "A disabled button",width: "3cm"}}}
@!c855a5c45b3ac5b4bc2bc90f2c043d2ee5708253

if}}
@!b7a3c71215cee97afa310b447a244af3df813529

{{index "user experience", "asynchronous programming"}}
@!9353b307f90c3379613c57f4eb332b9719f13983

When a program is
in the process of handling an action caused by some ((button)) or other control,
which might require communication with the server and thus take a
while, it can be a good idea to
disable the control until the action finishes. That way, when the user
gets impatient and clicks it again, they don't accidentally repeat
their action.
@!76cabef6934eec6778e880b909d43e6c35feea05

## The form as a whole
@!67235e91a2944efbc4a66ffbfe99fbcd8ef064dd

{{index "array-like object", "form (HTML tag)", "form property", "elements property"}}
@!c0226ee90bc02d6b017b58577d6dcbcac5923104

When a ((field)) is contained in a
`<form>` element, its DOM element will have a property `form` linking
back to the form's DOM element. The `<form>` element, in turn, has a
property called `elements` that contains an array-like collection of the fields
inside it.
@!78faae876b6fa76f95f70010c605c8c7e45751a3

{{index "elements property", "name attribute"}}
@!184fb90de0b4b46b606ee3f924a78c4cf314832a

The `name` attribute of a
form field determines the way its value will be identified when the
form is ((submit))ted. It can also be used as a property name when
accessing the form's `elements` property, which acts both as an
array-like object (accessible by number) and a ((map)) (accessible by
name).
@!69cbce4f0e9f7be8b02d16afff244aeb34d4c6ad

```{lang: "text/html"}
<form action="example/submit.html">
  Name: <input type="text" name="name"><br>
  Password: <input type="password" name="password"><br>
  <button type="submit">Log in</button>
</form>
<script>
  var form = document.querySelector("form");
  console.log(form.elements[1].type);
  // → password
  console.log(form.elements.password.type);
  // → password
  console.log(form.elements.name.form == form);
  // → true
</script>
```
@!3e72fab02b332beb47dc1f011ce344325c5b576c

{{index "button (HTML tag)", "type attribute", submit, "Enter key"}}
@!c4228e3eefbb706ceeb12dc09b908a37e69f19a7

A button with a `type` attribute of `submit` will, when pressed,
cause the form to be submitted. Pressing Enter when a form field is
focused has the same effect.
@!8015d444d03184642f833d2ae559cb626bc4fdb8

{{index "submit event", "event handling", "preventDefault method", "page reload", "GET method", "POST method"}}
@!92d79e80ad879192c268074535aa11d9ecf1cd71

Submitting
a ((form)) normally means that the
((browser)) navigates to the page indicated by the form's `action`
attribute, using either a `GET` or a `POST` ((request)). But before
that happens, a `"submit"` event is fired. This event can be handled
by JavaScript, and the handler can prevent the default behavior by
calling `preventDefault` on the event object.
@!94849e8e5e6d4b61123bcfd5a20c27b631704857

```{lang: "text/html"}
<form action="example/submit.html">
  Value: <input type="text" name="value">
  <button type="submit">Save</button>
</form>
<script>
  var form = document.querySelector("form");
  form.addEventListener("submit", function(event) {
    console.log("Saving value", form.elements.value.value);
    event.preventDefault();
  });
</script>
```
@!cd1ed44ddc7b69f28fbe38304db504d0ebd9736f

{{index "submit event", validation, XMLHttpRequest}}
@!694cf71f2ea01a96f9bcdedc5e0900a97b02bb3b

Intercepting
`"submit"` events in JavaScript has various uses. We can write code to
verify that the values the user entered make sense and immediately
show an error message instead of submitting the form when they don't.
Or we can disable the regular way of submitting the form entirely, as
in the previous example, and have our program handle the input, possibly
using `XMLHttpRequest` to send it over to a server without reloading
the page.
@!8a72b741dd89ae3a6963e7d0104464cce64eb6c9

## Text fields
@!451589ecdb300a9a7207b045d1357fd7664d0d03

{{index "value attribute", "input (HTML tag)", "text field", "textarea (HTML tag)"}}
@!80f0862622a78d648ac9fe78b10949228151f95b

Fields created by `<input>` tags with a type of `text` or
`password`, as well as `textarea` tags, share a common ((interface)).
Their ((DOM)) elements have a `value` property that holds their
current content as a string value. Setting this property to another string
changes the field's content.
@!35f580845af3ed5e34670ee51cad5d2251f3ca4d

{{index "selectionStart property", "selectionEnd property"}}
@!a21b5a6516a9330408e4f79186f536a722ce4b8f

The
`selectionStart` and `selectionEnd` properties of ((text field))s give
us information about the ((cursor)) and ((selection)) in the ((text)).
When nothing is selected, these two properties hold the same number,
indicating the position of the cursor. For example, 0 indicates the
start of the text, and 10 indicates the cursor is after the 10^th^ ((character)).
When part of the field is selected, the two properties will differ, giving us the
start and end of the selected text. Like `value`, these properties may
also be written to.
@!5f3eaf2a84d3975e2422de9ee427986a275c4625

{{index Khasekhemwy, "textarea (HTML tag)", keyboard, "event handling"}}
@!6aff30ccebaf5d2c480d0da7ec6c51a56859d644

As an example, imagine you
are writing an article about Khasekhemwy but have some
trouble spelling his name. The following code wires up a `<textarea>` tag
with an event handler that, when you press F2, inserts the string
“Khasekhemwy” for you.
@!b3736ad8f3758039c86c426446c2650d6360a8d0

```{lang: "text/html"}
<textarea></textarea>
<script>
  var textarea = document.querySelector("textarea");
  textarea.addEventListener("keydown", function(event) {
    // The key code for F2 happens to be 113
    if (event.keyCode == 113) {
      replaceSelection(textarea, "Khasekhemwy");
      event.preventDefault();
    }
  });
  function replaceSelection(field, word) {
    var from = field.selectionStart, to = field.selectionEnd;
    field.value = field.value.slice(0, from) + word +
                  field.value.slice(to);
    // Put the cursor after the word
    field.selectionStart = field.selectionEnd =
      from + word.length;
  }
</script>
```
@!a434dfa261159b819e68b2925e5b72e807d0e37a

{{index "replaceSelection function", "text field"}}
@!2fdd1b8ee50e4e7f9fb80702fbb62e2436d384d1

The `replaceSelection`
function replaces the currently selected part of a text field's
content with the given word and then moves the ((cursor)) after that
word so that the user can continue typing.
@!11a6bb53294405d3c28997938249cb0a27761f53

{{index "change event", "input event"}}
@!c329b59da1a16fa9419768f1a95a34c96d44da29

The `"change"` event for a ((text
field)) does not fire every time something is typed. Rather, it
fires when the field loses ((focus)) after its content was changed.
To respond immediately to changes in a text field, you should register
a handler for the `"input"` event instead, which fires for every
time the user types a character, deletes text, or otherwise manipulates
the field's content.
@!ee5231b2e3c0def83f007ef1bf6be50fe3f82b7c

The following example  shows a text field and a counter showing the current
length of the text entered:
@!1ef09e34feaf0c906f3e1b2e3db8e3c79b16c0ad

```{lang: "text/html"}
<input type="text"> length: <span id="length">0</span>
<script>
  var text = document.querySelector("input");
  var output = document.querySelector("#length");
  text.addEventListener("input", function() {
    output.textContent = text.value.length;
  });
</script>
```
@!fff003c2bac136842733cf4054624698befb3b01

## Checkboxes and radio buttons
@!bae5f8b8841cdf33363519eeeff601eb6bffd474

{{index "input (HTML tag)", "checked attribute"}}
@!ca2ac67559af6cab221ad24279aebcfb1d38f82a

A ((checkbox)) field is a
simple binary toggle. Its value can be extracted or changed through
its `checked` property, which holds a Boolean value.
@!a32d10605d87e98f84b0ecc76b720803cb1e0739

```{lang: "text/html"}
<input type="checkbox" id="purple">
<label for="purple">Make this page purple</label>
<script>
  var checkbox = document.querySelector("#purple");
  checkbox.addEventListener("change", function() {
    document.body.style.background =
      checkbox.checked ? "mediumpurple" : "";
  });
</script>
```
@!482e74c082022699a41ebaebfd2b59285365fa8f

{{index "for attribute", "id attribute", focus, "label (HTML tag)", labeling}}
@!60aed72eff8396e2f303b946f729a3f42fc851d5

The `<label>` tag is used to associate a piece of
text with an input ((field)). Its `for` attribute should refer to the
`id` of the field. Clicking the label will activate the field, which focuses
it and toggles its value when it is a checkbox or radio button.
@!e6a35980cd6d4b28fdf6ab6851db99e367203983

{{index "input (HTML tag)", "multiple-choice"}}
@!eb2b7042d3cde67058ec68ca5ce4261d780b0e00

A ((radio button)) is
similar to a checkbox, but it's implicitly linked to other radio buttons
with the same `name` attribute so that only one of them can be active
at any time.
@!448c873e136e3bf7180fabe0299dfab6e82500ea

```{lang: "text/html"}
Color:
<input type="radio" name="color" value="mediumpurple"> Purple
<input type="radio" name="color" value="lightgreen"> Green
<input type="radio" name="color" value="lightblue"> Blue
<script>
  var buttons = document.getElementsByName("color");
  function setColor(event) {
    document.body.style.background = event.target.value;
  }
  for (var i = 0; i < buttons.length; i++)
    buttons[i].addEventListener("change", setColor);
</script>
```
@!ecf72ef22102557979ddd48f07dec490e9d4c0be

{{index "getElementsByName method", "name attribute", "array-like object", "event handling", "target property"}}
@!f3e0587d034cb5e81a6cec32d93c54265f6a1176

The
`document.getElementsByName` method gives us all elements with a given
`name` attribute. The example loops over those (with a regular `for`
loop, not `forEach`, because the returned collection is not a real
array) and registers an event handler for each element. Remember that
event objects have a `target` property referring to the element that
triggered the event. This is often useful in event handlers like this
one, which will be called on different elements and need some way to
access the current target.
@!b4b767785ec1b15988201eabe2be8e58e96dd878

## Select fields
@!f3e472de9a494b2eaadf2aadf9ab64e3486f9223

{{index "select (HTML tag)", "multiple-choice", "option (HTML tag)"}}
@!d7c9b5edb7f8688b00cc900b62ca097c0d12253d

Select fields are conceptually similar to radio buttons—they
also allow the user to choose from a set of options. But where a radio
button puts the layout of the options under our control, the
appearance of a `<select>` tag is determined by the browser.
@!e7211386c343b05b33a2f1049be80f15717e17a3

{{index "multiple attribute"}}
@!244f41442ad1c48aeeca270a80b347858eb6ff1b

Select fields also have a variant that is more
akin to a list of checkboxes, rather than radio boxes. When given the
`multiple` attribute, a `<select>` tag will allow the user to select
any number of options, rather than just a single option.
@!1eb343958810182f567e3678e7399eb17c19ca50

```{lang: "text/html"}
<select multiple>
  <option>Pancakes</option>
  <option>Pudding</option>
  <option>Ice cream</option>
</select>
```
@!384bcafda66e3ba20c6fd9bfe481af8dd929de9a

{{index "select (HTML tag)", "drop-down menu"}}
@!d8d443b04e88aa59640845a6192019fbffdfcc2a

This
will, in most browsers, show up differently than a non-`multiple`
select field, which is commonly drawn as a _drop-down_ control that
shows the options only when you open it.
@!2e57bf814ef72827f1e449a5b4750bf3860a5096

{{if book
@!3ecfdb5768384371011f67accb2276575f255c2d

{{figure {url: "img/form_multi_select.png", alt: "A multiple select field",width: "5cm"}}}
@!e71a9604b55b005fa227aebbc7cde1d613109e26

if}}
@!9abb230ae10740f18419780038d88350a15b6684

{{index "size attribute"}}
@!32f8b78887653d50c8fa8df5170221c3a63d41d8

The `size` attribute to the
`<select>` tag is used to set the number of options that are visible at 
the same time, which gives you explicit control over the drop-down's appearance. For example,
setting the `size` attribute to `"3"` will make the field show three lines, whether it
has the `multiple` option enabled or not.
@!99ab92ea73e115125f644d362b4ce7852b036654

{{index "option (HTML tag)", "value attribute"}}
@!5f3159f9a3879fc91b550d1b22b6da4911c8a338

Each `<option>` tag has a
value. This value can be defined with a `value` attribute, but when
that is not given, the ((text)) inside the option will count as the
option's value. The `value` property of a `<select>` element reflects
the currently selected option. For a `multiple` field, though, this
property doesn't mean much since it will give the value of only _one_
of the currently selected options.
@!8da40b6182ae05c621d325e91fa389d1b5b566d2

{{index "select (HTML tag)", "options property", "selected attribute"}}
@!95974ffcbd9daa3af38b7325e953ef2581a32376

The `<option>` tags for a `<select>` field can be accessed
as an array-like object through the field's `options` property. Each option
has a property called `selected`, which indicates whether that option is
currently selected. The property can also be written to select or
deselect an option.
@!36d791e5a8b7957a9a3567915d919347ca4b4428

{{index "multiple attribute", "binary number"}}
@!c1f95afae3c689375d1255c55f1dac20b567a807

The following example extracts
the selected values from a `multiple` select field and uses them to
compose a binary number from individual bits. Hold Ctrl (or Command
on a Mac) to select multiple options.
@!290ed9082242258b6ccdf6c27dd3e5d3e07826e6

```{lang: "text/html"}
<select multiple>
  <option value="1">0001</option>
  <option value="2">0010</option>
  <option value="4">0100</option>
  <option value="8">1000</option>
</select> = <span id="output">0</span>
<script>
  var select = document.querySelector("select");
  var output = document.querySelector("#output");
  select.addEventListener("change", function() {
    var number = 0;
    for (var i = 0; i < select.options.length; i++) {
      var option = select.options[i];
      if (option.selected)
        number += Number(option.value);
    }
    output.textContent = number;
  });
</script>
```
@!0e79d52ac983dfaa6c36783792518c5c4c61279a

## File fields
@!226dba7c494ccc47105d32d5bb611e5a9456b862

{{index file, "hard drive", "file system", security, "file field", "input (HTML tag)"}}
@!b148323b4928cfd6bb3c93c04637b966a7779b6c

File fields were originally designed as
a way to ((upload)) files from the browser's machine through a form.
In modern browsers, they also provide a way to read such files from
JavaScript programs. The field acts as a manner of gatekeeper. The
script cannot simply start reading private files from the user's
computer, but if the user selects a file in such a field, the browser
interprets that action to mean that the script may read the file.
@!b89119f412e18dc00df9e996aa2a678eba135152

A file field usually looks like a button labeled with something like
“choose file” or “browse”, with information about the chosen file next
to it.
@!a9e56df15c902a0d68e3cd89fad0bbabf0896cf5

```{lang: "text/html"}
<input type="file">
<script>
  var input = document.querySelector("input");
  input.addEventListener("change", function() {
    if (input.files.length > 0) {
      var file = input.files[0];
      console.log("You chose", file.name);
      if (file.type)
        console.log("It has type", file.type);
    }
  });
</script>
```
@!59a90137758cc8594be84d8096043ea346a0c5ea

{{index "multiple attribute", "files property"}}
@!5d60fb8f44ffd38ef9d98102108b12ad14e25249

The `files` property of a
((file field)) element is an ((array-like object)) (again, not a real
array) containing the files chosen in the field. It is initially
empty. The reason there isn't simply a `file` property is that file
fields also support a `multiple` attribute, which makes it possible to
select multiple files at the same time.
@!d6504727c450cfe1edeccd0cfbe9e3839aa3ac58

{{index "File type"}}
@!98f311d856169ec61f371170a332947568294f11

Objects in the `files` property have properties such as
`name` (the filename), `size` (the file's size in bytes), and `type`
(the media type of the file, such as `text/plain` or `image/jpeg`).
@!342b2494baba9b16daee15421813d531d3c6edf4

{{index "asynchronous programming", "file reading", "FileReader type"}}
@!6356639b187fada14bf6b8a7b100712e14070468

{{id filereader}}
@!4326e6be5b02d8db196629017066c0481687365a

What it does not have is a property that contains the content
of the file. Getting at that is a little more involved. Since reading
a file from disk can take time, the interface will have to be
asynchronous to avoid freezing the document. You can think of the
`FileReader` constructor as being similar to `XMLHttpRequest` but for
files.
@!b619c3411adcc6b05b24ee596106569adec4ace5

```{lang: "text/html"}
<input type="file" multiple>
<script>
  var input = document.querySelector("input");
  input.addEventListener("change", function() {
    Array.prototype.forEach.call(input.files, function(file) {
      var reader = new FileReader();
      reader.addEventListener("load", function() {
        console.log("File", file.name, "starts with",
                    reader.result.slice(0, 20));
      });
      reader.readAsText(file);
    });
  });
</script>
```
@!de104975829c803ad9faeffa611aec1f4fcde986

{{index "FileReader type", "load event", "readAsText method", "result property"}}
@!f5412801198ec4c295eee65aab5f618476cfcfd7

Reading a file is done by creating a `FileReader` object,
registering a `"load"` event handler for it, and calling its
`readAsText` method, giving it the file we want to read. Once loading
finishes, the reader's `result` property contains the file's content.
@!6e15b8934bea719fc6ad2c499b9f3cd0dc091f2b

{{index "forEach method", "array-like object", closure}}
@!5efbaa21134c2f654a22f6fd6adb3090fd35a658

The example
uses `Array.prototype.forEach` to iterate over the array since in a
normal loop it would be awkward to get the correct `file` and `reader`
objects from the event handler. The variables would be shared by all
iterations of the loop.
@!6cf370f5bffbc4a8d92b45a39000c024035812ba

{{index "error event", "FileReader type", promise}}
@!da6dd186a58741557db974c2496854d0954c8401

_FileReader_s
also fire an `"error"` event when reading the file fails for any
reason. The error object itself will end up in the reader's `error`
property. If you don't want to remember the details of yet another
inconsistent asynchronous interface, you could wrap it in a `Promise` (see
[Chapter 17](17_http.html#promises)) like this:
@!f77e2be61146d954e9d54bc5fc452dd572a19837

```
function readFile(file) {
  return new Promise(function(succeed, fail) {
    var reader = new FileReader();
    reader.addEventListener("load", function() {
      succeed(reader.result);
    });
    reader.addEventListener("error", function() {
      fail(reader.error);
    });
    reader.readAsText(file);
  });
}
```
@!cf6387de8869e5dc5fab8ab8b5d318fc074d94a2

{{index "slice method", "Blob type"}}
@!86997b1cb98b0eed99b2dac89038fff069d6735f

It is possible to read only part of a
file by calling `slice` on it and passing the result (a
so-called _blob_ object) to the file reader.
@!3cdb9ac48441785707c01187c36020ed7e641456

## Storing data client-side
@!d728cb51eb311cb02f928d1321115b52b3bc57ee

{{index "web application"}}
@!8ac3b431ca1cddb92b3f64d6ba15ab058ffc4cc7

Simple ((HTML)) pages with a bit of JavaScript
can be a great medium for “((mini application))s”—small helper programs
that automate everyday things. By connecting a few form ((field))s
with event handlers, you can do anything from converting between
degrees Celsius and Fahrenheit to computing passwords from a master
password and a website name.
@!288bca2a03fed28364bc195ba736af350cb4cdb6

{{index persistence, memory}}
@!8404304e577e00f3ab934bd55d874bec905ee141

When such an application needs to
remember something between sessions, you cannot use JavaScript
((variable))s since those are thrown away every time a page is
closed. You could set up a server, connect it to the Internet, and
have your application store something there. We will see how to do
that in [Chapter 20](20_node.html#node). But this adds a lot of
extra work and complexity. Sometimes it is enough to just keep the
data in the ((browser)). But how?
@!ed515937648b96314c6603279269552954eac2cb

{{index "localStorage object", "setItem method", "getItem method", "removeItem method"}}
@!3e9762ba4703295b1f847a697e96aab7e68ce2ac

You can store string data in a way
that survives ((page reload))s by putting it in the `localStorage`
object. This object allows you to file string values under names (also
strings), as in this example:
@!e60bba38a8a577f28f6b6cfaa1ffba0827b46441

```
localStorage.setItem("username", "marijn");
console.log(localStorage.getItem("username"));
// → marijn
localStorage.removeItem("username");
```
@!eb8ec4cb6143b4b8e63c8f0e9c3f855fdcc60732

{{index "localStorage object"}}
@!325ce13bef53acde5240e0b70ac8af34bd3085f9

A value in `localStorage` sticks around until
it is overwritten, it is removed with `removeItem`, or the user clears
their local data.
@!4b18eafe5b52de22a04a0ee77092ca9ee3a2d540

{{index security}}
@!a6d7b3966a00d1f2e128e2751b4800944fcfd289

Sites from different ((domain))s get different storage
compartments. That means data stored in `localStorage` by a given
website can, in principle, only be read (and overwritten) by scripts on
that same site.
@!f9295df630c3f69000f8e002e95a113b947a7f54

{{index "localStorage object"}}
@!9dbb59c3f5a62fb8ca2ce564b0316617e51c6cc3

Browsers also enforce a limit on the size of
the data a site can store in `localStorage`, typically on the order of
a few megabytes. That restriction, along with the fact that filling up
people's ((hard drive))s with junk is not really profitable, prevents
this feature from eating up too much space.
@!10d29cbe36a3a9a1512a0cccd2552b5432881370

{{index "localStorage object", "note-taking example", "select (HTML tag)", "button (HTML tag)", "textarea (HTML tag)"}}
@!9d194ddb4dfdf271284a7c62ac5d4dfdb64a6636

The following code 
implements a simple note-taking application. It keeps the user's notes
as an object, associating note titles with content strings. This object
is encoded as ((JSON)) and stored in `localStorage`. The user can
select a note from a `<select>` field and change that note's text in
a `<textarea>`. A note can be added by clicking a button.
@!d99d74d16ec322ff6dff4da02e2afc27fc125488

```{lang: "text/html", startCode: true}
Notes: <select id="list"></select>
<button onclick="addNote()">new</button><br>
<textarea id="currentnote" style="width: 100%; height: 10em">
</textarea>

<script>
  var list = document.querySelector("#list");
  function addToList(name) {
    var option = document.createElement("option");
    option.textContent = name;
    list.appendChild(option);
  }

// Initialize the list from localStorage
  var notes = JSON.parse(localStorage.getItem("notes")) ||
              {"shopping list": ""};
  for (var name in notes)
    if (notes.hasOwnProperty(name))
      addToList(name);

function saveToStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

var current = document.querySelector("#currentnote");
  current.value = notes[list.value];

list.addEventListener("change", function() {
    current.value = notes[list.value];
  });
  current.addEventListener("change", function() {
    notes[list.value] = current.value;
    saveToStorage();
  });

function addNote() {
    var name = prompt("Note name", "");
    if (!name) return;
    if (!notes.hasOwnProperty(name)) {
      notes[name] = "";
      addToList(name);
      saveToStorage();
    }
    list.value = name;
    current.value = notes[name];
  }
</script>
```
@!df79565b05bb3216f151c9d11d0d9d850b76a3d2

{{index "getItem method", JSON, "|| operator", "default value"}}
@!b4cb54d6c03f2fa49a0d8e39f2e8867b88c511c2

The
script initializes the `notes` variable to the value stored in
`localStorage` or, if that is missing, to a simple object with only an
empty `"shopping list"` note in it. Reading a field that does not
exist from `localStorage` will yield `null`. Passing `null` to
`JSON.parse` will make it parse the string `"null"` and return
`null`. Thus, the `||` operator can be used to provide a default value
in a situation like this.
@!83ef0a745b85071122f43e56272ee8e7b7d00e67

{{index optimization, "localStorage object", "setItem method"}}
@!1fdf2bef480d9f7759fa275ce7b3f3586608be9b

Whenever the note data changes (when a new note is added or
an existing note changed), the `saveToStorage` function is called to
update the storage field. If this application was intended to handle
thousands of notes, rather than a handful, this would be too
expensive, and we'd have to come up with a more complicated way to
store them, such as giving each note its own storage field.
@!780b8806f45121341774d8e29ed6d6be7c6c654d

{{index "change event"}}
@!0a87a2bde88a806a90cd5ea73e9bb83053fceb31

When the user adds a new note, the code must update
the text field explicitly, even though the `<select>` field has a
`"change"` handler that does the same thing. This is necessary because
`"change"` events fire only when the _user_ changes the field's value,
not when a script does it.
@!822ddb5b1d4e771abeeee0c1d3b13de5ca49cb09

{{index "sessionStorage object"}}
@!1c1d099a299dc8e413b6f9406ec7f871d326e65a

There is another object similar to
`localStorage` called `sessionStorage`. The difference between the two
is that the content of `sessionStorage` is forgotten at the end of
each ((session)), which for most ((browser))s means whenever the
browser is closed.
@!6942030a1b46fb0a0f3519a003f9366133e15bf7

## Summary
@!35486262ce44cf0a2b1460d1e27a4cd6bd2dc53d

HTML can express various types of form fields, such as text fields,
checkboxes, multiple-choice fields, and file pickers.
@!80a8882d8db44c46eaa885297bb6786b90c4e3b1

Such fields can be inspected and manipulated with JavaScript. They
fire the `"change"` event when changed, the `"input"` event when text is
typed, and  various keyboard events. These events allow us to
notice when the user is interacting with the fields. Properties like `value`
(for text and select fields) or `checked` (for checkboxes and radio
buttons) are used to read or set the field's content.
@!0a6b76dd08d5a72e419a396cfb394f51a21d2506

When a form is submitted, its `"submit"` event fires. A JavaScript
handler can call `preventDefault` on that event to prevent the submission from
happening. Form field elements do not have to be wrapped in `<form>`
tags.
@!d627e754a9caa9748687a9d01bc98bac9777756c

When the user has selected a file from their local file system in a
file picker field, the `FileReader` interface can be used to access
the content of this file from a JavaScript program.
@!3c353c7770b83c0ab5c520ecf36c784ccfd69199

The `localStorage` and `sessionStorage` objects can be used to save
information in a way that survives page reloads. The first saves the
data forever (or until the user decides to clear it), and the second saves
it until the browser is closed.
@!485cc73c8a3a90e406cd1c96b87874fd1d1aac02

## Exercises
@!4bdd38e2f9a6ec35557eb30378f73c105768ef2b

### A JavaScript workbench
@!af89892e6adb1792683608b72bdb84dc254697b5

{{index "JavaScript console", "workbench (exercise)"}}
@!1f237d5cf0f0003e2642fb590f4c8732c7582d25

Build an interface
that allows people to type and run pieces of JavaScript code.
@!77e437548eed644842cfda8366590b9f1b684a98

{{index "textarea (HTML tag)", "button (HTML tag)", "Function constructor", "error message"}}
@!dacc0d32afcb9c6aa0af0045dcb29f9a0f9edf84

Put a button next to a `<textarea>`
field, which, when pressed, uses the `Function` constructor we saw in
[Chapter 10](10_modules.html#eval) to wrap the text in a function
and call it. Convert the return value of the function, or any error it
raised, to a string and display it after the text field.
@!1913aad41b344d246ccb8a500f20458bc2f93b9e

{{if interactive
@!1730cbeddfdaee8793a262505da93c7fc87c35cc

```{lang: "text/html", test: no}
<textarea id="code">return "hi";</textarea>
<button id="button">Run</button>
<pre id="output"></pre>

<script>
  // Your code here.
</script>
```
@!3391828c01f5f902095a882f8bbb859036c7764d

if}}
@!59c34c997129ed623f1a3f8de7da7250dd2ca774

{{hint
@!d48d6310fda7c767d0e00cc81d50dd285266b66b

{{index "click event", "mousedown event", "Function constructor", "workbench (exercise)"}}
@!f7aca12312c45817c3e9ce8768d616318cc05433

Use `document.querySelector`
or `document.getElementById` to get access to the elements defined in
your HTML. An event handler for `"click"` or `"mousedown"` events on
the button can get the `value` property of the text field and call
`new Function` on it.
@!e59bf495594be08edd38b762c55c7b6235c2cae8

{{index "try keyword", "exception handling"}}
@!185d5cb7dd8e7bd68ac7dcf8866dadf9e743229c

Make sure you wrap both the
call to `new Function` and the call to its result in a `try` block so
that you can catch exceptions that it produces. In this case, we
really don't know what type of exception we are looking for, so catch
everything.
@!3dfc8e3e9ba8537905df65ce3bc6ea96ca4444c7

{{index "textContent property", output, text, "createTextNode method", "newline character"}}
@!745cd9594a684e9d4f47f1e5505bd8324b42d786

The `textContent` property of the
output element can be used to fill it with a string message. Or, if
you want to keep the old content around, create a new text node using
`document.createTextNode` and append it to the element. Remember to
add a newline character to the end so that not all output appears on
a single line.
@!0b69c7004306ad3907a4585d6dbe6a9a8ea59003

hint}}
@!ce06ba656586617087eea09fa6c25549641fb8ad

### Autocompletion
@!8f7b286915bccc307408bfa9e8f29dfc3bc44f66

{{index completion, "autocompletion (exercise)"}}
@!7bf3ac4263b5b661a3d389ed48c6d4c3691f0b6b

Extend a ((text field))
so that when the user types, a list of suggested values is shown below
the field. You have an array of possible values available and should show those
that start with the text that was typed. When a ((suggestion)) is
clicked, replace the text field's current value with it.
@!17dbfbed7223e05bf94062c888ca9ada12b25678

{{if interactive
@!665dae16095c27ab381ea76a1ed0538fe9972477

```{lang: "text/html", test: no}
<input type="text" id="field">
<div id="suggestions" style="cursor: pointer"></div>

<script>
  // Builds up an array with global variable names, like
  // 'alert', 'document', and 'scrollTo'
  var terms = [];
  for (var name in window)
    terms.push(name);

// Your code here.
</script>
```
@!0c4bdb49dbe7db977b5846605f8ac818843b4e22

if}}
@!0b9d56bd5ca02685d9b2ab44252767bf3ca36a69

{{hint
@!34b40b69f722ed90fb49bd6259974c2fdb67ae7a

{{index "input event", "autocompletion (exercise)"}}
@!97b8e4d3c07b62025d6401194d2b02270ba4dce3

The best event for
updating the suggestion list is `"input"` since that will fire
immediately when the content of the field is changed.
@!98c9b521e087dc80e04405e198b11f75de6ee66e

{{index "indexOf method", "textContent property"}}
@!6d2bc7ee8274f2173acba199266506d7e48533ca

Then loop over the array
of terms and see whether they start with the given string. For example, you
could call `indexOf` and see whether the result is zero. For each matching
string, add an element to the suggestions `<div>`. You should probably
also empty that each time you start updating the suggestions, for
example by setting its `textContent` to the empty string.
@!675765229728dd8ddea6a8e265a0b4ab4e4455ff

{{index "click event", mouse, "target property"}}
@!75fdf7307075de97c44eb37aa40b2f5221671110

You could either add
a `"click"` event handler to every suggestion element or add a single
one to the outer `<div>` that holds them and look at the `target`
property of the event to find out which suggestion was clicked.
@!5842ac022ca51473f914193d596ebbf38f547d55

{{index attribute}}
@!dfee0d6f31b3d21c24e96628e30afef7137a643a

To get the suggestion text out of a DOM node, you could
look at its `textContent` or set an attribute to explicitly store the
text when you create the element.
@!d4d6d994654695e3566924da41155f9fed9ad32c

hint}}
@!364403f67971376076de3368fd01d2b3e2b462a7

### Conway's Game of Life
@!ebb2ffb429920f8ec5d6a8a59d6b3e7b613a48c3

{{index "game of life (exercise)", "artificial life", "Conway's Game of Life"}}
@!8468aac960260982f5c3d416c47d4c9ba3933101

Conway's Game of Life is a simple ((simulation)) that creates
artificial “life” on a ((grid)), each cell of which is either live or
not. Each ((generation)) (turn), the following rules are applied:
@!31cf44e524cd8a39b6b42743a8225dc7cd626a0c

* Any live ((cell)) with fewer than two or more than three live
  ((neighbor))s dies.
@!665592d14f96d072fc30a62134fbf4e93fc68861

* Any live cell with two or three live neighbors lives on to the
  next generation.
@!1bda2999dc556c83a167058d42720aef9e3192e6

* Any dead cell with exactly three live neighbors becomes a live
  cell.
@!b54ae0770efbe537938aa2eeffa25922d3e8fdd2

A neighbor is defined as any adjacent cell, including diagonally
adjacent ones.
@!fcd1ce9539b556bcf8790d6f62b8a1b6512e1aac

{{index "pure function"}}
@!3b2920a642fef31e4627e610dc692d47fdfbea92

Note that these rules are applied to the whole grid
at once, not one square at a time. That means the counting of
neighbors is based on the situation at the start of the generation,
and changes happening to neighbor cells during this generation should not
influence the new state of a given cell.
@!9c34d6a3e780541987ded5c9c5be6c5d0fe52dc8

{{index "Math.random function"}}
@!88ac4635c7e163b0e9c61a24ea42d8d009088596

Implement this game using whichever ((data
structure)) you find appropriate. Use `Math.random` to populate the
grid with a random pattern initially. Display it as a grid of
((checkbox)) ((field))s, with a ((button)) next to it to advance to
the next ((generation)). When the user checks or unchecks the
checkboxes, their changes should be included when computing the next
generation.
@!8fb08b0749e95f6aef0b5fdcec64c8e2298980ba

{{if interactive
@!ee80019481f084eace51cfe0882057e8eed256a0

```{lang: "text/html", test: no}
<div id="grid"></div>
<button id="next">Next generation</button>

<script>
  // Your code here.
</script>
```
@!f00d89bae4b4b805d98bb34a03ad14eb030cd200

if}}
@!45f90d2bf48fdef7bc7a315556109348f68430ac

{{hint
@!680d72f354a5935b0b842762407ebc952fe36d7f

{{index "game of life (exercise)"}}
@!47f51e1a280d6c18654c92ade73360015c9b5524

To solve the problem of having the
changes conceptually happen at the same time, try to see the
computation of a ((generation)) as a ((pure function)), which takes
one ((grid)) and produces a new grid that represents the next turn.
@!846d000f15cd04216c57f8856ccbcc1b11768fdc

Representing the grid can be done in any of the ways shown in Chapters
[7](07_elife.html#grid) and [15](15_game.html#level). Counting
live ((neighbor))s can be done with two nested loops, looping over
adjacent coordinates. Take care not to count cells outside of the
field and to ignore the cell in the center, whose neighbors we are
counting.
@!32f113780e34d1bb945303d6e2e9eb023afcfbb8

{{index "event handling", "change event"}}
@!967303c341a83e2a7d54e16cfebf4bf70e225cdd

Making changes to ((checkbox))es
take effect on the next generation can be done in two ways. An event
handler could notice these changes and update the current grid to
reflect them, or you could generate a fresh grid from the values in
the checkboxes before computing the next turn.
@!c2388511b290ff05c463249df4b06fa65cb3067a

If you choose to go with event handlers, you might want to attach
((attribute))s that identify the position that each checkbox
corresponds to so that it is easy to find out which cell to change.
@!69c40446432032af762d706cc782c792025bf0bd

{{index drawing, "table (HTML tag)", "br (HTML tag)"}}
@!d9a9cda28d6b3062b096cd26e679be9309870902

To draw the grid
of checkboxes, you either can use  a `<table>` element (see
[Chapter 13](13_dom.html#exercise_table)) or simply put them all in
the same element and put `<br>` (line break) elements between the
rows.
@!309cea06acd274d970e61d9706424b4959af4b32

hint}}
@!3344e97268ef02c2d9d997450f0ed161553a6c9b