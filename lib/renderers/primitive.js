'use strict'

import Collector from '../Collector'

function renderPrimitive (vdom) {
  var collector = new Collector()
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    collector.append({ nodes: document.createTextNode(vdom + '') })
  }
  return collector.get()
}

export default renderPrimitive
