import { parse, exec, match } from 'matchit';

export class Router {
  constructor(type = 'history') {
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

  getCurrent(cb) {
    const arr = match(this.path, this.routes);
    const params = exec(this.path, arr);
    const handler = this.handlers[(arr[0] || {}).old || this.path];
    cb(handler, params);
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
