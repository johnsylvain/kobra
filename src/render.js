import { diff } from './diff';
import { extend } from './util';

let tree = null;

export function render(newNode, parent) {
  newNode = createVDOM(newNode);
  diff(parent, newNode, tree);
  tree = newNode;
}

function createVDOM(vnode) {
  const newVNode = extend(extend({}, vnode), {
    children: (vnode.children || []).map(
      child =>
        typeof child === 'string' || typeof child === 'number'
          ? child
          : createVDOM(child)
    )
  });

  return typeof vnode.nodeName === 'function'
    ? createVDOM(vnode.nodeName(vnode.attributes, vnode.children))
    : newVNode;
}
