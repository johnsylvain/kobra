import { extend } from './util'

function connect (state, actions) {
  let globalState = extend({}, state)
  let mappedActions = extend({}, actions)

  for (let key in mappedActions) {
    (function (key, action) {
       mappedActions[key] = function (data) {
        if (typeof (data = action(data)) === 'function')
          data = data(globalState, mappedActions)

        if (data && data !== globalState && !data.then) {
          globalState = extend({}, data)
        }

        return data
      }
    })(key, mappedActions[key])
  }

  return function (view) {
    view(globalState, mappedActions)
  }
}
