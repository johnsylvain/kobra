# Your first app

The easiest way to get started is with [Parcel](https://parceljs.org).

```bash
yarn add parcel-bundler --dev
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
    "kobra": "^0.2.2"
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
import { Kobra } from 'kobra';

const app = new Kobra();
```

## Adding a route

Next we need to specify a route and a view to render on that route. Make sure to import the `h` function. This is necessary for the JSX to be called correctly.

```js
import { Kobra, h } from 'kobra';

const app = new Kobra();

app.route('/', () => {
  return (
    <div>
      Hello world!
    </div>
  );
});
```

## Adding state

Kobra uses the reducer pattern to manage state. Here we'll create a simple counter.

```js
import { Kobra, h } from 'kobra';

const app = new Kobra();

const initialState = { counter: 0 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    default:
      return state;
  }
}

app.use(reducer);

app.route('/', (state, dispatch) => {
  return (
    <button onClick={() => {
      dispatch({ type: 'INCREMENT' })
    }}>
      {state.counter}
    </button>
  );
});
```

## Mounting the app

Finally we need to mount our app to the DOM. This is accomplished with the `mount` method.

```js
import { Kobra, h } from 'kobra';

const app = new Kobra();

const initialState = { counter: 0 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    default:
      return state;
  }
}

app.use(reducer);

app.route('/', (state, dispatch) => {
  return (
    <button onClick={() => {
      dispatch({ type: 'INCREMENT' })
    }}>
      {state.counter}
    </button>
  );
});

app.mount(document.querySelector('#root'));
```

That's it! You've created your first Kobra app. Try changing the path from `'/'` to something else.

Note that the default behavior of the route is to use a hash (`#`). If you specify `/about` in the route method, the view can be accessed at `/#/about`. We'll learn about history based routing in another section.
