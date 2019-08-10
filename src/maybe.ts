class Maybe<T> extends Monad<T> implements Foldable<'just' | 'nothing'> {
  protected constructor($value?: T | null | undefined) {
    super($value as any);
  }

  fold<N extends Functor<any>>(match: {
    just: (x: T) => N;
    nothing: (x?: undefined) => N;
  }): N {
    if (this.isNothing) {
      return match.nothing();
    } else {
      return match.just(this.value);
    }
  }

  get isNothing() {
    return this.value == null;
  }

  get isJust() {
    return !this.isNothing;
  }

  map<N>(f: (x: T) => N) {
    return this.isNothing ? nothing<N>() : just<N>(f(this.value));
  }

  chain<N extends Monad<any>>(fn: (x: T) => N): N {
    return fn(this.value);
  }

  static of<
    T,
    Result extends T = Exclude<T, undefined | null>
  >(x?: T): Maybe<Result> {
    return new this(x as Result);
  }

  toString() {
    return this.isNothing ? 'Nothing' : `Just(${this.value})`;
  }
}

function just<
  T,
  Result extends T = Exclude<T, undefined | null>
>(x: T): Maybe<Result> {
  return Maybe.of(x as Result);
}

function nothing<
  T,
  Result extends T = Exclude<T, undefined | null>
>(): Maybe<Result> {
  return Maybe.of<Result>();
}

const usernameInput = document.querySelector('#username') as HTMLInputElement;
const username = usernameInput.value;
let error = '';

if (username.length < 8) {
  error = 'Username must be at least 8 symbols long';
}

if (username.includes('fuck')) {
  error = 'Please, don\'t swear in usernames!';
}

fetch(`my-server-api.com/get-user?username=${username}`)
  .then(user => {
    console.log(user);
  });


Effect.of(document)
  .map(prop('querySelector'))
  .chain($ => just($('#username') as HTMLInputElement))
  .map(prop('value'))
  .chain((username): Either<Error, string> => username.length < 8
    ? Either.left(new Error('Username must be at least 8 symbols long'))
    : Either.right(username)
  )
  .map(username => username.includes('fuck')
    ? Either.left<Error, string>(new Error('Please, don\'t swear in usernames!'))
    : Either.right<string, Error>(username)
  )
  .fold({
    right: _ => _.fold({
      right: _ => identity(fetch(`my-server-api.com/get-user?username=${username}`)),
      left: _ => identity(new Promise((r) => r(console.log(_))))
    }),
    left: _ => identity(new Promise((r) => r(console.log(_))))
  })
  .map(result => {
    
  })
