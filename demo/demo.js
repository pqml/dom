import { h, render, Component } from '../lib' // eslint-disable-line

const noop = () => {}
const refs = {}
const ref = k => r => { refs[k] = r; console.log(r ? 'Reference ' + k : 'De-reference ' + k) }

class Item extends Component {
  render ({ count }) {
    return (
      <li>
        <button ref={r => { this.addButton = r }}>Add list</button>
        <button ref={r => { this.removeButton = r }}>Remove item {count}</button>
      </li>
    )
  }

  remove () {
    this.destroy()
  }

  add () {
    render(<List />, el => this.base.appendChild(el), this)
  }

  componentDidMount () {
    this.remove = this.remove.bind(this)
    this.add = this.add.bind(this)
    this.removeButton.addEventListener('click', this.remove)
    this.addButton.addEventListener('click', this.add)
  }

  componentWillUnmount () {
    this.removeButton.removeEventListener('click', this.remove)
    this.addButton.removeEventListener('click', this.add)
  }
}

class List extends Component {
  render ({ children }) {
    return (
      <div>
        <ul ref={e => { this.ul = e }} />
        <button ref={e => { this.button = e }}>Add item</button>
      </div>
    )
  }

  componentDidMount () {
    this.count = 0
    this.addItem = this.addItem.bind(this)
    this.button.addEventListener('click', this.addItem)
  }

  addItem () {
    console.log(this._collector)
    render(
      <Item count={++this.count} ref={ref(`Item ${this.count}`)} />,
      el => this.ul.appendChild(el),
      this
    )
  }

  componentWillUnmount () {
    this.button.removeEventListener('click', this.addItem)
  }
}

const result = render(<List name='0 - ' />, document.body)

console.log(result)
