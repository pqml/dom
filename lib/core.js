'use strict'

/**
 * @module dom
 */

var VENDORSPREFIXES = {
  'transform': ['-webkit-', '-ms-']
}

/**
 * Stylize an element
 * @param {HTMLElement} element A HTML element
 * @param {object} style An object containing style properties
 */
export function css (element, style) {
  for (var k in style) {
    element.style[k] = style[k]
    if (!VENDORSPREFIXES[k]) continue
    var prefixes = VENDORSPREFIXES[k]
    for (var i = 0; i < prefixes.length; i++) {
      element.style[prefixes[i] + k] = style[k]
    }
  }
}

/**
 * Apply custom data to an element
 * @param {HTMLElement} element A HTML element
 * @param {object} dataset An object containing custom data properties
 */
export function data (element, dataset) {
  for (var k in dataset) {
    element.dataset[k] = dataset[k]
  }
}

/**
 * Set attributes to an element
 * @param {HTMLElement} element A HTML element
 * @param {object} attrs An object containing element attributes
 */
export function attr (element, attrs) {
  for (var k in attrs) {
    element.setAttribute(k, attrs[k])
  }
}

/**
 * Add classes to an element
 * @param {HTMLElement} element A HTML element
 * @param {(string|array)} dataset A string or an array containing class names
 */
export function classes (element, classList) {
  if (!Array.isArray(classList)) classList = [classList]
  for (var i = 0; i < classList.length; i++) {
    element.classList.add(classList[k])
  }
}

/**
 * Create a new HTML Element
 * @param {string} tagname HTML Element tag name
 * @param {object} props Element properties
 */
export function node (tagname, props) {
  if (props === void 0) props = {}
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
    } else {
      $[k] = props[k]
    }
  }
  return $
}
