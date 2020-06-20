# Browser routing

By default, Kobra uses browser based routing, similar to other SPA routers. Unlike other frameworks, Kobra automatically binds routing within the anchor tag element.

This means you simply use an anchor tag to route between Kobra pages, as well as outlink to external sites.

```js
import { h } from 'kobra';

const Component = () => (
  <div>
    <a href="https://example.com">External Link</a>
    <a href="/about">Internal Link</a>
  </div>
);
```

You can also use the `route` function to programmatically transition between pages.

```js
import { route } from 'kobra';

route('/');
```
