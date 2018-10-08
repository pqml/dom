# DOM Library
[:books: **Documentation**](#api) | [:tada: **Example**](https://pqml.github.io/dom) | [:globe_with_meridians: **Internet modules**](https://www.npmjs.com/org/internet)

- :warning: **Experimental** React-like library to build DOM, without `setState` and patching.
- Own JSX implementation using `h` pragma.
- `render` method to render and mount jsx
- `cloneElement` to clone a virtual node with new props or new children
- Class `Component` with react-like lifecycle methods.
- [Callback refs](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) support.
- **You can also render "real" HTML Elements inside virtual dom**
  - This is useful to add a Component-oriented architecture on top of an already existing html page (like rendered from PHP)

<br>

# :warning: Warnings
- This is **not** a React alternative, use [preact](https://github.com/developit/preact) for this purpose.

- You can render "real" HTML Element inside virtual dom (using `render` or `component.render`)
  - It's the one of the reason why there isn't patching
  - It's a great feature to add a Component-oriented architecture on top of an already existing html page (like rendered from PHP)
  - It also means **the virtual dom is absolutely not a source of thruth** :warning::warning:
  - It can be super easy to have leaks and bad lifecycle behaviour, so don't rely too much on this lib

- There is no event management for now. Use `addEventListener` / `removeEventListener` with lifecycle events to be sure of what you are doing.
- `render` have different arguments than the preact / React one.
- `component.render` is used to render portions of jsx inside it, as child of the `component`
  - the initial rendering of the component is made via the `component.template` method instead



<br>

# Requirements
- ES6 Modules support
  - Using a module bundler like Webpack, Rollup or Parcel
  - [Native support from browser](https://caniuse.com/#feat=es6-module)
  - From NodeJS with something like [esm](https://github.com/standard-things/esm)
- [Object.assign (No IE support)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/assign)

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

```js
import { h, render, Component, cloneElement, addRef } from '@internet/dom'
```

- [:pencil: **h()**](#h): _Creates a VNode (usually used through JSX)_
- [:movie_camera: **render()**](#render): _Renders a virtual node and mount-it into a `parent` Element_
- [:orange_book: **Component Class**](#Component): _Base Component class with lifecycle and rendering methods_
- [:floppy_disk: **cloneElement()**](#cloneElement): _Clones the given virtual node, optionally replacing its props / children_
- [:mag: **addRef()**](#addRef): _Quick util to add callback refs to jsx_

<br><br>

<a name="h"></a>
## :pencil: `h([tag|Component], [props={}], ...children)`
> Creates a VNode (virtual DOM element).

**Kind**: global function  
**Returns**: <code>object</code> - A vnode object containing its type, props, children and some flags  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| nodeName | <code>string</code> \| <code>function</code> |  | A tagname or a component. e.g. `'div'`, `'a'`, `Component` |
| [props] | <code>object</code> | <code>{}</code> | Attributes/props to set on the created element. |
| [...children] | <code>Array.&lt;VNode&gt;</code> | <code>[]</code> | All additional arguments are vnode children |

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

<br><br>

<a name="render"></a>
## :movie_camera: `render(VNode, parent)`
> Renders a virtual node and mount-it into a `parent` Element

> ** :warning: `render` always dispatch lifecycle events. Even if you don't pass a parent as 2nd argument, all componentDidMount methods and callback refs will be called. Be carreful!**

> ** :warning: If you render a virtual node inside an already mounted component,
use its [component.render method](#Component+render) instead. **
Otherwise, the rendered subcomponents and callback refs will not be register as "childs" of the parent component.
This can lead to bad lifecycle dispatching if you destroy the parent for instance.

**Kind**: global function  
**Returns**: <code>object</code> - Return an object containing:
  - `result.nodes` : Array of rendered DOM nodes
  - `result.components` : First-level components instances
  - `result.refs` : First-level callback refs  

| Param | Type | Description |
| --- | --- | --- |
| vnode | <code>object</code> | A (JSX) VNode to render |
| [parent] | <code>HTMLElement</code> \| <code>function</code> | DOM Element to render into. **You can also use a callback function:** the function will be called with DOM Elements to mount as first argument |
| [parentComponent] | [<code>Component</code>](#Component) | The parent component instance where the vnode will be mounted. You can directly use `parentComponent.render(vnode, parent)` |

**Example**  
```js
import { h, render } from '@internet/dom'
import App from 'components/App'

// Instanciate an App component and append it to document.body
render(<App />, document.body)

// Insert a new div into document.body, before the first child of document.body
render(<div>Some text</div>, div => {
  document.body.insertBefore(div, document.body.firstChild)
})
```

<br><br>

<a name="Component"></a>
## :orange_book: `Component` class
#### Example
```js
import { h, Component, render } from '@internet/raf'

class App () {
   template () {
     return (
       <div>
         <p>My first app</p>
       </div>
     )
   }

   componentDidMount () {
     console.log('App is mounted')
     console.log('HTMLElement of the App: ', this.base)
   }
}

// Mount a new instance of App component into document.body
// Will call componentWillMount, template and componentDidMount lifecycle events
render(<App />, document.body)
```
#### Component API

* [Component](#Component)
    * [new Component([props])](#new_Component_new)
    * _Methods_
        * [.template([props])](#Component+template) ⇒ <code>VNode</code> \| <code>HTMLElement</code>
        * [.componentWillMount([props])](#Component+componentWillMount)
        * [.componentDidMount([props])](#Component+componentDidMount)
        * [.componentWillUnmount([props])](#Component+componentWillUnmount)
        * [.render(vnode, [parent])](#Component+render) ⇒ <code>object</code>
        * [.destroy()](#Component+destroy)
    * _Properties_
        * [.props](#Component+props) : <code>object</code>
        * [.base](#Component+base) : <code>VNode</code> \| <code>HTMLElement</code> \| <code>array</code>
        * [.mounted](#Component+mounted) : <code>boolean</code>

<br>
<a name="new_Component_new"></a>

#### new Component([props])
Create a new Component


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [props] | <code>object</code> | <code>{}</code> | Component properties / attributes. Can also contains children. |


* * *

<a name="Component+template"></a>

#### component.template([props]) ⇒ <code>VNode</code> \| <code>HTMLElement</code>
> `component.template` will be called during the component initial rendering to create the `component.base` node

**Kind**: instance method of [<code>Component</code>](#Component)  
**Returns**: <code>VNode</code> \| <code>HTMLElement</code> - VNode (JSX or `h` calls) or real HTMLElement that will be rendered as the `component.base` node. You can also return an array of elements.  
**Category**: Methods  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [props] | <code>object</code> | <code>{}</code> | `component.props` automatically passed as argument. |

**Example**  
```js
import { h, Component, render } from '@internet/dom'

class HelloDiv extends Component {
  template () {
    // will create a new p tag
    return <div>Hello!</div>
  }
}
// Append a new "Hello!" div to document.body
render(<HelloDiv/>, document.body)

class MainComponent extends Component {
  template () {
    // use the existing <main> node as the component base
    return document.querySelector('main')
  }
}

// Create a new MainComponent, using an already existing dom node
render(<MainComponent />)
```

* * *

<a name="Component+componentWillMount"></a>

#### component.componentWillMount([props])
> `component.componentWillMount` will be called by `render` just before a the component template rendering

**Kind**: instance method of [<code>Component</code>](#Component)  
**Category**: Methods  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [props] | <code>object</code> | <code>{}</code> | `component.props` automatically passed as argument. |


* * *

<a name="Component+componentDidMount"></a>

#### component.componentDidMount([props])
> `component.componentDidMount` will be called by `render` when all the rendered dom tree is mounted

**Kind**: instance method of [<code>Component</code>](#Component)  
**Category**: Methods  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [props] | <code>object</code> | <code>{}</code> | `component.props` automatically passed as argument. |


* * *

<a name="Component+componentWillUnmount"></a>

#### component.componentWillUnmount([props])
> `component.componentWillUnmount` will be called when the component or one of its ancestors is destroyed

**Kind**: instance method of [<code>Component</code>](#Component)  
**Category**: Methods  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [props] | <code>object</code> | <code>{}</code> | `component.props` automatically passed as argument. |


* * *

<a name="Component+render"></a>

#### component.render(vnode, [parent]) ⇒ <code>object</code>
> Render a vnode or array of vnodes and register the rendered content as "child" of this component. <br>
> Use this method when you want to add content to the component after the initial rendering. <br>
> This ensures new items will be correctly unmount when the component is destroyed.

**Kind**: instance method of [<code>Component</code>](#Component)  
**Returns**: <code>object</code> - Return an object containing rendered `nodes`, `components` and `refs`  
**Category**: Methods  

| Param | Type | Description |
| --- | --- | --- |
| vnode | <code>object</code> | A (JSX) VNode to render |
| [parent] | <code>HTMLElement</code> \| <code>function</code> | DOM Element to render into. **You can also use a callback function:** the function will be called with DOM Elements to mount as first argument |

**Example**  
```js
import { h, Component, render } from '@internet/dom'

class Item extends Component {
  template () {
    return <li>Item</li>
  }
}

class List extends Component {
  template () {
    return (
      <div>
        <ul ref={el => { this.ul = el }}></ul>
        <button ref={el => { this.button = el }}>Add Item</button>
      </div>
    )
  }

  addItem () {
    // Render a new Item instance and add it to the list
    // All created Items will be properly destroyed when the List instance is removed
    this.render(<Item />, this.ul)
  }

  componentDidMount () {
    this.addItem = this.addItem.bind(this)
    this.button.addEventListener('click', this.addItem)
  }

  componentWillUnmount () {
    this.button.removeEventListener('click', this.addItem)
  }
}

render(<List />, document.body)
```

* * *

<a name="Component+destroy"></a>

#### component.destroy()
Destroy the component and its children components.
 - This also remove component props and de-reference the component from its parent.
 - Callback refs inside the component tree will be called with `null` as first argument
 - Set component.mounted to false

**Kind**: instance method of [<code>Component</code>](#Component)  
**Category**: Methods  
**Example**  
```js
import { h, Component, render } from '@internet/dom'

class SelfDestructButton extends Component () {
  template() {
     return <button>Destroy me</button>
  }

  componentDidMount() {
    this.destroy = this.destroy.bind(this)
    this.base.addEventListener('click', this.destroy)
  }

  componentWillUnmount() {
    this.base.removeEventListener('click', this.destroy)
  }
}

render(<SelfDestructButton />, document.body)
```

* * *

<a name="Component+props"></a>

#### component.props : <code>object</code>
> Contains all component properties and children. <br>
> Do not modify directly, but recreate a new component using cloneElement instead

**Kind**: instance property of [<code>Component</code>](#Component)  
**Category**: Properties  

* * *

<a name="Component+base"></a>

#### component.base : <code>VNode</code> \| <code>HTMLElement</code> \| <code>array</code>
> HTMLElement used as "base" for the component instance. Can also be an array of elements if `template` return an array.

**Kind**: instance property of [<code>Component</code>](#Component)  
**Category**: Properties  

* * *

<a name="Component+mounted"></a>

#### component.mounted : <code>boolean</code>
Set to true when component is mounted

**Kind**: instance property of [<code>Component</code>](#Component)  
**Category**: Properties  

* * *


<br><br>

<a name="cloneElement"></a>
## :floppy_disk: `cloneElement(VNode, [newProps={}], [newChildren])`
> Clones the given virtual node, optionally updating its props and replacing its children

**Kind**: global function  
**Returns**: <code>object</code> - A new vnode object containing updated props / children  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vnode | <code>object.VNode</code> |  | A virtual node object to clone |
| [props] | <code>object</code> | <code>{}</code> | Attributes/props to set on the created element. |
| [...children] | <code>Array.&lt;VNode&gt;</code> | <code>[]</code> | All additional arguments are vnode children |

**Example**  
```js
import { h, render, cloneElement } from '@internet/dom'

const useRed = (vnode) => cloneElement(vnode, { style: 'color:red;' })

const normalText = <p>Some text</p>
const redText = useRed(normalText)

render(redText, document.body)
```

<br><br>

<a name="addRef"></a>
## :mag: `addRef(obj, refName)`
> Create a callback ref function

**Kind**: global function  
**Returns**: <code>function</code> - A callback ref function  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> \| <code>function</code> | Object or Component instance to add the reference to |
| refName | <code>string</code> | Name of the reference. Will be accessible from `obj[refName]` |

**Example**  
```js
import { h, render, addRef, Component } from '@internet/dom'

class App extends Component () {
  template () {
    return (
      <div>
        <button ref={addRef(this, 'button')}>A button</button>
      </div>
    )

    componentDidMount () {
       console.log('Button is mounted:', this.button)
    }
  }
}

render(<App />, document.body)
```
