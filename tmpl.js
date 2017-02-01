'use strict';

const escapeHtml = require('escape-html');

/**
 * echotag.js
 *
 * Simple ES6 tagged template function to render a string template with HTML markup
 */

function tmpl(strings, ...values) {
  let output = '';
  let index = 0;
  let modifiers = [];

  for (index = 0; index < values.length; index++) {
    let valueString = values[index].toString();
    let doEscapeHTML = true;

    // Handle arrays so they don't print a bunch of commas
    if (values[index] instanceof Array) {
      valueString = values[index].join('');
    }

    // Look for value modifier
    if (strings[index + 1] !== undefined) {
      let modifier = strings[index + 1];

      if (modifier.startsWith(':html')) {
        modifiers.push(':html');
        doEscapeHTML = false;
      }
    }

    if (doEscapeHTML) {
      valueString = escapeHtml(valueString);
    }

    output += strings[index] + valueString;
  }

  output += strings[index];

  // Remove modifiers found in templates
  if (modifiers.length > 0) {
    output = modifiers.reduce((string, currentValue) => string.replace(currentValue, ''), output);
  }

  return output.trimRight();
}

module.exports = tmpl;
