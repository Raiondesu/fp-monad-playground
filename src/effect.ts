class Effect<T extends (...args: any[]) => any> extends Monad<T> {
  public constructor(value: T) {
    super(value);
  }
  
  map<N>(f: (x: ReturnType<T>) => N) {
    return new Effect((...args: Parameters<T>) => f(this.value(...args)));
  }

  chain<N extends Monad<any>>(fn: (x: ReturnType<T>) => N): N {
    return this.map(fn).value as any;
  }

  public get execute() {
    return this.value;
  }

  toString() {
    return 'Effect(?)';
  }

  static of<T>(x: T) {
    return new Effect(() => x);
  }
}

const log = new Effect(() => window);

log
  .map(prop('document'))
  .map(prop('querySelector'))
  .map($ => $('#input') as HTMLInputElement)
  .chain(input => input.value.length > 4 ? just(input.value) : nothing<string>())
  .fold({
    just: _ => Either.right<string, Error>(_),
    nothing: _ => Either.left<Error, string>(new Error('Minimum username length is 8 symbols'))
  })
  .map(append('Hello, '))
  .fold({
    left: _ => new Effect(() => console.log(_)),
    right: _ => new Effect(() => console.log(_))
  })
  .execute();