import { extend } from './util';
import { render } from './render';
import { Router } from './router/router';

export class Kobra {
  constructor({ router } = {}) {
    this.container = undefined;
    this.state = undefined;
    this.dispatch = undefined;
    this.reducers = [];
    this.runHandlers = [];
    this.router = new Router(router);
  }

  render() {
    this.router.getCurrent((handler, params) => {
      if (params) {
        this.state = extend(this.state || {}, { params });
      }

      render(handler(this.state, this.dispatch), this.container);
    });
  }

  use(reducer) {
    this.reducers.push(reducer);
    this.reducers.forEach(reducer => {
      if (this.state) extend(this.state, reducer(undefined, {}));
      else this.state = reducer(undefined, {});
    });
    this.dispatch = action => {
      this.reducers.forEach(reducer => {
        extend(this.state, reducer(this.state, action));
      });
      setTimeout(() => this.render());
    };
    return this;
  }

  route(pattern, handler) {
    this.router.on(pattern, handler);
    return this;
  }

  run(fn) {
    this.runHandlers.push(fn);
  }

  mount(parent) {
    this.container = parent;
    this.router.listen(this.render.bind(this));

    if (this.runHandlers.length) {
      this.runHandlers.forEach(handler => {
        handler(this.dispatch);
      });
    }
  }
}
