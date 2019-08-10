class Either<L, R> extends Monad<L | R> implements Foldable<'right' | 'left'> {
  private _isRight(v: any): v is R {
    return this.right;
  }

  private _isLeft(v: any): v is L {
    return !this.right;
  }

  public get isRight() {
    return this._isRight(this.value);
  }

  public get isLeft() {
    return this._isLeft(this.value);
  }

  protected constructor(
    $value: L | R,
    private right: boolean
  ) {
    super($value);
  }

  map<N>(f: (x: R) => N): Either<L, N> {
    return this._isRight(this.value) ? Either.right(f(this.value)) : Either.left<L, N>(this.value);
  }

  chain<N extends Monad<any>>(fn: (x: R) => N): N {
    return this._isRight(this.value) ? fn(this.value) : <any>this as N;
  }

  mapLeft<N>(f: (x: L) => N): Either<N, R> {
    return this._isLeft(this.value) ? Either.left(f(this.value)) : Either.right<R, N>(this.value);
  }

  chainLeft<N extends Monad<any>>(fn: (x: L) => N): N {
    return this._isLeft(this.value) ? fn(this.value) : <any>this as N;
  }

  fold<N extends Functor<any>>(match: {
    right: (x: R) => N;
    left: (x: L) => N;
  }): N {
    return this._isRight(this.value) ? match.right(this.value) : match.left(this.value);
  }

  static of<T, L = any>(x: T) {
    return new Either<L, T>(x, true);
  }

  static right = Either.of;

  static left<T, R = any>(x: T) {
    return new Either<T, R>(x, false);
  }
}

function test(): Either<Error, number> {
  if (Math.random() > 0.5) {
    return Either.right(42);
  }

  return Either.left(new Error('no luck'));
}

