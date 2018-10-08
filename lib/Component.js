'use strict'

import _render from './render'

/**
 * Create a new Component
 * @class Component
 * @param {object} [props={}] Component properties / attributes. Can also contains children.
 * @constructor
 */

function Component (props) {
  this._parent = null
  this._collector = { refs: [], components: [] }

  /**
   * > Contains all component properties and children. <br>
   * > Do not modify it directly, but recreate a new component using `cloneElement` instead
   * @type {object}
   * @category Properties
   */
  this.props = props || {}

  /**
   * > HTMLElement used as "base" for the component instance. Can also be an array of elements if `template` return an array.
   * @type {(VNode|HTMLElement|array)}
   * @category Properties
   */
  this.base = null

  /**
   * Set to true when component is mounted
   * @type {boolean}
   * @category Properties
   */
  this.mounted = false
}

/**
 * > `component.template` will be called during the component initial rendering to create the `component.base` node
 * @method
 * @category Methods
 * @param {object} [props={}] `component.props` automatically passed as argument.
 * @return {(VNode|HTMLElement)} VNode (JSX or `h` calls) or real HTMLElement that will be rendered as the `component.base` node. You can also return an array of elements.
 * @example
 * import { h, Component, render } from '@internet/dom'
 *
 * class HelloDiv extends Component {
 *   template () {
 *     // will create a new p tag
 *     return <div>Hello!</div>
 *   }
 * }
 * // Append a new "Hello!" div to document.body
 * render(<HelloDiv/>, document.body)
 *
 * class MainComponent extends Component {
 *   template () {
 *     // use the existing <main> node as the component base
 *     return document.querySelector('main')
 *   }
 * }
 *
 * // Create a new MainComponent, using an already existing dom node
 * render(<MainComponent />)
 */
Component.prototype.template = function () {}

/**
 * > `component.componentWillMount` will be called by `render` just before a the component template rendering
 * @method
 * @category Methods
 * @param {object} [props={}] `component.props` automatically passed as argument.
 */
Component.prototype.componentWillMount = function componentWillMount () {}

/**
 * > `component.componentDidMount` will be called by `render` when all the rendered dom tree is mounted
 * @method
 * @category Methods
 * @param {object} [props={}] `component.props` automatically passed as argument.
 */
Component.prototype.componentDidMount = function componentDidMount () {}

/**
 * > `component.componentWillUnmount` will be called when the component or one of its ancestors is destroyed
 * @method
 * @category Methods
 * @param {object} [props={}] `component.props` automatically passed as argument.
 */
Component.prototype.componentWillUnmount = function componentWillUnmount () {}

/**
 * > Render a vnode or array of vnodes and register the rendered content as "child" of this component. <br>
 * > Use this method when you want to add content to the component after the initial rendering. <br>
 * > This ensures new items will be correctly unmount when the component is destroyed.
 * @method
 * @category Methods
 * @param {object} vnode A (JSX) VNode to render
 * @param {(HTMLElement|function)} [parent] DOM Element to render into. **You can also use a callback function:** the function will be called with DOM Elements to mount as first argument
 * @return {object} Return an object containing rendered `nodes`, `components` and `refs`
 *
 * @example
 * import { h, Component, render } from '@internet/dom'
 *
 * class Item extends Component {
 *   template () {
 *     return <li>Item</li>
 *   }
 * }
 *
 * class List extends Component {
 *   template () {
 *     return (
 *       <div>
 *         <ul ref={el => { this.ul = el }}></ul>
 *         <button ref={el => { this.button = el }}>Add Item</button>
 *       </div>
 *     )
 *   }
 *
 *   addItem () {
 *     // Render a new Item instance and add it to the list
 *     // All created Items will be properly destroyed when the List instance is removed
 *     this.render(<Item />, this.ul)
 *   }
 *
 *   componentDidMount () {
 *     this.addItem = this.addItem.bind(this)
 *     this.button.addEventListener('click', this.addItem)
 *   }
 *
 *   componentWillUnmount () {
 *     this.button.removeEventListener('click', this.addItem)
 *   }
 * }
 *
 * render(<List />, document.body)
 */
Component.prototype.render = function render (vdom, parent) { _render(vdom, parent, this) }

/**
 * Destroy the component and its children components.
 *  - This also removes component props and de-reference the component from its parent.
 *  - Callback refs inside the component tree will be called with `null` as first argument
 *  - Set component.mounted to false
 * @method
 * @category Methods
 * @example
 * import { h, Component, render } from '@internet/dom'
 *
 * class SelfDestructButton extends Component {
 *   template() {
 *      return <button>Destroy me</button>
 *   }
 *
 *   componentDidMount() {
 *     this.destroy = this.destroy.bind(this)
 *     this.base.addEventListener('click', this.destroy)
 *   }
 *
 *   componentWillUnmount() {
 *     this.base.removeEventListener('click', this.destroy)
 *   }
 * }
 *
 * render(<SelfDestructButton />, document.body)
 */
Component.prototype.destroy = function destroy () {
  var i = 0
  this.componentWillUnmount(this.props)

  // destroy subcomponents
  for (i = this._collector.components.length - 1; i >= 0; i--) {
    this._collector.components[i].destroy()
  }

  this.mounted = false

  // unregister component from parent and dispose _parent
  if (this._parent) {
    var index = this._parent._collector.components.indexOf(this)
    if (~index) this._parent._collector.components.splice(index, 1)
    this._parent = null
  }

  // callback all ref with null and destroy them from the collector
  for (i = this._collector.refs.length - 1; i >= 0; i--) {
    this._collector.refs[i].fn(null)
    this._collector.refs.splice(i, 1)
  }

  // Unmount from dom
  var base = Array.isArray(this.base) ? this.base : [this.base]
  for (i = 0; i < base.length; i++) {
    if (base[i] && base[i].parentNode) base[i].parentNode.removeChild(base[i])
  }

  // Remove base
  this.base = base = null

  // Remove props to avoid memory leaks
  this.props = {}
}

export default Component
