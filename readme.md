# Kobra ![API Stability](https://img.shields.io/badge/stability-experimental-orange.svg)

> Minimal JavaScript framework

## Features

* Efficient Virtual DOM diffing
* Shared state across routes
* Redux style actions
* Simple API (only 3 methods)

## Usage

```js
import { h, Kobra } from 'kobra';

const app = new Kobra();

const initialState = {
  count: 0
};

/** @jsx h */
app.route('/hello/:name', (state, dispatch) => (
  <div>
    <h1>Hello, {state.params.name}</h1>
    <button onClick={() => dispatch({ type: 'INC' })}>+{state.count}</button>
  </div>
));

app.use((state = initialState, action) => {
  switch (action.type) {
    case 'INC':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
});

app.mount(document.querySelector('#app'));
```

## Getting started
*Install Dependencies*
```bash
yarn add kobra
yarn add babel-preset-env babel-plugin-transform-react-jsx --dev
```

*Setup `.babelrc`*
```json
{
  "presets": ["env"],
  "plugins": [["transform-react-jsx", { "pragma": "h" }]]
}

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
> **Note:** The `use` method is optional if you do not need state or actions in your application.

### `mount(selector: DOMNode)`

> Mount the application and start listening to route changes

## Components

A Kobra component is simply a function that you use within your views. Components receive `props` and `children` as arguments.

```js
const Page = (props, children) => (
  <div>
    <nav>
      <a href="#/">Home</a>
      <a href="#/about">about</a>
    </nav>
    <div>
      <h1>{props.title}</h1>
      {children}
    </div>
  </div>
);

app.route('/', (state, dispatch) => (
  <Page title="Home">
    <h1>Home</h1>
  </Page>
));
```

## Cloning Elements

Use the `cloneElement` function to clone and return a new Kobra component. The result will have new props shallowly merged in.

```js
import { cloneElement } from 'kobra';

cloneElement(element, [props], [...children]);
```

## Asynchronous actions

Async actions are accomplished by dispatching the action from within callback or promise of an async function.

```js
const view = (state, dispatch) => (
  <h1 onClick={() => asyncChange(dispatch)}>{state.text || 'Loading...'}</h1>
);

const asyncChange = dispatch => {
  setTimeout(() => {
    dispatch({ type: 'UPDATE_TEXT', payload: { text: 'Loaded' } });
  }, 1000);
};
```

## Lifecycle Hooks

Lifecycle hooks can be attacted to any DOM node. All hooks are placed inside the `hook` attribute.

| Lifecycle Name | When it gets called            |
|----------------|--------------------------------|
| `mount`        | when the node is being created |

```js
<div hook={{ mount: () => console.log('mounted')}}></div>
```

## Routing

**Note:** Kobra currently uses a hash router.

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
