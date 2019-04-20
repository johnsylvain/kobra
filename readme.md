![Kobra](assets/kobra.png)
![API Stability](https://img.shields.io/badge/stability-experimental-orange.svg)
![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/kobra.svg)
![npm](https://img.shields.io/npm/v/kobra.svg)
![GitHub](https://img.shields.io/github/license/johnsylvain/kobra.svg)

> Minimal JavaScript framework

⚠️ **Do not use in production. Still under active development.**

## 👌 Features

* Efficient Virtual DOM diffing
* Shared state across routes
* Redux style state management
* Simple API (only 3 methods)

## 💻 Usage

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

_Install Dependencies_

```bash
yarn add kobra
yarn add babel-preset-env babel-plugin-transform-react-jsx --dev
```

_Setup `.babelrc`_

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
> **Note:** The `use` method is optional if you do not need state or actions in your application. You may also use multiple reducers by calling the `use` method for each new reducer.

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

## Routing

Kobra has support for both hash (default) and browser routing. Define the router type for your app in the `Kobra` constructor.

### Hash routing

```js
import { Kobra } from 'kobra';

const app = new Kobra({ router: 'hash' });
```

Hash routing is the easiest to get up and running. You can use anchor tags as you normally would, however it's necessary to include the `#` prefix.

```html
<a href="#/about">About</a>
```

### Browser history routing

```js
import { Kobra, Link } from 'kobra';

const app = new Kobra({ router: 'history' });
```

When using the browser history router, import the `Link` component. It's important to use the `Link` component instead of anchor tags so that the application can correctly transition between page states.

```js
<Link to="/about">About</Link>
```

### Route Params

Route patterns are defined in the first argument in the `route` method. Parameters are denoted with the `:` prefix. Parameter values are passed into the view through the `state.params` object.

## Lifecycle Hooks

Lifecycle hooks can be attacted to any DOM node. All hooks are placed inside the `hook` attribute.

| Lifecycle Name | When it gets called            |
| -------------- | ------------------------------ |
| `mount`        | when the node is being created |
| `update`       | when the node is being updated |

```js
<div hook={{ mount: () => console.log('mounted') }} />
```

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
