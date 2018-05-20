import { parse, exec, match } from 'matchit';
import { extend } from './util';
import { render } from './render';

export class Kobra {
  constructor(opts) {
    this.opts = opts || {};
    this.container = undefined;
    this.state = undefined;
    this.dispatch = undefined;

    this.views = {
      routes: [],
      handlers: {}
    };
  }

  render() {
    const path =
      this.opts.router === 'history'
        ? document.location.pathname
        : document.location.hash.substring(1) || '/';
    const arr = match(path, this.views.routes);
    const view = this.views.handlers[(arr[0] || {}).old || path];

    if (arr.length) {
      this.state = extend(this.state || {}, { params: exec(path, arr) });
    }

    render(view(this.state, this.dispatch), this.container);
  }

  use(reducer) {
    this.state = extend(this.state || {}, reducer(undefined, {}));
    this.dispatch = action => {
      extend(this.state, reducer(this.state, action));
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
    const events = [
      'load',
      this.opts.router === 'history' ? 'popstate' : 'hashchange'
    ];
    this.container = parent;
    events.forEach(event => {
      window.addEventListener(event, this.render.bind(this));
    });
  }
}
