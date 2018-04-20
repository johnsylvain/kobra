import { parse, exec, match } from 'matchit'
import { extend } from './util'
import { render } from './render'

export function Kobra (opts) {
  if (!(this instanceof Kobra)) return new Kobra(opts)

  this.opts = opts || {}
  this.container = undefined
  this.state = {}
  this.actions = {}
  this.views = {
    routes: [],
    handlers: {}
  }
}

extend(Kobra.prototype, {
  _render () {
    const path = this.opts.router === 'history'
      ? document.location.pathname
      : document.location.hash.substring(1) || '/'
    const arr = match(path, this.views.routes)
    const view = this.views.handlers[(arr[0] || {}).old || path]

    if (arr.length)
      extend(this.state, { params: exec(path, arr) })

    render(view(this.state, this.actions), this.container)
  },

  use (store) {
    store(this.state, this.actions)

    for (let key in this.actions) {
      ((key, action) => {
        this.actions[key] = (data) => {
          if (typeof (data = action(data)) === 'function')
            data = data(this.state, this.actions)

          if (data && data !== this.state && !data.then) {
            extend(this.state, data)
            setTimeout(() => this._render())
          }

          return data
        }
      })(key, this.actions[key])
    }
  },

  route (pattern, handler) {
    this.views.routes.push(parse(pattern))
    this.views.handlers[pattern] = handler
    return this
  },

  mount (parent) {
    const events = [
      'load',
      this.opts.router === 'history' ? 'popstate' : 'hashchange'
    ]
    this.container = parent

    events.forEach(event => {
      window.addEventListener(event, () => this._render())
    })
  }
})
