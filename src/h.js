import { createInternalLinkAttributes } from './util';

export function h(nodeName, attributes) {
  let length = arguments.length;
  let children = [];
  attributes = attributes || {};

  while (length-- > 2) children.push(arguments[length]);

  if (nodeName === 'a') {
    attributes = createInternalLinkAttributes(attributes);
  }

  return {
    nodeName,
    attributes: attributes,
    children: [].concat.apply([], children.reverse())
  };
}
