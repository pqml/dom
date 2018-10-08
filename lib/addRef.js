'use strict'

/**
 * > Create a callback ref function
 *
 * @param {(object|function)} obj Object or Component instance to add the reference to
 * @param {string} refName Name of the reference. Will be accessible from `obj[refName]`
 *
 * @return {function} A callback ref function
 *
 * @example
 * import { h, render, addRef, Component } from '@internet/dom'
 *
 * class App extends Component () {
 *   template () {
 *     return (
 *       <div>
 *         <button ref={addRef(this, 'button')}>A button</button>
 *       </div>
 *     )
 *
 *     componentDidMount () {
 *        console.log('Button is mounted:', this.button)
 *     }
 *   }
 * }
 *
 * render(<App />, document.body)
 */
function addRef (obj, key) {
  return function (ref) {
    obj[key] = ref
  }
}

export default addRef
