abstract class Either<R, L> extends Monad<R> implements Foldable<{
  right: R,
  left: L,
}> {
  abstract fold<N extends Functor<any>>(match: { right: (value: R) => N; left: (value: L) => N; }): N
  abstract join(): Join<R, this>;
  abstract chain<N extends Monad<any>>(fn: (x: R) => N): N;
  abstract chainLeft<N extends Monad<any>>(fn: (x: L) => N): N;
  abstract toString(): string;
  abstract map<N>(f: (x: R) => N): Either<N, L>;
  abstract mapLeft<N>(f: (x: L) => N): Either<R, N>;

  static of<R, L>(value: R): Right<R, L> {
    return new Right(value);
  }
}

const isLeft = <R, L>(m: Either<R, L>): m is Left<R, L> => m instanceof Left;
const isRight = <R, L>(m: Either<R, L>): m is Right<R, L> => m instanceof Right;

class Left<R, L = Error> extends Either<R, L> {
  valueLeft: L;

  constructor(value: L) {
    super(null as any);
    this.valueLeft = value;
  }

  map<N>(_f: (x: R) => N): Either<N, L> {
    return this as unknown as Either<N, L>;
  }

  mapLeft<N>(f: (x: L) => N): Either<R, N> {
    return new Left(f(this.valueLeft));
  }

  join(): Join<R, this> {
    return isFunctor<L>(this.valueLeft)
      ? isMonad<L>(this.valueLeft)
        ? this.valueLeft.join()
        : this.valueLeft
      : this as any;
  }

  chain<N extends Monad<any>>(_fn: (x: R) => N): N {
    return this as unknown as N;
  }

  chainLeft<N extends Monad<any>>(fn: (x: L) => N): N {
    return fn(this.valueLeft);
  }

  toString(): string {
    return `Left(${this.valueLeft})`;
  }

  fold<N extends Functor<any>>(match: { right: (value: R) => N; left: (value: L) => N; }): N {
    return match.left(this.valueLeft);
  }
}

class Right<R, L = Error> extends Either<R, L> {
  map<N>(f: (x: R) => N): Either<N, L> {
    return new Right(f(this.value));
  }

  mapLeft<N>(f: (x: L) => N): Either<R, N> {
    return this as unknown as Either<R, N>;
  }

  join(): Join<R, this> {
    return Monad.prototype.join.call(this);
  }

  chain<N extends Monad<any>>(fn: (x: R) => N): N {
    return fn(this.value);
  }

  chainLeft<N extends Monad<any>>(fn: (x: L) => N): N {
    return this as unknown as N;
  }

  toString(): string {
    return `Right(${this.value})`;
  }

  fold<N extends Functor<any>>(match: { right: (value: R) => N; left: (value: L) => N; }): N {
    return match.right(this.value);
  }
}

const right = <R, L = Error>(value: R) => new Right<R, L>(value);
const left = <R, L>(_rightMarker: R, value: L) => new Left<R, L>(value);

const either: Either<string, Error> = maybe(Math.random() > 0.5 ? null : 'lol')
  .chain(_ => _.length > 2 ? right(_) : left(_, new Error('min 2 chars')))

