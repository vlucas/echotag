'use strict';

const escapeHtml = require('escape-html');

/**
 * Main config settings (defaults)
 */
let config = {
  modifiers: {
    default: escapeHtml,
    html: null
  }
}


function getModifiers() {
  return config.modifiers;
}

function getModifier(name) {
  if (!Object.keys(config.modifiers).includes(name)) {
    throw new Error("[echotag.js] Template modifier not defined: " + name);
  }

  return config.modifiers[name];
}

function setModifier(name, fn) {
  config.modifiers[name] = fn;
}

function removeModifier(name) {
  delete config.modifiers[name];
}

module.exports = { getModifier, getModifiers, setModifier, removeModifier };
