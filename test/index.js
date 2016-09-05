var testRule = require('stylelint-test-rule-tape');
var encourageVerticalRhythm = require('..');

// Testing default use without any arguments:

testRule(encourageVerticalRhythm.rule, {
  ruleName: encourageVerticalRhythm.ruleName,
  config: [],
  skipBasicChecks: false,

  accept: [
    { code: '.foo { background-color: $red; }' },
    { code: '.foo { margin-bottom: $baseline * 2; }' },
  ],

  reject: [
    {
      code: '.foo { margin-bottom: 24px; }',
      message: 'Expected vertical rhythm baseline syntax for "margin-bottom". (' + encourageVerticalRhythm.ruleName + ')'
    }
  ]
});

// Testing use with baseline value provided. Function variation.

testRule(encourageVerticalRhythm.rule, {
  ruleName: encourageVerticalRhythm.ruleName,
  config: ['baseline', {baseline: 24, type: 'function'}],
  skipBasicChecks: false,

  accept: [
    { code: '.foo { margin-bottom: baseline(2); }' },
    { code: '.foo { height: baseline(6); }' },
  ],

  reject: [
    {
      code: '.foo { margin-bottom: 24px; }',
      message: 'Expected baseline(1) for "margin-bottom". (' + encourageVerticalRhythm.ruleName + ')'
    },
    {
      code: '.foo { height: 12px; }',
      message: 'Expected baseline(0.5) for "height". (' + encourageVerticalRhythm.ruleName + ')'
    },
    {
      code: '.foo { padding-bottom: 96px; }',
      message: 'Expected baseline(4) for "padding-bottom". (' + encourageVerticalRhythm.ruleName + ')'
    }
  ]
});

// Testing use with baseline value provided. Variable variation.

testRule(encourageVerticalRhythm.rule, {
  ruleName: encourageVerticalRhythm.ruleName,
  config: ['baseline', {baseline: 24, type: 'variable'}],
  skipBasicChecks: false,

  accept: [
    { code: '.foo { height: 4 * $baseline }' },
    { code: '.foo { margin-bottom: $baseline * 2; }' },
  ],

  reject: [
    {
      code: '.foo { margin-bottom: 24px; }',
      message: 'Expected $baseline * 1 for "margin-bottom". (' + encourageVerticalRhythm.ruleName + ')'
    },
    {
      code: '.foo { height: 12px; }',
      message: 'Expected $baseline * 0.5 for "height". (' + encourageVerticalRhythm.ruleName + ')'
    },
    {
      code: '.foo { padding-bottom: 96px; }',
      message: 'Expected $baseline * 4 for "padding-bottom". (' + encourageVerticalRhythm.ruleName + ')'
    }
  ]
});
/*

var ruleTester = require('stylelint-rule-tester');
var encourageVerticalRhythm = require('..');

var testRule = ruleTester(encourageVerticalRhythm.rule, encourageVerticalRhythm.ruleName);


// Test for excluding non-matching properties
testRule('baseline', {baseline: '24px'}, function(rule) {
    rule.ok('.foo { background-color: $red; }');
    rule.ok('.foo { margin-bottom: $baseline * 2; }');
    rule.ok('.foo { height: baseline(2); }');
    rule.notOk('.foo { margin-bottom: 24px; }', 'Expected vertical rhythm baseline syntax for "margin-bottom". (' + encourageVerticalRhythm.ruleName + ')');
    rule.notOk('.foo { padding-top: 12px; }', 'Expected vertical rhythm baseline syntax for "padding-top". (' + encourageVerticalRhythm.ruleName + ')');
});

testRule('vr', function(rule) {
    rule.ok('.foo { background-color: $red; }');
    rule.ok('.foo { margin-bottom: 2vr; }');
    rule.ok('.foo { height: 12vr; }');
    rule.notOk('.foo { margin-bottom: 24px; }', 'Expected vertical rhythm vr syntax for "margin-bottom". (' + encourageVerticalRhythm.ruleName + ')');
    rule.notOk('.foo { padding-top: 12px; }', 'Expected vertical rhythm vr syntax for "padding-top". (' + encourageVerticalRhythm.ruleName + ')');
});

*/
