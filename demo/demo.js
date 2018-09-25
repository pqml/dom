import { el, h } from '../lib' // eslint-disable-line

var pre
el(
  'div',
  { ref (e) { document.body.appendChild(e) } },
  [ 'Debug :', el('pre', { ref (e) { pre = e } }) ]
)

function Test2 ({ name }) {
  return [name, <span style={{ color: 'red' }}></span>]
}

function Test ({ name }) {
  return <p>{name} <Test2 name='nested'/></p>
}

pre.textContent = (
  <div class="test">
    generated from lib/jsx
    <Test name='component' />
  </div>
).outerHTML
