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

    app.setStore(actions, initialState);

    expect(app.store.getState()).toHaveProperty('foo', 'bar');
  });

  it('dispatches actions', () => {
    const initialState = {};
    const actions = {
      test: () => ({ test: 'test' })
    };

    app.setStore(actions, initialState);
    app.store.actions.test();
    expect(app.store.getState()).toHaveProperty('test', 'test');
  });

  it('dispatches actions that updates state', () => {
    const initialState = { count: 0 };
    const actions = {
      inc: () => state => ({ count: state.count + 1 })
    };

    app.setStore(actions, initialState);
    app.store.actions.inc();
    expect(app.store.getState()).toHaveProperty('count', 1);
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

    app.setStore(actions, initialState);
    app.store.actions.getData();

    setTimeout(() => {
      expect(app.store.getState()).toHaveProperty('data', 'data');
    });
  });

  it('schedules a render when an action is dispatched', () => {
    spy = jest.spyOn(Kobra.prototype, 'render');
    const initialState = {};
    const actions = {
      test: () => ({ test: 'test' })
    };

    app.setStore(actions, initialState);
    app.store.actions.test();

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('calls the run handler on mount', () => {
    spy = jest.fn();
    app.run(spy);
    app.mount({});

    expect(spy).toHaveBeenCalled();
  });
});
