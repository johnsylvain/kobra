# Managing state

Kobra uses [Staten](https://github.com/johnsylvain/staten) for state management.

## Actions

Actions are how state is updated in Kobra. An action is a function that returns a copy of the updated state. Notice how we only have to return the properties we want to update in the new state object.

```js
const initialState = {
  count: 0,
  name: 'John'
};

const actions = {
  setName: name => {
    return { name };
  }
}
```

Some actions need access to the current state. For this we add another function that takes state as an argument.

```js
const initialState = {
  count: 0,
  name: 'John'
};

const actions = {
  increment: () => (state) => {
    return { count: state.count + 1 };
  }
}
```

## Dispatching actions

Actions are dispatched from within the route views. The `dispatch` function accepts one argument, which is the action to be dispatched. The action should include a `type` and an optional `payload`.

```js
app.route('/', (state, actions) => {
  const handleChange = event => {
    actions.setName(event.target.value)
  }

  return (
    <div>
      <h1>{state.name}</h1>
      <input type="text" onChange={handleChange} />
    </div>
  );
});
```
