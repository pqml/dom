# DOM utilities
[:books: **Documentation**](#api) | [:tada: **Example**](https://pqml.github.io/dom) | [:globe_with_meridians: **Internet modules**](https://www.npmjs.com/org/internet)

- `el` function to create elements, with nesting support
- `css` / `attr` / `data` / `classes` functions to modify an existing element
- DOM batching
- Basic jsx support


<br>

# Requirements
- ES6 Modules support
  - RequestAnimationFrame
  - Promise object (only for Batching methods)
  - Using a module bundler like Webpack, Rollup or Parcel
  - [Native support from browser](https://caniuse.com/#feat=es6-module)
  - From NodeJS with something like [esm](https://github.com/standard-things/esm)

<br>

# Installation
```sh
# using npm
$ npm install --save @internet/dom

# or using yarn
$ yarn add @internet/dom
```

<br>

# JSX Support
The dom package contains a tiny jsx support. You can use `h` pragma or use `React.createElement`.
It will directly generate a dom tree or an array of dom trees.

- Diffing and state management will not be implemented
- For the moment there is no vdom generated
- Stateless components and callback refs are implemented
- Class components with a render method will work but lifecycle methods are not supported.
- Methods `cloneElement` / `mount` / `render` are unavailable.

<br>

<a name="api"></a>
# API

<a name="module_dom"></a>
**Example**  
```js
import { el, css, ... } from '@internet/dom'
```
#### API

* [dom](#module_dom)
    * _Core_
        * [.css(element, style)](#module_dom.css) ⇒ <code>HTMLElement</code>
        * [.data(element, dataset)](#module_dom.data) ⇒ <code>HTMLElement</code>
        * [.attr(element, attrs)](#module_dom.attr) ⇒ <code>HTMLElement</code>
        * [.classes(element, dataset)](#module_dom.classes) ⇒ <code>HTMLElement</code>
        * [.el(tagname, props, children)](#module_dom.el) ⇒ <code>HTMLElement</code>
    * _DOM Batching_
        * [.measure(callback, [needPromise])](#module_dom.measure)
        * [.mutate(callback, [needPromise])](#module_dom.mutate)
        * [.removeMeasure(callback)](#module_dom.removeMeasure)
        * [.removeMutate(callback)](#module_dom.removeMutate)

<br>
<a name="module_dom.css"></a>

#### dom.css(element, style) ⇒ <code>HTMLElement</code>
Stylize an element

**Kind**: static method of [<code>dom</code>](#module_dom)  
**Category**: Core  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | A HTML element |
| style | <code>object</code> | An object containing style properties |


* * *

<a name="module_dom.data"></a>

#### dom.data(element, dataset) ⇒ <code>HTMLElement</code>
Apply custom data to an element

**Kind**: static method of [<code>dom</code>](#module_dom)  
**Category**: Core  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | A HTML element |
| dataset | <code>object</code> | An object containing custom data properties |


* * *

<a name="module_dom.attr"></a>

#### dom.attr(element, attrs) ⇒ <code>HTMLElement</code>
Set attributes to an element

**Kind**: static method of [<code>dom</code>](#module_dom)  
**Category**: Core  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | A HTML element |
| attrs | <code>object</code> | An object containing element attributes |


* * *

<a name="module_dom.classes"></a>

#### dom.classes(element, dataset) ⇒ <code>HTMLElement</code>
Add classes to an element

**Kind**: static method of [<code>dom</code>](#module_dom)  
**Category**: Core  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | A HTML element |
| dataset | <code>string</code> \| <code>array</code> | A string or an array containing class names |


* * *

<a name="module_dom.el"></a>

#### dom.el(tagname, props, children) ⇒ <code>HTMLElement</code>
Create a new HTML Element

**Kind**: static method of [<code>dom</code>](#module_dom)  
**Category**: Core  

| Param | Type | Description |
| --- | --- | --- |
| tagname | <code>string</code> | HTML Element tag name |
| props | <code>object</code> | Element properties. You can use callback refs. |
| children | <code>array</code> | Element children |


* * *

<a name="module_dom.measure"></a>

#### dom.measure(callback, [needPromise])
Request a read on the current DOM layout

**Kind**: static method of [<code>dom</code>](#module_dom)  
**Category**: DOM Batching  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | Function called in the next frame alongside other DOM reading actions |
| [needPromise] | <code>boolean</code> | <code>false</code> | If set to true, measure will return a promise resolved at the end of the callback call |


* * *

<a name="module_dom.mutate"></a>

#### dom.mutate(callback, [needPromise])
Request a mutation (or any other method that invalidates the DOM layout) on the current DOM layout

**Kind**: static method of [<code>dom</code>](#module_dom)  
**Category**: DOM Batching  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | Function called in the next frame alongside other DOM writing actions |
| [needPromise] | <code>boolean</code> | <code>false</code> | If set to true, measure will return a promise resolved at the end of the callback call |


* * *

<a name="module_dom.removeMeasure"></a>

#### dom.removeMeasure(callback)
Remove a callback from queued reads

**Kind**: static method of [<code>dom</code>](#module_dom)  
**Category**: DOM Batching  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function to remove |


* * *

<a name="module_dom.removeMutate"></a>

#### dom.removeMutate(callback)
Remove a callback from queued write

**Kind**: static method of [<code>dom</code>](#module_dom)  
**Category**: DOM Batching  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function to remove |


* * *

