import { Kobra } from '../src/kobra';
import { extend } from '../src/util';

describe('[api] Kobra', function () {
  let spy;

  beforeEach(() => {
    this.app = new Kobra();
  });

  afterEach(() => {
    if (spy) {
      spy.mockReset();
      spy.mockRestore();
    }
  });

  it('is an instance', () => {
    expect(this.app).toBeInstanceOf(Kobra);
  });

  it('attaches state and actions from store', () => {
    const store = (state, actions) => {
      state.foo = 'bar';
      actions.test = () => ({ foo }) => ({ foo: 'baz' });
    };

    this.app.use(store);

    expect(this.app.state).toHaveProperty('foo', 'bar');
    expect(this.app.actions).toHaveProperty('test');
    expect(this.app.actions.test).toBeInstanceOf(Function);
  });

  xit('schedules render when an action is dispatched', () => {
    spy = jest.spyOn(this.app, '_render');
    const store = (state, actions) => {
      state.foo = 'bar';
      actions.test = () => ({ foo }) => ({ foo: 'baz' });
    };

    this.app.use(store);
    this.app.actions.test();

    expect(spy).toHaveBeenCalled();
  });
});
