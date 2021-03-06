import { createElement } from '../src/create-element';
import { h } from '../src/h';

describe('[jsx] create-element', () => {
  let spy;

  afterEach(() => {
    if (spy) {
      spy.mockReset();
      spy.mockRestore();
    }
  });

  it('creates text nodes', () => {
    expect(createElement('text')).toBeInstanceOf(Text);
  });

  it('attaches event listeners', () => {});

  it('attaches attributes', () => {
    const node = h('div', { id: 'foo' });
    const el = createElement(node);

    expect(el.id).toBe('foo');
  });

  it('attaches className as class', () => {
    const node = h('div', { className: 'foo' });
    const el = createElement(node);

    expect(el.classList.contains('foo')).toBeTruthy();
  });

  it('calls mount lifecycle hook', () => {
    spy = jest.fn();
    const node = h('div', { hook: { mount: spy } });

    createElement(node);
    expect(spy).toHaveBeenCalled();
  });
});
