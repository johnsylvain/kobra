/* eslint-disable no-undef */
import { h } from '../src/h';
import { Link } from '../src/router/link';

describe('[jsx] Link', () => {
  beforeEach(() => {
    global.dispatchEvent = jest.fn();
  });

  it('attaches an event listener', () => {
    const link = Link({ href: '/' }, 'Text');
    expect(link.attributes.onClick).toBeInstanceOf(Function);
  });

  it('dispatches a popstate event for internal links', () => {
    const link = Link({ href: '/' }, 'Text');
    link.attributes.onClick(new Event('click'));
    expect(global.dispatchEvent).toHaveBeenCalled();
  });

  it('does not dispatch a popstate event for external links', () => {
    const link = Link({ href: 'https://example.com' }, 'Text');
    link.attributes.onClick(new Event('click'));
    expect(global.dispatchEvent).not.toHaveBeenCalled();
  });
});
