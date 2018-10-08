'use strict'

var TYPES = ['nodes', 'components', 'refs']

function Collector () {
  this.data = {}
  for (var i = 0; i < TYPES.length; i++) this.data[TYPES[i]] = []
}

Collector.prototype.append = function (obj) {
  for (var k in obj) this.data[k] = this.data[k].concat(obj[k])
}

Collector.prototype.set = function (obj) {
  for (var k in obj) this.data[k] = obj[k]
}

Collector.prototype.get = function () {
  return this.data
}

export default Collector
