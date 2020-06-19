import { createStore } from 'staten';
import { extend } from './util';
import { render } from './render';
import { Router } from './router/router';

export class Kobra {
  constructor() {
    this.container = undefined;
    this.store = undefined;
    this.runHandlers = [];
    this.router = new Router('history');
  }

  render() {
    this.router.getCurrent((handler, params) => {
      const actions = this.store ? this.store.actions : {};
      const state = this.store ? this.store.getState() : {};
      const view = handler(state, actions);

      if (params) {
        extend(state, { params });
      }

      render(view, this.container);
    });
  }

  setStore(actions, initialState) {
    this.store = createStore(actions, initialState);
    this.store.subscribe(() => {
      setTimeout(() => this.render());
    });
    return this;
  }

  route(pattern, handler) {
    this.router.on(pattern, handler);
    return this;
  }

  run(fn) {
    this.runHandlers.push(fn);
    return this;
  }

  mount(parent) {
    this.container = parent;
    this.router.listen(this.render.bind(this));

    if (this.runHandlers.length) {
      const actions = this.store ? this.store.actions : {};
      this.runHandlers.forEach(handler => {
        handler(actions);
      });
    }
  }
}

export const kobra = () => new Kobra();
