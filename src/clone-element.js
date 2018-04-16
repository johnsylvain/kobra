import { h } from './h'
import { extend } from './util'

export function cloneElement (vnode, props) {
  return h(
    vnode.nodeName,
    extend(vnode.attributes, props),
    arguments.length > 2
      ? [].slice.call(arguments, 2)
      : vnode.children
  )
}
