'use strict'

import h from './h'
import extend from './utils/extend'

/**
 * > Clones the given virtual node, optionally updating its props and replacing its children
 *
 * @param {object.VNode} vnode A virtual node object to clone
 * @param {object} [props={}] Attributes/props to set on the created element.
 * @param {...VNode[]} [children=[]] All additional arguments are vnode children
 *
 * @return {object} A new vnode object containing updated props / children
 *
 * @example
 * import { h, render, cloneElement } from '@internet/dom'
 *
 * const useRed = (vnode) => cloneElement(vnode, { style: 'color:red;' })
 *
 * const normalText = <p>Some text</p>
 * const redText = useRed(normalText)
 *
 * render(redText, document.body)
 */
function cloneElement (vnode, props) {
  return h(
    vnode.nodeName,
    extend(extend({}, vnode.props), props),
    arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children
  )
}

export default cloneElement
