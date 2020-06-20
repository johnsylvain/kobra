import { Link } from './router/link';

export function h(nodeName, attributes) {
  let length = arguments.length;
  let children = [];

  while (length-- > 2) children.push(arguments[length]);

  const node = nodeName === 'a' ? Link : nodeName;

  return {
    nodeName: node,
    attributes: attributes || {},
    children: [].concat.apply([], children.reverse())
  };
}
