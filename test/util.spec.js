import { extend, isEvent, createInternalLinkAttributes } from '../src/util';

describe('[util] isEvent', () => {
  it('determines if event', () => {
    expect(isEvent('onClick')).toBe(true);
    expect(isEvent('className')).toBe(false);
  });
});

describe('[util] extend', () => {
  it('extends a source object', () => {
    const obj = { a: 1 };
    expect(extend(obj, { b: 2 })).toHaveProperty('b', 2);
  });

  it('creates a shallow copy', () => {
    const obj = {
      a: { b: 1, c: 2 },
      d: 3
    };
    expect(extend(obj, { a: { b: 5 } })).not.toHaveProperty('a.c');
  });
});

describe('[util] createInternalLinkAttributes', () => {
  it('does nothing if no href is provided', () => {
    const attributes = {};
    const response = createInternalLinkAttributes(attributes);
    expect(response).toBe(attributes);
  });

  it('does nothing if an external link is provided', () => {
    const attributes = {
      href: 'https://example.com'
    };
    const response = createInternalLinkAttributes(attributes);
    expect(response).toBe(attributes);
  });

  it('attaches a click handler if an internal link is provided', () => {
    const attributes = {
      href: '/about'
    };
    const response = createInternalLinkAttributes(attributes);
    expect(response.onClick).toBeInstanceOf(Function);
  });
});
