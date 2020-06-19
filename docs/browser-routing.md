# Browser routing

By default, Kobra uses browser based routing, similar to other SPA routers. It requires a custom component to navigate between routes.

When using the browser history router, import the `Link` component. It's important to use the `Link` component instead of anchor tags so that the application can correctly transition between page states.

```js
import { Link } from 'kobra';

<Link to="/about">About</Link>
```

You can also use the `route` function to programmatically transition between pages.

```js
import { route } from 'kobra';

route('/');
```
