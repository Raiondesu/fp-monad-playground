class Effect<T extends (...args: any[]) => any> extends Monad<T> {
  toString(): string {
    return `Effect(${this.value.name})`;
  }

  // @ts-ignore
  map<N>(f: (x: ReturnType<T>) => N): Effect<(...args: Parameters<T>) => N> {
    return new Effect((...args: Parameters<T>) => f(this.value(...args)));
  }
  
  chain<N extends Monad<any>>(fn: (x: T) => N): Effect<(...args: Parameters<T>) => N> {
    return this.map(fn).join();
  };

  public readonly executeEffect: T = this.value;
}

function effect<T extends (...args: any[]) => any>(_value: T): Effect<T>;
function effect<T>(_value: T): Effect<() => T>;
function effect<
  O,
  T extends (...args: any[]) => any = O extends (...args: any[]) => any ? O : () => O
>(_value: O) {
  const value = (typeof _value === 'function' ? _value : () => _value) as T;

  return new Effect(value);
}

effect(document.querySelector)
  .map(maybe)
  .chain($ => $('asd'))
  .
  