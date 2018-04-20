import { cloneElement } from '../src/clone-element';
import { h } from '../src/h';

describe('[api] clone-element', () => {
  it('sets attributes', () => {
    const node = h('div', null);
    expect(cloneElement(node, { id: 'foo' }))
      .toHaveProperty(['attributes', 'id'], 'foo');
  });

  it('extends attributes', () => {
    const node = h('div', { id: 'foo' });

    expect(cloneElement(node, { id: 'bar' }))
      .toHaveProperty(['attributes', 'id'], 'bar');
  });

  it('replaces the children', () => {
    const node = h('div', null, h('a'));
    const clone = cloneElement(node, null, h('b'))

    expect(clone.children.length).toBe(1)
    expect(clone)
      .toHaveProperty(['children', 0], h('b'));
  })
});
