import { extend } from './util'
import { render } from './render'

export function Kobra () {
  if (!(this instanceof Kobra)) return new Kobra()

  this.app = {
    state: {},
    actions: {},
    views: {
      current: undefined,
      paths: {}
    }
  }
}

extend(Kobra.prototype, {
  connect (state, actions) {
    this.app.state = extend({}, state)
    this.app.actions = extend({}, actions)

    for (let key in this.app.actions) {
      (function (key, action) {
        this.app.actions[key] = function (data) {
          if (typeof (data = action(data)) === 'function')
            data = data(globalState, this.app.actions)

          if (data && data !== globalState && !data.then) {
            scheduleRender(
              globalState = extend({}, data)
            )
          }

          return data
        }
      })(key, this.app.actions[key])
    }
  },

  route (path, view) {
    extend(this.app.views.paths, {
      [path]: view
    })
  },

  mount (parent) {
    const getCurrentPath = () => {
      const path = document.location.pathname
      return path.substring(path.lastIndexOf('/'))
    }

    window.addEventListener('hashchange load', (event) => {
      const { state, actions, views } = this.app
      const path = getCurrentPath()

      const view = views.paths[path]
      this.app.views.current = path

      render(view(state, actions), parent)
    })

  }
})
