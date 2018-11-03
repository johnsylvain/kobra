import { h } from '../h';

const handleClick = to => event => {
  event.preventDefault();
  window.history.pushState(undefined, undefined, to);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export const Link = ({ to, className }, children) => {
  return h('a', { href: to, className, onClick: handleClick(to) }, children);
};
