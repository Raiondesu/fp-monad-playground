class Identity<T> extends Monad<T> {
  map<N>(f: (x: T) => N): Identity<N> {
    return new Identity(f(this.value));
  }

  chain<N extends Monad<any>>(fn: (x: T) => N): N {
    return fn(this.value);
  }

  toString(): string {
    return `Identity(${this.value})`;
  }
}

const identity = <T>(value: T) => new Identity(value);
