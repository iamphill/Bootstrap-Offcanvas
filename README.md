# Bootstrap Offcanvas [![Build Status](https://travis-ci.org/iamphill/Bootstrap-Offcanvas.svg?branch=master)](https://travis-ci.org/iamphill/Bootstrap-Offcanvas)

[![Join the chat at https://gitter.im/iamphill/Bootstrap-Offcanvas](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/iamphill/Bootstrap-Offcanvas?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Super simple, easy to use off-canvas navigation menu for Bootstrap.

It uses Bootstrap classes and markup to create an off-canvas menu that not only looks good. But works perfectly. Example can be found [here](http://iamphill.github.io/Bootstrap-Offcanvas/example.html).

![Screencap showing off-canvas menu](https://raw.githubusercontent.com/iamphill/Bootstrap-Offcanvas/master/screencap.gif)

## Installation

Available to download through Bower

```
bower install bootstrap-offcanvas
```

Add the stylehseet from the **dist** folder to your HTML document.

```html
<link rel="stylesheet" href="../dist/css/bootstrap.offcanvas.min.css"/>
```

Add the JavaScript from the **dist** folder to your HTML document.

**NOTE: Ensure that jQuery is also present. Otherwise this won't work**

```html
<script src="../dist/js/bootstrap.offcanvas.js"></script>
```

In the HTML itself there needs to a button or something to trigger the menu.
**NOTE: It can be ANY HTML element**

The below example is the exact same markup as from the Bootstrap docs. The only differences are the `data-toggle`, `data-target` attributes and `offcanvas-toggle` class. *Note: The `.icon-bar`s need to be wrapped in an element for the close icon to correctly show.*

```html
<button type="button" class="navbar-toggle offcanvas-toggle" data-toggle="offcanvas" data-target="#js-bootstrap-offcanvas">
    <span class="sr-only">Toggle navigation</span>
    <span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </span>
</button>
```

Finally, the nav HTML should be as follows. The only things needed are:

- The class `navbar-offcanvas`
- The selector that is specified in the `data-target` of the toggle. Example below uses an ID.
**NOTE: This can also be any element as long as the classes and attributes are correct**

```html
<nav class="navbar navbar-default" role="navigation">
    ...
    <div class="navbar-offcanvas navbar-offcanvas-touch" id="js-bootstrap-offcanvas">
        ...
    </div>
</nav>
```

You can change the position of the off-canvas nav by adding the following class

```
navbar-offcanvas-right
```

Dropdown menus are supported, again using the Bootstrap standard markup.

The only difference is that it doesn't need the data-toggle. But this could be left in if you require it to be present.

```html
<li class="dropdown">
    <a href="#" class="dropdown-toggle">Dropdown <span class="caret"></span></a>
    <ul class="dropdown-menu" role="menu">
        <li><a href="#">Action</a></li>
        <li><a href="#">Another action</a></li>
        <li><a href="#">Something else here</a></li>
        <li class="divider"></li>
        <li><a href="#">Separated link</a></li>
        <li class="divider"></li>
        <li><a href="#">One more separated link</a></li>
    </ul>
</li>
```

You can have another button somewhere on the page that will toggle the status of the offcanvas between in & out.
**NOTE: The plugin doesn't know which one you want as the main button to toggle the offcanvas. So it instead just uses the first it finds for the specified target element**

```html
<button type="button" class="navbar-toggle offcanvas-toggle pull-right" data-toggle="offcanvas" data-target="#js-bootstrap-offcanvas">
    <span class="sr-only">Toggle navigation</span>
    <i class="glyphicon glyphicon-remove"></i>
</button>
```

There is an in-built version of a offcanvas toggle which uses the icon bars. Simply use the below markup

```html
<button type="button" class="navbar-toggle offcanvas-toggle offcanvas-toggle-close" data-toggle="offcanvas" data-target="#js-bootstrap-offcanvas">
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="sr-only">Toggle navigation</span>
</button>
```

### Transitions

There is 1 additional transition and this is fade in/out. This is done by adding the below class. **Note:** This also works with touch events and will correctly do the right amount of opacity for the location of the touch.

```
navbar-offcanvas-fade
```

### Touch events

It is possible to add touch events to swipe the menu in and out by simply adding the following class to the navigation HTML element.

```
navbar-offcanvas-touch
```

**NOTE**
Whilst multiple touch navs do work, they must be on the other side of the screen to each other. If two navs on the same side have touch, it won't work correctly. But then you knew that anyway right?

iOS7+ does have a gesture to swipe the page back and forward, and a threshold has been put in. This might not be perfect, and might need tweaking.

## Events

There are four different events that are triggered on the nav element. These follow the same syntax as the Official Bootstrap JS plugins.

| Event Type               | Description                                 |
| -------------     |:-------------:                        |
| show.bs.offcanvas     | Fire before the offcanvas menu is shown   |
| shown.bs.offcanvas    | Fire after the offcanvas menu is shown    |
| hide.bs.offcanvas      | Fire before the offcanvas menu is hidden  |
| hidden.bs.offcanvas    | Fire after the offcanvas menu is hidden   |

### Trigger events

If you want to toggle the offcanvas yourself, you can trigger an event on the menu element. See below.

```js
$("#js-bootstrap-offcanvas").trigger("offcanvas.toggle"); // Toggle open & close
$("#js-bootstrap-offcanvas").trigger("offcanvas.open"); // Open the menu
$("#js-bootstrap-offcanvas").trigger("offcanvas.close"); // Close the menu
```


## Running example

Run the below commands to install all dependencies and then just open the index.html file in example/

```
npm install
bower install
```

## Customizing

Its possible to customize to your needs by using SASS.

Want to include with your Bootstrap SASS? Copy across the files in src/sass.

The SASS files use a few variables. These are explained below.

```sass
$offcanvas-width: 250px !default; // The width of the offcanvas menu
$offcanvas-animation-time: 0.15s !default; // Transition time to pull/hide menu
$offcanvas-toggle-background: #f8f8f8 !default; // Background colour for toggle
$offcanvas-toggle-bars-color: #000 !default; // Colour for icon bars in toggle
```

There is one media query and this uses the Bootstrap `$screen-xs-max` variable. If this isn't present, then the width of `767px` is used for the breakpoint.

## Tests

Open [tests/index.html](https://github.com/iamphill/Bootstrap-Offcanvas/blob/master/tests/index.html) to run the tests.
