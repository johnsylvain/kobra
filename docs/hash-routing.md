# Hash routing

Hash routing is the easiest to get up and running, and it's also the default option.

```js
import { Kobra } from 'kobra';

const app = new Kobra({ router: 'hash' });
```

To change routes, use anchor tags as you normally would, however it's necessary to include the `#` prefix.

```html
<a href="#/about">About</a>
```
