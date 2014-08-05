# Bootstrap Offcanvas

Super simple, easy to use off-canvas navigation menu for Bootstrap.

It uses Bootstrap classes and markup to create an off-canvas menu that not only looks good. But works perfectly. Example can be found [here](http://iamphill.github.io/Bootstrap-Offcanvas/example.html).

![Screencap showing off-canvas menu](screencap.gif)

## Installation

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

The below example is the exact same markup as from the Bootstrap docs. The only differences are the `data-toggle`, `data-target` attributes and `offcanvas-toggle` class.

```html
<button type="button" class="navbar-toggle offcanvas-toggle" data-toggle="offcanvas" data-target="#js-bootstrap-offcanvas">
    <span class="sr-only">Toggle navigation</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
</button>
```

Finally, the nav HTML should be as follows. The only things needed are:

- The class `navbar-offcanvas`
- The selector that is specified in the `data-target` of the toggle. Example below uses an ID.
**NOTE: This can also be any element as long as the classes and attributes are correct**

```html
<nav class="navbar navbar-default navbar-offcanvas" role="navigation" id="js-bootstrap-offcanvas">
    ...
</nav>
```

You can change the position of the off-canvas nav by adding the following class

```
navbar-offcanvas-right
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

There is one media query and this uses the Bootstrap `$screen-sm` variable. If this isn't present, then the width of `768px` is used for the breakpoint.

## Todo

- [ ] Fade out content behind off canvas menu when pulled out
- [ ] Different transitions and animations when pulling out and hiding
- [ ] Swipe to pull menu out
