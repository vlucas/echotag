'use strict';

const html = require('../index.js');


describe('Rendering HTML', function () {

  it('should render HTML string', function () {
    let content = html`<div>Hello World!</div>`;

    expect(content).toEqual('<div>Hello World!</div>');
  });

  it('should render HTML string with variables', function () {
    let world = 'Earth';
    let content = html`<div>Hello ${world}!</div>`;

    expect(content).toEqual('<div>Hello Earth!</div>');
  });

  it('should render arrays as plain HTML', function () {
    let worlds = ['John', 'Doe'];
    let content = html`<div>Hello ${worlds}!</div>`;

    expect(content).toEqual('<div>Hello JohnDoe!</div>');
  });

  it('should render arrays as plain HTML', function () {
    let data = [
      { title: 'World' },
      { title: 'Earth' }
    ];

    let content = html`
      <ul>
        ${data.map(function (world) {
          return html`<li>Hello ${world.title}</li>`;
        })}
      </ul>
    `;

    let expected = `
      <ul>
        <li>Hello World</li><li>Hello Earth</li>
      </ul>`;

    expect(content).toEqual(expected);
  });

});
