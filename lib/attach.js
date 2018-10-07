/**
 * > Instanciate a component and use an existing DOM Element as the component's template
 * - This will set the dom element as `component.base`. `render` method won't be called
 * - `attach` will do the following steps
 *   - Instanciate new Component(props)
 *   - Set the DOM Element as `component.base`
 *   - Call `component.componentWillMount(props)`
 *   - Set component.mounted to `true`
 *   - Call `component.componentDidMount(props)`
 *   - return component instance
 *
 * @param {HTMLElement} element Existing dom element to use to attach Component instance
 * @param {Component} Component Component class to instanciate
 * @param {object} [props={}] Object containing props for the new component
 *
 * @return {component} Component instance
 *
 * @example
 * import { attach } from '@internet/dom'
 * import App from 'components/App'
 *
 * const app = attach(document.querySelector('main'), App, {})
 *
 */
// function attach (dom, ClassComponent, props) {
//   if (!props) props = {}
//   const instance = new ClassComponent(props)
//   instance.base = dom
//   instance.componentWillMount(props)
//   instance.mounted = true
//   instance.componentDidMount(props)
//   return instance
// }

// export default attach
