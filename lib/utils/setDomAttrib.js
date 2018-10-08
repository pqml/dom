'use strict'

// Some portions of code are taken from preact
// https://github.com/developit/preact/blob/master/src/dom/index.js

function startsWith (str, w) { return str.substr(0, w.length) === w }
const ns = ['xlink', 'xmlns', 'xml']

function setDomAttrib (el, name, value, isSvg) {
  // Normalize class attribute
  if (name === 'className') name = 'class'

  // Correct attribute like xlmns:xlink
  for (var i = 0; i < ns.length; i++) {
    if (startsWith(name, ns[i])) {
      var len = ns[i].length
      if (name[len] && name[len] !== ':') {
        name = ns[i] + ':' + name[len].toLowerCase() + name.substr(len + 1, name.length)
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
    if (typeof value === 'object') Object.assign(el.style, value)
    else if (typeof value === 'string') el.style.cssText = value

  // Attrib
  } else if (name !== 'list' && name !== 'type' && !isSvg && name in el) {
    // Attempt to set an attribute to the given value.
    // IE & FF throw for certain property-value combinations.
    try { el[name] = value == null ? '' : value } catch (e) { }

  // Attrib via setAttribute
  } else if (typeof value !== 'object' && typeof value !== 'function') {
    let ns = isSvg && (name !== (name = name.replace(/^xlink:?/, '')))
    if (ns) el.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value)
    else el.setAttribute(name, value)
  }
}

export default setDomAttrib
