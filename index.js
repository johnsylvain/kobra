function extend (obj, props) {
  for (let i in props) obj[i] = props[i]
  return obj
}

function diff (parent, newNode, oldNode) {
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
    ? createVDOM(vnode.nodeName(vnode.attributes, vnode.children)
    : newVNode
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

export function Kobra () {
  if (!(this instanceof Kobra)) return new Kobra()
  
  this.__vdom__ = null
  this.__state__ = null
}

extend(Kobra.prototype, { 
  use (middleware) {
    
  },

  route (path, handler) {
    if (typeof path === 'function')
      return this.route('*', path)

    const params = path
      .split('/')
      .filter(s => s.test(/^:/))
  },

  mount (parent) {
    this.__vdom__ = diff(parent, this.__vdom__)
  }
})
