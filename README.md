# echotag.js - Simple ES6 Templates

echotag.js is a simple [ES6 tagged template
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

## Installation

You can install echotag.js via NPM:

```
npm install echotag --save
```

## Examples

### 0. Require echotag.js

With CommonJS/Node.js:

```javascript
const html = require('echotag/html');

let content = html`<div>Hello World!</div>`;
```

With ES6 Modules:

```javascript
import { html } from 'echotag';

let content = html`<div>Hello World!</div>`;
```

### 1. Simple Variable Replacement

Since echotag.js is just an ES6 tagged template function, you can use the normal
ES6 syntax you already know in your templates:

```javascript
const html = require('echotag/html');

let world = 'World';
let content = html`
  <div>
    Hello ${world}!
  </div>
`;
```

### 2. Using Data Arrays

Building HTML with arrays of data is similarly easy in echotag.js, and is very
JSX-like, without the cost of transpilation. It's also way faster since it's
just plain strings and built-in JavaScript. 😎

```javascript
const html = require('echotag/html');

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

### 3. Use with Express.js

For server-side rendering, echotag.js can be a great lightweight and native
alternative to template engines like EJS and Jade, replacing them with a simple
function call that returns the HTML you need to render.

```javascript
const express = require('express');
const html = require('echotag/html');

// Setup Express.js
const app = express();

// Define a function that returns the content wrapped in our layout HTML markup
// NOTE: Typically, this will be in a separate file
function mainLayout(params = {}) {
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${params.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <link href="/css/main.css" rel="stylesheet" />
      </head>
      <body>
        <div class="content">
          ${params.content}
        </div>
      </body>
    </html>
  `;
}

// Define a route
app.get('/', function (req, res) {
  // Prepare our content, or call a function that returns it, etc.
  let title = 'Hello World!';
  let world = 'World';
  let content = html`
    <div>
      Hello ${world}!
    </div>
  `;

  // Send content without any template engine overhead - now it's just a simple function call
  res.send(mainLayout({ content, title }));
});


// Listen on port for web requests
let server = app.listen(process.env.PORT || 1338, function () {
  let host = server.address().address;
  let port = server.address().port;

  if (host === '::') {
    host = 'localhost';
  }

  console.log('Node.js app listening at http://%s:%s', host, port);
});
```
