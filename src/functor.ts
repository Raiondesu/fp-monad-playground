// const Functor = Symbol('Functor');

// const functor = <T extends Functor<any>>(o: Omit<T, typeof Functor>): T => ({
//   [Functor]: true as true,
//   ...o
// }) as any;

const isFunctor = <T = any>(f: any): f is Functor<T> => f instanceof Functor;

abstract class Functor<T> {
  protected value!: T;

  public constructor(
    value: T
  ) {
    this.value = value;
  }

  abstract map<N>(f: (x: T) => N): Functor<N>;

  abstract toString(): string;
}
