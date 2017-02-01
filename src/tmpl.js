'use strict';

const config = require('./config');

/**
 * echotag.js
 *
 * Simple ES6 tagged template function to render a string template with HTML markup
 */

function tmpl(strings, ...values) {
  let output = '';
  let index = 0;
  let usedModifiers = [];

  for (index = 0; index < values.length; index++) {
    let valueString = values[index].toString();
    let valueModifiers = [];

    // Handle arrays so they don't print a bunch of commas
    if (values[index] instanceof Array) {
      valueString = values[index].join('');
    }

    // Look for value modifier
    if (strings[index + 1] !== undefined) {
      let modifier = strings[index + 1];
      let matches = modifier.match(/:[a-zA-Z]+/g);
      valueModifiers = matches ? matches : [':default'];

      usedModifiers = usedModifiers.concat(valueModifiers);
    }

    // Apply value modifiers
    valueModifiers.forEach((currentModifier) => {
      currentModifier = currentModifier.replace(':', '');
      let modifierFn = config.getModifier(currentModifier);

      if (modifierFn) {
        valueString = modifierFn(valueString);
      }
    });

    output += strings[index] + valueString;
  }

  output += strings[index];

  // Remove usedModifiers found in templates
  if (usedModifiers.length > 0) {
    output = usedModifiers.reduce((string, currentValue) => string.replace(currentValue, ''), output);
  }

  return output.trimRight();
}

module.exports = tmpl;
