# Kobra
![API Stability](https://img.shields.io/badge/stability-experimental-orange.svg)
> Minimal frontend framework

## Features
- Efficient Virtual DOM diffing
- Shared state across routes
- Redux style actions
- Simple API (3 methods)

## Usage
```js
import { h, Kobra } from 'kobra'

const app = new Kobra()

const initialState = {
  count: 0
}

/** @jsx h */
app.route('/hello/:name', (state, dispatch) => (
  <div>
    <h1>Hello, {state.params.name}</h1>
    <button onClick={() => dispatch({ type: 'INC' })}>+{state.count}</button>
  </div>
))

app.use((state = initialState, action) => {
  switch (action.type) {
    case 'INC':
      return { ...state, count: state.count + 1 }
    default:
      return state
  }
})

app.mount(document.querySelector('#app'))
```

## Methods
### `route(path: String, handler: Function)`
> Specify a view to be rendered on a path. The handler receives the `state` and `actions` as the arguments.
>
> Route parameters will be passed through the `state` argument as `state.params`

### `use(reducer: Function)`
> The reducer initializes the state and defines how the actions create the next state. The reducer function receives `state` and `action` as the first two arguments.
>
> The `action` requires the property `type`. A `payload` may be also be defined.
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
