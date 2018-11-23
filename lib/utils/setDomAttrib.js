'use strict'

// Some portions of code are taken from preact
// https://github.com/developit/preact/blob/master/src/dom/index.js

import extend from './extend'

var namespaces = ['xlink', 'xmlns', 'xml']
var doubleAttr = ['autoplay', 'muted', 'webkit-playsinline', 'playsinline']
var val

function startsWith (str, w) { return str.substr(0, w.length) === w }
function setDomAttrib (el, name, value, isSvg) {
  // Normalize class attribute
  if (name === 'className') name = 'class'

  // Correct attribute like xlmns:xlink
  for (var i = 0; i < namespaces.length; i++) {
    if (startsWith(name, namespaces[i])) {
      var len = namespaces[i].length
      if (name[len] && name[len] !== ':') {
        name = namespaces[i] + ':' + name[len].toLowerCase() + name.substr(len + 1, name.length)
      }
      break
    }
  }

  // Ignored props
  if (name === 'ref') {

  // Event attribute
  } else if (typeof value === 'function' && startsWith(name, 'on')) {
    var eventType = name.toLowerCase()
    el[eventType] = value

  // Class - only for non-svg node
  } else if (name === 'class' && !isSvg) {
    el.className = value || ''

  // Style attribute
  } else if (name === 'style') {
    if (typeof value === 'object') extend(el.style, value)
    else if (typeof value === 'string') el.style.cssText = value

  // Attrib
  } else if (name !== 'list' && name !== 'type' && !isSvg && name in el) {
    // Attempt to set an attribute to the given value.
    // IE & FF throw for certain property-value combinations.
    try {
      val = value == null ? '' : value
      el[name] = val
      if (~doubleAttr.indexOf(name)) el.setAttribute(name, val === true ? '' : val)
    } catch (e) {}
  // Attrib via setAttribute
  } else if (typeof value !== 'object' && typeof value !== 'function') {
    var ns = isSvg && (name !== (name = name.replace(/^xlink:?/, '')))
    if (ns) el.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value)
    else {
      val = value == null ? '' : value
      el.setAttribute(name, val === true ? '' : val)
      if (~doubleAttr.indexOf(name)) el[name] = val
    }
  }
}

export default setDomAttrib
