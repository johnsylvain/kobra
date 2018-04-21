export function h(nodeName, attributes) {
  let rest = [];
  let length = arguments.length;
  let children = [];

  while (length-- > 2) children.push(arguments[length]);

  return {
    nodeName,
    attributes: attributes || {},
    children: [].concat.apply([], children.reverse())
  };
}
