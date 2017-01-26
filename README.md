# echotag.js - Simple ES6 Templates

echotag.js is a simple [ES6 tagged template
function](https://ponyfoo.com/articles/es6-template-strings-in-depth) for
printing HTML strings that handles common patterns like returning arrays of
other templates, and escapes HTML in all variables by default for XSS
prevention (but can also explicitly allow HTML when needed).

## Use Cases

 * All you want to do is render HTML to a string (in Node.js or the browser)
 * You only want to use built-in JavaScript features
 * You want template variables to be HTML-escaped by default (XSS prevention)
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
const tmpl = require('echotag').tmpl;

let content = tmpl`<div>Hello World!</div>`;
```

With ES6 Modules:

```javascript
import { tmpl } from 'echotag';

let content = tmpl`<div>Hello World!</div>`;
```

### 1. Simple Variable Replacement

Since echotag.js is just an ES6 tagged template function, you can use the normal
ES6 syntax you already know in your templates:

```javascript
const tmpl = require('echotag').tmpl;

let world = 'World';
let content = tmpl`
  <div>
    Hello ${world}!
  </div>
`;
```

### 2. Allowing HTML In Variables (for Layouts, etc.)

Since echotag.js auto-escapes HTML in variables by default, you must explicitly
use the `:html` modifier so that the HTML tags are preserved if you want to
allow HTML, or if you are using echotag templates within templates (i.e. for
layouts with template content).

#### Simple Example

We use the `:html` modifier to explicitly allow HTML in the `world` variable:

```javascript
const tmpl = require('echotag').tmpl;

let world = '<blink>World</blink>';
let content = tmpl`
  <div>
    Hello ${world}:html
  </div>
`;
```

#### Example With a Layout

A more real-world example with a `layout` function that accepts a `title` and
`content` parameter.

The `content` parameter should allow HTML (so we can use it in our content
templates), so we use the `:html` modifier to explicitly allow it. Any HTML in
the `title` variable will be escaped by default.

```javascript
const tmpl = require('echotag').tmpl;

function layout(params = {}) {
  return tmpl`
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
          ${params.content}:html
        </div>
      </body>
    </html>
  `;
}

let content = tmpl`
  <div>
    Hello World!
  </div>
`;

console.log(layout({ content, title: 'Homepage' }));
```

### 3. Using Data Arrays

Building HTML with arrays of data is similarly easy in echotag.js, and is very
JSX-like, without the cost of transpilation. It's also way faster since it's
just plain strings and built-in JavaScript. 😎

```javascript
const tmpl = require('echotag').tmpl;

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
```

### 4. Use with Express.js

For server-side rendering, echotag.js can be a great lightweight and native
alternative to template engines like EJS and Jade, replacing them with a simple
function call that returns the HTML you need to render.

```javascript
const express = require('express');
const tmpl = require('echotag').tmpl;

// Setup Express.js
const app = express();

// Define a function that returns the content wrapped in our layout HTML markup
// NOTE: Typically, this will be in a separate file
function mainLayout(params = {}) {
  return tmpl`
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
          ${params.content}:html
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
  let content = tmpl`
    <div>
      Hello ${world}!
    </div>
  `;

  // Send content without any template engine overhead - now it's just a simple function call
  res.send(mainLayout({ content, title }));
});


// Listen on port for web requests
app.listen(process.env.PORT || 1338);
```
