import { h } from '../h';

export const route = url => {
  window.history.pushState(undefined, undefined, url);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const handleClick = url => event => {
  if (!/^https?:\/\//.test(url)) {
    event.preventDefault();
    route(url);
  }
};

export const Link = ({ href, className, activeClass, ...rest }, children) => {
  return h(
    'a',
    Object.assign({}, rest, {
      href,
      className: [className, window.location.pathname === href && activeClass]
        .filter(Boolean)
        .join(' '),
      onClick: handleClick(href)
    }),
    children
  );
};
