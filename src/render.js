import { patch } from './vdom'

const internals = {
  vdom: null,
  parent: null
}

export function scheduleRender (vnodes) {
  setTimeout(
    render(vnodes, internals.parent)
  )
}

export function render (vnodes, parent) {
  patch(parent, vnodes, internals.vdom)
  internals.vdom = vnodes
}
