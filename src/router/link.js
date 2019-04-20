import { h } from '../h';

export const route = to => {
  window.history.pushState(undefined, undefined, to);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const handleClick = to => event => {
  event.preventDefault();
  route(to);
};

export const Link = ({ to, className, activeClass }, children) => {
  return h(
    'a',
    {
      href: to,
      className: [className, window.location.pathname === to && activeClass]
        .filter(Boolean)
        .join(' '),
      onClick: handleClick(to)
    },
    children
  );
};
