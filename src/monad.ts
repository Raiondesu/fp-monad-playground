type Join<T, This> = T extends Functor<any>
  ? T extends Monad<any>
    ? ReturnType<T['join']>
    : T
  : This;

const isMonad = <T = any>(m: any): m is Monad<T> => m instanceof Monad;

interface Joinable<T> {
  join(): Join<T, this>;
}


abstract class Monad<T> extends Functor<T> implements Joinable<T> {
  join(): Join<T, this> {
    return isFunctor<T>(this.value)
      ? isMonad<T>(this.value)
        ? this.value.join()
        : this.value
      : this as any;
  }

  abstract chain<N extends Monad<any>>(fn: (x: T) => N): any;
}
