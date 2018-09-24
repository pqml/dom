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

<br>

## JSX Support
There is also a tiny jsx support. You can use `h` pragma or use `React.createElement`.
It will directly generate a dom tree or an array of dom trees.

- Diffing and state management will not be implemented
- For the moment there is no vdom generated
- Stateless components and callback refs are implemented
- Class components with a render method will work but lifecycle methods are not supported.
- Methods `cloneElement` / `mount` / `render` are unavailable.

```js
import { h } from '@internet/dom'
// For react user, you can use: import { React } from '@internet/dom'

function FrenchHello ({ name }) {
  return <span>{`Bonjour ${name} !`}</span>
}

const el = <FrenchHello name="test"/>
document.body.appendChild(el)
```

<br>

## Documentation
Full documentation available from https://pqml.github.io/dom/docs

<br>

## License
[MIT.](LICENSE)

<br><br>

<i>`dom` is a package of the [@internet](https://www.npmjs.com/org/internet) npm scope. </i>

_[@internet](https://www.npmjs.com/org/internet) is a collection of opinionated and interoperables front-end npm ES6 modules, with minimal external dependencies._