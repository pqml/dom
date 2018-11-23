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
