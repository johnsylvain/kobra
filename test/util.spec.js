import { extend, isEvent } from '../src/util';

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
