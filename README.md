Style Lint - Encourage Vertical Rhythm
======================================

A simple stylelint plugin to encourage (or enforce) the consideration of vertical rhythm in css.

Takes a single string as the argument and this is used in a regular expression to validate the presence of the string inside any property that can affect vertical rhythm.

## Installation

`npm install @thedatalife/stylelint-encourage-vertical-rhythm`

## Usage

The plugin takes a string as the first argument and uses that value in the regular expression check of the property value. This allows the developer to define the best convention (function or variable) for the project.

```
var vrProps = [
  'height',
  'padding-top',
  'padding-bottom',
  'margin-top',
  'margin-bottom',
  'line-height',
  'border-top',
  'border-bottom'
];
```
### Basic Use

```
'thedatalife/encourage-vertical-rhythm': 'baseline'
```

This will match both the use of baseline as a function or variable.

```
@function baseline($multiplier) {
    @return 24px * $multiplier;
}

.module1 { margin-bottom: baseline(1.5); }
```

```
$baseline: 24px;

.module1 { margin-bottom: $baseline * 1.5; }
```

### Advanced Use

It's also possible to provide your baseline value as config. This will allow the plugin
to provide copy and paste suggestions on what to replace the invaid property with.

Provide a baseline and type property. Type can be either 'function' or 'variable'.

***As a function***

```
'thedatalife/encourage-vertical-rhythm': ['baseline', {baseline: 24, type: 'function'}]
```

A vertical rhythm property with `48px` would throw a warning with the suggestion `baseline(2)`.

***As a variable***

```
'thedatalife/encourage-vertical-rhythm': ['baseline', {baseline: 24, type: 'variable'}]
```

A vertical rhythm property with `48px` would throw a warning with the suggestion `$baseline * 2`.

# Tests

The plugin uses tape to provide unit test. Start the test suite with ```npm run test```.

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

# Inspiration

Vertical rhythm is an often misunderstood concept. It's an important part of design architecture and if respected it can bring harmony to the flow of a page. This plugin was inspired by a variety of sources:

[http://www.gridlover.net/try](http://www.gridlover.net/try)
[https://pilot.co/blog/implementing-baseline-rhythm-in-css/](https://pilot.co/blog/implementing-baseline-rhythm-in-css/)
[https://www.smashingmagazine.com/2012/12/css-baseline-the-good-the-bad-and-the-ugly/](https://www.smashingmagazine.com/2012/12/css-baseline-the-good-the-bad-and-the-ugly/)
[https://medium.com/@tbredin/a-jolly-web-typesetting-adventure-42948ab0d1dd](https://medium.com/@tbredin/a-jolly-web-typesetting-adventure-42948ab0d1dd)
