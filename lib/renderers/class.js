'use strict'

import Collector from '../Collector'
import rawRender from './raw'

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

export default renderClass
