const isFunctor = <T = any>(f: any): f is Functor<T> => f instanceof Functor;

const Safe = <T extends abstract new (...args: any[]) => any>(constructor: T): T => function (...args: any[]) {
  //@ts-ignore
  return new Proxy(new constructor(...args), {
    get(t, p) {
      if (p in t) {
        return t[p];
      }

      return () => t;
    }
  })
} as unknown as T;

@Safe
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
