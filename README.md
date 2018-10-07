# DOM utilities
[:books: **Documentation**](#api) | [:tada: **Example**](https://pqml.github.io/dom) | [:globe_with_meridians: **Internet modules**](https://www.npmjs.com/org/internet)

- React-like library to build DOM, without `setState` and patching.
- Own JSX implementation using `h` pragma.
- `render` method to render and mount jsx.
- `cloneElement` to clone a virtual node with new props or new children
- Class `Component` with react-like `render` and lifecycle methods.
- `attach` method to instanciate a Component using an existing DOM Node.
- [Callback refs](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) support.
- DOM batching with `measure` and `mutate` methods

<br>

# :warning: Warnings
- This is not a viable React alternative, use [preact](https://github.com/developit/preact) for this purpose.
- `render` have different arguments than the preact / React one
- The "no-patching" approach is cool to add components on top of already existing DOM without worrying about state management
- Not carring about state management also means it's super easy to have leaks and bad lifecycle behaviour, so don't rely too much on this lib

<br>

# Requirements
- ES6 Modules support
  - Using a module bundler like Webpack, Rollup or Parcel
  - [Native support from browser](https://caniuse.com/#feat=es6-module)
  - From NodeJS with something like [esm](https://github.com/standard-things/esm)
- [Promise (No IE support)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise)
- [Object.assign (No IE support)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/assign)
- [HTMLElement.dataset (IE >= 11)](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset)

<br>

# Installation
```sh
# using npm
$ npm install --save @internet/dom

# or using yarn
$ yarn add @internet/dom
```

<br>

<a name="api"></a>
# API

<a name="h"></a>
## `h([tag|Component], [props={}], ...children)`
> Creates a VNode (virtual DOM element).

**Kind**: global function  
**Returns**: <code>object</code> - A object containing the vnode and its props / children  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| nodeName | <code>string</code> \| <code>function</code> |  | A tagname or a component. e.g. `'div'`, `'a'`, `Component` |
| [props] | <code>object</code> \| <code>null</code> | <code></code> | Attributes/props to set on the created element. |
| [rest] | <code>Array.&lt;VNode&gt;</code> |  | All additional arguments are vnode children to append to |

**Example**  
```js
import { h, render } from '@internet/dom'

// Create a new vnode using JSX (via Babel or Bublé)
const node = <div style="color: red">Hello</div>

// The same node can be made using directly the `h` function
const node = h('div', { style: 'color: red' }, 'Hello')

// render the created node into <body>
render(node, document.body)
```

<br>

<a name="render"></a>
## `render(VNode, mountTo, [context=null])`
> Render a virtual node into a `parent` Element

**Kind**: global function  
**Returns**: <code>object</code> - Return an object containing:
  - `result.nodes` : Array of rendered DOM nodes
  - `result.components` : First-level components instances
  - `result.refs` : First-level callback refs  

| Param | Type | Description |
| --- | --- | --- |
| vnode | <code>object</code> | A (JSX) VNode to render |
| mountTo | <code>HTMLElement</code> \| <code>function</code> | DOM Element to render into. **You can also use a callback function.** The function will be called with DOM Elements to mount as first argument |
| [context] | <code>Component</code> | Component instance to attach rendered components and callback refs to (See example below) |

**Example**  
```js
import { render, Component } from '@internet/dom'

class App extends Component {
  render () {
    return (
       <main>
         <ul ref={el => this.ul = el}></ul>
         <button ref={el => this.button = el}>Add item</button>
       </main>
    )
  }

  componentDidMount () {
   this.count = 0
   this.addItem = this.addItem.bind(this)
   this.button.addEventListener('click', this.addItem)
  }

  addItem () {
    // Instanciate a new Item and append-it to the list.
    // By passing App instance as context to the rendered,
    // Rendered <Item> is added to the App's subcomponents list
    render(
      <Item count={++this.count} />,
      li => this.ul.appendChild(li),
      this
    )
  }

  componentWillUmount() {
    this.button.removeEventListener('click', this.addItem)
  }
}

// Instanciate App component and append-it into <body>
render(<App />, document.body)
```

<br>

<a name="attach"></a>
## `attach(DOMElement, Component, [props={}])`
> Instanciate a component and use an existing DOM Element as the component's template
- This will set the dom element as `component.base`. `render` method won't be called
- `attach` will do the following steps
  - Instanciate new Component(props)
  - Set the DOM Element as `component.base`
  - Call `component.componentWillMount(props)`
  - Set component.mounted to `true`
  - Call `component.componentDidMount(props)`
  - return component instance

**Kind**: global function  
**Returns**: <code>component</code> - Component instance  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>HTMLElement</code> |  | Existing dom element to use to attach Component instance |
| Component | <code>Component</code> |  | Component class to instanciate |
| [props] | <code>object</code> | <code>{}</code> | Object containing props for the new component |

**Example**  
```js
import { attach } from '@internet/dom'
import App from 'components/App'

const app = attach(document.querySelector('main'), App, {})
```

<br>

<a name="cloneElement"></a>
## `cloneElement(VNode, [newProps={}], [newChildren])`

<br>
