import { route } from './router';

export function extend(obj, props) {
  for (let i in props) obj[i] = props[i];
  return obj;
}

export function isEvent(name) {
  return /^on/.test(name);
}

const handleClick = url => event => {
  event.preventDefault();
  route(url);
};

export function createInternalLinkAttributes(attributes) {
  if (!attributes.href) return attributes;
  if (/^https?:\/\//.test(attributes.href)) return attributes;
  if (attributes.target && attributes.target === '_blank') return attributes;

  return extend(extend({}, attributes), {
    onClick: handleClick(attributes.href)
  });
}
