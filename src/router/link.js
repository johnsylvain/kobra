import { h } from '../h';

const handleClick = to => event => {
  event.preventDefault();
  window.history.pushState(undefined, undefined, to);
  window.dispatchEvent(new PopStateEvent('popstate'));
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
