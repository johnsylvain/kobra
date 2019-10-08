# Asynchronous updates

Asynchronous actions are accomplished by dispatching the action from within callback or promise of an async function.

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
