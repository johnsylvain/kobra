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

## app.setStore

`setStore(actions: object, initialState: object)`

> `actions` is an object that contains all actions for an application. An action is a function that returns a partial copy of the state that needs to be updated.

```js
const initialState = { count: 0 };
const actions = {
  increment: () => state => ({ count: state.count + 1 }),
  decrement: () => state => ({ count: state.count - 1 }),
  set: value => ({ count: value })
}

app.setStore(actions, intiailState);
```

## app.run

`run(handler: Function)`

> Execute a block of code when the application is mounted. The `handler` receives one argument which is an object of all actions that can be used for triggering state updates.
>
> This method is particularly useful for loading asynchronous data that is needed on all routes.

```js
app.setStore(
  { init: items => ({ items })},
  { items: [] }
);

app.run(actions => {
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
