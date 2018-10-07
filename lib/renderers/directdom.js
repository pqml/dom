'use strict'

import Collector from '../Collector'

function renderDirectDom (vdom, props) {
  var collector = new Collector()
  collector.append({ nodes: vdom })
  return collector.get()
}

export default renderDirectDom
