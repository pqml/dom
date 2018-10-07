'use strict'

function Component (props) {
  this._parent = null
  this._collector = { refs: [], components: [] }
  this.props = props || {}
  this.base = null
  this.mounted = false
}

Component.prototype.componentWillMount = function componentWillMount () {}
Component.prototype.render = function render () {}
Component.prototype.componentDidMount = function componentDidMount () {}
Component.prototype.componentWillUnmount = function componentWillUnmount () {}

Component.prototype.registerComponent = function registerComponent (c) {
  if (!c.render || ~this._collector.components.indexOf(c)) return
  c._parent = this
  this._collector.components.push(c)
}

Component.prototype.unregisterComponent = function unregisterComponent (c) {
  var index = this._collector.components.indexOf(c)
  if (!c.render || !~index) return
  c._parent = null
  this._collector.components.splice(index, 1)
}

Component.prototype.destroy = function destroy () {
  var i = 0

  // destroy subcomponents
  for (i = this._collector.components.length - 1; i >= 0; i--) {
    this._collector.components[i].destroy()
  }

  if (this._parent) this._parent.unregisterComponent(this)
  this.componentWillUnmount(this.props)
  this.mounted = false

  // callback all ref with null and destroy them from the collector
  for (i = this._collector.refs.length - 1; i >= 0; i--) {
    this._collector.refs[i].fn(null)
    this._collector.refs.splice(i, 1)
  }

  // Unmount from dom
  var base = Array.isArray(this.base) ? this.base : [this.base]
  for (i = 0; i < base.length; i++) {
    if (base[i] && base[i].parentNode) base[i].parentNode.removeChild(base[i])
  }

  this.base = base = null
  this.props = null
}

export default Component
