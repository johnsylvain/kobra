import { createStore } from 'staten';
import { extend } from './util';
import { render } from './render';
import { Router } from './router';

export class Kobra {
  constructor() {
    this.__c = undefined; // app container
    this.__s = undefined; // state store
    // events
    this.__e = {
      load: [],
      route: [],
      state: []
    };
    this.__r = new Router('history'); // router
  }

  render() {
    this.__r.getCurrent((handler, params) => {
      const actions = this.__s ? this.__s.actions : {};
      const state = this.__s ? this.__s.getState() : {};
      extend(state, { params: params || {} });
      const view = handler(state, actions);

      render(view, this.__c);
    });
  }

  store(actions, initialState) {
    this.__s = createStore(actions, initialState);
    this.__s.subscribe(() => {
      setTimeout(() => this.render());
      this.__e.state.map(fn => fn(this.__s.getState(), this.__s.actions));
    });
    return this;
  }

  route(pattern, handler) {
    this.__r.on(pattern, handler);
    return this;
  }

  on(name, fn) {
    if (name in this.__e) {
      this.__e[name].push(fn);
    }
    return this;
  }

  mount(parent) {
    this.__c = parent;
    const actions = this.__s ? this.__s.actions : {};
    const state = this.__s ? this.__s.getState() : {};

    this.__r.listen(() => {
      this.__e.route.map(fn => fn(state, actions));
      this.render();
    });

    this.__e.load.map(fn => fn(state, actions));
  }
}

export const kobra = () => new Kobra();
