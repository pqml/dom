'use strict'

import Collector from '../Collector'
import rawRender from './raw'

function arr (e) { return Array.isArray(e) ? e : [e] }

function renderArray (vdoms) {
  vdoms = arr(vdoms)
  var collector = new Collector()
  for (var i = 0; i < vdoms.length; i++) collector.append(rawRender(vdoms[i]))
  return collector.get()
}

export default renderArray
