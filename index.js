// Abbreviated example
var stylelint = require('stylelint');

var ruleName = 'thedatalife/encourage-vertical-rhythm';
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

function checkValue(val) {
    // Regex for checking
    // a digit before the letters vr
    var regEx = /\dvr/g;
    return regEx.test(val);
}

function checkProp(prop) {
  return (vrProps.indexOf(prop) !== -1) ? true : false;
}

module.exports = stylelint.createPlugin(ruleName, function(options, config) {
    options = options || '';

    // console.log('create plugin', ruleName, options, config);
    var messages = stylelint.utils.ruleMessages(ruleName, {
        expected: function expected(property) {
            return 'Expected vertical rhythm ' + options + ' syntax for \"' + property + '\".';
        }
    });

    var checkValue = function(val) {
        // Regex for checking for the baseline unit or function
        var regEx = new RegExp(options, 'gi');
        return regEx.test(val);
    }

    return function(root, result) {
        var validOptions = stylelint.utils.validateOptions({
            ruleName: ruleName,
            result: result,
            actual: options,
        });

        if (!validOptions) {
            return;
        }

        root.walkDecls(function(statement) {
          if(checkProp(statement.prop) && !checkValue(statement.value)) {
            stylelint.utils.report({
                ruleName: ruleName,
                result: result,
                node: statement,
                message: messages.expected(statement.prop)
            });
          }
        });
    };
});

module.exports.ruleName = ruleName;
