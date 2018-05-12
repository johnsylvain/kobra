import { createElement } from './create-element';

export function diff(parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    parent.removeChild(parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    parent.replaceChild(createElement(newNode), parent.childNodes[index]);
  } else if (newNode.nodeName) {
    updateAttributes(
      parent.childNodes[index],
      newNode.attributes,
      oldNode.attributes
    );
    const length = Math.max(newNode.children.length, oldNode.children.length);
    for (let i = 0; i < length; i++) {
      diff(
        parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}

function updateAttributes(target, newAttributes, oldAttributes = {}) {
  const attributes = Object.assign({}, newAttributes, oldAttributes);
  Object.keys(attributes).forEach(name => {
    if (!newAttributes[name]) {
      removeAttribute(target, name, oldAttributes[name]);
    } else if (
      !oldAttributes[name] ||
      newAttributes[name] !== oldAttributes[name]
    ) {
      setAttribute(target, name, newAttributes[name]);
    }
  });
}

function setAttribute(target, name, value) {
  if (/^on/.test(name) || name === 'forceUpdate') {
    return;
  } else if (name === 'className') {
    target.setAttribute('class', value);
  } else {
    target.setAttribute(name, value);
  }
}

function removeAttribute(target, name, value) {
  if (/^on/.test(name) || name === 'forceUpdate') {
    return;
  } else if (name === 'className') {
    target.removeAttribute('class');
  } else {
    target.removeAttribute(name);
  }
}

function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === 'string' && node1 !== node2) ||
    node1.nodeName !== node2.nodeName
  );
}
