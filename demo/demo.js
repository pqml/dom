import { h, render, Component, addRef } from '../lib' // eslint-disable-line

function RemoveButton ({ children, ref }) {
  return (
    <button className='btn' ref={ref}>Remove: {children}</button>
  )
}

class Counter extends Component {
  template () {
    return <span />
  }
  increment () {
    this.base.textContent = ' Alive since ' + this.count++ + 'sec'
    console.log('increment')
  }
  componentDidMount () {
    this.count = 0
    this.increment = this.increment.bind(this)
    this.increment()
    this.timer = window.setInterval(this.increment, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }
}

class Item extends Component {
  template ({ count }) {
    return (
      <li>
        <button className='btn primary' ref={addRef(this, 'addButton')}>Add list</button>
        <RemoveButton ref={addRef(this, 'removeButton')}>item {count}</RemoveButton>
        <Counter />
      </li>
    )
  }

  addList () {
    this.render(<List />, this.base)
  }

  componentDidMount () {
    this.destroy = this.destroy.bind(this)
    this.addList = this.addList.bind(this)
    this.removeButton.addEventListener('click', this.destroy)
    this.addButton.addEventListener('click', this.addList)
  }

  componentWillUnmount () {
    console.log('remove', this.props.count)
    this.removeButton.removeEventListener('click', this.destroy)
    this.addButton.removeEventListener('click', this.addList)
  }
}

class List extends Component {
  template () {
    return (
      <div style='border-left: 2px solid black; padding-left: 10px'>
        <ul ref={addRef(this, 'ul')} />
        <button className='btn primary' ref={addRef(this, 'button')}>Add item</button>
      </div>
    )
  }

  componentDidMount () {
    this.count = 0
    this.addItem = this.addItem.bind(this)
    this.button.addEventListener('click', this.addItem)
  }

  addItem () {
    this.render(<Item count={++this.count} />, this.ul)
  }

  componentWillUnmount () {
    this.button.removeEventListener('click', this.addItem)
  }
}

class App extends Component {
  template () {
    return document.querySelector('main')
  }

  componentDidMount () {
    this.base.style.paddingTop = '20px'
    this.render(<List />, this.base)
    this.base.addEventListener('click', () => { console.log(this) })
  }
}

render(<App />)
