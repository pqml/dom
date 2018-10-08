'use strict'

import Collector from './Collector'
import setDomAttrib from './setDomAttrib'

function arr (e) { return Array.isArray(e) ? e : [e] }

// ---- RAW RENDERER ----
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

// ---- ARRAY ----
function renderArray (vdoms) {
  vdoms = arr(vdoms)
  var collector = new Collector()
  for (var i = 0; i < vdoms.length; i++) collector.append(rawRender(vdoms[i]))
  return collector.get()
}

// ---- PRIMITIVE ----
function renderPrimitive (vdom) {
  var collector = new Collector()
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    collector.append({ nodes: document.createTextNode(vdom + '') })
  }
  return collector.get()
}

// ---- DOM ----
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
  for (var k in vdom.props) setDomAttrib(el, k, vdom.props[k])
  for (i = 0; i < domChildren.length; i++) el.appendChild(domChildren[i])

  if (props.ref) collector.append({ refs: { ref: el, fn: props.ref } })
  collector.append({ nodes: el })
  return collector.get()
}

// ---- DIRECT DOM ----
function renderDirectDom (vdom, props) {
  var collector = new Collector()
  collector.append({ nodes: vdom })
  return collector.get()
}

// ---- STATELESS ----
function renderStateless (_vdom, props) {
  var collector = new Collector()
  var vdom = _vdom.type(props)
  collector.append(rawRender(vdom))
  return collector.get()
}

// ---- CLASS ----
function renderClass (_vdom, props) {
  var collector = new Collector()

  // instanciate it and call willMount
  var instance = new _vdom.type(props) // eslint-disable-line
  instance.componentWillMount(props)

  var vdom = instance.template(props)
  // append its own ref ? not sur if I need to do this here or in the collector reset
  if (props.ref) collector.append({ refs: { ref: instance, fn: props.ref } })
  collector.append(rawRender(vdom))

  // create a useful "base" property
  var nodes = collector.data.nodes
  instance.base = nodes.length > 1 ? nodes : nodes[0]

  // collect all sub refs / components and add them to the instance's own collector
  instance._collector = {}
  instance._collector.components = collector.data.components
  instance._collector.refs = collector.data.refs

  // reset the collector (collector.components only contains the current instance)
  // used for possible parents and for correct didmount / refs dispatching
  collector.set({ components: [instance], refs: [] })

  // add a parent "private" property to each sub-components
  for (var i = 0; i < instance._collector.components.length; i++) {
    instance._collector.components[i]._parent = instance
  }

  return collector.get()
}

export default rawRender