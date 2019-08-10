abstract class Monad<T> extends Functor<T> {
  join(): T extends Functor<any>
    ? T extends Monad<any>
      ? ReturnType<T['join']>
      : T
    : this
  {
    if (this.value instanceof Monad) {
      return this.value.join();
    }
    if (this.value instanceof Functor) {
      return this.value as any;
    }

    return this as any;
  }

  abstract chain<N extends Monad<any>>(fn: (x: T) => N): N;
}