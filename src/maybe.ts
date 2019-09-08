abstract class FoldableMaybe<T> extends Monad<T> implements Foldable<{
  just: T;
  nothing: undefined;
}> {
  abstract fold<N extends Functor<any>>(match: {
    just: (x: T) => N;
    nothing: () => N;
  }): N;

  abstract map<N>(f: (x: T) => N): Maybe<N>;

  abstract readonly isNothing: boolean;
  abstract readonly isJust: boolean;
}

type Maybe<T> = Just<T> | Nothing<T>;

class Just<T> extends FoldableMaybe<T> {
  get isJust(): true { return true; }
  get isNothing(): false { return false; }
  
  toString() {
    return `Just(${this.value})`;
  }

  map<N>(f: (x: T) => N): Maybe<N> {
    return new Just(f(this.value));
  }

  chain<N extends Monad<any>>(fn: (x: T) => N): N {
    return fn(this.value);
  }

  fold: FoldableMaybe<T>['fold'] = match => match.just(this.value)
}

class Nothing<T> extends FoldableMaybe<T> {
  constructor () {
    super(undefined as any);
  }

  get isJust(): false { return false; }
  get isNothing(): true { return true; }
  
  toString() {
    return `Nothing`;
  }

  join: () => Join<T, this> = function(this: any) {
    return this as any;
  };

  map<N>(_f: (x: T) => N): Maybe<N> {
    return this as any;
  }

  chain<N extends Monad<any>>(_fn: (x: T) => N): N {
    return this as any;
  }

  fold: FoldableMaybe<T>['fold'] = match => match.nothing()
}

const isJust = <T>(m: Maybe<T>): m is Just<T> => m instanceof Just;
const isNothing = <T>(m: Maybe<T>): m is Nothing<T> => m instanceof Nothing;

function just<T>(value: T): Maybe<T> {
  return new Just(value);
}

function nothing<T>(): Maybe<T> {
  return new Nothing<T>();
}

function maybe<T>(value?: T | undefined | null): Maybe<T> {
  return value == null ? nothing() : just(value);
}
