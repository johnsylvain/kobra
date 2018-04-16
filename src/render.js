import { diff } from './vdom'

let tree = null

export function render (vnodes, parent) {
  diff(parent, vnodes, tree)
  tree = vnodes
}
