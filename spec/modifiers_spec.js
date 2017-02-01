'use strict';

const echotag = require('../index');
const { tmpl, config } = echotag;

describe('Using custom modifiers', function () {

  it('should be able to add a new custom :sparkle modifier', function () {
    // Add :sparkle modifier to make things shiny!
    config.setModifier('sparkle', function (str) {
      return '✨' + str + '✨';
    });

    // Run test
    let world = 'Earth';
    let content = tmpl`<div>Hello ${world}:sparkle!</div>`;

    expect(content).toEqual('<div>Hello ✨Earth✨!</div>');

    // Remove :sparkle modifier
    config.removeModifier('sparkle');
  });

  it('should be allowed to use custom modifiers to override the defaults', function () {
    // Get default modifier
    let originalDefault = config.getModifier('default');

    // Override the default modifier
    config.setModifier('default', function (str) {
      return str + '[blahblahblah]';
    });

    // Run test
    let world = 'Earth';
    let content = tmpl`<div>Hello ${world}!</div>`;

    expect(content).toEqual('<div>Hello Earth[blahblahblah]!</div>');

    // Set modifier back to original
    config.setModifier('default', originalDefault);
  });

});

