'use strict'

import renderArray from './array'
import renderClass from './class'
import renderDirectDom from './directdom'
import renderDom from './dom'
import renderPrimitive from './primitive'
import renderStateless from './stateless'

function rawRender (vdom) {
  if (Array.isArray(vdom)) return renderArray(vdom)
  if (vdom instanceof window.Element) return renderDirectDom(vdom)
  if (typeof vdom !== 'object') return renderPrimitive(vdom)

  // one-level deep flatten children array
  var props = Object.assign(
    {},
    vdom.props,
    { children: [].concat.apply([], vdom.children || []) }
  )

  if (vdom.isDom) return renderDom(vdom, props)
  if (vdom.isStateless) return renderStateless(vdom, props)
  if (vdom.isComponent) return renderClass(vdom, props)
}

export default rawRender
