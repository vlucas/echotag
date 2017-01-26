'use strict';

const tmpl = require('../src/tmpl.js');

describe('Rendering HTML', function () {

  it('should render HTML string', function () {
    let content = tmpl`<div>Hello World!</div>`;

    expect(content).toEqual('<div>Hello World!</div>');
  });

  it('should render HTML string with variables', function () {
    let world = 'Earth';
    let content = tmpl`<div>Hello ${world}!</div>`;

    expect(content).toEqual('<div>Hello Earth!</div>');
  });

  it('should render arrays as plain HTML', function () {
    let worlds = ['John', 'Doe'];
    let content = tmpl`<div>Hello ${worlds}!</div>`;

    expect(content).toEqual('<div>Hello JohnDoe!</div>');
  });

  it('should render arrays as plain HTML', function () {
    let data = [
      { title: 'World' },
      { title: 'Earth' }
    ];

    let content = tmpl`
      <ul>
        ${data.map(function (world) {
          return tmpl`<li>Hello ${world.title}</li>`;
        })}:html
      </ul>
    `;

    let expected = `
      <ul>
        <li>Hello World</li><li>Hello Earth</li>
      </ul>`;

    expect(content).toEqual(expected);
  });

});
