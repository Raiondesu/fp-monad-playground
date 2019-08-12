interface FoldableEither<L, R> extends Monad<R>, Foldable<{
  right: R,
  left: L,
}> {
  readonly isLeft: boolean;
  readonly isRight: boolean;

  map<N>(f: (x: R) => N): Either<L, N>;
  mapLeft<N>(f: (x: L) => N): Either<N, R>;
}

const isLeft = <L, R>(m: Either<L, R>): m is Left<L, R> => !!m.isLeft;
const isRight = <R, L>(m: Either<L, R>): m is Right<L, R> => !!m.isRight;

type Either<L, R> = Left<L, R> | Right<L, R>;

interface Left<L, R> extends FoldableEither<L, R> {
  readonly isLeft: true;
  readonly isRight: false;
}

interface Right<L, R> extends FoldableEither<L, R> {
  readonly isLeft: false;
  readonly isRight: true;
}

function left<L, R = any>(value: L): Left<L, R> {
  return ({
    [Functor]: true,
    [Monad]: true,

    toString: () => `Left(${value})`,
  
    get isRight(): false { return false; },
    get isLeft(): true { return true; },

    mapLeft: <N>(f: (x: L) => N): Either<N, R> => left<N, R>(f(value)),

    map<N>(_f: (x: R) => N): Either<L, N> {
      return this as any;
    },

    chain<N>(_f: (x: R) => N): N {
      return this as any;
    },

    join: () => value as any,

    apply: function (this: any) { return this; } as any,

    fold: (match) => match.left(value)
  });
}

function right<R, L = any>(value: R): Right<L, R> {
  return ({
    [Functor]: true,
    [Monad]: true,
    
    toString: () => `Right(${value})`,

    get isRight(): true { return true; },
    get isLeft(): false { return false; },

    map: <N>(f: (x: R) => N): Either<L, N> => right<N, L>(f(value)),

    mapLeft<N>(f: (x: L) => N): Either<N, R> {
      return this as any;
    },

    chain: <N extends Monad<any>>(fn: (x: R) => N): N => fn(value),
    
    join: (isFunctor<R>(value)
      ? isMonad<R>(value)
        ? () => value.join()
        : () => value
      : function (this: any) { return this; }
    ) as Join<R, Right<L, R>>,

    
    apply: (isApplicable(value)
      ? (f: any) => f.map(value)
      : function (this: any) { return this; }
    ) as Apply<R, Right<L, R>>,

    fold: (match) => match.right(value)
  });
}
