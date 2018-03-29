export function h (nodeName, attributes) {
  let rest = []
  let length = arguments.length

  while (length-- > 2) rest.push(arguments[length])

  return {
    nodeName,
    attributes: attributes || {},
    children: [].concat.apply([], rest.reverse())
  }
}

export function diff (parent, newNode, oldNode) {
  newNode = createVDOM(newNode)
  idiff(parent, newNode, oldNode)
  return newNode
}

function createVDOM (vnode) {
  const newVNode = extend(
    extend({}, vnode),
    {
      children: (vnode.children || [])
        .map(child =>
          typeof child === 'string' || child === 'number'
            ? child
            : createVDOM(child)
        )
    }
  )

  return (typeof vnode === 'function')
    ? createVDOM(vnode.nodeName(vnode.attributes, vnode.children))
    : newVNode
}

function idiff (parent, newNode, oldNode, index=0) {
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
