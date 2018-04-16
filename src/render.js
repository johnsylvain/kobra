import { diff } from './diff'

let tree = null

export function render (vnodes, parent) {
  diff(parent, vnodes, tree)
  tree = vnodes
}
