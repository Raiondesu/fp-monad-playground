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
