export function extend(obj, props) {
  for (let i in props) obj[i] = props[i];
  return obj;
}

export function isEvent(name) {
  return /^on/.test(name);
}
