'use strict'

function startsWith (str, w) { return str.substr(0, w.length) === w }

function setDomAttrib (dom, key, value) {
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

export default setDomAttrib
