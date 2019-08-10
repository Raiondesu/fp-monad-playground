abstract class Functor<T> {
  protected constructor(protected value: T) {}

  abstract map<N>(f: (x: T) => N): any;

  toString() {
    return `${this.constructor.name}(${this.value})`;
  }

  valueOf() {
    return this.toString();
  }
}