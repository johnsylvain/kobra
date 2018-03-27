function extend (obj, props) {
  for (let i in props) obj[i] = props[i]
  return obj
}

export function Kobra () {
  if (!(this instanceof Kobra)) return new Kobra()

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

  mount (element) {
    
  }
})
