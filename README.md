# stylelint-encourage-vertical-rhythm

A simple stylelint plugin to encourage (or enforce) the consideration of vertical rhythm in css.

Takes a single string as the argument and this is used in a regular expression to validate the presence of the string inside any property that can affect vertical rhythm.

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

## usage

The plugin takes a string as the first argument and uses that value in the regular expression check of the property value. This allows the developer to define the best convention (function or variable) for the project.

```
'twitter/encourage-vertical-rhythm': 'baseline'
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

## test

The plugin uses tape to provide unit test. Start the test suite with ```npm run test```.
