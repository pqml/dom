'use strict'

import Collector from '../Collector'
import rawRender from './raw'

function renderStateless (_vdom, props) {
  var collector = new Collector()
  var vdom = _vdom.type(props)
  collector.append(rawRender(vdom))
  return collector.get()
}

export default renderStateless
