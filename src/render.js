import { diff } from './diff';
import { patch } from './patch';
import { extend } from './util';

let tree = null;

export function render(newNode, parent) {
  newNode = createVDOM(newNode);
  const patches = diff(newNode, tree);
  patch(parent, patches);
  tree = newNode;
}

function createVDOM(vnode) {
  const newVNode = extend(extend({}, vnode), {
    children: (vnode.children || []).map(
      child =>
        typeof child === 'string' || typeof child === 'number'
          ? child.toString()
          : createVDOM(child)
    )
  });

  return typeof vnode.nodeName === 'function'
    ? createVDOM(vnode.nodeName(vnode.attributes, vnode.children))
    : newVNode;
}
