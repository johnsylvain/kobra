import { isEvent } from './util';

export function createElement(vnode, isSvg) {
  let node =
    typeof vnode === 'string' || typeof vnode === 'number'
      ? document.createTextNode(vnode)
      : (isSvg = isSvg || vnode.nodeName === 'svg')
        ? document.createElementNS('http://www.w3.org/2000/svg', vnode.nodeName)
        : document.createElement(vnode.nodeName);

  if (vnode.attributes) {
    if ((vnode.attributes.hook || {}).mount) {
      vnode.attributes.hook.mount(node);
    }

    for (let name in vnode.attributes) {
      if (isEvent(name)) {
        node.addEventListener(
          name.slice(2).toLowerCase(),
          vnode.attributes[name]
        );
      } else {
        if (name === 'className') {
          node.setAttribute('class', vnode.attributes[name]);
        } else if (name !== 'hook') {
          node.setAttribute(name, vnode.attributes[name]);
        }
      }
    }

    for (let i = 0; i < vnode.children.length; i++)
      node.appendChild(createElement(vnode.children[i], isSvg));
  }

  return node;
}
