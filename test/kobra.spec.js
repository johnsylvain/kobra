import { kobra, Kobra } from '../src/kobra';

describe('[api] Kobra', function () {
  let spy;
  let app;

  beforeEach(() => {
    app = kobra();
  });

  afterEach(() => {
    if (spy) {
      spy.mockReset();
      spy.mockRestore();
    }
  });

  it('is an instance', () => {
    expect(app).toBeInstanceOf(Kobra);
  });

  it('sets the initial state', () => {
    const initialState = { foo: 'bar' };
    const actions = {};

    app.store(actions, initialState);

    expect(app.__s.getState()).toHaveProperty('foo', 'bar');
  });

  it('dispatches actions', () => {
    const initialState = {};
    const actions = {
      test: () => ({ test: 'test' })
    };

    app.store(actions, initialState);
    app.__s.actions.test();
    expect(app.__s.getState()).toHaveProperty('test', 'test');
  });

  it('dispatches actions that updates state', () => {
    const initialState = { count: 0 };
    const actions = {
      inc: () => state => ({ count: state.count + 1 })
    };

    app.store(actions, initialState);
    app.__s.actions.inc();
    expect(app.__s.getState()).toHaveProperty('count', 1);
  });

  it('dispatches async actions', () => {
    const initialState = { data: undefined };
    const actions = {
      setData: data => ({ data }),
      getData: () => (state, actions) => {
        setTimeout(() => {
          actions.setData('data');
        });
      }
    };

    app.store(actions, initialState);
    app.__s.actions.getData();

    setTimeout(() => {
      expect(app.__s.getState()).toHaveProperty('data', 'data');
    });
  });

  it('schedules a render when an action is dispatched', () => {
    spy = jest.spyOn(Kobra.prototype, 'render');
    const initialState = {};
    const actions = {
      test: () => ({ test: 'test' })
    };

    app.store(actions, initialState);
    app.__s.actions.test();

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('calls the load handler on mount', () => {
    spy = jest.fn();
    app.on('load', spy);
    app.mount({});

    expect(spy).toHaveBeenCalled();
  });

  it('calls the state change handler on state change', () => {
    spy = jest.fn();
    app.on('state', spy);

    const initialState = {};
    const actions = {
      test: () => ({ test: 'test' })
    };

    app.store(actions, initialState);
    app.__s.actions.test();

    expect(spy).toHaveBeenCalledWith({ test: 'test' });
  });
});
