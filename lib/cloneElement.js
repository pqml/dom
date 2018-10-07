'use strict'

import h from './h'

export default function cloneElement (vnode, props) {
  return h(
    vnode.nodeName,
    Object.assign(Object.assign({}, vnode.props), props),
    arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children
  )
}
