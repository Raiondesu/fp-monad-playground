interface FoldableMaybe<T> extends Monad<T>, Foldable<{
  just: T;
  nothing: undefined;
}> {
  map<N>(f: (x: T) => N): Maybe<N>;

  readonly isNothing: boolean;
  readonly isJust: boolean;
}

type Maybe<T> = Nothing<T> | Just<T>;

interface Nothing<T> extends FoldableMaybe<T> {
  readonly isNothing: true;
  readonly isJust: false;
}

interface Just<T> extends FoldableMaybe<T> {
  readonly isNothing: false;
  readonly isJust: true;
}

const isJust = <T>(m: Maybe<T>): m is Just<T> => !!m.isJust;
const isNothing = <T>(m: Maybe<T>): m is Nothing<T> => !!m.isNothing;

function just<T>(value: T): Just<T> {
  const j: Just<T> = monad({
    get isJust(): true { return true; },
    get isNothing(): false { return false; },

    toString: () => `Just(${value})`,

    join: (isFunctor<T>(value)
      ? isMonad<T>(value)
        ? () => value.join()
        : () => value
      : () => j
    ) as Join<T, Just<T>>,

    
    apply: (isApplicable(value)
      ? (f: any) => f.map(value)
      : function (this: any) { return this; }
    ) as Apply<T, Just<T>>,

    map: <N>(f: (x: T) => N) => just(f(value)),

    chain: <N extends Monad<any>>(fn: (x: T) => N): N => fn(value),

    fold: <N extends Functor<any>>(match: {
      just: (x: T) => N;
      nothing: (x?: undefined) => N;
    }): N => match.just(value)
  });

  return j;
}

function nothing<T>(): Nothing<T> {
  return {
    [Functor]: Functor,
    [Monad]: Monad,

    get isJust(): false { return false; },
    get isNothing(): true { return true; },

    toString: () => `Nothing`,

    join() {
      return this as any;
    },

    apply: function (this: any, _: any) {
      return this;
    } as Apply<T, Nothing<T>>,

    map<N>(_f: (x: T) => N): Nothing<N> {
      return this as any;
    },

    chain<N extends Monad<any>>(_fn: (x: T) => N): N {
      return this as any;
    },

    fold: <N extends Functor<any>>(match: {
      just: (x: T) => N;
      nothing: (x?: undefined) => N;
    }): N => match.nothing(),
  };
}

function maybe<T>(value?: T | undefined | null): Maybe<T> {
  return value == null ? nothing() : just(value);
}
