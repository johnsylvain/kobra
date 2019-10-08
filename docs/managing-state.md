# Managing state

Kobra uses a Redux style system for state management.

## Reducers

A reducer is a function that accepts an `action` and the current `state`. It then determines how to update the state based on the action type, then returns a brand new state. The current `state` should not be mutated in the reducer function.

The reducer function takes two arguments, `state` and `action`. `state` should be set to the initial state of the application and the reducer should always have a default case of returning the current state.

It's common practice to use a switch statement to determine how to update the state, based on the action type.

```js
const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    default:
      return state;
  }
}
```

## Dispatching actions

Actions are dispatched from within the route views. The `dispatch` function accepts one argument, which is the action to be dispatched. The action should include a `type` and an optional `payload`.

```js
app.route('/', (state, dispatch) => {
  const handleChange = event => {
    dispatch({
      type: 'SET_NAME',
      payload: event.target.value
    });
  }

  return (
    <div>
      <h1>{state.name}</h1>
      <input type="text" onChange={handleChange} />
    </div>
  );
});
```
