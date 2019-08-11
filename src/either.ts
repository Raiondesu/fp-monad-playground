interface FoldableEither<L, R> extends Monad<R>, Foldable<{
  right: R,
  left: L,
}> {
  otherValue: L;
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

