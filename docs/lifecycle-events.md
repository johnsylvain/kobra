# Lifecycle events

Lifecycle events can be attached to any DOM node. All hooks are placed inside the `hook` attribute.

| Lifecycle Name | When it gets called            |
| -------------- | ------------------------------ |
| `mount`        | when the node is being created |
| `update`       | when the node is being updated |

```js
<div hook={{ mount: () => console.log('mounted') }} />
```
