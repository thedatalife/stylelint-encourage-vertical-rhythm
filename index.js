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

// utility to check if a prop exists in the vrProps array
function checkProp(prop) {
    return (vrProps.indexOf(prop) !== -1) ? true : false;
}

// stylelint plugin definition
// first argument should be a string with the syntax used for vertical rhythm
// second argument is an object with a baseline value and type (function or variable)
module.exports = stylelint.createPlugin(ruleName, function(baselineSyntax, config) {
    // set defaults if nothing is passed
    baselineSyntax = baselineSyntax || 'baseline';
    config = config || {};

    var baselineValue = config.baseline || null;
    var baselineType = config.type || 'variable';

    // template used to provide suggestion if config is used
    var baselineSyntaxTemplate = function(input) {
        var value = parseInt(input) / baselineValue;

        if (baselineType == 'function') {
            return baselineSyntax + '(' + value + ')';
        }
        return '$' + baselineSyntax + ' * ' + value;
    }

    // stylelint message responses
    var messages = stylelint.utils.ruleMessages(ruleName, {
        expected: function expected(property, value) {
            // if the baselineValue is provided try to provide the proper syntax
            if (baselineValue) {
                return 'Expected ' + baselineSyntaxTemplate(value) + ' for \"' + property + '\".';
            }
            // otherwise provide the default message
            return 'Expected vertical rhythm ' + baselineSyntax + ' syntax for \"' + property + '\".';
        }
    });

    // utility to check if the baseline syntax is used
    var checkValue = function(val) {
        // Regex for checking for the baseline unit or function
        var regEx = new RegExp(baselineSyntax, 'gi');
        return regEx.test(val);
    }


    return function(root, result) {
        var validOptions = stylelint.utils.validateOptions({
            ruleName: ruleName,
            result: result,
            actual: baselineSyntax,
        });

        if (!validOptions) {
            return;
        }

        // walk the statements and test each property value pair
        root.walkDecls(function(statement) {
            if (checkProp(statement.prop) && !checkValue(statement.value)) {
                /*
                  if the property is in the vrProps array and the value
                  doesn't have the vertical rhythm unit report an error.
                */
                stylelint.utils.report({
                    ruleName: ruleName,
                    result: result,
                    node: statement,
                    message: messages.expected(statement.prop, statement.value)
                });
            }
        });
    };
});

module.exports.ruleName = ruleName;
