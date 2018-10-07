'use strict'

import rawRender from './renderers/raw'
import { dispatchRefs, dispatch } from './dispatch'

/**
 * > Render a virtual node into a `parent` Element
 *
 * @param {object} vnode A (JSX) VNode to render
 * @param {(HTMLElement|function)} mountTo DOM Element to render into. **You can also use a callback function.** The function will be called with DOM Elements to mount as first argument
 * @param {Component} [context] Component instance to attach rendered components and callback refs to (See example below)
 *
 * @return {object} Return an object containing:
 *   - `result.nodes` : Array of rendered DOM nodes
 *   - `result.components` : First-level components instances
 *   - `result.refs` : First-level callback refs
 *
 * @example
 * import { render, Component } from '@internet/dom'
 *
 * class App extends Component {
 *   render () {
 *     return (
 *        <main>
 *          <ul ref={el => this.ul = el}></ul>
 *          <button ref={el => this.button = el}>Add item</button>
 *        </main>
 *     )
 *   }
 *
 *   componentDidMount () {
 *    this.count = 0
 *    this.addItem = this.addItem.bind(this)
 *    this.button.addEventListener('click', this.addItem)
 *   }
 *
 *   addItem () {
 *     // Instanciate a new Item and append-it to the list.
 *     // By passing App instance as context to the rendered,
 *     // Rendered <Item> is added to the App's subcomponents list
 *     this.count++
 *     render(<Item count={this.count} />, li => this.ul.appendChild(li), this)
 *   }
 *
 *   componentWillUmount() {
 *     this.button.removeEventListener('click', this.addItem)
 *   }
 * }
 *
 * // Instanciate App component and append-it into <body>
 * render(<App />, document.body)
 */
function render (vnode, parent, context) {
  var rendered = rawRender(vnode)
  var mockComponent = { _collector: rendered } // for dispatch convenience

  // mount here
  var nodes = rendered.nodes.length < 2 ? rendered.nodes[0] : rendered.nodes
  if (typeof parent === 'function') parent(nodes)
  else if (parent) parent.appendChild(nodes)

  // dispatch callback refs
  dispatchRefs(mockComponent)
  dispatch(mockComponent, function (c) {
    c.mounted = true
    c.componentDidMount && c.componentDidMount(c.props)
  })

  // Add items to context
  if (context && context._collector) {
    var c = context._collector
    for (var i = 0; i < rendered.components.length; i++) {
      rendered.components[i]._parent = context
    }
    if (c.refs) c.refs = c.refs.concat(rendered.refs)
    if (c.components) c.components = c.components.concat(rendered.components)
  }

  mockComponent = undefined
  return rendered
}

export default render
