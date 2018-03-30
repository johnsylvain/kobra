import { init } from 'snabbdom'
import _h from 'snabbdom/h'
import { flatten } from './util'

export const patch = init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default,
])

export function h (nodeName, attributes) {
  let length = arguments.length
  let children = []
  let rest = []

  while (length-- > 2) rest.push(arguments[length])

  children = flatten(rest.reverse())

  return _h.apply(undefined, flatten([
    nodeName,
    (attributes)
      ? [attributes, children]
      : children
  ]))
}
