# Creating components

A Kobra component is simply a function that you use within your views. Components receive props and children as arguments. Components must begin with a capital letter.

```js
const Page = (props, children) => (
  <div>
    <nav>
      <a href="#/">Home</a>
      <a href="#/about">about</a>
    </nav>
    <div>
      <h1>{props.title}</h1>
      {children}
    </div>
  </div>
);

app.route('/', () => (
  <Page title="Home">
    <h1>Home</h1>
  </Page>
));
```
