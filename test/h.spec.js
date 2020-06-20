/* eslint-disable no-undef */
import { h } from '../src/h';

describe('[jsx] h', () => {
  it('creates a vdom node', () => {
    const node = h('div');
    expect(node).toHaveProperty('nodeName', 'div');
    expect(node).toHaveProperty('attributes', {});
    expect(node).toHaveProperty('children', []);
  });

  it('preserves attributes', () => {
    const node = h('div', { id: 'foo' });
    expect(node.attributes.id).toBe('foo');
  });

  it('flattens children nodes', () => {
    const node = h('div', {}, h('p'), h('p'));
    expect(node.children).toBeInstanceOf(Array);
    expect(node.children.length).toBe(2);
  });

  it('supports nested children', () => {
    const m = x => h(x);

    expect(h('foo', null, h('l'), [m('b'), m('c')], m('d'))).toHaveProperty(
      'children',
      ['l', 'b', 'c', 'd'].map(m)
    );
  });

  describe('when vnode is an anchor tag', () => {
    beforeEach(() => {
      global.dispatchEvent = jest.fn();
    });

    it('attaches an event listener', () => {
      const link = h('a', { href: '/' }, 'Text');
      expect(link.attributes.onClick).toBeInstanceOf(Function);
    });

    it('dispatches a popstate event for internal links', () => {
      const link = h('a', { href: '/' }, 'Text');
      link.attributes.onClick(new Event('click'));
      expect(global.dispatchEvent).toHaveBeenCalled();
    });

    it('does not dispatch a popstate event for external links', () => {
      const link = h('a', { href: 'https://example.com' }, 'Text');
      expect(link.attributes.onClick).not.toBeDefined();
    });
  });
});
