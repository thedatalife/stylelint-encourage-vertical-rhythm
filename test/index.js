
var ruleTester = require('stylelint-rule-tester');
var declarationUseVrUnit = require('..');

var testRule = ruleTester(declarationUseVrUnit.rule, declarationUseVrUnit.ruleName);

// Test for excluding non-matching properties
testRule('baseline', {baseline: '24px'}, function(rule) {
    rule.ok('.foo { background-color: $red; }');
    rule.ok('.foo { margin-bottom: $baseline * 2; }');
    rule.ok('.foo { height: baseline(12); }');
    rule.ok('.foo { border-bottom: baseline(0.1); }');
    rule.notOk('.foo { margin-bottom: 24px; }', 'Expected vertical rhythm baseline syntax for "margin-bottom". (twitter/encourage-vertical-rhythm)');
    rule.notOk('.foo { padding-top: 12px; }', 'Expected vertical rhythm baseline syntax for "padding-top". (twitter/encourage-vertical-rhythm)');
});

testRule('vr', function(rule) {
    rule.ok('.foo { background-color: $red; }');
    rule.ok('.foo { margin-bottom: 2vr; }');
    rule.ok('.foo { height: 12vr; }');
    rule.ok('.foo { border-bottom: 0.1vr; }');
    rule.notOk('.foo { margin-bottom: 24px; }', 'Expected vertical rhythm vr syntax for "margin-bottom". (twitter/encourage-vertical-rhythm)');
    rule.notOk('.foo { padding-top: 12px; }', 'Expected vertical rhythm vr syntax for "padding-top". (twitter/encourage-vertical-rhythm)');
});
