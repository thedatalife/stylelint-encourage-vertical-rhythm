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

# Tests

The plugin uses tape to provide unit test. Start the test suite with ```npm run test```.

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
