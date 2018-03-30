import { extend } from './util'
import { patch } from './vdom'

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
