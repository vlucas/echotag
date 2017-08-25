'use strict';

const tmpl = require('../index').tmpl;

describe('Rendering With Conditionals', function () {
  it('should handle conditional', function () {
    let data = [];
    let content = tmpl`
      <ul>
        ${data.map(function (world) {
          return tmpl`<li>Hello ${world.title}</li>`;
        })}:html
      </ul>
    `;

    let actual = tmpl`<div>${data.length > 1 ? content : null}</div>`;
    let expected = `<div></div>`;

    expect(actual).toEqual(expected);
  });

  it('should not choke on null variable', function () {
    let world = null;
    let content = tmpl`<div>Hello ${world}!</div>`;

    expect(content).toEqual('<div>Hello !</div>');
  });

});

