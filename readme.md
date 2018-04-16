# Kobra
> Minimal frontend framework inspired by the ELM architecture.

## Features
- Efficient Virtual DOM diffing
- Shared state across routes

## Usage
```js
import { h, Kobra } from 'kobra'

const app = new Kobra()

app.route('/hello/:name', (state, actions) => (
  <div>
    <h1>Hello, {state.params.name || 'World'}</h1>
    <button onClick={actions.inc}>+{state.count}</button>
  </div>
))

const state = {
  count: 0
}

const actions = {
  inc: () => ({ count }) => ({ count: count + 1 })
}

app.connect(state, actions)
app.mount(document.querySelector('#app'))
```

## Lifecycle hooks
```jsx
<div hook={{
  mount: () => {},
  destroy: () => {}
}}></div>
```

| Hook                        | When it gets called                              |
|-----------------------------|--------------------------------------------------|
| `mount`                     | before the element gets mounted to the DOM       |
| `destroy`                   | before the element gets removed from the DOM     |

## Routing
Kobra currently implements a hash based router.

TODO: use a history based browser router
