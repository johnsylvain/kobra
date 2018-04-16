import { extend, noop } from './util'

export function h (nodeName, attributes) {
  let rest = []
  let length = arguments.length
  let children = []

  while (length-- > 2)
    children.push(arguments[length])

  return {
    nodeName,
    attributes: attributes || {},
    children: [].concat.apply([], children.reverse())
  }
}

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
