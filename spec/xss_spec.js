'use strict';

const tmpl = require('../src/tmpl.js');

describe('Rendering parameters with HTML in them', function () {

  it('should automatically escape HTML in parameters', function () {
    let world = '<script>alert("Pwned!");</script>';
    let content = tmpl`<div>Hello ${world}!</div>`;

    expect(content).toEqual('<div>Hello &lt;script&gt;alert(&quot;Pwned!&quot;);&lt;/script&gt;!</div>');
  });

  it('should not allow links', function () {
    let world = 'This contains a <a href="https://www.google.com">Google Link</a>!';
    let content = tmpl`<div>Hello ${world}!</div>`;

    expect(content).toEqual('<div>Hello This contains a &lt;a href=&quot;https://www.google.com&quot;&gt;Google Link&lt;/a&gt;!!</div>');
  });

  it('should allow templates in other templates without escaping the HTML in them', function () {
    let param = 'Some <big>HTML</big>';
    let content = tmpl`<div>${param}</div>`;
    let layout = tmpl`<div>${content}:html</div>`;

    expect(layout).toEqual('<div><div>Some &lt;big&gt;HTML&lt;/big&gt;</div></div>');
  });

});
