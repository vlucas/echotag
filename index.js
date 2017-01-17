'use strict';

/**
 * Echot.js (Echo Template)
 *
 * Simple ES6 tagged template function to render a string template with HTML markup
 */

function html(strings, ...values) {
  let output = '';
  let index = 0;

  for (index = 0; index < values.length; index++) {
    let valueString = values[index].toString();

    // Handle arrays so they don't print a bunch of commas
    if (values[index] instanceof Array) {
      valueString = values[index].join('');
    }

    output += strings[index] + valueString;
  }

  output += strings[index];
  return output.trimRight();
}

module.exports = html;
