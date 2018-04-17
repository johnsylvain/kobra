# Kobra
![API Stability](https://img.shields.io/badge/stability-experimental-orange.svg)
> Minimal frontend framework inspired by the ELM architecture

## Features
- Efficient Virtual DOM diffing
- Shared state across routes

## Usage
```js
import { h, Kobra } from 'kobra'

/** @jsx h */

const app = new Kobra()

app.route('/hello/:name', (state, actions) => (
  <div>
    <h1>Hello, {state.params.name}</h1>
    <button onClick={actions.inc}>+{state.count}</button>
  </div>
))

app.use((state, actions) => {
  state.count = 0
  actions.inc = (event) => ({ count }) => ({ count: count + 1 })
})

app.mount(document.querySelector('#app'))
```

## Routing
Kobra currently uses a hash based router.
