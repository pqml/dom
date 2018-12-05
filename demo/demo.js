import { h, render } from '../lib'
import Subtree from './Subtree'
import Svg from './Svg'

render(<Subtree base={document.querySelector('main')} />)
render(<Svg />, document.body)
render([
  <h4>Inline video support:</h4>,
  <video
    width='300'
    src='https://antoine.cool/content/2-projects/1-copilote/preview.mobile.mp4'
    autoplay
    muted
    playsinline
  />
], document.body)

let div
render([
  <h4>Data attributes support:</h4>,
  <div class='datatest' ref={el => { div = el }} data-a='data is' data-b='working' />
], document.body)

div.textContent = div.dataset.a
