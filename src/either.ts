abstract class FoldableEither<R, L> extends Monad<R> implements Foldable<{
  right: R,
  left: L,
}> {
  abstract fold<N extends Functor<any>>(match: { right: (value: R) => N; left: (value: L) => N; }): N;
  abstract join(): Join<R, this>;
  abstract chain<N extends Monad<any>>(fn: (x: R) => N): N;
  abstract toString(): string;

  abstract map<N>(f: (x: R) => N): FoldableEither<N, L>;
  abstract mapLeft<N>(f: (x: L) => N): FoldableEither<R, N>;

  static of<R, L>(value: R): Right<R, L> {
    return new Right(value);
  }
}

const isLeft = <R, L>(m: FoldableEither<R | null, L>): m is Left<R | null, L> => m instanceof Left;
const isRight = <R, L>(m: FoldableEither<R, L>): m is Right<R, L> => m instanceof Right;

type Either<R, L> = Right<R, L> | Left<R, L>;

class Left<R, L = Error> extends FoldableEither<R | null, L> {
  valueLeft: L;

  constructor(value: L) {
    super(null);
    this.valueLeft = value;
  }

  map<N>(f: (x: R) => N): FoldableEither<N, L> {
    throw new Error('Method not implemented.');
  }
  mapLeft<N>(f: (x: L) => N): FoldableEither<R, N> {
    throw new Error('Method not implemented.');
  }
  join(): Join<R, this> {
    throw new Error('Method not implemented.');
  }
  chain<N extends Monad<any>>(fn: (x: R) => N): N {
    throw new Error('Method not implemented.');
  }
  toString(): string {
    throw new Error('Method not implemented.');
  }
  fold<N extends Functor<any>>(match: { right: (value: R) => N; left: (value: L) => N; }): N {
    throw new Error('Method not implemented.');
  }
}

class Right<R, L = Error> extends FoldableEither<R, L> {
  map<N>(f: (x: R) => N): FoldableEither<N, L> {
    throw new Error('Method not implemented.');
  }
  mapLeft<N>(f: (x: L) => N): FoldableEither<R, N> {
    throw new Error('Method not implemented.');
  }
  join(): Join<R, this> {
    throw new Error('Method not implemented.');
  }
  chain<N extends Monad<any>>(fn: (x: R) => N): N {
    throw new Error('Method not implemented.');
  }
  toString(): string {
    throw new Error('Method not implemented.');
  }
  fold<N extends Functor<any>>(match: { right: (value: R) => N; left: (value: L) => N; }): N {
    throw new Error('Method not implemented.');
  }
}

const right = <R, L = Error>(value: R) => new Right<R, L>(value);
const left = <R, L>(_rightMarker: R, value: L) => new Left<R, L>(value);

const either: Either<string, Error> = maybe(Math.random() > 0.5 ? null : 'lol')
  .chain(_ => _.length > 2 ? right(_) : left(_, new Error('min 2 chars')))

