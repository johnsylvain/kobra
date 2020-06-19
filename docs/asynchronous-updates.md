# Asynchronous updates

Asynchronous updates are accomplished by defining two actions.

```js
const actions = {
  setUser: user => ({ user }),
  getUser: id => (state, actions) => {
    fetch(`api/users/${id}`)
      .then(blob => blob.json())
      .then(json => actions.setUser(json.data.user))
  }
}

const view = (state, actions) => (
  <button onClick={() => actions.getUser(state.params.id)}>
    Load User
  </button>
);
```
