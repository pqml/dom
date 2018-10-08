import { h, render } from '../lib'
import Subtree from './Subtree'
import Svg from './Svg'

render(<Subtree base={document.querySelector('main')} />)
render(<Svg />, document.body)
