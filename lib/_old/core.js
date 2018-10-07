'use strict'

/**
 * @module dom
 * @example
 * import { el, css, ... } from '@internet/dom'
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
 * @return {HTMLElement}
 * @category Core
 */
export function css (el, style) {
  for (var k in style) {
    el.style[k] = style[k]
    if (!VENDORSPREFIXES[k]) continue
    var pre = VENDORSPREFIXES[k]
    for (var i = 0; i < pre.length; i++) el.style[pre[i] + k] = style[k]
  }
  return el
}

/**
 * Apply custom data to an element
 * @param {HTMLElement} element A HTML element
 * @param {object} dataset An object containing custom data properties
 * @return {HTMLElement}
 * @category Core
 */
export function data (el, dataset) {
  for (var k in dataset) el.dataset[k] = dataset[k]
  return el
}

/**
 * Set attributes to an element
 * @param {HTMLElement} element A HTML element
 * @param {object} attrs An object containing element attributes
 * @return {HTMLElement}
 * @category Core
 */
export function attr (el, attrs) {
  for (var k in attrs) el.setAttribute(k, attrs[k])
  return el
}

/**
 * Add classes to an element
 * @param {HTMLElement} element A HTML element
 * @param {(string|array)} dataset A string or an array containing class names
 * @return {HTMLElement}
 * @category Core
 */
export function classes (el, list) {
  list = arr(list)
  for (var i = 0; i < list.length; i++) el.list.add(list[i])
  return el
}

/**
 * Create a new HTML Element
 * @param {string} tagname HTML Element tag name
 * @param {object} props Element properties. You can use callback refs.
 * @param {array} children Element children
 * @return {HTMLElement}
 * @category Core
 */
export function el (tagname, props, children) {
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
      var n = children[i]
      var t = typeof n
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
