# Route pattern matching

## Route params

Route patterns are defined in the first argument in the `route` method. Parameters are denoted with the `:` prefix. Parameter values are passed into the view through the `state.params` object.

```js
app.route('/item/:id', state => {
  return (
    <div>
      This is item {state.params.id}
    </div>
  );
});
```

## Wildcards

A wildcard route can be defined to catch any routes that are not explicitly defined. This is particularly useful for 404 pages.

```js
app.route('/', () => {});
app.route('/about', () => {});
app.route('*', () => {});
```
