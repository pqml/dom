const React = { createElement }
const h = createElement

function startsWith (str, search) {
  return str.substr(0, search.length) === search
}

function createElement (el, props) {
  if (props === null) props = {}
  var i, k
  var ref = props.ref
  delete props.ref
  var children = [].concat.apply([], [].slice.call(arguments, 2)) // array & flatten

  var domChildren = []
  for (i = 0; i < children.length; i++) {
    var child = children[i]
    if (typeof child === 'string' || typeof child === 'number') {
      domChildren.push(document.createTextNode(child))
    } else if (!child) {
      continue
    } else {
      domChildren.push(child)
    }
  }

  if (typeof el === 'string') {
    var domEl = document.createElement(el)
    for (k in props) setAttribute(domEl, k, props[k])
    for (i = 0; i < domChildren.length; i++) domEl.appendChild(domChildren[i])
    ref && ref(domEl)
    return domEl
  }

  if (typeof el === 'function') {
    props.children = children
    var e
    var isStateless = !el.prototype || typeof el.prototype.render !== 'function'
    if (isStateless) {
      e = el(props)
      ref && ref(e)
    } else {
      const instance = new el(props) // eslint-disable-line
      console.log(instance)
      e = instance.render(props)
      ref && ref(instance)
    }
    return e
  }
}

function setAttribute (dom, key, value) {
  if (key === 'class') key = 'className'
  if (typeof value === 'function' && startsWith(key, 'on')) {
    const eventType = key.slice(2).toLowerCase()
    dom[eventType] = value
  } else if (key === 'checked' || key === 'value' || key === 'className') {
    dom[key] = value
  } else if (key === 'style') {
    if (typeof value === 'object') Object.assign(dom.style, value)
    else if (typeof value === 'string') dom.style.cssText = value
  } else if (typeof value !== 'object' && typeof value !== 'function') {
    dom.setAttribute(key, value)
  }
};

export { h, React }
