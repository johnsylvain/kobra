import { parse, exec, match } from 'matchit';
import { extend } from './util';
import { render } from './render';
import { Router } from './router';

export class Kobra {
  constructor({ router } = {}) {
    this.container = undefined;
    this.state = undefined;
    this.dispatch = undefined;
    this.reducers = [];
    this.router = new Router(router);

    this.views = {
      routes: [],
      handlers: {}
    };
  }

  render() {
    const { path } = this.router;
    const arr = match(path, this.views.routes);
    const view = this.views.handlers[(arr[0] || {}).old || path];

    if (arr.length) {
      this.state = extend(this.state || {}, { params: exec(path, arr) });
    }

    render(view(this.state, this.dispatch), this.container);
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
    this.views.routes.push(parse(pattern));
    this.views.handlers[pattern] = handler;
    return this;
  }

  mount(parent) {
    this.container = parent;
    this.router.listen(this.render.bind(this));
  }
}
