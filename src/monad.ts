import { Functor, functor } from './functor';
import { Applicative } from './applicative';

export type Join<T, This> = () => T extends Functor<any>
  ? T extends Monad<any>
    ? ReturnType<T['join']>
    : T
  : This;

export const Monad = Symbol('Monad');

export const monad = <T extends Omit<Monad<any>, typeof Functor | typeof Monad>>(o: T) => functor({
  [Monad]: Monad as typeof Monad,
  ...o
});

export const isMonad = <T = any>(m: any): m is Monad<T> => m && (m as Monad<T>)[Monad] === Monad;

export interface Monad<T> extends Applicative<T> {
  readonly [Monad]: typeof Monad;

  join: Join<T, this>;

  chain<N extends Monad<any>>(fn: (x: T) => N): N;
}
