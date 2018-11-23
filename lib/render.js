'use strict'

import rawRender from './utils/rawRender'
import { dispatchRefs, dispatch } from './utils/dispatch'

/**
 * > Renders a virtual node and mount-it into a `parent` Element
 *
 * > :warning: `render` always dispatch lifecycle events. Even if you don't pass a parent as 2nd argument, all componentDidMount methods and callback refs will be called. Be carreful!
 *
 * > :warning: If you render a virtual node inside an already mounted component,
 * use its [component.render method](#Component+render) instead.
 * Otherwise, the rendered subcomponents and callback refs will not be register as "childs" of the parent component.
 * This can lead to bad lifecycle dispatching if you destroy the parent for instance.
 *
 * @param {object} vnode A (JSX) VNode to render
 * @param {(HTMLElement|function)} [parent] DOM Element to render into. **You can also use a callback function:** the function will be called with DOM Elements to mount as first argument
 * @param {Component} [parentComponent] The parent component instance where the vnode will be mounted. You can directly use `parentComponent.render(vnode, parent)`
 *
 * @return {object} Return an object containing:
 *   - `result.nodes` : Array of rendered DOM nodes
 *   - `result.components` : First-level components instances
 *   - `result.refs` : First-level callback refs
 *
 * @example
 * import { h, render } from '@internet/dom'
 * import App from 'components/App'
 *
 * // Instanciate an App component and append it to document.body
 * render(<App />, document.body)
 *
 * // Insert a new div into document.body, before the first child of document.body
 * render(<div>Some text</div>, div => {
 *   document.body.insertBefore(div, document.body.firstChild)
 * })
 */
function render (vnode, parent, context) {
  // render
  var i = 0
  var rendered = rawRender(vnode)

  // mount
  if (typeof parent === 'function') {
    var nodes = rendered.nodes.length < 2 ? rendered.nodes[0] : rendered.nodes
    parent(nodes)
  } else if (parent) {
    for (i = 0; i < rendered.nodes.length; i++) {
      parent.appendChild(rendered.nodes[i])
    }
  }

  // dispatch callback refs and didmounts
  var mockComponent = { _collector: rendered } // for dispatch convenience
  dispatchRefs(mockComponent)
  dispatch(mockComponent, function (c) {
    c.mounted = true
    c.componentDidMount && c.componentDidMount(c.props)
  })

  // Add items to context
  if (context && context._collector) {
    var c = context._collector
    for (i = 0; i < rendered.components.length; i++) {
      rendered.components[i]._parent = context
    }
    if (c.refs) c.refs = c.refs.concat(rendered.refs)
    if (c.components) c.components = c.components.concat(rendered.components)
  }

  mockComponent = undefined
  return rendered
}

export default render
