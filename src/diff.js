import { extend } from './util'
import { createElement } from './create-element'

export function diff (parent, newNode, oldNode) {
  newNode = createVDOM(newNode)
  idiff(parent, newNode, oldNode)
}

function idiff (parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    parent.appendChild(createElement(newNode))
  }
  else if (!newNode) {
    parent.removeChild(parent.childNodes[index])
  }
  else if (changed(newNode, oldNode)) {
    parent.replaceChild(
      createElement(newNode),
      parent.childNodes[index]
    )
  }
  else if (newNode.nodeName) {
    const length = Math.max(
      newNode.children.length,
      oldNode.children.length
    )
    for (let i = 0; i < length; i++) {
      idiff(
        parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      )
    }
  }
}

function createVDOM (vnode) {
  const newVNode = extend(
    extend({}, vnode),
    {
      children: (vnode.children || [])
        .map((child) =>
          typeof child === 'string' || typeof child === 'number'
            ? child
            : createVDOM(child)
        )
    }
  )

  return (typeof vnode.nodeName === 'function')
    ? createVDOM(vnode.nodeName(vnode.attributes, vnode.children))
    : newVNode
}

function changed (node1, node2) {
  return typeof node1 !== typeof node2 ||
    typeof node1 === 'string' && node1 !== node2 ||
    node1.nodeName !== node2.nodeName
}
