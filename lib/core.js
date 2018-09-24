'use strict'

/**
 * @module dom
 */

// force array
function arr (e) { return Array.isArray(e) ? e : [e] }

var VENDORSPREFIXES = {
  'transform': ['-webkit-', '-ms-']
}

/**
 * Stylize an element
 * @param {HTMLElement} element A HTML element
 * @param {object} style An object containing style properties
 */
export function css (el, style) {
  for (var k in style) {
    el.style[k] = style[k]
    if (!VENDORSPREFIXES[k]) continue
    var pre = VENDORSPREFIXES[k]
    for (var i = 0; i < pre.length; i++) el.style[pre[i] + k] = style[k]
  }
}

/**
 * Apply custom data to an element
 * @param {HTMLElement} element A HTML element
 * @param {object} dataset An object containing custom data properties
 */
export function data (element, dataset) {
  for (var k in dataset) element.dataset[k] = dataset[k]
}

/**
 * Set attributes to an element
 * @param {HTMLElement} element A HTML element
 * @param {object} attrs An object containing element attributes
 */
export function attr (element, attrs) {
  for (var k in attrs) element.setAttribute(k, attrs[k])
}

/**
 * Add classes to an element
 * @param {HTMLElement} element A HTML element
 * @param {(string|array)} dataset A string or an array containing class names
 */
export function classes (element, list) {
  list = arr(list)
  for (var i = 0; i < list.length; i++) element.list.add(list[i])
}

/**
 * Create a new HTML Element
 * @param {string} tagname HTML Element tag name
 * @param {object} props Element properties. You can use callback refs.
 * @param {array} children Element children
 */
export function node (tagname, props, children) {
  if (!props) props = {}
  var $ = document.createElement(tagname)
  for (var k in props) {
    if (k === 'classes' || k === 'classlist') {
      classes($, props[k])
    } else if (k === 'css') {
      css($, props[k])
    } else if (k === 'attributes' || k === 'attr') {
      attr($, props[k])
    } else if (k === 'dataset' || k === 'data') {
      data($, props[k])
    } else if (k !== 'ref') {
      $[k] = props[k]
    }
  }
  if (children) {
    for (var i = 0; i < children.length; i++) {
      const n = children[i]
      const t = typeof n
      if (t === 'string' || t === 'number' || t === 'boolean' || t === 'number' || !n) {
        $.appendChild(document.createTextNode(n + ''))
      } else {
        $.appendChild(n)
      }
    }
  }
  if (typeof props.ref === 'function') props.ref($)
  return $
}
