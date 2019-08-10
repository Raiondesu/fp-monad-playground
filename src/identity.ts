class Identity<T> extends Monad<T> {
  map<N>(f: (x: T) => N): Identity<N> {
    return Identity.of(f(this.value));
  }

  chain<N extends Monad<any>>(fn: (x: T) => N): N {
    return fn(this.value);
  }

  static of<T>(x: T) {
    return new this(x);
  }
}

const identity = <T>(x: T) => Identity.of(x);