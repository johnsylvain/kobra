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

## app.use

`use(reducer: Function)`

> The reducer initializes the state and defines how the actions create the next state. The reducer function receives `state` and `action` as the first two arguments.
>
> The `action` requires the property `type`. A `payload` may be also be defined.
>
> **Note:** The `use` method is optional if you do not need state or actions in your application. You may also use multiple reducers by calling the `use` method for each new reducer.

```js
const initialState = { count: 0 };

app.use((state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
});
```

## app.run

`run(handler: Function)`

> Execute a block of code when the application is mounted. The `handler` receives one argument which is the `dipatch` function for dispatching state updates.
>
> This method is particularly useful for loading asynchronous data that is needed on all routes.

```js
app.use((state = {}, action) => {
  switch (action.type) {
    case '@@INIT':
      return { ...state, items: action.payload };
    default:
      return state;
  }
});

app.run(dispatch => {
  fetch('/api')
    .then(res => res.json())
    .then(json => {
      dispatch({
        type: '@@INIT',
        payload: json.data.items
      });
    });
});
```

## app.mount

`mount(selector: DOMNode)`

> Mount the application and start listening to route changes

```js
app.mount(document.querySelector('#root'));
```
