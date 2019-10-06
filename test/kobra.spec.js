import { Kobra } from '../src/kobra';

describe('[api] Kobra', function() {
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

  it('sets the initial state', () => {
    const initialState = { foo: 'bar' };
    const reducer = (state = initialState, action) => {
      switch (action.type) {
        default:
          return state;
      }
    };

    this.app.use(reducer);

    expect(this.app.state).toHaveProperty('foo', 'bar');
  });

  it('dispatches actions', () => {
    const reducer = (state = {}, action) => {
      switch (action.type) {
        case 'TEST':
          return Object.assign({}, state, { test: 'test' });
        default:
          return state;
      }
    };

    this.app.use(reducer);
    this.app.dispatch({ type: 'TEST' });
    expect(this.app.state).toHaveProperty('test', 'test');
  });

  it('schedules a render when an action is dispatched', () => {
    spy = jest.spyOn(Kobra.prototype, 'render');
    const reducer = (state = {}, action) => {
      switch (action.type) {
        case 'TEST':
          return Object.assign({}, state, { test: 'test' });
        default:
          return state;
      }
    };

    this.app.use(reducer);
    this.app.dispatch({ type: 'TEST' });

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('calls the run handler on mount', () => {
    spy = jest.fn();
    this.app.run(spy);
    this.app.mount({});

    expect(spy).toHaveBeenCalled();
  });
});
