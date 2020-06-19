# API Methods

## app.route

`route(path: String, handler: Function)`

> Specify a view to be rendered on a path. The handler receives the `state` and `actions` as the arguments.
>
> Route parameters will be passed through the `state` argument as `state.params`

```js
app.route('/', () => <Home />);
app.route('/about', () => <About />);
app.route('/item/:id', state => <Item id={state.params.id} />);
```

## app.store

`store(actions: object, initialState: object)`

> `actions` is an object that contains all actions for an application. An action is a function that returns a partial copy of the state that needs to be updated.

```js
const initialState = { count: 0 };
const actions = {
  increment: () => state => ({ count: state.count + 1 }),
  decrement: () => state => ({ count: state.count - 1 }),
  set: value => ({ count: value })
}

app.store(actions, initialState);
```

## app.on

`on(event: string, handler: Function)`

> Listen for `load`, `state`, and `route` events. All handler functions accept `state` and `actions` as arguments.
>
> `load` will be called once with the app is mounted.
>
> `state` will be called when state changes.
>
> `route` will be called when the route changes.

```js
app.store(
  { init: items => ({ items })},
  { items: [] }
);

app.on('state', state => {
  saveToLocalStorage(state);
});

app.on('load', (state, actions) => {
  fetch('/api')
    .then(res => res.json())
    .then(json => {
      actions.init(json.data.items)
    });
});
```

## app.mount

`mount(selector: DOMNode)`

> Mount the application and start listening to route changes

```js
app.mount(document.querySelector('#root'));
```
