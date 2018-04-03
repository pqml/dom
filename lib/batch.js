'use strict'

/**
 * @module dom
 */

import raf from '@internet/raf'

var reads = []
var writes = []
var scheduled = false

function shedule () {
  raf.addBefore(batch)
  raf.requestOnce()
  scheduled = true
}

function batch () {
  scheduled = false
  raf.remove(batch)
  var i, len
  // reads
  for (i = 0, len = reads.length; i < len; i++) {
    reads[i][0]()
    if (reads[i][1]) reads[i][1]()
    reads[i] = undefined
  }
  // writes
  for (i = 0, len = writes.length; i < len; i++) {
    writes[i][0]()
    if (writes[i][1]) writes[i][1]()
    writes[i] = undefined
  }
  reads = []
  writes = []
}

/**
 * Request a read on the current DOM layout
 * @param {function} callback Function called in the next frame alongside other DOM reading actions
 * @param {boolean} [needPromise=false] If set to true, measure will return a promise resolved at the end of the callback call
 */
export function measure (callback, needPromise) {
  !scheduled && shedule()
  if (needPromise) {
    var arr = [callback, undefined]
    reads.push(arr)
    return new Promise(function (resolve) { arr[1] = resolve })
  } else {
    reads.push([callback])
  }
}

/**
 * Request a mutation (or any other method that invalidates the DOM layout) on the current DOM layout
 * @param {function} callback Function called in the next frame alongside other DOM writing actions
 * @param {boolean} [needPromise=false] If set to true, measure will return a promise resolved at the end of the callback call
 */
export function mutate (callback, needPromise) {
  !scheduled && shedule()
  if (needPromise) {
    var arr = [callback, undefined]
    writes.push(arr)
    return new Promise(function (resolve) { arr[1] = resolve })
  } else {
    writes.push([callback])
  }
}

/**
 * Remove a callback from queued reads
 * @param {function} callback Function to remove
 */
export function removeMeasure (callback) {
  var i, len
  var liveReads = []
  for (i = 0, len = reads.length; i < len; i++) {
    if (reads[i][0] !== callback) liveReads.push(reads[i])
  }
  reads = liveReads
}

/**
 * Remove a callback from queued write
 * @param {function} callback Function to remove
 */
export function removeMutate (callback) {
  var i, len
  var liveWrites = []
  for (i = 0, len = writes.length; i < len; i++) {
    if (writes[i][0] !== callback) liveWrites.push(writes[i])
  }
  writes = liveWrites
}
