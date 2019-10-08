# Events

DOM events can be attached to any JSX element that is not a custom component.

```js
app.route('/', () => {
  const clickHandler = () => {
    console.log('clicked!');
  }

  return (
    <button onClick={clickHandler}>Click me</button>
  );
});
```

If you wish to attach an event to a custom component, you need to pass the event handler down to the next intrinsic DOM element.

```js
<Button onClick={handler}></Button>

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick}></button>
  );
};
```
