import { parse, exec, match } from 'matchit'
import { extend } from './util'
import { render } from './render'

export function Kobra () {
  if (!(this instanceof Kobra)) return new Kobra()

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
    const path = document.location.hash.substring(1) || '/'
    const arr = match(path, this.views.routes)
    const view = this.views.handlers[(arr[0] || {}).old || path]

    if (arr.length)
      extend(this.state, { params: exec(path, arr) })

    render(view(this.state, this.actions), this.container)
  },

  connect (state, actions) {
    this.state = extend({}, state)
    this.actions = extend({}, actions)

    for (let key in this.actions) {
      ((key, action) => {
        this.actions[key] = (data) => {
          if (typeof (data = action(data)) === 'function')
            data = data(this.state, this.actions)

          if (data && data !== this.state && !data.then) {
            this._render(
              extend(this.state, data)
            )
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
    this.container = parent
    const events = ['hashchange', 'load']

    events.forEach(event => {
      window.addEventListener(event, this._render.bind(this))
    })
  }
})
