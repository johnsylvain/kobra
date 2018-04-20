# Kobra
![API Stability](https://img.shields.io/badge/stability-experimental-orange.svg)
> Minimal frontend framework inspired by the ELM architecture

## Features
- Efficient Virtual DOM diffing
- Shared state across routes
- Simple API (3 methods)

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

## Methods
### `route(path: String, handler: Function)`
> Specify a view to be rendered on a path. The handler receives the `state` and `actions` as the arguments.
>
> Route parameters will be passed through the `state` argument as `state.params`

### `use(store: Function)`
> The store initializes the state and defines the actions. The store function receives `state` and `actions` as the first two arguments and methods/values can be directly attached to these arguments.
>
> __Note:__ The `use` method is optional if you do not need state or actions in your application.

### `mount(selector: DOMNode)`
> Mount the application and start listening to route changes

## Routing
__Note:__ Kobra currently uses a hash router.

Route patterns are defined in the first argument in the `route` method. Parameters are denoted with the `:` prefix. Parameter values are passed into the view through the `state.params` object.

## Development
```bash
# install deps
yarn

# run tests
yarn test

# build dist
yarn build

# release to npm
yarn publish
```

## License
[MIT](https://github.com/johnsylvain/kobra/blob/master/license)
