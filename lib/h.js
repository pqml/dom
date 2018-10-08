'use strict'

/**
 * > Creates a VNode (virtual DOM element).
 *
 * @param {string | function} nodeName A tagname or a component. e.g. `'div'`, `'a'`, `Component`
 * @param {object} [props={}] Attributes/props to set on the created element.
 * @param {...VNode[]} [children=[]] All additional arguments are vnode children
 *
 * @return {object} A vnode object containing its type, props, children and some flags
 *
 * @example
 * import { h, render } from '@internet/dom'
 *
 * // Create a new vnode using JSX (via Babel or Bublé)
 * const node = <div style="color: red">Hello</div>
 *
 * // The same node can be made using directly the `h` function
 * const node = h('div', { style: 'color: red' }, 'Hello')
 *
 * // render the created node into <body>
 * render(node, document.body)
 */
function h (type, props) {
  var vn = {}
  vn.type = type
  vn.props = props || {}
  vn.children = [].concat.apply([], [].slice.call(arguments, 2)) // array & flatten

  vn.isComponent = typeof type === 'function' && type.prototype && typeof type.prototype.render === 'function'
  vn.isStateless = typeof type === 'function' && !vn.isComponent
  vn.isDom = typeof type === 'string'
  return vn
}

export default h
