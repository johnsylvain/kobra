# Helper functions

## Cloning elements

Use the `cloneElement` function to clone and return a new Kobra component. The result will have new props shallowly merged in.

```js
import { cloneElement } from 'kobra';

cloneElement(element, [props], [...children]);
```

## Changing the route

Use the `route` function to programmatically change the route.

**Note:** this will only work when [browser routing](broswer-routing.md) is enabled.

```js
import { route } from 'kobra';

route('/');
```
