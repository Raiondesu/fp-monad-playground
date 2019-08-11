export const Functor = Symbol('Functor');

export const functor = <T extends Omit<Functor<any>, typeof Functor>>(o: T) => ({
  [Functor]: Functor as typeof Functor,
  ...o
});

export const isFunctor = <T = any>(f: any): f is Functor<T> => f && (f as Functor<T>)[Functor] === Functor;

export interface Functor<T> {
  readonly [Functor]: typeof Functor;
  
  map<N>(f: (x: T) => N): Functor<N>;

  toString(): string;
}