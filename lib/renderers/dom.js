'use strict'

import Collector from '../Collector'
import rawRender from './raw'

function startsWith (str, w) { return str.substr(0, w.length) === w }

// set attributes for a dom node
function setAttribute (dom, key, value) {
  if (key === 'class') key = 'className'
  if (typeof value === 'function' && startsWith(key, 'on')) {
    var eventType = key.toLowerCase()
    dom[eventType] = value
  } else if (key === 'checked' || key === 'value' || key === 'className') {
    dom[key] = value
  } else if (key === 'style') {
    if (typeof value === 'object') Object.assign(dom.style, value)
    else if (typeof value === 'string') dom.style.cssText = value
  } else if (typeof value !== 'object' && typeof value !== 'function') {
    dom.setAttribute(key, value)
  }
}

function renderDom (vdom, props) {
  // render and collect vdom's children
  var collector = new Collector()
  var domChildren = []
  for (var i = 0; i < props.children.length; i++) {
    var result = rawRender(props.children[i])
    if (result.nodes) {
      domChildren = domChildren.concat(result.nodes)
      collector.append({ components: result.components, refs: result.refs })
    }
  }

  // create dom element
  var el = document.createElement(vdom.type)
  for (var k in vdom.props) setAttribute(el, k, vdom.props[k])
  for (i = 0; i < domChildren.length; i++) el.appendChild(domChildren[i])

  if (props.ref) collector.append({ refs: { ref: el, fn: props.ref } })
  collector.append({ nodes: el })
  return collector.get()
}

export default renderDom
