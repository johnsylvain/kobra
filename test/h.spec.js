import { h } from '../src/h';
import { Link } from '../src/router/link';

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

    expect(h('foo', null, h('a'), [m('b'), m('c')], m('d'))).toHaveProperty(
      'children',
      ['a', 'b', 'c', 'd'].map(m)
    );
  });

  it('renders a link if an anchor tag is passed', () => {
    const node = h('a', { href: '/test' });
    expect(node.nodeName).toEqual(Link);
  });
});
