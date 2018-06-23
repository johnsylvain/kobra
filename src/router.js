import { parse, exec, match } from 'matchit';

export class Router {
  constructor(type = 'hash') {
    this.type = type;
    this.routes = [];
    this.handlers = {};
  }

  get path() {
    return {
      history: document.location.pathname,
      hash: document.location.hash.substring(1) || '/'
    }[this.type];
  }

  get handler() {
    const arr = match(this.path, this.routes);
    return this.handlers[(arr[0] || {}).old || this.path];
  }

  get params() {
    const arr = match(this.path, this.routes);
    return exec(this.path, arr);
  }

  on(pattern, handler) {
    this.routes.push(parse(pattern));
    this.handlers[pattern] = handler;
  }

  listen(cb) {
    [
      'load',
      {
        hash: 'hashchange',
        history: 'popstate'
      }[this.type]
    ].forEach(event => {
      window.addEventListener(event, cb);
    });
  }
}
