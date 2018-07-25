# DOM
Dom utilities

[→ Documentation](https://pqml.github.io/dom/docs) |
[→ Example](https://pqml.github.io/dom)

<br><br>

## Requirements
- ES6 Modules support
  - RequestAnimationFrame
  - Promise object (only for Batching methods)
  - Using a module bundler like Webpack, Rollup or Parcel
  - [Native support from browser](https://caniuse.com/#feat=es6-module)
  - From NodeJS with something like [esm](https://github.com/standard-things/esm)

<br>

<br>

## Module Installation

```sh
# using npm
$ npm install --save @internet/dom

# or using yarn
$ yarn add @internet/dom
```

<br>

## Usage

```js
import { el, mutate } from '@internet/dom'

// create a new div
const div = el('div', { classes: ['classA', 'classB'] })

// batch dom reflow on next tick
mutate(() => {
  document.body.appendChild(div)
})
```

:warning: Default export does not contain batching methods

<br>

## Documentation
Full documentation available from https://pqml.github.io/dom/docs

<br>

## License
[MIT.](LICENSE)

<br><br>

<i>`hotmaterial` is a package of the [@internet](https://www.npmjs.com/org/internet) npm scope. </i>

_[@internet](https://www.npmjs.com/org/internet) is a collection of opinionated and interoperables front-end npm ES6 modules, with minimal external dependencies._