function diffChildren(newNode, oldNode) {
  const patches = [];
  const patchesLength = Math.max(
    newNode.children.length,
    oldNode.children.length
  );
  for (let i = 0; i < patchesLength; i++) {
    patches[i] = diff(newNode.children[i], oldNode.children[i]);
  }
  return patches;
}

function diffAttributes(newNode, oldNode) {
  const patches = [];

  const attributes = Object.assign({}, newNode.attributes, oldNode.attributes);
  Object.keys(attributes).forEach(name => {
    const newVal = newNode.attributes[name];
    const oldVal = oldNode.attributes[name];

    if (!newVal)
      patches.push({ type: 'REMOVE_ATTRIBUTE', name, value: oldVal });
    else if (!oldVal || oldVal !== newVal)
      patches.push({ type: 'SET_ATTRIBUTE', name, value: newVal });
  });

  return patches;
}

export function diff(newNode, oldNode) {
  if (!oldNode) return { type: 'CREATE', newNode };
  if (!newNode) return { type: 'REMOVE' };
  if (changed(newNode, oldNode)) return { type: 'REPLACE', newNode };
  if (newNode.nodeName)
    return {
      type: 'UPDATE',
      children: diffChildren(newNode, oldNode),
      attributes: diffAttributes(newNode, oldNode)
    };
}

function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === 'string' && node1 !== node2) ||
    node1.nodeName !== node2.nodeName ||
    (node1.attributes && node1.attributes.forceUpdate)
  );
}
