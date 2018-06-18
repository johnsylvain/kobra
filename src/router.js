export class Router {
  constructor(type = 'hash') {
    this.type = type;
    this.types = {
      hash: 'hashchange',
      history: 'popstate'
    };
  }

  get path() {
    return this.type === 'history'
      ? document.location.pathname
      : document.location.hash.substring(1) || '/';
  }

  listen(cb) {
    ['load', this.types[this.type]].forEach(event => {
      window.addEventListener(event, cb);
    });
  }
}
