# Browser routing

When browser routing is enabled, it results in cleaner, more familiar looking URLs. It requires a custom component to navigate between routes.

```js
import { Kobra, Link } from 'kobra';

const app = new Kobra({ router: 'history' });
```

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
