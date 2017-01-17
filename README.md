# echot.js Simple Templates

echot.js is a simple [ES6 tagged template
function](https://ponyfoo.com/articles/es6-template-strings-in-depth) for
printing HTML strings that handles common patterns like returning arrays of
other templates.

## Use Cases

 * All you want to do is render HTML to a string (typically on the server side)
 * You only want to use built-in JavaScript features
 * You don't want to pay the cost of parsing or compiling templates
 * You don't want to learn a special template syntax like EJS, Jade, Underscore, etc.
 * You don't want to add complexity to your build system (Babel, TypeScript, etc.)
 * You don't need a virtual dom or reactive updates built-in (React, etc. are overkill)

## Examples

### 0. Require echot.js

With CommonJS/Node.js:

```javascript
const html = require('echot/html');

let content = html`<div>Hello World!</div>`;
```

With ES6 Modules:

```javascript
import { html } from 'echot';

let content = html`<div>Hello World!</div>`;
```

### 1. Simple Variable Replacement

Since echot.js is just an ES6 tagged template function, you can use the normal
ES6 syntax you already know in your templates:

```javascript
const html = require('echot/html');

let world = 'World';
let content = html`
  <div>
    Hello ${world}!
  </div>
`;
```

### 2. Using Data Arrays

Building HTML with arrays of data is similarly easy in echot.js, and is very
JSX-like, without the cost of transpilation. It's also way faster since it's
just plain strings and built-in JavaScript. 😎

```javascript
const html = require('echot/html');

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
```
