import { h } from '../h';

const handleClick = to => event => {
  event.preventDefault();
  window.history.pushState(undefined, undefined, to);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export const Link = ({ to }, children) => {
  return h(
    'a',
    { href: to, onClick: handleClick(to), forceUpdate: true },
    children
  );
};
