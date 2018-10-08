'use strict'

export function dispatch (component, cb, topDown) {
  var subs = component._collector && component._collector.components
  if (topDown) cb(component)
  if (subs) for (var i = 0; i < subs.length; i++) dispatch(subs[i], cb)
  if (!topDown) cb(component)
}

function callRefs (component) {
  for (var i = 0; i < component._collector.refs.length; i++) {
    component._collector.refs[i].fn(component._collector.refs[i].ref)
    component._collector.refs[i].ref = null // Is this really needed or a good thing ?
  }
}

export function dispatchRefs (component) {
  dispatch(component, callRefs)
}
