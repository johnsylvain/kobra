import { noop } from './util'

export function createElement (vnode) {
  let node = typeof vnode === 'string' || typeof vnode === 'number'
    ? document.createTextNode(vnode)
    : document.createElement(vnode.nodeName)

  if (vnode.attributes) {
    (vnode.attributes.oncreate || noop)(node)

    for (let name in vnode.attributes) {
      if (/^on/.test(name)) {
        node.addEventListener(
          name.slice(2).toLowerCase(), vnode.attributes[name]
        )
      } else {
        if (name === 'className')
          node.setAttribute('class', vnode.attributes[name])
        else
          node.setAttribute(name, vnode.attributes[name])
      }
    }

    for (let i = 0; i < vnode.children.length; i++)
      node.appendChild(createElement(vnode.children[i]))
  }

  return node
}
