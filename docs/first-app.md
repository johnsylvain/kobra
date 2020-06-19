# Your first app

The easiest way to get started is with [Parcel](https://parceljs.org).

```bash
# Dependencies
yarn add kobra

# Dev dependencies
yarn add parcel-bundler @babel/core @babel/preset-env @babel-transform-react-jsx @babel/plugin-transform-runtime --dev
```

**.babelrc**

```json
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    ["@babel/transform-react-jsx", { "pragma": "h" }],
    "@babel/plugin-transform-runtime"
  ]
}
```

Our project structure:

```
.
├── src
│   ├── index.html
│   └── app.js
└── package.json

```

Our `package.json`

```json
{
  "name": "app",
  "version": "1.0.0",
  "scripts": {
    "start": "parcel src/index.html",
    "build": "parcel build src/index.html",
  },
  "devDependencies": {
    "@babel/core": "^7.0.0-0",
    "@babel/plugin-transform-react-jsx": "^7.3.0",
    "@babel/plugin-transform-runtime": "^7.4.3",
    "@babel/preset-env": "^7.6.2",
    "parcel-bundler": "^1.12.3",
  },
  "dependencies": {
    "kobra": "^0.3.0"
  }
}
```

## Initialize the app

First, let's create an `index.html` file. Here we need to specify a target for our application to load, as well as a script tag.

```html
<div id="root"></div>
<script src="./app.js"></script>
```

Next we need to initialize our application in our JavaScript.

```js
import { kobra } from 'kobra';

const app = kobra();
```

## Adding a route

Next we need to specify a route and a view to render on that route. Make sure to import the `h` function. This is necessary for the JSX to be called correctly.

```js
import { kobra, h } from 'kobra';

const app = kobra();

app.route('/', () => {
  return (
    <div>
      Hello world!
    </div>
  );
});
```

## Adding state

Kobra uses actions to update state. Actions are defined as object methods that return the parts of the state you want to update. Here we'll create a simple counter.

```js
import { kobra, h } from 'kobra';

const app = kobra();

const initialState = { counter: 0 };

const actions = {
  increment: () => state => ({ counter: state.counter + 1 })
}

app.store(actions, initialState);

app.route('/', (state, actions) => {
  return (
    <button onClick={actions.increment}>
      {state.counter}
    </button>
  );
});
```

## Mounting the app

Finally we need to mount our app to the DOM. This is accomplished with the `mount` method.

```js
import { kobra, h } from 'kobra';

const app = kobra();

const initialState = { counter: 0 };

const actions = {
  increment: () => state => ({ counter: state.counter + 1 })
}

app.store(actions, initialState);

app.route('/', (state, actions) => {
  return (
    <button onClick={actions.increment}>
      {state.counter}
    </button>
  );
});

app.mount(document.querySelector('#root'));
```

That's it! You've created your first Kobra app. Try changing the path from `'/'` to something else.
